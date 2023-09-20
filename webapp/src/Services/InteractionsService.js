import { MessageTypeConstants, IntToMessageTypeConstants } from "./Message";
import ConversationServiceClient from "./Clients/ConversationServiceClient";
import AgentGuardServiceClient from "./Clients/AgentGuardServiceClient";
import UserServiceClient from "./Clients/UserServiceClient";
import ServiceClientUtils from "./Clients/ServiceClientUtils";
import { IM_BOT } from "./../Utils/Constants";
import store from "./../State/configureStore";
import sha1 from "sha1";
import _ from "lodash";
import { updateMessageStatusForUser } from "../State/actions/chats";
import { getAuthData } from "../Services/StorageService";
import { sendMessageToBotContext } from "./BotsService";
const dayjs = require("dayjs");
const BACKEND_BOT_CAPABILITY_NAME = "BackendBotCap";
let tempMessages = [];
let tempMessageIntervel = null;

export function getConversationDetails(conversationId, botId, createdBy) {
	return ConversationServiceClient.fetchConversationDetails(
		conversationId,
		botId,
		createdBy
	)
		.then((data) => data)
		.catch((error) => {
			// todo show error
			console.log(error);
		});
}

export function placeMessageBasedOnTime(messages, newMessage) {
	if (!messages) {
		return;
	}
	if (messages.length === 0) {
		messages.push(newMessage);
		return;
	}

	for (let index = messages.length - 1; index >= 0; index--) {
		if (index !== undefined || index !== null) {
			if (messages[index].messageId === newMessage.messageId) {
				return;
			}
		}
	}

	let newIndex = messages.length;
	let newMessageTime = null;
	for (let index = messages.length - 1; index >= 0; index--) {
		if (index === undefined || index === null) {
			return;
		}
		let temp = messages[index];
		newMessageTime = new Date(newMessage.createdOn).getTime();
		let lastMessageTime = new Date(temp.createdOn).getTime();

		if (temp.self) {
			messages[newIndex] = newMessage;
			break;
		}

		if (newMessageTime < lastMessageTime) {
			messages[index] = newMessage;
			messages[newIndex] = temp;
			newIndex = index;
			newMessage = messages[newIndex];
		} else {
			messages[newIndex] = newMessage;
			break;
		}
	}
}

export function createTempConversation(
	conversationData,
	conversationId,
	botId
) {
	console.log("CONV", conversationData);
	if (!conversationData) {
		return;
	}
	const { conversationOwner, participants, userDomain } = conversationData;

	let userId = null,
		userName = null;
	if (conversationOwner) {
		userId = conversationOwner.userId;
		userName = conversationOwner.userName;
	}

	let tempConversation = {
		createdOn: dayjs().valueOf(),
		modifiedOn: dayjs().valueOf(),
		conversationId,
		contact: {
			userId,
			userName,
			emailAddress: "",
		},
		createdBy: userId,
		participants,
		bot: { botId },
		userDomain: userDomain,
	};

	if (conversationData.onChannels) {
		tempConversation.channel = conversationData.onChannels[0];
	}
	return tempConversation;
}

export function getOutgoingMessageRequest(
	conversation,
	command,
	responseMessage
) {
	let botId = null;
	if (!conversation) {
		return;
	}
	if (conversation.channel || conversation.contact) {
		botId = IM_BOT;
	} else {
		botId = conversation.bot.botId;
	}
	let outConversation = null;
	if (conversation.channel) {
		outConversation = {
			conversationId: conversation.conversationId,
			bot: botId,
			closed: false,
			participants: [],
			onChannels: [
				{
					channelName: conversation.channel.channelName,
					userDomain: conversation.channel.userDomain,
				},
			],
		};
	} else {
		if (botId === IM_BOT) {
			outConversation = {
				conversationId: conversation.conversationId,
				bot: botId,
				closed: false,
				participants: conversation.participants,
			};
		} else {
			outConversation = {
				conversationId: conversation.conversationId,
				bot: botId,
			};
		}
	}

	let data = {};
	if (responseMessage.message) {
		data.message = responseMessage.message;
	}
	if (responseMessage.messageType) {
		data.messageType = responseMessage.messageType;
	}
	if (responseMessage.messageId) {
		data.messageId = responseMessage.messageId;
	}
	if (responseMessage.options) {
		data.options = responseMessage.options;
	}
	// console.log("data we receive ", responseMessage);

	if (conversation.args) {
		return {
			parameters: JSON.stringify({
				botId: botId,
				command: command,
				data: data,
				args: { ...conversation.args },
			}),
			capability: BACKEND_BOT_CAPABILITY_NAME,
			conversation: outConversation,
			sync: false,
		};
	} else
		return {
			parameters: JSON.stringify({
				botId: botId,
				command: command,
				data: data,
			}),
			capability: BACKEND_BOT_CAPABILITY_NAME,
			conversation: outConversation,
			sync: false,
		};
}

