/* eslint-disable react/no-unsafe */
import React, { PureComponent, Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import MarketplaceNav from "./MarketplaceNav";
import ChannelsNav from "./ChannelsNav";
import ContactsNav from "./ContactsNav";
import FavouritesNav from "./FavouritesNav";
import FavouritesNavPeople from "./FavouritesNavPeople";
import { Scrollbars } from "react-custom-scrollbars-2";
import AppTour from "./AppTour";
import HelpNav from "./HelpNav";
import DomainsFilterMenu from "./DomainsFilterMenu";
import ModalPopup from "../../ModalMessages/ModalPopup";
import ActivateEnterpriseBots from "../../Catalog/ActivateEnterpriseBots";
import Avatar from "../../Common/Avatar";
import Config from "../../../Utils/Config";
import _ from "lodash";
import { FRONTM_BOT_ID } from "../../../Utils/Constants";
import { selectedContactAction } from "../../../State/actions/contacts";
import {
	changeSelectedConversation,
	toggleSideNavBar,
	fromSideBarHiddenFlag,
} from "../../../State/actions/chats";
import { enable2faAuthModal } from "../../../State/actions/user";
import {
	subscribeToBot,
	selectedBotId,
} from "../../../State/actions/catalogue";
import store from "../../../State/configureStore";
import {
	removeSelectedDomain,
	removeSubscribedBotList,
	updateSoftwareMfaStatus,
} from "../../../State/actions/user";
import { updateLastLoggedInDomain } from "../../../Services/UserService";
const R = require("ramda");

class AppNav extends Component {
	constructor(props) {
		super(props);
		this.state = {
			domainName: "Select Domain",
			selected: false,
			logo: null,
			toggleNavigationBar: false,
			homeLogoUrl: null,
			homeLogoName: null,
			createConversationDetails: null,
		};
	}

	componentDidMount() {
		this.updateDimensions();
		window.addEventListener("resize", this.updateDimensions);

		if (this.props.selectedDomain) {
			let selectedDomain = _.cloneDeep(this.props.selectedDomain);
			let homeUrl = selectedDomain?.homeLogoConfig?.url
				? R.prop("contentURL", Config) + selectedDomain.homeLogoConfig.url
				: "FrontMlogo";

			this.setState({
				selected: true,
				domainName: selectedDomain.name,
				logo: selectedDomain.logoUrl,
				homeLogoUrl: homeUrl,
				homeLogoName: selectedDomain?.homeLogoConfig?.name || "FrontM",
			});
		}
	}
	componentWillUnmount() {
		window.removeEventListener("resize", this.updateDimensions);
	}

	componentDidUpdate(prevProps) {
		if (
			this.props.selectedDomain &&
			!_.isEqual(this.props.selectedDomain, prevProps.selectedDomain)
		) {
			let selectedDomain = _.cloneDeep(this.props.selectedDomain);
			let homeUrl = selectedDomain?.homeLogoConfig?.url
				? R.prop("contentURL", Config) + selectedDomain.homeLogoConfig.url
				: "FrontMlogo";
			this.setState({
				selected: true,
				domainName: selectedDomain.name,
				logo: selectedDomain.logoUrl,
				homeLogoUrl: homeUrl,
				homeLogoName: selectedDomain?.homeLogoConfig?.name || "FrontM",
			});
		}

		if (
			this.state.createConversationDetails !== null &&
			this.props.userDetails.softwareMfaStatus === null
		) {
			setTimeout(() => {
				if (this.state.createConversationDetails !== null) {
					console.log(
						">>>createConversation",
						this.state.createConversationDetails
					);
					this.props.createConversation(
						this.state.createConversationDetails.bot,
						this.state.createConversationDetails.userId
					);
					this.setState({
						createConversationDetails: null,
					});
					// this.props.history.push("/app/chats");
				}
			}, 1000);
		}
	}

	startConversation = (botId) => {
		const { userId, botSubscriptions, createConversation, history } =
			this.props;
		const convBot = botSubscriptions.filter((bot) => bot.botId === botId);
		this.props.selectedBotId({ botId: botId, conversationBot: convBot[0] });

		if ((convBot[0] && convBot[0].authorisedAccess) || false) {
			if (this.props.user.softwareMfaEnabled) {
				if (convBot && convBot.length) {
					this.props.updateSoftwareMfaStatus("idle");
					// createConversation(convBot[0], userId);
					// history.push("/app/chats");
					this.setState({
						createConversationDetails: {
							bot: convBot[0],
							userId,
						},
					});
				}
			} else {
				this.props.enable2faAuthModal(true);
			}
		} else {
			if (convBot && convBot.length) {
				createConversation(convBot[0], userId);
				history.push("/app/chats");
			}
		}
		if (botId === FRONTM_BOT_ID) {
			this.startFrontMAssistantConversation(botId);
		}
	};

	startFrontMAssistantConversation = (botId) => {
		let { timeLine } = this.props;
		if (timeLine && timeLine.length === 0) {
			this.props.getFrontMAssistant(timeLine, botId);
		} else {
			let index = timeLine.findIndex((conversation) => {
				return conversation.bot && conversation.bot.botId === botId;
			});
			this.props.changeConversation(timeLine[index], true);
		}
		this.setState({ active: true });
		this.props.history.push("/app/chats");
	};

	openSettings = () => {
		this.setState({ settingsOpen: true });
	};
	closeSettings = () => {
		this.setState({ settingsOpen: false });
	};

	selectDomain = (data) => {
		this.setState({
			domainName: data.name,
			selected: true,
			logo: data.logoUrl,
		});

		store.dispatch(removeSelectedDomain());
		store.dispatch(removeSubscribedBotList());

		updateLastLoggedInDomain(data.userDomain).then(() => {
			let { timeLine } = this.props;
			if (timeLine && timeLine.length === 0) {
				this.props.getFrontMAssistant(timeLine);
			} else {
				let index = timeLine.findIndex((conversation) => {
					return conversation.bot && conversation.bot.botId === FRONTM_BOT_ID;
				});

				this.props.changeConversation(timeLine[index], true);
			}

			this.props.history.push("/app/home");
		});
	};

	hideNewProvideDialog = () => {
		this.setState({ newProvider: false });
	};

	showNewProvideDialog = () => {
		this.setState({ newProvider: true });
	};

	updateDimensions = () => {
		let w = window,
			d = document,
			documentElement = d.documentElement,
			body = d.getElementsByTagName("body")[0],
			height = w.innerHeight || documentElement.clientHeight || body;

		this.setState({ heightScroll: height });
	};

	checkForContact = () => {
		if (this.props.selectedDomain && this.props.selectedContactAction) {
			if (
				this.props.selectedDomain.viewModes &&
				!this.props.selectedDomain.viewModes.chat &&
				!this.props.selectedDomain.viewModes.voip
			) {
				return null;
			}

			if (
				this.props.selectedDomain.viewModes &&
				(this.props.selectedDomain.viewModes.chat ||
					this.props.selectedDomain.viewModes.voip)
			) {
				return (
					<ContactsNav
						{...this.props}
						selectedContactAction={this.props.selectedContactAction}
					/>
				);
			}
		} else {
			return null;
		}
	};

	render() {
		let { pathname, selectedDomain } = this.props;

		let { domainName } = this.state;

		const viewMode = R.pathOr(null, ["viewModes", "apps"], selectedDomain);

		let domains = [];
		if (this.props.domains) {
			domains = this.props.domains;
		}

		let bsMap = {};
		this.props.botSubscriptions.forEach((bot) => {
			let category = bot.category;
			category.forEach((cat) => {
				if (bsMap[cat]) {
					bsMap[cat].push(bot);
				} else {
					bsMap[cat] = [bot];
				}
			});
		});
		let mainNavHeight = this.state.heightScroll - 130;
		return (
			<div
				className="in-nav in-nav-dark"
				style={{ height: window.innerHeight + "px" }}
			>
				{/* {this.props.isLicenseValid && !this.props.isAnonymousUser && (
					<AppTour
						newUser={this.props.newUser}
						userName={this.props.userName}
						selectedDomain={this.props.selectedDomain}
						updateAuthUser={this.props.updateAuthUser}
					/>
				)} */}

				<div
					className="d-flex flex-row navbar px-2 justify-content-between"
					style={{ border: "1px solid #3b3e4e", background: "#2a2d3c" }}
				>
					<div className="d-flex col-sm-10 align-items-center px-0">
						{this.state.selected && (
							<div
								style={{
									width: "30px",
									height: "30px",
									borderRadius: "4px",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									// backgroundColor: "#989898",
									marginRight: "10px",
								}}
							>
								<Avatar
									imgSrc={
										`${R.prop("contentURL", Config)}` +
										(this.state.logo || this.props.selectedDomain?.logoUrl)
									}
									size={25}
									height={25}
								/>
							</div>
						)}
						<span>{domainName}</span>
					</div>
					{selectedDomain && (
						//when lockInUsers true dropdown will show the Plus but hiding frontm.ai
						<DomainsFilterMenu
							domains={domains}
							selectedDomain={this.props.selectedDomain}
							seletedDoamin={this.selectDomain}
							showNewProvider={this.showNewProvideDialog}
						/>
					)}
				</div>

				<div style={{ height: window.innerHeight - 71 + "px" }}>
					<Scrollbars
						autohide="true"
						style={{
							height: mainNavHeight + "px",
						}}
					>
						<ul className="metisMenu" id="metisMenu">
							{viewMode ? (
								<FavouritesNav {...this.props} />
							) : (
								<FavouritesNavPeople {...this.props} />
							)}

							<div className="rectangle-copy" />

							{this.checkForContact()}

							<div className="rectangle-copy" />

							{this.props.selectedDomain &&
								this.props.selectedDomain.viewModes &&
								this.props.selectedDomain.viewModes.apps && (
									<React.Fragment>
										<MarketplaceNav
											{...this.props}
											startConversation={this.startConversation}
										/>
										<div className="rectangle-copy" />
									</React.Fragment>
								)}

							{this.props.selectedDomain &&
								this.props.selectedDomain.viewModes &&
								this.props.selectedDomain.viewModes.channels && (
									<React.Fragment>
										<ChannelsNav {...this.props} />
										<div className="rectangle-copy" />{" "}
									</React.Fragment>
								)}

							<HelpNav
								{...this.props}
								startConversation={this.startConversation}
								startFrontMAssistantConversation={
									this.startFrontMAssistantConversation
								}
							/>

							<div className="rectangle-copy" />
						</ul>
					</Scrollbars>

					{/* ========== Side nav footer =========== */}
					<div className="d-flex flex flex-row align-items-center overflow-hidden">
						<Link
							to={{ pathname: "/app/home", state: { checkDomain: true } }}
							style={{ height: "60px", padding: "0 15px" }}
							className="in-nav-dark d-flex flex flex-row align-items-center overflow-hidden justify-content-center"
						>
							<span className="sidebar-brand logo-text d-inline-flex align-items-center">
								{!this.state.homeLogoUrl ||
								(this.state.homeLogoUrl &&
									this.state.homeLogoUrl === "FrontMlogo") ? (
									<img
										loading="lazy"
										alt="logo"
										src="img/logo.png"
										height={22}
									/>
								) : (
									<img
										loading="lazy"
										alt="logo"
										src={this.state.homeLogoUrl}
										height={22}
									/>
								)}
								{!this.state.homeLogoName ||
								(this.state.homeLogoName &&
									this.state.homeLogoName === "FrontM") ? (
									<span className="ml-2" color="#fff">
										front<b>M</b>
									</span>
								) : (
									<span className="ml-2" color="#fff">
										{this.state.homeLogoName}
									</span>
								)}
							</span>
						</Link>
					</div>
				</div>

				{this.state.newProvider && (
					<ModalPopup onClose={this.hideNewProvideDialog} size="sm" noHeader>
						<div className="p-2">
							<h5> Sign up to a new Provider</h5>
							<ActivateEnterpriseBots
								isLicenseValid={true}
								userId={this.props.userId}
								getAllDomains={this.props.getAllDomains}
								onFormSubmit={() => {
									this.hideNewProvideDialog();
								}}
								cancel={this.hideNewProvideDialog}
								history={this.props.history}
								pathname={pathname}
							/>
						</div>
					</ModalPopup>
				)}
			</div>
		);
	}
}

const actions = {
	selectedContactAction: selectedContactAction,
	changeSelectedConversation,
	subscribeToBot: subscribeToBot,
	updateSoftwareMfaStatus: updateSoftwareMfaStatus,
	selectedBotId: selectedBotId,
	enable2faAuthModal,
	toggleSideNavBar,
	fromSideBarHiddenFlag,
};

const mapDataToProps = (state) => {
	return {
		navigationBar: state.chats.navigationBar,
		userDetails: state.user,
		user: state.user.user,
		userId: state.user.user.userId,
		domains:
			state.domains && state.domains.domains ? state.domains.domains : [],
		newTimeline: state.chats.timeline,
		favourites: state.chats.favourites,
		peopleFav: state.chats.peopleFav,
		selectedDomain: state.selectedDomain,
		selectedContactStore: state.contacts.selectedContact,
		contactRemovingStatus: state.contacts.contactRemovingStatus,
		newContactCreated: state.contacts.newContactCreatedStatus,
		isLicenseValid: state.user.isLicenseValid,
		allProfileImages: state.profileImages || {},
		contactsCallHistory:
			state.user && state.user.contactsCallHistory
				? state.user.contactsCallHistory
				: {},
		sidebarHidden: state.selectedDomain?.sidebarHidden,
	};
};

export default connect(mapDataToProps, actions)(AppNav);

// if (this.props.sidebarHidden) {
// 	this.props.toggleSideNavBar("fromFlag");
// }
