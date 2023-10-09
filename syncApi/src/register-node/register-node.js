import {state} from "frontm.js/core/State";
import {D} from "frontm.js/core/State";
import {Intent} from "frontm.js/core/Intent";
import {DB} from "frontm.js/core/DB";
let db = new DB(state);

const REGISTER_NODE = 'registerNode';
const COLLECTIONS = {
    CREW: 'crews_olg',
    USER_COURSES: 'userCourses_olg',
    COURSES: 'courses_olg',
    REMOTE_NODES: 'remoteNodes_olg'
};
const DB_STATUS_CODE = {
    SUCCESS: 200,
    ERROR: 500
};

let registerNode = new Intent(REGISTER_NODE, state);
registerNode.runOnCloud();
registerNode.onMatching = () => state.messageFromUser.intentId === REGISTER_NODE;
registerNode.onResolution = async () => {
    D.log({ message: "In registerNode.onResolution", data: state.messageFromUser });

    try {
        let inputFromApi = JSON.parse(state._.get(state, 'messageFromUser.body'));
        D.log({ message: "Input from API", data: inputFromApi });
        await validateInput(inputFromApi);
        let response = await processRemoteNodeRequest(inputFromApi);
        state.api.sendResponse({ code: 200, response});
    } catch (e) {
        D.log({ message: "Error in registerNode API", data: e.message })
        state.api.sendResponse({ code: 500, response: { errorMessage: e.message } });
    }
};

async function queryDB(collection, query) {
    let response = await db.getDataFromCollection({collection, query, projection: { projection: {"_id": 0}}});
    let body = state._.get(response, 'body');
    let statusCode = state._.get(response, 'statusCode');
    if(statusCode === DB_STATUS_CODE.ERROR) {
        D.log({ message: "Error while querying data", data: {error: body, collection, query} });
        throw new Error(body);
    }
    return body;
}
async function validateInput(input) {
    let {IMO, remoteNodeId} = input;
    if (state._.isEmpty(IMO)) {
        throw new Error("Missing IMO");
    }
    if (state._.isEmpty(remoteNodeId)) {
        throw new Error("Missing remoteNodeId");
    }

    let body = await queryDB(COLLECTIONS.REMOTE_NODES, {IMO});
    if(!state._.isEmpty(body) && state._.get(body, '[0].remoteNodeId') !== remoteNodeId) {
        throw new Error(`IMO: ${IMO} is mapped to a different remoteNodeId`);
    }
    body = await queryDB(COLLECTIONS.REMOTE_NODES, {remoteNodeId});
    if(!state._.isEmpty(body) && state._.get(body, '[0].IMO') !== IMO) {
        throw new Error(`remoteNodeId: ${remoteNodeId} is mapped to a different IMO`);
    }
}

async function getUsers(imo) {
    let body = await queryDB(COLLECTIONS.CREW, {vesselImo: imo});
    if(state._.isEmpty(body)) {
        let errorMessage = `No users exist for the IMO: ${imo}`;
        D.log({ message: errorMessage, data: {error: body, imo} });
        throw new Error(errorMessage);
    }
    return body;
}

async function getUserEnrollments(users) {
    let allUserEnrollments = [];
    for(let i = 0; i < state._.size(users); i++) {
        let user = state._.get(users, `[${i}]`, null);
        if(user === null) {
            continue;
        }
        let userId = user.userId;
        let body = await queryDB(COLLECTIONS.USER_COURSES, { userId });
        if(state._.isEmpty(body)) {
            D.log({ message: `No courses exist for the userId: ${userId}`});
            continue;
        }
        allUserEnrollments = allUserEnrollments.concat(body);
    }
    return allUserEnrollments;
}

async function getCourses(userEnrollments) {
    let courseIds = state._.map(userEnrollments, 'courseId');
    courseIds = state._.uniq(courseIds);
    let chunks = state._.chunk(courseIds, 20);
    let courses = [];
    for(let i = 0; i < state._.size(chunks); i++) {
        let chunk = chunks[i];
        let body = await queryDB(COLLECTIONS.COURSES, { courseId: {$in: chunk} });
        courses = courses.concat(body);
    }
    return courses;
}

async function registerNewRemoteNode(IMO, remoteNodeId) {
    let response = await db.updateDataInCollection({
        collection: COLLECTIONS.REMOTE_NODES,
        document: {IMO, remoteNodeId, registerDate: Date.now()},
        query: {IMO, remoteNodeId},
        options: {upsert: true}
    });
    let statusCode = state._.get(response, 'statusCode');
    let body = state._.get(response, 'body');
    if(statusCode === DB_STATUS_CODE.ERROR) {
        D.log({ message: "Error while registering remote node", data: {error: body, IMO, remoteNodeId} });
        throw new Error(body);
    }
}

async function getDataForRemoteNode(IMO) {
    let users = await getUsers(IMO);
    let userEnrollments = await getUserEnrollments(users);
    let courses = await getCourses(userEnrollments);
    return {users, userEnrollments, courses};
}

async function processRemoteNodeRequest(inputFromApi) {
    let {IMO, remoteNodeId} = inputFromApi;
    await registerNewRemoteNode(IMO, remoteNodeId);
    return await getDataForRemoteNode(IMO);
}

export { registerNode };