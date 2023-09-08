import React, { useState, useEffect } from "react";
import cloneDeep from "lodash/cloneDeep";
import isEmpty from "lodash/isEmpty";
import isArray from "lodash/isArray";
import {
	Table,
	TableBody,
	TableContainer,
	Paper,
	Button,
	Popover,
	List,
	ListItem,
	ListItemText,
	Grid,
	Box,
	TableCell,
	TableRow,
} from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import { useSelector, shallowEqual } from "react-redux";

import TableHeadComponent from "./components/TableHeadComponent";
import ShowRowComponent from "./components/ShowRowComponent";
import EditRowComponent from "./components/EditRowComponent";
import { useDispatch } from "react-redux";
import { handleMessageTypeTable, handlePromptOnClose } from "../../../Containers/NonConversational/Store/NonConversationalAction";
import { createUUID } from "../../../../Utils/Helpers";
import {
	getDataFromLFStorage,
	LFStorageKeys,
	saveDataInLFStorage,
} from "../../../../Services/LFStorage";
import { styled } from "@mui/material/styles";
import { Inventory2Outlined } from '@mui/icons-material';

const ButtonStyles = styled(Button)(({ theme }) => ({
	textTransform: "none",
	margin: theme.spacing(2),
	border: "none",
	padding: "7px 45px",
	borderRadius: 20,
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

const TableStyles = styled(Table)(() => ({
	whiteSpace: "nowrap",
	wordBreak: "break-word",
	wordWrap: "break-word",
	"& td:not(:first-of-type)": {
		minWidth: "100px",
	},
}));

export default function FMTableComponent({
	optionsDetails,
	message,
	selectedRow,
	setSelectedRow,
	handleAction,
	handleInlineFormAction,
	handleCall,
	conversationId,
	parentTabId,
	parentDocId,
}) {
	const dispatch = useDispatch();
	const [options, setOptions] = useState(optionsDetails);
	const [rows, setRows] = useState([]);
	const [anchorEl, setAnchorEl] = useState(null);
	const [menuRow, setMenuRow] = useState(null);
	const [isLoadingMore, setIsLoadingMore] = useState(false);
	const [showMandatory, setShowMandatory] = useState(false);
	const [isRowMenuAvialable, setIsRowMenuAvailable] = useState(false);
	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;
	const isOnline = useSelector((state) => state.user.isOnline, shallowEqual);
	useEffect(() => {
		const readOnlyFields = {};
		window.lastMsgFields &&
			window.lastMsgFields.map((field) => (readOnlyFields[field.id] = field));

		if (message) {
			// changing the values based on the message received
			if (window.lastMsgFields && window.lastDocIdChanged) {
				const readOnlyKeys = Object.keys(readOnlyFields);
				message = message.map((ele) => {
					let fields = ele[window.lastDocIdChanged]?.fields;
					if (fields) {
						fields = fields.map((field) => {
							// if the field present in the message change it
							if (readOnlyKeys.includes(field.id)) {
								field.readOnly = readOnlyFields[field.id].readOnly;
							}
							return field;
						});
						ele[window.lastDocIdChanged].fields = fields;
					}
					return ele;
				});
			}
			setRows(message);
			setIsLoadingMore(false);
		}
		if (optionsDetails) {
			let tempOptions = cloneDeep(optionsDetails);
			console.log("tempOptions", tempOptions);
			setOptions(tempOptions);
		}
		return () => {
			if (!optionsDetails?.openDrawer) setRows([]);
		};
	}, [message, optionsDetails]);

	useEffect(() => {
		rows.map((row) => {
			const rowOptions =
				Object.values(row) &&
					Object.values(row)[0]?.rowOptions &&
					Object.keys(Object.values(row)[0]?.rowOptions).length > 0 &&
					Object.values(row)[0]?.rowOptions?.rowMenu !== null
					? Object.values(row)[0]?.rowOptions?.rowMenu
					: options?.rowMenu;
			if (rowOptions?.length) {
				setIsRowMenuAvailable(true);
			}
		});
	}, [rows]);

	const handleClose = () => {
		setAnchorEl(null);
		setMenuRow(null);
	};

	const createNewRow = () => {
		setShowMandatory(true);
		let docId = createUUID();
		const newRow = {
			fields: cloneDeep(options.columnTemplate),
			rowOptions: {
				newRow: true,
			},
		};

		let formMessage = {
			message: {
				update: [...rows, { [docId]: newRow }],
			},
			options: {
				action: "change",
				controlId: optionsDetails.controlId,
				tableId: optionsDetails.tableId,
				tabId: optionsDetails?.parent?.length || optionsDetails.sectionId
					? parentTabId
					: optionsDetails.tabId,
				parentDocId,
				parent: optionsDetails.parent,
				docId,
				sectionId: optionsDetails.sectionId ? optionsDetails.sectionId : null,
			},
		};

		dispatch(handleMessageTypeTable(conversationId, formMessage, true));
		closeRowMenu();
	};

	const handleEditRowMenu = async (e, row, isInputEdited) => {
		if (Object.values(row)[0].rowOptions?.newRow === true) {
			Object.values(row)[0].rowOptions = {
				...Object.values(row)[0].rowOptions,
				editRow: true,
				newRow: true,
			};
		} else {
			Object.values(row)[0].rowOptions = {
				...Object.values(row)[0].rowOptions,
				editRow: true,
			};
		}
		Object.values(row)[0].fields.forEach((fld) => {
			fld.options =
				fld.options && Object.keys(fld.options).length
					? fld.options
					: options.columnTemplate.find((tpl) => fld.id === tpl.id)?.options;
		});
		let formMessage = {
			message: {
				fields: Object.values(row)[0].fields,
			},
			options: {
				action: "change",
				controlId: optionsDetails.controlId,
				tableId: optionsDetails.tableId,
				tabId: optionsDetails?.parent?.length || optionsDetails.sectionId
					? parentTabId
					: optionsDetails.tabId,
				parentDocId,
				parent: optionsDetails.parent,
				docId: Object.keys(row)[0],
				rowOptions: Object.values(row)[0].rowOptions,
				sectionId: optionsDetails.sectionId ? optionsDetails.sectionId : null,
			},
		};
		let tableBuffer =
			(await getDataFromLFStorage(LFStorageKeys.FMTABLE_EDIT_BUFFER)) || [];

		// // check if in cache same row is not present
		if (
			isEmpty(
				tableBuffer.filter(
					(bufRow) => Object.keys(bufRow)[0] === Object.keys(row)[0]
				)
			)
		) {
			tableBuffer.push(row);
			saveDataInLFStorage(LFStorageKeys.FMTABLE_EDIT_BUFFER, tableBuffer);
		}
		dispatch(handleMessageTypeTable(conversationId, formMessage, true, isInputEdited));
		closeRowMenu();
	};

	const handleDeleteRowMenu = (row) => {
		Object.values(row)[0].rowOptions = {
			...Object.values(row)[0].rowOptions,
			deleted: true,
		};
		handleAction(
			"onDelete",
			row,
			null,
			Object.keys(row)[0],
			Object.values(row)?.rowOptions?.newRow
		);
		let updatedRow = rows.filter((item) => {
			if (Object.keys(item)[0] !== Object.keys(row)[0]) {
				return item;
			}
		});

		let formMessage = {
			message: {
				update: updatedRow,
			},
			options: {
				action: "change",
				controlId: optionsDetails.controlId,
				tableId: optionsDetails.tableId,
				tabId: optionsDetails?.parent?.length || optionsDetails.sectionId
					? parentTabId
					: optionsDetails.tabId,
				parentDocId,
				parent: optionsDetails.parent,
				docId: Object.keys(row)[0],
				sectionId: optionsDetails.sectionId ? optionsDetails.sectionId : null,
			},
		};
		dispatch(handleMessageTypeTable(conversationId, formMessage, true));

		closeRowMenu();
		dispatch(handlePromptOnClose(conversationId));
	};

	const handleMenuOptions = (row, menuOption) => {
		setAnchorEl(null);
		let tempRow = {};
		Object.values(row)[0].fields.map((elem) => {
			tempRow[elem.id] = elem.value;
		});
		handleAction(
			"onMenuAction",
			{
				option: menuOption,
				row: tempRow,
			},
			null,
			Object.keys(row)[0]
		);
	};

	const handleSelectRow = (e, row) => {
		if (selectedRow) {
			if (e.target.checked) {
				setSelectedRow([...selectedRow, row]);
			} else {
				let tempRow = selectedRow.filter(
					(item) => Object.keys(item)[0] !== Object.keys(row)[0]
				);
				setSelectedRow(tempRow);
			}
		} else {
			setSelectedRow([row]);
		}
	};

	const handleSelectAllRows = (e) => {
		if (e.target.checked) {
			setSelectedRow(rows);
		} else {
			setSelectedRow(null);
		}
	};

	const onAddRowConfirm = async (row) => {
		// Remove record from LFStorage
		setShowMandatory(false);
		let tableBuffer =
			(await getDataFromLFStorage(LFStorageKeys.FMTABLE_EDIT_BUFFER)) || [];
		if (!isEmpty(tableBuffer)) {
			let newTableBuffer = tableBuffer.filter(
				(item) => Object.keys(item)[0] !== Object.keys(row)[0]
			);
			saveDataInLFStorage(LFStorageKeys.FMTABLE_EDIT_BUFFER, newTableBuffer);
		}
		let newlyAddedRow;
		if (Object.values(row)[0].rowOptions?.newRow === true) {
			newlyAddedRow = true;
		}

		Object.values(row)[0].rowOptions = {
			...Object.values(row)[0].rowOptions,
			editRow: false,
			newRow: false,
		};
		let formMessage = {
			message: {
				fields: [row],
			},
			options: {
				action: "change",
				newRow: newlyAddedRow,
				controlId: optionsDetails.controlId,
				tableId: optionsDetails.tableId,
				tabId: optionsDetails?.parent?.length || optionsDetails.sectionId
					? parentTabId
					: optionsDetails.tabId,
				parentDocId,
				parent: optionsDetails.parent,
				sectionId: optionsDetails.sectionId ? optionsDetails.sectionId : null,
			},
		};
		!newlyAddedRow && delete formMessage.options.newRow;
		handleInlineFormAction(
			"onSave",
			Object.keys(row)[0],
			null,
			Object.values(row)[0].fields,
			newlyAddedRow
		);
		dispatch(handleMessageTypeTable(conversationId, formMessage, true));
		setTimeout(() => { dispatch(handlePromptOnClose(conversationId)); }, 2000)
	};

	const onDiscardRow = async (row) => {
		setShowMandatory(false);
		let newlyAddedRow;
		if (Object.values(row)[0].rowOptions?.newRow === true) {
			newlyAddedRow = true;
		}

		if (Object.values(row)[0].rowOptions?.newRow) {
			let filterRows = rows.filter(
				(item) => Object.keys(item)[0] !== Object.keys(row)[0]
			);
			let formMessage = {
				message: {
					update: filterRows,
				},
				options: {
					action: "change",
					newRow: newlyAddedRow,
					controlId: optionsDetails.controlId,
					tableId: optionsDetails.tableId,
					tabId: optionsDetails?.parent?.length || optionsDetails.sectionId
						? parentTabId
						: optionsDetails.tabId,
					parentDocId,
					parent: optionsDetails.parent,
					sectionId: optionsDetails.sectionId ? optionsDetails.sectionId : null,
				},
			};
			!newlyAddedRow && delete formMessage.options.newRow;
			handleInlineFormAction(
				"onDiscard",
				Object.keys(row)[0],
				null,
				row,
				newlyAddedRow
			);
			dispatch(handleMessageTypeTable(conversationId, formMessage, true));
			setTimeout(() => { dispatch(handlePromptOnClose(conversationId)); }, 2000);
		} else {


			let tableBuffer =
				(await getDataFromLFStorage(LFStorageKeys.FMTABLE_EDIT_BUFFER)) || [];
			let oldRow = null;
			if (!isEmpty(tableBuffer)) {
				let newTableBuffer = tableBuffer.filter(
					(item) => Object.keys(item)[0] !== Object.keys(row)[0]
				);
				oldRow = tableBuffer.filter(
					(item) => Object.keys(item)[0] === Object.keys(row)[0]
				)[0];
				saveDataInLFStorage(LFStorageKeys.FMTABLE_EDIT_BUFFER, newTableBuffer);
			}
			let updatedRow = cloneDeep(row);

			let formMessage = {
				message: {
					fields: Object.values(updatedRow)[0].fields,
				},
				options: {
					action: "change",
					newRow: newlyAddedRow,
					controlId: optionsDetails.controlId,
					tableId: optionsDetails.tableId,
					tabId: optionsDetails?.parent?.length || optionsDetails.sectionId
						? parentTabId
						: optionsDetails.tabId,
					parentDocId,
					parent: optionsDetails.parent,
					docId: Object.keys(row)[0],
					sectionId: optionsDetails.sectionId ? optionsDetails.sectionId : null,
					rowOptions: {
						...Object.values(updatedRow)[0].rowOptions,
						editRow: false,
					},
				},
			};
			!newlyAddedRow && delete formMessage.options.newRow;
			handleInlineFormAction(
				"onDiscard",
				Object.keys(updatedRow)[0],
				null,
				updatedRow,
				newlyAddedRow
			);

			dispatch(handleMessageTypeTable(conversationId, formMessage, true));
			setTimeout(() => { dispatch(handlePromptOnClose(conversationId)); }, 2000);
		}
	};

	const handleRowMenuSelect = (row) => (e) => {
		setMenuRow(row);
		setAnchorEl(e.currentTarget);
	};

	const closeRowMenu = () => {
		setAnchorEl(null);
	};



	const getZeroState = (message) => {
		const styleObj = {
			fontSize: "14px",
			fontWeight: "bold",
			textAlign: "center",
			color: "#98b0c8"
		}
		return (<TableRow>
			<TableCell colSpan={20}>
				<Box className="flex-column center-items justify-conetnt-center mt-50 mb-50">
					<Inventory2Outlined style={{ color: "#98b0c8", width: "40px", height: "40px" }} />
					<Box style={{ ...styleObj }}>{message}</Box>
				</Box>
			</TableCell>
		</TableRow>

		)
	}

	if (options) {
		if (isArray(message[0])) {
			return (
				<Paper>
					<h3>
						You are using deprecated version of the table. Please contact team
						to make require changes.
					</h3>
				</Paper>
			);
		}

		const rowSpecificRowMenu =
			menuRow != null
				? menuRow[Object.keys(menuRow)[0]]?.rowOptions?.rowMenu
				: null;
		const tableSpecificRowMenu = options?.rowMenu;
		const selectedRowMenu = rowSpecificRowMenu || tableSpecificRowMenu;
		return (
			<div>
				{/* ========TABLE=========== */}
				<TableContainer>
					<TableStyles stickyHeader>
						<TableHeadComponent
							options={options}
							isRowMenuAvialable={isRowMenuAvialable}
							selectedRow={selectedRow}
							rows={rows}
							handleSelectAllRows={handleSelectAllRows}
							showMandatory={showMandatory}
						/>
						<TableBody>
							{/* Zerostate */}
							{options?.emptyStateMessage && options.emptyStateMessage != "" && rows.length == 0 && getZeroState(options.emptyStateMessage)}
							{/* Rows */}
							{Array.isArray(rows) &&
								rows
									?.filter((row, index) => {
										return !Object.values(row)[0]?.rowOptions?.deleted;
									})
									.map((row, index) => {
										let onlineStatus = 0;
										Object.values(row)[0]?.fields?.forEach((col) => {
											if (col.primaryKey) {
												onlineStatus = col.onlineStatus;
											}
										});
										if (
											Object.values(row)[0].rowOptions?.editRow ||
											Object.values(row)[0].rowOptions?.newRow
										) {
											return (
												<EditRowComponent
													onlineStatus={onlineStatus}
													row={row}
													onRowInputChange={handleEditRowMenu}
													options={options}
													handleSelectRow={handleSelectRow}
													key={index}
													selectedRow={selectedRow}
													handleAction={handleAction}
													handleInlineFormAction={handleInlineFormAction}
													id={id}
													onConfirm={onAddRowConfirm}
													onDiscard={onDiscardRow}
												/>
											);
										}
										return (
											<ShowRowComponent
												key={index}
												isRowMenuAvialable={isRowMenuAvialable}
												index={index}
												onlineStatus={onlineStatus}
												options={options}
												row={row}
												handleCall={handleCall}
												setMenuRow={setMenuRow}
												setAnchorEl={setAnchorEl}
												handleSelectRow={handleSelectRow}
												onRowMenuSelect={handleRowMenuSelect(row)}
												selectedRow={selectedRow}
												handleAction={handleAction}
												id={id}
												handleMenuOptions={(par1, par2) =>
													handleMenuOptions(par1, par2)
												}
												handleEditMenu={(par1, par2) =>
													handleEditRowMenu(par1, par2)
												}
												handleDeleteMenu={(par1) => handleDeleteRowMenu(par1)}
											/>
										);
									})}
						</TableBody>
					</TableStyles>

					{/* ==========LOAD MORE PAGINATION===========*/}
					{options.pages && !isEmpty(options.pages) && options.pages.next ? (
						<Grid
							container
							direction="row"
							justifyContent="center"
							alignItems="center"
						>
							<Grid item>
								<ButtonStyles
									startIcon={isLoadingMore && <CachedIcon />}
									variant="outlined"
									color="primary"
									disabled={isLoadingMore}
									onClick={() => {
										setIsLoadingMore(true);
										handleAction("nextPage");
									}}
									sx={{ marginBottom: "5px" }}
								>
									{isLoadingMore ? "Loading..." : "Load More"}
								</ButtonStyles>
							</Grid>
						</Grid>
					) : null}
				</TableContainer>

				{/* ==========FOOTER ===========*/}
				<Grid container>
					<Grid item xs={12}>
						{options?.addNewRows && (
							<ButtonStyles variant="contained" onClick={() => createNewRow()}>
								{options?.addNewRowsLabel || "Add new vessel to this fleet"}
							</ButtonStyles>
						)}
					</Grid>
				</Grid>

				{/* ========MENU ROW POPOVER====== */}
				{menuRow && (
					<Popover
						id={id}
						open={open}
						anchorEl={anchorEl}
						onClose={handleClose}
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "left",
						}}
					>
						<List dense>
							{selectedRowMenu &&
								selectedRowMenu.map((menu, index) => {
									// if (
									// 	menu.name.includes("Edit") ||
									// 	menu.name.includes("Delete")
									// ) {
									// 	return null;
									// }
									// if (menu.name === "Edit") {
									// 	return (
									// 		<ListItem
									// 			key={index}
									// 			button
									// 			disabled={
									// 				(Object.prototype.hasOwnProperty.call(
									// 					Object.values(menuRow)[0],
									// 					"rowOptions"
									// 				) &&
									// 					Object.prototype.hasOwnProperty.call(
									// 						Object.values(menuRow)[0].rowOptions,
									// 						"allowEdit"
									// 					) &&
									// 					!Object.values(menuRow)[0].rowOptions?.allowEdit) ||
									// 				false
									// 			}
									// 			onClick={(e) => handleEditRowMenu(e, menuRow)}
									// 		>
									// 			<ListItemText primary="Edit" />
									// 		</ListItem>
									// 	);
									// }
									// if (menu.name === "Delete") {
									// 	var isOffline = !isOnline;
									// 	var allowDeleteWhileOffline =
									// 		optionsDetails.allowDeleteWhileOffline;
									// 	var canDeleteWhileOffline =
									// 		isOffline && allowDeleteWhileOffline;
									// 	if (isOffline) {
									// 		return (
									// 			<ListItem
									// 				key={index}
									// 				button
									// 				disabled={
									// 					!canDeleteWhileOffline ||
									// 					(Object.prototype.hasOwnProperty.call(
									// 						Object.values(menuRow)[0],
									// 						"rowOptions"
									// 					) &&
									// 						Object.prototype.hasOwnProperty.call(
									// 							Object.values(menuRow)[0].rowOptions,
									// 							"allowDelete"
									// 						) &&
									// 						!Object.values(menuRow)[0].rowOptions
									// 							?.allowDelete) ||
									// 					false
									// 				}
									// 				onClick={() => handleDeleteRowMenu(menuRow)}
									// 			>
									// 				<ListItemText primary="Delete" />
									// 			</ListItem>
									// 		);
									// 	} else {
									// 		return (
									// 			<ListItem
									// 				key={index}
									// 				button
									// 				disabled={
									// 					(Object.prototype.hasOwnProperty.call(
									// 						Object.values(menuRow)[0],
									// 						"rowOptions"
									// 					) &&
									// 						Object.prototype.hasOwnProperty.call(
									// 							Object.values(menuRow)[0].rowOptions,
									// 							"allowDelete"
									// 						) &&
									// 						!Object.values(menuRow)[0].rowOptions
									// 							?.allowDelete) ||
									// 					false
									// 				}
									// 				onClick={() => handleDeleteRowMenu(menuRow)}
									// 			>
									// 				<ListItemText primary="Delete" />
									// 			</ListItem>
									// 		);
									// 	}
									// }
									return (
										<ListItem
											key={menu.name}
											button
											onClick={() => handleMenuOptions(menuRow, menu.name)}
										>
											<ListItemText primary={menu.name} />
										</ListItem>
									);
								})}
						</List>
					</Popover>
				)}
			</div>
		);
	}
	return null;
}
