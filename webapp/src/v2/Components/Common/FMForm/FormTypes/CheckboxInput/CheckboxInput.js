import React from "react";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormHelperText from "@mui/material/FormHelperText";
import { styled } from "@mui/material/styles";
import { FormLabel } from "@mui/material";
import './CheckboxInput.css';

const FormContainer = styled(FormControl)(() => ({
	"& fieldset.MuiOutlinedInput-notchedOutline": {
		border: "1px solid #c4d8ff !important",
	},
	"& .MuiCheckbox-root": {
		"& input": {
			opacity: 0,
		},
	},
	"& .MuiFormLabel-asterisk": {
		color: "#e5453b",
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

const FormControlLabelContainer = styled(FormControlLabel)(() => ({
	fontFamily: "SF Pro Text Bold",
	fontSize: "14px",
	color: "#2c2f44",
	marginBottom: 0,
	"& .MuiFormControlLabel-label": {
		fontFamily: "SF Pro Text Regular",
		fontSize: "14px",
		color: "#2c2f44",
	},
}));

const CheckBoxContainer = styled(Checkbox)(() => ({
	"&:hover": {
		backgroundColor: "rgb(196 216 255 / 18%) !important",
		"& span": {
			boxShadow:
				"0px 2px 1px -1px rgb(0 0 0 / 8%), 0px 1px 1px 0px rgb(0 0 0 / 9%), 0px 0px 0px 0px rgb(0 0 0 / 12%)",
		},
	},
}));

const BpIcon = styled("span")(({ theme }) => ({
	borderRadius: 4,
	width: 20,
	height: 20,
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
		width: 18,
		height: 18,
		backgroundImage:
			"url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
			" fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
			"1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
		content: '""',
	},
});

function BpCheckbox(props) {
	return (
		<CheckBoxContainer
			sx={{
				"&:hover": { bgcolor: "transparent" },
			}}
			disableRipple
			color="default"
			checkedIcon={<BpCheckedIcon />}
			icon={<BpIcon />}
			inputProps={{ "aria-label": "Checkbox demo" }}
			{...props}
		/>
	);
}

const CheckboxInput = (props) => {
	const {
		id,
		info,
		readOnly,
		value,
		handleChangeCheck,
		mandatory,
		onBlurField,
		placeholder,
		maxLength,
		minLength,
		validation,
		validationResult,
		validationMessage,
		options,
		isSections,
		isSmallScreen,
		title,
	} = props;
	const isBoolean = (val) => "boolean" === typeof val;

	return (
		<FormContainer
			required={mandatory}
			component="fieldset"
			error={
				validation && isBoolean(validationResult) ? !validationResult : false
			}
		>
			{title && title !== " " && (
				<FormLabelContainer component="legend">{title}</FormLabelContainer>
			)}
			<FormGroup>
				{options?.map((option) => {
					return (
						<FormControlLabelContainer
							key={option}
							control={
								<>
									<label className="ckContainer">{option}
										<div className="boxContainer">
											<input type="checkbox"
												disabled={readOnly}
												checked={value?.includes(option)}
												onChange={handleChangeCheck}
												name={option}
												id={id} />
											<span className="checkmark"></span>
											<div className="forHoverEffect"></div>
										</div>
									</label>
									{/* <BpCheckbox
										color="primary"
										disabled={readOnly}
										checked={value?.includes(option)}
										onChange={handleChangeCheck}
										name={option}
										id={id}
									/> */}
								</>
							}
							label=""
						/>
					);
				})}
			</FormGroup>
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

export default CheckboxInput;
