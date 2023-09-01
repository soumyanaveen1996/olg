import React, { useEffect, useState } from "react";
import { getDataFromLFStorage } from "../../Services/LFStorage";
import Config from "../../Utils/Config";
import Avatar from "../Common/Avatar";

const R = require("ramda");

const BotDetailsView = (props) => {
	let { bot, subscribeToBot, createConversation, style, selectedDomain } =
		props;
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
			console.log("");
		}
	};

	useEffect(() => {
		getLocalBot();
	}, []);

	return (
		<div className="d-flex flex-column" style={style}>
			<div
				className="d-flex align-items-start p-3 list justify-content-between"
				style={style}
			>
				<div className="d-flex">
					<div>
						<Avatar
							imgSrc={`${R.prop("contentURL", Config)}${R.prop(
								"logoUrl",
								bot
							)}`}
							size={64}
							height={64}
						/>
					</div>
					<div className="ml-3">
						<h5 style={{ color: "#4A4A4A" }}>{bot.botName}</h5>
						<div style={{ color: "#666666" }} className="my-2">
							<small>
								<span style={{ color: "#638DFF" }}>Free</span> |{" "}
								{bot.developer || "FrontM"}
							</small>
						</div>
						<label style={{ color: "#999999", fontSize: "14px" }}>
							{bot.description}
						</label>
					</div>
				</div>
				<div>
					{bot.subscribed && (
						<div className="ml-3">
							{localBot && localBot.version !== bot.version ? (
								<a
									className="btn btn-sm btn-outline-info btn-install"
									onClick={() => {
										subscribeToBot(bot.botId);
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
					)}
					{!bot.subscribed && (
						<div className="ml-3">
							<a
								className="btn btn-outline-info btn-install"
								onClick={() => subscribeToBot(bot.botId)}
							>
								Install
							</a>
						</div>
					)}
				</div>
			</div>
			<div>
				<hr
					style={{
						borderTop: "1px solid #F4F4F4",
						marginTop: "0.5rem",
						marginBottom: "0.5rem",
					}}
				/>
			</div>
			<div className="d-flex flex-column p-3">
				<h6>Information</h6>
				<div className="p-2">
					<div className="d-flex justify-content-between">
						<div className="text-muted">Version</div>
						<div>{bot.version}</div>
					</div>
					<hr
						style={{
							borderTop: "1px solid #F4F4F4",
							marginTop: "0.5rem",
							marginBottom: "0.5rem",
						}}
					/>
					<div className="d-flex justify-content-between">
						<div className="text-muted">Developer</div>
						<div>{bot.developer}</div>
					</div>
					<hr
						style={{
							borderTop: "1px solid #F4F4F4",
							marginTop: "0.5rem",
							marginBottom: "0.5rem",
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default BotDetailsView;
