import React, { Component } from "react";
import { MessageTypeConstants } from "../../../../Services/Message";
import { connect } from "react-redux";
import Button from "./Elements/Button";
import Error from "./../../../Common/Error";
import {
	getCancelButtonName,
	getConfirmButtonName,
	getFormFieldElement,
	getFormFields,
	isFormCompleted,
} from "./Utils";
import _ from "lodash";
import {
	removeOpenForm,
	storeFormInLocal,
} from "../../../../Services/StorageService";

import AudioElement from "../../../../Utils/AudioElement";
// import "../airindiatest.css"

class FormContentView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formDetails: {},
			fields: [],
			backUpfields: [],
			toggleSaveButton: false,
			inputLengthDisbaleButton: false,
			disbaleBtn: true,
			genericMessage: null,
		};
	}

	componentDidMount() {
		// if (this.props.background && this.props.background.type === 240) {
		//   this.props.setFormInWindow && this.props.setFormInWindow(this.props.chat);
		// } else {
		//   this.props.setFormInPopup && this.props.setFormInPopup(this.props.chat);
		// }

		// console.log("all data on render", this.props);

		if (this.props.genericMessage) {
			this.setState({ genericMessage: this.props.genericMessage });
		}

		if (this.props.chat && this.props.chat.options) {
			console.log("form details====", this.props.chat.options);
			this.setState({ formDetails: this.props.chat.options });
		}

		if (this.props.chat.message && this.props.chat.messageType) {
			let fieldsArray = getFormFields(
				this.props.chat.message,
				this.props.chat.messageType
			);

			let fieldsArr = _.cloneDeep(fieldsArray);
			let backUpfieldsArr = _.cloneDeep(fieldsArray);

			for (let i = 0; i < fieldsArr.length; i++) {
				if (fieldsArr[i].maxLength) {
					if (fieldsArr[i].value && fieldsArr[i].value.length > 0) {
						fieldsArr[i]["charCounter"] =
							fieldsArr[i].maxLength - fieldsArr[i].value.length;
					}
					if (
						fieldsArr[i].value &&
						fieldsArr[i].maxLength - fieldsArr[i].value.length === 0
					) {
						fieldsArr[i]["charCounter"] = null;
					}
				}

				if (fieldsArr[i].validation) {
					if (
						Object.prototype.hasOwnProperty.call(
							fieldsArr[i],
							"validationResult"
						)
					) {
						if (
							(!fieldsArr[i].validationResult && !fieldsArr[i].value) ||
							(!fieldsArr[i].value && fieldsArr[i].mandatory)
						) {
							this.setState({ toggleSaveButton: true });
							break;
						}
					} else {
						this.setState({ toggleSaveButton: false });
					}

					if (fieldsArr[i].validationResult) {
						this.setState({ toggleSaveButton: false });
					}
				} else {
					this.setState({ toggleSaveButton: false });
				}
			}
			// console.log("all data message ", fieldsArr);
			if (Array.isArray(fieldsArr)) {
				this.setState({
					fields: [...fieldsArr],
					backUpfields: [...backUpfieldsArr],
				});
			}
		}
		if (this.props.conversational) {
			this.props.setFormInPopup && this.props.setFormInPopup(this.props.chat);
		}

		if (typeof this.props.showRefreshFromContainer !== "undefined") {
			if (this.props.toggleRefresh) {
				this.props.toggleRefresh(
					this.props.chat.options.allowRefresh,
					this.props.chat.options.controlId,
					MessageTypeConstants.MESSAGE_TYPE_FORM_RESPONSE
				);
			}
		}
		if (typeof this.props.showConfirmFromContainer !== "undefined") {
			if (this.props.toggleConfirm) {
				this.props.toggleConfirm(
					this.props.chat.options.confirmAction,
					this.props.chat.options.controlId,
					MessageTypeConstants.MESSAGE_TYPE_FORM_RESPONSE
				);
			}
		}

		if (typeof this.props.showDownloadFromContainer !== "undefined") {
			if (this.props.toggleDownload) {
				this.props.toggleDownload(
					this.props.chat.options.allowDownload,
					this.props.chat.options.controlId,
					MessageTypeConstants.MESSAGE_TYPE_FORM_RESPONSE
				);
			}
		}
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		let backUpFieldState = _.cloneDeep(prevState.backUpfields);
		let prevFields = _.cloneDeep(prevState.fields);
		let currentFields = [...prevFields];

		let newFieldsArray = getFormFields(
			nextProps.chat.message,
			nextProps.chat.messageType
		);
		let newFields = _.cloneDeep(newFieldsArray);
		let toggleSaveBtn = true;

		if (
			nextProps.chat.options &&
			prevState.formDetails &&
			nextProps.chat.options.controlId !== prevState.formDetails.controlId
		) {
			return {
				formDetails: nextProps.chat.options,
				fields: [...newFields],
				backUpfields: [...newFields],
				currentFields: [...newFields],
			};
		}

		// if (nextProps.comingFrom && nextProps.comingFrom === "container") {
		// 	backUpFieldState = _.cloneDeep(prevState.fields);
		// }

		if (!_.isEqual(nextProps.genericMessage, prevState.genericMessage)) {
			return { genericMessage: nextProps.genericMessage };
		}

		if (
			newFields.length !== backUpFieldState.length &&
			!_.isEqual(newFields, backUpFieldState)
		) {
			return {
				fields: [...newFields],
				backUpfields: [...newFields],
			};
		}

		// let resultDiff = newFields.filter((o1) =>
		// 	backUpFieldState.some((o2) => o1.type === o2.type && o1.id === o2.id)
		// );

		if (
			nextProps.chat.options &&
			prevState.formDetails &&
			nextProps.chat.options.controlId === prevState.formDetails.controlId &&
			newFields.length === backUpFieldState.length
		) {
			if (
				!_.isEqual(newFields, backUpFieldState) &&
				!_.isEqual(newFields, currentFields)
			) {
				let dif = _.differenceWith(backUpFieldState, newFields, _.isEqual);

				if (dif.length > 0) {
					//if new field array is less than current field array
					if (currentFields.length > newFields.length) {
						let currDiff = _.differenceWith(
							currentFields,
							newFields,
							_.isEqual
						);
						if (currDiff.length) {
							for (dif of currDiff) {
								let getIndexToRemove = currentFields.findIndex((elem) => {
									return elem.id === dif.id;
								});
								if (getIndexToRemove > -1) {
									currentFields.splice(getIndexToRemove, 1);
								}
							}
						}
					}
					for (let i = 0; i < newFields.length; i++) {
						if (
							currentFields[i] &&
							newFields[i].options &&
							backUpFieldState[i].options !== newFields[i].options
						) {
							currentFields[i].options = newFields[i].options;
						}
						if (
							currentFields[i] &&
							backUpFieldState[i].value !== newFields[i].value
						) {
							currentFields[i].value = newFields[i].value;
						}

						if (currentFields[i] && newFields[i].type === "lookup") {
							if (
								(newFields[i].results &&
									!_.isEqual(
										newFields[i].results,
										backUpFieldState[i].results
									)) ||
								(newFields[i].results && !backUpFieldState[i].results)
							) {
								currentFields[i].results = newFields[i].results;
							}
						}

						if (currentFields[i] && newFields[i].validation) {
							if (
								Object.prototype.hasOwnProperty.call(
									newFields[i],
									"validationResult"
								)
							) {
								if (newFields[i].validationResult) {
									toggleSaveBtn = false;
									currentFields[i]["validationResult"] =
										newFields[i].validationResult;
								} else {
									toggleSaveBtn = true;
									currentFields[i]["validationResult"] =
										newFields[i].validationResult;
									currentFields[i]["validationMessage"] =
										newFields[i].validationMessage;
								}
							}
							//  else {
							// 	toggleSaveBtn = false;
							// }
						} else {
							toggleSaveBtn = false;
						}
					}
				}
				return {
					toggleSaveButton: toggleSaveBtn,
					fields: [...currentFields],
					backUpfields: [...newFields],
				};
			} else {
				// if (
				// 	!_.isEqual(newFields, backUpFieldState) ||
				// 	(_.isEqual(newFields, backUpFieldState) &&
				// 		_.isEqual(newFields, currentFields))
				// ) {
				// let dif = _.differenceWith(backUpFieldState, newFields, _.isEqual);

				// if (dif.length > 0 && currentFields.length === newFields.length) {
				for (let i = 0; i < newFields.length; i++) {
					if (currentFields[i] && newFields[i].validation) {
						if (
							Object.prototype.hasOwnProperty.call(
								newFields[i],
								"validationResult"
							)
						) {
							if (newFields[i].validationResult) {
								toggleSaveBtn = false;
								currentFields[i]["validationResult"] =
									newFields[i].validationResult;
							} else {
								toggleSaveBtn = true;
								currentFields[i]["validationResult"] =
									newFields[i].validationResult;
								currentFields[i]["validationMessage"] =
									newFields[i].validationMessage;
							}
						}
					} else {
						toggleSaveBtn = false;
					}
				}

				return {
					toggleSaveButton: toggleSaveBtn,
					fields: [...currentFields],
					backUpfields: [...newFields],
				};
				// }
			}
		} else {
			return null;
		}
	}

	buttonFieldClick = (index, value) => {
		const { fields } = this.state;
		const { chat, sendMessage } = this.props;
		let element = { ...fields[index] };

		let responseChat = {};
		responseChat.messageType = MessageTypeConstants.MESSAGE_TYPE_FORM_RESPONSE;
		responseChat.message = {
			action: "click",
			currentField: element.id,
			content: { currentFieldValue: value.label },
			formId: chat.options.formId,
		};

		sendMessage(responseChat, true);
	};

	handleCharacters = (element, value) => {
		let max = element.maxLength;
		let counter = max - value.length;
		if (counter === 0) {
			return null;
		}
		return counter;
	};

	handleFormInput = (index) => {
		return (value, data) => {
			// let { fields } = this.state;
			let fieldsData = this.state.fields;
			let fieldsArr = _.cloneDeep(fieldsData);
			let curField = fieldsArr[index];
			let curFieldObj = _.cloneDeep(curField);
			let element = { ...curFieldObj };

			if (element.maxLength && !element.minLength) {
				element["charCounter"] = this.handleCharacters(element, value);
			}

			if (element.maxLength && element.minLength) {
				element["charCounter"] = this.handleCharacters(element, value);
				if (value.length < element.minLength) {
					this.setState({ inputLengthDisbaleButton: true });
				} else {
					this.setState({ inputLengthDisbaleButton: false });
				}
			}
			if (!element.maxLength && element.minLength) {
				if (value.length < element.minLength) {
					this.setState({ inputLengthDisbaleButton: true });
				} else {
					this.setState({ inputLengthDisbaleButton: false });
				}
			}

			if (Object.prototype.hasOwnProperty.call(element, "validationMessage")) {
				element.validationMessage = "";
			}

			switch (element.type) {
				case "buttons_field":
					this.buttonFieldClick(index, value);
					break;
				case "checkbox":
				case "multi_selection": {
					let values = element.value || [];
					if (values.indexOf(value) === -1) {
						values.push(value);
					} else {
						values.splice(values.indexOf(value), 1);
					}
					element.value = [...values];
					break;
				}
				case "dropdown":
				case "select": {
					if (element.mandatory) {
						this.setState({ toggleSaveButton: false });
					}
					let tempElement = _.cloneDeep(element);
					tempElement.value = value;
					element.value = value;
					this.sendMessageOnBlur(tempElement);
					break;
				}
				case "lookup": {
					let tempElement = _.cloneDeep(element);
					tempElement.value = value;
					element.value = value;
					if (element.validation) {
						this.setState({ toggleSaveButton: true });
					}
					if (data === "lookupselection") {
						this.sendMessageOnBlur(tempElement);
					}
					break;
				}
				default:
					element.value = value;
					if (element.validation) {
						this.setState({ toggleSaveButton: true });
					}
					break;
			}

			fieldsArr[index] = element;
			this.setState({ fields: [...fieldsArr] });
		};
	};

	cancelForm = (e) => {
		let {
			background,
			chat,
			sendMessage,
			conversation: { conversationId },
		} = this.props;
		e.preventDefault();

		// let audio = new AudioRecorder();
		// let audioUrl = await audio.startRecording();

		// console.log('Audio URL Generated', audioUrl )

		removeOpenForm();
		if (background && !_.isEmpty(background)) {
			this.props.removeGenericErrorMsg(conversationId, chat.options.controlId);
			// console.log("cancel form", chat);
			let responseChat = {};
			if (chat.messageType === MessageTypeConstants.MESSAGE_TYPE_FORM2) {
				responseChat.message = {
					formId: chat.options.formId,
					action: "cancel",
				};
			}

			responseChat.messageType =
				MessageTypeConstants.MESSAGE_TYPE_FORM_RESPONSE;
			sendMessage(responseChat);

			if (chat.options.allowClose) {
				this.props.cancelForm(chat);
			} else {
				let tempFields = _.cloneDeep(this.state.fields);
				tempFields.forEach((elem, index) => {
					this.clearLookUpResults(elem.id, index);
					elem.value = "";
					if (Object.prototype.hasOwnProperty.call(elem, "validationResult")) {
						elem.validationResult = true;
					}
					if (Object.prototype.hasOwnProperty.call(elem, "validationMessage")) {
						elem.validationMessage = "";
					}
					this.onBlurFormField(elem);
				});

				// this.props.resetSelectedConversationFormInWindow(chat, {
				//   message: tempFields,
				// });
				this.setState({ fields: [...tempFields] });
			}
		} else {
			this.props.cancelForm();
		}
	};

	submitForm = (e) => {
		e.preventDefault();
		this.setState({ invalidForm: false });

		// Instantiate an Audio Element and play it once so-- Trick for making audio play in Safari

		AudioElement.loadAudio();

		const { chat, sendMessage, background } = this.props;
		let { options, messageId } = chat;

		// const { fields } = this.state;
		let fieldsCopy = _.cloneDeep(this.state.fields);
		// console.log("fields on submit =====", fieldsCopy);

		let responseChat = {};
		if (chat.messageType === MessageTypeConstants.MESSAGE_TYPE_FORM2) {
			let valid = true;
			fieldsCopy.forEach((field) => {
				if (Object.prototype.hasOwnProperty.call(field, "validationMessage")) {
					field.validationMessage = "";
				}
				if (Object.prototype.hasOwnProperty.call(field, "validationResult")) {
					field.validationResult = true;
				}
				if (
					field.mandatory &&
					(!field.value ||
						(Array.isArray(field.value) && field.value.length === 0))
				) {
					valid = false;
				}
			});
			if (!valid) {
				this.setState({ invalidForm: true });
				return;
			}
		}

		// if (this.props?.comingFrom === "container") {
		//   this.props.resetSelectedConversationFormInWindow(chat, {
		//     message: fieldsCopy,
		//     genericError: null,
		//   });
		// }
		let fieldsToSubmit = this.getFieldsToSubmit(fieldsCopy);

		// this.props.resetComponentInWindowExceptForm &&
		//   this.props.resetComponentInWindowExceptForm(options);
		/*this below code  is the working one*/
		if (chat.messageType === MessageTypeConstants.MESSAGE_TYPE_FORM2) {
			responseChat.message = {
				fields: fieldsToSubmit,
				formId: options.formId,
				action: "confirm",
			};
		} else if (chat.messageType === MessageTypeConstants.MESSAGE_TYPE_FORM) {
			responseChat.message = fieldsToSubmit;
		}
		responseChat.options = options || {};
		responseChat.options.stage = "COMPLETED";
		responseChat.messageId = messageId;
		responseChat.messageType = MessageTypeConstants.MESSAGE_TYPE_FORM_RESPONSE;
		// console.log("responseChat on submit", responseChat);

		if (
			this.props?.comingFrom === "container" &&
			this.props.sendMessageFromContainer
		) {
			this.props.sendMessageFromContainer(
				chat,
				fieldsToSubmit,
				"form",
				responseChat
			);
			this.props.updateTheRows(options, fieldsToSubmit, "form");
		} else {
			sendMessage(responseChat);
			removeOpenForm();
		}
		// sendMessage(responseChat);
		if (background && !_.isEmpty(background)) {
			storeFormInLocal(chat);
			if (options.allowClose) {
				this.props.closeForm(chat);
			} else {
				return;
			}
		} else {
			this.props.closeForm();
		}
	};

	getFieldsToSubmit = (message) => {
		let { fields } = this.state;
		let newFields = _.cloneDeep(fields);
		return message.map((element) => {
			let elementToMerge;
			const changedElement = newFields.filter(
				(formElement) => formElement.id === element.id
			);

			if (changedElement.length === 0) {
				elementToMerge = {};
			} else {
				elementToMerge = changedElement[0];
			}
			// if (elementToMerge.type === "dropdown") {
			//   elementToMerge.value = elementToMerge.value.value;
			// }
			return Object.assign(element, elementToMerge);
		});
	};

	onBlurFormField = (field) => {
		// this.state.fields.findIndex(())
		if (field.type === "dropdown" || field.type === "select") {
			return;
		}

		this.sendMessageOnBlur(field);
		// this.checkForValidation();
	};

	sendMessageOnBlur = (field) => {
		this.setState({ toggleSaveButton: true });
		const { chat, sendMessage, resetSelectedConversationFormInWindow } =
			this.props;

		let { options } = chat;
		let fieldData = _.cloneDeep(this.state.fields);

		let responseChat = {};
		responseChat.messageType = MessageTypeConstants.MESSAGE_TYPE_FORM_RESPONSE;
		responseChat.options = options || {};
		responseChat.message = {
			action: "move",
			currentField: field.id,
			content: { currentFieldValue: field.value || "" },
			formId: chat.options.formId,
		};
		// !_.isEmpty(this.props.genericMessage) &&
		//   resetSelectedConversationFormInWindow(chat, {
		//     genericError: {},
		//     message: fieldData,
		//   });

		if (
			this.props?.comingFrom === "container" &&
			this.props.sendMessageFromContainer
		) {
			let newFields = _.cloneDeep(this.state.fields);
			let findFieldIndex = newFields.findIndex((elem) => elem.id === field.id);
			if (findFieldIndex !== -1) {
				newFields[findFieldIndex] = field;
			}

			// console.log("change new field", newFields, field);
			this.props.sendMessageFromContainer(
				chat,
				newFields,
				"form",
				responseChat
			);
			this.props.updateTheRows(options, newFields, "form");
		} else {
			sendMessage(responseChat, true);
		}
	};

	doDataLookUp = (fieldId, fieldValue) => {
		const { chat, sendMessage } = this.props;
		let responseChat = {};
		responseChat.messageType = MessageTypeConstants.MESSAGE_TYPE_FORM_RESPONSE;
		responseChat.message = {
			formId: chat.options.formId,
			action: "search",
			currentField: fieldId,
			content: { currentFieldValue: fieldValue },
		};
		sendMessage(responseChat, true);
	};

	renderElement = ({ fieldIndex, readOnly = false, chat, field, action }) => {
		return getFormFieldElement(
			fieldIndex,
			readOnly,
			chat,
			field,
			action,
			isFormCompleted(this.props.chat, this.props.background),
			() => {
				this.onBlurFormField(field);
			},
			this.doDataLookUp,
			this.clearLookUpResults,
			this.props?.linkData?.type
		);
	};

	clearLookUpResults = (fieldId, fieldIndex) => {
		let fields = _.cloneDeep(this.state.fields);

		if (fields[fieldIndex] && fields[fieldIndex].id === fieldId) {
			if (fields[fieldIndex].results && fields[fieldIndex].results.length) {
				this.doDataLookUp(fieldId, undefined);
				if (fields[fieldIndex].results) {
					fields[fieldIndex].results = [];
				}
				if (fields[fieldIndex].value) {
					delete fields[fieldIndex].value;
				}
				if (fields[fieldIndex].showSpinner) {
					delete fields[fieldIndex].showSpinner;
				}
			}
		}

		// for (let i = 0; i < fields.length; i++) {
		//   let currentField = fields[i];
		//   if (currentField.id === element.id) {
		//     currentField.results = null;
		//     break;
		//   }
		// }

		this.setState({ fields: [...fields] });
	};

	checkIfFormIsValid = () => {
		let fields = _.cloneDeep(this.state.fields);
		if (fields) {
			for (let i = 0; i < fields.length; i++) {
				let field = fields[i];
				if (
					field.type !== "dropdown" &&
					Object.prototype.hasOwnProperty.call(field, "validation") &&
					field.validation &&
					Object.prototype.hasOwnProperty.call(field, "validationResult")
				) {
					if (!field.validationResult) {
						return false;
					}
				}
			}
		}
		return true;
	};

	ifAllFieldsAreEmpty = (fields) => {
		if (!fields) {
			return;
		}
		const fieldsHasValue = fields.map((field) => {
			if (field.type === "switch") {
				return true;
			}
			if (!field.value || field.value === "") {
				return false;
			}
			return true;
		});
		if (fieldsHasValue.indexOf(true) !== -1) {
			return false;
		} else {
			return true;
		}
	};

	checkIfFormIsEmpty = () => {
		let fields = _.cloneDeep(this.state.fields);
		if (!fields) {
			return;
		}
		if (this.ifAllFieldsAreEmpty(fields)) {
			return true;
		}
		for (let i = 0; i < fields.length; i++) {
			let field = fields[i];
			if (
				Object.prototype.hasOwnProperty.call(field, "value") &&
				field.type !== "dropdown" &&
				Object.prototype.hasOwnProperty.call(field, "validation") &&
				field.validation &&
				Object.prototype.hasOwnProperty.call(field, "validationResult") &&
				!field.validationResult
			) {
				return true;
			} else if (
				(!field.value || field.value === "" || field.value.length === 0) &&
				Object.prototype.hasOwnProperty.call(field, "mandatory") &&
				field.mandatory === true
			) {
				return true;
			}
		}
		return false;
	};

	checkForValidation = () => {
		let { chat, background } = this.props;
		let fieldsData = _.cloneDeep(this.state.fields);

		let startValidation = false;

		startValidation = fieldsData.forEach((elem) => {
			if (elem.validation) {
				if (elem.validation && elem.validationResult) {
					return false;
				} else {
					return true;
				}
			} else {
				return false;
			}
		});

		if (startValidation) {
			return true;
		} else {
			return (
				(chat.options.allowClose && isFormCompleted(chat, background)) ||
				!this.checkIfFormIsValid() ||
				this.checkIfFormIsEmpty()
			);
		}
	};

	unsetReadOnly = (chat) => {
		const options = chat.options;
		options.readOnly = !options.readOnly;
		this.props.resetSelectedConversationFormInWindow(chat, {
			options: options,
		});
	};

	toggleButton = () => {
		let { chat, background } = this.props;
		let { inputLengthDisbaleButton, toggleSaveButton } = this.state;

		// console.log("toggleSaveButton >>", toggleSaveButton);

		if (inputLengthDisbaleButton) {
			return true;
		} else {
			return toggleSaveButton
				? true
				: (chat.options.allowClose && isFormCompleted(chat, background)) ||
						!this.checkIfFormIsValid() ||
						this.checkIfFormIsEmpty();
		}
	};

	render() {
		// console.log("form details ", this.props);

		let { fields, invalidForm, genericMessage } = this.state;
		// console.log("all fields ====== ", genericMessage);

		let { chat } = this.props;
		let { message, options } = chat;
		let confirmButtonName = getConfirmButtonName(message, options);
		let cancelButtonName = getCancelButtonName(message, options);
		let close = true;
		let readOnly = false;
		let allowEdit = true;
		if (chat.options) {
			if (!chat.options.allowClose) {
				close = false;
			}
			readOnly = chat.options.readOnly || false;
			allowEdit = chat.options.allowEdit || false;
		}
		return (
			<div
				className={
					this.props.hasCards
						? "card custom-card-style-cards"
						: "card custom-card-style"
				}
			>
				<div className="card-body p-0 py-3 d-flex justify-content-center align-items-center flex-column">
					<form
						style={{ width: "100%" }}
						className="p-0 d-flex flex-column align-items-center"
					>
						{invalidForm ? (
							<Error message="Please fill in all mandatory fields." />
						) : null}

						{genericMessage && genericMessage?.validationMessage ? (
							<div className="generic-error-message">
								{" "}
								<span>{genericMessage.validationMessage}</span>
							</div>
						) : null}

						{fields &&
							fields.map((field, index) => {
								let fieldIndex = index;
								return this.renderElement({
									fieldIndex,
									readOnly,
									chat,
									field,
									action: this.handleFormInput(index),
								});
							})}
						<div className="d-flex justify-content-center p-2 m-2">
							{allowEdit && readOnly && (
								<a
									className="btn btn-lg btn-open m-1"
									onClick={() => this.unsetReadOnly(chat)}
								>
									<i
										className="icon-pencil mr-2"
										style={{ fontWeight: "bold" }}
									/>{" "}
									Edit information
								</a>
							)}
							{/* {!readOnly && ( */}
							<div className="d-flex justify-content-around align-items-center">
								{confirmButtonName && (
									<Button
										role="button"
										className="btn btn-open"
										text={confirmButtonName}
										action={this.submitForm}
										completed={this.toggleButton()}
									/>
								)}
								{cancelButtonName && (
									<Button
										role="button"
										text={cancelButtonName}
										className="btn btn-install ml-3" // style={{
										//   border: "1.2px solid #0080A4",
										//   color: "#0080A4"
										//   /*00607A*/
										// }}
										action={this.cancelForm}
									/>
								)}
							</div>
							{/* )} */}

							{/* {!readOnly && (
                <Button
                  role="button"
                  text={cancelButtonName}
                  className="btn btn-install ml-3"
                  action={this.cancelForm}
                />
              )} */}
						</div>
					</form>
				</div>
			</div>
		);
	}
}

const mapDataToProps = (state) => {
	let chats = state.chats;
	let conversation = chats.selectedConversation;
	let selectedConversationId = conversation && conversation.conversationId;

	return {
		linkData: chats.linkData,
		conversation,
		conversational: selectedConversationId
			? chats.conversationModeMap[selectedConversationId]
				? chats.conversationModeMap[selectedConversationId].conversational ===
				  false
					? false
					: true
				: true
			: true,
		background: selectedConversationId
			? (chats.conversationModeMap[selectedConversationId] &&
					chats.conversationModeMap[selectedConversationId].background) ||
			  {}
			: {},
	};
};

export default connect(mapDataToProps, null)(FormContentView);
