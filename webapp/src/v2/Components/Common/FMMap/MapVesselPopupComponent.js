import React, { useState, useRef, useEffect } from "react";
import {
	Dialog,
	DialogContent,
	DialogContentText,
	Paper,
	IconButton,
	Typography,
	Table,
	TableBody,
	CircularProgress,
	TableRow,
} from "@mui/material";
import Link from "@mui/material/Link";
import Draggable from "react-draggable";
import MuiDialogTitle from "@mui/material/DialogTitle";
import MuiTableCell from "@mui/material/TableCell";
import CloseIcon from "@mui/icons-material/Close";
import Config from "../../../../Utils/Config";
import momentTz from "moment-timezone";

import { useSelector, useDispatch, connect } from "react-redux";
import GenericAjax from "../../../../Services/GenericAjax";
import { showSnackbarV2 } from "../../../Store/Notification/NotificationAction";
import { getAuthData } from "../../../../Services/StorageService";
import MarkerComponent from "./MarkerComponent";
import { styled } from "@mui/material/styles";
import ModalPopup from "../../../../Components/ModalMessages/ModalPopup";
import DiallerKeyPad from "../../../../Components/Telephony/DiallerKeyPad";
import { makeCall } from "../../../../State/actions/phone";
import { notifyInvalidPhone } from "../../../../Components/Telephony/Utils";

const R = require("ramda");

const TableCell = styled(MuiTableCell)({
	// root: {
	borderBottom: "none",
	fontSize: "12px",
	padding: "5px 2px",
	whiteSpace: "nowrap",
	color: "#44485a",
	// },
});

const CustomDialog = styled(Dialog)(({ theme }) => ({
	"& .MuiDialog-scrollPaper": {
		alignItems: "flex-end",
		justifyContent: "flex-end",
	},
	"& .MuiDialog-paperFullWidth": {
		minWidth: "300",
		maxWidth: "max-content",
		maxHeight: "410px !important",
		// height: "401px",
	},
}));

const StyledLink = styled(Link)(({ theme }) => ({
	fontSize: 12,
	color: "#638dff !important",
}));

const ButtonProgress = styled(CircularProgress)(() => ({
	position: "absolute",
	top: 125,
	left: "50%",
	marginTop: -12,
	marginLeft: -12,
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
	position: "absolute",
	right: theme.spacing(1),
	top: theme.spacing(1),
	color: "silver",
	backgroundColor: "white",
	width: "8px",
	height: "8px",
}));

const DialogRoot = styled(MuiDialogTitle)(({ theme }) => ({
	margin: 0,
	padding: theme.spacing(2),
}));

const DialogTitle = (props) => {
	const { children, onClose, ...other } = props;
	return (
		<DialogRoot {...other}>
			<Typography style={{ fontSize: "1rem" }}>
				{children}
			</Typography>
			{onClose ? (
				<CloseButton aria-label="close" onClick={onClose} size="large">
					<CloseIcon />
				</CloseButton>
			) : null}
		</DialogRoot>
		// <div></div>
	);
};

