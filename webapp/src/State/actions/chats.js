import ConversationServiceClient from "../../Services/Clients/ConversationServiceClient";
import _ from "lodash";
import ShortUUID from "short-uuid";
import {
	createIMConversation,
	createNewConversation,
	createTempConversation,
	getConversationDetails,
	getOutgoingMessageRequest,
	sendMessage,
	startChannelConversation,
	toggleConversationFavourite,
	getUserDetails,
	getConversationByBotId,
	checkIfConversationExists,
	getConversationById,
	sortByModifiedOn,
	getPaginatedArchiveMessages,
	getOutgoingMessageRequestChatView,
} from "../../Services/InteractionsService";
import {
	storeUserDetails,
	getStoredUserDetails,
	storeSelectedConversation,
	getSelectedConversation,
	removeOpenForm,
	removeStoreFormFromLocal,
	getStoredForm,
	getUserMessagePoolTimestamp,
	setUserMessagePoolTimestamp,
} from "../../Services/StorageService";
import { FRONTM_BOT_ID, FRONTM_WEB_BOT, IM_BOT } from "../../Utils/Constants";
import Notify from "../../Components/ModalMessages/ToastNotif";
import {
	IntToMessageTypeConstants,
	MessageTypeConstants,
} from "../../Services/Message";
import {
	fetchAllChannels,
	fetchSubscribedChannels,
	updateChannelList,
} from "./channels";
import { setPhoneBalance, showSessionExpiredModal, updateSoftwareMfaStatus } from "./user";
import { ADD_NEW_USER_ASSOCIATION, updateContactList } from "./contacts";
import ServiceClientUtils from "../../Services/Clients/ServiceClientUtils";
import store from "../configureStore";
import { v2HandleNonConversationalServerMessages } from "../../v2/Containers/NonConversational/Store/NonConversationalAction";
import { initializeBotContext } from "../../Services/BotsService";
import {
	getDataFromLFStorage,
	LFStorageKeys,
	saveDataInLFStorage,
} from "../../Services/LFStorage";
import { Message } from '../../Utils/capability/Message';
import QueueServiceClient from "../../Services/Clients/QueueServiceClient";
import ErrorBoundary from "../../Components/ErrorBoundary/ErrorBoundary";
const R = require("ramda");

const dayjs = require("dayjs");
export const TIME_LINE_RECEIVED = "TIMELINE_RECEIVED";

export const ADD_NEW_CONVERSATION = "ADD_NEW_CONVERSATION";
export const NEW_SERVER_MESSAGE_RECEIVED = "NEW_SERVER_MESSAGE_RECEIVED";
export const NEW_SERVER_FORM_CLOSE_MESSAGE_RECEIVED =
	"NEW_SERVER_FORM_CLOSE_MESSAGE_RECEIVED";
export const NEW_CLIENT_MESSAGE_RECEIVED = "NEW_CLIENT_MESSAGE_RECEIVED";
export const CHANGE_SELECTED_CONVERSATION = "CHANGE_SELECTED_CONVERSATION";
export const ARCHIVED_MESSAGES_RECEIVED = "ARCHIVED_MESSAGES_RECEIVED";
export const CLOSE_CONTENT_AREA = "CLOSE_CONTENT_AREA";
export const OPEN_CONTENT_AREA = "OPEN_CONTENT_AREA";
export const CLOSE_SMART_REPLY = "CLOSE_SMART_REPLY";
export const NEW_LINK_RECEIVED = "NEW_LINK_RECEIVED";
export const RESET_LINK = "RESET_LINK";
export const TOGGLE__FAVORITE_CONVERSATION = "TOGGLE__FAVORITE_CONVERSATION";
export const SEND_SEARCH_BOX_QUERY = "SEND_SEARCH_BOX_QUERY";
export const CLOSE_SEARCH_BOX = "CLOSE_SEARCH_BOX";
export const SET_FORM_IN_POPUP = "SET_FORM_IN_POPUP";
export const SET_WINDOW = "SET_WINDOW";
export const NEW_CONTACT_ACCEPT_IGNORE_MESSAGE__RECEIVED =
	"NEW_CONTACT_ACCEPT_IGNORE_MESSAGE__RECEIVED";
export const CLEAR_ACCEPT_IGNORE_CONTACT = "CLEAR_ACCEPT_IGNORE_CONTACT";
export const GET_FAVOURITES = "GET_FAVOURITES";
export const CONVERSATION_SCROLL_POSITION = "CONVERSATION_SCROLL_POSITION";
export const REMOVE_FROM_WINDOW = "REMOVE_FROM_WINDOW";
export const SET_WINDOW_MIN_MAX = "SET_WINDOW_MIN_MAX";
export const SHOW_CHAT_NON_CONVERSATIONAL = "SHOW_CHAT_NON_CONVERSATIONAL";
export const TOGGLE_TOP_NAV_BAR = "TOGGLE_TOP_NAV_BAR";
export const TOGGLE_SIDE_NAV_BAR = "TOGGLE_SIDE_NAV_BAR";
export const TOGGLE_SIDE_NAV_BAR_FLAG = "TOGGLE_SIDE_NAV_BAR_FLAG";
export const REMOVE_FROM_SHOW_CARDS_ONLY = "REMOVE_FROM_SHOW_CARDS_ONLY";
export const REMOVE_HTML_CONTENT = "REMOVE_HTML_CONTENT";
export const REMOVE_URL_CONTENT = "REMOVE_URL_CONTENT";
export const REMOVE_NOTIFICATION_MESSAGE = "REMOVE_NOTIFICATION_MESSAGE";
export const REMOVE_CARDS_CONTENT = "REMOVE_CARDS_CONTENT";
export const REMOVE_FORM_IN_POPUP = "REMOVE_FORM_IN_POPUP";
export const CONTACT_ACCEPTED = "CONTACT_ACCEPTED";
export const ADD_CHAT_FIELD_WINDOW = "ADD_CHAT_FIELD_WINDOW";
export const REMOVE_CHAT_FIELD_WINDOW = "REMOVE_CHAT_FIELD_WINDOW";
export const SET_VIDEO_TEXT = "SET_VIDEO_TEXT";
export const REMOVE_VIDEO_TEXT = "REMOVE_VIDEO_TEXT";
export const SET_RING_TONE = "SET_RING_TONE";
export const REMOVE_RING_TONE = "REMOVE_RING_TONE";
export const REMOVE_GENERIC_ERROR = "REMOVE_GENERIC_ERROR";
export const UPDATE_FIELDS_INSIDE_CONTAINER_COMPONENT =
	"UPDATE_FIELDS_INSIDE_CONTAINER_COMPONENT";
export const UPDATE_TIME_LINE = "UPDATE_TIME_LINE";
export const UPDATE_CONTAINER_SELECTED_TAB = "UPDATE_CONTAINER_SELECTED_TAB";
export const UPDATE_WINDOW = "UPDATE_WINDOW";
export const BLACKLIST_API = ["airindia"];
export const TIMELINE_FILTER = "TIMELINE_FILTER";

const generateUUID = () => {
	let uuid = ShortUUID.uuid();
	return ShortUUID().fromUUID(uuid);
};

export const sendAMessage =
	(responseMessage, hidden) => (dispatch, getState) => {
		console.log(
			`%c Message send by webapp to bot >> ${responseMessage.messageType} >>`,
			"color: green;",
			responseMessage
		);
		if (responseMessage.messageType === "table_response") {
			window.lastDocIdChanged = responseMessage.message.docId;
		}
		let userId = getState().user.user.userId;
		let selectedConversation = getState().chats.selectedConversation;
		let selectedDomain = getState()?.selectedDomain?.userDomain;
		responseMessage.messageId = responseMessage.messageId || generateUUID();
		let {
			message,
			completed,
			messageId,
			options,
			messageType = MessageTypeConstants.MESSAGE_TYPE_STRING,
		} = responseMessage;
		if (!hidden) {
			dispatch({
				type: NEW_CLIENT_MESSAGE_RECEIVED,
				data: {
					conversationId: selectedConversation.conversationId,
					message: {
						messageType: messageType,
						message,
						options: options,
						createdBy: userId,
						createdOn: Date.now(),
						completed: completed,
						messageId: messageId,
						self: true,
					},
				},
			});
		}
		sendMessage({
			messageType: messageType,
			message,
			options: options,
			createdBy: userId,
			createdOn: Date.now(),
			completed: completed,
			messageId: messageId,
			self: true,
		});
	};

