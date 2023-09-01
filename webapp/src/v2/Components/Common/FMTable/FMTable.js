import React, { useState } from "react";
import { useDispatch } from "react-redux";
import _ from "lodash";
import FMTableComponent from "./FMTableComponent";
import { MessageTypeConstants } from "../../../../Services/Message";
import { sendAMessage } from "../../../../State/actions/chats";
import { startRingCallCenter } from "../../../Store/Notification/NotificationAction";
import CustomToolbar from "../CustomToolbar/CustomToolbar";
import FMTableAttachment from "../FMTableAttachment/FMTableAttachment";
import { getAuthData } from "../../../../Services/StorageService";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { handlePromptOnClose } from "../../../Containers/NonConversational/Store/NonConversationalAction";

const Title = styled(Box)(() => ({
	margin: "26px 0",
}));

const PaperContainer = styled(Paper)(() => ({
	borderRadius: "20px",
	marginBottom: "10px",
}));

const Label = styled(Typography)(() => ({
	minWidth: "60px",
	textTransform: "capitalize",
	fontSize: "20px",
	fontWeight: "bold",
	fontStretch: "normal",
	fontStyle: "normal",
	lineHeight: "normal",
	letterSpacing: "-0.36px",
	color: "#2a2d3c",
}));

const FMTable = ({
	conversation,
	parentTabId = null,
	parentDocId = null,
	options,
	message,
	rows,
	messageType = MessageTypeConstants.MESSAGE_TYPE_TABLE,
}) => {
	const dispatch = useDispatch();

	const [selectedRow, setSelectedRow] = useState([]);
	const { title } = options;
	const {
		user: { userTimezone },
	} = getAuthData();
	const defaultUserTimezone = "Etc/UTC";

	message = message || rows;

	const handleAction = (
		action,
		content = null,
		oldContent = null,
		docId = null,
		newlyAddedRow
	) => {
		let responseChat = {};
		responseChat.messageType = MessageTypeConstants.MESSAGE_TYPE_TABLE_RESPONSE;
		responseChat.message = {
			controlId: options.controlId,
			tabId: options?.parent?.length || options.sectionId ? parentTabId : options.tabId,
			parentDocId: options?.docId || parentDocId,
			action,
			newRow: newlyAddedRow,
			content,
			oldContent,
			docId,
			sectionId: options.sectionId ? options.sectionId : null,
			tz: userTimezone || defaultUserTimezone,
		};

		!newlyAddedRow && delete responseChat.message.newRow;

		dispatch(sendAMessage(responseChat, true));
		if (action === "nextPage") {
			dispatch(handlePromptOnClose(conversation));
		}
	};

	const handleInlineFormAction = (
		action,
		docId = null,
		currentField = null,
		content = null,
		newlyAddedRow
	) => {
		let responseChat = {};
		responseChat.messageType = MessageTypeConstants.MESSAGE_TYPE_TABLE_RESPONSE;
		responseChat.message = {
			controlId: options.controlId,
			tabId: options?.parent?.length || options.sectionId ? parentTabId : options.tabId,
			parentDocId: options?.docId || parentDocId,
			action,
			content,
			currentField,
			docId,
			sectionId: options.sectionId ? options.sectionId : null,
			tz: userTimezone || defaultUserTimezone,
		};
		if (newlyAddedRow) {
			responseChat.message.newRow = newlyAddedRow;
		}
		dispatch(sendAMessage(responseChat, true));
	};

	const handleCall = (action, data) => {
		if (action === "pickCall") {
			dispatch(startRingCallCenter(true, data));
		} else dispatch(sendAMessage(data, true));
	};

	if (messageType === "map") {
		switch (options?.mapOptions?.listType) {
			default:
			case "markers":
				message = message?.filter((itemObj) =>
					Object.values(itemObj)[0].fields?.find(
						(item) => item.title === "pointType" && item.value === "marker"
					)
				);
				break;
			case "areas":
				message = message?.filter((itemObj) =>
					Object.values(itemObj)[0].fields?.find(
						(item) => item.type === "geo_area_field"
					)
				);
				break;
		}
	}
	if (!_.isEmpty(options)) {
		return (
			<>
				{options.acceptAttachments && (
					<FMTableAttachment
						conversation={conversation}
						parentTabId={parentTabId}
						parentDocId={parentDocId}
						options={options}
						message={message}
						handleInlineFormAction={handleInlineFormAction}
					/>
				)}
				{messageType === MessageTypeConstants.MESSAGE_TYPE_TABLE && (
					<Title>
						<Label varient="h5">{title}</Label>
					</Title>
				)}
				<PaperContainer>
					<CustomToolbar
						options={options}
						handleAction={handleAction}
						selectedRow={selectedRow}
						messageType={messageType}
						parentTabId={parentTabId}
						parentDocId={parentDocId}
						conversation={conversation}
					/>
					<FMTableComponent
						conversationId={conversation}
						parentTabId={parentTabId}
						parentDocId={parentDocId}
						optionsDetails={options}
						message={message}
						selectedRow={selectedRow}
						setSelectedRow={setSelectedRow}
						handleAction={handleAction}
						handleInlineFormAction={handleInlineFormAction}
						handleCall={handleCall}
					/>
				</PaperContainer>
			</>
		);
	}
	return null;
};

export default FMTable;
