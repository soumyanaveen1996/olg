import React from "react";
import ChatOthersSpinner from "./ChatOthersSpinner";
import ChatOthersUI from "./ChatOthersUI";
import { MessageTypeConstants } from "../../../Services/Message";
import { urlifyText } from "../ChatMessage";

const ChatOthers = ({
	chat,
	conversation,
	highlight,
	setHighlightedElementScrollHeight,
	saveContactPopUp,
	chatMessageFrom,
	allProfileImages,
}) => {
	let message = null;
	if (chat.messageType === MessageTypeConstants.MESSAGE_TYPE_WAIT) {
		return <ChatOthersSpinner conversation={conversation} chat={chat} />;
	} else if (chat.messageType === MessageTypeConstants.MESSAGE_TYPE_DATA) {
		return null;
	} else {
		if (conversation && conversation.channel) {
			message = (
				<div>
					<div className="mb-1">
						<strong>
							{chat.conversationOwner ? chat.conversationOwner.userName : ""}
						</strong>
					</div>
					<div>{urlifyText(chat.message)}</div>
				</div>
			);
		} else {
			message = urlifyText(chat.message);
		}
	}

	return (
		<ChatOthersUI
			chatMessageFrom={chatMessageFrom}
			chat={chat}
			allProfileImages={allProfileImages}
			conversation={conversation}
			highlight={highlight}
			setHighlightedElementScrollHeight={setHighlightedElementScrollHeight}
			saveContactPopUp={(elem, index) => {
				saveContactPopUp(elem, index);
			}}
		>
			{Array.isArray(message) && arrayContainsPlainString(message)
				? message.join(",")
				: message}
		</ChatOthersUI>
	);
};

function arrayContainsPlainString(message) {
	message.forEach((msg) => {
		if (typeof msg !== "string") {
			return false;
		}
	});
}
export default ChatOthers;
