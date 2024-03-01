import {state, D} from "frontm.js/core/State";
import {Intent} from "frontm.js/core/Intent";
import {DB} from "frontm.js/core/DB";
let db = new DB(state);

import {COLLECTIONS} from "../constants";
import {queryDB} from "../utils";

const SYNC_ALL_COURSES = 'syncAllCourses';
const COURSES_PAGE_SIZE = 25;

let syncCourses = new Intent(SYNC_ALL_COURSES, state);
syncCourses.runOnCloud();
syncCourses.onMatching = () => state.messageFromUser.intentId === SYNC_ALL_COURSES;
syncCourses.onResolution = async () => {
    D.log({ message: "In syncAllCourses.onResolution", data: state.messageFromUser });

    try {
        let inputFromApi = JSON.parse(state._.get(state, 'messageFromUser.body'));
        D.log({ message: "Input from API", data: inputFromApi });
        await validateInput(inputFromApi);
        let response = await getCourses(state._.get(inputFromApi, 'nextPageNumber'));
        state.api.sendResponse({ code: 200, response});
    } catch (e) {
        D.log({ message: "Error in syncAllCourses API", data: e.message })
        state.api.sendResponse({ code: 500, response: { errorMessage: e.message } });
    }
};

async function validateInput(input) {
    let {IMO, remoteNodeId} = input;
    if (state._.isEmpty(IMO)) {
        throw new Error("Missing IMO");
    }
    if (state._.isEmpty(remoteNodeId)) {
        throw new Error("Missing remoteNodeId");
    }

    let body = await queryDB({collection: COLLECTIONS.REMOTE_NODES, query: {IMO, remoteNodeId}});
    if(state._.isEmpty(body)) {
        throw new Error(`Invalid input. IMO: ${IMO} and remoteNodeId: ${remoteNodeId}`);
    }
}

async function getCoursesForPage(pageNumber) {
    let skip = pageNumber * COURSES_PAGE_SIZE;
    return await queryDB({collection: COLLECTIONS.COURSES, limit: COURSES_PAGE_SIZE, skip});
}
async function getCourses(curPageNumber = 0) {
    let courses = await getCoursesForPage(curPageNumber);
    let nextPageNumber = state._.size(courses) < COURSES_PAGE_SIZE ? 0 : (curPageNumber + 1);
    return {courses, nextPageNumber};
}

export { syncCourses };
