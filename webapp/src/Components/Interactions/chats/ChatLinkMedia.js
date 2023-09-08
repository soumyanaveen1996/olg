import React from "react";
import { MessageTypeConstants } from "./../../../Services/Message";
import _ from "lodash";
import ImageContent from "../content/ImageContent";
import AudioContent from "../content/AudioContent";
import AudioPlayer from "../content/AudioPlayer";
import VideoContent from "../content/VideoContent";
import ChatLinkSelfUI from "./ChatLinkSelfUI";
import ChatLinkOthersUI from "./ChatLinkOthersUI";

const ChatLinkMedia = (props) => {
	let { chat, conversation, self, open } = props;
	if (
		chat.messageType === MessageTypeConstants.MESSAGE_TYPE_SLIDER ||
		chat.messageType === MessageTypeConstants.MESSAGE_TYPE_BUTTON ||
		chat.messageType === MessageTypeConstants.MESSAGE_TYPE_SMART_SUGGESTIONS
	) {
		return null;
	}

	let ChatUI = self ? ChatLinkSelfUI : ChatLinkOthersUI;
	let type = chat.messageType;

	return (
		<ChatUI chat={chat} conversation={conversation}>
			{!self &&
				chat.conversationOwner &&
				conversation.channel &&
				!_.isEmpty(chat.conversationOwner) && (
					<div className="chat-others-message-owner">
						{chat.conversationOwner.userName}
					</div>
				)}
			{type === MessageTypeConstants.MESSAGE_TYPE_IMAGE && (
				<a onClick={open}>
					<ImageContent
						data={chat.message}
						style={{
							height: 200,
							border: "1px solid #FFFFFF",
							borderRadius: "10px",
							boxShadow: "0 0 3px 0 rgba(0,0,0,0.5)",
						}}
						conversationId={conversation.conversationId}
					/>
				</a>
			)}
			{type === MessageTypeConstants.MESSAGE_TYPE_AUDIO && (
				<AudioPlayer
					data={chat.message}
					options={chat.options}
					conversationId={conversation.conversationId}
					id={chat.messageId || chat.createdOn}
				/>
			)}
			{type === MessageTypeConstants.MESSAGE_TYPE_VIDEO && (
				<VideoContent
					data={chat.message}
					style={{
						width: 200,
						height: 200,
						border: "1px solid #FFFFFF",
						borderRadius: "10px",
						boxShadow: "0 0 3px 0 rgba(0,0,0,0.5)",
					}}
					conversationId={conversation.conversationId}
					id={chat.messageId || chat.createdOn}
				/>
			)}
		</ChatUI>
	);
};

export default ChatLinkMedia;
