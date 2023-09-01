import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import {
	Drawer,
	Typography,
	CssBaseline,
	Divider,
	Tooltip,
	ListItem,
	ListItemIcon,
	ListItemText,
	Checkbox,
	IconButton,
	Button,
	Box,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { FixedSizeList as List } from "react-window";
import AutoSizer from 'react-virtualized-auto-sizer';
import DocumentIcon from "./DocumentIcon";
import { sendAMessage } from "../../../../State/actions/chats";
import { MessageTypeConstants } from "../../../../Services/Message";
import FMFilter from "../FMFilter/FMFilter";
import CustomizedMenu from "./CustomizedMenu";
import { useDispatch } from "react-redux";
import MarkerComponent from "./MarkerComponent";
import ListItemSkeleton from "./ListItemSkeleton";
import _ from "lodash";
import { styled } from "@mui/material/styles";

const drawerWidth = 338.9;
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

const SecondaryTxtCls = styled(Typography)(() => ({
	color: "#9c9ea7",
	fontSize: "12px",
	overflowWrap: "break-word",
}));

const ListItemInnerStyle = styled(ListItem)(() => ({
	"&:hover": {
		backgroundColor: "#e5f6fa",
	},
	paddingTop: "15px",
	paddingBottom: "15px",
}));

const EdgeBtnClass = styled(IconButton)(() => ({
	"&:hover": {
		backgroundColor: "transparent",
	},
}));

const SliderNavBannerStyles = styled("div")(() => ({
	padding: "6px",
	marginLeft: "0px",
	paddingLeft: "15px",
	paddingRight: "0px",
	backgroundColor: "#f4f4f4",
	borderTopLeftRadius: "15px",
	borderBottom: "1px solid #E8E8E8",
}));

const FltrBtnStyles = styled("div")(() => ({
	display: "inline-block",
	position: "absolute",
	right: "10px",
	top: "9px",
}));

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.easeOut,
		duration: theme.transitions.duration.enteringScreen,
	}),
	height: "100%",
	visibility: "visible !important",
	transform: "none !important",
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: 0,
});

const DrawerContainer = styled(Drawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme),
	}),
}));

var prevRow = null;

