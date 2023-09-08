import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import {
	AppBar,
	Tabs,
	Tab,
	Typography,
	Box,
	Grid,
	Button,
} from "@mui/material";
import { FMCalendar } from "../../../Components/Common";
import { MessageTypeConstants } from "../../../../Services/Message";
import { FMTable, FMForm, FMMap } from "../../Common";

const TabPanel = ({ children, index, value, tabType, ...other }) => {
	if (index === value) {
		return (
			<Box
				role="tab-panel"
				id={`scrollable-auto-tab-panel-${tabType}-${index}`}
				aria-labelledby={`scrollable-auto-tab-${index}`}
				{...other}
			>
				{children}
			</Box>
		);
	}
	return null;
};

const MainContainer = styled("div")(({ theme }) => ({
	backgroundColor: "#f4f7fb",
	width: "100%",
}));

const MainButton = styled(Button)(() => ({
	border: "none",
	padding: "7px 45px",
	borderRadius: 20,
	textTransform: "inherit",
	"&:hover": {
		border: "none",
	},
}));

const MoreButton = styled(MainButton)(() => ({
	backgroundColor: "#638dff",
	color: "#FFFFFF",
	fontFamily: "SF Pro Text Bold",
	fontSize: 14,
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

const CancelButton = styled(MainButton)(() => ({
	backgroundColor: "#e0e8ff",
	color: "#638dff",
	border: "none",
	fontFamily: "SF Pro Text Bold",
	fontSize: 14,
	boxShadow: "none",
	"&:hover": {
		backgroundColor: "#eef2ff",
	},
	"&:focus": {
		boxShadow: "0 0 6px 0 rgba(99, 141, 255, 0.6)",
		backgroundColor: "#eef2ff",
	},
	"&:disabled": {
		backgroundColor: "#e8ecf8",
		color: "#aeb8d6",
		border: "none",
	},
}));
// TODO: section form bottom main buttons
const ConfirmButton = styled(MainButton)(() => ({
	backgroundColor: "#638dff",
	color: "#FFFFFF",
	fontFamily: "SF Pro Text Bold",
	fontSize: 14,
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

const Title = styled(Typography)(({ theme }) => ({
	margin: theme.spacing(1),
	marginLeft: theme.spacing(2),
	marginTop: theme.spacing(3),
	fontSize: "20px",
	fontWeight: 600,
}));

const AppBarContainer = styled(AppBar)(() => ({
	backgroundColor: "transparent",
	boxShadow: "none",
	marginBottom: "33px",
}));

const TabContainer = styled(Tab)(() => ({
	textTransform: "none",
	minWidth: "fit-content",
}));

const ActionContainer = styled(Grid)(
	({ theme }) => (
		{
			textTransform: "none",
			width: "55%",
			// width: "fit-content",
		},
		(props) =>
			Boolean(props.ismore)
				? {
					width: "100%",
				}
				: {
					width: "55%",
					[theme.breakpoints.between("md", "lg")]: {
						width: "100%",
					},
				}
	)
);

export default function FMContainerComponent({
	conversation,
	options,
	message,
	handleConfirm,
	containerSelectedTabIndex = 0,
	handleChangeTab,
	handleCancel,
	handleMoreItem,
}) {
	const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
	const [ismandatoryNotFilled, setIsmandatoryNotFilled] = useState(false);
	const [isvalidationFailing, setIsvalidationFailing] = useState(false);
	const [isAnyRowEditMode, setIsAnyRowEditMode] = useState(false);
	const [isDateTimeFieldEditMode, setIsDateTimeFieldEditMode] = useState(false);
	const [isLookupInvalidSearch, setIsLookupInvalidSearch] = useState(false);
	const [isFieldEditingState, setisFieldEditingState] = useState(false);
	const [defaultLookupCheck, setDefaultLookupCheck] = useState(false);

	useEffect(() => {
		message.forEach((containerTabs) => {
			const msg = containerTabs.message;

			if (containerTabs.type === MessageTypeConstants.MESSAGE_TYPE_FORM2) {
				if (msg.fields && msg.fields.length) {
					msg.fields.forEach((eachObject) => {
						//lookup check
						if (eachObject?.type == "lookup" && !eachObject.readOnly) {
							if (!eachObject.value) {
								setDefaultLookupCheck(true);
							}
						}
					});
				}
			}
		});
	}, []);

	useEffect(() => {
		setIsAnyRowEditMode(false);
		setIsvalidationFailing(false);
		setIsSubmitDisabled(false);
		setIsmandatoryNotFilled(false);
		setIsLookupInvalidSearch(false);
		setisFieldEditingState(false);
		// setIsDateTimeFieldEditMode(false);

		message.forEach((containerTabs) => {
			const msg = containerTabs.message;
			if (containerTabs.type === MessageTypeConstants.MESSAGE_TYPE_TABLE) {
				if (msg.rows && msg.rows.length) {
					msg.rows.forEach((row) => {
						if (
							Object.values(row)[0].rowOptions?.editRow === true ||
							Object.values(row)[0].rowOptions?.newRow === true
						) {
							setIsAnyRowEditMode(true);
							return;
						}
					});
				}
			}

			if (containerTabs.type === MessageTypeConstants.MESSAGE_TYPE_FORM2) {
				if (msg.fields && msg.fields.length) {
					//validationCheck
					msg.fields.forEach((eachObject) => {
						if (
							eachObject?.validation &&
							eachObject?.validationResult == false
						) {
							setIsvalidationFailing(true);
							return;
						}

						if (eachObject?.isFieldEditing) {
							setisFieldEditingState(true);
						}

						//datetimeCheck
						// if (eachObject.type == "datetime") {
						// 	console.log("ADITYA55 datetime field -- ", eachObject);
						// }
						// if (eachObject?.type == "datetime" && eachObject?.editingDateTime) {
						// 	setIsDateTimeFieldEditMode(true);
						// 	return;
						// }

						//lookup check
						if (eachObject?.type == "lookup") {
							if (!defaultLookupCheck) {
								setIsLookupInvalidSearch(false);
							} else {
								setDefaultLookupCheck(true);
								if (eachObject.value != "") {
									if (
										!eachObject.results &&
										eachObject.mandatory == true &&
										!eachObject.readOnly
									) {
										setIsLookupInvalidSearch(true);
									}
									if (eachObject?.results?.length > 0) {
										let resultValues = [];
										eachObject.results.map((eachResult) => {
											resultValues.push(eachResult.text);
										});

										if (!resultValues.includes(eachObject.value)) {
											setIsLookupInvalidSearch(true);
										}
									}
								}
							}
						}

						//mandatory check
						if (eachObject?.mandatory) {
							if (
								!eachObject.value ||
								eachObject.value == null ||
								eachObject.value == "" ||
								eachObject.value == undefined
							) {
								setIsmandatoryNotFilled(true);
								return;
							}
						}
					});
				}
			}
		});

		// console.log("ADITYA90 isAnyRowEditMode", isAnyRowEditMode);
		// console.log("ADITYA90 isvalidationFailing", isvalidationFailing);
		// console.log("ADITYA90 ismandatoryNotFilled", ismandatoryNotFilled);
		// console.log("ADITYA90 isLookup", isLookupInvalidSearch);
		// console.log("ADITYA90 isFieldEditingState", isFieldEditingState);

		if (
			isAnyRowEditMode ||
			isvalidationFailing ||
			ismandatoryNotFilled ||
			isLookupInvalidSearch ||
			isFieldEditingState
			// isDateTimeFieldEditMode
		) {
			setIsSubmitDisabled(true);
		}
	});

	const renderContent = (index) => {
		let component = null;
		let tabType = message[containerSelectedTabIndex]?.type;

		switch (tabType) {
			case MessageTypeConstants.MESSAGE_TYPE_FORM:
			case MessageTypeConstants.MESSAGE_TYPE_FORM2:
				let fields;
				let collectionData;
				let fieldMessages = message[containerSelectedTabIndex]?.message;
				if (Object.prototype.toString.call(fieldMessages) === '[object Array]') {
					fields = fieldMessages;
				}
				else if (Object.prototype.toString.call(fieldMessages) === '[object Object]') {
					fields = fieldMessages.fields;
					collectionData = fieldMessages.collectionData;
				}
				component = (
					<FMForm
						conversation={conversation}
						{...fieldMessages}
						fields={fields}
						collectionData={collectionData}
						parentTabId={options.tabId}
						parentDocId={
							options.docId ||
							message[containerSelectedTabIndex]?.message?.options?.parentDocId
						}
					/>
				);
				break;

			case MessageTypeConstants.MESSAGE_TYPE_TABLE:
				component = (
					<FMTable
						{...message[containerSelectedTabIndex].message}
						parentTabId={options.tabId}
						parentDocId={
							options.docId ||
							message[containerSelectedTabIndex]?.message?.options?.parentDocId
						}
						conversation={conversation}
					/>
				);
				break;

			case MessageTypeConstants.MESSAGE_TYPE_MAP:
				component = (
					<FMCalendar
						noFullScreencontrol={true}
						message={message[containerSelectedTabIndex]?.message?.rows}
						parentTabId={options.tabId}
						parentDocId={options.docId}
						conversation={conversation}
						inContainer={true}
						options={message[containerSelectedTabIndex]?.message?.options}
						messageType={message[containerSelectedTabIndex]?.type}
						mapContainer={`scrollable-auto-tab-panel-${tabType}-${index}`}
					/>
				);
				break;

			default:
				break;
		}
		return component;
	};

	return (
		<MainContainer>
			<Grid
				container
				direction="row"
				justifyContent="space-between"
				alignItems="center"
			>
				<Grid item>
					<Title variant="body1">{options?.title}</Title>
				</Grid>
			</Grid>
			{message.length >= 2 ? (
				<>
					<AppBarContainer position="static" color="default">
						<Tabs
							TabIndicatorProps={{
								style: { background: "#638dff" },
							}}
							value={containerSelectedTabIndex}
							onChange={handleChangeTab}
							textColor="secondary"
							variant="scrollable"
							aria-label="full width tabs example"
						>
							{message.map((item, index) => (
								<TabContainer key={index} label={item.message.options.title} />
							))}
						</Tabs>
					</AppBarContainer>
					{message.map((item, index) => (
						<TabPanel
							key={index}
							index={index}
							value={containerSelectedTabIndex}
							tabType={item.type}
						>
							{renderContent(index || 0)}
						</TabPanel>
					))}
				</>
			) : (
				renderContent(0)
			)}
			<ActionContainer
				container
				spacing={2}
				marginBottom="6px"
				marginTop="0px"
				marginLeft="30px"
				paddingBottom="8px"
				justifyContent="left"
				ismore={(options.more && options.more.length > 0).toString()}
			>
				{options.more &&
					options.more?.map((item, i) => {
						return (
							<Grid item key={i}>
								<MoreButton
									variant="contained"
									disabled={isAnyRowEditMode}
									onClick={() => handleMoreItem(item)}
								>
									{item}
								</MoreButton>
							</Grid>
						);
					})}

				<Grid item>
					{options.confirm && (
						<ConfirmButton
							variant="contained"
							disabled={isSubmitDisabled}
							onClick={() => handleConfirm()}
						>
							{options.confirm}
						</ConfirmButton>
					)}
				</Grid>

				<Grid item>
					{options.cancel && (
						<CancelButton
							variant="outlined"
							disabled={isAnyRowEditMode}
							onClick={() => handleCancel()}
						>
							{options.cancel}
						</CancelButton>
					)}
				</Grid>
			</ActionContainer>
		</MainContainer>
	);
}
