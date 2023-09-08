import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { Modal, ModalBody, Button } from "reactstrap";
import ReactImageFallback from "react-image-fallback";
import {
	IntToMessageTypeConstants,
	MessageTypeConstants,
} from "../../Services/Message";
import CardInMap from "./cards/maps/CardInMap";
import ChatInputBox from "./ChatInputBox";
import ChatSearchBox from "./ChatSearchBox";
import ChatMessages from "./ChatMessages";
import ChatContentView from "./content/ChatContentView";
import _ from "lodash";
import ComponentInWindow from "./content/ComponentInWindow";
import {
	sendAMessage,
	closeSmartReply,
	openContent,
	closeSearchBox,
	sendSearchBoxQuery,
	setScrollPositionForConversation,
	fetchArchivedMessages,
	setFormInWindow,
	showChatNonConversational,
	removeCradsFromShowOnlyCards,
	removeHTMLCotent,
	removeNotificationMessage,
	setVideoText,
	setRing,
	removeRing,
	removeURLCotent,
} from "../../State/actions/chats";
import Spinner from "react-spinkit";
import "../Spinner/Spinner.css";
import HTMLCard from "./cards/maps/HTMLCard";
import {
	getStoredForm,
	storeOpenForm,
	removeOpenForm,
} from "../../Services/StorageService";
import PlainNotification from "./chatNotificationPopup/PlainNotification";
import NotificationWithAction from "./chatNotificationPopup/NotificationWithAction";
import NestedDropdownMenuButton from "../NestedDropdown/NestedDropdownMenuButton";
import AudioElement from "../../Utils/AudioElement";
import AudioRecorder from "../../Utils/AudioRecorder";
import { AirlinesAdsSidebar } from "../Interactions/content/AIAdsExperimental/AirlinesAds";

import {
	getFileUrl,
	getFileName,
	getFileUsingUrl,
} from "../../Services/FilesService";

import { MapDrawActionProvider } from "../Maps/MapEditorActionContext";
import AirplaneLoader from "../Spinner/AirplaneLoader";
import Config from "../../Utils/Config";
import FileServiceClient from "../../Services/Clients/FileServiceClient";

import MapComponent from "../Maps/MapComponent";

const R = require("ramda");

let refreshIntervalId;

const FIVE_SEC = 5 * 1000;

