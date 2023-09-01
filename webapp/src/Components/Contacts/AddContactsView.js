import React, { Component } from "react";
import ContactsServiceClient from "../../Services/Clients/ContactsServiceClient";
import AddContacts from "./AddContacts";
import Notify from "../ModalMessages/ToastNotif";
const R = require("ramda");

class AddContactsView extends Component {
	state = {
		search: "",
		contacts: [],
	};

	onSearch = (e) => {
		this.setState({ search: e.target.value }, () => {
			if (this.state.search && this.state.search.length > 1) {
				if (this.state.search.length % 4 === 0) {
					this.searchContacts();
				}
			}
		});
	};

	searchContacts = () => {
		ContactsServiceClient.search({
			queryString: `find ${this.state.search}`,
		})
			.then(this.inspect)
			.then((response) => this.parseSearchResponse(response))
			.catch((error) => this.handleError(error));
	};

	parseSearchResponse = (data) => {
		const { content: contacts } = data;
		this.setState({ contacts });
	};

	onAddContact = (e) => {
		e.preventDefault();
		const key = e.target.dataset.uuid.toString();
		const contact = R.find(R.propEq("userId", key))(this.state.contacts);
		const { userId } = contact;
		this.setState({ loading: true, showAddContacts: false });
		ContactsServiceClient.add({
			userIds: [userId],
		}).then((response) => this.parseAddContactResp(response));
	};

	parseAddContactResp = () => {
		this.searchContacts();
		this.props.fetchContacts(null, true);
		Notify({
			type: "success",
			message: "Contact added successfully!",
			autoClose: 2000,
		});
	};

	render() {
		return (
			<AddContacts
				search={this.state.search}
				onSearch={this.onSearch}
				searchContacts={this.searchContacts}
				contacts={this.state.contacts}
				addContact={this.onAddContact}
			/>
		);
	}
}

export default AddContactsView;
