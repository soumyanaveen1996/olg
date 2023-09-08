import React, { Component } from "react";
import _ from "lodash";
import ChatAvatar from "./ChatAvatar";
import ChatDateTimeUI from "./ChatDateTimeUI";
import { MessageTypeConstants } from "../../../Services/Message";
import Avatar from "../../Common/Avatar";
import ReactEmoji from "react-emoji";
import { getProfilePhoto } from "../../../Services/FilesService";
import { validURL } from "../../../Utils/Helpers";
import { connect } from "react-redux";
import { isNotificationMessage } from "../../../Utils/Helpers";

class ChatOthersUI extends Component {
	constructor(props) {
		super(props);
		this.state = {
			profileImg: null,
		};
	}

	urlPattern1 =
		/(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;

	createMarkup = (msg) => {
		return { __html: msg };
	};

	processTextNode = (textNode) => {
		const nodVal = textNode.nodeValue;
		const parNode = textNode.parentNode;
		let replacedText;
		replacedText = nodVal?.replace(
			this.urlPattern1,
			'<a href="$&" target="_blank"  rel="noopener noreferrer">$&</a>'
		);
		if (replacedText !== nodVal) {
			const eleNode = document.createElement("span");
			eleNode.innerHTML = replacedText;
			parNode.replaceChild(eleNode, textNode);
		}
	};

	findTextNodes = (node) => {
		let nodes = node.childNodes;
		for (let i = 0; i < nodes.length; i++) {
			if (!nodes[i]) {
				continue;
			}

			if (nodes[i]?.childNodes.length == 0) {
				if (nodes[i]?.nodeType == Node.TEXT_NODE) {
					this.processTextNode(nodes[i]);
				}
			}

			if (
				nodes[i]?.childNodes.length > 0 &&
				!["a", "button"].includes(nodes[i]?.tagName.toLowerCase())
			) {
				this.findTextNodes(nodes[i]);
			}
		}
	};

	async componentDidMount() {
		if (this.props.chat.message && Array.isArray(this.props.chat.message)) {
			this.mounted = true;
			try {
				let getProfile = "";
				if (
					this.props.self.user.userId &&
					this.props.chat?.createdBy === this.props.self.user.userId
				) {
					getProfile = this.props.self.userProfileImage;
				} else {
					getProfile =
						this.props.chat?.message[0] &&
						this.props.chat?.message[0].userId &&
						(await getProfilePhoto(
							this.props.chat?.message[0].userId + "_75x75.png"
						));
				}
				if (this.mounted) {
					this.setState({
						profileImg: getProfile,
					});
				}
			} catch (error) {
				console.error(
					"chat other ui image load error componentDidMount",
					error
				);
			}
		}
	}

	componentWillUnmount() {
		this.mounted = false;
	}

	renderAvatar = (profileImg, details) => {
		if (profileImg) {
			return (
				<Avatar
					style={{
						marginRight: "10px",
						borderRadius: "50%",
					}}
					height={30}
					name={details.userName}
					size={30}
					imgSrc={profileImg}
					color="bg-info"
				/>
			);
		} else {
			return (
				<Avatar
					style={{
						marginRight: "10px",
						borderRadius: "50%",
					}}
					height={30}
					name={details.userName}
					size={30}
					color="bg-info"
				/>
			);
		}
	};

	hasURL = (str) => {
		return str
			.split(" ")
			.map((item) => validURL(item))
			.includes(true);
	};

	renderMessageWithURL = (stringMsg) => {
		const domparser = new DOMParser();
		const doc = domparser.parseFromString(stringMsg, "text/html");
		this.findTextNodes(doc);
		return doc?.body?.innerHTML;
	};

	showMessage = (chat) => {
		return chat.messageType === MessageTypeConstants.MESSAGE_TYPE_STRING
			? this.renderMessageWithURL(chat.message.toString())
			: ReactEmoji.emojify(chat.message.toString());
	};

	render() {
		let { chat, conversation, style, children, chatMessageFrom } = this.props;
		if (isNotificationMessage(chat.messageType)) {
			return (
				<div className="d-flex justify-content-start chat-message chat-others">
					{chatMessageFrom && chatMessageFrom === "chatField" ? null : (
						<div className="mr-3">
							<ChatAvatar conversation={conversation} chat={chat} />
						</div>
					)}
					<div className="d-flex flex-column">
						<div className="mb-1">
							<span className="chat-username mr-2">
								{chat.createdBy === this.props.self?.user?.userId
									? this.props.self?.user?.userName
									: conversation.contact
									? conversation.contact.userName
									: conversation.bot?.botId === "im-bot"
									? ""
									: conversation.bot?.botName}
							</span>
							&nbsp;
							<ChatDateTimeUI chat={chat} />
						</div>
						<div className="chat-others-message" style={style}>
							{chat.conversationOwner &&
								conversation.channel &&
								!_.isEmpty(chat.conversationOwner) && (
									<div className="chat-others-message-owner">
										{chat.conversationOwner.userName}
									</div>
								)}
							<div>{children}</div>
						</div>
					</div>
				</div>
			);
		}
		// console.log("chat other ui", this.props);

		if (
			chat &&
			chat.messageType &&
			chat.messageType === MessageTypeConstants.MESSAGE_TYPE_CONTACT_CARD
		) {
			if (typeof chat.message === "object") {
				if (chat.message.length > 0 && Array.isArray(chat.message)) {
					return chat.message.map((elem, index) => {
						return (
							<div
								key={index}
								className="d-flex justify-content-start chat-message chat-others"
							>
								{chatMessageFrom && chatMessageFrom === "chatField" ? null : (
									<div className="mr-2">
										<ChatAvatar conversation={conversation} chat={chat} />
									</div>
								)}

								<div className="d-flex flex-column">
									{chat.conversationOwner &&
										conversation.channel &&
										!_.isEmpty(chat.conversationOwner) && (
											<div className="chat-others-message-owner">
												{chat.conversationOwner.userName}
											</div>
										)}
									<div
										className="chat-others-message"
										onClick={() => {
											this.props.saveContactPopUp(elem, index);
										}}
										style={
											(style,
											{
												display: "flex",
												flexDirection: "row",
												cursor: "pointer",
											})
										}
									>
										{/* <div>
            <Profile
          </div> */}
										{this.renderAvatar(this.state.profileImg, elem)}
										<div
											style={{
												display: "flex",
												justifyContent: "center",
												flexDirection: "column",
											}}
										>
											<div>{elem.userName}</div>
											<div>{elem.emailAddress}</div>
										</div>
									</div>
									<div>
										<ChatDateTimeUI chat={chat} />
									</div>
								</div>
							</div>
						);
					});
				} else {
					return (
						<div className="d-flex justify-content-start chat-message chat-others">
							{chatMessageFrom && chatMessageFrom === "chatField" ? null : (
								<div className="mr-2">
									<ChatAvatar conversation={conversation} chat={chat} />
								</div>
							)}
							<div className="d-flex flex-column">
								{chat.conversationOwner &&
									conversation.channel &&
									!_.isEmpty(chat.conversationOwner) && (
										<div className="chat-others-message-owner">
											{chat.conversationOwner.userName}
										</div>
									)}
								<div
									onClick={() => {
										this.props.saveContactPopUp(chat.message);
									}}
									className="chat-others-message"
									style={
										(style,
										{
											display: "flex",
											flexDirection: "row",
											cursor: "pointer",
										})
									}
								>
									{/* <div>
            <Profile
          </div> */}
									{this.renderAvatar(this.state.profileImg, chat.message)}
									<div
										style={{
											display: "flex",
											justifyContent: "center",
											flexDirection: "column",
										}}
									>
										<div>{chat.message.userName}</div>
										<div>{chat.message.emailAddress}</div>
									</div>
								</div>
								<div>
									<ChatDateTimeUI chat={chat} />
								</div>
							</div>
						</div>
					);
				}
			} else {
				return chat.message.map((elem, index) => {
					return (
						<div
							key={index}
							index={index}
							className="d-flex justify-content-start chat-message chat-others"
						>
							{chatMessageFrom && chatMessageFrom === "chatField" ? null : (
								<div className="mr-2">
									<ChatAvatar conversation={conversation} chat={chat} />
								</div>
							)}
							<div className="d-flex flex-column">
								<div
									className="chat-others-message"
									style={(style, { flexDirection: "row" })}
								>
									{chatMessageFrom && chatMessageFrom === "chatField" ? null : (
										<div className="mr-2">
											<ChatAvatar conversation={conversation} chat={chat} />
										</div>
									)}
									{/* <div>
            <Profile
          </div> */}
									<div>
										<div>{elem.userName}</div>
										<div>{elem.emailAddress}</div>
									</div>
								</div>
								<div>
									<ChatDateTimeUI chat={chat} />
								</div>
							</div>
						</div>
					);
				});
			}
		} else {
			if (
				typeof chat.message === "string" ||
				typeof chat.message === "number"
			) {
				return (
					<div className="d-flex justify-content-start chat-message chat-others">
						{chatMessageFrom && chatMessageFrom === "chatField" ? null : (
							<div className="mr-3">
								<ChatAvatar conversation={conversation} chat={chat} />
							</div>
						)}
						<div className="d-flex flex-column">
							<div className="mb-1">
								<span className="chat-username mr-2">
									{chat.createdBy === this.props.self?.user?.userId
										? this.props.self?.isAnonymousUser
											? "You"
											: this.props.self?.user?.userName
										: conversation.contact
										? conversation.contact.userName
										: chat.conversationOwner &&
										  conversation.channel &&
										  !_.isEmpty(chat.conversationOwner)
										? chat.conversationOwner.userName
										: conversation.bot?.botName}
								</span>
								&nbsp;
								<ChatDateTimeUI chat={chat} />
							</div>
							<div className="chat-others-message" style={style}>
								{/*{chat.conversationOwner &&*/}
								{/*	conversation.channel &&*/}
								{/*	!_.isEmpty(chat.conversationOwner) && (*/}
								{/*		<div className="chat-others-message-owner">*/}
								{/*			{chat.conversationOwner.userName}*/}
								{/*		</div>*/}
								{/*	)}*/}
								<div
									dangerouslySetInnerHTML={this.createMarkup(
										this.showMessage(chat)
									)}
								></div>
							</div>
						</div>
					</div>
				);
			} else if (typeof children === "object" && Array.isArray(children)) {
				/*This is to check the URL in the response of the bot message. */
				if (children.length > 0) {
					/*`insideDiv` keep all the html component inside as the `children` is array of objects which contain react html components*/
					let insideDiv = children.map((elem) => {
						return elem;
					});

					return (
						<div className="d-flex justify-content-start chat-message chat-others">
							{chatMessageFrom && chatMessageFrom === "chatField" ? null : (
								<div className="mr-2">
									<ChatAvatar conversation={conversation} chat={chat} />
								</div>
							)}
							<div className="d-flex flex-column">
								<div className="chat-others-message" style={style}>
									{chat.conversationOwner &&
										conversation.channel &&
										!_.isEmpty(chat.conversationOwner) && (
											<div className="chat-others-message-owner">
												{chat.conversationOwner.userName}
											</div>
										)}
									{insideDiv}
								</div>
								<div>
									<ChatDateTimeUI chat={chat} />
								</div>
							</div>
						</div>
					);
				}
			} else if (typeof children === "object") {
				console.log("Webapp :: going to show bouncing wait message indicator");
				return (
					<div className="d-flex justify-content-start chat-message chat-others">
						{chatMessageFrom && chatMessageFrom === "chatField" ? null : (
							<div className="mr-2">
								<ChatAvatar conversation={conversation} chat={chat} />
							</div>
						)}
						<div className="d-flex flex-column">
							<div className="chat-others-message" style={style}>
								{chat.conversationOwner &&
									conversation.channel &&
									!_.isEmpty(chat.conversationOwner) && (
										<div className="chat-others-message-owner">
											{chat.conversationOwner.userName}
										</div>
									)}
								{children}
							</div>
							<div>
								<ChatDateTimeUI chat={chat} />
							</div>
						</div>
					</div>
				);
			} else {
				return null;
			}
		}

		// return (
		//   <div style={style}>
		//     <div className="media clearfix others-chat" style={{ margin: "0px" }}>
		//       <div className="d-flex mr-2">
		//         <span>
		//           <ChatAvatar conversation={conversation} chat={chat} />
		//         </span>
		//       </div>
		//       <div className="media-body">{chat.message}</div>
		//     </div>
		//     <div className="media clearfix others-chat" style={{ margin: "0px" }}>
		//       <div className="d-flex mr-3">
		//         <span style={{ width: "24px" }} />
		//       </div>
		//       <div className="media-body fs10 text-muted">
		//         {getDateTimeString(chat.createdOn)}
		//       </div>
		//     </div>
		//   </div>
		// );
	}
}

const mapStateToProps = (state) => ({
	self: state.user,
});

export default connect(mapStateToProps, null)(ChatOthersUI);
