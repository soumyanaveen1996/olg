import React, { useState } from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	CircularProgress,
	TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LoopIcon from "@mui/icons-material/Loop";
import { getFileName } from "../../../../Services/FilesService";
import { useSelector, useDispatch } from "react-redux";
import { uploadingTheFile } from "../FMForm/UploadingFile";
import Config from "../../../../Utils/Config";
import { MessageTypeConstants } from "../../../../Services/Message";
import { sendAMessage } from "../../../../State/actions/chats";
import _ from "lodash";
import { styled } from "@mui/material/styles";

const R = require("ramda");

const DialogTitleBlock = styled(DialogTitle)(() => ({
	padding: 0,
	paddingRight: "10px",
	marginLeft: "auto",
}));

const BaseStyle = styled(Button)(() => ({
	textTransform: "none",
}));

const SaveBaseStyle = styled(Button)(() => ({
	textTransform: "none",
	backgroundColor: "#06A7D5",
	padding: "6px 40px",
}));

const CancelBaseStyle = styled(Button)(() => ({
	textTransform: "none",
	padding: "6px 40px",
}));

const DialogContentBlock = styled(DialogContent)(() => ({
	padding: "8px 60px",
}));

const InputBlock = styled("input")(() => ({
	display: "none",
}));

const OverlayNameField = styled(TextField)(() => ({
	display: "flex",
	"& .MuiInputBase-input": {
		padding: "12px 14px",
	},
}));

const DialogContentTxt = styled(DialogContentText)(() => ({
	textAlign: "center",
	color: "black",
	fontWeight: 500,
	marginBottom: "40px",
}));

const UploadGeoJsonLabelStyle = styled("label")(() => ({
	border: "1px dashed #C4C4C4",
	width: "100%",
	textAlign: "center",
	padding: "10px 0",
	borderRadius: "4px",
	cursor: "pointer",
}));

const DialogStyles = styled(Dialog)(() => ({
	"& .MuiDialog-paper": {
		maxWidth: "530px",
	},
}));

