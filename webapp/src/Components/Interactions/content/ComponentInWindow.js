/* eslint-disable react/no-unsafe */
import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import FormContentView from "./forms/FormContentView";
import ChatMessageTableForWindow from "../chats/ChatMessageTableForWindow";
import {
	removeFromWindow,
	setWindowMinMax,
	setFormInWindow,
	resetSelectedConversationFormInWindow,
	resetComponentInWindowExceptForm,
	removeChatFieldWindow,
	sendAMessage,
	removeVideoText,
	updateFieldsComponentInContainer,
	removeGenericErrorMsg,
	setWindowOnTop,
} from "../../../State/actions/chats";
import _ from "lodash";
import ChatMessageTrackingForWindow from "../chats/ChatMessageTrackingForWindow";

import Draggable from "react-draggable";
import {
	getStoreFormFromLocal,
	removeStoreFormFromLocal,
} from "../../../Services/StorageService";
import { MessageTypeConstants } from "../../../Services/Message";
import ChatMessageTabFormForWindow from "../chats/ChatMessageTabFormForWindow";
import WindowTitle from "./WindowComponent/WindowTitle";
import WindowMinClose from "./WindowComponent/WindowMinClose";
import ChatFieldForWindow from "../chats/ChatFieldForWindow";
import MeetingRoom from "../../Video/Components/MeetingRoom";

import AudioElement from "../../../Utils/AudioElement";
import SpinnerFM from "../../Spinner";
// import "./airindiatest.css";

import MapDraw from "./MapDrawComponent";

const R = require("ramda");
const ASKDUB = "AskDUB";

class ComponentInWindow extends Component {
	constructor(props) {
		super(props);
		this.state = {
			componentsWindow: [],
			chatWindow: [],
			conversationId: this.props.conversationId,
			componentInWindow: {},
			componentsOpen: true,
			positionOffset: null,
			currentIndex: -1,
		};
	}

	componentDidMount() {
		if (this.props.data) {
			let componentInWindow = this.props.data;
			let conversationId = this.props.conversation;
			let compInWin = componentInWindow;

			let positionOffset = {
				x: 0,
				y: 0,
			};

			this.setState({ positionOffset });

			if (conversationId && compInWin && componentInWindow) {
				this.setState({
					componentsWindow: _.cloneDeep(compInWin),
					conversationId: conversationId,
					componentInWindow: _.cloneDeep(componentInWindow),
				});
			}
		} else {
			let { conversationId, componentInWindow } = this.props;
			let compInWin = componentInWindow[conversationId];

			let positionOffset = {
				x: 0,
				y: 0,
			};

			this.setState({ positionOffset });

			if (conversationId && compInWin && componentInWindow) {
				this.setState({
					componentsWindow: _.cloneDeep(compInWin),
					conversationId: conversationId,
					componentInWindow: _.cloneDeep(componentInWindow),
				});
			}
		}
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		// console.log("new props changes ", nextProps);

		if (
			this.props.componentInWindow &&
			nextProps.componentInWindow &&
			this.props.componentInWindow[nextProps.conversationId] &&
			nextProps.componentInWindow[nextProps.conversationId] &&
			this.props.componentInWindow[nextProps.conversationId].length ===
				nextProps.componentInWindow[nextProps.conversationId].length &&
			nextProps.componentInWindow[nextProps.conversationId].length > 1
		) {
			let formFromLocal = getStoreFormFromLocal();
			let controlId;
			if (formFromLocal) {
				if (formFromLocal.options.controlId) {
					controlId = formFromLocal.options.controlId;
				}
				nextProps.componentInWindow[nextProps.conversationId].forEach(
					(elem) => {
						if (elem.options.allowMinimize) {
							if (controlId === elem.options.controlId) {
								if (elem.options.minimizeOnConfirm) {
									elem.minimize = true;
								} else {
									elem.minimize = false;
								}
							}
						} else {
							elem.minimize = false;
						}

						// if (elem.options.minimizeOnAction) {
						//   elem.minimize = elem.options.minimizeOnAction;
						// }
					}
				);

				this.setState({
					componentsWindow: [
						...nextProps.componentInWindow[nextProps.conversationId],
					],
				});
			}
		}

		// if (
		//   this.props.componentInWindow &&
		//   nextProps.componentInWindow &&
		//   this.props.componentInWindow[nextProps.conversationId] &&
		//   nextProps.componentInWindow[nextProps.conversationId] &&
		//   this.props.componentInWindow[nextProps.conversationId].length !==
		//     nextProps.componentInWindow[nextProps.conversationId].length &&
		//   this.props.componentInWindow[nextProps.conversationId].length <
		//     nextProps.componentInWindow[nextProps.conversationId].length
		// ) {
		//   let formFromLocal = getStoreFormFromLocal();
		//   let controlId;
		//   if (formFromLocal) {
		//     if (formFromLocal.options.controlId) {
		//       controlId = formFromLocal.options.controlId;
		//     }
		//   }
		//   let newArray = nextProps.componentInWindow[nextProps.conversationId].map(
		//     (elem) => {
		//       // console.log("checking the elem ", elem);
		//       // if (controlId === elem.options.controlId) {
		//       //   elem.minimize = true;
		//       // }
		//       // if (elem.options.minimizeOnAction) {
		//       //   elem.minimize = elem.options.minimizeOnAction;
		//       // }
		//     }
		//   );
		//   this.setState({ componentsWindow: [...newArray] });
		// }
		if (
			nextProps.conversationId &&
			this.props.conversationId &&
			nextProps.conversationId !== this.props.conversationId
		) {
			if (nextProps.componentInWindow[nextProps.conversationId]) {
				this.setState({
					componentsWindow: [
						...nextProps.componentInWindow[nextProps.conversationId],
					],
				});
			} else {
				this.setState({
					componentsWindow: [],
				});
			}
		}

		if (
			nextProps.conversationId &&
			nextProps.componentInWindow &&
			nextProps.componentInWindow[nextProps.conversationId] &&
			this.state.componentsWindow &&
			!_.isEqual(
				nextProps.componentInWindow[nextProps.conversationId],
				this.state.componentsWindow
			)
		) {
			this.setState({
				componentsWindow: nextProps.componentInWindow[nextProps.conversationId],
			});
		}
		if (
			nextProps.conversationId &&
			nextProps.chatFieldWindow &&
			nextProps.chatFieldWindow[nextProps.conversationId] &&
			this.state.chatWindow &&
			!_.isEqual(
				nextProps.chatFieldWindow[nextProps.conversationId],
				this.state.chatWindow
			)
		) {
			this.setState({
				chatWindow: nextProps.chatFieldWindow[nextProps.conversationId],
			});
		}
	}

