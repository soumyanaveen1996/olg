import React from "react";

export default function NotificationWithAction({
	notification,
	dismissNotification,
}) {
	const { messageId, message } = notification;
	return (
		<div className="notification-with-action" key={messageId}>
			<span> {message} </span>
			<img
				alt="close"
				src="/offlinelms/img/close-icon-dark-3.png"
				style={{
					width: "15px",
					height: "15px",
					cursor: "pointer",
					marginLeft: "13px",
				}}
				onClick={() => dismissNotification(messageId)}
			/>
		</div>
	);
}
