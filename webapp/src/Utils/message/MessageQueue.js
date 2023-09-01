import { Auth, Message, UpdateCallQuota, Utils, Contact } from "../capability";
import { Queue, IMBotMessageHandler } from "../network";
import { MessageDAO, NetworkDAO } from "../persistence";
import EventEmitter, { AuthEvents, MessageEvents } from "../events";
import { BackgroundTaskProcessor } from "../BackgroundTask";
import Store from "../../redux/store/configureStore";

export default class MessageQueue {
	constructor(options = {}) {
		this.retryCount = options.retryCount || 1;
		this.processing = false;
		this.queue = [];
		this.queueLength = 0;
	}

	subscribeToEvents() {
		EventEmitter.addListener(
			AuthEvents.userDataFetched,
			this.userLoggedInHandler.bind(this)
		);
		EventEmitter.addListener(
			AuthEvents.userLoggedOut,
			this.userLoggedOutHandler.bind(this)
		);
	}

	userLoggedInHandler() {
		console.log("User data fetched : ");
		this.clear();
	}

	userLoggedOutHandler() {
		this.clear();
	}

	push(message) {
		if (
			Store.getState().bots.isDebugEnabledByBot &&
			message.bot === Store.getState().bots.id
		) {
			Utils.addLogEntry({
				type: "SYSTEM",
				entry: {
					level: "LOG",
					botId: message.bot,
					conversationId: message.conversation,
					message: "Message received",
				},
			});
		}

		this.queue[this.queueLength++] = message;
		this.process();
	}

	top() {
		if (this.queueLength > 0) {
			return this.queue[0];
		} else {
			return undefined;
		}
	}

	clear() {
		while (this.top()) {
			this.pop();
		}
	}

	pop() {
		if (this.queueLength > 0) {
			const val = this.queue.shift();
			this.queueLength--;
			return val;
		} else {
			return undefined;
		}
	}

	async isMessageAlreadyProcessed(message) {
		if (message.bot === "") {
			if (
				message.contentType !== 11000 ||
				message.contentType !== 10001 ||
				message.contentType !== 10002 ||
				message.contentType !== 10003
			) {
				return false;
			}

			return true;
		}
		if (
			message.messageId === "" ||
			message.messageId == null ||
			!message.messageId
		) {
			// No message id
			return false;
		}
		try {
			const networkItem = await NetworkDAO.selectByMessageId(message.messageId);
			const dbMessage = await MessageDAO.selectMessageById(message.messageId);
			if (dbMessage || networkItem) {
				// Message Already processed',
				return true;
			}
		} catch (error) {
			console.log("Error while checking message : ", error);
		}
		return false;
	}

	async handleMessage(message) {
		console.log(`hangleMessge: ${JSON.stringify(message)}`);
		let user = await Auth.getUser();
		console.log(`hangleMessge: ${JSON.stringify(message)}`);

		const alreadyProcessed = await this.isMessageAlreadyProcessed(message);
		if (alreadyProcessed) {
			return true;
		}

		let bot = message.bot;
		// Name of the bot is the key, unless its IMBot (one to many relationship)
		if (bot === "im-bot" || bot === "channels-bot") {
			await IMBotMessageHandler.handleMessage(message, user);
		} else {
			// If our Bot is currently in Foreground then Handle Differently
			const activeBot = Store.getState().bots.id;
			const messageBot = message.bot;
			if (activeBot && activeBot === messageBot) {
				EventEmitter.emit(MessageEvents.messageProcessed, {
					message,
					botId: messageBot,
				});
			} else {
				if (message.contentType === 11000) {
					const newBalance = message.details[0].message["pstn-balance"];
					if (message.details.length > 0 && newBalance) {
						UpdateCallQuota({
							error: message.error,
							callQuota: newBalance,
						});
					}
				}
				if (
					message.contentType === 10001 ||
					message.contentType === 10002 ||
					message.contentType === 10003
				) {
					Contact.refreshContacts();
				} else if (message.contentType === 25010) {
					console.log("voipCall: CallData message 25010");
					EventEmitter.emit(
						MessageEvents.callMessage,
						message.details[0].message
					);
				} else if (message.contentType === 25020) {
					console.log("voipCall: CallData message 25020");

					EventEmitter.emit(
						MessageEvents.callMessage,
						message.details[0].message
					);
				}
				await BackgroundTaskProcessor.sendBackgroundAsyncMessage(
					message,
					message.bot,
					message.conversation
				);
			}
		}
		return true;
	}

	async process() {
		if (this.processing) {
			return;
		}
		this.processing = true;
		while (this.top()) {
			const message = this.top();
			for (let i = 0; i < this.retryCount; ++i) {
				try {
					const success = await this.handleMessage(message);

					if (success) {
						break;
					}
				} catch (e) {
					console.log("==> Error in handling message : ", e);
				}
			}
			this.pop();
		}
		this.processing = false;
	}
}
