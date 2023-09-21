import React from "react";
import Config from "../../Utils/Config";
import ConversationMenu from "./ConversationMenu";
import _ from "lodash";
import { fetchWalletBalanceService } from "../../State/actions/user";
import { connect } from "react-redux";
import Avatar from "../Common/Avatar";
import PaymentServiceClient from "../../Services/Clients/PaymentServiceClient";
import { getStripeAmount } from "../../Utils/Helpers";
import Notify from "../ModalMessages/ToastNotif";
import StickeyHeader from "../StickeyHeader/stickeyHeader";
import { AirlinesAdsHeader } from "../Interactions/content/AIAdsExperimental/AirlinesAds";
import CollapsableSidebar from "../CollapsableNavBar/CollapsableSidebar";
import OfflineSwitch from "../OfflineSwitch/OfflineSwitch";
import { FMPullDownMenu } from "../../v2/Components/Common";
import GenericAjax from "../../Services/GenericAjax";
const R = require("ramda");

class ConversationTitle extends React.PureComponent {
	state = {
		showPhoneNumbers: false,
		getCreditModal: false,
		getConfirmCreditModal: false,
		amountToCredit: 0,
		showStripe: false,
		totalAmount: 0,
		conversation: null,
		selectedContactStore: this.props.selectedContactStore,
		allProfileImages: {},
		contactImgSrc: null,
	};

	componentDidMount() {
		!this.props.isAnonymousUser && this.props.fetchBalance();
		if (this.props.conversation) {
			let newConversation = _.cloneDeep(this.props.conversation);

			this.setState({
				conversation: newConversation,
				allProfileImages: this.props.allProfileImages || {},
				contactImgSrc:
					newConversation &&
					newConversation.contact &&
					this.props.allProfileImages &&
					this.props.allProfileImages[newConversation.contact.userId],
			});
		}
	}

	componentWillMount() {
		this.getBotLogo(this.props.conversation.bot);
	}

	getBotLogo = async (bot) => {
		let res = await GenericAjax.downloadFile(R.prop("botFilesAPI", Config) + bot.logoUrl)
		if (res) {
			console.log("res", res)
			this.setState({ botLogo: URL.createObjectURL(res) });
		}
	}

	closeStripePayment = () => this.setState({ showStripe: false });

	addCredit = (credit) => {
		// console.log("Top-up ", credit);
		this.setState({ getConfirmCreditModal: true, amountToCredit: credit });
	};

	componentDidUpdate(prevProps) {
		if (
			this.props.selectedContactStore &&
			!_.isEqual(
				this.props.selectedContactStore,
				prevProps.selectedContactStore
			)
		) {
			this.setState({ selectedContactStore: this.props.selectedContactStore });
		}
		if (
			this.props.conversation &&
			!_.isEqual(this.props.conversation, prevProps.conversation)
		) {
			let newConversation = _.cloneDeep(this.props.conversation);

			this.setState({
				conversation: newConversation,
				allProfileImages: this.props.allProfileImages || {},
				contactImgSrc:
					newConversation &&
					newConversation.contact &&
					this.props.allProfileImages &&
					this.props.allProfileImages[newConversation.contact.userId],
			});
		}

		if (!_.isEqual(this.props.allProfileImages, prevProps.allProfileImages)) {
			let newConversation = _.cloneDeep(this.props.conversation);
			this.setState({
				allProfileImages: this.props.allProfileImages || {},
				contactImgSrc:
					newConversation &&
					newConversation.contact &&
					this.props.allProfileImages &&
					this.props.allProfileImages[newConversation.contact.userId],
			});
		}
	}

	confirmPayment = (paymentIntentId) => {
		const amountF = parseFloat(this.state.totalAmount);
		const currency = "USD";
		const paymentCode = "100";

		return PaymentServiceClient.confirmPayment({
			paymentIntentId,
			amount: getStripeAmount(amountF),
			currency,
			paymentCode,
		});
	};

	sendPaymentResponseMessage = (response) => {
		if (response === true) {
			this.closeStripePayment();
			Notify({
				type: "success",
				message: "Account topped up successfuly.",
			});
		}
	};

	channelAvatar = (imgSrc) => {
		if (imgSrc) {
			return (
				<Avatar
					style={{ marginRight: "10px", borderRadius: "50%" }}
					imgSrc={imgSrc}
					size={30}
					height={30}
				/>
			);
		} else {
			return (
				<Avatar
					style={{ marginRight: "10px", borderRadius: "50%" }}
					size={30}
					height={30}
				/>
			);
		}
	};

	takeBackToAirIndia = () => {
		// window.history.back();
		let airIndiaUrl = "http://airindia.com/";
		window.location.href = airIndiaUrl;
	};

