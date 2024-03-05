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

async function getCatalogCourseIds() {
    let response = await queryDB({
        collection: COLLECTIONS.CATALOG,
        query: {},
        limit: 100,
        projection: {projection: {id: 1, courseIds: 1, '_id': 0}},
    });

    return state._(response).map('courseIds').flatten().uniq().sort().value();
}

async function getCoursesForPage(coursesIdsForCurPage) {
    return await queryDB({collection: COLLECTIONS.COURSES, limit: COURSES_PAGE_SIZE, query: {courseId: {$in: coursesIdsForCurPage}}});
}
async function getCourses(curPageNumber = 0) {
    let catalogCourseIds = await getCatalogCourseIds();
    let coursesIdsForCurPage = state._(catalogCourseIds).drop(curPageNumber * COURSES_PAGE_SIZE).take(COURSES_PAGE_SIZE).value();
    let courses = await getCoursesForPage(coursesIdsForCurPage);
    let nextPageNumber = state._.size(coursesIdsForCurPage) < COURSES_PAGE_SIZE ? 0 : (curPageNumber + 1);
    return {courses, nextPageNumber};
}

export { syncCourses };
