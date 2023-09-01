import React from "react";
// import withStyles from '@mui/styles/withStyles';
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputBase from "@mui/material/InputBase";
import { TextField, InputAdornment } from "@mui/material";
import countryObjects from "./CountryList";
import ClearIcon from "@mui/icons-material/Clear";
import { styled } from "@mui/material/styles";

const BootstrapInput = styled(InputBase)((theme) => ({
	"label + &": {
		marginTop: theme.spacing(3),
	},
	"& .MuiFormHelperText-root": {
		color: "#e5453b !important",
	},
	"& input": {
		borderRadius: 4,
		position: "relative",
		backgroundColor: theme.palette.background.paper,
		border: "1px solid #c4d8ff !important",
		fontSize: 16,
		padding: "10px 26px 10px 12px",
		transition: theme.transitions.create(["border-color", "box-shadow"]),
		fontFamily: [
			"-apple-system",
			"BlinkMacSystemFont",
			'"Segoe UI"',
			"Roboto",
			'"Helvetica Neue"',
			"Arial",
			"sans-serif",
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(","),
		"&:focus": {
			borderRadius: 4,
			borderColor: "#80bdff",
			boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
		},
	},
}));

const FormSelectControl = styled(FormControl)(() => ({
	margin: 0,
	width: "30%",
}));

const FormTextControl = styled(FormControl)(() => ({
	marginLeft: "1%",
	width: "69%",
}));

export default function PhoneNumberField(props) {
	let {
		id,
		name,
		info,
		readOnly,
		value,
		handleChange,
		onBlurField,
		mandatory,
		placeholder,
		maxLength = 500,
		minLength,
		validation,
		validationResult,
		validationMessage,
		options,
		multiple,
		isSections,
		handleChangeMultiple,
		isSmallScreen,
		title,
		type,
	} = props;

	let noCountrySelected = {
		name: "None",
		dial_code: "+",
		code: "",
	};

	let countryObjectsAll = [noCountrySelected, ...countryObjects];

	const [number, setNumber] = React.useState(function () {
		if (typeof value === "object") {
			return value?.number ? Number(value?.number) : "";
		}
		return "";
	});

	const [blurFlag, setBlurFlag] = React.useState(false);

	const [selectedCountryObj, setSelectedCountryObj] = React.useState(
		function () {
			if (typeof value === "object") {
				return countryObjectsAll.filter(
					(countryObj) =>
						countryObj.dial_code == "+".concat(value?.country || "")
				)[0];
			}
			return noCountrySelected;
		}
	);

	const [shouldShowClrIcon, setShouldShowClrIcon] = React.useState(false);

	React.useEffect(() => {
		if (typeof value === "object") {
			setSelectedCountryObj(
				countryObjectsAll.filter(
					(countryObj) =>
						countryObj.dial_code == "+".concat(value?.country || "")
				)[0]
			);
			return;
		}
		setSelectedCountryObj(noCountrySelected);
	}, [typeof value === "object" && value?.country]);

	React.useEffect(() => {
		if (typeof value === "object") {
			setNumber(value?.number ? Number(value?.number) : "");
			return;
		}
		setNumber("");
	}, [typeof value === "object" && value?.number]);

	const menuProps = {
		getContentAnchorEl: null,
		anchorOrigin: {
			vertical: "bottom",
			horizontal: "left",
		},
	};

	const handleBlur = (e) => {
		if (!readOnly) {
			onBlurField(e);
			setBlurFlag(false);
		}
	};

	const handleFocus = (e) => {
		if (!readOnly) {
			setBlurFlag(true);
		}
	};

	const handleCountryChange = (event) => {
		if (!readOnly) {
			setSelectedCountryObj((oldSelectedObj) => {
				return countryObjectsAll.filter(
					(countryObj) => countryObj.dial_code === event.target.value
				)[0];
			});
			let country;
			country =
				event?.target?.value == "+"
					? null
					: Number(event?.target?.value?.substring(1));
			const currFieldValue = {
				country: country,
				number: Number(number),
			};
			const syntheticEvt = {
				target: { name: id, value: currFieldValue },
			};
			handleChange(syntheticEvt, type);
			onBlurField(syntheticEvt);
		}
	};

	const handlePurePhoneNoChange = (event) => {
		if (!readOnly) {
			setNumber(Number(event.target.value));
			let country;
			country =
				selectedCountryObj?.dial_code == "+"
					? null
					: Number(selectedCountryObj?.dial_code.substring(1));
			const currFieldValue = {
				country: country,
				number: Number(event.target.value) || null,
			};
			const syntheticEvt = {
				target: { name: id, value: currFieldValue },
			};
			handleChange(syntheticEvt, type);
		}
	};

	const handleClear = (event) => {
		if (!readOnly) {
			setNumber("");
			let country;
			country =
				selectedCountryObj?.dial_code == "+"
					? null
					: Number(selectedCountryObj?.dial_code.substring(1));
			const currFieldValue = {
				country: country,
				number: null,
			};
			const syntheticEvt = {
				target: { name: id, value: currFieldValue },
			};
			handleChange(syntheticEvt, type);
			onBlurField(syntheticEvt);
		}
	};

	const handleMouseEnter = () => {
		if (!readOnly) {
			setShouldShowClrIcon(true);
		}
	};

	const handleMouseLeave = () => {
		if (!readOnly) {
			setShouldShowClrIcon(false);
		}
	};

	const isBoolean = (val) => "boolean" === typeof val;

	const isError =
		validation && isBoolean(validationResult) ? !validationResult : false;

	const helperText =
		isBoolean(validationResult) && !validationResult ? validationMessage : info;

	let numOrBlurFlag = number || blurFlag;

	return (
		<>
			<FormSelectControl>
				<Select
					labelId="demo-customized-select-label"
					id="demo-customized-select"
					MenuProps={menuProps}
					value={selectedCountryObj?.dial_code}
					disabled={readOnly}
					sx={
						readOnly
							? {
									"& .MuiInputBase-root": {
										backgroundColor: "#F4F4F4",
									},
									"& .MuiSelect-root": {
										backgroundColor: "#F4F4F4",
									},
							  }
							: {
									"& fieldset.MuiOutlinedInput-notchedOutline": {
										border: "1px solid #c4d8ff !important",
									},
							  }
					}
					onChange={handleCountryChange}
					input={<BootstrapInput />}
				>
					{countryObjectsAll?.map((countryObject) => {
						return (
							<MenuItem value={countryObject?.dial_code}>
								{countryObject?.name}
							</MenuItem>
						);
					})}
				</Select>
			</FormSelectControl>
			<FormTextControl
				error={
					validation && isBoolean(validationResult) ? !validationResult : false
				}
			>
				<TextField
					id={id}
					name={id}
					type="number"
					size="small"
					// label={isSmallScreen || isSections === true ? title : null}
					label={title}
					variant="outlined"
					shrink={true}
					disabled={readOnly}
					value={number}
					onChange={handlePurePhoneNoChange}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
					sx={
						readOnly
							? {
									"& .MuiInputBase-root": {
										backgroundColor: "#F4F4F4",
									},
									"& .MuiSelect-root": {
										backgroundColor: "#F4F4F4",
									},
							  }
							: {
									"& fieldset.MuiOutlinedInput-notchedOutline": {
										border: "1px solid #c4d8ff !important",
									},
							  }
					}
					required={mandatory}
					placeholder={placeholder}
					onBlur={handleBlur}
					onFocus={handleFocus}
					InputProps={{
						maxLength,
						minLength,
						startAdornment: (
							<InputAdornment position="start" aria-label="Country Dial Code">
								{selectedCountryObj?.dial_code == "+"
									? ""
									: selectedCountryObj?.dial_code}
							</InputAdornment>
						),
						endAdornment: shouldShowClrIcon && (
							<ClearIcon
								fontSize="small"
								onClick={handleClear}
								onMouseEnter={handleMouseEnter}
							/>
						),
					}}
					InputLabelProps={{
						shrink:
							(selectedCountryObj?.dial_code == "+"
								? ""
								: selectedCountryObj?.dial_code) || numOrBlurFlag
								? 1
								: 0,
					}}
					style={{ height: "fit-content" }}
					helperText={!props.inline && helperText}
					error={isError}
				/>
			</FormTextControl>
		</>
	);
}
