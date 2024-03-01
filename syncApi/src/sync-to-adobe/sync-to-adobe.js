import {state, D} from "frontm.js/core/State";
import {Intent} from "frontm.js/core/Intent";
import {DB} from "frontm.js/core/DB";
let db = new DB(state);
import {FIELDS_TO_UPDATE, COLLECTIONS, DB_STATUS_CODE} from "../constants";
import {queryDB} from "../utils";

const SYNC_TO_ADOBE = 'syncToAdobe';
let syncToAdobe = new Intent(SYNC_TO_ADOBE, state);
syncToAdobe.runOnCloud();
syncToAdobe.onMatching = () => state.messageFromUser.intentId === SYNC_TO_ADOBE;
syncToAdobe.onResolution = async () => {
    D.log({ message: "In syncToAdobe.onResolution", data: state.messageFromUser });

    try {
        let inputFromApi = JSON.parse(state._.get(state, 'messageFromUser.body'));
        D.log({ message: "Input from API", data: inputFromApi });
        await validateInput(inputFromApi);
        await processRemoteData(inputFromApi);
        state.api.sendResponse({ code: 200});
    } catch (e) {
        D.log({ message: "Error in syncToAdobe API", data: e.message })
        state.api.sendResponse({ code: 500, response: { errorMessage: e.message } });
    }
};

async function validateInput(input) {
    let {IMO, remoteNodeId, userEnrollments} = input;
    if (state._.isEmpty(IMO)) {
        throw new Error("Missing IMO");
    }
    if (state._.isEmpty(remoteNodeId)) {
        throw new Error("Missing remoteNodeId");
    }
    if(state._.isEmpty(userEnrollments)) {
        throw new Error("Missing userEnrollments");
    }

    let body = await queryDB({collection: COLLECTIONS.REMOTE_NODES, query: {IMO, remoteNodeId}});
    if(state._.isEmpty(body)) {
        throw new Error(`Invalid input. IMO: ${IMO} and remoteNodeId: ${remoteNodeId}`);
    }
}

async function updateUserEnrollments(IMO, remoteNodeId, userEnrollments) {
    let documents = state._.map(userEnrollments, doc => {
        let docFieldsToUpdate = state._.pick(doc, FIELDS_TO_UPDATE);
        docFieldsToUpdate.edgeSyncDate = Date.now();
        return {updateOne: { filter: {userId: doc.userId, courseId: doc.courseId}, update: {$set: docFieldsToUpdate, $unset: {adobeSyncDate: 1}}}}
    });
    D.log({ message: "updateUserEnrollments", data: {documents} });
    let response = await db.bulkWriteToCollection({
        collection: COLLECTIONS.USER_COURSES,
        documents
    });
    D.log({ message: "updateUserEnrollments", data: {response} });
    let statusCode = state._.get(response, 'statusCode');
    let body = state._.get(response, 'body');
    if(statusCode === DB_STATUS_CODE.ERROR) {
        D.log({ message: "Error while updating user enrollments", data: {error: body, IMO, remoteNodeId} });
        throw new Error(body);
    }
}

async function updateSyncTime(IMO, remoteNodeId) {
    let response = await db.updateDataInCollection({
        collection: COLLECTIONS.REMOTE_NODES,
        document: {IMO, remoteNodeId, syncToAdobeDate: Date.now()},
        query: {IMO, remoteNodeId}
    });
    let statusCode = state._.get(response, 'statusCode');
    let body = state._.get(response, 'body');
    if(statusCode === DB_STATUS_CODE.ERROR) {
        D.log({ message: "Error while updating remote node sync time", data: {error: body, IMO, remoteNodeId} });
        throw new Error(body);
    }
}

async function processRemoteData(inputFromApi) {
    let {IMO, remoteNodeId, userEnrollments} = inputFromApi;
    await updateUserEnrollments(IMO, remoteNodeId, userEnrollments);
    await updateSyncTime(IMO, remoteNodeId);
}

export { syncToAdobe };