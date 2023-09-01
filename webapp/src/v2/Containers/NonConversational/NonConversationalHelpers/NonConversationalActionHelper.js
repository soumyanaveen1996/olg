import { MessageTypeConstants } from "../../../../Services/Message";
import _ from "lodash";
import { showSnackbarV2 } from "../../../Store/Notification/NotificationAction";
import store from "../../../../State/configureStore";

const updateComponents = (components, message, promptOnClose, isNewRow) => {
	let updatedComponents = components.map((item) => {
		let newItem = { ...item };

		const isMatchingParentDocId =
			newItem?.options?.docId === message?.options?.parentDocId;
		const isMatchingTabId = newItem?.options?.tabId === message?.options?.tabId;

		if (
			(newItem?.options?.docId &&
				message?.options?.parentDocId &&
				isMatchingParentDocId) ||
			message?.options?.parent
		) {
			if (newItem?.options?.tabId && isMatchingTabId) {
				switch (newItem.messageType) {
					case MessageTypeConstants.MESSAGE_TYPE_CONTAINER:
						newItem.message = handleContainerMessageType(
							newItem,
							message,
							false
						);
						break;
				}
				newItem.options.pages = message.options.pages;
			}
			if (promptOnClose !== undefined) {
				newItem.options.promptOnClose = promptOnClose;
			}
		} else {
			if (
				newItem?.options?.tabId &&
				message?.options?.tabId &&
				isMatchingTabId
			) {
				let newFields = message.message.fields;
				const message_sectionId = message?.options?.sectionId;
				const relevantOptions = newItem?.options;
				const item_sectionId = relevantOptions?.sections?.[message_sectionId]?.sectionId;
				const isMatchingSectionId = message_sectionId && item_sectionId && (message_sectionId === item_sectionId);

				switch (newItem.messageType) {
					case MessageTypeConstants.MESSAGE_TYPE_CALENDAR:
						newItem.message = handleCalendarMessageType(
							newItem,
							message,
							newFields
						);
						break;
					case MessageTypeConstants.MESSAGE_TYPE_FORM2:
					case MessageTypeConstants.MESSAGE_TYPE_TABLE:
					case MessageTypeConstants.MESSAGE_TYPE_MAP:
						let rows = isMatchingSectionId ? newItem.message.collectionData[message_sectionId].rows : newItem.message;
						rows = handleOtherMessageTypes(rows, message);
						if (isMatchingSectionId) {
							newItem = {
								...newItem,
								message: {
									...newItem.message,
									collectionData: {
										...newItem.message.collectionData,
										[message_sectionId]: {
											...newItem.message.collectionData[message_sectionId],
											rows: rows
										}
									}
								}
							};
						} else {
							newItem = {
								...newItem,
								message: [...rows]
							};
						}
						break;
					case MessageTypeConstants.MESSAGE_TYPE_CONTAINER: {
						if (
							!isNewRow &&
							message?.options?.parent === null &&
							!message?.message?.hasOwnProperty("append")
						) {
							switch (newItem.messageType) {
								case MessageTypeConstants.MESSAGE_TYPE_CONTAINER:
									newItem.message = handleContainerMessageType(
										newItem,
										message,
										true
									);
									break;
							}
						}
					}
				}
				if (promptOnClose !== undefined) {
					newItem.options.promptOnClose = promptOnClose;
				}
				newItem.options.pages = message.options.pages;
			}
		}
		return newItem;
	});
	return updatedComponents;
};

export const handleMessageTypeTableChangeAction = (
	NonConversationalData,
	message,
	promptOnClose,
	isNewRow
) => {
	if (
		NonConversationalData &&
		!_.isEmpty(NonConversationalData) &&
		!_.isEmpty(NonConversationalData.components)
	) {

		const updatedComponents = updateComponents(
			NonConversationalData.components,
			message,
			promptOnClose,
			isNewRow
		);
		let updatedNonConversationalData = {
			...NonConversationalData,
			components: updatedComponents,
		};
		return updatedNonConversationalData;
	}
	return NonConversationalData;
};

