const KeyValue = require("../app/models/keyvalue");
const _ = require("lodash");
const config = require("../config");
const axios = require("axios");
const MongoDBManager = require("../runtime/capabilities/MongoDBManager");

const {IMO_KEY, NODE_ID_KEY, C2E_STATUS_KEY, E2C_STATUS_KEY, SYNC_DATA_POINTS, COURSES_SYNC_STATUS_KEY, PING_URL} = config;

const DB_STATUS_CODE = {
    SUCCESS: 200,
    ERROR: 500
};

async function getKeyValues(keysToGet) {
    keysToGet = _.isArray(keysToGet) ? keysToGet : [keysToGet];
    let response = await KeyValue.find({key: {$in: keysToGet}});
    return _.chain(response).keyBy('key').mapValues('value').value();
}
async function getRemoteNodeData() {
    let keysToGet = [IMO_KEY, NODE_ID_KEY, C2E_STATUS_KEY, E2C_STATUS_KEY];
    let keyValues = await getKeyValues(keysToGet);
    let imo = _.get(keyValues, IMO_KEY);
    let nodeId = _.get(keyValues, NODE_ID_KEY);
    if(_.isEmpty(imo) || _.isEmpty(nodeId)) {
        throw new Error(`ERROR: IMO or NodeId is not set. IMO: ${imo}. NodeId: ${nodeId}`);
    }
    let c2eSyncStatus = _.get(keyValues, `${C2E_STATUS_KEY}.${SYNC_DATA_POINTS.SYNC_STATUS}`);
    let e2cSyncStatus = _.get(keyValues, E2C_STATUS_KEY);
    return {imo, nodeId, c2eSyncStatus, e2cSyncStatus};
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

async function upsertDocuments(documents, collection, queryFields) {
    if(_.isEmpty(documents)) {
        console.log(`CRON JOB: upsertDocuments. No data loaded into collection ${collection} because input is empty`);
        return;
    }
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

module.exports = {
    DB_STATUS_CODE,
    getKeyValues,
    getRemoteNodeData,
    checkAPIGatewayAvailability,
    upsertDocuments,
};