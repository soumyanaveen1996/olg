import { offlineIngestMessage } from "../State/actions/chats";
import store from "../State/configureStore";

const tell = (message, botContext) => {
	const messageObj = {
		userId: botContext.userDetails.userId,
		conversation:
			window.lastMsg && window.lastMsg.messageId === message.getMessageId()
				? window.lastMsg.conversationId
				: botContext.getConversationContext().conversationId,
		bot: botContext.botId,
		createdOn: message.getMessageDate(),
		createdBy: message.getCreatedBy(),
		contentType:
			botContext.capabilities.MessageTypeConstantsToInt[
				message.getMessageType()
			],
		messageType: message.getMessageType(),
		addedByBot: true,
		messageId: message.getMessageId(),
		uuid: message._uuid,
		messageDate: message.getMessageDate(),
		botKey: null,
		status: 0,
		message: null,
		options: null,
	};
	if (
		typeof message.getMessage() === "string" &&
		message.getMessage() !== null
	) {
		try {
			messageObj.message = JSON.parse(message.getMessage());
		} catch (error) {
			messageObj.message = message.getMessage();
		}
	} else {
		messageObj.message = message.getMessage();
	}
	if (
		typeof message.getMessageOptions() === "string" &&
		message.getMessageOptions() !== null
	) {
		try {
			messageObj.options = JSON.parse(message.getMessageOptions());
		} catch (error) {
			messageObj.options = message.getMessageOptions();
		}
	} else {
		messageObj.options = message.getMessageOptions();
	}
	const conversationId = botContext.getConversationContext().conversationId;
	store.dispatch(
		offlineIngestMessage(messageObj, messageObj.conversation || conversationId)
	);
};

export default tell;
