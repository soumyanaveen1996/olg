import React, { useState, useEffect, useRef } from "react";
import {
	MenuItem,
	FormControl,
	FormHelperText,
	Select,
	Checkbox,
	ListItemText,
	Chip,
	InputLabel,
	OutlinedInput,
	Tooltip,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import _ from "lodash";
import Mandatory from "../../Mandatory";
import { styled } from "@mui/material/styles";
import { relative } from "path";

const SelectContainer = styled(Select)(() => ({
	"& .icon": {
		right: "15px",
	},
}));

const FormControlSingle = styled(FormControl)(({ inputValue }) => ({
	"& label": {
		fontSize: 14,
		color: "#2c2f44",
		fontFamily: "SF Pro Text Light",
		textTransform: "inherit",
	},
	"& label.MuiInputLabel-shrink": {
		fontSize: "1rem",
		backgroundColor: "white",
	},
	"& label.Mui-focused": {
		color: "#638dff",
	},
	"& div": {
		padding: "4px 5px 6px 5px",
		paddingBottom: "4px",
	},
	"& .MuiOutlinedInput-root.Mui-focused fieldset": {
		border: "1px solid #638dff !important",
	},
	"& .MuiSelect-icon": {
		color: "#638dff !important",
		transform: "rotateZ(0deg)",
	},
	"& .MuiOutlinedInput-root": {
		"& .MuiSelect-select": {
			...(inputValue.length > 40 && { maxWidth: "18rem", marginRight: "1.5rem" })
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
		fontSize: 14,
		borderRadius: 6,
		fontFamily: "SF Pro Text Regular",
		backgroundColor: "white",
		color: "2c2f44",
	},
}));

const FormControlMultiple = styled(FormControl)(
	({ isValue, multiSelWidth }) => ({
		"& label": {
			fontSize: 14,
			color: "#2c2f44",
			fontFamily: "SF Pro Text Light",
			textTransform: "inherit",
			backgroundColor: "white !important",
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
				...(isValue ? { maxWidth: `${multiSelWidth}px` } : { width: "100%" }),
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
			position: relative,
		},
	})
);

const ChipsContainer = styled("div")(() => ({
	display: "flex",
	flexWrap: "wrap",
}));

const ChipText = styled(Chip)(() => ({
	margin: 2,
	border: "solid 1px #c4d8ff",
	backgroundColor: "#f6f8fc",
	fontSize: "14px",
	fontWeight: "500",
	color: "#4f5b7d",
	"&	.MuiChip-deleteIcon": {
		color: "#4f5b7d",
		fontSize: "medium",
	},
}));

const PositionCloseIcon = styled(ClearIcon)(() => ({
	position: "absolute",
	// left: "84%",
	//top: "calc(50% - 12px)",
	// top: "10px",
	top: " 45%  ",
	left: "87% ",
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
	top: " 45%  ",
	left: "87% ",
	transform: " translate(-50%, -50%) ",
}));

const StyledMenuItem = styled(MenuItem)({
	"&.MuiButtonBase-root.MuiMenuItem-root.Mui-selected": {
		backgroundColor: "#eff4ff !important",
	},
	borderBottom: "1px solid rgba(196, 216, 255, 0.5)",
	paddingTop: "5px",
	paddingBottom: "5px",
});

const SelectInput = (props) => {
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
		multiple,
		isSections,
		handleChangeMultiple,
		isSmallScreen,
		title,
		type,
		islabelvisible,
	} = props;
	const [error, setError] = useState(false);
	const [selectOption, setSelectOption] = useState([]);
	const [val, setVal] = useState(value);
	const [multiVal, setMultiVal] = useState(
		(Array.isArray(value) && value) || []
	);
	const [multiSelectWidth, setMultiSelectWidth] = useState(500);
	const multiSelectRef = useRef(null);

	useEffect(() => {
		const multiWidth = multiSelectRef?.current?.offsetWidth;
		multiWidth && setMultiSelectWidth(multiWidth - 60);
	}, []);

	const [shouldShowClrIcon, setShouldShowClrIcon] = useState(false);

	const handleSelect = (e) => {
		setVal(e.target.value);
		setMultiVal(e.target.value);
		handleChange(e, type, e.target.value);
		onBlurField(e);
	};

	const onClear = () => {
		if (!readOnly) {
			setVal("");
			const fakeEvt = { target: { name: id, value: "" } };
			handleSelect(fakeEvt);
		}
	};

	const onClearMultiple = () => {
		if (!readOnly) {
			setMultiVal([]);
			const fakeEvt = { target: { name: id, value: [] } };
			handleSelect(fakeEvt);
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

	useEffect(() => {
		if (multiple) {
			if (Array.isArray(value)) {
				setMultiVal(value);
			} else {
				let valueArray = [];
				value && valueArray.push(value);
				setMultiVal(valueArray);
			}
		} else {
			setVal(value);
		}
		if (!options?.length && value) {
			setSelectOption([value]);
		} else if (options && Array.isArray(options)) {
			if (!options?.includes(value)) {
				if (_.isArray(value)) {
					setSelectOption([...new Set([...options, ...value])]);
				} else {
					setSelectOption([...options, value]);
				}
			} else {
				setSelectOption(options);
			}
		}
	}, [options, value, readOnly, multiple]);

	const handleItemDelete = (e, value) => {
		e.preventDefault();
		let valAfterDeletion = multiVal.filter((val) => val !== value);
		setMultiVal(valAfterDeletion);
		const fakeEvt = { target: { name: id, value: valAfterDeletion } };
		handleChange(fakeEvt, type);
		onBlurField(fakeEvt);
	};

	const isBoolean = (val) => "boolean" === typeof val;
	if (multiple) {
		return (
			<FormControlMultiple
				fullWidth
				isValue={Boolean(value?.length)}
				multiSelWidth={multiSelectWidth}
				size="small"
				// style={{ maxWidth: "260px" }}
				// style={{ height: "40px" }}
				variant="outlined"
				disabled={readOnly}
				error={
					validation && isBoolean(validationResult) ? !validationResult : false
				}
			>
				{/*{(isSmallScreen || isSections === true) && (*/}
				{!islabelvisible && (
					<InputLabel id={id}>
						<Mandatory {...props} />
						{title}
					</InputLabel>
				)}
				{/*)}*/}
				<Select
					ref={multiSelectRef}
					labelId={id}
					multiple
					id={id}
					name={id}
					value={multiVal || []}
					onChange={handleSelect}
					variant="outlined"
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
					renderValue={(selected) => (
						<ChipsContainer>
							{selected &&
								selected.length > 0 &&
								selected?.map((value) => (
									<ChipText
										key={value}
										label={value}
										deleteIcon={
											<ClearIcon onMouseDown={(e) => e.stopPropagation()} />
										}
										onDelete={(e) => handleItemDelete(e, value)}
									/>
								))}
						</ChipsContainer>
					)}
					MenuProps={{
						anchorOrigin: {
							vertical: "bottom",
							horizontal: "center",
						},
						style: {
							maxHeight: 45 * 4.5,
						},
						sx: {
							"&& .Mui-selected": {
								backgroundColor: "#eff4ff",
								border: "1px solid rgba(196, 216, 255, 0.5)",
							},
							"&& .MuiMenuItem-root:hover": {
								backgroundColor: "#eff4ff",
							},
							"&& .MuiMenuItem-root:focus": {
								backgroundColor: "#eff4ff",
							},
						},
					}}
				>
					{selectOption.map((item) => {
						if (item) {
							return (
								<StyledMenuItem key={item} value={item} style={{}}>
									<ListItemText primary={item} />
									<Checkbox
										color="primary"
										checked={multiVal?.indexOf(item) > -1}
										style={{
											color: "#638dff",
											borderRadius: "4px",
										}}
									/>
								</StyledMenuItem>
							);
						}
						return null;
					})}
				</Select>
				{/* {shouldShowClrIcon && (
					<PositionCloseIconMulti
						fontSize="small"
						onClick={onClearMultiple}
						onMouseEnter={handleMouseEnter}
					/>
				)} */}
				{!props.inline && (
					<FormHelperText>
						{isBoolean(validationResult) && !validationResult
							? validationMessage
							: info}
					</FormHelperText>
				)}
			</FormControlMultiple>
		);
	}
	return (

		<FormControlSingle
			fullWidth
			variant="outlined"
			disabled={readOnly}
			// style={{ maxWidth: "260px" }}
			size="small"
			error={
				validation && isBoolean(validationResult) ? !validationResult : false
			}
			value={id}
			label={id}
			inputValue={val || ""}
		>
			{/*{(isSmallScreen || isSections === true) && (*/}
			{!islabelvisible && (
				<InputLabel id={id}>
					<Mandatory {...props} />
					{title}
				</InputLabel>
			)}
			{/*)}*/}
			<Tooltip title={(val?.length > 40) ? val : ""} arrow placement={"top"}>
				<SelectContainer
				labelId={id}
				id={id}
				name={id}
				// label={id}
				value={val || ""}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				// MenuProps={menuProps}
				onChange={handleSelect}
				variant="outlined"
				MenuProps={{
					anchorOrigin: {
						vertical: "bottom",
						horizontal: "center",
					},
					style: {
						maxHeight: 45 * 4.5,
					},
					sx: {
						"&& .Mui-selected": {
							backgroundColor: "#eff4ff",
						},
						"&& .MuiMenuItem-root:hover": {
							backgroundColor: "#eff4ff",
						},
						"&& .MuiMenuItem-root:focus": {
							backgroundColor: "#eff4ff",
						},
					},
					}}>
				{selectOption?.map((item) => {
					if (item) {
						return (
							<MenuItem key={item} value={item} style={{ color: "#44485a" }}>
								{item}
							</MenuItem>
						);
					}
					return null;
				})}
				</SelectContainer>
			</Tooltip>
			{shouldShowClrIcon && (
				<PositionCloseIcon
					fontSize="small"
					onClick={onClear}
					onMouseEnter={handleMouseEnter}
				/>
			)}
			{!props.inline && (
				<FormHelperText>
					{isBoolean(validationResult) && !validationResult
						? validationMessage
						: info}
				</FormHelperText>
			)}
		</FormControlSingle>
	);
};

export default SelectInput;