	cancelForm = (data) => {
		this.props.removeFromWindow(data);
		removeStoreFormFromLocal();
	};
	closeForm = (data) => {
		this.cancelForm(data);
	};

	minimizeWindow = (data, index) => {
		const isMobile = window.innerWidth <= 600;

		let { componentsWindow } = this.state;
		let tempArr = [...componentsWindow];
		if (!isMobile) {
			if (tempArr[index]) {
				tempArr[index].minimize = !tempArr[index].minimize;
				// this.bringToTop(index);
			}
		} else {
			tempArr.forEach((elem, indx) => {
				if (indx === index) {
					if (elem.minimize) {
						elem.minimize = false;
					} else {
						elem.minimize = true;
					}
				} else {
					elem.minimize = true;
				}
			});
		}
		// console.log("min max ", );

		this.setState({ componentsWindow: [...tempArr] });
		removeStoreFormFromLocal();
		this.props.setWindowMinMax(data, index);
	};

	closeWindow = (index, messageType, options, from = null) => {
		let { componentsWindow } = this.state;
		let tempArr = _.cloneDeep(componentsWindow);
		if (!from) {
			let responseChat = {};
			responseChat.messageType = messageType;
			responseChat.message = {
				controlId: options.controlId,
				action: "close",
			};
			this.props.sendAMessage(responseChat, true);
		}

		//NOt required
		if (tempArr[index] && tempArr[index].message.controlId) {
			tempArr[index].options["controlId"] = tempArr[index].message.controlId;
		}

		this.props.removeFromWindow(tempArr[index]);
		this.props.removeVideoText();
	};

	minimizeChatWindow = (windowElem, index) => {
		console.log("minimise chat window");
	};

	closeChatWindow = (index, responseMessageType, options) => {
		let allChats = [...this.state.chatWindow];
		if (allChats.length > 0) {
			let getData = allChats[index];
			console.log("close chat window", getData);
			this.props.removeChatFieldWindow(getData);
			allChats.splice(index, 1);
			this.setState({ chatWindow: [...allChats] });
		}
	};

	makeTheComponentMinimize = (index) => {
		// console.log("making this component min", index);
		let newArr = [...this.state.componentsWindow];
		newArr[index].minimize = true;
		this.setState({ componentsWindow: [...newArr] });
	};

	bringToTop = (index) => {
		let { componentsWindow } = this.state;

		// this.props.setWindowOnTop(index, this.props.conversationId);
		let newArr = _.cloneDeep(componentsWindow);
		newArr.forEach((elem, i) => {
			if (i === index) {
				elem["addClass"] = "bringOnTop";
			} else {
				elem["addClass"] = "bringOnBottom";
			}
		});

		this.setState({ componentsWindow: [...newArr] });
	};

	hideAllComponents = () => {
		this.setState({ componentsOpen: false });
	};
	showAllComponents = () => {
		this.setState({ componentsOpen: true });
	};

	getWindowPosition = (zone) => {
		const hasCards = this.props.hasCards;
		if (!zone || zone < 1 || zone > 6) {
			return { left: 0, top: 0 };
		}
		if (zone <= 3) {
			let multiplier = zone === 0 ? 0 : zone - 1;
			let left = `calc(((95vw / 3)*${multiplier}) + 1vw)`;
			let top = "30px";
			return { left, top };
		}
		if (zone > 3 && zone <= 6) {
			let multiplier = Math.abs(zone - 4);
			let left = `calc(((95vw / 3)*${multiplier}) + 1vw)`;
			let top = hasCards ? `calc((95vh - 550px) / 2)` : "calc(100vh / 3)";
			return { left, top };
		}
	};

