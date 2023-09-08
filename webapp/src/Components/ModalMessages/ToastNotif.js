import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import store from "../../State/configureStore";
import { addAppNotification } from "../../State/actions/appNotifications";
import { BANNER_TYPE_ERROR, BANNER_TYPE_INFO } from "../../Utils/Constants";

const Notify = ({ type, message }) => {
	const isOnline = useSelector((state) => state.user.isOnline);
	const dispatch = useDispatch();

	if (isOnline) {
		switch (type) {
			case "error":
				dispatch(addAppNotification(message, BANNER_TYPE_ERROR));
				break;
			case "warning":
				dispatch(addAppNotification(message, BANNER_TYPE_INFO));
				break;
			case "info":
				dispatch(addAppNotification(message, BANNER_TYPE_INFO));
				break;
			case "success":
				dispatch(addAppNotification(message, BANNER_TYPE_INFO));
				break;
			default:
				dispatch(addAppNotification(message, BANNER_TYPE_INFO));
		}
	}
};

const NotifyClassComp = ({ type, message }) => {
	const isOnline = store.getState().user.isOnline;

	if (isOnline) {
		switch (type) {
			case "error":
				store.dispatch(addAppNotification(message, BANNER_TYPE_ERROR));
				break;
			case "warning":
				store.dispatch(addAppNotification(message, BANNER_TYPE_INFO));
				break;
			case "info":
				store.dispatch(addAppNotification(message, BANNER_TYPE_INFO));
				break;
			case "success":
				store.dispatch(addAppNotification(message, BANNER_TYPE_INFO));
				break;
			default:
				store.dispatch(addAppNotification(message, BANNER_TYPE_INFO));
		}
	}
};

Notify.propTypes = {
	type: PropTypes.string.isRequired,
	message: PropTypes.string.isRequired,
};

export { NotifyClassComp };
export default Notify;
