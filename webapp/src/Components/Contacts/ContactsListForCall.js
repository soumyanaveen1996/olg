import React, { Component } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import ContactForCall from "./ContactForCall";

class ContactsListForCall extends Component {
	renderContacts = (contacts) => {
		return contacts.map((contact, index) => {
			return <ContactForCall key={index} contact={contact} />;
		});
	};

	render() {
		let { contacts, searchText } = this.props;

		let grouped = null,
			keys = [];
		if (!searchText) {
			grouped = {};
			contacts.forEach((contact) => {
				let first;
				if (!contact.type) {
					first = contact.userName.charAt(0).toUpperCase();
				} else {
					if (contact.name) {
						first = contact.name.charAt(0).toUpperCase();
					}
				}
				if (first) {
					if (grouped[first]) {
						grouped[first].push(contact);
					} else {
						grouped[first] = [contact];
					}
				}
			});
			if (grouped) {
				keys = Object.keys(grouped).sort();
			}
		}

		return (
			<Scrollbars autohide="true" style={{ height: this.props.height }}>
				{!grouped && <div>{this.renderContacts(contacts)}</div>}

				{grouped && (
					<div className="d-flex flex flex-column">
						{keys.map((key) => {
							return (
								<div key={key} className="mb-3">
									<div
										className="d-block pl-3 pb-2 title"
										style={{
											fontSize: "16px",
											color: "#4A4A4A",
											borderBottom: "1px solid #e8e9ee",
										}}
									>
										{key}
									</div>
									<div>{this.renderContacts(grouped[key])}</div>
								</div>
							);
						})}
					</div>
				)}
			</Scrollbars>
		);
	}
}

export default ContactsListForCall;
