import {state, D} from "frontm.js/core/State";
import {Intent} from "frontm.js/core/Intent";
import {COLLECTIONS, COURSE_LOCATION} from "../constants";
import {queryDB} from "../utils";
import { getSignedUrl } from "frontm.js/lib/surveys/utils";

const COURSE_THUMBNAILS = 'getSignedUrlForThumbnails';
const IMAGE_BUCKET = 'imageBucket';
const TEN_HOUR_SEC = 10 * 60 * 60;

let getSignedUrlForThumbnails = new Intent(COURSE_THUMBNAILS, state);
getSignedUrlForThumbnails.runOnCloud();
getSignedUrlForThumbnails.onMatching = () => state.messageFromUser.intentId === COURSE_THUMBNAILS;
getSignedUrlForThumbnails.onResolution = async () => {
    D.log({ message: "In getSignedUrlForThumbnails.onResolution", data: state.messageFromUser });

    try {
        let inputFromApi = JSON.parse(state._.get(state, 'messageFromUser.body'));
        D.log({ message: "Input from API", data: inputFromApi });
        await validateInput(inputFromApi);
        let signedUrls = await getSignedUrls(inputFromApi);
        state.api.sendResponse({ code: 200, response: signedUrls});
    } catch (e) {
        D.log({ message: "Error in getSignedUrlForThumbnails API", data: e.message })
        state.api.sendResponse({ code: 500, response: { errorMessage: e.message } });
    }
};

async function validateInput(input) {
    let {IMO, remoteNodeId, courseIds} = input;
    if (state._.isEmpty(IMO)) {
        throw new Error("Missing IMO");
    }
    if (state._.isEmpty(remoteNodeId)) {
        throw new Error("Missing remoteNodeId");
    }
    if(state._.isEmpty(courseIds)) {
        throw new Error("Missing courseIds");
    }
    let body = await queryDB({collection: COLLECTIONS.REMOTE_NODES, query: {IMO, remoteNodeId}});
    if(state._.isEmpty(body)) {
        throw new Error(`Invalid input. IMO: ${IMO} and remoteNodeId: ${remoteNodeId}`);
    }
}

async function getCoursesIdsFromDB(courseIds) {
    let data = await queryDB({
        collection: COLLECTIONS.COURSES,
        limit: state._.size(courseIds),
        query: { courseId: {$in: courseIds}, s3ThumbnailDownloadDate: {$exists: true} },
        projection: {projection: {courseId: 1}}
    });

    return state._.map(data, 'courseId');
}
async function getSignedUrls(inputFromApi) {
    let bucket = await state.getStaticData(IMAGE_BUCKET, false);

    let {courseIds} = inputFromApi;
    let dbCourseIds = await getCoursesIdsFromDB(courseIds);
    let courseIdUrls = [];
    state._.forEach(courseIds, courseId => {
        if(state._.indexOf(dbCourseIds, courseId) !== -1) {
            courseIdUrls.push({courseId, signedUrl: getSignedUrl(bucket, `${COURSE_LOCATION}/${courseId}.png`, TEN_HOUR_SEC)});
        }
    });
    return courseIdUrls;
}

export { getSignedUrlForThumbnails };