export const sendChatViewMessage =
	(responseMessage, hidden, conversation) => (dispatch, getState) => {
		console.log(
			`%c Message send by webapp to bot sendChatViewMessage >> ${responseMessage.messageType} >>`,
			"color: green;",
			responseMessage
		);
		let userId = getState().user.user.userId;
		let selectedConversation = conversation;
		responseMessage.messageId = responseMessage.messageId || generateUUID();
		let {
			message,
			completed,
			messageId,
			options,
			messageType = MessageTypeConstants.MESSAGE_TYPE_STRING,
		} = responseMessage;
		const getData = getOutgoingMessageRequestChatView(
			selectedConversation,
			"sendMessage",
			responseMessage
		);

		if (!hidden) {
			dispatch({
				type: NEW_CLIENT_MESSAGE_RECEIVED,
				data: {
					conversationId: selectedConversation.conversationId,
					message: {
						messageType: messageType,
						message,
						options: options,
						createdBy: userId,
						createdOn: Date.now(),
						completed: completed,
						messageId: messageId,
						self: true,
					},
				},
			});
		}

		sendMessage({
			...getData,
			messageType: messageType,
			message,
			options: options,
			createdBy: userId,
			createdOn: Date.now(),
			completed: completed,
			messageId: messageId,
			self: true,
			type: 'chatInWindow'
		});
	};

export const getFavourite = (data) => (dispatch) => 
	ConversationServiceClient.fetchFavourite(data).then((response) => {
		let newFav = { ...response };
		dispatch({
			type: GET_FAVOURITES,
			data: { getFavourites: newFav },
		});
	});

export const getTimeLine =
	(data = null) =>
		(dispatch, getState) => { }
			// ConversationServiceClient.fetchTimeLine()
			// 	.then((response) => {
			// 		let timeLine = [];
			// 		if (response) {
			// 			let recants = response.content ? response.content.conversations : [];

			// 			let favorites = response.content ? response.content.favourites : [];
			// 			favorites.forEach((conversation) => {
			// 				conversation.favourite = true;
			// 			});
			// 			timeLine = [].concat(favorites).concat(recants);

			// 			sortByModifiedOn(timeLine);
			// 		}

			// 		dispatch({
			// 			type: TIME_LINE_RECEIVED,
			// 			data: {
			// 				timeLine: timeLine,
			// 				userId: getState().user?.user && getState().user?.user?.userId,
			// 			},
			// 		});

			// 		let linkData = getState().chats.linkData;
			// 		if (!linkData) {
			// 			let timeLineEmpty = !timeLine || timeLine.length === 0;
			// 			if (
			// 				timeLineEmpty &&
			// 				getConversationByBotId(getState().chats, FRONTM_BOT_ID)
			// 			) {
			// 				dispatch(addFrontMAssistantToTimeLine());
			// 			} else if (!timeLineEmpty) {
			// 				let conversation = getSelectedConversation();
			// 				if (conversation) {
			// 					const usersAssociation = getState()?.contacts?.usersAssociation;
			// 					if (
			// 						usersAssociation && Object.keys(usersAssociation).length > 0 && usersAssociation[conversation?.contact?.userId] !==
			// 						conversation?.contact?.userName
			// 					) {
			// 						const contactInfo = {
			// 							...conversation.contact,
			// 							userName: usersAssociation[conversation.contact.userId],
			// 						};
			// 						conversation = {
			// 							...conversation,
			// 							contact: contactInfo,
			// 						};
			// 					}
			// 					dispatch(changeSelectedConversation(conversation, true));
			// 					initiateConversation(conversation);
			// 				}
			// 			} else {
			// 				if (!data || data !== "domainChange") {
			// 					const fmTimeLine = getConversationByBotId(
			// 						getState().chats,
			// 						FRONTM_BOT_ID
			// 					);
			// 					if (!fmTimeLine) {
			// 						dispatch(addFrontMAssistantToTimeLine());
			// 					} else {
			// 						dispatch(changeConversation(fmTimeLine));
			// 					}
			// 				} else {
			// 					const fmTimeLine = getConversationByBotId(
			// 						getState().chats,
			// 						FRONTM_BOT_ID
			// 					);
			// 					dispatch(changeSelectedConversation(null, true));
			// 					dispatch(
			// 						setScrollPositionForConversation(
			// 							false,
			// 							fmTimeLine || timeLine[0]
			// 						)
			// 					);
			// 					dispatch(changeConversation(fmTimeLine || timeLine[0]));
			// 				}
			// 			}
			// 		} else {
			// 			dispatch(initiateConversationForLink());
			// 		}
			// 	})
			// 	.catch((err) => {
			// 		console.error("error in fetching timeline", err);
			// 		let conversation = getSelectedConversation();
			// 		if (conversation) {
			// 			dispatch(changeSelectedConversation(conversation, true));
			// 			initiateConversation(conversation);
			// 		}
			// 	});

export const setScrollPositionForConversation = (status, conversation) => {
	return {
		type: CONVERSATION_SCROLL_POSITION,
		data: { status, conversation },
	};
};

const addFrontMAssistantToTimeLine = () => (dispatch, getState) => {
	createNewConversation(getState()?.user?.user?.userId, FRONTM_WEB_BOT).then(
		(conversation) => {
			dispatch({ type: ADD_NEW_CONVERSATION, data: { conversation } });
			dispatch(changeSelectedConversation(conversation, true));
			dispatch(setScrollPositionForConversation(false, conversation));
			if (conversation) {
				dispatch(fetchArchivedMessages(conversation));
			}
		}
	);
};

export const updateWindowTitle = (conversation) => {
	if (conversation && conversation.bot) {
		if (conversation.bot.botId === IM_BOT) {
			if (conversation.channel && conversation.channel.channelName) {
				window.document.title = conversation.channel.channelName;
			} else if (conversation.contact && conversation.contact.userName) {
				window.document.title = conversation.contact.userName;
			}
		} else {
			if (conversation.bot.botName) {
				if (conversation.bot.botName == "OnShip Assistant ") {
					window.document.title = conversation.bot.botNameSearch;
				} else {
					window.document.title = conversation.bot.botName;
				}
			}
		}
	}
};

export const getFrontMAssistant =
	(timeLine, botId = FRONTM_BOT_ID) =>
		(dispatch, getState) => {
			let linkData = getState().chats.linkData;

			if (!linkData) {
				let timeLineEmpty = !timeLine || timeLine.length === 0;
				if (timeLineEmpty || !getConversationByBotId(getState().chats, botId)) {
					dispatch(addFrontMAssistantToTimeLine());
				} else {
					dispatch(changeConversation(timeLine[0]));
				}
			} else {
				dispatch(initiateConversationForLink());
			}
		};

export const changeConversation =
	(conversation, moveToTop) => (dispatch, getState) => {
		let chats = getState().chats;
		if (
			conversation &&
			chats.selectedConversation &&
			chats.selectedConversation.conversationId === conversation.conversationId
		) {
			return;
		}
		dispatch(changeSelectedConversation(conversation, moveToTop));
		dispatch(setScrollPositionForConversation(false, conversation));
		initiateConversation(conversation);
	};

