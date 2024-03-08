const _ = require("lodash");
const axios = require("axios");

const config = require("../config");
const KeyValue = require("../app/models/keyvalue");
const {getRemoteNodeData, DB_STATUS_CODE} = require('./jobUtils');
const MongoDBManager = require("../runtime/capabilities/MongoDBManager");

const {E2C_STATUS_KEY, SYNC_DATA_POINTS, SYNC_STATUSES, API_URL,
    SYNC_TO_ADOBE_PATH,  MONGO_DB_COLLECTIONS, COURSE_STATUS, COURSE_FIELDS_TO_SYNC} = config;

const SYNC_TO_ADOBE_API_ENDPOINT = `${API_URL}/${SYNC_TO_ADOBE_PATH}`;
const DB_FETCH_LIMIT = 25;
async function logEdgeToCloudSyncStatus({errorMessage, syncedRecordCount}) {
    try {
        let edgeToCloudStatus = {};
        edgeToCloudStatus[SYNC_DATA_POINTS.SYNC_TIME] = Date.now();
        edgeToCloudStatus[SYNC_DATA_POINTS.SYNC_STATUS] = errorMessage ? SYNC_STATUSES.ERROR : SYNC_STATUSES.DONE;
        edgeToCloudStatus[SYNC_DATA_POINTS.SYNC_MSG] = errorMessage ? errorMessage : `Successfully synced data between edge and cloud`;
        edgeToCloudStatus[SYNC_DATA_POINTS.SYNC_STATS] = {syncedRecordCount};
        console.log(`CRON JOB: EdgeToCloudSync. edgeToCloudStatus: ${JSON.stringify(edgeToCloudStatus)}`);
        await KeyValue.updateOne({key: E2C_STATUS_KEY}, {$set: {value: edgeToCloudStatus}}, {upsert: true});
    } catch (e) {
        console.log(`CRON JOB: EdgeToCloudSync. Error occurred when logging EdgeToCloudSyncStatus. Error message: ${e.message}`);
    }
}

async function sendEdgeDataToCloud(IMO, remoteNodeId, userEnrollments) {
    try {
        console.log(`CRON JOB: EdgeToCloudSync. Sending userEnrollments to cloud: IMO: ${IMO}. remoteNodeId: ${remoteNodeId}. userEnrollments: ${_.size(userEnrollments)}`);
        await axios.post(SYNC_TO_ADOBE_API_ENDPOINT, {IMO, remoteNodeId, userEnrollments}, {headers: {'x-api-key': config.SYNC_API_KEY}});
    } catch (e) {
        throw new Error(`Api error: "${_.get(e, 'response.data.error', e.message)}" for IMO: ${IMO} and nodeId: ${remoteNodeId}`);
    }
}

async function getUserCourses(query, projection, skip, limit) {
    let response = await MongoDBManager.execute({
        action: 'query',
        db: 'olg',
        collection: MONGO_DB_COLLECTIONS.USER_COURSES,
        query,
        projection: {projection}, skip, limit
    });
    let body = _.get(response, 'body');
    let statusCode = _.get(response, 'statusCode');
    if(statusCode === DB_STATUS_CODE.ERROR) {
        throw new Error(body);
    }
    return body;
}

async function getUpdatedUserEnrollments(lastSyncTime) {
    let query = {state: {$in : [COURSE_STATUS.COMPLETED, COURSE_STATUS.STARTED, COURSE_STATUS.ENROLLED]}};
    query.edgeUpdatedOn = (lastSyncTime) ? {$gte: lastSyncTime} : {$exists: true};
    let projection = {};
    _.forEach(COURSE_FIELDS_TO_SYNC, field => {projection[field] = 1});

    let body = null;
    let skip = 0;
    let userEnrollments = [];
    do {
        body = await getUserCourses(query, projection, skip, DB_FETCH_LIMIT);
        userEnrollments = _.concat(userEnrollments, body);

        skip = skip + DB_FETCH_LIMIT;
    } while(!_.isEmpty(body));
    return userEnrollments;
}

function getLastSyncTime(e2cSyncStatus, c2eSyncStatus) {
    let lastLoadTime = _.get(c2eSyncStatus, SYNC_DATA_POINTS.SYNC_TIME);
    let lastSyncTime = _.get(e2cSyncStatus, SYNC_DATA_POINTS.SYNC_TIME) || lastLoadTime;
    console.log(`CRON JOB: EdgeToCloudSync. lastSyncTime: ${lastSyncTime}. lastLoadTime: ${lastLoadTime}`);
    return lastSyncTime;
}

async function doEdgeToCloudSync() {
    try {
        let {imo, nodeId, e2cSyncStatus, c2eSyncStatus} = await getRemoteNodeData();
        console.log(`CRON JOB: EdgeToCloudSync. Remote node data: imo${imo}. nodeId: ${nodeId}. e2cSyncStatus: ${e2cSyncStatus}`);

        let lastSyncTime = getLastSyncTime(e2cSyncStatus, c2eSyncStatus);
        let userEnrollments = await getUpdatedUserEnrollments(lastSyncTime);
        console.log(`CRON JOB: EdgeToCloudSync. userEnrollments: ${_.size(userEnrollments)}`);
        if(_.isEmpty(userEnrollments)) {
            console.log(`CRON JOB: EdgeToCloudSync. no userEnrollments updated since last run`);
            await logEdgeToCloudSyncStatus({syncedRecordCount: 0});
            return;
        }
        let chunks = _.chunk(userEnrollments, DB_FETCH_LIMIT);
        for(let i = 0; i < _.size(chunks); i++) {
            let chunk = chunks[i];
            console.log(`CRON JOB: EdgeToCloudSync. Sending userEnrollments to cloud: chunk: ${i}. size: ${_.size(chunk)}`);
            await sendEdgeDataToCloud(imo, nodeId, chunk);
        }
        console.log(`CRON JOB: EdgeToCloudSync. Completed sync. syncedRecordCount: ${_.size(userEnrollments)}`);
        await logEdgeToCloudSyncStatus({syncedRecordCount: _.size(userEnrollments)});
    } catch(e) {
        console.log(`CRON JOB: EdgeToCloudSync. Error occurred when syncing data between cloud and edge. Error message: ${e.message}`);
        await logEdgeToCloudSyncStatus({errorMessage: e.message});
    }
}

exports.doEdgeToCloudSync = doEdgeToCloudSync;