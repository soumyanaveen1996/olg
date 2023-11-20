let cron = require('node-cron');
const axios = require('axios');
const _ = require("lodash");
const KeyValue = require('../app/models/keyvalue');
const MongoDBManager = require('../runtime/capabilities/MongoDBManager');

const config = require('../config');
const {IMO_KEY, NODE_ID_KEY, C2E_STATUS_KEY, E2C_STATUS_KEY, SYNC_DATA_POINTS,
    SYNC_STATUSES, API_URL, EDGE_NODE_REGISTRATION_PATH,
    SYNC_TO_ADOBE_PATH, DEFAULT_USER_DOMAINS, MONGO_DB_COLLECTIONS,
    COURSE_STATUS, COURSE_FIELDS_TO_SYNC, PING_URL} = config;
const REGISTER_SYNC_API_ENDPOINT = `${API_URL}/${EDGE_NODE_REGISTRATION_PATH}`;
const SYNC_TO_ADOBE_API_ENDPOINT = `${API_URL}/${SYNC_TO_ADOBE_PATH}`;
const DB_FETCH_LIMIT = 25;

const COLLECTION_FILTERS = {
    USERS: ['userId'],
    USER_COURSES: ['userId', 'courseId'],
    COURSES: ['courseId']
};
const DB_STATUS_CODE = {
    SUCCESS: 200,
    ERROR: 500
};

exports.start = () => {
    const job = cron.schedule("* * * * *", async () => {
        console.log('CRON JOB: Executing cron job');
        let isAPIAvailable = await checkAPIGatewayAvailability();
        console.log(`CRON JOB: API gateway available: ${isAPIAvailable}`);
        if(isAPIAvailable) {
            console.log('CRON JOB: API gateway is available. Doing the sync process');
            await doCloudToEdgeSync();
            await doEdgeToCloudSync();
        }
    });

    try {
        console.log('CRON JOB: Starting cron job');
        job.start();
        console.log('CRON JOB: Cron job started successfully');
    } catch (e) {
        console.log(`CRON JOB: ${Date.now()} Unable to start cron job. Error: ${e.message}`);
    }
}

async function checkAPIGatewayAvailability() {
    try {
        await axios.get(PING_URL);
        console.log(`CRON JOB: API gateway available now. Initiating the sync process at ${Date.now()}`);
        return true;
    } catch (e) {
        return false;
    }
}

async function getRemoteNodeData() {
    let response = await KeyValue.find({key: {$in: [IMO_KEY, NODE_ID_KEY, C2E_STATUS_KEY, E2C_STATUS_KEY]}});
    let keyValues = _.chain(response).keyBy('key').mapValues('value').value();
    let imo = _.get(keyValues, IMO_KEY);
    let nodeId = _.get(keyValues, NODE_ID_KEY);
    if(_.isEmpty(imo) || _.isEmpty(nodeId)) {
        throw new Error(`ERROR: IMO or NodeId is not set. IMO: ${imo}. NodeId: ${nodeId}`);
    }
    let c2eSyncStatus = _.get(keyValues, `${C2E_STATUS_KEY}.${SYNC_DATA_POINTS.SYNC_STATUS}`);
    let e2cSyncStatus = _.get(keyValues, E2C_STATUS_KEY);
    return {imo, nodeId, c2eSyncStatus, e2cSyncStatus};
}

async function getEdgeData(IMO, remoteNodeId) {
    let apiResponse = null;
    try {
        console.log(`CRON JOB: getEdgeData. Registering remote node: IMO${IMO}. remoteNodeId: ${remoteNodeId}`);
        apiResponse = await axios.post(REGISTER_SYNC_API_ENDPOINT, {IMO, remoteNodeId}, {headers: {'x-api-key': config.SYNC_API_KEY}});
    } catch (e) {
        throw new Error(`Api error: "${_.get(e, 'response.data.error', e.message)}" for IMO: ${IMO} and nodeId: ${remoteNodeId}`);
    }
    let {users, userEnrollments, courses} = _.get(apiResponse, 'data');
    console.log(`CRON JOB: getEdgeData. Got data: users${_.size(users)}. userEnrollments: ${_.size(userEnrollments)}. courses: ${_.size(courses)}`);
    if(_.isEmpty(users) || _.isEmpty(userEnrollments) || _.isEmpty(courses)) {
        throw new Error(`Data not setup correctly in cloud. Users size: ${_.size(users)}. UserEnrollments size: ${_.size(userEnrollments)}. Courses size: ${_.size(courses)}.`);
    }
    return {users, userEnrollments, courses};
}

