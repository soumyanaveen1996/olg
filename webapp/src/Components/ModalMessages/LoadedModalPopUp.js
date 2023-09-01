import React from "react";
import { connect } from "react-redux";
import ModalComponentProvider from "./ModalComponentProvider";
import ModalPopup from "./ModalPopup";

const LoadedModalPopUp = (props) => {
	let { title, size, close, modalProps, type } = props;

	if (!type) {
		return null;
	}

	return (
		<ModalPopup onClose={close} size={size} title={title}>
			<ModalComponentProvider
				modalType={type}
				modalProps={modalProps}
				cancel={close}
			/>
		</ModalPopup>
	);
};

function data(store) {
	let modal = store.modal;
	return {
		title: modal.title,
		size: modal.size,
		close: modal.close,
		modalProps: modal.modalProps,
		type: modal.type,
	};
}

export default connect(data)(LoadedModalPopUp);
