export const SHOW_MODAL = "SHOW_MODAL";
export const HIDE_MODAL = "HIDE_MODAL";

export function showModal(title, size, close, modalProps, type) {
	return {
		type: SHOW_MODAL,
		data: {
			title: title,
			size: size,
			close: close,
			modalProps: modalProps,
			type: type,
		},
	};
}

export function hideModal() {
	return { type: HIDE_MODAL };
}