const ImportOverlayPopup = ({
	imgOverlayShudOpen,
	setImgOverlayShudOpen,
	conversation,
	options,
	parentTabId = null,
}) => {
	const dispatch = useDispatch();
	const [showUploadBtn, setShowUploadBtn] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [layerName, setLayerName] = useState("");
	const [isNameEmpty, setisNameEmpty] = useState(() =>
		layerName.trim() ? false : true
	);
	const [isNameAlreadyUsedUp, setIsNameAlreadyUsedUp] = useState(() => {
		var usedUpNames = Object.keys(options.mapOptions.geoJsonUrl);
		return usedUpNames.includes(layerName.trim()) ? true : false;
	});
	const [fileScope, setFileScope] = useState("bot");
	const [uploadUrl, setUploadUrl] = useState("");
	const [downloadUrl, setDownloadUrl] = useState("");

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

	const handleDialogClose = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setImgOverlayShudOpen(false);
	};

	const handleChange = (event) => {
		const files = Array.from(event.target.files);
		const [file] = files;
		uploadImageOverlay({ files: files });
		// if (!!onChange) onChange({ target: { value: file } });
	};

	const uploadImageOverlay = (e) => {
		let file = e.files;
		if (!file) {
			return;
		}
		let fileDetailObj = file[0];
		let fileName = file && file[0] ? file[0].name : "";
		let createFileName = getFileName();
		let directoryName = scopeId;
		createFileName += fileName.substr(
			fileName.lastIndexOf("."),
			fileName.length - 1
		);
		// setIsFileUploading((old) => {
		// 	return [...old, id];
		// });
		// console.log(
		// 	"biiiiiii",
		// 	fileDetailObj,
		// 	scopeId,
		// 	conversation,
		// 	createFileName,
		// 	fileScope || "conversation"
		// );
		setIsLoading(true);
		uploadingTheFile(
			fileDetailObj,
			directoryName || conversation,
			createFileName,
			fileScope || "conversation"
		)
			.then((data) => {
				setUploadUrl(data);
				const uniqueFileName = data.split("/").pop();
				setIsLoading(false);
				const downloadUrl = `${R.prop(
					"filesAPI",
					Config
				)}/downloadwithsignedurl/${
					fileScope || "conversation"
				}/${directoryName}/${uniqueFileName}`;
				setDownloadUrl(downloadUrl);

				// downloadImageOverlay(uniqueFileName, fileName);
				// fields.forEach((el) => {
				// 	if (el.id === e.name) {
				// 		el.value = data.split("/").pop();
				// 		el.fileName = fileName;
				// 		var obj = {
				// 				currentFieldValue: el.value,
				// 				fileName: el.fileName,
				// 			}
				// 	}
				// });
			})
			.catch((err) => {
				setIsLoading(false);
				console.log("on error === ", err);
				// setIsFileUploading((old) => {
				// 	return old.filter((item) => item !== id);
				// });
			});
	};

	const handleAction = () => {
		let responseChat = {};
		responseChat.messageType = MessageTypeConstants.MESSAGE_TYPE_TABLE_RESPONSE;
		responseChat.message = {
			controlId: options.controlId,
			tabId: options?.parent?.length ? parentTabId : options.tabId,
			action: "createOverlay",
			content: { name: layerName?.trim(), url: downloadUrl },
			currentField: null,
			docId: null,
		};
		dispatch(sendAMessage(responseChat, true));
	};

	return (
		<DialogStyles
			open={imgOverlayShudOpen}
			onClose={handleDialogClose}
			onClick={(e) => e.stopPropagation()}
			disableEscapeKeyDown
			fullWidth
			PaperProps={{
				style: { borderRadius: 10 },
			}}
			aria-labelledby="import-overlay-dialog-title"
			aria-describedby="import-overlay-dialog-description"
		>
			<DialogTitleBlock>
				<IconButton
					disableRipple
					edge="end"
					onClick={handleDialogClose}
					size="large"
				>
					<CloseIcon />
				</IconButton>
			</DialogTitleBlock>
			<DialogContentBlock>
				<DialogContentTxt id="import-overlay-dialog-description">
					Import new overlay
				</DialogContentTxt>
				<OverlayNameField
					id="overlay-name"
					label={null}
					value={layerName}
					placeholder={"Overlay name"}
					onChange={(e) => {
						var currName = e.target.value || "";
						currName.trim() ? setisNameEmpty(false) : setisNameEmpty(true);
						var usedUpNames = Object.keys(options.mapOptions.geoJsonUrl);
						usedUpNames.includes(currName.trim())
							? setIsNameAlreadyUsedUp(true)
							: setIsNameAlreadyUsedUp(false);
						setLayerName(currName);
					}}
					variant="outlined"
					InputLabelProps={{
						shrink: false,
					}}
				/>
				<div style={{ marginBottom: "20px", color: "red" }}>
					{isNameEmpty && <div>Name can't be empty</div>}
					{isNameAlreadyUsedUp && (
						<div>This name is already used. Use a different name.</div>
					)}
				</div>
				<InputBlock
					id="contained-button-file"
					type="file"
					onChange={handleChange}
				/>
				<UploadGeoJsonLabelStyle htmlFor="contained-button-file">
					<BaseStyle
						variant="outlined"
						disabled={isLoading}
						component="span"
						startIcon={
							isLoading ? (
								<CircularProgress size={24} />
							) : (
								(showUploadBtn && (
									<CloudUploadIcon style={{ color: "#44475A" }} />
								)) || <LoopIcon />
							)
						}
					>
						<span style={{ color: "#44475A" }}>
							{downloadUrl ? "Change GeoJSON file" : "Upload GeoJSON file"}
						</span>
					</BaseStyle>
				</UploadGeoJsonLabelStyle>
				<div style={{ color: "red" }}>
					{!downloadUrl && <div>GeoJSON must be uploaded</div>}
				</div>
			</DialogContentBlock>
			<DialogActions
				style={{
					justifyContent: "center",
					paddingBottom: "35px",
					paddingTop: "18px",
				}}
			>
				<>
					<CancelBaseStyle
						onClick={(e) => {
							e.preventDefault();
							setImgOverlayShudOpen(false);
						}}
						color="primary"
						variant="contained"
					>
						Cancel
					</CancelBaseStyle>
					<SaveBaseStyle
						disabled={isNameEmpty || isNameAlreadyUsedUp || !downloadUrl}
						onClick={(e) => {
							e.preventDefault();
							setImgOverlayShudOpen(false);
							handleAction();
							setLayerName("");
							setUploadUrl("");
							setDownloadUrl("");
						}}
						variant="contained"
					>
						Save
					</SaveBaseStyle>
				</>
			</DialogActions>
		</DialogStyles>
	);
};

export default ImportOverlayPopup;
