import PropTypes from "prop-types";
import { toast } from "react-toastify";

let open = false;

function getOnClose(close) {
	return () => {
		open = false;
		if (close) {
			close();
		}
	};
}

const Toast = ({ type, message, onClose = null, autoClose = 5000 }) => {
	onClose = getOnClose(onClose);

	if (!open) {
		open = true;
		switch (type) {
			case "error":
				toast.error(message, {
					position: toast.POSITION.TOP_CENTER,
					onClose: onClose,
					autoClose,
				});
				break;
			case "warning":
				toast.warning(message, {
					position: toast.POSITION.TOP_CENTER,
					onClose: onClose,
					autoClose,
				});
				break;
			case "info":
				toast.info(message, {
					position: toast.POSITION.TOP_CENTER,
					onClose: onClose,
					autoClose,
				});
				break;
			case "success":
				toast.success(message, {
					position: toast.POSITION.TOP_CENTER,
					onClose: onClose,
					autoClose,
				});
				break;
			default:
				toast(message, {
					position: toast.POSITION.TOP_CENTER,
					onClose: onClose,
					autoClose,
				});
		}
	}
};

Toast.propTypes = {
	type: PropTypes.string.isRequired,
	message: PropTypes.string.isRequired,
	onClose: PropTypes.func,
	autoClose: PropTypes.number,
};
export default Toast;
