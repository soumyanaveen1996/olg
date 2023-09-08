import React from "react";
import { useDispatch } from "react-redux";

import FMNotificationComponent from "./FMNotificationComponent";
import FMNotificationNewComponent from "./FMNotificationNewComponent";
import { MessageTypeConstants } from "../../../../Services/Message";
import { sendAMessage } from "../../../../State/actions/chats";
import {
	removeNotification,
	removeNotifications,
	markAsOldNotifications,
} from "../../../Store/Notification/NotificationAction";

const FMNotification = ({
	conversation,
	messageId,
	message,
	messageType,
	messageArr,
}) => {
	const dispatch = useDispatch();

	const handleAction = (action, content = null, oldContent = null) => {
		let responseChat = {};
		responseChat.messageType =
			MessageTypeConstants.MESSAGE_TYPE_AUTHORIZATION_REQUEST_RESPONSE;
		responseChat.message = {
			controlId: message?.controlId || null,
			tabId: message?.tabId,
			action,
			content,
			oldContent,
		};
		dispatch(sendAMessage(responseChat, true));
		handleClose();
	};

	const handleClose = () => {
		dispatch(removeNotification(conversation, messageId));
	};

	const dismissNotifications = (messageIds) => {
		dispatch(removeNotifications(conversation, messageIds));
	};

	const handleNewClose = () => {
		dispatch(markAsOldNotifications(conversation));
	};

	return messageType ===
		MessageTypeConstants.MESSAGE_TYPE_AUTHORIZATION_REQUEST ? (
		<FMNotificationComponent
			message={message}
			messageType={messageType}
			handleAction={handleAction}
			handleClose={handleClose}
		/>
	) : (
		<FMNotificationNewComponent
			message={message}
			messageType={messageType}
			messageArr={messageArr}
			handleAction={handleAction}
			dismissNotifications={dismissNotifications}
			handleNewClose={handleNewClose}
		/>
	);
};

export default FMNotification;
