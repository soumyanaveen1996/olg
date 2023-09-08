import { combineReducers } from "redux";
import NonConversationalReducer from "../Containers/NonConversational/Store/NonConversationalReducer";
import { NonConversationalFilterReducer } from "./NonConversationalFilter/NonConversationalFilterRedux";
import {
	SnackbarReducer,
	NotificationReducer,
	CallNotificationReducer,
} from "./Notification/NotificationRedux";

const v2Store = combineReducers({
	NonConversational: NonConversationalReducer,
	Snackbar: SnackbarReducer,
	Notification: NotificationReducer,
	CallNotification: CallNotificationReducer,
	NonConversationalFilter: NonConversationalFilterReducer,
});

export default v2Store;
