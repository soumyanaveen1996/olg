import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CloseIcon from "@mui/icons-material/Close";

import {
	Menu,
	FMTable,
	FMContainer,
	FMForm,
	FMHtml,
	FMCalendar,
	FMNotification,
} from "../../../Components/Common";
import ConfirmTabClose from "../../../Components/ConfirmTabClose/ConfirmTabClose";
import { MessageTypeConstants } from "../../../../Services/Message";
import { sendAMessage } from "../../../../State/actions/chats";
import {
	removeNonConversationalMessages,
	handleChangeNonConversationalMessagesTab,
} from "../Store/NonConversationalAction";
import FMVideoCall from "../../../Components/Common/FMVideoCall/FMVideoCall";
import ComponentInWindow from "../../../../Components/Interactions/content/ComponentInWindow";
import MainTimeline from "../../../Components/TimelineComponent/MainTimeline";
import MainSurvey from "../../../Components/SurveyComponent/MainSurvey";
import Chart from "../../../Components/MongoDBChart/chart";
import ChatComponentInWindow from '../../../../Components/Interactions/content/ChatComponentInWindow';

const PaperContainer = styled(Paper)(() => ({
	flexGrow: 1,
	"& .Mui-selected": {
		minHeight: 20,
		height: 26,
		fontSize: 12,
		fontWeight: 400,
		background: "#f4f7fb",
		textTransform: "none",
		maxWidth: "100%",
		border: "solid 1px #e8e8e8",
		color: "#44485a !important",
		borderTopRightRadius: 5,
		borderTopLeftRadius: 5,
	},
}));

const TabContainer = styled(Tab)(() => ({
	minHeight: 20,
	height: 26,
	fontSize: 12,
	fontWeight: 400,
	background: "#e9f0f8",
	textTransform: "none",
	color: "#98b0c8 !important",
	position: "relative",
	padding: "6px 15px 7px 0",
	border: "1px solid #bfd4ea",
	borderLeft: 0,
	marginLeft: 20,
	transform: "skewX(35deg)",
	borderTopRightRadius: 3,
	overflow: "inherit",
	"&.Mui-selected": {
		minHeight: 20,
		height: 26,
		fontSize: 12,
		fontWeight: 400,
		background: "transparent",
		textTransform: "none",
		position: "relative",
		padding: "6px 15px 7px 0",
		border: "1px solid #bfd4ea",
		borderBottom: "none",
		borderLeft: 0,
		marginLeft: 20,
		transform: "skewX(35deg)",
		borderTopRightRadius: 3,
		overflow: "inherit",
		"&:before": {
			background: "transparent",
		},
	},
	"&:before": {
		content: `''`,
		position: "absolute",
		top: "-1px",
		left: "-11px",
		width: "75%",
		height: "110%",
		border: "1px solid #bfd4ea",
		borderRight: 0,
		transform: "skewX(-35deg)",
		background: "#e9f0f8",
	},
}));

const SpanInline = styled("span")(() => ({
	display: "flex",
	transform: "skewX(-35deg)",
}));

const PositionCloseIcon = styled(CloseIcon)(({ theme }) => ({
	marginBottom: "-5px",
	fontSize: 18,
	color: "#98b0c8",
	"&:hover": {
		color: "#98b0c8",
	},
}));

const StyledTabs = styled((props) => <Tabs {...props} />)({
	backgroundColor: "#f4f7fb",
	"& .MuiTabs-indicator": {
		display: "flex",
		justifyContent: "center",
		backgroundColor: "transparent",
	},
});

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tab-panel"
			hidden={value !== index}
			id={`scrollable-auto-tab-panel-${index}`}
			aria-labelledby={`scrollable-auto-tab-${index}`}
			{...other}
		>
			{value === index && children}
		</div>
	);
}

