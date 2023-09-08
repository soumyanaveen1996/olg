import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { MessageTypeConstants } from "../../Services/Message";
import ModalPopup from "../ModalMessages/ModalPopup";
import FormContentView from "./content/forms/FormContentView";
import { getFormTitle } from "./content/forms/Utils";
import {
	sendAMessage,
	setFormInPopup,
	setFormInWindow,
	resetSelectedConversationFormInWindow,
	removeGenericErrorMsg,
} from "../../State/actions/chats";

import { removeOpenForm } from "../../Services/StorageService";

class FormMessagePopUp extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
		this.formContentView = React.createRef();
	}

	closeForm = () => {
		// this.setState({ showFormContent: false });
		removeOpenForm();
		this.props.setFormInPopup(null);
	};

	cancelForm = () => {
		console.log("all props ===== ", this.props);

		this.closeForm();
		const chat = this.props.formInPopup;
		let completed =
			chat.completed || (chat.options && chat.options.stage === "COMPLETED");
		this.props.setFormInPopup(null);
		if (!completed) {
			// let { chat } = this.formContentView.current.props;
			let responseChat = {};
			// const { fields } = this.formContentView.current.state;
			let options = chat.options || {};
			// options.stage = "OPENED";
			// responseChat.fields = JSON.parse(JSON.stringify(fields));
			// responseChat.options = options;
			responseChat.message = { action: "cancel", formId: options.formId };
			responseChat.messageType =
				MessageTypeConstants.MESSAGE_TYPE_FORM_RESPONSE;
			this.props.sendMessage(responseChat, true, null);
		}
	};

	render() {
		const chat = this.props.formInPopup;
		if (!chat) {
			return null;
		}

		// let that = this;

		return (
			<ModalPopup
				onClose={() => {
					this.cancelForm();
				}}
				size="sm"
				title={getFormTitle(chat.message, chat.options)}
			>
				<FormContentView
					chat={chat}
					completed={this.props.completed}
					cancelForm={() => {
						this.cancelForm();
					}}
					closeForm={this.closeForm}
					sendMessage={this.props.sendMessage}
					// ref={this.formContentView}
					setFormInPopup-={this.props.setFormInPopup}
					resetSelectedConversationFormInWindow={
						this.props.resetSelectedConversationFormInWindow
					}
					setFormInWindow={this.props.setFormInWindow}
					removeGenericErrorMsg={this.props.removeGenericErrorMsg}
				/>
			</ModalPopup>
		);
	}
}

const mapDataToProps = (state) => {
	return {
		formInPopup: state.chats.formInPopup,
		resetSelectedConversationFormInWindow,
		removeGenericErrorMsg,
	};
};

let actions = {
	sendMessage: sendAMessage,
	setFormInPopup: setFormInPopup,
	setFormInWindow,
};

export default connect(mapDataToProps, actions)(FormMessagePopUp);
