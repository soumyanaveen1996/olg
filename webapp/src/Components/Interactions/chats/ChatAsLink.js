import React, { PureComponent } from "react";
import { getLinkName } from "../../../Services/InteractionsService";
import { MessageTypeConstants } from "./../../../Services/Message";
import ChatLinkSelfUI from "./ChatLinkSelfUI";
import ChatLinkOthersUI from "./ChatLinkOthersUI";
import ChatLinkMap from "./ChatLinkMap";
import ChatLinkMedia from "./ChatLinkMedia";
import ChatLinkFile from "./ChatLinkFile";
import ChatLinkForm from "./ChatLinkForm";
import ChatMessageMenu from "./ChatMessageMenu";
import ChatMessageTable from "./ChatMessageTable";
import ChatLinkPayment from "./ChatLinkPayment";
import ChatLinkFormResponse from "./ChatLinkFormResponse";
import ChatLinkChart from "./ChatLinkChart";
import CardContent from "../cards/CardContent";
import ChatOthersUI from "./ChatOthersUI";

class ChatAsLink extends PureComponent {
	open = () => {
		let { chat, openContent } = this.props;
		openContent("content", chat);
	};


	render() {
		let {
			background,
			chat,
			conversation,
			self,
			active,
			closeContent,
			isContentShown,
			chatMessageFrom,
		} = this.props;
		// console.log("chat link as ", chat);
		if (
			chat.messageType === MessageTypeConstants.MESSAGE_TYPE_SLIDER ||
			chat.messageType === MessageTypeConstants.MESSAGE_TYPE_BUTTON ||
			chat.messageType === MessageTypeConstants.MESSAGE_TYPE_SMART_SUGGESTIONS
		) {
			return null;
		}

		let ChatUI = self ? ChatLinkSelfUI : ChatLinkOthersUI;

		let type = chat.messageType;
		if (type === "location") {
			return (
				<ChatLinkMap
					chatMessageFrom={chatMessageFrom}
					chat={chat}
					conversation={conversation}
					self={self}
					active={active}
					closeContent={closeContent}
					open={this.open}
				/>
			);
		} else if (
			type === MessageTypeConstants.MESSAGE_TYPE_IMAGE ||
			type === MessageTypeConstants.MESSAGE_TYPE_AUDIO ||
			type === MessageTypeConstants.MESSAGE_TYPE_VIDEO
		) {
			return (
				<ChatLinkMedia
					chatMessageFrom={chatMessageFrom}
					chat={chat}
					conversation={conversation}
					self={self}
					open={this.open}
				/>
			);
		} else if (
			type === MessageTypeConstants.MESSAGE_TYPE_PDF ||
			type === MessageTypeConstants.MESSAGE_TYPE_CSV ||
			type === MessageTypeConstants.MESSAGE_TYPE_TEXT ||
			type === MessageTypeConstants.MESSAGE_TYPE_OTHER_FILE ||
			type === MessageTypeConstants.MESSAGE_TYPE_HTML ||
			type === MessageTypeConstants.MESSAGE_TYPE_JAVASCRIPT
		) {
			return (
				<ChatLinkFile
					chatMessageFrom={chatMessageFrom}
					chat={chat}
					conversation={conversation}
					self={self}
				/>
			);
		} else if (
			type === MessageTypeConstants.MESSAGE_TYPE_FORM ||
			type === MessageTypeConstants.MESSAGE_TYPE_FORM2
		) {
			// return (
			//   <ChatMessageMenu chat={chat} conversation={conversation} self={self} />
			// );

			return (
				<ChatLinkForm
					chatMessageFrom={chatMessageFrom}
					chat={chat}
					conversation={conversation}
					self={self}
					background={background}
				/>
			);
		} else if (type === MessageTypeConstants.MESSAGE_TYPE_FORM_RESPONSE) {
			return (
				<ChatLinkFormResponse
					chatMessageFrom={chatMessageFrom}
					chat={chat}
					conversation={conversation}
					self={self}
				/>
			);
		} else if (type === MessageTypeConstants.MESSAGE_TYPE_MENU) {
			return <ChatMessageMenu chat={chat} conversation={conversation} />;
		} else if (type === MessageTypeConstants.MESSAGE_TYPE_TABLE) {
			return (
				<ChatMessageTable
					chatMessageFrom={chatMessageFrom}
					chat={chat}
					conversation={conversation}
					background={background}
				/>
			);
		} else if (type === MessageTypeConstants.MESSAGE_TYPE_STRIPE) {
			return (
				<ChatLinkPayment
					chatMessageFrom={chatMessageFrom}
					chat={chat}
					conversation={conversation}
					self={self}
				/>
			);
		} else if (type === MessageTypeConstants.MESSAGE_TYPE_CHART) {
			return (
				<ChatLinkChart
					chatMessageFrom={chatMessageFrom}
					chat={chat}
					conversation={conversation}
					self={self}
				/>
			);
		} else if (type === MessageTypeConstants.MESSAGE_TYPE_CARDS) {
			return (
				<CardContent
					chatMessageFrom={chatMessageFrom}
					chat={chat}
					conversation={conversation}
					self={self}
					isContentShown={isContentShown}
				/>
			);
		} else if (
			type === MessageTypeConstants.MESSAGE_TYPE_CONTACT_BEEN_ACCEPTED
		) {
			let userName = "";
			if (Array.isArray(chat.message)) {
				userName = chat.message[0].userName;
			} else {
				userName = chat.message.userName;
			}
			if (self) {
				return null;
			}
			return (
				<ChatOthersUI chat={chat} conversation={conversation}>
					{`${userName} has accepted your contact request`}
				</ChatOthersUI>
			);
		}

		// else {
		//   return null;
		// }
		if (!getLinkName(chat)) {
			return null;
		}

		return (
			<ChatUI
				chatMessageFrom={chatMessageFrom}
				chat={chat}
				conversation={conversation}
			>
				<a
					className="btn btn-outline-info"
					style={{ textTransform: "none" }}
					onClick={this.open}
				>
					{getLinkName(chat)}
				</a>
			</ChatUI>
		);
	}
}

export default ChatAsLink;
