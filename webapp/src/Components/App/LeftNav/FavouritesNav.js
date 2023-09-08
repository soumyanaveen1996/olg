import React, { PureComponent } from "react";
import LeftNavConversation from "./LeftNavConversation";
import _ from "lodash";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
// import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import withStyles from "@mui/styles/withStyles";
import { styled } from "@mui/material";
import store from "../../../State/configureStore";
import { connect } from "react-redux";
import { setCallHistory } from "../../../State/actions/user";

const R = require("ramda");

// const styles = {
// 	root: {
// 		width: '100%',
// 		background: "none",
// 		boxShadow: "none",
// 		padding: 0,
// 		marginBottom: "10px",
// 	},
// 	header: {
// 		minHeight: "36px",
// 		height: "36px",
// 		padding: "5px 0",
// 		fontFamily: "SF Pro Display Medium",
// 	}
// };
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

class FavouritesNav extends PureComponent {
	constructor(props) {
		super(props);
		this.state = { active: true, newContacts: [] };
	}

	openChannel = (channel) => {
		let allChannels = this.state.allChannels;
		let channelToSend;
		this.props.subscribedChannels?.map((eachChannel) => {
			if (channel?.channelName == eachChannel.channelName) {
				channelToSend = eachChannel;
			}
		});
		this.props.history.push("/app/chats");
		this.props.initiateChannelConversation(channelToSend, () => {});
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
				history.push("/app/chats");
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

	componentDidMount() {
		let newContacts = [];
		this.setState({
			favourites: this.props.favourites,
			newContacts,
		});
	}

	componentDidUpdate(prevProps) {
		if (this.props.timeLine !== prevProps.timeLine) {
			const { timeLine, contacts } = this.props;
			const timeLineContacts = timeLine.filter(
				(conv) => !R.isNil(conv.contact)
			);

			const contactsMessageCount =
				contacts &&
				contacts.map((contact) => {
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
			this.setState({ newContacts: contactsMessageCount });
		}
		if (
			this.props.favourites &&
			!_.isEqual(this.props.favourites, prevProps.favourites)
		) {
			this.setState({ favourites: this.props.favourites });
		}
	}

	sortFavConversations = (favs) => {
		return favs.sort((favA, favB) => {
			const nameA = favA.channel
				? favA.channel.channelName
				: favA.contact
				? favA.contact.userName || ""
				: favA.bot.botName;
			const nameB = favB.channel
				? favB.channel.channelName
				: favB.contact
				? favB.contact.userName || ""
				: favB.bot.botName;
			if (nameA.toUpperCase() > nameB.toUpperCase()) {
				return 1;
			}
			return -1;
		});
	};
	openConversation = (conversation) => {
		if (conversation.contact) {
			this.openContact(conversation.contact);
		} else if (conversation.channel) {
			this.openChannel(conversation.channel);
		} else {
			let { changeConversation, history } = this.props;
			changeConversation(conversation);
			history.push("/app/chats");
		}
	};

	openWindow = () => {
		console.log("open");
	};

	render() {
		let { classes, selectedConversation } = this.props;
		let favourites = this.state.favourites || [];
		let classNames =
			"d-flex justify-content-between align-items-center appnav-link-link";

		if (favourites.length > 0) {
			return (
				<li className="favorites-intro">
					<CustomizedAccordion defaultExpanded>
						<CustomizedAccordionSummary
							expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
							aria-label="Expand"
							aria-controls="favs-list"
							id="favs-sidebar"
						>
							<div className={classNames}>
								<a
									className="list-item active d-flex align-items-center justify-content-between no-pointer"
									style={{
										fontSize: "14px",
										color: "#fff",
										marginBottom: 0,
										width: "100%",
									}}
								>
									<div className="d-flex align-items-center">
										<span className={"list-title text-white fs14 "}>
											Favourites
										</span>
									</div>
								</a>
							</div>
						</CustomizedAccordionSummary>
						<CustomizedAccordion>
							<ul>
								{favourites.map((conversation, index) => (
									<li key={index} style={{ margin: "0px", padding: "8px 0" }}>
										<div key={conversation.conversationId}>
											<LeftNavConversation
												userId={this.props.userId}
												allProfileImages={this.props.allProfileImages}
												conversation={conversation}
												openConversation={this.openConversation}
												selectedConversation={selectedConversation}
											/>
										</div>
									</li>
								))}
							</ul>
						</CustomizedAccordion>
					</CustomizedAccordion>
				</li>
			);
		} else {
			return null;
		}
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
// export default withStyles(styles)(FavouritesNav);
export default connect(mapStateToProps)(FavouritesNav);
