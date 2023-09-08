import React from "react";
import ChatSelfUI from "./ChatSelfUI";
import { MessageTypeConstants } from "../../../Services/Message";
import { urlifyText } from "../ChatMessage";

const ChatSelf = ({ chat, allProfileImages }) => {
	let message = null;
	if (chat.messageType === MessageTypeConstants.MESSAGE_TYPE_BUTTON_RESPONSE) {
		message = "You selected : " + chat.message.title;
	} else if (
		chat.messageType === MessageTypeConstants.MESSAGE_TYPE_STRING ||
		typeof chat.message === "string"
	) {
		message = urlifyText(chat.message);
	} else if (
		chat.messageType === MessageTypeConstants.MESSAGE_TYPE_CONTACT_CARD
	) {
		message = chat.message;
	}
	if (!message) {
		return null;
	}

	return (
		<ChatSelfUI chat={chat} allProfileImages={allProfileImages}>
			{message}
		</ChatSelfUI>
	);
};

export default ChatSelf;
