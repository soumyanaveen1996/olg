import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Peer from "peerjs";
import { NotifyClassComp } from "../ModalMessages/ToastNotif";
import UserServiceClient from "../../Services/Clients/UserServiceClient";
import Config from "../../Utils/Config";
import { FrontmLogger } from "../../Utils/FrontmLogger";
import { getNameAcronym } from "../../Utils/Helpers";
import { findCallerName, getFormattedDuration } from "../Telephony/Utils";
import { SmallCircleButton } from "../Common/SmallCircleButton";

const R = require("ramda");

const sleep = (delay) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, delay);
	});
};

const getMediaStream = async () => {
	let stream = null;
	try {
		stream = await navigator.mediaDevices.getUserMedia({
			audio: true,
			video: false,
		});
		return { stream, audio: true, video: false };
	} catch (error) {
		stream = await navigator.mediaDevices.getUserMedia({
			audio: true,
			video: false,
		});
		return { stream, audio: true, video: false };
	}
};

const webrtc_server = Config.webertcSignalServer;

// const port = Config.envName == "development" ? 443 : 9000;
const path = "/webrtc/peerjs/myapp";
// Config.envName == "development" ? "/webrtc/peerjs/myapp" : "/peerjs/myapp";

class AudioCall extends Component {
	constructor() {
		super();
		this.remoteSource = React.createRef();
		this.localSource = React.createRef();
		this.state = {
			audioMute: false,
			peer: null,
			meetingStarted: false,
			meetingEnded: false,
			callStatus: null,
			call: null,
			meetingId: null,
			dataConnection: null,
			initiator: false,
			waitingText: "",
			callConnectTimeout: null,
			callerName: "",
			startTimer: false,
			logParams: {},
			logger: null,
			callDuration: 0,
			callFrom: "",
		};
	}
	componentDidMount() {
		console.log(" audio voip call", this.props);

		const {
			sessionInfo: { userId },
		} = this.props;
		const user = this.props.currentUser.user;
		const emailAddress = user.emailAddress;
		const userName = user.userName;
		const domain = user.domains[0].domain;

		let params = {
			userId,
			emailAddress,
			userName,
			domain,
		};
		this.setState({ logParams: params });
		if (!this.props.meetingId) {
			this.createPeerConnection().then((id) => {
				// console.log("creating meeting id", id, new Date());
				if (id) {
					this.props.onMeetingIdCreated(id);
					this.setState({
						meetingId: id,
						meetingStarted: true,
						initiator: true,
						callStatus: "initiator",
						callDuration: 0,
						startTimer: false,
					});
				}

				let logger = new FrontmLogger(
					domain,
					userId,
					emailAddress,
					"FAPP",
					"edge",
					"web",
					{
						videoSessionId: id,
					}
				);
				logger.logInfo("Meeting Audio has been requested.");
				this.setState({ logger });
			});
		} else {
			this.joinMeeting(this.props.meetingId);

			this.setState({
				meetingId: this.props.meetingId,
				callStatus: "responder",
				callFrom: this.props.from,
				initiator: false,
				responder: true,
				callDuration: 0,
				startTimer: false,
			});

			let logger = new FrontmLogger(
				domain,
				userId,
				emailAddress,
				"FAPP",
				"edge",
				"web",
				{
					videoSessionId: this.props.meetingId,
				}
			);

			this.setState({ logger });
		}
		window.addEventListener(
			"beforeunload",
			function (e) {
				this.props.onMeetingEnded(this.state.meetingId);
				var confirmationMessage =
					"Are you sure you want to close the meeting ?";
				(e || window.event).returnValue = confirmationMessage;
				return confirmationMessage;
			}.bind(this)
		);
	}

	componentDidUpdate(prevProps, prevState) {
		if (
			this.props.callRejected !== prevProps.callRejected &&
			this.props.callRejected === true
		) {
			// console.log("CALL REJECTED END MEETING Audio", this.state.meetingId);
			this.endPeersCall();
		}

		if (this.props.callDuration > prevProps.callDuration) {
			this.setState({
				callDuration: this.props.callDuration,
				startTimer: true,
			});
		}

		if (this.props.from !== prevState.callFrom) {
			this.setState({ callFrom: this.props.from });
		}
	}
	setSource = ({ source, stream }) => {
		if ("srcObject" in source.current) {
			source.current.srcObject = stream;
		} else {
			source.current.src = URL.createObjectURL(stream);
		}
	};

