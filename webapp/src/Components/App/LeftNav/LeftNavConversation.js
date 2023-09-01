import React from "react";
import Config from "../../../Utils/Config";
import Avatar from "../../Common/Avatar";
import { useSelector } from "react-redux";

const R = require("ramda");

const LeftNavConversation = ({
	allProfileImages,
	conversation,
	openConversation,
	selectedConversation,
}) => {
	const { timeLine: timelines } = useSelector((state) => state.chats);
	let node = null;
	let active =
		selectedConversation &&
		conversation.conversationId === selectedConversation.conversationId;

	if (conversation.channel) {
		let name = conversation.channel.channelName;
		node = (
			<div className={"d-flex"}>
				<Avatar
					style={{
						marginRight: "10px",
						borderRadius: "50%",
						backgroundColor: "#fff",
					}}
					name={name}
					size={16}
					height={16}
				/>

				<span className="list-title text-white fs12" title={name}>
					{name}
				</span>
			</div>
		);
	} else if (conversation.contact) {
		let name = conversation.contact.userName || "";
		let imgSrc =
			allProfileImages && allProfileImages[conversation.contact.userId];
		node = (
			<div className={"d-flex"}>
				<Avatar
					style={{
						marginRight: "10px",
						borderRadius: "50%",
						backgroundColor: "#fff",
					}}
					name={name}
					size={16}
					height={16}
					imgSrc={imgSrc}
				/>
				<span className="list-title text-white fs12">{name}</span>
			</div>
		);
	} else {
		let bot = conversation.bot;
		node = (
			<div className={"d-flex"}>
				<Avatar
					style={{ marginRight: "10px" }}
					imgSrc={`${R.prop("contentURL", Config)}${R.prop("logoUrl", bot)}`}
					size={14}
					height={16}
				/>

				<span className="list-title text-white fs12">{bot?.botName}</span>
			</div>
		);
	}

	return (
		<div className="d-flex flex-row align-items-center justify-content-start">
			{active && (
				<span
					className="combined-shape"
					style={{ display: "block", marginLeft: "-13px" }}
				/>
			)}
			<a
				onClick={() => {
					openConversation(conversation);
				}}
				className="list-item active d-flex align-items-center"
				style={Object.assign(
					{ lineHeight: "15px" },
					active ? { opacity: 1 } : {}
				)}
			>
				{node}
			</a>
			<div className="ml-auto">
				{timelines &&
					timelines.map((timeline) => {
						if (
							timeline.conversationId === conversation.conversationId &&
							timeline.unreadCount
						) {
							if (
								timeline?.bot?.botId !== "im-bot" ||
								timeline?.userDomain == "frontmai"
							) {
								return null;
							}

							return (
								<div
									key={timeline.conversationId}
									className="rounded-circle notify-message d-flex justify-content-center align-items-center font-weight-bold"
								>
									{timeline.unreadCount}
								</div>
							);
						}
						return null;
					})}
			</div>
		</div>
	);
};

export default LeftNavConversation;
