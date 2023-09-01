/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader,
	$Writer = $protobuf.Writer,
	$util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.queue = (function () {
	/**
	 * Namespace queue.
	 * @exports queue
	 * @namespace
	 */
	var queue = {};

	queue.QueueService = (function () {
		/**
		 * Constructs a new QueueService service.
		 * @memberof queue
		 * @classdesc Represents a QueueService
		 * @extends $protobuf.rpc.Service
		 * @constructor
		 * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
		 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
		 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
		 */
		function QueueService(rpcImpl, requestDelimited, responseDelimited) {
			$protobuf.rpc.Service.call(
				this,
				rpcImpl,
				requestDelimited,
				responseDelimited
			);
		}

		(QueueService.prototype = Object.create(
			$protobuf.rpc.Service.prototype
		)).constructor = QueueService;

		/**
		 * Creates new QueueService service using the specified rpc implementation.
		 * @function create
		 * @memberof queue.QueueService
		 * @static
		 * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
		 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
		 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
		 * @returns {QueueService} RPC service. Useful where requests and/or responses are streamed.
		 */
		QueueService.create = function create(
			rpcImpl,
			requestDelimited,
			responseDelimited
		) {
			return new this(rpcImpl, requestDelimited, responseDelimited);
		};

		/**
		 * Callback as used by {@link queue.QueueService#getSampleMessages}.
		 * @memberof queue.QueueService
		 * @typedef GetSampleMessagesCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {queue.MessageList} [response] MessageList
		 */

		/**
		 * Calls GetSampleMessages.
		 * @function getSampleMessages
		 * @memberof queue.QueueService
		 * @instance
		 * @param {commonmessages.IEmpty} request Empty message or plain object
		 * @param {queue.QueueService.GetSampleMessagesCallback} callback Node-style callback called with the error, if any, and MessageList
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(QueueService.prototype.getSampleMessages = function getSampleMessages(
				request,
				callback
			) {
				return this.rpcCall(
					getSampleMessages,
					$root.commonmessages.Empty,
					$root.queue.MessageList,
					request,
					callback
				);
			}),
			"name",
			{ value: "GetSampleMessages" }
		);

		/**
		 * Calls GetSampleMessages.
		 * @function getSampleMessages
		 * @memberof queue.QueueService
		 * @instance
		 * @param {commonmessages.IEmpty} request Empty message or plain object
		 * @returns {Promise<queue.MessageList>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link queue.QueueService#getSampleStreamingMessages}.
		 * @memberof queue.QueueService
		 * @typedef GetSampleStreamingMessagesCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {queue.Message} [response] Message
		 */

		/**
		 * Calls GetSampleStreamingMessages.
		 * @function getSampleStreamingMessages
		 * @memberof queue.QueueService
		 * @instance
		 * @param {commonmessages.IEmpty} request Empty message or plain object
		 * @param {queue.QueueService.GetSampleStreamingMessagesCallback} callback Node-style callback called with the error, if any, and Message
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(QueueService.prototype.getSampleStreamingMessages =
				function getSampleStreamingMessages(request, callback) {
					return this.rpcCall(
						getSampleStreamingMessages,
						$root.commonmessages.Empty,
						$root.queue.Message,
						request,
						callback
					);
				}),
			"name",
			{ value: "GetSampleStreamingMessages" }
		);

		/**
		 * Calls GetSampleStreamingMessages.
		 * @function getSampleStreamingMessages
		 * @memberof queue.QueueService
		 * @instance
		 * @param {commonmessages.IEmpty} request Empty message or plain object
		 * @returns {Promise<queue.Message>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link queue.QueueService#getSampleBufferedMessage}.
		 * @memberof queue.QueueService
		 * @typedef GetSampleBufferedMessageCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {queue.BufferMessage} [response] BufferMessage
		 */

		/**
		 * Calls GetSampleBufferedMessage.
		 * @function getSampleBufferedMessage
		 * @memberof queue.QueueService
		 * @instance
		 * @param {commonmessages.IEmpty} request Empty message or plain object
		 * @param {queue.QueueService.GetSampleBufferedMessageCallback} callback Node-style callback called with the error, if any, and BufferMessage
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(QueueService.prototype.getSampleBufferedMessage =
				function getSampleBufferedMessage(request, callback) {
					return this.rpcCall(
						getSampleBufferedMessage,
						$root.commonmessages.Empty,
						$root.queue.BufferMessage,
						request,
						callback
					);
				}),
			"name",
			{ value: "GetSampleBufferedMessage" }
		);

		/**
		 * Calls GetSampleBufferedMessage.
		 * @function getSampleBufferedMessage
		 * @memberof queue.QueueService
		 * @instance
		 * @param {commonmessages.IEmpty} request Empty message or plain object
		 * @returns {Promise<queue.BufferMessage>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link queue.QueueService#getPaginatedQueueMessages}.
		 * @memberof queue.QueueService
		 * @typedef GetPaginatedQueueMessagesCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {queue.QueueResponseList} [response] QueueResponseList
		 */

		/**
		 * Calls GetPaginatedQueueMessages.
		 * @function getPaginatedQueueMessages
		 * @memberof queue.QueueService
		 * @instance
		 * @param {queue.IQueueMessageInput} request QueueMessageInput message or plain object
		 * @param {queue.QueueService.GetPaginatedQueueMessagesCallback} callback Node-style callback called with the error, if any, and QueueResponseList
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(QueueService.prototype.getPaginatedQueueMessages =
				function getPaginatedQueueMessages(request, callback) {
					return this.rpcCall(
						getPaginatedQueueMessages,
						$root.queue.QueueMessageInput,
						$root.queue.QueueResponseList,
						request,
						callback
					);
				}),
			"name",
			{ value: "GetPaginatedQueueMessages" }
		);

		/**
		 * Calls GetPaginatedQueueMessages.
		 * @function getPaginatedQueueMessages
		 * @memberof queue.QueueService
		 * @instance
		 * @param {queue.IQueueMessageInput} request QueueMessageInput message or plain object
		 * @returns {Promise<queue.QueueResponseList>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link queue.QueueService#getAllQueueMessages}.
		 * @memberof queue.QueueService
		 * @typedef GetAllQueueMessagesCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {queue.QueueResponse} [response] QueueResponse
		 */

		/**
		 * Calls GetAllQueueMessages.
		 * @function getAllQueueMessages
		 * @memberof queue.QueueService
		 * @instance
		 * @param {commonmessages.IEmpty} request Empty message or plain object
		 * @param {queue.QueueService.GetAllQueueMessagesCallback} callback Node-style callback called with the error, if any, and QueueResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(QueueService.prototype.getAllQueueMessages =
				function getAllQueueMessages(request, callback) {
					return this.rpcCall(
						getAllQueueMessages,
						$root.commonmessages.Empty,
						$root.queue.QueueResponse,
						request,
						callback
					);
				}),
			"name",
			{ value: "GetAllQueueMessages" }
		);

		/**
		 * Calls GetAllQueueMessages.
		 * @function getAllQueueMessages
		 * @memberof queue.QueueService
		 * @instance
		 * @param {commonmessages.IEmpty} request Empty message or plain object
		 * @returns {Promise<queue.QueueResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link queue.QueueService#getStreamingQueueMessage}.
		 * @memberof queue.QueueService
		 * @typedef GetStreamingQueueMessageCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {queue.QueueMessage} [response] QueueMessage
		 */

		/**
		 * Calls GetStreamingQueueMessage.
		 * @function getStreamingQueueMessage
		 * @memberof queue.QueueService
		 * @instance
		 * @param {commonmessages.IEmpty} request Empty message or plain object
		 * @param {queue.QueueService.GetStreamingQueueMessageCallback} callback Node-style callback called with the error, if any, and QueueMessage
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(QueueService.prototype.getStreamingQueueMessage =
				function getStreamingQueueMessage(request, callback) {
					return this.rpcCall(
						getStreamingQueueMessage,
						$root.commonmessages.Empty,
						$root.queue.QueueMessage,
						request,
						callback
					);
				}),
			"name",
			{ value: "GetStreamingQueueMessage" }
		);

		/**
		 * Calls GetStreamingQueueMessage.
		 * @function getStreamingQueueMessage
		 * @memberof queue.QueueService
		 * @instance
		 * @param {commonmessages.IEmpty} request Empty message or plain object
		 * @returns {Promise<queue.QueueMessage>} Promise
		 * @variation 2
		 */

		return QueueService;
	})();

	queue.Message = (function () {
		/**
		 * Properties of a Message.
		 * @memberof queue
		 * @interface IMessage
		 * @property {string|null} [id] Message id
		 * @property {string|null} [content] Message content
		 */

		/**
		 * Constructs a new Message.
		 * @memberof queue
		 * @classdesc Represents a Message.
		 * @implements IMessage
		 * @constructor
		 * @param {queue.IMessage=} [properties] Properties to set
		 */
		function Message(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * Message id.
		 * @member {string} id
		 * @memberof queue.Message
		 * @instance
		 */
		Message.prototype.id = "";

		/**
		 * Message content.
		 * @member {string} content
		 * @memberof queue.Message
		 * @instance
		 */
		Message.prototype.content = "";

		/**
		 * Creates a new Message instance using the specified properties.
		 * @function create
		 * @memberof queue.Message
		 * @static
		 * @param {queue.IMessage=} [properties] Properties to set
		 * @returns {queue.Message} Message instance
		 */
		Message.create = function create(properties) {
			return new Message(properties);
		};

		/**
		 * Encodes the specified Message message. Does not implicitly {@link queue.Message.verify|verify} messages.
		 * @function encode
		 * @memberof queue.Message
		 * @static
		 * @param {queue.IMessage} message Message message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		Message.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.id !== null && Object.hasOwnProperty.call(message, "id"))
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.id);
			if (
				message.content !== null &&
				Object.hasOwnProperty.call(message, "content")
			)
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.content);
			return writer;
		};

		/**
		 * Encodes the specified Message message, length delimited. Does not implicitly {@link queue.Message.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof queue.Message
		 * @static
		 * @param {queue.IMessage} message Message message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		Message.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a Message message from the specified reader or buffer.
		 * @function decode
		 * @memberof queue.Message
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {queue.Message} Message
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		Message.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.queue.Message();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.id = reader.string();
						break;
					case 2:
						message.content = reader.string();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a Message message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof queue.Message
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {queue.Message} Message
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		Message.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a Message message.
		 * @function verify
		 * @memberof queue.Message
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		Message.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.id !== null && message.hasOwnProperty("id"))
				if (!$util.isString(message.id)) return "id: string expected";
			if (message.content !== null && message.hasOwnProperty("content"))
				if (!$util.isString(message.content)) return "content: string expected";
			return null;
		};

		/**
		 * Creates a Message message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof queue.Message
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {queue.Message} Message
		 */
		Message.fromObject = function fromObject(object) {
			if (object instanceof $root.queue.Message) return object;
			var message = new $root.queue.Message();
			if (object.id !== null) message.id = String(object.id);
			if (object.content !== null) message.content = String(object.content);
			return message;
		};

		/**
		 * Creates a plain object from a Message message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof queue.Message
		 * @static
		 * @param {queue.Message} message Message
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		Message.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.id = "";
				object.content = "";
			}
			if (message.id !== null && message.hasOwnProperty("id"))
				object.id = message.id;
			if (message.content !== null && message.hasOwnProperty("content"))
				object.content = message.content;
			return object;
		};

		/**
		 * Converts this Message to JSON.
		 * @function toJSON
		 * @memberof queue.Message
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		Message.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return Message;
	})();

	queue.BufferMessage = (function () {
		/**
		 * Properties of a BufferMessage.
		 * @memberof queue
		 * @interface IBufferMessage
		 * @property {Uint8Array|null} [message] BufferMessage message
		 */

		/**
		 * Constructs a new BufferMessage.
		 * @memberof queue
		 * @classdesc Represents a BufferMessage.
		 * @implements IBufferMessage
		 * @constructor
		 * @param {queue.IBufferMessage=} [properties] Properties to set
		 */
		function BufferMessage(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * BufferMessage message.
		 * @member {Uint8Array} message
		 * @memberof queue.BufferMessage
		 * @instance
		 */
		BufferMessage.prototype.message = $util.newBuffer([]);

		/**
		 * Creates a new BufferMessage instance using the specified properties.
		 * @function create
		 * @memberof queue.BufferMessage
		 * @static
		 * @param {queue.IBufferMessage=} [properties] Properties to set
		 * @returns {queue.BufferMessage} BufferMessage instance
		 */
		BufferMessage.create = function create(properties) {
			return new BufferMessage(properties);
		};

		/**
		 * Encodes the specified BufferMessage message. Does not implicitly {@link queue.BufferMessage.verify|verify} messages.
		 * @function encode
		 * @memberof queue.BufferMessage
		 * @static
		 * @param {queue.IBufferMessage} message BufferMessage message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		BufferMessage.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.message !== null &&
				Object.hasOwnProperty.call(message, "message")
			)
				writer.uint32(/* id 1, wireType 2 =*/ 10).bytes(message.message);
			return writer;
		};

		/**
		 * Encodes the specified BufferMessage message, length delimited. Does not implicitly {@link queue.BufferMessage.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof queue.BufferMessage
		 * @static
		 * @param {queue.IBufferMessage} message BufferMessage message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		BufferMessage.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a BufferMessage message from the specified reader or buffer.
		 * @function decode
		 * @memberof queue.BufferMessage
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {queue.BufferMessage} BufferMessage
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		BufferMessage.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.queue.BufferMessage();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.message = reader.bytes();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a BufferMessage message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof queue.BufferMessage
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {queue.BufferMessage} BufferMessage
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		BufferMessage.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a BufferMessage message.
		 * @function verify
		 * @memberof queue.BufferMessage
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		BufferMessage.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.message !== null && message.hasOwnProperty("message"))
				if (
					!(
						(message.message && typeof message.message.length === "number") ||
						$util.isString(message.message)
					)
				)
					return "message: buffer expected";
			return null;
		};

		/**
		 * Creates a BufferMessage message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof queue.BufferMessage
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {queue.BufferMessage} BufferMessage
		 */
		BufferMessage.fromObject = function fromObject(object) {
			if (object instanceof $root.queue.BufferMessage) return object;
			var message = new $root.queue.BufferMessage();
			if (object.message !== null)
				if (typeof object.message === "string")
					$util.base64.decode(
						object.message,
						(message.message = $util.newBuffer(
							$util.base64.length(object.message)
						)),
						0
					);
				else if (object.message.length) message.message = object.message;
			return message;
		};

		/**
		 * Creates a plain object from a BufferMessage message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof queue.BufferMessage
		 * @static
		 * @param {queue.BufferMessage} message BufferMessage
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		BufferMessage.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults)
				if (options.bytes === String) object.message = "";
				else {
					object.message = [];
					if (options.bytes !== Array)
						object.message = $util.newBuffer(object.message);
				}
			if (message.message !== null && message.hasOwnProperty("message"))
				object.message =
					options.bytes === String
						? $util.base64.encode(message.message, 0, message.message.length)
						: options.bytes === Array
						? Array.prototype.slice.call(message.message)
						: message.message;
			return object;
		};

		/**
		 * Converts this BufferMessage to JSON.
		 * @function toJSON
		 * @memberof queue.BufferMessage
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		BufferMessage.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return BufferMessage;
	})();

	queue.MessageList = (function () {
		/**
		 * Properties of a MessageList.
		 * @memberof queue
		 * @interface IMessageList
		 * @property {Array.<queue.IMessage>|null} [messages] MessageList messages
		 */

		/**
		 * Constructs a new MessageList.
		 * @memberof queue
		 * @classdesc Represents a MessageList.
		 * @implements IMessageList
		 * @constructor
		 * @param {queue.IMessageList=} [properties] Properties to set
		 */
		function MessageList(properties) {
			this.messages = [];
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * MessageList messages.
		 * @member {Array.<queue.IMessage>} messages
		 * @memberof queue.MessageList
		 * @instance
		 */
		MessageList.prototype.messages = $util.emptyArray;

		/**
		 * Creates a new MessageList instance using the specified properties.
		 * @function create
		 * @memberof queue.MessageList
		 * @static
		 * @param {queue.IMessageList=} [properties] Properties to set
		 * @returns {queue.MessageList} MessageList instance
		 */
		MessageList.create = function create(properties) {
			return new MessageList(properties);
		};

		/**
		 * Encodes the specified MessageList message. Does not implicitly {@link queue.MessageList.verify|verify} messages.
		 * @function encode
		 * @memberof queue.MessageList
		 * @static
		 * @param {queue.IMessageList} message MessageList message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		MessageList.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.messages !== null && message.messages.length)
				for (var i = 0; i < message.messages.length; ++i)
					$root.queue.Message.encode(
						message.messages[i],
						writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
					).ldelim();
			return writer;
		};

		/**
		 * Encodes the specified MessageList message, length delimited. Does not implicitly {@link queue.MessageList.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof queue.MessageList
		 * @static
		 * @param {queue.IMessageList} message MessageList message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		MessageList.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a MessageList message from the specified reader or buffer.
		 * @function decode
		 * @memberof queue.MessageList
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {queue.MessageList} MessageList
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		MessageList.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.queue.MessageList();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						if (!(message.messages && message.messages.length))
							message.messages = [];
						message.messages.push(
							$root.queue.Message.decode(reader, reader.uint32())
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
		 * Decodes a MessageList message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof queue.MessageList
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {queue.MessageList} MessageList
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		MessageList.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a MessageList message.
		 * @function verify
		 * @memberof queue.MessageList
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		MessageList.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.messages !== null && message.hasOwnProperty("messages")) {
				if (!Array.isArray(message.messages)) return "messages: array expected";
				for (var i = 0; i < message.messages.length; ++i) {
					var error = $root.queue.Message.verify(message.messages[i]);
					if (error) return "messages." + error;
				}
			}
			return null;
		};

		/**
		 * Creates a MessageList message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof queue.MessageList
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {queue.MessageList} MessageList
		 */
		MessageList.fromObject = function fromObject(object) {
			if (object instanceof $root.queue.MessageList) return object;
			var message = new $root.queue.MessageList();
			if (object.messages) {
				if (!Array.isArray(object.messages))
					throw TypeError(".queue.MessageList.messages: array expected");
				message.messages = [];
				for (var i = 0; i < object.messages.length; ++i) {
					if (typeof object.messages[i] !== "object")
						throw TypeError(".queue.MessageList.messages: object expected");
					message.messages[i] = $root.queue.Message.fromObject(
						object.messages[i]
					);
				}
			}
			return message;
		};

		/**
		 * Creates a plain object from a MessageList message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof queue.MessageList
		 * @static
		 * @param {queue.MessageList} message MessageList
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		MessageList.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.arrays || options.defaults) object.messages = [];
			if (message.messages && message.messages.length) {
				object.messages = [];
				for (var j = 0; j < message.messages.length; ++j)
					object.messages[j] = $root.queue.Message.toObject(
						message.messages[j],
						options
					);
			}
			return object;
		};

		/**
		 * Converts this MessageList to JSON.
		 * @function toJSON
		 * @memberof queue.MessageList
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		MessageList.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return MessageList;
	})();

	queue.QueueResponse = (function () {
		/**
		 * Properties of a QueueResponse.
		 * @memberof queue
		 * @interface IQueueResponse
		 * @property {boolean|null} [onSatellite] QueueResponse onSatellite
		 * @property {Array.<queue.IQueueMessage>|null} [queueMsgs] QueueResponse queueMsgs
		 * @property {string|null} [errorMessage] QueueResponse errorMessage
		 * @property {string|null} [error] QueueResponse error
		 */

		/**
		 * Constructs a new QueueResponse.
		 * @memberof queue
		 * @classdesc Represents a QueueResponse.
		 * @implements IQueueResponse
		 * @constructor
		 * @param {queue.IQueueResponse=} [properties] Properties to set
		 */
		function QueueResponse(properties) {
			this.queueMsgs = [];
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * QueueResponse onSatellite.
		 * @member {boolean} onSatellite
		 * @memberof queue.QueueResponse
		 * @instance
		 */
		QueueResponse.prototype.onSatellite = false;

		/**
		 * QueueResponse queueMsgs.
		 * @member {Array.<queue.IQueueMessage>} queueMsgs
		 * @memberof queue.QueueResponse
		 * @instance
		 */
		QueueResponse.prototype.queueMsgs = $util.emptyArray;

		/**
		 * QueueResponse errorMessage.
		 * @member {string} errorMessage
		 * @memberof queue.QueueResponse
		 * @instance
		 */
		QueueResponse.prototype.errorMessage = "";

		/**
		 * QueueResponse error.
		 * @member {string} error
		 * @memberof queue.QueueResponse
		 * @instance
		 */
		QueueResponse.prototype.error = "";

		/**
		 * Creates a new QueueResponse instance using the specified properties.
		 * @function create
		 * @memberof queue.QueueResponse
		 * @static
		 * @param {queue.IQueueResponse=} [properties] Properties to set
		 * @returns {queue.QueueResponse} QueueResponse instance
		 */
		QueueResponse.create = function create(properties) {
			return new QueueResponse(properties);
		};

		/**
		 * Encodes the specified QueueResponse message. Does not implicitly {@link queue.QueueResponse.verify|verify} messages.
		 * @function encode
		 * @memberof queue.QueueResponse
		 * @static
		 * @param {queue.IQueueResponse} message QueueResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		QueueResponse.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.onSatellite !== null &&
				Object.hasOwnProperty.call(message, "onSatellite")
			)
				writer.uint32(/* id 1, wireType 0 =*/ 8).bool(message.onSatellite);
			if (message.queueMsgs !== null && message.queueMsgs.length)
				for (var i = 0; i < message.queueMsgs.length; ++i)
					$root.queue.QueueMessage.encode(
						message.queueMsgs[i],
						writer.uint32(/* id 2, wireType 2 =*/ 18).fork()
					).ldelim();
			if (
				message.errorMessage !== null &&
				Object.hasOwnProperty.call(message, "errorMessage")
			)
				writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.errorMessage);
			if (
				message.error !== null &&
				Object.hasOwnProperty.call(message, "error")
			)
				writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.error);
			return writer;
		};

		/**
		 * Encodes the specified QueueResponse message, length delimited. Does not implicitly {@link queue.QueueResponse.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof queue.QueueResponse
		 * @static
		 * @param {queue.IQueueResponse} message QueueResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		QueueResponse.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a QueueResponse message from the specified reader or buffer.
		 * @function decode
		 * @memberof queue.QueueResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {queue.QueueResponse} QueueResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		QueueResponse.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.queue.QueueResponse();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.onSatellite = reader.bool();
						break;
					case 2:
						if (!(message.queueMsgs && message.queueMsgs.length))
							message.queueMsgs = [];
						message.queueMsgs.push(
							$root.queue.QueueMessage.decode(reader, reader.uint32())
						);
						break;
					case 3:
						message.errorMessage = reader.string();
						break;
					case 4:
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
		 * Decodes a QueueResponse message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof queue.QueueResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {queue.QueueResponse} QueueResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		QueueResponse.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a QueueResponse message.
		 * @function verify
		 * @memberof queue.QueueResponse
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		QueueResponse.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.onSatellite !== null && message.hasOwnProperty("onSatellite"))
				if (typeof message.onSatellite !== "boolean")
					return "onSatellite: boolean expected";
			if (message.queueMsgs !== null && message.hasOwnProperty("queueMsgs")) {
				if (!Array.isArray(message.queueMsgs))
					return "queueMsgs: array expected";
				for (var i = 0; i < message.queueMsgs.length; ++i) {
					var error = $root.queue.QueueMessage.verify(message.queueMsgs[i]);
					if (error) return "queueMsgs." + error;
				}
			}
			if (
				message.errorMessage !== null &&
				message.hasOwnProperty("errorMessage")
			)
				if (!$util.isString(message.errorMessage))
					return "errorMessage: string expected";
			if (message.error !== null && message.hasOwnProperty("error"))
				if (!$util.isString(message.error)) return "error: string expected";
			return null;
		};

		/**
		 * Creates a QueueResponse message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof queue.QueueResponse
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {queue.QueueResponse} QueueResponse
		 */
		QueueResponse.fromObject = function fromObject(object) {
			if (object instanceof $root.queue.QueueResponse) return object;
			var message = new $root.queue.QueueResponse();
			if (object.onSatellite !== null)
				message.onSatellite = Boolean(object.onSatellite);
			if (object.queueMsgs) {
				if (!Array.isArray(object.queueMsgs))
					throw TypeError(".queue.QueueResponse.queueMsgs: array expected");
				message.queueMsgs = [];
				for (var i = 0; i < object.queueMsgs.length; ++i) {
					if (typeof object.queueMsgs[i] !== "object")
						throw TypeError(".queue.QueueResponse.queueMsgs: object expected");
					message.queueMsgs[i] = $root.queue.QueueMessage.fromObject(
						object.queueMsgs[i]
					);
				}
			}
			if (object.errorMessage !== null)
				message.errorMessage = String(object.errorMessage);
			if (object.error !== null) message.error = String(object.error);
			return message;
		};

		/**
		 * Creates a plain object from a QueueResponse message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof queue.QueueResponse
		 * @static
		 * @param {queue.QueueResponse} message QueueResponse
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		QueueResponse.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.arrays || options.defaults) object.queueMsgs = [];
			if (options.defaults) {
				object.onSatellite = false;
				object.errorMessage = "";
				object.error = "";
			}
			if (message.onSatellite !== null && message.hasOwnProperty("onSatellite"))
				object.onSatellite = message.onSatellite;
			if (message.queueMsgs && message.queueMsgs.length) {
				object.queueMsgs = [];
				for (var j = 0; j < message.queueMsgs.length; ++j)
					object.queueMsgs[j] = $root.queue.QueueMessage.toObject(
						message.queueMsgs[j],
						options
					);
			}
			if (
				message.errorMessage !== null &&
				message.hasOwnProperty("errorMessage")
			)
				object.errorMessage = message.errorMessage;
			if (message.error !== null && message.hasOwnProperty("error"))
				object.error = message.error;
			return object;
		};

		/**
		 * Converts this QueueResponse to JSON.
		 * @function toJSON
		 * @memberof queue.QueueResponse
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		QueueResponse.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return QueueResponse;
	})();

	queue.QueueMessage = (function () {
		/**
		 * Properties of a QueueMessage.
		 * @memberof queue
		 * @interface IQueueMessage
		 * @property {string|null} [userId] QueueMessage userId
		 * @property {string|null} [conversation] QueueMessage conversation
		 * @property {string|null} [bot] QueueMessage bot
		 * @property {number|null} [createdOn] QueueMessage createdOn
		 * @property {string|null} [createdBy] QueueMessage createdBy
		 * @property {number|null} [contentType] QueueMessage contentType
		 * @property {string|null} [messageId] QueueMessage messageId
		 * @property {string|null} [requestUuid] QueueMessage requestUuid
		 * @property {Uint8Array|null} [details] QueueMessage details
		 * @property {string|null} [error] QueueMessage error
		 * @property {Array.<string>|null} [opened] QueueMessage opened
		 * @property {Array.<string>|null} [deleted] QueueMessage deleted
		 * @property {Array.<string>|null} [delivered] QueueMessage delivered
		 */

		/**
		 * Constructs a new QueueMessage.
		 * @memberof queue
		 * @classdesc Represents a QueueMessage.
		 * @implements IQueueMessage
		 * @constructor
		 * @param {queue.IQueueMessage=} [properties] Properties to set
		 */
		function QueueMessage(properties) {
			this.opened = [];
			this.deleted = [];
			this.delivered = [];
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * QueueMessage userId.
		 * @member {string} userId
		 * @memberof queue.QueueMessage
		 * @instance
		 */
		QueueMessage.prototype.userId = "";

		/**
		 * QueueMessage conversation.
		 * @member {string} conversation
		 * @memberof queue.QueueMessage
		 * @instance
		 */
		QueueMessage.prototype.conversation = "";

		/**
		 * QueueMessage bot.
		 * @member {string} bot
		 * @memberof queue.QueueMessage
		 * @instance
		 */
		QueueMessage.prototype.bot = "";

		/**
		 * QueueMessage createdOn.
		 * @member {number} createdOn
		 * @memberof queue.QueueMessage
		 * @instance
		 */
		QueueMessage.prototype.createdOn = 0;

		/**
		 * QueueMessage createdBy.
		 * @member {string} createdBy
		 * @memberof queue.QueueMessage
		 * @instance
		 */
		QueueMessage.prototype.createdBy = "";

		/**
		 * QueueMessage contentType.
		 * @member {number} contentType
		 * @memberof queue.QueueMessage
		 * @instance
		 */
		QueueMessage.prototype.contentType = 0;

		/**
		 * QueueMessage messageId.
		 * @member {string} messageId
		 * @memberof queue.QueueMessage
		 * @instance
		 */
		QueueMessage.prototype.messageId = "";

		/**
		 * QueueMessage requestUuid.
		 * @member {string} requestUuid
		 * @memberof queue.QueueMessage
		 * @instance
		 */
		QueueMessage.prototype.requestUuid = "";

		/**
		 * QueueMessage details.
		 * @member {Uint8Array} details
		 * @memberof queue.QueueMessage
		 * @instance
		 */
		QueueMessage.prototype.details = $util.newBuffer([]);

		/**
		 * QueueMessage error.
		 * @member {string} error
		 * @memberof queue.QueueMessage
		 * @instance
		 */
		QueueMessage.prototype.error = "";

		/**
		 * QueueMessage opened.
		 * @member {Array.<string>} opened
		 * @memberof queue.QueueMessage
		 * @instance
		 */
		QueueMessage.prototype.opened = $util.emptyArray;

		/**
		 * QueueMessage deleted.
		 * @member {Array.<string>} deleted
		 * @memberof queue.QueueMessage
		 * @instance
		 */
		QueueMessage.prototype.deleted = $util.emptyArray;

		/**
		 * QueueMessage delivered.
		 * @member {Array.<string>} delivered
		 * @memberof queue.QueueMessage
		 * @instance
		 */
		QueueMessage.prototype.delivered = $util.emptyArray;

		/**
		 * Creates a new QueueMessage instance using the specified properties.
		 * @function create
		 * @memberof queue.QueueMessage
		 * @static
		 * @param {queue.IQueueMessage=} [properties] Properties to set
		 * @returns {queue.QueueMessage} QueueMessage instance
		 */
		QueueMessage.create = function create(properties) {
			return new QueueMessage(properties);
		};

		/**
		 * Encodes the specified QueueMessage message. Does not implicitly {@link queue.QueueMessage.verify|verify} messages.
		 * @function encode
		 * @memberof queue.QueueMessage
		 * @static
		 * @param {queue.IQueueMessage} message QueueMessage message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		QueueMessage.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.userId !== null &&
				Object.hasOwnProperty.call(message, "userId")
			)
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.userId);
			if (
				message.conversation !== null &&
				Object.hasOwnProperty.call(message, "conversation")
			)
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.conversation);
			if (message.bot !== null && Object.hasOwnProperty.call(message, "bot"))
				writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.bot);
			if (
				message.createdOn !== null &&
				Object.hasOwnProperty.call(message, "createdOn")
			)
				writer.uint32(/* id 4, wireType 1 =*/ 33).double(message.createdOn);
			if (
				message.createdBy !== null &&
				Object.hasOwnProperty.call(message, "createdBy")
			)
				writer.uint32(/* id 5, wireType 2 =*/ 42).string(message.createdBy);
			if (
				message.contentType !== null &&
				Object.hasOwnProperty.call(message, "contentType")
			)
				writer.uint32(/* id 6, wireType 0 =*/ 48).int32(message.contentType);
			if (
				message.messageId !== null &&
				Object.hasOwnProperty.call(message, "messageId")
			)
				writer.uint32(/* id 7, wireType 2 =*/ 58).string(message.messageId);
			if (
				message.requestUuid !== null &&
				Object.hasOwnProperty.call(message, "requestUuid")
			)
				writer.uint32(/* id 8, wireType 2 =*/ 66).string(message.requestUuid);
			if (
				message.details !== null &&
				Object.hasOwnProperty.call(message, "details")
			)
				writer.uint32(/* id 9, wireType 2 =*/ 74).bytes(message.details);
			if (
				message.error !== null &&
				Object.hasOwnProperty.call(message, "error")
			)
				writer.uint32(/* id 10, wireType 2 =*/ 82).string(message.error);
			if (message.opened !== null && message.opened.length)
				for (var i = 0; i < message.opened.length; ++i)
					writer.uint32(/* id 11, wireType 2 =*/ 90).string(message.opened[i]);
			if (message.deleted !== null && message.deleted.length)
				for (var i = 0; i < message.deleted.length; ++i)
					writer.uint32(/* id 12, wireType 2 =*/ 98).string(message.deleted[i]);
			if (message.delivered !== null && message.delivered.length)
				for (var i = 0; i < message.delivered.length; ++i)
					writer
						.uint32(/* id 13, wireType 2 =*/ 106)
						.string(message.delivered[i]);
			return writer;
		};

		/**
		 * Encodes the specified QueueMessage message, length delimited. Does not implicitly {@link queue.QueueMessage.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof queue.QueueMessage
		 * @static
		 * @param {queue.IQueueMessage} message QueueMessage message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		QueueMessage.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a QueueMessage message from the specified reader or buffer.
		 * @function decode
		 * @memberof queue.QueueMessage
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {queue.QueueMessage} QueueMessage
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		QueueMessage.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.queue.QueueMessage();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.userId = reader.string();
						break;
					case 2:
						message.conversation = reader.string();
						break;
					case 3:
						message.bot = reader.string();
						break;
					case 4:
						message.createdOn = reader.double();
						break;
					case 5:
						message.createdBy = reader.string();
						break;
					case 6:
						message.contentType = reader.int32();
						break;
					case 7:
						message.messageId = reader.string();
						break;
					case 8:
						message.requestUuid = reader.string();
						break;
					case 9:
						message.details = reader.bytes();
						break;
					case 10:
						message.error = reader.string();
						break;
					case 11:
						if (!(message.opened && message.opened.length)) message.opened = [];
						message.opened.push(reader.string());
						break;
					case 12:
						if (!(message.deleted && message.deleted.length))
							message.deleted = [];
						message.deleted.push(reader.string());
						break;
					case 13:
						if (!(message.delivered && message.delivered.length))
							message.delivered = [];
						message.delivered.push(reader.string());
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a QueueMessage message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof queue.QueueMessage
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {queue.QueueMessage} QueueMessage
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		QueueMessage.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a QueueMessage message.
		 * @function verify
		 * @memberof queue.QueueMessage
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		QueueMessage.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.userId !== null && message.hasOwnProperty("userId"))
				if (!$util.isString(message.userId)) return "userId: string expected";
			if (
				message.conversation !== null &&
				message.hasOwnProperty("conversation")
			)
				if (!$util.isString(message.conversation))
					return "conversation: string expected";
			if (message.bot !== null && message.hasOwnProperty("bot"))
				if (!$util.isString(message.bot)) return "bot: string expected";
			if (message.createdOn !== null && message.hasOwnProperty("createdOn"))
				if (typeof message.createdOn !== "number")
					return "createdOn: number expected";
			if (message.createdBy !== null && message.hasOwnProperty("createdBy"))
				if (!$util.isString(message.createdBy))
					return "createdBy: string expected";
			if (message.contentType !== null && message.hasOwnProperty("contentType"))
				if (!$util.isInteger(message.contentType))
					return "contentType: integer expected";
			if (message.messageId !== null && message.hasOwnProperty("messageId"))
				if (!$util.isString(message.messageId))
					return "messageId: string expected";
			if (message.requestUuid !== null && message.hasOwnProperty("requestUuid"))
				if (!$util.isString(message.requestUuid))
					return "requestUuid: string expected";
			if (message.details !== null && message.hasOwnProperty("details"))
				if (
					!(
						(message.details && typeof message.details.length === "number") ||
						$util.isString(message.details)
					)
				)
					return "details: buffer expected";
			if (message.error !== null && message.hasOwnProperty("error"))
				if (!$util.isString(message.error)) return "error: string expected";
			if (message.opened !== null && message.hasOwnProperty("opened")) {
				if (!Array.isArray(message.opened)) return "opened: array expected";
				for (var i = 0; i < message.opened.length; ++i)
					if (!$util.isString(message.opened[i]))
						return "opened: string[] expected";
			}
			if (message.deleted !== null && message.hasOwnProperty("deleted")) {
				if (!Array.isArray(message.deleted)) return "deleted: array expected";
				for (var i = 0; i < message.deleted.length; ++i)
					if (!$util.isString(message.deleted[i]))
						return "deleted: string[] expected";
			}
			if (message.delivered !== null && message.hasOwnProperty("delivered")) {
				if (!Array.isArray(message.delivered))
					return "delivered: array expected";
				for (var i = 0; i < message.delivered.length; ++i)
					if (!$util.isString(message.delivered[i]))
						return "delivered: string[] expected";
			}
			return null;
		};

		/**
		 * Creates a QueueMessage message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof queue.QueueMessage
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {queue.QueueMessage} QueueMessage
		 */
		QueueMessage.fromObject = function fromObject(object) {
			if (object instanceof $root.queue.QueueMessage) return object;
			var message = new $root.queue.QueueMessage();
			if (object.userId !== null) message.userId = String(object.userId);
			if (object.conversation !== null)
				message.conversation = String(object.conversation);
			if (object.bot !== null) message.bot = String(object.bot);
			if (object.createdOn !== null)
				message.createdOn = Number(object.createdOn);
			if (object.createdBy !== null)
				message.createdBy = String(object.createdBy);
			if (object.contentType !== null)
				message.contentType = object.contentType | 0;
			if (object.messageId !== null)
				message.messageId = String(object.messageId);
			if (object.requestUuid !== null)
				message.requestUuid = String(object.requestUuid);
			if (object.details !== null)
				if (typeof object.details === "string")
					$util.base64.decode(
						object.details,
						(message.details = $util.newBuffer(
							$util.base64.length(object.details)
						)),
						0
					);
				else if (object.details.length) message.details = object.details;
			if (object.error !== null) message.error = String(object.error);
			if (object.opened) {
				if (!Array.isArray(object.opened))
					throw TypeError(".queue.QueueMessage.opened: array expected");
				message.opened = [];
				for (var i = 0; i < object.opened.length; ++i)
					message.opened[i] = String(object.opened[i]);
			}
			if (object.deleted) {
				if (!Array.isArray(object.deleted))
					throw TypeError(".queue.QueueMessage.deleted: array expected");
				message.deleted = [];
				for (var i = 0; i < object.deleted.length; ++i)
					message.deleted[i] = String(object.deleted[i]);
			}
			if (object.delivered) {
				if (!Array.isArray(object.delivered))
					throw TypeError(".queue.QueueMessage.delivered: array expected");
				message.delivered = [];
				for (var i = 0; i < object.delivered.length; ++i)
					message.delivered[i] = String(object.delivered[i]);
			}
			return message;
		};

		/**
		 * Creates a plain object from a QueueMessage message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof queue.QueueMessage
		 * @static
		 * @param {queue.QueueMessage} message QueueMessage
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		QueueMessage.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.arrays || options.defaults) {
				object.opened = [];
				object.deleted = [];
				object.delivered = [];
			}
			if (options.defaults) {
				object.userId = "";
				object.conversation = "";
				object.bot = "";
				object.createdOn = 0;
				object.createdBy = "";
				object.contentType = 0;
				object.messageId = "";
				object.requestUuid = "";
				if (options.bytes === String) object.details = "";
				else {
					object.details = [];
					if (options.bytes !== Array)
						object.details = $util.newBuffer(object.details);
				}
				object.error = "";
			}
			if (message.userId !== null && message.hasOwnProperty("userId"))
				object.userId = message.userId;
			if (
				message.conversation !== null &&
				message.hasOwnProperty("conversation")
			)
				object.conversation = message.conversation;
			if (message.bot !== null && message.hasOwnProperty("bot"))
				object.bot = message.bot;
			if (message.createdOn !== null && message.hasOwnProperty("createdOn"))
				object.createdOn =
					options.json && !isFinite(message.createdOn)
						? String(message.createdOn)
						: message.createdOn;
			if (message.createdBy !== null && message.hasOwnProperty("createdBy"))
				object.createdBy = message.createdBy;
			if (message.contentType !== null && message.hasOwnProperty("contentType"))
				object.contentType = message.contentType;
			if (message.messageId !== null && message.hasOwnProperty("messageId"))
				object.messageId = message.messageId;
			if (message.requestUuid !== null && message.hasOwnProperty("requestUuid"))
				object.requestUuid = message.requestUuid;
			if (message.details !== null && message.hasOwnProperty("details"))
				object.details =
					options.bytes === String
						? $util.base64.encode(message.details, 0, message.details.length)
						: options.bytes === Array
						? Array.prototype.slice.call(message.details)
						: message.details;
			if (message.error !== null && message.hasOwnProperty("error"))
				object.error = message.error;
			if (message.opened && message.opened.length) {
				object.opened = [];
				for (var j = 0; j < message.opened.length; ++j)
					object.opened[j] = message.opened[j];
			}
			if (message.deleted && message.deleted.length) {
				object.deleted = [];
				for (var j = 0; j < message.deleted.length; ++j)
					object.deleted[j] = message.deleted[j];
			}
			if (message.delivered && message.delivered.length) {
				object.delivered = [];
				for (var j = 0; j < message.delivered.length; ++j)
					object.delivered[j] = message.delivered[j];
			}
			return object;
		};

		/**
		 * Converts this QueueMessage to JSON.
		 * @function toJSON
		 * @memberof queue.QueueMessage
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		QueueMessage.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return QueueMessage;
	})();

	queue.QueueMessageInput = (function () {
		/**
		 * Properties of a QueueMessageInput.
		 * @memberof queue
		 * @interface IQueueMessageInput
		 * @property {number|null} [startTime] QueueMessageInput startTime
		 */

		/**
		 * Constructs a new QueueMessageInput.
		 * @memberof queue
		 * @classdesc Represents a QueueMessageInput.
		 * @implements IQueueMessageInput
		 * @constructor
		 * @param {queue.IQueueMessageInput=} [properties] Properties to set
		 */
		function QueueMessageInput(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * QueueMessageInput startTime.
		 * @member {number} startTime
		 * @memberof queue.QueueMessageInput
		 * @instance
		 */
		QueueMessageInput.prototype.startTime = 0;

		/**
		 * Creates a new QueueMessageInput instance using the specified properties.
		 * @function create
		 * @memberof queue.QueueMessageInput
		 * @static
		 * @param {queue.IQueueMessageInput=} [properties] Properties to set
		 * @returns {queue.QueueMessageInput} QueueMessageInput instance
		 */
		QueueMessageInput.create = function create(properties) {
			return new QueueMessageInput(properties);
		};

		/**
		 * Encodes the specified QueueMessageInput message. Does not implicitly {@link queue.QueueMessageInput.verify|verify} messages.
		 * @function encode
		 * @memberof queue.QueueMessageInput
		 * @static
		 * @param {queue.IQueueMessageInput} message QueueMessageInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		QueueMessageInput.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.startTime !== null &&
				Object.hasOwnProperty.call(message, "startTime")
			)
				writer.uint32(/* id 1, wireType 1 =*/ 9).double(message.startTime);
			return writer;
		};

		/**
		 * Encodes the specified QueueMessageInput message, length delimited. Does not implicitly {@link queue.QueueMessageInput.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof queue.QueueMessageInput
		 * @static
		 * @param {queue.IQueueMessageInput} message QueueMessageInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		QueueMessageInput.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a QueueMessageInput message from the specified reader or buffer.
		 * @function decode
		 * @memberof queue.QueueMessageInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {queue.QueueMessageInput} QueueMessageInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		QueueMessageInput.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.queue.QueueMessageInput();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.startTime = reader.double();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a QueueMessageInput message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof queue.QueueMessageInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {queue.QueueMessageInput} QueueMessageInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		QueueMessageInput.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a QueueMessageInput message.
		 * @function verify
		 * @memberof queue.QueueMessageInput
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		QueueMessageInput.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.startTime !== null && message.hasOwnProperty("startTime"))
				if (typeof message.startTime !== "number")
					return "startTime: number expected";
			return null;
		};

		/**
		 * Creates a QueueMessageInput message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof queue.QueueMessageInput
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {queue.QueueMessageInput} QueueMessageInput
		 */
		QueueMessageInput.fromObject = function fromObject(object) {
			if (object instanceof $root.queue.QueueMessageInput) return object;
			var message = new $root.queue.QueueMessageInput();
			if (object.startTime !== null)
				message.startTime = Number(object.startTime);
			return message;
		};

		/**
		 * Creates a plain object from a QueueMessageInput message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof queue.QueueMessageInput
		 * @static
		 * @param {queue.QueueMessageInput} message QueueMessageInput
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		QueueMessageInput.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) object.startTime = 0;
			if (message.startTime !== null && message.hasOwnProperty("startTime"))
				object.startTime =
					options.json && !isFinite(message.startTime)
						? String(message.startTime)
						: message.startTime;
			return object;
		};

		/**
		 * Converts this QueueMessageInput to JSON.
		 * @function toJSON
		 * @memberof queue.QueueMessageInput
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		QueueMessageInput.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return QueueMessageInput;
	})();

	queue.QueueResponseList = (function () {
		/**
		 * Properties of a QueueResponseList.
		 * @memberof queue
		 * @interface IQueueResponseList
		 * @property {Array.<queue.IQueueMessage>|null} [queueMessages] QueueResponseList queueMessages
		 */

		/**
		 * Constructs a new QueueResponseList.
		 * @memberof queue
		 * @classdesc Represents a QueueResponseList.
		 * @implements IQueueResponseList
		 * @constructor
		 * @param {queue.IQueueResponseList=} [properties] Properties to set
		 */
		function QueueResponseList(properties) {
			this.queueMessages = [];
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * QueueResponseList queueMessages.
		 * @member {Array.<queue.IQueueMessage>} queueMessages
		 * @memberof queue.QueueResponseList
		 * @instance
		 */
		QueueResponseList.prototype.queueMessages = $util.emptyArray;

		/**
		 * Creates a new QueueResponseList instance using the specified properties.
		 * @function create
		 * @memberof queue.QueueResponseList
		 * @static
		 * @param {queue.IQueueResponseList=} [properties] Properties to set
		 * @returns {queue.QueueResponseList} QueueResponseList instance
		 */
		QueueResponseList.create = function create(properties) {
			return new QueueResponseList(properties);
		};

		/**
		 * Encodes the specified QueueResponseList message. Does not implicitly {@link queue.QueueResponseList.verify|verify} messages.
		 * @function encode
		 * @memberof queue.QueueResponseList
		 * @static
		 * @param {queue.IQueueResponseList} message QueueResponseList message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		QueueResponseList.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.queueMessages !== null && message.queueMessages.length)
				for (var i = 0; i < message.queueMessages.length; ++i)
					$root.queue.QueueMessage.encode(
						message.queueMessages[i],
						writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
					).ldelim();
			return writer;
		};

		/**
		 * Encodes the specified QueueResponseList message, length delimited. Does not implicitly {@link queue.QueueResponseList.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof queue.QueueResponseList
		 * @static
		 * @param {queue.IQueueResponseList} message QueueResponseList message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		QueueResponseList.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a QueueResponseList message from the specified reader or buffer.
		 * @function decode
		 * @memberof queue.QueueResponseList
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {queue.QueueResponseList} QueueResponseList
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		QueueResponseList.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.queue.QueueResponseList();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						if (!(message.queueMessages && message.queueMessages.length))
							message.queueMessages = [];
						message.queueMessages.push(
							$root.queue.QueueMessage.decode(reader, reader.uint32())
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
		 * Decodes a QueueResponseList message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof queue.QueueResponseList
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {queue.QueueResponseList} QueueResponseList
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		QueueResponseList.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a QueueResponseList message.
		 * @function verify
		 * @memberof queue.QueueResponseList
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		QueueResponseList.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (
				message.queueMessages !== null &&
				message.hasOwnProperty("queueMessages")
			) {
				if (!Array.isArray(message.queueMessages))
					return "queueMessages: array expected";
				for (var i = 0; i < message.queueMessages.length; ++i) {
					var error = $root.queue.QueueMessage.verify(message.queueMessages[i]);
					if (error) return "queueMessages." + error;
				}
			}
			return null;
		};

		/**
		 * Creates a QueueResponseList message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof queue.QueueResponseList
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {queue.QueueResponseList} QueueResponseList
		 */
		QueueResponseList.fromObject = function fromObject(object) {
			if (object instanceof $root.queue.QueueResponseList) return object;
			var message = new $root.queue.QueueResponseList();
			if (object.queueMessages) {
				if (!Array.isArray(object.queueMessages))
					throw TypeError(
						".queue.QueueResponseList.queueMessages: array expected"
					);
				message.queueMessages = [];
				for (var i = 0; i < object.queueMessages.length; ++i) {
					if (typeof object.queueMessages[i] !== "object")
						throw TypeError(
							".queue.QueueResponseList.queueMessages: object expected"
						);
					message.queueMessages[i] = $root.queue.QueueMessage.fromObject(
						object.queueMessages[i]
					);
				}
			}
			return message;
		};

		/**
		 * Creates a plain object from a QueueResponseList message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof queue.QueueResponseList
		 * @static
		 * @param {queue.QueueResponseList} message QueueResponseList
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		QueueResponseList.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.arrays || options.defaults) object.queueMessages = [];
			if (message.queueMessages && message.queueMessages.length) {
				object.queueMessages = [];
				for (var j = 0; j < message.queueMessages.length; ++j)
					object.queueMessages[j] = $root.queue.QueueMessage.toObject(
						message.queueMessages[j],
						options
					);
			}
			return object;
		};

		/**
		 * Converts this QueueResponseList to JSON.
		 * @function toJSON
		 * @memberof queue.QueueResponseList
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		QueueResponseList.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return QueueResponseList;
	})();

	return queue;
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
