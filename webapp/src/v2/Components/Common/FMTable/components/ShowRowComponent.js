import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import moment from "moment-timezone";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SyncIcon from "@mui/icons-material/Sync";

import { getAuthData } from "../../../../../Services/StorageService";
import CachedImage from "../../../../../Components/Common/CachedImage";
import GenericAjax from "../../../../../Services/GenericAjax";
import Config from "../../../../../Utils/Config";
import { showSnackbarV2 } from "../../../../Store/Notification/NotificationAction";
import { Box, styled } from "@mui/material";
import ModalPopup from "../../../../../Components/ModalMessages/ModalPopup";
import DiallerKeyPad from "../../../../../Components/Telephony/DiallerKeyPad";
import { notifyInvalidPhone } from "../../../../../Components/Telephony/Utils";
import { makeCall } from "../../../../../State/actions/phone";

const R = require("ramda");

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	fontSize: 12,
	borderBottom: "none !important",
}));

const StyledLink = styled(Link)(({ theme }) => ({
	fontSize: 12,
	color: "#638dff !important",
}));

const StyledSyncIcon = styled(SyncIcon)(({ theme }) => ({
	fontSize: 20,
	backgroundColor: "white",
	borderRadius: 20,
	color: "#e5743b",
	border: "1px solid",
}));

const StyledSpan = styled("span")(({ theme }) => ({
	width: "1%",
	whiteSpace: "nowrap",
}));

const StyledTableRow = styled(TableRow)(
	({ theme }) => ({
		backgroundColor: "#ffffff",
		"&:nth-of-type(odd)": {
			backgroundColor: "#f4f7fb",
		},
		whiteSpace: "break-spaces",
	}),
	(props) =>
		props.isoffline !== "true" && {
			backgroundColor: "#FFF1E2",
			"&:nth-of-type(odd)": {
				backgroundColor: "#F9EBDC",
			},
		}
);