const handleContainerMessageType = (item, message, flag) => {
	const updatedMessages = item.message.map((msg) => {
		let condition;
		if (flag) {
			condition = message?.options &&
				msg?.message?.options?.documentId === message?.options?.formId;
		} else {
			condition = message?.options &&
				msg?.message?.options?.tableId === message?.options?.tableId;
		}

		const message_sectionId = message?.options?.sectionId;
		const item_sectionId = msg?.message?.options?.sections?.[message_sectionId]?.sectionId;
		const isMatchingSectionId = message_sectionId && item_sectionId && (message_sectionId === item_sectionId);

		if (condition || isMatchingSectionId) {
			let rows, updatedRows;
			if (isMatchingSectionId) {
				rows = msg.message.collectionData[message_sectionId].rows;
				updatedRows = handleOtherMessageTypes(rows, message);
				return {
					...msg,
					message: {
						...msg.message,
						collectionData: {
							...msg.message.collectionData,
							[message_sectionId]: {
								...msg.message.collectionData[message_sectionId],
								rows: updatedRows
							}
						},
						options: {
							...msg.message.options,
							pages: message.options.pages
						}
					}
				};
			} else {
				rows = msg.message.rows;
				updatedRows = handleOtherMessageTypes(rows, message);
				return {
					...msg,
					message: {
						...msg.message,
						rows: updatedRows,
						options: {
							...msg.message.options,
							pages: message.options.pages
						}
					}
				};
			}
		}

		return msg;
	});
	return updatedMessages;
};


const handleCalendarMessageType = (item, message, newFields) => {
	if (message?.message?.update) {
		newFields = message?.message?.update;
	} else if (message?.message?.append) {
		newFields = item.message.concat(message.message.append);
	} else if (message?.message?.fields) {
		newFields = message?.message?.fields;
	}
	item.options.view = item.options.view || message?.options?.view || "month";
	item.options.style =
		item.options.style || message?.options?.style || "calendar";
	item.options.openDrawer = item.options.openDrawer || false;
	item.options.showFilterSearchInput =
		item.options.showFilterSearchInput || false;
	item.options.isNewFilter = item.options.isNewFilter || false;
	return newFields;
};

const handleOtherMessageTypes = (rows, message) => {
	let updatedRows;
	if (message?.message?.deleteRow) {
		updatedRows = rows?.filter(
			(row) => !message.message.deleteRow.includes(Object.keys(row)[0])
		);
	} else if (message?.message?.update) {
		updatedRows = message.message.update;
	} else if (message?.message?.remove) {
		updatedRows = removeFieldsFromRows(rows, message);
	} else if (message?.message?.append) {
		updatedRows = rows.concat(message.message.append);
	} else if (message?.message?.fields) {
		updatedRows = updateMessageFields(rows, message);
	} else {
		updatedRows = rows;
	}
	return updatedRows;
};

const removeFieldsFromRows = (rows, message) => {
	let updatedRows = [];

	rows.forEach(([docId, rowValue]) => {
		if (docId === message.options.docId) {
			let updatedRowValue = rowValue.filter(
				(field) => !message.message.remove.includes(field.id)
			);
			updatedRows.push({ [docId]: updatedRowValue });
		} else {
			updatedRows.push({ [docId]: rowValue });
		}
	});

	return updatedRows;
};

const updateMessageFields = (rows, message) => {
	let updatedMessage = [];

	rows.forEach((row) => {
		// let updatedRow = [];

		Object.entries(row).forEach(([docId, rowValue]) => {
			if (
				message?.options?.docId &&
				docId &&
				message?.options?.docId === docId
			) {
				const updatedRowValue = updateRowFields(rowValue, message);
				updatedMessage.push({ [docId]: updatedRowValue });
			} else {
				updatedMessage.push({ [docId]: rowValue });
			}
		});

		// updatedMessage.push(updatedRow);
	});

	return updatedMessage;
};

const updateRowFields = (rowValue, message) => {
	let fieldsList = [];
	let updatedFields = [];

	rowValue.fields.forEach((field) => {
		fieldsList.push(field.id);

		const newField = message.message.fields.find((f) => f.id === field.id);
		if (newField) {
			updatedFields.push(newField);
		} else {
			updatedFields.push(field);
		}
	});

	const finalFields = addNewFields(updatedFields, message, fieldsList);
	let rowOptionsFromMessage = message?.options?.rowOptions && message?.options?.action == "change" ? message?.options?.rowOptions : rowValue.rowOptions
	return {
		...rowValue,
		fields: finalFields,
		rowOptions: rowOptionsFromMessage
	};
};

