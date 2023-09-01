/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import React, { useState, useEffect, useMemo } from "react";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import momentTz from "moment-timezone";
import _ from "lodash";
import CustomToolbar from "../CustomToolbar/CustomToolbar";
import { MessageTypeConstants } from "../../../../Services/Message";
import {
	handleCalendarChange,
	handleCalendarToolBarChange,
} from "../../../Containers/NonConversational/Store/NonConversationalAction";
import { getAuthData } from "../../../../Services/StorageService";
import EventCalendarComponent from "./EventCalendarComponent";
import { sendAMessage } from "../../../../State/actions/chats";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/en-gb";
moment.locale("en");
const localizer = momentLocalizer(moment);

const CalendarContainer = styled(Calendar)(() => ({
	backgroundColor: "#ffffff",
	padding: "11px 0 0px",
	borderRadius: 20,
	"& .rbc-month-view": {
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
	},
	"& .rbc-header span": {
		fontWeight: "normal",
	},
	"& .rbc-off-range-bg": {
		backgroundColor: "#fff",
	},
	"& .rbc-date-cell": {
		fontWeight: "bold",
	},
	"& .rbc-button-link": {
		fontWeight: "bold",
	},
	"& .rbc-show-more": {
		color: "#638dff",
	},
	"& .rbc-row-segment": {
		flexBasis: "14.3%",
	},
	"& .rbc-day-slot .rbc-time-slot:nth-child(2)": {
		borderTop: "1px solid #f4f4f4",
	},
	"& .rbc-timeslot-group": {
		backgroundColor: "#fff",
	},
	"& .rbc-events-container .rbc-event": {
		border: "1px solid #fff",
	},
	"& .rbc-current-time-indicator": {
		backgroundColor: "#00A7D6",
	},
	"& .rbc-allday-cell": {
		display: "none",
	},
	"& .rbc-header.rbc-today": {
		border: "none",
	},
}));

