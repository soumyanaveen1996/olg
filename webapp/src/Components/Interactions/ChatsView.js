import React, { Component } from "react";
import "./Interactions.css";
import MainChat from "./MainChat";

class ChatsView extends Component {
	createConversation = (bot) => {
		let { userId, createConversation } = this.props;
		createConversation(bot, userId);
	};

	componentDidMount() {
		if (
			this.props.selectedDomain &&
			!this.props.selectedDomain.viewModes.chat
		) {
			let { timeLineData } = this.props;
			let timeLine = timeLineData;
			if (timeLine && timeLine.length === 0) {
				this.props.getTimeLine();
			}

			this.props.history.push("/offlinelms/app/chats");
		}
	}

	render() {
		let {
			isAnonymousUser,
			selectedConversation,
			messages,
			conversationPaginationParameterMap,
			userId,
			sendAMessage,
			contentMessage,
			displayContentMessage,
			smartReplyMessage,
			disableMessageInput,
			mainChatHeight,
			closeSmartReply,
			closeContentArea,
			openContent,
			linkData,
			showWaitSpinner,
			contacts,
			searchBoxMessage,
			closeSearchBox,
			sendSearchBoxQuery,
			notificationTypes,
			notificationShow,
			offlineBannerVisibility,
			saveContactPopUp,
			fetchArchivedMessages,
			setScrollPositionForConversation,
			shouldScrollToTop,
			selectedDomain,
			allProfileImages,
			showHTMLContent,
			removeHTMLCotent,
		} = this.props;

		return (
			<div className="Interactions-contentarea">
				<MainChat
					openModalToHome={this.props.openModalToHome}
					messages={messages}
					isAnonymousUser={isAnonymousUser}
					conversationPaginationParameterMap={
						conversationPaginationParameterMap
					}
					selectedDomain={selectedDomain}
					setScrollPositionForConversation={setScrollPositionForConversation}
					allProfileImages={allProfileImages}
					shouldScrollToTop={shouldScrollToTop}
					sendMessage={sendAMessage}
					self={userId}
					conversation={selectedConversation}
					contentMessage={contentMessage}
					displayContentMessage={displayContentMessage}
					smartReplyMessage={smartReplyMessage}
					disableMessageInput={disableMessageInput}
					mainChatHeight={mainChatHeight}
					closeSmartReply={closeSmartReply}
					openContent={openContent}
					closeContent={closeContentArea}
					linkData={linkData}
					showWaitSpinner={showWaitSpinner}
					contacts={contacts}
					searchBoxMessage={searchBoxMessage}
					closeSearchBox={closeSearchBox}
					sendSearchBoxQuery={sendSearchBoxQuery}
					notificationTypes={notificationTypes}
					notificationShow={notificationShow}
					offlineBannerVisibility={offlineBannerVisibility}
					saveContactPopUp={(elem, index) => {
						saveContactPopUp(elem, index);
					}}
					showHTMLContent={showHTMLContent}
					removeHTMLCotent={removeHTMLCotent}
					fetchArchivedMessages={fetchArchivedMessages}
				/>
			</div>
		);
	}
}
export default ChatsView;
