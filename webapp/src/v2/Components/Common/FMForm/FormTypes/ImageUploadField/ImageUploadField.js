import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDropzone } from "react-dropzone";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import _ from "lodash";
import GenericAjax from "../../../../../../Services/GenericAjax";
import Config from "../../../../../../Utils/Config";
import { showSnackbarV2 } from "../../../../../Store/Notification/NotificationAction";
import { getAuthData } from "../../../../../../Services/StorageService";

import CloudUploadIcon from "@mui/icons-material/CloudUploadOutlined";
import LoopIcon from "@mui/icons-material/LoopOutlined";
import { styled } from "@mui/material/styles";

const Container = styled("section")(() => ({
	border: "dashed 1.2px #e8e8e8",
	margin: 5,
	width: "100%",
	textAlign: "center",
}));

const ButtonContainer = styled(Button)(() => ({
	borderRadius: 6,
	border: "solid 1.2px #e8e8e8",
	backgroundColor: "#ffffff",
	marginTop: 10,
	display: `${(props) => (props.readOnly ? "none" : "")}`,
}));

const ButtonProgress = styled(CircularProgress)(() => ({
	position: "absolute",
	top: "50%",
	left: "50%",
	marginTop: -12,
	marginLeft: -12,
}));

const R = require("ramda");

const maxSize = 3; //in MB
const conversionFactor = 1024000; // 1MB to bytes
const maxSizeInBytes = maxSize * conversionFactor; //as dropzone needs values in bytes

function fileSizeValidator(file) {
	if (file && file.size > maxSizeInBytes) {
		return {
			code: `size-${maxSize}-too-large`,
			message: `Size too large. Upload a file less than ${maxSize} MB in size`,
		};
	}

	return null;
}

const ImageUploadField = ({
	conversation,
	options,
	handleInlineFormAction,
	handleClick,
	parentTabId = null,
	parentDocId = null,
	id,
	title,
	type,
	value,
	fileName,
	fileScope,
	isSections,
	info,
	isFileUploading,
	validationResult,
	validationMessage,
	readOnly,
}) => {
	const sectionRef = useRef(null);
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const [showUploadBtn, setShowUploadBtn] = useState(true);
	const [files, setFiles] = useState([]);
	const {
		chats: {
			selectedConversation: {
				conversationId: selectedConversationId,
				bot: { botId: currentBotId },
				userDomain: currentUserDomain,
			},
		},
		user,
	} = useSelector((state) => state);

	const [scopeId, setScopeId] = useState(() => {
		switch (fileScope) {
			case "bot": {
				return currentBotId;
			}

			case "domain": {
				return currentUserDomain;
			}

			case "conversation":
			default: {
				return selectedConversationId;
			}
		}
	});

	const {
		user: { userTimezone },
	} = getAuthData();
	const defaultUserTimezone = "Etc/UTC";

	const {
		acceptedFiles,
		fileRejections,
		getRootProps,
		getInputProps,
		inputRef,
		rootRef,
	} = useDropzone({
		multiple: false,
		disabled: isLoading || readOnly,
		accept: "image/*",
		onDropAccepted: (acceptedFiles) => {
			setFiles(
				acceptedFiles.map((file) =>
					Object.assign(file, {
						preview: URL.createObjectURL(file),
					})
				)
			);
			setShowUploadBtn(false);
			handleClick &&
				handleClick(inputRef.current, type, id, title, scopeId, fileScope);
		},
		validator: fileSizeValidator,
	});

	useEffect(
		() => () => {
			// Make sure to revoke the data uris to avoid memory leaks
			files.forEach((file) => URL.revokeObjectURL(file.preview));
		},
		[files]
	);

	useEffect(() => {
		if (value) {
			downloadFile(value, fileName);
		}
	}, [value]);

	const downloadFile = (value, fileName) => {
		setIsLoading(true);
		if (user.isOnline) {
			const url = `${R.prop("filesAPI", Config)}/downloadwithsignedurl/${
				fileScope || "conversation"
			}/${scopeId}/${value}`;
			// console.log("hiiiiii", url, fileScope);
			GenericAjax.downloadSignedUrlFile(url)
				.then((res) => {
					if (res?.signedUrl) {
						GenericAjax.downloadFile(res.signedUrl)
							.then((blob) => {
								const url = window.URL.createObjectURL(blob);
								if (sectionRef && sectionRef.current !== null) {
									sectionRef.current.style.backgroundImage = `url(${url})`;
								}
								setShowUploadBtn(false);
								setIsLoading(false);
							})
							.catch((error) => {
								console.error("ERROR in getting file from signed url", error);
								dispatch(
									showSnackbarV2("error", "Failed to download file isfield")
								);
								setIsLoading(false);
							});
					}
				})
				.catch((error) => {
					console.error("ERROR in genrate Signed Url", error);
					dispatch(showSnackbarV2("error", "Failed to generate signed url"));
					setIsLoading(false);
				});
		} else {
			dispatch(
				showSnackbarV2(
					"error",
					"You will be able to download this file once you are back online"
				)
			);
			setIsLoading(false);
		}
	};

	const fileRejectionItems = fileRejections.map(({ file, errors }, index) => (
		<ul
			style={{
				color: "red",
				textAlign: "center",
				listStylePosition: "inside",
				listStyleType: "none",
				margin: 0,
				padding: 0,
			}}
			key={index}
		>
			{errors.map((e) => (
				<li key={e.code}>{e.message}</li>
			))}
		</ul>
	));

	return (
		<>
			<Container
				ref={sectionRef}
				style={{
					backgroundImage: `url(${files[0]?.preview})`,
					backgroundRepeat: "no-repeat",
					backgroundSize: "contain",
					backgroundPosition: "center center",
					borderRadius: "20px",
					height: "400px",
					border: readOnly ? "solid 1.2px #e8e8e8 !important" : "",
				}}
			>
				<div
					{...getRootProps({ className: "dropzone" })}
					style={{
						width: "inherit",
						height: "inherit",
						position: "relative",
					}}
				>
					<input id={id} name={id} {...getInputProps({})} accept="image/*" />
					<ButtonContainer
						readOnly={readOnly}
						sx={
							showUploadBtn
								? {
										position: "absolute",
										top: "50%",
										left: "50%",
										transform: "translate(-50%, -50%)",
										color: "black",
								  }
								: {
										position: "absolute",
										left: "10px",
										top: "0px",
										color: "black",
								  }
						}
						variant="outlined"
						disabled={isLoading}
						startIcon={
							isLoading ? (
								<ButtonProgress size={24} />
							) : (
								(showUploadBtn && <CloudUploadIcon />) || <LoopIcon />
							)
						}
					>
						{showUploadBtn ? "Upload Photo" : "Change Photo"}
					</ButtonContainer>
				</div>
			</Container>
			{fileRejectionItems}
			<div style={{ color: " #9c9ea7", textAlign: "center" }}>
				Upload an image close to a 4:3 aspect ratio for optimal viewing.
			</div>
		</>
	);
};

export default ImageUploadField;
