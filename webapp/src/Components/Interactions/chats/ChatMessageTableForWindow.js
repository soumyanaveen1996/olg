/* eslint-disable react/no-unsafe */
import React, { PureComponent } from "react";
import _ from "lodash";
import { Label } from "reactstrap";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { hideModal, showModal } from "../../../State/actions/modal";
import DiallerPadButton from "../../Telephony/DiallerPadButton";
import { doE164, getCallMode } from "../../Telephony/Utils";
import { connect } from "react-redux";
import {
	sendAMessage,
	setFormInWindow,
	setChatFieldWindow,
	setScrollPositionForConversation,
	fetchArchivedMessages,
	removeRing,
	removeChatFieldWindow,
} from "../../../State/actions/chats";
import { MessageTypeConstants } from "../../../Services/Message";
import {
	Tooltip,
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from "reactstrap";
import {
	sendMessage,
	getOutgoingMessageRequest,
} from "../../../Services/InteractionsService";
import UserServiceClient from "../../../Services/Clients/UserServiceClient";
import AudioElement from "../../../Utils/AudioElement";
import CallButton from "../../Telephony/CallButton";
import Spinner from "react-spinkit";
import {
	getFileName,
	getFileUrl,
	getFileUsingUrl,
} from "../../../Services/FilesService";
import FileServiceClient from "../../../Services/Clients/FileServiceClient";

const R = require("ramda");
let refreshIntervalId;
class ChatMessageTableForWindow extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			chat: {},
			newRowsValue: null,
			more: false,
			rows: [],
			searchText: "",
			rowsBackup: [],
			columnNames:
				this.props.chat && this.props.chat.options
					? [...this.props.chat.options.columnNames]
					: Object.keys(this.props.chat.message[0]),
			showErrorMsgToolTipArr: [],
			activeId: null,
			editableIndex: null,
			rowToEdit: {},
			setRingTone: null,
			showSpinner: false,
			uploading: false,
			imgFileName: null,
			fileName: null,
			imgPath: null,
			// playAudioState: null,
			// stopAudioState: null,
		};
	}

	componentDidMount() {
		let newRows = R.clone(this.props.chat.message);
		let newRowsBackup = R.clone(this.props.chat.message);
		let tempChat = R.clone(this.props.chat);
		let { options } = tempChat;
		newRows = newRows.map((row) => {
			if (_.isObject(row)) {
				row.btnDropright = false;
			}
			return row;
		});
		let newRowMenu = options.rowMenu ? [...options.rowMenu] : [];

		if (options.allowChange) {
			newRowMenu = [...newRowMenu, { name: "Edit", type: "flag" }];
		}
		if (options.allowDelete) {
			newRowMenu = [...newRowMenu, { name: "Delete", type: "flag" }];
		}

		// newRowMenu = _.uniqBy(newRowMenu, "name");
		options["rowMenu"] = newRowMenu;

		if (options.rowMenu.length === 0) {
			options.rowMenu = null;
		}

		this.setState({
			rows: newRows,
			rowsBackup: newRowsBackup,
			chat: tempChat,
			setRingTone: this.props.setRingTone || false,
		});
		if (typeof this.props.showRefreshFromContainer !== "undefined") {
			if (this.props.toggleRefresh) {
				this.props.toggleRefresh(
					this.props.chat.options.allowRefresh,
					this.props.chat.options.controlId,
					MessageTypeConstants.MESSAGE_TYPE_TABLE_RESPONSE
				);
			}
		}
		if (typeof this.props.showConfirmFromContainer !== "undefined") {
			if (this.props.toggleConfirm) {
				this.props.toggleConfirm(
					this.props.chat.options.confirmAction,
					this.props.chat.options.controlId,
					MessageTypeConstants.MESSAGE_TYPE_TABLE_RESPONSE
				);
			}
		}
		if (typeof this.props.showDownloadFromContainer !== "undefined") {
			if (this.props.toggleDownload) {
				this.props.toggleDownload(
					this.props.chat.options.allowDownload,
					this.props.chat.options.controlId,
					MessageTypeConstants.MESSAGE_TYPE_TABLE_RESPONSE
				);
			}
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.setRingTone !== prevProps.setRingTone) {
			if (this.props.setRingTone) {
				console.log("it should ring");

				refreshIntervalId = setInterval(() => {
					AudioElement.playRing();
				}, 5000);
			} else {
				console.log("stop ringing", refreshIntervalId);
				clearInterval(refreshIntervalId);
				AudioElement.pauseRing();
			}
		}

		let rowsArray = _.cloneDeep(prevState.rowsBackup);

		if (this.props?.comingFrom === "container") {
			rowsArray = _.cloneDeep(prevState.rows);
		}

		if (
			this.props.chat.message &&
			rowsArray &&
			!_.isEqual(this.props.chat.message, rowsArray)
		) {
			let newRowsData = _.cloneDeep(this.props.chat.message);
			this.setState({
				showSpinner: false,
				rows: [...newRowsData],
			});
		}

		// if (this.props?.comingFrom === "container") {
		//   if (
		//     this.props.chat.message &&
		//     prevState.rows &&
		//     !_.isEqual(this.props.chat.message, prevState.rows)
		//   ) {
		//     let newRowsData = _.cloneDeep(this.props.chat.message);
		//     this.setState({
		//       rows: [...newRowsData],
		//     });
		//   }
		// } else {
		//   if (
		//     this.props.chat.message &&
		//     prevState.rowsBackup &&
		//     !_.isEqual(this.props.chat.message, prevState.rowsBackup)
		//   ) {
		//     let newRowsData = _.cloneDeep(this.props.chat.message);
		//     this.setState({
		//       rows: [...newRowsData],
		//     });
		//   }
		// }

		if (
			this.props.chat &&
			prevProps.chat &&
			!_.isEqual(this.props.chat, prevProps.chat)
		) {
			// console.log("table changes chat ");
			let newChatData = _.cloneDeep(this.props.chat);
			let { options } = newChatData;
			let newRowMenu = options.rowMenu ? [...options.rowMenu] : [];

			if (options.allowChange) {
				newRowMenu = [...newRowMenu, { name: "Edit", type: "flag" }];
			}
			if (options.allowDelete) {
				newRowMenu = [...newRowMenu, { name: "Delete", type: "flag" }];
			}

			// newRowMenu = _.uniqBy(newRowMenu, "name");
			options["rowMenu"] = newRowMenu;

			if (options.rowMenu.length === 0) {
				options.rowMenu = null;
			}
			this.setState({
				showSpinner: false,
				chat: { ...newChatData },
				rows: newChatData.message,
				columnNames: newChatData.options.columnNames,
			});
		}
	}

	static playAudio() {
		if (this.state && this.state.setRingTone) {
			console.log("play ringtone");
			refreshIntervalId = setInterval(() => {
				AudioElement.playRing();
			}, 5000);
			return;
		}
	}

	static stopAudio() {
		AudioElement.pauseRing();
		return;
	}

	toggle = (tableErrorIconId) => {
		const clonedShowErrorMsgToolTip = Object.assign(
			[],
			this.state.showErrorMsgToolTipArr
		);
		clonedShowErrorMsgToolTip[tableErrorIconId] =
			!clonedShowErrorMsgToolTip[tableErrorIconId];
		this.setState({
			showErrorMsgToolTipArr: clonedShowErrorMsgToolTip,
		});
	};

	toggleClass = (index) => {
		const isMobile = window.innerWidth <= 600;
		isMobile && this.setState({ activeId: index });
	};

	checkingColumn = (data, inx) => {
		// console.log("checking column ");

		let { rows } = this.state;
		let { chat, sendAMessage } = this.props;
		let option = chat.options;
		let objValue = {};

		rows.forEach((elem, indx) => {
			if (indx === inx) {
				if (elem.checkboxSelected) {
					elem.checkboxSelected = false;
				} else {
					elem.checkboxSelected = true;
				}
			} else {
				elem.checkboxSelected = false;
			}
		});

		this.setState({ rows: [...rows] });

		option.keys.forEach((elem) => {
			objValue[elem] = data[elem];
		});

		let responseChat = {};
		responseChat.messageType = MessageTypeConstants.MESSAGE_TYPE_TABLE_RESPONSE;
		responseChat.message = {
			tableId: option.tableId,
			action: "onSelection",
			content: { ...objValue },
		};
		sendAMessage(responseChat, true);
	};

	actionRow = (data, inx) => {
		let { rows } = this.state;
		let { chat, sendAMessage } = this.props;
		let option = chat.options;
		let objValue = {};

		rows.forEach((elem, indx) => {
			if (indx === inx) {
				if (elem.actionSelected) {
					elem.actionSelected = false;
				} else {
					elem.actionSelected = true;
				}
			} else {
				elem.actionSelected = false;
			}
		});

		this.setState({ rows: [...rows] });

		option.keys.forEach((elem) => {
			objValue[elem] = data[elem];
		});

		let responseChat = {};
		responseChat.messageType = MessageTypeConstants.MESSAGE_TYPE_TABLE_RESPONSE;
		responseChat.message = {
			tableId: option.tableId,
			action: "onAction",
			content: { ...objValue },
		};
		sendAMessage(responseChat, true);
		if (
			this.props.chat &&
			this.props.chat.options &&
			this.props.chat.options.minimizeOnAction
		) {
			this.props.makeTheTableMinimize(this.props.componentIndex);
		}
	};

	onFieldAction = (rowData, columnData, index) => {
		// console.log("onfieldAction", rowData.chatField);

		let { chat, sendAMessage } = this.props;
		let option = chat.options;
		let keys = option.keys;

		let rowColumnArr = [];
		// Object.keys(rowData).map(key => {
		//   rowColumnArr.push(rowData[key]);
		// });

		keys.forEach((elem) => {
			rowColumnArr.push(rowData[elem]);
		});

		let responseChatMessage = {};

		responseChatMessage.messageType =
			MessageTypeConstants.MESSAGE_TYPE_TABLE_RESPONSE;
		responseChatMessage.message = {
			controlId: option.controlId,
			action: "onFieldAction",
			content: { row: [...rowColumnArr], column: columnData },
		};
		// console.log("onFieldAction data ====>", responseChatMessage);

		if (
			this.props.chatFieldWindowArr &&
			this.props.chatFieldWindowArr.length > 0
		) {
			let getData = { ...rowData.chatField };
			this.props.removeChatFieldWindow(getData);
		}
		sendAMessage(responseChatMessage, true);
	};

	menuOptionButton = (row, inx, data) => {
		// console.log("row menu ", row, inx, data);
		let { rows, chat } = this.state;
		let tempModifyRows = [...rows];
		let { sendAMessage } = this.props;
		let option = chat.options;

		let objValue = {};
		let responseChat = {};

		option.keys.forEach((elem) => {
			objValue[elem] = data[elem];
		});

		if (data?.name === "Edit" && data?.type === "flag") {
			let tempRowOld = { ...tempModifyRows[inx] };
			delete tempRowOld["btnDropright"];
			this.setState({ editableIndex: inx, rowToEdit: { ...tempRowOld } });
			// this.editButton(row, inx, data.name);
			return;
		}

		if (data?.name === "Delete" && data?.type === "flag") {
			// tempModifyRows.splice(inx, 1);
			let deletedRow = tempModifyRows.splice(inx, 1);
			responseChat.messageType =
				MessageTypeConstants.MESSAGE_TYPE_TABLE_RESPONSE;
			responseChat.message = {
				controlId: option.controlId,
				action: "onDelete",
				content: { ...deletedRow[0] },
			};
			sendAMessage(responseChat, true);

			if (this.props?.comingFrom === "container" && this.props.updateTheRows) {
				this.props.updateTheRows(chat.options, tempModifyRows, "table");
			}

			return;
		}

		option.keys.map((elem) => {
			objValue[elem] = row[elem];
		});
		responseChat.messageType = MessageTypeConstants.MESSAGE_TYPE_TABLE_RESPONSE;
		responseChat.message = {
			controlId: option.controlId,
			action: "onMenuAction",
			content: { row: { ...objValue }, option: data.name },
		};

		sendAMessage(responseChat, true);
	};

	onlyForAirIndiaMobile = (row) => {
		const isMobile = window.innerWidth <= 600;
		const airIndiaBotIdDev = "hgpLFFxZb1oswGeuo9wyxi";
		const airIndiaBotIdProd = "eYmMJVcogncHPvAo2LYq6P";
		if (isMobile) {
			if (row["Scheduled Departure"] && row["Origin"] && row["Destination"]) {
				return (
					<div
						className="initial-info"
						style={{ display: "flex", flexDirection: "column" }}
					>
						<div className="flex-row-space-between">
							<span style={{ color: "#9B9B9B", fontSize: "12px" }}>
								Departure
							</span>
							<span
								style={{
									color: "#666666",
									fontSize: "12px",
									textAlign: "right",
								}}
							>
								{row["Scheduled Departure"]}
							</span>
						</div>
						<div className="flex-row-space-between">
							<span style={{ color: "#9B9B9B", fontSize: "12px" }}>From</span>
							<span
								style={{
									color: "#666666",
									fontSize: "12px",
									textAlign: "right",
								}}
							>
								{row["Origin"]}
							</span>
						</div>
						<div className="flex-row-space-between">
							<span style={{ color: "#9B9B9B", fontSize: "12px" }}>To</span>
							<span
								style={{
									color: "#666666",
									fontSize: "12px",
									textAlign: "right",
								}}
							>
								{row["Destination"]}
							</span>
						</div>
						{/* <div
              style={{
                marginRight: "25px",
                display: "flex",
                flexDirection: "column",
                textAlign: "left"
              }}
            >
              {" "}
              <span style={{ fontSize: "12px", color: "#9B9B9B" }}>
                Departure
              </span>{" "}
              <span style={{ fontSize: "16px", color: "#666666" }}>
                {row["Scheduled Departure"]}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "left"
              }}
            >
              {" "}
              <span style={{ fontSize: "12px", color: "#9B9B9B" }}>
                Arrival
              </span>{" "}
              <span style={{ fontSize: "16px", color: "#666666" }}>
                {row["Scheduled Arrival"]}
              </span>
            </div> */}
					</div>
				);
			} else return null;
		}
		return null;
	};

	showActionButton = (options, row, inx) => {
		// console.log("actionalRows ==== ", this.state, options, row);
		return (
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				{options.actionableRows && (
					<div className="dashboradIcon">
						<a
							className="img-top"
							style={{ width: "25px" }}
							onClick={() => this.actionRow(row, inx)}
						>
							<img
								style={{ width: "25px" }}
								src="./img/dashboard-icon-hover@2x.png"
								alt="actionableRow"
							/>
						</a>
					</div>
				)}
			</div>
		);
	};

	handlePagination = (options, action) => {
		console.log("Manish handlePagination :: ", options, action);
		let responseChat = {};
		responseChat.messageType = MessageTypeConstants.MESSAGE_TYPE_TABLE_RESPONSE;
		responseChat.message = {
			controlId: options.controlId,
			action: action,
		};
		this.props.sendAMessage(responseChat, true);
	};

	showPages = (options) => {
		const { previous, next } = options.pages;
		const previousLabelClass = previous
			? "pagination__buttons__active"
			: "pagination__buttons__inActive";
		const nextLabelClass = next
			? "pagination__buttons__active"
			: "pagination__buttons__inActive";
		return (
			<div className="d-flex flex-row custom-pagination">
				<div className="d-flex flex-row pagination__buttons">
					<div
						className="d-flex pagination-button"
						onClick={() =>
							previous && this.handlePagination(options, "previousPage")
						}
					>
						{previous ? (
							<img
								src="./img/pagination-arrow-next.png"
								style={{ paddingLeft: "5px", transform: "rotate(180deg)" }}
								alt="page-arrow-next"
							/>
						) : (
							<img
								src="./img/pagination-arrow-previous.png"
								style={{ paddingRight: "5px" }}
								alt="page-arrow-prev"
							/>
						)}
						<span className={previousLabelClass}>Previous</span>
					</div>
					<div
						className="d-flex pagination-button"
						onClick={() => next && this.handlePagination(options, "nextPage")}
					>
						<span className={nextLabelClass}>Next</span>
						{next ? (
							<img
								src="./img/pagination-arrow-next.png"
								style={{ paddingLeft: "5px" }}
								alt="page-arrow-next"
							/>
						) : (
							<img
								src="./img/pagination-arrow-previous.png"
								style={{ paddingRight: "5px", transform: "rotate(180deg)" }}
								alt="page-arrow-next"
							/>
						)}
					</div>
				</div>
			</div>
		);
	};

	validURL = (str) => {
		var pattern = new RegExp(
			"^(https?:\\/\\/)?" + // protocol
			"((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
			"((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
			"(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
			"(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
			"(\\#[-a-z\\d_]*)?$",
			"i"
		); // fragment locator
		return !!pattern.test(str);
	};

	addNewRow = () => {
		let emptyRow = {};
		let { rows, chat } = this.state;
		// let tempColumnNames = [...columnNames];
		// tempColumnNames.map((elem) => {
		//   emptyRow[elem]
		// // emptyRow["btnDropright"] = false;
		// });
		// console.log("adding new rows ===", emptyRow, rows);
		let newRow = _.cloneDeep(rows);
		newRow.push(emptyRow);
		if (this.props?.comingFrom === "container" && this.props.updateTheRows) {
			this.props.updateTheRows(chat.options, newRow, "table");
		} else {
			this.setState({
				rows: [...newRow],
			});
		}
		this.setState({
			addingNewRow: true,
			newRowsValue: { ...emptyRow },
		});
	};

	openChatField = (row, column) => {
		this.props.setChatFieldWindow(
			row[column],
			MessageTypeConstants.MESSAGE_TYPE_TABLE_RESPONSE
		);

		let participants = [];
		participants.push(this.props.user.userId);

		let conversation = {
			closed: false,
			participants: [...participants],
			conversationId: row[column].conversationId,
			bot: {
				...row[column],
			},
		};

		this.props.setScrollPositionForConversation(false, conversation);
		sendMessage(
			getOutgoingMessageRequest(conversation, "startConversation", {
				message: "",
				messageType: MessageTypeConstants.MESSAGE_TYPE_STRING,
			})
		);
		this.props.fetchArchivedMessages(conversation);
	};

	openVideoField = (row, column) => {
		clearInterval(refreshIntervalId);
		this.props.removeRing();
		// console.log("openVideoField", row, column, row[column]);
		let data = row[column];
		let dataInfo = {
			videoSessionId: data.videoSessionId,
			callInitiatorUserId: data.userId,
		};

		UserServiceClient.preConnectCallCheck(dataInfo)
			.then((response) => {
				if (!response.success) {
					throw new Error();
				}

				this.props.setChatFieldWindow(
					row[column],
					MessageTypeConstants.MESSAGE_TYPE_TABLE_RESPONSE
				);
			})
			.catch((err) => {
				let msg = {
					controlId: data.videoControlId,
					action: "busyLine",
					videoSessionId: data.videoSessionId,
				};
				let responseChat = {};
				responseChat.messageType =
					MessageTypeConstants.MESSAGE_TYPE_VIDEO_CALL_RESPONSE;
				responseChat.message = { ...msg };

				this.props.sendAMessage(responseChat, true);
			});
	};

	openVoiceField = (row, column) => {
		let data = row[column];

		console.log(
			"voice call ======= still need to finish it //////",
			data.phoneNumber
		);
	};

	addValueToNewRow = (e, colIndex, rowIndex) => {
		let value = e.target.value;
		let getColumn = [...this.state.columnNames];
		let currentRow = { ...this.state.newRowsValue };
		let columnName = getColumn[colIndex];

		currentRow[columnName] = value;

		this.setState({ newRowsValue: { ...currentRow } });
	};

	saveTheRow = (index) => {
		let { newRowsValue, rows, chat } = this.state;

		let contentObj = { ...newRowsValue };
		let getAllRows = [...rows];
		// debugger;
		let saveNewRow = getAllRows[index];

		delete contentObj["btnDropright"];
		let fieldEmpty = false;

		Object.keys(contentObj).map((key) => {
			if (contentObj[key].length === 0 || contentObj[key] === null) {
				fieldEmpty = true;
			} else {
				saveNewRow[key] = contentObj[key];
			}
		});

		let msg = {
			controlId: this.props.chat.options.controlId,
			action: "onSave",
			content: { ...contentObj },
		};

		if (fieldEmpty) {
			return;
		} else {
			console.log("save the row ", msg);
			if (this.props?.comingFrom === "container" && this.props.updateTheRows) {
				this.props.updateTheRows(chat.options, getAllRows, "table");
			} else {
				this.setState({
					rows: [...getAllRows],
				});
			}
			this.setState({
				addingNewRow: false,
				newRowsValue: {},
				uploading: false,
				imgFileName: null,
				fileName: null,
				// rows: [...getAllRows]
			});
			let responseChat = {};
			responseChat.messageType =
				MessageTypeConstants.MESSAGE_TYPE_TABLE_RESPONSE;
			responseChat.message = { ...msg };

			this.props.sendAMessage(responseChat, true);
		}
	};

	cancelRowSave = (index) => {
		let getTheRows = [...this.state.rows];
		getTheRows.splice(index, 1);

		this.setState({
			rows: [...getTheRows],
			addingNewRow: false,
			editableIndex: null,
		});
	};
	saveEditTheRow = (index) => {
		let { rows, chat, rowToEdit } = this.state;
		let contentArr = [...rows];
		let contentObj = contentArr[index];
		let oldContentObj = { ...rowToEdit };
		let fieldEmpty = false;
		delete contentObj["btnDropright"];

		Object.keys(contentObj).map((key) => {
			if (
				typeof contentObj[key] === "undefined" ||
				contentObj[key] === null ||
				contentObj[key].length === 0
			) {
				fieldEmpty = true;
			}
		});

		let msg = {
			controlId: this.props.chat.options.controlId,
			action: "onSave",
			content: { ...contentObj },
			oldContent: { ...oldContentObj },
		};

		if (fieldEmpty) {
			return;
		} else {
			if (this.props?.comingFrom === "container" && this.props.updateTheRows) {
				this.props.updateTheRows(chat.options, contentArr, "table");
			} else {
				this.setState({ rows: contentArr });
			}
			let responseChat = {};
			responseChat.messageType =
				MessageTypeConstants.MESSAGE_TYPE_TABLE_RESPONSE;
			responseChat.message = { ...msg };
			this.props.sendAMessage(responseChat, true);

			this.setState({
				editableIndex: null,
				rowToEdit: null,
			});
		}
	};
	cancelEditRowSave = () => {
		let { chat } = this.state;
		let rowsArray = _.cloneDeep(this.state.rowsBackup);

		if (this.props?.comingFrom === "container" && this.props.updateTheRows) {
			this.props.updateTheRows(chat.options, rowsArray, "table");
		} else {
			this.setState({ rows: rowsArray });
		}

		this.setState({
			editableIndex: null,
			rowToEdit: null,
		});
	};

	showLastColumnMoreOptions = (index, row, showMenu) => {
		let thisRowEmpty = false;
		// Object.keys(row).forEach((key) => {

		//   if (row[key] === null) {
		//     thisRowEmpty = true;
		//   }
		// });
		if (!Object.keys(row).length) {
			thisRowEmpty = true;
		}

		if (showMenu) {
			if (thisRowEmpty) {
				return (
					<Td>
						<div className="d-flex flex-row align-items-center justify-content-around">
							<img
								onClick={() => {
									this.saveTheRow(index);
								}}
								src="/img/pass-checkbox-checked@2x.png"
								alt="check"
								style={{ width: "18px", cursor: "pointer", margin: "0 10px" }}
							/>
							<img
								onClick={() => {
									this.cancelRowSave(index);
								}}
								src="/img/table-cancel.png"
								alt="cancel"
								style={{ width: "12px", cursor: "pointer", margin: "0 10px" }}
							/>
						</div>
					</Td>
				);
			} else {
				// let moreOptionArray =
				//   this.props.chat && this.props.chat.options
				//     ? [...this.props.chat.options.rowMenu]
				//     : [];
				// console.log("edit this row ", this.state.chat.options);
				if (
					this.state.chat &&
					this.state.chat.options &&
					this.state.chat.options.rowMenu &&
					this.state.chat.options.rowMenu.length > 0
				) {
					return (
						<Td>
							<Dropdown
								direction="end"
								isOpen={row.btnDropright}
								toggle={() => {
									let rowChange = _.cloneDeep(this.state.rows);
									rowChange[index].btnDropright =
										!rowChange[index].btnDropright;
									this.setState({ rows: rowChange });
								}}
							>
								<DropdownToggle tag="a" style={{ cursor: "pointer" }}>
									<img
										style={{ height: "18px", padding: "0 10px" }}
										src="/img/table-menu-1@2x.png"
										alt="more-options"
									/>
								</DropdownToggle>
								<DropdownMenu>
									{this.state.chat.options &&
										this.state.chat.options.rowMenu &&
										this.state.chat.options.rowMenu.map((elem, optInx) => {
											return (
												<DropdownItem
													key={optInx}
													onClick={() =>
														this.menuOptionButton(row, index, elem)
													}
												>
													{elem.name}
												</DropdownItem>
											);
										})}
								</DropdownMenu>
							</Dropdown>
						</Td>
					);
				} else {
					return;
				}
			}
		}
	};

	editButton = (row, index, data) => {
		if (data === "Edit") {
			let rowToEditTemp = { ...this.state.rowToEdit };

			let colNames = [...this.state.columnNames];

			colNames.forEach((elem) => {
				rowToEditTemp[elem] = row[elem];
			});

			this.setState({ editableIndex: index, rowToEdit: { ...rowToEditTemp } });
		}
	};

	handleRefresh = (options) => {
		let responseChat = {};
		responseChat.messageType = MessageTypeConstants.MESSAGE_TYPE_TABLE_RESPONSE;
		responseChat.message = {
			controlId: options.controlId,
			action: "onRefresh",
		};
		this.props.sendAMessage(responseChat, true);
	};

	handleDownload = (options) => {
		let responseChat = {};
		responseChat.messageType = MessageTypeConstants.MESSAGE_TYPE_TABLE_RESPONSE;
		responseChat.message = {
			controlId: options.controlId,
			action: "onDownload",
		};
		this.props.sendAMessage(responseChat, true);
	};

	handleConfirmAction = () => {
		let responseChat = {};
		responseChat.messageType = MessageTypeConstants.MESSAGE_TYPE_TABLE_RESPONSE;
		responseChat.message = {
			controlId: this.props.chat.options.controlId,
			action: "onConfirm",
		};
		this.props.sendAMessage(responseChat, true);
	};

	editValueToRow = (e, colIndex, rowIndex) => {
		let { chat, rows, columnNames } = this.state;
		let value = e.target.value;
		let getColumn = [...columnNames];
		let allRows = _.cloneDeep(rows);
		let columnName = getColumn[colIndex];

		allRows[rowIndex][columnName] = value;
		if (this.props?.comingFrom === "container" && this.props.updateTheRows) {
			this.props.updateTheRows(chat.options, allRows, "table");
		} else {
			this.setState({ rows: [...allRows] });
		}
	};

	searchSubmit = (e) => {
		e.preventDefault();
		this.setState({ showSpinner: true });
		let queryText = this.state.searchText.trim();
		if (queryText === "") {
			this.setState({ showSpinner: false });
			return;
		}
		let responseChat = {};
		responseChat.messageType = MessageTypeConstants.MESSAGE_TYPE_TABLE_RESPONSE;
		responseChat.message = {
			controlId: this.props.chat.options.controlId,
			action: "search",
			queryString: queryText,
		};
		// console.log("search on submit  form", responseChat);
		this.props.sendAMessage(responseChat, true);
	};

	onFileUploadProgress = (progressEvent) => {
		var percentCompleted = Math.round(
			(progressEvent.loaded * 100) / progressEvent.total
		);
		this.setState({ percentCompleted });
	};

	removeImage = (columnIndex, rowIndex, type) => {
		let copyRows = _.cloneDeep(this.state.rows);
		let getColumn = [...this.state.columnNames];
		let currentRow = { ...this.state.newRowsValue };
		let columnName = getColumn[columnIndex];
		currentRow[columnName] = null;

		if (type === "edit") {
			copyRows[rowIndex] = currentRow;
			this.setState({
				imgPath: "",
				imgFileName: "",
				fileName: "",
				rows: copyRows,
			});
		} else {
			this.setState({
				imgPath: "",
				imgFileName: "",
				fileName: "",
				newRowsValue: { ...currentRow },
			});
		}
	};

	uploadPhoto = (e, columnIndex) => {
		this.setState({ uploading: true });
		let file = e.target.files;

		if (!file) {
			return;
		}

		let conversationId = this.props.conversationId;

		let imgName = file[0];
		let fileImgName = file && file[0] ? file[0].name : "";
		let fileName = getFileName();

		fileName += fileImgName.substr(
			fileImgName.lastIndexOf("."),
			fileImgName.length - 1
		);

		FileServiceClient.uploadLargeFile({
			file: imgName,
			conversationId: conversationId,
			fileName: fileName,
		})
			.then(() => {
				let getColumn = [...this.state.columnNames];
				let currentRow = { ...this.state.newRowsValue };
				let columnName = getColumn[columnIndex];

				currentRow[columnName] = fileImgName;

				this.setState({
					uploading: false,
					imgFileName: fileImgName,
					fileName: fileImgName,
					newRowsValue: { ...currentRow },
				});
				return getFileUrl(conversationId, fileName);
			})
			.then((fileUrl) => {
				// console.log("file url ", fileUrl, fileName, imgName);

				return getFileUsingUrl(fileUrl);
			})
			.then((url) => {
				this.setState({ imgPath: url });
			})
			.catch((error) => {
				console.log("error on upload ", error);
				this.setState({ uploading: false });
				// todo handle error
			});

		// this.setState({ uploading: true });
	};

	render() {
		let { chat, rows, columnNames, showSpinner } = this.state;
		const isMobile = window.innerWidth <= 600;
		const airIndiaBotIdDev = "hgpLFFxZb1oswGeuo9wyxi";
		const airIndiaBotIdProd = "eYmMJVcogncHPvAo2LYq6P";

		// console.log("this new state in table", this.state);

		let options = { ...chat.options };

		let chatMessageTableRow = ["chatMessageTable-row"];
		if (this.state.addClass) {
			chatMessageTableRow.push("showHide-all-td");
		}

		let showActionButtons =
			!isMobile && R.isNil(options.rowMenu) && options.actionableRows;
		let showMenu = R.not(R.isNil(options.rowMenu));

		return (
			<div
				className="d-flex flex-column chatMessageTable-container"
				style={{
					maxHeight: this.props.hasCards
						? "calc(100vh - 320px - 100px)"
						: "40vh",
				}}
			>
				{!this.props.comingFrom && (
					<div
						className="d-flex flex-row justify-content-between px-2"
					// style={{ minHeight: "60px" }}
					>
						<div className="d-flex flex-column p-2 chatMessageTable-title">
							<h2>{options.title}</h2>
							<div>{options.description}</div>
						</div>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								marginRight: "0.8rem",
							}}
						>
							<div
								style={{
									minWidth: "150px",
									height: "inherit",
									display: "flex",
									justifyContent: "flex-end",
									alignItems: "center",
									margin: "5px 0",
								}}
							>
								{options.confirmAction && (
									<div
										style={{
											height: "25px",
											cursor: "pointer",
											margin: "0 0 0 10px",
										}}
										onClick={() => this.handleConfirmAction(options)}
									>
										<span style={{ color: "#638DFF" }}>
											{options.confirmAction}
										</span>
									</div>
								)}
								{options.allowDownload && (
									<div
										style={{
											width: "25px",
											height: "25px",
											cursor: "Pointer",
											margin: "0 0 0 10px",
										}}
										onClick={() => this.handleDownload(options)}
									>
										<span style={{ color: "#638DFF" }}>Download</span>
									</div>
								)}
								{options.allowRefresh && (
									<div
										style={{
											width: "25px",
											height: "25px",
											cursor: "pointer",
											margin: "0 0 0 10px",
										}}
										onClick={() => this.handleRefresh(options)}
									>
										{ }
										<img
											src="/img/refresh-btn@2x.png"
											alt="close-icon"
											style={{
												width: "25px",
												height: "25px",
											}}
										/>
									</div>
								)}
							</div>
							{options.allowSearch && (
								<form
									onSubmit={this.searchSubmit}
									className="d-flex justify-content-center align-items-center"
									style={{
										boxSizing: "border-box",
										width: "250px",
										border: "0.2px solid rgba(91,91,91,0.2)",
										borderRadius: "10px",
										backgroundColor: "#FFFFFF",
										boxShadow: "0 0 4px 0 rgba(0,0,0,0.08)",
									}}
								>
									<input
										className="form-control chat-input border0"
										style={{ borderRadius: "10px" }}
										type="text"
										placeholder="Search"
										onChange={(e) =>
											this.setState({ searchText: e.target.value })
										}
									/>

									<a
										onClick={this.searchSubmit}
										className="btn border0"
										style={{ position: "inherit" }}
									>
										{showSpinner ? (
											<span>
												<Spinner name="circle" color="steelblue" />
											</span>
										) : (
											<span>
												<img src="/img/search-icon@2x.png" width="12" />
											</span>
										)}
									</a>
								</form>
							)}
						</div>
					</div>
				)}

				<Table
					className={`table chatMessageTable-table ${this.props.linkData &&
						(this.props.linkData.botId === airIndiaBotIdDev ||
							this.props.linkData.botId === airIndiaBotIdProd)
						? "airIndiaTable"
						: ""
						}`}
				>
					<Thead>
						<Tr className="thead-row">
							{options.selectableRows && <Th>{""}</Th>}
							{columnNames.map((h, inx) => {
								let headerString = h.split("_");
								let headerStringlength = headerString.length;
								if (headerString[headerStringlength - 1] === "attachment") {
									let newString = headerString
										.splice(headerStringlength - 1)
										.join("");
									return <Th key={inx}>{newString}</Th>;
								} else return <Th key={inx}>{h}</Th>;
							})}
							<Th>{""}</Th>
							{this.props.chat.options.rowMenu && <Th>{""}</Th>}
							{this.state.showErrorMsgToolTipArr &&
								this.state.showErrorMsgToolTipArr.length > 0 && <Th>{""}</Th>}
						</Tr>
					</Thead>
					<Tbody>
						{rows.map((row, inx) => {
							let bgColor = "";
							let tableErrorIconId = "table-error-icon_" + inx;

							if (!_.isEmpty(row["errorMessage"])) {
								bgColor = "#FFDDCC";
							}

							if (inx === this.state.editableIndex) {
								return (
									<Tr
										key={inx}
										className={
											this.state.activeId === inx
												? "chatMessageTable-row"
												: "showHide-all-td"
										}
										style={{ backgroundColor: bgColor }}
									>
										{columnNames.map((column, index) => {
											let checkingType = row[column];

											let headerString = column.split("_");
											let headerStringlength = headerString.length;

											if (
												headerString[headerStringlength - 1] === "attachment"
											) {
												if (checkingType) {
													return (
														<Td key={index} style={{ padding: "0.5rem 1rem" }}>
															<span
																style={{
																	display: "inline-block",
																	maxWidth: "255px",
																	whiteSpace: "nowrap",
																	overflow: "hidden",
																	textOverflow: "ellipsis",
																}}
															>
																{this.state.fileName}
															</span>

															<Label
																style={{
																	backgroundColor: "#F9D1CF",
																	cursor: "pointer",
																	padding: "5px 15px",
																	margin: "0 0 0 20px",
																	borderRadius: "5px",
																	border: "1px solid rgba(229, 69, 59, 0.4)",
																}}
																onClick={() =>
																	this.removeImage(index, inx, "edit")
																}
															>
																<span
																	style={{
																		fontSize: "14px",
																		color: "#9B9B9B",
																	}}
																>
																	Remove file
																</span>
															</Label>
														</Td>
													);
												} else {
													return (
														<Td key={index} style={{ padding: "0.5rem 1rem" }}>
															<Label
																className="d-flex justify-content-center align-items-center"
																htmlFor="localContactImageBrowser"
																style={{ margin: 0 }}
															>
																<div
																	style={{
																		display: "flex",
																		flexDirection: "row",
																		justifyContent: "center",
																		alignItems: "center",
																	}}
																>
																	<img
																		style={{
																			width: "25px",
																			marginRight: "10px",
																			cursor: "pointer",
																		}}
																		src="./img/upload_icon.png"
																		alt="upload-file"
																	/>
																</div>
															</Label>
															<input
																type="file"
																id="localContactImageBrowser"
																name="customFile"
																accept="*"
																onChange={(e) => this.uploadPhoto(e, index)}
																className="displayNone"
															/>
														</Td>
													);
												}
											}

											return (
												<Td key={index} style={{ padding: "0.5rem 1rem" }}>
													<div>
														<input
															onChange={(e) => {
																this.editValueToRow(e, index, inx);
															}}
															className="form-control form-content-input"
															style={{
																borderRadius: "10px 0px 10px 10px",
																backgroundColor: "#F4F4F4",
															}}
															type="text"
															value={checkingType}
														/>
													</div>
												</Td>
											);
										})}
										<Td>
											<div
												className="d-flex flex-row align-items-center justify-content-between"
												style={{ width: "50px" }}
											>
												<img
													onClick={() => {
														this.saveEditTheRow(inx);
													}}
													src="/img/pass-checkbox-checked@2x.png"
													alt="check"
													style={{
														width: "18px",
														cursor: "pointer",
														margin: "0 10px",
													}}
												/>
												<img
													onClick={() => {
														this.cancelEditRowSave();
													}}
													src="/img/table-cancel.png"
													alt="cancel"
													style={{
														width: "12px",
														cursor: "pointer",
														margin: "0 10px",
													}}
												/>
											</div>
										</Td>
									</Tr>
								);
							} else
								return (
									<Tr
										key={inx}
										className={
											this.state.activeId === inx
												? "chatMessageTable-row"
												: "showHide-all-td"
										}
										style={{ backgroundColor: bgColor }}
										onClick={() => this.toggleClass(inx)}
									>
										{options.selectableRows && (
											<Td
												style={{
													padding: "0.5rem 1rem",
													display: "flex",
													justifyContent: "center",
												}}
											>
												{row.checkboxSelected ? (
													<a onClick={() => this.checkingColumn(row, inx)}>
														<img
															style={{ width: "16px" }}
															src="./img/checkbox-checked@2x.png"
															alt="checkbox"
														/>
													</a>
												) : (
													<a onClick={() => this.checkingColumn(row, inx)}>
														<img
															style={{ width: "16px" }}
															src="./img/checkbox-empty@2x.png"
															alt="checkbox"
														/>
													</a>
												)}
											</Td>
										)}

										{columnNames.map((column, index) => {
											let checkingType = row[column];
											let headerString = column.split("_");
											let headerStringlength = headerString.length;

											if (_.isEmpty(row)) {
												if (
													headerString[headerStringlength - 1] === "attachment"
												) {
													if (this.state.imgFileName) {
														return (
															<Td
																key={index}
																style={{ padding: "0.5rem 1rem" }}
															>
																<span
																	style={{
																		display: "inline-block",
																		maxWidth: "255px",
																		whiteSpace: "nowrap",
																		overflow: "hidden",
																		textOverflow: "ellipsis",
																	}}
																>
																	{this.state.fileName}
																</span>

																<Label
																	style={{
																		backgroundColor: "#F9D1CF",
																		cursor: "pointer",
																		padding: "5px 15px",
																		margin: "0 0 0 20px",
																		borderRadius: "5px",
																		border: "1px solid rgba(229, 69, 59, 0.4)",
																	}}
																	onClick={() =>
																		this.removeImage(index, inx, "newField")
																	}
																>
																	<span
																		style={{
																			fontSize: "14px",
																			color: "#9B9B9B",
																		}}
																	>
																		Remove file
																	</span>
																</Label>
															</Td>
														);
													} else
														return (
															<Td
																key={index}
																style={{ padding: "0.5rem 1rem" }}
															>
																<Label
																	className="d-flex justify-content-center align-items-center"
																	htmlFor="localContactImageBrowser"
																	style={{ margin: 0 }}
																>
																	<div
																		style={{
																			display: "flex",
																			flexDirection: "row",
																			justifyContent: "center",
																			alignItems: "center",
																		}}
																	>
																		<img
																			style={{
																				width: "25px",
																				marginRight: "10px",
																				cursor: "pointer",
																			}}
																			src="./img/upload_icon.png"
																			alt="upload-file"
																		/>
																	</div>
																</Label>
																<input
																	type="file"
																	id="localContactImageBrowser"
																	name="customFile"
																	accept="*"
																	onChange={(e) => this.uploadPhoto(e, index)}
																	className="displayNone"
																/>
															</Td>
														);
												}

												return (
													<Td key={index} style={{ padding: "0.5rem 1rem" }}>
														<div>
															<input
																onChange={(e) => {
																	this.addValueToNewRow(e, index, inx);
																}}
																className="form-control form-content-input"
																style={{
																	borderRadius: "10px 0px 10px 10px",
																	backgroundColor: "#F4F4F4",
																}}
																type="text"
															/>
														</div>
													</Td>
												);
											}

											if (
												!_.isEmpty(row) &&
												checkingType &&
												_.isObject(checkingType)
											) {
												if (checkingType.conversationId) {
													return (
														<Td key={index} style={{ padding: "0.5rem 1rem" }}>
															<div
																disabled={checkingType.disabled}
																className="map-chat"
																style={{
																	width: "30px",
																	height: "30px",
																	margin: "0px",
																}}
																onClick={() => this.openChatField(row, column)}
															>
																<img
																	style={{ width: "20px" }}
																	src="/img/map-chat-icon.png"
																	alt="chat-icon"
																/>
															</div>
														</Td>
													);
												} else if (checkingType.phoneNumber === "dialpad") {
													return (
														<DiallerPadButton
															user={this.props.user.user}
															noBalance={() => {
																this.props.openRecharge();
															}}
														/>
													);
												} else if (
													checkingType.phoneNumber !== "dialpad" &&
													checkingType.phoneType
												) {
													let number = doE164(checkingType.phoneNumber);
													let callType = getCallMode(number.countryCode);

													return (
														<Td key={index} style={{ padding: "0.5rem 1rem" }}>
															{/* <div
                                disabled={checkingType.disabled}
                                className="map-chat-video"
                                style={{
                                  width: "30px",
                                  height: "30px",
                                  margin: "0px",
                                }}
                                onClick={() => this.openVoiceField(row, column)}
                              >
                                <img
                                  style={{ width: "30px", cursor: "pointer" }}
                                  src="/img/call-icon-hover@2x.png"
                                  alt="chat-icon"
                                /> */}

															<CallButton
																balance={this.props.balance}
																callType={callType}
																from={this.props.user.emailAddress}
																to={number.formatted}
																closeCallHistory={() => {
																	console.log("close history");
																}}
																openGetRecharge={() =>
																	this.props.openRecharge()
																}
																className="btn btn-success btn-icon-o btn-sm mx-1 btn-rounded ml-3"
															>
																<i
																	className="icon-phone-outgoing"
																	style={{ color: "#fff" }}
																/>
															</CallButton>
															{/* </div> */}
														</Td>
													);
												} else if (checkingType.videoSessionId) {
													return (
														<Td key={index} style={{ padding: "0.5rem 1rem" }}>
															<div
																disabled={checkingType.disabled}
																className="map-chat-video"
																style={{
																	width: "30px",
																	height: "30px",
																	margin: "0px",
																}}
																onClick={() => this.openVideoField(row, column)}
															>
																<img
																	style={{ width: "30px", cursor: "pointer" }}
																	src="/img/header-new-call@2x.png"
																	alt="chat-icon"
																/>
															</div>
														</Td>
													);
												} else {
													if (checkingType.text) {
														return (
															<Td
																key={index}
																style={{ padding: "0.5rem 1rem" }}
															>
																<a
																	onClick={() =>
																		this.onFieldAction(row, column, index)
																	}
																>
																	<span
																		style={{
																			color: "rgb(0, 189, 242)",
																			textDecoration: "underline",
																			cursor: "pointer",
																		}}
																	>
																		{checkingType.text}
																	</span>
																</a>
															</Td>
														);
													} else if (checkingType.icon) {
														return (
															<Td
																key={index}
																style={{ padding: "0.5rem 1rem" }}
															>
																<a
																	onClick={() =>
																		this.onFieldAction(row, column)
																	}
																	style={{
																		width: "30px",
																		height: "30px",
																		margin: "0px",
																	}}
																	s
																>
																	<img
																		src={checkingType.icon}
																		alt="icon-action"
																	/>
																</a>
															</Td>
														);
													}
												}
											}

											if (
												headerString[headerStringlength - 1] === "attachment"
											) {
												if (row[headerString[0]]) {
													return (
														<Td key={index} style={{ padding: "0.5rem 1rem" }}>
															<span
																style={{
																	display: "inline-block",
																	maxWidth: "255px",
																	whiteSpace: "nowrap",
																	overflow: "hidden",
																	textOverflow: "ellipsis",
																}}
															>
																{row[headerString[0]]}
															</span>
														</Td>
													);
												}
											}

											if (
												(checkingType &&
													typeof checkingType === "string" &&
													checkingType.startsWith("#")) ||
												checkingType === 0 ||
												checkingType === "0"
											) {
												let regExp = /\(([^)]+)\)/;
												let matches = regExp.exec(row[column]);

												if (!matches) {
													matches = "";
												}
												let newString = parseInt(matches[1], 10);

												const optionsTime = {
													weekday: "short",
													year: "numeric",
													month: "short",
													day: "numeric",
													hour: "numeric",
													minute: "numeric",
												};

												if (newString || newString === "0" || newString === 0) {
													return (
														<Td key={index} style={{ padding: "0.5rem 1rem" }}>
															<div className="flex-row-space-between">
																<div
																	style={{
																		display: "flex",
																		flexDirection: "column",
																		width: "100%",
																		padding: "0 10px",
																	}}
																>
																	<div
																		className="flex-row-space-between"
																		style={{ marginBottom: "10px" }}
																	>
																		<a className="primar`y-link">
																			{new Date(newString).toLocaleString(
																				"en-US",
																				optionsTime
																			)}
																		</a>
																	</div>
																</div>
															</div>
														</Td>
													);
												} else {
													return (
														<Td key={index} style={{ padding: "0.5rem 1rem" }}>
															<div className="flex-row-space-between">
																<div
																	style={{
																		display: "flex",
																		flexDirection: "column",
																		width: "100%",
																		padding: "0 10px",
																	}}
																>
																	<div
																		className="flex-row-space-between"
																		style={{ marginBottom: "10px" }}
																	>
																		<a className="primar`y-link">
																			{checkingType}
																		</a>
																	</div>
																</div>
															</div>
														</Td>
													);
												}
											}

											if (index === 0) {
												return (
													<Td key={index} style={{ padding: "0.5rem 1rem" }}>
														<div className="flex-row-space-between">
															<div
																style={{
																	display: "flex",
																	flexDirection: "column",
																	width: "100%",
																	padding: "0 10px",
																}}
															>
																<div
																	className="flex-row-space-between first-table-col-wrap"
																	style={{ marginBottom: "10px" }}
																>
																	<a className="primar`y-link first-table-col">
																		{/* onClick={() => this.openTableRow(row)} */}
																		{row[column] ? row[column].toString() : ""}
																	</a>
																	<div>
																		{isMobile &&
																			this.showActionButton(options, row, inx)}
																	</div>
																</div>
																{/*This only for Air India*/}
																{this.onlyForAirIndiaMobile(row)}
															</div>
														</div>
													</Td>
												);
											}

											{
												/* if (
						headerString[headerStringlength - 1] === "attachment"
					  ) {
						return (
						  <Td key={index} style={{ padding: "0.5rem 1rem" }}>
							<a>
							  {row[column] || row[column] === 0
								? row[column].toString()
								: ""}
							</a>
						  </Td>
						);
					  } */
											}

											return (
												<Td key={index} style={{ padding: "0.5rem 1rem" }}>
													<a>
														{row[column] || row[column] === 0
															? row[column].toString()
															: ""}
													</a>
												</Td>
											);
										})}
										{showActionButtons && (
											<Td style={{ padding: "0.5rem 1rem" }}>
												{this.showActionButton(options, row, inx)}
											</Td>
										)}

										{this.showLastColumnMoreOptions(inx, row, showMenu)}

										{!_.isEmpty(row["errorMessage"]) && (
											<Td
												id={tableErrorIconId}
												style={{ verticalAlign: "middle" }}
											>
												<div>
													<img
														src="./img/table-alert-icon@3x.png"
														style={{ width: "20px", cursor: "pointer" }}
														alt="table Alert Icon"
													/>
												</div>
											</Td>
										)}

										{!_.isEmpty(row["errorMessage"]) && (
											<Tooltip
												target={tableErrorIconId}
												modifiers={{
													preventOverflow: { boundariesElement: "window" },
												}}
												placement="right"
												autohide={false}
												isOpen={
													this.state.showErrorMsgToolTipArr[tableErrorIconId] ||
													false
												}
												toggle={() => this.toggle(tableErrorIconId)}
												delay={{ show: 0, hide: 200 }}
												id="tableErrTooltip"
												flip={false}
											>
												{row.errorMessage}
											</Tooltip>
										)}
									</Tr>
								);
						})}
					</Tbody>
				</Table>
				{/* {rows.length > 5 && (
            <a
              onClick={this.toggleMore}
              style={{
                borderBottomRightRadius: "10px",
                borderBottomLeftRadius: "10px",
                borderTop: "1px solid #DEDEDE"
              }}
              className="d-flex justify-content-center align-items-center p-2 bg-white primary-link"
            >
              {more ? "See less" : "See more"}
            </a>
          )} */}
				{/*<div className="option-footer" style={{border: "1px solid red"}}>*/}
				{/*  <button>Prev</button>*/}
				{/*  <button>Next</button>*/}
				{/*</div>*/}
				{options && !_.isEmpty(options.pages) && this.showPages(options)}
				{options.footer && options.footer.length > 0 && (
					<div className="option-footer">
						<span>{options.footer}</span>
					</div>
				)}
				{options && options.addNewRows && (
					<div
						className="d-flex justify-content-center align-items-center"
						style={{ height: "40px", margin: "10px 0" }}
					>
						<a
							onClick={() => this.addNewRow()}
							disabled={this.state.addingNewRow}
						>
							<span
								style={{
									color: "#638DFF",
									fontSize: "12px",
									fontWeight: "300",
									cursor: "pointer",
								}}
							>
								{options.addNewRowsLabel || "Add new vessel to this fleet"}
							</span>
						</a>
					</div>
				)}
			</div>
		);
	}
}

let actions = {
	showModal: showModal,
	hideModal: hideModal,
	setFormInWindow: setFormInWindow,
	sendAMessage: sendAMessage,
	setChatFieldWindow: setChatFieldWindow,
	setScrollPositionForConversation: setScrollPositionForConversation,
	fetchArchivedMessages: fetchArchivedMessages,
	removeRing: removeRing,
	removeChatFieldWindow: removeChatFieldWindow,
};

const mapDataToProps = (state) => {
	let conversationId = state.chats.selectedConversation.conversationId;
	return {
		conversationId: conversationId,
		user: state.user.user,
		balance: state.user.balance,
		setRingTone: state.chats.setRingTone || false,
		chatFieldWindowArr: state.chats.chatFieldWindow[conversationId],
	};
};

export default connect(mapDataToProps, actions)(ChatMessageTableForWindow);
