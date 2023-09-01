import React from "react";
import { connect } from "react-redux";

const divStyle = {
	position: "fixed",
	height: "100%",
	width: "100%",
	zIndex: 9999,
};

const imageStyle = {
	position: "absolute",
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	margin: "auto",

	height: "auto",
};

const NonConversationalLoader = ({
	conversational,
	showWaitSpinner,
	showChat,
	waitingIcon,
}) => {
	if (
		conversational === undefined ||
		showWaitSpinner === undefined ||
		conversational ||
		!showWaitSpinner ||
		showChat
	) {
		return null;
	}

	let spinner;

	if (waitingIcon && waitingIcon === "vessel") {
		spinner =
			(!conversational && showWaitSpinner && !showChat && (
				<img
					className="flight-loader"
					src={"/img/loading-ship-v1.gif"}
					style={imageStyle}
					alt="loader"
				/>
			)) ||
			null;
	} else {
		spinner =
			(!conversational && showWaitSpinner && !showChat && (
				<img
					className="flight-loader"
					src={"/img/loading-v2.gif"}
					style={imageStyle}
					alt="loader"
				/>
			)) ||
			null;
	}

	return <div style={divStyle}>{spinner}</div>;
};

const mapDataToProps = (state) => {
	let chats = state.chats;
	let conversation = chats.selectedConversation;
	let selectedConversationId = conversation && conversation.conversationId;
	return {
		showWaitSpinner: state.chats.showWaitSpinner,
		conversational: selectedConversationId
			? chats.conversationModeMap[selectedConversationId]
				? chats.conversationModeMap[selectedConversationId].conversational ===
				  false
					? false
					: true
				: true
			: true,
		showChat: selectedConversationId
			? (chats.conversationModeMap[selectedConversationId] &&
					chats.conversationModeMap[selectedConversationId].showChat) ||
			  false
			: false,
		waitingIcon: chats.waitingIcon,
	};
};

export default connect(mapDataToProps)(NonConversationalLoader);
