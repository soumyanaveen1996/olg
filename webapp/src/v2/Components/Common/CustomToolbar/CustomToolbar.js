import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import momentTz from "moment-timezone";
import { getAuthData } from "../../../../Services/StorageService";
import { MessageTypeConstants } from "../../../../Services/Message";
import { sendAMessage } from "../../../../State/actions/chats";
import CustomToolbarComponent from "./CustomToolbarComponent";

const CustomToolbar = (props) => {
	const {
		options,
		parentTabId = null,
		doTimeBaseSearchCallback,
		parentDocId = null,
	} = props;
	const dispatch = useDispatch();

	const {
		user: { userTimezone },
	} = getAuthData();
	const defaultUserTimezone = "Etc/UTC";

	const handleSearch = (queryString) => {
		let responseChat = {};
		responseChat.messageType = MessageTypeConstants.MESSAGE_TYPE_TABLE_RESPONSE;
		responseChat.message = {
			controlId: options.controlId,
			tabId: options?.parent?.length || options.sectionId ? parentTabId : options.tabId,
			sectionId: options.sectionId ? options.sectionId : null,
			parentDocId,
			action: "search",
			queryString,
			tz: userTimezone || defaultUserTimezone,
		};
		dispatch(sendAMessage(responseChat, true));
	};

	const handleSelectedDate = (selectedDate, currView, queryString) => {
		// const value = momentTz(selectedDate)
		// 	.tz(userTimezone || defaultUserTimezone)
		// 	.unix();

		switch (currView) {
			case "day": {
				const val = selectedDate.unix() * 1000;
				if (doTimeBaseSearchCallback) {
					doTimeBaseSearchCallback(val, currView, queryString);
				} else {
					doTimeBasedSearchForTable(val, currView, queryString);
				}
				break;
			}
			case "week": {
				const val = selectedDate.day(0).startOf("day").unix() * 1000;
				if (doTimeBaseSearchCallback) {
					doTimeBaseSearchCallback(val, currView, queryString);
				} else {
					doTimeBasedSearchForTable(val, currView, queryString);
				}
				break;
			}
			case "month": {
				const val = selectedDate.startOf("month").unix() * 1000;
				if (doTimeBaseSearchCallback) {
					doTimeBaseSearchCallback(val, currView, queryString);
				} else {
					doTimeBasedSearchForTable(val, currView, queryString);
				}
				break;
			}
		}
	};

	const doTimeBasedSearchForTable = (someDayUnix, currView, queryString) => {
		let responseChat = {};
		const mapper = { day: 2, week: 1, month: 0 };
		responseChat.messageType = MessageTypeConstants.MESSAGE_TYPE_TABLE_RESPONSE;
		responseChat.message = {
			controlId: options.controlId,
			tabId: options?.parent?.length || options.sectionId ? parentTabId : options.tabId,
			sectionId: options.sectionId ? options.sectionId : null,
			parentDocId,
			action: "search",
			date: someDayUnix,
			timeScaleView: mapper[currView],
			tz: userTimezone || defaultUserTimezone,
		};
		if (queryString !== void 0) {
			responseChat.message.queryString = queryString;
		}
		dispatch(sendAMessage(responseChat, true));
	};

	return (
		<CustomToolbarComponent
			{...props}
			handleSearch={handleSearch}
			handleSelectedDate={handleSelectedDate}
			userTimezone={userTimezone}
			defaultUserTimezone={defaultUserTimezone}
		/>
	);
};

CustomToolbar.propTypes = {
	onViewChange: PropTypes.func,
	onNavigate: PropTypes.func,
	label: PropTypes.string,
	view: PropTypes.string,
	views: PropTypes.array,
	setSearchText: PropTypes.func,
	handleAction: PropTypes.func,
	options: PropTypes.object.isRequired,
};

export default React.memo(CustomToolbar);
