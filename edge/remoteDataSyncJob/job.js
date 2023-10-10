let cron = require('node-cron');
const axios = require('axios');
const _ = require("lodash");
const KeyValue = require('../app/models/keyvalue');
const MongoDBManager = require('../runtime/capabilities/MongoDBManager');

const config = require('../config');
const {IMO_KEY, NODE_ID_KEY, C2E_STATUS_KEY, SYNC_DATA_POINTS,
    SYNC_STATUSES, API_URL, EDGE_NODE_REGISTRATION_PATH,
    DEFAULT_USER_DOMAINS, MONGO_DB_COLLECTIONS} = config;
const REGISTER_SYNC_API_ENDPOINT = `${API_URL}/${EDGE_NODE_REGISTRATION_PATH}`;

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
        await doCloudToEdgeSync();
        await doEdgeToCloudSync();
    });

    job.start();
}

async function getRemoteNodeData() {
    let response = await KeyValue.find({key: {$in: [IMO_KEY, NODE_ID_KEY, C2E_STATUS_KEY]}});
    let keyValues = _.chain(response).keyBy('key').mapValues('value').value();
    let imo = _.get(keyValues, IMO_KEY);
    let nodeId = _.get(keyValues, NODE_ID_KEY);
    if(_.isEmpty(imo) || _.isEmpty(nodeId)) {
        throw new Error(`ERROR: IMO or NodeId is not set. IMO: ${imo}. NodeId: ${nodeId}`);
    }
    let c2eSyncStatus = _.get(keyValues, `${C2E_STATUS_KEY}.${SYNC_DATA_POINTS.SYNC_STATUS}`);
    return {imo, nodeId, c2eSyncStatus};
}

async function getEdgeData(IMO, remoteNodeId) {
    let apiResponse = null;
    try {
        apiResponse = await axios.post(REGISTER_SYNC_API_ENDPOINT, {IMO, remoteNodeId}, {headers: {'x-api-key': config.SYNC_API_KEY}});
    } catch (e) {
        throw new Error(`Api error: "${_.get(e, 'response.data.error', e.message)}" for IMO: ${IMO} and nodeId: ${remoteNodeId}`);
    }
    let {users, userEnrollments, courses} = _.get(apiResponse, 'data');
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
    users = _.map(users, user => {
        user.domains = DEFAULT_USER_DOMAINS;
        return user;
    });
    await upsertDocuments(users, MONGO_DB_COLLECTIONS.USERS, COLLECTION_FILTERS.USERS);
    await upsertDocuments(userEnrollments, MONGO_DB_COLLECTIONS.USER_COURSES, COLLECTION_FILTERS.USER_COURSES);
    await upsertDocuments(courses, MONGO_DB_COLLECTIONS.COURSES, COLLECTION_FILTERS.COURSES);
}

async function logCloudToEdgeStatus(error) {
    let cloudToEdgeStatus = {};
    cloudToEdgeStatus[SYNC_DATA_POINTS.SYNC_TIME] = Date.now();
    cloudToEdgeStatus[SYNC_DATA_POINTS.SYNC_STATUS] = error ? SYNC_STATUSES.PENDING : SYNC_STATUSES.DONE;
    cloudToEdgeStatus[SYNC_DATA_POINTS.SYNC_MSG] = error ? error : `Successfully synced data between cloud and edge at ${Date.now()}`;
    await KeyValue.updateOne({key: C2E_STATUS_KEY}, {$set: {value: cloudToEdgeStatus}}, {upsert: true});
}
async function doCloudToEdgeSync() {
    try {
        let {imo, nodeId, c2eSyncStatus} = await getRemoteNodeData();
        if(c2eSyncStatus !== SYNC_STATUSES.PENDING) {
            return;
        }
        let {users, userEnrollments, courses} = await getEdgeData(imo, nodeId);
        await loadCloudDataIntoEdge(users, userEnrollments, courses);
        await logCloudToEdgeStatus();
    } catch(e) {
        console.log(`Error occurred when syncing data between cloud and edge. Error message: ${e.message}`);
        await logCloudToEdgeStatus(e.message);
    }
}

async function logEdgeToCloudStatus(error) {
    let edgeToCloudStatus = {};
    edgeToCloudStatus[SYNC_DATA_POINTS.SYNC_TIME] = Date.now();
    edgeToCloudStatus[SYNC_DATA_POINTS.SYNC_MSG] = error ? error : `Successfully synced data between edge and Cloud`;
    await KeyValue.updateOne({key: C2E_STATUS_KEY}, {$set: {value: edgeToCloudStatus}}, {upsert: true});
}
async function doEdgeToCloudSync() {
    // try {
    //     let {imo, nodeId} = await getRemoteNodeData();
    //     let deltaUserProgress = await getDeltaUserProgress();
    //     await sendEdgeDataToCloud(imo, nodeId, deltaUserProgress);
    //     await logEdgeToCloudStatus();
    // } catch(e) {
    //     console.log(`Error occurred when syncing data between cloud and edge. Error message: ${e.message}`);
    //     await logEdgeToCloudStatus(e.message);
    // }
}