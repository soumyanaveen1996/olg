/* eslint-disable no-inner-declarations */
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import TableContainer from "@mui/material/TableContainer";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import moment from "moment";
import TextInput from "../Common/FMForm/FormTypes/TextInput/TextInput";
import RadioInput from "../Common/FMForm/FormTypes/RadioInput/RadioInput";
import SelectInput from "../Common/FMForm/FormTypes/SelectInput/SelectInput";
import ObjectInput from "../Common/FMForm/FormTypes/ObjectInput/ObjectInput";
import ButtonsField from "../Common/FMForm/FormTypes/ButtonsField/ButtonsField";
import SwitchInput from "../Common/FMForm/FormTypes/SwitchInput/SwitchInput";
import DateTimeInput from "../Common/FMForm/FormTypes/DateTimeInput/DateTimeInput";
import LookupInput from "../Common/FMForm/FormTypes/LookupInput/LookupInput";
import CheckboxInput from "../Common/FMForm/FormTypes/CheckboxInput/CheckboxInput";
import FileUploadField from "../Common/FMForm/FormTypes/FileUploadField/FileUploadField";
import { getFileName } from "../../../Services/FilesService";
import { uploadingTheFile } from "../Common/FMForm/UploadingFile";
import { getAuthData } from "../../../Services/StorageService";
import { useSelector } from "react-redux";
import ObjectInput2 from "../Common/FMForm/FormTypes/ObjectInput/ObjectInput2";

const TableMainConatiner = styled(TableContainer)(({ theme }) => ({
	width: "100%",
	overflow: "hidden",
	"& .MuiFormControl-root": {
		marginTop: 15,
		"& .MuiFormControlLabel-root": {
			marginBottom: -10,
		},
	},
}));

const customStyleForCheckbox = { marginLeft: "10px", marginBottom: "10px" };

