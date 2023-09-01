import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchContacts } from "../State/actions/contacts";
import {
	createConversation,
	getTimeLine,
	getFavourite,
} from "../State/actions/chats";
import ContactsView from "../Components/Contacts/ContactsView";
import { getAllDomains, sendMsgForBanner } from "../State/actions/user";
import {
	selectedContactAction,
	removeSelectedContact,
} from "../State/actions/contacts";

class ContactsContainer extends Component {
	componentDidMount() {
		window.document.title = "Contacts";
	}

	render() {
		return (
			<ContactsView
				{...this.props}
				sendMsgForBanner={this.props.sendMsgForBanner}
				selectedContact={(data) => {
					console.log("contactSelected", data);
				}}
			/>
		);
	}
}

const mapActionToProps = {
	fetchContacts: fetchContacts,
	getAllDomains,
	createConversation: createConversation,
	getTimeLine,
	selectedContactAction,
	removeSelectedContact,
	sendMsgForBanner,
	getFavourite,
};

const mapDataToProps = (state) => {
	return {
		balance: state.user.balance,
		accepted: state.contacts.accepted || [],
		ignored: state.contacts.ignored || [],
		localContacts: state.contacts.localContacts || [],
		vessels: state.contacts.vessels || [],
		userId: state.user.user.userId,
		emailAddress: state.user.user.emailAddress,
		selectedDomain: state.selectedDomain,
		selectedContactStore: state.contacts.selectedContact || {},
	};
};

export default connect(mapDataToProps, mapActionToProps)(ContactsContainer);
