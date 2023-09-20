import React, { Component, Suspense } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import _ from "lodash";
import LoadedModalPopUp from "../ModalMessages/LoadedModalPopUp";
import ModalPopup from "../ModalMessages/ModalPopup";
import Error404 from "../ErrorPages/Error404";
import ProtectedRoute from "../ProtectedRoute";
import ActivateEnterpriseBots from "../Catalog/ActivateEnterpriseBots";
import history from "../../Services/History";
import UserServiceClient from "../../Services/Clients/UserServiceClient";
import {
	storeDomainSelected,
	getSignupPath,
	getAuthData,
} from "../../Services/StorageService";
import { updateLastLoggedInDomain } from "../../Services/UserService";

import ConversationServiceClient from "../../Services/Clients/ConversationServiceClient";
import SpinnerFM from "../Spinner";

import ChatsContainer from "../../Containers/ChatsContainer";
import ContactsContainer from "../../Containers/ContactsContainer";
import ChannelsContainer from "../../Containers/ChannelsContainer";
import CatalogContainer from "../../Containers/CatalogContainer";
import TermsAndConditions from "../App/TermsAndConditions";
import WelcomeContainer from "../../Containers/WelcomeContainer";
import MyProfileContainer from "../../Containers/MyProfileContainer";
import AuthenticationModel from "./AuthenticationModel/AuthenticationModel";
import Enable2faAuthModal from "./AuthenticationModel/Enable2faAuthModal";
import {
	getDataFromLFStorage,
	LFStorageKeys,
	loadAllDomainsListInLFStorage,
} from "../../Services/LFStorage";
import { element } from "prop-types";
import LoftContainer from '../../v2/Components/Loft/LoftContainer';