export function updateMessageStatusForUser(conversation, messages) {
	return {};
	return (dispatch, getState) => {
		let timelines = _.cloneDeep(getState().chats.timeLine);
		let selectedConversationId =
			getState()?.chats?.selectedConversation?.conversationId;
		if (messages && messages.length) {
			let messageIds = [];
			messages.map((message) => {
				if (
					!message.isOpened &&
					message.conversation === selectedConversationId
				) {
					messageIds.push(message.messageId);
				}
				return message;
			});
			if (messageIds && messageIds.length) {
				ConversationServiceClient.updateMessageStatusForUser({
					messageIds,
					userDomain: conversation?.userDomain,
					conversationId: conversation.conversationId,
					action: "opened",
				})
					.then((res) => {
						if (res.success) {
							console.log(
								`%c Marking ${messageIds.length} messages as opened for conversation ${conversation.conversationId}`,
								"color: green; font-weight: bold;"
							);
							let newTimeline = [...timelines];

							newTimeline.map((timeline) => {
								if (timeline.conversationId === conversation.conversationId) {
									timeline.unreadCount = timeline.unreadCount
										? timeline.unreadCount - messageIds.length
										: 0;
								}
							});
							storeSelectedConversation({
								...conversation,
								unreadCount: _.find(newTimeline, {
									conversationId: conversation.conversationId,
								}).unreadCount,
							});
							dispatch({
								type: UPDATE_TIME_LINE,
								data: {
									timeLine: newTimeline,
								},
							});
							return;
						} else {
							console.error(
								`%c Failed to marking ${messageIds.length} messages as opened for conversation ${conversation.conversationId}`,
								"color: red; font-weight: bold;"
							);
							return;
						}
					})
					.catch((err) => {
						console.error(
							`%c Failed to marking ${messageIds.length} messages as opened for conversation ${conversation.conversationId}: `,
							"color: red; font-weight: bold;",
							err
						);
					});
			} else {
				console.log(
					`%c No unread messages pending`,
					"color: green; font-weight: bold;"
				);
			}
		}
		return;
	};
}

export function fetchArchivedMessages(conversation, createdOn, fetchDirection) {
	return async (dispatch, getState) => {
		try {
			if (!_.isEmpty(conversation)) {
				let messages =
					(await getDataFromLFStorage(
						`${LFStorageKeys.MESSAGES}_${conversation.conversationId}`
					)) || [];
				let moreMessagesExist = false;

				// If online the make api call and override message and store latest msg in LFStorage
				if (getState().user.isOnline) {
					getPaginatedArchiveMessages(conversation, createdOn, fetchDirection).then(
						(response) => {
							messages = response.messages;
							moreMessagesExist = response.moreMessagesExist;
							let usersAssociation = getState().contacts.usersAssociation;

							// scan the timeline and fill the user details
							messages.forEach((ele) => {
								if (
									ele.conversationOwner &&
									usersAssociation &&
									!usersAssociation[ele.conversationOwner.userId]
								) {
									dispatch({
										type: ADD_NEW_USER_ASSOCIATION,
										data: ele.conversationOwner,
									});
								}
							});

							// FR 561 fix, loads message on single tap to contact
							// change the condition to load the messages even if chatlog
							// is there, avoid the slow load problem
							if (
								getState().chats.chatLog.get(conversation.conversationId)
									.length >= 0
							) {
								const userId = getState().user?.user?.userId;
								if (userId && messages) {
									dispatch(
										onArchivedMessagesReceived(
											conversation.conversationId,
											messages,
											moreMessagesExist,
											userId
										)
									);
								}
							}

							saveDataInLFStorage(
								`${LFStorageKeys.MESSAGES}_${conversation.conversationId}`,
								messages
							);
						}
					);
				}

				if (!_.isEmpty(messages)) {
					let unreadMessages = [];
					messages.forEach((msg) => {
						if (!msg.isOpened) {
							unreadMessages.push({
								conversation: conversation.conversationId,
								...msg,
							});
						}
					});
					// only update the messages status for selected conversation
					if (
						store?.getState()?.chats?.selectedConversation?.conversationId ===
						conversation.conversationId
					) {
						// dispatch(updateMessageStatusForUser(conversation, unreadMessages));
					}
				}
				const userId = getState().user?.user?.userId;
				if (userId && messages) {
					dispatch(
						onArchivedMessagesReceived(
							conversation.conversationId,
							messages,
							moreMessagesExist,
							userId
						)
					);
				}
			}
		} catch (error) {
			console.error("Error in fetching Archived Messages: ", error);
		}
	};
}

function onArchivedMessagesReceived(
	conversationId,
	messages,
	moreMessagesExist,
	userId
) {
	return {
		type: ARCHIVED_MESSAGES_RECEIVED,
		data: {
			conversationId: conversationId,
			messages: messages,
			moreMessagesExist,
			userId,
		},
	};
}

export function createConversation(bot, userId) {
	//bot argument can be bot,contact or channel , depending where it being called from.
	// console.log("ADITYA14 checking bot", bot);
	// console.log("ADITYA14 checking userId", userId);
	if (!bot || !userId) {
		// console.log("ADITYA14 failing");
		return;
	}
	return (dispatch, getState) => {
		let { timeLine } = getState().chats;
		// console.log("ADITYA14 checking timeline !!!!!!!!!!!!!!!!!!!1", timeLine);
		// console.log(
		// 	"ADITYA14 checking timeline Stringified",
		// 	JSON.stringify(timeLine)
		// );
		const isContact = !!bot.userId;
		// if (isContact) {
		// 	let conversationTimeLine = timeLine.filter((conversation) => {
		// 		return (
		// 			!conversation.channel &&
		// 			conversation.contact &&
		// 			conversation.contact.userId === bot.userId
		// 		);
		// 	});

		// 	// console.log(
		// 	// 	"ADITYA14 checking ct -----------))))_=+++",
		// 	// 	conversationTimeLine
		// 	// );

		// 	if (conversationTimeLine.length !== 0) {
		// 		dispatch(changeSelectedConversation(conversationTimeLine[0], true));
		// 		dispatch(
		// 			setScrollPositionForConversation(false, conversationTimeLine[0])
		// 		);

		// 		// console.log("ADITYA14 here 4");
		// 		initiateConversation(conversationTimeLine[0]);
		// 		return;
		// 	}
		// 	//for im. don't create a conversation in the backend until a message is sent.
		// 	let conversation = createIMConversation(userId, bot);
		// 	// not to fetch archived ones for the new conversation
		// 	conversation.archivedMessagesRead = true;
		// 	dispatch({ type: ADD_NEW_CONVERSATION, data: { conversation } });
		// 	dispatch(changeSelectedConversation(conversation, true));
		// 	dispatch(setScrollPositionForConversation(false, conversation));

		// 	if (window.lastMsg && parseInt(window.lastMsg.contentType) === 1001) {
		// 		dispatch({
		// 			type: ARCHIVED_MESSAGES_RECEIVED,
		// 			data: {
		// 				conversationId: window.lastMsg.conversationId,
		// 				messages: [
		// 					{
		// 						archived: true,
		// 						createdBy: window.lastMsg.createdBy,
		// 						createdOn: conversation.createdOn,
		// 						isDeleted: false,
		// 						isDelivered: false,
		// 						isOpened: false,
		// 						message: [
		// 							{
		// 								userId: conversation.contact.userId,
		// 								userName: conversation.contact.userName,
		// 							},
		// 						],
		// 						messageId: window.lastMsg.messageId,
		// 						messageType: "accept_ignore_contact",
		// 						options: [],
		// 					},
		// 				],
		// 				moreMessagesExist: false,
		// 				userId: getState().user.user.userId,
		// 			},
		// 		});
		// 	}

		// 	return;
		// }

		// const conversationTimeLine = timeLine.filter(
		// 	(conversation) =>
		// 		(conversation.bot && conversation.bot === bot.botId) ||
		// 		(conversation.bot && conversation.bot.botId === bot.botId)
		// );
		// if (conversationTimeLine.length !== 0) {
		// 	dispatch(changeSelectedConversation(conversationTimeLine[0], true));
		// 	dispatch(
		// 		setScrollPositionForConversation(false, conversationTimeLine[0])
		// 	);
		// 	// console.log("ADITYA14 here 5");
		// 	initiateConversation(conversationTimeLine[0], bot);

		// 	return;
		// }
		createNewConversation(userId, bot)
			.then((conversation) => {
				dispatch({ type: ADD_NEW_CONVERSATION, data: { conversation } });
				dispatch(changeSelectedConversation(conversation, true));
				dispatch(setScrollPositionForConversation(false, conversation));
				// console.log("ADITYA14 here 6");
				initiateConversation(conversation, bot);
			})
			.catch((error) => {
				console.error("error in creating conversation ", error);
			});
	};
}