	joinMeeting = async (meetingId) => {
		const { iceServers } = await UserServiceClient.getTwilioIceServers();
		let peerResponder = new Peer({
			host: webrtc_server,
			// port,
			path,
			debug: 3,
			secure: true,
			config: {
				iceServers,
				iceTransportPolicy: "relay",
			},
		});
		peerResponder.on("error", (err) => {
			console.error("sid Logging:::: PEER ERROR", err);
			this.state.logger.logError(
				"An error has occured connecting to Peer",
				{},
				err.type
			);
			if (err.type === "peer-unavailable") {
				this.endPeersCall();
				return this.props.onError(
					this.state.meetingId,
					"The meeting was ended by the host"
				);
			}
			this.props.onError(this.state.meetingId, err.type);
		});
		peerResponder.on("disconnect", () => {
			console.log("Sid Logging:::: RESPONDER:: PEER DISCONNECTED");
			this.state.logger.logWarning("The Client has disconnected");
			this.handleDisconnect();
		});
		peerResponder.on("open", async (id) => {
			peerResponder.on("data", (data) => {
				console.log("Received DATA", data);
			});
			this.setState({ peer: peerResponder });
			const callConnectTimeout = setTimeout(() => {
				this.endPeersCall();
				return this.props.onError(
					this.state.meetingId,
					"We are unable to connect the call right now."
				);
			}, 30000);
			this.setState({ callConnectTimeout });
			getMediaStream()
				.then(async ({ stream: mystream, audio, video }) => {
					console.log("Got Media Stream");
					this.state.logger.logDebug(
						`Acquired Media Stream AUDIO:: ${audio} VIDEO:: ${video}`
					);
					this.setState({ meetingStarted: false });
					await sleep(2000);

					this.setState({ meetingStarted: true }, async () => {
						// this.localSource.current.srcObject = mystream;
						let tracks = mystream.getTracks();
						console.log("Tracks -Muting Video", tracks);

						if (this.props.disableVideo) {
							tracks.forEach((track) => {
								if (track.kind === "video") {
									track.enabled = false;
								}
							});
						}
						this.setSource({
							source: this.localSource,
							stream: mystream,
						});

						console.log("Making the call");
						console.log("receiving meeting id", meetingId, new Date());
						// let dataConnection = peerResponder.connect(meetingId);
						// await sleep(1000);
						let call = peerResponder.call(meetingId, mystream);
						call.on("stream", this.handleStreamStarted);
						this.setState({ call });
						peerResponder.on("connection", async (dataConnection) => {
							dataConnection.on("data", this.handleData);
							this.setState({ dataConnection });
							await sleep(4000);

							dataConnection.send("video-off");

							await sleep(1000);
							setInterval(() => {
								dataConnection.send(
									JSON.stringify({
										command: "Test Ping",
									})
								);
							}, 10000);
							dataConnection.send({
								name: R.pathOr(
									"Anonymous User",
									["user", "userName"],
									this.props.currentUser
								),
							});
						});
						call.on("close", this.handleCallClosed);
					});
				})
				.catch((error) => {
					console.log("RESPONDER:::Error getting Media Stream", error);
					NotifyClassComp({
						type: "error",
						message: "We are unable to access you camera and microphone",
						autoClose: 10000,
					});
					this.props.onError(
						this.state.meetingId,
						"Cannot get access to Camera and Speaker"
					);
				});
		});
	};

	handleData = (data) => {
		console.log("%c RECEIVED DATA", "color:blue; font-size: 20px", data);
		if (data === "end-call") {
			this.endPeersCall();
		}
		if (data === "video-off") {
			this.setState({ remoteVideoMute: true });
		}

		const name = R.pathOr("", ["name"], data);
		this.setState({ callerName: getNameAcronym(name) });
	};

	createPeerConnection = () => {
		return new Promise(async (resolve, reject) => {
			console.log("Sid:::: GEtting ICE Servers");
			const { iceServers } = await UserServiceClient.getTwilioIceServers();

			let peerInitiator = new Peer({
				host: webrtc_server,
				// port,
				path,
				debug: 3,
				secure: true,
				config: {
					// TODO
					iceServers,
					iceTransportPolicy: "relay",
				},
			});
			this.setState({ peer: peerInitiator });
			peerInitiator.on("error", (err) => {
				console.error("Sid:::: An Error has occured in Meeting", err);
				NotifyClassComp({
					type: "error",
					message: "We are unable to connect right now. Please try later",
					autoClose: 5000,
				});
				// setTimeout(() => {
				//   this.props.onMeetingEnded(this.state.meetingId);
				// }, 5000);
				this.props.onError(this.state.meetingId, `PEER ERROR: ${err.type}`);
			});
			peerInitiator.on("disconnected", this.handleDisconnect);
			peerInitiator.on("open", (id) => {
				console.log("Peer connection Opened Sid::::", id);
				resolve(id);
			});
			peerInitiator.on("call", this.handleIncomingCall);
		});
	};
	handleStreamStarted = (stream) => {
		console.log("STREAM STARTED");
		// this.remoteSource.current.srcObject = stream;
		if (this.state.callConnectTimeout) {
			clearTimeout(this.state.callConnectTimeout);
		}
		this.setSource({ source: this.remoteSource, stream: stream });
		this.props.onMeetingStarted(this.state.meetingId);
	};

