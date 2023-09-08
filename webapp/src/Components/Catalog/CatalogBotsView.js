import React from "react";
import Bot from "./Bot";
import CatalogBotHolder from "./CatalogBotHolder";

const CatalogBotsView = (props) => {
	let {
		bots,
		botHolderStyle = {
			marginBottom: "10px",
			width: "100%",
			borderRadius: "10px",
			boxShadow: "rgba(0, 0, 0, 0.2) 0px 0px 6px ",
		},
		subscribeToBot,
		createConversation,
		openBot,
	} = props;

	let newBotList = bots.filter((bot) => !bot.systemBot);

	return (
		<div className="col-lg-12 p-0">
			{newBotList.map((bot, index) => (
				<CatalogBotHolder key={index} style={botHolderStyle}>
					<Bot
						style={{ backgroundColor: "#fff", borderRadius: "10px" }}
						key={bot.botId}
						bot={bot}
						subscribeToBot={subscribeToBot}
						createConversation={createConversation}
						open={openBot}
					/>
				</CatalogBotHolder>
			))}
		</div>
	);
};

export default CatalogBotsView;
