const axios = require("axios");
const _ = require("lodash");

const config = require("../config");
const MongoDBManager = require("../runtime/capabilities/MongoDBManager");
const KeyValue = require("../app/models/keyvalue");
const {getRemoteNodeData, upsertDocuments} = require('./jobUtils');

const { C2E_STATUS_KEY,  REMOTE_CATALOG_SIZE_KEY, SYNC_DATA_POINTS, SYNC_STATUSES, API_URL, EDGE_NODE_REGISTRATION_PATH,
    DEFAULT_USER_DOMAINS, MONGO_DB_COLLECTIONS,} = config;

const COLLECTION_FILTERS = {
    USERS: ['userId'],
    USER_COURSES: ['userId', 'courseId'],
    COURSES: ['courseId']
};

const REGISTER_SYNC_API_ENDPOINT = `${API_URL}/${EDGE_NODE_REGISTRATION_PATH}`;

async function getEdgeData(IMO, remoteNodeId) {
    let apiResponse = null;
    try {
        console.log(`CRON JOB: CloudToEdgeSync. Registering remote node: IMO${IMO}. remoteNodeId: ${remoteNodeId}`);
        apiResponse = await axios.post(REGISTER_SYNC_API_ENDPOINT, {IMO, remoteNodeId}, {headers: {'x-api-key': config.SYNC_API_KEY}});
    } catch (e) {
        throw new Error(`Api error: "${_.get(e, 'response.data.error', e.message)}" for IMO: ${IMO} and nodeId: ${remoteNodeId}`);
    }
    let {users, userEnrollments, courses, courseCatalogSize} = _.get(apiResponse, 'data');
    console.log(`CRON JOB: CloudToEdgeSync. Got data: users${_.size(users)}. userEnrollments: ${_.size(userEnrollments)}. courses: ${_.size(courses)}. courseCatalogSize: ${courseCatalogSize}`);
    if(_.isEmpty(users)) {
        throw new Error(`Data not setup correctly in cloud. Users size: ${_.size(users)}. UserEnrollments size: ${_.size(userEnrollments)}. Courses size: ${_.size(courses)}.`);
    }
    return {users, userEnrollments, courses, courseCatalogSize};
}

async function loadCloudDataIntoEdge(users, userEnrollments, courses) {
    console.log(`CRON JOB: CloudToEdgeSync. Loading data: users${_.size(users)}. userEnrollments: ${_.size(userEnrollments)}. courses: ${_.size(courses)}`);
    users = _.map(users, user => {
        user.domains = DEFAULT_USER_DOMAINS;
        return user;
    });
    await upsertDocuments(users, MONGO_DB_COLLECTIONS.USERS, COLLECTION_FILTERS.USERS);
    console.log(`CRON JOB: CloudToEdgeSync. Finished uploading users`);

    await upsertDocuments(userEnrollments, MONGO_DB_COLLECTIONS.USER_COURSES, COLLECTION_FILTERS.USER_COURSES);
    if(!_.isEmpty(userEnrollments)) {
        console.log(`CRON JOB: CloudToEdgeSync. Finished uploading user enrollments`);
    }

    await upsertDocuments(courses, MONGO_DB_COLLECTIONS.COURSES, COLLECTION_FILTERS.COURSES);
    if(!_.isEmpty(courses)) {
        console.log(`CRON JOB: CloudToEdgeSync. Finished uploading courses`);
    }
}

async function logCloudToEdgeStatus(error) {
    try {
        let cloudToEdgeStatus = {};
        cloudToEdgeStatus[SYNC_DATA_POINTS.SYNC_TIME] = Date.now();
        cloudToEdgeStatus[SYNC_DATA_POINTS.SYNC_STATUS] = error ? SYNC_STATUSES.ERROR : SYNC_STATUSES.DONE;
        cloudToEdgeStatus[SYNC_DATA_POINTS.SYNC_MSG] = error ? error : `Successfully synced data between cloud and edge at ${Date.now()}`;
        console.log(`CRON JOB: CloudToEdgeSync. cloudToEdgeStatus: ${JSON.stringify(cloudToEdgeStatus)}`);
        await KeyValue.updateOne({key: C2E_STATUS_KEY}, {$set: {value: cloudToEdgeStatus}}, {upsert: true});
    } catch (e) {
        console.log(`CRON JOB: CloudToEdgeSync. Error occurred when logging CloudToEdgeStatus. Error message: ${e.message}`);
    }
}

async function setRemoteCatalogSize(size) {
    await KeyValue.updateOne({key: REMOTE_CATALOG_SIZE_KEY}, {$set: {value: size}}, {upsert: true});
}
async function doCloudToEdgeSync() {
    try {
        let {imo, nodeId, c2eSyncStatus} = await getRemoteNodeData();
        console.log(`CRON JOB: CloudToEdgeSync: imo${imo}. nodeId: ${nodeId}. c2eSyncStatus: ${c2eSyncStatus}`);
        console.log(`CRON JOB: CloudToEdgeSync. Status is ${c2eSyncStatus}. Starting sync process`);
        let {users, userEnrollments, courses, courseCatalogSize} = await getEdgeData(imo, nodeId);
        console.log(`CRON JOB: CloudToEdgeSync. Got data: users: ${_.size(users)}. userEnrollments: ${_.size(userEnrollments)}. courses: ${_.size(courses)}`);
        await loadCloudDataIntoEdge(users, userEnrollments, courses);
        console.log(`CRON JOB: CloudToEdgeSync. Finished loading edge data`);
        await logCloudToEdgeStatus();
        await setRemoteCatalogSize(courseCatalogSize);
        console.log(`CRON JOB: CloudToEdgeSync. Updated status.`);
        console.log(`CRON JOB: CloudToEdgeSync. Finished run successfully.`);
    } catch(e) {
        console.log(`CRON JOB: Error occurred when syncing data between cloud and edge. Error message: ${e.message}`);
        await logCloudToEdgeStatus(e.message);
    }
}

exports.doCloudToEdgeSync = doCloudToEdgeSync;