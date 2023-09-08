import React from "react";

export default function PlainNotification({ notification }) {
	return (
		<div className="plain-notifications" key={notification.messageId + Math.floor(Math.random() * 90 + 10)}>
			{notification.message}
		</div>
	);
}
