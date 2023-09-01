/* eslint-disable react/no-unsafe */
/* eslint-disable no-unused-vars */
import React, { PureComponent } from "react";
import _ from "lodash";
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
import FileServiceClient from "../../../../../Services/Clients/FileServiceClient";

export default class UploadImage extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			element: this.props.element,
			imgFileName: "",
			imgPath: "",
			completed: this.props.completed,
		};
	}

	UNSAFE_componentWillMount() {
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
	}

	UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
		this.setState({ element: nextProps.element });
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
		fileName += fileImgName.substr(
			fileImgName.lastIndexOf("."),
			fileImgName.length - 1
		);

		FileServiceClient.uploadLargeFile({
			file: imgName,
			conversationId: conversationId,
			fileName: fileName,
		})
			.then((res) => {
				this.setState({ uploading: false, imgFileName: fileImgName });
				return getFileUrl(conversationId, fileName);
			})
			.then((fileUrl) => {
				// console.log("file url ", fileUrl, fileName, imgName);
				this.props.action(fileName);
				return getFileUsingUrl(fileUrl);
			})
			.then((url) => {
				this.setState({ imgPath: url });
			})
			.catch((error) => {
				console.log("error on upload ", error);
				this.setState({ uploading: false });
				// todo handle error
			});

		// this.setState({ uploading: true });
	};

	removeImage = () => {
		// console.log("remove image");
		this.props.action("");
		this.setState({ completed: false, value: "", imgPath: "" });
	};

	render() {
		let noImage = "No image was uploaded";
		let { uploading, percentCompleted, imgPath, completed, element } =
			this.state;
		let { value } = element;
		let { action, key } = this.props;
		// console.log("all the images ", this.props, this.state);

		return (
			<div
				className="form-group px-4"
				style={{ width: "100%" }}
				key={element.id}
			>
				<hr />
				{/* <label className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <span className="has-arrow">
              {element.title}
              <Mandatory element={element} />
            </span>
            <span className="ml-2">
              <InfoIcon id={`tooltip-${element.id}`} info={element.info} />
            </span>
          </div>
        </label> */}
				{completed === true && !value && !action ? (
					<span> {noImage} </span>
				) : (
					<div>
						<a
							className="primary-link my-2 d-flex justify-content-center align-items-center mr-2"
							style={{
								width: "100%",
								height: "300px",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								backgroundColor: "#F4F4F4",
							}}
						>
							{imgPath ? (
								<div
									className="d-flex justify-content-center align-items-center flex-column upload-image-bg"
									style={{
										width: "100%",
										height: "300px",
										padding: 0,
										margin: 0,
									}}
								>
									<img src={imgPath} width="100%" height="300px" alt="img" />
									{action && !element.readOnly && (
										<Label
											style={{
												padding: 0,
												margin: 0,
												color: "#00A7D6",
												cursor: "pointer",
												fontSize: "14px",
											}}
											onClick={this.removeImage}
										>
											Remove photo
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
											className="d-flex justify-content-center align-items-center border-for-uploadImage"
											htmlFor="localContactImageBrowser"
										>
											<div
												style={{
													display: "flex",
													flexDirection: "column",
													justifyContent: "center",
													alignItems: "center",
												}}
											>
												<img
													style={{ width: "50px" }}
													src="./img/avatar-icon-placeholder@2x.png"
													alt=""
												/>
												<span style={{ color: "#9B9B9B", fontSize: "16px" }}>
													Upload a photo
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
											accept=".png,.jpg"
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