const addNewFields = (fields, message, fieldsList) => {
	let newFields = [];

	message.message.fields.forEach((newField) => {
		if (!fieldsList.includes(newField.id)) {
			newFields.push(newField);
		}
	});

	newFields = newFields.concat(fields);

	if (newFields.find((field) => field.index)) {
		newFields.sort((a, b) =>
			a.index > b.index ? 1 : b.index > a.index ? -1 : 0
		);
	}

	return newFields;
};

export const handleMessageTypeInlineFormTableResultAction = (
	NonConversationalData,
	message,
	promptOnClose
) => {
	if (
		NonConversationalData &&
		!_.isEmpty(NonConversationalData) &&
		!_.isEmpty(NonConversationalData.components)
	) {
		// Create a new array of components by mapping through the original components array
		const updatedComponents = NonConversationalData.components.map((item) => {
			if (
				item?.options?.docId &&
				message?.options?.parentDocId &&
				item?.options?.docId === message?.options?.parentDocId
			) {
				// Return a new item object returned by the function instead of modifying the existing item object
				return processMessageWithParent(item, message, promptOnClose);
			} else {
				// Return a new item object returned by the function instead of modifying the existing item object
				return processMessageWithoutParent(item, message, promptOnClose);
			}
		});

		// Return a new object with updated components, preserving other properties of NonConversationalData
		return {
			...NonConversationalData,
			components: updatedComponents
		};
	}
	// If the conditions aren't met, return the original object
	return NonConversationalData;
};

export const processMessageWithParent = (item, message, promptOnClose) => {
	let updatedItem = { ...item }; // Create a shallow copy of the item

	if (message.message.field) {
		if (Array.isArray(item.message)) {
			updatedItem.message = item.message.map((msg) => {
				let updatedMsg = { ...msg };
				let sectionId = message?.options?.sectionId;
				let sectionCollectionData = msg?.message?.collectionData?.[sectionId];

				if (msg?.message?.options?.tableId === message?.options?.tableId) {
					updatedMsg.message.rows = processRows(msg.message.rows, message);
				} else if (sectionId && sectionCollectionData != null) {
					let rows = sectionCollectionData?.rows;
					if (Array.isArray(rows)) {
						let updatedRows = processRows(rows, message);
						updatedMsg.message = {
							...updatedMsg.message,
							collectionData: {
								...updatedMsg.message.collectionData,
								[sectionId]: {
									...sectionCollectionData,
									rows: updatedRows
								}
							}
						};
					}
				}

				return updatedMsg;
			});
		}
	} else {
		updatedItem = processGenericError(updatedItem, message);
	}

	updatedItem = setPromptOnClose(updatedItem, promptOnClose);

	return updatedItem;
};

export const processMessageWithoutParent = (item, message, promptOnClose) => {
	let updatedItem = { ...item }; // Create a shallow copy of the item

	if (message.message.field) {
		let sectionId = message?.options?.sectionId;
		let sectionCollectionData = item?.message?.collectionData?.[sectionId];

		if (item?.options?.tableId === message?.options?.tableId) {
			Array.isArray(item.message) && (updatedItem.message = processRows(item.message, message));
		} else if (sectionId && sectionCollectionData != null) {
			let rows = sectionCollectionData?.rows;
			if (Array.isArray(rows)) {
				let updatedRows = processRows(rows, message);
				// Deep copy to ensure immutability at all levels of nested objects
				updatedItem.message = {
					...updatedItem.message,
					collectionData: {
						...updatedItem.message.collectionData,
						[sectionId]: {
							...sectionCollectionData,
							rows: updatedRows
						}
					}
				};
			}
		}
	} else {
		updatedItem = processGenericError(updatedItem, message);
	}

	updatedItem = setPromptOnClose(updatedItem, promptOnClose);

	return updatedItem;
};

const updateField = (field, message) => {
	if (field.id === message?.message?.field) {
		return {
			...field,
			results: message?.message?.results,
			validationResult: message?.message?.validationResult,
			validationMessage: message?.message?.validationMessage,
		};
	}
	return field;
};


