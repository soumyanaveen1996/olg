import React, { Component, Fragment } from "react";
import _ from "lodash";
import dayjs from "dayjs";
import IdleTimer from "react-idle-timer";
import AppContentContainer from "./../../Containers/AppContentContainer";
import axios from "axios";
import "./App.css";
import {
	hydrateUserData,
	onSelectDomain,
	getAllDomains,
	fetchWalletBalanceService,
	updateLoginMethod,
	doAnonymousAuth,
	refreshAnonymousUserSession,
	fetchCatalog,
	logout,
	updateSoftwareMfaStatus,
} from "../../State/actions/user";
import {
	initiateConversationForLink,
	toggleSideNavBar,
} from "../../State/actions/chats";
import { connect } from "react-redux";
import Config from "../../Utils/Config";
import {
	getAuthData,
	getDomainSelcted,
	getLinkData,
	getLoginState,
	removeAuthData,
	removeLinkData,
	removeSelectedConversation,
	storeLinkData,
} from "../../Services/StorageService";
import PushNotificationContainer from "../../Containers/PushNotificationContainer";
import AppNavContainer from "../../Containers/AppNavContainer";
import {
	newContactAddedStatus,
	removeContactStatus,
} from "../../State/actions/contacts";
import PhoneDevice from "../Telephony/PhoneDevice";
import CollapsableLeftNav from "../CollapsableNavBar/CollapsableLeftNav";
import { populateLinkData } from "../../State/actions/chats";
import { initiateLFStorage } from "../../Services/LFStorage";
import { updateIsIdleStatus } from "./../../State/actions/user";
import ModalPopup from "../ModalMessages/ModalPopup";
import VersionCheckModal from "../../v2/Components/Common/FMVersionCheck/VersionCheckModal";
import UpdateWebAppContainer from "../../Containers/UpdateWebAppContainer";

const TWO_WEEK = 60 * 60 * 24 * 14;
const ONE_HOUR = 60 * 60;
class App extends Component {
	constructor(props) {
		super(props);
		this.idleTimerRef = React.createRef(null);
		this.idleTabTimer = React.createRef(null);
		this.state = {
			contactSelected: {},
			profileImage: "",
			sidebar: { hidden: true, frozen: true },
			newVersionAvailable: false,
			isLoading: true,
		};
	}

	visibilityChange = () => {
		if (
			this.props.user &&
			this.props.user.softwareMfaEnabled &&
			this.props.chats.selectedConversation &&
			this.props.chats.selectedConversation?.bot?.authorisedAccess &&
			document.hidden
		) {
			this.idleTabTimer = setTimeout(() => {
				this.onIdle();
			}, this.props.chats.selectedConversation?.bot.inactivityDuration * 60 * 1000);
		} else {
			clearTimeout(this.idleTabTimer);
			this.idleTabTimer = null;
		}
	};

