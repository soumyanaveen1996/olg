import React from "react";
import { useDispatch } from "react-redux";

import MenuComponent from "./MenuComponent";
import { MessageTypeConstants } from "../../../../Services/Message";
import { sendAMessage } from "../../../../State/actions/chats";

export default function Menu({ message }) {
	const dispatch = useDispatch();

	const handleAction = (menuId) => {
		let responseChat = {};
		responseChat.messageType = MessageTypeConstants.MESSAGE_TYPE_MENU_RESPONSE;
		responseChat.message = {
			controlId: message.options.controlId,
			tabId: message.options.tabId,
			selectedEntry: menuId,
		};
		dispatch(sendAMessage(responseChat, true));
	};

	return <MenuComponent message={message} handleAction={handleAction} />;
}
