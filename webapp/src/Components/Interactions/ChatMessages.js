/* eslint-disable react/no-unsafe */
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Scrollbars } from "react-custom-scrollbars-2";
import ChatMessage from "./ChatMessage";
import SmartReplies from "./content/SmartReplies";
import ChatOthersSpinner from "./chats/ChatOthersSpinner";
import AcceptOrIgnoreContact from "./AcceptOrIgnoreContact";
import { MessageTypeConstants } from "../../Services/Message";
import _ from "lodash";
import { removeOpenForm, getStoredForm } from "../../Services/StorageService";
import { setScrollPositionForConversation } from "../../State/actions/chats";
import CachedImage from "../Common/CachedImage";
import ChatDayUI from "./chats/ChatDayUI";

function getHeight(searchBoxMessage, chats) {
	if (!searchBoxMessage) {
		if (navigator.userAgent.indexOf("Firefox") !== -1) {
			const isTopNavbarHidden =
				chats.navigationBar &&
				chats.navigationBar.navbar &&
				chats.navigationBar.navbar.hidden;
			if (isTopNavbarHidden) {
				return "calc(100vh - 78px)";
			}
			return "calc(100vh - 150px)";
		}
		return "calc(100% - 155px)";
	}

	if (searchBoxMessage) {
		let message = searchBoxMessage.message;
		if (message && message.results) {
			if (message.results.length === 0) {
				return "calc(100vh - 180px)";
			} else {
				return "calc(100vh - 200px)";
			}
		} else {
			return "calc(100vh - 120px)";
		}
	}
}

