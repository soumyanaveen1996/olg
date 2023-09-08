import React from "react";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { useHistory } from "react-router-dom";

import FMContainerComponent from "./FMContainerComponent";
import { MessageTypeConstants } from "../../../../Services/Message";
import { sendAMessage } from "../../../../State/actions/chats";
import {
	removeNonConversationalMessages,
	handleContainerTabChange,
	resetContainerFields,
} from "../../../Containers/NonConversational/Store/NonConversationalAction";

const FMContainer = ({
	conversation,
	containerSelectedTabIndex,
	options,
	message,
}) => {
	const dispatch = useDispatch();
	const history = useHistory();

	const getResponseContainer = () => {
		let responseContainer = [];

		message.forEach((tab) => {
			let responseTab = {};

			if (tab.type === MessageTypeConstants.MESSAGE_TYPE_FORM2) {
				let fieldsCopy = _.cloneDeep(tab.message.fields);
				fieldsCopy = fieldsCopy.map((col) => {
					return {
						id: col.id,
						type: col.type,
						value: col.value,
						fileName: col.fileName,
					};
				});
				responseTab = {
					fields: fieldsCopy,
					formId: tab.message.options.formId,
				};
			} else if (tab.type === MessageTypeConstants.MESSAGE_TYPE_FORM) {
				let fieldsCopy = _.cloneDeep(tab.message.fields);
				responseTab = fieldsCopy;
			} else if (tab.type === MessageTypeConstants.MESSAGE_TYPE_TABLE) {
				let fieldsCopy = _.cloneDeep(tab.message.rows);
				fieldsCopy = fieldsCopy
					.filter((row) => !Object.values(row)[0].rowOptions.deleted)
					.map((row) => {
						let col = {};
						Object.values(row)[0].fields.map((field) => {
							if (field.type === "file_field") {
								col[field.id] = {
									value: field.value || null,
									fileName: field.fileName || null,
								};
							} else {
								col[field.id] = field.value || null;
							}
							return field;
						});
						return col;
					});
				tab.message.rows.forEach(
					(row) =>
						Object.values(row)[0].rowOptions.hasOwnProperty("deleted") &&
						delete Object.values(row)[0].rowOptions.deleted
				);
				responseTab = {
					rows: fieldsCopy,
					tableId: tab.message.options.tableId,
				};
			}

			responseContainer.push(responseTab);
		});
		return responseContainer;
	};

	const handleConfirm = () => {
		let responseChat = {};

		responseChat.messageType =
			MessageTypeConstants.MESSAGE_TYPE_CONTAINER_RESPONSE;
		responseChat.message = {
			action: "confirm",
			controlId: options.controlId,
			docId: options.docId,
			tabId: options.tabId,
			container: getResponseContainer(),
		};
		dispatch(sendAMessage(responseChat, true));
		options.promptOnClose = false;
		if (options.allowClose && options.minimizeOnConfirm) {
			dispatch(
				removeNonConversationalMessages(
					conversation,
					{ options: options },
					history
				)
			);
		}
	};

	const handleMoreItem = (button) => {
		let responseChat = {};
		responseChat.messageType =
			MessageTypeConstants.MESSAGE_TYPE_CONTAINER_RESPONSE;
		responseChat.message = {
			action: "more",
			docId: options.docId,
			button,
			controlId: options.controlId,
			tabId: options.tabId,
			container: getResponseContainer(),
		};
		dispatch(sendAMessage(responseChat, true));
	};

	const handleChangeTab = (event, newValue) => {
		dispatch(
			handleContainerTabChange(conversation, { options: options }, newValue)
		);
	};

	const handleCancel = () => {
		if (options.allowClose) {
			let responseChat = {};
			responseChat.messageType =
				MessageTypeConstants.MESSAGE_TYPE_CONTAINER_RESPONSE;
			responseChat.message = {
				controlId: options.controlId,
				tabId: options.tabId,
				action: "cancel",
			};
			dispatch(sendAMessage(responseChat, true));
			dispatch(
				removeNonConversationalMessages(
					conversation,
					{ options: options },
					history
				)
			);
		} else {
			dispatch(resetContainerFields(conversation, { options: options }));
		}
	};

	return (
		<FMContainerComponent
			conversation={conversation}
			options={options}
			message={message}
			containerSelectedTabIndex={containerSelectedTabIndex}
			handleConfirm={handleConfirm}
			handleChangeTab={handleChangeTab}
			handleCancel={handleCancel}
			handleMoreItem={handleMoreItem}
		/>
	);
};

export default FMContainer;
