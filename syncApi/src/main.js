import { state, D } from "frontm.js/core/State"
import { Intent } from "frontm.js/core/Intent";
import {registerNode} from "./register-node/register-node"

state.onStart = async () => {
}

export let main = new Intent('main', state);
main.onResolution = async () => {
};
