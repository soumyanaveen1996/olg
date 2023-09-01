import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { MessageTypeConstants } from "../../../../Services/Message";
import { sendAMessage } from "../../../../State/actions/chats";
import { handleMessageTypeForm2, handlePromptOnClose, removeNonConversationalMessages, resetForm2Fields, } from "../../../Containers/NonConversational/Store/NonConversationalAction";
import { getAuthData } from "../../../../Services/StorageService";
import ModalPopup from "../../../../Components/ModalMessages/ModalPopup";
import FMFormComponent from "../FMForm/FMFormComponent";

const FMForm = (props) => {
	const { conversation, fields, collectionData, message, options, genericError, parentTabId = null, parentDocId = null, } = props
	const dispatch = useDispatch();
	const history = useHistory();
	const { user: { userTimezone }, } = getAuthData();
	const defaultUserTimezone = "Etc/UTC";
	let bodyStyleObject = { display: "flex", flexDirection: "column", alignItems: "center" }

	const handleAction = (action, currentField = null, currentFieldValue = null, isCurrFldObj) => {
		let responseChat = {};
		responseChat.messageType = MessageTypeConstants.MESSAGE_TYPE_FORM_RESPONSE;
		responseChat.message = {
			formId: options.formId,
			tabId: options?.parent?.length ? parentTabId : options.tabId,
			parentDocId,
			action,
			currentField,
			content: isCurrFldObj
				? currentFieldValue
				: { currentFieldValue: currentFieldValue },
			docId: options?.docId,
			tz: userTimezone || defaultUserTimezone,
		};
		if (action !== "click") {
			responseChat.options = options || {};
		}
		dispatch(sendAMessage(responseChat, true));
		if (action === "click") {
			dispatch(handlePromptOnClose(conversation));
		}
	};

	const updateRedux = (field) => {
		let formMessage = {
			message: {
				update: [field],
			},
			options: {
				action: "change",
				controlId: options.controlId,
				formId: options.formId,
				tabId: options?.parent?.length ? parentTabId : options.tabId,
				parent: options.parent,
				parentDocId,
				docId: options?.docId,
			},
		};
		dispatch(handleMessageTypeForm2(conversation, formMessage));
	};

	const updatePromptOnCloseModal = (conversation, promptOnClose) => {
		dispatch(handlePromptOnClose(conversation, promptOnClose));
	}

	const handleConfirm = () => {
		let responseChat = {};
		responseChat.messageType = MessageTypeConstants.MESSAGE_TYPE_FORM_RESPONSE;
		responseChat.message = {
			formId: options.formId,
			tabId: options?.parent?.length ? parentTabId : options.tabId,
			parentDocId,
			docId: options?.docId,
			action: "confirm",
			fields: fields || message,
		};
		responseChat.options = options || {};
		dispatch(sendAMessage(responseChat, true));
		dispatch(handlePromptOnClose(conversation));
		if (options.allowClose && options.minimizeOnConfirm) {
			dispatch(
				removeNonConversationalMessages(conversation, { options }, history)
			);
		}
	};

	const handleCancel = () => {
		if (options.allowClose) {
			let responseChat = {};
			responseChat.messageType =
				MessageTypeConstants.MESSAGE_TYPE_FORM_RESPONSE;
			responseChat.message = {
				formId: options.formId,
				tabId: options?.parent?.length ? parentTabId : options.tabId,
				parentDocId,
				docId: options?.docId,
				action: "cancel",
			};
			responseChat.options = options || {};
			dispatch(sendAMessage(responseChat, true));
			dispatch(
				removeNonConversationalMessages(conversation, { options }, history)
			);
		} else {
			dispatch(resetForm2Fields(conversation, { options }));
		}
	};

	let formComponent = (
		<FMFormComponent
			conversation={conversation}
			fields={fields || message}
			collectionData={collectionData}
			options={options}
			handleAction={handleAction}
			updateRedux={updateRedux}
			updatePromptOnCloseModal={updatePromptOnCloseModal}
			handleConfirm={handleConfirm}
			handleCancel={handleCancel}
			genericError={genericError}
			parentTabId={parentTabId}
			parentDocId={parentDocId}
		/>)


	return (
		<>
			{/* Form opens up inside a modal or tab, as per the param {modal : true} received from bot  */}
			{options.modal
				? (<ModalPopup
					size={options.sections && Object.keys(options.sections).length > 0 ? "xl" : "md"}
					bodyStyleObject={bodyStyleObject}
				>
					{formComponent}
				</ModalPopup>)
				: (
					<>
						{formComponent}
					</>
				)
			}
		</>

	);
};

export default React.memo(FMForm);