const processRows = (rows, message) => {
	let updatedRows = rows.map((row) => {
		let updatedRow = {};
		Object.entries(row).forEach(([docId, fieldsObject]) => {
			if (message?.options?.docId === docId) {
				updatedRow[docId] = {
					...fieldsObject,
					fields: fieldsObject.fields.map((field) => {
						return updateField(field, message);
					}),
				};
			} else {
				updatedRow[docId] = fieldsObject;
			}
		});
		return updatedRow;
	});

	return updatedRows;
};

const processGenericError = (item, message) => {
	const updatedItem = {
		...item,
		genericError: message.message,
	};

	if (!message.message.validationResult) {
		store.dispatch(
			showSnackbarV2("error", message.message.validationMessage)
		);
	}

	return updatedItem;
};


const setPromptOnClose = (item, promptOnClose) => {
	if (promptOnClose !== undefined) {
		return {
			...item,
			options: {
				...item.options,
				promptOnClose: promptOnClose
			}
		};
	}
	return item;
};

export const handleMessageTypeTableChangeColumnTemplate = (
	NonConversationalData,
	message,
	promptOnClose
) => {
	if (
		NonConversationalData &&
		!_.isEmpty(NonConversationalData) &&
		!_.isEmpty(NonConversationalData.components)
	) {
		const updatedComponents = NonConversationalData.components.map((item) => {
			let updatedItem = { ...item };

			if (
				updatedItem?.options?.docId &&
				message?.options?.parentDocId &&
				updatedItem?.options?.docId === message?.options?.parentDocId
			) {
				if (
					updatedItem?.options?.tabId &&
					updatedItem?.options?.tabId === message?.options?.tabId
				) {
					switch (updatedItem.messageType) {
						case MessageTypeConstants.MESSAGE_TYPE_CONTAINER:
							updatedItem.message = updatedItem.message.map((msg) => {
								if (
									message?.options &&
									msg?.message?.options?.tableId === message?.options?.tableId
								) {
									if (message.options.columnTemplate) {
										return {
											...msg,
											message: {
												...msg.message,
												options: {
													...msg.message.options,
													columnTemplate: message.options.columnTemplate,
												},
											},
										};
									}
								}
								return msg;
							});
							break;
					}
				}

				if (promptOnClose !== undefined) {
					updatedItem = {
						...updatedItem,
						options: {
							...updatedItem.options,
							promptOnClose: promptOnClose
						}
					};
				}
			} else {
				if (
					updatedItem?.options?.tabId &&
					message?.options?.tabId &&
					updatedItem?.options?.tabId === message?.options?.tabId
				) {
					switch (updatedItem.messageType) {
						case MessageTypeConstants.MESSAGE_TYPE_CALENDAR:
						case MessageTypeConstants.MESSAGE_TYPE_FORM2:
						case MessageTypeConstants.MESSAGE_TYPE_TABLE:
							if (message.options.columnTemplate) {
								updatedItem = {
									...updatedItem,
									options: {
										...updatedItem.options,
										columnTemplate: message.options.columnTemplate,
									},
								};
							}
							break;
					}

					if (promptOnClose !== undefined) {
						updatedItem = {
							...updatedItem,
							options: {
								...updatedItem.options,
								promptOnClose: promptOnClose
							}
						};
					}
				}
			}
			return updatedItem;
		});

		const updatedNonConversationalData = {
			...NonConversationalData,
			components: updatedComponents,
		};

		return updatedNonConversationalData;
	}

	return NonConversationalData;
};

