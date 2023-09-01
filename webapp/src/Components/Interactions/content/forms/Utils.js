import React from "react";
import TextField from "./Elements/TextField";
import NumberField from "./Elements/NumberField";
import TextArea from "./Elements/TextArea";
import DropDown from "./Elements/DropDown";
import Password from "./Elements/Password";
import SwitchField from "./Elements/SwitchField";
import SliderField from "./Elements/SliderField";
import CheckBoxField from "./Elements/CheckBoxField";
import MultiSelect from "./Elements/MultiSelect";
import RadioField from "./Elements/RadioField";
import LookUpField from "./Elements/LookUpField";
import DateTimeField from "./Elements/DateTimeField";
import DateField from "./Elements/DateField";
import TimeField from "./Elements/TimeField";
import UploadImage from "./Elements/UploadImage";
import FileUpload from "./Elements/FileUpload";
import ButtonsField from "./Elements/ButtonsField";
import _ from "lodash";

export function isFormCompleted(chat, background) {
	if (background && !_.isEmpty(background)) {
		return false;
	} else
		return (
			chat.completed || (chat.options && chat.options.stage === "COMPLETED")
		);
}

export function getFormFieldElement(
	fieldIndex,
	isReadOnly = false,
	chat,
	field,
	action,
	completed,
	onBlurField,
	doDataLookUp,
	clearLookUpResults,
	type
) {
	if (!field.hidden) {
		switch (field.type) {
			case "title":
				// return <span className="d-block title">{field.title}</span>;
				return null;

			case "text_field":
				return (
					<TextField
						isReadOnly={isReadOnly}
						key={field.id}
						chat={chat}
						element={field}
						action={action}
						completed={completed}
						onBlurField={onBlurField}
						type={type}
						fieldIndex={fieldIndex}
					/>
				);

			case "lookup":
				return (
					<LookUpField
						isReadOnly={isReadOnly}
						key={field.id}
						element={field}
						action={action}
						completed={completed}
						onBlurField={onBlurField}
						doDataLookUp={doDataLookUp}
						clearLookUpResults={clearLookUpResults}
						fieldIndex={fieldIndex}
					/>
				);

			case "number":
			case "number_field":
				return (
					<NumberField
						key={field.id}
						isReadOnly={isReadOnly}
						element={field}
						action={action}
						completed={completed}
						onBlurField={onBlurField}
						fieldIndex={fieldIndex}
					/>
				);

			case "text_area":
				return (
					<TextArea
						key={field.id}
						isReadOnly={isReadOnly}
						element={field}
						action={action}
						completed={completed}
						onBlurField={onBlurField}
						fieldIndex={fieldIndex}
					/>
				);

			case "select":
			case "dropdown":
				return (
					<DropDown
						key={field.id}
						isReadOnly={isReadOnly}
						chat={chat}
						element={field}
						action={action}
						completed={completed}
						onBlurField={onBlurField}
						fieldIndex={fieldIndex}
					/>
				);

			case "password_field":
				return (
					<Password
						key={field.id}
						isReadOnly={isReadOnly}
						element={field}
						action={action}
						completed={completed}
						onBlurField={onBlurField}
						fieldIndex={fieldIndex}
					/>
				);

			case "checkbox":
				return (
					<CheckBoxField
						key={field.id}
						isReadOnly={isReadOnly}
						element={field}
						action={action}
						completed={completed}
						onBlurField={onBlurField}
						fieldIndex={fieldIndex}
					/>
				);

			case "radiobutton":
				return (
					<RadioField
						key={field.id}
						isReadOnly={isReadOnly}
						element={field}
						action={action}
						completed={completed}
						onBlurField={onBlurField}
						fieldIndex={fieldIndex}
					/>
				);

			case "switch":
				return (
					<SwitchField
						key={field.id}
						isReadOnly={isReadOnly}
						element={field}
						action={action}
						completed={completed}
						onBlurField={onBlurField}
						fieldIndex={fieldIndex}
					/>
				);

			case "slider":
				return (
					<SliderField
						key={field.id}
						isReadOnly={isReadOnly}
						element={field}
						action={action}
						completed={completed}
						onBlurField={onBlurField}
						fieldIndex={fieldIndex}
					/>
				);

			case "date":
				return (
					<DateField
						key={field.id}
						isReadOnly={isReadOnly}
						element={field}
						action={action}
						completed={completed}
						onBlurField={onBlurField}
						fieldIndex={fieldIndex}
					/>
				);

			case "datetime":
				return (
					<DateTimeField
						key={field.id}
						isReadOnly={isReadOnly}
						element={field}
						action={action}
						completed={completed}
						onBlurField={onBlurField}
						fieldIndex={fieldIndex}
					/>
				);

			case "time":
				return (
					<TimeField
						key={field.id}
						isReadOnly={isReadOnly}
						element={field}
						action={action}
						completed={completed}
						onBlurField={onBlurField}
						fieldIndex={fieldIndex}
					/>
				);

			case "multi_selection":
				return (
					<MultiSelect
						key={field.id}
						isReadOnly={isReadOnly}
						element={field}
						action={action}
						completed={completed}
						onBlurField={onBlurField}
						fieldIndex={fieldIndex}
					/>
				);
			case "image_field":
				return (
					<UploadImage
						key={field.id}
						isReadOnly={isReadOnly}
						element={field}
						action={action}
						completed={completed}
						onBlurField={onBlurField}
						fieldIndex={fieldIndex}
					/>
				);
			case "file_field":
				return (
					<FileUpload
						key={field.id}
						isReadOnly={isReadOnly}
						element={field}
						action={action}
						completed={completed}
						onBlurField={onBlurField}
						fieldIndex={fieldIndex}
					/>
				);
			case "buttons_field":
				return (
					<ButtonsField
						key={field.id}
						isReadOnly={isReadOnly}
						element={field}
						action={action}
						completed={completed}
						onBlurField={onBlurField}
						fieldIndex={fieldIndex}
					/>
				);

			case "button":
				return null;

			default:
				return <div key="notImplemented">Not Implemented</div>;
		}
	}
	return null;
}

export function getFormTitle(data, options) {
	if (options && options.title) {
		return options.title;
	} else {
		if (Array.isArray(data)) {
			let el = data.filter((formElement) => formElement.type === "title");
			if (el && el[0]) {
				return el[0].title;
			}
			return null;
		}
	}
}

export function getFormDescription(data, options) {
	if (options && options.description) {
		return options.description;
	} else {
		return null;
	}
}

export function getFormFields(data, type) {
	if (Array.isArray(data)) {
		return data.filter(
			(formElement) =>
				formElement.type !== "title" && formElement.type !== "button"
		);
	} else {
		if (data.fields) {
			let { fields } = data;
			return fields;
		} else return data;
	}
}

export function getConfirmButtonName(data, options) {
	// console.log("confirm button ", data, options);

	if (options && options.confirm) {
		return options.confirm;
	} else {
		if (Array.isArray(data)) {
			let button = data.filter((formElement) => formElement.type === "button");
			if (button && button[0]) {
				return button[0].title;
			} else {
				return null;
			}
		}
	}
}

export function getCancelButtonName(data, options) {
	if (options && options.cancel) {
		return options.cancel;
	} else {
		return null;
	}
}
