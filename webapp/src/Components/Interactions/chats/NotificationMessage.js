import React from "react";
import CallEndIcon from "@mui/icons-material/CallEnd";
import CallMissedIcon from "@mui/icons-material/CallMissed";
import CallIcon from "@mui/icons-material/Call";
import { MessageTypeConstants } from "../../../Services/Message";
import { makeCall } from "../../../State/actions/phone";
import { useSelector, useDispatch } from "react-redux";
const NotificationMessage = ({ chat }) => {
	const dispatch = useDispatch();
	const state = useSelector((state) => state);
	const user = state.user;
	const chats = state.chats;
	const conversation = chats.selectedConversation;

	const missedCall = chat.message[0].includes("Missed voice call");
	const isGroupNotify =
		chat.message &&
		typeof chat.message === "string" &&
		chat.message.includes("group");
	let type = chat.messageType;
	return isGroupNotify ? (
		<div className="d-flex justify-content-center my-3">
			<div
				className="d-flex justify-content-center align-items-center"
				style={{
					height: "auto",
					padding: "6px 35px",
					borderRadius: "20px",
					backgroundColor:
						type === MessageTypeConstants.MESSAGE_TYPE_CRITICAL_NOTIFICATION
							? "#FEC901"
							: "#CDF4FF",
					boxShadow:
						"inset 0 1px 1px 0 rgba(255,255,255,0.5), 0 1px 1px 0 rgba(0,0,0,0.1)",
					color: "#4A4A4A",
					textAlign: "center",
				}}
			>
				{chat.message}
			</div>
		</div>
	) : (
		<div className="d-flex justify-content-start mb-20">
			<div
				className="d-flex justify-content-center align-items-center"
				style={{
					padding: "5px 20px",
					width: "fit-content",
					border: "1px solid lightgrey",
					borderRadius: "25px",
					backgroundColor:
						type === MessageTypeConstants.MESSAGE_TYPE_CRITICAL_NOTIFICATION
							? "#FEC901"
							: "rgb(245,245,245)",
					color: missedCall ? "red" : "#4A4A4A",
					textAlign: "center",
				}}
			>
				<span
					className="d-flex"
					style={{
						flexDirection: "column",
						marginRight: "10px",
						color: missedCall ? "red" : "#2FC76F",
					}}
				>
					{missedCall && (
						<CallMissedIcon
							style={{
								marginBottom: "-12px",
							}}
						/>
					)}
					<CallEndIcon />
				</span>
				{chat.message}
			</div>
			{missedCall ? (
				<span style={{ margin: "3px 10px" }}>
					<CallIcon
						className="circle"
						style={{
							color: "#0096fb",
							backgroundColor: "#e0f0fc",
							fontSize: "45px",
							padding: "8px",
							display: "flex",
							justifyContent: "space-around",
						}}
						onClick={() =>
							dispatch(
								makeCall(
									"voip",
									user.emailAddress,
									conversation.contact.userId,
									conversation.contact.userName,
									conversation.contact.userId,
									null,
									"on-call"
								)
							)
						}
					/>
				</span>
			) : null}
		</div>
	);
};

export default NotificationMessage;
