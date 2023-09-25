import React, { Component, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Peer from "peerjs";
import UserServiceClient from "../../../Services/Clients/UserServiceClient";
import { NotifyClassComp } from "../../ModalMessages/ToastNotif";
import "../../../styles/css/style.css";
import Config from "../../../Utils/Config";
import { connect } from "react-redux";
import { checkDeviceSupport } from "../Utils";
import { getNameAcronym } from "../../../Utils/Helpers";
import { FrontmLogger } from "../../../Utils/FrontmLogger";
import VideoControls from "./VideoControls.js";
import AudioElement from "../../../Utils/AudioElement";

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
		const { hasWebcam } = await checkDeviceSupport();
		// added to improve audio clarity
		const audioOptions = {
			volume: 0.5,
			sampleSize: 16,
			sampleRate: 44100,
			autoGainControl: false,
			echoCancellation: true,
			googAutoGainControl: false,
			noiseSuppression: true,
		};
		if (hasWebcam) {
			stream = await navigator.mediaDevices.getUserMedia({
				audio: audioOptions,
				video: true,
			});
			return { stream, audio: true, video: true };
		}

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

class MeetingRoom extends Component {
	constructor() {
		super();
		this.remoteSource = React.createRef();
		this.localSource = React.createRef();
		this.state = {
			videoMute: false,
			audioMute: false,
			peer: null,
			meetingStarted: false,
			meetingEnded: false,
			call: null,
			meetingId: null,
			dataConnection: null,
			initiator: false,
			waitingText: "",
			callConnectTimeout: null,
			remoteVideoMute: false,
			callerName: "",
			videoAvailable: true,
			logParams: {},
			logger: null,
			meetingTime: 0,
			responder: false,
		};
	}

	componentDidMount() {
		console.log("NODE ENV::", process.env.WEBRTC_ENV);
		this.setState({ videoMute: this.props.disableVideo });

		const {
			sessionInfo: { userId, bot, conversationId },
		} = this.props;
		const user = this.props.currentUser.user;
		const emailAddress = user.emailAddress;
		const userName = user.userName;
		const domain = user.domains[0].domain;

		let params = {
			userId,
			bot,
			conversationId,
			emailAddress,
			userName,
			domain,
		};
		this.setState({ logParams: params });
		if (!this.props.meetingId) {
			this.createPeerConnection().then((id) => {
				console.log("Meeting Created", id);
				let logger = new FrontmLogger(
					domain,
					userId,
					emailAddress,
					bot,
					conversationId,
					"FAPP",
					"edge",
					"web",
					{
						videoSessionId: id,
					}
				);

				logger.logInfo("Meeting has been requested.");

				this.setState({ logger });

				if (id && this.props.options) {
					console.log("GENERATED MEETING ID", id);
					this.props.onMeetingIdCreated(id, this.props.options);
					this.setState({
						meetingId: id,
						initiator: true,
						callStatus: "initiator",
						waitingText: this.props.waitingText,
						meetingTime: 0,
					});
				}
			});
		} else {
			console.log("JOINING MEETING ID", this.props.meetingId);
			let logger = new FrontmLogger(
				domain,
				userId,
				emailAddress,
				bot,
				conversationId,
				"FAPP",
				"edge",
				"web",
				{
					videoSessionId: this.props.meetingId,
				}
			);
			this.setState({
				meetingId: this.props.meetingId,
				responder: true,
				callStatus: "responder",
				meetingTime: 0,
				logger,
			});
			this.joinMeeting(this.props.meetingId);
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

	componentDidUpdate(prevProps) {
		if (this.props.videoChatText !== prevProps.videoChatText) {
			this.setState({ waitingText: this.props.videoChatText });
		}

		if (
			this.state.meetingStarted === true &&
			this.state.meetingTime === 0 &&
			this.state.callStatus !== "responder"
		) {
			window.intervalId = setInterval(() => {
				this.setState((prevState) => ({
					meetingTime: prevState.meetingTime + 1,
				}));
				if (this.state.dataConnection && this.state.meetingEnded === false) {
					this.state.dataConnection.send({
						meetTime: this.state.meetingTime,
					});
				}
			}, 1000);
		}

		// if (this.props.incomingVideo === true && this.state.meetingTime === 0) {
		// 	window.intervalId = setInterval(() => {
		// 		this.setState((prevState) => ({
		// 			meetingTime: prevState.meetingTime + 1,
		// 		}));
		// 		if (this.state.dataConnection && this.state.meetingEnded === false) {
		// 			this.state.dataConnection.send({
		// 				meetTime: this.state.meetingTime,
		// 			});
		// 		}
		// 	}, 1000);
		// }

		// on receiver side
		if (this.props.incomingVideo === true && this.state.meetingTime === 0) {
			window.intervalId3 = setInterval(() => {
				this.setState((prevState) => ({
					meetingTime: prevState.meetingTime + 1,
				}));
			}, 1000);
		}

		if (
			this.state.meetingStarted &&
			this.state.meetingTime === 0 &&
			this.state.responder
		) {
			this.state.responder = false;
			window.intervalId2 = setInterval(() => {
				this.setState((prevState) => ({
					meetingTime: prevState.meetingTime + 1,
				}));
			}, 1000);
		}

		if (
			this.props.callRejected !== prevProps.callRejected &&
			this.props.callRejected == true
		) {
			console.log(
				"%cCALL REJECTED END MEETING",
				"color:blue; font-size:20px;",
				this.state.meetingId
			);
			this.handlePeerDisconnect();
			this.endPeersCall();
		}
	}

	setSource = ({ source, stream, noref }) => {
		if (noref === true) {
			source.srcObject = stream;
			return;
		}
		if (source?.current && "srcObject" in source.current) {
			source.current.srcObject = stream;
		} else {
			if (source && source?.current) {
				source.current.src = URL.createObjectURL(stream);
			}
		}
	};

	joinMeeting = async (meetingId) => {
		console.log("GEtting ICE Servers");
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
			console.error("PEER ERROR", err);
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
			console.log("RESPONDER:: PEER DISCONNECTED");
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
			}, 120000);
			this.setState({ callConnectTimeout });
			getMediaStream()
				.then(async ({ stream: mystream, audio, video }) => {
					console.log("Got Media Stream");
					this.state.logger.logDebug(
						`Acquired Media Stream AUDIO:: ${audio} VIDEO:: ${video}`
					);
					this.setState({ meetingStarted: false, videoAvailable: video });
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
						// let dataConnection = peerResponder.connect(meetingId);
						// await sleep(1000);
						let call = peerResponder.call(meetingId, mystream);
						call.on("stream", this.handleStreamStarted);
						this.setState({ call });
						peerResponder.on("connection", async (dataConnection) => {
							clearInterval(window.intervalId2);
							dataConnection.on("data", this.handleData);
							this.setState({ dataConnection });
							await sleep(4000);
							if (this.props.disableVideo || !this.state.videoAvailable) {
								dataConnection.send("video-off");
							}
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
						// call.on("close", this.handleCallClosed);
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
		if (data.meetTime && this.state.callStatus === "responder") {
			this.setState({ meetingTime: data.meetTime });
		} else if (data === "end-call") {
			this.endPeersCall();
		} else if (data === "video-off") {
			this.setState({ remoteVideoMute: true });
		} else if (data === "video-on") {
			this.setState({ remoteVideoMute: false });
		}

		const name = R.pathOr("", ["name"], data);
		this.setState({ callerName: getNameAcronym(name) });
	};

	createPeerConnection = () => {
		return new Promise(async (resolve, reject) => {
			console.log("GEtting ICE Servers");
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
				console.error("An Error has occured in Meeting", err);
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
				console.log("Peer connection Opened", id);
				resolve(id);
			});
			peerInitiator.on("call", this.handleIncomingCall);
			// peerInitiator.on("connection", async dataConnection => {
			//   this.setState({ dataConnection });
			//
			//   dataConnection.on("data", this.handleData);
			//
			//   setTimeout(() => {
			//     console.log("%c Sending user name", "color:blue; font-size: 20px");
			//     dataConnection.send({
			//       name: R.pathOr(
			//         "Anonymous User",
			//         ["user", "userName"],
			//         this.props.currentUser
			//       )
			//     });
			//   }, 8000);
			// });
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
			if (!this.state.peer) return;
			this.state.peer.reconnect();
		} catch (error) {
			console.log("Fail Silently", error);
		}
	};
	handleIncomingCall = async (call) => {
		console.log("Received Incoming Call", call);
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
		let dataConnection = this.state.peer.connect(other_peer);
		this.setState({ dataConnection });

		dataConnection.on("error", (error) => {
			console.log(
				"%cError in Data Connection",
				"color:red;font-size:15px",
				error
			);
		});

		dataConnection.on("close", () => {
			console.log("%cdata connection closed", "color:red;font-size:15px");
			this.handlePeerDisconnect();
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
		//
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
						if (!video || this.props.disableVideo) {
							this.state.dataConnection.send("video-off");
						}
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
							this.setSource({ source: this.remoteSource, stream: stream });
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
		// if (this.state.peer) {
		//   this.state.peer.destroy();
		// }
		this.localSource.current.srcObject
			.getTracks()
			.forEach((track) => track.stop());
		this.setState({ peer: null, call: null, meetingEnded: true });
		setTimeout(() => {
			this.props.onMeetingEnded(this.state.meetingId);
		}, 1000);
	};

	handlePeerDisconnect = () => {
		// manually close the peer connections
		console.log("disconnect peer connect ", this.state.peer);
		if (!this.state.peer) return;
		if (this.state.peer.connections) {
			for (let conns in this.state.peer.connections) {
				this.state.peer.connections[conns].forEach((conn, index, array) => {
					console.log(
						`closing ${conn.connectionId} peerConnection (${index + 1}/${
							array.length
						})`,
						conn.peerConnection
					);
					if (conn && conn.peerConnection && conn.peerConnection.close) {
						conn.peerConnection.close();
					}

					// close it using peerjs methods
					if (conn.close) conn.close();
				});
			}
		}
	};

	endPeersCall = async () => {
		// stop the camera of the caller
		if (window.localStream) {
			window.localStream.getTracks().forEach((track) => track.stop());
		}

		if (window.localVideoStream) {
			window.localVideoStream.getTracks().forEach((track) => track.stop());
		}

		if (window.intervalId) {
			clearInterval(window.intervalId);
			window.intervalId = null;
		}
		if (window.intervalId2) {
			clearInterval(window.intervalId2);
			window.intervalId2 = null;
		}

		if (window.intervalId3) {
			clearInterval(window.intervalId3);
			window.intervalId3 = null;
		}

		if (this.localSource.current) {
			this.localSource.current.srcObject.getTracks().forEach((track) => {
				track.stop();
			});
		}
		if (this.state.peer) {
			this.state.peer.destroy();
			this.setState({ peer: null, meetingEnded: true });
		}
		setTimeout(() => {
			this.props.onMeetingEnded(
				this.state.meetingId,
				this.state.callStatus,
				this.state.meetingTime
			);
		}, 1000);
	};

	cleanupMeeting = () => {
		if (this.state.dataConnection) {
			this.state.dataConnection.send("end-call");
			console.log("Sending End Call and Waiting");
		}
		if (this.localSource.current) {
			this.localSource.current.srcObject.getTracks().forEach((track) => {
				track && track.stop();
			});
		}

		// stop the camera of the caller
		if (window.localStream) {
			window.localStream.getTracks().forEach((track) => track && track.stop());
		}
		this.setState({ meetingEnded: true });
		setTimeout(() => {
			// if (this.state.peer) {
			//   this.state.peer.destroy();
			// }
			// this.setState({ peer: null });
			this.props.onMeetingEnded(
				this.state.meetingId,
				this.state.callStatus,
				this.state.meetingTime
			);
		}, 2000);

		setTimeout(() => {
			const peer = this.state.peer;
			if (peer) {
				peer.destroy();
			}
		}, 10000);
	};
	endCall = async (e) => {
		this.props.audioElement.pause();
		if (e) {
			e.preventDefault();
		}
		this.cleanupMeeting();
	};

	toggleAudio = () => {
		const videoElem = document.getElementById("caller");
		let tracks =
			videoElem && videoElem.srcObject
				? videoElem.srcObject.getTracks()
				: this.localSource.current.srcObject.getTracks();
		if (this.state.audioMute) {
			this.setState({ audioMute: false });
			tracks.forEach((track) => {
				if (track.kind === "audio") {
					track.enabled = true;
				}
			});
		} else {
			this.setState({ audioMute: true });
			tracks.forEach((track) => {
				if (track.kind === "audio") {
					track.enabled = false;
				}
			});
		}
	};

	toggleVideo = () => {
		const videoElem = document.getElementById("caller");
		let tracks =
			videoElem && videoElem.srcObject
				? videoElem.srcObject.getTracks()
				: this.localSource.current.srcObject.getTracks();

		if (this.state.videoMute) {
			this.setState({ videoMute: false });
			if (this.state.dataConnection) {
				this.state.dataConnection.send("video-on");
			}
			console.log("Tracks", tracks);
			tracks.forEach((track) => {
				if (track.kind === "video") {
					track.enabled = true;
				}
			});
		} else {
			this.setState({ videoMute: true });
			if (this.state.dataConnection) {
				this.state.dataConnection.send("video-off");
			}
			tracks.forEach((track) => {
				if (track.kind === "video") {
					track.enabled = false;
				}
			});
		}
	};

	screenShare = () => {
		navigator.mediaDevices
			.getDisplayMedia({ video: { cursor: "always" } })
			.then((stream) => {
				console.log("Share screen stream", stream);
				console.log("current state ", this.state);

				if (this.state.meetingId && this.state.peer) {
					this.state.peer.call(this.state.meetingId, stream);
				}
				// window.localVideoStream = this.localSource.current.srcObject;
				// this.localSource.current.srcObject = stream;
			})
			.catch((err) => {
				console.log("unable to get stream", err);
			});
	};

	render() {
		const icon_display_class =
			"icon-container d-flex align-items-center justify-content-center";
		const icon_display_none = "d-none d-sm-none d-md-none d-lg-none d-xl-none";

		//Initialisation Screens
		if (
			this.state.meetingStarted === false &&
			this.props.incomingVideo === false
		) {
			const videoElem = document.getElementById("caller");
			if (videoElem && !videoElem.srcObject) {
				// if there is no stream for local video source get some
				getMediaStream()
					.then(({ stream }) => {
						window.localStream = stream;
						this.setSource({ source: videoElem, stream, noref: true });
					})
					.catch((err) => console.error("unable to find video", err));
			}
			return (
				<MeetingWaiting
					waitingText={this.state.waitingText}
					isInitiator={this.state.initiator}
					endCall={this.endCall}
					toggleVideo={this.toggleVideo}
					toggleAudio={this.toggleAudio}
					callingTo={this.props.callingTo}
					meetingId={this.props.meetingId}
					videoMute={this.state.videoMute}
					audioMute={this.state.audioMute}
					currentUser={this.props.currentUser}
				/>
			);
		}

		//Meeting Ended
		if (this.state.meetingEnded) {
			return (
				<MeetingWaiting
					waitingText="The meeting has ended"
					currentUser={this.props.currentUser}
					meetingEnded={this.state.meetingEnded}
				/>
			);
		} else if (
			this.state.meetingStarted === true ||
			this.props.incomingVideo === true
		) {
			// Meeting Started

			return (
				<div className="video-conf-div">
					<div
						className="video-conf-calling-div"
						style={{ position: "relative" }}
					>
						<span className="call-duration-span">
							{new Date(this.state.meetingTime * 1000)
								.toISOString()
								.substr(11, 8)}
						</span>
						<div
							style={{
								position: "relative",
								display: "grid",
								backgroundColor: "#44485a",
							}}
						>
							<video
								ref={this.remoteSource}
								autoPlay
								style={{
									width: "100%",
									height: "60vh",
									objectFit: "cover",
									border: "solid 1px #44485a",
								}}
							/>
							<span className="person-name" style={{ bottom: 10, left: 180 }}>
								{this.props.callingTo.toUserName || this.props.fromUser}
							</span>
							<div
								style={{ position: "absolute" }}
								className="caller-video-div"
							>
								<video
									id="self"
									autoPlay
									ref={this.localSource}
									style={{
										width: 150,
										height: 100,
										marginBottom: 10,
										marginLeft: 10,
										objectFit: "cover",
										borderRadius: 10,
									}}
									muted
								/>
							</div>
							<span className="person-name" style={{ bottom: 10, left: 13 }}>
								{this.props.currentUser.user.userName}
							</span>
						</div>
						<VideoControls
							toggleVideo={this.toggleVideo}
							toggleAudio={this.toggleAudio}
							endCall={this.endCall}
							videoMute={this.state.videoMute}
							audioMute={this.state.audioMute}
						/>
					</div>
				</div>
			);
		}
		return null;
	}
}

const MeetingWaiting = ({
	waitingText,
	isInitiator,
	endCall,
	toggleVideo,
	toggleAudio,
	callingTo,
	meetingId,
	videoMute,
	audioMute,
	currentUser,
	meetingEnded,
}) => {
	const [queueNumber, setQueueNumber] = useState("");
	const [queueText, setQueueText] = useState("connecting");

	useEffect(() => {
		setTimeout(() => {
			setQueueNumber(3);
			setQueueText("Connecting");
		}, 3000);

		setTimeout(() => {
			setQueueNumber(2);
		}, 7000);

		setTimeout(() => {
			setQueueNumber(1);
		}, 12000);
	}, []);

	return (
		<div className="video-conf-div">
			<div className="video-conf-calling-div">
				<div className="person-calling-div">
					{waitingText ? (
						<span
							className="calling-participant-name"
							style={{ fontSize: "0.9rem", padding: "1rem" }}
						>
							{waitingText}
						</span>
					) : (
						<>
							{/* <div className="person-calling-image-div">
								<img
									loading="lazy"
									alt="User Icon"
									src="/offlinelms/img/called-emptyavatar.png"
									width="90"
								/>
							</div>
							<span className="calling-participant-name">
								Calling {callingTo.toUserName}...
							</span> */}
							<div className="queue-container">
								<div className="spinner">
									<div className="bounce1"></div>
									<div className="bounce2"></div>
									<div className="bounce3"></div>
								</div>
								<span className="queue-text">
									<span className="queue-title block-span-center-text">
										{" "}
										{queueText}{" "}
									</span>
									{queueNumber === 1 && (
										<span className="block-span-center-text queue-number-one-text">
											You are next!
										</span>
									)}
									<p style={{ fontWeight: "300" }}>
										When your call is answered, your browser may <br />
										request access to your Camera and Microphone.
										<br /> Please accept the request to start the call
									</p>
								</span>
							</div>
						</>
					)}
				</div>
				{meetingEnded !== true && (
					<div className="caller-video-div" style={{ position: "relative" }}>
						<video
							id="caller"
							style={{
								width: 150,
								height: 100,
								marginBottom: 10,
								marginLeft: 10,
								objectFit: "cover",
								borderRadius: 10,
								border: "solid 1px #44485a",
							}}
							autoPlay
						></video>
						<span className="person-name" style={{ bottom: 10, left: 13 }}>
							{currentUser.user.userName}
						</span>
					</div>
				)}
			</div>
			{meetingEnded !== true && (
				<VideoControls
					endCall={endCall}
					toggleVideo={toggleVideo}
					toggleAudio={toggleAudio}
					videoMute={videoMute}
					audioMute={audioMute}
				/>
			)}
		</div>
	);
};

MeetingRoom.propTypes = {
	meetingId: PropTypes.string,
	waitingText: PropTypes.string,
	onMeetingIdCreated: PropTypes.func,
	onMeetingStarted: PropTypes.func,
	onMeetingEnded: PropTypes.func,
	onError: PropTypes.func,
};

const mapDataToProps = (state) => ({
	videoChatText: state.chats.videoChatText,
	currentUser: state.user,
	fromUser: state.phone.from,
});

export default connect(mapDataToProps)(MeetingRoom);
