import React, { Component } from "react";
import { connect } from "react-redux";
import AppNav from "../Components/App/LeftNav/AppNav";
import Config from "../Utils/Config";
import {
	changeConversation,
	createConversation,
	initiateChannelConversation,
	getFrontMAssistant,
} from "../State/actions/chats";
import { fetchContacts } from "../State/actions/contacts";
import {
	getAllDomains,
	setSelectedDomain,
	fetchWalletBalanceService,
	updateAuthUser,
	pushNotificationGenerator,
} from "../State/actions/user";

let baseURL = `${Config.gRPCURL}/grpc/user.UserService/RegisterWebApp`;
class AppNavContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		let currentUserDomain = this.props?.selectedDomain?.userDomain;
		let sessionId = this.props.sessionId;
		let webPushAppType;
		let shouldSendPushNotification = false;

		if (currentUserDomain == "onecare") {
			shouldSendPushNotification = true;
			webPushAppType = "onecare_dev";
		}

		if (shouldSendPushNotification) {
			this.props.pushNotificationGenerator({
				currentUserDomain,
				sessionId,
				webPushAppType,
				userEmail: this.props.userEmail,
				baseURL,
			});
		}
	}

	render() {
		return <AppNav {...this.props} />;
	}
}

const mapActionToProps = {
	createConversation: createConversation,
	initiateChannelConversation: initiateChannelConversation,
	changeConversation: changeConversation,
	fetchContacts,
	getFrontMAssistant,
	getAllDomains,
	fetchWalletBalanceService,
	setSelectedDomain,
	updateAuthUser,
	pushNotificationGenerator,
};

const mapDataToProps = (state, props) => {
	let user = state.user;
	// console.log("selected contact ", state.contacts.selectedContact);

	return {
		userId: user.user.userId,
		userName: user.user.userName,
		userEmail: user.user.emailAddress,
		botSubscriptions: user.botSubscriptions,
		subscribedChannels: state.channels.subscribed,
		timeLine: state.chats.timeLine,
		contacts: state.contacts.accepted,
		localContacts: state.contacts.localContacts,
		vessels: state.contacts.vessels,
		selectedConversation: state.chats.selectedConversation,
		hiddenTimeLine: state.chats.hiddenTimeLine,
		newUser: user.auth.newUser,
		domains: state.domains,
		selectedDomain: state.selectedDomain,
		selectedContactStore: state.contacts.selectedContact,
		sessionId: user.auth.sessionId,
	};
};

export default connect(mapDataToProps, mapActionToProps)(AppNavContainer);
