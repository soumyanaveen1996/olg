import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import ChatMessages from "../../../../Components/Interactions/ChatMessages";
import ChatInputBox from "../../../../Components/Interactions/ChatInputBox";
import ChatSearchBox from "../../../../Components/Interactions/ChatSearchBox";
import PlainNotification from "../../../../Components/Interactions/chatNotificationPopup/PlainNotification";
import NotificationWithAction from "../../../../Components/Interactions/chatNotificationPopup/NotificationWithAction";
import {
	sendAMessage,
	closeSmartReply,
	openContent,
	closeSearchBox,
	sendSearchBoxQuery,
	setScrollPositionForConversation,
	fetchArchivedMessages,
	setFormInWindow,
	showChatNonConversational,
	removeCradsFromShowOnlyCards,
	removeHTMLCotent,
	setVideoText,
	setRing,
	removeRing,
} from "../../../../State/actions/chats";
import {
	IntToMessageTypeConstants,
	MessageTypeConstants,
} from "../../../../Services/Message";

const FIVE_SEC = 5 * 1000;

export class FMChatWidget extends Component {
	constructor(props) {
		super(props);

		this.state = {
			adjustedWidth: -1,
			showHtmlPopUp: false,
			isAnonymousUser: false,
			showCards: true,
			messages: [],
			background: {},
			planeRoutes: [],
			polylines: [],
			chatButtonHidden: true,
			showOnlyCards: [],
			showHTMLContent: "",
			showCardModal: false,
			cardModalObject: {},
			chatNotifications: [],
			notificationCount: 0,
			showIncomingCall: false,
			callAccepted: false,
			tempLastMessage: null,
			callRejected: false,
			recordAudio: false,
			recordingInProgress: false,
			file: null,
			conversationId: null,
			cardsDirect: [],
			mapRef: null,
			backgroundUrl: null,
			chatHidden: false,
			chatLength: 0,
		};
	}

	componentDidUpdate() {
		// show the chat if any
		if (
			this.state.chatNotifications.length > 0 &&
			this.state.chatLength !== this.state.chatNotifications.length
		) {
			this.setState({
				chatHidden: false,
				chatLength: this.state.chatNotifications.length,
			});

			// hide the chat after FIVE_SEC
			setTimeout(() => {
				this.setState({ chatHidden: true });
			}, FIVE_SEC);
		}
	}
	static getDerivedStateFromProps(nextProps, prevState) {
		// console.log("all new props ======= for geoJSON ", nextProps.background);

		if (nextProps.chatButtonHidden !== prevState.chatButtonHidden) {
			return { chatButtonHidden: nextProps.chatButtonHidden };
		}

		if (
			!_.isEqual(nextProps.background, prevState.background) ||
			Object.keys(nextProps.background).length !==
				Object.keys(prevState.background).length ||
			(Object.keys(nextProps.background).length > 0 &&
				Object.keys(prevState.background).length === 0)
		) {
			return { background: { ...nextProps.background } };
		}

		if (nextProps.isAnonymousUser !== prevState.isAnonymousUser) {
			return { isAnonymousUser: nextProps.isAnonymousUser };
		}

		if (
			nextProps.background &&
			nextProps.background.content &&
			nextProps.background.content.planeRoutes
		) {
			if (
				!_.isEqual(
					nextProps.background.content.planeRoutes,
					prevState.planeRoutes
				)
			) {
				// console.log("this is plan routes ", nextProps.background.content);

				return {
					planeRoutes: [...nextProps.background.content.planeRoutes],
				};
			}
		}
		if (
			nextProps.background &&
			nextProps.background.content &&
			nextProps.background.content.polylines
		) {
			if (
				!_.isEqual(nextProps.background.content.polylines, prevState.polylines)
			) {
				return {
					polylines: [...nextProps.background.content.polylines],
				};
			}
		}

		if (!_.isEqual(nextProps.showOnlyCards, prevState.showOnlyCards)) {
			return {
				showOnlyCards: [...nextProps.showOnlyCards],
			};
		}

		if (nextProps.showHTMLContent !== prevState.showHTMLContent) {
			return {
				showHTMLContent: nextProps.showHTMLContent,
				showHtmlPopUp: true,
			};
		}
		if (nextProps.messages.length !== prevState.messages.length) {
			const tempMessages = [...nextProps.messages];
			const unarchivedMessageList = tempMessages.filter(
				(message) => !message.archived
			);

			const updatedChatNotificationList =
				FMChatWidget.getUpdatedChatNotificationList(
					prevState.chatNotifications,
					unarchivedMessageList
				);

			const getNotificationCount = (chatNotificationList) => {
				const visibleNotifications = chatNotificationList.filter(
					(notification) => notification.show
				);
				return visibleNotifications.length;
			};

			return {
				messages: [...tempMessages],
				chatNotifications: updatedChatNotificationList,
				notificationCount: getNotificationCount(updatedChatNotificationList),
			};
		} else return null;
	}

