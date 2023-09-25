import React from "react";
import _ from "lodash";
import { clearContactSelection } from "../State/actions/contacts";
import { makeCall } from "../State/actions/phone";
import {
	changeConversation,
	getFrontMAssistant,
	initiateChannelConversation,
	createConversation,
} from "../State/actions/chats";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ModalPopup from "../Components/ModalMessages/ModalPopup";
import DiallerKeyPad from "../Components/Telephony/DiallerKeyPad";
import { Tooltip } from "reactstrap";
import Config from "../Utils/Config";
import "./WelcomeContainer.css";
import Notify from "../Components/ModalMessages/ToastNotif";
import { FRONTM_BOT_ID } from "../Utils/Constants";
import CachedImage from "../Components/Common/CachedImage";
const R = require("ramda");

class WelcomeContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			openDialPad: false,
			dialPadToolTipOpen: false,
			showSideBar: false,
			active: false,
			backgroundUrl: null,
			timeLine: [],
		};
	}

	componentDidMount() {
		let { location, history, selectedDomain, timeLine } = this.props;
		let { state } = location;
		const message = state ? state.message : "";
		let selectedDomainObj = _.cloneDeep(selectedDomain);
		let bgUrl = selectedDomainObj?.backgroundUrl
			? R.prop("contentURL", Config) + selectedDomainObj.backgroundUrl
			: "/offlinelms/img/welcomescreen-background.png";

		this.setState({
			backgroundUrl: bgUrl,
			timeLine: timeLine,
		});
		if (["onship"].includes(selectedDomain?.userDomain)) {
			window.document.title = selectedDomain.name;
		} else {
			window.document.title = "FrontM Platform";
		}
		if (message && message.length !== 0) {
			Notify({
				type: "success",
				message: message,
			});
			delete state.message;
			history.replace({ state: { ...state } });
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (
			this.props.timeLine &&
			!_.isEqual(this.props.timeLine, prevState.timeLine)
		) {
			this.setState({
				timeLine: this.props.timeLine,
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
				: "/offlinelms/img/welcomescreen-background.png";
			this.setState({
				backgroundUrl: bgUrl,
			});

			if (
				["onship"].includes(this.props.selectedDomain.userDomain)
			) {
				window.document.title = this.props.selectedDomain.name;
			} else {
				window.document.title = "FrontM Platform";
			}
		}
	}

	showCreateConversation = () => this.setState({ openDialPad: true });
	closeCreateConversation = () => this.setState({ openDialPad: false });
	toggle = () => {
		this.setState({
			dialPadToolTipOpen: !this.state.dialPadToolTipOpen,
		});
	};

	clearSelection = () => {
		this.props.clearContactSelection();
		this.props.history.push("/app/contacts");
	};

	startConversation = (botId) => {
		const { userId, botSubscriptions, createConversation, history } =
			this.props;
		const convBot = botSubscriptions.filter((bot) => bot.botId === botId);
		if (convBot && convBot.length) {
			createConversation(convBot[0], userId);
			history.push("/app/chats");
		}
		if (botId === FRONTM_BOT_ID) {
			this.callToFrontMAssistantFromWelcome();
		}
	};
	/* Assistant  code*/
	callToFrontMAssistantFromWelcome = () => {
		this.setState({ active: true });
		this.props.getFrontMAssistant();
		this.props.history.push("/app/chats");
	};
	/* ends here */
	makePhoneCall = async (phone, callMode) => {
		let { emailAddress, balance } = this.props;

		if (!this.props.user.isPostpaidUser) {
			if (balance <= 0) {
				this.closeCreateConversation();
				this.props.noBalance();
				return;
			}
		}

		if (callMode === "sat") {
			this.props.makeCall(
				"sat",
				emailAddress,
				phone,
				phone,
				null,
				null,
				"on-call"
			);
		} else {
			this.props.makeCall(
				"phone",
				emailAddress,
				phone,
				phone,
				null,
				null,
				"on-call"
			);
		}
	};

	openConversation = (conversation) => {
		let { changeConversation, history } = this.props;
		changeConversation(conversation);
		history.push("/app/chats");
	};

	openChannel = (channel) => {
		let { initiateChannelConversation, subscribedChannels, history } =
			this.props;
		const selectedChannel = subscribedChannels.find(
			(subscribedChannel) =>
				subscribedChannel.channelId === channel.conversationId
		);
		initiateChannelConversation(selectedChannel, () =>
			history.push("/app/chats")
		);
	};

	sortFavConversations = (favs) => {
		return favs.sort((favA, favB) => {
			const nameA = favA.channel
				? favA.channel.channelName
				: favA.contact
				? favA.contact.userName || ""
				: favA.bot.botName;
			const nameB = favB.channel
				? favB.channel.channelName
				: favB.contact
				? favB.contact.userName || ""
				: favB.bot.botName;
			if (nameA.toUpperCase() > nameB.toUpperCase()) {
				return 1;
			}
			return -1;
		});
	};

	toTitleCase = (str) => {
		return str.replace(/\w\S*/g, function (txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1);
		});
	};

	getFavNode = (conversation, index) => {
		if (conversation.channel) {
			let name = conversation.channel.channelName;
			return (
				<div
					key={`${index}_${name}`}
					className="catalog-card"
					onClick={() => {
						this.openChannel(conversation);
					}}
				>
					<a>
						<img
							loading="lazy"
							className="catalog-card__icon"
							src={`${R.prop("contentURL", Config)}ChannelsBotLogo.png`}
							alt="app logo"
						/>
					</a>
					<label className="catalog-card__fontStyle catalog-card__label">
						{this.toTitleCase(name)}
					</label>
				</div>
			);
		} else {
			let bot = conversation.bot;
			let name = bot.botName;
			return (
				<div
					key={`${index}_${name}`}
					className="catalog-card"
					onClick={() => {
						this.openConversation(conversation);
					}}
				>
					<a>
						<img
							loading="lazy"
							className="catalog-card__icon"
							src={`${R.prop("contentURL", Config)}${R.prop("logoUrl", bot)}`}
							alt="app logo"
						/>
					</a>
					<label className=" catalog-card__fontStyle catalog-card__label">
						{this.toTitleCase(name)}
					</label>
				</div>
			);
		}
	};

	renderFav = (favorites) => {
		return favorites.map((conversation, index) => {
			if (!conversation.contact) {
				return this.getFavNode(conversation, index);
			} else return null;
		});
	};

	checkForContact = (chatMode, voipMode) => {
		if (!chatMode && !voipMode) {
			return null;
		}

		if (chatMode || voipMode) {
			return (
				<div className="catalog-card" onClick={this.clearSelection}>
					<a>
						<img
							loading="lazy"
							className="catalog-card__icon"
							src="offlinelms/img/home-icon-contacts@2x.svg"
							alt="contact-card"
						/>
					</a>
					<label className="catalog-card__fontStyle catalog-card__label">
						Contacts
					</label>
				</div>
			);
		}
	};

	renderCatalogsCards = (chatMode, voipMode, favorites, pstnMode) => {
		const isOnboarding = this.props.selectedDomain?.assistantBotConfig?.botId === FRONTM_BOT_ID;

		return (
			<div className="catalog-cards-container col-lg-12 d-flex justify-content-start align-items-start py-5 px-4">
				{/* FrontM assiastant in homepage */}
				<div
					className="catalog-card"
					onClick={() => isOnboarding ? this.callToFrontMAssistantFromWelcome() : this.startConversation(this.props.selectedDomain.assistantBotConfig.botId)}
				>
					<a>
						<CachedImage
							imgClassName="catalog-card__icon"
							// imgKey={"homeAssistantIcon"}
							// image={"offlinelms/img/home-icon-assistant@2x.png"}
							image={`${R.prop("contentURL", Config)}` + this.props?.selectedDomain?.assistantBotConfig?.logoUrl}
						/>
					</a>
					<label className="catalog-card__fontStyle catalog-card__label">
						{isOnboarding ? "FrontM Assistant" : this.props?.selectedDomain?.assistantBotConfig?.name.replace("Onship", "onship")}
					</label>
				</div>

				{pstnMode && (
					<div className="catalog-card" onClick={this.showCreateConversation}>
						<a>
							<CachedImage
								imgClassName="catalog-card__icon"
								// imgKey={"homeCallIcon"}
								image={"offlinelms/img/home-icon-call@2x.svg"}
							/>
						</a>
						<label className="catalog-card__fontStyle catalog-card__label">
							Calls
						</label>
						{this.state.openDialPad && (
							<ModalPopup
								// onClose={this.closeCreateConversation}
								size="sm"
								noHeader
								className="dialler-modal"
							>
								<DiallerKeyPad
									makePhoneCall={this.makePhoneCall}
									onClose={this.closeCreateConversation}
									noBalance={() => this.props.noBalance()}
								/>
							</ModalPopup>
						)}
					</div>
				)}
				{this.checkForContact(chatMode, voipMode)}
				{chatMode && (
					<div className="catalog-card">
						<Link to={{ pathname: "/app/catalog/featured" }}>
							<CachedImage
								imgClassName="catalog-card__icon"
								// imgKey={"homeAppIcon"}
								image={"offlinelms/img/home-icon-apps@2x.svg"}
							/>
						</Link>
						<label className="catalog-card__fontStyle catalog-card__label">
							Apps
						</label>
					</div>
				)}
				{chatMode && (
					<Link to={{ pathname: "/app/groups" }}>
						<div className="catalog-card">
							<CachedImage
								imgClassName="catalog-card__icon"
								// imgKey={"homeChannelIcon"}
								image={"offlinelms/img/home-icon-channels@2x.svg"}
							/>
							<label className="catalog-card__fontStyle catalog-card__label">
								Groups
							</label>
						</div>
					</Link>
				)}

				{/* TODO: Hide loft button for now */}
				{/*<Link to={{ pathname: "/app/loft" }}>*/}
				{/*	<div className="catalog-card">*/}
				{/*		<CachedImage*/}
				{/*			imgClassName="catalog-card__icon"*/}
				{/*			imgKey={"homeChannelIcon"}*/}
				{/*			image={"offlinelms/img/home-icon-channels@2x.png"}*/}
				{/*		/>*/}
				{/*		<label className="catalog-card__fontStyle catalog-card__label">*/}
				{/*			Loft*/}
				{/*		</label>*/}
				{/*	</div>*/}
				{/*</Link>*/}
				{this.renderFav(favorites)}
			</div>
		);
	};

	setbackGroundUrl = () => {
		if (this.state.backgroundUrl) {
			if (this.state.backgroundUrl === "white") {
				return { background: "#ffffff" };
			} else
				return {
					background: `url(${this.state.backgroundUrl}) no-repeat center`,
					backgroundSize: "cover",
				};
		} else {
			return {
				background:
					'url("/offlinelms/img/welcomescreen-background.png") no-repeat center ',
				backgroundSize: "cover",
			};
		}
	};

	render() {
		const { selectedDomain, timeLine } = this.props;
		// const { timeLine } = this.state;
		let pstnMode =
			selectedDomain &&
			selectedDomain?.viewModes &&
			!Object.prototype.hasOwnProperty.call(selectedDomain.viewModes, "pstn")
				? true
				: selectedDomain?.viewModes?.pstn;
		let newFavourites = timeLine.filter(
			(conversation) =>
				selectedDomain &&
				selectedDomain.userDomain &&
				conversation &&
				conversation.userDomain &&
				selectedDomain.userDomain === conversation.userDomain &&
				conversation.favourite
		);
		let favourites = newFavourites.filter(
			(v, i, a) =>
				a.findIndex((t) => t.conversationId === v.conversationId) === i
		);

		favourites =
			(favourites &&
				favourites.length > 0 &&
				this.sortFavConversations(favourites)) ||
			[];
		const chatMode = R.pathOr(null, ["viewModes", "chat"], selectedDomain);
		const voipMode = R.pathOr(null, ["viewModes", "voip"], selectedDomain);
		return (
			<div
				className="welcomeContainer bg-size-cover d-flex flex col-lg-12"
				// style={this.setbackGroundUrl()}
			>
				{this.renderCatalogsCards(chatMode, voipMode, favourites, pstnMode)}
			</div>
		);
	}
}

const mapActionsToProps = {
	clearContactSelection,
	makeCall,
	getFrontMAssistant,
	changeConversation: changeConversation,
	initiateChannelConversation,
	createConversation: createConversation,
};
const mapDataToProps = (state) => {
	let user = state.user;
	return {
		user: state.user,
		userId: user.user.userId,
		selectedDomain: state.selectedDomain,
		timeLine: state.chats.timeLine,
		botSubscriptions: user.botSubscriptions,
		subscribedChannels: state.channels.subscribed,
	};
};

export default connect(mapDataToProps, mapActionsToProps)(WelcomeContainer);