const CalendarView = ({
	conversation,
	options,
	message,
	messageType,
	parentTabId = null,
}) => {
	const dispatch = useDispatch();

	const {
		user: { userTimezone },
	} = getAuthData();
	const defaultUserTimezone = "Etc/UTC";
	const [events, setEvents] = useState([]);
	const [someDay, setSomeDay] = useState(() =>
		options.startDate
			? momentTz(options.startDate).tz(userTimezone || defaultUserTimezone)
			: momentTz().tz(userTimezone || defaultUserTimezone)
	);
	const [timeSVal, setTimeSVal] = useState("month");
	let selectedEvent = null;
	const handleAction = (action = "onAction", content = null) => {
		let responseChat = {};
		responseChat.messageType = MessageTypeConstants.MESSAGE_TYPE_TABLE_RESPONSE;
		responseChat.message = {
			controlId: options.controlId,
			tabId: options.tabId,
			action,
			content,
		};
		dispatch(sendAMessage(responseChat, true));
	};

	const doTimeBasedSearch = (someDayUnix, timeScaleVal, queryString) => {
		setTimeSVal(timeScaleVal);
		const mapper = { day: 2, week: 1, month: 0 };
		let responseChat = {};
		responseChat.messageType = MessageTypeConstants.MESSAGE_TYPE_TABLE_RESPONSE;
		responseChat.message = {
			controlId: options.controlId,
			tabId: options?.parent?.length ? parentTabId : options?.tabId,
			action: "search",
			date: someDayUnix,
			timeScaleView: mapper[timeScaleVal],
			tz: userTimezone || defaultUserTimezone,
		};
		if (queryString !== void 0) {
			responseChat.message.queryString = queryString;
		}
		dispatch(sendAMessage(responseChat, true));
	};

	const doTimeBaseSearchCallback = (someDayUnix, currView, queryString) => {
		doTimeBasedSearch(someDayUnix, currView || timeSVal, queryString);
	};

	useEffect(() => {
		if (message && !_.isEmpty(message) && options.calendarEntry) {
			let eventsList = [];
			if (_.isArray(message[0])) {
				// Old format data message
				message.forEach((item) => {
					let found = item?.find((i) => i.id === options.calendarEntry.id);
					let id = found?.value || "";
					let title =
						item?.find((i) => i.id === options.calendarEntry.title)?.value ||
						"";
					let start = item?.find((i) => i.id === options.calendarEntry.start);
					let end = item?.find((i) => i.id === options.calendarEntry.end);
					let eventColor =
						item?.find((i) => i.type === "color_field")?.value || "#638DFF";
					let content = options?.calendarEntry?.content?.map((elem) => {
						let obj = {},
							found = item?.find((i) => i.id === elem);
						if (title !== found?.value) {
							obj = found;
							obj["id"] = elem;
						}
						return obj;
					});
					if (start?.value && end?.value) {
						eventsList.push({
							fields: item,
							content,
							id,
							title,
							start: start?.value ? renderDate("start", start) : null,
							end: end?.value ? renderDate("end", end) : null,
							eventColor,
							openPopper: false,
						});
					} else {
						console.error("Incorrect events passed", id, start, end, item);
					}
				});
			} else {
				// New format data message
				message.forEach((obj) => {
					let item = Object.values(obj)[0].fields;
					let found = item?.find((i) => i.id === options.calendarEntry.id);
					let id = found?.value || "";
					let title =
						item?.find((i) => i.id === options.calendarEntry.title)?.value ||
						"";
					let start = item?.find((i) => i.id === options.calendarEntry.start);
					let end = item?.find((i) => i.id === options.calendarEntry.end);
					let eventColor =
						item?.find((i) => i.type === "color_field")?.value || "#638DFF";
					let content = options?.calendarEntry?.content?.map((elem) => {
						let obj = {},
							found = item?.find((i) => i.id === elem);
						if (title !== found?.value) {
							obj = found;
							obj["id"] = elem;
						}
						return obj;
					});
					if (start?.value && end?.value) {
						eventsList.push({
							fields: item,
							content,
							id,
							title,
							start: start?.value ? renderDate("start", start) : null,
							end: end?.value ? renderDate("end", end) : null,
							eventColor,
							openPopper: false,
						});
					} else {
						console.error("Incorrect events passed", id, start, end, item);
					}
				});
			}

			setEvents(eventsList);
		}
	}, [message]);

	useEffect(() => {
		if (events && events.length) {
			let eventsList = events?.map((event) => {
				if (selectedEvent === event.id) {
					event.openPopper = true;
				} else {
					event.openPopper = false;
				}
				return event;
			});

			setEvents(eventsList);
		}
	}, [selectedEvent]);

	const eventStyleGetter = ({ eventColor }) => ({
		style: {
			backgroundColor: eventColor,
		},
	});

	const renderDate = (type, data) => {
		if (
			type === "end" &&
			momentTz(data.value)
				.tz(userTimezone || defaultUserTimezone)
				.toDate()
				.toString()
				.includes("00:00:00")
		) {
			return momentTz(data.value)
				.tz(userTimezone || defaultUserTimezone)
				.endOf("day")
				.toDate();
		}

		return momentTz(data.value)
			.tz(userTimezone || defaultUserTimezone)
			.toDate();
	};

	const onViewChange = (value) => {
		switch (value) {
			case "day": {
				const someDayUnix = someDay.unix() * 1000;
				doTimeBasedSearch(someDayUnix, value);
				dispatch(handleCalendarChange(conversation, options, "view", value));
				break;
			}
			case "week": {
				const dayWeekStartUnix = someDay.startOf("week").unix() * 1000;
				doTimeBasedSearch(dayWeekStartUnix, value);
				dispatch(handleCalendarChange(conversation, options, "view", value));
				break;
			}
			case "month": {
				const dayMonthStartUnix = someDay.startOf("month").unix() * 1000;
				doTimeBasedSearch(dayMonthStartUnix, value);
				dispatch(handleCalendarChange(conversation, options, "view", value));
				break;
			}
		}
	};

	const onNavigate = (date, view) => {
		const sDay = momentTz(date).tz(userTimezone || defaultUserTimezone);
		const sDayForUnix = sDay.clone();
		const sDayUnix = sDayForUnix.unix() * 1000;
		const sDayWeek = sDay.clone();
		const sDayWeekStart = sDayWeek.startOf("week");
		const sDayWeekStartForUnix = sDayWeekStart.clone();
		const sDayWeekStartUnix = sDayWeekStartForUnix.unix() * 1000;
		const sDayMonth = sDay.clone();
		const sDayMonthStart = sDayMonth.startOf("month");
		const sDayMonthStartForUnix = sDayMonthStart.clone();
		const sDayMonthStartUnix = sDayMonthStartForUnix.unix() * 1000;
		switch (view) {
			case "day": {
				setSomeDay(sDay);
				doTimeBasedSearch(sDayUnix, view);
				break;
			}
			case "week": {
				setSomeDay(sDayWeekStart);
				doTimeBasedSearch(sDayWeekStartUnix, view);
				break;
			}
			case "month": {
				setSomeDay(sDayMonthStart);
				doTimeBasedSearch(sDayMonthStartUnix, view);
				break;
			}
		}
	};

	const changeSelectedEventRef = (id) => {
		selectedEvent = id;
	};

	const onSelectEvent = (event) => {
		let content = {};
		event.fields.map((item) => {
			content[item.id] = item.value;
			return content;
		});
		handleAction("onAction", content);
	};

	let msg = {
		showMore: (total) => "+ more",
	};

	const { defaultDate, formats } = useMemo(
		() => ({
			defaultDate: options.startDate
				? momentTz(options.startDate)
						.tz(userTimezone || defaultUserTimezone)
						.toDate()
				: momentTz()
						.tz(userTimezone || defaultUserTimezone)
						.toDate(),
			formats: {
				eventTimeRangeFormat: () => null,
				timeGutterFormat: (date, culture, localizer) =>
					localizer.format(date, "HH:mm", culture),
			},
		}),
		[]
	);

	return (
		<CalendarContainer
			showMultiDayTimes={true}
			popup={true}
			events={events}
			startAccessor="start"
			endAccessor="end"
			views={["day", "week", "month"]}
			style={{ height: "65vh" }}
			eventPropGetter={eventStyleGetter}
			onSelectEvent={onSelectEvent}
			defaultDate={defaultDate}
			view={options.view || "month"}
			onView={onViewChange}
			onNavigate={onNavigate}
			tooltipAccessor={null}
			formats={formats}
			components={{
				toolbar: (props) => {
					dispatch(handleCalendarToolBarChange(props));
					return (
						<CustomToolbar
							{...props}
							messageType={messageType}
							handleAction={handleAction}
							options={options}
							conversation={conversation}
							doTimeBaseSearchCallback={doTimeBaseSearchCallback}
						/>
					);
				},
				event: (props) => (
					<EventCalendarComponent
						className={"event-calendar-component"}
						{...props}
						view={options.view || "month"}
						changeSelectedEventRef={changeSelectedEventRef}
					/>
				),
			}}
			localizer={localizer}
		/>
	);
};

export default React.memo(CalendarView);
