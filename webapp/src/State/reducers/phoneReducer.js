import {
	HANG_UP_CALL,
	INCOMING_VOIP_CALL,
	MAKE_CALL,
	RESET_CALL_INFO,
} from "../actions/phone";
import { LOGOUT_USER } from "../actions/user";

let initialState = {
	type: null,
	from: null,
	to: null,
	toName: null,
	toUserId: null,
	fromUserId: null,
	localCall: null,
	diallerState: null,
	meetingId: null,
	videoEnabled: null,
};

function phoneReducer(state = initialState, action) {
	switch (action.type) {
		case MAKE_CALL: {
			let data = action.data;
			return {
				type: data.type,
				from: data.from,
				to: data.to,
				toName: data.toName,
				toUserId: data.toUserId,
				fromUserId: null,
				localCall: data.localCall,
				diallerState: data.diallerState,
				videoEnabled: data.videoEnabled,
			};
		}

		case INCOMING_VOIP_CALL: {
			let data = action.data;
			return {
				type: data.type,
				from: data.from,
				to: null,
				toName: null,
				toUserId: null,
				fromUserId: data.fromUserId,
				localCall: null,
				diallerState: "incoming",
				meetingId: data.meetingId,
				videoEnabled: data.videoEnabled,
			};
		}

		case HANG_UP_CALL: {
			//return initialState;
			return {
				type: null,
				from: null,
				to: null,
				toName: null,
				toUserId: null,
				fromUserId: null,
				localCall: null,
				meetingId: null,
				diallerState: "call-hung",
			};
		}
		case RESET_CALL_INFO:
			return initialState;

		case LOGOUT_USER:
			return { ...initialState };
		default:
			return state;
	}
}

export default phoneReducer;
