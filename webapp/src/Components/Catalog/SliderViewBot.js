import React from "react";
import Config from "../../Utils/Config";
import Avatar from "../Common/Avatar";

const R = require("ramda");

const SliderViewBot = ({ bot, style, open }) => {
	return (
		<div
			className="d-flex align-items-center p-2 list justify-content-between"
			style={style}
		>
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

				<div style={{ color: "#999999", fontSize: "12px" }}>
					{bot.description}
				</div>
			</div>
		</div>
	);
};

export default SliderViewBot;
