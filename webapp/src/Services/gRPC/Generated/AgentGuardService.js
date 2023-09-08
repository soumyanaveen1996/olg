/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader,
	$Writer = $protobuf.Writer,
	$util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.agentguard = (function () {
	/**
	 * Namespace agentguard.
	 * @exports agentguard
	 * @namespace
	 */
	var agentguard = {};

	agentguard.AgentGuardService = (function () {
		/**
		 * Constructs a new AgentGuardService service.
		 * @memberof agentguard
		 * @classdesc Represents an AgentGuardService
		 * @extends $protobuf.rpc.Service
		 * @constructor
		 * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
		 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
		 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
		 */
		function AgentGuardService(rpcImpl, requestDelimited, responseDelimited) {
			$protobuf.rpc.Service.call(
				this,
				rpcImpl,
				requestDelimited,
				responseDelimited
			);
		}

		(AgentGuardService.prototype = Object.create(
			$protobuf.rpc.Service.prototype
		)).constructor = AgentGuardService;

		/**
		 * Creates new AgentGuardService service using the specified rpc implementation.
		 * @function create
		 * @memberof agentguard.AgentGuardService
		 * @static
		 * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
		 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
		 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
		 * @returns {AgentGuardService} RPC service. Useful where requests and/or responses are streamed.
		 */
		AgentGuardService.create = function create(
			rpcImpl,
			requestDelimited,
			responseDelimited
		) {
			return new this(rpcImpl, requestDelimited, responseDelimited);
		};

		/**
		 * Callback as used by {@link agentguard.AgentGuardService#execute}.
		 * @memberof agentguard.AgentGuardService
		 * @typedef ExecuteCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {agentguard.AgentGuardStringResponse} [response] AgentGuardStringResponse
		 */

		/**
		 * Calls Execute.
		 * @function execute
		 * @memberof agentguard.AgentGuardService
		 * @instance
		 * @param {agentguard.IAgentGuardInput} request AgentGuardInput message or plain object
		 * @param {agentguard.AgentGuardService.ExecuteCallback} callback Node-style callback called with the error, if any, and AgentGuardStringResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(AgentGuardService.prototype.execute = function execute(
				request,
				callback
			) {
				return this.rpcCall(
					execute,
					$root.agentguard.AgentGuardInput,
					$root.agentguard.AgentGuardStringResponse,
					request,
					callback
				);
			}),
			"name",
			{ value: "Execute" }
		);

		/**
		 * Calls Execute.
		 * @function execute
		 * @memberof agentguard.AgentGuardService
		 * @instance
		 * @param {agentguard.IAgentGuardInput} request AgentGuardInput message or plain object
		 * @returns {Promise<agentguard.AgentGuardStringResponse>} Promise
		 * @variation 2
		 */

		return AgentGuardService;
	})();

	agentguard.AgentGuardInput = (function () {
		/**
		 * Properties of an AgentGuardInput.
		 * @memberof agentguard
		 * @interface IAgentGuardInput
		 * @property {agentguard.IConversation|null} [conversation] AgentGuardInput conversation
		 * @property {string|null} [capability] AgentGuardInput capability
		 * @property {string|null} [parameters] AgentGuardInput parameters
		 * @property {boolean|null} [sync] AgentGuardInput sync
		 * @property {string|null} [requestUuid] AgentGuardInput requestUuid
		 */

		/**
		 * Constructs a new AgentGuardInput.
		 * @memberof agentguard
		 * @classdesc Represents an AgentGuardInput.
		 * @implements IAgentGuardInput
		 * @constructor
		 * @param {agentguard.IAgentGuardInput=} [properties] Properties to set
		 */
		function AgentGuardInput(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * AgentGuardInput conversation.
		 * @member {agentguard.IConversation|null|undefined} conversation
		 * @memberof agentguard.AgentGuardInput
		 * @instance
		 */
		AgentGuardInput.prototype.conversation = null;

		/**
		 * AgentGuardInput capability.
		 * @member {string} capability
		 * @memberof agentguard.AgentGuardInput
		 * @instance
		 */
		AgentGuardInput.prototype.capability = "";

		/**
		 * AgentGuardInput parameters.
		 * @member {string} parameters
		 * @memberof agentguard.AgentGuardInput
		 * @instance
		 */
		AgentGuardInput.prototype.parameters = "";

		/**
		 * AgentGuardInput sync.
		 * @member {boolean} sync
		 * @memberof agentguard.AgentGuardInput
		 * @instance
		 */
		AgentGuardInput.prototype.sync = false;

		/**
		 * AgentGuardInput requestUuid.
		 * @member {string} requestUuid
		 * @memberof agentguard.AgentGuardInput
		 * @instance
		 */
		AgentGuardInput.prototype.requestUuid = "";

		/**
		 * Creates a new AgentGuardInput instance using the specified properties.
		 * @function create
		 * @memberof agentguard.AgentGuardInput
		 * @static
		 * @param {agentguard.IAgentGuardInput=} [properties] Properties to set
		 * @returns {agentguard.AgentGuardInput} AgentGuardInput instance
		 */
		AgentGuardInput.create = function create(properties) {
			return new AgentGuardInput(properties);
		};

		/**
		 * Encodes the specified AgentGuardInput message. Does not implicitly {@link agentguard.AgentGuardInput.verify|verify} messages.
		 * @function encode
		 * @memberof agentguard.AgentGuardInput
		 * @static
		 * @param {agentguard.IAgentGuardInput} message AgentGuardInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		AgentGuardInput.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.conversation !== null &&
				message.hasOwnProperty("conversation")
			)
				$root.agentguard.Conversation.encode(
					message.conversation,
					writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
				).ldelim();
			if (message.capability !== null && message.hasOwnProperty("capability"))
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.capability);
			if (message.parameters !== null && message.hasOwnProperty("parameters"))
				writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.parameters);
			if (message.sync !== null && message.hasOwnProperty("sync"))
				writer.uint32(/* id 4, wireType 0 =*/ 32).bool(message.sync);
			if (message.requestUuid !== null && message.hasOwnProperty("requestUuid"))
				writer.uint32(/* id 5, wireType 2 =*/ 42).string(message.requestUuid);
			return writer;
		};

		/**
		 * Encodes the specified AgentGuardInput message, length delimited. Does not implicitly {@link agentguard.AgentGuardInput.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof agentguard.AgentGuardInput
		 * @static
		 * @param {agentguard.IAgentGuardInput} message AgentGuardInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		AgentGuardInput.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes an AgentGuardInput message from the specified reader or buffer.
		 * @function decode
		 * @memberof agentguard.AgentGuardInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {agentguard.AgentGuardInput} AgentGuardInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		AgentGuardInput.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.agentguard.AgentGuardInput();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.conversation = $root.agentguard.Conversation.decode(
							reader,
							reader.uint32()
						);
						break;
					case 2:
						message.capability = reader.string();
						break;
					case 3:
						message.parameters = reader.string();
						break;
					case 4:
						message.sync = reader.bool();
						break;
					case 5:
						message.requestUuid = reader.string();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes an AgentGuardInput message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof agentguard.AgentGuardInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {agentguard.AgentGuardInput} AgentGuardInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		AgentGuardInput.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies an AgentGuardInput message.
		 * @function verify
		 * @memberof agentguard.AgentGuardInput
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		AgentGuardInput.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (
				message.conversation !== null &&
				message.hasOwnProperty("conversation")
			) {
				var error = $root.agentguard.Conversation.verify(message.conversation);
				if (error) return "conversation." + error;
			}
			if (message.capability !== null && message.hasOwnProperty("capability"))
				if (!$util.isString(message.capability))
					return "capability: string expected";
			if (message.parameters !== null && message.hasOwnProperty("parameters"))
				if (!$util.isString(message.parameters))
					return "parameters: string expected";
			if (message.sync !== null && message.hasOwnProperty("sync"))
				if (typeof message.sync !== "boolean") return "sync: boolean expected";
			if (message.requestUuid !== null && message.hasOwnProperty("requestUuid"))
				if (!$util.isString(message.requestUuid))
					return "requestUuid: string expected";
			return null;
		};

		/**
		 * Creates an AgentGuardInput message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof agentguard.AgentGuardInput
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {agentguard.AgentGuardInput} AgentGuardInput
		 */
		AgentGuardInput.fromObject = function fromObject(object) {
			if (object instanceof $root.agentguard.AgentGuardInput) return object;
			var message = new $root.agentguard.AgentGuardInput();
			if (object.conversation !== null) {
				if (typeof object.conversation !== "object")
					throw TypeError(
						".agentguard.AgentGuardInput.conversation: object expected"
					);
				message.conversation = $root.agentguard.Conversation.fromObject(
					object.conversation
				);
			}
			if (object.capability !== null)
				message.capability = String(object.capability);
			if (object.parameters !== null)
				message.parameters = String(object.parameters);
			if (object.sync !== null) message.sync = Boolean(object.sync);
			if (object.requestUuid !== null)
				message.requestUuid = String(object.requestUuid);
			return message;
		};

		/**
		 * Creates a plain object from an AgentGuardInput message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof agentguard.AgentGuardInput
		 * @static
		 * @param {agentguard.AgentGuardInput} message AgentGuardInput
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		AgentGuardInput.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.conversation = null;
				object.capability = "";
				object.parameters = "";
				object.sync = false;
				object.requestUuid = "";
			}
			if (
				message.conversation !== null &&
				message.hasOwnProperty("conversation")
			)
				object.conversation = $root.agentguard.Conversation.toObject(
					message.conversation,
					options
				);
			if (message.capability !== null && message.hasOwnProperty("capability"))
				object.capability = message.capability;
			if (message.parameters !== null && message.hasOwnProperty("parameters"))
				object.parameters = message.parameters;
			if (message.sync !== null && message.hasOwnProperty("sync"))
				object.sync = message.sync;
			if (message.requestUuid !== null && message.hasOwnProperty("requestUuid"))
				object.requestUuid = message.requestUuid;
			return object;
		};

		/**
		 * Converts this AgentGuardInput to JSON.
		 * @function toJSON
		 * @memberof agentguard.AgentGuardInput
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		AgentGuardInput.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return AgentGuardInput;
	})();

	agentguard.Conversation = (function () {
		/**
		 * Properties of a Conversation.
		 * @memberof agentguard
		 * @interface IConversation
		 * @property {string|null} [conversationId] Conversation conversationId
		 * @property {string|null} [bot] Conversation bot
		 * @property {Array.<string>|null} [participants] Conversation participants
		 * @property {Array.<agentguard.IChannel>|null} [onChannels] Conversation onChannels
		 * @property {boolean|null} [closed] Conversation closed
		 */

		/**
		 * Constructs a new Conversation.
		 * @memberof agentguard
		 * @classdesc Represents a Conversation.
		 * @implements IConversation
		 * @constructor
		 * @param {agentguard.IConversation=} [properties] Properties to set
		 */
		function Conversation(properties) {
			this.participants = [];
			this.onChannels = [];
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * Conversation conversationId.
		 * @member {string} conversationId
		 * @memberof agentguard.Conversation
		 * @instance
		 */
		Conversation.prototype.conversationId = "";

		/**
		 * Conversation bot.
		 * @member {string} bot
		 * @memberof agentguard.Conversation
		 * @instance
		 */
		Conversation.prototype.bot = "";

		/**
		 * Conversation participants.
		 * @member {Array.<string>} participants
		 * @memberof agentguard.Conversation
		 * @instance
		 */
		Conversation.prototype.participants = $util.emptyArray;

		/**
		 * Conversation onChannels.
		 * @member {Array.<agentguard.IChannel>} onChannels
		 * @memberof agentguard.Conversation
		 * @instance
		 */
		Conversation.prototype.onChannels = $util.emptyArray;

		/**
		 * Conversation closed.
		 * @member {boolean} closed
		 * @memberof agentguard.Conversation
		 * @instance
		 */
		Conversation.prototype.closed = false;

		/**
		 * Creates a new Conversation instance using the specified properties.
		 * @function create
		 * @memberof agentguard.Conversation
		 * @static
		 * @param {agentguard.IConversation=} [properties] Properties to set
		 * @returns {agentguard.Conversation} Conversation instance
		 */
		Conversation.create = function create(properties) {
			return new Conversation(properties);
		};

		/**
		 * Encodes the specified Conversation message. Does not implicitly {@link agentguard.Conversation.verify|verify} messages.
		 * @function encode
		 * @memberof agentguard.Conversation
		 * @static
		 * @param {agentguard.IConversation} message Conversation message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		Conversation.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.conversationId !== null &&
				message.hasOwnProperty("conversationId")
			)
				writer
					.uint32(/* id 1, wireType 2 =*/ 10)
					.string(message.conversationId);
			if (message.bot !== null && message.hasOwnProperty("bot"))
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.bot);
			if (message.participants !== null && message.participants.length)
				for (var i = 0; i < message.participants.length; ++i)
					writer
						.uint32(/* id 3, wireType 2 =*/ 26)
						.string(message.participants[i]);
			if (message.onChannels !== null && message.onChannels.length)
				for (var i = 0; i < message.onChannels.length; ++i)
					$root.agentguard.Channel.encode(
						message.onChannels[i],
						writer.uint32(/* id 4, wireType 2 =*/ 34).fork()
					).ldelim();
			if (message.closed !== null && message.hasOwnProperty("closed"))
				writer.uint32(/* id 5, wireType 0 =*/ 40).bool(message.closed);
			return writer;
		};

		/**
		 * Encodes the specified Conversation message, length delimited. Does not implicitly {@link agentguard.Conversation.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof agentguard.Conversation
		 * @static
		 * @param {agentguard.IConversation} message Conversation message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		Conversation.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a Conversation message from the specified reader or buffer.
		 * @function decode
		 * @memberof agentguard.Conversation
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {agentguard.Conversation} Conversation
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		Conversation.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.agentguard.Conversation();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.conversationId = reader.string();
						break;
					case 2:
						message.bot = reader.string();
						break;
					case 3:
						if (!(message.participants && message.participants.length))
							message.participants = [];
						message.participants.push(reader.string());
						break;
					case 4:
						if (!(message.onChannels && message.onChannels.length))
							message.onChannels = [];
						message.onChannels.push(
							$root.agentguard.Channel.decode(reader, reader.uint32())
						);
						break;
					case 5:
						message.closed = reader.bool();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a Conversation message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof agentguard.Conversation
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {agentguard.Conversation} Conversation
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		Conversation.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a Conversation message.
		 * @function verify
		 * @memberof agentguard.Conversation
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		Conversation.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (
				message.conversationId !== null &&
				message.hasOwnProperty("conversationId")
			)
				if (!$util.isString(message.conversationId))
					return "conversationId: string expected";
			if (message.bot !== null && message.hasOwnProperty("bot"))
				if (!$util.isString(message.bot)) return "bot: string expected";
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
			if (message.onChannels !== null && message.hasOwnProperty("onChannels")) {
				if (!Array.isArray(message.onChannels))
					return "onChannels: array expected";
				for (var i = 0; i < message.onChannels.length; ++i) {
					var error = $root.agentguard.Channel.verify(message.onChannels[i]);
					if (error) return "onChannels." + error;
				}
			}
			if (message.closed !== null && message.hasOwnProperty("closed"))
				if (typeof message.closed !== "boolean")
					return "closed: boolean expected";
			return null;
		};

		/**
		 * Creates a Conversation message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof agentguard.Conversation
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {agentguard.Conversation} Conversation
		 */
		Conversation.fromObject = function fromObject(object) {
			if (object instanceof $root.agentguard.Conversation) return object;
			var message = new $root.agentguard.Conversation();
			if (object.conversationId !== null)
				message.conversationId = String(object.conversationId);
			if (object.bot !== null) message.bot = String(object.bot);
			if (object.participants) {
				if (!Array.isArray(object.participants))
					throw TypeError(
						".agentguard.Conversation.participants: array expected"
					);
				message.participants = [];
				for (var i = 0; i < object.participants.length; ++i)
					message.participants[i] = String(object.participants[i]);
			}
			if (object.onChannels) {
				if (!Array.isArray(object.onChannels))
					throw TypeError(
						".agentguard.Conversation.onChannels: array expected"
					);
				message.onChannels = [];
				for (var i = 0; i < object.onChannels.length; ++i) {
					if (typeof object.onChannels[i] !== "object")
						throw TypeError(
							".agentguard.Conversation.onChannels: object expected"
						);
					message.onChannels[i] = $root.agentguard.Channel.fromObject(
						object.onChannels[i]
					);
				}
			}
			if (object.closed !== null) message.closed = Boolean(object.closed);
			return message;
		};

		/**
		 * Creates a plain object from a Conversation message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof agentguard.Conversation
		 * @static
		 * @param {agentguard.Conversation} message Conversation
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		Conversation.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.arrays || options.defaults) {
				object.participants = [];
				object.onChannels = [];
			}
			if (options.defaults) {
				object.conversationId = "";
				object.bot = "";
				object.closed = false;
			}
			if (
				message.conversationId !== null &&
				message.hasOwnProperty("conversationId")
			)
				object.conversationId = message.conversationId;
			if (message.bot !== null && message.hasOwnProperty("bot"))
				object.bot = message.bot;
			if (message.participants && message.participants.length) {
				object.participants = [];
				for (var j = 0; j < message.participants.length; ++j)
					object.participants[j] = message.participants[j];
			}
			if (message.onChannels && message.onChannels.length) {
				object.onChannels = [];
				for (var j = 0; j < message.onChannels.length; ++j)
					object.onChannels[j] = $root.agentguard.Channel.toObject(
						message.onChannels[j],
						options
					);
			}
			if (message.closed !== null && message.hasOwnProperty("closed"))
				object.closed = message.closed;
			return object;
		};

		/**
		 * Converts this Conversation to JSON.
		 * @function toJSON
		 * @memberof agentguard.Conversation
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		Conversation.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return Conversation;
	})();

	agentguard.Channel = (function () {
		/**
		 * Properties of a Channel.
		 * @memberof agentguard
		 * @interface IChannel
		 * @property {string|null} [channelName] Channel channelName
		 * @property {string|null} [userDomain] Channel userDomain
		 */

		/**
		 * Constructs a new Channel.
		 * @memberof agentguard
		 * @classdesc Represents a Channel.
		 * @implements IChannel
		 * @constructor
		 * @param {agentguard.IChannel=} [properties] Properties to set
		 */
		function Channel(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * Channel channelName.
		 * @member {string} channelName
		 * @memberof agentguard.Channel
		 * @instance
		 */
		Channel.prototype.channelName = "";

		/**
		 * Channel userDomain.
		 * @member {string} userDomain
		 * @memberof agentguard.Channel
		 * @instance
		 */
		Channel.prototype.userDomain = "";

		/**
		 * Creates a new Channel instance using the specified properties.
		 * @function create
		 * @memberof agentguard.Channel
		 * @static
		 * @param {agentguard.IChannel=} [properties] Properties to set
		 * @returns {agentguard.Channel} Channel instance
		 */
		Channel.create = function create(properties) {
			return new Channel(properties);
		};

		/**
		 * Encodes the specified Channel message. Does not implicitly {@link agentguard.Channel.verify|verify} messages.
		 * @function encode
		 * @memberof agentguard.Channel
		 * @static
		 * @param {agentguard.IChannel} message Channel message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		Channel.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.channelName !== null && message.hasOwnProperty("channelName"))
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.channelName);
			if (message.userDomain !== null && message.hasOwnProperty("userDomain"))
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.userDomain);
			return writer;
		};

		/**
		 * Encodes the specified Channel message, length delimited. Does not implicitly {@link agentguard.Channel.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof agentguard.Channel
		 * @static
		 * @param {agentguard.IChannel} message Channel message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		Channel.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a Channel message from the specified reader or buffer.
		 * @function decode
		 * @memberof agentguard.Channel
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {agentguard.Channel} Channel
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		Channel.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.agentguard.Channel();
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
		 * Decodes a Channel message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof agentguard.Channel
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {agentguard.Channel} Channel
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		Channel.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a Channel message.
		 * @function verify
		 * @memberof agentguard.Channel
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		Channel.verify = function verify(message) {
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
		 * Creates a Channel message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof agentguard.Channel
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {agentguard.Channel} Channel
		 */
		Channel.fromObject = function fromObject(object) {
			if (object instanceof $root.agentguard.Channel) return object;
			var message = new $root.agentguard.Channel();
			if (object.channelName !== null)
				message.channelName = String(object.channelName);
			if (object.userDomain !== null)
				message.userDomain = String(object.userDomain);
			return message;
		};

		/**
		 * Creates a plain object from a Channel message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof agentguard.Channel
		 * @static
		 * @param {agentguard.Channel} message Channel
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		Channel.toObject = function toObject(message, options) {
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
		 * Converts this Channel to JSON.
		 * @function toJSON
		 * @memberof agentguard.Channel
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		Channel.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return Channel;
	})();

	agentguard.AgentGuardStringResponse = (function () {
		/**
		 * Properties of an AgentGuardStringResponse.
		 * @memberof agentguard
		 * @interface IAgentGuardStringResponse
		 * @property {number|null} [error] AgentGuardStringResponse error
		 * @property {Array.<string>|null} [content] AgentGuardStringResponse content
		 */

		/**
		 * Constructs a new AgentGuardStringResponse.
		 * @memberof agentguard
		 * @classdesc Represents an AgentGuardStringResponse.
		 * @implements IAgentGuardStringResponse
		 * @constructor
		 * @param {agentguard.IAgentGuardStringResponse=} [properties] Properties to set
		 */
		function AgentGuardStringResponse(properties) {
			this.content = [];
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * AgentGuardStringResponse error.
		 * @member {number} error
		 * @memberof agentguard.AgentGuardStringResponse
		 * @instance
		 */
		AgentGuardStringResponse.prototype.error = 0;

		/**
		 * AgentGuardStringResponse content.
		 * @member {Array.<string>} content
		 * @memberof agentguard.AgentGuardStringResponse
		 * @instance
		 */
		AgentGuardStringResponse.prototype.content = $util.emptyArray;

		/**
		 * Creates a new AgentGuardStringResponse instance using the specified properties.
		 * @function create
		 * @memberof agentguard.AgentGuardStringResponse
		 * @static
		 * @param {agentguard.IAgentGuardStringResponse=} [properties] Properties to set
		 * @returns {agentguard.AgentGuardStringResponse} AgentGuardStringResponse instance
		 */
		AgentGuardStringResponse.create = function create(properties) {
			return new AgentGuardStringResponse(properties);
		};

		/**
		 * Encodes the specified AgentGuardStringResponse message. Does not implicitly {@link agentguard.AgentGuardStringResponse.verify|verify} messages.
		 * @function encode
		 * @memberof agentguard.AgentGuardStringResponse
		 * @static
		 * @param {agentguard.IAgentGuardStringResponse} message AgentGuardStringResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		AgentGuardStringResponse.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.error !== null && message.hasOwnProperty("error"))
				writer.uint32(/* id 1, wireType 0 =*/ 8).int32(message.error);
			if (message.content !== null && message.content.length)
				for (var i = 0; i < message.content.length; ++i)
					writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.content[i]);
			return writer;
		};

		/**
		 * Encodes the specified AgentGuardStringResponse message, length delimited. Does not implicitly {@link agentguard.AgentGuardStringResponse.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof agentguard.AgentGuardStringResponse
		 * @static
		 * @param {agentguard.IAgentGuardStringResponse} message AgentGuardStringResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		AgentGuardStringResponse.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes an AgentGuardStringResponse message from the specified reader or buffer.
		 * @function decode
		 * @memberof agentguard.AgentGuardStringResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {agentguard.AgentGuardStringResponse} AgentGuardStringResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		AgentGuardStringResponse.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.agentguard.AgentGuardStringResponse();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.error = reader.int32();
						break;
					case 2:
						if (!(message.content && message.content.length))
							message.content = [];
						message.content.push(reader.string());
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes an AgentGuardStringResponse message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof agentguard.AgentGuardStringResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {agentguard.AgentGuardStringResponse} AgentGuardStringResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		AgentGuardStringResponse.decodeDelimited = function decodeDelimited(
			reader
		) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies an AgentGuardStringResponse message.
		 * @function verify
		 * @memberof agentguard.AgentGuardStringResponse
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		AgentGuardStringResponse.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.error !== null && message.hasOwnProperty("error"))
				if (!$util.isInteger(message.error)) return "error: integer expected";
			if (message.content !== null && message.hasOwnProperty("content")) {
				if (!Array.isArray(message.content)) return "content: array expected";
				for (var i = 0; i < message.content.length; ++i)
					if (!$util.isString(message.content[i]))
						return "content: string[] expected";
			}
			return null;
		};

		/**
		 * Creates an AgentGuardStringResponse message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof agentguard.AgentGuardStringResponse
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {agentguard.AgentGuardStringResponse} AgentGuardStringResponse
		 */
		AgentGuardStringResponse.fromObject = function fromObject(object) {
			if (object instanceof $root.agentguard.AgentGuardStringResponse)
				return object;
			var message = new $root.agentguard.AgentGuardStringResponse();
			if (object.error !== null) message.error = object.error | 0;
			if (object.content) {
				if (!Array.isArray(object.content))
					throw TypeError(
						".agentguard.AgentGuardStringResponse.content: array expected"
					);
				message.content = [];
				for (var i = 0; i < object.content.length; ++i)
					message.content[i] = String(object.content[i]);
			}
			return message;
		};

		/**
		 * Creates a plain object from an AgentGuardStringResponse message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof agentguard.AgentGuardStringResponse
		 * @static
		 * @param {agentguard.AgentGuardStringResponse} message AgentGuardStringResponse
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		AgentGuardStringResponse.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.arrays || options.defaults) object.content = [];
			if (options.defaults) object.error = 0;
			if (message.error !== null && message.hasOwnProperty("error"))
				object.error = message.error;
			if (message.content && message.content.length) {
				object.content = [];
				for (var j = 0; j < message.content.length; ++j)
					object.content[j] = message.content[j];
			}
			return object;
		};

		/**
		 * Converts this AgentGuardStringResponse to JSON.
		 * @function toJSON
		 * @memberof agentguard.AgentGuardStringResponse
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		AgentGuardStringResponse.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return AgentGuardStringResponse;
	})();

	return agentguard;
})();

module.exports = $root;
