import { combineReducers } from "redux";
import userReducer from "./userReducer";
import chatsReducer from "./chatsReducer";
import contactsReducer from "./contactsReducer";
import channelsReducer from "./channelsReducer";
import catalogueReducer from "./catalogueReducer";
import spinnerReducer from "./spinnerReducer";
import loaderReducer from "./loaderReducer";
import modalReducer from "./modalReducer";
import notificationReducer from "./notificationReducer";
import filesReducer from "./filesReducer";
import phoneReducer from "./phoneReducer";
import offlineBannerReducer from "./offlineBannerReducer";
import selectedDomainReducer from "./selectedDomainReducer";
import domainReducer from "./domainReducer";
import appNotificationsReducer from "./appNotificationsReducer";
import appNavigationBarStatusReducer from "./appNavigationBarStatusReducer";
import profileImagesReducer from "./profileImagesReducer";
import v2Store from "../../v2/Store/index";

const rootReducer = combineReducers({
	user: userReducer,
	domains: domainReducer,
	selectedDomain: selectedDomainReducer,
	chats: chatsReducer,
	contacts: contactsReducer,
	channels: channelsReducer,
	catalogue: catalogueReducer,
	spinner: spinnerReducer,
	loader: loaderReducer,
	modal: modalReducer,
	notification: notificationReducer,
	files: filesReducer,
	phone: phoneReducer,
	offlineBanner: offlineBannerReducer,
	appNotification: appNotificationsReducer,
	appNavBarStatus: appNavigationBarStatusReducer,
	profileImages: profileImagesReducer,
	v2: v2Store,
});
export default rootReducer;
