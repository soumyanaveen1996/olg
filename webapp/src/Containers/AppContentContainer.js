import React, { Component } from "react";
import { connect } from "react-redux";
import {
	getTimeLine,
	ingestMessage,
	initiateConversationForLink,
	updateWalletBalance,
	createConversation,
	streamChatMessages,
	resetUnreadMessagesCount,
} from "./../State/actions/chats";
import _ from "lodash";
import AppContent from "../Components/App/AppContent";
import { fetchContacts, updateContactList } from "../State/actions/contacts";
import { removeAppNotification } from "../State/actions/appNotifications";
import {
	fetchBotSubscriptions,
	logout,
	updateTnC,
	getGeoLocationData,
	getAllDomains,
	fetchWalletBalanceService,
	fetchCatalog,
	setSelectedDomain,
	sendMsgForBanner,
	updateSoftwareMfaStatus,
	updateQrCodeUri,
	updateSoftwareMfaEnabled,
	updateBotIdForMFA,
} from "../State/actions/user";
import { updateSubscriptionOnServer } from "../State/actions/notification";
import {
	fetchSubscribedChannels,
	updateChannelList,
} from "../State/actions/channels";
import { getFavourite } from "../State/actions/chats";
import AgentGuardServiceClient from "../Services/Clients/AgentGuardServiceClient";
// import { setTimeout, setInterval } from "timers";
import { isMobileDevice, ORIENTATION } from "../Utils/Helpers";
import "../styles/css/style.css";
import UserServiceClient from "../Services/Clients/UserServiceClient";
import Notify from "../Components/ModalMessages/ToastNotif";
import { fetchCompanies } from "../State/actions/catalogue";
import { showSpinner, hideSpinner } from "../State/actions/spinner";
import {
	hangupCall,
	incomingVoipCall,
	resetCallInfo,
} from "../State/actions/phone";
import { pushAsyncMsg } from "../Services/BotsService";
import Loader from "../Components/Loader/Loader";
import { getAuthData } from "../Services/StorageService";
import { initiateLFStorage } from "../Services/LFStorage";
import QueueServiceClient from "../Services/Clients/QueueServiceClient";
import { SOCKET } from "../Utils/Constants";

class AppContentContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedDomain: {},
			userVoipStatus: {},
			isMFAenabled: this.props.softwareMfaStatus === "inititate" || false,
			mfaBotId: null,
			isLoading: true
		};
	}
	componentDidMount() {
		setTimeout(() => {
			this.setState({ isLoading: false });
		}, 3000);
		let props = this.props;
		if (props.voipStatus) {
			this.setState({ userVoipStatus: { ...props.voipStatus } });
		}
		// UserServiceClient.getAppBroadcastMessages()
		// 	.then((broadcast) => {
		// 		const { messages } = broadcast;
		// 		messages.forEach(({ message }) => {
		// 			Notify({ type: "info", message });
		// 		});
		// 	})
		// 	.catch((error) => {
		// 		console.error("Error Occurred Getting Broadcast messages", error);
		// 	});

		let {
			getTimeLine,
			getAllDomains,
			fetchWalletBalanceService,
			getGeoLocationData,
			fetchContacts,
			getFavourite,
			fetchBotSubscriptions,
			fetchSubscribedChannels,
			streamChatMessages,
			isOnline,
		} = props;

		let { isMobile, orientation = ORIENTATION.PORTRAIT } = isMobileDevice();

		this.setState({ isMobile, orientation });

		if (isOnline) {
			SOCKET.STREAM_QUEUE_MSG = QueueServiceClient.setupQueueMessageStream(
				this.receiveIncoming
			);
			SOCKET.STREAM_QUEUE_MSG.connect();
		}

		if (this.props.selectedDomain) {
			this.setState({
				selectedDomain: this.props.selectedDomain,
			});
		}
		this.props.isAnonymousUser &&
			setTimeout(async () => {
				await fetchBotSubscriptions(this.props.selectedDomain);
				await this.props.initiateConversationForLink();
			}, 0);

		// setInterval(() => {
		// 	const agInput = {
		// 		capability: "PingAgentGuardCapability",
		// 	};
		// 	console.info("Health Checkup: ", new Date());
		// 	AgentGuardServiceClient.execute(agInput);
		// }, 300000);

		window.addEventListener("resize", () => {
			let { isMobile, orientation = ORIENTATION.PORTRAIT } = isMobileDevice();
			this.setState({ isMobile, orientation });
		});

		if (!this.props.isAnonymousUser) {
			let storedUser = getAuthData();
			if (storedUser === null) {
				this.props.logout();
				return;
			}
			initiateLFStorage(storedUser.user).then(() => {
				getAllDomains().then(() => {
					let selectedDomain = {
						selectedDomain:
							this.props?.selectedDomain &&
							this.props.selectedDomain.userDomain,
					};
					if (!selectedDomain?.selectedDomain) {
						const getFromLocalStorage = localStorage.getItem("StoredDomain");
						selectedDomain = {
							selectedDomain: JSON.parse(getFromLocalStorage)?.userDomain,
						};
					}
					// Promise.all([
					// 	fetchWalletBalanceService(),
					// 	getGeoLocationData(),
					// 	fetchBotSubscriptions(selectedDomain),
					// 	fetchContacts(selectedDomain, true),
					// 	getFavourite(selectedDomain),
					// 	fetchSubscribedChannels(selectedDomain),
					// 	getTimeLine(),
					// 	streamChatMessages(),
					// ]).catch(() => {
					// 	console.error(
					// 		"Failed to Fetch data at same time and fill the redux state"
					// 	);
					// });
				});
			});
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (!_.isEqual(this.props.selectedDomain, prevState.selectedDomain)) {
			this.setState({ selectedDomain: this.props.selectedDomain });
		}

		if (!_.isEqual(this.props.voipStatus, prevState.userVoipStatus)) {
			this.setState({
				userVoipStatus: this.props.voipStatus,
			});
		}

		if (this.props.softwareMfaStatus !== prevProps.softwareMfaStatus) {
			this.setState({
				isMFAenabled:
					this.props.softwareMfaStatus === "initiate" ||
					this.props.softwareMfaStatus === "validateNumber" ||
					this.props.softwareMfaStatus === "idle" ||
					this.props.softwareMfaStatus === "idleValidateNumber" ||
					this.props.softwareMfaStatus === "deactivate" ||
					this.props.softwareMfaStatus === "deactivateMfa",
			});
		}
		if (this.props.mfaBotId !== prevState.mfaBotId) {
			this.setState({
				mfaBotId: this.props.mfaBotId,
			});
		}
		// if (this.props.isMFAenabled !== prevState.isMFAenabled) {
		// 	this.setState({
		// 		isMFAenabled: this.props.isMFAenabled,
		// 	});
		// }
		if (this.props.mfaBotId !== prevState.mfaBotId) {
			this.setState({
				mfaBotId: this.props.mfaBotId,
			});
		}
		this.resetRTC();
	}
	resetRTC = () => {
		if (this.props.isOnline && SOCKET.STREAM_QUEUE_MSG === null) {
			SOCKET.STREAM_QUEUE_MSG = QueueServiceClient.setupQueueMessageStream(
				this.receiveIncoming
			);
			SOCKET.STREAM_QUEUE_MSG.connect();
		} else if (!this.props.isOnline && SOCKET.STREAM_QUEUE_MSG !== null) {
			SOCKET.STREAM_QUEUE_MSG.disconnect();
			SOCKET.STREAM_QUEUE_MSG = null;
		}
	};

	receiveIncoming = (message) => {
		if (!message.conversation || message.conversation === "") {
			return this.doActionBasedOnContentType(message);
		}
		pushAsyncMsg(message);
	};

	doActionBasedOnContentType = (message) => {
		// ***Handle Balance Update Message***

		let contentType = parseInt(message.contentType);
		switch (contentType) {
			case 11000:
				//Message type wallet balance
				this.props.updateWalletBalance(message);
				break;
			case 25000:
				this.props.incomingVoipCall(message);
				break;
			case 14001:
			case 14002:
				// This resets unread messages count across all devices when user reads chat in any 1 device
				this.props.resetUnreadMessagesCount(message);
				break;
			case 25010:
				this.props.hangupCall(message);
				// this.props.resetCallInfo();
				break;
			case 10002:
			case 10001:
			case 10003:
			case 10004:
			case 10005:
			case 1001:
				this.props.updateContactList(message);
				break;
			case 11001:
			case 11002:
				this.props.updateChannelList(message);
				break;
			default:
				return;
		}
	};

	logout = () => {
		this.props.logout();
	};

	render() {
		let { user } = this.props;
		let { isMFAenabled, selectedDomain, userVoipStatus, mfaBotId, isLoading } = this.state;
		if (!user && !selectedDomain) {
			return null;
		}

		if (isLoading) {
			return <img style={{ position: "fixed", left: "45%", top: "45%", width: "5%" }} src="/img/loft-loading.gif" alt="Loading..." />;
		}

		return (
			<>
				<AppContent
					{...this.props}
					userVoipStatus={userVoipStatus}
					selectedDomain={selectedDomain}
					logout={this.logout}
					isMFAenabled={isMFAenabled}
					mfaBotId={mfaBotId}
				/>
				<Loader />
			</>
		);
	}
}