	render() {
		let props = this.props;
		let showAdsExperimental = false;
		let dataToSend = {};
		let { user, isAnonymousUser, NonConversational, selectedContactDisplay } =
			this.props;
		let { conversation, selectedContactStore } = this.state;
		let name, description, imgSrc, type, botId;
		let airIndiaBotIdDev = "hgpLFFxZb1oswGeuo9wyxi";
		let airIndiaBotIdProd = "eYmMJVcogncHPvAo2LYq6P";

		if (!conversation) {
			return <div />;
		} else if (conversation.channel) {
			name = conversation.channel.channelName;
			description = conversation.channel.description;
			type = "channel";
			imgSrc = null;
			let channelSelected = this.props.allSubscribedChannels.find(
				(elem) => elem.channelId === conversation.conversationId
			);

			if (channelSelected && channelSelected.logo === "ChannelsBotLogo.png") {
				imgSrc = `${R.prop("contentURL", Config)}ChannelsBotLogo.png`;
			} else {
				imgSrc = `${R.prop("contentURL", Config)}channelLogos/${
					conversation.conversationId + ".png"
				}`;
			}
		} else if (conversation.contact) {
			name = conversation.contact.userName;
			description = conversation.contact.emailAddress;
			type = "contact";
			if (selectedContactDisplay) {
				name = selectedContactDisplay;
			}
		} else if (isAnonymousUser) {
			const bot =
				user.botSubscriptions && user.botSubscriptions.length > 0
					? user.botSubscriptions[0]
					: null;
			if (!bot) {
				name = "Anonymous User Registration";
				description = "Anonymous User Registration";
				imgSrc =
					"https://frontm-contentdelivery-mobilehub-1030065648.s3.amazonaws.com/botLogos/anon_user.png";
			} else {
				name = bot.botName || "";
				botId = bot.botId || "";
				window.document.title = name;
				description = bot.description || "";
				type = "bots";
				imgSrc = `${R.prop("contentURL", Config)}${R.prop("logoUrl", bot)}`;
			}
		} else {
			name = conversation.bot ? conversation.bot.botName : "";
			description = conversation.bot ? conversation.bot.description : "";
			type = "bots";
			// imgSrc = `${R.prop("contentURL", Config)}${R.prop(
			// 	"logoUrl",
			// 	conversation.bot
			// )}`;
			imgSrc = this.state?.botLogo;

			if (conversation.bot && conversation.bot.botName === "Assistant") {
				name = "FrontM Assistant";
			}
		}

		dataToSend = { ...this.props };
		dataToSend["name"] = name;

		if (
			conversation &&
			conversation.conversationId &&
			this.props.background &&
			Object.keys(this.props.background).length > 0 &&
			this.props.background[conversation.conversationId] &&
			this.props.background[conversation.conversationId].background?.content
				?.options?.adsHeader
		) {
			showAdsExperimental = true;
		}
		let stylesForHead;
		if (type == undefined || isAnonymousUser) {
			stylesForHead = {
				position: "relative",
				marginLeft: "10px",
				height: "55px",
			};
		} else {
			stylesForHead = {
				position: "relative",
			};
		}
		return (
			<div
				className="topNavBar list-body d-flex align-items-center justify-content-between"
				style={stylesForHead}
			>
				<div className="d-flex align-items-center">
					{!_.isEmpty(NonConversational) &&
					!_.isEmpty(NonConversational.pullDownMenuComponent) ? (
						<FMPullDownMenu {...NonConversational.pullDownMenuComponent} />
					) : (
						<CollapsableSidebar />
					)}

					{type == undefined && (
						<img
							// onClick={this.takeBackToAirIndia}
							src={imgSrc}
							style={{
								width: "auto",
								height: "30px",
								marginRight: "5px",
								cursor: "pointer",
							}}
							alt="logo"
						/>
					)}

					{imgSrc && type === "bots" && (
						<div>
							{isAnonymousUser &&
							(botId === airIndiaBotIdDev || airIndiaBotIdProd) ? (
								// <a
								// 	href="http://www.airindia.com"
								// 	target="_top"
								// 	rel="noopener noreferrer"
								// >
								<img
									// onClick={this.takeBackToAirIndia}
									src={imgSrc}
									style={{
										width: "auto",
										height: "30px",
										marginRight: "5px",
										cursor: "pointer",
									}}
									alt="logo"
								/>
							) : (
								// </a>
								<img
									src={imgSrc}
									style={{
										width: "auto",
										height: "28px",
										marginRight: "5px",
										padding: "3px",
									}}
									alt="logo"
								/>
							)}
						</div>
					)}
					{type === "contact" && (
						<Avatar
							style={{
								marginRight: "10px",
								borderRadius: "50%",
								background: "#fff",
							}}
							name={name}
							size={25}
							height={25}
							color="bg-info"
							imgSrc={this.state.contactImgSrc}
						/>
					)}
					{type === "channel" && this.channelAvatar(imgSrc)}
					<h1 className="conversation-title mr-2">
						{name && name.replace("OnShip", "onship")}
					</h1>
					{!isAnonymousUser && (
						<ConversationMenu
							selectedContactStore={selectedContactStore}
							conversationData={conversation}
							{...props}
							allData={dataToSend}
						>
							<img
								src="/img/collapse-gray-arrow.png"
								alt=""
								style={{
									height: "6px",
									width: "11px",
									transform: "scaleY(1)",
									pointer: "cursor",
								}}
							/>
						</ConversationMenu>
					)}
				</div>

				{showAdsExperimental ? <AirlinesAdsHeader /> : null}
				{/* {this.props.showHeaderAds ? <AirlinesAdsHeader /> : null} */}
				{isAnonymousUser && (
					<div
						className="d-flex flex-row justify-content-center align-items-center"
						style={{
							width: "8vw",
							height: "50px",
							position: "absolute",
							right: 0,
						}}
					></div>
				)}
				<div className="d-flex">
					<OfflineSwitch />
					<StickeyHeader openRecharge={this.props.openRecharge} />
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	let chats = state.chats;
	let conversation = chats.selectedConversation;

	return {
		user: state.user,
		selectedContactDisplay: state.contacts.selectedContact.userName,
		allSubscribedChannels: state.channels.subscribed,
		isAnonymousUser: state.user.isAnonymousUser,
		allProfileImages: state.profileImages || {},
		background: state.chats.conversationModeMap || {},
		selectedContactStore: state.contacts.selectedContact || {},
		NonConversational: _.isEmpty(state.v2.NonConversational)
			? []
			: state.v2.NonConversational[conversation.conversationId],
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchBalance: () => dispatch(fetchWalletBalanceService()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ConversationTitle);
