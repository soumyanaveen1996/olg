import { DeviceStorage } from "./DeviceStorage";
import { UUID } from "./Utils";
import _ from "lodash";
import { createConversationId } from "../Helpers";
const constants = {
	SOURCE: "web2",
};

/**
 * Format of a conversation context
 *   {
 *       conversationId: UUID(),
 *       creatorInstanceId: UUID(),
 *       participants: [user.userId, other_participant's_uuids],
 *       onChannels: [],
 *       closed: false
 *   };
 */
export default class ConversationContext {
	constructor() {
		this.DeviceStorage = new DeviceStorage();
		/**
		 * Retruns a conversation context. A conversation context is of the format:
		 */
		this.getConversationContext = (botContext, user, channel = false) =>
			new Promise((resolve, reject) => {
				// Have we cached one in botContext? if so return it - for performance and repeat calls in bots:
				if (botContext.getConversationContext()) {
					return resolve({ ...botContext.getConversationContext(), userAgent: navigator.userAgent });
				}

				// Else get it from storage
				ConversationContext._getBotConversationContext(botContext)
					.then(function (context) {
						if (context) {
							botContext.setConversationContext(context);
							return resolve({ ...context, userAgent: navigator.userAgent });
						}
						return resolve(
							ConversationContext.createAndSaveNewConversationContext(
								botContext,
								user
							)
						);
					})
					.catch((err) => {
						reject(err);
					});
			});

		this.fetchConversationContext = (botContext, user, channel = false) =>
			new Promise((resolve, reject) => {
				// Have we cached one in botContext? if so return it - for performance and repeat calls in bots:
				if (botContext.getConversationContext()) {
					return resolve(botContext.getConversationContext());
				}

				// Else get it from storage
				ConversationContext._getBotConversationContext(botContext)
					.then(function (context) {
						return resolve(context);
					})
					.catch((err) => {
						reject(err);
					});
			});

		this.getIMConversationContext = (botContext, user, conversationId) =>
			new Promise((resolve, reject) => {
				// Have we cached one in botContext? if so return it - for performance and repeat calls in bots:
				if (botContext.getConversationContext()) {
					return resolve(botContext.getConversationContext());
				}

				// Else get it from storage
				ConversationContext._getBotConversationContext(botContext)
					.then(function (context) {
						if (context) {
							botContext.setConversationContext(context);
							return resolve(context);
						}
						return resolve(
							ConversationContext.createAndSaveNewConversationContext(
								botContext,
								user,
								conversationId
							)
						);
					})
					.catch((err) => {
						reject(err);
					});
			});

		this.fetchIMConversationContext = (botContext, user, conversationId) =>
			new Promise((resolve, reject) => {
				// Have we cached one in botContext? if so return it - for performance and repeat calls in bots:
				if (botContext.getConversationContext()) {
					return resolve(botContext.getConversationContext());
				}

				// Else get it from storage
				ConversationContext._getBotConversationContext(botContext)
					.then(function (context) {
						if (context) {
							botContext.setConversationContext(context);
						}
						return resolve(context);
					})
					.catch((err) => {
						reject(err);
					});
			});

		this.getChannelConversationContext = (botContext, user, channel) =>
			new Promise((resolve, reject) => {
				// Have we cached one in botContext? if so return it - for performance and repeat calls in bots:
				if (botContext.getConversationContext()) {
					return resolve(botContext.getConversationContext());
				}

				// Else get it from storage
				ConversationContext._getBotConversationContext(botContext)
					.then(function (context) {
						if (context) {
							botContext.setConversationContext(context);
							return resolve(context);
						}
						return resolve(
							ConversationContext.createAndSaveNewChannelConversationContext(
								botContext,
								user,
								channel
							)
						);
					})
					.catch((err) => {
						reject(err);
					});
			});

		this.getPreviousConversationContexts = (botContext, user) =>
			new Promise((resolve, reject) => {
				// TODO: to implement
				resolve([]);
			});

		this.activateConversationContext = (context, botContext, user) =>
			new Promise((resolve, reject) => {
				// TODO: to implement
				resolve(true);
			});

		this.setInstanceId = (instanceId, botContext) =>
			new Promise((resolve, reject) => {
				ConversationContext._getBotConversationContext(botContext)
					.then(function (context) {
						if (!context) {
							return resolve();
						}
						context.instanceId = instanceId;
						botContext.setConversationContext(context);
						return resolve(
							this.DeviceStorage.save(
								ConversationContext._getStorageKey(botContext),
								context
							)
						);
					})
					.catch((err) => {
						reject(err);
					});
			});

		this.setConversationCreated = (botContext, created = true) =>
			new Promise((resolve, reject) => {
				ConversationContext._getBotConversationContext(botContext)
					.then(function (context) {
						if (!context) {
							return resolve();
						}
						context.created = created;
						botContext.setConversationContext(context);
						let newDeviceStorage = new DeviceStorage();
						return resolve(
							newDeviceStorage.save(
								ConversationContext._getStorageKey(botContext),
								context
							)
						);
					})
					.catch((err) => {
						reject(err);
					});
			});

		this.setParticipants = (participants, botContext) =>
			new Promise((resolve, reject) => {
				if (!participants || participants.length < 1) {
					resolve();
				}
				ConversationContext._getBotConversationContext(botContext)
					.then(function (context) {
						if (!context) {
							return resolve();
						}
						context.participants = participants;
						botContext.setConversationContext(context);
						let newDeviceStorage = new DeviceStorage();
						return resolve(
							newDeviceStorage.save(
								ConversationContext._getStorageKey(botContext),
								context
							)
						);
					})
					.catch((err) => {
						reject(err);
					});
			});

		this.addParticipants = (participants, botContext) =>
			new Promise((resolve, reject) => {
				if (!participants || participants.length < 1) {
					resolve();
				}
				console.log("Participants : ", participants);
				ConversationContext._getBotConversationContext(botContext)
					.then(function (context) {
						if (!context) {
							return resolve();
						}
						const allParticipants = context.participants.concat(participants);
						context.participants = allParticipants;
						botContext.setConversationContext(context);
						let newDeviceStorage = new DeviceStorage();
						return resolve(
							newDeviceStorage.save(
								ConversationContext._getStorageKey(botContext),
								context
							)
						);
					})
					.catch((err) => {
						reject(err);
					});
			});

		this.setConversational = (conversational, botContext) =>
			new Promise((resolve, reject) => {
				ConversationContext._getBotConversationContext(botContext)
					.then(function (context) {
						if (!context) {
							return resolve();
						}
						context.conversational = conversational;
						botContext.setConversationContext(context);
						let newDeviceStorage = new DeviceStorage();
						return resolve(
							newDeviceStorage.save(
								ConversationContext._getStorageKey(botContext),
								context
							)
						);
					})
					.catch((err) => {
						reject(err);
					});
			});

		this.getBotConversationContextForId = (conversationId) =>
			new Promise((resolve, reject) => {
				let newDeviceStorage = new DeviceStorage();
				newDeviceStorage
					.get(ConversationContext._getStorageKeyForId(conversationId))
					.then(function (context) {
						return resolve(context);
					})
					.catch((err) => {
						reject(err);
					});
			});

		this.getChatName = function (conversationContext, user) {
			if (!conversationContext) {
				return;
			}

			if (conversationContext.onChannels.length > 0) {
				return conversationContext.onChannels[0].channelName;
			} else {
				const otherParticipants = _.filter(
					conversationContext.participantsInfo,
					(p) => {
						return p.userId !== user.userId;
					}
				);
				const names = _.map(otherParticipants, "userName");
				return names.join(",");
			}
		};

		this.deleteConversationContext = (conversationId) =>
			new Promise((resolve, reject) => {
				let newDeviceStorage = new DeviceStorage();
				newDeviceStorage
					.delete(ConversationContext._getStorageKeyForId(conversationId))
					.then(function (ctx) {
						resolve(true);
					})
					.catch(() => {
						resolve(false);
					});
			});

		this.getOtherUserId = function (conversationContext, user) {
			if (!conversationContext) {
				return;
			}
			const otherParticipants = _.filter(
				conversationContext.participantsInfo,
				(p) => {
					return p.userId !== user.userId;
				}
			);
			if (otherParticipants.length === 1) {
				return otherParticipants[0].userId;
			}
			return undefined;
		};

		this.updateParticipants = function (conversationContext, participants) {
			let filteredParticipants = _.filter(participants, (participant) => {
				return (
					_.find(
						conversationContext.participants,
						(p) => p === participant.userId
					) === undefined
				);
			});
			conversationContext.participantsInfo =
				conversationContext.participantsInfo || [];
			conversationContext.participants = conversationContext.participants || [];
			conversationContext.participantsInfo =
				conversationContext.participantsInfo.concat(filteredParticipants);
			conversationContext.participants =
				conversationContext.participants.concat(
					_.map(filteredParticipants, "userId")
				);
		};
	}

