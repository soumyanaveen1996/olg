import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import MapIcon from "@mui/icons-material/Map";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import { styled } from "@mui/material/styles";
import CalendarView from "./CalendarView";
import FMTable from "../FMTable/FMTable";
import FMMap from "../FMMap/FMMap";
import Box from "@mui/material/Box";
import { MessageTypeConstants } from "../../../../Services/Message";
import { sendAMessage } from "../../../../State/actions/chats";

const RootContainer = styled(Grid)(({ theme }) => ({
	marginBottom: theme.spacing(2),
	marginTop: theme.spacing(2),
}));

const ViewContainer = styled(Grid)(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	"& .MuiButton-outlinedSizeSmall": {
		padding: theme.spacing(0.75, 1),
		borderColor: "#E8E8E8",
	},
}));

const ViewText = styled(Grid)(() => ({
	marginRight: "10px",
}));

const ViewMapButtonGroup = styled(ButtonGroup)(({ theme }) => ({
	display: "inline-flex",
}));

const ViewMapButton = styled(Button)(() => ({
	padding: "6px 8px",
	borderColor: "#E8E8E8",
	paddingTop: "5px",
	paddingBottom: "0px",
}));
const ConfirmActionBtn = styled(Button)(({ theme }) => ({
	borderRadius: "20px",
	border: "none",
	padding: "8px 20px",
	textTransform: "none",
	margin: theme.spacing(2),
	backgroundColor: "#638dff",
	color: "#FFFFFF",
	fontFamily: "SF Pro Text Bold",
	fontSize: 12,
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
	fontSize: "20px",
	fontWeight: "bold",
	fontStretch: "normal",
	fontStyle: "normal",
	lineHeight: "normal",
	letterSpacing: "-0.51px",
	color: "#2a2d3c",
}));

const renderButtons = (view, style) => {
	switch (view) {
		case "calendar":
			return (
				<DateRangeOutlinedIcon
					style={
						style === view
							? {
								fill: "#2DC0EF",
							}
							: { fill: "#dedede" }
					}
				/>
			);
		case "map":
			return (
				<MapIcon
					style={
						style === view
							? {
								fill: "#2DC0EF",
							}
							: { fill: "#dedede" }
					}
				/>
			);
		default:
			return (
				<TableChartOutlinedIcon
					style={
						style === view
							? {
								fill: "#2DC0EF",
							}
							: { fill: "#dedede" }
					}
				/>
			);
	}
};

const renderView = (
	style,
	rows,
	conversation,
	messageType,
	options,
	message,
	parentTabId,
	parentDocId,
	inContainer,
	myRef,
	handleAction
) => {
	switch (style) {
		case "calendar":
			return (
				<CalendarView
					conversation={conversation}
					messageType={messageType}
					parentTabId={parentTabId}
					parentDocId={parentDocId}
					options={options}
					message={message || rows}
				/>
			);
		case "map":
			let mapContainer = options.parent ? `map-holder-${parentTabId}-${options.tabId}` : `map-holder-${options.tabId}`;
			return (
				<div style={{ position: "relative", height: "72vh" }}>
					<FMMap
						noFullScreencontrol={false}
						conversation={conversation}
						handleAction={handleAction}
						messageType={messageType}
						parentTabId={parentTabId}
						parentDocId={parentDocId}
						inContainer={inContainer || false}
						options={options}
						message={message || rows}
						mapContainer={mapContainer}
						mapCssStyles={{
							position: "absolute",
							left: "0px",
							right: "0px",
							borderRadius: "15px",
							//height: "500px",
						}}
					/>
				</div>
			);
		default:
			return (
				<FMTable
					conversation={conversation}
					messageType={messageType}
					parentTabId={parentTabId}
					parentDocId={parentDocId}
					options={options}
					message={message || rows}
				/>
			);
	}
};

const FMCalendarComponent = ({
	options,
	message,
	rows,
	onStyleChange,
	conversation,
	messageType,
	parentTabId,
	parentDocId,
	inContainer,
}) => {
	const dispatch = useDispatch();
	const mainView = messageType;
	const [style, setStyle] = useState(options.style || mainView);
	const myRef = useRef();
	const viewType = [mainView, "table"];

	const handleChange = (event) => {
		setStyle(event);
		onStyleChange(event);
	};

	const handleAction = (action = "onAction", content = null) => {
		let responseChat = {};
		responseChat.messageType = MessageTypeConstants.MESSAGE_TYPE_TABLE_RESPONSE;
		responseChat.message = {
			controlId: options.controlId,
			tabId: options?.parent?.length ? parentTabId : options.tabId,
			parentDocId,
			action,
			content,
		};
		dispatch(sendAMessage(responseChat, true));
	};

	return (
		<>
			<RootContainer
				container
				// direction="row"
				justifyContent="space-between"
				alignItems="center"
			>
				<Grid item>
					<Title variant="h5">{options?.title}</Title>
				</Grid>
				<ViewContainer>
					<ViewText
						variant="body2"
						style={{
							visibility:
								options?.mapOptions?.listType === "areas"
									? "hidden"
									: "visible",
							fontSize: "0.85em",
						}}
					>
						View:
					</ViewText>
					<FormControl
						component="fieldset"
						style={{
							visibility:
								options?.mapOptions?.listType === "areas"
									? "hidden"
									: "visible",
						}}
					>
						<ViewMapButtonGroup
							size="small"
							aria-label="small outlined button group"
							spacing={2}
						// style={{ backgroundColor: "black", display: "inline-flex" }}
						>
							{viewType.map((view, index) => {
								return (
									<Tooltip key={view + index} title={`${view} view`}>
										<ViewMapButton
											onClick={() => {
												handleChange(view);
											}}
											style={
												style === view
													? {
														backgroundColor: "rgba(0, 167, 214, 0.1)",
													}
													: {}
											}
										>
											{renderButtons(view, style)}
										</ViewMapButton>
									</Tooltip>
								);
							})}
						</ViewMapButtonGroup>
					</FormControl>
					{options?.confirmAction && (
						<ConfirmActionBtn
							variant="contained"
							color="primary"
							onClick={() => handleAction("onConfirm")}
						>
							{options?.confirmAction}
						</ConfirmActionBtn>
					)}
				</ViewContainer>
			</RootContainer>
			{renderView(
				style,
				rows,
				conversation,
				messageType,
				options,
				message,
				parentTabId,
				parentDocId,
				inContainer,
				myRef,
				handleAction
			)}
		</>
	);
};

export default FMCalendarComponent;
