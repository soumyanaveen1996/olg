import { findVOIPCallerName } from "../../Components/Telephony/Utils";
import { startRingCallCenter } from "../../v2/Store/Notification/NotificationAction";
import { parseMessages } from "./chats";

export const MAKE_CALL = "MAKE_CALL";
export const RESET_CALL_INFO = "RESET_CALL_INFO";
export const INCOMING_VOIP_CALL = "INCOMING_VOIP_CALL";
export const HANG_UP_CALL = "HANG_UP_CALL";

export function makeCall(
	type,
	from,
	to,
	toName,
	toUserId,
	localCall,
	diallerState,
	videoEnabled
) {
	return {
		type: MAKE_CALL,
		data: {
			type,
			from,
			to,
			toName,
			toUserId,
			localCall,
			diallerState,
			videoEnabled,
		},
	};
}

export function incomingVoipCall(rawMessage) {
	return (dispatch, getState) => {
		let parsed_message = parseMessages(rawMessage);
		console.log("parsed_message ==>", parsed_message);
		let messageDetails = parsed_message[0];
		let allContacts = getState().contacts.accepted;
		let callerName = findVOIPCallerName(
			allContacts || [],
			messageDetails.message.callerUserId
		);

		if (messageDetails && messageDetails.message) {
			if (messageDetails.message.botId) {
				console.log("dispatch another this");
			} else {
				dispatch({
					type: INCOMING_VOIP_CALL,
					data: {
						type: "voip",
						from: callerName,
						fromUserId: messageDetails.message.callerUserId,
						diallerState: "incoming",
						meetingId: messageDetails.message.videoSessionId,
						videoEnabled: messageDetails.message.video,
					},
				});
			}
		}
	};
}

export function hangupCall(rawMessage) {
	return (dispatch) => {
		let parsed_message = parseMessages(rawMessage);
		let messageDetails = parsed_message[0];
		// console.log("on end call ===>>", messageDetails, getState());
		// 	if (
		// 		messageDetails.message.video &&
		// 		messageDetails.message.callAction === "CallEnd"
		// 	)
		if (messageDetails.message.callAction === "CallEnd") {
			if (messageDetails.message.botId) {
				console.log("dispatch another this on call end");
				// dispatch(startRingCallCenter(messageDetails.message.botId));
			} else {
				//Call summary popup will get called if we dispatch the action present below
				dispatch({
					type: HANG_UP_CALL,
				});
			}
		}
	};
}

export function resetCallInfo() {
	return {
		type: RESET_CALL_INFO,
	};
}