class NonConversationalChatView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			adjustedWidth: -1,
			showHtmlPopUp: false,
			isAnonymousUser: false,
			showCards: true,
			messages: [],
			background: {},
			planeRoutes: [],
			polylines: [],
			chatButtonHidden: true,
			showOnlyCards: [],
			showHTMLContent: "",
			showCardModal: false,
			cardModalObject: {},
			chatNotifications: [],
			notificationCount: 0,
			showIncomingCall: false,
			callAccepted: false,
			tempLastMessage: null,
			callRejected: false,
			recordAudio: false,
			recordingInProgress: false,
			file: null,
			conversationId: null,
			cardsDirect: [],
			mapRef: null,
			backgroundUrl: null,
			notificationMessage: null,
			showNotificationPopup: false,
		};
	}

	componentDidMount() {
		this.interval = setInterval(this.updateNotificationMessages, 6000);
		AudioElement.loadAudio();
		// axios({
		//   method: "POST",
		//   url: "https://viatorapi.sandbox.viator.com/service/search/products",
		//   data: JSON.stringify({
		//     destId: 737,
		//     subCatId: 12,
		//     sortOrder: "REVIEW_AVG_RATING_D",
		//     topX: "1-20",
		//   }),
		//   headers: {
		//     "accept-language": "en",
		//     "content-type": "application/json",
		//     "exp-api-key": "61ea5257-210a-4c02-8aea-2403e3da92dc",
		//   },
		// })
		//   .then((response) => {
		//     console.log(response);
		//     const cards = response.data.data.map((card) => ({
		//       cardId: (Math.floor(Math.random() * 90000) + 10000).toString(10),
		//       description: card.shortDescription,
		//       design: "big",
		//       imageUrl: card.thumbnailURL,
		//       thumbnailPictureUrl: card.thumbnailURL,
		//       title: card.title,
		//       data: {
		//         Destination: "Himachal Pradesh Uttarakhand",
		//         Price: card.priceFormatted,
		//         Duration: "10 Hrs",
		//         Supplier: card.supplierName,
		//       },
		//     }));
		//     console.log(cards);
		//     this.setState({ cardsDirect: cards });
		//   })
		//   .catch((err) => console.log("Error Axios", err));
		let { selectedDomain } = this.props;
		let selectedDomainObj = _.cloneDeep(selectedDomain);
		let bgUrl = selectedDomainObj?.backgroundUrl
			? R.prop("contentURL", Config) + selectedDomainObj.backgroundUrl
			: "/img/welcomescreen-background.png";

		this.setState({
			backgroundUrl: bgUrl,
		});
	}

	getNotificationCount = (chatNotificationList) => {
		const visibleNotifications = chatNotificationList.filter(
			(notification) => notification.show
		);
		return visibleNotifications.length;
	};

	updateNotificationMessages = () => {
		if (this.state.notificationCount > 0) {
			const notificationMessages = this.state.chatNotifications.map(
				(message) => {
					if (Date.now() > message.createdOn + FIVE_SEC) {
						delete message.show;
					}
					return message;
				}
			);
			this.setState({
				chatNotifications: notificationMessages,
				notificationCount: this.getNotificationCount(notificationMessages),
			});
		}
	};

	dismissNotification = (messageId) => {
		const updatedNotification = this.state.chatNotifications.map(
			(notification) => {
				if (notification.messageId === messageId) {
					delete notification.show;
				}
				return notification;
			}
		);
		this.setState({
			chatNotifications: updatedNotification,
			notificationCount: this.getNotificationCount(updatedNotification),
		});
	};

	dismissAllNotification = () => {
		const updatedChatNotifications = this.state.chatNotifications.map(
			(notification) => {
				delete notification.show;
				return notification;
			}
		);
		this.setState({
			chatNotifications: updatedChatNotifications,
			notificationCount: 0,
		});
	};

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	hideHTMLPopup = () => {
		this.props.removeHTMLCotent();
		this.props.removeNotificationMessage();
		this.setState({
			showHtmlPopUp: false,
			showNotificationPopup: false,
		});
	};

	hideCardModal = () => {
		this.setState((prevState) => ({
			showCardModal: !prevState.showCardModal,
		}));
	};

	toggleChat = () => {
		this.props.showChatNonConversational(!this.props.showChat);
		const updatedChatNotifications = this.state.chatNotifications.map(
			(notification) => {
				delete notification.show;
				return notification;
			}
		);
		this.setState({
			chatNotifications: updatedChatNotifications,
			notificationCount: 0,
		});
	};

	toggleCard = () => {
		this.setState({
			showCards: !this.state.showCards,
		});
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		// console.log("all new props ======= for geoJSON ", nextProps.background);

		if (nextProps.chatButtonHidden !== prevState.chatButtonHidden) {
			return { chatButtonHidden: nextProps.chatButtonHidden };
		}

		if (
			!_.isEqual(nextProps.background, prevState.background) ||
			Object.keys(nextProps.background).length !==
			Object.keys(prevState.background).length ||
			(Object.keys(nextProps.background).length > 0 &&
				Object.keys(prevState.background).length === 0)
		) {
			return { background: { ...nextProps.background } };
		}

		if (nextProps.isAnonymousUser !== prevState.isAnonymousUser) {
			return { isAnonymousUser: nextProps.isAnonymousUser };
		}

		if (
			nextProps.background &&
			nextProps.background.content &&
			nextProps.background.content.planeRoutes
		) {
			if (
				!_.isEqual(
					nextProps.background.content.planeRoutes,
					prevState.planeRoutes
				)
			) {
				// console.log("this is plan routes ", nextProps.background.content);

				return { planeRoutes: [...nextProps.background.content.planeRoutes] };
			}
		}
		if (
			nextProps.background &&
			nextProps.background.content &&
			nextProps.background.content.polylines
		) {
			if (
				!_.isEqual(nextProps.background.content.polylines, prevState.polylines)
			) {
				return { polylines: [...nextProps.background.content.polylines] };
			}
		}

		if (!_.isEqual(nextProps.showOnlyCards, prevState.showOnlyCards)) {
			return { showOnlyCards: [...nextProps.showOnlyCards] };
		}

		if (nextProps.showHTMLContent !== prevState.showHTMLContent) {
			return {
				showHTMLContent: nextProps.showHTMLContent,
				showHtmlPopUp: true,
			};
		}
		if (nextProps.messages.length !== prevState.messages.length) {
			const tempMessages = [...nextProps.messages];
			const unarchivedMessageList = tempMessages.filter(
				(message) => !message.archived
			);

			const updatedChatNotificationList =
				NonConversationalChatView.getUpdatedChatNotificationList(
					prevState.chatNotifications,
					unarchivedMessageList
				);
			const getNotificationCount = (chatNotificationList) => {
				const visibleNotifications = chatNotificationList.filter(
					(notification) => notification.show
				);
				return visibleNotifications.length;
			};
			return {
				messages: [...tempMessages],
				chatNotifications: updatedChatNotificationList,
				notificationCount: getNotificationCount(updatedChatNotificationList),
			};
		} else return null;
	}

	static getUpdatedChatNotificationList = (
		existingChatNotifications,
		unarchivedMessageList
	) => {
		const isOlderThan5Sec = (message) =>
			Date.now() > message.createdOn + FIVE_SEC;
		const existInCurrentNotificationList = (message) => {
			for (let i = 0; i < existingChatNotifications.length; i++) {
				const notification = existingChatNotifications[i];
				if (notification.messageId === message.messageId) {
					return true;
				}
			}
			return false;
		};
		const chatNotificationList = unarchivedMessageList.filter((message) => {
			if (
				!isOlderThan5Sec(message) &&
				message.messageType === MessageTypeConstants.MESSAGE_TYPE_STRING &&
				typeof message.message === "string" &&
				!message.self &&
				!existInCurrentNotificationList(message)
			) {
				message.show = true;
				return message;
			}
		});

		const updatedChatNotificationList = [
			...existingChatNotifications,
			...chatNotificationList,
		];
		if (!_.isEmpty(updatedChatNotificationList)) {
			return updatedChatNotificationList.sort(function (a, b) {
				return (
					new Date(a.createdOn).getTime() - new Date(b.createdOn).getTime()
				);
			});
		}
		return [];
	};

	componentDidUpdate(prevProps, prevState) {
		if (
			this.props.notificationMessage &&
			this.props.notificationMessage.notificationType &&
			!_.isEqual(
				this.props.notificationMessage,
				prevProps.notificationMessage
			) &&
			(this.props.notificationMessage.notificationType ===
				MessageTypeConstants.MESSAGE_TYPE_STD_NOTIFICATION ||
				this.props.notificationMessage.notificationType ===
				MessageTypeConstants.MESSAGE_TYPE_CRITICAL_NOTIFICATION ||
				this.props.notificationMessage.notificationType ===
				MessageTypeConstants.MESSAGE_TYPE_AUTHORIZATION_REQUEST)
		) {
			this.setState({
				notificationMessage: this.props.notificationMessage,
				showNotificationPopup: true,
			});
		}
		if (
			this.props.selectedDomain &&
			!_.isEqual(this.props.selectedDomain, prevProps.selectedDomain)
		) {
			let { selectedDomain } = this.props;
			let selectedDomainObj = _.cloneDeep(selectedDomain);
			let bgUrl = selectedDomainObj?.backgroundUrl
				? R.prop("contentURL", Config) + selectedDomainObj.backgroundUrl
				: "/img/welcomescreen-background.png";
			this.setState({
				backgroundUrl: bgUrl,
			});
		}
		if (
			!_.isEqual(prevProps.background, prevState.background) ||
			Object.keys(prevProps.background).length !==
			Object.keys(prevState.background).length ||
			(Object.keys(prevProps.background).length > 0 &&
				Object.keys(prevState.background).length === 0)
		) {
			this.setState({ background: { ...prevProps.background } });
		}
		if (prevProps.chatButtonHidden !== prevState.chatButtonHidden) {
			this.setState({ chatButtonHidden: prevProps.chatButtonHidden });
		}
		if (prevProps.isAnonymousUser !== prevState.isAnonymousUser) {
			this.setState({ isAnonymousUser: prevProps.isAnonymousUser });
		}
		if (
			prevProps.background &&
			prevProps.background.content &&
			prevProps.background.content.planeRoutes
		) {
			if (
				!_.isEqual(
					prevProps.background.content.planeRoutes,
					prevState.planeRoutes
				)
			) {
				this.setState({
					planeRoutes: [...prevProps.background.content.planeRoutes],
				});
			}
		}
		if (
			prevProps.background &&
			prevProps.background.content &&
			prevProps.background.content.polylines
		) {
			if (
				!_.isEqual(prevProps.background.content.polylines, prevState.polylines)
			) {
				this.setState({
					polylines: [...prevProps.background.content.polylines],
				});
			}
		}
		if (
			prevProps.messages.length > 0 &&
			prevProps.messages.length !== prevState.messages.length
		) {
			if (!_.isEqual(prevProps.messages, prevState.messages)) {
				const messageArr = [...prevProps.messages];
				const diff = _.differenceWith(
					prevProps.messages,
					prevState.messages,
					_.isEqual
				);
				const lastMessage = (!_.isEmpty(diff) && diff[0]) || null;
				console.log("last message to see ==>", lastMessage);
				if (
					lastMessage &&
					lastMessage.messageType &&
					(lastMessage.messageType ===
						MessageTypeConstants.MESSAGE_TYPE_FORM2 ||
						lastMessage.messageType ===
						MessageTypeConstants.MESSAGE_TYPE_STRIPE ||
						lastMessage.messageType ===
						MessageTypeConstants.MESSAGE_TYPE_TABLE ||
						lastMessage.messageType ===
						MessageTypeConstants.MESSAGE_TYPE_TRACKING_VIEW_MESSAGE ||
						lastMessage.messageType ===
						MessageTypeConstants.MESSAGE_TYPE_CONTAINER ||
						lastMessage.messageType ===
						MessageTypeConstants.MESSAGE_TYPE_VIDEO_CALL ||
						lastMessage.messageType === MessageTypeConstants.MESSAGE_TYPE_CSV ||
						lastMessage.messageType ===
						MessageTypeConstants.MESSAGE_TYPE_SOUND ||
						lastMessage.messageType ===
						MessageTypeConstants.MESSAGE_TYPE_GEOFENCE)
				) {
					// console.log("last message to see =====", lastMessage);

					// Ignore Message
					if (
						lastMessage.messageType ===
						MessageTypeConstants.MESSAGE_TYPE_VIDEO_CALL &&
						_.isArray(lastMessage.message)
					) {
						return;
					}

					if (
						lastMessage.messageType === MessageTypeConstants.MESSAGE_TYPE_CSV
					) {
						const fileName = lastMessage.message;
						getFileUsingUrl(
							getFileUrl(
								this.props.selectedConversation.conversationId,
								lastMessage.message
							)
						).then((url) => {
							const a = document.createElement("a");
							a.href = url;
							a.download = fileName;
							a.click();
							window.URL.revokeObjectURL(url);
						});
						return;
					}

					if (
						lastMessage.messageType === MessageTypeConstants.MESSAGE_TYPE_SOUND
					) {
						this.playAudioOnce();
					}
					// text message Action - Vdeo Call

					if (
						lastMessage &&
						lastMessage.message &&
						lastMessage.message.action === "text"
					) {
						return this.props.setVideoText({
							textMessage: lastMessage.message.text,
						});
					}
					if (
						lastMessage &&
						lastMessage.message &&
						lastMessage.message.action === "ringStart"
					) {
						this.setState({
							callRejected: false,
						});
						return this.props.setRing();
					}
					if (
						lastMessage &&
						lastMessage.message &&
						lastMessage.message.action === "ringStop"
					) {
						this.setState({ showIncomingCall: false });
						return this.props.removeRing();
					}
					if (
						lastMessage &&
						lastMessage.message &&
						lastMessage.message.action === "pickup"
					) {
						console.log("RECEIVED MESSAGE :::: PICKUP", lastMessage);

						this.playAudio();

						return this.setState({
							showIncomingCall: true,
							tempLastMessage: lastMessage,
							callRejected: false,
						});
					}
					if (
						lastMessage &&
						lastMessage.message &&
						lastMessage.message.action === "callRejected"
					) {
						console.log("RECEIVED MESSAGE :::: CALL REJECTED", lastMessage);
						return this.setState({
							callRejected: true,
						});
					}
					// Default case
					const keyLast = lastMessage.messageId;
					const lastMsgObj = { ...getStoredForm() };
					lastMsgObj[keyLast] = lastMessage;
					storeOpenForm(lastMsgObj);
					this.props.setFormInWindow(lastMessage);
					this.setState({
						callRejected: false,
					});
				} else {
					removeOpenForm();
				}
			}
			if (!_.isEqual(prevProps.showOnlyCards, prevState.showOnlyCards)) {
				this.setState({ showOnlyCards: [...prevProps.showOnlyCards] });
			}
			if (prevProps.showHTMLContent !== prevState.showHTMLContent) {
				this.setState({
					showHTMLContent: prevProps.showHTMLContent,
					showHtmlPopUp: true,
				});
			}
			if (
				this.props.notificationMessage &&
				!_.isEmpty(this.props.notificationMessage) &&
				!_.isEqual(
					this.props.notificationMessage,
					prevState.notificationMessage
				)
			) {
				this.setState({
					notificationMessage: prevProps.notificationMessage,
					showNotificationPopup: true,
				});
			}
			if (this.props.urlContent) {
				window.open(this.props.urlContent, "_blank");
				this.props.removeURLCotent();
			}
		} else {
			removeOpenForm();
		}
	}

	playAudioOnce = () => {
		AudioElement.playRing();
	};

	setMapReference = (map) => this.setState({ mapRef: map });

	playAudio = () => {
		refreshIntervalId = setInterval(() => {
			AudioElement.playRing();
		}, 5000);
	};

	playBeep = () => {
		AudioElement.playBeep();
	};

	stopAudio = () => {
		AudioElement.pauseRing();
	};

	changingMapPostion = (coordinateData) => {
		const oldData = { ...this.state.background };
		oldData.content.region = { ...coordinateData };

		this.setState({ background: { ...oldData } });
	};

	changeTheBackground = (background) => {
		let { type, content } = background;
		let boundPoints = [];
		// console.log("data in map ", background);

		if (!type) return;

		let my_view;
		switch (IntToMessageTypeConstants[type]) {
			case MessageTypeConstants.MESSAGE_TYPE_MAP: {
				let { planeRoutes } = this.state;
				const source = this.state.background?.content?.options?.source;
				let newPlaneRoutes =
					this.props.background &&
						this.props.background.content &&
						this.props.background.content.planeRoutes
						? [...this.props.background.content.planeRoutes]
						: [];
				const { markers, region, polylines, geoJsonUrl } = content;
				const { fitBounds } = region;
				if (!content) {
					content = {};
				}
				if (!fitBounds) {
					boundPoints = [];
				}
				if (!planeRoutes) {
					planeRoutes = [];
				}
				if (!markers) {
					content.markers = [];
				}
				if (!region) {
					content.region = {};
				}

				if (!polylines) {
					content.polylines = [];
				}
				if (!newPlaneRoutes) {
					newPlaneRoutes = [];
				}

				if (fitBounds) {
					const firstCord = [];
					const secCord = [];
					firstCord.push(fitBounds.sw.longitude);
					firstCord.push(fitBounds.sw.latitude);
					secCord.push(fitBounds.ne.longitude);
					secCord.push(fitBounds.ne.latitude);
					boundPoints.push(firstCord);
					boundPoints.push(secCord);
				}
				// console.log("checking fitbounds ", content);

				my_view = (
					<Suspense fallback={<div></div>}>
						<div style={{ width: "100%", height: "100%" }} tabIndex="0">
							<MapComponent
								className="mapViewContainer"
								ariaLabel="map-view-container"
								tabIndex="0"
								width={"100%"}
								height={"100%"}
								sendAMessage={this.props.sendAMessage}
								fitBounds={fitBounds}
								geoJsonUrl={content.geoJsonUrl || null}
								boundPointsCord={boundPoints}
								planeRoutes={newPlaneRoutes ? [...newPlaneRoutes] : []}
								options={content.options || {}}
								latitude={region ? region.latitude : null}
								longitude={region ? region.longitude : null}
								zoom={region && region.zoom ? region.zoom : 9}
								markers={markers || []}
								polyLines={polylines || []}
								markerSize={20}
								markerColor={"#00A7D6"}
								transitionDuration={region.transitionDuration || 4000}
								onchangeMapPosition={this.changingMapPostion}
								source={source}
								setMapReference={this.setMapReference}
							/>
						</div>
					</Suspense>
				);

				break;
			}

			case MessageTypeConstants.MESSAGE_TYPE_IMAGE:
				my_view = (
					<div style={{ width: "100%", height: "100%" }} tabIndex="0">
						<img
							style={{ width: "100%", height: "100%" }}
							src={content}
							alt="bg-img"
						/>
					</div>
				);
				break;
			default:
				my_view = (
					<div style={{ width: "100%", height: "100%" }} tabIndex="0">
						<img
							src="/img/welcomescreen-background.png"
							style={{
								backgroundSize: "cover",
								backgroundPosition: "center",
								backgroundRepeat: "no-repeat",
							}}
							alt="no-bg"
						/>
					</div>
				);
				break;
		}
		return my_view;
	};

	checkURL = (url) => {
		if (!url) {
			return;
		}

		return url.match(/\.(jpeg|jpg|gif|png|svg)$/) !== null;
	};

	sendAction = (action, data) => {
		// console.log("action to take :: ", action);

		this.props.sendAMessage({
			message: action,
			messageType: MessageTypeConstants.MESSAGE_TYPE_STRING,
		});
		// this.props.removeCradsFromShowOnlyCards(data);
	};

	acceptCall = () => {
		console.log("Accept the Video Call");

		// this.props.removeRing();
		clearInterval(refreshIntervalId);
		this.stopAudio();

		this.props.setFormInWindow(this.state.tempLastMessage);
		this.setState({ tempLastMessage: null, showIncomingCall: false });
	};

	rejectCall = () => {
		this.props.removeRing();
		const controlId = this.state.tempLastMessage.message.controlId;
		const action = {
			controlId,
			action: "callRejected",
		};
		this.props.sendAMessage({
			message: action,
			messageType: MessageTypeConstants.MESSAGE_TYPE_VIDEO_CALL_RESPONSE,
		});
		this.setState({ showIncomingCall: false });
		clearInterval(refreshIntervalId);
		this.stopAudio();
	};

	stopRecording = (e) => {
		e.preventDefault();
		this.state.voiceMessage.stopRecording();
	};

	createMarkup = (banner) => {
		return { __html: banner };
	};

	recordVoiceMessage = (e) => {
		e.preventDefault();
		const voiceMessage = new AudioRecorder();
		this.setState({
			recordAudio: true,
			recordingInProgress: true,
			voiceMessage,
		});
		voiceMessage.startRecording().then(async (file) => {
			this.setState({ recordingInProgress: false, file });
			console.log("Recorded File", file);
		});
	};

	onFileUploadProgress = (progress) => {
		console.log("Uploading File...", progress);
	};

	sendVoiceMail = (e) => {
		e.preventDefault();
		const { sendMessage, selectedConversation } = this.props;
		const { file } = this.state;
		if (!file) {
			console.log("No File to send");
			return;
		}

		const fileName = `${getFileName()}.wav`;
		// fileName += file.name.substr(
		//   file.name.lastIndexOf("."),
		//   file.name.length - 1
		// );
		this.setState({ uploading: true });
		FileServiceClient.uploadLargeFile({
			file: file,
			conversationId: selectedConversation.conversationId,
			fileName: fileName,
		})
			.then((res) => {
				this.setState({ uploading: false });
				return getFileUrl(selectedConversation.conversationId, fileName);
			})
			.then((fileUrl) => {
				// sendMessage(fileUrl, type);
				// this.props.onCompleteHook();
				console.log("File has been uploaded succesfully");
			})
			.catch((error) => {
				console.log("Error uploading file", error);
				this.setState({ uploading: false });
				// todo handle error
			});
	};

	displayCardModal = (title, modalSize, description, image) => {
		const cardModalObj = {
			size: modalSize,
			title: title,
			description: description,
			image: image,
		};

		// console.log("data to display ", cardModalObj);

		this.setState({
			showCardModal: true,
			cardModalObject: { ...cardModalObj },
		});
	};

	setbackGroundUrl = () => {
		if (this.state.backgroundUrl) {
			if (this.state.backgroundUrl === "white") {
				return "#ffffff";
			} else return `url(${this.state.backgroundUrl}) no-repeat center`;
		} else {
			return 'url("/img/welcomescreen-background.png") no-repeat center';
		}
	};

	render() {
		// console.log("checking the message", this.state);

		const {
			userId,
			selectedConversation,
			sendAMessage,
			conversationPaginationParameterMap,
			contentMessage,
			smartReplyMessage,
			disableMessageInput,
			mainChatHeight,
			closeSmartReply,
			openContent,
			closeContent,
			linkData,
			showWaitSpinner,
			contacts,
			searchBoxMessage,
			closeSearchBox,
			sendSearchBoxQuery,
			fetchArchivedMessages,
			shouldScrollToTop,
		} = this.props;

		const {
			messages,
			background,
			showOnlyCards,
			chatNotifications,
			notificationCount,
		} = this.state;
		// let chatNotificationsDiv = null;
		// console.log("show cards ", showOnlyCards);
		let chatPopupClassName = "chat-popup";
		if (this.state.chatButtonHidden) {
			chatPopupClassName = chatPopupClassName + " without-chat-icon";
		} else {
			chatPopupClassName = chatPopupClassName + " with-chat-icon";
		}
		const chatNotificationsDiv = [];
		if (!_.isEmpty(chatNotifications)) {
			for (let i = 0; i < chatNotifications.length; i++) {
				const notification = chatNotifications[i];
				if (this.state.chatButtonHidden) {
					notification.show &&
						chatNotificationsDiv.push(
							<NotificationWithAction
								key={i}
								notification={notification}
								dismissNotification={this.dismissNotification}
							/>
						);
				} else {
					notification.show &&
						chatNotificationsDiv.push(
							<PlainNotification notification={notification} />
						);
				}
			}
		}
		// console.log("data from props in maps ", background);
		if (!_.isEmpty(background)) {
			let { content } = background;
			// let { planeRoutes } = this.state;

			if (!content) {
				content = {
					cards: [],
					options: {},
				};
			}
			const { cards, options } = content;
			const hasCards = cards && cards.length > 0;
			let showAdsExperimental = false;

			// if (
			//   this.props?.background?.content?.options?.controlId === "airIndiaMap"
			// ) {
			//   showAdsExperimental = true;
			// }
			if (this.props?.background?.content?.options?.adsSidebar) {
				showAdsExperimental = true;
			}

			return (
				<MapDrawActionProvider>
					<div
						className="map-div bg-size-cover"
						style={{
							position: "relative",
							width: "100%",
							height: "100%",
							overflow: "hidden",
							backgroundColor: "rgba(255,255,255,0.4)",
							background: this.setbackGroundUrl(),
							backgroundSize: "cover",
							backgroundPosition: "center",
							backgroundRepeat: "no-repeat",
						}}
					>
						<div style={{ position: "relative", height: "100%" }}>
							{this.changeTheBackground(background)}

							{this.props.menuMessage && (
								<NestedDropdownMenuButton
									menuMessage={this.props.menuMessage}
									navigationBar={this.props.navigationBar}
								/>
							)}

							<div
								className="chat-container-div"
								style={
									this.state.showCards && hasCards
										? { bottom: "285px", zIndex: "999" }
										: { bottom: "35px", zIndex: "999" }
								}
							>
								{this.props.showChat && (
									<div
										className="d-flex flex-column container-showChat"
										style={{
											background: "url('/img/welcomescreen-background.png')",
											backgroundSize: "cover",
											backgroundPosition: "center",
											backgroundRepeat: "no-repeat",
										}}
									>
										<div className="d-flex header-chat-title">
											<span className="chat-title">Assistant</span>
										</div>
										<ChatMessages
											background={background}
											messages={messages}
											conversationPaginationParameterMap={
												conversationPaginationParameterMap
											}
											shouldScrollToTop={shouldScrollToTop}
											height={mainChatHeight}
											conversation={selectedConversation}
											self={userId}
											isContentShown={
												!!contentMessage // leave
											}
											openContent={
												openContent // leave
											}
											linkData={linkData}
											contentMessage={contentMessage}
											closeContent={closeContent}
											smartReplyMessage={
												smartReplyMessage // leave
											}
											sendMessage={sendAMessage}
											closeSmartReply={closeSmartReply}
											showWaitSpinner={showWaitSpinner}
											searchBoxMessage={searchBoxMessage}
											saveContactPopUp={this.props.saveContactPopUp}
											fetchArchivedMessages={fetchArchivedMessages}
										/>

										<div className="sidebar-body-footer d-flex p-3 align-items-center">
											<div className="input-group">
												{!searchBoxMessage && (
													<ChatInputBox
														isAnonymousUser={this.state.isAnonymousUser}
														background={background}
														isContentShown={!!contentMessage}
														contacts={contacts}
														conversation={selectedConversation}
														sendMessage={sendAMessage}
														disable={disableMessageInput}
													/>
												)}
												{searchBoxMessage && (
													<ChatSearchBox
														background={background}
														isContentShown={!!contentMessage}
														searchBoxMessage={searchBoxMessage}
														conversation={selectedConversation}
														sendMessage={sendAMessage}
														disable={disableMessageInput}
														closeSearchBox={closeSearchBox}
														sendSearchBoxQuery={sendSearchBoxQuery}
													/>
												)}
											</div>
										</div>
									</div>
								)}
								{!this.state.chatButtonHidden && (
									<div className="map-chat" onClick={this.toggleChat}>
										{!this.props.showChat ? (
											<div>
												{notificationCount > 0 && (
													<span className={"notification-count"}>
														{notificationCount}
													</span>
												)}
												<img src="/img/map-chat-icon@2x.png" alt="chat-icon" />
											</div>
										) : (
											<img
												style={{ width: "15px", height: "15px" }}
												src="/img/map-chat-close-icon@2x.png"
												alt="close-icon"
											/>
										)}
									</div>
								)}
							</div>
							{!this.props.showChat && (
								<div
									className={chatPopupClassName}
									style={
										this.state.showCards && hasCards
											? { bottom: "335px", zIndex: "999" }
											: { bottom: "85px", zIndex: "999" }
									}
								>
									{this.state.chatButtonHidden && notificationCount > 1 && (
										<div
											className="notification-with-action dismiss-chat-notification"
											onClick={this.dismissAllNotification}
										>
											<span>Dismiss all notifications</span>
										</div>
									)}
									{chatNotificationsDiv}
								</div>
							)}
						</div>

						{showAdsExperimental ? <AirlinesAdsSidebar /> : null}
						<CardsContainer
							hasCards={hasCards}
							content={content}
							state={this.state}
							toggleCard={this.toggleCard}
							cards={cards}
							options={options}
							displayCardModal={this.displayCardModal}
						/>
						{showOnlyCards && showOnlyCards.length > 0 && (
							<div className="card-container-cardsOnly">
								{showOnlyCards.map((data, index) => {
									return (
										<div
											key={index}
											className="card-main"
											onClick={() => this.sendAction(data.action, data)}
										>
											<div
												style={{
													width: "100%",
													height: "100%",
													display: "flex",
													justifyContent: "center",
													alignItems: "center",
													borderRadius: "10px",
													boxShadow: "20px 20px 50px 5px #83888e",
												}}
											>
												{this.checkURL(
													data.thumbnailPictureUrl || data.pictureUrl
												) ? (
													<div className="cardImg-container">
														<ReactImageFallback
															src={data.thumbnailPictureUrl || data.pictureUrl}
															fallbackImage={
																data.defaultImageUrl || data.pictureUrl
															}
															alt="img-card"
														/>
													</div>
												) : (
													<div className="cardTitle-container">
														<h5>
															{data.thumbnailPictureUrl || data.pictureUrl}
														</h5>
													</div>
												)}
												{/* <div className="card-description">
                          {data.description}
                        </div> */}
											</div>
											{/* {data.action && (
                        <div className="card-button">
                          <a
                            onClick={this.sendAction}
                            className="btn btn-sm btn-open"
                          >
                            {data.action}
                          </a>
                        </div>
                      )} */}
										</div>
									);
								})}
							</div>
						)}

						{contentMessage && (
							<ChatContentView
								content={contentMessage}
								style={{ flex: 2 }}
								sendMessage={sendAMessage}
								close={closeContent}
								conversation={selectedConversation}
							/>
						)}
						{Object.keys(this.props.componentInWindow).length > 0 && (
							<ComponentInWindow
								heightFromBottom={
									this.state.showCards && hasCards ? "300px" : "35px"
								}
								linkData={this.props.linkData}
								hasCards={hasCards}
								background={background}
								sendMessage={sendAMessage}
								incomingCallAccepted={this.state.callAccepted}
								callRejected={this.state.callRejected}
								mapRef={this.state.mapRef}
								data={
									this.props.componentInWindow[
									selectedConversation.conversationId
									]
								}
							/>
						)}

						{this.state.showHTMLContent && this.state.showHtmlPopUp && (
							<Modal
								isOpen={this.state.showHtmlPopUp}
								toggle={this.hideHTMLPopup}
								size="lg"
								className="show-html-class-content"
								wrapClassName="show-html-modal-wrap-content"
								modalClassName="show-html-modal-content"
								backdropClassName="show-html-modal-backdrop-content"
								contentClassName="show-html-modal-content-content"
							>
								<div
									className="d-flex flex-row justify-content-end align-items-center mini-window-header"
									style={{ cursor: "auto" }}
								>
									<div className="d-flex flex-row minimize-close-icon-container">
										<a className="close-icon" onClick={this.hideHTMLPopup}>
											<img src="/img/close-icon@2x.png" alt="close-icon" />
										</a>
									</div>
								</div>
								<ModalBody>
									<div
										className="d-flex justify-content-center align-items-center"
										style={{ width: "720px", minHeight: "280px" }}
									>
										<div
											dangerouslySetInnerHTML={this.createMarkup(
												this.state.showHTMLContent
											)}
										/>
									</div>
								</ModalBody>
							</Modal>
						)}
						{this.state.showNotificationPopup &&
							this.state.notificationMessage &&
							!_.isEmpty(this.state.notificationMessage) && (
								<Modal
									isOpen={this.state.showNotificationPopup}
									toggle={this.hideHTMLPopup}
									size="lg"
									className="show-html-class-content"
									wrapClassName="show-html-modal-wrap-content"
									modalClassName="show-html-modal-content"
									backdropClassName="show-html-modal-backdrop-content"
									contentClassName="show-html-modal-content-content"
								>
									<div
										className="d-flex flex-row justify-content-end align-items-center mini-window-header"
										style={{ cursor: "auto" }}
									>
										<div className="d-flex flex-row minimize-close-icon-container">
											<a className="close-icon" onClick={this.hideHTMLPopup}>
												<img src="/img/close-icon@2x.png" alt="close-icon" />
											</a>
										</div>
									</div>
									<ModalBody>
										<div
											className="d-flex justify-content-center align-items-center"
											style={{ minWidth: "320px", minHeight: "50px" }}
										>
											<p>{this.state.notificationMessage.message}</p>
										</div>
									</ModalBody>
								</Modal>
							)}

						{this.state.showCardModal && (
							<Modal
								isOpen={this.state.showCardModal}
								toggle={this.hideCardModal}
								size="sm"
								className="show-html-class-content"
								wrapClassName="show-html-modal-wrap-content"
								modalClassName="show-html-modal-content"
								backdropClassName="show-html-modal-backdrop-content"
								contentClassName="show-html-modal-content-content"
							>
								<ModalBody>
									<div className="d-flex flex-column modal-body-div">
										<div className="image-modal-card">
											<img
												src={this.state.cardModalObject.image}
												alt="bg-card"
											/>
										</div>
										<div className="ttl-desc-modal-card">
											<h2>{this.state.cardModalObject.title}</h2>
											<p>{this.state.cardModalObject.description}</p>
										</div>
									</div>
								</ModalBody>
							</Modal>
						)}
						{this.state.showIncomingCall ? (
							<IncomingCallModal
								showIncomingCall={this.state.showIncomingCall}
								acceptCall={this.acceptCall}
								rejectCall={this.rejectCall}
								callerName={this.state.tempLastMessage.message.text}
							/>
						) : null}
						{this.state.recordAudio ? (
							<AudioRecorder recordAudio={this.state.recordAudio} />
						) : null}
					</div>
				</MapDrawActionProvider>
			);
		} else {
			let customAI = this.props?.linkData?.type;
			return (
				<div>{customAI !== "airindia" ? <SpinnerFRONTM /> : <LoaderAI />}</div>
			);
		}
	}
}