	static _getBotConversationContext = (botContext) =>
		new Promise((resolve, reject) => {
			let newDeviceStorage = new DeviceStorage();
			newDeviceStorage
				.get(ConversationContext._getStorageKey(botContext))
				.then(function (context) {
					return resolve(context);
				})
				.catch((err) => {
					reject(err);
				});
		});

	static _getStorageKey = function (botContext) {
		const key = botContext.getBotKey();
		return "conversation-" + key;
	};

	static _getStorageKeyForId = function (id) {
		return "conversation-" + id;
	};

	static createAndSaveNewConversationContext = (
		botContext,
		user,
		conversationId
	) => {
		return new Promise((resolve, reject) => {
			ConversationContext.createNewConversationContext(
				botContext,
				user,
				conversationId
			)
				.then(function (ctx) {
					return ConversationContext.saveConversationContext(
						ctx,
						botContext,
						user
					);
				})
				.then(function (ctx) {
					return resolve(ctx);
				})
				.catch((err) => {
					reject(err);
				});
		});
	};
	static createAndSaveNewChannelConversationContext = (
		botContext,
		user,
		channel
	) => {
		return new Promise((resolve, reject) => {
			ConversationContext.createNewChannelConversationContext(
				botContext,
				user,
				channel
			)
				.then(function (ctx) {
					return ConversationContext.saveConversationContext(
						ctx,
						botContext,
						user,
						true
					);
				})
				.then(function (ctx) {
					return resolve(ctx);
				})
				.catch((err) => {
					reject(err);
				});
		});
	};

