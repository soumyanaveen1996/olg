import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import { Button, LinearProgress, Typography } from "@mui/material";
import Mandatory from "../../Mandatory";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Config from "../../../../../../Utils/Config";
import GenericAjax from "../../../../../../Services/GenericAjax";
import { showSnackbarV2 } from "../../../../../Store/Notification/NotificationAction";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

const R = require("ramda");

const FormContainer = styled("div")(() => ({
	// "& div": {
	// 	background: "#FFFFFF",
	// },
}));

const ButtonContainer = styled(Button)(() => ({
	color: "#638dff",
}));

const ButtonProgress = styled(CircularProgress)(() => ({
	// position: "absolute",
	top: "50%",
	left: "50%",
	marginTop: 0,
	marginLeft: 9,
}));

const SelectedFileText = styled("span")(() => ({
	display: "flex",
	whiteSpace: "nowrap",
	overflow: "hidden",
	textOverflow: "ellipsis",
	fontSize: 14,
	fontFamily: "SF Pro Text Regular",
	color: "#98b0c8",
	alignItems: "center",
	cursor: "pointer",
}));

const ErrorText = styled(Typography)(({ theme }) => ({
	color: theme.palette.error.main,
}));

const InfoText = styled(Typography)(() => ({
	color: "#aeb8d6",
}));

const FileUploadField = (props) => {
	const {
		id,
		title,
		value,
		fileName,
		handleClick,
		isSections,
		info,
		isFileUploading,
		validationResult,
		validationMessage,
		readOnly,
		fileScope,
	} = props;
	const isBoolean = (val) => "boolean" === typeof val;
	const [isLoading, setIsLoading] = useState(false);

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
	const dispatch = useDispatch();

	const downloadFile = () => {
		setIsLoading(true);
		if (user.isOnline) {
			const url = `${R.prop("filesAPI", Config)}/downloadwithsignedurl/${fileScope || "conversation"
				}/${scopeId}/${value}`;
			GenericAjax.downloadSignedUrlFile(url)
				.then((res) => {
					if (res?.signedUrl) {
						GenericAjax.downloadFile(res.signedUrl)
							.then((blob) => {
								const url = window.URL.createObjectURL(blob);
								const a = document.createElement("a");
								a.href = url;
								a.download = fileName;
								document.body.appendChild(a);
								a.click();
								a.remove();
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

	return (
		<>
			{!value && !readOnly && (
				<FormContainer>
					<ButtonContainer
						aria-label="upload picture"
						component="label"
						startIcon={<FileUploadOutlinedIcon color="#638dff" />}
					>
						<Mandatory {...props} />
						{title}
						{!value && (
							<input
								hidden
								id={id}
								name={id}
								accept="*"
								onChange={(e) =>
									handleClick(e, "uploadFile", id, "", scopeId, fileScope)
								}
								type="file"
							/>
						)}
					</ButtonContainer>
				</FormContainer>
			)}
			{isFileUploading?.includes(id) && <LinearProgress />}
			{value && (
				<div
					className="d-flex flex-row"
					style={{
						width: "100%",
					}}
				>
					<SelectedFileText onClick={downloadFile}>
						{fileName || value}
					</SelectedFileText>
					{value && !readOnly && !isLoading && (
						<IconButton
							id={id}
							name={id}
							onClick={(e) => handleClick(e, "removeUploadFile", id, fileScope)}
						>
							<CloseIcon color="#98b0c8" />
						</IconButton>
					)}
					{isLoading && <ButtonProgress size={24} />}
				</div>
			)}
			{isBoolean(validationResult) && !validationResult ? (
				<ErrorText>{validationMessage}</ErrorText>
			) : (
				<InfoText>{info}</InfoText>
			)}
		</>
	);
};

FileUploadField.propTypes = {
	title: PropTypes.string,
	isSmallScreen: PropTypes.bool,
	handleClick: PropTypes.func.isRequired,
};

export default FileUploadField;