export function addItToTimeLine(userId, bot) {
	return (dispatch) => {
		let conversation = createIMConversation(userId, bot);
		conversation.archivedMessagesRead = true;
		dispatch({ type: ADD_NEW_CONVERSATION, data: { conversation } });
	};
}

export function parseMessages(rawMessage) {
	let contents = ServiceClientUtils.parseBytesContent(rawMessage.details);
	delete rawMessage.details;
	return contents.map((content) => {
		let newMessage = { ...rawMessage };
		content.messageType =
			content.messageType || IntToMessageTypeConstants[rawMessage.contentType];
		content.message = content.message || content.msg;
		delete content.msg;
		return Object.assign({}, newMessage, content);
	});
}

function getMessageSenderDetails(messageSenderId) {
	return new Promise((resolve, reject) => {
		let storedUser = getStoredUserDetails(messageSenderId);
		if (storedUser) {
			resolve(storedUser);
		} else {
			getUserDetails(messageSenderId)
				.then((userDetails) => {
					storeUserDetails(messageSenderId, userDetails);
					resolve(userDetails);
				})
				.catch((err) => reject(err));
		}
	});
}

export function updateWalletBalance(rawMessage) {
	return (dispatch) => {
		let parsed_message = parseMessages(rawMessage);
		if (parsed_message.length > 0) {
			let wallet_message = parsed_message[0];
			let wallet_bal = R.pathOr(
				null,
				["message", "pstn-balance"],
				wallet_message
			);
			if (!wallet_bal) return;
			dispatch(
				setPhoneBalance({
					balance: wallet_bal,
				})
			);
			return;
		}
	};
}

// export function resetMessageCount(selectedContact) {
// 	return (dispatch, getState) => {
// 		const timeLine = getState().chats && getState().chats.timeLine;
// 		const selectedContactId = selectedContact?.userId;
// 		let index = 0;
// 		for (let i = 0; i < timeLine.length; i++) {
// 			const conversation = timeLine[i];
// 			if (
// 				conversation.contact &&
// 				conversation.contact.userId === selectedContactId
// 			) {
// 				index = i;
// 				break;
// 			} else if (selectedContact.channelId === conversation.conversationId) {
// 				index = i;
// 				break;
// 			}
// 		}
// 		let newTimeLine = [...timeLine];
// 		if (
// 			newTimeLine[index] &&
// 			(newTimeLine[index].newMessagesCount > 0 ||
// 				newTimeLine[index].unreadCount > 0)
// 		) {
// 			newTimeLine[index].newMessagesCount = 0;
// 			newTimeLine[index].unreadCount = 0;
// 			dispatch({
// 				type: RESET_MESSAGE_COUNT,
// 				data: newTimeLine,
// 			});
// 		}
// 	};
// }

export function offlineIngestMessage(message, conversationId) {
	return (dispatch) => {
		dispatch(v2HandleNonConversationalServerMessages(conversationId, message));
		dispatch({
			type: NEW_SERVER_MESSAGE_RECEIVED,
			data: { conversationId, message },
		});
	};
}

export function ingestMessage(rawMessage) {
	if (!rawMessage) {
		return;
	}
	let conversationId = rawMessage.conversation;
	let botId = rawMessage.bot;
	let messageSenderId = rawMessage.createdBy;
	return (dispatch, getState) => {
		let chatsState = getState().chats;
		let conversation = getConversationById(chatsState, conversationId);
		let promise = null;
		if (conversation) {
			promise = new Promise((resolve) => {
				resolve(conversation);
			});
		} else {
			promise = getConversationDetails(
				conversationId,
				botId,
				messageSenderId
			).then((conversationDetails) => {
				if (conversationDetails) {
					let conversation = createTempConversation(
						conversationDetails,
						conversationId,
						botId
					);
					dispatch({ type: ADD_NEW_CONVERSATION, data: { conversation } });
					return conversation;
				}
			});
		}

		promise.then((conversation) => {
			let messages = parseMessages(rawMessage, chatsState);
			messages.forEach((message) => {
				if (conversation && conversation.channel) {
					getMessageSenderDetails(messageSenderId).then(
						(messageSenderDetails) => {
							message.conversationOwner = messageSenderDetails;
							dispatch({
								type: NEW_SERVER_MESSAGE_RECEIVED,
								data: { conversationId, message },
							});
						}
					);
				} else if (botId === IM_BOT) {
					let participants = conversation && conversation.participants;
					let index = participants.findIndex(
						(participant) => participant.userId === messageSenderId
					);
					if (index !== -1) {
						message.conversationOwner = participants[index];
					}

					if (
						message.messageType ===
						MessageTypeConstants.MESSAGE_TYPE_ACCEPT_IGNORE_CONTACT
					) {
						dispatch({
							type: NEW_CONTACT_ACCEPT_IGNORE_MESSAGE__RECEIVED,
							data: { conversationId, message },
						});
					}
					if (
						message.messageType ===
						MessageTypeConstants.MESSAGE_TYPE_CONTACT_BEEN_ACCEPTED
					) {
						dispatch({
							type: CONTACT_ACCEPTED,
							data: { conversationId, message },
						});
					}
					// else {
					dispatch({
						type: NEW_SERVER_MESSAGE_RECEIVED,
						data: { conversationId, message },
					});
					// }
				} else {
					if (
						message.messageType === MessageTypeConstants.MESSAGE_TYPE_CLOSE_FORM
					) {
						dispatch({
							type: NEW_SERVER_FORM_CLOSE_MESSAGE_RECEIVED,
							data: { conversationId, message },
						});

						let newResponse = {};
						newResponse.message = {
							action: "cancel",
							formId: message.message.formId,
						};
						newResponse.messageType =
							MessageTypeConstants.MESSAGE_TYPE_FORM_RESPONSE;
						dispatch(sendAMessage(newResponse, true));
					} else if (
						message.messageType ===
						MessageTypeConstants.MESSAGE_TYPE_CLOSE_CONTROL
					) {
						const data = { options: { controlId: message.message.controlId } };
						const conversationModeMap = chatsState.conversationModeMap;
						let conversationalMode = conversationModeMap[conversationId];
						let conversational =
							(!_.isEmpty(conversationalMode) &&
								!conversationalMode.conversational) ||
							false;
						removeControlBasedOnConversationMode(
							data,
							conversationId,
							conversational
						);
					} else {
						dispatch(
							v2HandleNonConversationalServerMessages(conversationId, message)
						);
						dispatch({
							type: NEW_SERVER_MESSAGE_RECEIVED,
							data: { conversationId, message },
						});
					}
				}
			});
		});
	};
}

function removeControlBasedOnConversationMode(
	data,
	conversationId,
	conversational
) {
	let component = getStoredForm();
	if (
		component &&
		component.options &&
		component.options.controlId === data.options.controlId
	) {
		removeOpenForm();
	}
	if (!conversational) {
		removeFromWindow(data);
	} else {
		removeFormInPopup(data);
	}
}

export function initiateChannelConversation(channel, callback) {
	return (dispatch, getState) => {
		const chatsState = getState().chats;
		let channelId = channel.channelId;

		if (checkIfConversationExists(chatsState, channelId)) {
			let conversation = getConversationById(chatsState, channelId);
			dispatch(changeSelectedConversation(conversation, true));
			dispatch(setScrollPositionForConversation(false, conversation));
			if (!conversation.archivedMessagesRead || !!conversation.unreadCount) {
				dispatch(fetchArchivedMessages(conversation));
			}
			// let message = {
			// 	messageType: "Runmode",
			// 	message: {
			// 		conversational: true,
			// 		background: {},
			// 	},
			// };

			// dispatch({
			// 	type: NEW_SERVER_MESSAGE_RECEIVED,
			// 	data: { conversationId: channelId, message },
			// });

			// callback(null);
		} else {
			startChannelConversation(getState().user.user.userId, channel).then(
				(conversation) => {
					dispatch({ type: ADD_NEW_CONVERSATION, data: { conversation } });
					dispatch(changeSelectedConversation(conversation, true));
					dispatch(setScrollPositionForConversation(false, conversation));
					dispatch(fetchArchivedMessages(conversation));
					let message = {
						messageType: "Runmode",
						message: {
							conversational: true,
							background: {},
						},
					};

					dispatch({
						type: NEW_SERVER_MESSAGE_RECEIVED,
						data: { conversationId: channelId, message },
					});
					callback(null);
				}
			);
		}
	};
}

