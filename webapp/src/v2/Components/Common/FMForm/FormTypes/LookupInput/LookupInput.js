import React, { useState, useEffect, useRef } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Popper from "@mui/material/Popper";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import Mandatory from "../../Mandatory";

const FormContainer = styled(Autocomplete)(({ islabelvisible }) => ({
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
	"& .MuiSvgIcon-root": {
		color: "#638dff !important",
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
		"& .MuiAutocomplete-input": {
			...(islabelvisible && {
				minWidth: "65px !important",
			}),
		},
		fontSize: 14,
		borderRadius: 6,
		fontFamily: "SF Pro Text Regular",
		paddingRight: "9px !important",
		...(islabelvisible && {
			width: "max-content",
			paddingRight: "9px !important",
		}),
	},
	// "& fieldset.MuiOutlinedInput-notchedOutline": {
	// 	border: "1px solid #c4d8ff !important",
	// },
}));

const TextFieldContainer = styled(TextField)(() => ({
	"& .MuiInputLabel-asterisk": {
		color: "#e5453b",
	},
	"& .MuiFormHelperText-root": {
		color: "#e5453b !important",
	},
}));

const InputAdornmentContainer = styled(InputAdornment)(() => ({
	opacity: 0.7,
	cursor: "pointer",
}));

const Info = styled(Tooltip)(() => ({
	right: 5,
}));

const BootstrapTooltip = styled(({ className, ...props }) => (
	<Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
	[`& .${tooltipClasses.arrow}`]: {
		color: "rgba(0, 0, 0, 0.75)",
	},
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: "rgba(0, 0, 0, 0.75)",
		borderRadius: 3,
	},
}));

const ProperContainer = styled(Popper)(() => ({
	"& .MuiAutocomplete-paper": {
		marginTop: "4px",
		boxShadow: "0 0 10px 0 rgb(152 176 200 / 40%)",
		borderRadius: 6,
	},
	"& .MuiAutocomplete-option.Mui-focused": {
		backgroundColor: "rgba(99, 141, 255, 0.1) !important",
	},
	"& .MuiAutocomplete-option": {
		paddingRight: "7px !important",
	},
}));

const LookUpDropCustom = styled("div")(() => ({
	display: "flex !important",
	width: "100%",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "space-between !important",
	padding: "10px 15px",
	"& span": {
		fontSize: 14,
		color: "#44485a",
	},
}));

const PopperMy = function (props) {
	return <ProperContainer {...props} placement="bottom-start" />;
};

