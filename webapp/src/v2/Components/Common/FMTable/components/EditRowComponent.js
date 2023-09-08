import React, { useState, useEffect } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import Link from "@mui/material/Link";
import moment from "moment-timezone";
import _ from "lodash";

import FieldGenerator from "../../../../Utils/FieldGenerator";
import CachedImage from "../../../../../Components/Common/CachedImage";
import { getAuthData } from "../../../../../Services/StorageService";
import { Button, styled } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	fontSize: 12,
	borderBottom: "none !important",
}));

const StyledIconTableCell = styled(TableCell)(({ theme }) => ({
	fontSize: 12,
	borderBottom: "none !important",
	display: "flex",
	alignItems: "center",
}));

const StyledLink = styled(Link)(({ theme }) => ({
	fontSize: 12,
	color: "#638dff !important",
}));

const StyledTableRow = styled(TableRow)(
	({ theme }) => ({
		backgroundColor: "#ffffff",
		"&:nth-of-type(odd)": {
			backgroundColor: "#f4f7fb",
		},
		whiteSpace: "break-spaces",
	}),
	(props) =>
		props.isOffline !== "true" && {
			backgroundColor: "#FFF1E2",
			"&:nth-of-type(odd)": {
				backgroundColor: "#F9EBDC",
			},
		}
);

const SaveButton = styled(Button)(({ theme }) => ({
	textTransform: "none",
	border: "none",
	fontSize: "12px",
	padding: "5px 12px",
	borderRadius: 30,
	margin: "0 5px",
	backgroundColor: "#638dff",
	color: "#FFFFFF",
	fontFamily: "SF Pro Text Bold",
	boxShadow: "none",
	"&:hover": {
		backgroundColor: "#4c71d6",
	},
	"&:focus": {
		boxShadow: "0 0 6px 0 #638dff !important",
	},
	"&:disabled": {
		backgroundColor: "#aeb8d6",
		color: "#e8ecf8",
	},
}));

const Divider = styled("div")(() => ({
	backgroundColor: "#c4d8ff",
	width: "2px",
	height: "22px",
	display: "inline-block",
	margin: "0 3px",
	verticalAlign: "inherit",
}));