const SpinnerFRONTM = () => (
	<div style={{ position: "fixed", top: "50%", left: "50%", zIndex: 9999 }}>
		<Spinner name="ball-clip-rotate-multiple" color="#638DFF" />
	</div>
);

const LoaderAI = () => <AirplaneLoader />;

const AudioRecorderEl = ({
	inProgress,
	recordAudio,
	stopRecording,
	sendFile,
}) => (
	<Modal
		isOpen={recordAudio}
		size="sm"
		contentClassName="incoming-call-content"
	>
		<ModalBody>
			<div className="d-flex flex-column align-items-center justify-content-center h-100">
				<h5>
					{inProgress
						? "Recording Your Message"
						: "Your message has been recorded"}
				</h5>
				<div className="d-flex align-items-center justify-content-center w-100">
					{inProgress ? (
						<Button color="danger" size="sm" onClick={stopRecording}>
							Stop Recording
						</Button>
					) : (
						<Button
							color="success"
							size="sm"
							className="ml-1"
							onClick={sendFile}
						>
							Send Voicemail
						</Button>
					)}
					<Button color="warning" size="sm" className="ml-1" onClick={sendFile}>
						Cancel
					</Button>
				</div>
			</div>
		</ModalBody>
	</Modal>
);

const IncomingCallModal = ({
	showIncomingCall,
	acceptCall,
	rejectCall,
	callerName,
}) => (
	<Modal
		isOpen={showIncomingCall}
		size="sm"
		contentClassName="incoming-call-content"
	>
		<ModalBody>
			<div className="d-flex flex-column align-items-center justify-content-center h-100">
				<h5>Dr. {callerName} is Calling...</h5>
				<div className="d-flex align-items-center justify-content-center">
					<div className="button-frontm" onClick={acceptCall}>
						<img
							src="/img/call-receivecall-btn@2x.png"
							width="40"
							alt="accept call"
							className="m-2"
						/>
					</div>

					<div className="button-frontm" onClick={rejectCall}>
						<img
							src="/img/call-endcall-btn@2x.png"
							width="40"
							alt="reject call"
							className="m-2"
						/>
					</div>
				</div>
			</div>
		</ModalBody>
	</Modal>
);