	sendVideoBotMessage = (controlId, action, videoSessionId, index) => {
		let msg = {
			controlId: controlId,
			action: action,
			videoSessionId: videoSessionId,
		};
		let responseChat = {};
		responseChat.messageType =
			MessageTypeConstants.MESSAGE_TYPE_VIDEO_CALL_RESPONSE;
		responseChat.message = { ...msg };

		if (action === "callEnd") {
			let allChats = [...this.state.chatWindow];
			if (allChats.length > 0) {
				let getData = allChats[index];
				this.props.removeChatFieldWindow(getData);
			}
		}

		if (action === "callActive") {
			this.playAudio();
		}

		this.props.sendAMessage(responseChat, true);
	};

	playAudio = () => {
		// let ringTone = `${R.prop("soundURL", Config)}beep_beep_beep.mp3`;
		// console.log("let see the ring ", ringTone);
		// let audio = new Audio(ringTone);
		// audio.loop = false;
		// audio.play().catch(function(error) {
		//   console.log(error.message);
		// });

		// this.audioControl = audio;
		// // setTimeout(this.stopAudio, 5000);
		AudioElement.playBeep();
	};

	stopAudio = () => {
		AudioElement.pauseBeep();
		// if (this.audioControl) {
		//   this.audioControl.pause();
		// }
	};

	errorHandleVideoMsg = (controlId, action, errorMsg, videoSessionId) => {
		let msg = {
			controlId: controlId,
			action: action,
			errorMessage: errorMsg,
			videoSessionId: videoSessionId,
		};
		let responseChat = {};
		responseChat.messageType =
			MessageTypeConstants.MESSAGE_TYPE_VIDEO_CALL_RESPONSE;
		responseChat.message = { ...msg };

		this.props.sendAMessage(responseChat, true);
	};

	sendVideoId = (id, options) => {
		console.log("video id ", id, options);

		let msg = {
			controlId: options.controlId,
			action: "peerRequest",
			videoSessionId: id,
		};

		let responseChat = {};
		responseChat.messageType =
			MessageTypeConstants.MESSAGE_TYPE_VIDEO_CALL_RESPONSE;
		responseChat.message = { ...msg };

		this.props.sendAMessage(responseChat, true);
	};

