import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
	checkSatelliteCall,
	fetchWalletBalance,
	getVoipDevice,
	getVoipToken,
	MIN_WALLET_BAL,
	PSTN_CALL,
} from "../../Services/VoipServices";
import {
	findCallerName,
	notifyBalanceError,
	notifyConnectionError,
	notifyInvalidPhone,
	TWILIO_AVOIDABLE_ERROR_CODES,
	validatePhoneNumber,
} from "./Utils";
import CallSummary from "./CallSummary";
import DiallingScreen from "./DiallingScreen";
import ModalPopup from "../ModalMessages/ModalPopup";
import IncomingCallScreen from "./IncomingCallScreen";
import { resetCallInfo } from "../../State/actions/phone";
import Notify from "../ModalMessages/ToastNotif";
import {
	setCallHistory,
	clearLoggedInUserCallHistory,
	getLoggedInUserCallHistory,
} from "../../State/actions/user";
import _ from "lodash";
import store from "../../State/configureStore";
import AudioCall from "../AudioCall/AudioCall";
import { MessageTypeConstants } from "../../Services/Message";
import { hideSpinner } from "../../State/actions/spinner";
import UserServiceClient from "../../Services/Clients/UserServiceClient";
import Button from "../Interactions/content/forms/Elements/Button";
import MeetingRoom from "../Video/Components/MeetingRoom";
class PhoneDevice extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			diallerState: "ready",
			diallerDir: "outgoing",
			callDuration: 0,
			muted: false,
			isSatellite: false,
			videoSessionId: null,
			rejectCall: false,
			callStartedTime: 0,
			toUserId: null,
			// initiator: false,
		};
	}

	componentDidMount() {
		// /this.loadDevice(this.props.low_bw_calls);
		// this.setupBeforeUnloadListener(); //this is when tab is closed during call //removing it now, causing issue with the session
		this.deviceRefreshInterval = setInterval(this.refreshDevice, 2700000);

		if (this.props.diallerState) {
			this.setState({ diallerState: this.props.diallerState });
			if (this.props.diallerState === "incoming") {
				this.setState({ callDuration: 0 });
				this.playAudio();
			}
		}
		if (this.props && this.props.to) {
			this.setState({ toUserId: this.props.to });
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.low_bw_calls !== prevProps.low_bw_calls) {
			// this.loadDevice(this.props.low_bw_calls);
			let myDevice = this.device;
			if (this.props.low_bw_calls) {
				getVoipToken().then((token) => {
					if (token) {
						myDevice?.setup(token, {
							allowIncomingWhileBusy: false,
							codecPreferences: ["opus", "pcmu"],
							maxAverageBitrate: 8000,
						});
					} else {
						console.error("No Voip token found!");
					}
				});
			} else {
				getVoipToken().then((token) => {
					if (token) {
						myDevice?.setup(token, {
							allowIncomingWhileBusy: false,
							codecPreferences: ["opus", "pcmu"],
						});
					} else {
						console.error("No Voip token found!");
					}
				});
			}
		}
		if (
			this.props.to &&
			(this.props.type !== prevProps.type ||
				this.props.to !== prevProps.to ||
				this.props.toUserId !== prevProps.toUserId ||
				this.props.localCall !== prevProps.localCall)
		) {
			this.makeCall(
				this.props.type,
				this.props.from,
				this.props.to,
				this.props.toName,
				this.props.toUserId,
				this.props.localCall,
				this.props.diallerState,
				this.props.videoEnabled
			);
		}

		if (this.props && this.props.to) {
			if (this.props.to !== prevState.toUserId) {
				this.setState({ toUserId: this.props.to });
			}
		}

		if (this.props.diallerState !== prevProps.diallerState) {
			// if (!this.props.diallerState) {
			// 	this.callDisconnectHandler();
			// }
			if (this.props.diallerState) {
				this.setState({ diallerState: this.props.diallerState }, () => {
					if (this.props.diallerState === "incoming") {
						this.setState({ callDuration: 0 });
						this.playAudio();
					}
					if (this.props.diallerState === "call-hung") {
						this.callDisconnectHandler();
					}
				});
			}
		}
	}

	setupBeforeUnloadListener = () => {
		//this is when tab is closed during call
		window.addEventListener("beforeunload", (ev) => {
			ev.preventDefault();
			return this.doSomethingBeforeUnload();
		});
	};

	doSomethingBeforeUnload = () => this.sendUserAvailability();

	makeCall = async (
		type,
		from,
		to,
		toName,
		toUserId,
		localCall,
		diallerState,
		videoEnabled
	) => {
		from = from || this.props.emailAddress;
		let connection = null;
		if (type === "voip") {
			// connection = this.makeVOIPCall(from, to);
			this.setState({ isSatellite: false, diallerState: "on-call" });
		} else if (type === "phone") {
			connection = await this.makePhoneCall(from, to, toUserId, localCall);
			this.setState({ isSatellite: false });
		} else if (type === "sat") {
			connection = await this.makeSatCall(from, to, toUserId, localCall);
			this.setState({ isSatellite: true });
		}
		this.setState({ connection, diallerDir: "outgoing" });
	};

	componentWillUnmount() {
		if (this.deviceRefreshInterval) {
			clearInterval(this.deviceRefreshInterval);
		}
		// this.sendUserAvailability();
	}

	loadDevice = async (low_bw = false) => {
		this.device = await getVoipDevice(low_bw);

		this.device.on("ready", this.onDeviceReadyHandler);
		this.device.on("incoming", this.incomingCallHandler);
		this.device.on("offline", this.refreshDevice);
		this.device.on("disconnect", this.callDisconnectHandler);
		this.device.on("cancel", this.callCancelHandler);
		this.device.on("error", this.connectionErrorHandler);
		this.device.on("connect", this.connectionHandler);
	};

	refreshDevice = () => {
		if (this.props.low_bw_calls) {
			getVoipToken().then((token) => {
				if (this.device && token) {
					this.device.setup(token, {
						allowIncomingWhileBusy: false,
						codecPreferences: ["opus", "pcmu"],
						maxAverageBitrate: 8000,
					});
				} else {
					console.error("No Voip token found!");
				}
			});
		} else {
			getVoipToken().then((token) => {
				if (token) {
					this.device.setup(token, {
						allowIncomingWhileBusy: false,
						codecPreferences: ["opus", "pcmu"],
					});
				} else {
					console.error("No Voip token found!");
				}
			});
		}
	};

	onDeviceReadyHandler = () => {
		this.setState({ diallerState: "ready" });
	};

	callDisconnectHandler = () => {
		console.log("CALL DONE");
		this.stopAudio();
		if (this.state.intervalId) {
			clearInterval(this.state.intervalId);
		}

		setTimeout(() => {
			const to = this.props.to;
			store.dispatch(setCallHistory(to));
		}, 2000);

		this.setState({
			diallerState: "call-hung",
			videoSessionId: null,
			intervalId: null,
			connection: null,
			callerId: null,
			isSatellite: false,
		});

		let currentCallTimeStamp = Date.now();
		this.props.getLoggedInUserCallHistory(currentCallTimeStamp);

		//this.props.clearLoggedInUserCallHistory();
		//this.props.getLoggedInUserCallHistory(currentCallTimeStamp);
	};

	callCancelHandler = () => {
		this.stopAudio();
		if (this.state.intervalId) {
			clearInterval(this.state.intervalId);
		}
		let currentCallTimeStamp = Date.now();
		this.props.getLoggedInUserCallHistory(currentCallTimeStamp);
		this.setState({
			diallerState: "call-hung",
			videoSessionId: null,
			intervalId: null,
			connection: null,
		});
	};

	incomingCallHandler = (conn) => {
		this.setState({
			connection: conn,
			callerId: conn.parameters.From,
			diallerState: "call-received",
			diallerDir: "incoming",
		});
	};

	connectionErrorHandler = (error) => {
		this.setState({
			diallerState: null,
			videoSessionId: null,
			connection: null,
			callerId: null,
		});
		console.log("TWILIO ERROR: ", JSON.stringify(error));

		if (error.code === 31204) {
			this.refreshDevice();
		}
		if (TWILIO_AVOIDABLE_ERROR_CODES.indexOf(error.code) === -1) {
			notifyConnectionError(error.message);
		}
		this.stopAudio();
		this.props.resetCallInfo();
		setTimeout(() => {
			let currentCallTimeStamp = Date.now();
			this.props.getLoggedInUserCallHistory(currentCallTimeStamp);
		}, 2000);
	};

	connectionHandler = () => {
		if (this.props.videoEnabled !== true) {
			const intervalId = setInterval(() => {
				if (this.state.intervalId) {
					this.setState({ callDuration: this.state.callDuration + 1 });
				}
			}, 1000);
			this.setState({
				diallerState: "on-call",
				intervalId,
				callDuration: 0,
			});
		} else if (this.props.videoEnabled === true) {
			this.setState({
				diallerState: "on-call",
				intervalId: null,
				callDuration: 0,
			});
		}
		if (this.props.type === "sat") {
			this.playAudio();
		}
	};

	acceptCall = () => {
		if (this.props.type === "voip") {
			this.stopAudio();
			this.setState({
				callDuration: 0,
				videoSessionId: this.props.meetingId,
				diallerState: "call-received",
			});
		} else {
			let conn = this.state.connection;
			conn.accept();
		}
	};

	disconnectCall = () => {
		console.log("disconnect", this.device);
		this.device.disconnectAll();
	};

	makePhoneCall = async (from, to, toUserId, localCall) => {

		let walletBalance = await fetchWalletBalance();
		if (walletBalance < MIN_WALLET_BAL) {
			notifyBalanceError();
			return null;
		}

		if (localCall) {
			return this.device.connect({
				CallerId: from,
				To: toUserId ? to + ":" + toUserId + ":" + localCall : to,
			});
		} else {
			return this.device.connect({
				CallerId: from,
				To: toUserId ? to + ":" + toUserId : to,
			});
		}
	};

	makeVOIPCall = (from, to) => {
		let callee = `client:${to}`;
		return this.device.connect({
			CallerId: from,
			To: callee,
		});
	};

	makeSatCall = async (from, to, toUserId, localCall) => {
		// console.log("satellite call ", from, to, toUserId, localCall);

		let walletBalance = await fetchWalletBalance();
		if (walletBalance < MIN_WALLET_BAL) {
			notifyBalanceError();
			return;
		}

		const [call_type, pstnMessage] = checkSatelliteCall(to);
		if (call_type === PSTN_CALL.NOT_SUPPORTED) {
			Notify({
				type: "error",
				message: pstnMessage,
			});
			return null;
		}
		if (localCall) {
			if (call_type === PSTN_CALL.SAT_CALL) {
				return this.device.connect({
					CallerId: from,
					To: toUserId
						? `SAT:${to.substring(1, to.length)}:${toUserId}:${localCall}`
						: `SAT:${to.substring(1, to.length)}`,
					// To: `SAT:${to}`,
					FromWeb: true,
				});
			} else {
				return null;
			}
		} else {
			if (call_type === PSTN_CALL.SAT_CALL) {
				return this.device.connect({
					CallerId: from,
					To: toUserId
						? `SAT:${to.substring(1, to.length)}:${toUserId}`
						: `SAT:${to.substring(1, to.length)}`,
					// To: `SAT:${to}`,
					FromWeb: true,
				});
			} else {
				return null;
			}
		}
	};

	sendDigits = (digit) => {
		this.state.connection.sendDigits("" + digit);
	};

	toggleMute = () => {
		// console.log("mute :: :: ", this.state.connection);

		if (this.state.muted) {
			this.state.connection.mute(false);
			this.setState({ muted: false });
		} else {
			let connection = this.state.connection;
			connection.mute(true);
			this.setState({ muted: true });
		}
	};

	onClose = () => {
		this.setState({
			videoSessionId: null,
			diallerState: null,
			diallerDir: null,
			connection: null,
			callerId: null,
		});
		if (this.state.intervalId) {
			clearInterval(this.state.intervalId);
		}
		this.props.resetCallInfo();
	};

	getCallerInfo() {
		let { diallerDir } = this.state;

		if (diallerDir === "incoming") {
			return findCallerName(this.props.contacts || [], this.state.callerId);
		} else {
			return this.props.toName;
		}
	}

	playAudio = () => {
		let audio = new Audio(
			"https://s3.amazonaws.com/frontm-contentdelivery-mobilehub-1030065648/media/Hold+Music.mp3"
		);
		audio.loop = true;
		audio.play().catch(function (error) {
			console.log(error.message);
		});
		this.audioControl = audio;
		setTimeout(this.stopAudio, 43000);
	};

	stopAudio = () => {
		if (this.audioControl) this.audioControl.pause();
	};

	errorHandleVideoMsg = (action, errorMsg, videoSessionId) => {
		let msg = {
			action: action,
			errorMessage: errorMsg,
			videoSessionId: videoSessionId,
		};
		let responseChat = {};
		responseChat.messageType =
			MessageTypeConstants.MESSAGE_TYPE_VIDEO_CALL_RESPONSE;
		responseChat.message = { ...msg };
	};

	sendUserAvailability = () => {
		UserServiceClient.sendUserAvailableForCall();
	};

	rejectCallFunc = (
		type = "receiver",
		callerMeetingId,
		timeElapsed,
		videoEnabled
	) => {
		this.stopAudio();
		if (this.props.type === "phone" || this.props.type === "sat") {
			if (this.state.connection) {
				this.state.connection.reject();
			}
		} else {
			this.setState({ rejectCall: true, timeElapsed });
			if (this.props.meetingId || callerMeetingId) {
				let callingObj = {
					callerUserId: this.props.userId,
					video: videoEnabled === true ? true : false,
					callAction: "CallEnd",
				};

				switch (type) {
					case "initiator":
						callingObj["userId"] = this.state.toUserId;
						callingObj["videoSessionId"] = callerMeetingId;
						break;

					default:
						callingObj["userId"] = this.props.fromUserId;
						callingObj["videoSessionId"] = this.props.meetingId;
						break;
				}

				this.sendVoipCallApi(callingObj, callingObj.callAction);
				if (type === "initiator") {
					if (this.state.summaryGenerated === false) {
						this.sendVoipCallApi(
							{
								userId: this.state.toUserId,
								callerUserId: this.props.userId,
								video: videoEnabled === true ? true : false,
								videoSessionId: callerMeetingId,
								callAction: "CallSummary",
								callDuration:
									videoEnabled === true
										? this.state.timeElapsed
										: this.state.callDuration,
								callStartTime: this.state.callStartedTime,
								callType: "VOIP",
								isLocalContact: false,
							},
							"CallEnd"
						);
						this.setState({ summaryGenerated: true, timeElapsed });
					}
				}
			}
			this.sendUserAvailability();
		}

		this.props.clearLoggedInUserCallHistory();
		let currentCallTimeStamp = Date.now();
		this.props.getLoggedInUserCallHistory(currentCallTimeStamp);
		this.onClose();
	};

	sendVideoBotMessage = (
		action,
		videoSessionId,
		callingType,
		timeElapsed,
		videoEnabled
	) => {
		this.props.hideSpinner();
		switch (action) {
			case "callEnd":
				this.rejectCallFunc(
					callingType,
					videoSessionId,
					timeElapsed,
					videoEnabled
				);
				break;

			case "callActive": {
				this.stopAudio();
				let currentStartTime = Date.now();
				this.connectionHandler();
				this.setState({ callStartedTime: currentStartTime });
				break;
			}
		}
	};

	sendAudioId = (meetingId, options) => {
		if (meetingId) {
			let callingObj = {
				userId: this.state.toUserId,
				callerUserId: this.props.userId,
				videoSessionId: meetingId,
				video: options ? options.video : false,
				callAction: "CallStart",
			};
			this.setState({ videoSessionId: meetingId });
			this.sendVoipCallApi(callingObj, callingObj.callAction);
			setTimeout(() => {
				// stop the camera of the caller
				if (window.localStream) {
					window.localStream.getTracks().forEach((track) => track.stop());
				}
				if (
					this.state.callStartedTime === 0 &&
					this.state.summaryGenerated === false
				) {
					this.sendVideoBotMessage(
						"callEnd",
						meetingId,
						"initiator",
						this.props.videoEnabled
					);
				}
			}, 30000);
		}
	};

	sendVoipCallApi = (dataInfo, type = "CallEnd") => {
		for (let key in dataInfo) {
			if (dataInfo[key] === null || typeof dataInfo[key] === "undefined") {
				return;
			}
		}
		// if (_.isEmpty(dataInfo)) {
		// 	return;
		// }
		console.log("send call api Sid :::: ====", dataInfo, type);
		UserServiceClient.sendVoipCall(dataInfo)
			.then((data) => {
				if (data && data.success) {
					if (type === "CallStart") {
						this.playAudio();
						this.setState({ callDuration: 0, summaryGenerated: false });
					}
				} else {
					this.callDisconnectHandler();
					throw new Error();
				}
			})
			.catch((err) => {
				console.log("error in calling , may be busy ===>", err);
				this.setState({ diallerState: "busy" });
			});
		this.props.hideSpinner();
	};

	render() {
		let { diallerState, diallerDir } = this.state;
		let { videoEnabled } = this.props;

		if (!diallerState || diallerState === "ready") {
			return null;
		}

		let node = null;

		if (this.props.type && this.props.type === "voip") {
			if (diallerState === "on-call" || diallerState === "call-received") {
				if (videoEnabled === true) {
					node = (
						<MeetingRoom
							sessionInfo={{ userId: this.props.userId }}
							audioElement={this.audioControl}
							callingTo={{
								toUserid: this.props.to,
								toUserName: this.props.toName,
							}}
							callRejected={this.state.rejectCall}
							meetingId={this.state.videoSessionId}
							from={this.props.from || null}
							disableVideo={false}
							onMeetingIdCreated={this.sendAudioId}
							incomingVideo={diallerState === "call-received" ? true : false}
							options={{ video: true }}
							onError={(id, errorMessage) => {
								console.error("HANDLE Error SID!!", errorMessage);
								this.errorHandleVideoMsg("error", errorMessage, id);
							}}
							onMeetingEnded={(id, callingType, timeElapsed) => {
								console.log("Sending Meeting Ended to Bot", id, callingType);
								callingType &&
									this.sendVideoBotMessage(
										"callEnd",
										id,
										callingType,
										timeElapsed,
										true
									);
							}}
							onMeetingStarted={(id) => {
								console.log("Meeting Has Started", id);
								this.sendVideoBotMessage("callActive", id);
							}}
						/>
					);
				} else {
					node = (
						<AudioCall
							sessionInfo={{
								userId: this.props.userId,
							}}
							callingTo={{
								toUserid: this.props.to,
								toUserName: this.props.toName,
							}}
							callRejected={this.state.rejectCall}
							callDuration={this.state.callDuration}
							meetingId={this.state.videoSessionId}
							from={this.props.from || null}
							disableVideo={true}
							onMeetingIdCreated={this.sendAudioId}
							onError={(id, errorMessage) => {
								console.error("HANDLE Error SID!!", errorMessage);
								this.errorHandleVideoMsg("error", errorMessage, id);
							}}
							onMeetingEnded={(id, callingType) => {
								console.log("Sending Meeting Ended to Bot", id, callingType);
								this.sendVideoBotMessage("callEnd", id, callingType);
								this.stopAudio();
							}}
							onMeetingStarted={(id) => {
								console.log("Meeting Has Started", id);
								this.sendVideoBotMessage("callActive", id);
							}}
						/>
					);
				}
			}

			if (diallerState === "incoming") {
				node = (
					<IncomingCallScreen
						rejectCall={this.rejectCallFunc}
						from={this.props.from}
						acceptCall={this.acceptCall}
						onClose={this.rejectCallFunc}
						videoEnabled={this.props.videoEnabled}
					/>
				);
			}

			if (diallerState === "busy") {
				node = (
					<div
						className="p-3 d-flex flex-column justify-content-center align-items-center"
						style={{
							height: "auto",
							borderRadius: "0.3rem",
							overflow: "hidden",
							textAlign: "center",
						}}
					>
						<h4>User not available</h4>
						<p>
							The user you are trying to call seems to be offline or busy.
							Please try again later.
						</p>
						<Button
							role="button"
							text="OK"
							className="btn btn-install ml-3"
							action={this.onClose}
						/>
					</div>
				);
			}
			// if (diallerState === "call-hung") {
			//   node = (
			//     <CallSummary
			//       phoneNumber={this.getCallerInfo()}
			//       callDuration={this.state.callDuration}
			//       onClose={this.onClose}
			//     />
			//   );
			//   // node = null;
			// }
		}
		if (diallerState === "call-received") {
			if (diallerDir === "incoming" && this.props.type !== "voip") {
				node = (
					<IncomingCallScreen
						rejectCall={this.rejectCallFunc}
						from={findCallerName(
							this.props.contacts || [],
							this.state.callerId
						)}
						acceptCall={this.acceptCall}
						onClose={this.rejectCallFunc}
						videoEnabled={this.props.videoEnabled}
					/>
				);
			}
		}

		if (diallerState === "on-call") {
			if (this.props.type !== "voip") {
				node = (
					<DiallingScreen
						disconnectCall={this.disconnectCall}
						phoneNumber={this.getCallerInfo()}
						onCall={diallerState === "on-call"}
						callDuration={this.state.callDuration}
						onClose={this.disconnectCall}
						sendNumber={this.sendDigits}
						toggleMute={this.toggleMute}
						muted={this.state.muted}
						diallerDir={diallerDir}
						isSatellite={this.state.isSatellite}
					/>
				);
			}
		}
		if (diallerState === "call-hung") {
			node = (
				<CallSummary
					phoneNumber={this.getCallerInfo()}
					callDuration={this.state.timeElapsed || this.state.callDuration}
					onClose={this.onClose}
				/>
			);
		}


		return (
			<>
				<ModalPopup
					onClose={this.closeCreateConversation}
					size="sm"
					noHeader
					className="dialler-modal"
					keyboard={false}
					backdrop="static"
				>
					{node}
				</ModalPopup>
				<audio id="self" autoPlay={true} className="local-audio-source" />
			</>
		);
	}
}

const actions = {
	resetCallInfo,
	clearLoggedInUserCallHistory,
	getLoggedInUserCallHistory,
	hideSpinner: hideSpinner,
};

const mapDataToProps = (state) => {
	return {
		userId: state.user.user.userId,
		emailAddress: state.user.user.emailAddress,
		low_bw_calls: state.user.low_bw_calls,
		contacts: state.contacts.accepted,
		type: state.phone.type,
		from: state.phone.from,
		to: state.phone.to,
		toName: state.phone.toName,
		toUserId: state.phone.toUserId,
		localCall: state.phone.localCall,
		diallerState: state.phone.diallerState,
		meetingId: state.phone.meetingId,
		fromUserId: state.phone.fromUserId,
		videoEnabled: state.phone.videoEnabled,
	};
};

export default connect(mapDataToProps, actions)(PhoneDevice);