export default function NonConversationalComponent({ conversationId, NonConversationalComponents, selectedTab }) {
	const dispatch = useDispatch();
	const [NonConversationalAppCount, setNonConversationalAppCount] = useState(0);
	const appNotifications = useSelector(
		(state) => state.v2.Notification[conversationId]
	);
	const [confirmTabCloseModal, setConfirmTabCloseModal] = useState(null);

	useEffect(() => {
		if (NonConversationalComponents) {
			setNonConversationalAppCount(NonConversationalComponents.length);
		}
	}, [
		selectedTab,
		NonConversationalComponents,
	]);

	const handleCloseApp = (message) => {
		let responseChat = {};
		responseChat.messageType = null;
		switch (message.messageType) {
			case MessageTypeConstants.MESSAGE_TYPE_CALENDAR:
			case MessageTypeConstants.MESSAGE_TYPE_TABLE:
			case MessageTypeConstants.MESSAGE_TYPE_MAP:
				responseChat.messageType =
					MessageTypeConstants.MESSAGE_TYPE_TABLE_RESPONSE;
				break;
			case MessageTypeConstants.MESSAGE_TYPE_CONTAINER:
				responseChat.messageType =
					MessageTypeConstants.MESSAGE_TYPE_CONTAINER_RESPONSE;
				break;
			case MessageTypeConstants.MESSAGE_TYPE_FORM2:
				responseChat.messageType =
					MessageTypeConstants.MESSAGE_TYPE_FORM_RESPONSE;
				break;
			case MessageTypeConstants.MESSAGE_TYPE_HTML:
				responseChat.messageType =
					MessageTypeConstants.MESSAGE_TYPE_HTML_RESPONSE;
				break;
			case MessageTypeConstants.MESSAGE_TYPE_TIMELINE:
				responseChat.messageType =
					MessageTypeConstants.MESSAGE_TYPE_TIMELINE_RESPONSE;
				break;
			case MessageTypeConstants.MESSAGE_TYPE_SURVEY:
				responseChat.messageType =
					MessageTypeConstants.MESSAGE_TYPE_SURVEY_RESPONSE;
				break;
			// dispatch(removeNonConversationalMessages(conversationId, message));
			//  return;
		}
		responseChat.message = {
			controlId: message?.options?.controlId,
			tabId: message?.options?.tabId,
			docId: message?.options?.docId,
			action: "close",
		};
		dispatch(sendAMessage(responseChat, true));
		dispatch(removeNonConversationalMessages(conversationId, message));
		setConfirmTabCloseModal(null);
	};

	function makeData(input) {
		const messageObj1 = [
			{
				userId: input.userId,
				conversation: input.conversation,
				bot: input.bot,
				createdOn: input.createdOn,
				contentType: input.contentType,
				messageType: input.messageType,
				addedByBot: input.addedByBot,
				messageId: input.messageId,
				uuid: input.uuid,
				messageDate: input.messageDate,
				botKey: input.botKey,
				status: input.status,
				message: makeMessage(Object.values(input.message[0])[0].fields),
				options: makeOptions(input.options),
				minimize: false,
			},
		];
		return messageObj1;
	}

	function makeMessage(input) {
		const msg = [
			{
				Ticket: null,
				Time: null,
				User: null,
				Email: null,
				Owner: null,
				sortTime: null,
				Action: { text: null },
				chatField: null,
			},
		];
		if (input) {
			input.map((item) => {
				if (item.id === "ticket") {
					msg[0].Ticket = item.value;
				}
				if (item.id === "time") {
					msg[0].Time = `#date(${item.value})`;
					msg[0].sortTime = item.value;
				}
				if (item.id === "user") {
					msg[0].User = item.value;
				}
				if (item.id === "email") {
					msg[0].Email = item.value;
				}
				if (item.id === "owner") {
					msg[0].Owner = item.value;
				}
				if (item.id === "action") {
					msg[0].Action.text = "Assign to me";
				}
				if (item.id === "chatField") {
					msg[0].chatField = item.value;
				}
			});
		}
		return msg;
	}

	function makeOptions(input) {
		const newOption = [];
		const output = input;
		Object.values(input.columnNames).forEach((item) => {
			if (item === "action") {
				newOption.push("Action");
			} else if (item === "Chat") {
				newOption.push("chatField");
			} else {
				newOption.push(item);
			}
		});
		output.columnNames = newOption;
		output.columnTemplate = [];
		return output;
	}


	const renderMessage = (message) => {
		console.log("Render message", message);
		let component = null;
		switch (message.messageType) {
			case MessageTypeConstants.MESSAGE_TYPE_MENU:
				component = <Menu {...message} />;
				break;
			case MessageTypeConstants.MESSAGE_TYPE_TABLE:
				if (message?.options?.controlId === "queue") {
					component =
						message.message.length > 0 ? (
							<ComponentInWindow
								conversation={message.conversation}
								data={makeData(message)}
								linkData={null}
							/>
						) : null;
				} else {
					component = (
						<FMTable {...message} parentDocId={message?.options?.parentDocId} />
					);
				}
				break;
			case MessageTypeConstants.MESSAGE_TYPE_MAP:
				component = <FMCalendar {...message} />;
				break;
			case MessageTypeConstants.MESSAGE_TYPE_CONTAINER:
				component = <FMContainer {...message} />;
				break;
			case MessageTypeConstants.MESSAGE_TYPE_FORM2:
				let fields;
				let collectionData;
				if (Object.prototype.toString.call(message.message) === '[object Array]') {
					fields = message.message;
				}
				else if (Object.prototype.toString.call(message.message) === '[object Object]') {
					fields = message.message.fields;
					collectionData = message.message.collectionData;
				}
				component = <FMForm {...message} fields={fields} collectionData={collectionData} parentTabId={message?.options?.tabId} />;
				break;
			case MessageTypeConstants.MESSAGE_TYPE_CALENDAR:
				component = <FMCalendar {...message} />;
				break;
			case MessageTypeConstants.MESSAGE_TYPE_HTML:
				component = <FMHtml {...message} />;
				break;
			case MessageTypeConstants.MESSAGE_TYPE_TIMELINE:
				component = (
					<MainTimeline data={message} conversationId={conversationId} />
				);
				break;
			case MessageTypeConstants.MESSAGE_TYPE_SURVEY:
				component = (
					<MainSurvey
						handleCloseApp={() => handleCloseApp(message)}
						conversationId={conversationId}
						{...message}
					/>
				);
				break;
			case MessageTypeConstants.MESSAGE_TYPE_DASHBOARD:
				component = <Chart {...message} />;
				break;

			// case MessageTypeConstants.MESSAGE_TYPE_CHAT:
			// 	component = <ChatComponentInWindow conversationId={conversationId} {...message} />;
			// 	break;
		}
		return component;
	};

	const renderNotification = (message, messageArr) => {
		let component = null;
		switch (message.messageType) {
			case MessageTypeConstants.MESSAGE_TYPE_STD_NOTIFICATION:
			case MessageTypeConstants.MESSAGE_TYPE_CRITICAL_NOTIFICATION:
			case MessageTypeConstants.MESSAGE_TYPE_AUTHORIZATION_REQUEST:
				component = <FMNotification {...message} messageArr={messageArr} />;
				break;
			case MessageTypeConstants.MESSAGE_TYPE_VIDEO_CALL:
				component = <FMVideoCall {...message} />;
				break;
		}
		return component;
	};

	const handleTabChange = (e, newValue) => {
		if (
			NonConversationalComponents.length === NonConversationalAppCount
		) {
			dispatch(
				handleChangeNonConversationalMessagesTab(conversationId, newValue)
			);
		}
	};

	const onClose = (item) => (evt) => {
		if (item?.options?.promptOnClose) {
			setConfirmTabCloseModal(item);
		} else {
			handleCloseApp(item);
		}
		evt.stopPropagation(); //bug fix for AH-453; source material: https://stackoverflow.com/questions/63265780/react-material-ui-tabs-close
	};

	if (!_.isEmpty(NonConversationalComponents)) {
		// Below condition is for form2, update the filter condition based on requirement in future
		let tabComponentsList = NonConversationalComponents.filter((tabs) =>
		(
			tabs.messageType !== MessageTypeConstants.MESSAGE_TYPE_FORM2
			|| (tabs.options?.modal && tabs.messageType !== MessageTypeConstants.MESSAGE_TYPE_FORM2)
			|| tabs.options.modal === undefined
			|| tabs.options?.modal === false
		));
		let modalComponentsList = NonConversationalComponents.filter((tabs) => (tabs.messageType === MessageTypeConstants.MESSAGE_TYPE_FORM2 && tabs.options?.modal === true))
		return (
			<>
				<PaperContainer square elevation={0}>
					<StyledTabs
						value={selectedTab}
						onChange={(e, v) => handleTabChange(e, v)}
						sx={{ minHeight: "20px" }}
						indicatorColor="primary"
						textColor="primary"
						variant="scrollable"
						scrollButtons="auto"
						aria-label="scrollable auto tabs example"
					>
						{tabComponentsList.map((item, i) => (
							<TabContainer
								disableRipple
								key={item.messageId + i}
								id={item?.options?.tabId || i}
								label={
									<SpanInline>
										{item?.options?.title}{" "}
										{i > 0 && <PositionCloseIcon onClick={onClose(item)} />}
									</SpanInline>
								}
								value={item?.options?.tabId}
							/>
						))}
					</StyledTabs>
				</PaperContainer>
				{tabComponentsList.map((item, i) => (
					<TabPanel
						key={item.messageId + i}
						value={selectedTab}
						index={item?.options?.tabId}
					>
						{renderMessage(item)}
					</TabPanel>
				))}
				{/* When the form needs to be rendered in a modal instead of opening in a new tab */}
				{modalComponentsList.map((item) => (
					<>
						{renderMessage(item)}
					</>
				))}
				{appNotifications &&
					!_.isEmpty(appNotifications) &&
					renderNotification(
						appNotifications[appNotifications.length - 1],
						appNotifications
					)}
				<ConfirmTabClose
					confirmTabCloseModal={confirmTabCloseModal}
					setConfirmTabCloseModal={setConfirmTabCloseModal}
					handleCloseApp={handleCloseApp}
				/>
			</>
		);
	}
	return null;
}
