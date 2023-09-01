/* eslint-disable no-inner-declarations */
import React, { useState, useEffect } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import moment from "moment";
import Typography from "@mui/material/Typography";

import TextInput from "./FormTypes/TextInput/TextInput";
import PhoneNumberField from "./FormTypes/PhoneNumberField/PhoneNumberField";
import ColorPickerField from "./FormTypes/ColorPickerField/ColorPickerField";
import RadioInput from "./FormTypes/RadioInput/RadioInput";
import SelectInput from "./FormTypes/SelectInput/SelectInput";
import ObjectInput from "./FormTypes/ObjectInput/ObjectInput";
import ButtonsField from "./FormTypes/ButtonsField/ButtonsField";
import SwitchInput from "./FormTypes/SwitchInput/SwitchInput";
import DateTimeInput from "./FormTypes/DateTimeInput/DateTimeInput";
import LookupInput from "./FormTypes/LookupInput/LookupInput";
import CheckboxInput from "./FormTypes/CheckboxInput/CheckboxInput";
import FileUploadField from "./FormTypes/FileUploadField/FileUploadField";
import ImageUploadField from "./FormTypes/ImageUploadField/ImageUploadField";
import FMRegularFormComponent from "./FMRegularFormComponent";
import FMSectionsFormComponent from "./FMSectionsFormComponent";
import FMMap from "../FMMap/FMMap";
import { getFileName } from "../../../../Services/FilesService";
import { uploadingTheFile } from "./UploadingFile";
import { getAuthData } from "../../../../Services/StorageService";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import ObjectInput2 from "./FormTypes/ObjectInput/ObjectInput2";
import RichTextInput from "./FormTypes/RichTextInput/RichTextInput";
import {
	ContentState,
	EditorState,
	convertFromRaw,
	convertToRaw,
} from "draft-js";
import { toast } from "react-toastify";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	verticalAlign: "top",
	padding: "10px 20px",
	color: theme.palette.common.white,
	fontSize: 14,
	width: "50%",
}));

const CustomizedTypography = styled(Typography)(({ theme }) => ({
	margin: theme.spacing(1),
	marginLeft: theme.spacing(2),
	fontSize: "20px",
	fontWeight: "bold",
	fontStretch: "normal",
	fontStyle: "normal",
	lineHeight: "normal",
	letterSpacing: "-0.51px",
	color: "#2a2d3c",
}));

const CustomizedGrid = styled(Grid)(({ theme }) => ({
	marginBottom: theme.spacing(2),
	marginTop: theme.spacing(2),
}));

