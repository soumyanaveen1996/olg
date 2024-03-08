import {state, D} from "frontm.js/core/State";
import {DB} from "frontm.js/core/DB";
let db = new DB(state);
import {DB_STATUS_CODE} from './constants';
async function queryDB({collection, query, limit, skip, projection = { projection: {"_id": 0}}}) {
    let response = await db.getDataFromCollection({collection, query, limit, skip, projection});
    let body = state._.get(response, 'body');
    let statusCode = state._.get(response, 'statusCode');
    if(statusCode === DB_STATUS_CODE.ERROR) {
        D.log({ message: "Error while querying data", data: {error: body, collection, query, limit, skip} });
        throw new Error(body);
    }
    return body;
}

export {
    queryDB
};