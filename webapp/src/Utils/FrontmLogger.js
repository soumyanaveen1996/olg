import { addLog } from "../Services/UtilsService";
export class FrontmLogger {
	constructor(
		userDomain,
		userId,
		userEmail,
		botId,
		conversationId,
		entity,
		client,
		location,
		more
	) {
		this.userId = userId;
		this.userDomain = userDomain;
		this.userEmail = userEmail;
		this.botId = botId;
		this.conversationId = conversationId;
		this.entity = entity;
		this.location = location;
		this.client = client;
		this.more = more;
	}

	logInfo(message, additionalData, errorCode = 0) {
		const log_message = {
			type: "SYSTEM",
			more: JSON.stringify(this.more),
			data: additionalData ? JSON.stringify(additionalData) : undefined,
			entry: {
				userDomain: this.userDomain,
				userId: this.userId,
				userEmail: this.userEmail,
				botId: this.botId,
				conversationId: this.conversationId,
				entity: this.entity,
				client: this.client,
				location: this.location,
				timestamp: Math.round(new Date().getTime()),
				level: "INFO",
				errorCode,
				message,
			},
		};
		addLog(log_message);
	}
	logWarning(message, additionalData, errorCode = 0) {
		const log_message = {
			type: "SYSTEM",
			more: JSON.stringify(this.more),
			data: additionalData ? JSON.stringify(additionalData) : undefined,
			entry: {
				userDomain: this.userDomain,
				userId: this.userId,
				userEmail: this.userEmail,
				botId: this.botId,
				conversationId: this.conversationId,
				entity: this.entity,
				client: this.client,
				location: this.location,
				timestamp: Math.round(new Date().getTime()),
				level: "WARNING",
				errorCode,
				message,
			},
		};
		addLog(log_message);
	}
	logError(message, additionalData, errorCode = 0) {
		const log_message = {
			type: "SYSTEM",
			more: JSON.stringify(this.more),
			data: additionalData ? JSON.stringify(additionalData) : undefined,
			entry: {
				userDomain: this.userDomain,
				userId: this.userId,
				userEmail: this.userEmail,
				botId: this.botId,
				conversationId: this.conversationId,
				entity: this.entity,
				client: this.client,
				location: this.location,
				timestamp: Math.round(new Date().getTime()),
				level: "ERROR",
				errorCode,
				message,
			},
		};
		addLog(log_message);
	}
	logDebug(message, additionalData, errorCode = 0) {
		const log_message = {
			type: "SYSTEM",
			more: JSON.stringify(this.more),
			data: additionalData ? JSON.stringify(additionalData) : undefined,
			entry: {
				userDomain: this.userDomain,
				userId: this.userId,
				userEmail: this.userEmail,
				botId: this.botId,
				conversationId: this.conversationId,
				entity: this.entity,
				client: this.client,
				location: this.location,
				timestamp: Math.round(new Date().getTime()),
				level: "DEBUG",
				errorCode,
				message,
			},
		};
		addLog(log_message);
	}
}