function FMFormComponent({
	conversation,
	fields,
	collectionData,
	options,
	handleAction,
	updateRedux,
	updatePromptOnCloseModal,
	handleConfirm,
	handleCancel,
	genericError,
	parentTabId,
	parentDocId
}) {
	const theme = useTheme();
	const largeScreen = useMediaQuery(theme.breakpoints.up("sm"));
	const [isFileUploading, setIsFileUploading] = useState([]);
	const [disableSubmit, setDisableSubmit] = useState(true);
	const [editorState, setEditorState] = useState(EditorState.createEmpty());
	const {
		user: { userTimezone },
	} = getAuthData();
	const defaultUserTimezone = "Etc/UTC";
	const componentInWindow = useSelector(
		(state) => state.chats.componentInWindow
	);
	let isFieldEdited = React.useMemo(() => ({ state: false }), [])
	const formValidationDetails = componentInWindow[conversation];

	useEffect(() => {
		if (fields && fields.length) {
			let mandatoryFields = [];
			let editingFields = [];
			function isEmptyValues(value) {
				return (
					value === undefined ||
					value === null ||
					(typeof value === "object" && Object.keys(value).length === 0) ||
					(typeof value === "string" && value.length === 0)
				);
			}
			fields.forEach((el, index) => {
				if (el.isFieldEditing && el.isFieldEditing == true) {
					editingFields.push(index);
				}
				if (!el.mandatory && el.validationResult === false) {
					mandatoryFields.push(index);
				} else if (
					el.mandatory &&
					(isEmptyValues(el.value) || el.validationResult === false)
				) {
					mandatoryFields.push(index);
				}
			});

			if (
				mandatoryFields.length ||
				(genericError && !genericError.validationResult) ||
				editingFields.length
			) {
				setDisableSubmit(true);
			} else {
				setDisableSubmit(false);
			}

			// if some validation comes from bot apply them
			if (formValidationDetails) {
				fields = fields.map((field) => {
					formValidationDetails.forEach((fieldDetails) => {
						// check if it is intended for the current field and apply
						if (fieldDetails.message.field === field.id) {
							field["validationResult"] = fieldDetails.message.validationResult;
							field["validationMessage"] =
								fieldDetails.message.validationMessage;
						}
					});
					return field;
				});
			}
		}
	}, [JSON.stringify(fields), genericError]);

	useEffect(() => {
		fields.forEach((el) => {
			if (el.id === "text" && el.type == "rich_text_area") {
				if (el.value) {
					// HTML to Draft - onload for single instance only
					const contentBlock = htmlToDraft(el.value);
					if (contentBlock) {
						const contentState = ContentState.createFromBlockArray(
							contentBlock.contentBlocks
						);
						const convertedData = EditorState.createWithContent(contentState);
						setEditorState(convertedData);
					}
				}
			}
		});
	}, []);

	const disableFormSubmit = (value) => {
		setDisableSubmit(value);
	};

	const updateField = (val) => {
		fields.forEach((el) => {
			if (el.id === "text" && el.type == "rich_text_area") {
				el.value = val;
				delete el.validationResult;
				delete el.validationMessage;
				updateRedux(el);
			}
		});
	};

	const onEditorContentChange = (data, maxLength) => {
		let rawData = convertToRaw(data.getCurrentContent());
		let charLength = rawData.blocks.reduce(
			(acc, curr) => acc + curr.text.length,
			0
		);

		if (charLength == 0) {
			setEditorState(data);
			updateField("");
			return disableFormSubmit(true);
		} else if (maxLength !== -1 && charLength > maxLength) {
			return toast["warn"](`Content length cannot be > ${maxLength}`, {
				position: toast.POSITION.TOP_LEFT,
			});
		}
		setEditorState(data);
		updateField(draftToHtml(rawData));
	};
	const handleChange = (e, type, val) => {
		fields.forEach((el) => {
			if (el?.id === e?.target?.name) {
				isFieldEdited.state = true;
				switch (type) {
					case "lookup":
					case "dropdown":
						el["isFieldEditing"] = false;
						el.value = val;
						break;
					case "multi_selection":
					case "object_multi_selection":
					case "checkRadioButton":
						el["isFieldEditing"] = false;
						el.value = e.target.value;
						break;
					case "uploadFile":
						el.value = val;
						break;
					case "removeUploadFile":
						delete el.fileName;
						delete el.value;
						break;
					case "uncheckRadioButton":
						el["isFieldEditing"] = false;
						el.value = "";
						break;
					case "password":
						el["isFieldEditing"] = true;
						el.value = e.target.value;
					default:
						el["isFieldEditing"] = true;
						el.value = e.target.value;
						break;
				}
				delete el.validationResult;
				delete el.validationMessage;
				updateRedux(el);
			}
		});
	};

	const onBlurField = (e, action = "move", type) => {
		fields.forEach((el) => {
			if (el.id === e.target.name) {
				el["isFieldEditing"] = false;
				updateRedux(el);
				handleAction(
					action,
					el.id,
					el.value === 0
						? 0
						: el.value || (type === "color_picker" ? "#0095F2" : "")
				);
			}
		});
		// When the field values are not edited, we just don't show the dialog prompt 
		if (!isFieldEdited.state) updatePromptOnCloseModal(conversation, false)
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
				handleAction("move", el.id, el.value);
			}
		});
	};

	const handleChangeCheck = (e) => {
		fields.forEach((el) => {
			if (el.id === e.target.id) {
				if (!el.value || (typeof el.value === "string" && !el.value.trim())) {
					el.value = [];
				}
				if (el.value.includes(e.target.name)) {
					el.value = el.value.filter((item) => item !== e.target.name);
				} else {
					el.value.push(e.target.name);
				}
				delete el.validationResult;
				delete el.validationMessage;
				updateRedux(el);
				handleAction("move", el.id, el.value);
			}
		});
	};

	const handleChangeDateTime = (value, name) => {
		fields.forEach((el) => {
			if (el.id === name) {
				let ipochDate = "";
				ipochDate = moment(value)
					.tz(userTimezone || defaultUserTimezone)
					.format("x");
				el.value = parseInt(ipochDate);
				el["editingDateTime"] = true;
				delete el.validationResult;
				delete el.validationMessage;
				updateRedux(el);
			}
		});
	};

	const handleChangeTime = (value, name) => {
		fields.forEach((el) => {
			if (el.id === name) {
				let ipochDate = "";
				ipochDate = moment(value, "HH:mm")
					.tz(userTimezone || defaultUserTimezone)
					.format("x");
				el.value = parseInt(ipochDate);
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
				ipochDate = moment(value).utc().format("x");
				el.value = parseInt(ipochDate);
				el.valueAsString = moment(value).format("DD/MM/YYYY");
				el["editingDateTime"] = false;
				updateRedux(el);
				handleAction("move", el.id, parseInt(ipochDate));
			}
		});
	};

	const handleBlurTime = (value, name) => {
		fields.forEach((el) => {
			if (el.id === name) {
				let ipochDate = "";
				ipochDate = moment(value, "HH:mm")
					.tz(userTimezone || defaultUserTimezone)
					.format("x");
				el.value = parseInt(ipochDate);
				updateRedux(el);
				handleAction("move", el.id, parseInt(ipochDate));
			}
		});
	};

	const handleClick = (e, type, id, title = null, scopeId, fileScope) => {
		e && e.persist && e.persist();
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
				setIsFileUploading((old) => {
					return [...old, id];
				});

				uploadingTheFile(
					fileDetailObj,
					conversation,
					createFileName,
					fileScope,
					scopeId
				)
					.then((data) => {
						fields.forEach((el) => {
							if (el.id === e.target.name) {
								el.value = data.split("/").pop();
								el.fileName = fileName;
								updateRedux(el);
								handleAction(
									"move",
									el.id,
									{
										currentFieldValue: el.value,
										fileName: el.fileName,
									},
									true
								);
							}
						});
						setIsFileUploading((old) => {
							return old.filter((item) => item !== id);
						});
					})
					.catch((err) => {
						setIsFileUploading((old) => {
							return old.filter((item) => item !== id);
						});
					});
				break;
			}
			case "removeUploadFile": {
				let custEvent = {
					target: {
						name: id,
					},
				};
				fields.forEach((el) => {
					if (el.id === custEvent.target.name) {
						handleAction(
							"move",
							el.id,
							{
								currentFieldValue: "",
								fileName: "",
							},
							true
						);
					}
				});
				handleChange(custEvent, type);
				setIsFileUploading((old) => {
					return old.filter((itm) => itm !== id);
				});
				break;
			}
			case "image_field": {
				// e is reference to underlying input for image_field, not event
				let file = e.files;
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
				setIsFileUploading((old) => {
					return [...old, id];
				});
				// console.log(
				// 	"biiiiiii",
				// 	fileDetailObj,
				// 	scopeId,
				// 	conversation,
				// 	createFileName,
				// 	fileScope || "conversation"
				// );
				uploadingTheFile(
					fileDetailObj,
					scopeId || conversation,
					createFileName,
					fileScope || "conversation"
				)
					.then((data) => {
						fields.forEach((el) => {
							if (el.id === e.name) {
								el.value = data.split("/").pop();
								el.fileName = fileName;
								updateRedux(el);
								handleAction(
									"move",
									el.id,
									{
										currentFieldValue: el.value,
										fileName: el.fileName,
									},
									true
								);
							}
						});
						setIsFileUploading((old) => {
							return old.filter((item) => item !== id);
						});
					})
					.catch((err) => {
						console.log("on error === ", err);
						setIsFileUploading((old) => {
							return old.filter((item) => item !== id);
						});
					});
				break;
			}
			default:
				break;
		}
	};

	const handleMapAreasClick = (
		field,
		type,
		id,
		title = null,
		map_new_areas_array
	) => {
		let areas_value = (Array.isArray(field?.value) && field?.value) || [];
		areas_value = areas_value.filter((area_val) =>
			Array.isArray(area_val.value)
		);
		if (map_new_areas_array.length === 0) {
			handleAction("move", id, areas_value);
			return;
		}
		if (areas_value.length === 0) {
			handleAction("move", id, map_new_areas_array);
			return;
		}
		handleAction("move", id, [...areas_value, ...map_new_areas_array]);
	};

	const renderFields = (field, isSections) => {
		let component = null;
		if (!field.hidden) {
			switch (field.type) {
				case "text_field":
				case "number":
				case "text_area":
					component = (
						<>
							<StyledTableCell align="left">
								<TextInput
									{...field}
									readOnly={options?.readOnly ? true : field.readOnly}
									isSmallScreen={!largeScreen}
									isSections={isSections}
									handleChange={handleChange}
									onBlurField={onBlurField}
								/>
							</StyledTableCell>
						</>
					);
					break;
				case "rich_text_area":
					// if (field.value) getEditorData(field.value)
					component = (
						<>
							<StyledTableCell align="left">
								<RichTextInput
									field={field}
									editorState={editorState}
									onEditorStateChange={onEditorContentChange}
								/>
							</StyledTableCell>
						</>
					);
					break;
				case "password_field":
					component = (
						<>
							<StyledTableCell align="left">
								<TextInput
									{...field}
									readOnly={options?.readOnly ? true : field.readOnly}
									isSmallScreen={!largeScreen}
									isSections={isSections}
									handleChange={handleChange}
									onBlurField={onBlurField}
								/>
							</StyledTableCell>
						</>
					);
					break;
				case "radiobutton":
					component = (
						<>
							<StyledTableCell align="left">
								<RadioInput
									{...field}
									readOnly={options?.readOnly ? true : field.readOnly}
									isSmallScreen={!largeScreen}
									isSections={isSections}
									handleChange={handleChange}
									onBlurField={onBlurField}
								/>
							</StyledTableCell>
						</>
					);
					break;
				case "dropdown":
					component = (
						<>
							<StyledTableCell align="left">
								<SelectInput
									{...field}
									readOnly={options?.readOnly ? true : field.readOnly}
									isSmallScreen={!largeScreen}
									isSections={isSections}
									multiple={false}
									handleChange={handleChange}
									onBlurField={onBlurField}
								/>
							</StyledTableCell>
						</>
					);
					break;
				case "object_multi_selection":
					component = (
						<>
							<StyledTableCell align="left">
								<ObjectInput2
									{...field}
									readOnly={options?.readOnly ? true : field.readOnly}
									isSmallScreen={!largeScreen}
									isSections={isSections}
									multiple={true}
									handleChange={handleChange}
									onBlurField={onBlurField}
								/>
							</StyledTableCell>
						</>
					);
					break;
				case "multi_selection":
					component = (
						<>
							<StyledTableCell align="left">
								<SelectInput
									{...field}
									readOnly={options?.readOnly ? true : field.readOnly}
									isSmallScreen={!largeScreen}
									isSections={isSections}
									multiple={true}
									handleChange={handleChange}
									onBlurField={onBlurField}
								/>
							</StyledTableCell>
						</>
					);
					break;
				case "file_field":
					component = (
						<>
							<StyledTableCell colSpan={2}>
								<FileUploadField
									{...field}
									readOnly={options?.readOnly ? true : field.readOnly}
									isFileUploading={isFileUploading}
									isSmallScreen={!largeScreen}
									isSections={isSections}
									handleClick={handleClick}
								/>
							</StyledTableCell>
						</>
					);
					break;
				case "buttons_field":
					component = (
						<StyledTableCell colSpan={2}>
							<ButtonsField
								{...field}
								readOnly={options?.readOnly ? true : field.readOnly}
								isSmallScreen={!largeScreen}
								isSections={isSections}
								handleClick={handleClick}
							/>
						</StyledTableCell>
					);
					break;
				case "switch":
					component = (
						<>
							<StyledTableCell align="left">
								<SwitchInput
									{...field}
									readOnly={options?.readOnly ? true : field.readOnly}
									isSmallScreen={!largeScreen}
									isSections={isSections}
									handleChangeSwitch={handleChangeSwitch}
								/>
							</StyledTableCell>
						</>
					);
					break;
				case "checkbox":
					component = (
						<>
							<StyledTableCell align="left">
								<CheckboxInput
									{...field}
									readOnly={options?.readOnly ? true : field.readOnly}
									isSmallScreen={!largeScreen}
									isSections={isSections}
									handleChangeCheck={handleChangeCheck}
								/>
							</StyledTableCell>
						</>
					);
					break;
				case "date":
				case "time":
				case "datetime":
					component = (
						<>
							<StyledTableCell align="left">
								<DateTimeInput
									{...field}
									readOnly={options?.readOnly ? true : field.readOnly}
									isSmallScreen={!largeScreen}
									isSections={isSections}
									disableFormSubmit={disableFormSubmit}
									handleChangeDateTime={handleChangeDateTime}
									handleBlurDateTime={handleBlurDateTime}
									handleChangeTime={handleChangeTime}
									handleBlurTime={handleBlurTime}
								/>
							</StyledTableCell>
						</>
					);
					break;
				case "slider": // TODO
					break;
				case "image_field":
					const ht = field.height || 200;
					const wt = 0.75 * ht; //4 by 3
					component = (
						<>
							<StyledTableCell align="left">
								<ImageUploadField
									{...field}
									readOnly={options?.readOnly ? true : field.readOnly}
									isFileUploading={isFileUploading}
									isSmallScreen={!largeScreen}
									isSections={isSections}
									handleClick={handleClick}
								/>
							</StyledTableCell>
						</>
					);
					break;
				case "lookup":
					component = (
						<>
							<StyledTableCell align="left">
								<LookupInput
									{...field}
									readOnly={options?.readOnly ? true : field.readOnly}
									isSmallScreen={!largeScreen}
									isSections={isSections}
									handleChange={handleChange}
									onBlurField={onBlurField}
									onSelectField={onSelectField}
								/>
							</StyledTableCell>
						</>
					);
					break;
				case "map_area":
					const htt = field.height || 400;
					const wtt = 0.75 * htt; //4 by 3
					const mapContainer = `container-for-rendering-map-ina-field-${field?.id}`;
					//field.readOnly = false;
					component = (
						<>
							<StyledTableCell align="left">
								<FMMap
									field={field}
									conversation={conversation}
									options={field.options}
									message={field.rows}
									showAreaList={false}
									noSideDrawer={true}
									noFullScreencontrol={false}
									nomagnifyerCntrl={false}
									nosettingsCntrl={false}
									limitedSettingsCntrl={true}
									nomapsearchCntrl={true}
									handleMapAreasClick={handleMapAreasClick}
									mapContainer={mapContainer}
									mapCssStyles={{
										height: `400px`,
										width: `100%`,
										borderRadius: "20px",
									}}
								/>
							</StyledTableCell>
						</>
					);
					break;
				case "phone_number":
					component = (
						<>
							<StyledTableCell align="left">
								<PhoneNumberField
									{...field}
									readOnly={options?.readOnly ? true : field.readOnly}
									isSmallScreen={!largeScreen}
									isSections={isSections}
									handleChange={handleChange}
									onBlurField={onBlurField}
								/>
							</StyledTableCell>
						</>
					);
					break;
				case "color_picker":
					component = (
						<>
							<StyledTableCell align="left">
								<ColorPickerField
									{...field}
									readOnly={options?.readOnly ? true : field.readOnly}
									isSmallScreen={!largeScreen}
									isSections={isSections}
									handleChange={handleChange}
									onBlurField={onBlurField}
								/>
							</StyledTableCell>
						</>
					);
					break;
				case "blank":
					component = (
						<>
							<StyledTableCell align="left">
								<Box
									style={{
										minHeight: `5px`,
										width: `10vw`,
									}}
								/>
							</StyledTableCell>
						</>
					);
					break;
				default:
					component = null;
			}
		}
		return component;
	};
	return options.sections && Object.keys(options.sections).length !== 0 ? (
		<>
			<FMSectionsFormComponent
				conversation={conversation}
				fields={fields}
				collectionData={collectionData}
				options={options}
				handleAction={handleAction}
				updateRedux={updateRedux}
				handleConfirm={handleConfirm}
				handleCancel={handleCancel}
				genericError={genericError}
				renderFields={renderFields}
				disableSubmit={disableSubmit}
				parentTabId={parentTabId}
				parentDocId={parentDocId}
			/>
		</>
	) : (
		<>
			<CustomizedGrid
				container
				direction="row"
				justifyContent="space-between"
				alignItems="center"
			>
				<Grid item>
					<CustomizedTypography variant="h5">
						{options?.title}
					</CustomizedTypography>
				</Grid>
			</CustomizedGrid>
			<FMRegularFormComponent
				conversation={conversation}
				fields={fields}
				options={options}
				handleAction={handleAction}
				updateRedux={updateRedux}
				handleConfirm={handleConfirm}
				handleCancel={handleCancel}
				genericError={genericError}
				renderFields={renderFields}
				disableSubmit={disableSubmit}
			/>
		</>
	);
}

// export default React.memo(FMFormComponent);
export default FMFormComponent;