	render() {
		let { background, sendAMessage } = this.props;
		let { componentsWindow, componentsOpen, chatWindow } = this.state;

		const isMobile = window.innerWidth <= 600;

		// var result = this.props.chatLog["8Lj98WiWxV-0ddafd3bcbf5"];

		let top = null;
		let height = null;
		const botName_all_lowercase =
			this.props.botName && this.props.botName.toLowerCase();
		if (botName_all_lowercase === ASKDUB.toLowerCase()) {
			top = "13.5%";
			height = "230px";
		}
		// console.log("componentInWindow ======= ", componentsWindow);

		return (
			<div
				className="component-in-window-container"
				// style={{
				//   bottom: this.props.heightFromBottom,
				//   maxHeight: this.props.hasCards
				//     ? "calc(100% - 375px)"
				//     : "calc(100% - 75px)"
				// }}
			>
				<div>
					{chatWindow.map((elem, index) => {
						let chat = elem;
						chat.options = { allowClose: true };
						if (elem.conversationId) {
							return (
								<Draggable
									cancel=".non-grabbale-component"
									bounds="parent"
									key={elem.conversationId}
									allowAnyClick={true}
									enableUserSelectHack={false}
									onStop={() => this.bringToTop(index)}
								>
									<div
										className="d-flex flex-column draggable-component draggable-form-component-container align-items-center justify-content-center responsive-draggable-card"
										style={{
											zIndex: "9999",
											boxShadow: "0 0 6px 0 rgba(0,0,0,0.2)",
											top: isMobile ? "0px" : "50px",
											left: isMobile ? "0px" : "20px",
											height: height,
											maxWidth: "390px",
										}}
									>
										<div className="d-flex flex-row justify-content-between align-items-center mini-window-header w-100">
											<div className="d-flex draggable-icon-container flex-row align-items-center">
												<img
													className="draggable-icon"
													src="/offlinelms/img/move-icon@2x.png"
													alt="draggable-icon"
												/>
											</div>
											<WindowMinClose
												className="non-grabbale-component"
												windowElem={chat}
												index={index}
												chat={chat}
												responseMessageType={
													MessageTypeConstants.MESSAGE_TYPE_TABLE_RESPONSE
												}
												minimizeWindow={this.minimizeChatWindow}
												closeWindow={this.closeChatWindow}
												iconType="minimize-icon"
											/>
										</div>
										<div className="d-flex flex-column nonGrabbale-body form-nonGrabbale-body non-grabbale-component">
											<div
												style={{
													display: "flex",
													flexDirection: "column",
													alignItems: "flex-start",
													maxHeight: "75px",
													padding: "10px 15px",
													borderBottom: "1px solid #dedede",
												}}
											>
												<h1 className="form-h1-title">{elem.title}</h1>
												{/* <h3
                        style={{
                          fontSize: "14px",
                          fontWeight: 500,
                          margin: 0,
                          color: "#666"
                        }}
                      >
                        {elem.description}
                      </h3> */}
											</div>
											<ChatFieldForWindow data={elem} />
										</div>
										<div className="d-flex flex-row justify-content-between align-items-center mini-window-header border-bottom-radius-10 w-100">
											<div className="d-flex draggable-icon-container">
												<img
													className="draggable-icon"
													src="/offlinelms/img/move-icon@2x.png"
													alt="draggable-icon"
												/>
											</div>
										</div>
									</div>
								</Draggable>
							);
						} else if (elem.videoSessionId) {
							return (
								<div className="draggable-modal d-flex align-items-center justify-content-center">
									<Draggable
										bounds="parent"
										cancel=".non-grabbale-component"
										key={elem.videoSessionId}
										allowAnyClick={false}
										enableUserSelectHack={false}
										onStop={() => this.bringToTop(index)}
										positionOffset={this.state.positionOffset}
									>
										<div
											className="d-flex flex-column  align-items-center justify-content-between"
											// style={{
											//   zIndex: "9999",
											//   top: "5vh"
											// }}
										>
											<div className="d-flex flex-row justify-content-between align-items-center mini-window-header w-100">
												<div className="d-flex draggable-icon-container flex-row align-items-center">
													<img
														className="draggable-icon"
														src="/offlinelms/img/move-icon@2x.png"
														alt="draggable-icon"
													/>
												</div>
												{/* <WindowMinClose
                        windowElem={chat}
                        index={index}
                        chat={chat}
                        responseMessageType={
                          MessageTypeConstants.MESSAGE_TYPE_TABLE_RESPONSE
                        }
                        minimizeWindow={this.minimizeChatWindow}
                        closeWindow={this.closeChatWindow}
                        iconType="minimize-icon"
                      /> */}
											</div>
											<div className="d-flex flex-column">
												<MeetingRoom
													sessionInfo={{
														userId: elem.userId,
														bot: elem.bot,
														conversationId: elem.conversation,
													}}
													meetingId={elem.videoSessionId}
													disableVideo={true}
													waitingText={`<p className="wait-text-main">Connecting your call. Please wait...</p>`}
													onError={(id, errorMessage) => {
														console.log("HANDLE Error SID!!", errorMessage);
														this.errorHandleVideoMsg(
															elem.videoControlId,
															"error",
															errorMessage,
															elem.videoSessionId
														);
													}}
													onMeetingEnded={(id) => {
														console.log("Sending Meeting Ended to Bot", id);
														this.sendVideoBotMessage(
															elem.videoControlId,
															"callEnd",
															elem.videoSessionId,
															index
														);
														this.closeChatWindow(
															index,
															MessageTypeConstants.MESSAGE_TYPE_TABLE_RESPONSE,
															chat.options
														);
													}}
													onMeetingStarted={(id) => {
														console.log("Meeting Has Started", id);
														this.sendVideoBotMessage(
															elem.videoControlId,
															"callActive",
															elem.videoSessionId,
															index
														);
													}}
												/>
											</div>
										</div>
									</Draggable>
								</div>
							);
						}
					})}
				</div>
				<div className="container-for-all">
					{componentsOpen &&
						componentsWindow.map((elem, index) => {
							let chat = {
								messageType: elem.messageType,
								message: elem.message,
								options: elem.options,
							};
							let { zone } = chat.options;

							const windowPosition = this.getWindowPosition(zone);
							top =
								(botName_all_lowercase !== ASKDUB.toLowerCase() &&
									windowPosition.top) ||
								top;
							let left = windowPosition.left;

							if (
								elem.messageType === MessageTypeConstants.MESSAGE_TYPE_GEOFENCE
							) {
								return (
									<Suspense fallback={<SpinnerFM show={true} />}>
										<MapDraw
											elem={elem}
											heightFromBottom={this.props.heightFromBottom}
											index={index}
											chat={chat}
											closeWindow={this.closeWindow}
											bringToTop={this.bringToTop}
											sendAMessage={sendAMessage}
										/>
									</Suspense>
								);
							}

							if (elem.messageType === "form2") {
								if (elem.minimize) {
									return (
										<div
											key={elem.messageId}
											className="d-flex flex-column draggable-form-min-container responsive-draggable-card"
											style={{
												bottom: this.props.heightFromBottom,
												left:
													!isMobile && index === 0
														? "40px"
														: index * 265 + "px",
											}}
											onClick={(e) => this.minimizeWindow(elem, index)}
										>
											<div
												className="d-flex flex-row justify-content-between align-items-center mini-window-header"
												style={{ border: 0 }}
											>
												<WindowTitle title={elem.options.title} />
												<WindowMinClose
													className="non-grabbale-component"
													windowElem={elem}
													index={index}
													chat={chat}
													responseMessageType={
														MessageTypeConstants.MESSAGE_TYPE_FORM_RESPONSE
													}
													minimizeWindow={this.minimizeWindow}
													closeWindow={this.closeWindow}
													iconType="maximize-icon"
												/>
											</div>
										</div>
									);
								}
								// Change
								else {
									return (
										<Draggable
											bounds="parent"
											cancel=".non-grabbale-component"
											key={elem.messageId}
											allowAnyClick={true}
											enableUserSelectHack={false}
											onStop={() => this.bringToTop(index)}
										>
											<div
												key={elem.messageId}
												className="d-flex flex-column draggable-component draggable-form-component-container responsive-draggable-card"
												style={{
													zIndex:
														elem.addClass === "bringOnTop"
															? componentsWindow.length
															: index,
													// zIndex: index,
													boxShadow: "0 0 6px 0 rgba(0,0,0,0.2)",
													bottom:
														zone === undefined
															? botName_all_lowercase === ASKDUB.toLowerCase()
																? ""
																: this.props.heightFromBottom === "300px"
																? "calc(37vh)"
																: "90px"
															: "",
													top:
														zone === undefined &&
														botName_all_lowercase !== ASKDUB.toLowerCase()
															? ""
															: isMobile
															? "0px"
															: top,
													left:
														zone === undefined
															? "0px"
															: isMobile
															? "0px"
															: left,
													height: height,
												}}
											>
												<div className="d-flex flex-row justify-content-between align-items-center mini-window-header">
													<div className="d-flex draggable-icon-container flex-row align-items-center">
														<img
															className="draggable-icon"
															src="/offlinelms/img/move-icon@2x.png"
															alt="draggable-icon"
														/>
													</div>
													<WindowMinClose
														className="non-grabbale-component"
														windowElem={elem}
														index={index}
														chat={chat}
														responseMessageType={
															MessageTypeConstants.MESSAGE_TYPE_FORM_RESPONSE
														}
														minimizeWindow={this.minimizeWindow}
														closeWindow={this.closeWindow}
														iconType="minimize-icon"
													/>
												</div>

												<div className="d-flex flex-column nonGrabbale-body form-nonGrabbale-body non-grabbale-component">
													<div
														style={{
															display: "flex",
															flexDirection: "column",
															alignItems: "flex-start",
															height: "75px",
															padding: "0 15px",
															borderBottom: "1px solid #dedede",
														}}
													>
														<h1 className="form-h1-title">
															{elem.options.title}
														</h1>
														<h3
															style={{
																fontSize: "14px",
																fontWeight: 500,
																margin: 0,
																color: "#666",
															}}
														>
															{elem.options.description}
														</h3>
													</div>
													<FormContentView
														background={background}
														chat={chat}
														genericMessage={elem.genericError || {}}
														completed={this.props.completed}
														cancelForm={this.cancelForm}
														closeForm={this.cancelForm}
														removeGenericErrorMsg={
															this.props.removeGenericErrorMsg
														}
														sendMessage={this.props.sendAMessage}
														hasCards={this.props.hasCards}
														resetSelectedConversationFormInWindow={
															this.props.resetSelectedConversationFormInWindow
														}
														conversationId={this.props.conversationId}
														setFormInWindow={this.props.setFormInWindow}
														resetComponentInWindowExceptForm={
															this.props.resetComponentInWindowExceptForm
														}
													/>
												</div>
												<div className="d-flex flex-row justify-content-between align-items-center mini-window-header border-bottom-radius-10 w-100">
													<div className="d-flex draggable-icon-container">
														<img
															className="draggable-icon"
															src="/offlinelms/img/move-icon@2x.png"
															alt="draggable-icon"
														/>
													</div>
												</div>
											</div>
										</Draggable>
									);
								}
							} else if (elem.messageType === "table") {
								if (elem.minimize) {
									return (
										<div
											key={elem.messageId}
											className="d-flex flex-column draggable-table-min-container responsive-draggable-card"
											style={{
												maxWidth: 200,
												bottom: this.props.heightFromBottom,
												left:
													!isMobile && index === 0
														? "40px"
														: isMobile
														? index + "px"
														: index * 265 + "px",
											}}
											onClick={(e) => this.minimizeWindow(elem, index)}
										>
											<div
												className="d-flex flex-row justify-content-between align-items-center mini-window-header"
												style={{ border: 0 }}
											>
												<WindowTitle title={elem.options.title} />
												<WindowMinClose
													className="non-grabbale-component"
													windowElem={elem}
													index={index}
													chat={chat}
													responseMessageType={
														MessageTypeConstants.MESSAGE_TYPE_TABLE_RESPONSE
													}
													minimizeWindow={this.minimizeWindow}
													closeWindow={this.closeWindow}
													iconType="maximize-icon"
												/>
											</div>
										</div>
									);
								} else {
									return (
										<Draggable
											bounds="parent"
											key={elem.messageId}
											allowAnyClick={true}
											enableUserSelectHack={false}
											cancel=".non-grabbale-component"
											onStop={() => this.bringToTop(index)}
											defaultPosition={{ x: 175, y: 10 }}
										>
											<div
												key={elem.messageId}
												className="d-flex flex-column draggable-component draggable-table-component-container"
												style={{
													zIndex:
														elem.addClass === "bringOnTop"
															? componentsWindow.length
															: index,
													// zIndex: index,
													bottom:
														zone === undefined
															? this.props.heightFromBottom === "300px"
																? "360px"
																: "90px"
															: "",
													top: zone === undefined ? "" : isMobile ? "0px" : top,
													left:
														zone === undefined ? "" : isMobile ? "0px" : left,
												}}
											>
												<div className="d-flex flex-row justify-content-between align-items-center mini-window-header">
													<div className="d-flex draggable-icon-container">
														<img
															className="draggable-icon"
															src="/offlinelms/img/move-icon@2x.png"
															alt="draggable-icon"
														/>
													</div>
													<WindowMinClose
														className="non-grabbale-component"
														windowElem={elem}
														index={index}
														chat={chat}
														responseMessageType={
															MessageTypeConstants.MESSAGE_TYPE_TABLE_RESPONSE
														}
														minimizeWindow={this.minimizeWindow}
														closeWindow={this.closeWindow}
														iconType="minimize-icon"
													/>
												</div>
												<div className="nonGrabbale-body non-grabbale-component">
													<ChatMessageTableForWindow
														componentIndex={index}
														background={background}
														chat={chat}
														linkData={this.props.linkData}
														sendMessage={sendAMessage}
														hasCards={this.props.hasCards}
														makeTheTableMinimize={this.makeTheComponentMinimize}
													/>
												</div>
												<div className="d-flex flex-row justify-content-between align-items-center mini-window-header border-bottom-radius-10 w-100">
													<div className="d-flex draggable-icon-container">
														<img
															className="draggable-icon"
															src="/offlinelms/img/move-icon@2x.png"
															alt="draggable-icon"
														/>
													</div>
												</div>
											</div>
										</Draggable>
									);
								}
							} else if (elem.messageType === "tracking_view_message") {
								if (elem.minimize) {
									return (
										<div
											key={index}
											className="d-flex flex-column draggable-tracking-view-min-container responsive-draggable-card"
											style={{
												bottom: this.props.heightFromBottom,
												left:
													!isMobile && index === 0
														? "40px"
														: index * 265 + "px",
											}}
											onClick={(e) => this.minimizeWindow(elem, index)}
										>
											<div
												className="d-flex flex-row justify-content-between align-items-center mini-window-header"
												style={{ border: 0 }}
											>
												<WindowTitle title={elem.options.title} />
												<WindowMinClose
													className="non-grabbale-component"
													windowElem={elem}
													index={index}
													chat={chat}
													responseMessageType={
														MessageTypeConstants.MESSAGE_TYPE_TRACKING_VIEW_RESPONSE
													}
													minimizeWindow={this.minimizeWindow}
													closeWindow={this.closeWindow}
													iconType="maximize-icon"
												/>
											</div>
										</div>
									);
								} else {
									return (
										<Draggable
											bounds="parent"
											key={index}
											allowAnyClick={true}
											enableUserSelectHack={false}
											cancel=".non-grabbale-component"
											onStop={() => this.bringToTop(index)}
										>
											<div
												key={index}
												className="d-flex flex-column draggable-component draggable-tracking-view-component-container responsive-draggable-card"
												style={{
													zIndex:
														elem.addClass === "bringOnTop"
															? componentsWindow.length
															: index,
													// zIndex: index,
													bottom:
														zone === undefined
															? this.props.heightFromBottom === "300px"
																? "360px"
																: "90px"
															: "",
													top: zone === undefined ? "" : isMobile ? "0px" : top,
													left:
														zone === undefined ? "" : isMobile ? "0px" : left,
												}}
											>
												<div className="d-flex flex-row justify-content-between align-items-center mini-window-header">
													<div className="d-flex draggable-icon-container">
														<img
															className="draggable-icon"
															src="/offlinelms/img/move-icon@2x.png"
															alt="draggable-icon"
														/>
													</div>
													<WindowMinClose
														className="non-grabbale-component"
														windowElem={elem}
														index={index}
														chat={chat}
														responseMessageType={
															MessageTypeConstants.MESSAGE_TYPE_TRACKING_VIEW_RESPONSE
														}
														minimizeWindow={this.minimizeWindow}
														closeWindow={this.closeWindow}
														iconType="minimize-icon"
													/>
												</div>
												<div className="nonGrabbale-body non-grabbale-component">
													<ChatMessageTrackingForWindow
														background={background}
														chat={chat}
														sendMessage={sendAMessage}
													/>
												</div>
												<div className="d-flex flex-row justify-content-between align-items-center mini-window-header border-bottom-radius-10 w-100">
													<div className="d-flex draggable-icon-container">
														<img
															className="draggable-icon"
															src="/offlinelms/img/move-icon@2x.png"
															alt="draggable-icon"
														/>
													</div>
												</div>
											</div>
										</Draggable>
									);
								}
							} else if (elem.messageType === "container") {
								if (elem.minimize) {
									return (
										<div
											key={index}
											className="d-flex flex-column draggable-container-min-conatiner responsive-draggable-card"
											style={{
												position: isMobile ? "unset" : "absolute",
												height: " 50px",
												maxWidth: "210px",
												borderRadius: "10px",
												backgroundColor: "#FFFFFF",
												boxShadow: "0 0 6px 0 rgba(0,0,0,0.2)",
												justifyContent: "center",
												bottom: this.props.heightFromBottom,
												left:
													!isMobile && index === 0
														? "40px"
														: isMobile
														? index + "px"
														: index * 265 + "px",
											}}
											onClick={(e) => this.minimizeWindow(elem, index)}
										>
											<div
												className="d-flex flex-row justify-content-between align-items-center mini-window-header"
												style={{ border: 0 }}
											>
												<WindowTitle title={elem.options.title} />
												<WindowMinClose
													className="non-grabbale-component"
													windowElem={elem}
													index={index}
													chat={chat}
													responseMessageType={
														MessageTypeConstants.MESSAGE_TYPE_CONTAINER_RESPONSE
													}
													minimizeWindow={this.minimizeWindow}
													closeWindow={this.closeWindow}
													iconType="maximize-icon"
												/>
											</div>
										</div>
									);
								} else {
									{
										/* console.log(
										"placement ===>",
										index,
										" ======>",
										this.props.heightFromBottom,
										top,
										left
									); */
									}
									return (
										<Draggable
											bounds="parent"
											key={index}
											allowAnyClick={true}
											enableUserSelectHack={false}
											cancel=".non-grabbale-component"
											onStop={() => this.bringToTop(index)}
										>
											<div
												key={index}
												className="d-flex flex-column draggable-component responsive-draggable-card"
												style={{
													maxWidth: "500px",
													boxShadow: "0 0 6px 0 rgba(0,0,0,0.2)",
													zIndex:
														elem.addClass === "bringOnTop"
															? componentsWindow.length
															: index,
													// zIndex: index,
													bottom:
														zone === undefined
															? this.props.heightFromBottom === "300px"
																? "360px"
																: "90px"
															: "",
													top: zone === undefined ? "" : isMobile ? "0px" : top,
													left:
														zone === undefined ? "" : isMobile ? "0px" : left,
												}}
											>
												<div className="d-flex flex-row justify-content-between align-items-center mini-window-header">
													<div className="d-flex draggable-icon-container">
														<img
															className="draggable-icon"
															src="/offlinelms/img/move-icon@2x.png"
															alt="draggable-icon"
														/>
													</div>
													<WindowMinClose
														className="non-grabbale-component"
														windowElem={elem}
														index={index}
														chat={chat}
														responseMessageType={
															MessageTypeConstants.MESSAGE_TYPE_CONTAINER_RESPONSE
														}
														minimizeWindow={this.minimizeWindow}
														closeWindow={this.closeWindow}
														iconType="mninimize-icon"
													/>
												</div>
												<div className="nonGrabbale-body non-grabbale-component">
													<ChatMessageTabFormForWindow
														windowsId={elem.messageId}
														background={background}
														chat={chat}
														selectedTab={elem.selectedTab}
														conversationId={this.props.conversationId}
														completed={this.props.completed}
														cancelForm={this.cancelForm}
														closeForm={this.cancelForm}
														sendMessage={sendAMessage}
														hasCards={this.props.hasCards}
														resetSelectedConversationFormInWindow={
															this.props.resetSelectedConversationFormInWindow
														}
														updateFieldsComponentInContainer={
															this.props.updateFieldsComponentInContainer
														}
														setFormInWindow={this.props.setFormInWindow}
													/>
												</div>

												<div className="d-flex flex-row justify-content-between align-items-center mini-window-header border-bottom-radius-10 w-100">
													<div className="d-flex draggable-icon-container">
														<img
															className="draggable-icon"
															src="/offlinelms/img/move-icon@2x.png"
															alt="draggable-icon"
														/>
													</div>
												</div>
											</div>
										</Draggable>
									);
								}
							} else if (elem.messageType === "video_call") {
								if (elem.minimize) {
									return (
										<div
											key={index}
											className="d-flex flex-column draggable-component responsive-draggable-card"
											style={{
												height: "50px",
												maxWidth: "210px",
												borderRadius: "10px",
												backgroundColor: "#FFFFFF",
												boxShadow: "0 0 6px 0 rgba(0,0,0,0.2)",
												justifyContent: "center",
												bottom: this.props.heightFromBottom,
												left:
													!isMobile && index === 0
														? "40px"
														: index * 265 + "px",
											}}
											onClick={(e) => this.minimizeWindow(elem, index)}
										>
											<div
												className="d-flex flex-row justify-content-between align-items-center mini-window-header"
												style={{ border: 0 }}
											>
												<WindowTitle title={elem.options.title} />
												<WindowMinClose
													className="non-grabbale-component"
													windowElem={elem}
													index={index}
													chat={chat}
													responseMessageType={
														MessageTypeConstants.MESSAGE_TYPE_VIDEO_CALL_RESPONSE
													}
													minimizeWindow={this.minimizeWindow}
													closeWindow={this.closeWindow}
													iconType="maximize-icon"
												/>
											</div>
										</div>
									);
								} else {
									let videoSessionId = R.pathOr(
										null,
										["message", "videoSessionId"],
										elem
									);
									let message_text = R.pathOr(null, ["message", "text"], elem);
									let waitingText = message_text
										? `<p className="wait-text-main">${message_text}</p>`
										: `<p className="wait-text-main">Thanks for your patience. We are connecting you to the next available medical staff</p>`;

									let disableVideo = R.not(
										R.pathOr(false, ["message", "video"], elem)
									);

									return (
										<div
											key={index}
											className="draggable-modal d-flex align-items-center justify-content-center"
										>
											<Draggable
												bounds="parent"
												key={index}
												allowAnyClick={false}
												enableUserSelectHack={false}
												cancel=".non-grabbale-component"
												onStop={() => this.bringToTop(index)}
												positionOffset={this.state.positionOffset}
											>
												<div
													key={index}
													className="d-flex flex-column align-items-center justify-content-between"
												>
													<div className="d-flex flex-row justify-content-between align-items-center mini-window-header w-100">
														<div className="d-flex draggable-icon-container">
															<img
																className="draggable-icon"
																src="/offlinelms/img/move-icon@2x.png"
																alt="draggable-icon"
															/>
														</div>
														<WindowMinClose
															className="non-grabbale-component"
															windowElem={elem}
															index={index}
															chat={chat}
															responseMessageType={
																MessageTypeConstants.MESSAGE_TYPE_VIDEO_CALL_RESPONSE
															}
															minimizeWindow={this.minimizeWindow}
															closeWindow={this.closeWindow}
															iconType="mninimize-icon"
														/>
													</div>
													<div className="nonGrabbale-body non-grabbale-component">
														<MeetingRoom
															sessionInfo={{
																userId: elem.userId,
																bot: elem.bot,
																conversationId: elem.conversation,
															}}
															callRejected={this.props.callRejected}
															disableVideo={disableVideo}
															meetingId={videoSessionId}
															options={elem.options}
															waitingText={waitingText}
															onMeetingIdCreated={this.sendVideoId}
															onError={(id, errorMessage) => {
																console.log(
																	"Handle Error Message SID",
																	errorMessage
																);
																this.errorHandleVideoMsg(
																	elem.options.controlId,
																	"error",
																	errorMessage,
																	id
																);
															}}
															onMeetingEnded={(id) => {
																console.log("Sending Meeting Ended to Bot", id);
																this.sendVideoBotMessage(
																	elem.options.controlId,
																	"callEnd",
																	id,
																	index
																);
																this.closeWindow(
																	index,
																	MessageTypeConstants.MESSAGE_TYPE_TABLE_RESPONSE,
																	chat.options,
																	"videoChat"
																);
															}}
															onMeetingStarted={(id) => {
																console.log("CALL ACTIVE");
																console.log(
																	"Sending Meeting Started  CALL ACTIVE to Bot",
																	id
																);
																this.sendVideoBotMessage(
																	elem.options.controlId,
																	"callActive",
																	id,
																	index
																);
															}}
														/>
													</div>
													<div className="d-flex flex-row justify-content-between align-items-center mini-window-header border-bottom-radius-10 w-100">
														<div className="d-flex draggable-icon-container">
															<img
																className="draggable-icon"
																src="/offlinelms/img/move-icon@2x.png"
																alt="draggable-icon"
															/>
														</div>
													</div>
												</div>
											</Draggable>
										</div>
									);
								}
							}
						})}
				</div>

				<div>
					<div>
						{this.state.componentsOpen ? (
							<div
								className="toggle-mobile-view-component toggle-mobile-view-component-open"
								onClick={this.hideAllComponents}
							>
								<img src="/offlinelms/img/collapse-blue-arrow-up@2x.png" alt="up-arrow" />
							</div>
						) : (
							<div
								className="toggle-mobile-view-component toggle-mobile-view-component-close"
								onClick={this.showAllComponents}
							>
								<img
										src="/offlinelms/img/collapse-blue-arrow-down@2x.png"
									alt="down-arrow"
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}
const mapActionToProps = {
	removeFromWindow: removeFromWindow,
	setFormInWindow,
	sendAMessage: sendAMessage,
	setWindowMinMax: setWindowMinMax,
	resetSelectedConversationFormInWindow,
	resetComponentInWindowExceptForm,
	removeChatFieldWindow: removeChatFieldWindow,
	removeVideoText: removeVideoText,
	updateFieldsComponentInContainer: updateFieldsComponentInContainer,
	removeGenericErrorMsg: removeGenericErrorMsg,
	setWindowOnTop: setWindowOnTop,
};

const mapDataToProps = (state) => {
	const botSubscriptions = (state.user && state.user.botSubscriptions) || [];
	// console.log("data chatFieldWindow", state.chats.chatFieldWindow);

	return {
		componentInWindow: state.chats.componentInWindow,
		chatFieldWindow: state.chats.chatFieldWindow,
		conversationId: state.chats.selectedConversation.conversationId,
		formInPopup: state.chats.formInPopup,
		botName: !_.isEmpty(botSubscriptions)
			? (botSubscriptions[0] && botSubscriptions[0].botName) || null
			: null,
		chatLog: state.chats.chatLog,
	};
};

export default connect(mapDataToProps, mapActionToProps)(ComponentInWindow);
