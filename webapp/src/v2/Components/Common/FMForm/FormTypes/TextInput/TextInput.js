import React, { useEffect, useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import CachedImage from "../../../../../../Components/Common/CachedImage";
import Mandatory from "../../Mandatory";
import { styled } from "@mui/material/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const CssTextField = styled(TextField)({
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
		fontSize: "0.9rem",
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
		"& .MuiOutlinedInput-input.Mui-disabled": {
			color: "#44485a",
			"-webkit-text-fill-color": "#44485a",
		},
		fontSize: 14,
		borderRadius: 6,
		fontFamily: "SF Pro Text Regular",
		color: "#2c2f44",
		backgroundColor: "white",
	},
});

const TextInput = (props) => {
	const {
		id,
		info,
		readOnly,
		value,
		handleChange,
		mandatory,
		onBlurField,
		placeholder,
		maxLength = 500,
		minLength,
		validation,
		isSections,
		validationResult,
		validationMessage,
		type,
		isSmallScreen,
		title,
		islabelvisible,
	} = props;

	// const [isInfoVisible, setInfoVisible] = useState(false);
	const [inputValue, setInputValue] = useState(value);
	const [inputObject, setObject] = useState(null);
	const [showPassword, setShowPassword] = React.useState(false);
	const [shrinkBoolean, setShrinkBoolean] = useState({ shrink: true });
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};
	useEffect(() => {

		if (inputValue !== value) {
			setInputValue(value);
		}
		if (value || value >= 0) {
			setShrinkBoolean({ shrink: true });
		} else setShrinkBoolean({ shrink: false });
	}, [value]);

	const handleBlur = (e) => {
		onBlurField(e);
	};

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			handleChange(inputObject);
		}, 400);

		return () => clearTimeout(delayDebounceFn);
	}, [inputObject]);

	const onValueChange = (e) => {
		// if (e.target.value.length > maxLength) {
		// 	setInfoVisible(true);
		// } else {
		// 	setInfoVisible(false);
		// }
		if (e.target.type == "password") {
			handleChange(e, "password");
		} else {
			handleChange(e);
		}
	};

	const isBoolean = (val) => "boolean" === typeof val;

	const isError =
		validation && isBoolean(validationResult) ? !validationResult : false;

	const helperText =
		isBoolean(validationResult) && !validationResult ? validationMessage : info;

	const renderType = () => {
		let selectdType = "text";
		switch (type) {
			case "text_field":
				selectdType = "text";
				break;
			case "number":
				selectdType = "number";
				break;
			case "text_area":
				selectdType = "textarea";
				break;
			case "password_field":
				selectdType = "password";
				break;
		}
		return selectdType;
	};
	if (type === "text_area") {
		return islabelvisible ? (
			<CssTextField
				id={id}
				name={id}
				type={renderType()}
				size="small"
				fullWidth
				variant="outlined"
				disabled={readOnly}
				// label={isSmallScreen || isSections === true ? title : null}
				label={!islabelvisible ? <><Mandatory mandatory={mandatory} />{title}</> : null}
				value={inputValue}
				onChange={(e) => {
					setObject(e);
					setInputValue(e.target.value);
				}}
				placeholder={placeholder}
				onBlur={handleBlur}
				inputProps={{
					maxLength,
					minLength,
					endAdornment: isError && (
						<InputAdornment position="end">
							<CachedImage
								imgKey="warningIcon"
								image="/offlinelms/img/Shape@2x.png"
								width="12px"
							/>
						</InputAdornment>
					),
				}}
				multiline={renderType() === "textarea"}
				style={{ height: "fit-content" }}
				helperText={!props.inline && helperText}
				error={isError}
			/>
		) : (
			<CssTextField
				id={id}
				name={id}
				type={renderType()}
				size="small"
				fullWidth
				variant="outlined"
				disabled={readOnly}
				value={value}
				// label={isSmallScreen || isSections === true ? title : null}
				label={!islabelvisible ? <><Mandatory mandatory={mandatory} />{title}</> : null}
				onChange={onValueChange}
				placeholder={placeholder}
				onBlur={handleBlur}
				inputProps={{
					maxLength,
					minLength,
					endAdornment: isError && (
						<InputAdornment position="end">
							<CachedImage
								imgKey="warningIcon"
								image="/offlinelms/img/Shape@2x.png"
								width="12px"
							/>
						</InputAdornment>
					),
				}}
				multiline={renderType() === "textarea"}
				style={{ height: "fit-content" }}
				helperText={!props.inline && helperText}
				error={isError}
			/>
		);
	}
	return islabelvisible ? (
		<CssTextField
			id={id}
			name={id}
			type={renderType()}
			size="small"
			fullWidth
			// label={isSmallScreen || isSections === true ? title : null}
			label={!islabelvisible ? <><Mandatory mandatory={mandatory} />{title}</> : null}
			variant="outlined"
			disabled={readOnly}
			value={inputValue}
			onChange={(e) => {
				setObject(e);
				setInputValue(e.target.value);
			}}
			placeholder={placeholder}
			onBlur={handleBlur}
			InputLabelProps={
				value && {
					shrink: true,
				}
			}
			inputProps={{
				maxLength,
				minLength,
				endAdornment: isError && (
					<InputAdornment position="end">
						<CachedImage
							imgKey="warningIcon"
							image="/offlinelms/img/Shape@2x.png"
							width="12px"
						/>
					</InputAdornment>
				),
			}}
			helperText={!props.inline && helperText}
			error={isError}
		/>
	) : (

		<CssTextField
			id={id}
			name={id}
			type={renderType()}
			size="small"
			fullWidth
			// label={isSmallScreen || isSections === true ? title : null}
			label={!islabelvisible ? <><Mandatory mandatory={mandatory} />{title}</> : null}
			variant="outlined"
			disabled={readOnly}
			value={value}
			onChange={onValueChange}
			placeholder={placeholder}
			onBlur={handleBlur}
			InputLabelProps={shrinkBoolean}
			// InputLabelProps={
			// 	value >= 0 && {
			// 		shrink: true,
			// 	}
			// }
			inputProps={{
				maxLength,
				minLength,
				endAdornment: isError && (
					<InputAdornment position="end">
						<CachedImage
							imgKey="warningIcon"
							image="/offlinelms/img/Shape@2x.png"
							width="12px"
						/>
					</InputAdornment>
				),
			}}
			helperText={!props.inline && helperText}
			error={isError}
		/>
	);
};

export default TextInput;
