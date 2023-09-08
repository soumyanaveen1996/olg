import React from "react";
import Config from "../../../Utils/Config";
import Avatar from "../../Common/Avatar";
import { connect } from "react-redux";
import _ from "lodash";
const R = require("ramda");

class ChatAvatar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			allProfileImages: {},
			imgSrc: null,
		};
	}

	componentDidMount() {
		this.updateImageSource();
	}

	componentDidUpdate(prevProps, prevState) {
		if (!_.isEqual(this.props.allProfileImages, prevState.allProfileImages)) {
			this.updateImageSource();
		}
	}

	updateImageSource() {
		if (this.props.allProfileImages) {
			let imgSrc = null;
			if (this.props.chat.createdBy === this.props.self.user.userId) {
				imgSrc = this.props.self.profileImage;
				localStorage.setItem('selfProfileImage', imgSrc);
			} else {
				const contactUserId = this.props.conversation?.contact?.userId;
				if (contactUserId && this.props.allProfileImages && this.props.allProfileImages[contactUserId]) {
					imgSrc = this.props.allProfileImages[contactUserId];
					localStorage.setItem(`profileImage_${contactUserId}`, imgSrc);
				}
			}
			this.setState({
				allProfileImages: this.props.allProfileImages,
				imgSrc,
			});
		}
	}

	render() {
		const {
			chat,
			conversation,
			conversational,
			botSubscriptions,
			self,
		} = this.props;

		let { imgSrc } = this.state;

		let logoURL = "";
		let size = 32;

		if (conversational === false) {
			const botId = conversation?.bot?.botId || null;
			if (botId && botSubscriptions && botSubscriptions.length > 0) {
				for (let i = 0; i < botSubscriptions.length; i++) {
					const botDetail = botSubscriptions[i];
					if (botDetail.botId === botId) {
						logoURL = botDetail.logoUrl;
						size = 40;
						break;
					}
				}
			}
		} else {
			logoURL = R.prop("logoUrl", conversation?.bot) || "";
		}

		let props = {
			size,
			style: { borderRadius: "50%" },
			height: size,
			color: "bg-primary",
		};

		if (conversation && conversation.channel) {
			if (this.props.allProfileImages && this.props.allProfileImages[chat.createdBy]) {
				props.name = chat.conversationOwner?.userName || "";
				props.imgSrc = this.props.allProfileImages[chat.createdBy];
			} else {
				props.name = chat.conversationOwner?.userName || "";
			}
		} else if (conversation && conversation.contact) {
			props.name = chat.createdBy === self?.user?.userId ? self?.user?.userName : conversation.contact.userName;
			const contactUserId = conversation.contact.userId;
			props.imgSrc = imgSrc;
		} else {
			props.name = chat.createdBy === self?.user?.userId ? self?.user?.userName : conversation.bot.botName;
			props.imgSrc = chat.createdBy === self?.user?.userId ? localStorage.getItem('selfProfileImage') || imgSrc : `${R.prop("contentURL", Config)}${logoURL}`;
		}

		return <Avatar {...props} />;
	}
}

const mapActionToProps = {};

const mapDataToProps = (state) => {
	let chats = state.chats;
	let conversation = chats.selectedConversation;
	let selectedConversationId = conversation && conversation.conversationId;
	return {
		conversational: selectedConversationId
			? chats.conversationModeMap[selectedConversationId]
				? chats.conversationModeMap[selectedConversationId].conversational ===
					false
					? false
					: true
				: true
			: true,
		allProfileImages: state.profileImages || {},
		botSubscriptions: state.user.botSubscriptions,
		self: state.user,
	};
};
export default connect(mapDataToProps, mapActionToProps)(ChatAvatar);