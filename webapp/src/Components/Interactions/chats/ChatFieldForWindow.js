/* eslint-disable react/no-unsafe */
import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import ChatMessages from "../ChatMessages";
import ChatInputBox from "../ChatInputBox";
import ChatSearchBox from "../ChatSearchBox";
import {
	closeSmartReply,
	openContent,
	closeSearchBox,
	fetchArchivedMessages,
	sendSearchBoxQuery,
	setScrollPositionForConversation,
	sendChatViewMessage, sendAMessage,
} from '../../../State/actions/chats';

class ChatFieldForWindow extends Component {
	constructor(props) {
		super(props);
		this.state = { messages: [], showWaitSpinner: false };
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (
			nextProps.messages &&
			this.state.messages &&
			!_.isEqual(nextProps.messages, this.state.messages)
		) {
			console.log("all new props in chatFieldForWindow ", nextProps);

			if (nextProps.messages.length > 0) {
				this.setState({
					messages: [...nextProps.messages],
				});
			}
		}
	}
	render() {
		let participants = [];
		participants.push(this.props.user.userId);
		let conversation = {
			closed: false,
			participants: [...participants],
			conversationId: this.props.data.conversationId,
			bot: { ...this.props.data },
		};

		return (
			<div>
				<div
					className="d-flex flex-column container-showChat"
					style={{
						width: "100%",
						background: "url('/offlinelms/img/welcomescreen-background.png')",
						backgroundSize: "cover",
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
					}}
				>
					<ChatMessages
						chatMessageFrom="chatField"
						background={this.props.background}
						messages={this.state.messages}
						conversationPaginationParameterMap={
							this.props.conversationPaginationParameterMap
						}
						shouldScrollToTop={this.props.shouldScrollToTop}
						height={this.props.mainChatHeight}
						conversation={conversation}
						self={this.props.user.userId}
						isContentShown={
							!!this.props.contentMessage //leave
						}
						openContent={
							this.props.openContent //leave
						}
						linkData={this.props.linkData}
						contentMessage={this.props.contentMessage}
						closeContent={this.props.closeContent}
						smartReplyMessage={
							this.props.smartReplyMessage //leave
						}
						sendMessage={this.props.sendChatViewMessage}
						closeSmartReply={this.props.closeSmartReply}
						showWaitSpinner={this.props.showWaitSpinner}
						searchBoxMessage={this.state.searchBoxMessage}
						saveContactPopUp={this.props.saveContactPopUp}
						fetchArchivedMessages={this.props.fetchArchivedMessages}
					/>

					<div className="sidebar-body-footer d-flex p-3 align-items-center">
						<div className="input-group">
							{!this.props.searchBoxMessage && (
								<ChatInputBox
									chatMessageFrom="chatField"
									isAnonymousUser={this.state.isAnonymousUser}
									background={this.props.background}
									isContentShown={!!this.props.contentMessage}
									contacts={this.props.contacts}
									conversation={conversation}
									sendMessage={this.props.sendChatViewMessage}
									disable={this.props.disableMessageInput}
								/>
							)}
							{this.props.searchBoxMessage && (
								<ChatSearchBox
									chatMessageFrom="chatField"
									background={this.props.background}
									isContentShown={!!this.props.contentMessage}
									searchBoxMessage={this.props.searchBoxMessage}
									conversation={conversation}
									sendMessage={this.props.sendChatViewMessage}
									disable={this.props.disableMessageInput}
									closeSearchBox={this.props.closeSearchBox}
									sendSearchBoxQuery={this.props.sendSearchBoxQuery}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

let actions = {
	sendChatViewMessage: sendChatViewMessage,
	closeSmartReply: closeSmartReply,
	openContent: openContent,
	closeSearchBox: closeSearchBox,
	fetchArchivedMessages: fetchArchivedMessages,
	sendSearchBoxQuery: sendSearchBoxQuery,
	setScrollPositionForConversation: setScrollPositionForConversation,
};

const mapDataToProps = (state, props) => {
	console.log("all the props ", state);

	let chats = state.chats;
	return {
		user: state.user.user,
		messages: state.chats.chatLog.get(props.data.conversationId) || [],
		userId: state.user.user.userId,
		isAnonymousUser: state.user.isAnonymousUser || false,
		selectedConversation: props.data,
		conversationPaginationParameterMap: props.data
			? state.chats.conversationPaginationParameterMap[
			props.data.conversationId
			] || {}
			: {},
		shouldScrollToTop: props.data
			? state.chats.shouldScrollToTopConversationMap[
			props.data.conversationId
			] || false
			: false,
		contentMessage:
			chats.contentMessage && chats.contentMessage[props.data.conversationId],
		displayContentMessage: chats.contentMessage,
		smartReplyMessage:
			props.data.conversationId &&
			chats.smartReplyMessage &&
			chats.smartReplyMessage[props.data.conversationId],
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
		conversational: props.data.conversationId
			? chats.conversationModeMap[props.data.conversationId]
				? chats.conversationModeMap[props.data.conversationId]
					.conversational === false
					? false
					: true
				: true
			: true,
		background: props.data.conversationId
			? (chats.conversationModeMap[props.data.conversationId] &&
				chats.conversationModeMap[props.data.conversationId].background) ||
			{}
			: {},
		showChat: props.data.conversationId
			? (chats.conversationModeMap[props.data.conversationId] &&
				chats.conversationModeMap[props.data.conversationId].showChat) ||
			false
			: false,
		chatButtonHidden:
			(chats.selectedConversation &&
				chats.selectedConversation.chatButtonHidden) ||
			false,
		showOnlyCards: state.chats.showOnlyCards || [],
		showHTMLContent: state.chats.showHTMLContent || "",
	};
};

export default connect(mapDataToProps, actions)(ChatFieldForWindow);