async function upsertDocuments(documents, collection, queryFields) {
    documents = _.map(documents, doc => {
        return {updateOne: { filter: _.pick(doc, queryFields), update: {$set: doc}, upsert: true}}
    });
    let response = await MongoDBManager.execute({action: 'bulkWrite', db: 'olg', collection, documents});
    let statusCode = _.get(response, 'statusCode');
    if(statusCode === DB_STATUS_CODE.ERROR) {
        let body = _.get(response, 'body');
        throw new Error(`Error while inserting data: ${body} for collection: ${collection}`);
    }
}

async function loadCloudDataIntoEdge(users, userEnrollments, courses) {
    console.log(`CRON JOB: loadCloudDataIntoEdge. Loading data: users${_.size(users)}. userEnrollments: ${_.size(userEnrollments)}. courses: ${_.size(courses)}`);
    users = _.map(users, user => {
        user.domains = DEFAULT_USER_DOMAINS;
        return user;
    });
    await upsertDocuments(users, MONGO_DB_COLLECTIONS.USERS, COLLECTION_FILTERS.USERS);
    console.log(`CRON JOB: loadCloudDataIntoEdge. Finished uploading users`);
    await upsertDocuments(userEnrollments, MONGO_DB_COLLECTIONS.USER_COURSES, COLLECTION_FILTERS.USER_COURSES);
    console.log(`CRON JOB: loadCloudDataIntoEdge. Finished uploading user enrollments`);
    await upsertDocuments(courses, MONGO_DB_COLLECTIONS.COURSES, COLLECTION_FILTERS.COURSES);
    console.log(`CRON JOB: loadCloudDataIntoEdge. Finished uploading courses`);
}

async function logCloudToEdgeStatus(error) {
    console.log(`CRON JOB: logCloudToEdgeStatus. Error if any: ${error}`);
    try {
        let cloudToEdgeStatus = {};
        cloudToEdgeStatus[SYNC_DATA_POINTS.SYNC_TIME] = Date.now();
        cloudToEdgeStatus[SYNC_DATA_POINTS.SYNC_STATUS] = error ? SYNC_STATUSES.ERROR : SYNC_STATUSES.DONE;
        cloudToEdgeStatus[SYNC_DATA_POINTS.SYNC_MSG] = error ? error : `Successfully synced data between cloud and edge at ${Date.now()}`;
        console.log(`CRON JOB: logCloudToEdgeStatus. cloudToEdgeStatus: ${JSON.stringify(cloudToEdgeStatus)}`);
        await KeyValue.updateOne({key: C2E_STATUS_KEY}, {$set: {value: cloudToEdgeStatus}}, {upsert: true});
    } catch (e) {
        console.log(`CRON JOB: Error occurred when logging CloudToEdgeStatus. Error message: ${e.message}`);
    }
}
async function doCloudToEdgeSync() {
    try {
        let {imo, nodeId, c2eSyncStatus} = await getRemoteNodeData();
        console.log(`CRON JOB: Starting CloudToEdgeSync: imo${imo}. nodeId: ${nodeId}. c2eSyncStatus: ${c2eSyncStatus}`);
        console.log(`CRON JOB: CloudToEdgeSync. Status is ${c2eSyncStatus}. Starting sync process`);
        let {users, userEnrollments, courses} = await getEdgeData(imo, nodeId);
        console.log(`CRON JOB: CloudToEdgeSync. Got data: users${_.size(users)}. userEnrollments: ${_.size(userEnrollments)}. courses: ${_.size(courses)}`);
        await loadCloudDataIntoEdge(users, userEnrollments, courses);
        console.log(`CRON JOB: CloudToEdgeSync. Finished loading edge data`);
        await logCloudToEdgeStatus();
        console.log(`CRON JOB: CloudToEdgeSync. Updated status.`);
        console.log(`CRON JOB: CloudToEdgeSync. Finished run successfully.`);
    } catch(e) {
        console.log(`CRON JOB: Error occurred when syncing data between cloud and edge. Error message: ${e.message}`);
        await logCloudToEdgeStatus(e.message);
    }
}