const mapActionsToProps = {
	getTimeLine,
	getAllDomains,
	fetchWalletBalanceService,
	getGeoLocationData,
	ingestMessage,
	updateWalletBalance,
	resetUnreadMessagesCount,
	updateContactList,
	updateChannelList,
	getFavourite,
	fetchContacts,
	fetchBotSubscriptions,
	logout,
	updateSubscriptionOnServer,
	fetchSubscribedChannels,
	updateTnC,
	fetchCatalog,
	initiateConversationForLink,
	removeAppNotification,
	fetchCompanies: fetchCompanies,
	createConversation: createConversation,
	setSelectedDomain: setSelectedDomain,
	showSpinner: showSpinner,
	hideSpinner: hideSpinner,
	sendMsgForBanner: sendMsgForBanner,
	incomingVoipCall: incomingVoipCall,
	resetCallInfo: resetCallInfo,
	hangupCall: hangupCall,
	updateSoftwareMfaStatus: updateSoftwareMfaStatus,
	updateQrCodeUri: updateQrCodeUri,
	updateSoftwareMfaEnabled: updateSoftwareMfaEnabled,
	updateBotIdForMFA,
	streamChatMessages,
};

const mapDataToProps = (state) => {
	const chats = state.chats;
	return {
		user: state.user?.user,
		userDetails: state.user,
		isOnline: state.user?.isOnline,
		chats: state.chats,
		isAnonymousUser: state.user?.isAnonymousUser,
		notification: state.notification,
		newUser: state.user?.auth?.newUser,
		tncAccept: state.user?.user?.tncAccept,
		geoData: state.user?.geoData,
		selectedDomain: state.selectedDomain,
		selectedContactStore: state.contacts.selectedContact,
		navbar: chats.navigationBar.navbar,
		isLicenseValid: state.user?.isLicenseValid,
		voipStatus: state.user?.voipStatus,
		loginState: state.user?.loginState,
		mfaBotId:
			state.chats?.selectedConversation?.bot?.botId ||
			state.catalogue?.selectedBotId,
		softwareMfaStatus: state.user?.softwareMfaStatus,
		isMFAenabled: state.user?.softwareMfaEnabled,
	};
};
export default connect(mapDataToProps, mapActionsToProps)(AppContentContainer);
