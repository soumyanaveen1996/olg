import React from "react";
import { useDispatch } from "react-redux";

import FMFilterComponent from "./FMFilterComponent";
import { MessageTypeConstants } from "../../../../Services/Message";
import { sendAMessage } from "../../../../State/actions/chats";
import { updateFilterFlags } from "../../../Containers/NonConversational/Store/NonConversationalAction";
import { renderNonconversationalNewFilter } from "../../../Store/NonConversationalFilter/NonConversationalFilterAction";
import { getAuthData } from "../../../../Services/StorageService";

const FMFilter = ({ conversation, options, parentTabId }) => {
	const dispatch = useDispatch();
	const {
		user: { userTimezone },
	} = getAuthData();
	const defaultUserTimezone = "Etc/UTC";

	const handleAction = (action, activeFilterName, filteredColumns = null) => {
		let responseChat = {};
		responseChat.messageType = MessageTypeConstants.MESSAGE_TYPE_TABLE_RESPONSE;
		responseChat.message = {
			controlId: options.controlId,
			tabId: options?.parent?.length ? parentTabId : options.tabId,
			action: action,
			tz: userTimezone || defaultUserTimezone,
			content: {
				activeFilterName,
			},
		};
		if (filteredColumns !== null) {
			responseChat.message.content.field = filteredColumns;
		}
		if (
			options &&
			options?.availableFilters &&
			!options?.availableFilters?.isNewFilter
		) {
			modifyAvailableFilters(options?.activeFilterName, activeFilterName);
			setActiveFilterName(activeFilterName);
		}
		responseChat.options = options || {};
		dispatch(sendAMessage(responseChat, true));
	};

	const setActiveFilterName = (activeFilterName) => {
		options.activeFilterName = activeFilterName;
	};

	const modifyAvailableFilters = (
		oldAvailableFilterName,
		newAvailableFilterName
	) => {
		const index = options?.availableFilters?.indexOf(oldAvailableFilterName);
		if (index !== -1) {
			options.availableFilters[index] = newAvailableFilterName;
		}
	};

	const updateReduxFlags = (localFilterFlag) => {
		let message = {
			options: {
				...options,
				parentTabId,
				...localFilterFlag,
			},
		};
		dispatch(updateFilterFlags(conversation, message));
	};

	const addNewFilter = () => {
		dispatch(renderNonconversationalNewFilter(parentTabId));
	};

	const handleConfirm = () => {
		let responseChat = {};
		responseChat.messageType = MessageTypeConstants.MESSAGE_TYPE_FORM_RESPONSE;
		responseChat.message = {
			controlId: options.controlId,
			tabId: options?.parent?.length ? parentTabId : options.tabId,
			action: "confirm",
			content: {
				activeFilterName: options.activeFilterName,
				field: options.filteredColumns,
			},
		};
		responseChat.options = options || {};
		dispatch(sendAMessage(responseChat, true));
	};

	const handleCancel = () => {
		if (options.allowClose) {
			let responseChat = {};
			responseChat.messageType =
				MessageTypeConstants.MESSAGE_TYPE_FORM_RESPONSE;
			responseChat.message = {
				controlId: options.controlId,
				tabId: options?.parent?.length ? parentTabId : options.tabId,
				action: "cancel",
				content: {
					activeFilterName: options.activeFilterName,
					field: options.filteredColumns,
				},
			};
			responseChat.options = options || {};
			dispatch(sendAMessage(responseChat, true));
		}
	};

	return (
		<FMFilterComponent
			conversation={conversation}
			options={options}
			setActiveFilterName={setActiveFilterName}
			handleAction={handleAction}
			updateReduxFlags={updateReduxFlags}
			handleConfirm={handleConfirm}
			handleCancel={handleCancel}
			addNewFilter={addNewFilter}
		/>
	);
};

export default FMFilter;
