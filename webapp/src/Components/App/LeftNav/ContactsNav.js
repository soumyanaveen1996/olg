import React, { PureComponent } from "react";
import { NavLink } from "react-router-dom";
import _ from "lodash";
import { connect } from "react-redux";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LeftNavContact from "./LeftNavContact";
import ModalPopup from "../../ModalMessages/ModalPopup";
import AddContactMenu from "../../Contacts/AddContactMenu";
import store from "../../../State/configureStore";
import { setCallHistory } from "../../../State/actions/user";
import { styled } from "@mui/material";

const R = require("ramda");

const CustomizedAccordion = styled(Accordion)({
	width: "100%",
	background: "none",
	boxShadow: "none",
	padding: 0,
	marginBottom: "10px",
});
const CustomizedAccordionSummary = styled(AccordionSummary)({
	minHeight: "36px",
	height: "36px",
	padding: "5px 0",
	fontFamily: "SF Pro Display Medium",
});
class ContactsNav extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			active: true,
			newContacts: [],
			frontMContacts: [],
			contacts: [],
			selContact: null,
		};
	}

	componentDidMount() {
		let newContacts = [];
		this.setContactsList(this.props);
		this.setState({ newContacts, tooltipOpenContactConfig: false });
	}

	componentDidUpdate(prevProps) {
		if (!_.isEqual(this.props, prevProps)) {
			let onlyInA =
				prevProps.localContacts &&
				prevProps.localContacts.filter(this.comparer(this.props.localContacts));
			let onlyInB =
				this.props.localContacts &&
				this.props.localContacts.filter(this.comparer(prevProps.localContacts));

			let result = onlyInA && onlyInA.concat(onlyInB);
			if (this.props.newContactCreated) {
				if (result.length > 0) {
					let contact = result[0];
					contact["contactType"] = "local";
					this.props.selectedContactAction(contact);
					const selectedContactsCallHistory =
						contact &&
						this.props.contactsCallHistory &&
						this.props.contactsCallHistory[contact.userId];

					if (
						!selectedContactsCallHistory ||
						(selectedContactsCallHistory &&
							selectedContactsCallHistory.length === 0)
					) {
						store.dispatch(setCallHistory(contact.userId));
					}

					if (this.props.selectedDomain.viewModes.chat) {
						this.props.history.push({
							pathname: "/app/contacts",
							state: {
								onlyVoip: false,
								selectedContact: contact,
								showSidebar: true,
							},
						});
					} else {
						this.props.history.push({
							pathname: "/app/contacts",
							state: {
								onlyVoip: true,
								selectedContact: contact,
								showSidebar: false,
							},
						});
					}
				}
			}
			this.setContactsList(this.props);
		}
	}

	comparer = (otherArray) => {
		return function (current) {
			return (
				otherArray.filter(function (other) {
					return other.userId === current.userId;
				}).length === 0
			);
		};
	};

	setContacts(newProps) {
		let frontMContacts = [];
		let contacts = [];

		frontMContacts = newProps.contacts.filter(
			(contact) => !contact.waitingForConfirmation
		);
		contacts = [
			...frontMContacts,
			...newProps.localContacts,
			...newProps.vessels,
		];
		this.setState({ contacts: contacts });
	}

	setContactsList = (dataProps) => {
		let frontMContacts = [];
		let allcontacts = [];

		const { timeLine, contacts } = dataProps;

		const timeLineContacts = timeLine.filter((conv) => !R.isNil(conv.contact));

		if (contacts) {
			frontMContacts = contacts.filter(
				(contact) => !contact.waitingForConfirmation
			);
			frontMContacts = [
				...new Map(frontMContacts.map((item) => [item.userId, item])).values(),
			];
		}
		const contactsMessageCount = frontMContacts.map((contact) => {
			const tlContact = timeLineContacts.find(
				(conv) => conv.contact.userId === contact.userId
			);
			if (tlContact && tlContact.newMessagesCount) {
				return {
					...contact,
					newMessagesCount: tlContact.newMessagesCount,
				};
			} else {
				return {
					...contact,
					newMessagesCount: 0,
				};
			}
		});
		let localContactsArr = [];
		if (dataProps.localContacts) {
			localContactsArr = dataProps.localContacts;
		}

		allcontacts = [
			...contactsMessageCount,
			...localContactsArr,
			...dataProps.vessels,
		];
		allcontacts = this.sortContacts(allcontacts);
		this.setState({ contacts: allcontacts });
	};

	sortContacts = (contacts) => {
		return contacts.sort((contactA, contactB) => {
			const nameA = contactA.type
				? contactA.name || ""
				: contactA.userName || "";
			const nameB = contactB.type
				? contactB.name || ""
				: contactB.userName || "";
			if (nameA.toUpperCase() > nameB.toUpperCase()) {
				return 1;
			}
			return -1;
		});
	};

	openContact = (contact) => {
		const {
			createConversation,
			userId,
			history,
			selectedContactAction,
			contactsCallHistory,
		} = this.props;

		const selectedContactsCallHistory =
			contact && contactsCallHistory && contactsCallHistory[contact.userId];
		if (
			!selectedContactsCallHistory ||
			(selectedContactsCallHistory && selectedContactsCallHistory.length === 0)
		) {
			store.dispatch(setCallHistory(contact.userId));
		}
		if (this.props.selectedDomain.viewModes.chat) {
			if (contact.contactType && contact.contactType === "local") {
				this.setState({ selContact: contact });
				history.push({
					pathname: "/app/contacts",
					state: {
						onlyVoip: false,
						selectedContact: contact,
						showSidebar: false,
					},
				});
			} else {
				createConversation(contact, userId);
				history.push("/offlinelms/app/chats");
			}
		} else {
			this.setState({ selContact: contact });
			history.push({
				pathname: "/app/contacts",
				state: {
					onlyVoip: true,
					selectedContact: contact,
					showSidebar: false,
				},
			});
		}
		selectedContactAction(contact);
	};

	showAddContact = () => this.setState({ addContactMenu: true });
	closeAddContact = () => this.setState({ addContactMenu: false });
	toggleTooltipContacts = () => {
		this.setState({
			tooltipOpenContactConfig: !this.state.tooltipOpenContactConfig,
		});
	};

	countUnread = () => {
		const usersMessagesUnread = {};
		if (this.props.timeLine.length > 0) {
			this.props.timeLine.forEach((ele) => {
				if (ele.bot && ele.bot.botId === "im-bot" && ele.contact) {
					usersMessagesUnread[ele.contact.userId] = ele.unreadCount;
				}
			});
		}
		return usersMessagesUnread;
	};

	render() {
		let { userId, selectedConversation, selectedDomain } = this.props;
		const usersMessagesUnread = this.countUnread();
		let active = false;
		let { contacts } = this.state;

		let defaultClassNames =
			"d-flex justify-content-between align-items-center appnav-link-link";

		return (
			<li className="contact-intro">
				<CustomizedAccordion defaultExpanded>
					<CustomizedAccordionSummary
						expandIcon={
							<ExpandMoreIcon
								style={{ color: "white" }}
								className="contact-config-intro"
							/>
						}
						aria-label="Expand"
						aria-controls="contacts-list"
						id="contacts-sidebar"
					>
						<div className={defaultClassNames}>
							<span
								className="list-item active d-flex align-items-center justify-content-between"
								style={{
									fontSize: "14px",
									color: "#fff",
									marginBottom: 0,
									width: "100%",
								}}
								onClick={(event) => event.stopPropagation()}
								onFocus={(event) => event.stopPropagation()}
							>
								<NavLink
									to={{
										pathname: "/app/contacts",
										state: {
											selectedDomain: this.props.selectedDomain,
											showSidebar: true,
											showContactTitle: true,
										},
									}}
									className="appnav-link-gear d-flex align-items-center justify-content-between"
									activeClassName="appnav-link-active"
									style={{ margin: "0px" }}
								>
									<div className="d-flex align-items-center">
										<span className="list-title text-white fs14 no-pointer">
											Contacts
										</span>
									</div>
								</NavLink>
							</span>
						</div>
					</CustomizedAccordionSummary>
					<CustomizedAccordion>
						<ul>
							{contacts.map((contact, index) => {
								if (contact.userId === userId) {
									return false;
								}

								if (
									this.props.selectedDomain &&
									this.props.selectedDomain.viewModes.chat
								) {
									active =
										selectedConversation &&
										selectedConversation.contact &&
										contact.userId === selectedConversation.contact.userId;
								} else {
									if (
										this.state.selContact &&
										this.state.selContact.type === "Vessels"
									) {
										active = contact.siteId === this.state.selContact.siteId;
									} else {
										active = this.state.selContact
											? contact.userId === this.state.selContact.userId
											: false;
									}
								}
								return (
									<li key={index} style={{ margin: "0px", padding: "8px 0" }}>
										<div>
											<LeftNavContact
												userId={userId}
												key={contact.userId}
												allProfileImages={this.props.allProfileImages}
												contact={contact}
												openContact={this.openContact}
												active={active}
												usersMessagesUnread={usersMessagesUnread}
												selectedChat={this.props.selectedChat}
											/>
										</div>
									</li>
								);
							})}
							<li style={{ margin: "0px", padding: "8px 0" }}>
								<a
									style={{
										borderRadius: "2px",
										boxShadow: "none",
										padding: "0 2px",
										lineHeight: "15px",
										fontSize: "0.8rem",
										color: "#638DFF",
									}}
									onClick={this.showAddContact}
								>
									<img
										loading="lazy"
										src="/offlinelms/img/plus-icon.png"
										alt="plus"
										width={10}
										className="mr-2"
									/>{" "}
									<span>Add contact</span>
								</a>
							</li>
						</ul>
					</CustomizedAccordion>
				</CustomizedAccordion>

				{this.state.addContactMenu && (
					<ModalPopup
						onClose={this.closeAddContact}
						size="sm"
						title="Add Contact"
					>
						<AddContactMenu
							selectedContactAction={this.props.selectedContactAction}
							{...this.props}
							selectedDomain={selectedDomain}
							cancel={this.closeAddContact}
							fetchContacts={(data) => this.props.fetchContacts(data, true)}
						/>
					</ModalPopup>
				)}
			</li>
		);
	}
}
function mapStateToProps(state) {
	// console.log("New", state.contacts.selectedContact.userName)
	return {
		timeLine: state.chats.timeLine,
		selectedChat: state.chats.selectedConversation?.contact?.userId
			? state.chats.selectedConversation?.contact?.userId
			: "",
		selectedContactDisplay: state.contacts.selectedContact.userName,
	};
}
export default connect(mapStateToProps)(ContactsNav);
// export default ContactsNav;
