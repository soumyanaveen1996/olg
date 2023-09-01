import React, { Component } from "react";
import PropTypes from "prop-types";
import ChatOthers from "./chats/ChatOthers";
import ChatSelf from "./chats/ChatSelf";
import _ from "lodash";
import ChatAsLink from "./chats/ChatAsLink";
import HighlightChatMessage from "./content/HighlightChatMessage";
import { shouldReplaceMessage } from "../../Services/InteractionsService";
import NotificationMessage from "./chats/NotificationMessage";
import { isNormalMessage, isNotificationMessage } from "../../Utils/Helpers";
import ChatOthersUI from "./chats/ChatOthersUI";
export function urlifyText(text) {
	if (!text) {
		return null;
	}
	let urlRegex = RegExp("https?://[^s]+");
	if (!urlRegex.test(text)) {
		return text;
	}

	let parts = text.split(" ");
	return parts.map((part, index) => {
		if (!urlRegex.test(part)) {
			return (
				<span key={index}>{part + (index < parts.length ? " " : "")}</span>
			);
		}

		if (urlRegex.test(part)) {
			return (
				<span key={index}>
					<a
						style={{ textDecoration: "underline", color: "inherit" }}
						href={part}
						target="_blank"
						rel="noopener noreferrer"
					>
						{part}
					</a>{" "}
					{index < parts.length ? " " : ""}
				</span>
			);
		}

		// return part.replace(urlRegex, function(url) {
		//
		// });
	});
}

class ChatMessage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chat: null,
			messageId: null,
			active: false,
			isContentShown: null,
		};
	}

	componentDidMount() {
		this.setState({
			chat: this.props?.chat,
			messageId: this.props?.chat.messageId,
			active: this.props?.active,
			isContentShown: this.props?.isContentShown,
		});
	}

	// componentDidUpdate(prevProps, prevState) {
	//   if (!_.isEqual(this.props.chat, prevState.chat)) {
	//     let datatoreplace = shouldReplaceMessage(this.props.chat);
	//     console.log("compoenet======", datatoreplace);
	//     this.setState({
	//       chat: this.props.chat,
	//     });
	//   }
	//   if (this.props.chat?.messageId !== prevState.messageId) {
	//     this.setState({
	//       messageId: this.props.chat.messageId,
	//     });
	//   }

	//   if (this.props.isContentShown !== prevState.isContentShown) {
	//     this.setState({
	//       isContentShown: this.props.isContentShown,
	//     });
	//   }
	//   if (this.props.active !== prevState.active) {
	//     this.setState({
	//       active: this.props.active,
	//     });
	//   }
	// }

	shouldComponentUpdate(nextProps) {
		let oldChat = this.props.chat,
			newChat = nextProps.chat;
		if (
			oldChat.messageId !== newChat.messageId ||
			shouldReplaceMessage(newChat) ||
			this.props.active !== nextProps.active ||
			this.props.isContentShown !== nextProps.isContentShown
		) {
			return true;
		}
		return false;
	}

	render() {
		let {
			background,
			conversation,
			chat,
			openContent,
			self,
			highlight,
			setHighlightedElementScrollHeight,
			active,
			closeContent,
			isContentShown,
			saveContactPopUp,
			chatMessageFrom,
			allProfileImages,
		} = this.props;

		if (!chat.messageType) {

			return null;
		}

		const isGroupNotify =
			chat.message &&
			typeof chat.message === "string" &&
			chat.message.includes("group");
		if (isNotificationMessage(chat.messageType)) {
			return isGroupNotify ? (
				<NotificationMessage chat={chat} />
			) : (
				<ChatOthersUI
					chatMessageFrom={chatMessageFrom}
					chat={chat}
					conversation={conversation}
				>
					<NotificationMessage chat={chat} />
				</ChatOthersUI>
			);
		} else {
			if (isNormalMessage(chat.messageType)) {
				// if (chat.createdBy === self) {
				// 	return (
				// 		<ChatSelf
				// 			chatMessageFrom={chatMessageFrom}
				// 			chat={chat}
				// 			allProfileImages={allProfileImages}
				// 			openContent={openContent}
				// 		/>
				// 	);
				// } else {
				return (
					<HighlightChatMessage
						chatMessageFrom={chatMessageFrom}
						highlight={highlight}
						setHighlightedElementScrollHeight={
							setHighlightedElementScrollHeight
						}
					>
						<ChatOthers
							chatMessageFrom={chatMessageFrom}
							chat={chat}
							allProfileImages={allProfileImages}
							conversation={conversation}
							openContent={openContent}
							saveContactPopUp={(elem, index) => {
								saveContactPopUp(elem, index);
							}}
						/>
					</HighlightChatMessage>
				);
				// }
			} else {
				return (
					<ChatAsLink
						chatMessageFrom={chatMessageFrom}
						background={background}
						allProfileImages={allProfileImages}
						// self={false} // removing self check so that it uses chatothers component. which follows the new 2.0 changes.
						chat={chat}
						conversation={conversation}
						openContent={openContent}
						active={active}
						closeContent={closeContent}
						isContentShown={isContentShown}
					/>
				);
			}
		}
	}
}

ChatMessage.propTypes = {
	background: PropTypes.object,
	conversation: PropTypes.object.isRequired,
	chat: PropTypes.object,
	allProfileImages: PropTypes.object.isRequired,
	openContent: PropTypes.func,
	closeContent: PropTypes.func,
};

export default ChatMessage;
