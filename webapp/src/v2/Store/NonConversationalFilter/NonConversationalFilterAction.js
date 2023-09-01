import { showSnackbarV2 } from "../Notification/NotificationAction";
import { RENDER_NONCONVERSATIONAL_FILTER } from "./types";
import store from "../../../State/configureStore";
import _ from "lodash";

export const renderNonconversationalFilter =
	(message, filteredColumns = null) =>
	(dispatch) => {
		let newOptions = {};
		let filterState = store.getState().v2.NonConversationalFilter;
		switch (message.options.action) {
			case "changeFilter":
				if (!_.isEmpty(filterState)) {
					let newFields =
						filteredColumns !== null
							? _.cloneDeep(filteredColumns)
							: _.cloneDeep(message?.options?.filteredColumns);
					if (message?.options?.filteredColumns?.remove) {
						newFields = newFields?.filter(
							(field) =>
								!message.options.filteredColumns.remove.includes(field.id)
						);
					} else if (message?.options?.filteredColumns?.update) {
						newFields = newFields?.map((field) =>
							message.options.filteredColumns.update[0].id === field.id
								? message.options.filteredColumns.update[0]
								: field
						);
					} else if (message?.options?.filteredColumns?.fields) {
						for (
							let i = 0;
							i < message.options.filteredColumns.fields.length;
							i++
						) {
							const newFiled = message.options.filteredColumns.fields[i];
							let fieldsList = [];
							// Update the fileds
							newFields = newFields?.map((field) => {
								fieldsList.push(field.id);
								if (field.id === newFiled.id) {
									field = newFiled;
								}
								return field;
							});

							// Incase new filed is added
							if (!fieldsList.includes(newFiled.id)) {
								newFields = [...newFields, newFiled];
								// Sort if index is present
								if (newFiled.index) {
									newFields = newFields.sort((a, b) =>
										a.index > b.index ? 1 : b.index > a.index ? -1 : 0
									);
								}
							}
						}
					}
					newOptions.showFilterSearchInput =
						message.options.showFilterSearchInput || false;
					newOptions.isNewFilter = message.options.isNewFilter || false;
					newOptions.activeFilterName = message.options.activeFilterName;
					newOptions.availableFilters = message.options.availableFilters;
					newOptions.filteredColumns = newFields;
				} else {
					newOptions = message.options;
				}
				if (message?.options?.parent) {
					newOptions.parent = message?.options?.parent;
					newOptions.parentTabId = message?.options?.tabId;
				} else {
					newOptions.tabId = message?.options?.tabId;
				}

				break;
			case "updateFilter":
				// Update all filter fields
				let updatedState = { ...filterState };
				let newFields = message.message.fields;
				updatedState.filteredColumns.map((item, i) => {
					newFields.map((newItem) => {
						if (item.id === newItem.id)
							updatedState.filteredColumns[i] = { ...item, ...newItem }
					})
				});
				newOptions.filteredColumns = updatedState.filteredColumns;
				break;
			case "validationFilter":
			case "resultsFilter":
				if (message.options?.filteredColumns?.field) {
					let newFields = _.cloneDeep(
						store.getState().v2.NonConversationalFilter.filteredColumns
					);
					newOptions.filteredColumns = newFields.map((field) => {
						if (field.id === message.options.filteredColumns.field) {
							field.results = message.options.filteredColumns.results;
							field.validationResult =
								message.options.filteredColumns.validationResult;
							field.validationMessage =
								message.options.filteredColumns.validationMessage;
						}
						return field;
					});
				} else {
					newOptions.genericError = message.options.filteredColumns;
					if (!message.options.filteredColumns.validationResult) {
						dispatch(
							showSnackbarV2(
								"error",
								message.options.filteredColumns.validationMessage
							)
						);
					}
				}
				if (message?.options?.parent) {
					newOptions.parent = message?.options?.parent;
					newOptions.parentTabId = message?.options?.tabId;
				} else {
					newOptions.tabId = message?.options?.tabId;
				}
				break;
			default:
				newOptions = message.options;
				if (message?.options?.parent) {
					newOptions.parent = message?.options?.parent;
					newOptions.parentTabId = message?.options?.tabId;
				} else {
					newOptions.tabId = message?.options?.tabId;
				}
				break;
		}
		newOptions.openDrawer = true;
		dispatch({
			type: RENDER_NONCONVERSATIONAL_FILTER,
			data: newOptions,
		});
	};

export const renderNonconversationalFilterFlags = (data) => (dispatch) => {
	dispatch({
		type: RENDER_NONCONVERSATIONAL_FILTER,
		data,
	});
};

export const renderNonconversationalNewFilter = (parentTabId) => (dispatch) => {
	let data = store.getState().v2.NonConversationalFilter || [];
	data.filteredColumns.map((field) => (field.value = ""));
	dispatch({
		type: RENDER_NONCONVERSATIONAL_FILTER,
		data: { ...data, parentTabId: parentTabId },
	});
};
