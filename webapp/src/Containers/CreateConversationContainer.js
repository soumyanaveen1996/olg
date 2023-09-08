import React, { Component } from "react";
import { connect } from "react-redux";
import {
	createConversation,
	initiateChannelConversation,
} from "../State/actions/chats";
import CreateConversation from "../Components/Interactions/CreateConversation";
import history from "./../Services/History";

class CreateConversationContainer extends Component {
	render() {
		return <CreateConversation {...this.props} history={history} />;
	}
}

const actions = {
	createConversation: createConversation,
	initiateChannelConversation: initiateChannelConversation,
};

function data(state, props) {
	return {
		userId: state.user.user.userId,
		botSubscriptions: state.user.botSubscriptions,
		contacts: state.contacts.accepted,
		channels: state.channels.subscribed,
	};
}

export default connect(data, actions)(CreateConversationContainer);
