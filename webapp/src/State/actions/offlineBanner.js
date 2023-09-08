export const BANNER_VISIBILITY = "SHOW_VISIBILITY";
export const SET_COUNTER = "SET_COUNTER";
export const SET_LAST_CALL = "SET_LAST_CALL";
export function setBannerVisibility(visibility) {
	return (dispatch) => {
		return new Promise((resolve, reject) => {
			dispatch({
				type: BANNER_VISIBILITY,
				data: visibility,
			});
			resolve();
		});
	};
}

export function setCounter(value) {
	return (dispatch) => {
		return new Promise((resolve, reject) => {
			dispatch({
				type: SET_COUNTER,
				data: value,
			});
			resolve();
		});
	};
}

export function storeLatestCall(obj) {
	return (dispatch) => {
		return new Promise((resolve, reject) => {
			dispatch({
				type: SET_LAST_CALL,
				data: obj,
			});
			resolve();
		});
	};
}
