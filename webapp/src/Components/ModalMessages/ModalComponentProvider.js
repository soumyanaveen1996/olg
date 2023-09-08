import React from "react";
import { connect } from "react-redux";
import NewChannel from "../Channels/NewChannel";
import FormWithSelectDataView from "../Interactions/content/FormWithSelectDataView";
import CreateConversationContainer from "../../Containers/CreateConversationContainer";
import AddContactsView from "../Contacts/AddContactsView";
import FormContentView from "../Interactions/content/forms/FormContentView";
import TableMessageRow from "../Interactions/chats/TableMessageRow";
import PaymentFormView from "../Interactions/content/forms/PaymentFormView";
import FormResponseContentView from "../Interactions/content/forms/FormResponseContentView";
import ChartContentView from "../Interactions/chats/ChartContentView";
import DataCardDetailsView from "../Interactions/cards/maps/DataCardDetailsView";

const COMPONENTS = {
	NEW_CONVERSATION: CreateConversationContainer,
	NEW_CHANNEL: NewChannel,
	SELECTABLE_FORM_DATA_VIEW: FormWithSelectDataView,
	// FILE_SELECTOR: FileSelector,
	SEARCH_CONTACTS: AddContactsView,
	OPEN_FORM_CONTENT: FormContentView,
	OPEN_FORM_RESPONSE_CONTENT: FormResponseContentView,
	TABLE_MESSAGE_ROW: TableMessageRow,
	START_PAYMENT: PaymentFormView,
	CHART: ChartContentView,
	MAP_CARD_DATA_VIEW: DataCardDetailsView,
};

const ModalComponentProvider = ({ modalType, modalProps, cancel }) => {
	if (!modalType) {
		return null;
	}

	const SpecificModal = COMPONENTS[modalType];
	if (!SpecificModal) {
		return null;
	}
	return <SpecificModal {...modalProps} cancel={cancel} />;
};

export default connect((state) => state.modal)(ModalComponentProvider);
