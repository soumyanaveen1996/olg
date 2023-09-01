import React from "react";
import ChatDateTimeUI from "./ChatDateTimeUI";

const ChatLinkSelfUI = ({ chat, children }) => {
	return (
		<div className="d-flex flex-column justify-content-end align-items-end chat-message chat-self">
			{children}
			<div>
				<ChatDateTimeUI chat={chat} />
			</div>
		</div>
	);
};

export default ChatLinkSelfUI;