const EditRowComponent = ({
	onlineStatus,
	row,
	onRowInputChange,
	options,
	handleSelectRow,
	key,
	selectedRow,
	handleAction,
	handleInlineFormAction,
	onConfirm,
	onDiscard,
}) => {
	const {
		user: { userTimezone },
	} = getAuthData();
	const defaultUserTimezone = "Etc/UTC";
	const [disableSubmit, setDisableSubmit] = useState(true);
	const [isLookupInvalidSearch, setIsLookupInvalidSearch] = useState(false);
	const [isLookupValueChanged, setIsLookupValueChanged] = useState(false);
	const [isDefaultLookupInvalid, setisDefaultLookupInvalid] = useState(false);

	useEffect(() => {
		if (Object.values(row)[0].fields && Object.values(row)[0].fields.length) {
			Object.values(row)[0].fields.forEach((el, index) => {
				if (el?.type == "lookup") {
					if (!el.value) {
						setisDefaultLookupInvalid(true);
					}
				}
			});
		}
	}, []);

	// useEffect(() => {
	// 	setisDefaultLookupInvalid(true);
	// }, []);

	useEffect(() => {
		setIsLookupInvalidSearch(false);
		if (Object.values(row)[0].fields && Object.values(row)[0].fields.length) {
			let mandatoryFields = [];
			let isEmptyValues = (value) => {
				return (
					value === undefined ||
					value === null ||
					(typeof value === "object" && Object.keys(value).length === 0) ||
					(typeof value === "string" && value.length === 0)
				);
			};
			Object.values(row)[0].fields.forEach((el, index) => {
				if (el?.type == "lookup") {
					if (!isDefaultLookupInvalid && !isLookupValueChanged) {
						setIsLookupInvalidSearch(false);
					} else {
						if (!el.results || !el.results.length) {
							setIsLookupInvalidSearch(true);
						} else if (el.results && el.results.length > 0) {
							if (el.value.text) {
								let resultsFromSearch = el.results.map((eachObject) => {
									return eachObject.text;
								});
								if (resultsFromSearch.includes(el.value.text)) {
									setIsLookupInvalidSearch(false);
								} else {
									setIsLookupInvalidSearch(true);
								}
							} else {
								setIsLookupInvalidSearch(true);
							}
						}
					}
				}
				if (
					el.mandatory &&
					(isEmptyValues(el.value) || el.validationResult === false)
				) {
					mandatoryFields.push(index);
				}
			});

			if (mandatoryFields.length || isLookupInvalidSearch) {
				setDisableSubmit(true);
			} else {
				setDisableSubmit(false);
			}
		}
	});

	const handleChange = (e, type, val) => {
		let updatedRow = _.cloneDeep(row);
		let isInputEdited = false;
		Object.values(updatedRow)[0].fields.forEach((el) => {
			if (el.id === e?.target?.name) {
				if (el.value != e?.target?.value) isInputEdited = true
				if (el.type == "lookup") {
					setIsLookupValueChanged(true);
				}
				switch (type) {
					case "lookup":
					case "uploadFile":
						el.value = val;
						break;
					case "removeUploadFile":
						delete el.value;
						break;
					default:
						el.value = e?.target?.value.trim();
				}
				delete el.validationResult;
				delete el.validationMessage;
			}
		});
		onRowInputChange(e, updatedRow, isInputEdited);

	};

	const handleBlur = (e, action = "move") => {
		Object.values(row)[0].fields.forEach((el) => {
			let currentFieldValue = "";
			if (el.id === e.target.name) {
				switch (el.type) {
					case "lookup":
					case "uploadFile":
						currentFieldValue = e.value || e.target.value;
						break;
					default:
						currentFieldValue = e.target.value;
						break;
				}
				handleInlineFormAction(
					action,
					Object.keys(row)[0],
					el.id,
					{
						currentFieldValue,
					},
					Object.values(row)[0].rowOptions.newRow
				);
			}
		});
	};

	const onSelectField = (id, value = "", action = "move") => {
		let updatedRow = _.cloneDeep(row);
		Object.values(updatedRow)[0].fields.forEach((el) => {
			if (el.id === id) {
				el.value = value;
				delete el.validationResult;
				delete el.validationMessage;
				onRowInputChange(undefined, updatedRow);
			}
		});

		handleInlineFormAction(
			action,
			Object.keys(row)[0],
			id,
			{
				currentFieldValue: value,
			},
			Object.values(row)[0].rowOptions.newRow
		);
	};

	const handleChangeSwitch = (e) => {
		let updatedRow = _.cloneDeep(row);
		Object.values(updatedRow)[0].fields.forEach((el) => {
			if (el.id === e.target.name) {
				el.value = e.target.checked;
				delete el.validationResult;
				delete el.validationMessage;
				onRowInputChange(e, updatedRow);
				handleInlineFormAction(
					"move",
					Object.keys(row)[0],
					el.id,
					{
						currentFieldValue: el.value,
					},
					Object.values(row)[0].rowOptions.newRow
				);
			}
		});
	};

	const handleChangeCheck = (e) => {
		let updatedRow = _.cloneDeep(row);
		Object.values(updatedRow)[0].fields.forEach((el) => {
			if (el.id === e.target.id) {
				el.value = el.value || [];
				if (el.value.includes(e.target.name)) {
					el.value = el.value.filter((item) => item != e.target.name);
				} else {
					Array.isArray(el.value) && el.value.push(e.target.name);
				}
				delete el.validationResult;
				delete el.validationMessage;
				onRowInputChange(e, updatedRow);
				handleInlineFormAction(
					"move",
					Object.keys(row)[0],
					el.id,
					{
						currentFieldValue: el.value,
					},
					Object.values(updatedRow)[0].rowOptions.newRow
				);
			}
		});
	};

	const handleChangeDateTime = (value, name) => {
		let updatedRow = _.cloneDeep(row);
		Object.values(updatedRow)[0].fields.forEach((el) => {
			if (el.id === name) {
				let ipochDate = "";
				ipochDate = moment(value)
					.tz(userTimezone || defaultUserTimezone)
					.format("x");
				el.value = parseInt(ipochDate);
				delete el.validationResult;
				delete el.validationMessage;
				onRowInputChange(undefined, updatedRow);
			}
		});
	};

	const handleBlurDateTime = (value, name) => {
		let updatedRow = _.cloneDeep(row);
		Object.values(updatedRow)[0].fields.forEach((el) => {
			if (el.id === name) {
				let ipochDate = "";
				ipochDate = moment(value).utc().format("x");
				el.value = parseInt(ipochDate);
				handleInlineFormAction(
					"move",
					Object.keys(row)[0],
					el.id,
					{
						currentFieldValue: parseInt(ipochDate) || "",
					},
					Object.values(updatedRow)[0].rowOptions.newRow
				);
			}
		});
	};

	const handleClick = (e, type, id, title = null) => {
		e.persist();
		switch (type) {
			case "button":
				handleInlineFormAction(
					"click",
					Object.keys(row)[0],
					id,
					{
						currentFieldValue: title || "",
					},
					Object.values(row)[0].rowOptions.newRow
				);
				break;
			case "uploadFile": {
				alert("Remove uploaded file action not supported!");
				break;
			}
			case "removeUploadFile": {
				alert("Remove uploaded file action not supported!");
				break;
			}
			default:
				break;
		}
	};

	const handleOnFieldAction = () => {
		const rowFormatted = {};
		Object.values(row)[0].fields.forEach((item) => {
			rowFormatted[item.id] = item.value;
		});
		row = rowFormatted;
		handleAction(
			"onFieldAction",
			{
				row: rowFormatted,
			},
			null,
			Object.keys(row)[0]
		);
	};

	const renderCell = (column) => {
		if (!column || column.hidden) {
			return;
		}
		switch (column.type) {
			case "text_field":
			case "text_area":
			case "radiobutton":
			case "dropdown":
			case "multi_selection":
			case "switch":
			case "checkbox":
			case "slider":
			case "number":
			case "lookup":
				return column.primaryKey ? (
					<StyledLink
						onClick={() => {
							let objValue = {};
							Object.values(row)[0].fields.map((col) => {
								objValue[col.id] = col.value;
								return col;
							});
							handleAction("quickAction", objValue);
						}}
					>
						{column.value}
					</StyledLink>
				) : (
					column.value
				);
			case "password_field":
				return "*****";
			case "buttons_field":
				if (column.options && column.options.length > 0) {
					return (
						<>
							{column?.options.map((item) => (
								<a key={item.label} onClick={() => handleOnFieldAction()}>
									<span
										style={{
											color: "rgb(0, 189, 242)",
											textDecoration: "underline",
											cursor: "pointer",
										}}
									>
										{item.label}
									</span>
								</a>
							))}
						</>
					);
				} else {
					return (
						<a onClick={() => handleOnFieldAction()}>
							<span
								style={{
									color: "rgb(0, 189, 242)",
									textDecoration: "underline",
									cursor: "pointer",
								}}
							>
								{column?.value?.text}
							</span>
						</a>
					);
				}
			case "image_field":
			case "file_field":
				return column.fileName;
			case "date":
				return moment(column.value)
					.tz(userTimezone || defaultUserTimezone)
					.format("ll");
			case "time":
				return moment(column.value)
					.tz(userTimezone || defaultUserTimezone)
					.format("LT");
			case "datetime":
				return moment(column.value)
					.tz(userTimezone || defaultUserTimezone)
					.format("lll");
			case "alert_field":
				switch (column.value) {
					case 1:
						return (
							<div
								style={{
									boxSizing: "border-box",
									borderRadius: "6px",
									height: " 12px",
									width: "12px",
									backgroundColor: "#2DB757",
								}}
							/>
						);
					case 2:
						return (
							<span>
								<CachedImage
									imgKey="warningIcon"
									image="/img/Shape@2x.png"
									width="14px"
								/>
							</span>
						);
					case 3:
						return (
							<span>
								<CachedImage
									imgKey="errorIcon"
									image="/img/error-icon@2x.png"
									width="14px"
								/>
							</span>
						);
					default:
						return column.value;
				}
			case "object_multi_selection": {
				let opts = column.options;
				let vals = column.value;
				let dspfldArr = [];

				for (let i = 0; i < vals?.length; i++) {
					let selectedItm = opts?.find((opt) => opt?.value === vals[i]);
					if (selectedItm) {
						i === vals?.length - 1
							? dspfldArr.push(selectedItm?.displayField)
							: dspfldArr.push(selectedItm?.displayField + ", ");
					}
				}
				return column.primaryKey ? (
					<StyledLink
						onClick={() => {
							let objValue = {};
							Object.values(row)[0].fields.map((col) => {
								objValue[col.id] = col.value;
								return col;
							});
							handleAction("quickAction", objValue);
						}}
					>
						{dspfldArr}
					</StyledLink>
				) : (
					dspfldArr
				);
			}
		}
	};

	const rowOptions =
		Object.values(row) && Object.values(row)[0]?.rowOptions?.rowMenu !== null
			? Object.values(row)[0]?.rowOptions?.rowMenu
			: options?.rowMenu;
	const isEdit = rowOptions?.find((i) => i.name.includes("Edit"))?.name;
	const isDelete = rowOptions?.find((i) => i.name.includes("Delete"))?.name;
	const newRowData = Object.values(row) && Object.values(row)[0]?.rowOptions;
	const isNewRow = newRowData?.newRow;

	const isMainOtherMenu = options?.rowMenu?.length > 0;
	// &&
	// options?.rowMenu.length &&
	// options?.rowMenu.filter((i) => {
	// 	if (i.name === isEdit) return;
	// 	if (i.name === isDelete) return;
	// 	return i;
	// })?.length > 0;
	return (
		<StyledTableRow isOffline={onlineStatus === 0 ? "true" : "false"}>
			<StyledTableCell padding="none" align="left" />
			{options.selectableRows && (
				<StyledTableCell>
					<Checkbox
						checked={
							!!selectedRow?.filter((item) => item[key] === row[key])?.length
						}
						onChange={(e) => handleSelectRow(e, row)}
						color="primary"
					/>
				</StyledTableCell>
			)}

			{isMainOtherMenu && !isNewRow && <StyledTableCell />}

			{options?.columnNames &&
				Object.values(row)[0].fields.map((column) => {
					if (Object.keys(options.columnNames).includes(column.id)) {
						if (!column.hidden) {
							return (
								<StyledTableCell key={column.id}>
									<FieldGenerator
										field={column}
										options={options}
										handleChange={handleChange}
										onBlurField={handleBlur}
										handleClick={handleClick}
										onSelectField={onSelectField}
										handleChangeSwitch={handleChangeSwitch}
										handleChangeCheck={handleChangeCheck}
										handleChangeDateTime={handleChangeDateTime}
										handleBlurDateTime={handleBlurDateTime}
									/>
								</StyledTableCell>
							);
						} else {
							return (
								<StyledTableCell key={column.id}>
									{renderCell(column)}
								</StyledTableCell>
							);
						}
					} else {
						return null;
					}
				})}
			<StyledIconTableCell>
				<IconButton
					aria-label="delete"
					size="small"
					onClick={() => onDiscard(row)}
				>
					<CloseIcon color={"#aeb8d6"} fontSize="small" />
				</IconButton>
				<Divider />
				<SaveButton
					variant="contained"
					disabled={disableSubmit}
					onClick={() => onConfirm(row)}
				>
					Save
				</SaveButton>
			</StyledIconTableCell>
		</StyledTableRow>
	);
};

export default EditRowComponent;