class ContentView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newProvider: true,
			selectedDomain: {},
		};
	}

	componentDidMount() {
		this.goToLandingBot();
		if (this.props.selectedDomain) {
			this.setState({ selectedDomain: this.props.selectedDomain });
		}
	}
	componentDidUpdate(prevProps, prevState) {
		if (!_.isEqual(this.props.selectedDomain, prevState.selectedDomain)) {
			this.setState({
				selectedDomain: this.props.selectedDomain,
			});
		}
	}

	selectDomain = (domainData) => {
		UserServiceClient.fetchBotSubscriptions(domainData).then((data) => {
			const botIds = (data?.botList && Array.isArray(data.botList) && data.botList.length > 0) ? data.botList.map((bot) => bot.botId) : []
			// data.content && data.content.subscribed ? data.content.subscribed : [];
			// ConversationServiceClient.getCatalog({
			// 	isWebRequest: true,
			// 	selectedDomain: domainData.userDomain
			// }).then((response) => {
			this.parseCatalogResponse(data, botIds, domainData);
			// });
		});
	};

	parseCatalogResponse = (data, botIds, domainData) => {
		// let duplicateData = {
		// 	bots: [
		// 		{
		// 			category: [],
		// 			userRoles: ["enduser"],
		// 			botId: "onboarding-bot",
		// 			userDomain: "frontmai",
		// 			allowResetConversation: "false",
		// 			botClients: {
		// 				mobile: true,
		// 				web: true,
		// 			},
		// 			botName: "Assistant",
		// 			botNameSearch: "assistant",
		// 			botUrl: "botfarm/frontmai/onboarding-bot/2.8.0/onboarding-bot.js",
		// 			dependencies: {
		// 				agentGuardService: {
		// 					remote: true,
		// 					version: "1.6.0",
		// 					url: "botfarm/rc/frontmai/agentGuardService/1.6.0/agentGuardService.js",
		// 				},
		// 				authContext: {
		// 					remote: true,
		// 					version: "1.4.0",
		// 					url: "botfarm/rc/frontmai/authContext/1.4.0/authContext.js",
		// 				},
		// 				archiveUtils: {
		// 					remote: true,
		// 					version: "1.4.0",
		// 					url: "botfarm/rc/frontmai/archiveUtils/1.4.0/archiveUtils.js",
		// 				},
		// 				botUtils: null,
		// 				autoRenewConversationContext: null,
		// 			},
		// 			description: "FrontM setup and customer support assistant",
		// 			descriptionSearch: "frontm setup and customer support assistant",
		// 			logoUrl: "AuthenticationLogo.png",
		// 			slug: "onboarding-bot",
		// 			version: "2.8.0",
		// 			developer: "",
		// 			featured: false,
		// 			systemBot: true,
		// 			minRequiredPlatformVersion: "",
		// 			conversational: true,
		// 			authorisedAccess: false,
		// 			inactivityDuration: 0,
		// 		},
		// 		{
		// 			category: ["Productivity"],
		// 			userRoles: ["staff"],
		// 			botId: "jCujPgMXSdd1keEsgePasq",
		// 			userDomain: "macn",
		// 			allowResetConversation: "false",
		// 			botClients: {
		// 				mobile: true,
		// 				web: true,
		// 			},
		// 			botName: "Beacon Assist - Support Staff",
		// 			botNameSearch: "staff",
		// 			botUrl:
		// 				"botfarm/macn/aaSydYPPf6Sc8vgZ8588UA/1.9.46/aaSydYPPf6Sc8vgZ8588UA.js",
		// 			dependencies: {
		// 				agentGuardService: {
		// 					remote: true,
		// 					version: "1.6.0",
		// 					url: "botfarm/rc/frontmai/agentGuardService/1.6.0/agentGuardService.js",
		// 				},
		// 				authContext: {
		// 					remote: true,
		// 					version: "1.4.0",
		// 					url: "botfarm/rc/frontmai/authContext/1.4.0/authContext.js",
		// 				},
		// 				archiveUtils: {
		// 					remote: true,
		// 					version: "1.5.0",
		// 					url: "botfarm/rc/frontmai/archiveUtils/1.4.0/archiveUtils.js",
		// 				},
		// 				botUtils: {
		// 					remote: true,
		// 					version: "1.0.0",
		// 					url: "botfarm/rc/frontmai/botUtils/1.0.0/botUtils.js",
		// 				},
		// 				autoRenewConversationContext: {
		// 					remote: true,
		// 					version: "1.0.0",
		// 					url: "botfarm/rc/frontmai/autoRenewConversationContext/1.0.0/autoRenewConversationContext.js",
		// 				},
		// 			},
		// 			description:
		// 				"This an application for the Support Team Staff members to help resolve the issues faced by the Vessel Crew.",
		// 			descriptionSearch: "staff",
		// 			logoUrl: "Staff_aaSydYPPf6Sc8vgZ8588UA.png",
		// 			slug: "aaSydYPPf6Sc8vgZ8588UA-Bot",
		// 			version: "1.9.46",
		// 			developer: "FrontM",
		// 			featured: false,
		// 			systemBot: false,
		// 			minRequiredPlatformVersion: "",
		// 			conversational: false,
		// 			authorisedAccess: false,
		// 			inactivityDuration: 0,
		// 		},
		// 		{
		// 			category: ["Utilities"],
		// 			userRoles: ["enduser", "staff", "admin", "crew"],
		// 			botId: "gKjHf8za53SWvT4kwW4viK",
		// 			userDomain: "macn",
		// 			allowResetConversation: "false",
		// 			botClients: {
		// 				mobile: true,
		// 				web: true,
		// 			},
		// 			botName: "Beacon Assistant",
		// 			botNameSearch: "beacon assistant",
		// 			botUrl:
		// 				"botfarm/macn/gKjHf8za53SWvT4kwW4viK/1.0.2/gKjHf8za53SWvT4kwW4viK.js",
		// 			dependencies: {
		// 				agentGuardService: {
		// 					remote: true,
		// 					version: "1.6.0",
		// 					url: "botfarm/rc/frontmai/agentGuardService/1.6.0/agentGuardService.js",
		// 				},
		// 				authContext: {
		// 					remote: true,
		// 					version: "1.4.0",
		// 					url: "botfarm/rc/frontmai/authContext/1.4.0/authContext.js",
		// 				},
		// 				archiveUtils: {
		// 					remote: true,
		// 					version: "1.5.0",
		// 					url: "botfarm/rc/frontmai/archiveUtils/1.4.0/archiveUtils.js",
		// 				},
		// 				botUtils: {
		// 					remote: true,
		// 					version: "1.0.0",
		// 					url: "botfarm/rc/frontmai/botUtils/1.0.0/botUtils.js",
		// 				},
		// 				autoRenewConversationContext: {
		// 					remote: true,
		// 					version: "1.0.0",
		// 					url: "botfarm/rc/frontmai/autoRenewConversationContext/1.0.0/autoRenewConversationContext.js",
		// 				},
		// 			},
		// 			description: "Beacon Assistant",
		// 			descriptionSearch: "beacon assistant",
		// 			logoUrl: "Beacon_Assistant_gKjHf8za53SWvT4kwW4viK.png",
		// 			slug: "gKjHf8za53SWvT4kwW4viK-Bot",
		// 			version: "1.0.2",
		// 			developer: "FrontM",
		// 			featured: false,
		// 			systemBot: true,
		// 			minRequiredPlatformVersion: "",
		// 			conversational: true,
		// 			authorisedAccess: false,
		// 			inactivityDuration: 0,
		// 		},
		// 	],
		// 	companies: {},
		// 	categories: {},
		// };
		// let bots = duplicateData.bots || [];
		let bots = data?.botList || [];
		const subscribedBots = bots.filter((bot) => botIds.includes(bot.botId));
		const convBot = subscribedBots.filter((bot) => bot.botId === domainData.landingBotId);

		// if (convBot.length) {
		console.log("props", this.props);
		this.props.createConversation(bots[0], this.props?.userId);
		// }
		this.props.history.push("/app/chats");
		this.props.hideSpinner();
	};

	goToLandingBot = async () => {
		try {
			const pathName = getSignupPath();
			if (
				(pathName && pathName !== "/login") ||
				!pathName ||
				(this.props.location.state &&
					this.props.location.state.routingFrom === "signup")
			) {
				let domainsList = await getDataFromLFStorage(LFStorageKeys.DOMAINS);
				if (_.isEmpty(domainsList)) {
					let domainsListRes = await UserServiceClient.getDomain();
					domainsList = domainsListRes.domainsList;
					loadAllDomainsListInLFStorage(domainsList);
				}

				// console.log("ADITYA323 checking domain list", domainsList);

				domainsList.forEach((elem) => {
					// if (elem.landingBotId) {
						this.props.showSpinner();
						// updateLastLoggedInDomain(elem.userDomain).then(() => {
							this.props.setSelectedDomain(elem);
							storeDomainSelected(elem);
							// console.log("ADITYA323 checking selected domain", elem);
							this.selectDomain(elem);
						// });
					// }
				});
			}
		} catch (error) {
			console.error("ERROR in goToLandingBot", error);
		}
	};

	acceptTerms = () => {
		// this.props.updateTnC(true);
		// this.goToLandingBot();
	};

	rejectTerms = () => {
		// this.props.updateTnC(false);
		// this.props.logout();
	};

	hideNewProvideDialog = () => {
		this.setState({ newProvider: false });
	};
	closeMFAModal = () => {
		if (!getAuthData().user.softwareMfaEnabled) {
			this.props.updateSoftwareMfaEnabled(false);
		} else {
			this.props.updateSoftwareMfaEnabled(true);
		}
		this.props.updateSoftwareMfaStatus(null);
		this.props.updateBotIdForMFA(null);
	};

	licenseCodeValidationRender = () => {
		const { selectedDomain, userId, getAllDomains } = this.props;
		// if (this.props.isLicenseValid) {
		// 	if (!this.props.tncAccept && !this.props.isAnonymousUser) {
		// 		return (
		// 			<ModalPopup size="sm" noHeader>
		// 				<Suspense
		// 					fallback={
		// 						<div>
		// 							<SpinnerFM show={true} />
		// 						</div>
		// 					}
		// 				>
		// 					<TermsAndConditions
		// 						selectedDomain={this.state.selectedDomain}
		// 						acceptTerms={this.acceptTerms}
		// 						rejectTerms={this.rejectTerms}
		// 					/>
		// 				</Suspense>
		// 			</ModalPopup>
		// 		);
		// 	}
		// }
		if (!this.props.isLicenseValid) {
			if (this.state.newProvider) {
				return (
					<ModalPopup size="sm" noHeader>
						<div className="p-2">
							<h5> Please enter the correct license key</h5>
							<ActivateEnterpriseBots
								isLicenseValid={false}
								userId={userId}
								getAllDomains={getAllDomains}
								onFormSubmit={() => {
									this.props.refreshCompanies();
									this.props.fetchBotSubscriptions({ ...selectedDomain });
									this.hideNewProvideDialog();
								}}
								history={history}
							/>
						</div>
					</ModalPopup>
				);
			}
		}
	};

	render() {
		const { isMFAenabled } = this.props;
		return (
			<div
				className={
					this.props.navbarToggle.hidden
						? "Logged-contentarea-hidden"
						: "Logged-contentarea"
				}
				role="main"
			>
				<Suspense fallback={<div>Control flow fallback</div>}>
					<Switch>
						<Redirect exact from="/app" to="/app/chats" />
						<Route exact path="/app/chats/:id" component={ChatsContainer} />
						<Route path="/app/chats" component={ChatsContainer} />
						<ProtectedRoute
							path="/app/groups"
							component={ChannelsContainer}
							{...this.props}
						/>
						<ProtectedRoute
							path="/app/contacts"
							component={ContactsContainer}
							{...this.props}
						/>
						<ProtectedRoute
							path="/app/catalog"
							component={CatalogContainer}
							{...this.props}
						/>
						<ProtectedRoute
							path="/app/my-profile"
							component={MyProfileContainer}
							{...this.props}
						/>
						<ProtectedRoute
							path="/app/loft"
							component={LoftContainer}
							{...this.props}
						/>
						<ProtectedRoute
							path="/app/home"
							component={WelcomeContainer}
							{...this.props}
						/>
						<ProtectedRoute
							path="/app/*"
							component={Error404}
							{...this.props}
						/>
					</Switch>
				</Suspense>

				<LoadedModalPopUp />
				{isMFAenabled &&
					(this.props.loginState === "frontm" ||
						this.props.loginState === "google") && (
						<AuthenticationModel
							userEmail={this.props.userEamil}
							number={this.props.userContact}
							loginState={this.props.loginState}
							mfaBotId={this.props.mfaBotId}
							status=""
							finish={false}
							closeAuthModal={() => {
								this.closeMFAModal();
							}}
						/>
					)}
				{this.props.enable2faAuthModal && <Enable2faAuthModal />}
				{this.licenseCodeValidationRender()}
			</div>
		);
	}
}

export default withRouter(ContentView);
