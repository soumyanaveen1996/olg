/* eslint-disable react/no-unsafe */
import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import ChatsView from "../Components/Interactions/ChatsView";
import {
	changeConversation,
	closeSmartReply,
	closeContentArea,
	createConversation,
	sendAMessage,
	openContent,
	initiateConversationForLink,
	updateWindowTitle,
	closeSearchBox,
	sendSearchBoxQuery,
	getFrontMAssistant,
	getTimeLine,
	fetchArchivedMessages,
	setScrollPositionForConversation,
	removeHTMLCotent,
	changeSelectedConversation,
} from "./../State/actions/chats";
import Notify from "../Components/ModalMessages/ToastNotif";
import ModalPopup from "../Components/ModalMessages/ModalPopup";
import { addContacts } from "../Services/ContactsService";
import { fetchContacts } from "../State/actions/contacts";
import NonConversationalChatView from "../Components/Interactions/NonConversationalChatView";
import { refreshAnonymousUserSession } from "../State/actions/user";
import history from "../Services/History";
import {
	sendMessage,
	getOutgoingMessageRequest,
} from "../Services/InteractionsService";
import { MessageTypeConstants } from "../Services/Message";
import NonConversationalView from "../v2/Containers/NonConversational/NonConversationalView/NonConversationalView";
import ErrorBoundary from "../Components/ErrorBoundary/ErrorBoundary";

import Spinner from "../Components/Spinner";
const HALF_HOUR = 30 * 60 * 1000;

const loadCustomCSS = (css) => {
	if (css) {
		let headID = window.document.getElementsByTagName("head")[0];
		let link = window.document.createElement("link");
		link.type = "text/css";
		link.rel = "stylesheet";
		headID.appendChild(link);
		link.id = "CUSTOM_CSS";
		link.href = css;
	} else {
		//Remove the CSS - TODO
		let customCSSLink = window.document.getElementById("CUSTOM_CSS");
		if (customCSSLink) customCSSLink.remove();
	}
};

class ChatsContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showSaveContactPopup: false,
			conversational: false,
			timeLine: [],
			allProfileImages: {},
			selectedConversation: null,
			showMoveToHome: false,
		};
	}

	componentDidMount() {
		let { state } = this.props.location;
		console.log("HERE*******************", state);

		if (this.props.selectedConversation) {
			if (state && state.paramArgs) {
				//taking data from ulr params and calling the message api. One of our client SITA requirement flight search
				let conversation = {
					...this.props.selectedConversation,
					args: { ...state.paramArgs },
				};
				sendMessage(
					getOutgoingMessageRequest(conversation, "startConversation", {
						message: "",
						messageType: MessageTypeConstants.MESSAGE_TYPE_STRING,
					})
				);
			}
			updateWindowTitle(this.props.selectedConversation);
			this.setState({ selectedConversation: this.props.selectedConversation });
		}

		setInterval(() => {
			this.props.isAnonymousUser &&
				!this.props.isRefreshAnonymousSessionBeingCalled &&
				this.props.refreshAnonymousUserSession();
		}, HALF_HOUR);
		const message = state ? state.message : "";
		if (message && message.length !== 0) {
			Notify({
				type: "success",
				message: message,
			});
			delete state.message;
			this.props.history.replace({ state: { ...state } });
		}

		if (this.props.allProfileImages) {
			this.setState({
				allProfileImages: this.props.allProfileImages,
			});
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (
			this.props.selectedConversation &&
			prevProps?.selectedConversation?.customCSS !==
				this.props?.selectedConversation?.customCSS
		) {
			loadCustomCSS(this.props?.selectedConversation?.customCSS);
		}
		if (
			this.props.conversational &&
			this.props.conversational !== prevState.conversational
		) {
			this.setState({ conversational: this.props.conversational });
		}
		if (
			this.props.timeLine &&
			!_.isEqual(this.props.timeLine, prevState.timeLine)
		) {
			this.setState({ timeLine: this.props.timeLine });
		}

		if (
			this.props.selectedConversation &&
			!_.isEqual(
				this.props.selectedConversation,
				prevState.selectedConversation
			)
		) {
			this.setState({ selectedConversation: this.props.selectedConversation });
		}

		if (
			this.props.allProfileImages &&
			!_.isEqual(this.props.allProfileImages, prevProps.allProfileImages)
		) {
			this.setState({
				allProfileImages: this.props.allProfileImages,
			});
		}
	}

	closeSaveContactPopup = () => {
		this.setState({ showSaveContactPopup: false, contactToSave: null });
	};

	saveContactSendRequest = () => {
		let contactData = this.state.contactToSave;
		let saveArray = [];
		let saveType = "";

		if (contactData?.contactType && contactData?.contactType == "local") {
			saveArray.push(contactData);
			saveType = "form";
		} else {
			saveArray.push(contactData?.userId);
			saveType = "search";
		}
		addContacts(saveArray, saveType)
			.then(() => {
				setTimeout(() => {
					this.props.fetchContacts(
						{
							selectedDomain: this.props.selectedDomain.userDomain,
						},
						true
					);
				}, 3000);
				this.closeSaveContactPopup();
			})
			.catch((error) => {
				console.log("error ", error);

				Notify({
					type: "error",
					message: "Error while adding the contacts. Please try again later.",
				});
			});
	};

	saveContactPopUp = (elem, index) => {
		console.log("saveContactPopUp", index);
		this.setState({
			showSaveContactPopup: true,
			contactToSave: elem,
		});
	};

	renderChat = () => {
		let checkConversationalType;
		//old code
		//checkConversationalType = this.state.conversational || false;

		//new Code
		if (this.state.selectedConversation) {
			//checking for channel and contact and setting the conversation type to true
			if (
				Object.prototype.hasOwnProperty.call(
					this.state.selectedConversation,
					"channel"
				) ||
				Object.prototype.hasOwnProperty.call(
					this.state.selectedConversation,
					"contact"
				)
			) {
				if (this.state.selectedConversation.bot) {
					if (
						Object.prototype.hasOwnProperty.call(
							this.state.selectedConversation.bot,
							"conversational"
						)
					) {
						checkConversationalType =
							this.state.selectedConversation.bot.conversational;
					} else {
						checkConversationalType = true;
					}
				} else {
					checkConversationalType = true;
				}
			} else {
				if (this.state.selectedConversation.bot) {
					if (
						Object.prototype.hasOwnProperty.call(
							this.state.selectedConversation.bot,
							"conversational"
						)
					) {
						checkConversationalType =
							this.state.selectedConversation.bot.conversational;
					} else {
						if (this.state.conversational) {
							checkConversationalType = true;
						} else {
							checkConversationalType = false;
						}
					}
				} else {
					checkConversationalType = true;
				}
			}
		}

		// console.log(
		//   "render chat =====",
		//   checkConversationalType,
		//   this.state.conversational,
		//   this.state.selectedConversation
		// );
		// console.log("enableNewUi", isNewUIEnable());
		switch (checkConversationalType) {
			case true:
				return (
					<ChatsView
						{...this.props}
						timeLineData={this.state.timeLine}
						openModalToHome={this.openModalToHome}
						allProfileImages={this.state.allProfileImages}
						saveContactPopUp={this.saveContactPopUp}
					/>
				);

			case false:
				if (this.props.modal !== undefined && !this.props.modal) {
					return (
						<NonConversationalView
							conversationId={this.props.selectedConversation.conversationId}
						/>
					);
				}
				return (
					<NonConversationalChatView saveContactPopUp={this.saveContactPopUp} />
				);

			default:
				return (
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							width: "100%",
							height: "100%",
						}}
					>
						<Spinner />
					</div>
				);
		}
	};

	openModalToHome = () => {
		this.setState({
			showMoveToHome: true,
		});
	};

	closeModalToHome = () => {
		this.setState({
			showMoveToHome: false,
		});
		history.push({
			pathname: "/app/home",
		});
	};

	componentWillUnmount() {
		this.props.changeSelectedConversation(null, false);
	}

	render() {
		return (
			<>
				{this.state.selectedConversation ? (
					this.renderChat()
				) : (
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							width: "100%",
							height: "100%",
						}}
					>
						<Spinner />
					</div>
				)}

				{this.state.showMoveToHome && (
					<ModalPopup size="sm" noheader>
						<div className="p-2">
							<div>
								<p className="textAlign-center fs16">
									You ignored the contact. You are being redirected to Home
									page.
								</p>
							</div>
							<div>
								<div className="p-4 d-flex justify-content-center align-items-center mt-3">
									<a
										className="btn btn-lg btn-open m-1"
										onClick={this.closeModalToHome}
										style={{ height: "40px", width: "100px" }}
									>
										OK
									</a>
								</div>
							</div>
						</div>
					</ModalPopup>
				)}

				{this.state.showSaveContactPopup && (
					<ModalPopup onClose={this.closeSaveContactPopup} size="sm" noHeader>
						<div className="p-2">
							<div>
								<p className="textAlign-center fs16">
									Do you want to add <b>{this.state.contactToSave.userName}</b>{" "}
									as a contact ?
								</p>
							</div>
							<div>
								<div className="p-4 d-flex justify-content-center align-items-center mt-3">
									<a
										className="btn btn-lg btn-cancel m-1"
										onClick={this.closeSaveContactPopup}
										style={{ height: "40px", width: "100px" }}
									>
										<i
											className="icon-cross mr-2"
											style={{ fontWeight: "bold" }}
										/>{" "}
										No
									</a>
									<a
										className="btn btn-lg btn-open m-1"
										onClick={this.saveContactSendRequest}
										style={{ height: "40px", width: "100px" }}
									>
										<i
											className="icon-check mr-2"
											style={{ fontWeight: "bold" }}
										/>{" "}
										yes
									</a>
								</div>
							</div>
						</div>
					</ModalPopup>
				)}
			</>
		);
	}
}

