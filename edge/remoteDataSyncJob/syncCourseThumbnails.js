const _ = require("lodash");
const axios = require("axios");
const fs = require('fs');
const config = require("../config");
const MongoDBManager = require("../runtime/capabilities/MongoDBManager");
const {DB_STATUS_CODE, getRemoteNodeData} = require("./jobUtils");
const {MONGO_DB_COLLECTIONS, SIGNED_URLS_PATH, API_URL, THUMBNAIL_PATH} = config;
const SIGNED_URLS_ENDPOINT = `${API_URL}/${SIGNED_URLS_PATH}`;
const DB_FETCH_LIMIT = 10;
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

async function getCourseIdsWithoutThumbnails() {
    let thirtyDaysAgo = Date.now() - THIRTY_DAYS_MS;
    let response = await MongoDBManager.execute({
        action: 'query',
        db: 'olg',
        collection: MONGO_DB_COLLECTIONS.COURSES,
        query: {$and: [
                { s3ThumbnailDownloadDate: {$exists: true} },
                {$or: [
                        { lmsThumbnailDownloadDate: {$exists: false} },
                        { lmsThumbnailDownloadDate: {$lte: thirtyDaysAgo} }
                    ]}
            ]},
        projection: {projection: {courseId: 1, '_id': 0}}, skip: 0, limit: DB_FETCH_LIMIT
    });
    let body = _.get(response, 'body');
    let statusCode = _.get(response, 'statusCode');
    if(statusCode === DB_STATUS_CODE.ERROR) {
        throw new Error(body);
    }
    return _(body).map('courseId').sort().value();
}

async function getSignedUrls(IMO, remoteNodeId, courseIds) {
    let apiResponse = null;
    try {
        console.log(`CRON JOB: getSignedUrls. Sending remote node: IMO${IMO}. remoteNodeId: ${remoteNodeId}. courseIds: ${courseIds}`);
        apiResponse = await axios.post(SIGNED_URLS_ENDPOINT, {IMO, remoteNodeId, courseIds}, {headers: {'x-api-key': config.SYNC_API_KEY}});
    } catch (e) {
        throw new Error(`Api error: "${_.get(e, 'response.data.error', e.message)}" for IMO: ${IMO} and nodeId: ${remoteNodeId}`);
    }

    let courseIdUrls = _.get(apiResponse, 'data.signedUrls');
    console.log(`CRON JOB: doCoursesSync. Got data: courses: ${_.size(courseIdUrls)}`);
    return courseIdUrls;
}

async function downloadThumbnailImage(courseId, signedUrl) {
    const response = await axios.get(signedUrl, { responseType: 'arraybuffer' });
    let fileName = THUMBNAIL_PATH.replace('{courseId}', courseId);
    await fs.writeFileSync(fileName, response.data);
}
async function doThumbnailsSync() {
    try {
        let courseIds = await getCourseIdsWithoutThumbnails();
        if(_.isEmpty(courseIds)) {
            console.log('No thumbnails to download');
            return;
        }

        let {imo, nodeId} = await getRemoteNodeData();
        let courseIdUrls = await getSignedUrls(imo, nodeId, courseIds);
        let documents = [];
        for(let i = 0; i < _.size(courseIdUrls); i++) {
            let courseId = _.get(courseIdUrls, `[${i}].courseId`);
            let signedUrl = _.get(courseIdUrls, `[${i}].signedUrl`);
            if(_.isEmpty(courseId) || _.isEmpty(signedUrl)) {
                continue;
            }
            await downloadThumbnailImage(courseId, signedUrl);
            documents.push({updateOne: { filter: {courseId}, update: {$set: {lmsThumbnailDownloadDate: Date.now()}}}});
        }
        await MongoDBManager.execute({action: 'bulkWrite', db: 'olg', collection: MONGO_DB_COLLECTIONS.COURSES, documents});
    } catch(e) {
        console.log(`CRON JOB: ThumbnailsSync. Error occurred while syncing course thumbnails. Error message: ${e.message}`);
    }
}

exports.doThumbnailsSync = doThumbnailsSync;