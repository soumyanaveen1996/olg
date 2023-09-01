import React from "react";
import Spinner from "react-spinkit";
import ChatOthersUI from "./ChatOthersUI";
import { connect } from "react-redux";

const ChatOthersSpinner = ({
	conversation = { bot: {} },
	chat,
	conversational,
}) => {
	if (chat.waitingIcon && chat.waitingIcon === "vessel") {
		return (
			<ChatOthersUI conversation={conversation} chat={chat}>
				<div className="d-flex justify-content-lg-start">
					<img
						src={"/img/loading-ship-v1.gif"}
						width={50}
						alt="flight-loader"
					/>
				</div>
			</ChatOthersUI>
		);
	} else
		return (
			<ChatOthersUI conversation={conversation} chat={chat}>
				<div className="d-flex justify-content-lg-start">
					{!conversational ? (
						<img src={"/img/loading-v2.gif"} width={50} alt="flight-loader" />
					) : (
						<Spinner name="three-bounce" color="steelblue" />
					)}
				</div>
			</ChatOthersUI>
		);
};

const mapActionToProps = {};

const mapDataToProps = (state, props) => {
	let chats = state.chats;
	let conversation = chats.selectedConversation;
	let selectedConversationId = conversation && conversation.conversationId;
	return {
		conversational: selectedConversationId
			? (chats.conversationModeMap[selectedConversationId] &&
				chats.conversationModeMap[selectedConversationId].conversational) ||
			false
			: true,
	};
};

export default connect(mapDataToProps, mapActionToProps)(ChatOthersSpinner);