export const initiateConversation = async (conversation, bot = null) => {
	// console.log("ADITYA323 checking conversation", conversation);
	try {
		if (bot === null) {
			let botList = (await getDataFromLFStorage(conversation?.userDomain)) || [];
			bot = botList.filter((item) => item.botId === conversation.bot.botId)[0];
		}

		if (bot == null) {
			let botList = store.getState().user.botSubscriptions;
			bot = botList.filter((item) => item.botId === conversation.bot.botId)[0];
		}

		const initiateConversationBot = async (bot) => {
			let messages =
				(await getDataFromLFStorage(
					`${LFStorageKeys.MESSAGES}_${conversation.conversationId}`
				)) || [];
			const botContext = await initializeBotContext(bot);
			if (botContext && botContext.botContent) {
				botContext.botContent.init({}, messages, botContext);
				// if (
				// 	botContext.authorisedAccess &&
				// 	botContext.userDetails.softwareMfaEnabled
				// ) {
				// 	console.log("2FA Auth for first time");
				// 	store.dispatch(updateSoftwareMfaStatus("idle"));
				// }
			}
			if (botContext && botContext.botContent) {
				botContext.botContent.open instanceof Function &&
					botContext.botContent.open({}, messages, botContext);
			}

			if (!_.isEmpty(messages)) {
				let unreadMessages = [];
				messages.forEach((msg) => {
					if (!msg.isOpened) {
						unreadMessages.push({
							conversation: conversation.conversationId,
							...msg,
						});
					}
				});
				// only update the messages status for selected conversation
				if (
					store.getState().chats.selectedConversation.conversationId ===
					conversation.conversationId
				) {
					store.dispatch(
						// updateMessageStatusForUser(conversation, unreadMessages)
					);
				}
			}
		};

		if (bot && bot.botId !== "im-bot") {
			if (bot.userId) {
				store.dispatch(removeCardCotent());
				sendMessage(
					getOutgoingMessageRequest(conversation, "startConversation", {
						message: "",
						messageType: MessageTypeConstants.MESSAGE_TYPE_STRING,
					})
				);
			} else {
				initiateConversationBot(bot);
			}
		} else {
			initiateConversationBot(bot);
			// initiateConversationBot({
			// 	userDomain: store.getState()?.selectedDomain?.userDomain,
			// 	botId: "im-bot",
			// });
		}

		if (conversation) {
			// store.dispatch(fetchArchivedMessages(conversation));
		}
	} catch (error) {
		console.error(
			"There is some error while initiating the bot. Kindly check the bot",
			error
		);
	}
};

export const changeSelectedConversation = (conversation, moveToTop) => {
	return async (dispatch, getState) => {
		let conversationDetails = _.cloneDeep(conversation);
		if (conversationDetails && conversationDetails.bot) {
			let botList =
				(await getDataFromLFStorage(conversationDetails?.userDomain)) || [];
			let bot = botList.filter(
				(item) => item.botId === conversationDetails.bot.botId
			)[0];
			conversationDetails.bot = {
				...conversationDetails.bot,
				...bot,
			};
		}
		updateWindowTitle(conversationDetails);
		storeSelectedConversation(conversationDetails);
		dispatch({
			type: CHANGE_SELECTED_CONVERSATION,
			data: { conversation: conversationDetails, toTop: moveToTop },
		});
	};
};

export function closeSmartReply() {
	return {
		type: CLOSE_SMART_REPLY,
	};
}

export function closeContentArea() {
	return {
		type: CLOSE_CONTENT_AREA,
	};
}

export function openContent(type, message) {
	let data = {};
	if (type === "content") {
		data.contentMessage = message;
	} else {
		data.smartReplyMessage = message;
	}

	return {
		type: OPEN_CONTENT_AREA,
		data: data,
	};
}

export function populateLinkData(type, botId, message, action) {
	return {
		type: NEW_LINK_RECEIVED,
		data: {
			type,
			botId,
			message,
			action,
		},
	};
}

export function resetLinkData() {
	return {
		type: RESET_LINK,
	};
}

export function initiateConversationForLink() {
	return (dispatch, getState) => {
		let linkData = getState().chats.linkData;
		if (!linkData) {
			return;
		}

		let { type, botId, message, action } = linkData;
		// dispatch(resetLinkData());
		let conversation =
			type === "b"
				? getConversationByBotId(getState().chats, botId)
				: getConversationById(getState().chats, botId);
		let botSubscriptions = getState().user.botSubscriptions;

		if (message && action === "send") {
			if (conversation) {
				dispatch(changeSelectedConversation(conversation, true));
				dispatch(setScrollPositionForConversation(false, conversation));
				if (!conversation.archivedMessagesRead) {
					dispatch(fetchArchivedMessages(conversation));
				}
				dispatch(
					sendAMessage({
						message,
						messageType: MessageTypeConstants.MESSAGE_TYPE_STRING,
					})
				);
				return;
			}

			if (type === "b") {
				let botIndex = botSubscriptions.findIndex((bot) => {
					return botId === bot.botId;
				});
				if (botIndex === -1 && botId !== FRONTM_BOT_ID) {
					Notify({
						type: "error",
						message:
							"You have not subscribed to the mentioned bot yet. Please subscribe to the bot and open the link again.",
						autoClose: 10000,
					});
					return;
				}

				let bot =
					botId === FRONTM_BOT_ID ? FRONTM_WEB_BOT : botSubscriptions[botIndex];

				createNewConversation(
					getState().user.user.userId,
					bot,
					"sendMessage",
					message
				)
					.then((conversation) => {
						if (botId === FRONTM_BOT_ID) {
							conversation.bot.logoUrl = "AuthenticationLogo.png";
						}

						dispatch({ type: ADD_NEW_CONVERSATION, data: { conversation } });
						dispatch(changeSelectedConversation(conversation, true));
						dispatch(setScrollPositionForConversation(false, conversation));
						dispatch({
							type: NEW_CLIENT_MESSAGE_RECEIVED,
							data: {
								conversationId: conversation.conversationId,
								message: {
									type: "string",
									message,
									user: getState().user.user.userId,
									createdOn: Date.now(),
									time: dayjs().format("hh:mm a"),
									createdBy: "self",
								},
							},
						});
					})
					.catch((error) => {
						console.error(error);
					});
			} else {
				Notify({
					type: "error",
					message: "Mentioned conversation does not exist.",
					autoClose: 70000,
				});
			}
		} else if (message && action === "read") {
			if (!conversation) {
				Notify({
					type: "error",
					message: "Mentioned conversation does not exist.",
					autoClose: 7000,
				});
				return;
			}
			dispatch(changeSelectedConversation(conversation, true));
			dispatch(setScrollPositionForConversation(false, conversation));
			if (!conversation.archivedMessagesRead) {
				dispatch(fetchArchivedMessages(conversation));
			}
		} else if (!message) {
			if (conversation) {
				dispatch(changeConversation(conversation, true));
				return;
			}
			if (type === "b") {
				let botIndex = botSubscriptions.findIndex((bot) => {
					return botId === bot.botId;
				});
				if (botIndex === -1 && botId !== FRONTM_BOT_ID) {
					Notify({
						type: "error",
						message:
							"You have not subscribed to the mentioned bot yet. Please subscribe to the bot and open the link again.",
						autoClose: 10000,
					});
					return;
				}

				let bot =
					botId === FRONTM_BOT_ID ? FRONTM_WEB_BOT : botSubscriptions[botIndex];

				createNewConversation(getState().user.user.userId, bot)
					.then((conversation) => {
						if (botId === FRONTM_BOT_ID) {
							conversation.bot.logoUrl = "AuthenticationLogo.png";
						}
						dispatch({ type: ADD_NEW_CONVERSATION, data: { conversation } });
						dispatch(changeSelectedConversation(conversation, true));
						dispatch(setScrollPositionForConversation(false, conversation));
					})
					.catch((error) => {
						console.error(error);
					});
			} else if (type && (type !== "b" || type !== "c")) {
				conversation = getSelectedConversation();

				if (!_.isEmpty(conversation)) {
					dispatch(changeSelectedConversation(conversation, true));
					dispatch(setScrollPositionForConversation(false, conversation));
					// console.log("ADITYA14 here 7");
					initiateConversation(conversation);
				} else {
					createNewConversation(getState().user.user.userId, {
						userDomain: store.getState()?.selectedDomain?.userDomain,
						botId: botId,
					})
						.then((conversation) => {
							dispatch({ type: ADD_NEW_CONVERSATION, data: { conversation } });
							dispatch(changeSelectedConversation(conversation, true));
							dispatch(setScrollPositionForConversation(false, conversation));
							initiateConversation(conversation);
						})
						.catch((error) => {
							console.error("[initiateConversationForLink] error :: ", error);
						});
				}
			} else {
				Notify({
					type: "error",
					message: "Mentioned conversation does not exist.",
					autoClose: 70000,
				});
			}
		}
	};
}

