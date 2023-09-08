import React from "react";
import Config from "../../../Utils/Config";
import Avatar from "../../Common/Avatar";
import { useSelector } from "react-redux";

const R = require("ramda");

const LeftNavChannel = ({
	channel,
	openChannel,
	active,
	unreadCountChannels,
}) => {
	const timelines = useSelector((state) => state.chats.timeLine);

	return (
		<div className="d-flex align-items-center">
			{active && (
				<span
					className="combined-shape"
					style={{ display: "block", marginLeft: "-13px" }}
				/>
			)}
			<a
				className="list-item d-flex align-items-center"
				style={Object.assign(
					{ lineHeight: "15px" },
					active ? { opacity: 1 } : {}
				)}
				onClick={() => {
					openChannel(channel);
				}}
			>
				{channel.logo === "ChannelsBotLogo.png" ? (
					<Avatar
						style={{ marginRight: "10px" }}
						name={channel.channelName}
						size={16}
						height={16}
						color="bg-info"
					/>
				) : (
					<Avatar
						style={{ marginRight: "10px", borderRadius: "50%" }}
						imgSrc={`${R.prop("contentURL", Config)}channelLogos/${
							channel.logo
						}`}
						size={16}
						height={16}
					/>
				)}

				<div className="text-white fs12 list-title" title={channel.channelName}>
					{channel.channelName}
				</div>
			</a>
			<div className="ml-2">
				{unreadCountChannels && unreadCountChannels[channel.channelId] > 0 && (
					<div
						key={channel.channelId}
						className="rounded-circle notify-message d-flex justify-content-center align-items-center font-weight-bold"
					>
						{unreadCountChannels[channel.channelId]}
					</div>
				)}
			</div>
		</div>
	);
};

export default LeftNavChannel;
