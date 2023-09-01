import React from "react";
import ModalPopup from "../ModalMessages/ModalPopup";
import { changeFileToByteArr, getFileName } from "../../Services/FilesService";
import FileServiceClient from "../../Services/Clients/FileServiceClient";
import { MessageTypeConstants } from "../../Services/Message";

export function getFileIconClass(type) {
	if (type === "application/pdf" || type === "pdf") {
		// return "fa fa-file-pdf";
		return "far fa-file-pdf";
	} else if (
		type === "image/png" ||
		type === "image/jpeg" ||
		type === "image/gif" ||
		type === "image"
	) {
		return "far fa-file-image";
	} else if (type === "text/plain" || type === "text" || type === "txt") {
		return "far fa-file-alt";
	} else if (type === "video/mp4") {
		return "far fa-file-video";
	} else if (type === "audio/mp3") {
		return "far fa-file-audio";
	} else if (type === "text/csv" || type === "csv") {
		return "far fa-file-excel";
	} else if (
		type === "text/javascript" ||
		type === "javascript" ||
		type === "js"
	) {
		return "far fa-file-code";
	} else if (type === "text/html" || type === "html") {
		return "far fa-file-code";
	}
	return "far fa-file";
}

export default class UploadingFilesView extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}

	bytesToSize = (bytes) => {
		let sizes = ["Bytes", "KB", "MB", "GB", "TB"];
		if (bytes === 0) return "0 Byte";
		let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
		return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
	};

	getFileType = (type) => {
		if (type === "application/pdf") {
			return MessageTypeConstants.MESSAGE_TYPE_OTHER_FILE;
		} else if (
			type === "image/png" ||
			type === "image/jpeg" ||
			type === "image/gif"
		) {
			return MessageTypeConstants.MESSAGE_TYPE_IMAGE;
		} else if (type === "text/plain") {
			return MessageTypeConstants.MESSAGE_TYPE_OTHER_FILE;
		} else if (type === "video/mp4") {
			return MessageTypeConstants.MESSAGE_TYPE_VIDEO;
		} else if (type === "audio/mp3") {
			return MessageTypeConstants.MESSAGE_TYPE_AUDIO;
		} else if (type === "text/csv") {
			return MessageTypeConstants.MESSAGE_TYPE_CSV;
		} else if (
			type === "text/javascript" ||
			type === "application/x-javascript" ||
			type === "javascript"
		) {
			return MessageTypeConstants.MESSAGE_TYPE_JAVASCRIPT;
		} else if (type === "text/html") {
			return MessageTypeConstants.MESSAGE_TYPE_HTML;
		}
		return MessageTypeConstants.MESSAGE_TYPE_OTHER_FILE;
	};

	uploadFiles = (e) => {
		e.preventDefault();
		let { files, sendAMessage, conversation } = this.props;
		if (!files) {
			return;
		}

		let index = 0;
		let that = this;
		function doUpload(file) {
			let fileName = getFileName();
			fileName += file.name.substr(
				file.name.lastIndexOf("."),
				file.name.length - 1
			);

			FileServiceClient.uploadLargeFile({
				file: file,
				conversationId: conversation.conversationId,
				scopeId: conversation.conversationId,
				fileName: fileName,
			})
				.then((res) => {
					sendAMessage({
						message: fileName,
						options: { fileName: file.name },
						messageType: that.getFileType(file.type),
					});
					index++;
					if (index < files.length) {
						doUpload(files[index]);
					} else {
						that.setState({ uploading: false });
						that.props.cancelUpload();
					}
				})
				.catch((error) => {
					index++;
					if (index < files.length) {
						doUpload(files[index]);
					} else {
						that.setState({ uploading: false });
					}
				});
		}
		this.setState({ uploading: true });
		doUpload(files[index]);
	};

	onFileUploadProgress = (progressEvent) => {
		let percentCompleted = Math.round(
			(progressEvent.loaded * 100) / progressEvent.total
		);
		this.setState({ percentCompleted });
	};

	render() {
		let { files, conversation } = this.props;
		let { uploading, percentCompleted } = this.state;
		let disableButton = false;

		if (!files || files.length === 0) {
			return null;
		}

		let name = null;
		if (conversation.channel) {
			name = conversation.channel.channelName;
		} else if (conversation.contact) {
			name = conversation.contact.userName;
		} else {
			name = conversation.bot.botName;
		}

		return (
			<ModalPopup
				keyboard={false}
				onClose={this.hideNewProvideDialog}
				size="sm"
				title={"Send to " + name}
			>
				<form onSubmit={this.uploadFiles}>
					<div className="mb-2 text-center" style={{ color: "#ffc107" }}>
						Maximum size of a file that can be uploaded is 10MB.
					</div>
					<div className="p-2">
						{files.map((file, index) => {
							disableButton = (file.size / (1024 * 1024)).toFixed(2) > 10;
							return (
								<div key={index}>
									<div className="d-flex justify-content-between">
										<div style={{ wordBreak: "break-all" }}>
											<span className="mr-2">
												<i
													className={getFileIconClass(file.type) + " file-icon"}
												/>
											</span>
											{file.name}
										</div>
										<div>
											{this.bytesToSize(file.size)}

											<a
												onClick={(e) => {
													this.props.removeFile(index);
												}}
												className="btn btn-open btn-icon-o btn-sm mx-1 btn-rounded ml-3 btn-file-remove"
											>
												<span
													className="icon-cross"
													style={{
														fontWeight: "bold",
														color: "#E5453B",
													}}
												/>
											</a>
										</div>
									</div>
									<hr />
								</div>
							);
						})}

						<div className="mt-4 d-flex justify-content-center">
							<a
								onClick={this.props.cancelUpload}
								className="btn btn-sm btn-outline-info btn-install"
							>
								Cancel
							</a>
							<button
								type="submit"
								className="btn btn-sm btn-open ml-2"
								disabled={disableButton}
							>
								Submit
							</button>
						</div>
					</div>
				</form>
				{uploading && (
					<div>
						<progress
							id="progressBar"
							value={percentCompleted}
							max="100"
							style={{ width: "100%" }}
						/>
					</div>
				)}
			</ModalPopup>
		);
	}
}