	static saveConversationContext = (
		conversationContext,
		botContext,
		user,
		isChannel = false
	) =>
		new Promise((resolve, reject) => {
			if (!isChannel && conversationContext.participants.length < 0) {
				reject();
			} else {
				let newDeviceStorage = new DeviceStorage();
				newDeviceStorage
					.save(
						ConversationContext._getStorageKey(botContext),
						conversationContext
					)
					.then(function (ctx) {
						botContext.setConversationContext(ctx);
						return resolve(ctx);
					})
					.catch((err) => {
						reject(err);
					});
			}
		});

	static createNewConversationContext = (
		botContext,
		user,
		conversationId = undefined
	) =>
		new Promise((resolve, reject) => {
			if (user) {
				const context = {
					conversationId:
						conversationId ||
						createConversationId(user.userId, botContext.getBotId()),
					creatorInstanceId: user.userId,
					creator: {
						userName: user.info.userName,
						uuid: user.userId,
					},
					participantsInfo: [
						{ userName: user.info.userName, userId: user.userId },
					],
					participants: [user.userId],
					onChannels: [],
					closed: false,
					client: constants.SOURCE,
					userDomain: botContext.userDomain,
				};
				resolve(context);
			} else {
				const context = {
					conversationId:
						conversationId ||
						createConversationId(undefined, botContext.getBotId()),
					participantsInfo: [],
					participants: [],
					onChannels: [],
					client: constants.SOURCE,
					closed: false,
				};
				resolve(context);
			}
		});

	static createNewChannelConversationContext = (
		botContext,
		currentUser,
		channel,
		conversationId = undefined
	) =>
		new Promise((resolve, reject) => {
			if (currentUser && channel) {
				const context = {
					conversationId: conversationId || UUID(),
					creatorInstanceId: currentUser.userId,
					onChannels: [
						{
							channelName: channel.channelName,
							userDomain: channel.userDomain,
						},
					],
					client: constants.SOURCE,
					closed: false,
				};
				resolve(context);
			} else {
				const context = {
					conversationId: conversationId || UUID(),
					participantsInfo: [],
					participants: [],
					onChannels: [],
					client: constants.SOURCE,
					closed: false,
				};
				resolve(context);
			}
		});
}
