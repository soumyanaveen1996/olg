import React, { useState } from "react";

import {
	Radio,
	RadioGroup,
	FormControlLabel,
	FormControl,
	FormLabel,
	FormHelperText,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const FormContainer = styled(FormControl)(() => ({
	"& .MuiFormLabel-asterisk": {
		color: "#e5453b",
	},
}));

const RadioContainer = styled(Radio)(() => ({
	"&:hover": {
		backgroundColor: "rgb(196 216 255 / 18%)",
		"& span": {
			boxShadow:
				"0px 2px 1px -1px rgb(0 0 0 / 8%), 0px 1px 1px 0px rgb(0 0 0 / 9%), 0px 0px 0px 0px rgb(0 0 0 / 12%)",
		},
	},
}));

const FormLabelContainer = styled(FormLabel)(() => ({
	fontFamily: "SF Pro Text Bold",
	fontSize: "14px",
	fontWeight: "bold",
	color: "#2c2f44",
	"&.Mui-focused": {
		color: "#2c2f44",
	},
}));

const FormControlLabelText = styled(FormControlLabel)(() => ({
	textTransform: 'none',
}));

const BpIcon = styled("span")(({ theme }) => ({
	borderRadius: "50%",
	width: 18,
	height: 18,
	backgroundColor: theme.palette.mode === "dark" ? "#394b59" : "#ffffff",
	border: "solid 1px #c4d8ff",
	".Mui-focusVisible &": {
		outline: "2px auto rgba(19,124,189,.6)",
		outlineOffset: 2,
	},
	"input:disabled ~ &": {
		boxShadow: "none",
		background:
			theme.palette.mode === "dark" ? "rgba(57,75,89,.5)" : "rgb(0 0 0 / 12%)",
	},
}));

const BpCheckedIcon = styled(BpIcon)({
	backgroundColor: "#638dff",
	backgroundImage:
		"linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
	"&:before": {
		display: "block",
		width: 16,
		height: 16,
		backgroundImage: "radial-gradient(#fff,#fff 21%,transparent 32%)",
		content: '""',
	},
});

function BpRadio(props) {
	return (
		<RadioContainer
			disableRipple
			color="default"
			checkedIcon={<BpCheckedIcon />}
			icon={<BpIcon />}
			{...props}
		/>
	);
}

const RadioInput = (props) => {
	const {
		id,
		info,
		readOnly,
		value,
		handleChange,
		onBlurField,
		mandatory,
		isSections,
		options,
		isSmallScreen,
		title,
		validation,
		validationResult,
		validationMessage,
	} = props;
	const [error, setError] = useState(false);

	const handleSingleRadioClick = (e) => {
		if (mandatory) {
		} else {
			if (e.target.value === value) {
				handleChange(e, "uncheckRadioButton");
				onBlurField(e);
			} else {
				handleChange(e, "checkRadioButton");
				onBlurField(e);
			}
		}
	};

	const handleCheck = (e) => {
		if (mandatory) {
			handleChange(e);
			onBlurField(e);
		} else {
		}
	};
	const isBoolean = (val) => "boolean" === typeof val;

	return (
		<FormContainer
			required={mandatory}
			error={
				validation && isBoolean(validationResult) ? !validationResult : false
			}
		>
			{/*{(isSmallScreen || isSections === true) && (*/}
			<FormLabelContainer component="legend">{title}</FormLabelContainer>
			{/*)}*/}
			<RadioGroup
				id={id}
				name={id}
				value={value || ""}
				error={error}
				onChange={handleCheck}
			>
				{options?.map((item) => (
					<FormControlLabelText
						key={item}
						disabled={readOnly}
						value={item}
						sx={{ color: "black" }}
						control={<BpRadio onClick={handleSingleRadioClick} />}
						label={item?.charAt(0).toUpperCase() + item?.slice(1)}
					/>
				))}
			</RadioGroup>
			{!props.inline && (
				<FormHelperText>
					{isBoolean(validationResult) && !validationResult
						? validationMessage
						: info}
				</FormHelperText>
			)}
		</FormContainer>
	);
};
export default RadioInput;