export const handleMessageTypeForm2ChangeActionWithParent = (nonConversationalData, message, promptOnClose) => {
	const updatedComponents = nonConversationalData.components.map((item) => {
		if (item?.options?.tabId !== message?.options?.tabId) {
			return item;
		}

		if (item.messageType !== MessageTypeConstants.MESSAGE_TYPE_CONTAINER) {
			return {
				...item,
				options: {
					...item.options,
					promptOnClose: promptOnClose !== undefined ? promptOnClose : item.options.promptOnClose,
				},
			};
		}

		const updatedMessage = item.message.map((msg) => {
			if (msg?.message?.options?.formId !== message?.options?.formId) {
				return msg;
			}

			const fields = msg.message.fields || [];

			if (message?.message?.remove) {
				return {
					...msg,
					message: {
						...msg.message,
						fields: fields.filter((field) => !message.message.remove.includes(field.id)),
					},
				};
			}

			if (message?.message?.update) {
				return {
					...msg,
					message: {
						...msg.message,
						fields: fields.map((field) =>
							field.id === message.message.update.id ? message.message.update : field
						),
					},
				};
			}

			if (message?.message?.fields) {
				let updatedFields = [...fields];
				message.message.fields.forEach(newField => {
					const existingFieldIndex = updatedFields.findIndex(field => field.id === newField.id);
					if (existingFieldIndex === -1) {
						updatedFields.push(newField);
					} else {
						updatedFields[existingFieldIndex] = newField;
					}
				});
				if (message.message.fields.some(field => field.index)) {
					updatedFields.sort((a, b) => (a.index > b.index ? 1 : b.index > a.index ? -1 : 0));
				}


				return {
					...msg,
					message: {
						...msg.message,
						fields: updatedFields,
						options: { ...msg.message.options, ...message.options },
					},
				};
			}

			return msg;
		});

		return {
			...item,
			message: updatedMessage,
			options: {
				...item.options,
				promptOnClose: promptOnClose !== undefined ? promptOnClose : item.options.promptOnClose,
			},
		};
	});

	return {
		...nonConversationalData,
		components: updatedComponents,
	};
}

export const handleMessageTypeForm2ChangeActionWithoutParent = (nonConversationalData, message, promptOnClose) => {
	const updatedComponents = nonConversationalData.components.map((item) => {
		if (!item?.options?.tabId || !message?.options?.tabId || item?.options?.tabId !== message?.options?.tabId) {
			return item;
		}

		if (item.messageType !== MessageTypeConstants.MESSAGE_TYPE_FORM2) {
			return {
				...item,
				options: {
					...item.options,
					promptOnClose: promptOnClose !== undefined ? promptOnClose : item.options.promptOnClose,
				},
			};
		}

		let newFields = message?.message?.fields;

		if (message?.message?.update) {
			newFields = message?.message?.update;
		} else if (message?.message?.fields) {
			newFields = message?.message?.fields;
		}
		let originalFields;
		let isMessageArray = true;
		if (Object.prototype.toString.call(item.message) === '[object Array]') {
			originalFields = item.message;
		} else if (Object.prototype.toString.call(item.message) === '[object Object]') {
			originalFields = item.message.fields;
			isMessageArray = false;
		}
		let updatedFields = [...(originalFields || [])];

		newFields.forEach((newField) => {
			const existingFieldIndex = updatedFields.findIndex((field) => field.id === newField.id);
			if (existingFieldIndex === -1) {
				updatedFields.push(newField);
			} else {
				updatedFields[existingFieldIndex] = newField;
			}
		});

		if (newFields.some((field) => field.index)) {
			updatedFields.sort((a, b) => (a.index > b.index ? 1 : b.index > a.index ? -1 : 0));
		}

		let updatedItem;

		if (isMessageArray) {
			updatedItem = {
				...item,
				message: updatedFields,
				options: {
					...item.options,
					promptOnClose: promptOnClose !== undefined ? promptOnClose : item.options.promptOnClose,
				},
			};
		} else {
			updatedItem = {
				...item,
				message: { ...item.message, fields: updatedFields },
				options: {
					...item.options,
					promptOnClose: promptOnClose !== undefined ? promptOnClose : item.options.promptOnClose,
				},
			};
		}

		return updatedItem;
	});

	return {
		...nonConversationalData,
		components: updatedComponents,
	};
}

export const handleForm2PromptOnCloseAction = (nonConversationalData, promptOnClose) => {

	const updatedComponents = nonConversationalData.components.map((item) => {
		return {
			...item,
			options: {
				...item.options,
				promptOnClose,
			},
		};
	});

	return {
		...nonConversationalData,
		components: updatedComponents,
	};
}

