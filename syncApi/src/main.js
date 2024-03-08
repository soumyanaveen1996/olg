import { state, D } from "frontm.js/core/State"
import { Intent } from "frontm.js/core/Intent";
import {registerNode} from "./register-node/register-node"
import {syncToAdobe} from "./sync-to-adobe/sync-to-adobe"
import {syncCourses} from "./sync-courses/sync-courses"
state.onStart = async () => {
}

export let main = new Intent('main', state);
main.onResolution = async () => {
};
