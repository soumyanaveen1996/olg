import React, { Component } from "react";
import Contacts from "./Contacts";

class ContactsViewOld extends Component {
	state = {
		showMenu: false,
		showAddContacts: false,
	};

	componentDidMount() {
		this.props.fetchContacts();
	}

	toggleMenu = (e) => {
		e.preventDefault();
		this.setState({ showMenu: !this.state.showMenu });
	};

	onContactClicked = (contact) => {
		const { createConversation, userId, history } = this.props;
		createConversation(contact, userId);
		history.push("/app/chats");
	};

	render() {
		let { userId, accepted, fetchContacts } = this.props;
		return (
			<div className="sidebar-body flex d-flex">
				<Contacts
					showMenu={this.state.showMenu}
					toggleMenu={this.toggleMenu}
					onContactClicked={this.onContactClicked}
					contacts={accepted}
					userId={userId}
					fetchContacts={fetchContacts}
				/>
			</div>
		);
	}
}

export default ContactsViewOld;