const ShowRowComponent = ({
	options,
	row,
	handleSelectRow,
	index,
	selectedRow,
	handleAction,
	id,
	onRowMenuSelect,
	onlineStatus = 0,
	handleMenuOptions,
	handleEditMenu,
	handleDeleteMenu,
	userId,
	isUserOnline,
	emailAddress,
	balance,
	isPostpaidUser,
	makeCall,
	fileScope,
	isRowMenuAvialable,
}) => {
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

	const [openDialPad, setOpenDialPad] = useState(false);
	const [currentPhoneNum, setCurrentPhoneNum] = useState("");
	const [allowEdit, setAllowEdit] = useState(false);
	const [allowDelete, setAllowDelete] = useState(false);

	useEffect(() => {
		if (options?.allowEdit) {
			setAllowEdit(true);
		}
		if (options?.allowDelete) {
			setAllowDelete(true);
		}
	}, []);
	const showCreateConversation = (phoneNumber) => {
		setOpenDialPad(true);
		phoneNumber = phoneNumber.replace(/ /g, "");
		setCurrentPhoneNum(phoneNumber);
	};

	const closeCreateConversation = () => {
		setOpenDialPad(false);
	};
	const dispatch = useDispatch();

	const {
		user: { userTimezone },
	} = getAuthData();
	const defaultUserTimezone = "Etc/UTC";

	// const openVideoField = (data) => {
	// 	let dataInfo = {
	// 		videoSessionId: data.videoSessionId,
	// 		callInitiatorUserId: data.userId,
	// 	};

	// 	UserServiceClient.preConnectCallCheck(dataInfo)
	// 		.then((response) => {
	// 			if (!response.success) {
	// 				throw new Error();
	// 			}
	// 			console.log("preConnectCallCheck", response);
	// 			handleCall("pickCall", dataInfo);
	// 		})
	// 		.catch(() => {
	// 			let msg = {
	// 				controlId: data.videoControlId,
	// 				action: "busyLine",
	// 				videoSessionId: data.videoSessionId,
	// 			};
	// 			let responseChat = {};
	// 			responseChat.messageType =
	// 				MessageTypeConstants.MESSAGE_TYPE_VIDEO_CALL_RESPONSE;
	// 			responseChat.message = { ...msg };

	// 			handleCall("busyLine", responseChat);
	// 		});
	// };

	const handleOnAction = (action) => {
		const rowFormatted = {};
		Object.values(row)[0].fields.forEach((item) => {
			rowFormatted[item.id] = item.value;
		});
		row = rowFormatted;
		handleAction(
			action,
			{
				row: rowFormatted,
			},
			null,
			Object.keys(row)[0]
		);
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
	const renderCell = (column) => {
		if (!column || column.hidden) {
			return;
		}
		switch (column.type) {
			case "text_field":
			case "text_area":
			case "radiobutton":
			case "dropdown":
			case "multi_selection":
			case "checkbox":
			case "slider":
			case "number":
			case "lookup":
				if (
					!Object.hasOwnProperty.call(options, "allowQuickAction") ||
					options?.allowQuickAction
				) {
					return column.primaryKey ? (
						<StyledLink
							onClick={() => {
								let objValue = {};
								Object.values(row)[0].fields.map((col) => {
									objValue[col.id] = col.value;
									return col;
								});
								handleAction("quickAction", objValue);
							}}
						>
							{column.type === "lookup" &&
							Object.prototype.toString.call(column.value) === "[object Object]"
								? column.value.text
								: column.value}
						</StyledLink>
					) : column.type === "lookup" &&
					  Object.prototype.toString.call(column.value) ===
							"[object Object]" ? (
						column.value.text
					) : (
						column.value
					);
					// }s
				}
				return column.type === "lookup" &&
					Object.prototype.toString.call(column.value) === "[object Object]"
					? column.value.text
					: column.value;
			case "rich_text_area":
				// No other way to display rich text other than injecting into a div tag
				return column.value ? <Box component={"div"} dangerouslySetInnerHTML={{ __html: `${column.value}` }} /> : "";
			case "switch":
				return column.value ? "Enabled" : "Disabled";
			case "phone_number":
				return (
					<StyledLink
						onClick={() => {
							Object.prototype.toString.call(column.value) === "[object Object]"
								? showCreateConversation(column.value.text)
								: showCreateConversation(column.value);
						}}
					>
						{column.type === "lookup" &&
						Object.prototype.toString.call(column.value) === "[object Object]"
							? column.value.text
							: column.value}
					</StyledLink>
				);
			case "email_field":
				return (
					<StyledLink
						onClick={() => {
							Object.prototype.toString.call(column.value) === "[object Object]"
								? // ? (window.location = `mailto:${column.value.text}`)
								  window.open(`mailto:${column.value.text}`, "_blank")
								: // : (window.location = `mailto:${column.value}`);
								  window.open(`mailto:${column.value}`, "_blank");
						}}
					>
						{column.type === "lookup" &&
						Object.prototype.toString.call(column.value) === "[object Object]"
							? `mail to: ${column.value.text}`
							: `mail to: ${column.value}`}
					</StyledLink>
				);
			case "password_field":
				return "*****";
			case "buttons_field":
				if (column.activeIconUrl && column.inactiveIconUrl) {
					if (!column.activeIconUrl.length) {
						return;
					} else {
						if (column.readOnly) {
							return (
								<a>
									<img src={column.inactiveIconUrl} alt="" height="40px" />
								</a>
							);
						} else {
							return (
								<a onClick={() => handleOnAction("onFieldAction")}>
									<img src={column.activeIconUrl} alt="" height="40px" />
								</a>
							);
						}
					}
				} else {
					if (column.options && column.options.length > 0) {
						return (
							<>
								{column?.options.map((item) => (
									<a
										key={item.label}
										onClick={() => handleOnAction("onFieldAction")}
									>
										<span
											style={{
												color: "rgb(0, 189, 242)",
												textDecoration: "underline",
												cursor: "pointer",
											}}
										>
											{item.label}
										</span>
									</a>
								))}
							</>
						);
					} else {
						return (
							<a onClick={() => handleOnAction("onFieldAction")}>
								<span
									style={{
										color: "rgb(0, 189, 242)",
										textDecoration: "underline",
										cursor: "pointer",
									}}
								>
									{column?.value?.text}
								</span>
							</a>
						);
					}
				}

			case "image_field":
			case "file_field":
				return column.value ? (
					<StyledLink
						onClick={() => {
							downloadFile(column.value, column.fileName);
						}}
					>
						{column.fileName}
					</StyledLink>
				) : null;
			case "date":
				return column.primaryKey &&
					(!Object.hasOwnProperty.call(options, "allowQuickAction") ||
						column.allowQuickAction) ? (
					<StyledLink
						onClick={() => {
							let objValue = {};
							Object.values(row)[0].fields.map((col) => {
								objValue[col.id] = col.value;
								return col;
							});
							handleAction("quickAction", objValue);
						}}
					>
						<StyledSpan>
							{column.value
								? moment(column.value)
										.tz(userTimezone || defaultUserTimezone)
										.format("ll")
								: null}
						</StyledSpan>
					</StyledLink>
				) : (
					<StyledSpan>
						{column.value
							? moment(column.value)
									.tz(userTimezone || defaultUserTimezone)
									.format("ll")
							: null}
					</StyledSpan>
				);
			case "time":
				return column.primaryKey &&
					(!Object.hasOwnProperty.call(options, "allowQuickAction") ||
						column.allowQuickAction) ? (
					<StyledLink
						onClick={() => {
							let objValue = {};
							Object.values(row)[0].fields.map((col) => {
								objValue[col.id] = col.value;
								return col;
							});
							handleAction("quickAction", objValue);
						}}
					>
						{column.value
							? moment(column.value)
									.tz(userTimezone || defaultUserTimezone)
									.format("LT")
							: null}
					</StyledLink>
				) : column.value ? (
					moment(column.value)
						.tz(userTimezone || defaultUserTimezone)
						.format("LT")
				) : null;
			case "datetime":
				return column.primaryKey &&
					(!Object.hasOwnProperty.call(options, "allowQuickAction") ||
						column.allowQuickAction) ? (
					<StyledLink
						onClick={() => {
							let objValue = {};
							Object.values(row)[0].fields.map((col) => {
								objValue[col.id] = col.value;
								return col;
							});
							handleAction("quickAction", objValue);
						}}
					>
						<StyledSpan>
							{column.value
								? moment(column.value)
										.tz(userTimezone || defaultUserTimezone)
										.format("lll")
								: null}
						</StyledSpan>
					</StyledLink>
				) : (
					<StyledSpan>
						{column.value
							? moment(column.value)
									.tz(userTimezone || defaultUserTimezone)
									.format("lll")
							: null}
					</StyledSpan>
				);
			case "alert_field":
				switch (column.value) {
					case 1:
						return (
							<div
								style={{
									boxSizing: "border-box",
									borderRadius: "6px",
									height: " 12px",
									width: "12px",
									backgroundColor: "#2DB757",
								}}
							></div>
						);
					case 2:
						return (
							<span>
								<CachedImage
									imgKey="warningIcon"
									image="/img/Shape@2x.png"
									width="14px"
								/>
							</span>
						);
					case 3:
						return (
							<span>
								<CachedImage
									imgKey="errorIcon"
									image="/img/error-icon@2x.png"
									width="14px"
								/>
							</span>
						);
					default:
						return column.value;
				}
			case "object_multi_selection": {
				let opts = column.options;
				let vals = column.value;
				let dspfldArr = [];

				for (let i = 0; i < vals?.length; i++) {
					let selectedItm = opts?.find((opt) => opt?.value === vals[i]);
					if (selectedItm) {
						i === vals?.length - 1
							? dspfldArr.push(selectedItm?.displayField)
							: dspfldArr.push(selectedItm?.displayField + ", ");
					}
				}
				if (
					!Object.hasOwnProperty.call(options, "allowQuickAction") ||
					options?.allowQuickAction
				) {
					return column.primaryKey ? (
						<StyledLink
							onClick={() => {
								let objValue = {};
								Object.values(row)[0].fields.map((col) => {
									objValue[col.id] = col.value;
									return col;
								});
								handleAction("quickAction", objValue);
							}}
						>
							{dspfldArr}
						</StyledLink>
					) : (
						dspfldArr
					);
				}
				return dspfldArr;
			}
			case "icon_field":
				return (
					<img src={column.value} width="20px" height="20px" alt="field_icon" />
				);
		}
	};

	const downloadFile = (value, fileName) => {
		if (user.isOnline) {
			const url = `${R.prop("filesAPI", Config)}/downloadwithsignedurl/${
				fileScope || "conversation"
			}/${scopeId}/${value}`;

			GenericAjax.downloadSignedUrlFile(url)
				.then((res) => {
					if (res?.signedUrl) {
						GenericAjax.downloadFile(res.signedUrl)
							.then((blob) => {
								var url = window.URL.createObjectURL(blob);
								var a = document.createElement("a");
								a.href = url;
								a.download = fileName;
								document.body.appendChild(a);
								a.click();
								a.remove();
							})
							.catch((error) => {
								console.error("ERROR in getting file from signed url", error);
								dispatch(showSnackbarV2("error", "Failed to download file"));
							});
					}
				})
				.catch((error) => {
					console.error("ERROR in genrate Signed Url", error);
					dispatch(showSnackbarV2("error", "Failed to generate signed url"));
				});
		} else {
			dispatch(
				showSnackbarV2(
					"error",
					"You will be able to download this file once you are back online"
				)
			);
		}
	};
	const rowOptions =
		Object.values(row) &&
		Object.values(row)[0]?.rowOptions &&
		Object.keys(Object.values(row)[0]?.rowOptions).length > 0 &&
		Object.values(row)[0]?.rowOptions?.rowMenu !== null
			? Object.values(row)[0]?.rowOptions?.rowMenu
			: options?.rowMenu;

	const isEdit = rowOptions?.find((i) => i.name.includes("Edit"))?.name;
	const isDelete = rowOptions?.find((i) => i.name.includes("Delete"))?.name;
	const isOtherMenu = rowOptions;
	// &&
	// rowOptions.length &&
	// rowOptions.filter((i) => {
	// 	if (i.name === isEdit) return;
	// 	if (i.name === isDelete) return;
	// 	return i;
	// })?.length > 0;

	const isMainOtherMenu = options?.rowMenu;
	//  &&
	// options?.rowMenu.length &&
	// options?.rowMenu.filter((i) => {
	// 	if (i.name === isEdit) return;
	// 	if (i.name === isDelete) return;
	// 	return i;
	// })?.length > 0;

	const newRowData = Object.values(row) && Object.values(row)[0]?.rowOptions;
	const isNewRow = newRowData?.hasOwnProperty("newRow");
	return (
		<>
			<StyledTableRow isoffline={onlineStatus === 0 ? "true" : "false"}>
				<StyledTableCell padding="none" align="left">
					{onlineStatus === 2 && <StyledSyncIcon />}
				</StyledTableCell>
				{options.selectableRows && (
					<StyledTableCell>
						<Checkbox
							checked={
								!!(
									selectedRow &&
									selectedRow.filter(
										(item) => Object.keys(item)[0] === Object.keys(row)[0]
									).length
								)
							}
							onChange={(e) => {
								handleSelectRow(e, row);
							}}
							color="primary"
						/>
					</StyledTableCell>
				)}
				{(!isNewRow && rowOptions && rowOptions.length) || isMainOtherMenu ? (
					<StyledTableCell size="small">
						<IconButton
							size="small"
							aria-label="settings"
							onClick={onRowMenuSelect}
							aria-describedby={id}
						>
							<MoreVertIcon fontSize="small" />
						</IconButton>
					</StyledTableCell>
				) : !isNewRow &&
				  options?.rowMenu &&
				  options?.rowMenu.length > 0 &&
				  isMainOtherMenu ? (
					<StyledTableCell size="small" />
				) : isRowMenuAvialable ? (
					<StyledTableCell size="small" />
				) : null}
				{options.actionableRows && (
					<StyledTableCell size="small">
						<a
							className="img-top"
							style={{ width: "25px" }}
							onClick={() => handleOnAction("onAction")}
						>
							<img
								style={{ width: "25px" }}
								src="./img/dashboard-icon-hover@2x.png"
								alt="actionableRow"
							/>
						</a>
					</StyledTableCell>
				)}
				{options?.columnNames &&
					Object.entries(options.columnNames)?.map(([k, v], i) => {
						let column = Object.values(row)[0].fields?.find(
							(item) => item.id === k
						);
						return (
							<StyledTableCell key={`${v}-${i}`}>
								{renderCell(column)}
							</StyledTableCell>
						);
					})}
				{Boolean(allowEdit) || Boolean(allowDelete) ? (
					<StyledTableCell size="small">
						<>
							{Boolean(allowEdit) && (
								<IconButton
									size="small"
									aria-label="settings"
									aria-describedby={id}
									// onClick={(e) =>
									// 	isEdit === "Edit"
									// 		? handleEditMenu(e, row)
									// 		: handleMenuOptions(row, isEdit)
									// }
									onClick={(e) => handleEditMenu(e, row)}
									disabled={
										(Object.prototype.hasOwnProperty.call(
											Object.values(row)[0],
											"rowOptions"
										) &&
											Object.prototype.hasOwnProperty.call(
												Object.values(row)[0].rowOptions,
												"allowEdit"
											) &&
											!Object.values(row)[0].rowOptions?.allowDelete) ||
										false
									}
								>
									<EditOutlinedIcon fontSize="small" />
								</IconButton>
							)}
							{Boolean(allowDelete) && (
								<IconButton
									size="small"
									aria-label="settings"
									// onClick={() =>
									// 	isDelete === "Delete"
									// 		? handleDeleteMenu(row)
									// 		: handleMenuOptions(row, isDelete)
									// }
									onClick={() => handleDeleteMenu(row)}
									disabled={
										(Object.prototype.hasOwnProperty.call(
											Object.values(row)[0],
											"rowOptions"
										) &&
											Object.prototype.hasOwnProperty.call(
												Object.values(row)[0].rowOptions,
												"allowDelete"
											) &&
											!Object.values(row)[0].rowOptions?.allowDelete) ||
										false
									}
									aria-describedby={id}
								>
									<DeleteOutlineOutlinedIcon fontSize="small" />
								</IconButton>
							)}
						</>
					</StyledTableCell>
				) : null}
				{/* {isNewRow && !newRowData?.newRow && <StyledTableCell size="small" />} */}
			</StyledTableRow>
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
		</>
	);
};
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
export default connect(mapDataToProps, actions)(ShowRowComponent);