	static getUpdatedChatNotificationList = (
		existingChatNotifications,
		unarchivedMessageList
	) => {
		const isOlderThan5Sec = (message) =>
			Date.now() > new Date(message.createdOn).getTime() + FIVE_SEC;

		const existInCurrentNotificationList = (message) => {
			for (let i = 0; i < existingChatNotifications.length; i++) {
				const notification = existingChatNotifications[i];
				if (notification.messageId === message.messageId) {
					return true;
				}
			}
			return false;
		};
		const chatNotificationList = unarchivedMessageList.filter((message) => {
			if (
				!isOlderThan5Sec(message) &&
				message.messageType === MessageTypeConstants.MESSAGE_TYPE_STRING &&
				typeof message.message === "string" &&
				!message.self &&
				!existInCurrentNotificationList(message)
			) {
				message.show = true;
				return message;
			}
		});

		const updatedChatNotificationList = [
			...existingChatNotifications,
			...chatNotificationList,
		];
		if (!_.isEmpty(updatedChatNotificationList)) {
			return updatedChatNotificationList.sort(function (a, b) {
				return (
					new Date(a.createdOn).getTime() - new Date(b.createdOn).getTime()
				);
			});
		}
		return [];
	};

	toggleChat = () => {
		this.props.showChatNonConversational(!this.props.showChat);
		const updatedChatNotifications = this.state.chatNotifications.map(
			(notification) => {
				delete notification.show;
				return notification;
			}
		);
		this.setState({
			chatNotifications: updatedChatNotifications,
			notificationCount: 0,
		});
	};