	handleDisconnect = () => {
		try {
			if (!this.state.peer) {
				this.setState({ startTimer: false });
				return;
			} else {
				this.state.peer.reconnect();
			}
		} catch (error) {
			console.log("Fail Silently", error);
		}
	};

	handleIncomingCall = async (call) => {
		console.log("Sid:::: Received Incoming Call", call);
		this.state.logger.logInfo("Call request has been accepted");
		this.setState({ call });
		call.on("error", (error) => {
			console.error(error);
			this.props.onError(
				this.state.meetingId,
				`Error in Call: ${JSON.stringify(error)}`
			);
		});
		let other_peer = call.peer;
		let dataConnection = await this.state.peer.connect(other_peer);
		this.setState({ dataConnection });

		dataConnection.on("error", (error) => {
			console.log("Error in Data Connection", error);
			this.handleCallClosed();
		});

		dataConnection.on("close", () => {
			console.log("Sid data connection closed");
			this.handleCallClosed();
		});

		dataConnection.on("open", () => {
			dataConnection.on("data", this.handleData);
			setTimeout(() => {
				console.log("%c Sending user name", "color:blue; font-size: 20px");
				dataConnection.send({
					name: R.pathOr(
						"Anonymous User",
						["user", "userName"],
						this.props.currentUser
					),
				});
			}, 4000);
		});

		await sleep(2000);
		// call.on("close", this.handleCallClosed);

		getMediaStream()
			.then(({ stream: mystream, audio, video }) => {
				this.setState(
					{ meetingStarted: true, videoAvailable: video },
					async () => {
						// this.localSource.current.srcObject = mystream;
						this.state.logger.logDebug(
							`Iniator acquired Media Stream Audio::${audio} Video::${video}`
						);

						let tracks = mystream.getTracks();
						if (this.props.disableVideo) {
							tracks.forEach((track) => {
								if (track.kind === "video") {
									track.enabled = false;
								}
							});
						}
						// if (!video || this.props.disableVideo) {
						//   dataConnection.send("video-off");
						// }
						this.setSource({ source: this.localSource, stream: mystream });
						await sleep(1000);
						console.log("Got Media Stream");
						call.answer(mystream);
						call.on("stream", (stream) => {
							this.state.logger.logInfo(
								`Initiator has received remote stream.Meeting has started`
							);
							console.log("STREAM HAS STARTED");
							// this.remoteSource.current.srcObject = stream;
							this.props.onMeetingStarted(this.state.meetingId);
							this.setState({ startTimer: true });
							this.setSource({
								source: this.remoteSource,
								stream: stream,
							});
						});
					}
				);
			})
			.catch((error) => {
				this.state.logger.logError(
					`An error occured acquiring Media Stream for the Initiator`
				);
				console.log("Error Getting Media Stream", error);
				// TODO HANDLE ERRROR IN STREAM
				this.props.onError(
					this.state.meetingId,
					"Cannot get access to Camera or Microphone"
				);
			});
	};

	handleCallClosed = () => {
		console.log("Call Has been CLOSED");
		if (this.state.peer) {
			this.state.peer.disconnect();
			this.state.peer.destroy();
		}

		if (
			this.localSource &&
			this.localSource.current &&
			this.localSource.current.srcObject
		) {
			this.localSource.current.srcObject
				.getTracks()
				.forEach((track) => track.stop());
		}
		this.setState({
			peer: null,
			call: null,
			meetingEnded: true,
		});
		setTimeout(() => {
			this.props.onMeetingEnded(this.state.meetingId);
		}, 1000);
	};

	endPeersCall = async () => {
		console.log("Sid:::: other person disconnected the call END CALL");
		if (this.localSource.current) {
			if (this.localSource.current.srcObject) {
				this.localSource.current.srcObject.getTracks().forEach((track) => {
					if (track) {
						track.stop();
					}
				});
			}
		}
		if (this.state.peer) {
			this.state.peer.disconnect();
			this.state.peer.destroy();
			this.setState({
				peer: null,
				meetingEnded: true,
				callDuration: 0,
			});
		}
		setTimeout(() => {
			this.props.onMeetingEnded(this.state.meetingId, this.state.callStatus);
		}, 1000);
	};