const mapActionToProps = {
	changeConversation: changeConversation,
	createConversation: createConversation,
	sendAMessage: sendAMessage,
	closeSmartReply: closeSmartReply,
	closeContentArea: closeContentArea,
	openContent: openContent,
	initiateConversationForLink: initiateConversationForLink,
	closeSearchBox: closeSearchBox,
	sendSearchBoxQuery: sendSearchBoxQuery,
	getFrontMAssistant,
	getTimeLine,
	fetchContacts,
	fetchArchivedMessages,
	setScrollPositionForConversation,
	refreshAnonymousUserSession,
	removeHTMLCotent: removeHTMLCotent,
	changeSelectedConversation,
};

const mapDataToProps = (state) => {
	let chats = state.chats;
	let conversation = chats.selectedConversation;
	let selectedConversationId = conversation && conversation.conversationId;
	// console.log("we will see all the message  =========", state.chats);

	return {
		spinner: state.spinner,
		showHTMLContent: state.chats.showHTMLContent,
		userId: state.user.user.userId,
		isAnonymousUser: state.user.isAnonymousUser || false,
		allBots: state.user.botSubscriptions,
		timeLine: state.chats.timeLine,
		selectedConversation: conversation,
		messages: conversation
			? state.chats.chatLog.get(conversation.conversationId) || []
			: [],
		conversationPaginationParameterMap: conversation
			? state.chats.conversationPaginationParameterMap[
					conversation.conversationId
			  ] || {}
			: {},
		shouldScrollToTop: conversation
			? state.chats.shouldScrollToTopConversationMap[
					conversation.conversationId
			  ] || false
			: false,
		contentMessage:
			chats.contentMessage && chats.contentMessage[selectedConversationId],
		displayContentMessage: chats.contentMessage,
		smartReplyMessage:
			selectedConversationId &&
			chats.smartReplyMessage &&
			chats.smartReplyMessage[selectedConversationId],
		disableMessageInput: chats.disableMessageInput,
		mainChatHeight: chats.mainChatHeight,
		linkData: chats.linkData,
		hiddenTimeLine: state.chats.hiddenTimeLine,
		showWaitSpinner: state.chats.showWaitSpinner,
		contacts: [...state.contacts.accepted, ...state.contacts.localContacts],
		searchBoxMessage: state.chats.searchBoxMessage,
		selectedDomain: state.selectedDomain,
		notificationTypes: state.appNotification.notificationTypes,
		notificationShow: state.appNotification.show,
		offlineBannerVisibility: state.offlineBanner.visibility,
		componentInWindow: chats.componentInWindow,
		conversational: selectedConversationId
			? (chats.conversationModeMap[selectedConversationId] &&
					chats.conversationModeMap[selectedConversationId].conversational) ||
			  false
			: false,
		background: selectedConversationId
			? (chats.conversationModeMap[selectedConversationId] &&
					chats.conversationModeMap[selectedConversationId].background) ||
			  {}
			: {},
		isRefreshAnonymousSessionBeingCalled:
			state.user.isRefreshAnonymousSessionBeingCalled,
		allProfileImages: state.profileImages || {},
		modal: state.chats.modal,
	};
};

export default React.memo(
	connect(mapDataToProps, mapActionToProps)(ChatsContainer)
);
