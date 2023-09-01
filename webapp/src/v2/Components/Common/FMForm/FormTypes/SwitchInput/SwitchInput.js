import React from "react";
import Switch from "@mui/material/Switch";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import { styled } from "@mui/material/styles";

const FormContainerLabel = styled(FormControlLabel)(() => ({
	"& div": {
		background: "#FFFFFF",
	},
	color: "rgba(0, 0, 0, 0.87)",
}));

const FormSwitch = styled(Switch)(() => ({
	"& fieldset.MuiOutlinedInput-notchedOutline": {
		border: "1px solid #c4d8ff !important",
	},
}));

const SwitchInput = (props) => {
	const {
		id,
		info,
		readOnly,
		value,
		handleChangeSwitch,
		mandatory,
		onBlurField,
		placeholder,
		maxLength,
		minLength,
		validation,
		validationResult,
		validationMessage,
		type,
		isSmallScreen,
		isSections,
		title,
	} = props;
	const isBoolean = (val) => "boolean" === typeof val;

	return (
		<FormControl
			component="fieldset"
			error={
				validation && isBoolean(validationResult) ? !validationResult : false
			}
		>
			<FormContainerLabel
				control={
					<FormSwitch
						id={id}
						name={id}
						disabled={readOnly}
						checked={value || false}
						onChange={handleChangeSwitch}
						color="primary"
					/>
				}
				// label={isSmallScreen || isSections === true ? title : null}
				label={title}
			/>
			{!props.inline && (
				<FormHelperText>
					{isBoolean(validationResult) && !validationResult
						? validationMessage
						: info}
				</FormHelperText>
			)}
		</FormControl>
	);
};

export default SwitchInput;
