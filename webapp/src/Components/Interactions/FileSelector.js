import React, { Component } from "react";
import FileServiceClient from "../../Services/Clients/FileServiceClient";
import { getFileUrl, getFileName } from "../../Services/FilesService";

export default class FileSelector extends Component {
	constructor(props) {
		super(props);
		this.state = { type: "image", uploading: false, percentCompleted: 0 };
	}

	setFile = (e) => {
		this.setState({ file: e.target.files[0] });
	};

	upload = () => {
		let { sendMessage, conversationId } = this.props;
		let { type, file } = this.state;
		if (!file) {
			return;
		}

		let fileName = getFileName();
		fileName += file.name.substr(
			file.name.lastIndexOf("."),
			file.name.length - 1
		);
		this.setState({ uploading: true });
		FileServiceClient.uploadLargeFile({
			file: file,
			conversationId: conversationId,
			fileName: fileName,
		})
			.then((res) => {
				this.setState({ uploading: false });
				return getFileUrl(conversationId, fileName);
			})
			.then((fileUrl) => {
				sendMessage(fileUrl, type);
				this.props.onCompleteHook();
			})
			.catch((error) => {
				this.setState({ uploading: false });
				// todo handle error
			});
	};

	onFileUploadProgress = (progressEvent) => {
		var percentCompleted = Math.round(
			(progressEvent.loaded * 100) / progressEvent.total
		);
		this.setState({ percentCompleted });
	};

	render() {
		let { type, uploading, percentCompleted } = this.state;

		let accept = ".png,.jpg,.jpeg,.gif";
		if (type === "audio") {
			accept = ".mp3,.wav,.aac";
		} else if (type === "video") {
			accept = ".mp4,.wmv,.avi";
		}

		return (
			<div className="border1 p-3 mb-30">
				<div className="d-flex justify-content-between mb-4 mt-2">
					<label className="custom-checkbox rounded">
						<input
							type="checkbox"
							onClick={() => {
								this.setState({ type: "image" });
							}}
							checked={type === "image"}
						/>
						<span>Image</span>
					</label>
					<label className="custom-checkbox rounded">
						<input
							type="checkbox"
							accept=".jpg,.png,.gif"
							onClick={() => {
								this.setState({ type: "audio" });
							}}
							checked={type === "audio"}
						/>
						<span>Audio</span>
					</label>
					<label className="custom-checkbox rounded">
						<input
							type="checkbox"
							onClick={() => {
								this.setState({ type: "video" });
							}}
							checked={type === "video"}
						/>
						<span>Video</span>
					</label>
				</div>

				<div className="mb-4">
					<input type="file" onChange={this.setFile} accept={accept} />
				</div>

				{!uploading && (
					<div className="d-flex justify-content-end">
						<button className="btn btn-primary" id="" onClick={this.upload}>
							Upload
						</button>
					</div>
				)}

				{uploading && (
					<progress
						id="progressBar"
						value={percentCompleted}
						max="100"
						style={{ width: "100%" }}
					/>
				)}
			</div>
		);
	}
}