export function openPushConversation(conversationId) {
	return (dispatch, getState) => {
		let conversation = getConversationById(getState().chats, conversationId);
		if (conversation) {
			dispatch(changeSelectedConversation(conversation, true));
			dispatch(setScrollPositionForConversation(false, conversation));
		}
	};
}

export function addConversationToFavourites(
	conversationId,
	userDomain,
	conversation,
	appType
) {
	let userId = conversation?.contact?.userId;
	let botId = conversation?.bot?.botId;
	let channel = conversation?.channel;
	return (dispatch, getState) => {
		toggleConversationFavourite(
			conversationId,
			userDomain,
			"add",
			userId,
			appType,
			botId,
			channel
		)
			.then(() => {
				let dataObj = {
					selectedDomain: getState()?.selectedDomain?.userDomain,
				};
				dispatch(getFavourite(dataObj));
				dispatch({
					type: TOGGLE__FAVORITE_CONVERSATION,
					data: { conversationId, favourite: true },
				});
				Notify({
					type: "success",
					message: "Conversation has been marked as favourite.",
				});
			})
			.catch((error) => {
				console.error("addConversationToFavourites >>", error);
			});
	};
}

export function removeConversationFromFavourites(
	conversationId,
	userDomain,
	noNotify = false
) {
	return (dispatch) => {
		toggleConversationFavourite(conversationId, userDomain, "remove")
			.then(() => {
				let dataObj = {
					selectedDomain: userDomain,
				};

				dispatch(getFavourite(dataObj));
				dispatch({
					type: TOGGLE__FAVORITE_CONVERSATION,
					data: { conversationId, favourite: false },
				});
				if (!noNotify) {
					Notify({
						type: "success",
						message:
							"Conversation has been removed from the list of favourites.",
					});
				}
			})
			.catch((error) => {
				console.error("removeConversationFromFavourites >>", error);
			});
	};
}

export function closeSearchBox(message) {
	if (message) {
		return (dispatch) => {
			dispatch(sendAMessage(message, true));
			dispatch({ type: CLOSE_SEARCH_BOX });
		};
	}
	return { type: CLOSE_SEARCH_BOX };
}

export function sendSearchBoxQuery() {
	return { type: SEND_SEARCH_BOX_QUERY };
}

export function setFormInPopup(chat) {
	return { type: SET_FORM_IN_POPUP, data: { chat } };
}

export function setVideoText(data) {
	return {
		type: SET_VIDEO_TEXT,
		data: { ...data },
	};
}
export function setRing() {
	return {
		type: SET_RING_TONE,
	};
}
export function removeRing() {
	return {
		type: REMOVE_RING_TONE,
	};
}
export function removeVideoText() {
	return {
		type: REMOVE_VIDEO_TEXT,
	};
}

export function removeFormInPopup(data) {
	return (dispatch, getState) => {
		let chatsObj = getState().chats;
		let formInPopup = chatsObj.formInPopup;
		if (
			formInPopup &&
			formInPopup.options.controlId === data.options.controlId
		) {
			return { type: REMOVE_FORM_IN_POPUP };
		}
	};
}

export function setWindowOnTop(index, conversationId) {
	return (dispatch, getState) => {
		let chatObj = getState().chats.componentInWindow;
		let chatArrList = _.cloneDeep(chatObj[conversationId]);
		let pushAtEnd = _.cloneDeep(chatArrList[index]);

		chatArrList.splice(index, 1);
		chatArrList.push(pushAtEnd);

		chatObj[conversationId] = chatArrList;

		dispatch({ type: UPDATE_WINDOW, data: { ...chatObj } });
	};
}

export function setWindowMinMax(data, index) {
	return (dispatch, getState) => {
		let chatsObj = getState().chats;
		let dataInWindow = { ...chatsObj.componentInWindow };
		let windowKey =
			(getState().chats &&
				getState().chats.selectedConversation &&
				getState().chats.selectedConversation.conversationId) ||
			null;
		if (Object.keys(dataInWindow).length > 0) {
			if (dataInWindow[windowKey] && dataInWindow[windowKey][index] && data) {
				dataInWindow[windowKey][index].minimize = data.minimize;
			}
		}
		dispatch({ type: SET_WINDOW_MIN_MAX, data: { ...dataInWindow } });
	};
}

export function setFormInWindow(chat) {
	if (!chat.options) {
		chat.options = { ...chat.message };
	}

	return (dispatch, getState) => {
		chat.minimize = false;
		let chatsObj = getState().chats;
		let dataInWindow = { ...chatsObj.componentInWindow };
		let windowKey =
			(getState().chats &&
				getState().chats.selectedConversation &&
				getState().chats.selectedConversation.conversationId) ||
			null;

		if (!windowKey) {
			return;
		}
		let windowArr = [];

		if (Object.keys(dataInWindow).length === 0) {
			windowArr.push(chat);
			dataInWindow[windowKey] = windowArr;
		} else {
			if (!dataInWindow[windowKey]) {
				windowArr.push(chat);
				dataInWindow[windowKey] = windowArr;
			} else {
				windowArr = [...dataInWindow[windowKey]];

				if (windowArr.length === 0) {
					windowArr.push(chat);
				} else {
					let getIndex = windowArr.findIndex(
						(elem) => elem.options.controlId === chat.options.controlId
					);
					if (getIndex <= -1) {
						windowArr.push(chat);
					} else {
						if (chat.options.allowMinimize) {
							if (
								chat.options.stage === "COMPLETED" &&
								chat.options.minimizeOnConfirm
							) {
								chat.minimize = true;
							} else {
								removeStoreFormFromLocal();
							}
						}
						windowArr[getIndex] = chat;
					}
				}
				dataInWindow[windowKey] = windowArr;
			}
		}

		dispatch({
			type: SET_WINDOW,
			data: dataInWindow,
		});
	};
}