	componentDidUpdate(prevProps, prevState) {
		if (!_.isEqual(prevProps.sidebar, prevState.sidebar)) {
			this.setState({ sidebar: { ...prevProps.sidebar } });
		}
		if (!_.isEqual(this.props.sidebar, prevState.sidebar)) {
			this.setState({ sidebar: { ...this.props.sidebar } });
		}

		if (
			this.props.selectedDomain &&
			!_.isEqual(this.props.selectedDomain, prevProps.selectedDomain)
		) {
			if (
				["onship", "stsatcom"].includes(
					this.props.selectedDomain.userDomain
				)
			) {
				window.document.title = this.props.selectedDomain.name;
			} else {
				window.document.title = "FrontM Platform";
			}
		}

		document.addEventListener("visibilitychange", this.visibilityChange);
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({ isLoading: false });
		}, 3000);
		let {
			hydrateUserData,
			user,
			onSelectDomain,
			getAllDomains,
			updateLoginMethod,
			selectedDomain,
		} = this.props;

		if (
			["onship", "stsatcom"].includes(selectedDomain?.userDomain)
		) {
			window.document.title = selectedDomain.name;
		} else {
			window.document.title = "FrontM Platform";
		}

		if (!user) {
			let storedUser = getAuthData();
			if (storedUser === null) {
				this.props.logout();
				return;
			}
			initiateLFStorage(storedUser.user);
			let storedDomain = getDomainSelcted();
			let storedLoginState = getLoginState();
			let storedLinkData = getLinkData();
			const pathName =
				!_.isEmpty(this.props.history) &&
					!_.isEmpty(this.props.history.location)
					? this.props.history.location.pathname
					: "";
			if (
				this.shouldFollowAnonymousUserFlow(storedLinkData, storedUser) &&
				this.isChatURL(pathName)
			) {
				this.anonymousUserFlow(storedLinkData);
			} else {
				if (storedUser) {
					hydrateUserData(storedUser);
					if (storedDomain) {
						onSelectDomain(storedDomain);
						// console.log("1.App component props ========= ", storedDomain);
					} else if (!storedUser.isAnonymousUser) {
						// getVoipDevice();
						// getAllDomains();
						// fetchWalletBalanceService();
					}

					if (storedLoginState) {
						updateLoginMethod(storedLoginState);
					}
				} else {
					this.props.history.push("/login");
				}
			}
		}
		window.addEventListener("popstate", (e) => {
			if (this.props.history.location.pathname === "/offlinelms/app/home") {
				this.props.history.push("/offlinelms/app/chat");
			}
		});

		// for version check
		var data = JSON.stringify({
			action: "get",
			app: "onship",
			client: "web",
		});

		var config = {
			method: "post",
			url: "https://gwdev.frontm.ai/devproxy/getCurrentVersion",
			headers: {
				"Content-Type": "application/json",
				// "access-control-allow-origin": "*",
			},
			data: data,
		};

		// axios(config)
		// 	.then(function (response) { })
		// 	.catch(function (error) { });
	}

	shouldFollowAnonymousUserFlow = (storedLinkData, storedUser) => {
		return (
			!_.isEmpty(storedLinkData) &&
			storedLinkData.botId &&
			storedLinkData.type &&
			storedUser &&
			storedUser.isAnonymousUser
		);
	};

	isChatURL = (pathname) => {
		console.log("isChatURL pathname = ", pathname, pathname === "/app/chats");
		return (
			pathname === "/offlinelms/app/chats" ||
			pathname === "/offlinelms/app/chats/" ||
			pathname === "/app/" ||
			pathname === "/app"
		);
	};

	anonymousUserFlow = (storedLinkData) => {
		let { type, botId } = storedLinkData;
		let user = getAuthData();
		if (user && user.isAnonymousUser) {
			let storedAt = user.stored_at;
			let currentTime = dayjs();
			const diff = currentTime.diff(dayjs(storedAt), "second");
			if (diff > TWO_WEEK) {
				this.processAnonymousUserCreation(type, botId);
			} else if (diff > ONE_HOUR) {
				this.props.hydrateUserData(user);
				this.props.refreshAnonymousUserSession((error, data) => {
					if (!error) {
						this.processAnonymousUserLink(type, botId);
					}
				});
			} else {
				console.log("session younger than one hour. opening conversation");
				this.props.hydrateUserData(user);
				this.processAnonymousUserLink(type, botId);
			}
		} else {
			this.processAnonymousUserCreation(type, botId);
		}
	};

	processAnonymousUserCreation = (type, botId) => {
		removeAuthData();
		removeSelectedConversation();
		removeLinkData();
		this.props.doAnonymousAuth(type, botId, (error, data) => {
			if (!error) {
				this.processAnonymousUserLink(type, botId);
			} else {
				console.log("ERROR anonymousUserFlow callback of doAnonymousAuth ");
			}
		});
	};

	processAnonymousUserLink = (type, botId) => {
		let {
			populateLinkData,
			history,
			location: { search },
		} = this.props;

		if (search) {
			let queryString = search.slice(1).split("&");
			let result = {};
			queryString.forEach((pair) => {
				pair = pair.split("=");
				result[pair[0]] = decodeURIComponent(pair[1] || "");
			});
			let newResult = JSON.parse(JSON.stringify(result));
			console.log("appjs > processAnonymousUserLink", newResult);
		}
		storeLinkData({ type: type, botId: botId });
		populateLinkData(type, botId);
		history.push("/offlinelms/app/chats");
		this.setState({ isLoading: true });
	};

	onIdle = () => {
		// User is idle for inactivityDuration(in min) * 60(sec) * 1000(milisec).
		console.log(
			`User was idle for ${this.props.chats.selectedConversation.bot.inactivityDuration} min!!`
		);
		this.props.updateSoftwareMfaStatus("idle");
	};
	userActive = () => {
		console.log("User is active now!!");
	};

	render() {
		let props = this.props;
		let user = props.user;
		let selectedDomain = props.selectedDomain;
		if (!user && !selectedDomain) {
			return null;
		}
		return (
			<Fragment>
				{this.state.isLoading ? (
					<img
						style={{ position: "fixed", left: "45%", top: "45%", width: "5%" }}
						src="/offlinelms/img/loft-loading.gif"
						alt="Loading..."
					/>
				) : (
					<div className="Logged-main">
						{user?.softwareMfaEnabled &&
							this.props.chats.selectedConversation &&
							this.props.chats.selectedConversation?.bot?.authorisedAccess && (
								<IdleTimer
									ref={this.idleTimerRef}
									timeout={
										this.props.chats.selectedConversation.bot
											.inactivityDuration *
										60 *
										1000 // the value is in mins
									}
									onIdle={this.onIdle}
									onActive={this.userActive}
								/>
							)}
						{!this.props.sidebar.hidden && !this.props.isAnonymousUser ? (
							<div className="Logged-navbar">
								<AppNavContainer
									history={props.history}
									pathname={props.location.pathname}
								/>
							</div>
						) : null}

						<div className="Logged-content-container">
							<AppContentContainer
								profileImage={this.state.profileImage}
								{...this.props}
							/>
							{/* <CollapsableTopNav /> */}
							<CollapsableLeftNav />
						</div>
						{!this.props.isAnonymousUser && (
							<PushNotificationContainer {...this.props} />
						)}
						{/*<UpdateSWContainer {...this.props} />*/}
						{!this.props.isAnonymousUser && <PhoneDevice />}
						{/* <UpdateWebAppContainer /> */}
						{this.state.newVersionAvailable && (
							<ModalPopup>
								<VersionCheckModal />
							</ModalPopup>
						)}
					</div>
				)}
			</Fragment>
		);
	}
}

