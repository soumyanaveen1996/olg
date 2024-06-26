import React, { useEffect, useState } from "react";
import Config from "../../../Utils/Config";
import Avatar from "../../Common/Avatar";
import GenericAjax from "../../../Services/GenericAjax";

const R = require("ramda");

const LeftNavBot = ({
	bot,
	onUnsubscribe,
	createConversation,
	active,
	firstLevel,
	from,
}) => {
	const [state, setState] = useState({ botLogo: "" });
	useEffect(() => {
		getBotLogo(bot);
	}, []);

	const getBotLogo = async (bot) => {
		if (bot) {
			let res = await GenericAjax.downloadFile(R.prop("botFilesAPI", Config) + bot?.logoUrl)
			if (res) {
				console.log("res", res)
				setState({ botLogo: URL.createObjectURL(res) });
			}
		}

	}
	if (bot ? bot.botId : false) {
		return (
			<div className="d-flex align-items-center">
				{active && (
					<span
						className="combined-shape"
						style={{ display: "block", marginLeft: "-13px" }}
					/>
				)}
				<a
					onClick={() => createConversation(bot?.botId)}
					className="list-item active d-flex align-items-center"
					style={Object.assign(
						{ lineHeight: "15px" },
						active ? { opacity: 1 } : {}
					)}
				>
					{from !== "help" && (
						<Avatar
							style={{
								marginRight: "10px",
							}}
							imgSrc={state?.botLogo}
							size={14}
							height={14}
						/>
					)}

					<div className="d-flex align-items-start">
						{from === "help" && (
							<img
								loading="lazy"
								className="section-icon"
								src="/offlinelms/img/sidebar-help@2x.png"
								alt="contact"
							/>
						)}

						<span
							className={
								firstLevel
									? "list-title text-white fs14 font-SF-regular font600"
									: "ml-2 list-title text-white fs12 font-SF-regular"
							}
							style={{
								paddingLeft:
									bot.botName && bot.botName.length > 25 ? "3px" : "",
							}}
						>
							{from === "help"
								? "Assistant"
								: bot.botName.replace("Onship", "onship")}
						</span>
					</div>
				</a>
			</div>
		);
	}
	return null;
};

export default LeftNavBot;