export function getOutgoingMessageRequestChatView(
	conversation,
	command,
	responseMessage
) {
	let botId = null;
	if (!conversation) {
		return;
	}

	botId = conversation.bot.botId;

	let outConversation = null;

	if (botId === IM_BOT) {
		outConversation = {
			conversationId: conversation.conversationId,
			bot: botId,
			closed: false,
			participants: conversation.participants,
		};
	} else {
		outConversation = {
			conversationId: conversation.conversationId,
			bot: botId,
		};
	}

	let data = {};
	if (responseMessage.message) {
		data.message = responseMessage.message;
	}
	if (responseMessage.messageType) {
		data.messageType = responseMessage.messageType;
	}
	if (responseMessage.messageId) {
		data.messageId = responseMessage.messageId;
	}
	if (responseMessage.options) {
		data.options = responseMessage.options;
	}

	return {
		parameters: JSON.stringify({ botId: botId, command: command, data: data }),
		capability: BACKEND_BOT_CAPABILITY_NAME,
		conversation: outConversation,
		sync: false,
	};
}

//========================================
// NOTE: Queue for Web to Bot messages to
//			 avoid any race condition.
//========================================
let retryCount = 1;
let processing = false;
let queue = [];
let queueLength = 0;

const top = () => {
	if (queueLength > 0) {
		return queue[0];
	} else {
		return undefined;
	}
};
const pop = () => {
	if (queueLength > 0) {
		const val = queue.shift();
		queueLength--;
		return val;
	} else {
		return undefined;
	}
};
const processSendMessageMsg = async () => {
	if (processing) {
		return;
	}
	processing = true;
	while (top()) {
		const message = top();
		for (let i = 0; i < retryCount; ++i) {
			try {
				const success = await sendMessageToBotContext(message);
				if (success) {
					break;
				}
			} catch (e) {
				console.log("Error in handling message:", e);
			}
		}
		pop();
	}
	processing = false;
};

export function sendMessage(data) {
	queue[queueLength++] = data;
	if (queue.length === 1) {
		queueMicrotask(() => {
			processSendMessageMsg();
		});
	}
}

function createIMConversationId(firstUserId, secondUserId) {
	let userIds = [firstUserId, secondUserId];
	userIds.sort();
	const text = userIds.join("-");
	return sha1(text).substr(0, 22);
}

export function createIMConversation(userId, contact) {
	const conversationId = createIMConversationId(userId, contact.userId);
	return {
		createdOn: dayjs().valueOf(),
		modifiedOn: dayjs().valueOf(),
		conversationId,
		contact,
		bot: { botId: IM_BOT },
		createdBy: userId,
		participants: [userId, contact.userId],
		userDomain: "frontmai",
	};
}

export function createConversationId(userId, botId) {
	let ids = [userId, botId];
	ids.sort();
	const text = ids.join("-");
	return userId.substr(0, 10) + "-" + sha1(text).substr(0, 12);
}

export async function createNewConversation(
	userId,
	bot,
	command = "startConversation",
	message = ""
) {
	// const conversationId = uuidv4();
	const conversationId = createConversationId(userId, bot.botId);
	const data = {
		parameters: JSON.stringify({
			botId: bot.botId,
			command: command,
			data: { message: message },
		}),
		capability: BACKEND_BOT_CAPABILITY_NAME,
		conversation: {
			conversationId,
			bot: bot.botId,
			closed: false,
			participants: [userId],
		},
		sync: false,
	};
	AgentGuardServiceClient.execute(data).catch((error) => {
		throw new Error(error);
	});
	return {
		createdOn: dayjs().valueOf(),
		modifiedOn: dayjs().valueOf(),
		conversationId,
		bot,
		createdBy: userId,
		participants: [userId],
		userDomain: bot.userDomain,
	};
}