function MapSideDrawer({
	rowId,
	mapContainer,
	options,
	popupShudOpenCallback,
	shudOpen,
	setRowIdCallback,
	flyToCallback,
	parentTabId = null,
	geoPoints,
	conversation,
	checked,
	setChecked,
	listRef
}) {
	const [open, setOpen] = useState(false);
	const scrollPosition = useRef(0);
	const listenerAttached = useRef(false);
	const dispatch = useDispatch();

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};
	let [markerPoints, setMarkerPoints] = useState([]);
	let [markerIdsArr, setMarkerIdsArr] = useState([]);

	useEffect(() => {
		switch (options?.mapOptions?.listType) {
			case "markers":
				setMarkerPoints(() => {
					let returnVal = geoPoints.filter(
						(msg) => msg.type === "geo_point_field" && msg.pointType === "marker"
					);
					setMarkerIdsArr(returnVal.map((point) => point.id));
					return returnVal;
				});
				break;
			case "areas":
				setMarkerPoints(() => {
					let returnVal = geoPoints.filter(
						(msg) => msg.type === "geo_area_field"
					);
					setMarkerIdsArr(returnVal.map((point) => point.id));
					return returnVal;
				});
				break;
			default:
				setMarkerPoints(() => {
					let returnVal = geoPoints.filter(
						(msg) =>
							msg.type === "geo_area_field" ||
							(msg.type === "geo_point_field" && msg.pointType === "marker")
					);
					setMarkerIdsArr(returnVal.map((point) => point.id));
					return returnVal;
				});
		}
		//=====

	}, [geoPoints, geoPoints && geoPoints.length, options?.mapOptions?.listType]);

	const handleToggle = (value) => (evt) => {
		evt.stopPropagation();
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];
		const elem = document.getElementById(`${value}`);

		if (currentIndex === -1) {
			newChecked.push(value);
			if (elem) {
				const ele1 = elem.getElementsByClassName("outer-first-child");
				const ele2 = elem.getElementsByClassName("inner-first-child");
				if (ele1 && ele1.length) {
					ele1[0].style.display = "block";
				}
				if (ele2 && ele2.length) {
					ele2[0].style.display = "block";
				}
			}
		} else {
			newChecked.splice(currentIndex, 1);
			if (elem) {
				const ele1 = elem.getElementsByClassName("outer-first-child");
				const ele2 = elem.getElementsByClassName("inner-first-child");
				if (ele1 && ele1.length) {
					ele1[0].style.display = "none";
				}
				if (ele2 && ele2.length) {
					ele2[0].style.display = "none";
				}
			}
		}

		setChecked(newChecked);
	};

	const handleMapAction = (
		action,
		docId = null,
		currentField = null,
		content = null
	) => {
		let responseChat = {};
		responseChat.messageType = MessageTypeConstants.MESSAGE_TYPE_TABLE_RESPONSE;
		responseChat.message = {
			controlId: options.controlId,
			tabId: options?.parent?.length ? parentTabId : options.tabId,
			action,
			content,
			currentField,
			docId,
		};
		dispatch(sendAMessage(responseChat, true));
	};

	const handleMenuItemClickWrapper =
		(action, docId = null, currentField = null, content = null) =>
			(selectedAction) => {
				let responseChat = {};
				responseChat.messageType =
					MessageTypeConstants.MESSAGE_TYPE_TABLE_RESPONSE;
				responseChat.message = {
					controlId: options.controlId,
					tabId: options?.parent?.length ? parentTabId : options.tabId,
					action,
					content,
					currentField,
					docId,
					selectedAction,
				};
				dispatch(sendAMessage(responseChat, true));
			};

	const handleCheckAll = (e) => {
		if (e?.target?.checked) {
			setChecked(markerIdsArr);
			markerIdsArr.forEach((marker) => {
				const elem = document.getElementById(`${marker}`);
				if (elem) {
					const ele1 = elem.getElementsByClassName("outer-first-child");
					const ele2 = elem.getElementsByClassName("inner-first-child");
					if (ele1 && ele1.length) {
						ele1[0].style.display = "block";
					}
					if (ele2 && ele2.length) {
						ele2[0].style.display = "block";
					}
				}
			});
		} else {
			setChecked([]);
			markerIdsArr.forEach((marker) => {
				const elem = document.getElementById(`${marker}`);
				if (elem) {
					const ele1 = elem.getElementsByClassName("outer-first-child");
					const ele2 = elem.getElementsByClassName("inner-first-child");
					if (ele1 && ele1.length) {
						ele1[0].style.display = "none";
					}
					if (ele2 && ele2.length) {
						ele2[0].style.display = "none";
					}
				}
			});
		}
	};

	const handleRowClick = (evt, row) => {
		popupShudOpenCallback(true, row);
		setRowIdCallback(row);
		flyToCallback(row);
		const elem = document.getElementById(`${row.id || row.Id}`);
		if (elem) {
			const ele1 = elem.getElementsByClassName("outer-first-child")[0];
			if (ele1) {
				ele1.style.display = "block";
			}
			const ele2 = elem.getElementsByClassName("inner-first-child")[0];
			if (ele2) {
				ele2.style.display = "block";
			}
		}

		if (prevRow && prevRow.id && row && prevRow.id !== row.id) {
			const elem2 = document.getElementById(`${prevRow.id || prevRow.Id}`);
			if (elem2) {
				const ele1 = elem2.getElementsByClassName("outer-first-child")[0];
				if (ele1) {
					ele1.style.display = "none";
				}
				const ele2 = elem2.getElementsByClassName("inner-first-child")[0];
				if (ele2) {
					ele2.style.display = "none";
				}
			}
		}
		prevRow = row;
	};


	const setScrollTop = () => {
		if (open) {
			const listContainer = document.querySelector(".unorderedListScrollContainer");
			if (listContainer) {
				listContainer.scrollTop = scrollPosition.current;
			}
		}
	}

	requestAnimationFrame(setScrollTop);

	useEffect(() => {
		let countdown = setTimeout(setScrollTop, 50);

		return () => clearTimeout(countdown);
	}, [open]);

	useEffect(() => {
		let listContainer;
		let handleScrollPosition = _.debounce(() => {
			const listContainer = document.querySelector('.unorderedListScrollContainer');
			if (listContainer) {
				scrollPosition.current = listContainer.scrollTop;
			}
		}, 300); // Debounce delay in milliseconds

		setTimeout(() => {
			listContainer = document.querySelector('.unorderedListScrollContainer');
			if (listContainer && !listenerAttached.current) {
				listContainer.addEventListener('scroll', handleScrollPosition);
				listenerAttached.current = true;
			}
		}, 50);

		return () => {
			if (listContainer) {
				listContainer.removeEventListener('scroll', handleScrollPosition);
			}
			handleScrollPosition.cancel(); // Cancel any pending debounced execution
			cancelAnimationFrame(setScrollTop);
			listenerAttached.current = false;
		};
	});

	function DrawerHeader({
		checked,
		options,
		handleCheckAll,
		handleMapAction,
		handleMenuItemClickWrapper,
		FMFilter,
		conversation,
		parentTabId,
	}) {
		return (
			<SliderNavBannerStyles>
				<Checkbox
					edge="start"
					sx={!options?.selectableRows && { visibility: "hidden" }}
					color="primary"
					indeterminate={
						checked.length > 0 && checked.length < markerIdsArr.length
					}
					checked={
						checked.length > 0 && checked.length === markerIdsArr.length
					}
					onChange={handleCheckAll}
					tabIndex={-1}
					disableRipple
					inputProps={{ "aria-labelledby": `checkbox-list-label-parent` }}
				/>
				{!Array.isArray(options?.selectionAction) ||
					(Array.isArray(options?.selectionAction) &&
						options?.selectionAction?.length < 2) ? (
					<DarkTooltip
						title={options?.selectionAction}
						arrow
						placement="top-end"
					>
						<Button
							variant="contained"
							sx={[
								!checked.length && { visibility: "hidden" },
								{
									width: "130px",
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
									},
									"& .MuiSvgIcon-root": {
										position: "relative",
										top: "5px",
									},
								},
							]}
							onClick={() =>
								handleMapAction(
									"multipleSelection",
									undefined,
									undefined,
									checked
								)
							}
							startIcon={<DocumentIcon />}
						>
							{options?.selectionAction}
						</Button>
					</DarkTooltip>
				) : (
					<CustomizedMenu
						dropdownOptions={options?.selectionAction}
						handleMenuItemClick={handleMenuItemClickWrapper(
							"multipleSelection",
							undefined,
							undefined,
							checked
						)}
						isVisible={!checked.length}
					/>
				)}
				{options?.filterActive && (
					<FltrBtnStyles>
						<FMFilter
							conversation={conversation}
							options={options}
							parentTabId={parentTabId}
						/>
					</FltrBtnStyles>
				)}
			</SliderNavBannerStyles>
		);
	}

	function MapListItem({ index, style, data, isScrolling }) {
		const {
			markerPoints,
			options,
			checked,
			handleToggle,
			handleRowClick,
			shudOpen,
			rowId,
		} = data;
		const row = markerPoints[index];
		const labelId = `checkbox-list-label-${index}`;
		let isDescription = row["Description"] || row["description"];

		return (
			<div style={style} id={`list-item-wrapper-${index}`}>
				{false ? (
					// Render skeleton list item
					<ListItemSkeleton />
				) : (
					<li
						key={`${index}`}
						id={`list-item-${row.id || row.Id}`}
						onClick={(evt) => handleRowClick(evt, row)}
						style={
							shudOpen && rowId === (row.id || row.Id)
								? { backgroundColor: "#e5f6fa" }
								: { backgroundColor: "transparent" }
						}
					>
						<ListItemInnerStyle
							key={`${index}`}
							role={undefined}
							dense
							button
						>
							<ListItemIcon>
								<Checkbox
									edge="start"
									color="primary"
									sx={[
										!options?.selectableRows && { visibility: "hidden" },
										{
											paddingTop: "10px",
											paddingBottom: "10px",
										},
									]}
									checked={checked.indexOf(row.id || row.Id) !== -1}
									onClick={handleToggle(row.id || row.Id)}
									tabIndex={-1}
									disableRipple
									inputProps={{ "aria-labelledby": labelId }}
								/>
							</ListItemIcon>
							<ListItemText
								id={labelId}
								sx={{
									"& .primary": {
										fontWeight: "bold",
										fontSize: "14px",
										overflowWrap: "break-word",
									},
								}}
								primary={row["title"] ? row["title"] : "dummy title"}
								secondary={
									<React.Fragment>
										{isDescription && (
											<SecondaryTxtCls
												component="span"
												variant="body2"
												color="textPrimary"
											>
												{`${options?.mapOptions?.descriptionText
													? options?.mapOptions?.descriptionText
													: "Description"
													}: ${row["Description"] || row["description"]}`}
											</SecondaryTxtCls>
										)}
									</React.Fragment>
								}
							/>
							{[
								"circle",
								"vessel",
								"vesselSuspended",
								"vesselDeleted",
							].includes(row?.iconType) &&
								options?.mapOptions?.enableVisualElements ? (
								<EdgeBtnClass
									disableRipple
									edge="start"
									aria-label="delete"
									size="large"
								>
									<MarkerComponent
										markerColor={row?.color || row?.markerColor}
										inSideNav={true}
										iconType={row?.iconType}
										forSideNav={true}
									/>
								</EdgeBtnClass>
							) : null}
						</ListItemInnerStyle>
						<Divider />
					</li>)}
			</div>
		);
	}

	function MapList({
		markerPoints,
		options,
		checked,
		handleToggle,
		handleRowClick,
		shudOpen,
		rowId,
	}) {

		const itemHeight = 82; // You can adjust this value according to the height of your list items
		return (
			<AutoSizer>
				{({ height, width }) => (
					<Box className="unorderedList" sx={{ listStyleType: "none" }}>
						<List
							ref={listRef}
							height={height - 60} // Set the height of the virtualized list container
							itemCount={markerPoints.length}
							itemSize={itemHeight}
							className="unorderedListScrollContainer"
							itemData={{
								markerPoints,
								options,
								checked,
								handleToggle,
								handleRowClick,
								shudOpen,
								rowId,
							}}
							width={width}
							useIsScrolling={true}
						>
							{MapListItem}
						</List>
					</Box>)
				}
			</AutoSizer>
		);
	}

	return (
		<Box
			sx={{
				width: "100%",
				maxWidth: 400,
				backgroundColor: (theme) => theme.palette.background.paper,
			}}
		>
			<CssBaseline />
			<DrawerContainer
				variant="persistent"
				anchor="left"
				open={open}
				sx={{ position: "absolute", top: "0px", border: 0, flexShrink: 0 }}
				BackdropProps={{ sx: { position: "absolute" } }}
				ModalProps={{
					container: document.getElementById(mapContainer),
				}}
				PaperProps={{
					sx: {
						position: "absolute",
						overflow: "unset",
						borderRight: 0,
						height: "auto",
					},
				}}
			>
				<DrawerHeader
					checked={checked}
					options={options}
					handleCheckAll={handleCheckAll}
					handleMapAction={handleMapAction}
					handleMenuItemClickWrapper={handleMenuItemClickWrapper}
					FMFilter={FMFilter}
					conversation={conversation}
					parentTabId={parentTabId}
				/>
				<MapList
					markerPoints={markerPoints}
					options={options}
					checked={checked}
					handleToggle={handleToggle}
					handleRowClick={handleRowClick}
					shudOpen={shudOpen}
					rowId={rowId}
				/>
			</DrawerContainer>
			<DarkTooltip
				title={
					open
						? `Collapse List Of ${options["title"]}`
						: `Expand List Of ${options["title"]}`
				}
				arrow
				placement="right-end"
			>
				<IconButton
					id="sideNavbarEarBtn"
					sx={(theme) => ({
						position: "absolute",
						bgcolor: "#f4f4f4",
						border: "solid 1px #E8E8E8",
						borderTop: "solid 1px #f4f4f4",
						width: "40px",
						marginLeft: open ? `${drawerWidth}px` : "0px",
						height: "60px",
						borderTopLeftRadius: open ? "0px" : "15px",
						borderRadius: 0,
						borderBottomRightRadius: "25% 15%",
						boxShadow: "none",
						transition: theme.transitions.create(["margin"], {
							easing: theme.transitions.easing.sharp,
							duration: theme.transitions.duration.leavingScreen,
						}),
						"& .MuiSvgIcon-root": {
							zIndex: 1,
						},
						"& .MuiTouchRipple-root": {
							bgcolor: "#f4f4f4",
						},
					})}
					open={open}
					onClick={open ? handleDrawerClose : handleDrawerOpen}
					size="large"
				>
					{open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
				</IconButton>
			</DarkTooltip>
		</Box>
	);
}

export default MapSideDrawer;