const LookupInput = (props) => {
	const {
		id,
		name,
		info,
		readOnly,
		value,
		handleChange,
		onBlurField,
		onSelectField,
		mandatory,
		placeholder,
		maxLength,
		minLength,
		validation,
		validationResult,
		validationMessage,
		results,
		isSections,
		isSmallScreen,
		title,
		islabelvisible,
	} = props;
	const [open, setOpen] = useState(false);
	const [afterSelect, setAfterSelect] = useState(false);
	const [inputValue, setInputValue] = useState(value);
	const [isSearching, setIsSearching] = useState(false);
	const [defaultValue, setDefaultValue] = useState([]);
	const botWaitLoader = useSelector((state) => state.loader.botWaitLoader);
	const lookupField = useRef(null);
	const autoCompleteCount = useRef(0);
	const loading = open && results && results.length === 0;
	useEffect(() => {
		if (Object.prototype.toString.call(value) === "[object Object]") {
			const val = {
				text: value?.text?.toString() || "",
				info: value?.info?.toString() || "",
			};
			setDefaultValue(val);
			return;
		}
		if (value) {
			setDefaultValue({
				text: value?.toString() || "",
				info: value?.toString() || "",
			});
		} else if (value === "") {
			setDefaultValue({ text: "", info: "" });
		}
		if (!botWaitLoader) {
			setIsSearching(false);
		}
	}, [value, botWaitLoader]);

	useEffect(() => {
		if (isSearching) {
			setTimeout(() => {
				setIsSearching(false);
			}, 5000);
		}
	}, [isSearching]);

	useEffect(() => {
		if (
			!islabelvisible &&
			!afterSelect &&
			results &&
			results.length > 0 &&
			autoCompleteCount.current !== 0
		) {
			setOpen(true);
		}
		if (islabelvisible) {
			if (
				!afterSelect &&
				results &&
				results.length > 0 &&
				typeof inputValue === "string"
			) {
				setOpen(true);
			}
		}
		autoCompleteCount.current = autoCompleteCount.current + 1;
	}, [results?.length]);

	const handleSearchInput = (e) => {
		if (e.key === "Enter" && e.target.value && !!e.target.value.trim().length) {
			handleChange(e);
			onBlurField(e, "search");
			setIsSearching(true);
		}
	};
	const isBoolean = (val) => "boolean" === typeof val;
	return (
		<FormContainer
			islabelvisible={islabelvisible}
			PopperComponent={PopperMy}
			open={open}
			size="small"
			id={id}
			name={id}
			autoHighlight={true}
			loading={loading}
			onOpen={() => {
				setOpen(true);
			}}
			onClose={() => {
				setOpen(false);
			}}
			options={results || []}
			getOptionLabel={(option) => option.text || ""}
			isOptionEqualToValue={(option, value) => option.text === value.text}
			value={defaultValue}
			onChange={(option, value, reason) => {
				if (value) {
					setInputValue(value ? value.text : "");
					handleChange(
						{ target: { name: id } },
						"lookup",
						value ? value.text : ""
					);
					onSelectField(id, value);
					setAfterSelect(true);
				}
				if (reason === "clear") {
					setDefaultValue([]);
					setInputValue("");
					handleChange({ target: { name: id } }, "lookup", "");
					onSelectField(id, {
						text: "",
						info: "",
					});
					setAfterSelect(false);
				}
			}}
			disabled={readOnly || isSearching}
			disableClearable={!inputValue}
			renderOption={(props, option) => {
				const info = option?.info;
				let rowsOfInfo, toolTipJsx, shudToolTipRender;

				if (Object.prototype.toString.call(info) === "[object Object]") {
					rowsOfInfo = Object.entries(info)
						.map(([key, val]) =>
							["[object String]", "[object Number]"].includes(
								Object.prototype.toString.call(val)
							) ? (
								<tr>{[<td>{key}</td>, <td>{val}</td>]}</tr>
							) : null
						)
						.filter((itm) => itm !== null);

					toolTipJsx = (
						<table style={{ borderSpacing: "1px" }}>{rowsOfInfo}</table>
					);
					shudToolTipRender = !!rowsOfInfo.length;
				} else if (Object.prototype.toString.call(info) === "[object String]") {
					toolTipJsx = info;
					shudToolTipRender = !!info;
				} else {
					toolTipJsx = "";
					shudToolTipRender = false;
				}

				return (
					<LookUpDropCustom shudToolTipRender={shudToolTipRender} {...props}>
						<span>{option.text}</span>
						{shudToolTipRender && (
							<BootstrapTooltip title={toolTipJsx} arrow>
								<InfoOutlinedIcon sx={{ color: "#98b0c8", fontSize: 20 }} />
							</BootstrapTooltip>
						)}
					</LookUpDropCustom>
				);
			}}
			renderInput={(params) => (
				<TextFieldContainer
					{...params}
					// label={isSmallScreen || isSections === true ? title : null}
					label={!islabelvisible ? <><Mandatory mandatory={mandatory} />{title}</> : null}
					variant="outlined"
					id={id}
					value={inputValue}
					// required={mandatory}
					name={id}
					ref={lookupField}
					onKeyDown={handleSearchInput}
					onChange={(e) => setInputValue(e.target.value)}
					InputProps={{
						...params.InputProps,
						autoComplete: "new-password",
						endAdornment: (
							<>
								{isSearching ? (
									<CircularProgress color="inherit" size={20} />
								) : (
									<InputAdornmentContainer position="end">
										<SearchIcon
											onClick={() => {
												setAfterSelect(false);
												if (
													lookupField.current &&
													lookupField.current.children[0] &&
													lookupField.current.children[0].children[0] &&
													lookupField.current.children[0].children[0]
														.localName === "input"
												) {
													handleSearchInput({
														key: "Enter",
														target: {
															name: lookupField.current.children[0].children[0]
																.name,
															value:
																lookupField.current.children[0].children[0]
																	.value,
														},
													});
												} else if (
													lookupField.current &&
													lookupField.current.children[1] &&
													lookupField.current.children[1].children[0] &&
													lookupField.current.children[1].children[0]
														.localName === "input"
												) {
													handleSearchInput({
														key: "Enter",
														target: {
															name: lookupField.current.children[1].children[0]
																.name,
															value:
																lookupField.current.children[1].children[0]
																	.value,
														},
													});
												}
											}}
										/>
									</InputAdornmentContainer>
								)}
								{/*{params.InputProps.endAdornment}*/}
							</>
						),
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
				/>
			)}
		/>
	);
};
export default LookupInput;
