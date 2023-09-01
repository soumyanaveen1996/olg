import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import _ from "lodash";

import CloudUploadIcon from "@mui/icons-material/CloudUploadOutlined";
import { getFileName } from "../../../../Services/FilesService";
import { uploadingTheFile } from "../FMForm/UploadingFile";
import { createUUID } from "../../../../Utils/Helpers";
import { handleMessageTypeTable } from "../../../Containers/NonConversational/Store/NonConversationalAction";

const SectionContainer = styled("section")(({ theme }) => ({
	border: "dashed 1.2px #e8e8e8",
	borderRadius: 6,
	margin: 5,
	width: "100%",
	height: 60,
	textAlign: "center",
}));

const ButtonContainer = styled(Button)(({ theme }) => ({
	borderRadius: 6,
	border: "solid 1.2px #e8e8e8",
	backgroundColor: "#ffffff",
	marginTop: 10,
}));

const CircularProgressContainer = styled(CircularProgress)(({ theme }) => ({
	position: "absolute",
	top: "50%",
	left: "50%",
	marginTop: -12,
	marginLeft: -12,
}));

const FMTableAttachment = ({
	conversation,
	options,
	handleInlineFormAction,
	parentTabId = null,
	parentDocId = null,
}) => {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
		multiple: true,
		disabled: isLoading,
	});
	console.log("FMTABLE", options, conversation);
	const {
		chats: {
			selectedConversation: {
				conversationId: selectedConversationId,
				bot: { botId: currentBotId },
				userDomain: currentUserDomain,
			},
		},
	} = useSelector((state) => state);

	const [scopeId, setScopeId] = useState(() => {
		switch (options?.fileScope) {
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

	useEffect(() => {
		if (acceptedFiles.length > 0) {
			acceptedFiles.forEach(async (file) => {
				try {
					let fileDetailObj = file;
					let fileName = file && file ? file.name : "";
					let createFileName = getFileName();
					createFileName += fileName.substr(
						fileName.lastIndexOf("."),
						fileName.length - 1
					);
					setIsLoading(true);
					let rowId = createUUID();
					console.log(fileDetailObj, conversation, createFileName);
					let data = await uploadingTheFile(
						fileDetailObj,
						conversation,
						createFileName,
						options?.fileScope,
						scopeId
					);
					if (data) {
						const newRow = {
							fields: _.cloneDeep(options.columnTemplate),
							rowOptions: {
								newRow: true,
							},
						};
						newRow.fields.forEach((el) => {
							if (el.type === "file_field") {
								el.value = data.split("/").pop();
								el.fileName = fileName;
								el.readOnly = true;
								handleInlineFormAction("move", rowId, el.id, {
									currentFieldValue: el.value,
									fileName: el.fileName,
								});
							}
						});
						let formMessage = {
							message: {
								append: [{ [rowId]: newRow }],
							},
							options: {
								action: "change",
								controlId: options.controlId,
								tableId: options.tableId,
								tabId: options?.parent?.length || options.sectionId ? parentTabId : options.tabId,
								sectionId: options.sectionId ? options.sectionId : null,
								parentDocId,
								parent: options.parent,
							},
						};
						dispatch(handleMessageTypeTable(conversation, formMessage));
						setIsLoading(false);
					}
				} catch (err) {
					console.error("ERROR on file Upload =>> ", err);
					setIsLoading(false);
				}
			});
		}
	}, [acceptedFiles]);

	return (
		<SectionContainer>
			<div {...getRootProps({ className: "dropzone" })}>
				<input {...getInputProps()} />
				<ButtonContainer
					variant="outlined"
					disabled={isLoading}
					startIcon={
						isLoading ? (
							<CircularProgressContainer size={24} />
						) : (
							<CloudUploadIcon />
						)
					}
				>
					{isLoading ? "Uploading.." : "Attach files"}
				</ButtonContainer>
			</div>
		</SectionContainer>
	);
};

export default FMTableAttachment;
