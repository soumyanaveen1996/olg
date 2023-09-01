import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListSubheader from "@mui/material/ListSubheader";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import { MessageTypeConstants } from "../../../Services/Message";
import { sendAMessage } from "../../../State/actions/chats";
import {
	renderNonconversationalFilter,
	renderNonconversationalFilterFlags,
} from "../../Store/NonConversationalFilter/NonConversationalFilterAction";
import store from "../../../State/configureStore";
import FMFilterFieldsComponent from "./FMFilterFieldsComponent";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import MuiDialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { getAuthData } from "../../../Services/StorageService";
import InputAdornment from "@mui/material/InputAdornment";
import EditIcon from "@mui/icons-material/EditOutlined";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { styled } from "@mui/material";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";

const CustomizedTypography = styled(Typography)({
	fontWeight: "bold",
});

const CustomizedCloseIcon = styled(CloseIcon)(({ theme }) => ({
	color: theme.palette.grey[500],
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

const CustomizedParameterButton = styled(Button)({
	textTransform: "none",
	borderRadius: 20,
	padding: "6px 25px",
	backgroundColor: "#638dff",
	color: "#FFFFFF",
	fontFamily: "SF Pro Text Bold",
	fontSize: 14,
	boxShadow: "none",
	width: "47%",
	// height: "30%",
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
});
const CustomizedGrid = styled(Grid)({
	backgroundColor: "#f4f7fb",
	// border: "1px solid #e8e8e8",
	borderRadius: "10px",
	padding: "15px",
});

const CustomizedInnerGrid = styled(Grid)({
	display: "inline-flex",
});
const CustomizedSaveFilterGrid = styled("div")({
	display: "flex",
	flexDirection: "row",
	width: "100%",
	justifyContent: "space-between",
});

const CustomizedParamTextGrid = styled(Grid)({
	textAlign: "center",
	marginBottom: 10,
	color: "#645622",
});
const CustomizedTextField = styled(TextField)({
	"& div": {
		backgroundColor: "white",
		borderRadius: "8px",
		border: "none",
		height: "50px",
	},
	// border: "1px #c4d8ff solid",
	// borderRadius: "8px",
});
const CustomizedSaveButton = styled(MainButton)({
	margin: 3,
	marginLeft: 10,
	height: "fit-content",
	alignSelf: "center",
	padding: "7px 22px",
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
});

const DialogTitle = (props) => {
	const { children, onClose, ...other } = props;
	return (
		<MuiDialogTitle
			sx={(theme) => ({
				margin: 0,
			})}
			disableTypography
			{...other}
		>
			<Typography variant="h6">{children}</Typography>
			{onClose ? (
				<IconButton
					sx={(theme) => ({
						position: "absolute",
						right: theme.spacing(0),
						color: theme.palette.grey[500],
						zIndex: 1,
						top: "10px",
						paddingTop: "5px",
					})}
					aria-label="close"
					onClick={onClose}
					size="large"
				>
					<CustomizedCloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	);
};

const DialogContentStyle = styled(DialogContent)(() => ({
	padding: "20px 24px !important",
}));

const DialogActionsStyle = styled(DialogActions)(() => ({
	padding: "20px 24px !important",
}));

function FMFilterFormComponent({ conversation }) {
	const dispatch = useDispatch();
	const state = store.getState();
	const NonConversationalFilter = state.v2.NonConversationalFilter;

	const [filterName, setFilterName] = useState(
		NonConversationalFilter.activeFilterName || ""
	);
	const [editFilter, setEditFilter] = useState(false);
	const [newFilterDialog, setNewFilterDialog] = useState(false);
	const [newFilterName, setNewFilterName] = useState("");
	const [avaiableFilterNames] = useState(
		NonConversationalFilter.availableFilters?.map((filter) => filter.name)
	);
	const [newFilterErrorMessage, setNewFilterErrorMessage] = useState(null);
	const [renameFilterNameErrorMsg, setRenameFilterNameErrorMsg] =
		useState(null);

	const handleFilterNameChange = (e) => {
		setFilterName(e.target.value);
		if (avaiableFilterNames.includes(e.target.value)) {
			setRenameFilterNameErrorMsg("Filter name already been used.");
		} else {
			setRenameFilterNameErrorMsg(null);
		}
	};

	const {
		user: { userTimezone },
	} = getAuthData();
	const defaultUserTimezone = "Etc/UTC";

	const handleFormAction = useCallback(
		(action, currentField = null, currentFieldValue = null) => {
			let responseChat = {};
			responseChat.messageType =
				MessageTypeConstants.MESSAGE_TYPE_TABLE_RESPONSE;
			responseChat.message = {
				controlId: NonConversationalFilter.controlId,
				tabId: NonConversationalFilter.parent
					? NonConversationalFilter.parentTabId
					: NonConversationalFilter.tabId,
				action,
				currentField,
				content: { currentFieldValue: currentFieldValue },
				tz: userTimezone || defaultUserTimezone,
			};
			if (action !== "click") {
				responseChat.options = NonConversationalFilter || {};
			}
			dispatch(sendAMessage(responseChat, true));
		},
		[dispatch, sendAMessage]
	);

	const updateRedux = useCallback(
		(field) => {
			let formMessage = {
				message: [],
				options: {
					action: "changeFilter",
					controlId: NonConversationalFilter.controlId,
					formId: NonConversationalFilter.formId,
					tabId: NonConversationalFilter.parent
						? NonConversationalFilter.parentTabId
						: NonConversationalFilter.tabId,
					parent: NonConversationalFilter.parent,
					filteredColumns: {
						update: [field],
					},
				},
			};
			dispatch(
				renderNonconversationalFilter(
					formMessage,
					store.getState().v2.NonConversationalFilter.filteredColumns
				)
			);
		},
		[dispatch, renderNonconversationalFilter]
	);

	const handleAction = useCallback(
		(action, activeFilterName, filteredColumns = null) => {
			let responseChat = {};
			responseChat.messageType =
				MessageTypeConstants.MESSAGE_TYPE_TABLE_RESPONSE;
			responseChat.message = {
				controlId: NonConversationalFilter.controlId,
				tabId: NonConversationalFilter.parent
					? NonConversationalFilter.parentTabId
					: NonConversationalFilter.tabId,
				action: action,
				tz: userTimezone || defaultUserTimezone,
				content: {
					activeFilterName,
				},
			};
			if (filteredColumns !== null) {
				responseChat.message.content.field =
					store.getState().v2.NonConversationalFilter.filteredColumns;
			}
			responseChat.options = NonConversationalFilter || {};
			dispatch(sendAMessage(responseChat, true));
		},
		[]
	);

	const updateReduxFlags = useCallback((localFilterFlag) => {
		dispatch(
			renderNonconversationalFilterFlags({
				...NonConversationalFilter,
				...localFilterFlag,
			})
		);
	}, []);

	const saveFilter = () => {
		let responseChat = {};
		responseChat.messageType = MessageTypeConstants.MESSAGE_TYPE_TABLE_RESPONSE;
		responseChat.message = {
			controlId: NonConversationalFilter.controlId,
			tabId: NonConversationalFilter.parent
				? NonConversationalFilter.parentTabId
				: NonConversationalFilter.tabId,
			action: "renameFilter",
			tz: userTimezone || defaultUserTimezone,
			content: {
				activeFilterName: NonConversationalFilter.activeFilterName || "",
				newFilterName: filterName,
			},
		};

		responseChat.options = NonConversationalFilter || {};
		dispatch(sendAMessage(responseChat, true));
		setEditFilter(false);
		dispatch(
			renderNonconversationalFilterFlags({
				...NonConversationalFilter,
				activeFilterName: filterName,
			})
		);
	};

	const handleNewFilterCreation = () => {
		setNewFilterDialog(false);
		handleAction(
			"filter",
			newFilterName,
			store.getState().v2.NonConversationalFilter.filteredColumns
		);
		setNewFilterName("");
		updateReduxFlags({
			openDrawer: false,
		});
	};

	const handleNewFilterNameChange = (e) => {
		setNewFilterName(e.target.value);
		if (avaiableFilterNames.includes(e.target.value)) {
			setNewFilterErrorMessage("Filter name already been used.");
		} else {
			setNewFilterErrorMessage(null);
		}
	};

	const closeNewFilterDialog = () => {
		setNewFilterDialog(false);
		setNewFilterName("");
		setNewFilterErrorMessage(null);
	};

	return (
		<>
			<DialogTitle
				id="customized-dialog-title"
				onClose={() => {
					handleAction(
						"filter",
						NonConversationalFilter.activeFilterName,
						NonConversationalFilter.filteredColumns
					);
					updateReduxFlags({
						openDrawer: false,
					});
				}}
			/>
			<DialogContent
				sx={(theme) => ({
					padding: theme.spacing(2),
				})}
			>
				<div role="presentation" style={{ borderRadius: "10px" }}>
					<List subheader={<ListSubheader></ListSubheader>}>
						<CustomizedTypography variant="h5" gutterBottom>
							{NonConversationalFilter && NonConversationalFilter?.isNewFilter
								? "Create new filter"
								: "Filter"}
						</CustomizedTypography>
						<CustomizedGrid container>
							<CustomizedInnerGrid item xs={12}>
								<CustomizedTextField
									fullWidth
									disabled={!editFilter}
									value={filterName}
									placeholder="Filter Name"
									// label="Filter Name"
									// variant="outlined"
									onChange={handleFilterNameChange}
									error={renameFilterNameErrorMsg !== null}
									helperText={renameFilterNameErrorMsg}
									style={{ border: "1px solid #c4d8ff", borderRadius: "10px" }}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												{!editFilter ? (
													<IconButton
														aria-label="edit filter name"
														onClick={() => setEditFilter(true)}
														size="large"
													>
														<BorderColorOutlinedIcon
															style={{ color: "#638dff" }}
														/>
													</IconButton>
												) : (
													<IconButton
														aria-label="edit filter name"
														onClick={() => {
															setEditFilter(false);
															setFilterName(
																NonConversationalFilter.activeFilterName || ""
															);
															setRenameFilterNameErrorMsg(null);
														}}
														size="large"
													>
														<CustomizedCloseIcon />
													</IconButton>
												)}
											</InputAdornment>
										),
									}}
								/>
								{editFilter && (
									<CustomizedSaveButton
										size="small"
										onClick={saveFilter}
										disabled={renameFilterNameErrorMsg !== null}
									>
										Save
									</CustomizedSaveButton>
								)}
							</CustomizedInnerGrid>
						</CustomizedGrid>
						<CustomizedTypography
							variant="h6"
							gutterBottom
							style={{ marginTop: "15px" }}
						>
							{"Parameters"}
						</CustomizedTypography>
						<ListItem>
							<FMFilterFieldsComponent
								conversation={conversation}
								handleAction={handleFormAction}
								updateRedux={updateRedux}
								showLargeScreen={false}
							/>
						</ListItem>
						<ListItem>
							{false && (
								<CustomizedParamTextGrid item xs={12}>
									Some parameters have changed.
								</CustomizedParamTextGrid>
							)}
							<CustomizedSaveFilterGrid>
								<CustomizedParameterButton
									// startIcon={<CheckIcon />}
									onClick={() => {
										setNewFilterDialog(true);
									}}
									style={{
										backgroundColor: "#e0e8ff",
										color: "#638dff",
										height: "5px",
										padding: "18px 8px",
									}}
								>
									Save as new filter
								</CustomizedParameterButton>
								<CustomizedParameterButton
									// startIcon={<CheckIcon />}
									onClick={() => {
										handleAction(
											"filter",
											NonConversationalFilter.activeFilterName,
											NonConversationalFilter.filteredColumns
										);
										updateReduxFlags({
											openDrawer: false,
										});
									}}
									color="primary"
									disabled={renameFilterNameErrorMsg !== null}
									style={{
										height: "5px",
										padding: "18px 8px",
									}}
								>
									Save and apply filter
								</CustomizedParameterButton>
							</CustomizedSaveFilterGrid>
						</ListItem>
					</List>
				</div>
			</DialogContent>
			<Dialog
				fullWidth={true}
				maxWidth="sm"
				open={newFilterDialog}
				onClose={closeNewFilterDialog}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">Save as new filter</DialogTitle>
				<DialogContentStyle>
					<TextField
						autoFocus
						id="name"
						label="New Filter Name"
						fullWidth
						variant="outlined"
						value={newFilterName}
						onChange={handleNewFilterNameChange}
						error={newFilterErrorMessage !== null}
						helperText={newFilterErrorMessage}
					/>
				</DialogContentStyle>
				<DialogActionsStyle>
					<CancelButton
						variant="outlined"
						color="secondary"
						onClick={closeNewFilterDialog}
					>
						Cancel
					</CancelButton>
					<ConfirmButton
						variant="outlined"
						onClick={handleNewFilterCreation}
						color="primary"
						disabled={newFilterErrorMessage !== null}
					>
						Create
					</ConfirmButton>
				</DialogActionsStyle>
			</Dialog>
		</>
	);
}

export default React.memo(FMFilterFormComponent);
