import React, { useEffect, useState } from "react";
import { getDataFromLFStorage } from "../../Services/LFStorage";
import Config from "../../Utils/Config";
import Avatar from "../Common/Avatar";

const R = require("ramda");

const Bot = ({ bot, subscribeToBot, createConversation, style, open }) => {
	const [localBot, setLocalBot] = useState(null);

	const getLocalBot = async () => {
		try {
			const botList = (await getDataFromLFStorage(bot.userDomain)) || [];
			if (botList.length) {
				setLocalBot(
					botList.filter((item) => item.botId === bot.botId)[0] || null
				);
			}
		} catch (error) {
			console.log("error", error);
		}
	};

	useEffect(() => {
		getLocalBot();
	}, []);

	return (
		<div
			className="d-flex align-items-start p-3 list justify-content-between"
			style={style}
		>
			<div className="d-flex">
				<div>
					<Avatar
						imgSrc={`${R.prop("contentURL", Config)}${R.prop("logoUrl", bot)}`}
						size={32}
						height={32}
					/>
				</div>
				<div className="ml-3">
					<a
						style={{ fontSize: "14px", color: "#4A4A4A", fontWeight: 500 }}
						onClick={() => {
							open(bot);
						}}
					>
						{bot.botName}
					</a>
					<div style={{ color: "#666666" }}>
						<small>
							<span style={{ color: "#638DFF" }}>Free</span> |{" "}
							{bot.developer || "FrontM"}
						</small>
					</div>
					<div style={{ color: "#999999", fontSize: "12px" }}>
						{bot.description}
					</div>
				</div>
			</div>
			<div>
				{bot.subscribed ? (
					<div className="ml-3">
						{localBot && localBot.version !== bot.version ? (
							<a
								className="btn btn-sm btn-outline-info btn-install"
								onClick={() => {
									subscribeToBot(bot.botId, "update");
									setTimeout(() => {
										setLocalBot(bot);
									}, 2000);
								}}
							>
								Update
							</a>
						) : (
							<a
								className="btn btn-sm btn-open"
								onClick={() => createConversation(bot)}
							>
								Open
							</a>
						)}
					</div>
				) : (
					<div className="ml-3">
						<a
							className="btn btn-sm btn-outline-info btn-install"
							onClick={() => subscribeToBot(bot.botId)}
						>
							Install
						</a>
					</div>
				)}
			</div>
		</div>
	);
};

export default Bot;
