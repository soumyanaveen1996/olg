const axios = require("axios");
const _ = require("lodash");

const config = require("../config");
const KeyValue = require("../app/models/keyvalue");
const {getKeyValues, getRemoteNodeData, checkAPIGatewayAvailability, upsertDocuments} = require('./jobUtils');

const { COURSES_SYNC_STATUS_KEY,  REMOTE_CATALOG_SIZE_KEY, SYNC_DATA_POINTS, SYNC_STATUSES, API_URL,
    SYNC_ALL_COURSES_PATH, MONGO_DB_COLLECTIONS,} = config;
const SYNC_ALL_COURSES_API_ENDPOINT = `${API_URL}/${SYNC_ALL_COURSES_PATH}`;
const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const MAX_CALLS_TO_SERVER = 10;
const COLLECTION_FILTERS = {
    COURSES: ['courseId']
};

async function getAllCoursesData(IMO, remoteNodeId, paginationPageNum) {
    let apiResponse = null;
    try {
        console.log(`CRON JOB: doCoursesSync. Sending remote node: IMO${IMO}. remoteNodeId: ${remoteNodeId}. paginationPageNum: ${paginationPageNum}`);
        apiResponse = await axios.post(SYNC_ALL_COURSES_API_ENDPOINT, {IMO, remoteNodeId, nextPageNumber: paginationPageNum}, {headers: {'x-api-key': config.SYNC_API_KEY}});
    } catch (e) {
        throw new Error(`Api error: "${_.get(e, 'response.data.error', e.message)}" for IMO: ${IMO} and nodeId: ${remoteNodeId}`);
    }

    let {courses, nextPageNumber} = _.get(apiResponse, 'data');
    console.log(`CRON JOB: doCoursesSync. Got data: courses: ${_.size(courses)}. nextPageNumber: ${nextPageNumber}`);
    return {courses, nextPageNumber};
}

async function loadCoursesIntoDB(courses) {
    console.log(`CRON JOB: doCoursesSync. Loading data: courses: ${_.size(courses)}`);
    await upsertDocuments(courses, MONGO_DB_COLLECTIONS.COURSES, COLLECTION_FILTERS.COURSES);
}

async function logCourseSyncStatus({status, nextPageNumber, error}) {
    try {
        let courseSyncStatus = {};
        courseSyncStatus[SYNC_DATA_POINTS.SYNC_TIME] = Date.now();
        courseSyncStatus[SYNC_DATA_POINTS.SYNC_STATUS] = status;
        courseSyncStatus[SYNC_DATA_POINTS.SYNC_MSG] = error;
        courseSyncStatus[SYNC_DATA_POINTS.SYNC_STATS] = {nextPageNumber};
        console.log(`CRON JOB: doCoursesSync. courseSyncStatus: ${JSON.stringify(courseSyncStatus)}`);
        await KeyValue.updateOne({key: COURSES_SYNC_STATUS_KEY}, {$set: {value: courseSyncStatus}}, {upsert: true});
    } catch (e) {
        console.log(`CRON JOB: doCoursesSync. Error occurred when logging courseSyncStatus. Error message: ${e.message}`);
    }
}

function didCourseSyncInLast24Hours(coursesSyncStatus) {
    let lastSyncStatus = _.get(coursesSyncStatus, `${SYNC_DATA_POINTS.SYNC_STATUS}`);
    if(lastSyncStatus !== SYNC_STATUSES.DONE) {
        return false;
    }

    let curTime = Date.now();
    let lastSyncTime = _.get(coursesSyncStatus, `${SYNC_DATA_POINTS.SYNC_TIME}`) || 0;
    return (curTime - lastSyncTime) <= ONE_DAY_MS;
}

async function updateAllCourseData(imo, nodeId, curPaginationPageNum, totalCatalogSize) {
    let totalCoursesLoaded = 0;
    let totalRuns = 0;
    do {
        let isAPIAvailable = await checkAPIGatewayAvailability();
        if(!isAPIAvailable) {
            break;
        }
        console.log(`CRON JOB: doCoursesSync. curPaginationPageNum: ${curPaginationPageNum}. totalCatalogSize: ${totalCatalogSize}`);
        let {courses, nextPageNumber} = await getAllCoursesData(imo, nodeId, curPaginationPageNum);
        console.log(`CRON JOB: doCoursesSync. Got data: courses: ${_.size(courses)}. nextPageNumber: ${nextPageNumber}`);

        await loadCoursesIntoDB(courses);
        console.log(`CRON JOB: doCoursesSync. Finished loading course data`);

        totalCoursesLoaded += _.size(courses);
        let allCoursesLoaded = totalCoursesLoaded >= totalCatalogSize;
        if(allCoursesLoaded) {
            await logCourseSyncStatus({status: SYNC_STATUSES.DONE, nextPageNumber: 0});
            break;
        } else {
            await logCourseSyncStatus({status: SYNC_STATUSES.IN_PROGRESS, nextPageNumber});
            curPaginationPageNum = nextPageNumber;
        }
        totalRuns++;
    } while(totalRuns < MAX_CALLS_TO_SERVER);
}

async function getConfigKeys() {
    let {imo, nodeId} = await getRemoteNodeData();
    let keyValues = await getKeyValues([COURSES_SYNC_STATUS_KEY, REMOTE_CATALOG_SIZE_KEY]);
    let coursesSyncStatus = _.get(keyValues, COURSES_SYNC_STATUS_KEY);
    let totalCatalogSize = _.get(keyValues, REMOTE_CATALOG_SIZE_KEY) || 0;
    if(totalCatalogSize === 0) {
        throw new Error(`ERROR: totalCatalogSize is not set.`);
    }
    return {imo, nodeId, coursesSyncStatus, totalCatalogSize};
}
async function doCoursesSync() {
    console.log(`CRON JOB: Starting doCoursesSync`);
    let curPaginationPageNum = 0;
    try {
        let {imo, nodeId, coursesSyncStatus, totalCatalogSize} = await getConfigKeys();
        console.log(`CRON JOB: doCoursesSync. imo${imo}. nodeId: ${nodeId}. coursesSyncStatus: ${coursesSyncStatus}. totalCatalogSize: ${totalCatalogSize}`);
        if(didCourseSyncInLast24Hours(coursesSyncStatus)) {
            console.log(`CRON JOB: doCoursesSync. Job ran in last 24 hours. Ending sync process`);
            return;
        }
        curPaginationPageNum = _.get(coursesSyncStatus, `${SYNC_DATA_POINTS.SYNC_STATS}.nextPageNumber`) || 0;
        await updateAllCourseData(imo, nodeId, curPaginationPageNum, totalCatalogSize);
    } catch(e) {
        console.log(`CRON JOB: doCoursesSync. Error occurred when syncing courses between cloud and edge. Error message: ${e.message}`);
        await logCourseSyncStatus({status: SYNC_STATUSES.ERROR, nextPageNumber: curPaginationPageNum, error: e.message});
    }
}

exports.doCoursesSync = doCoursesSync;