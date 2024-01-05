import React, { Component, PropTypes } from "react";
import Config from "../../Utils/Config";
import Contact from "../Contacts/Contact";
import Tab from "../Common/Tab";
import Avatar from "../Common/Avatar";
const R = require("ramda");

const BotList = ({ botSubscriptions, onClick, onComplete }) => {
	let botNodes = botSubscriptions.map((bot) => (
		<li key={bot.botId} className="list-item">
			<a
				href="#"
				className="list-link"
				onClick={(e) => {
					e.preventDefault();
					onClick(bot);
					onComplete();
				}}
			/>
			<div className="list-thumb avatar avatar40 bg-primary rounded-circle">
				<img
					src={`${R.prop("contentURL", Config)}${R.prop("logoUrl", bot)}`}
					alt=""
					className="img-fluid rounded-circle"
				/>
			</div>
			<div className="list-body">
				<span className="list-title">{bot.botName}</span>
				<span className="list-content">{bot.description}</span>
			</div>
		</li>
	));

	return <div className="list conversation-list">{botNodes}</div>;
};

const PeopleList = ({ contacts, onClick, onComplete }) => {
	let contactNodes = contacts.map((contact, index) => (
		<Contact
			key={index}
			contact={contact}
			onClick={(e) => {
				e.preventDefault();
				onClick(contact);
				onComplete();
			}}
			closingModal={() => {
				onComplete();
			}}
		/>
	));

	return <div className="list conversation-list">{contactNodes}</div>;
};

const ChannelsList = ({ channels, onClick, onComplete }) => {
	let channelNodes = channels.map((channel) => (
		<li key={channel.channelName} className="list-item">
			<a
				href="#"
				className="list-link"
				onClick={(e) => {
					e.preventDefault();
					onClick(channel);
					onComplete();
				}}
			/>
			<Avatar
				name={channel.channelName}
				size={40}
				height={40}
				color="bg-info"
			/>
			<div className="list-body">
				<span className="list-title">{channel.channelName}</span>
				<span className="list-content">{channel.description}</span>
			</div>
		</li>
	));

	return <div className="list conversation-list">{channelNodes}</div>;
};

class CreateConversation extends Component {
	addToTimeLine = (bot) => {
		const { userId, createConversation, history } = this.props;
		createConversation(bot, userId);
		history.push("/offlinelms/app/chats");
	};

	addChannelConversationToTimeLine = (channel) => {
		this.props.initiateChannelConversation(channel, () =>
			this.props.history.push("/offlinelms/app/chats")
		);
	};

	render() {
		const { botSubscriptions, contacts, channels } = this.props;

		let tabs = [
			{
				tabName: "Bots",
				tabComponent: BotList,
				tabProps: {
					botSubscriptions: botSubscriptions,
					onClick: this.addToTimeLine,
					onComplete: this.props.onComplete,
				},
			},
			{
				tabName: "People",
				tabComponent: PeopleList,
				tabProps: {
					contacts: contacts,
					onClick: this.addToTimeLine,
					onComplete: this.props.onComplete,
				},
			},
			{
				tabName: "Channels",
				tabComponent: ChannelsList,
				tabProps: {
					channels: channels,
					onClick: this.addChannelConversationToTimeLine,
					onComplete: this.props.onComplete,
				},
			},
		];

		return (
			<div className="flex">
				<Tab tabs={tabs} />
			</div>
		);
	}
}

export default CreateConversation;