async function logEdgeToCloudSyncStatus({errorMessage, syncedRecordCount}) {
    console.log(`CRON JOB: logEdgeToCloudSyncStatus. Error if any: ${errorMessage}. syncedRecordCount: ${syncedRecordCount}`);
    try {
        let edgeToCloudStatus = {};
        edgeToCloudStatus[SYNC_DATA_POINTS.SYNC_TIME] = Date.now();
        edgeToCloudStatus[SYNC_DATA_POINTS.SYNC_STATUS] = errorMessage ? SYNC_STATUSES.ERROR : SYNC_STATUSES.DONE;
        edgeToCloudStatus[SYNC_DATA_POINTS.SYNC_MSG] = errorMessage ? errorMessage : `Successfully synced data between edge and cloud`;
        edgeToCloudStatus[SYNC_DATA_POINTS.SYNC_STATS] = {syncedRecordCount};
        console.log(`CRON JOB: logEdgeToCloudSyncStatus. edgeToCloudStatus: ${JSON.stringify(edgeToCloudStatus)}`);
        await KeyValue.updateOne({key: E2C_STATUS_KEY}, {$set: {value: edgeToCloudStatus}}, {upsert: true});
    } catch (e) {
        console.log(`CRON JOB: Error occurred when logging EdgeToCloudSyncStatus. Error message: ${e.message}`);
    }
}

async function sendEdgeDataToCloud(IMO, remoteNodeId, userEnrollments) {
    try {
        console.log(`CRON JOB: sendEdgeDataToCloud. Sending userEnrollments to cloud: IMO: ${IMO}. remoteNodeId: ${remoteNodeId}. userEnrollments: ${_.size(userEnrollments)}`);
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
    console.log(`CRON JOB: Started: getUpdatedUserEnrollments. lastSyncTime: ${lastSyncTime}`);
    let query = {state: {$in : [COURSE_STATUS.COMPLETED, COURSE_STATUS.STARTED]}};
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
    console.log(`CRON JOB: Ended: getUpdatedUserEnrollments. lastSyncTime: ${lastSyncTime}`);
    return userEnrollments;
}

async function doEdgeToCloudSync() {
    console.log(`CRON JOB: Starting doEdgeToCloudSync`);
    try {
        let {imo, nodeId, e2cSyncStatus} = await getRemoteNodeData();
        console.log(`CRON JOB: doEdgeToCloudSync. Remote node data: imo${imo}. nodeId: ${nodeId}. e2cSyncStatus: ${e2cSyncStatus}`);
        let lastSyncTime = _.get(e2cSyncStatus, SYNC_DATA_POINTS.SYNC_TIME);
        console.log(`CRON JOB: doEdgeToCloudSync. lastSyncTime: ${lastSyncTime}`);
        let userEnrollments = await getUpdatedUserEnrollments(lastSyncTime);
        console.log(`CRON JOB: doEdgeToCloudSync. userEnrollments: ${_.size(userEnrollments)}`);
        if(_.isEmpty(userEnrollments)) {
            console.log(`CRON JOB: doEdgeToCloudSync. no userEnrollments updated since last run`);
            await logEdgeToCloudSyncStatus({syncedRecordCount: 0});
            return;
        }
        let chunks = _.chunk(userEnrollments, DB_FETCH_LIMIT);
        for(let i = 0; i < _.size(chunks); i++) {
            let chunk = chunks[i];
            console.log(`CRON JOB: doEdgeToCloudSync. Sending userEnrollments to cloud: chunk: ${i}. size: ${_.size(chunk)}`);
            await sendEdgeDataToCloud(imo, nodeId, chunk);
        }
        console.log(`CRON JOB: doEdgeToCloudSync. Completed sync. syncedRecordCount: ${_.size(userEnrollments)}`);
        await logEdgeToCloudSyncStatus({syncedRecordCount: _.size(userEnrollments)});
    } catch(e) {
        console.log(`CRON JOB: Error occurred when syncing data between cloud and edge. Error message: ${e.message}`);
        await logEdgeToCloudSyncStatus({errorMessage: e.message});
    }
}