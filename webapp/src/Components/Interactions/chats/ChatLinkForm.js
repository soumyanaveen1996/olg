import React, { Component } from "react";
import FormContentThumb from "../content/forms/FormContentThumb";
import { connect } from "react-redux";
import ChatLinkSelfUI from "./ChatLinkSelfUI";
import ChatLinkOthersUI from "./ChatLinkOthersUI";
import {
	sendAMessage,
	setFormInPopup,
	setFormInWindow,
} from "../../../State/actions/chats";
class ChatLinkForm extends Component {
	render() {
		let { chat, conversation, self, background } = this.props;
		let ChatUI = self ? ChatLinkSelfUI : ChatLinkOthersUI;
		let completed =
			chat.completed || (chat.options && chat.options.stage === "COMPLETED");

		return (
			<ChatUI chat={chat} conversation={conversation}>
				<div
					style={{
						boxSizing: "border-box",
						width: "260px",
						border: "0.2px solid rgba(91,91,91,0.2)",
						borderRadius: "10px",
						backgroundColor: "#FFF",
						boxShadow: "0 0 4px 0 rgba(0,0,0,0.08)",
						margin: "7px 0",
					}}
				>
					<FormContentThumb
						chat={chat}
						completed={completed}
						background={background}
					/>
				</div>
			</ChatUI>
		);
	}
}

let actions = {
	sendMessage: sendAMessage,
	setFormInPopup: setFormInPopup,
	setFormInWindow,
};

export default connect(null, actions)(ChatLinkForm);
