import React, { useState, useEffect } from "react";

import { SketchPicker } from "react-color";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

export default function ColorPickerField(props) {
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
		isSections,
		isSmallScreen,
		title,
		type,
	} = props;
	const defaultValue = "#0095F2";

	const colorHexReStr = "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$";
	const colorHexRe = new RegExp(colorHexReStr);

	const defaultState = {
		txtInput: defaultValue,
		isTxtInputError: false,
		displayColorPicker: false,
		disableAlpha: true,
		presetColors: [defaultValue],
		color: {
			hex: defaultValue,
			rgb: {
				r: 51,
				g: 51,
				b: 51,
				a: 1,
			},
			hsl: {
				h: 0,
				s: 0,
				l: 0.2,
				a: 1,
			},
		},
	};
	const [state, setState] = useState(() => {
		if (value && colorHexRe.test(value)) {
			return {
				...defaultState,
				txtInput: value,
				color: { ...defaultState.color, hex: value },
			};
		}
		return {
			...defaultState,
			txtInput: defaultValue,
			color: { ...defaultState.color, hex: defaultValue },
		};
	});

	useEffect(() => {
		if (value && colorHexRe.test(value)) {
			setState((prev) => ({
				...prev,
				txtInput: value,
				color: { ...prev.color, hex: value },
			}));
			return;
		}
		setState((prev) => ({
			...prev,
			txtInput: defaultValue,
			color: { ...defaultState.color, hex: defaultValue },
		}));
	}, [value]);

	const handleClick = (e) => {
		if (!readOnly) {
			e.stopPropagation();
			setState((prev) => ({
				...prev,
				displayColorPicker: !prev.displayColorPicker,
			}));
			const currFieldValue = state.color.hex;
			const syntheticEvt = {
				target: { name: id, value: currFieldValue },
			};
			if (state.displayColorPicker) {
				handleChange(syntheticEvt, type);
				onBlurField(syntheticEvt, undefined, "color_picker");
			}
		}
	};

	const handleColrPickrClick = (e) => {
		e.stopPropagation();
	};

	const handleClose = () => {
		if (!readOnly) {
			setState((prev) => ({
				...prev,
				txtInput: state.color.hex,
				isTxtInputError: false,
				displayColorPicker: false,
			}));
			const currFieldValue = state.color.hex;
			const syntheticEvt = {
				target: { name: id, value: currFieldValue },
			};
			handleChange(syntheticEvt, type);
			onBlurField(syntheticEvt, undefined, "color_picker");
		}
	};

	const handleColorChange = (color) => {
		if (!readOnly) {
			setState((prev) => ({
				...prev,
				txtInput: color.hex,
				isTxtInputError: false,
				color: { ...prev.color, hex: color.hex },
			}));
		}
	};

	const handleTxtFieldColorChange = (e) => {
		if (!readOnly) {
			const txtVal = e.target.value;
			setState((prev) => {
				if (colorHexRe.test(txtVal)) {
					return {
						...prev,
						isTxtInputError: false,
						txtInput: txtVal,
						color: { ...prev.color, hex: txtVal },
					};
				}
				return {
					...prev,
					isTxtInputError: true,
					txtInput: txtVal,
				};
			});
			if (colorHexRe.test(txtVal)) {
				const syntheticEvt = {
					target: { name: id, value: txtVal },
				};
				handleChange(syntheticEvt, type);
			}
		}
	};

	const handleBlur = (e) => {
		if (!readOnly) {
			const currFieldValue = state.color.hex;
			const syntheticEvt = {
				target: { name: id, value: currFieldValue },
			};
			onBlurField(syntheticEvt, undefined, "color_picker");
			setState((prev) => {
				return {
					...prev,
					isTxtInputError: false,
					txtInput: currFieldValue,
				};
			});
		}
	};

	const isBoolean = (val) => "boolean" === typeof val;

	const isError =
		validation && isBoolean(validationResult) ? !validationResult : false;

	const helperText =
		isBoolean(validationResult) && !validationResult ? validationMessage : info;

	return (
		<>
			{/*{(isSmallScreen || isSections === true) && (*/}
			{/*	<InputLabel*/}
			{/*		style={{ position: "relative", top: "35px" }}*/}
			{/*		required={mandatory}*/}
			{/*		id={id}*/}
			{/*	>*/}
			{/*		{title}*/}
			{/*	</InputLabel>*/}
			{/*)}*/}
			<div style={{ display: "flex" }}>
				<div
					onClick={handleClick}
					style={{
						width: "38px",
						height: "38px",
						display: "inline-block",
						position: "relative",
						borderRadius: "4px",
						marginLeft: "14%",
						marginRight: "1%",
						border: "1px solid #c4d8ff !important",
						cursor: readOnly ? "default" : "pointer",
						pointerEvents: readOnly ? "none" : "auto",
						padding: "4px",
					}}
				>
					<div
						style={{
							width: "28px",
							height: "28px",
							borderRadius: "4px",
							backgroundColor: state.color.hex,
						}}
					></div>
					<div
						onClick={handleColrPickrClick}
						style={{ position: "absolute", zIndex: 9999999, top: "48px" }}
					>
						{state.displayColorPicker && (
							<>
								<ClickAwayListener onClickAway={handleClose}>
									<SketchPicker
										color={state.color.hex}
										onChange={handleColorChange}
										disableAlpha={state.disableAlpha}
										presetColors={state.presetColors}
									/>
								</ClickAwayListener>
							</>
						)}
					</div>
				</div>
				<FormControl
					style={{ width: "calc(100% - 15%)" }}
					error={
						validation && isBoolean(validationResult)
							? !validationResult
							: false
					}
				>
					<TextField
						id={id}
						name={id}
						type="text"
						size="small"
						// label={isSmallScreen || isSections === true ? title : null}
						label={title}
						variant="outlined"
						shrink={true}
						disabled={readOnly}
						value={state.txtInput}
						inputProps={{
							pattern: colorHexReStr,
						}}
						onChange={handleTxtFieldColorChange}
						required={mandatory}
						placeholder={placeholder}
						onBlur={handleBlur}
						style={{ height: "fit-content", width: "100%" }}
						helperText={
							!props.inline &&
							(state.isTxtInputError
								? "Enter valid hex color code! " + (helperText || "")
								: helperText)
						}
						error={isError}
					/>
				</FormControl>
			</div>
		</>
	);
}