	render() {
		const {
			userId,
			selectedConversation,
			sendAMessage,
			conversationPaginationParameterMap,
			contentMessage,
			smartReplyMessage,
			disableMessageInput,
			mainChatHeight,
			closeSmartReply,
			openContent,
			closeContent,
			linkData,
			showWaitSpinner,
			contacts,
			searchBoxMessage,
			closeSearchBox,
			sendSearchBoxQuery,
			fetchArchivedMessages,
			shouldScrollToTop,
			allProfileImages,
		} = this.props;

		const {
			messages,
			background,
			showOnlyCards,
			chatNotifications,
			notificationCount,
		} = this.state;
		// let chatNotificationsDiv = null;
		// console.log("show cards ", showOnlyCards);
		let chatPopupClassName = "chat-popup";
		if (this.state.chatButtonHidden) {
			chatPopupClassName = chatPopupClassName + " without-chat-icon";
		} else {
			chatPopupClassName = chatPopupClassName + " with-chat-icon";
		}
		const chatNotificationsDiv = [];
		if (!_.isEmpty(chatNotifications)) {
			for (let i = 0; i < chatNotifications.length; i++) {
				const notification = chatNotifications[i];
				if (this.state.chatButtonHidden) {
					notification.show &&
						chatNotificationsDiv.push(
							<NotificationWithAction
								key={i}
								notification={notification}
								dismissNotification={this.dismissNotification}
							/>
						);
				} else {
					this.state.chatHidden == false &&
						notification.show &&
						chatNotificationsDiv.push(
							<PlainNotification
								notification={notification}
								key={notification.messageId}
							/>
						);
				}
			}
		}

		let { content } = background;
		if (!content) {
			content = {
				cards: [],
				options: {},
			};
		}
		const { cards } = content;
		const hasCards = cards && cards.length > 0;

		return (
			<div>
				<div
					className="chat-container-div"
					style={
						this.state.showCards && hasCards
							? {
									bottom: "285px",
									zIndex: "999",
							  }
							: {
									bottom: "35px",
									zIndex: "999",
							  }
					}
				>
					{" "}
					{this.props.showChat && (
						<div
							className="d-flex flex-column container-showChat"
							style={{
								background: "url('/img/welcomescreen-background.png')",
								backgroundSize: "cover",
								backgroundPosition: "center",
								backgroundRepeat: "no-repeat",
							}}
						>
							<div className="d-flex header-chat-title">
								<span className="chat-title"> Assistant </span>{" "}
							</div>{" "}
							<ChatMessages
								background={background}
								messages={messages}
								conversationPaginationParameterMap={
									conversationPaginationParameterMap
								}
								shouldScrollToTop={shouldScrollToTop}
								height={mainChatHeight}
								conversation={selectedConversation}
								self={userId}
								isContentShown={
									!!contentMessage // leave
								}
								openContent={
									openContent // leave
								}
								linkData={linkData}
								contentMessage={contentMessage}
								closeContent={closeContent}
								smartReplyMessage={
									smartReplyMessage // leave
								}
								sendMessage={sendAMessage}
								closeSmartReply={closeSmartReply}
								showWaitSpinner={showWaitSpinner}
								searchBoxMessage={searchBoxMessage}
								saveContactPopUp={this.props.saveContactPopUp}
								fetchArchivedMessages={fetchArchivedMessages}
							/>
							<div className="sidebar-body-footer d-flex p-3 align-items-center">
								<div className="input-group">
									{" "}
									{!searchBoxMessage && (
										<ChatInputBox
											allProfileImages={allProfileImages}
											isAnonymousUser={this.state.isAnonymousUser}
											background={background}
											isContentShown={!!contentMessage}
											contacts={contacts}
											conversation={selectedConversation}
											sendMessage={sendAMessage}
											disable={disableMessageInput}
										/>
									)}{" "}
									{searchBoxMessage && (
										<ChatSearchBox
											background={background}
											isContentShown={!!contentMessage}
											searchBoxMessage={searchBoxMessage}
											conversation={selectedConversation}
											sendMessage={sendAMessage}
											disable={disableMessageInput}
											closeSearchBox={closeSearchBox}
											sendSearchBoxQuery={sendSearchBoxQuery}
										/>
									)}{" "}
								</div>{" "}
							</div>{" "}
						</div>
					)}{" "}
					{!this.state.chatButtonHidden && (
						<div className="map-chat" onClick={this.toggleChat}>
							{" "}
							{!this.props.showChat ? (
								<div>
									{" "}
									{notificationCount > 0 && (
										<span className={"notification-count"}>
											{" "}
											{notificationCount}{" "}
										</span>
									)}{" "}
									<img src="/img/map-chat-icon@2x.png" alt="chat-icon" />
								</div>
							) : (
								<img
									style={{
										width: "15px",
										height: "15px",
									}}
									src="/img/map-chat-close-icon@2x.png"
									alt="close-icon"
								/>
							)}{" "}
						</div>
					)}{" "}
				</div>{" "}
				{!this.props.showChat && (
					<div
						className={chatPopupClassName}
						style={
							this.state.showCards && hasCards
								? {
										bottom: "335px",
										zIndex: "999",
								  }
								: {
										bottom: "85px",
										zIndex: "999",
								  }
						}
					>
						{" "}
						{this.state.chatButtonHidden && notificationCount > 1 && (
							<div
								className="notification-with-action dismiss-chat-notification"
								onClick={this.dismissAllNotification}
							>
								<span> Dismiss all notifications </span>{" "}
							</div>
						)}{" "}
						{chatNotificationsDiv}{" "}
					</div>
				)}{" "}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	const chats = state.chats;
	const conversation = chats.selectedConversation;
	const selectedConversationId = conversation && conversation.conversationId;
	// console.log(
	//   "mapDataToProps we will see all the message  =========",
	//   state.chats
	// );

	return {
		userId: state.user.user.userId,
		isAnonymousUser: state.user.isAnonymousUser || false,
		selectedConversation: conversation,
		messages: conversation
			? chats.chatLog.get(conversation.conversationId) || []
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
		contacts: state.contacts.accepted,
		searchBoxMessage: state.chats.searchBoxMessage,
		selectedDomain: state.selectedDomain,
		notificationTypes: state.appNotification.notificationTypes,
		notificationShow: state.appNotification && state.appNotification.show,
		offlineBannerVisibility: state.offlineBanner.visibility,
		componentInWindow: chats.componentInWindow,
		conversational: selectedConversationId
			? chats.conversationModeMap[selectedConversationId]
				? chats.conversationModeMap[selectedConversationId].conversational !==
				  false
				: true
			: true,
		background: selectedConversationId
			? (chats.conversationModeMap[selectedConversationId] &&
					chats.conversationModeMap[selectedConversationId].background) ||
			  {}
			: {},
		showChat: selectedConversationId
			? (chats.conversationModeMap[selectedConversationId] &&
					chats.conversationModeMap[selectedConversationId].showChat) ||
			  false
			: false,
		chatButtonHidden:
			(chats.selectedConversation &&
				chats.selectedConversation.chatButtonHidden) ||
			false,
		showOnlyCards: state.chats.showOnlyCards || [],
		showHTMLContent: state.chats.showHTMLContent || "",
		menuMessage:
			selectedConversationId &&
			chats.menuMessage &&
			chats.menuMessage[selectedConversationId]
				? chats.menuMessage[selectedConversationId]
				: null,
		navigationBar: state.chats.navigationBar || {},
		allProfileImages: state.profileImages || {},
	};
};

const mapDispatchToProps = {
	sendAMessage: sendAMessage,
	closeSmartReply: closeSmartReply,
	openContent: openContent,
	closeSearchBox: closeSearchBox,
	fetchArchivedMessages,
	sendSearchBoxQuery: sendSearchBoxQuery,
	setScrollPositionForConversation,
	setFormInWindow,
	showChatNonConversational,
	removeCradsFromShowOnlyCards: removeCradsFromShowOnlyCards,
	removeHTMLCotent: removeHTMLCotent,
	setVideoText: setVideoText,
	setRing: setRing,
	removeRing: removeRing,
};

export default connect(mapStateToProps, mapDispatchToProps)(FMChatWidget);