export function startChannelConversation(userId, channel) {
	const data = {
		parameters: JSON.stringify({
			botId: IM_BOT,
			command: "startConversation",
			data: {
				message: "",
			},
		}),
		capability: BACKEND_BOT_CAPABILITY_NAME,
		conversation: {
			conversationId: channel.channelId,
			bot: IM_BOT,
			closed: false,
			participants: [],
			onChannels: [
				{
					channelName: channel.channelName,
					userDomain: channel.userDomain,
				},
			],
		},
		sync: false,
	};
	return AgentGuardServiceClient.execute(data)
		.then((response) => {
			return {
				createdOn: dayjs().valueOf(),
				modifiedOn: dayjs().valueOf(),
				conversationId: channel.channelId,
				bot: { botId: IM_BOT },
				createdBy: userId,
				participants: [],
				channel: channel,
				userDomain: "frontmai",
				// channelName: channel.channelName,
				// channelDescription: channel.description
			};
		})
		.catch((error) => {
			throw new Error(error);
		});
}

export function getArchivedMessages(conversation) {
	let botId = conversation.bot.botId || conversation.bot;
	return ConversationServiceClient.fetchArchivedMessages(
		conversation.conversationId,
		botId
	).then((data) => {
		let messages = data.content || [];
		if (conversation.channel) {
			return getChannelConversationParticipants(conversation).then(
				(channelData) => {
					let participants = channelData.participants || [];
					let participantsMap = {};
					participants.forEach((pt) => {
						participantsMap[pt.userId] = pt;
					});
					return messages.map((message) => {
						let msg = convertArchivedMessageToWebMessage(message);
						msg.conversationOwner = participantsMap[msg.createdBy];
						return msg;
					});
				}
			);
		} else {
			let out = [];
			messages.forEach((message) => {
				out.push(convertArchivedMessageToWebMessage(message));
			});
			return out;
		}
	});
}

export function getPaginatedArchiveMessages(conversation, startTime, fetchDirection) {
	let botId = conversation.bot.botId;

	return ConversationServiceClient.fetchPaginatedArchiveMessage(
		conversation.conversationId,
		botId,
		startTime,
		fetchDirection
	).then((data) => {
		let messages = data.content || [];
		// console.log("all the messages ====> ", messages);
		if (conversation.channel) {
			return getChannelConversationParticipants(conversation).then(
				(channelData) => {
					let participants = (channelData && channelData.participants) || [];
					let participantsMap = {};
					participants.forEach((pt) => {
						participantsMap[pt.userId] = pt;
					});
					const out = messages.map((message) => {
						let msg = convertArchivedMessageToWebMessage(message);
						msg.conversationOwner = participantsMap[msg.createdBy];
						return msg;
					});
					return { messages: out, moreMessagesExist: data.moreMessagesExist };
				}
			);
		} else {
			let out = [];
			messages.forEach((message) => {
				out.push(convertArchivedMessageToWebMessage(message));
			});
			return { messages: out, moreMessagesExist: data.moreMessagesExist };
		}
	});
}

function convertArchivedMessageToWebMessage(message) {
	let type = IntToMessageTypeConstants[message.contentType];

	// if (type === MessageTypeConstants.MESSAGE_TYPE_MAP) {
	//   console.log("map message", message);
	// }

	message.content = ServiceClientUtils.parseBytesContent(message.content);
	message.options = ServiceClientUtils.parseBytesContent(message.options);

	let out = {
		messageType: type,
		message: type === "string" ? message.content[0] : message.content,
		createdBy: message.createdBy,
		createdOn: message.createdOn,
		messageId: message.messageId,
		options: message.options,
		archived: true,
		isDeleted: message.isDeleted,
		isDelivered: message.isDelivered,
		isOpened: message.isOpened,
	};
	if (type === MessageTypeConstants.MESSAGE_TYPE_FORM_RESPONSE) {
		out.options = out.options || {};
		out.options.stage = "COMPLETED";
	}
	return out;
}

export function getContactAddIgnoreMessages(sender) {
	return [
		[
			{
				msg:
					"User " +
					sender.userName +
					" would like to connect with you. Add user to contacts?",
			},
		],
		[
			{
				messageType: "button",
				msg: [
					{
						title: "Accept",
						action: "AddContact",
						user: sender,
						style: 1,
					},
					{
						title: "Ignore",
						action: "IgnoreContact",
						user: sender,
						style: 0,
					},
				],
				options: { smartReply: true },
			},
		],
	];
}

function getChannelConversationParticipants(selectedConv) {
	let conversation = { ...selectedConv };
	let cb = conversation.bot;
	conversation.bot = cb.botId;

	const data = {
		parameters: JSON.stringify({
			createdBy: store.getState().user.user.userId,
		}),
		capability: "GetChannelConversation",
		conversation: conversation,
		sync: true,
	};
	return AgentGuardServiceClient.execute(data)
		.then((data) => {
			return data ? (data.content ? data.content[0] : null) : null;
		})
		.catch((error) => {
			throw new Error(error);
		});
}