class ChatMessages extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstForm: {},
		};
		this.highLightedHeight = -1;
		this.chatScroll = React.createRef();
		this.state = {
			allProfileImages: {},
		};
		this.fetchPaginatedArchiveMessages = _.debounce(
			this.fetchPaginatedArchiveMessages.bind(this),
			500
		);
	}

	shouldHighlightMessage(linkData, conversation) {
		if (!linkData) {
			return false;
		}

		let { type, botId, action } = linkData;

		if (action !== "read") {
			return false;
		}

		if (
			type === "b" &&
			(botId === conversation.bot || botId === conversation.bot.botId)
		) {
			return true;
		}

		if (type === "c" && botId === conversation.conversationId) {
			return true;
		}
	}

	componentDidMount() {
		if (this.props.allProfileImages) {
			this.setState({
				allProfileImages: this.props.allProfileImages,
			});
		}

		if (this.props.shouldScrollToTop) {
			let height =
				this.highLightedHeight + 150 > 0 ? this.highLightedHeight + 150 : 0;
			this.chatScroll.current.scrollTop(150 + height);
		} else {
			this.chatScroll.current.scrollToBottom();
			let { linkData, conversation } = this.props;
			if (this.shouldHighlightMessage(linkData, conversation)) {
				let messageId = linkData.message;
				if (!messageId) {
					return;
				}

				let height =
					this.highLightedHeight - 150 < 0 ? 0 : this.highLightedHeight - 150;
				this.chatScroll.current.scrollTop(height);
			}
		}
	}

	componentDidUpdate(prevProps) {
		if (!_.isEqual(this.props.allProfileImages, prevProps.allProfileImages)) {
			this.setState({
				allProfileImages: this.props.allProfileImages,
			});
		}
		if (
			!_.isEmpty(prevProps.chats.acceptIgnoreContact) &&
			this.props.chats.acceptIgnoreContact === null
		) {
			this.forceUpdate();
		}
		if (this.props.shouldScrollToTop) {
			let height =
				this.highLightedHeight + 150 > 0 ? this.highLightedHeight + 150 : 0;
			this.chatScroll.current.scrollTop(150 + height);
		} else {
			this.chatScroll.current.scrollToBottom();
			let { linkData, conversation } = this.props;
			if (this.shouldHighlightMessage(linkData, conversation)) {
				let messageId = linkData.message;
				if (!messageId) {
					return;
				}

				let height =
					this.highLightedHeight - 150 < 0 ? 0 : this.highLightedHeight - 150;
				this.chatScroll.current.scrollTop(height);
			}
		}

		let messageArr = [...this.props.messages];
		let lastMessage = { ...messageArr[messageArr.length - 1] };
		if (
			lastMessage.messageType &&
			(lastMessage.messageType === MessageTypeConstants.MESSAGE_TYPE_FORM2 ||
				lastMessage.messageType === MessageTypeConstants.MESSAGE_TYPE_STRIPE ||
				lastMessage.messageType === MessageTypeConstants.MESSAGE_TYPE_TABLE ||
				lastMessage.messageType ===
					MessageTypeConstants.MESSAGE_TYPE_CONTAINER ||
				lastMessage.messageType ===
					MessageTypeConstants.MESSAGE_TYPE_VIDEO_CALL)
		) {
			let keyLast = lastMessage.messageId;
			let lastMsgObj = { ...getStoredForm() };
			lastMsgObj[keyLast] = lastMessage;
		} else {
			removeOpenForm();
		}
	}

	componentWillUnmount() {
		removeOpenForm();
	}

	setHighlightedElementScrollHeight = (height) => {
		this.highLightedHeight = height;
	};

	renderView({ style = {}, ...props }) {
		const viewStyle = {
			position: "relative",
		};

		return (
			<div className="box" style={{ ...style, ...viewStyle }} {...props} />
		);
	}

	fetchPaginatedArchiveMessages = () => {
		const { hasMoreMessages, createdOn } =
			this.props.conversationPaginationParameterMap;
		if (hasMoreMessages) {
			this.props.setScrollPositionForConversation(
				false,
				this.props.conversation
			);
			this.props.fetchArchivedMessages(this.props.conversation, createdOn);
		}
	};

	handleScroll = () => {
		// const currentTop = this.chatScroll.current.getScrollTop();
		const { top } = this.chatScroll.current.getValues();
		if (!top) {
			return this.fetchPaginatedArchiveMessages();
		} else if (top === 1) {
			this.props.setScrollPositionForConversation(
				false,
				this.props.conversation
			);
		}
	};

	checkConversationOwnerDetails = (chat) => {
		// fill the conversation owner details for group chat
		chat["conversationOwner"] = {
			userId: chat.createdBy,
			userName: this.props.usersAssociation[chat.createdBy] || "",
		};
		// fix for bold style 2 user names in group chat
		chat.message =
			chat.messageType === "string" ? chat.message.toString() : chat.message;
		return chat;
	};

	isNewConversation = () => {
		if (this.props.messages && this.props.messages.length > 0) {
			let chatMessages = this.props.messages.filter(
				(msg) =>
					![
						MessageTypeConstants.MESSAGE_TYPE_CONTACT_BEEN_ACCEPTED,
						MessageTypeConstants.MESSAGE_TYPE_ACCEPT_IGNORE_CONTACT,
					].includes(msg.messageType)
			);
			if (
				_.isEmpty(chatMessages) &&
				(this.props.messages[this.props.messages.length - 1]["messageType"] ===
					MessageTypeConstants.MESSAGE_TYPE_CONTACT_BEEN_ACCEPTED ||
					(this.props.messages[this.props.messages.length - 1][
						"messageType"
					] === MessageTypeConstants.MESSAGE_TYPE_ACCEPT_IGNORE_CONTACT &&
						this.props.chats.acceptIgnoreContact === null))
			) {
				return true;
			}
			return false;
		}

		return false;
	};

	render() {
		let {
			background,
			conversation,
			messages,
			self,
			openContent,
			isContentShown,
			linkData,
			contentMessage,
			closeContent,
			smartReplyMessage,
			sendMessage,
			closeSmartReply,
			showWaitSpinner,
			searchBoxMessage,
			saveContactPopUp,
			chatMessageFrom,
		} = this.props;
		let { allProfileImages } = this.state;

		if (background) {
			messages = messages.filter(
				(elem) => elem.messageType === MessageTypeConstants.MESSAGE_TYPE_STRING
			);
		}
		if (!messages) {
			return <div />;
		}

		let chatListClass = "chat-list";
		let customStyle = {
			flexDirection: "column-reverse",
			width: "88%",
		};
		if (isContentShown) {
			chatListClass += " chat-list-with-content";
			customStyle = { flexDirection: "column-reverse" };
		}

		let customClassName = "d-flex justify-content-center px-4 mt-auto";
		if (background) {
			customClassName = "d-flex px-4 mt-auto";
		}

		return (
			<Scrollbars
				autoHide
				ref={this.chatScroll}
				onScroll={() => this.handleScroll()}
				style={{
					display: "flex",
					flexDirection: "column-reverse",
					width: "100%",
					position: "relative",
					scrollBehavior: "smooth",
					height: background
						? "355px"
						: getHeight(searchBoxMessage, this.props.chats),
				}}
				renderView={this.renderView}
			>
				<div className="flex">
					<div className={customClassName}>
						<div
							className={chatListClass}
							style={
								background
									? { flexDirection: "column-reverse", width: "100%" }
									: customStyle
							}
						>
							{messages.map((chat, index) => {
								let active =
									contentMessage &&
									contentMessage[
										this.props.chats.selectedConversation.conversationId
									]
										? contentMessage[
												this.props.chats.selectedConversation.conversationId
										  ].messageId === chat.messageId
										: false;
								const duplicateMsg =
									chat.messageType === "standard_notification" &&
									chat.createdBy === this.props.loggedInUser;
								if (conversation.channel && !chat.conversationOwner) {
									chat = this.checkConversationOwnerDetails(chat);
								}
								const returnArray = [];

								if (duplicateMsg === false) {
									returnArray.push(
										<ChatDayUI
											chat={chat}
											index={index}
											lastMessage={index !== 0 && messages[index - 1]}
										/>
									);
									returnArray.push(
										<ChatMessage
											allProfileImages={allProfileImages}
											chatMessageFrom={chatMessageFrom}
											background={background}
											key={index + Math.floor(Math.random() * 90 + 10)}
											conversation={conversation}
											chat={chat}
											openContent={openContent}
											self={self}
											highlight={
												linkData && chat.messageId === linkData.message
											}
											setHighlightedElementScrollHeight={
												this.setHighlightedElementScrollHeight
											}
											active={active}
											closeContent={closeContent}
											isContentShown={isContentShown}
											saveContactPopUp={(elem, index) => {
												saveContactPopUp(elem, index);
											}}
										/>
									);
								}
								return returnArray;
							})}
							{showWaitSpinner && (
								<ChatOthersSpinner
									conversation={conversation}
									chat={this.props.chats}
								/>
							)}
						</div>
					</div>
				</div>
				{this.isNewConversation() ? (
					<div
						style={{
							textAlign: "center",
							height: "50vh",
						}}
					>
						<CachedImage imgKey={"newChatIcon"} image={"/offlinelms/img/new-chat.png"} />
						<p className="text-muted">
							Start a conversation with {conversation?.contact?.userName || ""}
						</p>
					</div>
				) : (
					<>
						{smartReplyMessage && (
							<SmartReplies
								smartReplies={smartReplyMessage}
								sendMessage={sendMessage}
								close={closeSmartReply}
								conversation={conversation}
							/>
						)}
						<AcceptOrIgnoreContact
							openModalToHome={this.props.openModalToHome}
						/>
					</>
				)}
			</Scrollbars>
		);
	}
}

ChatMessages.propTypes = {
	messages: PropTypes.array.isRequired,
	height: PropTypes.string.isRequired,
	conversation: PropTypes.object.isRequired,
	self: PropTypes.string.isRequired,
};

const mapActionToProps = {
	setScrollPositionForConversation,
};
const mapStateToProps = (state) => ({
	chats: state.chats,
	allProfileImages: state.profileImages || {},
	loggedInUser: state.user.user.userId,
	usersAssociation: state.contacts.usersAssociation,
});

export default connect(mapStateToProps, mapActionToProps)(ChatMessages);
