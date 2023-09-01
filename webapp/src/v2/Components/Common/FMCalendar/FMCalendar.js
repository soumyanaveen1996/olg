import React from "react";
import { useDispatch } from "react-redux";
import { handleCalendarChange } from "../../../Containers/NonConversational/Store/NonConversationalAction";
import FMCalendarComponent from "./FMCalendarComponent";

const FMCalendar = ({
	conversation,
	options,
	message,
	rows,
	messageType,
	parentTabId,
	inContainer,
	parentDocId,
}) => {
	const dispatch = useDispatch();

	const onStyleChange = (value) => {
		dispatch(
			handleCalendarChange(conversation, options, "style", value, parentTabId)
		);
	};

	return (
		<FMCalendarComponent
			options={options}
			message={message || rows}
			onStyleChange={onStyleChange}
			conversation={conversation}
			messageType={messageType}
			parentTabId={parentTabId}
			parentDocId={parentDocId}
			inContainer={inContainer}
		/>
	);
};

export default FMCalendar;
