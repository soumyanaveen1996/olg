/* eslint-disable react/no-unsafe */
/* eslint-disable react/no-deprecated */
import React, { Component } from "react";
import ContactsListView from "./ContactsListView";
import "./Contacts.css";
import ContactDetailsView from "./ContactDetailsView";
import ModalPopup from "../ModalMessages/ModalPopup";
import ContactRemovalConfirmation from "./ContactRemovalConfirmation";
import { removeContacts } from "../../Services/ContactsService";
import { NotifyClassComp } from "../ModalMessages/ToastNotif";

import { acceptContacts, ignoreContacts } from "../../Services/ContactsService";
import { setCallHistory } from "../../State/actions/user";
import { connect } from "react-redux";
import _ from "lodash";
import history from "../../Services/History";
import {
	removeContactStatus,
	clearAcceptIgnoreContact,
	syncContactsWithCache,
} from "../../State/actions/contacts";
import { clearAcceptIgnoreButtons } from "../../State/actions/chats";
import store from "../../State/configureStore";
import {
	getDataFromLFStorage,
	LFStorageKeys,
	saveDataInLFStorage,
} from "../../Services/LFStorage";

class ContactsView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectContact: null,
			accepted: [],
			localContacts: [],
			vessels: [],
			allProfileImages: {},
		};
	}

	componentDidMount() {
		window.document.title = "Contacts";
		this.setState({
			selectContact: this.props.selectedContactStore || {},
			accepted: this.props.accepted,
			localContacts: this.props.localContacts,
			vessels: this.props.vessels,
			allProfileImages: { ...this.props.allProfileImages },
		});
		this.props.setCallHistory(this.props.selectedContactStore.userId);

		let selectedContact;
		if (this.props.selectedContactStore) {
			selectedContact = this.props.selectedContactStore;
		} else {
			selectedContact =
				(this.props.location.state &&
					this.props.location.state.selectedContact) ||
				{};
		}
		this.updateSelectedContact(this.props, selectedContact);

		if (this.props?.selectedContactStore?.userId) {
			const history_user =
				this.props.contactsCallHistory[
					this.props.selectedContactStore.userId
				] || [];
			this.setState({ history_user });
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (
			this.props.allProfileImages &&
			!_.isEqual(this.props.allProfileImages, prevState.allProfileImages)
		) {
			this.setState({
				allProfileImages: {
					...this.props.allProfileImages,
				},
			});
		}

		if (
			this.props.accepted &&
			prevProps.accepted &&
			this.props.accepted.length !== prevProps.accepted.length &&
			!this.props.contactRemovingStatus
		) {
			let onlyInA = prevProps.accepted.filter(
				this.comparerArray(this.props.accepted)
			);
			let onlyInB = this.props.accepted.filter(
				this.comparerArray(prevProps.accepted)
			);
			let result = onlyInA.concat(onlyInB);
			this.selectContact(result[0]);
		}

		if (
			this.props.localContacts.length !== prevProps.localContacts.length &&
			!this.props.contactRemovingStatus
		) {
			let onlyInA = prevProps.localContacts.filter(
				this.comparerArray(this.props.localContacts)
			);
			let onlyInB = this.props.localContacts.filter(
				this.comparerArray(prevProps.localContacts)
			);
			let result = onlyInA.concat(onlyInB);

			this.selectContact(result[0]);
		}

		if (
			!_.isEqual(this.props.accepted, prevState.accepted) ||
			!_.isEqual(this.props.localContacts, prevState.localContacts) ||
			!_.isEqual(this.props.vessels, prevState.vessels) ||
			this.props.accepted.length !== prevState.accepted.length ||
			this.props.localContacts.length !== prevState.localContacts.length ||
			this.props.vessels.length !== prevState.vessels.length
		) {
			this.setState({
				accepted: [...this.props.accepted],
				localContacts: [...this.props.localContacts],
				vessels: this.props.vessels,
			});
		}

		if (
			this.props?.selectedContactStore?.userId &&
			this.props.selectedContactStore.userId !==
				prevProps.selectedContactStore.userId
		) {
			const history_user =
				this.props.contactsCallHistory[
					this.props.selectedContactStore.userId
				] || [];
			this.setState({ history_user });
			this.props.setCallHistory(this.props.selectedContactStore.userId);
		}

		if (
			this.props.location?.state?.onlyVoip &&
			!_.isEqual(this.props.location.state, prevProps.location.state)
		) {
			let selectedContact = this.props.location.state.selectedContact;
			selectedContact &&
				this.updateSelectedContact(this.props, selectedContact);
		}

		if (
			this.state &&
			this.state.selectedContact &&
			!_.isEqual(this.props.location.state, prevProps.location.state)
		) {
			this.state.selectedContact &&
				this.updateSelectedContact(this.props, this.state.selectedContact);
		}
	}

	comparerArray = (otherArray) => {
		return function (current) {
			return (
				otherArray.filter(function (other) {
					return other.userId === current.userId;
				}).length === 0
			);
		};
	};

	updateSelectedContact = (props, selectedContact) => {
		if (props && props.accepted) {
			props.accepted.forEach((acceptedContact) => {
				if (acceptedContact.userId === selectedContact.userId) {
					this.setState({
						selectedContact: acceptedContact,
					});
				}
			});
		}

		if (props && props.localContacts) {
			props.localContacts.forEach((localContact) => {
				if (localContact.userId === selectedContact.userId) {
					this.setState({
						selectedContact: localContact,
					});
				}
			});
		}
	};

	selectContact = (contact, imgSrc) => {
		if (contact) {
			contact["profilePhoto"] = imgSrc;
			this.props.selectedContactAction(contact);
			const selectedContactsCallHistory =
				contact && this.props.contactsCallHistory[contact.userId];
			if (
				selectedContactsCallHistory &&
				selectedContactsCallHistory.length === 0
			) {
				this.props.setCallHistory(contact.userId);
			}

			this.setState({
				selectedContact: contact,
			});
		}
	};

	startConversation = (contact) => {
		const { createConversation, userId, history } = this.props;
		createConversation(contact, userId);
		history.push("/app/chats");
	};

	startRemoveContact = (contact) => {
		this.setState({ contactToRemove: contact });
	};

	cancelRemoveContact = () => {
		this.setState({ contactToRemove: null });
	};

	removeContact = () => {
		store.dispatch(removeContactStatus(false));
		let type = this.state.contactToRemove.contactType || "frontm";
		let dataToDelete = { ...this.state.contactToRemove };

		if (type === "local") {
			removeContacts(dataToDelete, type)
				.then(() => {
					setTimeout(() => {
						this.props.getFavourite({
							selectedDomain: this.props.selectedDomain.userDomain,
						});
						store.dispatch(removeContactStatus(true));
						this.props.removeSelectedContact();
						this.props.getTimeLine();
					}, 3000);
					let stateShowSidebar = false;

					if (this.props.location.state.showSidebar) {
						stateShowSidebar = this.props.location.state.showSidebar;
					}
					this.props.history.replace({
						...history.location,
						showSidebar: stateShowSidebar,
					});
					this.setState({
						contactRemovingStatus: true,
						selectedContact: {},
						contactToRemove: null,
						showAcceptIgnore: false,
					});
				})
				.catch(() => {
					NotifyClassComp({
						type: "error",
						message: `Error while removing the contact ${dataToDelete.userName}. Please try again later.`,
					});
				});
		} else {
			removeContacts([this.state.contactToRemove.userId], type)
				.then(() => {
					this.props.getTimeLine();
					setTimeout(() => {
						this.props.getFavourite({
							selectedDomain: this.props.selectedDomain.userDomain,
						});
						store.dispatch(removeContactStatus(true));
						this.props.removeSelectedContact();
					}, 3000);

					let stateShowSidebar = false;

					if (this.props.location.state.showSidebar) {
						stateShowSidebar = this.props.location.state.showSidebar;
					}
					this.props.history.replace({
						...history.location,
						showSidebar: stateShowSidebar,
					});
					this.setState({
						contactRemovingStatus: true,
						selectedContact: {},
						contactToRemove: null,
						showAcceptIgnore: false,
					});
				})
				.catch(() => {
					NotifyClassComp({
						type: "error",
						message: `Error while removing the contact ${dataToDelete.userName}. Please try again later.`,
					});
				});
		}
	};

	cacheContactAction = async (user, action) => {
		let selectedDomain = store.getState().selectedDomain.userDomain;
		let contactsList =
			(await getDataFromLFStorage(
				`${LFStorageKeys.CONTACTS}_${selectedDomain}`
			)) || [];

		if (contactsList) {
			if (action === "accept") {
				// set the accept ignore flag false
				contactsList.contacts.forEach((contact) => {
					if (contact.userId === user.userId) {
						contact.showAcceptIgnoreMsg = false;
						this.props.selectedContactAction(contact);
					}
				});
			} else if (action === "ignore") {
				// remove from contacts list
				contactsList.contacts = contactsList.contacts.filter(
					(contact) => contact.userId !== user.userId
				);
				// Add it in ignore list
				contactsList.ignored.push({
					userId: user.userId,
					userName: user.userName,
				});
				this.props.removeSelectedContact();
			}

			saveDataInLFStorage(
				`${LFStorageKeys.CONTACTS}_${selectedDomain}`,
				contactsList
			);
			store.dispatch(syncContactsWithCache(contactsList));
		}
	};

	accept = (contactUserId) => {
		let user = this.props.selectedContactStore;
		this.cacheContactAction(user, "accept");
		acceptContacts([contactUserId])
			.then(() => {
				setTimeout(() => {
					this.props.clearAcceptIgnoreButtons();
					this.props.clearAcceptIgnoreContact();
					this.props.getTimeLine();
				}, 3000);
				NotifyClassComp({
					type: "success",
					message: `Contact ${user.userName} is accepted`,
				});
			})
			.catch(() => {
				NotifyClassComp({
					type: "error",
					message: `Error while accepting the contact ${user.userName}. Please try again later.`,
				});
			});
	};

	ignore = (contactUserId) => {
		let user = this.props.selectedContactStore;
		this.cacheContactAction(user, "ignore");
		store.dispatch(removeContactStatus(false));
		ignoreContacts([contactUserId])
			.then(() => {
				setTimeout(() => {
					store.dispatch(removeContactStatus(true));
					this.props.removeSelectedContact();
					this.props.clearAcceptIgnoreButtons();
					this.props.clearAcceptIgnoreContact();
					this.props.getTimeLine();
					this.props.history.replace("/app/contacts");
					this.setState({
						contactRemovingStatus: true,
						selectedContact: null,
					});
				}, 3000);
				NotifyClassComp({
					type: "success",
					message: `Contact ${user.userName} is ignored`,
				});
			})
			.catch(() => {
				NotifyClassComp({
					type: "error",
					message: `Error while ignoring the contact ${user.userName}. Please try again later.`,
				});
			});
	};

	render() {
		let {
			selectedContact,
			contactToRemove,
			history_user,
			accepted,
			localContacts,
			vessels,
			allProfileImages,
		} = this.state;

		return (
			<div
				className="Contact-contentarea"
				style={{
					background: "url('/offlinelms/img/welcomescreen-background.png')",
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
				}}
			>
				<ContactsListView
					{...this.props}
					accepted={accepted}
					localContacts={localContacts}
					vessels={vessels}
					allProfileImages={allProfileImages}
					style={{ flex: 1.5, backgroundColor: "#fff" }}
					selectContact={this.selectContact}
					selectedId={
						this.props.selectedContactStore
							? this.props.selectedContactStore.userId
							: null
					}
				/>

				<ContactDetailsView
					{...this.props}
					style={{ flex: 3 }}
					allProfileImages={allProfileImages}
					callhistory={history_user}
					contact={selectedContact}
					startConversation={this.startConversation}
					remove={this.startRemoveContact}
					accept={this.accept}
					ignore={this.ignore}
					sendMsgForBanner={this.props.sendMsgForBanner}
					updateContactSelected={(data) => {
						this.setState({
							selectedContact: data,
						});
					}}
				/>

				{contactToRemove && (
					<ModalPopup
						onClose={this.cancelRemoveContact}
						size="sm"
						title="Remove Contact"
					>
						<ContactRemovalConfirmation
							contact={contactToRemove}
							cancel={this.cancelRemoveContact}
							remove={this.removeContact}
						/>
					</ModalPopup>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
		contactsCallHistory: state.user.contactsCallHistory,
		contactRemovingStatus: state.contacts.contactRemovingStatus,
		newContactCreated: state.contacts.newContactCreatedStatus,
		allProfileImages: state.profileImages || {},
	};
};

const mapDispatchToProps = {
	setCallHistory,
	clearAcceptIgnoreButtons,
	clearAcceptIgnoreContact,
	syncContactsWithCache,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactsView);