export function setChatFieldWindow(data, messageTypeResp) {
	return (dispatch, getState) => {
		let windowKey =
			(getState().chats &&
				getState().chats.selectedConversation &&
				getState().chats.selectedConversation.conversationId) ||
			null;

		if (!windowKey) {
			return;
		}
		let chatFieldWindowArray = [];

		// data.minimize = false;
		data.messageTypeResponse = messageTypeResp;
		let chatFieldWindowObj =
			getState().chats && getState().chats.chatFieldWindow
				? { ...getState().chats.chatFieldWindow }
				: {};

		if (Object.keys(chatFieldWindowObj).length === 0) {
			chatFieldWindowArray.push(data);
		} else {
			chatFieldWindowArray = [...chatFieldWindowObj[windowKey]];
			if (chatFieldWindowArray.length === 0) {
				chatFieldWindowArray.push(data);
			} else {
				let getIndex;
				if (data.conversationId) {
					getIndex = chatFieldWindowArray.findIndex(
						(elem) => elem.conversationId === data.conversationId
					);
				}

				if (data.videoSessionId) {
					getIndex = chatFieldWindowArray.findIndex(
						(elem) => elem.videoSessionId === data.videoSessionId
					);
				}

				if (getIndex <= -1) {
					chatFieldWindowArray.push(data);
				}
			}
		}

		chatFieldWindowObj[windowKey] = chatFieldWindowArray;
		dispatch({
			type: ADD_CHAT_FIELD_WINDOW,
			data: { ...chatFieldWindowObj },
		});
	};
}

export function removeChatFieldWindow(data) {
	return (dispatch, getState) => {
		let windowKey =
			(getState().chats &&
				getState().chats.selectedConversation &&
				getState().chats.selectedConversation.conversationId) ||
			null;

		if (!windowKey) {
			return;
		}

		let getWindowObj = { ...getState().chats.chatFieldWindow };
		let windowIdToRemove;

		if (data.conversationId) {
			windowIdToRemove = data.conversationId;
		}
		if (data.videoSessionId) {
			windowIdToRemove = data.videoSessionId;
		}
		let indexToRemove = null;
		let arr =
			getWindowObj && getWindowObj[windowKey]
				? [...getWindowObj[windowKey]]
				: [];

		if (arr && arr.length > 0) {
			arr.forEach((elem, index) => {
				if (elem.conversationId && windowIdToRemove === elem.conversationId) {
					indexToRemove = index;
				}
				if (elem.videoSessionId && windowIdToRemove === elem.videoSessionId) {
					indexToRemove = index;
				}
			});
		}
		if (indexToRemove !== null && indexToRemove > -1) {
			getWindowObj[windowKey].splice(indexToRemove, 1);
		}

		if (getWindowObj[windowKey].length === 0) {
			getWindowObj = {};
		}

		dispatch({ type: REMOVE_CHAT_FIELD_WINDOW, data: { ...getWindowObj } });
	};
}

export function resetComponentInWindowExceptForm(options) {
	return (dispatch, getState) => {
		const windowIdToKeep = (options && options.controlId) || null;
		let windowKey =
			(getState().chats &&
				getState().chats.selectedConversation &&
				getState().chats.selectedConversation.conversationId) ||
			null;
		let getWindowObj = { ...getState().chats.componentInWindow };
		let arr =
			getWindowObj && getWindowObj[windowKey]
				? [...getWindowObj[windowKey]]
				: [];
		if (!windowIdToKeep) {
			return;
		}
		let updatedWindowObj = arr.filter((elm) => {
			if (elm.options.controlId === windowIdToKeep) {
				return elm;
			}
		});
		getWindowObj[windowKey] = updatedWindowObj;
		dispatch({
			type: REMOVE_FROM_WINDOW,
			data: { ...getWindowObj },
		});
	};
}
export function removeFromWindow(data) {
	return (dispatch, getState) => {
		if (!data) {
			return;
		}
		let windowKey =
			(getState().chats &&
				getState().chats.selectedConversation &&
				getState().chats.selectedConversation.conversationId) ||
			null;
		let getWindowObj = _.cloneDeep(getState().chats.componentInWindow);
		let arr =
			getWindowObj && getWindowObj[windowKey]
				? _.cloneDeep(getWindowObj[windowKey])
				: [];
		if (!data.options.controlId) {
			return;
		}

		let windowIdToRemove = data.options.controlId;
		let indexToRemove = null;
		if (arr && arr.length > 0) {
			indexToRemove = arr.findIndex((elem) => {
				if (elem.options && elem.options.controlId) {
					return elem.options.controlId === windowIdToRemove;
				}
			});
		}

		/*
		(elem.message &&
						elem.message.controlId &&
						windowIdToRemove == elem.message.controlId)
		*/
		let windowArray = _.cloneDeep(getWindowObj[windowKey]);
		if (indexToRemove !== null && indexToRemove > -1) {
			windowArray.splice(indexToRemove, 1);
		}
		getWindowObj[windowKey] = windowArray;

		dispatch({
			type: REMOVE_FROM_WINDOW,
			data: { ...getWindowObj },
		});
	};
}

export function resetSelectedConversationFormInWindow(data, updatedObj) {
	return (dispatch, getState) => {
		let windowKey =
			(getState().chats &&
				getState().chats.selectedConversation &&
				getState().chats.selectedConversation.conversationId) ||
			null;
		if (!windowKey) {
			return;
		}
		let windowObj = { ...getState().chats.componentInWindow };
		let arr =
			windowObj && windowObj[windowKey] ? [...windowObj[windowKey]] : [];
		if (!data.options.controlId) {
			return;
		}
		let windowIdToReset = data.options.controlId;
		let indexToReset = null;
		if (arr && arr.length > 0) {
			arr.forEach((elem, index) => {
				if (
					elem.options.controlId &&
					windowIdToReset === elem.options.controlId
				) {
					indexToReset = index;
				}
			});
		}
		if (indexToReset !== null && indexToReset > -1) {
			let windowObjectToRest = windowObj[windowKey][indexToReset];
			Object.keys(updatedObj).forEach((fieldName) => {
				windowObjectToRest[fieldName] = updatedObj[fieldName];
			});
			// windowObjectToRest[fieldName] = updatedContent;
			windowObj[windowKey][indexToReset] = windowObjectToRest;
		}
		dispatch({
			type: REMOVE_FROM_WINDOW,
			data: { ...windowObj },
		});
	};
}

export function clearAcceptIgnoreButtons() {
	return { type: CLEAR_ACCEPT_IGNORE_CONTACT };
}

export function showChatNonConversational(status) {
	return {
		type: SHOW_CHAT_NON_CONVERSATIONAL,
		data: status,
	};
}

export function toggleTopNavBar() {
	return {
		type: TOGGLE_TOP_NAV_BAR,
	};
}

export function toggleSideNavBar(data) {
	return {
		type: TOGGLE_SIDE_NAV_BAR,
		data,
	};
}

export function fromSideBarHiddenFlag(data) {
	return {
		type: TOGGLE_SIDE_NAV_BAR_FLAG,
	};
}

export function removeCradsFromShowOnlyCards(data) {
	return (dispatch, getState) => {
		let cardArr = [...getState().chats.showOnlyCards];
		let getInd = cardArr.findIndex((elem) => data.cardId === elem.cardId);
		if (getInd > -1) {
			cardArr.splice(getInd, 1);
		}

		dispatch({ type: REMOVE_FROM_SHOW_CARDS_ONLY, data: cardArr });
	};
}

export function removeHTMLCotent() {
	return {
		type: REMOVE_HTML_CONTENT,
	};
}
export function removeURLCotent() {
	return {
		type: REMOVE_URL_CONTENT,
	};
}
export function removeCardCotent() {
	return {
		type: REMOVE_CARDS_CONTENT,
	};
}

export function removeNotificationMessage() {
	return {
		type: REMOVE_NOTIFICATION_MESSAGE,
	};
}

export function removeGenericErrorMsg(conversationId, controlId) {
	return (dispatch, getState) => {
		let getAllChats = _.cloneDeep(getState().chats.componentInWindow);
		let getTheComponentWindow = getAllChats[conversationId];
		getTheComponentWindow.forEach((elem) => {
			if (elem.options.controlId === controlId) {
				if (elem.genericError) {
					delete elem.genericError;
				}
			}
		});

		dispatch({
			type: REMOVE_GENERIC_ERROR,
			data: { ...getAllChats },
		});
	};
}