export function getConversationDescription(lastMessage, description) {
	if (!lastMessage) {
		return description;
	}

	if (lastMessage.contentType === 0 || lastMessage.messageType === 0) {
		return description;
	}

	let messageType = lastMessage.contentType || lastMessage.messageType;
	let type = IntToMessageTypeConstants[messageType]
		? IntToMessageTypeConstants[messageType]
		: messageType;
	if (!type) {
		if (typeof lastMessage.content === "object") {
			return lastMessage.content && lastMessage.content.title
				? lastMessage.content.title
				: description;
		} else if (Array.isArray(lastMessage.content)) {
			return lastMessage.content[lastMessage.content.length - 1];
		} else {
			return lastMessage.content;
		}
	}
	if (type === MessageTypeConstants.MESSAGE_TYPE_STRING) {
		if (typeof lastMessage.content === "object") {
			return lastMessage.content && lastMessage.content.title
				? lastMessage.content.title
				: description;
		} else if (Array.isArray(lastMessage.content)) {
			return lastMessage.content[lastMessage.content.length - 1];
		} else {
			return lastMessage.content;
		}
	} else {
		if (
			type === MessageTypeConstants.MESSAGE_TYPE_SLIDER ||
			type === MessageTypeConstants.MESSAGE_TYPE_SLIDER_RESPONSE
		) {
			return "OPTIONS";
		}
		if (typeof type === "string") {
			return type.toUpperCase();
		}
		return type;
	}
}

export function createLastMessage(message) {
	return {
		content: message.message,
		contentType: message.messageType,
		createdOn: message.createdOn,
	};
}

export function getLinkName(chat) {
	let type = chat.messageType;
	switch (type) {
		// case MessageTypeConstants.MESSAGE_TYPE_MAP:
		//    return "View Map";
		//   return <MapContent data={chat.message} thumbnail />;
		case MessageTypeConstants.MESSAGE_TYPE_SLIDER:
			return "View Options";
		case MessageTypeConstants.MESSAGE_TYPE_CHART:
			return "View Chart";
		// case MessageTypeConstants.MESSAGE_TYPE_FORM:
		// case MessageTypeConstants.MESSAGE_TYPE_FORM_RESPONSE:
		//   return chat.completed ? "View the form details" : "Please fill the form";
		// case MessageTypeConstants.MESSAGE_TYPE_IMAGE:
		//   return "View Image";
		case MessageTypeConstants.MESSAGE_TYPE_AUDIO:
			return "Listen to Audio";
		case MessageTypeConstants.MESSAGE_TYPE_VIDEO:
			return "View Video";
		case MessageTypeConstants.MESSAGE_TYPE_HTML:
			return "View HTML";
		case MessageTypeConstants.MESSAGE_TYPE_PDF:
			return "View PDF";
		case MessageTypeConstants.MESSAGE_TYPE_JAVASCRIPT:
			return "View JS file";
		case MessageTypeConstants.MESSAGE_TYPE_CSV:
			return "View CSV";
		case MessageTypeConstants.MESSAGE_TYPE_OTHER_FILE:
			return "View File";
		case MessageTypeConstants.MESSAGE_TYPE_TEXT:
			return "View Text File";
		default:
			return null;
	}
}

export function toggleConversationFavourite(
	conversationId,
	userDomain,
	action,
	userId,
	appType,
	botId,
	channel
) {
	const data = {
		conversationId,
		userDomain,
		action,
		userId,
		platform: "web",
		appType,
		botId,
		channel,
	};
	return ConversationServiceClient.updateFavourites(data)

		.then((data) => {
			// console.log("ADITYA89 checking data", data);
			return data ? (data.content ? data.content[0] : null) : null;
		})
		.catch((error) => {
			// console.log("ADITYA89 checking error", error);
			throw new Error(error);
		});
}

export function getUserDetails(userId) {
	return UserServiceClient.fetchUserDetails({ userId: userId })
		.then((userDetails) => {
			return userDetails;
		})
		.catch((error) => {
			throw new Error(error);
		});
}

export function shouldShowSpinner(
	newMessage,
	conversationId,
	selectedConversation,
	lastMessage
) {
	return (
		(!lastMessage ||
			new Date(lastMessage.createdOn).getTime() <
			new Date(newMessage.createdOn).getTime()) &&
		selectedConversation &&
		conversationId === selectedConversation.conversationId
	);
}

