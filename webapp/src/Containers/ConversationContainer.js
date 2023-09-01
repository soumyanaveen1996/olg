import React, { Component } from "react";
import { connect } from "react-redux";
import {
	addConversationToFavourites,
	removeConversationFromFavourites,
} from "../State/actions/chats";
import ConversationRow from "../Components/Interactions/ConversationRow";

class ConversationContainer extends Component {
	render() {
		return <ConversationRow {...this.props} />;
	}
}

const mapActionsToProps = {
	addConversationToFavourites,
	removeConversationFromFavourites,
};

const mapDataToProps = (state) => {
	return {};
};
export default connect(
	mapDataToProps,
	mapActionsToProps
)(ConversationContainer);
