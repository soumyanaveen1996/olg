/* eslint-disable react/no-deprecated */
import React, { Component } from "react";
import ContactsSearch from "./ContactsSearch";
import ContactsList from "./ContactsList";
import _ from "lodash";

class ContactsListView extends Component {
	state = {
		allContacts: [],
		contacts: [],
		showMenu: false,
		showAddContacts: false,
		onlyVoip: false,
		allProfileImages: {},
	};

	componentDidMount() {
		window.document.title = "Contacts";
		this.addAllContacts(this.props);
		this.setState({
			allProfileImages: { ...this.props.allProfileImages },
		});
	}

	componentDidUpdate(prevProps, prevState) {
		// console.log("on new props", newProps);

		if (!_.isEqual(this.props.allProfileImages, prevState.allProfileImages)) {
			this.setState({
				allProfileImages: {
					...this.props.allProfileImages,
				},
			});
		}

		if (
			this.props.accepted &&
			this.props.localContacts &&
			this.props.vessels &&
			(!_.isEqual(this.props.accepted, prevProps.accepted) ||
				!_.isEqual(this.props.localContacts, prevProps.localContacts) ||
				!_.isEqual(this.props.vessels, prevProps.vessels))
		) {
			this.addAllContacts(this.props);
			// this.searchContacts(this.state.searchText, contacts);
		}
		if (
			this.props.location.state &&
			this.props.location.state.onlyVoip &&
			this.props.location.state.onlyVoip !== prevProps.location.state.onlyVoip
		) {
			this.setState({ onlyVoip: this.props.location.state.onlyVoip });
		}
		// this.searchContacts(this.state.searchText, newProps.accepted);
	}

	addAllContacts = (allContacts) => {
		let contacts = [
			...allContacts.accepted,
			...allContacts.localContacts,
			...allContacts.vessels,
		];
		contacts = [
			...new Map(contacts.map((item) => [item.userId, item])).values(),
		];
		// console.log("updated contacts =====", contacts);
		this.setState({ allContacts: [...contacts], contacts: [...contacts] });
	};

	toggleMenu = (e) => {
		e.preventDefault();
		this.setState({ showMenu: !this.state.showMenu });
	};

	doSearch = (searchText) => {
		this.searchContacts(searchText, this.state.allContacts);
	};

	searchContacts = (searchText, contacts) => {
		if (!searchText || !searchText.length) {
			this.setState({
				contacts: contacts,
				searchText: null,
			});
			return;
		}
		let filtered = contacts.filter(function (contact) {
			// console.log("data of contcats---------- ", contact);

			let field1 = contact.userName;
			let field2 = contact.emailAddress;

			return (
				(field1 &&
					field1.toLowerCase().search(searchText.toLowerCase()) !== -1) ||
				(field2 && field2.toLowerCase().search(searchText.toLowerCase()) !== -1)
			);
		});
		this.setState({
			contacts: filtered,
			searchText,
		});
	};

	render() {
		let { userId, fetchContacts, selectedId } = this.props;

		let { allProfileImages } = this.state;
		let { contacts = [], searchText } = this.state;
		// console.log("data feom ================= ", this.state);
		if (
			this.props.location &&
			this.props.location &&
			this.props.location.state &&
			!this.props.location.state.showSidebar
		) {
			return null;
		} else {
			return (
				<div style={this.props.style}>
					<div
						className="sidebar-body flex d-flex bg-white flex-column py-1"
						id="app-body"
					>
						<div className="d-flex align-items-center justify-content-around mb-4 mt-25">
							<ContactsSearch search={this.doSearch} />
						</div>
						{!contacts || contacts.length === 0 ? (
							<div
								className="px-2 py-4 text-center"
								style={{ color: "#4a4a4a" }}
							>
								You don't have any contacts added.
							</div>
						) : (
							<ContactsList
								userId={userId}
								allProfileImages={allProfileImages}
								contacts={contacts}
								fetchContacts={fetchContacts}
								selectedId={selectedId}
								showMenu={this.state.showMenu}
								toggleMenu={this.toggleMenu}
								selectContact={this.props.selectContact}
								searchText={searchText}
								history={this.props.history}
							/>
						)}

						{/* {this.renderContacts()} */}

						{/* {!contacts || contacts.length === 0 ? (
          <div className="d-flex flex justify-content-center">
            Your contact list is empty.
          </div>
        ) : (
          
        )} */}
					</div>
				</div>
			);
		}
	}
}

export default ContactsListView;
