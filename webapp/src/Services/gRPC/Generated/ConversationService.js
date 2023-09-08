/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader,
	$Writer = $protobuf.Writer,
	$util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.conversation = (function () {
	/**
	 * Namespace conversation.
	 * @exports conversation
	 * @namespace
	 */
	var conversation = {};

	conversation.ConversationService = (function () {
		/**
		 * Constructs a new ConversationService service.
		 * @memberof conversation
		 * @classdesc Represents a ConversationService
		 * @extends $protobuf.rpc.Service
		 * @constructor
		 * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
		 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
		 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
		 */
		function ConversationService(rpcImpl, requestDelimited, responseDelimited) {
			$protobuf.rpc.Service.call(
				this,
				rpcImpl,
				requestDelimited,
				responseDelimited
			);
		}

		(ConversationService.prototype = Object.create(
			$protobuf.rpc.Service.prototype
		)).constructor = ConversationService;

		/**
		 * Creates new ConversationService service using the specified rpc implementation.
		 * @function create
		 * @memberof conversation.ConversationService
		 * @static
		 * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
		 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
		 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
		 * @returns {ConversationService} RPC service. Useful where requests and/or responses are streamed.
		 */
		ConversationService.create = function create(
			rpcImpl,
			requestDelimited,
			responseDelimited
		) {
			return new this(rpcImpl, requestDelimited, responseDelimited);
		};

		/**
		 * Callback as used by {@link conversation.ConversationService#updateFavourites}.
		 * @memberof conversation.ConversationService
		 * @typedef UpdateFavouritesCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {conversation.UpdateFavouritesResponse} [response] UpdateFavouritesResponse
		 */

		/**
		 * Calls UpdateFavourites.
		 * @function updateFavourites
		 * @memberof conversation.ConversationService
		 * @instance
		 * @param {conversation.IUpdateFavouritesInput} request UpdateFavouritesInput message or plain object
		 * @param {conversation.ConversationService.UpdateFavouritesCallback} callback Node-style callback called with the error, if any, and UpdateFavouritesResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(ConversationService.prototype.updateFavourites =
				function updateFavourites(request, callback) {
					return this.rpcCall(
						updateFavourites,
						$root.conversation.UpdateFavouritesInput,
						$root.conversation.UpdateFavouritesResponse,
						request,
						callback
					);
				}),
			"name",
			{ value: "UpdateFavourites" }
		);

		/**
		 * Calls UpdateFavourites.
		 * @function updateFavourites
		 * @memberof conversation.ConversationService
		 * @instance
		 * @param {conversation.IUpdateFavouritesInput} request UpdateFavouritesInput message or plain object
		 * @returns {Promise<conversation.UpdateFavouritesResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link conversation.ConversationService#getTimeline}.
		 * @memberof conversation.ConversationService
		 * @typedef GetTimelineCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {conversation.TimelineResponse} [response] TimelineResponse
		 */

		/**
		 * Calls GetTimeline.
		 * @function getTimeline
		 * @memberof conversation.ConversationService
		 * @instance
		 * @param {conversation.ITimeLineInput} request TimeLineInput message or plain object
		 * @param {conversation.ConversationService.GetTimelineCallback} callback Node-style callback called with the error, if any, and TimelineResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(ConversationService.prototype.getTimeline = function getTimeline(
				request,
				callback
			) {
				return this.rpcCall(
					getTimeline,
					$root.conversation.TimeLineInput,
					$root.conversation.TimelineResponse,
					request,
					callback
				);
			}),
			"name",
			{ value: "GetTimeline" }
		);

		/**
		 * Calls GetTimeline.
		 * @function getTimeline
		 * @memberof conversation.ConversationService
		 * @instance
		 * @param {conversation.ITimeLineInput} request TimeLineInput message or plain object
		 * @returns {Promise<conversation.TimelineResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link conversation.ConversationService#getCatalog}.
		 * @memberof conversation.ConversationService
		 * @typedef GetCatalogCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {conversation.CatalogResponse} [response] CatalogResponse
		 */

		/**
		 * Calls GetCatalog.
		 * @function getCatalog
		 * @memberof conversation.ConversationService
		 * @instance
		 * @param {conversation.ICatalogInput} request CatalogInput message or plain object
		 * @param {conversation.ConversationService.GetCatalogCallback} callback Node-style callback called with the error, if any, and CatalogResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(ConversationService.prototype.getCatalog = function getCatalog(
				request,
				callback
			) {
				return this.rpcCall(
					getCatalog,
					$root.conversation.CatalogInput,
					$root.conversation.CatalogResponse,
					request,
					callback
				);
			}),
			"name",
			{ value: "GetCatalog" }
		);

		/**
		 * Calls GetCatalog.
		 * @function getCatalog
		 * @memberof conversation.ConversationService
		 * @instance
		 * @param {conversation.ICatalogInput} request CatalogInput message or plain object
		 * @returns {Promise<conversation.CatalogResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link conversation.ConversationService#getConversationDetails}.
		 * @memberof conversation.ConversationService
		 * @typedef GetConversationDetailsCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {conversation.GetConversationDetailsResponse} [response] GetConversationDetailsResponse
		 */

		/**
		 * Calls GetConversationDetails.
		 * @function getConversationDetails
		 * @memberof conversation.ConversationService
		 * @instance
		 * @param {conversation.IGetConversationDetailsInput} request GetConversationDetailsInput message or plain object
		 * @param {conversation.ConversationService.GetConversationDetailsCallback} callback Node-style callback called with the error, if any, and GetConversationDetailsResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(ConversationService.prototype.getConversationDetails =
				function getConversationDetails(request, callback) {
					return this.rpcCall(
						getConversationDetails,
						$root.conversation.GetConversationDetailsInput,
						$root.conversation.GetConversationDetailsResponse,
						request,
						callback
					);
				}),
			"name",
			{ value: "GetConversationDetails" }
		);

		/**
		 * Calls GetConversationDetails.
		 * @function getConversationDetails
		 * @memberof conversation.ConversationService
		 * @instance
		 * @param {conversation.IGetConversationDetailsInput} request GetConversationDetailsInput message or plain object
		 * @returns {Promise<conversation.GetConversationDetailsResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link conversation.ConversationService#getArchivedMessages}.
		 * @memberof conversation.ConversationService
		 * @typedef GetArchivedMessagesCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {conversation.GetArchivedMessagesResponse} [response] GetArchivedMessagesResponse
		 */

		/**
		 * Calls GetArchivedMessages.
		 * @function getArchivedMessages
		 * @memberof conversation.ConversationService
		 * @instance
		 * @param {conversation.IGetArchivedMessagesInput} request GetArchivedMessagesInput message or plain object
		 * @param {conversation.ConversationService.GetArchivedMessagesCallback} callback Node-style callback called with the error, if any, and GetArchivedMessagesResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(ConversationService.prototype.getArchivedMessages =
				function getArchivedMessages(request, callback) {
					return this.rpcCall(
						getArchivedMessages,
						$root.conversation.GetArchivedMessagesInput,
						$root.conversation.GetArchivedMessagesResponse,
						request,
						callback
					);
				}),
			"name",
			{ value: "GetArchivedMessages" }
		);

		/**
		 * Calls GetArchivedMessages.
		 * @function getArchivedMessages
		 * @memberof conversation.ConversationService
		 * @instance
		 * @param {conversation.IGetArchivedMessagesInput} request GetArchivedMessagesInput message or plain object
		 * @returns {Promise<conversation.GetArchivedMessagesResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link conversation.ConversationService#getPaginatedArchivedMessages}.
		 * @memberof conversation.ConversationService
		 * @typedef GetPaginatedArchivedMessagesCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {conversation.GetPaginatedArchivedMessagesResponse} [response] GetPaginatedArchivedMessagesResponse
		 */

		/**
		 * Calls GetPaginatedArchivedMessages.
		 * @function getPaginatedArchivedMessages
		 * @memberof conversation.ConversationService
		 * @instance
		 * @param {conversation.IGetPaginatedArchivedMessagesInput} request GetPaginatedArchivedMessagesInput message or plain object
		 * @param {conversation.ConversationService.GetPaginatedArchivedMessagesCallback} callback Node-style callback called with the error, if any, and GetPaginatedArchivedMessagesResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(ConversationService.prototype.getPaginatedArchivedMessages =
				function getPaginatedArchivedMessages(request, callback) {
					return this.rpcCall(
						getPaginatedArchivedMessages,
						$root.conversation.GetPaginatedArchivedMessagesInput,
						$root.conversation.GetPaginatedArchivedMessagesResponse,
						request,
						callback
					);
				}),
			"name",
			{ value: "GetPaginatedArchivedMessages" }
		);

		/**
		 * Calls GetPaginatedArchivedMessages.
		 * @function getPaginatedArchivedMessages
		 * @memberof conversation.ConversationService
		 * @instance
		 * @param {conversation.IGetPaginatedArchivedMessagesInput} request GetPaginatedArchivedMessagesInput message or plain object
		 * @returns {Promise<conversation.GetPaginatedArchivedMessagesResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link conversation.ConversationService#resetConversation}.
		 * @memberof conversation.ConversationService
		 * @typedef ResetConversationCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {commonmessages.Empty} [response] Empty
		 */

		/**
		 * Calls ResetConversation.
		 * @function resetConversation
		 * @memberof conversation.ConversationService
		 * @instance
		 * @param {conversation.IResetConversationInput} request ResetConversationInput message or plain object
		 * @param {conversation.ConversationService.ResetConversationCallback} callback Node-style callback called with the error, if any, and Empty
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(ConversationService.prototype.resetConversation =
				function resetConversation(request, callback) {
					return this.rpcCall(
						resetConversation,
						$root.conversation.ResetConversationInput,
						$root.commonmessages.Empty,
						request,
						callback
					);
				}),
			"name",
			{ value: "ResetConversation" }
		);

		/**
		 * Calls ResetConversation.
		 * @function resetConversation
		 * @memberof conversation.ConversationService
		 * @instance
		 * @param {conversation.IResetConversationInput} request ResetConversationInput message or plain object
		 * @returns {Promise<commonmessages.Empty>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link conversation.ConversationService#getFavouriteConversations}.
		 * @memberof conversation.ConversationService
		 * @typedef GetFavouriteConversationsCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {conversation.FavouritesResponse} [response] FavouritesResponse
		 */

		/**
		 * Calls GetFavouriteConversations.
		 * @function getFavouriteConversations
		 * @memberof conversation.ConversationService
		 * @instance
		 * @param {commonmessages.ISelectedDomainInput} request SelectedDomainInput message or plain object
		 * @param {conversation.ConversationService.GetFavouriteConversationsCallback} callback Node-style callback called with the error, if any, and FavouritesResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(ConversationService.prototype.getFavouriteConversations =
				function getFavouriteConversations(request, callback) {
					return this.rpcCall(
						getFavouriteConversations,
						$root.commonmessages.SelectedDomainInput,
						$root.conversation.FavouritesResponse,
						request,
						callback
					);
				}),
			"name",
			{ value: "GetFavouriteConversations" }
		);

		/**
		 * Calls GetFavouriteConversations.
		 * @function getFavouriteConversations
		 * @memberof conversation.ConversationService
		 * @instance
		 * @param {commonmessages.ISelectedDomainInput} request SelectedDomainInput message or plain object
		 * @returns {Promise<conversation.FavouritesResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link conversation.ConversationService#updateMessageStatusForUser}.
		 * @memberof conversation.ConversationService
		 * @typedef UpdateMessageStatusForUserCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {conversation.MessageStatusResponse} [response] MessageStatusResponse
		 */

		/**
		 * Calls UpdateMessageStatusForUser.
		 * @function updateMessageStatusForUser
		 * @memberof conversation.ConversationService
		 * @instance
		 * @param {conversation.IMessageStatusInput} request MessageStatusInput message or plain object
		 * @param {conversation.ConversationService.UpdateMessageStatusForUserCallback} callback Node-style callback called with the error, if any, and MessageStatusResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(ConversationService.prototype.updateMessageStatusForUser =
				function updateMessageStatusForUser(request, callback) {
					return this.rpcCall(
						updateMessageStatusForUser,
						$root.conversation.MessageStatusInput,
						$root.conversation.MessageStatusResponse,
						request,
						callback
					);
				}),
			"name",
			{ value: "UpdateMessageStatusForUser" }
		);

		/**
		 * Calls UpdateMessageStatusForUser.
		 * @function updateMessageStatusForUser
		 * @memberof conversation.ConversationService
		 * @instance
		 * @param {conversation.IMessageStatusInput} request MessageStatusInput message or plain object
		 * @returns {Promise<conversation.MessageStatusResponse>} Promise
		 * @variation 2
		 */

		return ConversationService;
	})();

	conversation.TimeLineInput = (function () {
		/**
		 * Properties of a TimeLineInput.
		 * @memberof conversation
		 * @interface ITimeLineInput
		 * @property {boolean|null} [isWebRequest] TimeLineInput isWebRequest
		 */

		/**
		 * Constructs a new TimeLineInput.
		 * @memberof conversation
		 * @classdesc Represents a TimeLineInput.
		 * @implements ITimeLineInput
		 * @constructor
		 * @param {conversation.ITimeLineInput=} [properties] Properties to set
		 */
		function TimeLineInput(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * TimeLineInput isWebRequest.
		 * @member {boolean} isWebRequest
		 * @memberof conversation.TimeLineInput
		 * @instance
		 */
		TimeLineInput.prototype.isWebRequest = false;

		/**
		 * Creates a new TimeLineInput instance using the specified properties.
		 * @function create
		 * @memberof conversation.TimeLineInput
		 * @static
		 * @param {conversation.ITimeLineInput=} [properties] Properties to set
		 * @returns {conversation.TimeLineInput} TimeLineInput instance
		 */
		TimeLineInput.create = function create(properties) {
			return new TimeLineInput(properties);
		};

		/**
		 * Encodes the specified TimeLineInput message. Does not implicitly {@link conversation.TimeLineInput.verify|verify} messages.
		 * @function encode
		 * @memberof conversation.TimeLineInput
		 * @static
		 * @param {conversation.ITimeLineInput} message TimeLineInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		TimeLineInput.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.isWebRequest !== null &&
				Object.hasOwnProperty.call(message, "isWebRequest")
			)
				writer.uint32(/* id 1, wireType 0 =*/ 8).bool(message.isWebRequest);
			return writer;
		};

		/**
		 * Encodes the specified TimeLineInput message, length delimited. Does not implicitly {@link conversation.TimeLineInput.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof conversation.TimeLineInput
		 * @static
		 * @param {conversation.ITimeLineInput} message TimeLineInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		TimeLineInput.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a TimeLineInput message from the specified reader or buffer.
		 * @function decode
		 * @memberof conversation.TimeLineInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {conversation.TimeLineInput} TimeLineInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		TimeLineInput.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.conversation.TimeLineInput();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.isWebRequest = reader.bool();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a TimeLineInput message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof conversation.TimeLineInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {conversation.TimeLineInput} TimeLineInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		TimeLineInput.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a TimeLineInput message.
		 * @function verify
		 * @memberof conversation.TimeLineInput
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		TimeLineInput.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (
				message.isWebRequest !== null &&
				message.hasOwnProperty("isWebRequest")
			)
				if (typeof message.isWebRequest !== "boolean")
					return "isWebRequest: boolean expected";
			return null;
		};

		/**
		 * Creates a TimeLineInput message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof conversation.TimeLineInput
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {conversation.TimeLineInput} TimeLineInput
		 */
		TimeLineInput.fromObject = function fromObject(object) {
			if (object instanceof $root.conversation.TimeLineInput) return object;
			var message = new $root.conversation.TimeLineInput();
			if (object.isWebRequest !== null)
				message.isWebRequest = Boolean(object.isWebRequest);
			return message;
		};

		/**
		 * Creates a plain object from a TimeLineInput message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof conversation.TimeLineInput
		 * @static
		 * @param {conversation.TimeLineInput} message TimeLineInput
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		TimeLineInput.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) object.isWebRequest = false;
			if (
				message.isWebRequest !== null &&
				message.hasOwnProperty("isWebRequest")
			)
				object.isWebRequest = message.isWebRequest;
			return object;
		};

		/**
		 * Converts this TimeLineInput to JSON.
		 * @function toJSON
		 * @memberof conversation.TimeLineInput
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		TimeLineInput.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return TimeLineInput;
	})();

	conversation.UpdateFavouritesInput = (function () {
		/**
		 * Properties of an UpdateFavouritesInput.
		 * @memberof conversation
		 * @interface IUpdateFavouritesInput
		 * @property {string|null} [action] UpdateFavouritesInput action
		 * @property {string|null} [userDomain] UpdateFavouritesInput userDomain
		 * @property {string|null} [conversationId] UpdateFavouritesInput conversationId
		 * @property {string|null} [channelName] UpdateFavouritesInput channelName
		 * @property {string|null} [userId] UpdateFavouritesInput userId
		 * @property {string|null} [botId] UpdateFavouritesInput botId
		 */

		/**
		 * Constructs a new UpdateFavouritesInput.
		 * @memberof conversation
		 * @classdesc Represents an UpdateFavouritesInput.
		 * @implements IUpdateFavouritesInput
		 * @constructor
		 * @param {conversation.IUpdateFavouritesInput=} [properties] Properties to set
		 */
		function UpdateFavouritesInput(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * UpdateFavouritesInput action.
		 * @member {string} action
		 * @memberof conversation.UpdateFavouritesInput
		 * @instance
		 */
		UpdateFavouritesInput.prototype.action = "";

		/**
		 * UpdateFavouritesInput userDomain.
		 * @member {string} userDomain
		 * @memberof conversation.UpdateFavouritesInput
		 * @instance
		 */
		UpdateFavouritesInput.prototype.userDomain = "";

		/**
		 * UpdateFavouritesInput conversationId.
		 * @member {string} conversationId
		 * @memberof conversation.UpdateFavouritesInput
		 * @instance
		 */
		UpdateFavouritesInput.prototype.conversationId = "";

		/**
		 * UpdateFavouritesInput channelName.
		 * @member {string} channelName
		 * @memberof conversation.UpdateFavouritesInput
		 * @instance
		 */
		UpdateFavouritesInput.prototype.channelName = "";

		/**
		 * UpdateFavouritesInput userId.
		 * @member {string} userId
		 * @memberof conversation.UpdateFavouritesInput
		 * @instance
		 */
		UpdateFavouritesInput.prototype.userId = "";

		/**
		 * UpdateFavouritesInput botId.
		 * @member {string} botId
		 * @memberof conversation.UpdateFavouritesInput
		 * @instance
		 */
		UpdateFavouritesInput.prototype.botId = "";

		/**
		 * Creates a new UpdateFavouritesInput instance using the specified properties.
		 * @function create
		 * @memberof conversation.UpdateFavouritesInput
		 * @static
		 * @param {conversation.IUpdateFavouritesInput=} [properties] Properties to set
		 * @returns {conversation.UpdateFavouritesInput} UpdateFavouritesInput instance
		 */
		UpdateFavouritesInput.create = function create(properties) {
			return new UpdateFavouritesInput(properties);
		};

		/**
		 * Encodes the specified UpdateFavouritesInput message. Does not implicitly {@link conversation.UpdateFavouritesInput.verify|verify} messages.
		 * @function encode
		 * @memberof conversation.UpdateFavouritesInput
		 * @static
		 * @param {conversation.IUpdateFavouritesInput} message UpdateFavouritesInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		UpdateFavouritesInput.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.action !== null &&
				Object.hasOwnProperty.call(message, "action")
			)
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.action);
			if (
				message.userDomain !== null &&
				Object.hasOwnProperty.call(message, "userDomain")
			)
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.userDomain);
			if (
				message.conversationId !== null &&
				Object.hasOwnProperty.call(message, "conversationId")
			)
				writer
					.uint32(/* id 3, wireType 2 =*/ 26)
					.string(message.conversationId);
			if (
				message.channelName !== null &&
				Object.hasOwnProperty.call(message, "channelName")
			)
				writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.channelName);
			if (
				message.userId !== null &&
				Object.hasOwnProperty.call(message, "userId")
			)
				writer.uint32(/* id 5, wireType 2 =*/ 42).string(message.userId);
			if (
				message.botId !== null &&
				Object.hasOwnProperty.call(message, "botId")
			)
				writer.uint32(/* id 6, wireType 2 =*/ 50).string(message.botId);
			return writer;
		};

		/**
		 * Encodes the specified UpdateFavouritesInput message, length delimited. Does not implicitly {@link conversation.UpdateFavouritesInput.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof conversation.UpdateFavouritesInput
		 * @static
		 * @param {conversation.IUpdateFavouritesInput} message UpdateFavouritesInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		UpdateFavouritesInput.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes an UpdateFavouritesInput message from the specified reader or buffer.
		 * @function decode
		 * @memberof conversation.UpdateFavouritesInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {conversation.UpdateFavouritesInput} UpdateFavouritesInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		UpdateFavouritesInput.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.conversation.UpdateFavouritesInput();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.action = reader.string();
						break;
					case 2:
						message.userDomain = reader.string();
						break;
					case 3:
						message.conversationId = reader.string();
						break;
					case 4:
						message.channelName = reader.string();
						break;
					case 5:
						message.userId = reader.string();
						break;
					case 6:
						message.botId = reader.string();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes an UpdateFavouritesInput message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof conversation.UpdateFavouritesInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {conversation.UpdateFavouritesInput} UpdateFavouritesInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		UpdateFavouritesInput.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies an UpdateFavouritesInput message.
		 * @function verify
		 * @memberof conversation.UpdateFavouritesInput
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		UpdateFavouritesInput.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.action !== null && message.hasOwnProperty("action"))
				if (!$util.isString(message.action)) return "action: string expected";
			if (message.userDomain !== null && message.hasOwnProperty("userDomain"))
				if (!$util.isString(message.userDomain))
					return "userDomain: string expected";
			if (
				message.conversationId !== null &&
				message.hasOwnProperty("conversationId")
			)
				if (!$util.isString(message.conversationId))
					return "conversationId: string expected";
			if (message.channelName !== null && message.hasOwnProperty("channelName"))
				if (!$util.isString(message.channelName))
					return "channelName: string expected";
			if (message.userId !== null && message.hasOwnProperty("userId"))
				if (!$util.isString(message.userId)) return "userId: string expected";
			if (message.botId !== null && message.hasOwnProperty("botId"))
				if (!$util.isString(message.botId)) return "botId: string expected";
			return null;
		};

		/**
		 * Creates an UpdateFavouritesInput message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof conversation.UpdateFavouritesInput
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {conversation.UpdateFavouritesInput} UpdateFavouritesInput
		 */
		UpdateFavouritesInput.fromObject = function fromObject(object) {
			if (object instanceof $root.conversation.UpdateFavouritesInput)
				return object;
			var message = new $root.conversation.UpdateFavouritesInput();
			if (object.action !== null) message.action = String(object.action);
			if (object.userDomain !== null)
				message.userDomain = String(object.userDomain);
			if (object.conversationId !== null)
				message.conversationId = String(object.conversationId);
			if (object.channelName !== null)
				message.channelName = String(object.channelName);
			if (object.userId !== null) message.userId = String(object.userId);
			if (object.botId !== null) message.botId = String(object.botId);
			return message;
		};

		/**
		 * Creates a plain object from an UpdateFavouritesInput message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof conversation.UpdateFavouritesInput
		 * @static
		 * @param {conversation.UpdateFavouritesInput} message UpdateFavouritesInput
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		UpdateFavouritesInput.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.action = "";
				object.userDomain = "";
				object.conversationId = "";
				object.channelName = "";
				object.userId = "";
				object.botId = "";
			}
			if (message.action !== null && message.hasOwnProperty("action"))
				object.action = message.action;
			if (message.userDomain !== null && message.hasOwnProperty("userDomain"))
				object.userDomain = message.userDomain;
			if (
				message.conversationId !== null &&
				message.hasOwnProperty("conversationId")
			)
				object.conversationId = message.conversationId;
			if (message.channelName !== null && message.hasOwnProperty("channelName"))
				object.channelName = message.channelName;
			if (message.userId !== null && message.hasOwnProperty("userId"))
				object.userId = message.userId;
			if (message.botId !== null && message.hasOwnProperty("botId"))
				object.botId = message.botId;
			return object;
		};

		/**
		 * Converts this UpdateFavouritesInput to JSON.
		 * @function toJSON
		 * @memberof conversation.UpdateFavouritesInput
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		UpdateFavouritesInput.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return UpdateFavouritesInput;
	})();

	conversation.UpdateFavouritesResponse = (function () {
		/**
		 * Properties of an UpdateFavouritesResponse.
		 * @memberof conversation
		 * @interface IUpdateFavouritesResponse
		 * @property {string|null} [error] UpdateFavouritesResponse error
		 */

		/**
		 * Constructs a new UpdateFavouritesResponse.
		 * @memberof conversation
		 * @classdesc Represents an UpdateFavouritesResponse.
		 * @implements IUpdateFavouritesResponse
		 * @constructor
		 * @param {conversation.IUpdateFavouritesResponse=} [properties] Properties to set
		 */
		function UpdateFavouritesResponse(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * UpdateFavouritesResponse error.
		 * @member {string} error
		 * @memberof conversation.UpdateFavouritesResponse
		 * @instance
		 */
		UpdateFavouritesResponse.prototype.error = "";

		/**
		 * Creates a new UpdateFavouritesResponse instance using the specified properties.
		 * @function create
		 * @memberof conversation.UpdateFavouritesResponse
		 * @static
		 * @param {conversation.IUpdateFavouritesResponse=} [properties] Properties to set
		 * @returns {conversation.UpdateFavouritesResponse} UpdateFavouritesResponse instance
		 */
		UpdateFavouritesResponse.create = function create(properties) {
			return new UpdateFavouritesResponse(properties);
		};

		/**
		 * Encodes the specified UpdateFavouritesResponse message. Does not implicitly {@link conversation.UpdateFavouritesResponse.verify|verify} messages.
		 * @function encode
		 * @memberof conversation.UpdateFavouritesResponse
		 * @static
		 * @param {conversation.IUpdateFavouritesResponse} message UpdateFavouritesResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		UpdateFavouritesResponse.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.error !== null &&
				Object.hasOwnProperty.call(message, "error")
			)
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.error);
			return writer;
		};

		/**
		 * Encodes the specified UpdateFavouritesResponse message, length delimited. Does not implicitly {@link conversation.UpdateFavouritesResponse.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof conversation.UpdateFavouritesResponse
		 * @static
		 * @param {conversation.IUpdateFavouritesResponse} message UpdateFavouritesResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		UpdateFavouritesResponse.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes an UpdateFavouritesResponse message from the specified reader or buffer.
		 * @function decode
		 * @memberof conversation.UpdateFavouritesResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {conversation.UpdateFavouritesResponse} UpdateFavouritesResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		UpdateFavouritesResponse.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.conversation.UpdateFavouritesResponse();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.error = reader.string();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes an UpdateFavouritesResponse message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof conversation.UpdateFavouritesResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {conversation.UpdateFavouritesResponse} UpdateFavouritesResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		UpdateFavouritesResponse.decodeDelimited = function decodeDelimited(
			reader
		) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies an UpdateFavouritesResponse message.
		 * @function verify
		 * @memberof conversation.UpdateFavouritesResponse
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		UpdateFavouritesResponse.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.error !== null && message.hasOwnProperty("error"))
				if (!$util.isString(message.error)) return "error: string expected";
			return null;
		};

		/**
		 * Creates an UpdateFavouritesResponse message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof conversation.UpdateFavouritesResponse
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {conversation.UpdateFavouritesResponse} UpdateFavouritesResponse
		 */
		UpdateFavouritesResponse.fromObject = function fromObject(object) {
			if (object instanceof $root.conversation.UpdateFavouritesResponse)
				return object;
			var message = new $root.conversation.UpdateFavouritesResponse();
			if (object.error !== null) message.error = String(object.error);
			return message;
		};

		/**
		 * Creates a plain object from an UpdateFavouritesResponse message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof conversation.UpdateFavouritesResponse
		 * @static
		 * @param {conversation.UpdateFavouritesResponse} message UpdateFavouritesResponse
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		UpdateFavouritesResponse.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) object.error = "";
			if (message.error !== null && message.hasOwnProperty("error"))
				object.error = message.error;
			return object;
		};

		/**
		 * Converts this UpdateFavouritesResponse to JSON.
		 * @function toJSON
		 * @memberof conversation.UpdateFavouritesResponse
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		UpdateFavouritesResponse.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return UpdateFavouritesResponse;
	})();

	conversation.TimelineResponse = (function () {
		/**
		 * Properties of a TimelineResponse.
		 * @memberof conversation
		 * @interface ITimelineResponse
		 * @property {string|null} [error] TimelineResponse error
		 * @property {conversation.ITimelineContent|null} [content] TimelineResponse content
		 */

		/**
		 * Constructs a new TimelineResponse.
		 * @memberof conversation
		 * @classdesc Represents a TimelineResponse.
		 * @implements ITimelineResponse
		 * @constructor
		 * @param {conversation.ITimelineResponse=} [properties] Properties to set
		 */
		function TimelineResponse(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * TimelineResponse error.
		 * @member {string} error
		 * @memberof conversation.TimelineResponse
		 * @instance
		 */
		TimelineResponse.prototype.error = "";

		/**
		 * TimelineResponse content.
		 * @member {conversation.ITimelineContent|null|undefined} content
		 * @memberof conversation.TimelineResponse
		 * @instance
		 */
		TimelineResponse.prototype.content = null;

		/**
		 * Creates a new TimelineResponse instance using the specified properties.
		 * @function create
		 * @memberof conversation.TimelineResponse
		 * @static
		 * @param {conversation.ITimelineResponse=} [properties] Properties to set
		 * @returns {conversation.TimelineResponse} TimelineResponse instance
		 */
		TimelineResponse.create = function create(properties) {
			return new TimelineResponse(properties);
		};

		/**
		 * Encodes the specified TimelineResponse message. Does not implicitly {@link conversation.TimelineResponse.verify|verify} messages.
		 * @function encode
		 * @memberof conversation.TimelineResponse
		 * @static
		 * @param {conversation.ITimelineResponse} message TimelineResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		TimelineResponse.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.error !== null &&
				Object.hasOwnProperty.call(message, "error")
			)
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.error);
			if (
				message.content !== null &&
				Object.hasOwnProperty.call(message, "content")
			)
				$root.conversation.TimelineContent.encode(
					message.content,
					writer.uint32(/* id 2, wireType 2 =*/ 18).fork()
				).ldelim();
			return writer;
		};

		/**
		 * Encodes the specified TimelineResponse message, length delimited. Does not implicitly {@link conversation.TimelineResponse.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof conversation.TimelineResponse
		 * @static
		 * @param {conversation.ITimelineResponse} message TimelineResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		TimelineResponse.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a TimelineResponse message from the specified reader or buffer.
		 * @function decode
		 * @memberof conversation.TimelineResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {conversation.TimelineResponse} TimelineResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		TimelineResponse.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.conversation.TimelineResponse();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.error = reader.string();
						break;
					case 2:
						message.content = $root.conversation.TimelineContent.decode(
							reader,
							reader.uint32()
						);
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a TimelineResponse message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof conversation.TimelineResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {conversation.TimelineResponse} TimelineResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		TimelineResponse.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a TimelineResponse message.
		 * @function verify
		 * @memberof conversation.TimelineResponse
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		TimelineResponse.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.error !== null && message.hasOwnProperty("error"))
				if (!$util.isString(message.error)) return "error: string expected";
			if (message.content !== null && message.hasOwnProperty("content")) {
				var error = $root.conversation.TimelineContent.verify(message.content);
				if (error) return "content." + error;
			}
			return null;
		};

		/**
		 * Creates a TimelineResponse message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof conversation.TimelineResponse
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {conversation.TimelineResponse} TimelineResponse
		 */
		TimelineResponse.fromObject = function fromObject(object) {
			if (object instanceof $root.conversation.TimelineResponse) return object;
			var message = new $root.conversation.TimelineResponse();
			if (object.error !== null) message.error = String(object.error);
			if (object.content !== null) {
				if (typeof object.content !== "object")
					throw TypeError(
						".conversation.TimelineResponse.content: object expected"
					);
				message.content = $root.conversation.TimelineContent.fromObject(
					object.content
				);
			}
			return message;
		};

		/**
		 * Creates a plain object from a TimelineResponse message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof conversation.TimelineResponse
		 * @static
		 * @param {conversation.TimelineResponse} message TimelineResponse
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		TimelineResponse.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.error = "";
				object.content = null;
			}
			if (message.error !== null && message.hasOwnProperty("error"))
				object.error = message.error;
			if (message.content !== null && message.hasOwnProperty("content"))
				object.content = $root.conversation.TimelineContent.toObject(
					message.content,
					options
				);
			return object;
		};

		/**
		 * Converts this TimelineResponse to JSON.
		 * @function toJSON
		 * @memberof conversation.TimelineResponse
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		TimelineResponse.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return TimelineResponse;
	})();

	conversation.TimelineContent = (function () {
		/**
		 * Properties of a TimelineContent.
		 * @memberof conversation
		 * @interface ITimelineContent
		 * @property {Array.<conversation.ITimelineConversation>|null} [conversations] TimelineContent conversations
		 * @property {Array.<conversation.ITimelineConversation>|null} [favourites] TimelineContent favourites
		 */

		/**
		 * Constructs a new TimelineContent.
		 * @memberof conversation
		 * @classdesc Represents a TimelineContent.
		 * @implements ITimelineContent
		 * @constructor
		 * @param {conversation.ITimelineContent=} [properties] Properties to set
		 */
		function TimelineContent(properties) {
			this.conversations = [];
			this.favourites = [];
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * TimelineContent conversations.
		 * @member {Array.<conversation.ITimelineConversation>} conversations
		 * @memberof conversation.TimelineContent
		 * @instance
		 */
		TimelineContent.prototype.conversations = $util.emptyArray;

		/**
		 * TimelineContent favourites.
		 * @member {Array.<conversation.ITimelineConversation>} favourites
		 * @memberof conversation.TimelineContent
		 * @instance
		 */
		TimelineContent.prototype.favourites = $util.emptyArray;

		/**
		 * Creates a new TimelineContent instance using the specified properties.
		 * @function create
		 * @memberof conversation.TimelineContent
		 * @static
		 * @param {conversation.ITimelineContent=} [properties] Properties to set
		 * @returns {conversation.TimelineContent} TimelineContent instance
		 */
		TimelineContent.create = function create(properties) {
			return new TimelineContent(properties);
		};

		/**
		 * Encodes the specified TimelineContent message. Does not implicitly {@link conversation.TimelineContent.verify|verify} messages.
		 * @function encode
		 * @memberof conversation.TimelineContent
		 * @static
		 * @param {conversation.ITimelineContent} message TimelineContent message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		TimelineContent.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.conversations !== null && message.conversations.length)
				for (var i = 0; i < message.conversations.length; ++i)
					$root.conversation.TimelineConversation.encode(
						message.conversations[i],
						writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
					).ldelim();
			if (message.favourites !== null && message.favourites.length)
				for (var i = 0; i < message.favourites.length; ++i)
					$root.conversation.TimelineConversation.encode(
						message.favourites[i],
						writer.uint32(/* id 2, wireType 2 =*/ 18).fork()
					).ldelim();
			return writer;
		};

		/**
		 * Encodes the specified TimelineContent message, length delimited. Does not implicitly {@link conversation.TimelineContent.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof conversation.TimelineContent
		 * @static
		 * @param {conversation.ITimelineContent} message TimelineContent message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		TimelineContent.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a TimelineContent message from the specified reader or buffer.
		 * @function decode
		 * @memberof conversation.TimelineContent
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {conversation.TimelineContent} TimelineContent
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		TimelineContent.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.conversation.TimelineContent();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						if (!(message.conversations && message.conversations.length))
							message.conversations = [];
						message.conversations.push(
							$root.conversation.TimelineConversation.decode(
								reader,
								reader.uint32()
							)
						);
						break;
					case 2:
						if (!(message.favourites && message.favourites.length))
							message.favourites = [];
						message.favourites.push(
							$root.conversation.TimelineConversation.decode(
								reader,
								reader.uint32()
							)
						);
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a TimelineContent message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof conversation.TimelineContent
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {conversation.TimelineContent} TimelineContent
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		TimelineContent.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a TimelineContent message.
		 * @function verify
		 * @memberof conversation.TimelineContent
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		TimelineContent.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (
				message.conversations !== null &&
				message.hasOwnProperty("conversations")
			) {
				if (!Array.isArray(message.conversations))
					return "conversations: array expected";
				for (var i = 0; i < message.conversations.length; ++i) {
					var error = $root.conversation.TimelineConversation.verify(
						message.conversations[i]
					);
					if (error) return "conversations." + error;
				}
			}
			if (message.favourites !== null && message.hasOwnProperty("favourites")) {
				if (!Array.isArray(message.favourites))
					return "favourites: array expected";
				for (var i = 0; i < message.favourites.length; ++i) {
					var error = $root.conversation.TimelineConversation.verify(
						message.favourites[i]
					);
					if (error) return "favourites." + error;
				}
			}
			return null;
		};

		/**
		 * Creates a TimelineContent message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof conversation.TimelineContent
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {conversation.TimelineContent} TimelineContent
		 */
		TimelineContent.fromObject = function fromObject(object) {
			if (object instanceof $root.conversation.TimelineContent) return object;
			var message = new $root.conversation.TimelineContent();
			if (object.conversations) {
				if (!Array.isArray(object.conversations))
					throw TypeError(
						".conversation.TimelineContent.conversations: array expected"
					);
				message.conversations = [];
				for (var i = 0; i < object.conversations.length; ++i) {
					if (typeof object.conversations[i] !== "object")
						throw TypeError(
							".conversation.TimelineContent.conversations: object expected"
						);
					message.conversations[i] =
						$root.conversation.TimelineConversation.fromObject(
							object.conversations[i]
						);
				}
			}
			if (object.favourites) {
				if (!Array.isArray(object.favourites))
					throw TypeError(
						".conversation.TimelineContent.favourites: array expected"
					);
				message.favourites = [];
				for (var i = 0; i < object.favourites.length; ++i) {
					if (typeof object.favourites[i] !== "object")
						throw TypeError(
							".conversation.TimelineContent.favourites: object expected"
						);
					message.favourites[i] =
						$root.conversation.TimelineConversation.fromObject(
							object.favourites[i]
						);
				}
			}
			return message;
		};

		/**
		 * Creates a plain object from a TimelineContent message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof conversation.TimelineContent
		 * @static
		 * @param {conversation.TimelineContent} message TimelineContent
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		TimelineContent.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.arrays || options.defaults) {
				object.conversations = [];
				object.favourites = [];
			}
			if (message.conversations && message.conversations.length) {
				object.conversations = [];
				for (var j = 0; j < message.conversations.length; ++j)
					object.conversations[j] =
						$root.conversation.TimelineConversation.toObject(
							message.conversations[j],
							options
						);
			}
			if (message.favourites && message.favourites.length) {
				object.favourites = [];
				for (var j = 0; j < message.favourites.length; ++j)
					object.favourites[j] =
						$root.conversation.TimelineConversation.toObject(
							message.favourites[j],
							options
						);
			}
			return object;
		};

		/**
		 * Converts this TimelineContent to JSON.
		 * @function toJSON
		 * @memberof conversation.TimelineContent
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		TimelineContent.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return TimelineContent;
	})();

	conversation.TimelineConversation = (function () {
		/**
		 * Properties of a TimelineConversation.
		 * @memberof conversation
		 * @interface ITimelineConversation
		 * @property {boolean|null} [closed] TimelineConversation closed
		 * @property {Array.<string>|null} [participants] TimelineConversation participants
		 * @property {number|null} [createdOn] TimelineConversation createdOn
		 * @property {number|null} [modifiedOn] TimelineConversation modifiedOn
		 * @property {string|null} [userDomain] TimelineConversation userDomain
		 * @property {string|null} [conversationId] TimelineConversation conversationId
		 * @property {string|null} [createdBy] TimelineConversation createdBy
		 * @property {Array.<conversation.ITimelineChannels>|null} [onChannels] TimelineConversation onChannels
		 * @property {conversation.ITimelineBotInfo|null} [bot] TimelineConversation bot
		 * @property {Uint8Array|null} [lastMessage] TimelineConversation lastMessage
		 * @property {conversation.ITimelineContact|null} [contact] TimelineConversation contact
		 * @property {conversation.ITimelineChannel|null} [channel] TimelineConversation channel
		 * @property {number|null} [unreadCount] TimelineConversation unreadCount
		 */

		/**
		 * Constructs a new TimelineConversation.
		 * @memberof conversation
		 * @classdesc Represents a TimelineConversation.
		 * @implements ITimelineConversation
		 * @constructor
		 * @param {conversation.ITimelineConversation=} [properties] Properties to set
		 */
		function TimelineConversation(properties) {
			this.participants = [];
			this.onChannels = [];
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * TimelineConversation closed.
		 * @member {boolean} closed
		 * @memberof conversation.TimelineConversation
		 * @instance
		 */
		TimelineConversation.prototype.closed = false;

		/**
		 * TimelineConversation participants.
		 * @member {Array.<string>} participants
		 * @memberof conversation.TimelineConversation
		 * @instance
		 */
		TimelineConversation.prototype.participants = $util.emptyArray;

		/**
		 * TimelineConversation createdOn.
		 * @member {number} createdOn
		 * @memberof conversation.TimelineConversation
		 * @instance
		 */
		TimelineConversation.prototype.createdOn = 0;

		/**
		 * TimelineConversation modifiedOn.
		 * @member {number} modifiedOn
		 * @memberof conversation.TimelineConversation
		 * @instance
		 */
		TimelineConversation.prototype.modifiedOn = 0;

		/**
		 * TimelineConversation userDomain.
		 * @member {string} userDomain
		 * @memberof conversation.TimelineConversation
		 * @instance
		 */
		TimelineConversation.prototype.userDomain = "";

		/**
		 * TimelineConversation conversationId.
		 * @member {string} conversationId
		 * @memberof conversation.TimelineConversation
		 * @instance
		 */
		TimelineConversation.prototype.conversationId = "";

		/**
		 * TimelineConversation createdBy.
		 * @member {string} createdBy
		 * @memberof conversation.TimelineConversation
		 * @instance
		 */
		TimelineConversation.prototype.createdBy = "";

		/**
		 * TimelineConversation onChannels.
		 * @member {Array.<conversation.ITimelineChannels>} onChannels
		 * @memberof conversation.TimelineConversation
		 * @instance
		 */
		TimelineConversation.prototype.onChannels = $util.emptyArray;

		/**
		 * TimelineConversation bot.
		 * @member {conversation.ITimelineBotInfo|null|undefined} bot
		 * @memberof conversation.TimelineConversation
		 * @instance
		 */
		TimelineConversation.prototype.bot = null;

		/**
		 * TimelineConversation lastMessage.
		 * @member {Uint8Array} lastMessage
		 * @memberof conversation.TimelineConversation
		 * @instance
		 */
		TimelineConversation.prototype.lastMessage = $util.newBuffer([]);

		/**
		 * TimelineConversation contact.
		 * @member {conversation.ITimelineContact|null|undefined} contact
		 * @memberof conversation.TimelineConversation
		 * @instance
		 */
		TimelineConversation.prototype.contact = null;

		/**
		 * TimelineConversation channel.
		 * @member {conversation.ITimelineChannel|null|undefined} channel
		 * @memberof conversation.TimelineConversation
		 * @instance
		 */
		TimelineConversation.prototype.channel = null;

		/**
		 * TimelineConversation unreadCount.
		 * @member {number} unreadCount
		 * @memberof conversation.TimelineConversation
		 * @instance
		 */
		TimelineConversation.prototype.unreadCount = 0;

		/**
		 * Creates a new TimelineConversation instance using the specified properties.
		 * @function create
		 * @memberof conversation.TimelineConversation
		 * @static
		 * @param {conversation.ITimelineConversation=} [properties] Properties to set
		 * @returns {conversation.TimelineConversation} TimelineConversation instance
		 */
		TimelineConversation.create = function create(properties) {
			return new TimelineConversation(properties);
		};

		/**
		 * Encodes the specified TimelineConversation message. Does not implicitly {@link conversation.TimelineConversation.verify|verify} messages.
		 * @function encode
		 * @memberof conversation.TimelineConversation
		 * @static
		 * @param {conversation.ITimelineConversation} message TimelineConversation message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		TimelineConversation.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.closed !== null &&
				Object.hasOwnProperty.call(message, "closed")
			)
				writer.uint32(/* id 1, wireType 0 =*/ 8).bool(message.closed);
			if (message.participants !== null && message.participants.length)
				for (var i = 0; i < message.participants.length; ++i)
					writer
						.uint32(/* id 2, wireType 2 =*/ 18)
						.string(message.participants[i]);
			if (
				message.createdOn !== null &&
				Object.hasOwnProperty.call(message, "createdOn")
			)
				writer.uint32(/* id 3, wireType 1 =*/ 25).double(message.createdOn);
			if (
				message.modifiedOn !== null &&
				Object.hasOwnProperty.call(message, "modifiedOn")
			)
				writer.uint32(/* id 4, wireType 1 =*/ 33).double(message.modifiedOn);
			if (
				message.userDomain !== null &&
				Object.hasOwnProperty.call(message, "userDomain")
			)
				writer.uint32(/* id 5, wireType 2 =*/ 42).string(message.userDomain);
			if (
				message.conversationId !== null &&
				Object.hasOwnProperty.call(message, "conversationId")
			)
				writer
					.uint32(/* id 6, wireType 2 =*/ 50)
					.string(message.conversationId);
			if (
				message.createdBy !== null &&
				Object.hasOwnProperty.call(message, "createdBy")
			)
				writer.uint32(/* id 7, wireType 2 =*/ 58).string(message.createdBy);
			if (message.onChannels !== null && message.onChannels.length)
				for (var i = 0; i < message.onChannels.length; ++i)
					$root.conversation.TimelineChannels.encode(
						message.onChannels[i],
						writer.uint32(/* id 8, wireType 2 =*/ 66).fork()
					).ldelim();
			if (message.bot !== null && Object.hasOwnProperty.call(message, "bot"))
				$root.conversation.TimelineBotInfo.encode(
					message.bot,
					writer.uint32(/* id 9, wireType 2 =*/ 74).fork()
				).ldelim();
			if (
				message.lastMessage !== null &&
				Object.hasOwnProperty.call(message, "lastMessage")
			)
				writer.uint32(/* id 10, wireType 2 =*/ 82).bytes(message.lastMessage);
			if (
				message.contact !== null &&
				Object.hasOwnProperty.call(message, "contact")
			)
				$root.conversation.TimelineContact.encode(
					message.contact,
					writer.uint32(/* id 11, wireType 2 =*/ 90).fork()
				).ldelim();
			if (
				message.channel !== null &&
				Object.hasOwnProperty.call(message, "channel")
			)
				$root.conversation.TimelineChannel.encode(
					message.channel,
					writer.uint32(/* id 12, wireType 2 =*/ 98).fork()
				).ldelim();
			if (
				message.unreadCount !== null &&
				Object.hasOwnProperty.call(message, "unreadCount")
			)
				writer.uint32(/* id 13, wireType 1 =*/ 105).double(message.unreadCount);
			return writer;
		};

		/**
		 * Encodes the specified TimelineConversation message, length delimited. Does not implicitly {@link conversation.TimelineConversation.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof conversation.TimelineConversation
		 * @static
		 * @param {conversation.ITimelineConversation} message TimelineConversation message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		TimelineConversation.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a TimelineConversation message from the specified reader or buffer.
		 * @function decode
		 * @memberof conversation.TimelineConversation
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {conversation.TimelineConversation} TimelineConversation
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		TimelineConversation.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.conversation.TimelineConversation();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.closed = reader.bool();
						break;
					case 2:
						if (!(message.participants && message.participants.length))
							message.participants = [];
						message.participants.push(reader.string());
						break;
					case 3:
						message.createdOn = reader.double();
						break;
					case 4:
						message.modifiedOn = reader.double();
						break;
					case 5:
						message.userDomain = reader.string();
						break;
					case 6:
						message.conversationId = reader.string();
						break;
					case 7:
						message.createdBy = reader.string();
						break;
					case 8:
						if (!(message.onChannels && message.onChannels.length))
							message.onChannels = [];
						message.onChannels.push(
							$root.conversation.TimelineChannels.decode(
								reader,
								reader.uint32()
							)
						);
						break;
					case 9:
						message.bot = $root.conversation.TimelineBotInfo.decode(
							reader,
							reader.uint32()
						);
						break;
					case 10:
						message.lastMessage = reader.bytes();
						break;
					case 11:
						message.contact = $root.conversation.TimelineContact.decode(
							reader,
							reader.uint32()
						);
						break;
					case 12:
						message.channel = $root.conversation.TimelineChannel.decode(
							reader,
							reader.uint32()
						);
						break;
					case 13:
						message.unreadCount = reader.double();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a TimelineConversation message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof conversation.TimelineConversation
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {conversation.TimelineConversation} TimelineConversation
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		TimelineConversation.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a TimelineConversation message.
		 * @function verify
		 * @memberof conversation.TimelineConversation
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		TimelineConversation.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.closed !== null && message.hasOwnProperty("closed"))
				if (typeof message.closed !== "boolean")
					return "closed: boolean expected";
			if (
				message.participants !== null &&
				message.hasOwnProperty("participants")
			) {
				if (!Array.isArray(message.participants))
					return "participants: array expected";
				for (var i = 0; i < message.participants.length; ++i)
					if (!$util.isString(message.participants[i]))
						return "participants: string[] expected";
			}
			if (message.createdOn !== null && message.hasOwnProperty("createdOn"))
				if (typeof message.createdOn !== "number")
					return "createdOn: number expected";
			if (message.modifiedOn !== null && message.hasOwnProperty("modifiedOn"))
				if (typeof message.modifiedOn !== "number")
					return "modifiedOn: number expected";
			if (message.userDomain !== null && message.hasOwnProperty("userDomain"))
				if (!$util.isString(message.userDomain))
					return "userDomain: string expected";
			if (
				message.conversationId !== null &&
				message.hasOwnProperty("conversationId")
			)
				if (!$util.isString(message.conversationId))
					return "conversationId: string expected";
			if (message.createdBy !== null && message.hasOwnProperty("createdBy"))
				if (!$util.isString(message.createdBy))
					return "createdBy: string expected";
			if (message.onChannels !== null && message.hasOwnProperty("onChannels")) {
				if (!Array.isArray(message.onChannels))
					return "onChannels: array expected";
				for (var i = 0; i < message.onChannels.length; ++i) {
					var error = $root.conversation.TimelineChannels.verify(
						message.onChannels[i]
					);
					if (error) return "onChannels." + error;
				}
			}
			if (message.bot !== null && message.hasOwnProperty("bot")) {
				var error = $root.conversation.TimelineBotInfo.verify(message.bot);
				if (error) return "bot." + error;
			}
			if (message.lastMessage !== null && message.hasOwnProperty("lastMessage"))
				if (
					!(
						(message.lastMessage &&
							typeof message.lastMessage.length === "number") ||
						$util.isString(message.lastMessage)
					)
				)
					return "lastMessage: buffer expected";
			if (message.contact !== null && message.hasOwnProperty("contact")) {
				var error = $root.conversation.TimelineContact.verify(message.contact);
				if (error) return "contact." + error;
			}
			if (message.channel !== null && message.hasOwnProperty("channel")) {
				var error = $root.conversation.TimelineChannel.verify(message.channel);
				if (error) return "channel." + error;
			}
			if (message.unreadCount !== null && message.hasOwnProperty("unreadCount"))
				if (typeof message.unreadCount !== "number")
					return "unreadCount: number expected";
			return null;
		};

		/**
		 * Creates a TimelineConversation message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof conversation.TimelineConversation
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {conversation.TimelineConversation} TimelineConversation
		 */
		TimelineConversation.fromObject = function fromObject(object) {
			if (object instanceof $root.conversation.TimelineConversation)
				return object;
			var message = new $root.conversation.TimelineConversation();
			if (object.closed !== null) message.closed = Boolean(object.closed);
			if (object.participants) {
				if (!Array.isArray(object.participants))
					throw TypeError(
						".conversation.TimelineConversation.participants: array expected"
					);
				message.participants = [];
				for (var i = 0; i < object.participants.length; ++i)
					message.participants[i] = String(object.participants[i]);
			}
			if (object.createdOn !== null)
				message.createdOn = Number(object.createdOn);
			if (object.modifiedOn !== null)
				message.modifiedOn = Number(object.modifiedOn);
			if (object.userDomain !== null)
				message.userDomain = String(object.userDomain);
			if (object.conversationId !== null)
				message.conversationId = String(object.conversationId);
			if (object.createdBy !== null)
				message.createdBy = String(object.createdBy);
			if (object.onChannels) {
				if (!Array.isArray(object.onChannels))
					throw TypeError(
						".conversation.TimelineConversation.onChannels: array expected"
					);
				message.onChannels = [];
				for (var i = 0; i < object.onChannels.length; ++i) {
					if (typeof object.onChannels[i] !== "object")
						throw TypeError(
							".conversation.TimelineConversation.onChannels: object expected"
						);
					message.onChannels[i] =
						$root.conversation.TimelineChannels.fromObject(
							object.onChannels[i]
						);
				}
			}
			if (object.bot !== null) {
				if (typeof object.bot !== "object")
					throw TypeError(
						".conversation.TimelineConversation.bot: object expected"
					);
				message.bot = $root.conversation.TimelineBotInfo.fromObject(object.bot);
			}
			if (object.lastMessage !== null)
				if (typeof object.lastMessage === "string")
					$util.base64.decode(
						object.lastMessage,
						(message.lastMessage = $util.newBuffer(
							$util.base64.length(object.lastMessage)
						)),
						0
					);
				else if (object.lastMessage.length)
					message.lastMessage = object.lastMessage;
			if (object.contact !== null) {
				if (typeof object.contact !== "object")
					throw TypeError(
						".conversation.TimelineConversation.contact: object expected"
					);
				message.contact = $root.conversation.TimelineContact.fromObject(
					object.contact
				);
			}
			if (object.channel !== null) {
				if (typeof object.channel !== "object")
					throw TypeError(
						".conversation.TimelineConversation.channel: object expected"
					);
				message.channel = $root.conversation.TimelineChannel.fromObject(
					object.channel
				);
			}
			if (object.unreadCount !== null)
				message.unreadCount = Number(object.unreadCount);
			return message;
		};

		/**
		 * Creates a plain object from a TimelineConversation message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof conversation.TimelineConversation
		 * @static
		 * @param {conversation.TimelineConversation} message TimelineConversation
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		TimelineConversation.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.arrays || options.defaults) {
				object.participants = [];
				object.onChannels = [];
			}
			if (options.defaults) {
				object.closed = false;
				object.createdOn = 0;
				object.modifiedOn = 0;
				object.userDomain = "";
				object.conversationId = "";
				object.createdBy = "";
				object.bot = null;
				if (options.bytes === String) object.lastMessage = "";
				else {
					object.lastMessage = [];
					if (options.bytes !== Array)
						object.lastMessage = $util.newBuffer(object.lastMessage);
				}
				object.contact = null;
				object.channel = null;
				object.unreadCount = 0;
			}
			if (message.closed !== null && message.hasOwnProperty("closed"))
				object.closed = message.closed;
			if (message.participants && message.participants.length) {
				object.participants = [];
				for (var j = 0; j < message.participants.length; ++j)
					object.participants[j] = message.participants[j];
			}
			if (message.createdOn !== null && message.hasOwnProperty("createdOn"))
				object.createdOn =
					options.json && !isFinite(message.createdOn)
						? String(message.createdOn)
						: message.createdOn;
			if (message.modifiedOn !== null && message.hasOwnProperty("modifiedOn"))
				object.modifiedOn =
					options.json && !isFinite(message.modifiedOn)
						? String(message.modifiedOn)
						: message.modifiedOn;
			if (message.userDomain !== null && message.hasOwnProperty("userDomain"))
				object.userDomain = message.userDomain;
			if (
				message.conversationId !== null &&
				message.hasOwnProperty("conversationId")
			)
				object.conversationId = message.conversationId;
			if (message.createdBy !== null && message.hasOwnProperty("createdBy"))
				object.createdBy = message.createdBy;
			if (message.onChannels && message.onChannels.length) {
				object.onChannels = [];
				for (var j = 0; j < message.onChannels.length; ++j)
					object.onChannels[j] = $root.conversation.TimelineChannels.toObject(
						message.onChannels[j],
						options
					);
			}
			if (message.bot !== null && message.hasOwnProperty("bot"))
				object.bot = $root.conversation.TimelineBotInfo.toObject(
					message.bot,
					options
				);
			if (message.lastMessage !== null && message.hasOwnProperty("lastMessage"))
				object.lastMessage =
					options.bytes === String
						? $util.base64.encode(
								message.lastMessage,
								0,
								message.lastMessage.length
						  )
						: options.bytes === Array
						? Array.prototype.slice.call(message.lastMessage)
						: message.lastMessage;
			if (message.contact !== null && message.hasOwnProperty("contact"))
				object.contact = $root.conversation.TimelineContact.toObject(
					message.contact,
					options
				);
			if (message.channel !== null && message.hasOwnProperty("channel"))
				object.channel = $root.conversation.TimelineChannel.toObject(
					message.channel,
					options
				);
			if (message.unreadCount !== null && message.hasOwnProperty("unreadCount"))
				object.unreadCount =
					options.json && !isFinite(message.unreadCount)
						? String(message.unreadCount)
						: message.unreadCount;
			return object;
		};

		/**
		 * Converts this TimelineConversation to JSON.
		 * @function toJSON
		 * @memberof conversation.TimelineConversation
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		TimelineConversation.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return TimelineConversation;
	})();

	conversation.TimelineChannel = (function () {
		/**
		 * Properties of a TimelineChannel.
		 * @memberof conversation
		 * @interface ITimelineChannel
		 * @property {string|null} [channelName] TimelineChannel channelName
		 * @property {string|null} [userDomain] TimelineChannel userDomain
		 * @property {string|null} [description] TimelineChannel description
		 */

		/**
		 * Constructs a new TimelineChannel.
		 * @memberof conversation
		 * @classdesc Represents a TimelineChannel.
		 * @implements ITimelineChannel
		 * @constructor
		 * @param {conversation.ITimelineChannel=} [properties] Properties to set
		 */
		function TimelineChannel(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * TimelineChannel channelName.
		 * @member {string} channelName
		 * @memberof conversation.TimelineChannel
		 * @instance
		 */
		TimelineChannel.prototype.channelName = "";

		/**
		 * TimelineChannel userDomain.
		 * @member {string} userDomain
		 * @memberof conversation.TimelineChannel
		 * @instance
		 */
		TimelineChannel.prototype.userDomain = "";

		/**
		 * TimelineChannel description.
		 * @member {string} description
		 * @memberof conversation.TimelineChannel
		 * @instance
		 */
		TimelineChannel.prototype.description = "";

		/**
		 * Creates a new TimelineChannel instance using the specified properties.
		 * @function create
		 * @memberof conversation.TimelineChannel
		 * @static
		 * @param {conversation.ITimelineChannel=} [properties] Properties to set
		 * @returns {conversation.TimelineChannel} TimelineChannel instance
		 */
		TimelineChannel.create = function create(properties) {
			return new TimelineChannel(properties);
		};

		/**
		 * Encodes the specified TimelineChannel message. Does not implicitly {@link conversation.TimelineChannel.verify|verify} messages.
		 * @function encode
		 * @memberof conversation.TimelineChannel
		 * @static
		 * @param {conversation.ITimelineChannel} message TimelineChannel message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		TimelineChannel.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.channelName !== null &&
				Object.hasOwnProperty.call(message, "channelName")
			)
				writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.channelName);
			if (
				message.userDomain !== null &&
				Object.hasOwnProperty.call(message, "userDomain")
			)
				writer.uint32(/* id 5, wireType 2 =*/ 42).string(message.userDomain);
			if (
				message.description !== null &&
				Object.hasOwnProperty.call(message, "description")
			)
				writer.uint32(/* id 7, wireType 2 =*/ 58).string(message.description);
			return writer;
		};

		/**
		 * Encodes the specified TimelineChannel message, length delimited. Does not implicitly {@link conversation.TimelineChannel.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof conversation.TimelineChannel
		 * @static
		 * @param {conversation.ITimelineChannel} message TimelineChannel message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		TimelineChannel.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a TimelineChannel message from the specified reader or buffer.
		 * @function decode
		 * @memberof conversation.TimelineChannel
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {conversation.TimelineChannel} TimelineChannel
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		TimelineChannel.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.conversation.TimelineChannel();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 4:
						message.channelName = reader.string();
						break;
					case 5:
						message.userDomain = reader.string();
						break;
					case 7:
						message.description = reader.string();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a TimelineChannel message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof conversation.TimelineChannel
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {conversation.TimelineChannel} TimelineChannel
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		TimelineChannel.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a TimelineChannel message.
		 * @function verify
		 * @memberof conversation.TimelineChannel
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		TimelineChannel.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.channelName !== null && message.hasOwnProperty("channelName"))
				if (!$util.isString(message.channelName))
					return "channelName: string expected";
			if (message.userDomain !== null && message.hasOwnProperty("userDomain"))
				if (!$util.isString(message.userDomain))
					return "userDomain: string expected";
			if (message.description !== null && message.hasOwnProperty("description"))
				if (!$util.isString(message.description))
					return "description: string expected";
			return null;
		};

		/**
		 * Creates a TimelineChannel message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof conversation.TimelineChannel
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {conversation.TimelineChannel} TimelineChannel
		 */
		TimelineChannel.fromObject = function fromObject(object) {
			if (object instanceof $root.conversation.TimelineChannel) return object;
			var message = new $root.conversation.TimelineChannel();
			if (object.channelName !== null)
				message.channelName = String(object.channelName);
			if (object.userDomain !== null)
				message.userDomain = String(object.userDomain);
			if (object.description !== null)
				message.description = String(object.description);
			return message;
		};

		/**
		 * Creates a plain object from a TimelineChannel message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof conversation.TimelineChannel
		 * @static
		 * @param {conversation.TimelineChannel} message TimelineChannel
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		TimelineChannel.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.channelName = "";
				object.userDomain = "";
				object.description = "";
			}
			if (message.channelName !== null && message.hasOwnProperty("channelName"))
				object.channelName = message.channelName;
			if (message.userDomain !== null && message.hasOwnProperty("userDomain"))
				object.userDomain = message.userDomain;
			if (message.description !== null && message.hasOwnProperty("description"))
				object.description = message.description;
			return object;
		};

		/**
		 * Converts this TimelineChannel to JSON.
		 * @function toJSON
		 * @memberof conversation.TimelineChannel
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		TimelineChannel.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return TimelineChannel;
	})();

	conversation.TimelineChannels = (function () {
		/**
		 * Properties of a TimelineChannels.
		 * @memberof conversation
		 * @interface ITimelineChannels
		 * @property {string|null} [channelName] TimelineChannels channelName
		 * @property {string|null} [userDomain] TimelineChannels userDomain
		 */

		/**
		 * Constructs a new TimelineChannels.
		 * @memberof conversation
		 * @classdesc Represents a TimelineChannels.
		 * @implements ITimelineChannels
		 * @constructor
		 * @param {conversation.ITimelineChannels=} [properties] Properties to set
		 */
		function TimelineChannels(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * TimelineChannels channelName.
		 * @member {string} channelName
		 * @memberof conversation.TimelineChannels
		 * @instance
		 */
		TimelineChannels.prototype.channelName = "";

		/**
		 * TimelineChannels userDomain.
		 * @member {string} userDomain
		 * @memberof conversation.TimelineChannels
		 * @instance
		 */
		TimelineChannels.prototype.userDomain = "";

		/**
		 * Creates a new TimelineChannels instance using the specified properties.
		 * @function create
		 * @memberof conversation.TimelineChannels
		 * @static
		 * @param {conversation.ITimelineChannels=} [properties] Properties to set
		 * @returns {conversation.TimelineChannels} TimelineChannels instance
		 */
		TimelineChannels.create = function create(properties) {
			return new TimelineChannels(properties);
		};

		/**
		 * Encodes the specified TimelineChannels message. Does not implicitly {@link conversation.TimelineChannels.verify|verify} messages.
		 * @function encode
		 * @memberof conversation.TimelineChannels
		 * @static
		 * @param {conversation.ITimelineChannels} message TimelineChannels message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		TimelineChannels.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.channelName !== null &&
				Object.hasOwnProperty.call(message, "channelName")
			)
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.channelName);
			if (
				message.userDomain !== null &&
				Object.hasOwnProperty.call(message, "userDomain")
			)
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.userDomain);
			return writer;
		};

		/**
		 * Encodes the specified TimelineChannels message, length delimited. Does not implicitly {@link conversation.TimelineChannels.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof conversation.TimelineChannels
		 * @static
		 * @param {conversation.ITimelineChannels} message TimelineChannels message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		TimelineChannels.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a TimelineChannels message from the specified reader or buffer.
		 * @function decode
		 * @memberof conversation.TimelineChannels
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {conversation.TimelineChannels} TimelineChannels
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		TimelineChannels.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.conversation.TimelineChannels();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.channelName = reader.string();
						break;
					case 2:
						message.userDomain = reader.string();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a TimelineChannels message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof conversation.TimelineChannels
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {conversation.TimelineChannels} TimelineChannels
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		TimelineChannels.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a TimelineChannels message.
		 * @function verify
		 * @memberof conversation.TimelineChannels
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		TimelineChannels.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.channelName !== null && message.hasOwnProperty("channelName"))
				if (!$util.isString(message.channelName))
					return "channelName: string expected";
			if (message.userDomain !== null && message.hasOwnProperty("userDomain"))
				if (!$util.isString(message.userDomain))
					return "userDomain: string expected";
			return null;
		};

		/**
		 * Creates a TimelineChannels message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof conversation.TimelineChannels
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {conversation.TimelineChannels} TimelineChannels
		 */
		TimelineChannels.fromObject = function fromObject(object) {
			if (object instanceof $root.conversation.TimelineChannels) return object;
			var message = new $root.conversation.TimelineChannels();
			if (object.channelName !== null)
				message.channelName = String(object.channelName);
			if (object.userDomain !== null)
				message.userDomain = String(object.userDomain);
			return message;
		};

		/**
		 * Creates a plain object from a TimelineChannels message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof conversation.TimelineChannels
		 * @static
		 * @param {conversation.TimelineChannels} message TimelineChannels
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		TimelineChannels.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.channelName = "";
				object.userDomain = "";
			}
			if (message.channelName !== null && message.hasOwnProperty("channelName"))
				object.channelName = message.channelName;
			if (message.userDomain !== null && message.hasOwnProperty("userDomain"))
				object.userDomain = message.userDomain;
			return object;
		};

		/**
		 * Converts this TimelineChannels to JSON.
		 * @function toJSON
		 * @memberof conversation.TimelineChannels
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		TimelineChannels.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return TimelineChannels;
	})();

	conversation.TimelineBotInfo = (function () {
		/**
		 * Properties of a TimelineBotInfo.
		 * @memberof conversation
		 * @interface ITimelineBotInfo
		 * @property {string|null} [allowResetConversation] TimelineBotInfo allowResetConversation
		 * @property {string|null} [botName] TimelineBotInfo botName
		 * @property {string|null} [logoUrl] TimelineBotInfo logoUrl
		 * @property {string|null} [slug] TimelineBotInfo slug
		 * @property {string|null} [userDomain] TimelineBotInfo userDomain
		 * @property {string|null} [botUrl] TimelineBotInfo botUrl
		 * @property {string|null} [description] TimelineBotInfo description
		 * @property {string|null} [botId] TimelineBotInfo botId
		 * @property {boolean|null} [systemBot] TimelineBotInfo systemBot
		 * @property {boolean|null} [conversational] TimelineBotInfo conversational
		 */

		/**
		 * Constructs a new TimelineBotInfo.
		 * @memberof conversation
		 * @classdesc Represents a TimelineBotInfo.
		 * @implements ITimelineBotInfo
		 * @constructor
		 * @param {conversation.ITimelineBotInfo=} [properties] Properties to set
		 */
		function TimelineBotInfo(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * TimelineBotInfo allowResetConversation.
		 * @member {string} allowResetConversation
		 * @memberof conversation.TimelineBotInfo
		 * @instance
		 */
		TimelineBotInfo.prototype.allowResetConversation = "";

		/**
		 * TimelineBotInfo botName.
		 * @member {string} botName
		 * @memberof conversation.TimelineBotInfo
		 * @instance
		 */
		TimelineBotInfo.prototype.botName = "";

		/**
		 * TimelineBotInfo logoUrl.
		 * @member {string} logoUrl
		 * @memberof conversation.TimelineBotInfo
		 * @instance
		 */
		TimelineBotInfo.prototype.logoUrl = "";

		/**
		 * TimelineBotInfo slug.
		 * @member {string} slug
		 * @memberof conversation.TimelineBotInfo
		 * @instance
		 */
		TimelineBotInfo.prototype.slug = "";

		/**
		 * TimelineBotInfo userDomain.
		 * @member {string} userDomain
		 * @memberof conversation.TimelineBotInfo
		 * @instance
		 */
		TimelineBotInfo.prototype.userDomain = "";

		/**
		 * TimelineBotInfo botUrl.
		 * @member {string} botUrl
		 * @memberof conversation.TimelineBotInfo
		 * @instance
		 */
		TimelineBotInfo.prototype.botUrl = "";

		/**
		 * TimelineBotInfo description.
		 * @member {string} description
		 * @memberof conversation.TimelineBotInfo
		 * @instance
		 */
		TimelineBotInfo.prototype.description = "";

		/**
		 * TimelineBotInfo botId.
		 * @member {string} botId
		 * @memberof conversation.TimelineBotInfo
		 * @instance
		 */
		TimelineBotInfo.prototype.botId = "";

		/**
		 * TimelineBotInfo systemBot.
		 * @member {boolean} systemBot
		 * @memberof conversation.TimelineBotInfo
		 * @instance
		 */
		TimelineBotInfo.prototype.systemBot = false;

		/**
		 * TimelineBotInfo conversational.
		 * @member {boolean} conversational
		 * @memberof conversation.TimelineBotInfo
		 * @instance
		 */
		TimelineBotInfo.prototype.conversational = false;

		/**
		 * Creates a new TimelineBotInfo instance using the specified properties.
		 * @function create
		 * @memberof conversation.TimelineBotInfo
		 * @static
		 * @param {conversation.ITimelineBotInfo=} [properties] Properties to set
		 * @returns {conversation.TimelineBotInfo} TimelineBotInfo instance
		 */
		TimelineBotInfo.create = function create(properties) {
			return new TimelineBotInfo(properties);
		};

		/**
		 * Encodes the specified TimelineBotInfo message. Does not implicitly {@link conversation.TimelineBotInfo.verify|verify} messages.
		 * @function encode
		 * @memberof conversation.TimelineBotInfo
		 * @static
		 * @param {conversation.ITimelineBotInfo} message TimelineBotInfo message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		TimelineBotInfo.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.allowResetConversation !== null &&
				Object.hasOwnProperty.call(message, "allowResetConversation")
			)
				writer
					.uint32(/* id 1, wireType 2 =*/ 10)
					.string(message.allowResetConversation);
			if (
				message.botName !== null &&
				Object.hasOwnProperty.call(message, "botName")
			)
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.botName);
			if (
				message.logoUrl !== null &&
				Object.hasOwnProperty.call(message, "logoUrl")
			)
				writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.logoUrl);
			if (message.slug !== null && Object.hasOwnProperty.call(message, "slug"))
				writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.slug);
			if (
				message.userDomain !== null &&
				Object.hasOwnProperty.call(message, "userDomain")
			)
				writer.uint32(/* id 5, wireType 2 =*/ 42).string(message.userDomain);
			if (
				message.botUrl !== null &&
				Object.hasOwnProperty.call(message, "botUrl")
			)
				writer.uint32(/* id 6, wireType 2 =*/ 50).string(message.botUrl);
			if (
				message.description !== null &&
				Object.hasOwnProperty.call(message, "description")
			)
				writer.uint32(/* id 7, wireType 2 =*/ 58).string(message.description);
			if (
				message.botId !== null &&
				Object.hasOwnProperty.call(message, "botId")
			)
				writer.uint32(/* id 8, wireType 2 =*/ 66).string(message.botId);
			if (
				message.systemBot !== null &&
				Object.hasOwnProperty.call(message, "systemBot")
			)
				writer.uint32(/* id 9, wireType 0 =*/ 72).bool(message.systemBot);
			if (
				message.conversational !== null &&
				Object.hasOwnProperty.call(message, "conversational")
			)
				writer.uint32(/* id 10, wireType 0 =*/ 80).bool(message.conversational);
			return writer;
		};

		/**
		 * Encodes the specified TimelineBotInfo message, length delimited. Does not implicitly {@link conversation.TimelineBotInfo.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof conversation.TimelineBotInfo
		 * @static
		 * @param {conversation.ITimelineBotInfo} message TimelineBotInfo message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		TimelineBotInfo.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a TimelineBotInfo message from the specified reader or buffer.
		 * @function decode
		 * @memberof conversation.TimelineBotInfo
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {conversation.TimelineBotInfo} TimelineBotInfo
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		TimelineBotInfo.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.conversation.TimelineBotInfo();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.allowResetConversation = reader.string();
						break;
					case 2:
						message.botName = reader.string();
						break;
					case 3:
						message.logoUrl = reader.string();
						break;
					case 4:
						message.slug = reader.string();
						break;
					case 5:
						message.userDomain = reader.string();
						break;
					case 6:
						message.botUrl = reader.string();
						break;
					case 7:
						message.description = reader.string();
						break;
					case 8:
						message.botId = reader.string();
						break;
					case 9:
						message.systemBot = reader.bool();
						break;
					case 10:
						message.conversational = reader.bool();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a TimelineBotInfo message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof conversation.TimelineBotInfo
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {conversation.TimelineBotInfo} TimelineBotInfo
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		TimelineBotInfo.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a TimelineBotInfo message.
		 * @function verify
		 * @memberof conversation.TimelineBotInfo
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		TimelineBotInfo.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (
				message.allowResetConversation !== null &&
				message.hasOwnProperty("allowResetConversation")
			)
				if (!$util.isString(message.allowResetConversation))
					return "allowResetConversation: string expected";
			if (message.botName !== null && message.hasOwnProperty("botName"))
				if (!$util.isString(message.botName)) return "botName: string expected";
			if (message.logoUrl !== null && message.hasOwnProperty("logoUrl"))
				if (!$util.isString(message.logoUrl)) return "logoUrl: string expected";
			if (message.slug !== null && message.hasOwnProperty("slug"))
				if (!$util.isString(message.slug)) return "slug: string expected";
			if (message.userDomain !== null && message.hasOwnProperty("userDomain"))
				if (!$util.isString(message.userDomain))
					return "userDomain: string expected";
			if (message.botUrl !== null && message.hasOwnProperty("botUrl"))
				if (!$util.isString(message.botUrl)) return "botUrl: string expected";
			if (message.description !== null && message.hasOwnProperty("description"))
				if (!$util.isString(message.description))
					return "description: string expected";
			if (message.botId !== null && message.hasOwnProperty("botId"))
				if (!$util.isString(message.botId)) return "botId: string expected";
			if (message.systemBot !== null && message.hasOwnProperty("systemBot"))
				if (typeof message.systemBot !== "boolean")
					return "systemBot: boolean expected";
			if (
				message.conversational !== null &&
				message.hasOwnProperty("conversational")
			)
				if (typeof message.conversational !== "boolean")
					return "conversational: boolean expected";
			return null;
		};

		/**
		 * Creates a TimelineBotInfo message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof conversation.TimelineBotInfo
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {conversation.TimelineBotInfo} TimelineBotInfo
		 */
		TimelineBotInfo.fromObject = function fromObject(object) {
			if (object instanceof $root.conversation.TimelineBotInfo) return object;
			var message = new $root.conversation.TimelineBotInfo();
			if (object.allowResetConversation !== null)
				message.allowResetConversation = String(object.allowResetConversation);
			if (object.botName !== null) message.botName = String(object.botName);
			if (object.logoUrl !== null) message.logoUrl = String(object.logoUrl);
			if (object.slug !== null) message.slug = String(object.slug);
			if (object.userDomain !== null)
				message.userDomain = String(object.userDomain);
			if (object.botUrl !== null) message.botUrl = String(object.botUrl);
			if (object.description !== null)
				message.description = String(object.description);
			if (object.botId !== null) message.botId = String(object.botId);
			if (object.systemBot !== null)
				message.systemBot = Boolean(object.systemBot);
			if (object.conversational !== null)
				message.conversational = Boolean(object.conversational);
			return message;
		};

		/**
		 * Creates a plain object from a TimelineBotInfo message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof conversation.TimelineBotInfo
		 * @static
		 * @param {conversation.TimelineBotInfo} message TimelineBotInfo
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		TimelineBotInfo.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.allowResetConversation = "";
				object.botName = "";
				object.logoUrl = "";
				object.slug = "";
				object.userDomain = "";
				object.botUrl = "";
				object.description = "";
				object.botId = "";
				object.systemBot = false;
				object.conversational = false;
			}
			if (
				message.allowResetConversation !== null &&
				message.hasOwnProperty("allowResetConversation")
			)
				object.allowResetConversation = message.allowResetConversation;
			if (message.botName !== null && message.hasOwnProperty("botName"))
				object.botName = message.botName;
			if (message.logoUrl !== null && message.hasOwnProperty("logoUrl"))
				object.logoUrl = message.logoUrl;
			if (message.slug !== null && message.hasOwnProperty("slug"))
				object.slug = message.slug;
			if (message.userDomain !== null && message.hasOwnProperty("userDomain"))
				object.userDomain = message.userDomain;
			if (message.botUrl !== null && message.hasOwnProperty("botUrl"))
				object.botUrl = message.botUrl;
			if (message.description !== null && message.hasOwnProperty("description"))
				object.description = message.description;
			if (message.botId !== null && message.hasOwnProperty("botId"))
				object.botId = message.botId;
			if (message.systemBot !== null && message.hasOwnProperty("systemBot"))
				object.systemBot = message.systemBot;
			if (
				message.conversational !== null &&
				message.hasOwnProperty("conversational")
			)
				object.conversational = message.conversational;
			return object;
		};

		/**
		 * Converts this TimelineBotInfo to JSON.
		 * @function toJSON
		 * @memberof conversation.TimelineBotInfo
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		TimelineBotInfo.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return TimelineBotInfo;
	})();

	conversation.TimelineContact = (function () {
		/**
		 * Properties of a TimelineContact.
		 * @memberof conversation
		 * @interface ITimelineContact
		 * @property {boolean|null} [visible] TimelineContact visible
		 * @property {boolean|null} [searchable] TimelineContact searchable
		 * @property {string|null} [userName] TimelineContact userName
		 * @property {string|null} [userId] TimelineContact userId
		 */

		/**
		 * Constructs a new TimelineContact.
		 * @memberof conversation
		 * @classdesc Represents a TimelineContact.
		 * @implements ITimelineContact
		 * @constructor
		 * @param {conversation.ITimelineContact=} [properties] Properties to set
		 */
		function TimelineContact(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * TimelineContact visible.
		 * @member {boolean} visible
		 * @memberof conversation.TimelineContact
		 * @instance
		 */
		TimelineContact.prototype.visible = false;

		/**
		 * TimelineContact searchable.
		 * @member {boolean} searchable
		 * @memberof conversation.TimelineContact
		 * @instance
		 */
		TimelineContact.prototype.searchable = false;

		/**
		 * TimelineContact userName.
		 * @member {string} userName
		 * @memberof conversation.TimelineContact
		 * @instance
		 */
		TimelineContact.prototype.userName = "";

		/**
		 * TimelineContact userId.
		 * @member {string} userId
		 * @memberof conversation.TimelineContact
		 * @instance
		 */
		TimelineContact.prototype.userId = "";

		/**
		 * Creates a new TimelineContact instance using the specified properties.
		 * @function create
		 * @memberof conversation.TimelineContact
		 * @static
		 * @param {conversation.ITimelineContact=} [properties] Properties to set
		 * @returns {conversation.TimelineContact} TimelineContact instance
		 */
		TimelineContact.create = function create(properties) {
			return new TimelineContact(properties);
		};

		/**
		 * Encodes the specified TimelineContact message. Does not implicitly {@link conversation.TimelineContact.verify|verify} messages.
		 * @function encode
		 * @memberof conversation.TimelineContact
		 * @static
		 * @param {conversation.ITimelineContact} message TimelineContact message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		TimelineContact.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.visible !== null &&
				Object.hasOwnProperty.call(message, "visible")
			)
				writer.uint32(/* id 1, wireType 0 =*/ 8).bool(message.visible);
			if (
				message.searchable !== null &&
				Object.hasOwnProperty.call(message, "searchable")
			)
				writer.uint32(/* id 2, wireType 0 =*/ 16).bool(message.searchable);
			if (
				message.userName !== null &&
				Object.hasOwnProperty.call(message, "userName")
			)
				writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.userName);
			if (
				message.userId !== null &&
				Object.hasOwnProperty.call(message, "userId")
			)
				writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.userId);
			return writer;
		};

		/**
		 * Encodes the specified TimelineContact message, length delimited. Does not implicitly {@link conversation.TimelineContact.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof conversation.TimelineContact
		 * @static
		 * @param {conversation.ITimelineContact} message TimelineContact message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		TimelineContact.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a TimelineContact message from the specified reader or buffer.
		 * @function decode
		 * @memberof conversation.TimelineContact
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {conversation.TimelineContact} TimelineContact
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		TimelineContact.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.conversation.TimelineContact();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.visible = reader.bool();
						break;
					case 2:
						message.searchable = reader.bool();
						break;
					case 3:
						message.userName = reader.string();
						break;
					case 4:
						message.userId = reader.string();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a TimelineContact message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof conversation.TimelineContact
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {conversation.TimelineContact} TimelineContact
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		TimelineContact.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a TimelineContact message.
		 * @function verify
		 * @memberof conversation.TimelineContact
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		TimelineContact.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.visible !== null && message.hasOwnProperty("visible"))
				if (typeof message.visible !== "boolean")
					return "visible: boolean expected";
			if (message.searchable !== null && message.hasOwnProperty("searchable"))
				if (typeof message.searchable !== "boolean")
					return "searchable: boolean expected";
			if (message.userName !== null && message.hasOwnProperty("userName"))
				if (!$util.isString(message.userName))
					return "userName: string expected";
			if (message.userId !== null && message.hasOwnProperty("userId"))
				if (!$util.isString(message.userId)) return "userId: string expected";
			return null;
		};

		/**
		 * Creates a TimelineContact message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof conversation.TimelineContact
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {conversation.TimelineContact} TimelineContact
		 */
		TimelineContact.fromObject = function fromObject(object) {
			if (object instanceof $root.conversation.TimelineContact) return object;
			var message = new $root.conversation.TimelineContact();
			if (object.visible !== null) message.visible = Boolean(object.visible);
			if (object.searchable !== null)
				message.searchable = Boolean(object.searchable);
			if (object.userName !== null) message.userName = String(object.userName);
			if (object.userId !== null) message.userId = String(object.userId);
			return message;
		};

		/**
		 * Creates a plain object from a TimelineContact message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof conversation.TimelineContact
		 * @static
		 * @param {conversation.TimelineContact} message TimelineContact
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		TimelineContact.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.visible = false;
				object.searchable = false;
				object.userName = "";
				object.userId = "";
			}
			if (message.visible !== null && message.hasOwnProperty("visible"))
				object.visible = message.visible;
			if (message.searchable !== null && message.hasOwnProperty("searchable"))
				object.searchable = message.searchable;
			if (message.userName !== null && message.hasOwnProperty("userName"))
				object.userName = message.userName;
			if (message.userId !== null && message.hasOwnProperty("userId"))
				object.userId = message.userId;
			return object;
		};

		/**
		 * Converts this TimelineContact to JSON.
		 * @function toJSON
		 * @memberof conversation.TimelineContact
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		TimelineContact.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return TimelineContact;
	})();

	conversation.CatalogResponse = (function () {
		/**
		 * Properties of a CatalogResponse.
		 * @memberof conversation
		 * @interface ICatalogResponse
		 * @property {Array.<conversation.ICatalogBot>|null} [bots] CatalogResponse bots
		 * @property {Object.<string,conversation.CatalogResponse.ICatalogBots>|null} [companies] CatalogResponse companies
		 * @property {Object.<string,conversation.CatalogResponse.ICatalogBots>|null} [categories] CatalogResponse categories
		 */

		/**
		 * Constructs a new CatalogResponse.
		 * @memberof conversation
		 * @classdesc Represents a CatalogResponse.
		 * @implements ICatalogResponse
		 * @constructor
		 * @param {conversation.ICatalogResponse=} [properties] Properties to set
		 */
		function CatalogResponse(properties) {
			this.bots = [];
			this.companies = {};
			this.categories = {};
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * CatalogResponse bots.
		 * @member {Array.<conversation.ICatalogBot>} bots
		 * @memberof conversation.CatalogResponse
		 * @instance
		 */
		CatalogResponse.prototype.bots = $util.emptyArray;

		/**
		 * CatalogResponse companies.
		 * @member {Object.<string,conversation.CatalogResponse.ICatalogBots>} companies
		 * @memberof conversation.CatalogResponse
		 * @instance
		 */
		CatalogResponse.prototype.companies = $util.emptyObject;

		/**
		 * CatalogResponse categories.
		 * @member {Object.<string,conversation.CatalogResponse.ICatalogBots>} categories
		 * @memberof conversation.CatalogResponse
		 * @instance
		 */
		CatalogResponse.prototype.categories = $util.emptyObject;

		/**
		 * Creates a new CatalogResponse instance using the specified properties.
		 * @function create
		 * @memberof conversation.CatalogResponse
		 * @static
		 * @param {conversation.ICatalogResponse=} [properties] Properties to set
		 * @returns {conversation.CatalogResponse} CatalogResponse instance
		 */
		CatalogResponse.create = function create(properties) {
			return new CatalogResponse(properties);
		};

		/**
		 * Encodes the specified CatalogResponse message. Does not implicitly {@link conversation.CatalogResponse.verify|verify} messages.
		 * @function encode
		 * @memberof conversation.CatalogResponse
		 * @static
		 * @param {conversation.ICatalogResponse} message CatalogResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		CatalogResponse.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.bots !== null && message.bots.length)
				for (var i = 0; i < message.bots.length; ++i)
					$root.conversation.CatalogBot.encode(
						message.bots[i],
						writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
					).ldelim();
			if (
				message.companies !== null &&
				Object.hasOwnProperty.call(message, "companies")
			)
				for (
					var keys = Object.keys(message.companies), i = 0;
					i < keys.length;
					++i
				) {
					writer
						.uint32(/* id 2, wireType 2 =*/ 18)
						.fork()
						.uint32(/* id 1, wireType 2 =*/ 10)
						.string(keys[i]);
					$root.conversation.CatalogResponse.CatalogBots.encode(
						message.companies[keys[i]],
						writer.uint32(/* id 2, wireType 2 =*/ 18).fork()
					)
						.ldelim()
						.ldelim();
				}
			if (
				message.categories !== null &&
				Object.hasOwnProperty.call(message, "categories")
			)
				for (
					var keys = Object.keys(message.categories), i = 0;
					i < keys.length;
					++i
				) {
					writer
						.uint32(/* id 3, wireType 2 =*/ 26)
						.fork()
						.uint32(/* id 1, wireType 2 =*/ 10)
						.string(keys[i]);
					$root.conversation.CatalogResponse.CatalogBots.encode(
						message.categories[keys[i]],
						writer.uint32(/* id 2, wireType 2 =*/ 18).fork()
					)
						.ldelim()
						.ldelim();
				}
			return writer;
		};

		/**
		 * Encodes the specified CatalogResponse message, length delimited. Does not implicitly {@link conversation.CatalogResponse.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof conversation.CatalogResponse
		 * @static
		 * @param {conversation.ICatalogResponse} message CatalogResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		CatalogResponse.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a CatalogResponse message from the specified reader or buffer.
		 * @function decode
		 * @memberof conversation.CatalogResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {conversation.CatalogResponse} CatalogResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		CatalogResponse.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.conversation.CatalogResponse(),
				key,
				value;
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						if (!(message.bots && message.bots.length)) message.bots = [];
						message.bots.push(
							$root.conversation.CatalogBot.decode(reader, reader.uint32())
						);
						break;
					case 2:
						if (message.companies === $util.emptyObject) message.companies = {};
						var end2 = reader.uint32() + reader.pos;
						key = "";
						value = null;
						while (reader.pos < end2) {
							var tag2 = reader.uint32();
							switch (tag2 >>> 3) {
								case 1:
									key = reader.string();
									break;
								case 2:
									value = $root.conversation.CatalogResponse.CatalogBots.decode(
										reader,
										reader.uint32()
									);
									break;
								default:
									reader.skipType(tag2 & 7);
									break;
							}
						}
						message.companies[key] = value;
						break;
					case 3:
						if (message.categories === $util.emptyObject)
							message.categories = {};
						var end2 = reader.uint32() + reader.pos;
						key = "";
						value = null;
						while (reader.pos < end2) {
							var tag2 = reader.uint32();
							switch (tag2 >>> 3) {
								case 1:
									key = reader.string();
									break;
								case 2:
									value = $root.conversation.CatalogResponse.CatalogBots.decode(
										reader,
										reader.uint32()
									);
									break;
								default:
									reader.skipType(tag2 & 7);
									break;
							}
						}
						message.categories[key] = value;
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a CatalogResponse message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof conversation.CatalogResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {conversation.CatalogResponse} CatalogResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		CatalogResponse.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a CatalogResponse message.
		 * @function verify
		 * @memberof conversation.CatalogResponse
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		CatalogResponse.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.bots !== null && message.hasOwnProperty("bots")) {
				if (!Array.isArray(message.bots)) return "bots: array expected";
				for (var i = 0; i < message.bots.length; ++i) {
					var error = $root.conversation.CatalogBot.verify(message.bots[i]);
					if (error) return "bots." + error;
				}
			}
			if (message.companies !== null && message.hasOwnProperty("companies")) {
				if (!$util.isObject(message.companies))
					return "companies: object expected";
				var key = Object.keys(message.companies);
				for (var i = 0; i < key.length; ++i) {
					var error = $root.conversation.CatalogResponse.CatalogBots.verify(
						message.companies[key[i]]
					);
					if (error) return "companies." + error;
				}
			}
			if (message.categories !== null && message.hasOwnProperty("categories")) {
				if (!$util.isObject(message.categories))
					return "categories: object expected";
				var key = Object.keys(message.categories);
				for (var i = 0; i < key.length; ++i) {
					var error = $root.conversation.CatalogResponse.CatalogBots.verify(
						message.categories[key[i]]
					);
					if (error) return "categories." + error;
				}
			}
			return null;
		};

		/**
		 * Creates a CatalogResponse message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof conversation.CatalogResponse
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {conversation.CatalogResponse} CatalogResponse
		 */
		CatalogResponse.fromObject = function fromObject(object) {
			if (object instanceof $root.conversation.CatalogResponse) return object;
			var message = new $root.conversation.CatalogResponse();
			if (object.bots) {
				if (!Array.isArray(object.bots))
					throw TypeError(".conversation.CatalogResponse.bots: array expected");
				message.bots = [];
				for (var i = 0; i < object.bots.length; ++i) {
					if (typeof object.bots[i] !== "object")
						throw TypeError(
							".conversation.CatalogResponse.bots: object expected"
						);
					message.bots[i] = $root.conversation.CatalogBot.fromObject(
						object.bots[i]
					);
				}
			}
			if (object.companies) {
				if (typeof object.companies !== "object")
					throw TypeError(
						".conversation.CatalogResponse.companies: object expected"
					);
				message.companies = {};
				for (
					var keys = Object.keys(object.companies), i = 0;
					i < keys.length;
					++i
				) {
					if (typeof object.companies[keys[i]] !== "object")
						throw TypeError(
							".conversation.CatalogResponse.companies: object expected"
						);
					message.companies[keys[i]] =
						$root.conversation.CatalogResponse.CatalogBots.fromObject(
							object.companies[keys[i]]
						);
				}
			}
			if (object.categories) {
				if (typeof object.categories !== "object")
					throw TypeError(
						".conversation.CatalogResponse.categories: object expected"
					);
				message.categories = {};
				for (
					var keys = Object.keys(object.categories), i = 0;
					i < keys.length;
					++i
				) {
					if (typeof object.categories[keys[i]] !== "object")
						throw TypeError(
							".conversation.CatalogResponse.categories: object expected"
						);
					message.categories[keys[i]] =
						$root.conversation.CatalogResponse.CatalogBots.fromObject(
							object.categories[keys[i]]
						);
				}
			}
			return message;
		};

		/**
		 * Creates a plain object from a CatalogResponse message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof conversation.CatalogResponse
		 * @static
		 * @param {conversation.CatalogResponse} message CatalogResponse
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		CatalogResponse.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.arrays || options.defaults) object.bots = [];
			if (options.objects || options.defaults) {
				object.companies = {};
				object.categories = {};
			}
			if (message.bots && message.bots.length) {
				object.bots = [];
				for (var j = 0; j < message.bots.length; ++j)
					object.bots[j] = $root.conversation.CatalogBot.toObject(
						message.bots[j],
						options
					);
			}
			var keys2;
			if (
				message.companies &&
				(keys2 = Object.keys(message.companies)).length
			) {
				object.companies = {};
				for (var j = 0; j < keys2.length; ++j)
					object.companies[keys2[j]] =
						$root.conversation.CatalogResponse.CatalogBots.toObject(
							message.companies[keys2[j]],
							options
						);
			}
			if (
				message.categories &&
				(keys2 = Object.keys(message.categories)).length
			) {
				object.categories = {};
				for (var j = 0; j < keys2.length; ++j)
					object.categories[keys2[j]] =
						$root.conversation.CatalogResponse.CatalogBots.toObject(
							message.categories[keys2[j]],
							options
						);
			}
			return object;
		};

		/**
		 * Converts this CatalogResponse to JSON.
		 * @function toJSON
		 * @memberof conversation.CatalogResponse
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		CatalogResponse.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		CatalogResponse.CatalogBots = (function () {
			/**
			 * Properties of a CatalogBots.
			 * @memberof conversation.CatalogResponse
			 * @interface ICatalogBots
			 * @property {Array.<conversation.ICatalogBot>|null} [bots] CatalogBots bots
			 */

			/**
			 * Constructs a new CatalogBots.
			 * @memberof conversation.CatalogResponse
			 * @classdesc Represents a CatalogBots.
			 * @implements ICatalogBots
			 * @constructor
			 * @param {conversation.CatalogResponse.ICatalogBots=} [properties] Properties to set
			 */
			function CatalogBots(properties) {
				this.bots = [];
				if (properties)
					for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
						if (properties[keys[i]] !== null)
							this[keys[i]] = properties[keys[i]];
			}

			/**
			 * CatalogBots bots.
			 * @member {Array.<conversation.ICatalogBot>} bots
			 * @memberof conversation.CatalogResponse.CatalogBots
			 * @instance
			 */
			CatalogBots.prototype.bots = $util.emptyArray;

			/**
			 * Creates a new CatalogBots instance using the specified properties.
			 * @function create
			 * @memberof conversation.CatalogResponse.CatalogBots
			 * @static
			 * @param {conversation.CatalogResponse.ICatalogBots=} [properties] Properties to set
			 * @returns {conversation.CatalogResponse.CatalogBots} CatalogBots instance
			 */
			CatalogBots.create = function create(properties) {
				return new CatalogBots(properties);
			};

			/**
			 * Encodes the specified CatalogBots message. Does not implicitly {@link conversation.CatalogResponse.CatalogBots.verify|verify} messages.
			 * @function encode
			 * @memberof conversation.CatalogResponse.CatalogBots
			 * @static
			 * @param {conversation.CatalogResponse.ICatalogBots} message CatalogBots message or plain object to encode
			 * @param {$protobuf.Writer} [writer] Writer to encode to
			 * @returns {$protobuf.Writer} Writer
			 */
			CatalogBots.encode = function encode(message, writer) {
				if (!writer) writer = $Writer.create();
				if (message.bots !== null && message.bots.length)
					for (var i = 0; i < message.bots.length; ++i)
						$root.conversation.CatalogBot.encode(
							message.bots[i],
							writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
						).ldelim();
				return writer;
			};

			/**
			 * Encodes the specified CatalogBots message, length delimited. Does not implicitly {@link conversation.CatalogResponse.CatalogBots.verify|verify} messages.
			 * @function encodeDelimited
			 * @memberof conversation.CatalogResponse.CatalogBots
			 * @static
			 * @param {conversation.CatalogResponse.ICatalogBots} message CatalogBots message or plain object to encode
			 * @param {$protobuf.Writer} [writer] Writer to encode to
			 * @returns {$protobuf.Writer} Writer
			 */
			CatalogBots.encodeDelimited = function encodeDelimited(message, writer) {
				return this.encode(message, writer).ldelim();
			};

			/**
			 * Decodes a CatalogBots message from the specified reader or buffer.
			 * @function decode
			 * @memberof conversation.CatalogResponse.CatalogBots
			 * @static
			 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
			 * @param {number} [length] Message length if known beforehand
			 * @returns {conversation.CatalogResponse.CatalogBots} CatalogBots
			 * @throws {Error} If the payload is not a reader or valid buffer
			 * @throws {$protobuf.util.ProtocolError} If required fields are missing
			 */
			CatalogBots.decode = function decode(reader, length) {
				if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
				var end = length === undefined ? reader.len : reader.pos + length,
					message = new $root.conversation.CatalogResponse.CatalogBots();
				while (reader.pos < end) {
					var tag = reader.uint32();
					switch (tag >>> 3) {
						case 1:
							if (!(message.bots && message.bots.length)) message.bots = [];
							message.bots.push(
								$root.conversation.CatalogBot.decode(reader, reader.uint32())
							);
							break;
						default:
							reader.skipType(tag & 7);
							break;
					}
				}
				return message;
			};

			/**
			 * Decodes a CatalogBots message from the specified reader or buffer, length delimited.
			 * @function decodeDelimited
			 * @memberof conversation.CatalogResponse.CatalogBots
			 * @static
			 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
			 * @returns {conversation.CatalogResponse.CatalogBots} CatalogBots
			 * @throws {Error} If the payload is not a reader or valid buffer
			 * @throws {$protobuf.util.ProtocolError} If required fields are missing
			 */
			CatalogBots.decodeDelimited = function decodeDelimited(reader) {
				if (!(reader instanceof $Reader)) reader = new $Reader(reader);
				return this.decode(reader, reader.uint32());
			};

			/**
			 * Verifies a CatalogBots message.
			 * @function verify
			 * @memberof conversation.CatalogResponse.CatalogBots
			 * @static
			 * @param {Object.<string,*>} message Plain object to verify
			 * @returns {string|null} `null` if valid, otherwise the reason why it is not
			 */
			CatalogBots.verify = function verify(message) {
				if (typeof message !== "object" || message === null)
					return "object expected";
				if (message.bots !== null && message.hasOwnProperty("bots")) {
					if (!Array.isArray(message.bots)) return "bots: array expected";
					for (var i = 0; i < message.bots.length; ++i) {
						var error = $root.conversation.CatalogBot.verify(message.bots[i]);
						if (error) return "bots." + error;
					}
				}
				return null;
			};

			/**
			 * Creates a CatalogBots message from a plain object. Also converts values to their respective internal types.
			 * @function fromObject
			 * @memberof conversation.CatalogResponse.CatalogBots
			 * @static
			 * @param {Object.<string,*>} object Plain object
			 * @returns {conversation.CatalogResponse.CatalogBots} CatalogBots
			 */
			CatalogBots.fromObject = function fromObject(object) {
				if (object instanceof $root.conversation.CatalogResponse.CatalogBots)
					return object;
				var message = new $root.conversation.CatalogResponse.CatalogBots();
				if (object.bots) {
					if (!Array.isArray(object.bots))
						throw TypeError(
							".conversation.CatalogResponse.CatalogBots.bots: array expected"
						);
					message.bots = [];
					for (var i = 0; i < object.bots.length; ++i) {
						if (typeof object.bots[i] !== "object")
							throw TypeError(
								".conversation.CatalogResponse.CatalogBots.bots: object expected"
							);
						message.bots[i] = $root.conversation.CatalogBot.fromObject(
							object.bots[i]
						);
					}
				}
				return message;
			};

			/**
			 * Creates a plain object from a CatalogBots message. Also converts values to other types if specified.
			 * @function toObject
			 * @memberof conversation.CatalogResponse.CatalogBots
			 * @static
			 * @param {conversation.CatalogResponse.CatalogBots} message CatalogBots
			 * @param {$protobuf.IConversionOptions} [options] Conversion options
			 * @returns {Object.<string,*>} Plain object
			 */
			CatalogBots.toObject = function toObject(message, options) {
				if (!options) options = {};
				var object = {};
				if (options.arrays || options.defaults) object.bots = [];
				if (message.bots && message.bots.length) {
					object.bots = [];
					for (var j = 0; j < message.bots.length; ++j)
						object.bots[j] = $root.conversation.CatalogBot.toObject(
							message.bots[j],
							options
						);
				}
				return object;
			};

			/**
			 * Converts this CatalogBots to JSON.
			 * @function toJSON
			 * @memberof conversation.CatalogResponse.CatalogBots
			 * @instance
			 * @returns {Object.<string,*>} JSON object
			 */
			CatalogBots.prototype.toJSON = function toJSON() {
				return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
			};

			return CatalogBots;
		})();

		return CatalogResponse;
	})();

	conversation.CatalogBot = (function () {
		/**
		 * Properties of a CatalogBot.
		 * @memberof conversation
		 * @interface ICatalogBot
		 * @property {string|null} [botId] CatalogBot botId
		 * @property {string|null} [userDomain] CatalogBot userDomain
		 * @property {string|null} [allowResetConversation] CatalogBot allowResetConversation
		 * @property {conversation.ICatalogBotClients|null} [botClients] CatalogBot botClients
		 * @property {string|null} [botName] CatalogBot botName
		 * @property {string|null} [botNameSearch] CatalogBot botNameSearch
		 * @property {string|null} [botUrl] CatalogBot botUrl
		 * @property {Array.<string>|null} [category] CatalogBot category
		 * @property {conversation.ICatalogDependencies|null} [dependencies] CatalogBot dependencies
		 * @property {string|null} [description] CatalogBot description
		 * @property {string|null} [descriptionSearch] CatalogBot descriptionSearch
		 * @property {string|null} [logoUrl] CatalogBot logoUrl
		 * @property {string|null} [slug] CatalogBot slug
		 * @property {Array.<string>|null} [userRoles] CatalogBot userRoles
		 * @property {string|null} [version] CatalogBot version
		 * @property {string|null} [developer] CatalogBot developer
		 * @property {boolean|null} [featured] CatalogBot featured
		 * @property {boolean|null} [systemBot] CatalogBot systemBot
		 * @property {string|null} [minRequiredPlatformVersion] CatalogBot minRequiredPlatformVersion
		 * @property {boolean|null} [conversational] CatalogBot conversational
		 * @property {boolean|null} [authorisedAccess] CatalogBot authorisedAccess
		 * @property {number|null} [inactivityDuration] CatalogBot inactivityDuration
		 */

		/**
		 * Constructs a new CatalogBot.
		 * @memberof conversation
		 * @classdesc Represents a CatalogBot.
		 * @implements ICatalogBot
		 * @constructor
		 * @param {conversation.ICatalogBot=} [properties] Properties to set
		 */
		function CatalogBot(properties) {
			this.category = [];
			this.userRoles = [];
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * CatalogBot botId.
		 * @member {string} botId
		 * @memberof conversation.CatalogBot
		 * @instance
		 */
		CatalogBot.prototype.botId = "";

		/**
		 * CatalogBot userDomain.
		 * @member {string} userDomain
		 * @memberof conversation.CatalogBot
		 * @instance
		 */
		CatalogBot.prototype.userDomain = "";

		/**
		 * CatalogBot allowResetConversation.
		 * @member {string} allowResetConversation
		 * @memberof conversation.CatalogBot
		 * @instance
		 */
		CatalogBot.prototype.allowResetConversation = "";

		/**
		 * CatalogBot botClients.
		 * @member {conversation.ICatalogBotClients|null|undefined} botClients
		 * @memberof conversation.CatalogBot
		 * @instance
		 */
		CatalogBot.prototype.botClients = null;

		/**
		 * CatalogBot botName.
		 * @member {string} botName
		 * @memberof conversation.CatalogBot
		 * @instance
		 */
		CatalogBot.prototype.botName = "";

		/**
		 * CatalogBot botNameSearch.
		 * @member {string} botNameSearch
		 * @memberof conversation.CatalogBot
		 * @instance
		 */
		CatalogBot.prototype.botNameSearch = "";

		/**
		 * CatalogBot botUrl.
		 * @member {string} botUrl
		 * @memberof conversation.CatalogBot
		 * @instance
		 */
		CatalogBot.prototype.botUrl = "";

		/**
		 * CatalogBot category.
		 * @member {Array.<string>} category
		 * @memberof conversation.CatalogBot
		 * @instance
		 */
		CatalogBot.prototype.category = $util.emptyArray;

		/**
		 * CatalogBot dependencies.
		 * @member {conversation.ICatalogDependencies|null|undefined} dependencies
		 * @memberof conversation.CatalogBot
		 * @instance
		 */
		CatalogBot.prototype.dependencies = null;

		/**
		 * CatalogBot description.
		 * @member {string} description
		 * @memberof conversation.CatalogBot
		 * @instance
		 */
		CatalogBot.prototype.description = "";

		/**
		 * CatalogBot descriptionSearch.
		 * @member {string} descriptionSearch
		 * @memberof conversation.CatalogBot
		 * @instance
		 */
		CatalogBot.prototype.descriptionSearch = "";

		/**
		 * CatalogBot logoUrl.
		 * @member {string} logoUrl
		 * @memberof conversation.CatalogBot
		 * @instance
		 */
		CatalogBot.prototype.logoUrl = "";

		/**
		 * CatalogBot slug.
		 * @member {string} slug
		 * @memberof conversation.CatalogBot
		 * @instance
		 */
		CatalogBot.prototype.slug = "";

		/**
		 * CatalogBot userRoles.
		 * @member {Array.<string>} userRoles
		 * @memberof conversation.CatalogBot
		 * @instance
		 */
		CatalogBot.prototype.userRoles = $util.emptyArray;

		/**
		 * CatalogBot version.
		 * @member {string} version
		 * @memberof conversation.CatalogBot
		 * @instance
		 */
		CatalogBot.prototype.version = "";

		/**
		 * CatalogBot developer.
		 * @member {string} developer
		 * @memberof conversation.CatalogBot
		 * @instance
		 */
		CatalogBot.prototype.developer = "";

		/**
		 * CatalogBot featured.
		 * @member {boolean} featured
		 * @memberof conversation.CatalogBot
		 * @instance
		 */
		CatalogBot.prototype.featured = false;

		/**
		 * CatalogBot systemBot.
		 * @member {boolean} systemBot
		 * @memberof conversation.CatalogBot
		 * @instance
		 */
		CatalogBot.prototype.systemBot = false;

		/**
		 * CatalogBot minRequiredPlatformVersion.
		 * @member {string} minRequiredPlatformVersion
		 * @memberof conversation.CatalogBot
		 * @instance
		 */
		CatalogBot.prototype.minRequiredPlatformVersion = "";

		/**
		 * CatalogBot conversational.
		 * @member {boolean} conversational
		 * @memberof conversation.CatalogBot
		 * @instance
		 */
		CatalogBot.prototype.conversational = false;

		/**
		 * CatalogBot authorisedAccess.
		 * @member {boolean} authorisedAccess
		 * @memberof conversation.CatalogBot
		 * @instance
		 */
		CatalogBot.prototype.authorisedAccess = false;

		/**
		 * CatalogBot inactivityDuration.
		 * @member {number} inactivityDuration
		 * @memberof conversation.CatalogBot
		 * @instance
		 */
		CatalogBot.prototype.inactivityDuration = 0;

		/**
		 * Creates a new CatalogBot instance using the specified properties.
		 * @function create
		 * @memberof conversation.CatalogBot
		 * @static
		 * @param {conversation.ICatalogBot=} [properties] Properties to set
		 * @returns {conversation.CatalogBot} CatalogBot instance
		 */
		CatalogBot.create = function create(properties) {
			return new CatalogBot(properties);
		};

		/**
		 * Encodes the specified CatalogBot message. Does not implicitly {@link conversation.CatalogBot.verify|verify} messages.
		 * @function encode
		 * @memberof conversation.CatalogBot
		 * @static
		 * @param {conversation.ICatalogBot} message CatalogBot message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		CatalogBot.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.botId !== null &&
				Object.hasOwnProperty.call(message, "botId")
			)
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.botId);
			if (
				message.userDomain !== null &&
				Object.hasOwnProperty.call(message, "userDomain")
			)
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.userDomain);
			if (
				message.allowResetConversation !== null &&
				Object.hasOwnProperty.call(message, "allowResetConversation")
			)
				writer
					.uint32(/* id 3, wireType 2 =*/ 26)
					.string(message.allowResetConversation);
			if (
				message.botClients !== null &&
				Object.hasOwnProperty.call(message, "botClients")
			)
				$root.conversation.CatalogBotClients.encode(
					message.botClients,
					writer.uint32(/* id 4, wireType 2 =*/ 34).fork()
				).ldelim();
			if (
				message.botName !== null &&
				Object.hasOwnProperty.call(message, "botName")
			)
				writer.uint32(/* id 5, wireType 2 =*/ 42).string(message.botName);
			if (
				message.botNameSearch !== null &&
				Object.hasOwnProperty.call(message, "botNameSearch")
			)
				writer.uint32(/* id 6, wireType 2 =*/ 50).string(message.botNameSearch);
			if (
				message.botUrl !== null &&
				Object.hasOwnProperty.call(message, "botUrl")
			)
				writer.uint32(/* id 7, wireType 2 =*/ 58).string(message.botUrl);
			if (message.category !== null && message.category.length)
				for (var i = 0; i < message.category.length; ++i)
					writer.uint32(/* id 8, wireType 2 =*/ 66).string(message.category[i]);
			if (
				message.dependencies !== null &&
				Object.hasOwnProperty.call(message, "dependencies")
			)
				$root.conversation.CatalogDependencies.encode(
					message.dependencies,
					writer.uint32(/* id 9, wireType 2 =*/ 74).fork()
				).ldelim();
			if (
				message.description !== null &&
				Object.hasOwnProperty.call(message, "description")
			)
				writer.uint32(/* id 10, wireType 2 =*/ 82).string(message.description);
			if (
				message.descriptionSearch !== null &&
				Object.hasOwnProperty.call(message, "descriptionSearch")
			)
				writer
					.uint32(/* id 11, wireType 2 =*/ 90)
					.string(message.descriptionSearch);
			if (
				message.logoUrl !== null &&
				Object.hasOwnProperty.call(message, "logoUrl")
			)
				writer.uint32(/* id 12, wireType 2 =*/ 98).string(message.logoUrl);
			if (message.slug !== null && Object.hasOwnProperty.call(message, "slug"))
				writer.uint32(/* id 13, wireType 2 =*/ 106).string(message.slug);
			if (message.userRoles !== null && message.userRoles.length)
				for (var i = 0; i < message.userRoles.length; ++i)
					writer
						.uint32(/* id 14, wireType 2 =*/ 114)
						.string(message.userRoles[i]);
			if (
				message.version !== null &&
				Object.hasOwnProperty.call(message, "version")
			)
				writer.uint32(/* id 15, wireType 2 =*/ 122).string(message.version);
			if (
				message.developer !== null &&
				Object.hasOwnProperty.call(message, "developer")
			)
				writer.uint32(/* id 16, wireType 2 =*/ 130).string(message.developer);
			if (
				message.featured !== null &&
				Object.hasOwnProperty.call(message, "featured")
			)
				writer.uint32(/* id 17, wireType 0 =*/ 136).bool(message.featured);
			if (
				message.systemBot !== null &&
				Object.hasOwnProperty.call(message, "systemBot")
			)
				writer.uint32(/* id 18, wireType 0 =*/ 144).bool(message.systemBot);
			if (
				message.minRequiredPlatformVersion !== null &&
				Object.hasOwnProperty.call(message, "minRequiredPlatformVersion")
			)
				writer
					.uint32(/* id 19, wireType 2 =*/ 154)
					.string(message.minRequiredPlatformVersion);
			if (
				message.conversational !== null &&
				Object.hasOwnProperty.call(message, "conversational")
			)
				writer
					.uint32(/* id 20, wireType 0 =*/ 160)
					.bool(message.conversational);
			if (
				message.authorisedAccess !== null &&
				Object.hasOwnProperty.call(message, "authorisedAccess")
			)
				writer
					.uint32(/* id 21, wireType 0 =*/ 168)
					.bool(message.authorisedAccess);
			if (
				message.inactivityDuration !== null &&
				Object.hasOwnProperty.call(message, "inactivityDuration")
			)
				writer
					.uint32(/* id 22, wireType 0 =*/ 176)
					.int32(message.inactivityDuration);
			return writer;
		};

		/**
		 * Encodes the specified CatalogBot message, length delimited. Does not implicitly {@link conversation.CatalogBot.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof conversation.CatalogBot
		 * @static
		 * @param {conversation.ICatalogBot} message CatalogBot message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		CatalogBot.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a CatalogBot message from the specified reader or buffer.
		 * @function decode
		 * @memberof conversation.CatalogBot
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {conversation.CatalogBot} CatalogBot
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		CatalogBot.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.conversation.CatalogBot();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.botId = reader.string();
						break;
					case 2:
						message.userDomain = reader.string();
						break;
					case 3:
						message.allowResetConversation = reader.string();
						break;
					case 4:
						message.botClients = $root.conversation.CatalogBotClients.decode(
							reader,
							reader.uint32()
						);
						break;
					case 5:
						message.botName = reader.string();
						break;
					case 6:
						message.botNameSearch = reader.string();
						break;
					case 7:
						message.botUrl = reader.string();
						break;
					case 8:
						if (!(message.category && message.category.length))
							message.category = [];
						message.category.push(reader.string());
						break;
					case 9:
						message.dependencies =
							$root.conversation.CatalogDependencies.decode(
								reader,
								reader.uint32()
							);
						break;
					case 10:
						message.description = reader.string();
						break;
					case 11:
						message.descriptionSearch = reader.string();
						break;
					case 12:
						message.logoUrl = reader.string();
						break;
					case 13:
						message.slug = reader.string();
						break;
					case 14:
						if (!(message.userRoles && message.userRoles.length))
							message.userRoles = [];
						message.userRoles.push(reader.string());
						break;
					case 15:
						message.version = reader.string();
						break;
					case 16:
						message.developer = reader.string();
						break;
					case 17:
						message.featured = reader.bool();
						break;
					case 18:
						message.systemBot = reader.bool();
						break;
					case 19:
						message.minRequiredPlatformVersion = reader.string();
						break;
					case 20:
						message.conversational = reader.bool();
						break;
					case 21:
						message.authorisedAccess = reader.bool();
						break;
					case 22:
						message.inactivityDuration = reader.int32();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a CatalogBot message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof conversation.CatalogBot
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {conversation.CatalogBot} CatalogBot
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		CatalogBot.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a CatalogBot message.
		 * @function verify
		 * @memberof conversation.CatalogBot
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		CatalogBot.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.botId !== null && message.hasOwnProperty("botId"))
				if (!$util.isString(message.botId)) return "botId: string expected";
			if (message.userDomain !== null && message.hasOwnProperty("userDomain"))
				if (!$util.isString(message.userDomain))
					return "userDomain: string expected";
			if (
				message.allowResetConversation !== null &&
				message.hasOwnProperty("allowResetConversation")
			)
				if (!$util.isString(message.allowResetConversation))
					return "allowResetConversation: string expected";
			if (message.botClients !== null && message.hasOwnProperty("botClients")) {
				var error = $root.conversation.CatalogBotClients.verify(
					message.botClients
				);
				if (error) return "botClients." + error;
			}
			if (message.botName !== null && message.hasOwnProperty("botName"))
				if (!$util.isString(message.botName)) return "botName: string expected";
			if (
				message.botNameSearch !== null &&
				message.hasOwnProperty("botNameSearch")
			)
				if (!$util.isString(message.botNameSearch))
					return "botNameSearch: string expected";
			if (message.botUrl !== null && message.hasOwnProperty("botUrl"))
				if (!$util.isString(message.botUrl)) return "botUrl: string expected";
			if (message.category !== null && message.hasOwnProperty("category")) {
				if (!Array.isArray(message.category)) return "category: array expected";
				for (var i = 0; i < message.category.length; ++i)
					if (!$util.isString(message.category[i]))
						return "category: string[] expected";
			}
			if (
				message.dependencies !== null &&
				message.hasOwnProperty("dependencies")
			) {
				var error = $root.conversation.CatalogDependencies.verify(
					message.dependencies
				);
				if (error) return "dependencies." + error;
			}
			if (message.description !== null && message.hasOwnProperty("description"))
				if (!$util.isString(message.description))
					return "description: string expected";
			if (
				message.descriptionSearch !== null &&
				message.hasOwnProperty("descriptionSearch")
			)
				if (!$util.isString(message.descriptionSearch))
					return "descriptionSearch: string expected";
			if (message.logoUrl !== null && message.hasOwnProperty("logoUrl"))
				if (!$util.isString(message.logoUrl)) return "logoUrl: string expected";
			if (message.slug !== null && message.hasOwnProperty("slug"))
				if (!$util.isString(message.slug)) return "slug: string expected";
			if (message.userRoles !== null && message.hasOwnProperty("userRoles")) {
				if (!Array.isArray(message.userRoles))
					return "userRoles: array expected";
				for (var i = 0; i < message.userRoles.length; ++i)
					if (!$util.isString(message.userRoles[i]))
						return "userRoles: string[] expected";
			}
			if (message.version !== null && message.hasOwnProperty("version"))
				if (!$util.isString(message.version)) return "version: string expected";
			if (message.developer !== null && message.hasOwnProperty("developer"))
				if (!$util.isString(message.developer))
					return "developer: string expected";
			if (message.featured !== null && message.hasOwnProperty("featured"))
				if (typeof message.featured !== "boolean")
					return "featured: boolean expected";
			if (message.systemBot !== null && message.hasOwnProperty("systemBot"))
				if (typeof message.systemBot !== "boolean")
					return "systemBot: boolean expected";
			if (
				message.minRequiredPlatformVersion !== null &&
				message.hasOwnProperty("minRequiredPlatformVersion")
			)
				if (!$util.isString(message.minRequiredPlatformVersion))
					return "minRequiredPlatformVersion: string expected";
			if (
				message.conversational !== null &&
				message.hasOwnProperty("conversational")
			)
				if (typeof message.conversational !== "boolean")
					return "conversational: boolean expected";
			if (
				message.authorisedAccess !== null &&
				message.hasOwnProperty("authorisedAccess")
			)
				if (typeof message.authorisedAccess !== "boolean")
					return "authorisedAccess: boolean expected";
			if (
				message.inactivityDuration !== null &&
				message.hasOwnProperty("inactivityDuration")
			)
				if (!$util.isInteger(message.inactivityDuration))
					return "inactivityDuration: integer expected";
			return null;
		};

		/**
		 * Creates a CatalogBot message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof conversation.CatalogBot
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {conversation.CatalogBot} CatalogBot
		 */
		CatalogBot.fromObject = function fromObject(object) {
			if (object instanceof $root.conversation.CatalogBot) return object;
			var message = new $root.conversation.CatalogBot();
			if (object.botId !== null) message.botId = String(object.botId);
			if (object.userDomain !== null)
				message.userDomain = String(object.userDomain);
			if (object.allowResetConversation !== null)
				message.allowResetConversation = String(object.allowResetConversation);
			if (object.botClients !== null) {
				if (typeof object.botClients !== "object")
					throw TypeError(
						".conversation.CatalogBot.botClients: object expected"
					);
				message.botClients = $root.conversation.CatalogBotClients.fromObject(
					object.botClients
				);
			}
			if (object.botName !== null) message.botName = String(object.botName);
			if (object.botNameSearch !== null)
				message.botNameSearch = String(object.botNameSearch);
			if (object.botUrl !== null) message.botUrl = String(object.botUrl);
			if (object.category) {
				if (!Array.isArray(object.category))
					throw TypeError(".conversation.CatalogBot.category: array expected");
				message.category = [];
				for (var i = 0; i < object.category.length; ++i)
					message.category[i] = String(object.category[i]);
			}
			if (object.dependencies !== null) {
				if (typeof object.dependencies !== "object")
					throw TypeError(
						".conversation.CatalogBot.dependencies: object expected"
					);
				message.dependencies =
					$root.conversation.CatalogDependencies.fromObject(
						object.dependencies
					);
			}
			if (object.description !== null)
				message.description = String(object.description);
			if (object.descriptionSearch !== null)
				message.descriptionSearch = String(object.descriptionSearch);
			if (object.logoUrl !== null) message.logoUrl = String(object.logoUrl);
			if (object.slug !== null) message.slug = String(object.slug);
			if (object.userRoles) {
				if (!Array.isArray(object.userRoles))
					throw TypeError(".conversation.CatalogBot.userRoles: array expected");
				message.userRoles = [];
				for (var i = 0; i < object.userRoles.length; ++i)
					message.userRoles[i] = String(object.userRoles[i]);
			}
			if (object.version !== null) message.version = String(object.version);
			if (object.developer !== null)
				message.developer = String(object.developer);
			if (object.featured !== null) message.featured = Boolean(object.featured);
			if (object.systemBot !== null)
				message.systemBot = Boolean(object.systemBot);
			if (object.minRequiredPlatformVersion !== null)
				message.minRequiredPlatformVersion = String(
					object.minRequiredPlatformVersion
				);
			if (object.conversational !== null)
				message.conversational = Boolean(object.conversational);
			if (object.authorisedAccess !== null)
				message.authorisedAccess = Boolean(object.authorisedAccess);
			if (object.inactivityDuration !== null)
				message.inactivityDuration = object.inactivityDuration | 0;
			return message;
		};

		/**
		 * Creates a plain object from a CatalogBot message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof conversation.CatalogBot
		 * @static
		 * @param {conversation.CatalogBot} message CatalogBot
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		CatalogBot.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.arrays || options.defaults) {
				object.category = [];
				object.userRoles = [];
			}
			if (options.defaults) {
				object.botId = "";
				object.userDomain = "";
				object.allowResetConversation = "";
				object.botClients = null;
				object.botName = "";
				object.botNameSearch = "";
				object.botUrl = "";
				object.dependencies = null;
				object.description = "";
				object.descriptionSearch = "";
				object.logoUrl = "";
				object.slug = "";
				object.version = "";
				object.developer = "";
				object.featured = false;
				object.systemBot = false;
				object.minRequiredPlatformVersion = "";
				object.conversational = false;
				object.authorisedAccess = false;
				object.inactivityDuration = 0;
			}
			if (message.botId !== null && message.hasOwnProperty("botId"))
				object.botId = message.botId;
			if (message.userDomain !== null && message.hasOwnProperty("userDomain"))
				object.userDomain = message.userDomain;
			if (
				message.allowResetConversation !== null &&
				message.hasOwnProperty("allowResetConversation")
			)
				object.allowResetConversation = message.allowResetConversation;
			if (message.botClients !== null && message.hasOwnProperty("botClients"))
				object.botClients = $root.conversation.CatalogBotClients.toObject(
					message.botClients,
					options
				);
			if (message.botName !== null && message.hasOwnProperty("botName"))
				object.botName = message.botName;
			if (
				message.botNameSearch !== null &&
				message.hasOwnProperty("botNameSearch")
			)
				object.botNameSearch = message.botNameSearch;
			if (message.botUrl !== null && message.hasOwnProperty("botUrl"))
				object.botUrl = message.botUrl;
			if (message.category && message.category.length) {
				object.category = [];
				for (var j = 0; j < message.category.length; ++j)
					object.category[j] = message.category[j];
			}
			if (
				message.dependencies !== null &&
				message.hasOwnProperty("dependencies")
			)
				object.dependencies = $root.conversation.CatalogDependencies.toObject(
					message.dependencies,
					options
				);
			if (message.description !== null && message.hasOwnProperty("description"))
				object.description = message.description;
			if (
				message.descriptionSearch !== null &&
				message.hasOwnProperty("descriptionSearch")
			)
				object.descriptionSearch = message.descriptionSearch;
			if (message.logoUrl !== null && message.hasOwnProperty("logoUrl"))
				object.logoUrl = message.logoUrl;
			if (message.slug !== null && message.hasOwnProperty("slug"))
				object.slug = message.slug;
			if (message.userRoles && message.userRoles.length) {
				object.userRoles = [];
				for (var j = 0; j < message.userRoles.length; ++j)
					object.userRoles[j] = message.userRoles[j];
			}
			if (message.version !== null && message.hasOwnProperty("version"))
				object.version = message.version;
			if (message.developer !== null && message.hasOwnProperty("developer"))
				object.developer = message.developer;
			if (message.featured !== null && message.hasOwnProperty("featured"))
				object.featured = message.featured;
			if (message.systemBot !== null && message.hasOwnProperty("systemBot"))
				object.systemBot = message.systemBot;
			if (
				message.minRequiredPlatformVersion !== null &&
				message.hasOwnProperty("minRequiredPlatformVersion")
			)
				object.minRequiredPlatformVersion = message.minRequiredPlatformVersion;
			if (
				message.conversational !== null &&
				message.hasOwnProperty("conversational")
			)
				object.conversational = message.conversational;
			if (
				message.authorisedAccess !== null &&
				message.hasOwnProperty("authorisedAccess")
			)
				object.authorisedAccess = message.authorisedAccess;
			if (
				message.inactivityDuration !== null &&
				message.hasOwnProperty("inactivityDuration")
			)
				object.inactivityDuration = message.inactivityDuration;
			return object;
		};

		/**
		 * Converts this CatalogBot to JSON.
		 * @function toJSON
		 * @memberof conversation.CatalogBot
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		CatalogBot.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return CatalogBot;
	})();

	conversation.CatalogBotClients = (function () {
		/**
		 * Properties of a CatalogBotClients.
		 * @memberof conversation
		 * @interface ICatalogBotClients
		 * @property {boolean|null} [mobile] CatalogBotClients mobile
		 * @property {boolean|null} [web] CatalogBotClients web
		 */

		/**
		 * Constructs a new CatalogBotClients.
		 * @memberof conversation
		 * @classdesc Represents a CatalogBotClients.
		 * @implements ICatalogBotClients
		 * @constructor
		 * @param {conversation.ICatalogBotClients=} [properties] Properties to set
		 */
		function CatalogBotClients(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * CatalogBotClients mobile.
		 * @member {boolean} mobile
		 * @memberof conversation.CatalogBotClients
		 * @instance
		 */
		CatalogBotClients.prototype.mobile = false;

		/**
		 * CatalogBotClients web.
		 * @member {boolean} web
		 * @memberof conversation.CatalogBotClients
		 * @instance
		 */
		CatalogBotClients.prototype.web = false;

		/**
		 * Creates a new CatalogBotClients instance using the specified properties.
		 * @function create
		 * @memberof conversation.CatalogBotClients
		 * @static
		 * @param {conversation.ICatalogBotClients=} [properties] Properties to set
		 * @returns {conversation.CatalogBotClients} CatalogBotClients instance
		 */
		CatalogBotClients.create = function create(properties) {
			return new CatalogBotClients(properties);
		};

		/**
		 * Encodes the specified CatalogBotClients message. Does not implicitly {@link conversation.CatalogBotClients.verify|verify} messages.
		 * @function encode
		 * @memberof conversation.CatalogBotClients
		 * @static
		 * @param {conversation.ICatalogBotClients} message CatalogBotClients message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		CatalogBotClients.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.mobile !== null &&
				Object.hasOwnProperty.call(message, "mobile")
			)
				writer.uint32(/* id 1, wireType 0 =*/ 8).bool(message.mobile);
			if (message.web !== null && Object.hasOwnProperty.call(message, "web"))
				writer.uint32(/* id 2, wireType 0 =*/ 16).bool(message.web);
			return writer;
		};

		/**
		 * Encodes the specified CatalogBotClients message, length delimited. Does not implicitly {@link conversation.CatalogBotClients.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof conversation.CatalogBotClients
		 * @static
		 * @param {conversation.ICatalogBotClients} message CatalogBotClients message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		CatalogBotClients.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a CatalogBotClients message from the specified reader or buffer.
		 * @function decode
		 * @memberof conversation.CatalogBotClients
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {conversation.CatalogBotClients} CatalogBotClients
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		CatalogBotClients.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.conversation.CatalogBotClients();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.mobile = reader.bool();
						break;
					case 2:
						message.web = reader.bool();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a CatalogBotClients message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof conversation.CatalogBotClients
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {conversation.CatalogBotClients} CatalogBotClients
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		CatalogBotClients.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a CatalogBotClients message.
		 * @function verify
		 * @memberof conversation.CatalogBotClients
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		CatalogBotClients.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.mobile !== null && message.hasOwnProperty("mobile"))
				if (typeof message.mobile !== "boolean")
					return "mobile: boolean expected";
			if (message.web !== null && message.hasOwnProperty("web"))
				if (typeof message.web !== "boolean") return "web: boolean expected";
			return null;
		};

		/**
		 * Creates a CatalogBotClients message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof conversation.CatalogBotClients
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {conversation.CatalogBotClients} CatalogBotClients
		 */
		CatalogBotClients.fromObject = function fromObject(object) {
			if (object instanceof $root.conversation.CatalogBotClients) return object;
			var message = new $root.conversation.CatalogBotClients();
			if (object.mobile !== null) message.mobile = Boolean(object.mobile);
			if (object.web !== null) message.web = Boolean(object.web);
			return message;
		};

		/**
		 * Creates a plain object from a CatalogBotClients message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof conversation.CatalogBotClients
		 * @static
		 * @param {conversation.CatalogBotClients} message CatalogBotClients
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		CatalogBotClients.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.mobile = false;
				object.web = false;
			}
			if (message.mobile !== null && message.hasOwnProperty("mobile"))
				object.mobile = message.mobile;
			if (message.web !== null && message.hasOwnProperty("web"))
				object.web = message.web;
			return object;
		};

		/**
		 * Converts this CatalogBotClients to JSON.
		 * @function toJSON
		 * @memberof conversation.CatalogBotClients
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		CatalogBotClients.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return CatalogBotClients;
	})();

	conversation.CatalogDependencies = (function () {
		/**
		 * Properties of a CatalogDependencies.
		 * @memberof conversation
		 * @interface ICatalogDependencies
		 * @property {conversation.ICatalogDependency|null} [agentGuardService] CatalogDependencies agentGuardService
		 * @property {conversation.ICatalogDependency|null} [authContext] CatalogDependencies authContext
		 * @property {conversation.ICatalogDependency|null} [archiveUtils] CatalogDependencies archiveUtils
		 * @property {conversation.ICatalogDependency|null} [botUtils] CatalogDependencies botUtils
		 * @property {conversation.ICatalogDependency|null} [autoRenewConversationContext] CatalogDependencies autoRenewConversationContext
		 */

		/**
		 * Constructs a new CatalogDependencies.
		 * @memberof conversation
		 * @classdesc Represents a CatalogDependencies.
		 * @implements ICatalogDependencies
		 * @constructor
		 * @param {conversation.ICatalogDependencies=} [properties] Properties to set
		 */
		function CatalogDependencies(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * CatalogDependencies agentGuardService.
		 * @member {conversation.ICatalogDependency|null|undefined} agentGuardService
		 * @memberof conversation.CatalogDependencies
		 * @instance
		 */
		CatalogDependencies.prototype.agentGuardService = null;

		/**
		 * CatalogDependencies authContext.
		 * @member {conversation.ICatalogDependency|null|undefined} authContext
		 * @memberof conversation.CatalogDependencies
		 * @instance
		 */
		CatalogDependencies.prototype.authContext = null;

		/**
		 * CatalogDependencies archiveUtils.
		 * @member {conversation.ICatalogDependency|null|undefined} archiveUtils
		 * @memberof conversation.CatalogDependencies
		 * @instance
		 */
		CatalogDependencies.prototype.archiveUtils = null;

		/**
		 * CatalogDependencies botUtils.
		 * @member {conversation.ICatalogDependency|null|undefined} botUtils
		 * @memberof conversation.CatalogDependencies
		 * @instance
		 */
		CatalogDependencies.prototype.botUtils = null;

		/**
		 * CatalogDependencies autoRenewConversationContext.
		 * @member {conversation.ICatalogDependency|null|undefined} autoRenewConversationContext
		 * @memberof conversation.CatalogDependencies
		 * @instance
		 */
		CatalogDependencies.prototype.autoRenewConversationContext = null;

		/**
		 * Creates a new CatalogDependencies instance using the specified properties.
		 * @function create
		 * @memberof conversation.CatalogDependencies
		 * @static
		 * @param {conversation.ICatalogDependencies=} [properties] Properties to set
		 * @returns {conversation.CatalogDependencies} CatalogDependencies instance
		 */
		CatalogDependencies.create = function create(properties) {
			return new CatalogDependencies(properties);
		};

		/**
		 * Encodes the specified CatalogDependencies message. Does not implicitly {@link conversation.CatalogDependencies.verify|verify} messages.
		 * @function encode
		 * @memberof conversation.CatalogDependencies
		 * @static
		 * @param {conversation.ICatalogDependencies} message CatalogDependencies message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		CatalogDependencies.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.agentGuardService !== null &&
				Object.hasOwnProperty.call(message, "agentGuardService")
			)
				$root.conversation.CatalogDependency.encode(
					message.agentGuardService,
					writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
				).ldelim();
			if (
				message.authContext !== null &&
				Object.hasOwnProperty.call(message, "authContext")
			)
				$root.conversation.CatalogDependency.encode(
					message.authContext,
					writer.uint32(/* id 2, wireType 2 =*/ 18).fork()
				).ldelim();
			if (
				message.archiveUtils !== null &&
				Object.hasOwnProperty.call(message, "archiveUtils")
			)
				$root.conversation.CatalogDependency.encode(
					message.archiveUtils,
					writer.uint32(/* id 3, wireType 2 =*/ 26).fork()
				).ldelim();
			if (
				message.botUtils !== null &&
				Object.hasOwnProperty.call(message, "botUtils")
			)
				$root.conversation.CatalogDependency.encode(
					message.botUtils,
					writer.uint32(/* id 4, wireType 2 =*/ 34).fork()
				).ldelim();
			if (
				message.autoRenewConversationContext !== null &&
				Object.hasOwnProperty.call(message, "autoRenewConversationContext")
			)
				$root.conversation.CatalogDependency.encode(
					message.autoRenewConversationContext,
					writer.uint32(/* id 5, wireType 2 =*/ 42).fork()
				).ldelim();
			return writer;
		};

		/**
		 * Encodes the specified CatalogDependencies message, length delimited. Does not implicitly {@link conversation.CatalogDependencies.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof conversation.CatalogDependencies
		 * @static
		 * @param {conversation.ICatalogDependencies} message CatalogDependencies message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		CatalogDependencies.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a CatalogDependencies message from the specified reader or buffer.
		 * @function decode
		 * @memberof conversation.CatalogDependencies
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {conversation.CatalogDependencies} CatalogDependencies
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		CatalogDependencies.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.conversation.CatalogDependencies();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.agentGuardService =
							$root.conversation.CatalogDependency.decode(
								reader,
								reader.uint32()
							);
						break;
					case 2:
						message.authContext = $root.conversation.CatalogDependency.decode(
							reader,
							reader.uint32()
						);
						break;
					case 3:
						message.archiveUtils = $root.conversation.CatalogDependency.decode(
							reader,
							reader.uint32()
						);
						break;
					case 4:
						message.botUtils = $root.conversation.CatalogDependency.decode(
							reader,
							reader.uint32()
						);
						break;
					case 5:
						message.autoRenewConversationContext =
							$root.conversation.CatalogDependency.decode(
								reader,
								reader.uint32()
							);
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a CatalogDependencies message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof conversation.CatalogDependencies
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {conversation.CatalogDependencies} CatalogDependencies
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		CatalogDependencies.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a CatalogDependencies message.
		 * @function verify
		 * @memberof conversation.CatalogDependencies
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		CatalogDependencies.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (
				message.agentGuardService !== null &&
				message.hasOwnProperty("agentGuardService")
			) {
				var error = $root.conversation.CatalogDependency.verify(
					message.agentGuardService
				);
				if (error) return "agentGuardService." + error;
			}
			if (
				message.authContext !== null &&
				message.hasOwnProperty("authContext")
			) {
				var error = $root.conversation.CatalogDependency.verify(
					message.authContext
				);
				if (error) return "authContext." + error;
			}
			if (
				message.archiveUtils !== null &&
				message.hasOwnProperty("archiveUtils")
			) {
				var error = $root.conversation.CatalogDependency.verify(
					message.archiveUtils
				);
				if (error) return "archiveUtils." + error;
			}
			if (message.botUtils !== null && message.hasOwnProperty("botUtils")) {
				var error = $root.conversation.CatalogDependency.verify(
					message.botUtils
				);
				if (error) return "botUtils." + error;
			}
			if (
				message.autoRenewConversationContext !== null &&
				message.hasOwnProperty("autoRenewConversationContext")
			) {
				var error = $root.conversation.CatalogDependency.verify(
					message.autoRenewConversationContext
				);
				if (error) return "autoRenewConversationContext." + error;
			}
			return null;
		};

		/**
		 * Creates a CatalogDependencies message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof conversation.CatalogDependencies
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {conversation.CatalogDependencies} CatalogDependencies
		 */
		CatalogDependencies.fromObject = function fromObject(object) {
			if (object instanceof $root.conversation.CatalogDependencies)
				return object;
			var message = new $root.conversation.CatalogDependencies();
			if (object.agentGuardService !== null) {
				if (typeof object.agentGuardService !== "object")
					throw TypeError(
						".conversation.CatalogDependencies.agentGuardService: object expected"
					);
				message.agentGuardService =
					$root.conversation.CatalogDependency.fromObject(
						object.agentGuardService
					);
			}
			if (object.authContext !== null) {
				if (typeof object.authContext !== "object")
					throw TypeError(
						".conversation.CatalogDependencies.authContext: object expected"
					);
				message.authContext = $root.conversation.CatalogDependency.fromObject(
					object.authContext
				);
			}
			if (object.archiveUtils !== null) {
				if (typeof object.archiveUtils !== "object")
					throw TypeError(
						".conversation.CatalogDependencies.archiveUtils: object expected"
					);
				message.archiveUtils = $root.conversation.CatalogDependency.fromObject(
					object.archiveUtils
				);
			}
			if (object.botUtils !== null) {
				if (typeof object.botUtils !== "object")
					throw TypeError(
						".conversation.CatalogDependencies.botUtils: object expected"
					);
				message.botUtils = $root.conversation.CatalogDependency.fromObject(
					object.botUtils
				);
			}
			if (object.autoRenewConversationContext !== null) {
				if (typeof object.autoRenewConversationContext !== "object")
					throw TypeError(
						".conversation.CatalogDependencies.autoRenewConversationContext: object expected"
					);
				message.autoRenewConversationContext =
					$root.conversation.CatalogDependency.fromObject(
						object.autoRenewConversationContext
					);
			}
			return message;
		};

		/**
		 * Creates a plain object from a CatalogDependencies message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof conversation.CatalogDependencies
		 * @static
		 * @param {conversation.CatalogDependencies} message CatalogDependencies
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		CatalogDependencies.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.agentGuardService = null;
				object.authContext = null;
				object.archiveUtils = null;
				object.botUtils = null;
				object.autoRenewConversationContext = null;
			}
			if (
				message.agentGuardService !== null &&
				message.hasOwnProperty("agentGuardService")
			)
				object.agentGuardService =
					$root.conversation.CatalogDependency.toObject(
						message.agentGuardService,
						options
					);
			if (message.authContext !== null && message.hasOwnProperty("authContext"))
				object.authContext = $root.conversation.CatalogDependency.toObject(
					message.authContext,
					options
				);
			if (
				message.archiveUtils !== null &&
				message.hasOwnProperty("archiveUtils")
			)
				object.archiveUtils = $root.conversation.CatalogDependency.toObject(
					message.archiveUtils,
					options
				);
			if (message.botUtils !== null && message.hasOwnProperty("botUtils"))
				object.botUtils = $root.conversation.CatalogDependency.toObject(
					message.botUtils,
					options
				);
			if (
				message.autoRenewConversationContext !== null &&
				message.hasOwnProperty("autoRenewConversationContext")
			)
				object.autoRenewConversationContext =
					$root.conversation.CatalogDependency.toObject(
						message.autoRenewConversationContext,
						options
					);
			return object;
		};

		/**
		 * Converts this CatalogDependencies to JSON.
		 * @function toJSON
		 * @memberof conversation.CatalogDependencies
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		CatalogDependencies.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return CatalogDependencies;
	})();

	conversation.CatalogDependency = (function () {
		/**
		 * Properties of a CatalogDependency.
		 * @memberof conversation
		 * @interface ICatalogDependency
		 * @property {boolean|null} [remote] CatalogDependency remote
		 * @property {string|null} [version] CatalogDependency version
		 * @property {string|null} [url] CatalogDependency url
		 */

		/**
		 * Constructs a new CatalogDependency.
		 * @memberof conversation
		 * @classdesc Represents a CatalogDependency.
		 * @implements ICatalogDependency
		 * @constructor
		 * @param {conversation.ICatalogDependency=} [properties] Properties to set
		 */
		function CatalogDependency(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * CatalogDependency remote.
		 * @member {boolean} remote
		 * @memberof conversation.CatalogDependency
		 * @instance
		 */
		CatalogDependency.prototype.remote = false;

		/**
		 * CatalogDependency version.
		 * @member {string} version
		 * @memberof conversation.CatalogDependency
		 * @instance
		 */
		CatalogDependency.prototype.version = "";

		/**
		 * CatalogDependency url.
		 * @member {string} url
		 * @memberof conversation.CatalogDependency
		 * @instance
		 */
		CatalogDependency.prototype.url = "";

		/**
		 * Creates a new CatalogDependency instance using the specified properties.
		 * @function create
		 * @memberof conversation.CatalogDependency
		 * @static
		 * @param {conversation.ICatalogDependency=} [properties] Properties to set
		 * @returns {conversation.CatalogDependency} CatalogDependency instance
		 */
		CatalogDependency.create = function create(properties) {
			return new CatalogDependency(properties);
		};

		/**
		 * Encodes the specified CatalogDependency message. Does not implicitly {@link conversation.CatalogDependency.verify|verify} messages.
		 * @function encode
		 * @memberof conversation.CatalogDependency
		 * @static
		 * @param {conversation.ICatalogDependency} message CatalogDependency message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		CatalogDependency.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.remote !== null &&
				Object.hasOwnProperty.call(message, "remote")
			)
				writer.uint32(/* id 1, wireType 0 =*/ 8).bool(message.remote);
			if (
				message.version !== null &&
				Object.hasOwnProperty.call(message, "version")
			)
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.version);
			if (message.url !== null && Object.hasOwnProperty.call(message, "url"))
				writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.url);
			return writer;
		};

		/**
		 * Encodes the specified CatalogDependency message, length delimited. Does not implicitly {@link conversation.CatalogDependency.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof conversation.CatalogDependency
		 * @static
		 * @param {conversation.ICatalogDependency} message CatalogDependency message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		CatalogDependency.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a CatalogDependency message from the specified reader or buffer.
		 * @function decode
		 * @memberof conversation.CatalogDependency
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {conversation.CatalogDependency} CatalogDependency
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		CatalogDependency.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.conversation.CatalogDependency();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.remote = reader.bool();
						break;
					case 2:
						message.version = reader.string();
						break;
					case 3:
						message.url = reader.string();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a CatalogDependency message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof conversation.CatalogDependency
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {conversation.CatalogDependency} CatalogDependency
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		CatalogDependency.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a CatalogDependency message.
		 * @function verify
		 * @memberof conversation.CatalogDependency
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		CatalogDependency.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.remote !== null && message.hasOwnProperty("remote"))
				if (typeof message.remote !== "boolean")
					return "remote: boolean expected";
			if (message.version !== null && message.hasOwnProperty("version"))
				if (!$util.isString(message.version)) return "version: string expected";
			if (message.url !== null && message.hasOwnProperty("url"))
				if (!$util.isString(message.url)) return "url: string expected";
			return null;
		};

		/**
		 * Creates a CatalogDependency message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof conversation.CatalogDependency
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {conversation.CatalogDependency} CatalogDependency
		 */
		CatalogDependency.fromObject = function fromObject(object) {
			if (object instanceof $root.conversation.CatalogDependency) return object;
			var message = new $root.conversation.CatalogDependency();
			if (object.remote !== null) message.remote = Boolean(object.remote);
			if (object.version !== null) message.version = String(object.version);
			if (object.url !== null) message.url = String(object.url);
			return message;
		};

		/**
		 * Creates a plain object from a CatalogDependency message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof conversation.CatalogDependency
		 * @static
		 * @param {conversation.CatalogDependency} message CatalogDependency
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		CatalogDependency.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.remote = false;
				object.version = "";
				object.url = "";
			}
			if (message.remote !== null && message.hasOwnProperty("remote"))
				object.remote = message.remote;
			if (message.version !== null && message.hasOwnProperty("version"))
				object.version = message.version;
			if (message.url !== null && message.hasOwnProperty("url"))
				object.url = message.url;
			return object;
		};

		/**
		 * Converts this CatalogDependency to JSON.
		 * @function toJSON
		 * @memberof conversation.CatalogDependency
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		CatalogDependency.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return CatalogDependency;
	})();

	conversation.GetConversationDetailsInput = (function () {
		/**
		 * Properties of a GetConversationDetailsInput.
		 * @memberof conversation
		 * @interface IGetConversationDetailsInput
		 * @property {string|null} [conversationId] GetConversationDetailsInput conversationId
		 * @property {string|null} [botId] GetConversationDetailsInput botId
		 * @property {string|null} [createdBy] GetConversationDetailsInput createdBy
		 */

		/**
		 * Constructs a new GetConversationDetailsInput.
		 * @memberof conversation
		 * @classdesc Represents a GetConversationDetailsInput.
		 * @implements IGetConversationDetailsInput
		 * @constructor
		 * @param {conversation.IGetConversationDetailsInput=} [properties] Properties to set
		 */
		function GetConversationDetailsInput(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * GetConversationDetailsInput conversationId.
		 * @member {string} conversationId
		 * @memberof conversation.GetConversationDetailsInput
		 * @instance
		 */
		GetConversationDetailsInput.prototype.conversationId = "";

		/**
		 * GetConversationDetailsInput botId.
		 * @member {string} botId
		 * @memberof conversation.GetConversationDetailsInput
		 * @instance
		 */
		GetConversationDetailsInput.prototype.botId = "";

		/**
		 * GetConversationDetailsInput createdBy.
		 * @member {string} createdBy
		 * @memberof conversation.GetConversationDetailsInput
		 * @instance
		 */
		GetConversationDetailsInput.prototype.createdBy = "";

		/**
		 * Creates a new GetConversationDetailsInput instance using the specified properties.
		 * @function create
		 * @memberof conversation.GetConversationDetailsInput
		 * @static
		 * @param {conversation.IGetConversationDetailsInput=} [properties] Properties to set
		 * @returns {conversation.GetConversationDetailsInput} GetConversationDetailsInput instance
		 */
		GetConversationDetailsInput.create = function create(properties) {
			return new GetConversationDetailsInput(properties);
		};

		/**
		 * Encodes the specified GetConversationDetailsInput message. Does not implicitly {@link conversation.GetConversationDetailsInput.verify|verify} messages.
		 * @function encode
		 * @memberof conversation.GetConversationDetailsInput
		 * @static
		 * @param {conversation.IGetConversationDetailsInput} message GetConversationDetailsInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		GetConversationDetailsInput.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.conversationId !== null &&
				Object.hasOwnProperty.call(message, "conversationId")
			)
				writer
					.uint32(/* id 1, wireType 2 =*/ 10)
					.string(message.conversationId);
			if (
				message.botId !== null &&
				Object.hasOwnProperty.call(message, "botId")
			)
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.botId);
			if (
				message.createdBy !== null &&
				Object.hasOwnProperty.call(message, "createdBy")
			)
				writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.createdBy);
			return writer;
		};

		/**
		 * Encodes the specified GetConversationDetailsInput message, length delimited. Does not implicitly {@link conversation.GetConversationDetailsInput.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof conversation.GetConversationDetailsInput
		 * @static
		 * @param {conversation.IGetConversationDetailsInput} message GetConversationDetailsInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		GetConversationDetailsInput.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a GetConversationDetailsInput message from the specified reader or buffer.
		 * @function decode
		 * @memberof conversation.GetConversationDetailsInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {conversation.GetConversationDetailsInput} GetConversationDetailsInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		GetConversationDetailsInput.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.conversation.GetConversationDetailsInput();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.conversationId = reader.string();
						break;
					case 2:
						message.botId = reader.string();
						break;
					case 3:
						message.createdBy = reader.string();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a GetConversationDetailsInput message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof conversation.GetConversationDetailsInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {conversation.GetConversationDetailsInput} GetConversationDetailsInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		GetConversationDetailsInput.decodeDelimited = function decodeDelimited(
			reader
		) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a GetConversationDetailsInput message.
		 * @function verify
		 * @memberof conversation.GetConversationDetailsInput
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		GetConversationDetailsInput.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (
				message.conversationId !== null &&
				message.hasOwnProperty("conversationId")
			)
				if (!$util.isString(message.conversationId))
					return "conversationId: string expected";
			if (message.botId !== null && message.hasOwnProperty("botId"))
				if (!$util.isString(message.botId)) return "botId: string expected";
			if (message.createdBy !== null && message.hasOwnProperty("createdBy"))
				if (!$util.isString(message.createdBy))
					return "createdBy: string expected";
			return null;
		};

		/**
		 * Creates a GetConversationDetailsInput message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof conversation.GetConversationDetailsInput
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {conversation.GetConversationDetailsInput} GetConversationDetailsInput
		 */
		GetConversationDetailsInput.fromObject = function fromObject(object) {
			if (object instanceof $root.conversation.GetConversationDetailsInput)
				return object;
			var message = new $root.conversation.GetConversationDetailsInput();
			if (object.conversationId !== null)
				message.conversationId = String(object.conversationId);
			if (object.botId !== null) message.botId = String(object.botId);
			if (object.createdBy !== null)
				message.createdBy = String(object.createdBy);
			return message;
		};

		/**
		 * Creates a plain object from a GetConversationDetailsInput message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof conversation.GetConversationDetailsInput
		 * @static
		 * @param {conversation.GetConversationDetailsInput} message GetConversationDetailsInput
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		GetConversationDetailsInput.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.conversationId = "";
				object.botId = "";
				object.createdBy = "";
			}
			if (
				message.conversationId !== null &&
				message.hasOwnProperty("conversationId")
			)
				object.conversationId = message.conversationId;
			if (message.botId !== null && message.hasOwnProperty("botId"))
				object.botId = message.botId;
			if (message.createdBy !== null && message.hasOwnProperty("createdBy"))
				object.createdBy = message.createdBy;
			return object;
		};

		/**
		 * Converts this GetConversationDetailsInput to JSON.
		 * @function toJSON
		 * @memberof conversation.GetConversationDetailsInput
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		GetConversationDetailsInput.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return GetConversationDetailsInput;
	})();

	conversation.GetConversationDetailsResponse = (function () {
		/**
		 * Properties of a GetConversationDetailsResponse.
		 * @memberof conversation
		 * @interface IGetConversationDetailsResponse
		 * @property {Array.<conversation.IGetConversationDetailsChannels>|null} [onChannels] GetConversationDetailsResponse onChannels
		 * @property {conversation.IGetConversationDetailsUser|null} [conversationOwner] GetConversationDetailsResponse conversationOwner
		 * @property {Array.<conversation.IGetConversationDetailsUser>|null} [participants] GetConversationDetailsResponse participants
		 * @property {number|null} [error] GetConversationDetailsResponse error
		 * @property {string|null} [userDomain] GetConversationDetailsResponse userDomain
		 */

		/**
		 * Constructs a new GetConversationDetailsResponse.
		 * @memberof conversation
		 * @classdesc Represents a GetConversationDetailsResponse.
		 * @implements IGetConversationDetailsResponse
		 * @constructor
		 * @param {conversation.IGetConversationDetailsResponse=} [properties] Properties to set
		 */
		function GetConversationDetailsResponse(properties) {
			this.onChannels = [];
			this.participants = [];
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * GetConversationDetailsResponse onChannels.
		 * @member {Array.<conversation.IGetConversationDetailsChannels>} onChannels
		 * @memberof conversation.GetConversationDetailsResponse
		 * @instance
		 */
		GetConversationDetailsResponse.prototype.onChannels = $util.emptyArray;

		/**
		 * GetConversationDetailsResponse conversationOwner.
		 * @member {conversation.IGetConversationDetailsUser|null|undefined} conversationOwner
		 * @memberof conversation.GetConversationDetailsResponse
		 * @instance
		 */
		GetConversationDetailsResponse.prototype.conversationOwner = null;

		/**
		 * GetConversationDetailsResponse participants.
		 * @member {Array.<conversation.IGetConversationDetailsUser>} participants
		 * @memberof conversation.GetConversationDetailsResponse
		 * @instance
		 */
		GetConversationDetailsResponse.prototype.participants = $util.emptyArray;

		/**
		 * GetConversationDetailsResponse error.
		 * @member {number} error
		 * @memberof conversation.GetConversationDetailsResponse
		 * @instance
		 */
		GetConversationDetailsResponse.prototype.error = 0;

		/**
		 * GetConversationDetailsResponse userDomain.
		 * @member {string} userDomain
		 * @memberof conversation.GetConversationDetailsResponse
		 * @instance
		 */
		GetConversationDetailsResponse.prototype.userDomain = "";

		/**
		 * Creates a new GetConversationDetailsResponse instance using the specified properties.
		 * @function create
		 * @memberof conversation.GetConversationDetailsResponse
		 * @static
		 * @param {conversation.IGetConversationDetailsResponse=} [properties] Properties to set
		 * @returns {conversation.GetConversationDetailsResponse} GetConversationDetailsResponse instance
		 */
		GetConversationDetailsResponse.create = function create(properties) {
			return new GetConversationDetailsResponse(properties);
		};

		/**
		 * Encodes the specified GetConversationDetailsResponse message. Does not implicitly {@link conversation.GetConversationDetailsResponse.verify|verify} messages.
		 * @function encode
		 * @memberof conversation.GetConversationDetailsResponse
		 * @static
		 * @param {conversation.IGetConversationDetailsResponse} message GetConversationDetailsResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		GetConversationDetailsResponse.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.onChannels !== null && message.onChannels.length)
				for (var i = 0; i < message.onChannels.length; ++i)
					$root.conversation.GetConversationDetailsChannels.encode(
						message.onChannels[i],
						writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
					).ldelim();
			if (
				message.conversationOwner !== null &&
				Object.hasOwnProperty.call(message, "conversationOwner")
			)
				$root.conversation.GetConversationDetailsUser.encode(
					message.conversationOwner,
					writer.uint32(/* id 2, wireType 2 =*/ 18).fork()
				).ldelim();
			if (message.participants !== null && message.participants.length)
				for (var i = 0; i < message.participants.length; ++i)
					$root.conversation.GetConversationDetailsUser.encode(
						message.participants[i],
						writer.uint32(/* id 3, wireType 2 =*/ 26).fork()
					).ldelim();
			if (
				message.error !== null &&
				Object.hasOwnProperty.call(message, "error")
			)
				writer.uint32(/* id 4, wireType 0 =*/ 32).int32(message.error);
			if (
				message.userDomain !== null &&
				Object.hasOwnProperty.call(message, "userDomain")
			)
				writer.uint32(/* id 5, wireType 2 =*/ 42).string(message.userDomain);
			return writer;
		};

		/**
		 * Encodes the specified GetConversationDetailsResponse message, length delimited. Does not implicitly {@link conversation.GetConversationDetailsResponse.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof conversation.GetConversationDetailsResponse
		 * @static
		 * @param {conversation.IGetConversationDetailsResponse} message GetConversationDetailsResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		GetConversationDetailsResponse.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a GetConversationDetailsResponse message from the specified reader or buffer.
		 * @function decode
		 * @memberof conversation.GetConversationDetailsResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {conversation.GetConversationDetailsResponse} GetConversationDetailsResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		GetConversationDetailsResponse.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.conversation.GetConversationDetailsResponse();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						if (!(message.onChannels && message.onChannels.length))
							message.onChannels = [];
						message.onChannels.push(
							$root.conversation.GetConversationDetailsChannels.decode(
								reader,
								reader.uint32()
							)
						);
						break;
					case 2:
						message.conversationOwner =
							$root.conversation.GetConversationDetailsUser.decode(
								reader,
								reader.uint32()
							);
						break;
					case 3:
						if (!(message.participants && message.participants.length))
							message.participants = [];
						message.participants.push(
							$root.conversation.GetConversationDetailsUser.decode(
								reader,
								reader.uint32()
							)
						);
						break;
					case 4:
						message.error = reader.int32();
						break;
					case 5:
						message.userDomain = reader.string();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a GetConversationDetailsResponse message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof conversation.GetConversationDetailsResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {conversation.GetConversationDetailsResponse} GetConversationDetailsResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		GetConversationDetailsResponse.decodeDelimited = function decodeDelimited(
			reader
		) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a GetConversationDetailsResponse message.
		 * @function verify
		 * @memberof conversation.GetConversationDetailsResponse
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		GetConversationDetailsResponse.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.onChannels !== null && message.hasOwnProperty("onChannels")) {
				if (!Array.isArray(message.onChannels))
					return "onChannels: array expected";
				for (var i = 0; i < message.onChannels.length; ++i) {
					var error = $root.conversation.GetConversationDetailsChannels.verify(
						message.onChannels[i]
					);
					if (error) return "onChannels." + error;
				}
			}
			if (
				message.conversationOwner !== null &&
				message.hasOwnProperty("conversationOwner")
			) {
				var error = $root.conversation.GetConversationDetailsUser.verify(
					message.conversationOwner
				);
				if (error) return "conversationOwner." + error;
			}
			if (
				message.participants !== null &&
				message.hasOwnProperty("participants")
			) {
				if (!Array.isArray(message.participants))
					return "participants: array expected";
				for (var i = 0; i < message.participants.length; ++i) {
					var error = $root.conversation.GetConversationDetailsUser.verify(
						message.participants[i]
					);
					if (error) return "participants." + error;
				}
			}
			if (message.error !== null && message.hasOwnProperty("error"))
				if (!$util.isInteger(message.error)) return "error: integer expected";
			if (message.userDomain !== null && message.hasOwnProperty("userDomain"))
				if (!$util.isString(message.userDomain))
					return "userDomain: string expected";
			return null;
		};

		/**
		 * Creates a GetConversationDetailsResponse message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof conversation.GetConversationDetailsResponse
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {conversation.GetConversationDetailsResponse} GetConversationDetailsResponse
		 */
		GetConversationDetailsResponse.fromObject = function fromObject(object) {
			if (object instanceof $root.conversation.GetConversationDetailsResponse)
				return object;
			var message = new $root.conversation.GetConversationDetailsResponse();
			if (object.onChannels) {
				if (!Array.isArray(object.onChannels))
					throw TypeError(
						".conversation.GetConversationDetailsResponse.onChannels: array expected"
					);
				message.onChannels = [];
				for (var i = 0; i < object.onChannels.length; ++i) {
					if (typeof object.onChannels[i] !== "object")
						throw TypeError(
							".conversation.GetConversationDetailsResponse.onChannels: object expected"
						);
					message.onChannels[i] =
						$root.conversation.GetConversationDetailsChannels.fromObject(
							object.onChannels[i]
						);
				}
			}
			if (object.conversationOwner !== null) {
				if (typeof object.conversationOwner !== "object")
					throw TypeError(
						".conversation.GetConversationDetailsResponse.conversationOwner: object expected"
					);
				message.conversationOwner =
					$root.conversation.GetConversationDetailsUser.fromObject(
						object.conversationOwner
					);
			}
			if (object.participants) {
				if (!Array.isArray(object.participants))
					throw TypeError(
						".conversation.GetConversationDetailsResponse.participants: array expected"
					);
				message.participants = [];
				for (var i = 0; i < object.participants.length; ++i) {
					if (typeof object.participants[i] !== "object")
						throw TypeError(
							".conversation.GetConversationDetailsResponse.participants: object expected"
						);
					message.participants[i] =
						$root.conversation.GetConversationDetailsUser.fromObject(
							object.participants[i]
						);
				}
			}
			if (object.error !== null) message.error = object.error | 0;
			if (object.userDomain !== null)
				message.userDomain = String(object.userDomain);
			return message;
		};

		/**
		 * Creates a plain object from a GetConversationDetailsResponse message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof conversation.GetConversationDetailsResponse
		 * @static
		 * @param {conversation.GetConversationDetailsResponse} message GetConversationDetailsResponse
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		GetConversationDetailsResponse.toObject = function toObject(
			message,
			options
		) {
			if (!options) options = {};
			var object = {};
			if (options.arrays || options.defaults) {
				object.onChannels = [];
				object.participants = [];
			}
			if (options.defaults) {
				object.conversationOwner = null;
				object.error = 0;
				object.userDomain = "";
			}
			if (message.onChannels && message.onChannels.length) {
				object.onChannels = [];
				for (var j = 0; j < message.onChannels.length; ++j)
					object.onChannels[j] =
						$root.conversation.GetConversationDetailsChannels.toObject(
							message.onChannels[j],
							options
						);
			}
			if (
				message.conversationOwner !== null &&
				message.hasOwnProperty("conversationOwner")
			)
				object.conversationOwner =
					$root.conversation.GetConversationDetailsUser.toObject(
						message.conversationOwner,
						options
					);
			if (message.participants && message.participants.length) {
				object.participants = [];
				for (var j = 0; j < message.participants.length; ++j)
					object.participants[j] =
						$root.conversation.GetConversationDetailsUser.toObject(
							message.participants[j],
							options
						);
			}
			if (message.error !== null && message.hasOwnProperty("error"))
				object.error = message.error;
			if (message.userDomain !== null && message.hasOwnProperty("userDomain"))
				object.userDomain = message.userDomain;
			return object;
		};

		/**
		 * Converts this GetConversationDetailsResponse to JSON.
		 * @function toJSON
		 * @memberof conversation.GetConversationDetailsResponse
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		GetConversationDetailsResponse.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return GetConversationDetailsResponse;
	})();

	conversation.GetConversationDetailsUser = (function () {
		/**
		 * Properties of a GetConversationDetailsUser.
		 * @memberof conversation
		 * @interface IGetConversationDetailsUser
		 * @property {string|null} [userId] GetConversationDetailsUser userId
		 * @property {string|null} [userName] GetConversationDetailsUser userName
		 */

		/**
		 * Constructs a new GetConversationDetailsUser.
		 * @memberof conversation
		 * @classdesc Represents a GetConversationDetailsUser.
		 * @implements IGetConversationDetailsUser
		 * @constructor
		 * @param {conversation.IGetConversationDetailsUser=} [properties] Properties to set
		 */
		function GetConversationDetailsUser(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * GetConversationDetailsUser userId.
		 * @member {string} userId
		 * @memberof conversation.GetConversationDetailsUser
		 * @instance
		 */
		GetConversationDetailsUser.prototype.userId = "";

		/**
		 * GetConversationDetailsUser userName.
		 * @member {string} userName
		 * @memberof conversation.GetConversationDetailsUser
		 * @instance
		 */
		GetConversationDetailsUser.prototype.userName = "";

		/**
		 * Creates a new GetConversationDetailsUser instance using the specified properties.
		 * @function create
		 * @memberof conversation.GetConversationDetailsUser
		 * @static
		 * @param {conversation.IGetConversationDetailsUser=} [properties] Properties to set
		 * @returns {conversation.GetConversationDetailsUser} GetConversationDetailsUser instance
		 */
		GetConversationDetailsUser.create = function create(properties) {
			return new GetConversationDetailsUser(properties);
		};

		/**
		 * Encodes the specified GetConversationDetailsUser message. Does not implicitly {@link conversation.GetConversationDetailsUser.verify|verify} messages.
		 * @function encode
		 * @memberof conversation.GetConversationDetailsUser
		 * @static
		 * @param {conversation.IGetConversationDetailsUser} message GetConversationDetailsUser message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		GetConversationDetailsUser.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.userId !== null &&
				Object.hasOwnProperty.call(message, "userId")
			)
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.userId);
			if (
				message.userName !== null &&
				Object.hasOwnProperty.call(message, "userName")
			)
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.userName);
			return writer;
		};

		/**
		 * Encodes the specified GetConversationDetailsUser message, length delimited. Does not implicitly {@link conversation.GetConversationDetailsUser.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof conversation.GetConversationDetailsUser
		 * @static
		 * @param {conversation.IGetConversationDetailsUser} message GetConversationDetailsUser message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		GetConversationDetailsUser.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a GetConversationDetailsUser message from the specified reader or buffer.
		 * @function decode
		 * @memberof conversation.GetConversationDetailsUser
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {conversation.GetConversationDetailsUser} GetConversationDetailsUser
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		GetConversationDetailsUser.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.conversation.GetConversationDetailsUser();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.userId = reader.string();
						break;
					case 2:
						message.userName = reader.string();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a GetConversationDetailsUser message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof conversation.GetConversationDetailsUser
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {conversation.GetConversationDetailsUser} GetConversationDetailsUser
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		GetConversationDetailsUser.decodeDelimited = function decodeDelimited(
			reader
		) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a GetConversationDetailsUser message.
		 * @function verify
		 * @memberof conversation.GetConversationDetailsUser
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		GetConversationDetailsUser.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.userId !== null && message.hasOwnProperty("userId"))
				if (!$util.isString(message.userId)) return "userId: string expected";
			if (message.userName !== null && message.hasOwnProperty("userName"))
				if (!$util.isString(message.userName))
					return "userName: string expected";
			return null;
		};

		/**
		 * Creates a GetConversationDetailsUser message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof conversation.GetConversationDetailsUser
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {conversation.GetConversationDetailsUser} GetConversationDetailsUser
		 */
		GetConversationDetailsUser.fromObject = function fromObject(object) {
			if (object instanceof $root.conversation.GetConversationDetailsUser)
				return object;
			var message = new $root.conversation.GetConversationDetailsUser();
			if (object.userId !== null) message.userId = String(object.userId);
			if (object.userName !== null) message.userName = String(object.userName);
			return message;
		};

		/**
		 * Creates a plain object from a GetConversationDetailsUser message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof conversation.GetConversationDetailsUser
		 * @static
		 * @param {conversation.GetConversationDetailsUser} message GetConversationDetailsUser
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		GetConversationDetailsUser.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.userId = "";
				object.userName = "";
			}
			if (message.userId !== null && message.hasOwnProperty("userId"))
				object.userId = message.userId;
			if (message.userName !== null && message.hasOwnProperty("userName"))
				object.userName = message.userName;
			return object;
		};

		/**
		 * Converts this GetConversationDetailsUser to JSON.
		 * @function toJSON
		 * @memberof conversation.GetConversationDetailsUser
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		GetConversationDetailsUser.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return GetConversationDetailsUser;
	})();

	conversation.GetConversationDetailsChannels = (function () {
		/**
		 * Properties of a GetConversationDetailsChannels.
		 * @memberof conversation
		 * @interface IGetConversationDetailsChannels
		 * @property {string|null} [channelName] GetConversationDetailsChannels channelName
		 * @property {string|null} [userDomain] GetConversationDetailsChannels userDomain
		 * @property {string|null} [channelId] GetConversationDetailsChannels channelId
		 * @property {string|null} [description] GetConversationDetailsChannels description
		 * @property {string|null} [logo] GetConversationDetailsChannels logo
		 */

		/**
		 * Constructs a new GetConversationDetailsChannels.
		 * @memberof conversation
		 * @classdesc Represents a GetConversationDetailsChannels.
		 * @implements IGetConversationDetailsChannels
		 * @constructor
		 * @param {conversation.IGetConversationDetailsChannels=} [properties] Properties to set
		 */
		function GetConversationDetailsChannels(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * GetConversationDetailsChannels channelName.
		 * @member {string} channelName
		 * @memberof conversation.GetConversationDetailsChannels
		 * @instance
		 */
		GetConversationDetailsChannels.prototype.channelName = "";

		/**
		 * GetConversationDetailsChannels userDomain.
		 * @member {string} userDomain
		 * @memberof conversation.GetConversationDetailsChannels
		 * @instance
		 */
		GetConversationDetailsChannels.prototype.userDomain = "";

		/**
		 * GetConversationDetailsChannels channelId.
		 * @member {string} channelId
		 * @memberof conversation.GetConversationDetailsChannels
		 * @instance
		 */
		GetConversationDetailsChannels.prototype.channelId = "";

		/**
		 * GetConversationDetailsChannels description.
		 * @member {string} description
		 * @memberof conversation.GetConversationDetailsChannels
		 * @instance
		 */
		GetConversationDetailsChannels.prototype.description = "";

		/**
		 * GetConversationDetailsChannels logo.
		 * @member {string} logo
		 * @memberof conversation.GetConversationDetailsChannels
		 * @instance
		 */
		GetConversationDetailsChannels.prototype.logo = "";

		/**
		 * Creates a new GetConversationDetailsChannels instance using the specified properties.
		 * @function create
		 * @memberof conversation.GetConversationDetailsChannels
		 * @static
		 * @param {conversation.IGetConversationDetailsChannels=} [properties] Properties to set
		 * @returns {conversation.GetConversationDetailsChannels} GetConversationDetailsChannels instance
		 */
		GetConversationDetailsChannels.create = function create(properties) {
			return new GetConversationDetailsChannels(properties);
		};

		/**
		 * Encodes the specified GetConversationDetailsChannels message. Does not implicitly {@link conversation.GetConversationDetailsChannels.verify|verify} messages.
		 * @function encode
		 * @memberof conversation.GetConversationDetailsChannels
		 * @static
		 * @param {conversation.IGetConversationDetailsChannels} message GetConversationDetailsChannels message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		GetConversationDetailsChannels.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.channelName !== null &&
				Object.hasOwnProperty.call(message, "channelName")
			)
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.channelName);
			if (
				message.userDomain !== null &&
				Object.hasOwnProperty.call(message, "userDomain")
			)
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.userDomain);
			if (
				message.channelId !== null &&
				Object.hasOwnProperty.call(message, "channelId")
			)
				writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.channelId);
			if (
				message.description !== null &&
				Object.hasOwnProperty.call(message, "description")
			)
				writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.description);
			if (message.logo !== null && Object.hasOwnProperty.call(message, "logo"))
				writer.uint32(/* id 5, wireType 2 =*/ 42).string(message.logo);
			return writer;
		};

		/**
		 * Encodes the specified GetConversationDetailsChannels message, length delimited. Does not implicitly {@link conversation.GetConversationDetailsChannels.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof conversation.GetConversationDetailsChannels
		 * @static
		 * @param {conversation.IGetConversationDetailsChannels} message GetConversationDetailsChannels message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		GetConversationDetailsChannels.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a GetConversationDetailsChannels message from the specified reader or buffer.
		 * @function decode
		 * @memberof conversation.GetConversationDetailsChannels
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {conversation.GetConversationDetailsChannels} GetConversationDetailsChannels
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		GetConversationDetailsChannels.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.conversation.GetConversationDetailsChannels();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.channelName = reader.string();
						break;
					case 2:
						message.userDomain = reader.string();
						break;
					case 3:
						message.channelId = reader.string();
						break;
					case 4:
						message.description = reader.string();
						break;
					case 5:
						message.logo = reader.string();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a GetConversationDetailsChannels message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof conversation.GetConversationDetailsChannels
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {conversation.GetConversationDetailsChannels} GetConversationDetailsChannels
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		GetConversationDetailsChannels.decodeDelimited = function decodeDelimited(
			reader
		) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a GetConversationDetailsChannels message.
		 * @function verify
		 * @memberof conversation.GetConversationDetailsChannels
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		GetConversationDetailsChannels.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.channelName !== null && message.hasOwnProperty("channelName"))
				if (!$util.isString(message.channelName))
					return "channelName: string expected";
			if (message.userDomain !== null && message.hasOwnProperty("userDomain"))
				if (!$util.isString(message.userDomain))
					return "userDomain: string expected";
			if (message.channelId !== null && message.hasOwnProperty("channelId"))
				if (!$util.isString(message.channelId))
					return "channelId: string expected";
			if (message.description !== null && message.hasOwnProperty("description"))
				if (!$util.isString(message.description))
					return "description: string expected";
			if (message.logo !== null && message.hasOwnProperty("logo"))
				if (!$util.isString(message.logo)) return "logo: string expected";
			return null;
		};

		/**
		 * Creates a GetConversationDetailsChannels message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof conversation.GetConversationDetailsChannels
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {conversation.GetConversationDetailsChannels} GetConversationDetailsChannels
		 */
		GetConversationDetailsChannels.fromObject = function fromObject(object) {
			if (object instanceof $root.conversation.GetConversationDetailsChannels)
				return object;
			var message = new $root.conversation.GetConversationDetailsChannels();
			if (object.channelName !== null)
				message.channelName = String(object.channelName);
			if (object.userDomain !== null)
				message.userDomain = String(object.userDomain);
			if (object.channelId !== null)
				message.channelId = String(object.channelId);
			if (object.description !== null)
				message.description = String(object.description);
			if (object.logo !== null) message.logo = String(object.logo);
			return message;
		};

		/**
		 * Creates a plain object from a GetConversationDetailsChannels message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof conversation.GetConversationDetailsChannels
		 * @static
		 * @param {conversation.GetConversationDetailsChannels} message GetConversationDetailsChannels
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		GetConversationDetailsChannels.toObject = function toObject(
			message,
			options
		) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.channelName = "";
				object.userDomain = "";
				object.channelId = "";
				object.description = "";
				object.logo = "";
			}
			if (message.channelName !== null && message.hasOwnProperty("channelName"))
				object.channelName = message.channelName;
			if (message.userDomain !== null && message.hasOwnProperty("userDomain"))
				object.userDomain = message.userDomain;
			if (message.channelId !== null && message.hasOwnProperty("channelId"))
				object.channelId = message.channelId;
			if (message.description !== null && message.hasOwnProperty("description"))
				object.description = message.description;
			if (message.logo !== null && message.hasOwnProperty("logo"))
				object.logo = message.logo;
			return object;
		};

		/**
		 * Converts this GetConversationDetailsChannels to JSON.
		 * @function toJSON
		 * @memberof conversation.GetConversationDetailsChannels
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		GetConversationDetailsChannels.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return GetConversationDetailsChannels;
	})();

	conversation.GetArchivedMessagesInput = (function () {
		/**
		 * Properties of a GetArchivedMessagesInput.
		 * @memberof conversation
		 * @interface IGetArchivedMessagesInput
		 * @property {string|null} [conversationId] GetArchivedMessagesInput conversationId
		 * @property {string|null} [botId] GetArchivedMessagesInput botId
		 */

		/**
		 * Constructs a new GetArchivedMessagesInput.
		 * @memberof conversation
		 * @classdesc Represents a GetArchivedMessagesInput.
		 * @implements IGetArchivedMessagesInput
		 * @constructor
		 * @param {conversation.IGetArchivedMessagesInput=} [properties] Properties to set
		 */
		function GetArchivedMessagesInput(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * GetArchivedMessagesInput conversationId.
		 * @member {string} conversationId
		 * @memberof conversation.GetArchivedMessagesInput
		 * @instance
		 */
		GetArchivedMessagesInput.prototype.conversationId = "";

		/**
		 * GetArchivedMessagesInput botId.
		 * @member {string} botId
		 * @memberof conversation.GetArchivedMessagesInput
		 * @instance
		 */
		GetArchivedMessagesInput.prototype.botId = "";

		/**
		 * Creates a new GetArchivedMessagesInput instance using the specified properties.
		 * @function create
		 * @memberof conversation.GetArchivedMessagesInput
		 * @static
		 * @param {conversation.IGetArchivedMessagesInput=} [properties] Properties to set
		 * @returns {conversation.GetArchivedMessagesInput} GetArchivedMessagesInput instance
		 */
		GetArchivedMessagesInput.create = function create(properties) {
			return new GetArchivedMessagesInput(properties);
		};

		/**
		 * Encodes the specified GetArchivedMessagesInput message. Does not implicitly {@link conversation.GetArchivedMessagesInput.verify|verify} messages.
		 * @function encode
		 * @memberof conversation.GetArchivedMessagesInput
		 * @static
		 * @param {conversation.IGetArchivedMessagesInput} message GetArchivedMessagesInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		GetArchivedMessagesInput.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.conversationId !== null &&
				Object.hasOwnProperty.call(message, "conversationId")
			)
				writer
					.uint32(/* id 1, wireType 2 =*/ 10)
					.string(message.conversationId);
			if (
				message.botId !== null &&
				Object.hasOwnProperty.call(message, "botId")
			)
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.botId);
			return writer;
		};

		/**
		 * Encodes the specified GetArchivedMessagesInput message, length delimited. Does not implicitly {@link conversation.GetArchivedMessagesInput.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof conversation.GetArchivedMessagesInput
		 * @static
		 * @param {conversation.IGetArchivedMessagesInput} message GetArchivedMessagesInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		GetArchivedMessagesInput.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a GetArchivedMessagesInput message from the specified reader or buffer.
		 * @function decode
		 * @memberof conversation.GetArchivedMessagesInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {conversation.GetArchivedMessagesInput} GetArchivedMessagesInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		GetArchivedMessagesInput.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.conversation.GetArchivedMessagesInput();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.conversationId = reader.string();
						break;
					case 2:
						message.botId = reader.string();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a GetArchivedMessagesInput message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof conversation.GetArchivedMessagesInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {conversation.GetArchivedMessagesInput} GetArchivedMessagesInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		GetArchivedMessagesInput.decodeDelimited = function decodeDelimited(
			reader
		) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a GetArchivedMessagesInput message.
		 * @function verify
		 * @memberof conversation.GetArchivedMessagesInput
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		GetArchivedMessagesInput.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (
				message.conversationId !== null &&
				message.hasOwnProperty("conversationId")
			)
				if (!$util.isString(message.conversationId))
					return "conversationId: string expected";
			if (message.botId !== null && message.hasOwnProperty("botId"))
				if (!$util.isString(message.botId)) return "botId: string expected";
			return null;
		};

		/**
		 * Creates a GetArchivedMessagesInput message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof conversation.GetArchivedMessagesInput
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {conversation.GetArchivedMessagesInput} GetArchivedMessagesInput
		 */
		GetArchivedMessagesInput.fromObject = function fromObject(object) {
			if (object instanceof $root.conversation.GetArchivedMessagesInput)
				return object;
			var message = new $root.conversation.GetArchivedMessagesInput();
			if (object.conversationId !== null)
				message.conversationId = String(object.conversationId);
			if (object.botId !== null) message.botId = String(object.botId);
			return message;
		};

		/**
		 * Creates a plain object from a GetArchivedMessagesInput message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof conversation.GetArchivedMessagesInput
		 * @static
		 * @param {conversation.GetArchivedMessagesInput} message GetArchivedMessagesInput
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		GetArchivedMessagesInput.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.conversationId = "";
				object.botId = "";
			}
			if (
				message.conversationId !== null &&
				message.hasOwnProperty("conversationId")
			)
				object.conversationId = message.conversationId;
			if (message.botId !== null && message.hasOwnProperty("botId"))
				object.botId = message.botId;
			return object;
		};

		/**
		 * Converts this GetArchivedMessagesInput to JSON.
		 * @function toJSON
		 * @memberof conversation.GetArchivedMessagesInput
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		GetArchivedMessagesInput.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return GetArchivedMessagesInput;
	})();

	conversation.GetArchivedMessagesResponse = (function () {
		/**
		 * Properties of a GetArchivedMessagesResponse.
		 * @memberof conversation
		 * @interface IGetArchivedMessagesResponse
		 * @property {number|null} [error] GetArchivedMessagesResponse error
		 * @property {Array.<conversation.IGetArchivedMessagesContent>|null} [content] GetArchivedMessagesResponse content
		 */

		/**
		 * Constructs a new GetArchivedMessagesResponse.
		 * @memberof conversation
		 * @classdesc Represents a GetArchivedMessagesResponse.
		 * @implements IGetArchivedMessagesResponse
		 * @constructor
		 * @param {conversation.IGetArchivedMessagesResponse=} [properties] Properties to set
		 */
		function GetArchivedMessagesResponse(properties) {
			this.content = [];
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * GetArchivedMessagesResponse error.
		 * @member {number} error
		 * @memberof conversation.GetArchivedMessagesResponse
		 * @instance
		 */
		GetArchivedMessagesResponse.prototype.error = 0;

		/**
		 * GetArchivedMessagesResponse content.
		 * @member {Array.<conversation.IGetArchivedMessagesContent>} content
		 * @memberof conversation.GetArchivedMessagesResponse
		 * @instance
		 */
		GetArchivedMessagesResponse.prototype.content = $util.emptyArray;

		/**
		 * Creates a new GetArchivedMessagesResponse instance using the specified properties.
		 * @function create
		 * @memberof conversation.GetArchivedMessagesResponse
		 * @static
		 * @param {conversation.IGetArchivedMessagesResponse=} [properties] Properties to set
		 * @returns {conversation.GetArchivedMessagesResponse} GetArchivedMessagesResponse instance
		 */
		GetArchivedMessagesResponse.create = function create(properties) {
			return new GetArchivedMessagesResponse(properties);
		};

		/**
		 * Encodes the specified GetArchivedMessagesResponse message. Does not implicitly {@link conversation.GetArchivedMessagesResponse.verify|verify} messages.
		 * @function encode
		 * @memberof conversation.GetArchivedMessagesResponse
		 * @static
		 * @param {conversation.IGetArchivedMessagesResponse} message GetArchivedMessagesResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		GetArchivedMessagesResponse.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.error !== null &&
				Object.hasOwnProperty.call(message, "error")
			)
				writer.uint32(/* id 1, wireType 0 =*/ 8).int32(message.error);
			if (message.content !== null && message.content.length)
				for (var i = 0; i < message.content.length; ++i)
					$root.conversation.GetArchivedMessagesContent.encode(
						message.content[i],
						writer.uint32(/* id 2, wireType 2 =*/ 18).fork()
					).ldelim();
			return writer;
		};

		/**
		 * Encodes the specified GetArchivedMessagesResponse message, length delimited. Does not implicitly {@link conversation.GetArchivedMessagesResponse.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof conversation.GetArchivedMessagesResponse
		 * @static
		 * @param {conversation.IGetArchivedMessagesResponse} message GetArchivedMessagesResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		GetArchivedMessagesResponse.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a GetArchivedMessagesResponse message from the specified reader or buffer.
		 * @function decode
		 * @memberof conversation.GetArchivedMessagesResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {conversation.GetArchivedMessagesResponse} GetArchivedMessagesResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		GetArchivedMessagesResponse.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.conversation.GetArchivedMessagesResponse();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.error = reader.int32();
						break;
					case 2:
						if (!(message.content && message.content.length))
							message.content = [];
						message.content.push(
							$root.conversation.GetArchivedMessagesContent.decode(
								reader,
								reader.uint32()
							)
						);
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a GetArchivedMessagesResponse message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof conversation.GetArchivedMessagesResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {conversation.GetArchivedMessagesResponse} GetArchivedMessagesResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		GetArchivedMessagesResponse.decodeDelimited = function decodeDelimited(
			reader
		) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a GetArchivedMessagesResponse message.
		 * @function verify
		 * @memberof conversation.GetArchivedMessagesResponse
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		GetArchivedMessagesResponse.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.error !== null && message.hasOwnProperty("error"))
				if (!$util.isInteger(message.error)) return "error: integer expected";
			if (message.content !== null && message.hasOwnProperty("content")) {
				if (!Array.isArray(message.content)) return "content: array expected";
				for (var i = 0; i < message.content.length; ++i) {
					var error = $root.conversation.GetArchivedMessagesContent.verify(
						message.content[i]
					);
					if (error) return "content." + error;
				}
			}
			return null;
		};

		/**
		 * Creates a GetArchivedMessagesResponse message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof conversation.GetArchivedMessagesResponse
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {conversation.GetArchivedMessagesResponse} GetArchivedMessagesResponse
		 */
		GetArchivedMessagesResponse.fromObject = function fromObject(object) {
			if (object instanceof $root.conversation.GetArchivedMessagesResponse)
				return object;
			var message = new $root.conversation.GetArchivedMessagesResponse();
			if (object.error !== null) message.error = object.error | 0;
			if (object.content) {
				if (!Array.isArray(object.content))
					throw TypeError(
						".conversation.GetArchivedMessagesResponse.content: array expected"
					);
				message.content = [];
				for (var i = 0; i < object.content.length; ++i) {
					if (typeof object.content[i] !== "object")
						throw TypeError(
							".conversation.GetArchivedMessagesResponse.content: object expected"
						);
					message.content[i] =
						$root.conversation.GetArchivedMessagesContent.fromObject(
							object.content[i]
						);
				}
			}
			return message;
		};

		/**
		 * Creates a plain object from a GetArchivedMessagesResponse message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof conversation.GetArchivedMessagesResponse
		 * @static
		 * @param {conversation.GetArchivedMessagesResponse} message GetArchivedMessagesResponse
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		GetArchivedMessagesResponse.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.arrays || options.defaults) object.content = [];
			if (options.defaults) object.error = 0;
			if (message.error !== null && message.hasOwnProperty("error"))
				object.error = message.error;
			if (message.content && message.content.length) {
				object.content = [];
				for (var j = 0; j < message.content.length; ++j)
					object.content[j] =
						$root.conversation.GetArchivedMessagesContent.toObject(
							message.content[j],
							options
						);
			}
			return object;
		};

		/**
		 * Converts this GetArchivedMessagesResponse to JSON.
		 * @function toJSON
		 * @memberof conversation.GetArchivedMessagesResponse
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		GetArchivedMessagesResponse.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return GetArchivedMessagesResponse;
	})();

	conversation.GetArchivedMessagesContent = (function () {
		/**
		 * Properties of a GetArchivedMessagesContent.
		 * @memberof conversation
		 * @interface IGetArchivedMessagesContent
		 * @property {string|null} [messageId] GetArchivedMessagesContent messageId
		 * @property {string|null} [contentType] GetArchivedMessagesContent contentType
		 * @property {number|null} [createdOn] GetArchivedMessagesContent createdOn
		 * @property {string|null} [createdBy] GetArchivedMessagesContent createdBy
		 * @property {Uint8Array|null} [content] GetArchivedMessagesContent content
		 * @property {Uint8Array|null} [options] GetArchivedMessagesContent options
		 * @property {boolean|null} [isOpened] GetArchivedMessagesContent isOpened
		 * @property {boolean|null} [isDelivered] GetArchivedMessagesContent isDelivered
		 * @property {boolean|null} [isDeleted] GetArchivedMessagesContent isDeleted
		 */

		/**
		 * Constructs a new GetArchivedMessagesContent.
		 * @memberof conversation
		 * @classdesc Represents a GetArchivedMessagesContent.
		 * @implements IGetArchivedMessagesContent
		 * @constructor
		 * @param {conversation.IGetArchivedMessagesContent=} [properties] Properties to set
		 */
		function GetArchivedMessagesContent(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * GetArchivedMessagesContent messageId.
		 * @member {string} messageId
		 * @memberof conversation.GetArchivedMessagesContent
		 * @instance
		 */
		GetArchivedMessagesContent.prototype.messageId = "";

		/**
		 * GetArchivedMessagesContent contentType.
		 * @member {string} contentType
		 * @memberof conversation.GetArchivedMessagesContent
		 * @instance
		 */
		GetArchivedMessagesContent.prototype.contentType = "";

		/**
		 * GetArchivedMessagesContent createdOn.
		 * @member {number} createdOn
		 * @memberof conversation.GetArchivedMessagesContent
		 * @instance
		 */
		GetArchivedMessagesContent.prototype.createdOn = 0;

		/**
		 * GetArchivedMessagesContent createdBy.
		 * @member {string} createdBy
		 * @memberof conversation.GetArchivedMessagesContent
		 * @instance
		 */
		GetArchivedMessagesContent.prototype.createdBy = "";

		/**
		 * GetArchivedMessagesContent content.
		 * @member {Uint8Array} content
		 * @memberof conversation.GetArchivedMessagesContent
		 * @instance
		 */
		GetArchivedMessagesContent.prototype.content = $util.newBuffer([]);

		/**
		 * GetArchivedMessagesContent options.
		 * @member {Uint8Array} options
		 * @memberof conversation.GetArchivedMessagesContent
		 * @instance
		 */
		GetArchivedMessagesContent.prototype.options = $util.newBuffer([]);

		/**
		 * GetArchivedMessagesContent isOpened.
		 * @member {boolean} isOpened
		 * @memberof conversation.GetArchivedMessagesContent
		 * @instance
		 */
		GetArchivedMessagesContent.prototype.isOpened = false;

		/**
		 * GetArchivedMessagesContent isDelivered.
		 * @member {boolean} isDelivered
		 * @memberof conversation.GetArchivedMessagesContent
		 * @instance
		 */
		GetArchivedMessagesContent.prototype.isDelivered = false;

		/**
		 * GetArchivedMessagesContent isDeleted.
		 * @member {boolean} isDeleted
		 * @memberof conversation.GetArchivedMessagesContent
		 * @instance
		 */
		GetArchivedMessagesContent.prototype.isDeleted = false;

		/**
		 * Creates a new GetArchivedMessagesContent instance using the specified properties.
		 * @function create
		 * @memberof conversation.GetArchivedMessagesContent
		 * @static
		 * @param {conversation.IGetArchivedMessagesContent=} [properties] Properties to set
		 * @returns {conversation.GetArchivedMessagesContent} GetArchivedMessagesContent instance
		 */
		GetArchivedMessagesContent.create = function create(properties) {
			return new GetArchivedMessagesContent(properties);
		};

		/**
		 * Encodes the specified GetArchivedMessagesContent message. Does not implicitly {@link conversation.GetArchivedMessagesContent.verify|verify} messages.
		 * @function encode
		 * @memberof conversation.GetArchivedMessagesContent
		 * @static
		 * @param {conversation.IGetArchivedMessagesContent} message GetArchivedMessagesContent message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		GetArchivedMessagesContent.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.messageId !== null &&
				Object.hasOwnProperty.call(message, "messageId")
			)
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.messageId);
			if (
				message.contentType !== null &&
				Object.hasOwnProperty.call(message, "contentType")
			)
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.contentType);
			if (
				message.createdOn !== null &&
				Object.hasOwnProperty.call(message, "createdOn")
			)
				writer.uint32(/* id 3, wireType 1 =*/ 25).double(message.createdOn);
			if (
				message.createdBy !== null &&
				Object.hasOwnProperty.call(message, "createdBy")
			)
				writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.createdBy);
			if (
				message.content !== null &&
				Object.hasOwnProperty.call(message, "content")
			)
				writer.uint32(/* id 5, wireType 2 =*/ 42).bytes(message.content);
			if (
				message.options !== null &&
				Object.hasOwnProperty.call(message, "options")
			)
				writer.uint32(/* id 6, wireType 2 =*/ 50).bytes(message.options);
			if (
				message.isOpened !== null &&
				Object.hasOwnProperty.call(message, "isOpened")
			)
				writer.uint32(/* id 7, wireType 0 =*/ 56).bool(message.isOpened);
			if (
				message.isDelivered !== null &&
				Object.hasOwnProperty.call(message, "isDelivered")
			)
				writer.uint32(/* id 8, wireType 0 =*/ 64).bool(message.isDelivered);
			if (
				message.isDeleted !== null &&
				Object.hasOwnProperty.call(message, "isDeleted")
			)
				writer.uint32(/* id 9, wireType 0 =*/ 72).bool(message.isDeleted);
			return writer;
		};

		/**
		 * Encodes the specified GetArchivedMessagesContent message, length delimited. Does not implicitly {@link conversation.GetArchivedMessagesContent.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof conversation.GetArchivedMessagesContent
		 * @static
		 * @param {conversation.IGetArchivedMessagesContent} message GetArchivedMessagesContent message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		GetArchivedMessagesContent.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a GetArchivedMessagesContent message from the specified reader or buffer.
		 * @function decode
		 * @memberof conversation.GetArchivedMessagesContent
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {conversation.GetArchivedMessagesContent} GetArchivedMessagesContent
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		GetArchivedMessagesContent.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.conversation.GetArchivedMessagesContent();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.messageId = reader.string();
						break;
					case 2:
						message.contentType = reader.string();
						break;
					case 3:
						message.createdOn = reader.double();
						break;
					case 4:
						message.createdBy = reader.string();
						break;
					case 5:
						message.content = reader.bytes();
						break;
					case 6:
						message.options = reader.bytes();
						break;
					case 7:
						message.isOpened = reader.bool();
						break;
					case 8:
						message.isDelivered = reader.bool();
						break;
					case 9:
						message.isDeleted = reader.bool();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a GetArchivedMessagesContent message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof conversation.GetArchivedMessagesContent
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {conversation.GetArchivedMessagesContent} GetArchivedMessagesContent
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		GetArchivedMessagesContent.decodeDelimited = function decodeDelimited(
			reader
		) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a GetArchivedMessagesContent message.
		 * @function verify
		 * @memberof conversation.GetArchivedMessagesContent
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		GetArchivedMessagesContent.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.messageId !== null && message.hasOwnProperty("messageId"))
				if (!$util.isString(message.messageId))
					return "messageId: string expected";
			if (message.contentType !== null && message.hasOwnProperty("contentType"))
				if (!$util.isString(message.contentType))
					return "contentType: string expected";
			if (message.createdOn !== null && message.hasOwnProperty("createdOn"))
				if (typeof message.createdOn !== "number")
					return "createdOn: number expected";
			if (message.createdBy !== null && message.hasOwnProperty("createdBy"))
				if (!$util.isString(message.createdBy))
					return "createdBy: string expected";
			if (message.content !== null && message.hasOwnProperty("content"))
				if (
					!(
						(message.content && typeof message.content.length === "number") ||
						$util.isString(message.content)
					)
				)
					return "content: buffer expected";
			if (message.options !== null && message.hasOwnProperty("options"))
				if (
					!(
						(message.options && typeof message.options.length === "number") ||
						$util.isString(message.options)
					)
				)
					return "options: buffer expected";
			if (message.isOpened !== null && message.hasOwnProperty("isOpened"))
				if (typeof message.isOpened !== "boolean")
					return "isOpened: boolean expected";
			if (message.isDelivered !== null && message.hasOwnProperty("isDelivered"))
				if (typeof message.isDelivered !== "boolean")
					return "isDelivered: boolean expected";
			if (message.isDeleted !== null && message.hasOwnProperty("isDeleted"))
				if (typeof message.isDeleted !== "boolean")
					return "isDeleted: boolean expected";
			return null;
		};

		/**
		 * Creates a GetArchivedMessagesContent message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof conversation.GetArchivedMessagesContent
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {conversation.GetArchivedMessagesContent} GetArchivedMessagesContent
		 */
		GetArchivedMessagesContent.fromObject = function fromObject(object) {
			if (object instanceof $root.conversation.GetArchivedMessagesContent)
				return object;
			var message = new $root.conversation.GetArchivedMessagesContent();
			if (object.messageId !== null)
				message.messageId = String(object.messageId);
			if (object.contentType !== null)
				message.contentType = String(object.contentType);
			if (object.createdOn !== null)
				message.createdOn = Number(object.createdOn);
			if (object.createdBy !== null)
				message.createdBy = String(object.createdBy);
			if (object.content !== null)
				if (typeof object.content === "string")
					$util.base64.decode(
						object.content,
						(message.content = $util.newBuffer(
							$util.base64.length(object.content)
						)),
						0
					);
				else if (object.content.length) message.content = object.content;
			if (object.options !== null)
				if (typeof object.options === "string")
					$util.base64.decode(
						object.options,
						(message.options = $util.newBuffer(
							$util.base64.length(object.options)
						)),
						0
					);
				else if (object.options.length) message.options = object.options;
			if (object.isOpened !== null) message.isOpened = Boolean(object.isOpened);
			if (object.isDelivered !== null)
				message.isDelivered = Boolean(object.isDelivered);
			if (object.isDeleted !== null)
				message.isDeleted = Boolean(object.isDeleted);
			return message;
		};

		/**
		 * Creates a plain object from a GetArchivedMessagesContent message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof conversation.GetArchivedMessagesContent
		 * @static
		 * @param {conversation.GetArchivedMessagesContent} message GetArchivedMessagesContent
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		GetArchivedMessagesContent.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.messageId = "";
				object.contentType = "";
				object.createdOn = 0;
				object.createdBy = "";
				if (options.bytes === String) object.content = "";
				else {
					object.content = [];
					if (options.bytes !== Array)
						object.content = $util.newBuffer(object.content);
				}
				if (options.bytes === String) object.options = "";
				else {
					object.options = [];
					if (options.bytes !== Array)
						object.options = $util.newBuffer(object.options);
				}
				object.isOpened = false;
				object.isDelivered = false;
				object.isDeleted = false;
			}
			if (message.messageId !== null && message.hasOwnProperty("messageId"))
				object.messageId = message.messageId;
			if (message.contentType !== null && message.hasOwnProperty("contentType"))
				object.contentType = message.contentType;
			if (message.createdOn !== null && message.hasOwnProperty("createdOn"))
				object.createdOn =
					options.json && !isFinite(message.createdOn)
						? String(message.createdOn)
						: message.createdOn;
			if (message.createdBy !== null && message.hasOwnProperty("createdBy"))
				object.createdBy = message.createdBy;
			if (message.content !== null && message.hasOwnProperty("content"))
				object.content =
					options.bytes === String
						? $util.base64.encode(message.content, 0, message.content.length)
						: options.bytes === Array
						? Array.prototype.slice.call(message.content)
						: message.content;
			if (message.options !== null && message.hasOwnProperty("options"))
				object.options =
					options.bytes === String
						? $util.base64.encode(message.options, 0, message.options.length)
						: options.bytes === Array
						? Array.prototype.slice.call(message.options)
						: message.options;
			if (message.isOpened !== null && message.hasOwnProperty("isOpened"))
				object.isOpened = message.isOpened;
			if (message.isDelivered !== null && message.hasOwnProperty("isDelivered"))
				object.isDelivered = message.isDelivered;
			if (message.isDeleted !== null && message.hasOwnProperty("isDeleted"))
				object.isDeleted = message.isDeleted;
			return object;
		};

		/**
		 * Converts this GetArchivedMessagesContent to JSON.
		 * @function toJSON
		 * @memberof conversation.GetArchivedMessagesContent
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		GetArchivedMessagesContent.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return GetArchivedMessagesContent;
	})();

	conversation.GetPaginatedArchivedMessagesInput = (function () {
		/**
		 * Properties of a GetPaginatedArchivedMessagesInput.
		 * @memberof conversation
		 * @interface IGetPaginatedArchivedMessagesInput
		 * @property {string|null} [conversationId] GetPaginatedArchivedMessagesInput conversationId
		 * @property {string|null} [botId] GetPaginatedArchivedMessagesInput botId
		 * @property {number|null} [startTime] GetPaginatedArchivedMessagesInput startTime
		 * @property {string|null} [fetchDirection] GetPaginatedArchivedMessagesInput fetchDirection
		 */

		/**
		 * Constructs a new GetPaginatedArchivedMessagesInput.
		 * @memberof conversation
		 * @classdesc Represents a GetPaginatedArchivedMessagesInput.
		 * @implements IGetPaginatedArchivedMessagesInput
		 * @constructor
		 * @param {conversation.IGetPaginatedArchivedMessagesInput=} [properties] Properties to set
		 */
		function GetPaginatedArchivedMessagesInput(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * GetPaginatedArchivedMessagesInput conversationId.
		 * @member {string} conversationId
		 * @memberof conversation.GetPaginatedArchivedMessagesInput
		 * @instance
		 */
		GetPaginatedArchivedMessagesInput.prototype.conversationId = "";

		/**
		 * GetPaginatedArchivedMessagesInput botId.
		 * @member {string} botId
		 * @memberof conversation.GetPaginatedArchivedMessagesInput
		 * @instance
		 */
		GetPaginatedArchivedMessagesInput.prototype.botId = "";

		/**
		 * GetPaginatedArchivedMessagesInput startTime.
		 * @member {number} startTime
		 * @memberof conversation.GetPaginatedArchivedMessagesInput
		 * @instance
		 */
		GetPaginatedArchivedMessagesInput.prototype.startTime = 0;

		/**
		 * GetPaginatedArchivedMessagesInput fetchDirection.
		 * @member {string} fetchDirection
		 * @memberof conversation.GetPaginatedArchivedMessagesInput
		 * @instance
		 */
		GetPaginatedArchivedMessagesInput.prototype.fetchDirection = "";

		/**
		 * Creates a new GetPaginatedArchivedMessagesInput instance using the specified properties.
		 * @function create
		 * @memberof conversation.GetPaginatedArchivedMessagesInput
		 * @static
		 * @param {conversation.IGetPaginatedArchivedMessagesInput=} [properties] Properties to set
		 * @returns {conversation.GetPaginatedArchivedMessagesInput} GetPaginatedArchivedMessagesInput instance
		 */
		GetPaginatedArchivedMessagesInput.create = function create(properties) {
			return new GetPaginatedArchivedMessagesInput(properties);
		};

		/**
		 * Encodes the specified GetPaginatedArchivedMessagesInput message. Does not implicitly {@link conversation.GetPaginatedArchivedMessagesInput.verify|verify} messages.
		 * @function encode
		 * @memberof conversation.GetPaginatedArchivedMessagesInput
		 * @static
		 * @param {conversation.IGetPaginatedArchivedMessagesInput} message GetPaginatedArchivedMessagesInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		GetPaginatedArchivedMessagesInput.encode = function encode(
			message,
			writer
		) {
			if (!writer) writer = $Writer.create();
			if (
				message.conversationId !== null &&
				Object.hasOwnProperty.call(message, "conversationId")
			)
				writer
					.uint32(/* id 1, wireType 2 =*/ 10)
					.string(message.conversationId);
			if (
				message.botId !== null &&
				Object.hasOwnProperty.call(message, "botId")
			)
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.botId);
			if (
				message.startTime !== null &&
				Object.hasOwnProperty.call(message, "startTime")
			)
				writer.uint32(/* id 3, wireType 1 =*/ 25).double(message.startTime);
			if (
				message.fetchDirection !== null &&
				Object.hasOwnProperty.call(message, "fetchDirection")
			)
				writer
					.uint32(/* id 4, wireType 2 =*/ 34)
					.string(message.fetchDirection);
			return writer;
		};

		/**
		 * Encodes the specified GetPaginatedArchivedMessagesInput message, length delimited. Does not implicitly {@link conversation.GetPaginatedArchivedMessagesInput.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof conversation.GetPaginatedArchivedMessagesInput
		 * @static
		 * @param {conversation.IGetPaginatedArchivedMessagesInput} message GetPaginatedArchivedMessagesInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		GetPaginatedArchivedMessagesInput.encodeDelimited =
			function encodeDelimited(message, writer) {
				return this.encode(message, writer).ldelim();
			};

		/**
		 * Decodes a GetPaginatedArchivedMessagesInput message from the specified reader or buffer.
		 * @function decode
		 * @memberof conversation.GetPaginatedArchivedMessagesInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {conversation.GetPaginatedArchivedMessagesInput} GetPaginatedArchivedMessagesInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		GetPaginatedArchivedMessagesInput.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.conversation.GetPaginatedArchivedMessagesInput();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.conversationId = reader.string();
						break;
					case 2:
						message.botId = reader.string();
						break;
					case 3:
						message.startTime = reader.double();
						break;
					case 4:
						message.fetchDirection = reader.string();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a GetPaginatedArchivedMessagesInput message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof conversation.GetPaginatedArchivedMessagesInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {conversation.GetPaginatedArchivedMessagesInput} GetPaginatedArchivedMessagesInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		GetPaginatedArchivedMessagesInput.decodeDelimited =
			function decodeDelimited(reader) {
				if (!(reader instanceof $Reader)) reader = new $Reader(reader);
				return this.decode(reader, reader.uint32());
			};

		/**
		 * Verifies a GetPaginatedArchivedMessagesInput message.
		 * @function verify
		 * @memberof conversation.GetPaginatedArchivedMessagesInput
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		GetPaginatedArchivedMessagesInput.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (
				message.conversationId !== null &&
				message.hasOwnProperty("conversationId")
			)
				if (!$util.isString(message.conversationId))
					return "conversationId: string expected";
			if (message.botId !== null && message.hasOwnProperty("botId"))
				if (!$util.isString(message.botId)) return "botId: string expected";
			if (message.startTime !== null && message.hasOwnProperty("startTime"))
				if (typeof message.startTime !== "number")
					return "startTime: number expected";
			if (
				message.fetchDirection !== null &&
				message.hasOwnProperty("fetchDirection")
			)
				if (!$util.isString(message.fetchDirection))
					return "fetchDirection: string expected";
			return null;
		};

		/**
		 * Creates a GetPaginatedArchivedMessagesInput message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof conversation.GetPaginatedArchivedMessagesInput
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {conversation.GetPaginatedArchivedMessagesInput} GetPaginatedArchivedMessagesInput
		 */
		GetPaginatedArchivedMessagesInput.fromObject = function fromObject(object) {
			if (
				object instanceof $root.conversation.GetPaginatedArchivedMessagesInput
			)
				return object;
			var message = new $root.conversation.GetPaginatedArchivedMessagesInput();
			if (object.conversationId !== null)
				message.conversationId = String(object.conversationId);
			if (object.botId !== null) message.botId = String(object.botId);
			if (object.startTime !== null)
				message.startTime = Number(object.startTime);
			if (object.fetchDirection !== null)
				message.fetchDirection = String(object.fetchDirection);
			return message;
		};

		/**
		 * Creates a plain object from a GetPaginatedArchivedMessagesInput message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof conversation.GetPaginatedArchivedMessagesInput
		 * @static
		 * @param {conversation.GetPaginatedArchivedMessagesInput} message GetPaginatedArchivedMessagesInput
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		GetPaginatedArchivedMessagesInput.toObject = function toObject(
			message,
			options
		) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.conversationId = "";
				object.botId = "";
				object.startTime = 0;
				object.fetchDirection = "";
			}
			if (
				message.conversationId !== null &&
				message.hasOwnProperty("conversationId")
			)
				object.conversationId = message.conversationId;
			if (message.botId !== null && message.hasOwnProperty("botId"))
				object.botId = message.botId;
			if (message.startTime !== null && message.hasOwnProperty("startTime"))
				object.startTime =
					options.json && !isFinite(message.startTime)
						? String(message.startTime)
						: message.startTime;
			if (
				message.fetchDirection !== null &&
				message.hasOwnProperty("fetchDirection")
			)
				object.fetchDirection = message.fetchDirection;
			return object;
		};

		/**
		 * Converts this GetPaginatedArchivedMessagesInput to JSON.
		 * @function toJSON
		 * @memberof conversation.GetPaginatedArchivedMessagesInput
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		GetPaginatedArchivedMessagesInput.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return GetPaginatedArchivedMessagesInput;
	})();

	conversation.GetPaginatedArchivedMessagesResponse = (function () {
		/**
		 * Properties of a GetPaginatedArchivedMessagesResponse.
		 * @memberof conversation
		 * @interface IGetPaginatedArchivedMessagesResponse
		 * @property {number|null} [error] GetPaginatedArchivedMessagesResponse error
		 * @property {boolean|null} [moreMessagesExist] GetPaginatedArchivedMessagesResponse moreMessagesExist
		 * @property {Array.<conversation.IGetArchivedMessagesContent>|null} [content] GetPaginatedArchivedMessagesResponse content
		 */

		/**
		 * Constructs a new GetPaginatedArchivedMessagesResponse.
		 * @memberof conversation
		 * @classdesc Represents a GetPaginatedArchivedMessagesResponse.
		 * @implements IGetPaginatedArchivedMessagesResponse
		 * @constructor
		 * @param {conversation.IGetPaginatedArchivedMessagesResponse=} [properties] Properties to set
		 */
		function GetPaginatedArchivedMessagesResponse(properties) {
			this.content = [];
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * GetPaginatedArchivedMessagesResponse error.
		 * @member {number} error
		 * @memberof conversation.GetPaginatedArchivedMessagesResponse
		 * @instance
		 */
		GetPaginatedArchivedMessagesResponse.prototype.error = 0;

		/**
		 * GetPaginatedArchivedMessagesResponse moreMessagesExist.
		 * @member {boolean} moreMessagesExist
		 * @memberof conversation.GetPaginatedArchivedMessagesResponse
		 * @instance
		 */
		GetPaginatedArchivedMessagesResponse.prototype.moreMessagesExist = false;

		/**
		 * GetPaginatedArchivedMessagesResponse content.
		 * @member {Array.<conversation.IGetArchivedMessagesContent>} content
		 * @memberof conversation.GetPaginatedArchivedMessagesResponse
		 * @instance
		 */
		GetPaginatedArchivedMessagesResponse.prototype.content = $util.emptyArray;

		/**
		 * Creates a new GetPaginatedArchivedMessagesResponse instance using the specified properties.
		 * @function create
		 * @memberof conversation.GetPaginatedArchivedMessagesResponse
		 * @static
		 * @param {conversation.IGetPaginatedArchivedMessagesResponse=} [properties] Properties to set
		 * @returns {conversation.GetPaginatedArchivedMessagesResponse} GetPaginatedArchivedMessagesResponse instance
		 */
		GetPaginatedArchivedMessagesResponse.create = function create(properties) {
			return new GetPaginatedArchivedMessagesResponse(properties);
		};

		/**
		 * Encodes the specified GetPaginatedArchivedMessagesResponse message. Does not implicitly {@link conversation.GetPaginatedArchivedMessagesResponse.verify|verify} messages.
		 * @function encode
		 * @memberof conversation.GetPaginatedArchivedMessagesResponse
		 * @static
		 * @param {conversation.IGetPaginatedArchivedMessagesResponse} message GetPaginatedArchivedMessagesResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		GetPaginatedArchivedMessagesResponse.encode = function encode(
			message,
			writer
		) {
			if (!writer) writer = $Writer.create();
			if (
				message.error !== null &&
				Object.hasOwnProperty.call(message, "error")
			)
				writer.uint32(/* id 1, wireType 0 =*/ 8).int32(message.error);
			if (
				message.moreMessagesExist !== null &&
				Object.hasOwnProperty.call(message, "moreMessagesExist")
			)
				writer
					.uint32(/* id 2, wireType 0 =*/ 16)
					.bool(message.moreMessagesExist);
			if (message.content !== null && message.content.length)
				for (var i = 0; i < message.content.length; ++i)
					$root.conversation.GetArchivedMessagesContent.encode(
						message.content[i],
						writer.uint32(/* id 3, wireType 2 =*/ 26).fork()
					).ldelim();
			return writer;
		};

		/**
		 * Encodes the specified GetPaginatedArchivedMessagesResponse message, length delimited. Does not implicitly {@link conversation.GetPaginatedArchivedMessagesResponse.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof conversation.GetPaginatedArchivedMessagesResponse
		 * @static
		 * @param {conversation.IGetPaginatedArchivedMessagesResponse} message GetPaginatedArchivedMessagesResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		GetPaginatedArchivedMessagesResponse.encodeDelimited =
			function encodeDelimited(message, writer) {
				return this.encode(message, writer).ldelim();
			};

		/**
		 * Decodes a GetPaginatedArchivedMessagesResponse message from the specified reader or buffer.
		 * @function decode
		 * @memberof conversation.GetPaginatedArchivedMessagesResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {conversation.GetPaginatedArchivedMessagesResponse} GetPaginatedArchivedMessagesResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		GetPaginatedArchivedMessagesResponse.decode = function decode(
			reader,
			length
		) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.conversation.GetPaginatedArchivedMessagesResponse();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.error = reader.int32();
						break;
					case 2:
						message.moreMessagesExist = reader.bool();
						break;
					case 3:
						if (!(message.content && message.content.length))
							message.content = [];
						message.content.push(
							$root.conversation.GetArchivedMessagesContent.decode(
								reader,
								reader.uint32()
							)
						);
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a GetPaginatedArchivedMessagesResponse message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof conversation.GetPaginatedArchivedMessagesResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {conversation.GetPaginatedArchivedMessagesResponse} GetPaginatedArchivedMessagesResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		GetPaginatedArchivedMessagesResponse.decodeDelimited =
			function decodeDelimited(reader) {
				if (!(reader instanceof $Reader)) reader = new $Reader(reader);
				return this.decode(reader, reader.uint32());
			};

		/**
		 * Verifies a GetPaginatedArchivedMessagesResponse message.
		 * @function verify
		 * @memberof conversation.GetPaginatedArchivedMessagesResponse
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		GetPaginatedArchivedMessagesResponse.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.error !== null && message.hasOwnProperty("error"))
				if (!$util.isInteger(message.error)) return "error: integer expected";
			if (
				message.moreMessagesExist !== null &&
				message.hasOwnProperty("moreMessagesExist")
			)
				if (typeof message.moreMessagesExist !== "boolean")
					return "moreMessagesExist: boolean expected";
			if (message.content !== null && message.hasOwnProperty("content")) {
				if (!Array.isArray(message.content)) return "content: array expected";
				for (var i = 0; i < message.content.length; ++i) {
					var error = $root.conversation.GetArchivedMessagesContent.verify(
						message.content[i]
					);
					if (error) return "content." + error;
				}
			}
			return null;
		};

		/**
		 * Creates a GetPaginatedArchivedMessagesResponse message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof conversation.GetPaginatedArchivedMessagesResponse
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {conversation.GetPaginatedArchivedMessagesResponse} GetPaginatedArchivedMessagesResponse
		 */
		GetPaginatedArchivedMessagesResponse.fromObject = function fromObject(
			object
		) {
			if (
				object instanceof
				$root.conversation.GetPaginatedArchivedMessagesResponse
			)
				return object;
			var message =
				new $root.conversation.GetPaginatedArchivedMessagesResponse();
			if (object.error !== null) message.error = object.error | 0;
			if (object.moreMessagesExist !== null)
				message.moreMessagesExist = Boolean(object.moreMessagesExist);
			if (object.content) {
				if (!Array.isArray(object.content))
					throw TypeError(
						".conversation.GetPaginatedArchivedMessagesResponse.content: array expected"
					);
				message.content = [];
				for (var i = 0; i < object.content.length; ++i) {
					if (typeof object.content[i] !== "object")
						throw TypeError(
							".conversation.GetPaginatedArchivedMessagesResponse.content: object expected"
						);
					message.content[i] =
						$root.conversation.GetArchivedMessagesContent.fromObject(
							object.content[i]
						);
				}
			}
			return message;
		};

		/**
		 * Creates a plain object from a GetPaginatedArchivedMessagesResponse message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof conversation.GetPaginatedArchivedMessagesResponse
		 * @static
		 * @param {conversation.GetPaginatedArchivedMessagesResponse} message GetPaginatedArchivedMessagesResponse
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		GetPaginatedArchivedMessagesResponse.toObject = function toObject(
			message,
			options
		) {
			if (!options) options = {};
			var object = {};
			if (options.arrays || options.defaults) object.content = [];
			if (options.defaults) {
				object.error = 0;
				object.moreMessagesExist = false;
			}
			if (message.error !== null && message.hasOwnProperty("error"))
				object.error = message.error;
			if (
				message.moreMessagesExist !== null &&
				message.hasOwnProperty("moreMessagesExist")
			)
				object.moreMessagesExist = message.moreMessagesExist;
			if (message.content && message.content.length) {
				object.content = [];
				for (var j = 0; j < message.content.length; ++j)
					object.content[j] =
						$root.conversation.GetArchivedMessagesContent.toObject(
							message.content[j],
							options
						);
			}
			return object;
		};

		/**
		 * Converts this GetPaginatedArchivedMessagesResponse to JSON.
		 * @function toJSON
		 * @memberof conversation.GetPaginatedArchivedMessagesResponse
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		GetPaginatedArchivedMessagesResponse.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return GetPaginatedArchivedMessagesResponse;
	})();

	conversation.CatalogInput = (function () {
		/**
		 * Properties of a CatalogInput.
		 * @memberof conversation
		 * @interface ICatalogInput
		 * @property {boolean|null} [isWebRequest] CatalogInput isWebRequest
		 * @property {string|null} [query] CatalogInput query
		 * @property {string|null} [output] CatalogInput output
		 * @property {string|null} [selectedDomain] CatalogInput selectedDomain
		 */

		/**
		 * Constructs a new CatalogInput.
		 * @memberof conversation
		 * @classdesc Represents a CatalogInput.
		 * @implements ICatalogInput
		 * @constructor
		 * @param {conversation.ICatalogInput=} [properties] Properties to set
		 */
		function CatalogInput(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * CatalogInput isWebRequest.
		 * @member {boolean} isWebRequest
		 * @memberof conversation.CatalogInput
		 * @instance
		 */
		CatalogInput.prototype.isWebRequest = false;

		/**
		 * CatalogInput query.
		 * @member {string} query
		 * @memberof conversation.CatalogInput
		 * @instance
		 */
		CatalogInput.prototype.query = "";

		/**
		 * CatalogInput output.
		 * @member {string} output
		 * @memberof conversation.CatalogInput
		 * @instance
		 */
		CatalogInput.prototype.output = "";

		/**
		 * CatalogInput selectedDomain.
		 * @member {string} selectedDomain
		 * @memberof conversation.CatalogInput
		 * @instance
		 */
		CatalogInput.prototype.selectedDomain = "";

		/**
		 * Creates a new CatalogInput instance using the specified properties.
		 * @function create
		 * @memberof conversation.CatalogInput
		 * @static
		 * @param {conversation.ICatalogInput=} [properties] Properties to set
		 * @returns {conversation.CatalogInput} CatalogInput instance
		 */
		CatalogInput.create = function create(properties) {
			return new CatalogInput(properties);
		};

		/**
		 * Encodes the specified CatalogInput message. Does not implicitly {@link conversation.CatalogInput.verify|verify} messages.
		 * @function encode
		 * @memberof conversation.CatalogInput
		 * @static
		 * @param {conversation.ICatalogInput} message CatalogInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		CatalogInput.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.isWebRequest !== null &&
				Object.hasOwnProperty.call(message, "isWebRequest")
			)
				writer.uint32(/* id 1, wireType 0 =*/ 8).bool(message.isWebRequest);
			if (
				message.query !== null &&
				Object.hasOwnProperty.call(message, "query")
			)
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.query);
			if (
				message.output !== null &&
				Object.hasOwnProperty.call(message, "output")
			)
				writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.output);
			if (
				message.selectedDomain !== null &&
				Object.hasOwnProperty.call(message, "selectedDomain")
			)
				writer
					.uint32(/* id 4, wireType 2 =*/ 34)
					.string(message.selectedDomain);
			return writer;
		};

		/**
		 * Encodes the specified CatalogInput message, length delimited. Does not implicitly {@link conversation.CatalogInput.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof conversation.CatalogInput
		 * @static
		 * @param {conversation.ICatalogInput} message CatalogInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		CatalogInput.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a CatalogInput message from the specified reader or buffer.
		 * @function decode
		 * @memberof conversation.CatalogInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {conversation.CatalogInput} CatalogInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		CatalogInput.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.conversation.CatalogInput();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.isWebRequest = reader.bool();
						break;
					case 2:
						message.query = reader.string();
						break;
					case 3:
						message.output = reader.string();
						break;
					case 4:
						message.selectedDomain = reader.string();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a CatalogInput message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof conversation.CatalogInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {conversation.CatalogInput} CatalogInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		CatalogInput.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a CatalogInput message.
		 * @function verify
		 * @memberof conversation.CatalogInput
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		CatalogInput.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (
				message.isWebRequest !== null &&
				message.hasOwnProperty("isWebRequest")
			)
				if (typeof message.isWebRequest !== "boolean")
					return "isWebRequest: boolean expected";
			if (message.query !== null && message.hasOwnProperty("query"))
				if (!$util.isString(message.query)) return "query: string expected";
			if (message.output !== null && message.hasOwnProperty("output"))
				if (!$util.isString(message.output)) return "output: string expected";
			if (
				message.selectedDomain !== null &&
				message.hasOwnProperty("selectedDomain")
			)
				if (!$util.isString(message.selectedDomain))
					return "selectedDomain: string expected";
			return null;
		};

		/**
		 * Creates a CatalogInput message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof conversation.CatalogInput
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {conversation.CatalogInput} CatalogInput
		 */
		CatalogInput.fromObject = function fromObject(object) {
			if (object instanceof $root.conversation.CatalogInput) return object;
			var message = new $root.conversation.CatalogInput();
			if (object.isWebRequest !== null)
				message.isWebRequest = Boolean(object.isWebRequest);
			if (object.query !== null) message.query = String(object.query);
			if (object.output !== null) message.output = String(object.output);
			if (object.selectedDomain !== null)
				message.selectedDomain = String(object.selectedDomain);
			return message;
		};

		/**
		 * Creates a plain object from a CatalogInput message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof conversation.CatalogInput
		 * @static
		 * @param {conversation.CatalogInput} message CatalogInput
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		CatalogInput.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.isWebRequest = false;
				object.query = "";
				object.output = "";
				object.selectedDomain = "";
			}
			if (
				message.isWebRequest !== null &&
				message.hasOwnProperty("isWebRequest")
			)
				object.isWebRequest = message.isWebRequest;
			if (message.query !== null && message.hasOwnProperty("query"))
				object.query = message.query;
			if (message.output !== null && message.hasOwnProperty("output"))
				object.output = message.output;
			if (
				message.selectedDomain !== null &&
				message.hasOwnProperty("selectedDomain")
			)
				object.selectedDomain = message.selectedDomain;
			return object;
		};

		/**
		 * Converts this CatalogInput to JSON.
		 * @function toJSON
		 * @memberof conversation.CatalogInput
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		CatalogInput.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return CatalogInput;
	})();

	conversation.ResetConversationInput = (function () {
		/**
		 * Properties of a ResetConversationInput.
		 * @memberof conversation
		 * @interface IResetConversationInput
		 * @property {string|null} [conversationId] ResetConversationInput conversationId
		 * @property {string|null} [botId] ResetConversationInput botId
		 */

		/**
		 * Constructs a new ResetConversationInput.
		 * @memberof conversation
		 * @classdesc Represents a ResetConversationInput.
		 * @implements IResetConversationInput
		 * @constructor
		 * @param {conversation.IResetConversationInput=} [properties] Properties to set
		 */
		function ResetConversationInput(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * ResetConversationInput conversationId.
		 * @member {string} conversationId
		 * @memberof conversation.ResetConversationInput
		 * @instance
		 */
		ResetConversationInput.prototype.conversationId = "";

		/**
		 * ResetConversationInput botId.
		 * @member {string} botId
		 * @memberof conversation.ResetConversationInput
		 * @instance
		 */
		ResetConversationInput.prototype.botId = "";

		/**
		 * Creates a new ResetConversationInput instance using the specified properties.
		 * @function create
		 * @memberof conversation.ResetConversationInput
		 * @static
		 * @param {conversation.IResetConversationInput=} [properties] Properties to set
		 * @returns {conversation.ResetConversationInput} ResetConversationInput instance
		 */
		ResetConversationInput.create = function create(properties) {
			return new ResetConversationInput(properties);
		};

		/**
		 * Encodes the specified ResetConversationInput message. Does not implicitly {@link conversation.ResetConversationInput.verify|verify} messages.
		 * @function encode
		 * @memberof conversation.ResetConversationInput
		 * @static
		 * @param {conversation.IResetConversationInput} message ResetConversationInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		ResetConversationInput.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.conversationId !== null &&
				Object.hasOwnProperty.call(message, "conversationId")
			)
				writer
					.uint32(/* id 1, wireType 2 =*/ 10)
					.string(message.conversationId);
			if (
				message.botId !== null &&
				Object.hasOwnProperty.call(message, "botId")
			)
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.botId);
			return writer;
		};

		/**
		 * Encodes the specified ResetConversationInput message, length delimited. Does not implicitly {@link conversation.ResetConversationInput.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof conversation.ResetConversationInput
		 * @static
		 * @param {conversation.IResetConversationInput} message ResetConversationInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		ResetConversationInput.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a ResetConversationInput message from the specified reader or buffer.
		 * @function decode
		 * @memberof conversation.ResetConversationInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {conversation.ResetConversationInput} ResetConversationInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		ResetConversationInput.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.conversation.ResetConversationInput();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.conversationId = reader.string();
						break;
					case 2:
						message.botId = reader.string();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a ResetConversationInput message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof conversation.ResetConversationInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {conversation.ResetConversationInput} ResetConversationInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		ResetConversationInput.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a ResetConversationInput message.
		 * @function verify
		 * @memberof conversation.ResetConversationInput
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		ResetConversationInput.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (
				message.conversationId !== null &&
				message.hasOwnProperty("conversationId")
			)
				if (!$util.isString(message.conversationId))
					return "conversationId: string expected";
			if (message.botId !== null && message.hasOwnProperty("botId"))
				if (!$util.isString(message.botId)) return "botId: string expected";
			return null;
		};

		/**
		 * Creates a ResetConversationInput message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof conversation.ResetConversationInput
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {conversation.ResetConversationInput} ResetConversationInput
		 */
		ResetConversationInput.fromObject = function fromObject(object) {
			if (object instanceof $root.conversation.ResetConversationInput)
				return object;
			var message = new $root.conversation.ResetConversationInput();
			if (object.conversationId !== null)
				message.conversationId = String(object.conversationId);
			if (object.botId !== null) message.botId = String(object.botId);
			return message;
		};

		/**
		 * Creates a plain object from a ResetConversationInput message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof conversation.ResetConversationInput
		 * @static
		 * @param {conversation.ResetConversationInput} message ResetConversationInput
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		ResetConversationInput.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.conversationId = "";
				object.botId = "";
			}
			if (
				message.conversationId !== null &&
				message.hasOwnProperty("conversationId")
			)
				object.conversationId = message.conversationId;
			if (message.botId !== null && message.hasOwnProperty("botId"))
				object.botId = message.botId;
			return object;
		};

		/**
		 * Converts this ResetConversationInput to JSON.
		 * @function toJSON
		 * @memberof conversation.ResetConversationInput
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		ResetConversationInput.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return ResetConversationInput;
	})();

	conversation.FavContact = (function () {
		/**
		 * Properties of a FavContact.
		 * @memberof conversation
		 * @interface IFavContact
		 * @property {string|null} [userName] FavContact userName
		 * @property {string|null} [emailAddress] FavContact emailAddress
		 * @property {commonmessages.IPhoneNumbers|null} [phoneNumbers] FavContact phoneNumbers
		 * @property {string|null} [userId] FavContact userId
		 * @property {string|null} [userCompanyName] FavContact userCompanyName
		 * @property {commonmessages.IUserAddress|null} [address] FavContact address
		 */

		/**
		 * Constructs a new FavContact.
		 * @memberof conversation
		 * @classdesc Represents a FavContact.
		 * @implements IFavContact
		 * @constructor
		 * @param {conversation.IFavContact=} [properties] Properties to set
		 */
		function FavContact(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * FavContact userName.
		 * @member {string} userName
		 * @memberof conversation.FavContact
		 * @instance
		 */
		FavContact.prototype.userName = "";

		/**
		 * FavContact emailAddress.
		 * @member {string} emailAddress
		 * @memberof conversation.FavContact
		 * @instance
		 */
		FavContact.prototype.emailAddress = "";

		/**
		 * FavContact phoneNumbers.
		 * @member {commonmessages.IPhoneNumbers|null|undefined} phoneNumbers
		 * @memberof conversation.FavContact
		 * @instance
		 */
		FavContact.prototype.phoneNumbers = null;

		/**
		 * FavContact userId.
		 * @member {string} userId
		 * @memberof conversation.FavContact
		 * @instance
		 */
		FavContact.prototype.userId = "";

		/**
		 * FavContact userCompanyName.
		 * @member {string} userCompanyName
		 * @memberof conversation.FavContact
		 * @instance
		 */
		FavContact.prototype.userCompanyName = "";

		/**
		 * FavContact address.
		 * @member {commonmessages.IUserAddress|null|undefined} address
		 * @memberof conversation.FavContact
		 * @instance
		 */
		FavContact.prototype.address = null;

		/**
		 * Creates a new FavContact instance using the specified properties.
		 * @function create
		 * @memberof conversation.FavContact
		 * @static
		 * @param {conversation.IFavContact=} [properties] Properties to set
		 * @returns {conversation.FavContact} FavContact instance
		 */
		FavContact.create = function create(properties) {
			return new FavContact(properties);
		};

		/**
		 * Encodes the specified FavContact message. Does not implicitly {@link conversation.FavContact.verify|verify} messages.
		 * @function encode
		 * @memberof conversation.FavContact
		 * @static
		 * @param {conversation.IFavContact} message FavContact message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		FavContact.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.userName !== null &&
				Object.hasOwnProperty.call(message, "userName")
			)
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.userName);
			if (
				message.emailAddress !== null &&
				Object.hasOwnProperty.call(message, "emailAddress")
			)
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.emailAddress);
			if (
				message.phoneNumbers !== null &&
				Object.hasOwnProperty.call(message, "phoneNumbers")
			)
				$root.commonmessages.PhoneNumbers.encode(
					message.phoneNumbers,
					writer.uint32(/* id 3, wireType 2 =*/ 26).fork()
				).ldelim();
			if (
				message.userId !== null &&
				Object.hasOwnProperty.call(message, "userId")
			)
				writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.userId);
			if (
				message.userCompanyName !== null &&
				Object.hasOwnProperty.call(message, "userCompanyName")
			)
				writer
					.uint32(/* id 5, wireType 2 =*/ 42)
					.string(message.userCompanyName);
			if (
				message.address !== null &&
				Object.hasOwnProperty.call(message, "address")
			)
				$root.commonmessages.UserAddress.encode(
					message.address,
					writer.uint32(/* id 6, wireType 2 =*/ 50).fork()
				).ldelim();
			return writer;
		};

		/**
		 * Encodes the specified FavContact message, length delimited. Does not implicitly {@link conversation.FavContact.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof conversation.FavContact
		 * @static
		 * @param {conversation.IFavContact} message FavContact message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		FavContact.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a FavContact message from the specified reader or buffer.
		 * @function decode
		 * @memberof conversation.FavContact
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {conversation.FavContact} FavContact
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		FavContact.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.conversation.FavContact();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.userName = reader.string();
						break;
					case 2:
						message.emailAddress = reader.string();
						break;
					case 3:
						message.phoneNumbers = $root.commonmessages.PhoneNumbers.decode(
							reader,
							reader.uint32()
						);
						break;
					case 4:
						message.userId = reader.string();
						break;
					case 5:
						message.userCompanyName = reader.string();
						break;
					case 6:
						message.address = $root.commonmessages.UserAddress.decode(
							reader,
							reader.uint32()
						);
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a FavContact message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof conversation.FavContact
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {conversation.FavContact} FavContact
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		FavContact.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a FavContact message.
		 * @function verify
		 * @memberof conversation.FavContact
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		FavContact.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.userName !== null && message.hasOwnProperty("userName"))
				if (!$util.isString(message.userName))
					return "userName: string expected";
			if (
				message.emailAddress !== null &&
				message.hasOwnProperty("emailAddress")
			)
				if (!$util.isString(message.emailAddress))
					return "emailAddress: string expected";
			if (
				message.phoneNumbers !== null &&
				message.hasOwnProperty("phoneNumbers")
			) {
				var error = $root.commonmessages.PhoneNumbers.verify(
					message.phoneNumbers
				);
				if (error) return "phoneNumbers." + error;
			}
			if (message.userId !== null && message.hasOwnProperty("userId"))
				if (!$util.isString(message.userId)) return "userId: string expected";
			if (
				message.userCompanyName !== null &&
				message.hasOwnProperty("userCompanyName")
			)
				if (!$util.isString(message.userCompanyName))
					return "userCompanyName: string expected";
			if (message.address !== null && message.hasOwnProperty("address")) {
				var error = $root.commonmessages.UserAddress.verify(message.address);
				if (error) return "address." + error;
			}
			return null;
		};

		/**
		 * Creates a FavContact message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof conversation.FavContact
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {conversation.FavContact} FavContact
		 */
		FavContact.fromObject = function fromObject(object) {
			if (object instanceof $root.conversation.FavContact) return object;
			var message = new $root.conversation.FavContact();
			if (object.userName !== null) message.userName = String(object.userName);
			if (object.emailAddress !== null)
				message.emailAddress = String(object.emailAddress);
			if (object.phoneNumbers !== null) {
				if (typeof object.phoneNumbers !== "object")
					throw TypeError(
						".conversation.FavContact.phoneNumbers: object expected"
					);
				message.phoneNumbers = $root.commonmessages.PhoneNumbers.fromObject(
					object.phoneNumbers
				);
			}
			if (object.userId !== null) message.userId = String(object.userId);
			if (object.userCompanyName !== null)
				message.userCompanyName = String(object.userCompanyName);
			if (object.address !== null) {
				if (typeof object.address !== "object")
					throw TypeError(".conversation.FavContact.address: object expected");
				message.address = $root.commonmessages.UserAddress.fromObject(
					object.address
				);
			}
			return message;
		};

		/**
		 * Creates a plain object from a FavContact message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof conversation.FavContact
		 * @static
		 * @param {conversation.FavContact} message FavContact
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		FavContact.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.userName = "";
				object.emailAddress = "";
				object.phoneNumbers = null;
				object.userId = "";
				object.userCompanyName = "";
				object.address = null;
			}
			if (message.userName !== null && message.hasOwnProperty("userName"))
				object.userName = message.userName;
			if (
				message.emailAddress !== null &&
				message.hasOwnProperty("emailAddress")
			)
				object.emailAddress = message.emailAddress;
			if (
				message.phoneNumbers !== null &&
				message.hasOwnProperty("phoneNumbers")
			)
				object.phoneNumbers = $root.commonmessages.PhoneNumbers.toObject(
					message.phoneNumbers,
					options
				);
			if (message.userId !== null && message.hasOwnProperty("userId"))
				object.userId = message.userId;
			if (
				message.userCompanyName !== null &&
				message.hasOwnProperty("userCompanyName")
			)
				object.userCompanyName = message.userCompanyName;
			if (message.address !== null && message.hasOwnProperty("address"))
				object.address = $root.commonmessages.UserAddress.toObject(
					message.address,
					options
				);
			return object;
		};

		/**
		 * Converts this FavContact to JSON.
		 * @function toJSON
		 * @memberof conversation.FavContact
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		FavContact.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return FavContact;
	})();

	conversation.FavouritesResponse = (function () {
		/**
		 * Properties of a FavouritesResponse.
		 * @memberof conversation
		 * @interface IFavouritesResponse
		 * @property {Array.<conversation.ITimelineConversation>|null} [favourites] FavouritesResponse favourites
		 * @property {Array.<conversation.IFavContact>|null} [favouritePeople] FavouritesResponse favouritePeople
		 */

		/**
		 * Constructs a new FavouritesResponse.
		 * @memberof conversation
		 * @classdesc Represents a FavouritesResponse.
		 * @implements IFavouritesResponse
		 * @constructor
		 * @param {conversation.IFavouritesResponse=} [properties] Properties to set
		 */
		function FavouritesResponse(properties) {
			this.favourites = [];
			this.favouritePeople = [];
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * FavouritesResponse favourites.
		 * @member {Array.<conversation.ITimelineConversation>} favourites
		 * @memberof conversation.FavouritesResponse
		 * @instance
		 */
		FavouritesResponse.prototype.favourites = $util.emptyArray;

		/**
		 * FavouritesResponse favouritePeople.
		 * @member {Array.<conversation.IFavContact>} favouritePeople
		 * @memberof conversation.FavouritesResponse
		 * @instance
		 */
		FavouritesResponse.prototype.favouritePeople = $util.emptyArray;

		/**
		 * Creates a new FavouritesResponse instance using the specified properties.
		 * @function create
		 * @memberof conversation.FavouritesResponse
		 * @static
		 * @param {conversation.IFavouritesResponse=} [properties] Properties to set
		 * @returns {conversation.FavouritesResponse} FavouritesResponse instance
		 */
		FavouritesResponse.create = function create(properties) {
			return new FavouritesResponse(properties);
		};

		/**
		 * Encodes the specified FavouritesResponse message. Does not implicitly {@link conversation.FavouritesResponse.verify|verify} messages.
		 * @function encode
		 * @memberof conversation.FavouritesResponse
		 * @static
		 * @param {conversation.IFavouritesResponse} message FavouritesResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		FavouritesResponse.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.favourites !== null && message.favourites.length)
				for (var i = 0; i < message.favourites.length; ++i)
					$root.conversation.TimelineConversation.encode(
						message.favourites[i],
						writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
					).ldelim();
			if (message.favouritePeople !== null && message.favouritePeople.length)
				for (var i = 0; i < message.favouritePeople.length; ++i)
					$root.conversation.FavContact.encode(
						message.favouritePeople[i],
						writer.uint32(/* id 2, wireType 2 =*/ 18).fork()
					).ldelim();
			return writer;
		};

		/**
		 * Encodes the specified FavouritesResponse message, length delimited. Does not implicitly {@link conversation.FavouritesResponse.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof conversation.FavouritesResponse
		 * @static
		 * @param {conversation.IFavouritesResponse} message FavouritesResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		FavouritesResponse.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a FavouritesResponse message from the specified reader or buffer.
		 * @function decode
		 * @memberof conversation.FavouritesResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {conversation.FavouritesResponse} FavouritesResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		FavouritesResponse.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.conversation.FavouritesResponse();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						if (!(message.favourites && message.favourites.length))
							message.favourites = [];
						message.favourites.push(
							$root.conversation.TimelineConversation.decode(
								reader,
								reader.uint32()
							)
						);
						break;
					case 2:
						if (!(message.favouritePeople && message.favouritePeople.length))
							message.favouritePeople = [];
						message.favouritePeople.push(
							$root.conversation.FavContact.decode(reader, reader.uint32())
						);
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a FavouritesResponse message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof conversation.FavouritesResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {conversation.FavouritesResponse} FavouritesResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		FavouritesResponse.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a FavouritesResponse message.
		 * @function verify
		 * @memberof conversation.FavouritesResponse
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		FavouritesResponse.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.favourites !== null && message.hasOwnProperty("favourites")) {
				if (!Array.isArray(message.favourites))
					return "favourites: array expected";
				for (var i = 0; i < message.favourites.length; ++i) {
					var error = $root.conversation.TimelineConversation.verify(
						message.favourites[i]
					);
					if (error) return "favourites." + error;
				}
			}
			if (
				message.favouritePeople !== null &&
				message.hasOwnProperty("favouritePeople")
			) {
				if (!Array.isArray(message.favouritePeople))
					return "favouritePeople: array expected";
				for (var i = 0; i < message.favouritePeople.length; ++i) {
					var error = $root.conversation.FavContact.verify(
						message.favouritePeople[i]
					);
					if (error) return "favouritePeople." + error;
				}
			}
			return null;
		};

		/**
		 * Creates a FavouritesResponse message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof conversation.FavouritesResponse
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {conversation.FavouritesResponse} FavouritesResponse
		 */
		FavouritesResponse.fromObject = function fromObject(object) {
			if (object instanceof $root.conversation.FavouritesResponse)
				return object;
			var message = new $root.conversation.FavouritesResponse();
			if (object.favourites) {
				if (!Array.isArray(object.favourites))
					throw TypeError(
						".conversation.FavouritesResponse.favourites: array expected"
					);
				message.favourites = [];
				for (var i = 0; i < object.favourites.length; ++i) {
					if (typeof object.favourites[i] !== "object")
						throw TypeError(
							".conversation.FavouritesResponse.favourites: object expected"
						);
					message.favourites[i] =
						$root.conversation.TimelineConversation.fromObject(
							object.favourites[i]
						);
				}
			}
			if (object.favouritePeople) {
				if (!Array.isArray(object.favouritePeople))
					throw TypeError(
						".conversation.FavouritesResponse.favouritePeople: array expected"
					);
				message.favouritePeople = [];
				for (var i = 0; i < object.favouritePeople.length; ++i) {
					if (typeof object.favouritePeople[i] !== "object")
						throw TypeError(
							".conversation.FavouritesResponse.favouritePeople: object expected"
						);
					message.favouritePeople[i] = $root.conversation.FavContact.fromObject(
						object.favouritePeople[i]
					);
				}
			}
			return message;
		};

		/**
		 * Creates a plain object from a FavouritesResponse message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof conversation.FavouritesResponse
		 * @static
		 * @param {conversation.FavouritesResponse} message FavouritesResponse
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		FavouritesResponse.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.arrays || options.defaults) {
				object.favourites = [];
				object.favouritePeople = [];
			}
			if (message.favourites && message.favourites.length) {
				object.favourites = [];
				for (var j = 0; j < message.favourites.length; ++j)
					object.favourites[j] =
						$root.conversation.TimelineConversation.toObject(
							message.favourites[j],
							options
						);
			}
			if (message.favouritePeople && message.favouritePeople.length) {
				object.favouritePeople = [];
				for (var j = 0; j < message.favouritePeople.length; ++j)
					object.favouritePeople[j] = $root.conversation.FavContact.toObject(
						message.favouritePeople[j],
						options
					);
			}
			return object;
		};

		/**
		 * Converts this FavouritesResponse to JSON.
		 * @function toJSON
		 * @memberof conversation.FavouritesResponse
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		FavouritesResponse.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return FavouritesResponse;
	})();

	conversation.MessageStatusInput = (function () {
		/**
		 * Properties of a MessageStatusInput.
		 * @memberof conversation
		 * @interface IMessageStatusInput
		 * @property {Array.<string>|null} [messageIds] MessageStatusInput messageIds
		 * @property {string|null} [userDomain] MessageStatusInput userDomain
		 * @property {string|null} [conversationId] MessageStatusInput conversationId
		 * @property {string|null} [action] MessageStatusInput action
		 */

		/**
		 * Constructs a new MessageStatusInput.
		 * @memberof conversation
		 * @classdesc Represents a MessageStatusInput.
		 * @implements IMessageStatusInput
		 * @constructor
		 * @param {conversation.IMessageStatusInput=} [properties] Properties to set
		 */
		function MessageStatusInput(properties) {
			this.messageIds = [];
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * MessageStatusInput messageIds.
		 * @member {Array.<string>} messageIds
		 * @memberof conversation.MessageStatusInput
		 * @instance
		 */
		MessageStatusInput.prototype.messageIds = $util.emptyArray;

		/**
		 * MessageStatusInput userDomain.
		 * @member {string} userDomain
		 * @memberof conversation.MessageStatusInput
		 * @instance
		 */
		MessageStatusInput.prototype.userDomain = "";

		/**
		 * MessageStatusInput conversationId.
		 * @member {string} conversationId
		 * @memberof conversation.MessageStatusInput
		 * @instance
		 */
		MessageStatusInput.prototype.conversationId = "";

		/**
		 * MessageStatusInput action.
		 * @member {string} action
		 * @memberof conversation.MessageStatusInput
		 * @instance
		 */
		MessageStatusInput.prototype.action = "";

		/**
		 * Creates a new MessageStatusInput instance using the specified properties.
		 * @function create
		 * @memberof conversation.MessageStatusInput
		 * @static
		 * @param {conversation.IMessageStatusInput=} [properties] Properties to set
		 * @returns {conversation.MessageStatusInput} MessageStatusInput instance
		 */
		MessageStatusInput.create = function create(properties) {
			return new MessageStatusInput(properties);
		};

		/**
		 * Encodes the specified MessageStatusInput message. Does not implicitly {@link conversation.MessageStatusInput.verify|verify} messages.
		 * @function encode
		 * @memberof conversation.MessageStatusInput
		 * @static
		 * @param {conversation.IMessageStatusInput} message MessageStatusInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		MessageStatusInput.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.messageIds !== null && message.messageIds.length)
				for (var i = 0; i < message.messageIds.length; ++i)
					writer
						.uint32(/* id 1, wireType 2 =*/ 10)
						.string(message.messageIds[i]);
			if (
				message.userDomain !== null &&
				Object.hasOwnProperty.call(message, "userDomain")
			)
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.userDomain);
			if (
				message.conversationId !== null &&
				Object.hasOwnProperty.call(message, "conversationId")
			)
				writer
					.uint32(/* id 3, wireType 2 =*/ 26)
					.string(message.conversationId);
			if (
				message.action !== null &&
				Object.hasOwnProperty.call(message, "action")
			)
				writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.action);
			return writer;
		};

		/**
		 * Encodes the specified MessageStatusInput message, length delimited. Does not implicitly {@link conversation.MessageStatusInput.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof conversation.MessageStatusInput
		 * @static
		 * @param {conversation.IMessageStatusInput} message MessageStatusInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		MessageStatusInput.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a MessageStatusInput message from the specified reader or buffer.
		 * @function decode
		 * @memberof conversation.MessageStatusInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {conversation.MessageStatusInput} MessageStatusInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		MessageStatusInput.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.conversation.MessageStatusInput();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						if (!(message.messageIds && message.messageIds.length))
							message.messageIds = [];
						message.messageIds.push(reader.string());
						break;
					case 2:
						message.userDomain = reader.string();
						break;
					case 3:
						message.conversationId = reader.string();
						break;
					case 4:
						message.action = reader.string();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a MessageStatusInput message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof conversation.MessageStatusInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {conversation.MessageStatusInput} MessageStatusInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		MessageStatusInput.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a MessageStatusInput message.
		 * @function verify
		 * @memberof conversation.MessageStatusInput
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		MessageStatusInput.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.messageIds !== null && message.hasOwnProperty("messageIds")) {
				if (!Array.isArray(message.messageIds))
					return "messageIds: array expected";
				for (var i = 0; i < message.messageIds.length; ++i)
					if (!$util.isString(message.messageIds[i]))
						return "messageIds: string[] expected";
			}
			if (message.userDomain !== null && message.hasOwnProperty("userDomain"))
				if (!$util.isString(message.userDomain))
					return "userDomain: string expected";
			if (
				message.conversationId !== null &&
				message.hasOwnProperty("conversationId")
			)
				if (!$util.isString(message.conversationId))
					return "conversationId: string expected";
			if (message.action !== null && message.hasOwnProperty("action"))
				if (!$util.isString(message.action)) return "action: string expected";
			return null;
		};

		/**
		 * Creates a MessageStatusInput message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof conversation.MessageStatusInput
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {conversation.MessageStatusInput} MessageStatusInput
		 */
		MessageStatusInput.fromObject = function fromObject(object) {
			if (object instanceof $root.conversation.MessageStatusInput)
				return object;
			var message = new $root.conversation.MessageStatusInput();
			if (object.messageIds) {
				if (!Array.isArray(object.messageIds))
					throw TypeError(
						".conversation.MessageStatusInput.messageIds: array expected"
					);
				message.messageIds = [];
				for (var i = 0; i < object.messageIds.length; ++i)
					message.messageIds[i] = String(object.messageIds[i]);
			}
			if (object.userDomain !== null)
				message.userDomain = String(object.userDomain);
			if (object.conversationId !== null)
				message.conversationId = String(object.conversationId);
			if (object.action !== null) message.action = String(object.action);
			return message;
		};

		/**
		 * Creates a plain object from a MessageStatusInput message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof conversation.MessageStatusInput
		 * @static
		 * @param {conversation.MessageStatusInput} message MessageStatusInput
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		MessageStatusInput.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.arrays || options.defaults) object.messageIds = [];
			if (options.defaults) {
				object.userDomain = "";
				object.conversationId = "";
				object.action = "";
			}
			if (message.messageIds && message.messageIds.length) {
				object.messageIds = [];
				for (var j = 0; j < message.messageIds.length; ++j)
					object.messageIds[j] = message.messageIds[j];
			}
			if (message.userDomain !== null && message.hasOwnProperty("userDomain"))
				object.userDomain = message.userDomain;
			if (
				message.conversationId !== null &&
				message.hasOwnProperty("conversationId")
			)
				object.conversationId = message.conversationId;
			if (message.action !== null && message.hasOwnProperty("action"))
				object.action = message.action;
			return object;
		};

		/**
		 * Converts this MessageStatusInput to JSON.
		 * @function toJSON
		 * @memberof conversation.MessageStatusInput
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		MessageStatusInput.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return MessageStatusInput;
	})();

	conversation.MessageStatusResponse = (function () {
		/**
		 * Properties of a MessageStatusResponse.
		 * @memberof conversation
		 * @interface IMessageStatusResponse
		 * @property {boolean|null} [success] MessageStatusResponse success
		 * @property {string|null} [message] MessageStatusResponse message
		 */

		/**
		 * Constructs a new MessageStatusResponse.
		 * @memberof conversation
		 * @classdesc Represents a MessageStatusResponse.
		 * @implements IMessageStatusResponse
		 * @constructor
		 * @param {conversation.IMessageStatusResponse=} [properties] Properties to set
		 */
		function MessageStatusResponse(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * MessageStatusResponse success.
		 * @member {boolean} success
		 * @memberof conversation.MessageStatusResponse
		 * @instance
		 */
		MessageStatusResponse.prototype.success = false;

		/**
		 * MessageStatusResponse message.
		 * @member {string} message
		 * @memberof conversation.MessageStatusResponse
		 * @instance
		 */
		MessageStatusResponse.prototype.message = "";

		/**
		 * Creates a new MessageStatusResponse instance using the specified properties.
		 * @function create
		 * @memberof conversation.MessageStatusResponse
		 * @static
		 * @param {conversation.IMessageStatusResponse=} [properties] Properties to set
		 * @returns {conversation.MessageStatusResponse} MessageStatusResponse instance
		 */
		MessageStatusResponse.create = function create(properties) {
			return new MessageStatusResponse(properties);
		};

		/**
		 * Encodes the specified MessageStatusResponse message. Does not implicitly {@link conversation.MessageStatusResponse.verify|verify} messages.
		 * @function encode
		 * @memberof conversation.MessageStatusResponse
		 * @static
		 * @param {conversation.IMessageStatusResponse} message MessageStatusResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		MessageStatusResponse.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.success !== null &&
				Object.hasOwnProperty.call(message, "success")
			)
				writer.uint32(/* id 1, wireType 0 =*/ 8).bool(message.success);
			if (
				message.message !== null &&
				Object.hasOwnProperty.call(message, "message")
			)
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.message);
			return writer;
		};

		/**
		 * Encodes the specified MessageStatusResponse message, length delimited. Does not implicitly {@link conversation.MessageStatusResponse.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof conversation.MessageStatusResponse
		 * @static
		 * @param {conversation.IMessageStatusResponse} message MessageStatusResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		MessageStatusResponse.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a MessageStatusResponse message from the specified reader or buffer.
		 * @function decode
		 * @memberof conversation.MessageStatusResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {conversation.MessageStatusResponse} MessageStatusResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		MessageStatusResponse.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.conversation.MessageStatusResponse();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.success = reader.bool();
						break;
					case 2:
						message.message = reader.string();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a MessageStatusResponse message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof conversation.MessageStatusResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {conversation.MessageStatusResponse} MessageStatusResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		MessageStatusResponse.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a MessageStatusResponse message.
		 * @function verify
		 * @memberof conversation.MessageStatusResponse
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		MessageStatusResponse.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.success !== null && message.hasOwnProperty("success"))
				if (typeof message.success !== "boolean")
					return "success: boolean expected";
			if (message.message !== null && message.hasOwnProperty("message"))
				if (!$util.isString(message.message)) return "message: string expected";
			return null;
		};

		/**
		 * Creates a MessageStatusResponse message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof conversation.MessageStatusResponse
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {conversation.MessageStatusResponse} MessageStatusResponse
		 */
		MessageStatusResponse.fromObject = function fromObject(object) {
			if (object instanceof $root.conversation.MessageStatusResponse)
				return object;
			var message = new $root.conversation.MessageStatusResponse();
			if (object.success !== null) message.success = Boolean(object.success);
			if (object.message !== null) message.message = String(object.message);
			return message;
		};

		/**
		 * Creates a plain object from a MessageStatusResponse message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof conversation.MessageStatusResponse
		 * @static
		 * @param {conversation.MessageStatusResponse} message MessageStatusResponse
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		MessageStatusResponse.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.success = false;
				object.message = "";
			}
			if (message.success !== null && message.hasOwnProperty("success"))
				object.success = message.success;
			if (message.message !== null && message.hasOwnProperty("message"))
				object.message = message.message;
			return object;
		};

		/**
		 * Converts this MessageStatusResponse to JSON.
		 * @function toJSON
		 * @memberof conversation.MessageStatusResponse
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		MessageStatusResponse.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return MessageStatusResponse;
	})();

	return conversation;
})();

$root.commonmessages = (function () {
	/**
	 * Namespace commonmessages.
	 * @exports commonmessages
	 * @namespace
	 */
	var commonmessages = {};

	commonmessages.Empty = (function () {
		/**
		 * Properties of an Empty.
		 * @memberof commonmessages
		 * @interface IEmpty
		 */

		/**
		 * Constructs a new Empty.
		 * @memberof commonmessages
		 * @classdesc Represents an Empty.
		 * @implements IEmpty
		 * @constructor
		 * @param {commonmessages.IEmpty=} [properties] Properties to set
		 */
		function Empty(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * Creates a new Empty instance using the specified properties.
		 * @function create
		 * @memberof commonmessages.Empty
		 * @static
		 * @param {commonmessages.IEmpty=} [properties] Properties to set
		 * @returns {commonmessages.Empty} Empty instance
		 */
		Empty.create = function create(properties) {
			return new Empty(properties);
		};

		/**
		 * Encodes the specified Empty message. Does not implicitly {@link commonmessages.Empty.verify|verify} messages.
		 * @function encode
		 * @memberof commonmessages.Empty
		 * @static
		 * @param {commonmessages.IEmpty} message Empty message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		Empty.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			return writer;
		};

		/**
		 * Encodes the specified Empty message, length delimited. Does not implicitly {@link commonmessages.Empty.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof commonmessages.Empty
		 * @static
		 * @param {commonmessages.IEmpty} message Empty message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		Empty.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes an Empty message from the specified reader or buffer.
		 * @function decode
		 * @memberof commonmessages.Empty
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {commonmessages.Empty} Empty
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		Empty.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.commonmessages.Empty();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes an Empty message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof commonmessages.Empty
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {commonmessages.Empty} Empty
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		Empty.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies an Empty message.
		 * @function verify
		 * @memberof commonmessages.Empty
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		Empty.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			return null;
		};

		/**
		 * Creates an Empty message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof commonmessages.Empty
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {commonmessages.Empty} Empty
		 */
		Empty.fromObject = function fromObject(object) {
			if (object instanceof $root.commonmessages.Empty) return object;
			return new $root.commonmessages.Empty();
		};

		/**
		 * Creates a plain object from an Empty message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof commonmessages.Empty
		 * @static
		 * @param {commonmessages.Empty} message Empty
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		Empty.toObject = function toObject() {
			return {};
		};

		/**
		 * Converts this Empty to JSON.
		 * @function toJSON
		 * @memberof commonmessages.Empty
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		Empty.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return Empty;
	})();

	commonmessages.PhoneNumbers = (function () {
		/**
		 * Properties of a PhoneNumbers.
		 * @memberof commonmessages
		 * @interface IPhoneNumbers
		 * @property {string|null} [satellite] PhoneNumbers satellite
		 * @property {string|null} [land] PhoneNumbers land
		 * @property {string|null} [mobile] PhoneNumbers mobile
		 */

		/**
		 * Constructs a new PhoneNumbers.
		 * @memberof commonmessages
		 * @classdesc Represents a PhoneNumbers.
		 * @implements IPhoneNumbers
		 * @constructor
		 * @param {commonmessages.IPhoneNumbers=} [properties] Properties to set
		 */
		function PhoneNumbers(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * PhoneNumbers satellite.
		 * @member {string} satellite
		 * @memberof commonmessages.PhoneNumbers
		 * @instance
		 */
		PhoneNumbers.prototype.satellite = "";

		/**
		 * PhoneNumbers land.
		 * @member {string} land
		 * @memberof commonmessages.PhoneNumbers
		 * @instance
		 */
		PhoneNumbers.prototype.land = "";

		/**
		 * PhoneNumbers mobile.
		 * @member {string} mobile
		 * @memberof commonmessages.PhoneNumbers
		 * @instance
		 */
		PhoneNumbers.prototype.mobile = "";

		/**
		 * Creates a new PhoneNumbers instance using the specified properties.
		 * @function create
		 * @memberof commonmessages.PhoneNumbers
		 * @static
		 * @param {commonmessages.IPhoneNumbers=} [properties] Properties to set
		 * @returns {commonmessages.PhoneNumbers} PhoneNumbers instance
		 */
		PhoneNumbers.create = function create(properties) {
			return new PhoneNumbers(properties);
		};

		/**
		 * Encodes the specified PhoneNumbers message. Does not implicitly {@link commonmessages.PhoneNumbers.verify|verify} messages.
		 * @function encode
		 * @memberof commonmessages.PhoneNumbers
		 * @static
		 * @param {commonmessages.IPhoneNumbers} message PhoneNumbers message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		PhoneNumbers.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.satellite !== null &&
				Object.hasOwnProperty.call(message, "satellite")
			)
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.satellite);
			if (message.land !== null && Object.hasOwnProperty.call(message, "land"))
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.land);
			if (
				message.mobile !== null &&
				Object.hasOwnProperty.call(message, "mobile")
			)
				writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.mobile);
			return writer;
		};

		/**
		 * Encodes the specified PhoneNumbers message, length delimited. Does not implicitly {@link commonmessages.PhoneNumbers.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof commonmessages.PhoneNumbers
		 * @static
		 * @param {commonmessages.IPhoneNumbers} message PhoneNumbers message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		PhoneNumbers.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a PhoneNumbers message from the specified reader or buffer.
		 * @function decode
		 * @memberof commonmessages.PhoneNumbers
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {commonmessages.PhoneNumbers} PhoneNumbers
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		PhoneNumbers.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.commonmessages.PhoneNumbers();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.satellite = reader.string();
						break;
					case 2:
						message.land = reader.string();
						break;
					case 3:
						message.mobile = reader.string();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a PhoneNumbers message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof commonmessages.PhoneNumbers
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {commonmessages.PhoneNumbers} PhoneNumbers
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		PhoneNumbers.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a PhoneNumbers message.
		 * @function verify
		 * @memberof commonmessages.PhoneNumbers
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		PhoneNumbers.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.satellite !== null && message.hasOwnProperty("satellite"))
				if (!$util.isString(message.satellite))
					return "satellite: string expected";
			if (message.land !== null && message.hasOwnProperty("land"))
				if (!$util.isString(message.land)) return "land: string expected";
			if (message.mobile !== null && message.hasOwnProperty("mobile"))
				if (!$util.isString(message.mobile)) return "mobile: string expected";
			return null;
		};

		/**
		 * Creates a PhoneNumbers message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof commonmessages.PhoneNumbers
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {commonmessages.PhoneNumbers} PhoneNumbers
		 */
		PhoneNumbers.fromObject = function fromObject(object) {
			if (object instanceof $root.commonmessages.PhoneNumbers) return object;
			var message = new $root.commonmessages.PhoneNumbers();
			if (object.satellite !== null)
				message.satellite = String(object.satellite);
			if (object.land !== null) message.land = String(object.land);
			if (object.mobile !== null) message.mobile = String(object.mobile);
			return message;
		};

		/**
		 * Creates a plain object from a PhoneNumbers message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof commonmessages.PhoneNumbers
		 * @static
		 * @param {commonmessages.PhoneNumbers} message PhoneNumbers
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		PhoneNumbers.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.satellite = "";
				object.land = "";
				object.mobile = "";
			}
			if (message.satellite !== null && message.hasOwnProperty("satellite"))
				object.satellite = message.satellite;
			if (message.land !== null && message.hasOwnProperty("land"))
				object.land = message.land;
			if (message.mobile !== null && message.hasOwnProperty("mobile"))
				object.mobile = message.mobile;
			return object;
		};

		/**
		 * Converts this PhoneNumbers to JSON.
		 * @function toJSON
		 * @memberof commonmessages.PhoneNumbers
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		PhoneNumbers.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return PhoneNumbers;
	})();

	commonmessages.DomainRoles = (function () {
		/**
		 * Properties of a DomainRoles.
		 * @memberof commonmessages
		 * @interface IDomainRoles
		 * @property {string|null} [domain] DomainRoles domain
		 * @property {Array.<string>|null} [roles] DomainRoles roles
		 */

		/**
		 * Constructs a new DomainRoles.
		 * @memberof commonmessages
		 * @classdesc Represents a DomainRoles.
		 * @implements IDomainRoles
		 * @constructor
		 * @param {commonmessages.IDomainRoles=} [properties] Properties to set
		 */
		function DomainRoles(properties) {
			this.roles = [];
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * DomainRoles domain.
		 * @member {string} domain
		 * @memberof commonmessages.DomainRoles
		 * @instance
		 */
		DomainRoles.prototype.domain = "";

		/**
		 * DomainRoles roles.
		 * @member {Array.<string>} roles
		 * @memberof commonmessages.DomainRoles
		 * @instance
		 */
		DomainRoles.prototype.roles = $util.emptyArray;

		/**
		 * Creates a new DomainRoles instance using the specified properties.
		 * @function create
		 * @memberof commonmessages.DomainRoles
		 * @static
		 * @param {commonmessages.IDomainRoles=} [properties] Properties to set
		 * @returns {commonmessages.DomainRoles} DomainRoles instance
		 */
		DomainRoles.create = function create(properties) {
			return new DomainRoles(properties);
		};

		/**
		 * Encodes the specified DomainRoles message. Does not implicitly {@link commonmessages.DomainRoles.verify|verify} messages.
		 * @function encode
		 * @memberof commonmessages.DomainRoles
		 * @static
		 * @param {commonmessages.IDomainRoles} message DomainRoles message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		DomainRoles.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.domain !== null &&
				Object.hasOwnProperty.call(message, "domain")
			)
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.domain);
			if (message.roles !== null && message.roles.length)
				for (var i = 0; i < message.roles.length; ++i)
					writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.roles[i]);
			return writer;
		};

		/**
		 * Encodes the specified DomainRoles message, length delimited. Does not implicitly {@link commonmessages.DomainRoles.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof commonmessages.DomainRoles
		 * @static
		 * @param {commonmessages.IDomainRoles} message DomainRoles message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		DomainRoles.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a DomainRoles message from the specified reader or buffer.
		 * @function decode
		 * @memberof commonmessages.DomainRoles
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {commonmessages.DomainRoles} DomainRoles
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		DomainRoles.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.commonmessages.DomainRoles();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.domain = reader.string();
						break;
					case 2:
						if (!(message.roles && message.roles.length)) message.roles = [];
						message.roles.push(reader.string());
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a DomainRoles message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof commonmessages.DomainRoles
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {commonmessages.DomainRoles} DomainRoles
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		DomainRoles.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a DomainRoles message.
		 * @function verify
		 * @memberof commonmessages.DomainRoles
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		DomainRoles.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.domain !== null && message.hasOwnProperty("domain"))
				if (!$util.isString(message.domain)) return "domain: string expected";
			if (message.roles !== null && message.hasOwnProperty("roles")) {
				if (!Array.isArray(message.roles)) return "roles: array expected";
				for (var i = 0; i < message.roles.length; ++i)
					if (!$util.isString(message.roles[i]))
						return "roles: string[] expected";
			}
			return null;
		};

		/**
		 * Creates a DomainRoles message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof commonmessages.DomainRoles
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {commonmessages.DomainRoles} DomainRoles
		 */
		DomainRoles.fromObject = function fromObject(object) {
			if (object instanceof $root.commonmessages.DomainRoles) return object;
			var message = new $root.commonmessages.DomainRoles();
			if (object.domain !== null) message.domain = String(object.domain);
			if (object.roles) {
				if (!Array.isArray(object.roles))
					throw TypeError(".commonmessages.DomainRoles.roles: array expected");
				message.roles = [];
				for (var i = 0; i < object.roles.length; ++i)
					message.roles[i] = String(object.roles[i]);
			}
			return message;
		};

		/**
		 * Creates a plain object from a DomainRoles message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof commonmessages.DomainRoles
		 * @static
		 * @param {commonmessages.DomainRoles} message DomainRoles
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		DomainRoles.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.arrays || options.defaults) object.roles = [];
			if (options.defaults) object.domain = "";
			if (message.domain !== null && message.hasOwnProperty("domain"))
				object.domain = message.domain;
			if (message.roles && message.roles.length) {
				object.roles = [];
				for (var j = 0; j < message.roles.length; ++j)
					object.roles[j] = message.roles[j];
			}
			return object;
		};

		/**
		 * Converts this DomainRoles to JSON.
		 * @function toJSON
		 * @memberof commonmessages.DomainRoles
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		DomainRoles.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return DomainRoles;
	})();

	commonmessages.EmailAddresses = (function () {
		/**
		 * Properties of an EmailAddresses.
		 * @memberof commonmessages
		 * @interface IEmailAddresses
		 * @property {string|null} [home] EmailAddresses home
		 * @property {string|null} [work] EmailAddresses work
		 */

		/**
		 * Constructs a new EmailAddresses.
		 * @memberof commonmessages
		 * @classdesc Represents an EmailAddresses.
		 * @implements IEmailAddresses
		 * @constructor
		 * @param {commonmessages.IEmailAddresses=} [properties] Properties to set
		 */
		function EmailAddresses(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * EmailAddresses home.
		 * @member {string} home
		 * @memberof commonmessages.EmailAddresses
		 * @instance
		 */
		EmailAddresses.prototype.home = "";

		/**
		 * EmailAddresses work.
		 * @member {string} work
		 * @memberof commonmessages.EmailAddresses
		 * @instance
		 */
		EmailAddresses.prototype.work = "";

		/**
		 * Creates a new EmailAddresses instance using the specified properties.
		 * @function create
		 * @memberof commonmessages.EmailAddresses
		 * @static
		 * @param {commonmessages.IEmailAddresses=} [properties] Properties to set
		 * @returns {commonmessages.EmailAddresses} EmailAddresses instance
		 */
		EmailAddresses.create = function create(properties) {
			return new EmailAddresses(properties);
		};

		/**
		 * Encodes the specified EmailAddresses message. Does not implicitly {@link commonmessages.EmailAddresses.verify|verify} messages.
		 * @function encode
		 * @memberof commonmessages.EmailAddresses
		 * @static
		 * @param {commonmessages.IEmailAddresses} message EmailAddresses message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		EmailAddresses.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.home !== null && Object.hasOwnProperty.call(message, "home"))
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.home);
			if (message.work !== null && Object.hasOwnProperty.call(message, "work"))
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.work);
			return writer;
		};

		/**
		 * Encodes the specified EmailAddresses message, length delimited. Does not implicitly {@link commonmessages.EmailAddresses.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof commonmessages.EmailAddresses
		 * @static
		 * @param {commonmessages.IEmailAddresses} message EmailAddresses message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		EmailAddresses.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes an EmailAddresses message from the specified reader or buffer.
		 * @function decode
		 * @memberof commonmessages.EmailAddresses
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {commonmessages.EmailAddresses} EmailAddresses
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		EmailAddresses.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.commonmessages.EmailAddresses();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.home = reader.string();
						break;
					case 2:
						message.work = reader.string();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes an EmailAddresses message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof commonmessages.EmailAddresses
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {commonmessages.EmailAddresses} EmailAddresses
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		EmailAddresses.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies an EmailAddresses message.
		 * @function verify
		 * @memberof commonmessages.EmailAddresses
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		EmailAddresses.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.home !== null && message.hasOwnProperty("home"))
				if (!$util.isString(message.home)) return "home: string expected";
			if (message.work !== null && message.hasOwnProperty("work"))
				if (!$util.isString(message.work)) return "work: string expected";
			return null;
		};

		/**
		 * Creates an EmailAddresses message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof commonmessages.EmailAddresses
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {commonmessages.EmailAddresses} EmailAddresses
		 */
		EmailAddresses.fromObject = function fromObject(object) {
			if (object instanceof $root.commonmessages.EmailAddresses) return object;
			var message = new $root.commonmessages.EmailAddresses();
			if (object.home !== null) message.home = String(object.home);
			if (object.work !== null) message.work = String(object.work);
			return message;
		};

		/**
		 * Creates a plain object from an EmailAddresses message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof commonmessages.EmailAddresses
		 * @static
		 * @param {commonmessages.EmailAddresses} message EmailAddresses
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		EmailAddresses.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.home = "";
				object.work = "";
			}
			if (message.home !== null && message.hasOwnProperty("home"))
				object.home = message.home;
			if (message.work !== null && message.hasOwnProperty("work"))
				object.work = message.work;
			return object;
		};

		/**
		 * Converts this EmailAddresses to JSON.
		 * @function toJSON
		 * @memberof commonmessages.EmailAddresses
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		EmailAddresses.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return EmailAddresses;
	})();

	commonmessages.LocalContact = (function () {
		/**
		 * Properties of a LocalContact.
		 * @memberof commonmessages
		 * @interface ILocalContact
		 * @property {string|null} [userName] LocalContact userName
		 * @property {commonmessages.IEmailAddresses|null} [emailAddresses] LocalContact emailAddresses
		 * @property {commonmessages.IPhoneNumbers|null} [phoneNumbers] LocalContact phoneNumbers
		 * @property {string|null} [userId] LocalContact userId
		 */

		/**
		 * Constructs a new LocalContact.
		 * @memberof commonmessages
		 * @classdesc Represents a LocalContact.
		 * @implements ILocalContact
		 * @constructor
		 * @param {commonmessages.ILocalContact=} [properties] Properties to set
		 */
		function LocalContact(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * LocalContact userName.
		 * @member {string} userName
		 * @memberof commonmessages.LocalContact
		 * @instance
		 */
		LocalContact.prototype.userName = "";

		/**
		 * LocalContact emailAddresses.
		 * @member {commonmessages.IEmailAddresses|null|undefined} emailAddresses
		 * @memberof commonmessages.LocalContact
		 * @instance
		 */
		LocalContact.prototype.emailAddresses = null;

		/**
		 * LocalContact phoneNumbers.
		 * @member {commonmessages.IPhoneNumbers|null|undefined} phoneNumbers
		 * @memberof commonmessages.LocalContact
		 * @instance
		 */
		LocalContact.prototype.phoneNumbers = null;

		/**
		 * LocalContact userId.
		 * @member {string} userId
		 * @memberof commonmessages.LocalContact
		 * @instance
		 */
		LocalContact.prototype.userId = "";

		/**
		 * Creates a new LocalContact instance using the specified properties.
		 * @function create
		 * @memberof commonmessages.LocalContact
		 * @static
		 * @param {commonmessages.ILocalContact=} [properties] Properties to set
		 * @returns {commonmessages.LocalContact} LocalContact instance
		 */
		LocalContact.create = function create(properties) {
			return new LocalContact(properties);
		};

		/**
		 * Encodes the specified LocalContact message. Does not implicitly {@link commonmessages.LocalContact.verify|verify} messages.
		 * @function encode
		 * @memberof commonmessages.LocalContact
		 * @static
		 * @param {commonmessages.ILocalContact} message LocalContact message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		LocalContact.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.userName !== null &&
				Object.hasOwnProperty.call(message, "userName")
			)
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.userName);
			if (
				message.emailAddresses !== null &&
				Object.hasOwnProperty.call(message, "emailAddresses")
			)
				$root.commonmessages.EmailAddresses.encode(
					message.emailAddresses,
					writer.uint32(/* id 2, wireType 2 =*/ 18).fork()
				).ldelim();
			if (
				message.phoneNumbers !== null &&
				Object.hasOwnProperty.call(message, "phoneNumbers")
			)
				$root.commonmessages.PhoneNumbers.encode(
					message.phoneNumbers,
					writer.uint32(/* id 3, wireType 2 =*/ 26).fork()
				).ldelim();
			if (
				message.userId !== null &&
				Object.hasOwnProperty.call(message, "userId")
			)
				writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.userId);
			return writer;
		};

		/**
		 * Encodes the specified LocalContact message, length delimited. Does not implicitly {@link commonmessages.LocalContact.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof commonmessages.LocalContact
		 * @static
		 * @param {commonmessages.ILocalContact} message LocalContact message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		LocalContact.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a LocalContact message from the specified reader or buffer.
		 * @function decode
		 * @memberof commonmessages.LocalContact
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {commonmessages.LocalContact} LocalContact
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		LocalContact.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.commonmessages.LocalContact();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.userName = reader.string();
						break;
					case 2:
						message.emailAddresses = $root.commonmessages.EmailAddresses.decode(
							reader,
							reader.uint32()
						);
						break;
					case 3:
						message.phoneNumbers = $root.commonmessages.PhoneNumbers.decode(
							reader,
							reader.uint32()
						);
						break;
					case 4:
						message.userId = reader.string();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a LocalContact message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof commonmessages.LocalContact
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {commonmessages.LocalContact} LocalContact
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		LocalContact.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a LocalContact message.
		 * @function verify
		 * @memberof commonmessages.LocalContact
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		LocalContact.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.userName !== null && message.hasOwnProperty("userName"))
				if (!$util.isString(message.userName))
					return "userName: string expected";
			if (
				message.emailAddresses !== null &&
				message.hasOwnProperty("emailAddresses")
			) {
				var error = $root.commonmessages.EmailAddresses.verify(
					message.emailAddresses
				);
				if (error) return "emailAddresses." + error;
			}
			if (
				message.phoneNumbers !== null &&
				message.hasOwnProperty("phoneNumbers")
			) {
				var error = $root.commonmessages.PhoneNumbers.verify(
					message.phoneNumbers
				);
				if (error) return "phoneNumbers." + error;
			}
			if (message.userId !== null && message.hasOwnProperty("userId"))
				if (!$util.isString(message.userId)) return "userId: string expected";
			return null;
		};

		/**
		 * Creates a LocalContact message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof commonmessages.LocalContact
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {commonmessages.LocalContact} LocalContact
		 */
		LocalContact.fromObject = function fromObject(object) {
			if (object instanceof $root.commonmessages.LocalContact) return object;
			var message = new $root.commonmessages.LocalContact();
			if (object.userName !== null) message.userName = String(object.userName);
			if (object.emailAddresses !== null) {
				if (typeof object.emailAddresses !== "object")
					throw TypeError(
						".commonmessages.LocalContact.emailAddresses: object expected"
					);
				message.emailAddresses = $root.commonmessages.EmailAddresses.fromObject(
					object.emailAddresses
				);
			}
			if (object.phoneNumbers !== null) {
				if (typeof object.phoneNumbers !== "object")
					throw TypeError(
						".commonmessages.LocalContact.phoneNumbers: object expected"
					);
				message.phoneNumbers = $root.commonmessages.PhoneNumbers.fromObject(
					object.phoneNumbers
				);
			}
			if (object.userId !== null) message.userId = String(object.userId);
			return message;
		};

		/**
		 * Creates a plain object from a LocalContact message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof commonmessages.LocalContact
		 * @static
		 * @param {commonmessages.LocalContact} message LocalContact
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		LocalContact.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.userName = "";
				object.emailAddresses = null;
				object.phoneNumbers = null;
				object.userId = "";
			}
			if (message.userName !== null && message.hasOwnProperty("userName"))
				object.userName = message.userName;
			if (
				message.emailAddresses !== null &&
				message.hasOwnProperty("emailAddresses")
			)
				object.emailAddresses = $root.commonmessages.EmailAddresses.toObject(
					message.emailAddresses,
					options
				);
			if (
				message.phoneNumbers !== null &&
				message.hasOwnProperty("phoneNumbers")
			)
				object.phoneNumbers = $root.commonmessages.PhoneNumbers.toObject(
					message.phoneNumbers,
					options
				);
			if (message.userId !== null && message.hasOwnProperty("userId"))
				object.userId = message.userId;
			return object;
		};

		/**
		 * Converts this LocalContact to JSON.
		 * @function toJSON
		 * @memberof commonmessages.LocalContact
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		LocalContact.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return LocalContact;
	})();

	commonmessages.UserAddress = (function () {
		/**
		 * Properties of a UserAddress.
		 * @memberof commonmessages
		 * @interface IUserAddress
		 * @property {string|null} [addressLine1] UserAddress addressLine1
		 * @property {string|null} [addressLine2] UserAddress addressLine2
		 * @property {string|null} [city] UserAddress city
		 * @property {string|null} [state] UserAddress state
		 * @property {string|null} [country] UserAddress country
		 * @property {string|null} [postCode] UserAddress postCode
		 */

		/**
		 * Constructs a new UserAddress.
		 * @memberof commonmessages
		 * @classdesc Represents a UserAddress.
		 * @implements IUserAddress
		 * @constructor
		 * @param {commonmessages.IUserAddress=} [properties] Properties to set
		 */
		function UserAddress(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * UserAddress addressLine1.
		 * @member {string} addressLine1
		 * @memberof commonmessages.UserAddress
		 * @instance
		 */
		UserAddress.prototype.addressLine1 = "";

		/**
		 * UserAddress addressLine2.
		 * @member {string} addressLine2
		 * @memberof commonmessages.UserAddress
		 * @instance
		 */
		UserAddress.prototype.addressLine2 = "";

		/**
		 * UserAddress city.
		 * @member {string} city
		 * @memberof commonmessages.UserAddress
		 * @instance
		 */
		UserAddress.prototype.city = "";

		/**
		 * UserAddress state.
		 * @member {string} state
		 * @memberof commonmessages.UserAddress
		 * @instance
		 */
		UserAddress.prototype.state = "";

		/**
		 * UserAddress country.
		 * @member {string} country
		 * @memberof commonmessages.UserAddress
		 * @instance
		 */
		UserAddress.prototype.country = "";

		/**
		 * UserAddress postCode.
		 * @member {string} postCode
		 * @memberof commonmessages.UserAddress
		 * @instance
		 */
		UserAddress.prototype.postCode = "";

		/**
		 * Creates a new UserAddress instance using the specified properties.
		 * @function create
		 * @memberof commonmessages.UserAddress
		 * @static
		 * @param {commonmessages.IUserAddress=} [properties] Properties to set
		 * @returns {commonmessages.UserAddress} UserAddress instance
		 */
		UserAddress.create = function create(properties) {
			return new UserAddress(properties);
		};

		/**
		 * Encodes the specified UserAddress message. Does not implicitly {@link commonmessages.UserAddress.verify|verify} messages.
		 * @function encode
		 * @memberof commonmessages.UserAddress
		 * @static
		 * @param {commonmessages.IUserAddress} message UserAddress message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		UserAddress.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.addressLine1 !== null &&
				Object.hasOwnProperty.call(message, "addressLine1")
			)
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.addressLine1);
			if (
				message.addressLine2 !== null &&
				Object.hasOwnProperty.call(message, "addressLine2")
			)
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.addressLine2);
			if (message.city !== null && Object.hasOwnProperty.call(message, "city"))
				writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.city);
			if (
				message.state !== null &&
				Object.hasOwnProperty.call(message, "state")
			)
				writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.state);
			if (
				message.country !== null &&
				Object.hasOwnProperty.call(message, "country")
			)
				writer.uint32(/* id 5, wireType 2 =*/ 42).string(message.country);
			if (
				message.postCode !== null &&
				Object.hasOwnProperty.call(message, "postCode")
			)
				writer.uint32(/* id 6, wireType 2 =*/ 50).string(message.postCode);
			return writer;
		};

		/**
		 * Encodes the specified UserAddress message, length delimited. Does not implicitly {@link commonmessages.UserAddress.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof commonmessages.UserAddress
		 * @static
		 * @param {commonmessages.IUserAddress} message UserAddress message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		UserAddress.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a UserAddress message from the specified reader or buffer.
		 * @function decode
		 * @memberof commonmessages.UserAddress
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {commonmessages.UserAddress} UserAddress
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		UserAddress.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.commonmessages.UserAddress();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.addressLine1 = reader.string();
						break;
					case 2:
						message.addressLine2 = reader.string();
						break;
					case 3:
						message.city = reader.string();
						break;
					case 4:
						message.state = reader.string();
						break;
					case 5:
						message.country = reader.string();
						break;
					case 6:
						message.postCode = reader.string();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a UserAddress message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof commonmessages.UserAddress
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {commonmessages.UserAddress} UserAddress
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		UserAddress.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a UserAddress message.
		 * @function verify
		 * @memberof commonmessages.UserAddress
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		UserAddress.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (
				message.addressLine1 !== null &&
				message.hasOwnProperty("addressLine1")
			)
				if (!$util.isString(message.addressLine1))
					return "addressLine1: string expected";
			if (
				message.addressLine2 !== null &&
				message.hasOwnProperty("addressLine2")
			)
				if (!$util.isString(message.addressLine2))
					return "addressLine2: string expected";
			if (message.city !== null && message.hasOwnProperty("city"))
				if (!$util.isString(message.city)) return "city: string expected";
			if (message.state !== null && message.hasOwnProperty("state"))
				if (!$util.isString(message.state)) return "state: string expected";
			if (message.country !== null && message.hasOwnProperty("country"))
				if (!$util.isString(message.country)) return "country: string expected";
			if (message.postCode !== null && message.hasOwnProperty("postCode"))
				if (!$util.isString(message.postCode))
					return "postCode: string expected";
			return null;
		};

		/**
		 * Creates a UserAddress message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof commonmessages.UserAddress
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {commonmessages.UserAddress} UserAddress
		 */
		UserAddress.fromObject = function fromObject(object) {
			if (object instanceof $root.commonmessages.UserAddress) return object;
			var message = new $root.commonmessages.UserAddress();
			if (object.addressLine1 !== null)
				message.addressLine1 = String(object.addressLine1);
			if (object.addressLine2 !== null)
				message.addressLine2 = String(object.addressLine2);
			if (object.city !== null) message.city = String(object.city);
			if (object.state !== null) message.state = String(object.state);
			if (object.country !== null) message.country = String(object.country);
			if (object.postCode !== null) message.postCode = String(object.postCode);
			return message;
		};

		/**
		 * Creates a plain object from a UserAddress message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof commonmessages.UserAddress
		 * @static
		 * @param {commonmessages.UserAddress} message UserAddress
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		UserAddress.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.addressLine1 = "";
				object.addressLine2 = "";
				object.city = "";
				object.state = "";
				object.country = "";
				object.postCode = "";
			}
			if (
				message.addressLine1 !== null &&
				message.hasOwnProperty("addressLine1")
			)
				object.addressLine1 = message.addressLine1;
			if (
				message.addressLine2 !== null &&
				message.hasOwnProperty("addressLine2")
			)
				object.addressLine2 = message.addressLine2;
			if (message.city !== null && message.hasOwnProperty("city"))
				object.city = message.city;
			if (message.state !== null && message.hasOwnProperty("state"))
				object.state = message.state;
			if (message.country !== null && message.hasOwnProperty("country"))
				object.country = message.country;
			if (message.postCode !== null && message.hasOwnProperty("postCode"))
				object.postCode = message.postCode;
			return object;
		};

		/**
		 * Converts this UserAddress to JSON.
		 * @function toJSON
		 * @memberof commonmessages.UserAddress
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		UserAddress.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return UserAddress;
	})();

	commonmessages.SelectedDomainInput = (function () {
		/**
		 * Properties of a SelectedDomainInput.
		 * @memberof commonmessages
		 * @interface ISelectedDomainInput
		 * @property {string|null} [selectedDomain] SelectedDomainInput selectedDomain
		 */

		/**
		 * Constructs a new SelectedDomainInput.
		 * @memberof commonmessages
		 * @classdesc Represents a SelectedDomainInput.
		 * @implements ISelectedDomainInput
		 * @constructor
		 * @param {commonmessages.ISelectedDomainInput=} [properties] Properties to set
		 */
		function SelectedDomainInput(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * SelectedDomainInput selectedDomain.
		 * @member {string} selectedDomain
		 * @memberof commonmessages.SelectedDomainInput
		 * @instance
		 */
		SelectedDomainInput.prototype.selectedDomain = "";

		/**
		 * Creates a new SelectedDomainInput instance using the specified properties.
		 * @function create
		 * @memberof commonmessages.SelectedDomainInput
		 * @static
		 * @param {commonmessages.ISelectedDomainInput=} [properties] Properties to set
		 * @returns {commonmessages.SelectedDomainInput} SelectedDomainInput instance
		 */
		SelectedDomainInput.create = function create(properties) {
			return new SelectedDomainInput(properties);
		};

		/**
		 * Encodes the specified SelectedDomainInput message. Does not implicitly {@link commonmessages.SelectedDomainInput.verify|verify} messages.
		 * @function encode
		 * @memberof commonmessages.SelectedDomainInput
		 * @static
		 * @param {commonmessages.ISelectedDomainInput} message SelectedDomainInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		SelectedDomainInput.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.selectedDomain !== null &&
				Object.hasOwnProperty.call(message, "selectedDomain")
			)
				writer
					.uint32(/* id 1, wireType 2 =*/ 10)
					.string(message.selectedDomain);
			return writer;
		};

		/**
		 * Encodes the specified SelectedDomainInput message, length delimited. Does not implicitly {@link commonmessages.SelectedDomainInput.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof commonmessages.SelectedDomainInput
		 * @static
		 * @param {commonmessages.ISelectedDomainInput} message SelectedDomainInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		SelectedDomainInput.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a SelectedDomainInput message from the specified reader or buffer.
		 * @function decode
		 * @memberof commonmessages.SelectedDomainInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {commonmessages.SelectedDomainInput} SelectedDomainInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		SelectedDomainInput.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.commonmessages.SelectedDomainInput();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.selectedDomain = reader.string();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a SelectedDomainInput message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof commonmessages.SelectedDomainInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {commonmessages.SelectedDomainInput} SelectedDomainInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		SelectedDomainInput.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a SelectedDomainInput message.
		 * @function verify
		 * @memberof commonmessages.SelectedDomainInput
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		SelectedDomainInput.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (
				message.selectedDomain !== null &&
				message.hasOwnProperty("selectedDomain")
			)
				if (!$util.isString(message.selectedDomain))
					return "selectedDomain: string expected";
			return null;
		};

		/**
		 * Creates a SelectedDomainInput message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof commonmessages.SelectedDomainInput
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {commonmessages.SelectedDomainInput} SelectedDomainInput
		 */
		SelectedDomainInput.fromObject = function fromObject(object) {
			if (object instanceof $root.commonmessages.SelectedDomainInput)
				return object;
			var message = new $root.commonmessages.SelectedDomainInput();
			if (object.selectedDomain !== null)
				message.selectedDomain = String(object.selectedDomain);
			return message;
		};

		/**
		 * Creates a plain object from a SelectedDomainInput message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof commonmessages.SelectedDomainInput
		 * @static
		 * @param {commonmessages.SelectedDomainInput} message SelectedDomainInput
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		SelectedDomainInput.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) object.selectedDomain = "";
			if (
				message.selectedDomain !== null &&
				message.hasOwnProperty("selectedDomain")
			)
				object.selectedDomain = message.selectedDomain;
			return object;
		};

		/**
		 * Converts this SelectedDomainInput to JSON.
		 * @function toJSON
		 * @memberof commonmessages.SelectedDomainInput
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		SelectedDomainInput.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return SelectedDomainInput;
	})();

	return commonmessages;
})();

module.exports = $root;
