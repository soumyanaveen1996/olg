import * as React from "react";
import {
	FileCardContent,
	FileMainBox,
	LinkCard,
	FileMedia,
	FileDownloadIcon,
	FileTitleText,
	FileSubTitleText,
} from "./styles";
import PDF from "./img/pdf.svg";
import DOC from "./img/docx.svg";
import PPTX from "./img/pptx.svg";
import XLSX from "./img/xlsx.svg";
import JPG from "./img/file-icon-jpg.svg";
import PNG from "./img/file-icon-png.svg";
import BMP from "./img/file-icon-bmp.svg";
import TIFF from "./img/file-icon-tiff.svg";
import GIF from "./img/file-icon-gif.svg";
import TXT from "./img/file-icon-txt.svg";
import RAR from "./img/file-icon-rar.svg";
import CSV from "./img/file-icon-csv.svg";
import DEFAULT from "./img/default.svg";
import Config from "../../../Utils/Config";
import GenericAjax from "../../../Services/GenericAjax";
import { showSnackbarV2 } from "../../Store/Notification/NotificationAction";
import { useDispatch, useSelector } from "react-redux";
const R = require("ramda");
const TypeFile = ({ item }) => {
	const { files } = item;
	const fileType = (fileName) => {
		const fileExtension = fileName?.split(".")[1];
		let fileType = "";
		switch (fileExtension) {
			case "pdf":
				fileType = PDF;
				break;
			case "docx":
			case "doc":
			case "docm":
				fileType = DOC;
				break;
			case "pptx":
			case "ppt":
				fileType = PPTX;
				break;
			case "xls":
			case "xlsx":
				fileType = XLSX;
				break;
			case "jpeg":
			case "jpg":
				fileType = JPG;
				break;
			case "png":
				fileType = PNG;
				break;
			case "bmp":
				fileType = BMP;
				break;
			case "tiff":
				fileType = TIFF;
				break;
			case "gif":
				fileType = GIF;
				break;
			case "txt":
				fileType = TXT;
				break;
			case "rar":
				fileType = RAR;
				break;
			case "csv":
				fileType = CSV;
				break;
			default:
				fileType = DEFAULT;
				break;
		}
		return fileType;
	};
	const dispatch = useDispatch();
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

	const getScopeId = (fileScope) => {
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
	};

	const downloadFile = (value, fileName, fileScope) => {
		const scopeId = getScopeId(fileScope);
		if (user.isOnline) {
			const url = `${R.prop("filesAPI", Config)}/downloadwithsignedurl/${
				fileScope || "conversation"
			}/${scopeId}/${value}`;

			GenericAjax.downloadSignedUrlFile(url)
				.then((res) => {
					if (res?.signedUrl) {
						GenericAjax.downloadFile(res.signedUrl)
							.then((blob) => {
								var url = window.URL.createObjectURL(blob);
								var a = document.createElement("a");
								a.href = url;
								a.download = fileName;
								document.body.appendChild(a);
								a.click();
								a.remove();
							})
							.catch((error) => {
								console.error("ERROR in getting file from signed url", error);
								dispatch(showSnackbarV2("error", "Failed to download file"));
							});
					}
				})
				.catch((error) => {
					console.error("ERROR in genrate Signed Url", error);
					dispatch(showSnackbarV2("error", "Failed to generate signed url"));
				});
		} else {
			dispatch(
				showSnackbarV2(
					"error",
					"You will be able to download this file once you are back online"
				)
			);
		}
	};

	return (
		<>
			{files?.map((i) => (
				<LinkCard>
					<FileMedia
						component="img"
						image={fileType(i?.fileUrl?.fileName)}
						alt="Live from space album cover"
					/>
					<FileMainBox>
						<FileCardContent>
							<FileTitleText component="div" variant="h5">
								{i?.fileName}
							</FileTitleText>
							{/*<FileSubTitleText*/}
							{/*	variant="subtitle1"*/}
							{/*	color="text.secondary"*/}
							{/*	component="div"*/}
							{/*>*/}
							{/*	12KB*/}
							{/*</FileSubTitleText>*/}
						</FileCardContent>
						<FileDownloadIcon
							onClick={() =>
								downloadFile(
									i?.fileUrl?.value,
									i?.fileUrl?.fileName,
									i?.fileUrl?.fileScope
								)
							}
						/>
					</FileMainBox>
				</LinkCard>
			))}
		</>
	);
};

export default TypeFile;