function FMFilterFieldsComponent({
	conversation,
	options,
	handleAction,
	updateRedux,
	showLargeScreen = true,
}) {
	const theme = useTheme();
	const largeScreen = useMediaQuery(theme.breakpoints.up("sm"));
	const [isFileUploading, setIsFileUploading] = useState(false);
	const [, setDisableSubmit] = useState(true);

	const { filteredColumns: fields, genericError } = useSelector(
		(state) => state.v2.NonConversationalFilter
	);
	const {
		user: { userTimezone },
	} = getAuthData();
	const defaultUserTimezone = "Etc/UTC";

	useEffect(() => {
		if (fields && fields.length) {
			let mandatoryFields = [];
			function isEmptyValues(value) {
				return (
					value === undefined ||
					value === null ||
					(typeof value === "object" && Object.keys(value).length === 0) ||
					(typeof value === "string" && value.length === 0)
				);
			}
			fields.forEach((el, index) => {
				if (
					el.mandatory &&
					(isEmptyValues(el.value) || el.validationResult === false)
				) {
					mandatoryFields.push(index);
				}
			});
			if (
				mandatoryFields.length ||
				(genericError && !genericError.validationResult)
			) {
				setDisableSubmit(true);
			} else {
				setDisableSubmit(false);
			}
		}
	}, [JSON.stringify(fields), genericError]);

	const handleChange = (e, type, val) => {
		fields.forEach((el) => {
			if (el.id === e.target.name) {
				switch (type) {
					case "lookup":
					case "uploadFile":
						el.value = val;
						break;
					case "removeUploadFile":
						delete el.value;
						break;
					default:
						el.value = e.target.value;
						break;
				}
				delete el.validationResult;
				delete el.validationMessage;
				updateRedux(el);
			}
		});
	};

	const onBlurField = (e, action = "move") => {
		fields.forEach((el) => {
			if (el.id === e.target.name) {
				handleAction(action, el.id, el.value || "");
			}
		});
	};

	const onSelectField = (id, value = "", action = "move") => {
		handleAction(action, id, value);
	};

	const handleChangeSwitch = (e) => {
		fields.forEach((el) => {
			if (el.id === e.target.name) {
				el.value = e.target.checked;
				delete el.validationResult;
				delete el.validationMessage;
				updateRedux(el);
			}
		});
	};

	const handleChangeCheck = (e) => {
		fields.forEach((el) => {
			if (el.id === e.target.id) {
				el.value = el.value || [];
				if (el.value.includes(e.target.name)) {
					el.value = el.value.filter((item) => item !== e.target.name);
				} else {
					el.value.push(e.target.name);
				}
				delete el.validationResult;
				delete el.validationMessage;
				updateRedux(el);
			}
		});
	};

	const handleChangeDateTime = (value, name) => {
		fields.forEach((el) => {
			if (el.id === name) {
				let ipochDate = "";
				ipochDate = value
					? moment(value)
							.tz(userTimezone || defaultUserTimezone)
							.format("x")
					: null;
				el.value = ipochDate ? parseInt(ipochDate) : null;
				delete el.validationResult;
				delete el.validationMessage;
				updateRedux(el);
			}
		});
	};

	const handleBlurDateTime = (value, name) => {
		fields.forEach((el) => {
			if (el.id === name) {
				let ipochDate = "";
				ipochDate = value ? moment(value).utc().format("x") : null;
				el.value = ipochDate ? parseInt(ipochDate) : null;
				handleAction("move", el.id, ipochDate ? parseInt(ipochDate) : null);
			}
		});
	};

	const handleClick = (e, type, id, title = null) => {
		e.persist();
		switch (type) {
			case "button":
				handleAction("click", id, title);
				break;
			case "uploadFile": {
				let file = e.target.files;
				if (!file) {
					return;
				}
				let fileDetailObj = file[0];
				let fileName = file && file[0] ? file[0].name : "";
				let createFileName = getFileName();
				createFileName += fileName.substr(
					fileName.lastIndexOf("."),
					fileName.length - 1
				);
				setIsFileUploading(true);
				uploadingTheFile(fileDetailObj, conversation, createFileName)
					.then((data) => {
						fields.forEach((el) => {
							if (el.id === e.target.name) {
								el.value = data.split("/").pop();
								el.fileName = fileName;
								updateRedux(el);
								handleAction("move", el.id, el.value);
							}
						});
						setIsFileUploading(false);
					})
					.catch((err) => {
						console.log("on error === ", err);
						setIsFileUploading(false);
					});
				break;
			}
			case "removeUploadFile": {
				let custEvent = {
					target: {
						name: id,
					},
				};
				handleChange(custEvent, type);
				setIsFileUploading(false);
				break;
			}
			default:
				break;
		}
	};

	return (
		<TableMainConatiner component={"div"}>
			{Array.isArray(fields) &&
				fields?.map((field) => {
					if (!field.hidden) {
						switch (field.type) {
							case "text_field":
							case "number":
							case "text_area":
								return (
									<TextInput
										key={field.id}
										{...field}
										readOnly={options?.readOnly ? true : field.readOnly}
										isSmallScreen={!(showLargeScreen && largeScreen)}
										handleChange={handleChange}
										onBlurField={onBlurField}
									/>
								);

							case "radiobutton":
								return (
									<RadioInput
										key={field.id}
										{...field}
										readOnly={options?.readOnly ? true : field.readOnly}
										isSmallScreen={!(showLargeScreen && largeScreen)}
										handleChange={handleChange}
										onBlurField={onBlurField}
									/>
								);

							case "dropdown": {
								return (
									<SelectInput
										key={field.id}
										{...field}
										readOnly={options?.readOnly ? true : field.readOnly}
										isSmallScreen={!(showLargeScreen && largeScreen)}
										multiple={false}
										handleChange={handleChange}
										onBlurField={onBlurField}
									/>
								);
							}
							case "object_dropdown": {
								return (
									<ObjectInput2
										key={field.id}
										{...field}
										readOnly={options?.readOnly ? true : field.readOnly}
										isSmallScreen={!(showLargeScreen && largeScreen)}
										multiple={false}
										handleChange={handleChange}
										onBlurField={onBlurField}
									/>
								);
							}
							case "multi_selection":
								return (
									<SelectInput
										key={field.id}
										{...field}
										readOnly={options?.readOnly ? true : field.readOnly}
										isSmallScreen={!(showLargeScreen && largeScreen)}
										multiple={true}
										handleChange={handleChange}
										onBlurField={onBlurField}
									/>
								);

							case "file_field":
								return (
									<FileUploadField
										key={field.id}
										{...field}
										readOnly={options?.readOnly ? true : field.readOnly}
										isFileUploading={isFileUploading}
										isSmallScreen={!(showLargeScreen && largeScreen)}
										handleClick={handleClick}
									/>
								);

							case "buttons_field":
								return (
									<ButtonsField
										key={field.id}
										{...field}
										readOnly={options?.readOnly ? true : field.readOnly}
										isSmallScreen={!(showLargeScreen && largeScreen)}
										handleClick={handleClick}
									/>
								);

							case "switch":
								return (
									<SwitchInput
										key={field.id}
										{...field}
										readOnly={options?.readOnly ? true : field.readOnly}
										isSmallScreen={!(showLargeScreen && largeScreen)}
										handleChangeSwitch={handleChangeSwitch}
									/>
								);
							case "checkbox":
								return (
									<div style={customStyleForCheckbox}>
										<CheckboxInput
											key={field.id}
											{...field}
											readOnly={options?.readOnly ? true : field.readOnly}
											isSmallScreen={!(showLargeScreen && largeScreen)}
											handleChangeCheck={handleChangeCheck}
										/>
									</div>
								);

							case "date":
							case "time":
							case "datetime":
								return (
									<DateTimeInput
										key={field.id}
										{...field}
										readOnly={options?.readOnly ? true : field.readOnly}
										isSmallScreen={!(showLargeScreen && largeScreen)}
										handleChangeDateTime={handleChangeDateTime}
										handleBlurDateTime={handleBlurDateTime}
									/>
								);
							case "password_field": // TODO
								break;
							case "slider": // TODO
								break;
							case "image_field": // TODO
								break;
							case "lookup":
								return (
									<LookupInput
										key={field.id}
										{...field}
										readOnly={options?.readOnly ? true : field.readOnly}
										isSmallScreen={!(showLargeScreen && largeScreen)}
										handleChange={handleChange}
										onBlurField={onBlurField}
										onSelectField={onSelectField}
									/>
								);
						}
					}
					return null;
				})}
		</TableMainConatiner>
	);
}

export default React.memo(FMFilterFieldsComponent);
