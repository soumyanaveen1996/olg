import React, { PureComponent } from "react";
import { Label } from "reactstrap";
import InfoIcon from "./InfoIcon";
import ErrorMessage from "./ErrorMessage";
import {
	getFileName,
	getFileUrl,
	getFileUsingUrl,
	getFormPhoto,
} from "../../../../../Services/FilesService";
import store from "../../../../../State/configureStore";

import _ from "lodash";
import Mandatory from "./Mandatory";
import FileServiceClient from "../../../../../Services/Clients/FileServiceClient";

export default class FileUpload extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			element: {},
			imgFileName: "",
			fileName: "",
			imgPath: "",
			completed: this.props.completed,
		};
	}

	componentDidMount() {
		let { element } = this.props;

		let { value } = element;
		if (value) {
			// completed is false when opened in edit mode from smart suggestion and hence images are not uploaded on form
			//   console.log("value of the img", value);
			let conversationId =
				store.getState().chats.selectedConversation.conversationId;

			getFormPhoto(conversationId, value)
				.then((file) => {
					this.setState({ imgPath: file });
				})
				.catch((error) => {
					console.log(error);
					this.setState({ imgPath: null });
				});
			//   getFileUsingUrl(this.props.element.value).then(url => {
			//     this.setState({ imgPath: url });
			//   });
		}
		this.setState({ element: { ...this.props.element } });
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (!_.isEqual(nextProps.element, prevState.element)) {
			return { element: nextProps.element };
		} else return null;
	}

	showOptions = () => {
		this.setState({ showOptions: true });
	};

	closeOptions = () => {
		this.setState({ showOptions: false });
	};

	onFileUploadProgress = (progressEvent) => {
		var percentCompleted = Math.round(
			(progressEvent.loaded * 100) / progressEvent.total
		);
		this.setState({ percentCompleted });
	};

	uploadPhoto = (e) => {
		this.setState({ uploading: true });
		let file = e.target.files;

		if (!file) {
			return;
		}

		let conversationId =
			store.getState().chats.selectedConversation.conversationId;

		let imgName = file[0];
		let fileImgName = file && file[0] ? file[0].name : "";
		let fileName = getFileName();
		// console.log("file ==== ", fileImgName, fileName);
		fileName += fileImgName.substr(
			fileImgName.lastIndexOf("."),
			fileImgName.length - 1
		);

		FileServiceClient.uploadLargeFile({
			file: imgName,
			conversationId: conversationId,
			fileName: fileName,
		})
			.then(() => {
				this.setState({
					uploading: false,
					imgFileName: fileImgName,
					fileName: fileImgName,
				});
				return getFileUrl(conversationId, fileName);
			})
			.then((fileUrl) => {
				// console.log("file url ", fileUrl, fileName, imgName);
				this.props.action(fileName);
				return getFileUsingUrl(fileUrl);
			})
			.then((url) => {
				this.setState({ imgPath: url });
				this.props.onBlurField(this.props.element);
			})
			.catch((error) => {
				console.log("error on upload ", error);
				this.setState({ uploading: false });
				// todo handle error
			});

		// this.setState({ uploading: true });
	};

	// moveAction = () => {
	//   let responseChat = {};
	//   responseChat.messageType = MessageTypeConstants.MESSAGE_TYPE_FORM_RESPONSE;
	//   responseChat.message = {
	//     action: "move",
	//     currentField: this.props.element.id,
	//     currentFieldValue: this.props.element.value || "",
	//     formId: chat.options.formId
	//   };
	// };

	removeImage = () => {
		// console.log('remove file', this.state.element);
		this.props.action("");
		this.setState({
			completed: false,
			value: "",
			imgPath: "",
			imgFileName: "",
			fileName: "",
		});
	};

	render() {
		let noImage = "No image was uploaded";
		let { uploading, percentCompleted, imgPath, completed, element, fileName } =
			this.state;
		let { value } = element;
		let { action } = this.props;
		// console.log("all the images ", this.props, this.state);

		return (
			<div
				className="form-group px-4"
				style={{ width: "100%" }}
				key={element.id}
			>
				<hr />
				{completed === true && !value && !action ? (
					<span> {noImage} </span>
				) : (
					<div>
						<a
							className="primary-link my-2 d-flex justify-content-center align-items-center mr-2"
							style={{
								width: "100%",
								height: "50px",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								backgroundColor: "#F4F4F4",
								borderRadius: "10px",
								transition:
									"border-color .15s ease-in-out,box-shadow .15s ease-in-out",
							}}
						>
							{imgPath ? (
								<div
									className="d-flex justify-content-center align-items-center flex-row"
									style={{
										width: "100%",
										height: "50px",
										padding: 0,
										margin: 0,
									}}
								>
									<span
										style={{
											display: "inline-block",
											maxWidth: "255px",
											whiteSpace: "nowrap",
											overflow: "hidden",
											textOverflow: "ellipsis",
										}}
									>
										{fileName}
									</span>
									{action && !element.readOnly && (
										<Label
											style={{
												backgroundColor: "#F9D1CF",
												cursor: "pointer",
												padding: "5px 15px",
												margin: "0 0 0 20px",
												borderRadius: "5px",
												border: "1px solid rgba(229, 69, 59, 0.4)",
											}}
											onClick={this.removeImage}
										>
											<span style={{ fontSize: "14px", color: "#9B9B9B" }}>
												Remove file
											</span>
										</Label>
									)}
								</div>
							) : (
								!element.readOnly && (
									<div
										className="d-flex justify-content-center align-items-center"
										style={{ width: "100%", height: "100%" }}
									>
										<Label
											className="d-flex justify-content-center align-items-center"
											htmlFor="localContactImageBrowser"
											style={{ margin: 0 }}
										>
											<div
												style={{
													display: "flex",
													flexDirection: "row",
													justifyContent: "center",
													alignItems: "center",
												}}
											>
												<img
													style={{
														width: "25px",
														marginRight: "10px",
														cursor: "pointer",
													}}
													src="./img/upload_icon.png"
													alt="upload-file"
												/>
												<span
													style={{
														color: "#9B9B9B",
														fontSize: "14px",
														cursor: "pointer",
													}}
												>
													<Mandatory element={element} />
													{element.title}
												</span>
												{element && element.info && (
													<span className="ml-2">
														<InfoIcon
															id={`tooltip-${element.id}`}
															info={element.info}
														/>
													</span>
												)}
											</div>
										</Label>
										<input
											type="file"
											id="localContactImageBrowser"
											name="customFile"
											accept="*"
											onChange={this.uploadPhoto}
											className="displayNone"
										/>
									</div>
								)
							)}
						</a>

						{uploading && (
							<progress
								id="progressBar"
								value={percentCompleted}
								max="100"
								style={{ width: "100%" }}
							/>
						)}
					</div>
				)}
				<ErrorMessage element={element} />
				<hr />
			</div>
		);
	}
}