export const handleMessageTypeForm2ChangeAction = (nonConversationalData, message, promptOnClose) => {
	if (
		nonConversationalData &&
		!_.isEmpty(nonConversationalData) &&
		!_.isEmpty(nonConversationalData.components)
	) {
		if (message?.options?.parent) {
			nonConversationalData = handleMessageTypeForm2ChangeActionWithParent(nonConversationalData, message, promptOnClose);
		} else {
			nonConversationalData = handleMessageTypeForm2ChangeActionWithoutParent(nonConversationalData, message, promptOnClose);
		}
	}
	return nonConversationalData;
}

export const handleMessageTypeForm2ResultActionWithParent = (nonConversationalData, message, promptOnClose) => {
	const updatedComponents = nonConversationalData.components.map((item) => {
		if (!item?.options?.controlId || !message?.options?.controlId || item?.options?.controlId !== message?.options?.parent) {
			return item;
		}

		const updatedMessage = item.message.map((msg) => {
			if (msg?.message?.options?.controlId !== message?.options?.controlId) {
				return msg;
			}

			const updatedFields = msg.message.fields.map((field) => {
				if (field.id !== message.message.field) {
					return field;
				}

				return {
					...field,
					results: message.message.results,
					validationResult: message.message.validationResult,
					validationMessage: message.message.validationMessage,
				};
			});

			return {
				...msg,
				message: {
					...msg.message,
					fields: updatedFields,
				},
			};
		});

		return {
			...item,
			message: updatedMessage,
			options: {
				...item.options,
				promptOnClose: promptOnClose !== undefined ? promptOnClose : item.options.promptOnClose,
			},
		};
	});

	return {
		...nonConversationalData,
		components: updatedComponents,
	};
};

export const handleMessageTypeForm2ResultActionWithoutParent = (nonConversationalData, message, promptOnClose) => {
	const updatedComponents = nonConversationalData.components.map((item) => {
		if (!item?.options?.controlId || !message?.options?.controlId || item?.options?.controlId !== message?.options?.controlId) {
			return item;
		}

		if (item.messageType !== MessageTypeConstants.MESSAGE_TYPE_FORM2) {
			return {
				...item,
				options: {
					...item.options,
					promptOnClose: promptOnClose !== undefined ? promptOnClose : item.options.promptOnClose,
				},
			};
		}

		let originalFields;
		let isMessageArray = true;
		if (Object.prototype.toString.call(item.message) === '[object Array]') {
			originalFields = item.message;
		} else if (Object.prototype.toString.call(item.message) === '[object Object]') {
			originalFields = item.message.fields;
			isMessageArray = false;
		}

		let updatedFields = [...(originalFields || [])];
		let updatedGenericError = item.genericError;

		if (message.message.field) {
			updatedFields = updatedFields.map((field) => {
				if (field.id !== message.message.field) {
					return field;
				}

				return {
					...field,
					results: message.message.results,
					validationResult: message.message.validationResult,
					validationMessage: message.message.validationMessage,
				};
			});
		} else {
			updatedGenericError = message.message;
			if (!message.message.validationResult) {
				store.dispatch(
					showSnackbarV2("error", message.message.validationMessage)
				);
			}
		}


		let updatedItem;

		if (isMessageArray) {
			updatedItem = {
				...item,
				message: updatedFields,
				genericError: updatedGenericError,
				options: {
					...item.options,
					promptOnClose: promptOnClose !== undefined ? promptOnClose : item.options.promptOnClose,
				},
			};
		} else {
			updatedItem = {
				...item,
				message: { ...item.message, fields: updatedFields },
				genericError: updatedGenericError,
				options: {
					...item.options,
					promptOnClose: promptOnClose !== undefined ? promptOnClose : item.options.promptOnClose,
				},
			};
		}

		return updatedItem;
	});

	return {
		...nonConversationalData,
		components: updatedComponents,
	};
};

export const handleMessageTypeForm2ResultAction = (NonConversationalData, message, promptOnClose) => {
	if (
		NonConversationalData &&
		!_.isEmpty(NonConversationalData) &&
		!_.isEmpty(NonConversationalData.components)
	) {
		if (message?.options?.parent) {
			NonConversationalData = handleMessageTypeForm2ResultActionWithParent(NonConversationalData, message, promptOnClose);
		} else {
			NonConversationalData = handleMessageTypeForm2ResultActionWithoutParent(NonConversationalData, message, promptOnClose);
		}
	}
	return NonConversationalData;
};