export function shouldShowSliderArea(messageType) {
	return (
		messageType === MessageTypeConstants.MESSAGE_TYPE_BUTTON ||
		messageType === MessageTypeConstants.MESSAGE_TYPE_SLIDER ||
		messageType === MessageTypeConstants.MESSAGE_TYPE_SMART_SUGGESTIONS
		// ||
		// messageType === MessageTypeConstants.MESSAGE_TYPE_CARDS
	);
}

export function checkIfConversationExists(state, conversationId) {
	let chatLog = state.chatLog;
	return chatLog.get(conversationId) && true;
}

export function getConversationIndex(timeLine, conversationId) {
	return timeLine.findIndex(
		(conversation) => conversation.conversationId === conversationId
	);
}

export function getConversationById(state, conversationId) {
	let timeLine = state.timeLine;
	let index = getConversationIndex(timeLine, conversationId);
	if (index !== -1) {
		return timeLine[index];
	}
	return null;
}

export function getConversationByBotId(state, botId) {
	let timeLine = state.timeLine;
	for (let i = 0; i < timeLine.length; i++) {
		if (timeLine[i].bot && botId === timeLine[i].bot.botId) {
			return timeLine[i];
		}
	}
	return null;
}

export function updateConversationMetaData(
	timeLine,
	selectedConversation,
	conversationId,
	message
) {
	const currentUserId = getAuthData()?.user.userId;
	if (
		tempMessages.filter((msg) => msg.messageId === message.messageId).length ===
		0
	) {
		tempMessages = [...tempMessages, message];
	}

	if (tempMessages) {
		tempMessageIntervel = setInterval(() => {
			if (
				tempMessages &&
				tempMessages.length &&
				!_.isEmpty(selectedConversation)
			) {
				// store.dispatch(
				// 	updateMessageStatusForUser(selectedConversation, tempMessages)
				// );
				tempMessages = [];
				clearInterval(tempMessageIntervel);
			}
		}, 5000);
	}

	let conversationIndex = getConversationIndex(timeLine, conversationId);
	let conversation = { ...timeLine[conversationIndex] };
	if (
		message.messageType === MessageTypeConstants.MESSAGE_TYPE_STRING ||
		message.messageType ===
		MessageTypeConstants.MESSAGE_TYPE_ACCEPT_IGNORE_CONTACT
	) {
		conversation.lastMessage = createLastMessage(message);
	}
	let newTimeLine = [...timeLine];
	if (
		!selectedConversation ||
		conversationId !== selectedConversation.conversationId
	) {
		// if (!message?.self) {
		// 	if (message?.createdBy !== currentUserId) {
		// 		conversation.newMessagesCount = conversation.newMessagesCount
		// 			? conversation.newMessagesCount + 1
		// 			: 1;
		// 		conversation.unreadCount = conversation.unreadCount + 1;
		// 	}
		// }
		newTimeLine.splice(conversationIndex, 1);
		newTimeLine.unshift(conversation);
	} else {
		newTimeLine[conversationIndex] = conversation;
	}
	return newTimeLine;
}

export function sortByModifiedOn(list) {
	list.sort(function (a, b) {
		if (a.modifiedOn < b.modifiedOn) return 1;
		if (a.modifiedOn > b.modifiedOn) return -1;
		return 0;
	});
}

export function shouldReplaceMessage(message) {
	let options = message.options || {};
	let toReplace =
		message.completed ||
		options.stage === "OPENED" ||
		options.stage === "COMPLETED";
	return toReplace;
}

export const REPLACEMENT_ENABLED_FOR = {
	map: { matcher: shouldReplaceMap },
};

export function shouldReplaceMap(message, newMessage) {
	let existingOptions = message.options;
	let newOptions = newMessage.options;
	return !!(
		existingOptions &&
		newOptions &&
		existingOptions.mapId === newOptions.mapId
	);
}

export function shouldReplaceMessageByType(messages, newMessage) {
	let messageType = newMessage.messageType;
	let type = REPLACEMENT_ENABLED_FOR[messageType];
	if (type) {
		let matcher = type.matcher;
		for (let i = messages.length - 1; i >= 0; i--) {
			let message = messages[i];

			if (!message.archived && matcher && matcher(message, newMessage)) {
				return i;
			}
			//   newMessage.options &&
			//   newMessage.options[type.path] &&
			//   newMessage.options[type.path] === message.options[type.path]
			// ) {
			//
			// }
			//
			// if (
			//   newMessage.message &&
			//   newMessage.message.options &&
			//   message.message &&
			//   message.message.options &&
			//   newMessage.message.options[type.path] ===
			//     message.message.options[type.path]
			// ) {
			//   return i;
			// }
		}
		return -1;
	}
	return -1;
}
