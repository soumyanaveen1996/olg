import React from "react";
export default function AppNotificationCard({
	backGroundColor,
	notification,
	removeNotification,
}) {
	const { msg, type, id } = notification;
	return (
		<div className="notification-child">
			<div
				className="notification-indicator"
				style={{ backgroundColor: backGroundColor }}
			>
				&nbsp;
			</div>
			<div className="notification-content">{msg}</div>
			<a
				className="notification-delete"
				onClick={() => removeNotification(id, type)}
			>
				<i
					className="icon-cross"
					style={{ fontSize: "12px", fontWeight: "600" }}
				/>
			</a>
		</div>
	);
}