function PaperComponent(props) {
	return (
		<Draggable
			handle="#scroll-dialog-title"
			cancel={'[class*="MuiDialogContent-root"]'}
		>
			<Paper {...props} />
		</Draggable>
	);
}
function MapVesselPopupComponent({
	shudOpen,
	popupShudOpenCallback,
	checked,
	rowId,
	fileScope,
	clicked_row_details,
	rowData,
	options,
	emailAddress,
	balance,
	isPostpaidUser,
	makeCall,
}) {
	const sectionRef = useRef(null);
	const dispatch = useDispatch();
	const [scroll, setScroll] = useState("paper");
	const [isLoading, setIsLoading] = useState(false);
	const [openDialPad, setOpenDialPad] = useState(false);
	const [currentPhoneNum, setCurrentPhoneNum] = useState("");
	const showCreateConversation = (phoneNumber) => {
		setOpenDialPad(true);
		setCurrentPhoneNum(phoneNumber);
	};

	const closeCreateConversation = () => {
		setOpenDialPad(false);
	};

	const makePhoneCall = async (phone, callMode) => {
		if (R.isNil(phone)) {
			notifyInvalidPhone();
			return;
		}

		if (!isPostpaidUser.isPostpaidUser) {
			if (balance <= 0) {
				closeCreateConversation();
				// this.props.noBalance();
				return;
			}
		}

		if (callMode === "sat") {
			makeCall("sat", emailAddress, phone, phone, null, null, "on-call");
		} else {
			makeCall("phone", emailAddress, phone, phone, null, null, "on-call");
		}
	};

	const {
		chats: {
			selectedConversation: {
				conversationId: selectedConversationId,
				bot: { botId: currentBotId },
				userDomain: currentUserDomain,
			},
		},
		user,
	} = useSelector((state) => state);

	const {
		user: { userTimezone },
	} = getAuthData();
	const defaultUserTimezone = "Etc/UTC";

	const [scopeId, setScopeId] = useState(() => {
		switch (fileScope) {
			case "bot": {
				return currentBotId;
			}

			case "domain": {
				return currentUserDomain;
			}

			case "conversation":
			default: {
				return selectedConversationId;
			}
		}
	});

	const validateEmailOrPhone = (value) => {
		let isPhoneNumber = false;
		let isEmail = false;
		let trimmedPhoneNumber = value.toString().replace(/ /g, "");

		if (options && options.columnTemplate) {
			options.columnTemplate.map((eachOption) => {
				for (let key in clicked_row_details) {
					if (
						key == eachOption.title &&
						eachOption.type == "email_field" &&
						clicked_row_details[key] == value
					) {
						isEmail = true;
					} else if (
						key == eachOption.title &&
						eachOption.type == "phone_number" &&
						clicked_row_details[key] == value
					) {
						isPhoneNumber = true;
					}
				}
			});
		}

		if (isEmail) {
			return (
				<StyledLink
					onClick={() => {
						// window.location = `mailto:${value}`;
						window.open(`mailto:${value}`, "_blank");
					}}
				>
					mail to: {value}
				</StyledLink>
			);
		} else if (isPhoneNumber) {
			return (
				<StyledLink onClick={() => showCreateConversation(trimmedPhoneNumber)}>
					{value}
				</StyledLink>
			);
		} else {
			return value;
		}
	};

	const handleClose = () => {
		popupShudOpenCallback(false, rowData);
		const elem = document.getElementById(`${rowId}`);
		if (elem) {
			const ele1 = elem.getElementsByClassName("outer-first-child")[0];
			const ele2 = elem.getElementsByClassName("inner-first-child")[0];
			if (ele1 && !checked.includes(`${rowId}`)) {
				ele1.style.display = "none";
			}
			if (ele2 && !checked.includes(`${rowId}`)) {
				ele2.style.display = "none";
			}
		}
		const element = document.getElementById("scroll-dialog-title");
		if (element) {
			element.style.backgroundImage = "none";
		}
	};

	const descriptionElementRef = React.useRef(null);
	React.useEffect(() => {
		if (shudOpen) {
			const { current: descriptionElement } = descriptionElementRef;
			if (descriptionElement !== null) {
				descriptionElement.focus();
			}
		}
	}, [shudOpen]);
	// const clicked_row_details = qVgeoPoints.find(
	// 	(geoPt) => geoPt.id === rowId || geoPt.Id === rowId
	// );

	// useLayoutEffect(() => {
	// 	const clicked_row_details = qVgeoPoints.find(
	// 		(geoPt) => geoPt.id === rowId || geoPt.Id === rowId
	// 	);
	// });

	const downloadFile = (value, fileName) => {
		setIsLoading(true);
		if (user.isOnline) {
			const url = `${R.prop("filesAPI", Config)}/downloadwithsignedurl/${fileScope || "conversation"
				}/${scopeId}/${value}`;
			GenericAjax.downloadSignedUrlFile(url)
				.then((res) => {
					if (res?.signedUrl) {
						GenericAjax.downloadFile(res.signedUrl)
							.then((blob) => {
								const current = window.URL.createObjectURL(blob);
								const elem = document.getElementById("scroll-dialog-title");
								if (elem) {
									elem.style.backgroundImage = `url(${current})`;
								}
								setIsLoading(false);
							})
							.catch((error) => {
								console.error("ERROR in getting file from signed url", error);
								dispatch(showSnackbarV2("error", "Failed to download file"));
								setIsLoading(false);
							});
					}
				})
				.catch((error) => {
					console.error("ERROR in genrate Signed Url", error);
					dispatch(showSnackbarV2("error", "Failed to generate signed url"));
					setIsLoading(false);
				});
		} else {
			dispatch(
				showSnackbarV2(
					"error",
					"You will be able to download this file once you are back online"
				)
			);
			setIsLoading(false);
		}
	};
	useEffect(() => {
		if (shudOpen) {
			if (clicked_row_details && clicked_row_details["Image URL"]) {
				downloadFile(clicked_row_details["Image URL"]);
			}
		}
	}, [rowData]);

	if (clicked_row_details?.quickViewOfId) {
		clicked_row_details && delete clicked_row_details.quickViewOfId;
	} else {
		clicked_row_details && delete clicked_row_details.id;
		clicked_row_details && delete clicked_row_details.Id;
		clicked_row_details && delete clicked_row_details.quickViewOfId;
	}
	let height;
	if (clicked_row_details && clicked_row_details["Image URL"]) {
		height = 250;
	} else {
		height = 20;
	}

	return (
		<div>
			<CustomDialog
				open={shudOpen}
				fullWidth
				id="quickview-dialog"
				onClose={handleClose}
				PaperComponent={PaperComponent}
				style={{ zIndex: 999 }}
				hideBackdrop={true}
				// sx={{ maxHeight: "4000vh" }}
				// scroll={scroll}
				aria-labelledby="scroll-dialog-title"
				aria-describedby="scroll-dialog-description"
			>
				<DialogTitle
					sx={
						clicked_row_details && clicked_row_details["Image URL"] != undefined
							? {
								backgroundImage: "linear-gradient(black, transparent)",
								backgroundRepeat: "no-repeat",
								backgroundSize: "cover",
								height: "200px !important",
								// overflow: "scroll !important",
								// overflow: "scroll",
								scroll: "body",
							}
							: {
								backgroundImage: "none !important",
							}
					}
					// id="scroll-dialog-title"
					onClose={handleClose}
				>
					{isLoading ? <ButtonProgress size={24} /> : null}
				</DialogTitle>
				{clicked_row_details && clicked_row_details["title"] && (
					<DialogTitle
						sx={
							["circle", "vessel"].includes(rowData?.iconType) &&
							options?.mapOptions?.enableVisualElements && {
								paddingLeft: 0,
								paddingBottom: 0,
								"& .MuiTypography-root": {
									display: "flex",
								},
							}
						}
					>
						{["circle", "vessel"].includes(rowData?.iconType) &&
							options?.mapOptions?.enableVisualElements ? (
							<MarkerComponent
								markerColor={rowData?.color || rowData.markerColor}
								inPopup={true}
								iconType={rowData?.iconType}
							/>
						) : null}
						{clicked_row_details && <span>{clicked_row_details["title"]}</span>}
					</DialogTitle>
				)}
				<DialogContent>
					<DialogContentText
						id="scroll-dialog-description"
						component="div"
						ref={descriptionElementRef}
						tabIndex={-1}
					>
						<Table aria-label="simple table">
							<TableBody>
								{Object.entries(clicked_row_details || {})
									.filter(([ke, val], index) => !(ke === "Image URL"))
									.map(([ke, val], index) => {
										let tmp;
										if (ke.includes("Date Time (Local Time)")) {
											val = String(
												momentTz(val)
													.tz(userTimezone || defaultUserTimezone)
													.format("lll")
											);
										}
										if (Array.isArray(val)) {
											tmp = val.filter(
												(item) =>
													item["longitude"] != null && item["latitude"] != null
											);
											if (tmp.length == val.length) {
												tmp = tmp.map((item) =>
													JSON.stringify([
														item["latitude"],
														item["longitude"],
													]).replace(",", " , ")
												);
												val = tmp;
												ke = "";
											}
										}

										return (
											val && (
												<TableRow key={index}>
													<TableCell>{ke}</TableCell>
													<TableCell
														align="right"
														style={{
															whiteSpace:
																typeof val === "object"
																	? Array.isArray(val)
																		? "pre"
																		: "normal"
																	: "normal",
														}}
													>
														{typeof val === "object"
															? Array.isArray(val)
																? val.join("\r\n")
																: "some object"
															: validateEmailOrPhone(val)}
													</TableCell>
												</TableRow>
											)
										);
									})}
							</TableBody>
						</Table>
					</DialogContentText>
				</DialogContent>
			</CustomDialog>
			{openDialPad && (
				<ModalPopup size="sm" noHeader className="dialler-modal">
					<DiallerKeyPad
						makePhoneCall={makePhoneCall}
						onClose={closeCreateConversation}
						// noBalance={() => props.noBalance()}
						phoneNumFromLink={currentPhoneNum}
					/>
				</ModalPopup>
			)}
		</div>
	);
}

const actions = {
	makeCall: makeCall,
};

const mapDataToProps = (state) => {
	let user = state.user;

	return {
		userId: user.user.userId,
		isUserOnline: user.isOnline,
		emailAddress: user.user.emailAddress,
		balance: user.balance,
		isPostpaidUser: state.user.voipStatus || false,
	};
};

export default connect(mapDataToProps, actions)(MapVesselPopupComponent);