const CardsContainerMobile = ({
	hasCards,
	content,
	state,
	toggleCard,
	cards,
	options,
	displayCardModal,
}) => {
	if (hasCards) {
		return (
			<div
				className="p-2 d-flex flex-column nonConversation-card-container"
				style={
					!content.options.type || content.options.type === "vector"
						? {
							position: "absolute",
							bottom: 0,
							backgroundColor: "rgba(0,0,0,0.1)",
							height: !state.showCards && !hasCards && "50px",
							overflowX: "auto",
							width: "100%",
						}
						: {
							position: "absolute",
							bottom: 0,
							backgroundColor: "rgba(255,255,255,0.5)",
							height: !state.showCards && !hasCards && "50px",
							overflowX: "auto",
							width: "100%",
						}
				}
			>
				{options.collapsableCards && (
					<div
						className="d-flex mb-1 align-items-center justify-content-center"
						onClick={toggleCard}
						style={{ cursor: "pointer" }}
					>
						{state.showCards && hasCards ? (
							<img
								style={{ width: "18px" }}
								src="/img/collapse-carda-bg-arrow@2x.png"
								alt="down-arrow"
							/>
						) : (
							<img
								style={{ width: "18px" }}
								className="rotate-down-arrow-up"
								src="/img/collapse-carda-bg-arrow@2x.png"
								alt="up-arrow"
							/>
						)}
					</div>
				)}
				<div
					className="d-flex flex-row cards-nonConversations"
					style={{ overflowY: "hidden" }}
					role="region"
					aria-label="Scrollable div with all the cards"
					tabIndex="0"
				>
					{cards.map((card, index) => {
						if (state.showCards && hasCards) {
							if (card.type === "html" && card.html && card.html.length > 0) {
								return (
									<div key={card.cardId + index} className="mx-1">
										<HTMLCard cardHTML={card.html} />
									</div>
								);
							}
							return (
								<div key={card.cardId} className="d-flex flex-row">
									<CardInMap
										className="mx-1"
										mapId={options.mapId}
										{...card}
										displayModal={displayCardModal}
									/>
								</div>
							);
						} else {
							return null;
						}
					})}
				</div>
			</div>
		);
	}

	return <div />;
};