export function updateFieldsComponentInContainer(options, fields, type) {
	return (dispatch, getState) => {
		let windowKey =
			(getState().chats &&
				getState().chats.selectedConversation &&
				getState().chats.selectedConversation.conversationId) ||
			null;

		if (!windowKey) {
			return;
		}
		let componentInWindowData = getState().chats.componentInWindow;

		let getWindowObj = _.cloneDeep(componentInWindowData);
		let arr =
			getWindowObj && getWindowObj[windowKey] ? getWindowObj[windowKey] : [];

		let getIndexOfComponent = arr.findIndex(
			(elem) => elem.options.controlId === options.parent
		);

		if (getIndexOfComponent === -1) {
			return;
		} else {
			let containerObj = arr[getIndexOfComponent];
			let arrOfTabsInConatiner = containerObj.message;

			let getIndexOfTab = arrOfTabsInConatiner.findIndex(
				(elem) => elem.message.options.controlId === options.controlId
			);
			if (getIndexOfTab === -1) {
				return;
			} else {
				if (type === "form") {
					arrOfTabsInConatiner[getIndexOfTab].message.fields = [...fields];
				} else if (type === "table") {
					arrOfTabsInConatiner[getIndexOfTab].message.rows = [...fields];
				}
			}
		}

		dispatch({
			type: UPDATE_FIELDS_INSIDE_CONTAINER_COMPONENT,
			data: { ...getWindowObj },
		});
	};
}

export function updateContainerFormSelectedTab(messageId, selectedTab) {
	return (dispatch, getState) => {
		let chats = getState().chats;
		chats.componentInWindow[chats.selectedConversation.conversationId].map(
			(window) => {
				if (window.messageId === messageId) {
					window.selectedTab = selectedTab;
					return window;
				}
				return window;
			}
		);

		dispatch({
			type: UPDATE_CONTAINER_SELECTED_TAB,
			data: { chats },
		});
	};
}

// streamChatMessages is used to pool all chat messages every 10 sec
export const streamChatMessages = () => (dispatch, getState) => {
	if (!_.isEmpty(getState().user.user) && getState().user.isOnline) {
		// By default startTime is the 2 weeks back from current date
		// else it will be timestamp of last message fetched.
		let startTime = getUserMessagePoolTimestamp();
		// QueueServiceClient.GetPaginatedQueueMessages({ startTime })
		// 	.then((data) => {
		// 		if (!_.isEmpty(data.queueMessages)) {
		// 			// Parsing the queue messages as default it in Uinit8Array
		// 			let parsedQueueMessages = [];
		// 			let domain = {
		// 				selectedDomain: store.getState()?.selectedDomain?.userDomain,
		// 			};
		// 			data.queueMessages.forEach((message) => {
		// 				let contentType = parseInt(message.contentType);
		// 				switch (contentType) {
		// 					case 10002:
		// 					case 10001:
		// 					case 10003:
		// 					case 10004:
		// 					case 10005:
		// 					case 1001:
		// 						// dispatch(ingestMessage(_.cloneDeep(message)));
		// 						dispatch(updateContactList(_.cloneDeep(message)));
		// 						break;
		// 					case 11001:
		// 					case 11002:
		// 						dispatch(updateChannelList(_.cloneDeep(message)));
		// 						break;
		// 				}
		// 				parsedQueueMessages = parsedQueueMessages.concat(
		// 					parseMessages(message)
		// 				);
		// 			});

		// 			// Set startTime timestamp to last messages timestamp + 1
		// 			setUserMessagePoolTimestamp(
		// 				parsedQueueMessages[parsedQueueMessages.length - 1].createdOn + 1
		// 			);

		// 			console.log(
		// 				"%c Received new message:",
		// 				"color: green;",
		// 				parsedQueueMessages
		// 			);

		// 			// If the new msg is about being added in a new group, fetch the list of groups.
		// 			let isGroupUpdate = parsedQueueMessages.some(
		// 				(msg) =>
		// 					msg.messageType ===
		// 					MessageTypeConstants.MESSAGE_TYPE_STD_NOTIFICATION &&
		// 					msg.message &&
		// 					msg.message.includes("joined the group")
		// 			);
		// 			if (isGroupUpdate) {
		// 				store.dispatch(fetchAllChannels(domain));
		// 				store.dispatch(fetchSubscribedChannels(domain));
		// 			}

		// 			// As we pool for all chats we need to update messages
		// 			// for each conversation individually
		// 			let conversationMessages = _.groupBy(
		// 				parsedQueueMessages,
		// 				"conversation"
		// 			);
		// 			Object.entries(conversationMessages).forEach(
		// 				async ([conversationId, messages]) => {
		// 					let cacheMessages =
		// 						(await getDataFromLFStorage(
		// 							`${LFStorageKeys.MESSAGES}_${conversationId}`
		// 						)) || [];

		// 					if (
		// 						getState().chats.chatLog.get(conversationId) &&
		// 						getState().chats.chatLog.get(conversationId).length >= 0
		// 					) {
		// 						const userId = getState().user?.user?.userId;
		// 						if (userId && messages) {
		// 							// Update redux
		// 							dispatch(
		// 								onArchivedMessagesReceived(
		// 									conversationId,
		// 									messages,
		// 									false,
		// 									userId
		// 								)
		// 							);
		// 						}
		// 					}
		// 					// Update cache
		// 					cacheMessages = cacheMessages.concat(messages);
		// 					let uniqueMessages = _.uniqBy(cacheMessages, "messageId");
		// 					uniqueMessages = _.orderBy(
		// 						uniqueMessages,
		// 						["createdOn"],
		// 						["desc"]
		// 					);

		// 					saveDataInLFStorage(
		// 						`${LFStorageKeys.MESSAGES}_${conversationId}`,
		// 						uniqueMessages
		// 					);

		// 					// Update the unread messages count in timeline
		// 					let timeLine = _.cloneDeep(getState().chats.timeLine);
		// 					let timelineConversation = _.find(timeLine, {
		// 						conversationId,
		// 					});
		// 					if (timelineConversation) {
		// 						uniqueMessages.forEach((message) => {
		// 							if (
		// 								message.createdOn > timelineConversation.modifiedOn &&
		// 								!message.isOpened
		// 							) {
		// 								_.find(timeLine, { conversationId }).unreadCount += 1;
		// 							}
		// 						});
		// 						_.find(timeLine, {
		// 							conversationId,
		// 						}).modifiedOn = uniqueMessages[0].createdOn;
		// 						setUserMessagePoolTimestamp(uniqueMessages[0].createdOn + 1);
		// 						dispatch({
		// 							type: UPDATE_TIME_LINE,
		// 							data: {
		// 								timeLine,
		// 							},
		// 						});
		// 					}
		// 				}
		// 			);

		// 			// Queue Message is paginated and only send 30 messages at a time.
		// 			// So we pool again to get the data
		// 			setTimeout(() => {
		// 				dispatch(streamChatMessages());
		// 			}, 30000);
		// 		} else {
		// 			// Set startTime timestamp
		// 			setUserMessagePoolTimestamp(startTime);
		// 			// In case there is no new messages on pooling, then pool again after 10 sec
		// 			setTimeout(() => {
		// 				dispatch(streamChatMessages());
		// 			}, 30000);
		// 		}
		// 	})
		// 	.catch((error) => {
		// 		console.error("ERROR in GetPaginatedQueueMessages", error)
		// 		// When session is expired after 1 hour, we receive status 500 with code 16
		// 		if (error.response?.status === 500 && error.response?.data?.code === 16 && error.response?.data?.details === 'UNAUTHORIZED') {
		// 			dispatch(showSessionExpiredModal(true))
		// 		}
		// 	}
		// 	);
	}
};

export const resetUnreadMessagesCount = (data) => {
	return (dispatch, getState) => {
		// here we reset the count of unread messages across devices when opened from one instance
		const conversationId = data?.details[0]?.message.conversationId
		let timeLine = _.cloneDeep(getState().chats.timeLine);
		let index = _.findIndex(timeLine, { conversationId, }, 0);

		if (_.findIndex(timeLine, { conversationId, }) !== -1) {
			timeLine[index].unreadCount = 0;
			timeLine[index].newMessagesCount = 0;
			dispatch({
				type: UPDATE_TIME_LINE,
				data: { timeLine },
			});
		}
	};
}