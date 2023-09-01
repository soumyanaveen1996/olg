import {
	SW_REGISTRATION_RECEIVED,
	PUSH_SUBSCRIPTION_STATUS_CHANGED,
	SET_DEVICE_ID,
} from "../actions/notification";
import { LOGOUT_USER } from "../actions/user";

let initialState = {
	swRegistration: null,
	isSubscribed: false,
	deviceId: null,
	// updateSWFlag: false,
	// installingWorkerInstance: null
};

function notificationReducer(state = initialState, action) {
	switch (action.type) {
		// case UPDATE_SW:
		//   const status = action.data;
		//   return {
		//     ...state,
		//     updateSWFlag: status
		//   };
		//
		// case UPDATE_INSTALLING_WORKER_INSTANCE:
		//   const instance = action.data;
		//   return {
		//     ...state,
		//     installingWorkerInstance: instance
		//   };

		case SW_REGISTRATION_RECEIVED:
			return { ...state, swRegistration: action.data.swRegistration };

		case PUSH_SUBSCRIPTION_STATUS_CHANGED:
			return {
				...state,
				isSubscribed: action.data.isSubscribed,
			};

		case SET_DEVICE_ID:
			return {
				...state,
				deviceId: action.data.deviceId,
			};

		case LOGOUT_USER:
			return { ...initialState };

		default:
			return state;
	}
}

export default notificationReducer;