const CardsContainer = ({
	hasCards,
	content,
	state,
	toggleCard,
	cards,
	options,
	displayCardModal,
}) => {
	// console.log("cards ===== ", options);

	// cards = state.cardsDirect;

	if (hasCards) {
		return (
			<div
				className="p-2 d-flex flex-column nonConversation-card-container"
				style={
					!content.options.type || content.options.type === "vector"
						? {
							position: "absolute",
							bottom: 0,
							backgroundColor: "rgba(0,0,0,0.1)",
							height: !state.showCards && !hasCards && "50px",
							overflowX: "auto",
							width: "100%",
						}
						: {
							position: "absolute",
							bottom: 0,
							backgroundColor: "rgba(255,255,255,0.5)",
							height: !state.showCards && !hasCards && "50px",
							overflowX: "auto",
							width: "100%",
						}
				}
			>
				{options.collapsableCards && (
					<div
						className="d-flex mb-1 align-items-center justify-content-center"
						onClick={toggleCard}
						style={{ cursor: "pointer" }}
					>
						{state.showCards && hasCards ? (
							<img
								style={{ width: "18px" }}
								src="/img/collapse-carda-bg-arrow@2x.png"
								alt="down-arrow"
							/>
						) : (
							<img
								style={{ width: "18px" }}
								className="rotate-down-arrow-up"
								src="/img/collapse-carda-bg-arrow@2x.png"
								alt="up-arrow"
							/>
						)}
					</div>
				)}
				<div
					className="d-flex flex-row cards-nonConversations"
					style={{ overflowY: "hidden" }}
					role="region"
					aria-label="Scrollable div with all the cards"
					tabIndex="0"
				>
					<div key="00000">{/* <AIAds /> */}</div>
					{cards.map((card, index) => {
						if (state.showCards && hasCards) {
							if (card.type === "html" && card.html && card.html.length > 0) {
								return (
									<div key={card.cardId + index} className="mx-1">
										<HTMLCard cardHTML={card.html} {...card} />
									</div>
								);
							}
							return (
								<div key={card.cardId} className="d-flex flex-row">
									<CardInMap
										className="mx-1"
										mapId={options.mapId}
										{...card}
										displayModal={displayCardModal}
									/>
								</div>
							);
						} else {
							return null;
						}
					})}
				</div>
			</div>
		);
	}

	return <div />;
};

