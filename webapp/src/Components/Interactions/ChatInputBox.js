import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ChatInputMenu from "./content/ChatInputMenu";
import UploadingFilesContainer from "./UploadingFilesContainer";
import { MessageTypeConstants } from "../../Services/Message";
import MicIcon from "@mui/icons-material/Mic";
import SendIcon from "@mui/icons-material/Send";
import AudioRecorder from "../../Utils/AudioRecorder";
import RecorderBox from "./RecorderBox";
// import "emoji-mart/css/emoji-mart.css";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { getFileName } from "../../Services/FilesService";
import FileServiceClient from "../../Services/Clients/FileServiceClient";
import ClickOutside from "../../v2/Utils/ClickOutside";

let queue = [];
let queueCheckerId;

class ChatInputBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: "",
			charLeft: 256,
			recordAudio: true,
			recordingInProgress: true,
			emojiVisible: false,
		};
		this.inputBox = React.createRef();
		this.voiceMessage = new AudioRecorder();
		this.startTime = 0;
		this.endTime = 0;
	}

	componentDidMount() {
		queueCheckerId = setInterval(() => {
			this.flushQueue();
		}, 20);
	}

	componentWillUnmount() {
		if (queueCheckerId) {
			clearInterval(queueCheckerId);
		}
	}

	debounce = async (delay) => {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve();
			}, delay);
		});
	};

	flushQueue = async () => {
		while (queue.length > 0) {
			let messageToSend = queue.shift();
			if (this.props.chatMessageFrom) {
				this.props.sendMessage(
					{
						message: messageToSend,
						messageType: MessageTypeConstants.MESSAGE_TYPE_STRING,
					},
					null,
					this.props.conversation
				);
			} else {
				this.props.sendMessage({
					message: messageToSend,
					messageType: MessageTypeConstants.MESSAGE_TYPE_STRING,
				});
			}
			await this.debounce(1500);
		}
	};

	hideEmoji = (e) => {
		this.setState({ emojiVisible: false });
	};

	toggleEmoji = () => {
		this.setState({ emojiVisible: !this.state.emojiVisible });
	};

	onChangeMessage = (e) => {
		this.setState({ message: e.target.innerHTML });

		let counter = this.countCharacters(e.target.innerText);

		this.setState({ charLeft: counter });

		if (e.key == "Enter") {
			e.preventDefault();
			this.hideEmoji();

			let message = this.state.message;

			if (!message || !message.length) {
				return;
			}

			queue.push(message);

			this.setState({ message: "", charLeft: 256 });

			this.inputBox.current.innerHTML = "";
		}
	};

	shareContacts = (data) => {
		this.setState({ charLeft: 256 });
		this.props.sendMessage({
			message: [...data],
			messageType: MessageTypeConstants.MESSAGE_TYPE_CONTACT_CARD,
		});
	};

	sendMessage = async (e) => {
		let message = this.state.message;
		if (!message || !message.length) {
			return;
		}
		queue.push(message);
		this.setState({ message: "", charLeft: 256 });
		this.inputBox.current.innerHTML = "";
		this.hideEmoji();
	};

	countCharacters = (data) => {
		let n = 256 - data.length;
		if (n > 0) {
			return n;
		} else {
			return 0;
		}
	};

	renderPlusIcon = () => {
		if (!this.props.isAnonymousUser && !this.props.chatMessageFrom) {
			return (
				<ChatInputMenu
					allProfileImages={this.props.allProfileImages}
					contacts={this.props.contacts}
					sendMessage={this.shareContacts}
					toggleEmoji={this.toggleEmoji}
				/>
			);
		}
	};

	recordVoiceMessage = (e) => {
		e.preventDefault();

		this.startTime = new Date();

		this.setState({
			recordAudio: true,
			recordingInProgress: false,
		});
		this.voiceMessage.startRecording().then(async (file) => {
			if (!this.state.recordingInProgress) {
				this.setState({ recordingInProgress: true });
				console.log("Recorded File", file, "Recorded File");
				const duration = (this.endTime - this.startTime) / 1000;
				this.sendAudio(file, duration);
			}
		});
	};

	cancelRecording = (e) => {
		this.setState({ recordingInProgress: true });
		e.preventDefault();
		this.voiceMessage.stopRecording();
	};

	stopRecorder = () => {
		this.endTime = new Date();
		this.voiceMessage.stopRecording();
	};

	sendAudio = (file, duration) => {
		const conversationId = this.props.conversation.conversationId;
		const sendMessage = this.props.sendMessage;

		const fileName = `${getFileName()}.wav`;

		FileServiceClient.uploadLargeFile({
			file: file,
			conversationId: conversationId,
			scopeId: conversationId,
			fileName: fileName,
		})
			.then((res) => {
				sendMessage({
					message: fileName,
					options: { fileName: fileName, duration: duration },
					messageType: MessageTypeConstants.MESSAGE_TYPE_AUDIO,
				});
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

	render() {
		const { emojiVisible } = this.state;
		const { isContentShown, background, isOnline } = this.props;
		let customStyle = {
			width: "100%",
		};
		if (isContentShown) {
			customStyle = { width: "100%" };
		}

		return (
			<div
				className="show d-flex justify-content-center align-items-center"
				style={background ? { width: "100%" } : customStyle}
			>
				{emojiVisible ? (
					<ClickOutside onClickOutside={this.hideEmoji}>
						<div className="emojis">
							<Picker
								data={data}
								title="Pick your emoji…"
								previewPosition="top"
								previewEmoji="point_up"
								showSkinTones={false}
								showPreview={false}
								onEmojiSelect={(emoji) => {
									{
										this.setState({
											message: `${this.state.message} ${emoji.native}`,
										});
										document.getElementById(
											"div-input-editable"
										).innerHTML = `${this.state.message} ${emoji.native}`;
									}
								}}
							/>
						</div>
					</ClickOutside>
				) : null}
				<form
					className="form-inline"
					style={{
						width: "100%",
						display: "flex",
						justifyContent: "center",
					}}
					onSubmit={this.sendMessage}
				>
					<div
						className="d-flex flex-column justify-content-center input-text-div emojisDiv"
						style={{
							padding: "10px 16px",
							borderRadius: "20px",
							boxShadow: "0 0 10px 0 rgb(68 72 90 / 10%)",
							backgroundColor: "#fff",
							boxSizing: "border-box",
							width: "100%",
							pointerEvents: isOnline ? "auto" : "none",
						}}
					>
						<div
							id="div-input-editable"
							contentEditable="true"
							ref={this.inputBox}
							className="form-control chat-input border0"
							data-text="Your message here..."
							maxLength="256"
							onKeyUp={this.onChangeMessage}
							disabled={this.props.disable || !isOnline}
							style={{ overflow: "auto" }}
						/>
						<div
							className="align-items-center d-flex justify-content-between"
							style={{ padding: "0px 5px" }}
						>
							<span className="d-flex">
								<span
									style={{
										cursor: "pointer",
										display: "flex",
										alignItems: "center",
									}}
								>
									{this.renderPlusIcon()}
								</span>
							</span>
							<span className="pointer">
								{this.state.message ? (
									<SendIcon
										onClick={() => this.sendMessage()}
										className="circle"
										style={{
											color: "white",
											backgroundColor: "#2fc76f",
											fontSize: "40px",
											padding: "10px",
										}}
									/>
								) : this.state.recordingInProgress ? (
									<MicIcon
										className="circle"
										style={{
											color: "#0096fb",
											backgroundColor: "#e0f0fc",
											fontSize: "40px",
											padding: "8px",
										}}
										onClick={this.recordVoiceMessage}
									/>
								) : (
									<RecorderBox
										stopRecording={this.cancelRecording}
										sendAudio={() => this.stopRecorder()}
									/>
								)}
							</span>
						</div>
						<span className="char-left-text">
							{this.state.charLeft} characters left
						</span>
					</div>
				</form>

				<UploadingFilesContainer />
			</div>
		);
	}
}

ChatInputBox.propTypes = {
	sendMessage: PropTypes.func.isRequired,
	allProfileImages: PropTypes.object.isRequired,
};

const mapDataToProps = (state) => {
	return {
		isOnline: state.user.isOnline,
	};
};

export default connect(mapDataToProps)(ChatInputBox);
