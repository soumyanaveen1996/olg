import React, { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import Chip from "@mui/material/Chip";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import ClearIcon from "@mui/icons-material/Clear";
import { styled } from "@mui/material/styles";
import Mandatory from "../../Mandatory";
import OutlinedInput from "@mui/material/OutlinedInput";

const FormContainer = styled(FormControl)(({ isValue }) => ({
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
	"& div": {
		padding: "4px 5px 6px 5px",
		paddingBottom: "4px",
	},
	"& .MuiOutlinedInput-root.Mui-focused fieldset": {
		borderColor: "#638dff !important",
	},
	"& .MuiSelect-icon": {
		color: "#638dff !important",
	},
	"& .MuiOutlinedInput-root": {
		"& .MuiSelect-select": {
			...(isValue ? { width: "min-content" } : { width: "100%" }),
		},
		"& fieldset.MuiOutlinedInput-notchedOutline": {
			borderColor: "#c4d8ff",
		},
		"&:hover fieldset.MuiOutlinedInput-notchedOutline": {
			borderColor: "#92afff",
		},
		"&.Mui-disabled": {
			backgroundColor: "#f4f7fb !important",
			"& fieldset.MuiOutlinedInput-notchedOutline": {
				borderColor: "#c4d8ff",
			},
		},
		"&.Mui-error": {
			"& fieldset.MuiOutlinedInput-notchedOutline": {
				borderColor: "#f2a29d !important",
			},
		},
		"&.Mui-focused fieldset.MuiOutlinedInput-notchedOutline": {
			borderColor: "#638dff",
		},
		"& .MuiOutlinedInput-input.Mui-disabled": {
			color: "#44485a",
			"-webkit-text-fill-color": "#44485a",
		},
		"& .MuiFormHelperText-root": {
			color: "#e5453b !important",
		},
		fontSize: 14,
		borderRadius: 6,
		fontFamily: "SF Pro Text Regular",
	},
}));

const ChipDiv = styled("div")(() => ({
	display: "flex",
	flexWrap: "wrap",
}));

const ChipChild = styled(Chip)(() => ({
	margin: 2,
}));

const PositionCloseIcon = styled(ClearIcon)(() => ({
	position: "absolute",
	// left: "84%",
	// top: "10px",
	// top: "calc(50% - 12px)",
	top: " 35%  ",
	left: "85% ",
	transform: " translate(-50%, -50%) ",
	color: "rgba(0, 0, 0, 0.54)",
}));

const PositionCloseIconMulti = styled(ClearIcon)(() => ({
	position: "absolute",
	// left: "84%",
	// top: "10px",
	// top: "calc(50% - 3px)",
	color: "rgba(0, 0, 0, 0.54)",

	//aditya
	top: " 33%  ",
	left: "87% ",
	transform: " translate(-50%, -50%) ",
}));

const ObjectInput = (props) => {
	const {
		id,
		name,
		info,
		readOnly,
		value,
		handleChange,
		onBlurField,
		mandatory,
		placeholder,
		maxLength,
		minLength,
		validation,
		validationResult,
		validationMessage,
		options,
		isSections,
		multiple,
		handleChangeMultiple,
		isSmallScreen,
		title,
	} = props;
	const [error, setError] = useState(false);
	const [helperText, setHelperText] = useState(info);
	const [selectOption, setSelectOption] = useState([]);
	const [val, setVal] = useState(value);
	const [multiVal, setMultiVal] = useState(
		(Array.isArray(value) && value) || []
	);
	const [shouldShowClrIcon, setShouldShowClrIcon] = useState(false);
	const handleSelect = (e) => {
		setVal((oldVal) => {
			return value;
		});
		setMultiVal((oldMultiVal) => {
			return value;
		});
		handleChange(e);
		onBlurField(e);
	};

	const onClear = (e) => {
		setVal((oldVal) => {
			return "";
		});
		const fakeEvt = { target: { name: id, value: "" } };
		handleChange(fakeEvt);
	};

	const onClearMultiple = (e) => {
		setMultiVal((oldMultiVal) => {
			return [];
		});
		const fakeEvt = { target: { name: id, value: [] } };
		handleChange(fakeEvt);
	};

	const handleMouseEnter = (e) => {
		setShouldShowClrIcon(true);
	};

	const handleMouseLeave = (e) => {
		setShouldShowClrIcon(false);
	};

	useEffect(() => {
		if (!options?.length && value) {
			setSelectOption([value]);
		} else if (options) {
			if (
				readOnly &&
				!options?.map((itemObj) => itemObj.value).includes(value)
			) {
				setSelectOption([...options, value]);
			} else {
				setSelectOption(options);
			}
		}
	}, [options, value, readOnly]);

	useEffect(() => {
		setVal((oldVal) => {
			return value;
		});
	}, [value]);

	useEffect(() => {
		setMultiVal((oldMultiVal) => {
			return value;
		});
	}, [value]);

	const isBoolean = (val) => "boolean" === typeof val;

	if (multiple) {
		return (
			<FormContainer
				fullWidth
				variant="outlined"
				disabled={readOnly}
				size="small"
				error={
					validation && isBoolean(validationResult) ? !validationResult : false
				}
				isValue={Boolean(value?.length)}
			>
				{(isSmallScreen || isSections === true) && (
					<InputLabel id={id}>
						<Mandatory {...props} />
						{title}
					</InputLabel>
				)}
				<Select
					labelId={id}
					multiple
					id={id}
					name={id}
					// label={id}
					input={<OutlinedInput label={title} />}
					value={multiVal || []}
					MenuProps={{
						anchorOrigin: {
							vertical: "bottom",
							horizontal: "center",
						},
						style: {
							maxHeight: 45 * 4.5,
						},
					}}
					onChange={handleSelect}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
					renderValue={(selected) => {
						return (
							<ChipDiv>
								{selected &&
									selected.length > 0 &&
									selected?.map((value) => {
										const selectedItemObj = selectOption.find(
											(itemObj) => itemObj.value === value
										);
										return (
											<ChipChild
												key={value}
												label={selectedItemObj?.displayField}
											/>
										);
									})}
							</ChipDiv>
						);
					}}
				>
					{selectOption.map((itemObj) => (
						<MenuItem key={itemObj?.value} value={itemObj?.value}>
							<Checkbox
								color="primary"
								checked={multiVal?.indexOf(itemObj?.value) > -1}
							/>
							<ListItemText primary={itemObj?.displayField} />
						</MenuItem>
					))}
				</Select>
				{shouldShowClrIcon && (
					<PositionCloseIconMulti
						fontSize="small"
						onClick={onClearMultiple}
						onMouseEnter={handleMouseEnter}
					/>
				)}
				<FormHelperText>
					{isBoolean(validationResult) && !validationResult
						? validationMessage
						: info}
				</FormHelperText>
			</FormContainer>
		);
	}
	return (
		<FormContainer
			fullWidth
			variant="outlined"
			size="small"
			disabled={readOnly}
			error={
				validation && isBoolean(validationResult) ? !validationResult : false
			}
			isValue={Boolean(value)}
		>
			{(isSmallScreen || isSections === true) && (
				<InputLabel id={id}>
					<Mandatory {...props} />
					{title}
				</InputLabel>
			)}
			<Select
				labelId={id}
				MenuProps={{
					anchorOrigin: {
						vertical: "bottom",
						horizontal: "center",
					},
					style: {
						maxHeight: 45 * 4.5,
					},
				}}
				id={id}
				name={id}
				// label={id}
				value={val || ""}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				onChange={handleSelect}
				variant="outlined"
			>
				{selectOption?.map((itemObj) => (
					<MenuItem key={itemObj?.value} value={itemObj?.value}>
						{itemObj?.displayField}
					</MenuItem>
				))}
			</Select>
			{shouldShowClrIcon && (
				<PositionCloseIcon
					fontSize="small"
					onClick={onClear}
					onMouseEnter={handleMouseEnter}
				/>
			)}
			<FormHelperText>
				{isBoolean(validationResult) && !validationResult
					? validationMessage
					: info}
			</FormHelperText>
		</FormContainer>
	);
};

export default ObjectInput;