const mapActionToProps = {
	sendAMessage: sendAMessage,
	closeSmartReply: closeSmartReply,
	openContent: openContent,
	closeSearchBox: closeSearchBox,
	fetchArchivedMessages,
	sendSearchBoxQuery: sendSearchBoxQuery,
	setScrollPositionForConversation,
	setFormInWindow,
	showChatNonConversational,
	removeCradsFromShowOnlyCards: removeCradsFromShowOnlyCards,
	removeHTMLCotent: removeHTMLCotent,
	removeNotificationMessage: removeNotificationMessage,
	setVideoText: setVideoText,
	setRing: setRing,
	removeRing: removeRing,
	removeURLCotent: removeURLCotent,
};

const mapDataToProps = (state, props) => {
	const chats = state.chats;
	const conversation = chats.selectedConversation;
	const selectedConversationId = conversation && conversation.conversationId;
	// console.log(
	//   "mapDataToProps we will see all the message  =========",
	//   state.chats
	// );

	return {
		userId: state.user.user.userId,
		isAnonymousUser: state.user.isAnonymousUser || false,
		selectedConversation: conversation,
		messages: conversation
			? chats.chatLog.get(conversation.conversationId) || []
			: [],
		conversationPaginationParameterMap: conversation
			? state.chats.conversationPaginationParameterMap[
			conversation.conversationId
			] || {}
			: {},
		shouldScrollToTop: conversation
			? state.chats.shouldScrollToTopConversationMap[
			conversation.conversationId
			] || false
			: false,
		contentMessage:
			chats.contentMessage && chats.contentMessage[selectedConversationId],
		displayContentMessage: chats.contentMessage,
		smartReplyMessage:
			selectedConversationId &&
			chats.smartReplyMessage &&
			chats.smartReplyMessage[selectedConversationId],
		disableMessageInput: chats.disableMessageInput,
		mainChatHeight: chats.mainChatHeight,
		linkData: chats.linkData,
		hiddenTimeLine: state.chats.hiddenTimeLine,
		showWaitSpinner: state.chats.showWaitSpinner,
		contacts: state.contacts.accepted,
		searchBoxMessage: state.chats.searchBoxMessage,
		selectedDomain: state.selectedDomain,
		notificationTypes: state.appNotification.notificationTypes,
		notificationShow: state.appNotification && state.appNotification.show,
		offlineBannerVisibility: state.offlineBanner.visibility,
		componentInWindow: chats.componentInWindow,
		conversational: selectedConversationId
			? chats.conversationModeMap[selectedConversationId]
				? chats.conversationModeMap[selectedConversationId].conversational !==
				false
				: true
			: true,
		background: selectedConversationId
			? (chats.conversationModeMap[selectedConversationId] &&
				chats.conversationModeMap[selectedConversationId].background) ||
			{}
			: {},
		showChat: selectedConversationId
			? (chats.conversationModeMap[selectedConversationId] &&
				chats.conversationModeMap[selectedConversationId].showChat) ||
			false
			: false,
		chatButtonHidden:
			(chats.selectedConversation &&
				chats.selectedConversation.chatButtonHidden) ||
			false,
		showOnlyCards: state.chats.showOnlyCards || [],
		showHTMLContent: state.chats.showHTMLContent || "",
		menuMessage:
			selectedConversationId &&
				chats.menuMessage &&
				chats.menuMessage[selectedConversationId]
				? chats.menuMessage[selectedConversationId]
				: null,
		navigationBar: state.chats.navigationBar || {},
		notificationMessage: state.chats.notificationMessage || null,
		urlContent: state.chats.urlContent || null,
	};
};

export default connect(
	mapDataToProps,
	mapActionToProps
)(NonConversationalChatView);