const mapActionsToProps = {
	hydrateUserData: hydrateUserData,
	onSelectDomain: onSelectDomain,
	getAllDomains: getAllDomains,
	fetchWalletBalanceService: fetchWalletBalanceService,
	updateLoginMethod: updateLoginMethod,
	populateLinkData,
	doAnonymousAuth,
	refreshAnonymousUserSession,
	initiateConversationForLink,
	fetchCatalog,
	newContactAddedStatus,
	removeContactStatus,
	logout,
	updateIsIdleStatus: updateIsIdleStatus,
	// updateServiceWorkerRequired
	updateSoftwareMfaStatus,
	toggleSideNavBar,
};

const mapDataToProps = (state) => {
	let chats = state.chats;
	// console.log("App", state.contacts.selectedContact.userName)
	return {
		user: state.user.user,
		linkData: state.chats.linkData,
		isAnonymousUser: state.user.isAnonymousUser,
		selectedDomain: state.selectedDomain,
		selectedContactStore: state.contacts.selectedContact,
		profileImage: "",
		contactRemovingStatus: state.contacts.contactRemovingStatus,
		newContactCreated: state.contacts.newContactCreatedStatus,
		sidebar: chats.navigationBar.sidebar,
		chats,
		sidebarHidden: state.selectedDomain?.sidebarHidden,
		selectedContactDisplay: state.contacts.selectedContact.userName,
	};

	// updateSWFlag: state.notification.updateSWFlag,
	// installingWorkerInstance: state.notification.installingWorkerInstance
};

export default connect(mapDataToProps, mapActionsToProps)(App);
