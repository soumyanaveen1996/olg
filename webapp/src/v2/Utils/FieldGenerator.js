import { useMediaQuery, useTheme, Popper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import ButtonsField from "../Components/Common/FMForm/FormTypes/ButtonsField/ButtonsField";
import CheckboxInput from "../Components/Common/FMForm/FormTypes/CheckboxInput/CheckboxInput";
import DateTimeInput from "../Components/Common/FMForm/FormTypes/DateTimeInput/DateTimeInput";
import FileUploadField from "../Components/Common/FMForm/FormTypes/FileUploadField/FileUploadField";
import LookupInput from "../Components/Common/FMForm/FormTypes/LookupInput/LookupInput";
import RadioInput from "../Components/Common/FMForm/FormTypes/RadioInput/RadioInput";
import SelectInput from "../Components/Common/FMForm/FormTypes/SelectInput/SelectInput";
import SwitchInput from "../Components/Common/FMForm/FormTypes/SwitchInput/SwitchInput";
import TextInput from "../Components/Common/FMForm/FormTypes/TextInput/TextInput";

const PopOverBlock = styled(Popper)(() => ({
	pointerEvents: "none",
	padding: "5px",
	background: "#e5453b",
	color: "white",
	zIndex: 10,
}));

const FieldGenerator = ({ field, options, ...props }) => {
	const theme = useTheme();
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handlePopoverOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handlePopoverClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const largeScreen = useMediaQuery(theme.breakpoints.up("sm"));

	const isBoolean = (val) => "boolean" === typeof val;

	const helperText =
		isBoolean(field.validationResult) && !field.validationResult
			? field.validationMessage
			: field.info;

	if (helperText) {
		field.inline = true;
	}

	let component = null;
	if (!field.hidden) {
		switch (field.type) {
			case "text_field":
			case "number":
			case "text_area":
				component = (
					<TextInput
						{...field}
						readOnly={options?.readOnly ? true : field.readOnly}
						isSmallScreen={!largeScreen}
						islabelvisible
						{...props}
					/>
				);
				break;

			case "radiobutton":
				component = (
					<RadioInput
						{...field}
						readOnly={options?.readOnly ? true : field.readOnly}
						isSmallScreen={!largeScreen}
						{...props}
					/>
				);
				break;

			case "dropdown":
				component = (
					<SelectInput
						{...field}
						readOnly={options?.readOnly ? true : field.readOnly}
						isSmallScreen={!largeScreen}
						islabelvisible
						multiple={false}
						{...props}
					/>
				);
				break;

			case "multi_selection":
				component = (
					<SelectInput
						{...field}
						readOnly={options?.readOnly ? true : field.readOnly}
						isSmallScreen={!largeScreen}
						multiple={true}
						islabelvisible
						{...props}
					/>
				);
				break;

			case "file_field":
				component = (
					<FileUploadField
						{...field}
						{...props}
						readOnly={options?.readOnly ? true : field.readOnly}
						isSmallScreen={!largeScreen}
					/>
				);
				break;

			case "buttons_field":
				component = (
					<ButtonsField
						{...field}
						readOnly={options?.readOnly ? true : field.readOnly}
						isSmallScreen={!largeScreen}
						{...props}
					/>
				);
				break;

			case "switch":
				component = (
					<SwitchInput
						{...field}
						readOnly={options?.readOnly ? true : field.readOnly}
						isSmallScreen={!largeScreen}
						{...props}
					/>
				);
				break;

			case "checkbox":
				component = (
					<CheckboxInput
						{...field}
						readOnly={options?.readOnly ? true : field.readOnly}
						isSmallScreen={!largeScreen}
						{...props}
					/>
				);
				break;

			case "date":
			case "time":
			case "datetime":
				component = (
					<DateTimeInput
						{...field}
						readOnly={options?.readOnly ? true : field.readOnly}
						isSmallScreen={!largeScreen}
						islabelvisible
						{...props}
					/>
				);
				break;

			case "password_field": // TODO
				break;
			case "slider": // TODO
				break;
			case "image_field": // TODO
				break;
			case "lookup":
				component = (
					<LookupInput
						{...field}
						readOnly={options?.readOnly ? true : field.readOnly}
						isSmallScreen={!largeScreen}
						islabelvisible
						{...props}
					/>
				);
				break;
		}
	}

	if (helperText) {
		component = [
			<span
				key="test"
				aria-haspopup="true"
				onMouseEnter={handlePopoverOpen}
				onMouseLeave={handlePopoverClose}
			>
				{component}
			</span>,
			<PopOverBlock
				key="test"
				id={field.index}
				placement="top"
				disablePortal
				open={open}
				anchorEl={anchorEl}
				onClose={handlePopoverClose}
				popperOptions={{
					modifiers: {
						arrow: { enabled: true },
					},
				}}
			>
				<Typography>{helperText}</Typography>
			</PopOverBlock>,
		];
	}

	return component;
};

export default React.memo(FieldGenerator);