	cleanupMeeting = () => {
		console.log("END CALL", this.state);
		if (this.state.dataConnection) {
			this.state.dataConnection.send("end-call");
		}

		if (this.state.peer) {
			this.state.peer.disconnect();
			this.state.peer.destroy();
		}
		this.setState({
			meetingEnded: true,
			peer: null,
			callDuration: 0,
		});
		setTimeout(() => {
			this.props.onMeetingEnded(this.state.meetingId, this.state.callStatus);
		}, 2000);
	};
	endCall = async (e) => {
		e.preventDefault();

		this.cleanupMeeting();
	};
	toggleAudio = () => {
		let tracks;
		if (this.state.audioMute) {
			this.setState({ audioMute: false });
			tracks = this.localSource.current.srcObject.getTracks();
			tracks.forEach((track) => {
				if (track.kind === "audio") {
					track.enabled = true;
				}
			});
		} else {
			this.setState({ audioMute: true });
			tracks = this.localSource.current.srcObject.getTracks();
			tracks.forEach((track) => {
				if (track.kind === "audio") {
					track.enabled = false;
				}
			});
		}
	};

	getCallerInfo() {
		let { diallerDir } = this.state;

		if (diallerDir === "incoming") {
			return findCallerName(this.props.contacts || [], this.state.callerId);
		} else {
			return this.props.toName;
		}
	}

	acceptCall = () => {
		console.log("accepting incoming call");
	};

	render() {
		return (
			<div
				className="main-audio-container"
				style={{
					backgroundImage: "linear-gradient(#51555a,#272e35)",
					minHeight: "450px",
					height: "auto",
					borderRadius: "0.3rem",
					overflow: "hidden",
				}}
			>
				<div className="mt-5 pt-2 d-flex justify-content-center align-items-center flex-column">
					<div
						style={{
							marginTop: "20px",
							color: "#ffffff",
							fontSize: "24px",
							fontWeight: "bold",
						}}
					>
						{this.props.callingTo.toUserName || this.state.callFrom}
					</div>

					{this.state.callStatus === "initiator" &&
						!this.state.startTimer &&
						!this.state.callDuration && (
							<div
								style={{
									color: "#2FC76F",
									fontSize: "18px",
									fontWeight: "bold",
								}}
							>
								Calling ...
							</div>
						)}

					{this.state.callDuration > 0 && this.state.startTimer && (
						<div
							style={{
								color: "#ffffff",
								fontSize: "16px",
							}}
						>
							{getFormattedDuration(this.state.callDuration)}
						</div>
					)}

					<div style={{ marginBottom: "2rem", marginTop: "2rem" }}>
						<img
							loading="lazy"
							height="auto"
							src="/offlinelms/img/calling-emptyavatar.png"
						/>
					</div>
					<div className="mt-2 pt-2 d-flex justify-content-center flex-row">
						<SmallCircleButton
							backgroundColor="#2A2D3C"
							color="#fff"
							toggleDisable={
								this.state.callDuration > 0 && this.state.startTimer
									? false
									: true
							}
							iconClass={this.state.audioMute ? "icon-mic-mute" : "icon-mic"}
							onClick={this.toggleAudio}
							className="mx-2"
							border="0.92px solid #FFFFFF"
							size={60}
						/>
						{/* <SmallCircleButton
              backgroundColor="#2A2D3C"
              color="#fff"
              iconFile={
                this.state.showNumPad ? null : "/offlinelms/img/tab-dialpad-icon@2x.png"
              }
              iconClass={this.state.showNumPad ? "icon-cross" : null}
              onClick={
                this.state.showNumPad ? this.hideNumPad : this.showNumPad
              }
              className="mx-2"
              border="0.92px solid #FFFFFF"
              size={60}
            /> */}
					</div>
					<div className="d-flex justify-content-center align-items-center mt-4 mb-4">
						<a
							href="#"
							className="disconect-button d-flex align-items-center justify-content-center m-1"
							onClick={this.endCall}
						>
							<img
								loading="lazy"
								alt="End Audio Call"
								src="/offlinelms/img/call-endcall-btn@2x.png"
								width="60"
							/>
						</a>
					</div>
				</div>

				<audio
					ref={this.remoteSource}
					autoPlay={true}
					className="remote-audio-source"
				/>
				<div className="local-audio-container">
					<audio
						id="self"
						muted
						autoPlay={true}
						ref={this.localSource}
						className="local-audio-source"
					/>
				</div>
			</div>
		);
	}
}

AudioCall.propTypes = {
	meetingId: PropTypes.string,
	waitingText: PropTypes.string,
	onMeetingIdCreated: PropTypes.func,
	onMeetingStarted: PropTypes.func,
	onMeetingEnded: PropTypes.func,
	onError: PropTypes.func,
};

const mapDataToProps = (state) => ({
	currentUser: state.user,
});

export default connect(mapDataToProps)(AudioCall);
