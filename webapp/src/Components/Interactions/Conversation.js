import React, { Component } from "react";
import Config from "../../Utils/Config";
import ConversationContainer from "./../../Containers/ConversationContainer";
import { getConversationDescription } from "./../../Services/InteractionsService";
const R = require("ramda");

const ConversationBot = ({
	conversation,
	className,
	selected,
	changeConversation,
}) => (
	<ConversationContainer
		conversation={conversation}
		className={className}
		changeConversation={changeConversation}
		name={conversation.bot.botName}
		imgSrc={`${R.prop("contentURL", Config)}${R.prop(
			"logoUrl",
			conversation.bot
		)}`}
		description={getConversationDescription(
			conversation.lastMessage,
			conversation.bot.description
		)}
	/>
);

const ConversationIM = ({
	conversation,
	className,
	selected,
	changeConversation,
}) => (
	<ConversationContainer
		conversation={conversation}
		className={className}
		changeConversation={changeConversation}
		name={conversation.contact.userName}
		description={getConversationDescription(
			conversation.lastMessage,
			conversation.contact.emailAddress
		)}
	/>
);

const ConversationChannel = ({
	conversation,
	className,
	selected,
	changeConversation,
}) => {
	let channelName = conversation.channel.channelName;
	let channelDescription = conversation.channel.description;
	return (
		<ConversationContainer
			conversation={conversation}
			className={className}
			changeConversation={changeConversation}
			name={channelName}
			description={getConversationDescription(
				conversation.lastMessage,
				channelDescription
			)}
		/>
	);
};

export default class Conversation extends Component {
	changeConversation = () => {
		this.props.changeConversation(this.props.conversation);
	};

	render() {
		let { conversation, selected } = this.props;
		let className = "list-item";
		if (selected) {
			className += " active";
		}

		if (conversation.channel) {
			return (
				<ConversationChannel
					changeConversation={this.changeConversation}
					conversation={conversation}
					selected={selected}
					className={className}
				/>
			);
		}
		if (conversation.contact) {
			return (
				<ConversationIM
					changeConversation={this.changeConversation}
					conversation={conversation}
					selected={selected}
					className={className}
				/>
			);
		}
		return (
			<ConversationBot
				changeConversation={this.changeConversation}
				conversation={conversation}
				selected={selected}
				className={className}
			/>
		);
	}
}
