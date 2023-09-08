import React from "react";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import moment from "moment-timezone";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DatePicker } from "@mui/x-date-pickers";

import { getAuthData } from "../../../../../../Services/StorageService";

const CssTextField = styled(TextField)({
	width: "100%",
	"& .MuiFormHelperText-root": {
		color: "#e5453b !important",
	},
	"& label": {
		fontSize: 14,
		color: "#2c2f44",
		fontFamily: "SF Pro Text Light",
		textTransform: "inherit",
	},
	"& label.MuiInputLabel-shrink": {
		fontSize: "1rem",
	},
	"& label.Mui-focused": {
		color: "#638dff",
	},
	"& .MuiInput-underline:after": {
		borderBottomColor: "green",
	},
	"& .MuiOutlinedInput-root": {
		"& fieldset": {
			borderColor: "#c4d8ff",
		},
		"&:hover fieldset": {
			borderColor: "#92afff",
		},
		"&.Mui-disabled": {
			backgroundColor: "#f4f7fb !important",
			"& fieldset": {
				borderColor: "#c4d8ff",
			},
		},
		"&.Mui-error": {
			"& fieldset": {
				borderColor: "#f2a29d !important",
			},
		},
		"&.Mui-focused fieldset": {
			borderColor: "#638dff",
		},
		"& .MuiOutlinedInput-input": {
			padding: "8.5px 14px",
		},
		"& .MuiOutlinedInput-input.Mui-disabled": {
			color: "#44485a",
			"-webkit-text-fill-color": "#44485a",
		},
		"& .MuiIconButton-root": {
			color: "#638dff",
		},
		fontSize: 14,
		fontFamily: "SF Pro Text Regular",
	},
	"& .MuiInputLabel-asterisk": {
		color: "#e5453b",
	},
	"& div": {
		background: "#FFFFFF",
	},
});

const CssTextFieldDateTime = styled(TextField)(
	{
		width: "100%",
		"& .MuiFormHelperText-root": {
			color: "#e5453b !important",
		},
		"& label": {
			fontSize: 14,
			color: "#2c2f44",
			fontFamily: "SF Pro Text Light",
		},
		"& label.MuiInputLabel-shrink": {
			fontSize: "1rem",
			backgroundColor: "white",
		},
		"& label.Mui-focused": {
			color: "#638dff",
		},
		"& .MuiInput-underline:after": {
			borderBottomColor: "green",
		},
		"& .MuiOutlinedInput-root": {
			"& fieldset": {
				borderColor: "#c4d8ff",
			},
			"&:hover fieldset": {
				borderColor: "#92afff",
			},
			"&.Mui-disabled": {
				backgroundColor: "#f4f7fb !important",
				"& fieldset": {
					borderColor: "#c4d8ff",
				},
			},
			"&.Mui-error": {
				"& fieldset": {
					// borderColor: "#f2a29d !important",
					borderColor: "#e5453b !important",
				},
			},

			"&.Mui-focused fieldset": {
				borderColor: "#638dff",
			},
			"& .MuiOutlinedInput-input": {
				padding: "8.5px 14px",
			},
			"& .MuiOutlinedInput-input.Mui-disabled": {
				color: "#44485a",
				"-webkit-text-fill-color": "#44485a",
			},
			"& .MuiIconButton-root": {
				color: "#638dff",
			},
			fontSize: 14,
			fontFamily: "SF Pro Text Regular",
		},
		"& .MuiInputLabel-asterisk": {
			color: "#e5453b",
		},
		"& div": {
			background: "#FFFFFF",
		},
	},
	(props) =>
		props.islabelvisible && {
			"& .MuiOutlinedInput-root": {
				"& .MuiOutlinedInput-input": {
					width: "auto",
				},
			},
		}
);

