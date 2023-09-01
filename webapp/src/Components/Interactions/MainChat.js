import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ChatInputBox from "./ChatInputBox";
import ChatMessages from "./ChatMessages";
import ChatContentView from "./content/ChatContentView";
import ChatSearchBox from "./ChatSearchBox";
import FormMessagePopUp from "./FormMessagePopUp";
import Config from "../../Utils/Config";
import _ from "lodash";
import { Modal, ModalBody } from "reactstrap";
import { removeURLCotent } from "../../State/actions/chats";
import { MessageTypeConstants } from "../../Services/Message";
const R = require("ramda");
// import AcceptOrIgnoreContact from "./AcceptOrIgnoreContact";
// import { setPaginatedFetchStatus } from "../../State/actions/chats";

class MainChat extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			backgroundUrl: null,
			showHTMLContent: null,
			showHtmlPopUp: false,
		};
	}

	componentDidMount() {
		let { selectedDomain, showHTMLContent } = this.props;

		let selectedDomainObj = _.cloneDeep(selectedDomain);
		let bgUrl = selectedDomainObj?.backgroundUrl
			? R.prop("contentURL", Config) + selectedDomainObj.backgroundUrl
			: "/img/welcomescreen-background.png";

		if (showHTMLContent) {
			this.setState({ showHTMLContent: showHTMLContent, showHtmlPopUp: true });
		}
		this.setState({
			backgroundUrl: bgUrl,
		});
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.showHTMLContent !== prevState.showHTMLContent) {
			this.setState({
				showHTMLContent: this.props.showHTMLContent,
				showHtmlPopUp: true,
			});
		}
		if (
			this.props.selectedDomain &&
			!_.isEqual(this.props.selectedDomain, prevProps.selectedDomain)
		) {
			let { selectedDomain } = this.props;
			let selectedDomainObj = _.cloneDeep(selectedDomain);
			let bgUrl = selectedDomainObj?.backgroundUrl
				? R.prop("contentURL", Config) + selectedDomainObj.backgroundUrl
				: "/img/welcomescreen-background.png";
			this.setState({
				backgroundUrl: bgUrl,
			});
		}

		if (prevProps.chats.urlContent === null && this.props?.chats?.urlContent) {
			window.open(this.props.chats.urlContent, "_blank");
			this.props.removeURLCotent();
		}
	}

	isContactAccepted = () => {
		return (
			this.props.messages &&
			this.props.messages.some((msg) =>
				[
					MessageTypeConstants.MESSAGE_TYPE_CONTACT_BEEN_ACCEPTED,
					MessageTypeConstants.MESSAGE_TYPE_STRING,
					MessageTypeConstants.MESSAGE_TYPE_STD_NOTIFICATION,
				].includes(msg.messageType)
			)
		);
	};

	hideHTMLPopup = () => {
		this.props.removeHTMLCotent();
		this.setState((prevState) => ({
			showHtmlPopUp: !prevState.showHtmlPopUp,
			showHTMLContent: null,
		}));
	};

	createMarkup = (banner) => {
		return { __html: banner };
	};

	setbackGroundUrl = () => {
		if (this.state.backgroundUrl) {
			if (this.state.backgroundUrl === "white") {
				return "#ffffff";
			} else return `url(${this.state.backgroundUrl}) no-repeat center`;
		} else {
			return 'url("/img/welcomescreen-background.png") no-repeat center';
		}
	};
	render() {
		let {
			sendMessage,
			self,
			isAnonymousUser,
			conversation,
			messages,
			conversationPaginationParameterMap,
			contentMessage,
			displayContentMessage,
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
			notificationTypes,
			notificationShow,
			offlineBannerVisibility,
			saveContactPopUp,
			fetchArchivedMessages,
			setScrollPositionForConversation,
			shouldScrollToTop,
			allProfileImages,
		} = this.props;

		// console.log("html content =====", this.state.showHTMLContent);

		if (!conversation) {
			return (
				<div
					className="sidebar-body flex d-flex align-items-center justify-content-center chat-right"
					id="app-body"
					style={{ width: "100%", backgroundColor: "#f5f6f8" }}
				>
					<h6>Select or create a conversation to get started.</h6>
				</div>
			);
		}

		const maxHeight =
			(notificationTypes && notificationTypes.length > 0 && notificationShow) ||
			offlineBannerVisibility
				? "96%"
				: "100%";
		const chatMessagesViewStyle = displayContentMessage
			? { maxWidth: "30vw", maxHeight: maxHeight }
			: { maxWidth: "100vw", maxHeight: maxHeight };
		return (
			<div
				className="sidebar-body bg-size-cover flex d-flex chat-right justify-content-center"
				id="app-body"
				style={{
					width: "100%",
					height: "100%",
					background: "#fff",
					// background: this.setbackGroundUrl(),
				}}
			>
				<div
					className="d-flex flex col-lg-12 p-0 flex-column"
					id="chat-messages-view"
					style={chatMessagesViewStyle}
				>
					<ChatMessages
						openModalToHome={this.props.openModalToHome}
						messages={messages}
						conversationPaginationParameterMap={
							conversationPaginationParameterMap
						}
						allProfileImages={allProfileImages}
						setScrollPositionForConversation={setScrollPositionForConversation}
						shouldScrollToTop={shouldScrollToTop}
						height={mainChatHeight}
						conversation={conversation}
						self={self}
						isContentShown={!!displayContentMessage}
						openContent={openContent}
						linkData={linkData}
						contentMessage={contentMessage}
						displayContentMessage={displayContentMessage}
						closeContent={closeContent}
						smartReplyMessage={smartReplyMessage}
						sendMessage={sendMessage}
						closeSmartReply={closeSmartReply}
						showWaitSpinner={showWaitSpinner}
						searchBoxMessage={searchBoxMessage}
						saveContactPopUp={(elem, index) => {
							saveContactPopUp(elem, index);
						}}
						fetchArchivedMessages={fetchArchivedMessages}
					/>

					<div
						className="sidebar-body-footer d-flex p-3 align-items-center"
						style={{ width: "88%", margin: "0 auto" }}
					>
						<div className="input-group">
							{!searchBoxMessage && (
								<ChatInputBox
									allProfileImages={allProfileImages}
									isAnonymousUser={isAnonymousUser}
									isContentShown={!!displayContentMessage}
									contacts={contacts}
									conversation={conversation}
									sendMessage={sendMessage}
									disable={disableMessageInput}
								/>
							)}
							{searchBoxMessage && (
								<ChatSearchBox
									isContentShown={!!displayContentMessage}
									searchBoxMessage={searchBoxMessage}
									conversation={conversation}
									sendMessage={sendMessage}
									disable={disableMessageInput}
									closeSearchBox={closeSearchBox}
									sendSearchBoxQuery={sendSearchBoxQuery}
								/>
							)}
						</div>
					</div>
				</div>
				{displayContentMessage && (
					<ChatContentView
						content={displayContentMessage}
						style={{ flex: 2 }}
						sendMessage={sendMessage}
						close={closeContent}
						conversation={conversation}
					/>
				)}
				{this.state.showHTMLContent && this.state.showHtmlPopUp && (
					<Modal
						isOpen={this.state.showHtmlPopUp}
						toggle={this.hideHTMLPopup}
						size="lg"
						className="show-html-class-content"
						wrapClassName="show-html-modal-wrap-content"
						modalClassName="show-html-modal-content"
						backdropClassName="show-html-modal-backdrop-content"
						contentClassName="show-html-modal-content-content"
					>
						<div
							className="d-flex flex-row justify-content-end align-items-center mini-window-header"
							style={{ cursor: "auto" }}
						>
							<div className="d-flex flex-row minimize-close-icon-container">
								<a className="close-icon" onClick={this.hideHTMLPopup}>
									<img src="/img/close-icon@2x.png" alt="close-icon" />
								</a>
							</div>
						</div>
						<ModalBody>
							<div
								className="d-flex justify-content-center align-items-center"
								style={{ width: "720px", minHeight: "280px" }}
							>
								{/* <div
                  dangerouslySetInnerHTML={this.createMarkup(
                    this.state.showHTMLContent
                  )}
                /> */}

								{/* <iframe
                  id="frame"
                  src={this.state.showHTMLContent.url}
                  scrolling="yes"
                ></iframe> */}
							</div>
						</ModalBody>
					</Modal>
				)}
				<FormMessagePopUp />
			</div>
		);
	}
}

MainChat.propTypes = {
	allProfileImages: PropTypes.object.isRequired,
};

const mapActionToProps = {
	removeURLCotent,
};

const mapStateToProps = (state) => {
	return {
		chats: state.chats,
	};
};

export default connect(mapStateToProps, mapActionToProps)(MainChat);
