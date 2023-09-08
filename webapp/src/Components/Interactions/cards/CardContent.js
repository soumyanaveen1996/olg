import React, { Component } from "react";
import CardMessage from "./CardMessage";
import ChatLinkSelfUI from "../chats/ChatLinkSelfUI";
import ChatLinkOthersUI from "../chats/ChatLinkOthersUI";
import { sendAMessage } from "../../../State/actions/chats";
import { connect } from "react-redux";
import { hideModal, showModal } from "../../../State/actions/modal";
import ConversationalHTMLCard from "./ConversationalHTMLCard";
class CardContent extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {}
	render() {
		let { chat, self, conversation, isContentShown } = this.props;
		let ChatUI = self ? ChatLinkSelfUI : ChatLinkOthersUI;
		const { options } = chat;
		let cardMessage = null;
		if (options && options.type === "html") {
			cardMessage = chat.message.map((cm, index) => {
				return (
					<div className="m-1" key={index}>
						<ConversationalHTMLCard cardHTML={cm.html} options={options} />
					</div>
				);
			});
		} else {
			cardMessage = chat.message.map((cm, index) => {
				return (
					<div className="m-1" key={index}>
						<CardMessage
							{...cm}
							options={options}
							sendMessage={this.props.sendMessage}
							showModal={this.props.showModal}
							hideModal={this.props.hideModal}
						/>
					</div>
				);
			});
		}
		return (
			<ChatUI chat={chat} conversation={conversation}>
				<div
					className="d-flex"
					style={
						isContentShown ? { flexWrap: "wrap" } : { overflow: "auto hidden" }
					}
				>
					{cardMessage}
				</div>
			</ChatUI>
		);
	}
}

let actions = {
	sendMessage: sendAMessage,
	showModal: showModal,
	hideModal: hideModal,
};

export default connect(null, actions)(CardContent);