const DateTimeInput = (props) => {
	const [validDate, setValidDate] = React.useState(true)
	const {
		id,
		info,
		readOnly,
		type,
		value,
		handleChangeDateTime,
		handleBlurDateTime,
		handleBlurTime,
		handleChangeTime,
		mandatory,
		onBlurField,
		placeholder,
		maxLength,
		minLength,
		disableFormSubmit,
		// validation,
		isSections,
		// validationResult,
		// validationMessage,
		isSmallScreen,
		title,
		islabelvisible,
	} = props;
	let { validation, validationMessage, validationResult } = props;
	const isBoolean = (val) => "boolean" === typeof val;
	const {
		user: { userTimezone },
	} = getAuthData();
	const defaultUserTimezone = "Etc/UTC";
	moment.tz.setDefault(userTimezone || defaultUserTimezone);

	switch (type) {
		case "date":
			return (
				<DatePicker
					// inputFormat="YYYY-MM-DD"
					inputFormat="DD-MM-YYYY"
					label={!islabelvisible ? title : null}
					disabled={readOnly}
					value={
						value
							? moment(value)
								.tz(userTimezone || defaultUserTimezone)
								.format("YYYY-MM-DD")
							: null
					}
					onAccept={(newValue) => {
						if (newValue) {
							const formattedValue = newValue.format("YYYY-MM-DD");
							handleBlurDateTime(formattedValue, id);
						}
					}}
					onChange={(newValue) => {
						if (!validDate) setValidDate(true)
						const dateValue = new Date(newValue).toString() === "Invalid Date";
						if (dateValue) {
							return;
						}
						const formattedValue = newValue?.format("YYYY-MM-DD");
						handleChangeDateTime(formattedValue, id);
					}}
					renderInput={(params) => {
						if (!validDate) {
							[validation, validationResult, validationMessage] = [true, false, "Invalid value"];
						}
						return (
							<CssTextField
								variant="outlined"
								required={mandatory}
								id={id}
								name={id}
								size="small"
								InputLabelProps={{
									shrink: true,
								}}
								helperText={
									!props.inline &&
									(isBoolean(validationResult) && !validationResult
										? validationMessage
										: info)
								}
								error={
									validation && isBoolean(validationResult)
										? !validationResult
										: false
								}
								onBlur={(e) => {
									if (!validDate) setValidDate(true)
									const dateValue = moment(
										e.target.value,
										"DD-MM-YYYY",
										true
									).isValid();
									if (dateValue) {
										handleBlurDateTime(e.target.value, id);
									} else if (!dateValue && e.target.value) {
										disableFormSubmit(true)
										setValidDate(false)
									}
								}}
								{...params}
							/>
						)
					}}
				/>
			);

		case "time":
			return (
				<TimePicker
					inputFormat="HH:mm"
					label={!islabelvisible ? title : null}
					disabled={readOnly}
					value={
						value
							? moment(value)
								.tz(userTimezone || defaultUserTimezone)
								.format("HH:mm")
							: null
					}
					onAccept={(newValue) => {
						if (newValue) {
							const formattedValue = newValue?.format("HH:mm");
							handleBlurTime(formattedValue, id);
						}
					}}
					onChange={(newValue) => {
						const formattedValue = newValue?.format("HH:mm");
						handleChangeTime(formattedValue, id);
					}}
					renderInput={(params) => (
						<CssTextField
							variant="outlined"
							required={mandatory}
							id={id}
							name={id}
							size="small"
							InputLabelProps={{
								shrink: true,
							}}
							helperText={
								!props.inline &&
								(isBoolean(validationResult) && !validationResult
									? validationMessage
									: info)
							}
							error={
								validation && isBoolean(validationResult)
									? !validationResult
									: false
							}
							onBlur={(e) => {
								if (e.target.value) handleBlurTime(e.target.value, id);
							}}
							{...params}
						/>
					)}
				/>
			);

		case "datetime":
			return (
				<DateTimePicker
					// inputFormat="YYYY-MM-DD HH:mm"
					inputFormat="DD-MM-YYYY HH:mm"
					label={!islabelvisible ? title : null}
					disabled={readOnly}
					value={
						value
							? moment(value)
								.tz(userTimezone || defaultUserTimezone)
								.format("YYYY-MM-DD[T]HH:mm")
							: null
					}
					onAccept={(newValue) => {
						if (newValue) {
							const formattedValue = newValue?.format("YYYY-MM-DD HH:mm");
							handleBlurDateTime(formattedValue, id);
						}
					}}
					onChange={(newValue) => {
						if (!validDate) setValidDate(true)
						const dateValue = new Date(newValue).toString() === "Invalid Date";
						if (dateValue) {
							return;
						}

						const formattedValue = newValue?.format("YYYY-MM-DD HH:mm");
						handleChangeDateTime(formattedValue, id);
					}}
					renderInput={(params) => {
						if (!validDate) {
							[validation, validationResult, validationMessage] = [true, false, "Invalid value"];
						}
						return (
						<CssTextFieldDateTime
							islabelvisible={islabelvisible}
							variant="outlined"
							required={mandatory}
							id={id}
							name={id}
							size="small"
							InputLabelProps={{
								shrink: true,
							}}
							helperText={
								!props.inline &&
								(isBoolean(validationResult) && !validationResult
									? validationMessage
									: info)
							}
							error={
								validation && isBoolean(validationResult)
									? !validationResult
									: false
							}
								onBlur={(e) => {
									if (!validDate) setValidDate(true)
								const dateValue = moment(
									e.target.value,
									"DD-MM-YYYY HH:mm",
									true
								).isValid();
									if (dateValue) {
										handleBlurDateTime(e.target.value, id)
									} else if (!dateValue && e.target.value) {
										disableFormSubmit(true)
										setValidDate(false)
									}
							}}
							{...params}
						/>
						)
					}}
				/>
			);
	}
};

export default DateTimeInput;
