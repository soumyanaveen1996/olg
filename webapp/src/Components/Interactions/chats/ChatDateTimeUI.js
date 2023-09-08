import React from "react";
import { getDateTimeString } from "../../../Utils/Helpers";

const ChatDateTimeUI = ({ chat }) => {
	if (!chat) {
		return null;
	}
	return (
		<span className="fs10 ml-2 text-muted">
			{getDateTimeString(chat.createdOn)}
		</span>
	);
};

export default ChatDateTimeUI;
