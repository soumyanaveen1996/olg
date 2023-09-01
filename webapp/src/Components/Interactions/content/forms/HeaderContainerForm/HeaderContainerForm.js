import React, { useState, useEffect } from "react";
import styles from "./HeaderContainerForm.module.css";
import "./HeaderContainerForm.module.css";
import { getFormFieldElement } from "../Utils";
import cx from "classnames";
import _ from "lodash";
import { MessageTypeConstants } from "../../../../../Services/Message";

const HeaderContainerForm = (props) => {
	let {
		sendMessage,
		options: { keys, controlId },
	} = props;

	const [fields, updateFields] = useState(keys);

	const renderElement = ({ index, readOnly = false, field, action }) => {
		return getFormFieldElement(
			index,
			readOnly,
			null,
			field,
			action,
			false,
			() => {
				onBlurFormField(field);
			},
			doDataLookUp,
			clearLookUpResults
		);
	};

	const onBlurFormField = (field) => {
		console.log("on blur", field);
		if (field.type === "dropdown" || field.type === "select") {
			return;
		}
		sendMessageOnBlur(field);
	};

	const handleInputChange = (index, value) => {
		let newFields = _.cloneDeep(fields);
		newFields[index].value = value;
		updateFields(newFields);
		if (
			newFields[index].type === "dropdown" ||
			newFields[index].type === "select"
		) {
			sendMessageOnBlur(newFields[index]);
		}
	};

	const doDataLookUp = (fieldId, fieldValue) => {
		let responseChat = {};
		responseChat.messageType =
			MessageTypeConstants.MESSAGE_TYPE_CONTAINER_RESPONSE;
		responseChat.message = {
			controlId: controlId,
			action: "search",
			currentField: fieldId,
			content: { currentFieldValue: fieldValue },
		};
		console.log("doDataLookUp =====", responseChat);
		sendMessage(responseChat, true);
	};

	const clearLookUpResults = (element) => {
		let fields = _.cloneDeep(fields);
		console.log("clearLookUpResults ====", fields, element);
		for (let i = 0; i < fields.length; i++) {
			let currentField = fields[i];
			if (currentField.id === element.id) {
				currentField.results = null;
				break;
			}
		}
		updateFields(fields);
	};

	const sendMessageOnBlur = (field) => {
		let responseChat = {};
		responseChat.messageType =
			MessageTypeConstants.MESSAGE_TYPE_CONTAINER_RESPONSE;
		responseChat.message = {
			action: "move",
			currentField: field.id,
			content: { currentFieldValue: field.value || "" },
			controlId: controlId,
		};
		console.log("get the options sendMessageOnBlur", responseChat);
		sendMessage(responseChat, null);
	};

	return (
		<div
			className={cx(
				styles.card_conatiner,
				"card-body p-0 py-1 d-flex justify-content-center align-items-center flex-column"
			)}
		>
			<form
				className={cx(
					styles.form_styling,
					"p-0 d-flex flex-row align-items-center flex-wrap"
				)}
			>
				{fields.map((field, index) => {
					let readOnly = field.readOnly;
					return (
						<div
							className={cx(
								styles.custom_field_container,
								"custom_field_container"
							)}
							key={index}
							id="dropDownConatiner"
						>
							{renderElement({
								index,
								readOnly,
								props,
								field,
								action: (value) => {
									handleInputChange(index, value);
								},
							})}
						</div>
					);
				})}
			</form>
		</div>
	);
};

export default HeaderContainerForm;
