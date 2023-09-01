import React from "react";
import { connect } from "react-redux";
import ReactEmoji from "react-emoji";
import _ from "lodash";
import { MessageTypeConstants } from "../../../Services/Message";
import { validURL } from "../../../Utils/Helpers";

const Chips = (props) => {
	let { data: messages, sendMessage } = props;
	// let customStyle = {
	//   marginLeft: "20vw",
	//   marginRight: "20vw",
	// };
	// if (!_.isEmpty(props.background)) {
	//   customStyle = {};
	// }
	if (!messages || messages.length === 0) {
		return null;
	}

	const hasURL = (string) => {
		return string
			.split(" ")
			.map((item) => validURL(item))
			.includes(true);
	};

	const renderMessageWithURL = (string) => {
		return string.split(" ").map((item) =>
			validURL(item) ? (
				<a href={item} target="_blank" rel="noopener noreferrer">
					{item + " "}
				</a>
			) : (
				item + " "
			)
		);
	};

	let buttons = [];
	if (Array.isArray(messages)) {
		buttons = messages.map(function (msg, index) {
			return (
				<a
					key={index}
					style={{ margin: "0 3px", display: "inline-block" }}
					onClick={() => {
						sendMessage(msg);
					}}
				>
					<div className="media clearfix media-chit" style={{ margin: "0px" }}>
						<div className="medbody">
							<p
								style={{
									whiteSpace: "nowrap",
								}}
							>
								{typeof msg === MessageTypeConstants.MESSAGE_TYPE_STRING &&
								hasURL(msg)
									? renderMessageWithURL(msg)
									: ReactEmoji.emojify(msg)}
							</p>
						</div>
					</div>
				</a>
			);
		});
	}

	return (
		<div
			className="p-2 mb-10 chipButtons"
			style={Object.assign(
				{
					flex: 1,
					// width:
					// 	props.background && Object.keys(props.background).length === 0
					// 		? "88%"
					// 		: "350px",
					display: "flex",
					overflowX: "auto",
					overflowY: "hidden",
				}
				// customStyle
			)}
		>
			<div className="d-flex justify-content-end">{buttons}</div>
		</div>
	);
};

const mapDataToProps = (state) => {
	let chats = state.chats;
	let conversation = chats.selectedConversation;
	let selectedConversationId = conversation && conversation.conversationId;
	return {
		conversational: chats.conversational,
		background: selectedConversationId
			? (chats.conversationModeMap[selectedConversationId] &&
					chats.conversationModeMap[selectedConversationId].background) ||
			  {}
			: {},
	};
};

export default connect(mapDataToProps, null)(Chips);
