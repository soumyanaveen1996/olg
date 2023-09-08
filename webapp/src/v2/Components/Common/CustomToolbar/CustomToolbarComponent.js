import React, { useState, useEffect } from "react";
import _ from "lodash";
import {
	Grid,
	Box,
	Toolbar,
	Button,
	Typography,
	Select,
	FormControl,
	MenuItem,
	IconButton,
	InputAdornment,
	OutlinedInput,
	TextField,
	Tooltip,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import RefreshIcon from "@mui/icons-material/Refresh";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { useSelector, shallowEqual } from "react-redux";
import momentTz from "moment-timezone";
import FMFilter from "../FMFilter/FMFilter";
import DocumentIcon from "./DocumentIcon";
import { sendAMessage } from "../../../../State/actions/chats";
import { handleCalendarToolBarChange } from "../../../Containers/NonConversational/Store/NonConversationalAction";
import { MessageTypeConstants } from "../../../../Services/Message";
import CustomizedMenu from "./../FMMap/CustomizedMenu";
import FilterListIcon from "@mui/icons-material/FilterList";

const DarkTooltip = styled(Tooltip)(() => ({
	"& .arrow": {
		color: "rgba(0,0,0,0.75)",
	},
	"& .tooltip": {
		backgroundColor: "rgba(0,0,0,0.75)",
		boxShadow:
			"0 9px 28px 8px rgba(0, 0, 0, 0.05), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12)",
		fontSize: 11,
	},
}));

const SelectContainer = styled(Select)(() => ({
	"& .MuiSelect-select": {
		paddingTop: "10.5px",
		paddingBottom: "10.5px",
		paddingLeft: "14px",
		fontSize: 14,
	},
}));

const ToolBarContainer = styled(Toolbar)(({ theme }) => ({
	borderRadius: "0",
	border: "none",
	justifyContent: "space-between",
	paddingLeft: `${theme.spacing(1)} !important`,
	paddingRight: `${theme.spacing(1)} !important`,
	"& .MuiSvgIcon-root": {
		color: "#44485A",
	},
}));

const MenuItemContainer = styled(MenuItem)(() => ({
	textTransform: "capitalize",
}));

const LinkBtnStyle = styled(Button)(() => ({
	width: "320px",
	display: "inline-block",
	backgroundColor: "inherit",
	boxShadow: "none !important",
	textTransform: "none",
	color: "#44485a",
	paddingRight: "2px",
	paddingLeft: "2px",
	"& .MuiButton-label": {
		whiteSpace: "nowrap",
		overflow: "hidden",
		textOverflow: "ellipsis",
	},
	"& .MuiButton-startIcon": {
		marginLeft: 0,
		display: "inline",
	},
	"& .MuiSvgIcon-root": {
		position: "relative",
		top: "5px",
	},
}));

const IconButtonContainer = styled(IconButton)(() => ({
	display: "flex",
	justifyContent: "center",
	width: "40px",
	height: "40px",
	padding: "8px",
	objectFit: "contain",
	borderRadius: "6px",
}));

const PositionCloseIcon = styled(ClearIcon)(() => ({
	color: "rgba(0, 0, 0, 0.54)",
	cursor: "pointer",
}));

const TodayBtn = styled(Button)(() => ({
	width: "75px",
	height: "40px",
	borderRadius: "6px",
	border: "solid 1.2px #e8e8e8",
	backgroundColor: "#ffffff",
	textTransform: "capitalize",
	color: "rgba(0, 0, 0, 0.87)",
	"&:hover": {
		border: "none",
	},
}));

const ActionBtn = styled(Button)(() => ({
	borderRadius: "20px",
	textTransform: "capitalize",
	padding: "8px 20px",
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

const FormControlContainer = styled(FormControl)(({ theme }) => ({
	backgroundColor: "#ffffff",
	borderRadius: "6px",
	textTransform: "capitalize",
	margin: theme.spacing(0),
	"& .MuiSelect-root": {
		color: "#44485A",
		fontSize: "14px",
		padding: "9px 10px",
		"&:focus": {
			background: "#fff",
		},
	},
}));

const DateField = styled(TextField)(({ theme }) => ({
	margin: 0,
	backgroundColor: "#ffffff",
	borderRadius: "6px",
	width: "170px",
	"& .MuiInputBase-root": {
		padding: "1px",
	},
	"& .MuiIconButton-root": {
		padding: theme.spacing(1),
	},
	"& input": {
		height: "auto",
		padding: "9px",
		fontSize: "14px",
		color: "#44485A",
	},
}));

const Label = styled(Typography)(() => ({
	minWidth: "60px",
	textTransform: "capitalize",
	fontSize: "20px",
	fontWeight: "bold",
	fontStretch: "normal",
	fontStyle: "normal",
	lineHeight: "normal",
	letterSpacing: "-0.36px",
	color: "#2a2d3c",
}));

const OutlineInputContainer = styled(OutlinedInput)(() => ({
	"& input": {
		height: "auto",
		"&::placeholder": {
			fontSize: "14px",
			color: "#44485A",
		},
	},
}));

const CustomToolbarComponent = (props) => {
	const {
		onViewChange,
		onNavigate,
		options,
		handleAction,
		messageType,
		handleSearch,
		handleSelectedDate,
		parentTabId,
		conversation,
		userTimezone,
		defaultUserTimezone,
		selectedRow = [],
	} = props;
	const [searchText, setSearchText] = useState(function () {
		return options?.activeQueryString || null;
	});
	const [shouldShowClrIcon, setShouldShowClrIcon] = useState(true);
	const [isSearchVisible, setSearchVisible] = useState(false);
	const onClear = (e) => {
		setSearchText((oldVal) => {
			handleAction("clearSearch");
			return "";
		});
		// const fakeEvt = { target: { name: id, value: "" } };
		// handleChange(fakeEvt);
		e.stopPropagation();
	};

	const [isSearching, setIsSearching] = useState(false);
	const [selectedDate, setSelectedDate] = useState(
		options.startDate
			? momentTz(options.startDate).tz(userTimezone || defaultUserTimezone)
			: momentTz().tz(userTimezone || defaultUserTimezone)
	);
	const isOnline = useSelector((state) => state.user.isOnline, shallowEqual);
	const dispatch = useDispatch();

	let currView = options.view || "month";
	const bgClndrToolBarState = useSelector(
		(state) => state?.v2?.NonConversational?.bgClndrToolBarState
	);
	let label, views, view, date;
	if (bgClndrToolBarState) {
		label = bgClndrToolBarState.label;
		views = bgClndrToolBarState.views;
		view = options.view || bgClndrToolBarState.view || "month";

		date = bgClndrToolBarState.date;
	} else {
		label = "";
		views = [];
		view = "";
		date = "";
	}

	const { filterActive, title, description } = options;
	const handleChange = (event) => {
		onViewChange
			? onViewChange(event.target.value)
			: onViewChangeTable(event.target.value);
	};
	const handleSearchInput = (e) => {
		if (e.key === "Enter" && e.target.value !== "") {
			//handleSelectedDate(selectedDate, currView, e.target.value);
			handleSearch(e.target.value);
			setIsSearching(true);
		}
	};

	const onViewChangeTable = (val) => {
		options.view = val;
		currView = options.view || "month";
		let lbl, lbl1, lbl2, lbl2_with_month;
		switch (val) {
			case "month":
				lbl = selectedDate.format("MMMM YYYY");
				break;
			case "day":
				lbl = selectedDate.format("dddd MMM DD");
				break;
			case "week":
				const lbl1_cloned = selectedDate.clone();
				const lb1_month_cloned = selectedDate.clone();
				const lb2_month_cloned = selectedDate.clone();
				const lbl_d_cloned = selectedDate.clone();
				const lbl2_cloned = selectedDate.clone();
				const lbl2_with_month_cloned = selectedDate.clone();
				lbl1 = lbl1_cloned
					.startOf("week")
					.subtract(1, "days")
					.format("MMMM DD");
				const lb1_month = lb1_month_cloned
					.startOf("week")
					.subtract(1, "days")
					.format("M");
				const lb2_month = lb2_month_cloned
					.endOf("week")
					.subtract(1, "days")
					.format("M");
				if (lb1_month === lb2_month) {
					const lbl_d = lbl_d_cloned
						.endOf("week")
						.subtract(1, "days")
						.format("dddd MMM DD");
					lbl2 = lbl2_cloned.endOf("week").subtract(1, "days").format("DD");
					lbl = lbl1 + " - " + lbl2;
				} else {
					lbl2_with_month = lbl2_with_month_cloned
						.endOf("week")
						.subtract(1, "days")
						.format("MMMM DD");
					lbl = lbl1 + " - " + lbl2_with_month;
				}
		}
		handleSelectedDate(selectedDate, currView);
		dispatch(
			handleCalendarToolBarChange({ view: val, label: lbl ? lbl : label })
		);
	};

	const onNavigateTable = (navIndicator) => {
		let lbl;
		switch (navIndicator) {
			case "NEXT":
				if (currView === "month") {
					lbl = selectedDate;
					lbl = lbl.add("1", "months");
					setSelectedDate(lbl);
					handleSelectedDate(lbl, currView);
					lbl = lbl.format("MMMM YYYY");
				} else if (currView === "week") {
					let lbl1, lbl2, lb1_month, lb2_month, lbl2_with_month, lb;
					lbl1 = selectedDate;
					lbl2 = selectedDate.clone();
					lb = selectedDate.clone();
					lb1_month = selectedDate.clone();
					lb2_month = selectedDate.clone();
					lbl1 = lbl1.add("1", "weeks");
					lbl2 = lbl2.add("1", "weeks");
					lb = lb.add("1", "weeks").day(0).startOf("day");
					lb1_month = lb1_month.add("1", "weeks");
					lb2_month = lb2_month.add("1", "weeks");
					lbl1 = lbl1.day(0).startOf("day").format("MMMM DD");
					lb1_month = lb1_month.day(0).startOf("day").format("M");
					lb2_month = lb2_month.day(0).day(6).endOf("day").format("M");
					if (lb1_month === lb2_month) {
						lbl2 = lbl2.day(0).day(6).endOf("day").format("DD");
						lbl = lbl1 + " - " + lbl2;
					} else {
						lbl2_with_month = lbl2.day(0).day(6).endOf("day").format("MMMM DD");
						lbl = lbl1 + " - " + lbl2_with_month;
					}
					setSelectedDate(lb);
					handleSelectedDate(lb, currView);
				} else if (currView === "day") {
					lbl = selectedDate;
					lbl = lbl.add("1", "days");
					setSelectedDate(lbl);
					handleSelectedDate(lbl, currView);
					lbl = lbl.format("dddd MMM DD");
				}
				break;
			case "PREV":
				if (currView === "month") {
					lbl = selectedDate;
					lbl = lbl.subtract("1", "months");
					setSelectedDate(lbl);
					handleSelectedDate(lbl, currView);
					lbl = lbl.format("MMMM YYYY");
				} else if (currView === "week") {
					let lbl1, lbl2, lb1_month, lb2_month, lbl2_with_month, lb;
					lbl1 = selectedDate;
					lbl2 = selectedDate.clone();
					lb = selectedDate.clone();
					lb1_month = selectedDate.clone();
					lb2_month = selectedDate.clone();
					lbl1 = lbl1.subtract("1", "weeks");
					lbl2 = lbl2.subtract("1", "weeks");
					lb = lb.subtract("1", "weeks").day(0).startOf("day");
					lb1_month = lb1_month.subtract("1", "weeks");
					lb2_month = lb2_month.subtract("1", "weeks");
					lbl1 = lbl1.day(0).startOf("day").format("MMMM DD");
					lb1_month = lb1_month.day(0).startOf("day").format("M");
					lb2_month = lb2_month.day(0).day(6).endOf("day").format("M");
					if (lb1_month === lb2_month) {
						lbl2 = lbl2.day(0).day(6).endOf("day").format("DD");
						lbl = lbl1 + " - " + lbl2;
					} else {
						lbl2_with_month = lbl2.day(0).day(6).endOf("day").format("MMMM DD");
						lbl = lbl1 + " - " + lbl2_with_month;
					}
					setSelectedDate(lb);
					handleSelectedDate(lb, currView);
				} else if (currView === "day") {
					lbl = selectedDate;
					lbl = lbl.subtract("1", "days");
					setSelectedDate(lbl);
					handleSelectedDate(lbl, currView);
					lbl = lbl.format("dddd MMM DD");
				}
				break;
			case "TODAY":
				if (currView === "month") {
					lbl = momentTz().tz(userTimezone || defaultUserTimezone);
					setSelectedDate(lbl);
					handleSelectedDate(lbl, currView);
					lbl = lbl.format("MMMM YYYY");
				} else if (currView === "week") {
					let lbl1, lbl2, lb1_month, lb2_month, lbl2_with_month, lb;
					lbl1 = momentTz().tz(userTimezone || defaultUserTimezone);
					lbl1 = lbl1.startOf("week").subtract(1, "days").format("MMMM DD");
					lbl2 = momentTz().tz(userTimezone || defaultUserTimezone);
					lb = momentTz().tz(userTimezone || defaultUserTimezone);
					lb1_month = momentTz()
						.tz(userTimezone || defaultUserTimezone)
						.subtract(1, "days")
						.format("M");
					lb2_month = momentTz()
						.tz(userTimezone || defaultUserTimezone)
						.subtract(1, "days")
						.format("M");
					if (lb1_month === lb2_month) {
						lbl2 = lbl2.endOf("week").subtract(1, "days").format("DD");
						lbl = lbl1 + " - " + lbl2;
					} else {
						lbl2_with_month = lbl2
							.endOf("week")
							.subract(1, "days")
							.format("MMMM DD");
						lbl = lbl1 + " - " + lbl2_with_month;
					}
					setSelectedDate(lb);
					handleSelectedDate(lb, currView);
				} else if (currView === "day") {
					lbl = momentTz()
						.tz(userTimezone || defaultUserTimezone)
						.startOf("day");
					setSelectedDate(lbl);
					handleSelectedDate(lbl, currView);
					lbl = lbl.format("dddd MMM DD");
				}
				break;
		}
		dispatch(handleCalendarToolBarChange({ label: lbl ? lbl : label }));
	};
	useEffect(() => {
		if (searchText !== null) {
			setSearchVisible(true);
		} else {
			setSearchVisible(false);
		}
		let lbl, lbl1, lbl2, lbl2_with_month;
		let lbl_cloned = selectedDate.clone();
		let lbl1_cloned = selectedDate.clone();
		let lb1_month_cloned = selectedDate.clone();
		let lb2_month_cloned = selectedDate.clone();
		let lb2_cloned = selectedDate.clone();
		let lbl2_with_month_cloned = selectedDate.clone();
		if (currView === "month") {
			lbl = lbl_cloned.format("MMMM YYYY");
		} else if (currView === "day") {
			lbl = lbl_cloned.format("dddd MMM DD");
		} else if (currView === "week") {
			lbl1 = lbl1_cloned.day(0).startOf("day").format("MMMM DD");
			const lb1_month = lb1_month_cloned.day(0).startOf("day").format("M");
			const lb2_month = lb2_month_cloned.day(0).day(6).endOf("day").format("M");
			if (lb1_month === lb2_month) {
				lbl2 = lb2_cloned.day(0).day(6).endOf("day").format("DD");
				lbl = lbl1 + " - " + lbl2;
			} else {
				lbl2_with_month = lbl2_with_month_cloned
					.day(0)
					.day(6)
					.endOf("day")
					.format("MMMM DD");
				lbl = lbl1 + " - " + lbl2_with_month;
			}
		}
		dispatch(handleCalendarToolBarChange({ label: lbl ? lbl : label }));
	}, []);

	const handleMapAction = (
		action,
		docId = null,
		currentField = null,
		content = []
	) => {
		try {
			content = content.map((rowData) =>
				_.map(
					rowData,
					(data) => data.fields.find((field) => field.title === "id")["value"]
				)
			); // To extract the IDs from the selected rows data
		} catch (error) {
			console.log(error);
		}
		console.log("content", content);
		let responseChat = {};
		responseChat.messageType = MessageTypeConstants.MESSAGE_TYPE_TABLE_RESPONSE;
		responseChat.message = {
			controlId: options.controlId,
			tabId: options?.parent?.length ? parentTabId : options.tabId,
			action,
			content: content.flat(),
			currentField,
			docId,
		};
		dispatch(sendAMessage(responseChat, true));
	};

	const handleMenuItemClickWrapper =
		(
			action,
			docId = null,
			currentField = null,
			content = [],
			selectedKeyName = "selectedAction"
		) =>
			(selectedAction) => {
				try {
					content = content.map((rowData) => {
						return _.map(
							rowData,
							(data) =>
								data.fields.find(
									(field) =>
										String.prototype.toLowerCase.call(field?.title) === "id"
								)["value"]
						);
					}); // To extract the IDs from the selected rows data
				} catch (error) {
					console.log(error);
				}
				let responseChat = {};
				responseChat.messageType =
					MessageTypeConstants.MESSAGE_TYPE_TABLE_RESPONSE;
				responseChat.message = {
					controlId: options.controlId,
					tabId: options?.parent?.length ? parentTabId : options.tabId,
					action,
					content: content.flat(),
					currentField,
					docId,
					[selectedKeyName]: selectedAction,
				};
				dispatch(sendAMessage(responseChat, true));
			};

	return (
		<>
			<ToolBarContainer>
				{selectedRow?.length ? (
					!Array.isArray(options?.selectionAction) ||
						(Array.isArray(options?.selectionAction) &&
							options?.selectionAction?.length < 2) ? (
						<DarkTooltip
							title={options?.selectionAction}
							arrow
							placement="top-end"
						>
							<LinkBtnStyle
								sx={{
									visibility: !selectedRow.length ? "hidden" : "visible",
								}}
								variant="contained"
								onClick={() =>
									handleMapAction(
										"multipleSelection",
										undefined,
										undefined,
										selectedRow
									)
								}
								startIcon={<DocumentIcon />}
							>
								{options?.selectionAction}
							</LinkBtnStyle>
						</DarkTooltip>
					) : (
						<CustomizedMenu
							dropdownOptions={options?.selectionAction}
							handleMenuItemClick={handleMenuItemClickWrapper(
								"multipleSelection",
								undefined,
								undefined,
								selectedRow
							)}
							className={{
								visibility: !selectedRow.length ? "hidden" : "visible",
							}}
						/>
					)
				) : null}
				<Grid container alignItems="center" spacing={1}>
					{messageType === MessageTypeConstants.MESSAGE_TYPE_CALENDAR && (
						<Grid item>
							<DateField
								id="date"
								label="Select Date"
								type="date"
								variant="outlined"
								InputLabelProps={{
									shrink: true,
								}}
								size="small"
								margin="dense"
								defaultValue={selectedDate}
								value={selectedDate.format("YYYY-MM-DD")}
								onChange={(e) => {
									const value = momentTz(e.target.value).tz(
										userTimezone || defaultUserTimezone
									);

									setSelectedDate(value);
									handleSelectedDate(value, currView);
									let lbl, lbl1, lbl2, lbl2_with_month;
									let lbl_cloned = value.clone();
									let lbl1_cloned = value.clone();
									let lb1_month_cloned = value.clone();
									let lb2_month_cloned = value.clone();
									let lb2_cloned = value.clone();
									let lbl2_with_month_cloned = value.clone();
									if (currView === "month") {
										lbl = lbl_cloned.format("MMMM YYYY");
									} else if (currView === "day") {
										lbl = lbl_cloned.format("dddd MMM DD");
									} else if (currView === "week") {
										lbl1 = lbl1_cloned.day(0).startOf("day").format("MMMM DD");
										const lb1_month = lb1_month_cloned
											.day(0)
											.startOf("day")
											.format("M");
										const lb2_month = lb2_month_cloned
											.day(0)
											.day(6)
											.endOf("day")
											.format("M");
										if (lb1_month === lb2_month) {
											lbl2 = lb2_cloned.day(0).day(6).endOf("day").format("DD");
											lbl = lbl1 + " - " + lbl2;
										} else {
											lbl2_with_month = lbl2_with_month_cloned
												.day(0)
												.day(6)
												.endOf("day")
												.format("MMMM DD");
											lbl = lbl1 + " - " + lbl2_with_month;
										}
									}
									dispatch(
										handleCalendarToolBarChange({ label: lbl ? lbl : label })
									);
								}}
							/>
						</Grid>
					)}
					{messageType === MessageTypeConstants.MESSAGE_TYPE_CALENDAR && (
						<>
							<Grid item>
								<IconButtonContainer
									onClick={() =>
										onNavigate ? onNavigate("PREV") : onNavigateTable("PREV")
									}
									size="large"
								>
									<KeyboardArrowLeftIcon color="#98B0C8" />
								</IconButtonContainer>
							</Grid>
							<Grid item>
								<Label variant="subtitle1">{label}</Label>
							</Grid>
							<Grid item>
								<IconButtonContainer
									onClick={() =>
										onNavigate ? onNavigate("NEXT") : onNavigateTable("NEXT")
									}
									size="large"
								>
									<KeyboardArrowRightIcon color="#98B0C8" />
								</IconButtonContainer>
							</Grid>
							<Grid item>
								<TodayBtn
									onClick={() =>
										onNavigate ? onNavigate("TODAY") : onNavigateTable("TODAY")
									}
									variant="outlined"
									margin="dense"
								>
									Today
								</TodayBtn>
							</Grid>
						</>
					)}
				</Grid>
				<Grid
					container
					alignItems="center"
					justifyContent="flex-end"
					spacing={1}
				>
					{options.allowSearch && (
						<Grid item>
							{isSearchVisible ? (
								<FormControlContainer fullWidth size="small" variant="outlined">
									<OutlineInputContainer
										id="search"
										placeholder={
											options.searchPlaceholder
												? options.searchPlaceholder
												: "Search..."
										}
										value={searchText || ""}
										disabled={!isOnline}
										onChange={(e) => setSearchText(e.target.value)}
										onKeyDown={handleSearchInput}
										startAdornment={
											<InputAdornment position="start">
												<SearchIcon color={isOnline ? "primary" : "disabled"} />
											</InputAdornment>
										}
										endAdornment={
											shouldShowClrIcon ? (
												<PositionCloseIcon fontSize="small" onClick={onClear} />
											) : null
										}
									/>
								</FormControlContainer>
							) : (
								<IconButtonContainer
									aria-label="FilterList"
									disabled={!isOnline}
									onClick={() => setSearchVisible(true)}
									size="large"
								>
									<SearchIcon color="#98B0C8" />
								</IconButtonContainer>
							)}
						</Grid>
					)}
					{filterActive && (
						<Grid item>
							<FMFilter
								conversation={conversation}
								options={options}
								parentTabId={parentTabId}
							/>
						</Grid>
					)}
					{messageType === MessageTypeConstants.MESSAGE_TYPE_CALENDAR &&
						views &&
						views.length && (
							<Grid item>
								<FormControlContainer variant="outlined" margin="dense">
									<SelectContainer value={view} onChange={handleChange}>
										{views.map((value, index) => {
											return (
												<MenuItemContainer value={value} key={index}>
													{value}
												</MenuItemContainer>
											);
										})}
									</SelectContainer>
								</FormControlContainer>
							</Grid>
						)}

					{messageType === MessageTypeConstants.MESSAGE_TYPE_TABLE && (
						<Grid item>
							{!options?.topTableMenu && options?.confirmAction && (
								<ActionBtn
									variant="contained"
									onClick={() => handleAction("onConfirm")}
								>
									{options?.confirmAction}
								</ActionBtn>
							)}
							{options?.topTableMenu && (
								<CustomizedMenu
									dropdownOptions={options?.topTableMenu}
									handleMenuItemClick={handleMenuItemClickWrapper(
										"topMenu",
										undefined,
										undefined,
										selectedRow,
										"selectedOption"
									)}
								/>
							)}
						</Grid>
					)}

					{options?.allowRefresh && (
						<Grid item>
							<Tooltip title="Refresh">
								<IconButtonContainer
									onClick={() => {
										setSearchText("");
										handleAction("onRefresh");
									}}
									size="large"
								>
									<RefreshIcon color="#98B0C8" />
								</IconButtonContainer>
							</Tooltip>
						</Grid>
					)}

					{options?.allowDownload && (
						<Grid item>
							<Button
								variant="outlined"
								color="primary"
								onClick={handleAction("onDownload")}
							>
								Download
							</Button>
						</Grid>
					)}
				</Grid>
			</ToolBarContainer>
		</>
	);
};

export default React.memo(CustomToolbarComponent);
