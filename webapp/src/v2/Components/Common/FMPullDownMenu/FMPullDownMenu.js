import React from "react";
import { useDispatch } from "react-redux";

import { MessageTypeConstants } from "../../../../Services/Message";
import { sendAMessage } from "../../../../State/actions/chats";
import FMPullDownMenuComponent from "./FMPullDownMenuComponent";

const FMPullDownMenu = (props) => {
	const dispatch = useDispatch();

	const handleAction = (menuId) => {
		let responseChat = {};
		responseChat.messageType = MessageTypeConstants.MESSAGE_TYPE_MENU_RESPONSE;
		responseChat.message = {
			controlId: props.message.options.controlId,
			tabId: props.message.options.tabId,
			selectedEntry: menuId,
		};
		dispatch(sendAMessage(responseChat, true));
	};
	return <FMPullDownMenuComponent {...props} handleAction={handleAction} />;
};

export default FMPullDownMenu;
