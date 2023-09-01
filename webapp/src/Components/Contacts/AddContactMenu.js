import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import ModalPopup from "../ModalMessages/ModalPopup";
import { addContacts, inviteByEmail } from "../../Services/ContactsService";
import { NotifyClassComp } from "../ModalMessages/ToastNotif";
import EmailInvitation from "./EmailInvitation";
import AddNewContactForm from "./AddNewContactForm";
import { search } from "../../Services/ContactsService";
import SelectedContact from "./SelectedContact";
import store from "../../State/configureStore";
import {
	newContactAddedStatus,
	syncContactsWithCache,
} from "../../State/actions/contacts";
import {
	getDataFromLFStorage,
	LFStorageKeys,
	saveDataInLFStorage,
} from "../../Services/LFStorage";

class AddContactMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			createConv: false,
			spinner: false,
		};
	}

	componentDidMount() {
		let domain = { ...this.props.selectedDomain };
		this.setState({ selectedDomain: domain });
	}

	showAddContact = () => this.setState({ addContact: true });
	closeAddContact = () => this.setState({ addContact: false });

	sendTheRequest = async (contact, index) => {
		let data = [];
		data.push(contact);
		let newContact = [...this.state.contacts];
		newContact[index].sending = true;
		newContact[index].spinner = true;
		this.setState({ contacts: [...newContact] });
		this.addContacts(data, index);

		// Update indexDB
		let contactsList =
			(await getDataFromLFStorage(
				`${LFStorageKeys.CONTACTS}_${this.state.selectedDomain.userDomain}`
			)) || [];

		if (contactsList) {
			contactsList.contacts.push({
				userId: contact,
				userName: newContact[index].userName,
				waitingForConfirmation: true,
			});
			saveDataInLFStorage(
				`${LFStorageKeys.CONTACTS}_${this.state.selectedDomain.userDomain}`,
				contactsList
			);
			store.dispatch(syncContactsWithCache(contactsList));
		}
	};

	addContacts = (users, ind) => {
		console.log("%c Adding contacts", "color: grey;", users);
		store.dispatch(newContactAddedStatus(false));
		addContacts(users, "search")
			.then(() => {
				store.dispatch(newContactAddedStatus(true));
				this.setState({ spinner: false });
				let newContact = [...this.state.contacts];
				newContact[ind].sentRequest = true;
				newContact[ind].spinner = false;
				this.setState({ contacts: newContact });
			})
			.catch((error) => {
				console.log("error ", error);
				this.setState({ spinner: false });
				NotifyClassComp({
					type: "error",
					message: "Error while adding the contacts. Please try again later.",
				});
			});
	};

	inviteByEmail = (emails) => {
		inviteByEmail(emails, this.props.selectedDomain.userDomain)
			.then(() => {
				NotifyClassComp({
					type: "success",
					message: "Invite sent successfully.",
				});
				this.closeSendInvite();
				this.props.cancel();
			})
			.catch((error) => {
				console.log("error ", error);

				NotifyClassComp({
					type: "error",
					message: "Error while sending the invite. Please try again later.",
				});
			});
	};

	addContactToCache = async (contactDetails) => {
		let selectedDomain = store.getState().selectedDomain.userDomain;
		let contactsList =
			(await getDataFromLFStorage(
				`${LFStorageKeys.CONTACTS}_${selectedDomain}`
			)) || [];

		if (contactsList) {
			contactsList.localContacts.push(contactDetails);
		}
		saveDataInLFStorage(
			`${LFStorageKeys.CONTACTS}_${selectedDomain}`,
			contactsList
		);
		store.dispatch(syncContactsWithCache(contactsList));
	};

	addNewContact = (data) => {
		let saveArray = [];

		let saveContactObj = {
			userName: data.name,
			emailAddresses: {},
			phoneNumbers: {},
			userId: data.userId,
		};

		if (!data.name || data.name === "") {
			return;
		}
		if (data.emailType.length > 0) {
			data.emailType.forEach((elem, index) => {
				if (elem.value) {
					if (index === 0) {
						saveContactObj.emailAddresses["home"] = elem.value;
					} else {
						saveContactObj.emailAddresses["work"] = elem.value;
					}
				}
			});
		}
		if (data.phoneType.length > 0) {
			data.phoneType.forEach((elem, index) => {
				if (elem.value) {
					if (index === 0) {
						saveContactObj.phoneNumbers["satellite"] = elem.value;
					} else if (index === 1) {
						saveContactObj.phoneNumbers["mobile"] = elem.value;
					} else {
						saveContactObj.phoneNumbers["land"] = elem.value;
					}
				}
			});
		}

		saveArray.push(saveContactObj);
		store.dispatch(newContactAddedStatus(false));
		addContacts(saveArray, "form")
			.then(() => {
				saveContactObj["contactType"] = "local";
				store.dispatch(newContactAddedStatus(true));

				this.props.selectedContactAction(saveContactObj);
				this.addContactToCache(saveContactObj);

				if (!this.props.selectedDomain.viewModes.chat) {
					if (this.props.history) {
						this.props.history.replace({
							...this.props.history.location,
							showSidebar: true,
						});
					}
				}
				this.closeAddNewContact();
				this.props.cancel();
			})
			.catch((error) => {
				console.log("error ", error);
				NotifyClassComp({
					type: "error",
					message: `Error while adding the contact ${data.name}. Please try again later.`,
				});
			});
	};

	onSearch = (e) => {
		this.setState({ search: e.target.value });
	};
	showSendInvite = () => {
		this.setState({ emailInvitation: true });
	};
	closeSendInvite = () => this.setState({ emailInvitation: false });

	showAddNewContact = () => this.setState({ addNewContact: true });
	closeAddNewContact = () => this.setState({ addNewContact: false });

	searchContacts = (e) => {
		e.preventDefault();
		search(this.state.search, this.props.selectedDomain.userDomain).then(
			(contacts) => {
				let newContacts = [...contacts];
				newContacts.forEach((element) => {
					element.sentRequest = false;
					element.spinner = false;
				});
				this.setState({ contacts: newContacts, showSearchResults: true });
			}
		);
	};

	selectedDomain = () => {
		if (
			["vikand", "vikanduat"].includes(this.state.selectedDomain?.userDomain)
		) {
			return "Vikand";
		} else if (["onship"].includes(this.state.selectedDomain?.userDomain)) {
			return this.state.selectedDomain?.userDomain;
		}
		return "FrontM";
	};

	render() {
		let { contacts } = this.state;

		return (
			<React.Fragment>
				<div className="p-2">
					<div className="p-4">
						<div className="d-flex w-75 mx-auto align-items-center p-2">
							<a onClick={this.showAddNewContact}>
								<img
									loading="lazy"
									className="icon-contact-menu"
									src="/img/create new contact-icon@2x.png"
									alt="createNewIcon"
								/>

								<span>Create new contact</span>
							</a>
						</div>
						<div className="d-flex w-75 mx-auto align-items-center p-2">
							<a onClick={this.showSendInvite}>
								<img
									loading="lazy"
									className="icon-contact-menu"
									src="/img/send-invitation-icon@2x.png"
									alt="sendEmailIcon"
								/>
								<span>Send an email invitation to a friend</span>
							</a>
						</div>
					</div>
					<hr />
					<div className="p-2">
						<form onSubmit={this.searchContacts}>
							<input
								placeholder={`Search ${this.selectedDomain()} user and press enter`}
								type="text"
								className="form-control form-control-lg"
								onChange={this.onSearch}
							/>
						</form>

						<Scrollbars
							autohide="true"
							style={
								this.state.showSearchResults
									? { height: "300px" }
									: { height: "10px" }
							}
						>
							<div className="flex p-1">
								<div className="pt-2">
									{contacts && contacts.length > 0 && (
										<div>
											{contacts.map((contact, index) => (
												<div className="my-3" key={index}>
													<SelectedContact
														index={index}
														contact={contact}
														requestSent={contact.sentRequest}
														spinner={contact.spinner}
														sending={contact.sending}
														allProfileImages={this.props.allProfileImages}
														sendTheRequest={this.sendTheRequest.bind(this)}
													/>
												</div>
											))}
										</div>
									)}

									{this.state.showSearchResults &&
										(!contacts || contacts.length === 0) && (
											<div className="text-center mt-4">
												No Contacts found for the given search criteria.
											</div>
										)}
								</div>
							</div>
						</Scrollbars>
					</div>
				</div>
				{this.state.emailInvitation && (
					<ModalPopup
						onClose={this.closeSendInvite}
						size="sm"
						title="Send an email invitation"
					>
						<EmailInvitation
							inviteMembers={this.inviteByEmail}
							cancel={this.closeSendInvite}
						/>
					</ModalPopup>
				)}

				{this.state.addNewContact && (
					<ModalPopup
						onClose={this.closeAddNewContact}
						size="sm"
						title="Add new contact"
					>
						<AddNewContactForm
							cancel={this.closeAddNewContact}
							addNewContact={this.addNewContact}
							edit={false}
						/>
					</ModalPopup>
				)}
			</React.Fragment>
		);
	}
}

export default AddContactMenu;
