import {
	getDomainSelcted,
	getSelectedConversation,
} from "../../Services/StorageService";
import { initiateConversation } from "./chats";

export const SHOW_LOADER = "SHOW_LOADER";
export const HIDE_LOADER = "HIDE_LOADER";
export const BOT_WAIT_LOADER = "BOT_WAIT_LOADER";

export const showLoader = (title) => (dispatch, getState) => {
	let process = getState().loader.process;
	dispatch({ type: SHOW_LOADER, data: { process: [...process, title] } });
};

export const hideLoader = (title) => (dispatch, getState) => {
	let process = getState().loader.process;
	if (process.length) {
		var index = process.indexOf(title);
		if (index !== -1) {
			process.splice(index, 1);
		}
		if (!process.length) {
			if (getDomainSelcted().landingBotId !== "") {
				initiateConversation(getSelectedConversation());
			}
		}
		dispatch({ type: HIDE_LOADER, data: { process } });
	} else {
		dispatch({ type: HIDE_LOADER, data: { process: [] } });
	}
};

export const changeBotWaitLoader = (botWaitLoader) => (dispatch, getState) => {
	dispatch({ type: BOT_WAIT_LOADER, data: { botWaitLoader } });
};
