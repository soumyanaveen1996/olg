import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { MessageTypeConstants } from "../../../../Services/Message";
import { sendAMessage } from "../../../../State/actions/chats";
import AudioElement from "../../../../Utils/AudioElement";
import { removeNonConversationalMessages } from "../../../Containers/NonConversational/Store/NonConversationalAction";
import {
	removeNotification,
	startRingCallCenter,
} from "../../../Store/Notification/NotificationAction";
import FMVideoComponent from "./FMVideoCallComponent";

const R = require("ramda");

const FMVideoCall = (props) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const videoCall = useSelector((state) =>
		state.v2.Notification[props.conversation].filter(
			(elem) => elem.messageId === props.messageId
		)
	);
	let { options, conversation } = props;

	const videoCallToggle = useSelector((state) => state.v2.CallNotification);
	const waitingText =
		videoCall && videoCall[0]?.message?.action === "text"
			? videoCall[0].message.text
			: `<p className="wait-text-main">Thanks for your patience. We are connecting you to the next available staff</p>`;
	let disableVideo = R.not(R.pathOr(false, ["message", "video"], props));

	useEffect(() => {

		if (options && options.url) {
			window.open(options.url, "_blank");
			if (!options?.content && !options?.image) {
				dispatch(
					removeNonConversationalMessages(conversation, { options }, history)
				);
			}
		}
	}, []);

	useEffect(() => {
		if (videoCall && videoCall[0]?.message?.action === "ringStart") {
			toggleLoop(true);
			playAudio();
		} else {
			toggleLoop(false);
			stopAudio();
		}
	}, [videoCall[0].message.action]);

	useEffect(() => {
		if (videoCall && videoCall[0]?.message?.action === "joinMeeting") {
			if (options.wnd === null || options.wnd === undefined) {
				options.wnd = window.open('/jitsi', "_blank");
				options.wnd['jitsiVideoCall'] = videoCall[0];
			} else {
				options.wnd.focus();
			}
		}
	});

	const sendVideoId = (id, options) => {
		let msg = {
			controlId: options.controlId,
			tabId: options.tabId,
			action: "peerRequest",
			videoSessionId: id,
		};

		let responseChat = {};
		responseChat.messageType =
			MessageTypeConstants.MESSAGE_TYPE_VIDEO_CALL_RESPONSE;
		responseChat.message = { ...msg };

		dispatch(sendAMessage(responseChat, true));
	};

	const errorHandleVideoMsg = (controlId, action, errorMsg, videoSessionId) => {
		let msg = {
			controlId: controlId,
			action: action,
			errorMessage: errorMsg,
			videoSessionId: videoSessionId,
		};
		let responseChat = {};
		responseChat.messageType =
			MessageTypeConstants.MESSAGE_TYPE_VIDEO_CALL_RESPONSE;
		responseChat.message = { ...msg };

		dispatch(sendAMessage(responseChat, true));
	};

	const sendVideoBotMessage = (controlId, action, videoSessionId) => {
		let msg = {
			controlId: controlId,
			action: action,
			videoSessionId: videoSessionId,
		};
		let responseChat = {};
		responseChat.messageType =
			MessageTypeConstants.MESSAGE_TYPE_VIDEO_CALL_RESPONSE;
		responseChat.message = { ...msg };

		if (action === "callEnd") {
			console.log("end the call");
			dispatch(startRingCallCenter(false, null));
			dispatch(removeNotification(props.conversation, props.messageId));
		}

		if (action === "callActive") {
			playAudio();
		}

		dispatch(sendAMessage(responseChat, true));
	};

	const closeWindow = (messageType, options, from = null) => {
		if (!from) {
			let responseChat = {};
			responseChat.messageType = messageType;
			responseChat.message = {
				controlId: options.controlId,
				tabId: options.tabId,
				action: "close",
			};
			dispatch(sendAMessage(responseChat, true));
		}
	};

	const toggleLoop = (value) => {
		AudioElement.toggleLoop(value);
	};

	const playAudio = () => {
		AudioElement.playRing();
	};

	const stopAudio = () => {
		AudioElement.pauseRing();
	};

	if (videoCall && videoCall[0]?.message?.action === "ringStart") {
		if (videoCallToggle.toggle && videoCallToggle.videoCallData) {
			return (
				<Dialog
					open={true}
					fullWidth
					maxWidth="lg"
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogContent>
						<FMVideoComponent
							{...props}
							errorHandleVideoMsg={errorHandleVideoMsg}
							onMeetingEnded={(controlId, callStatus, id) => {
								sendVideoBotMessage(controlId, callStatus, id);
								closeWindow(
									MessageTypeConstants.MESSAGE_TYPE_TABLE_RESPONSE,
									props.message,
									"videoChat"
								);
							}}
							onMeetingStarted={(controlId, callStatus, id) => {
								sendVideoBotMessage(controlId, callStatus, id);
							}}
							sendVideoId={sendVideoId}
							videoSessionId={videoCallToggle?.videoCallData?.videoSessionId}
							waitingText={waitingText}
							disableVideo={disableVideo}
						/>
					</DialogContent>
				</Dialog>
			);
		} else {
			return null;
		}
	} else if (videoCall && videoCall[0]?.message?.action === "startVideo") {
		return (
			<Dialog
				open={true}
				fullWidth
				maxWidth="lg"
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogContent>
					<FMVideoComponent
						{...props}
						errorHandleVideoMsg={errorHandleVideoMsg}
						onMeetingEnded={(controlId, callStatus, id) => {
							sendVideoBotMessage(controlId, callStatus, id);
							closeWindow(
								MessageTypeConstants.MESSAGE_TYPE_TABLE_RESPONSE,
								props.message,
								"videoChat"
							);
						}}
						onMeetingStarted={(controlId, callStatus, id) => {
							sendVideoBotMessage(controlId, callStatus, id);
						}}
						sendVideoId={sendVideoId}
						videoSessionId={null}
						waitingText={waitingText}
						disableVideo={disableVideo}
					/>
				</DialogContent>
			</Dialog>
		);
	} else {
		return null;
	}
};

export default FMVideoCall;
