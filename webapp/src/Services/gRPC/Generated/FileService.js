/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader,
	$Writer = $protobuf.Writer,
	$util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.file = (function () {
	/**
	 * Namespace file.
	 * @exports file
	 * @namespace
	 */
	var file = {};

	file.FileService = (function () {
		/**
		 * Constructs a new FileService service.
		 * @memberof file
		 * @classdesc Represents a FileService
		 * @extends $protobuf.rpc.Service
		 * @constructor
		 * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
		 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
		 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
		 */
		function FileService(rpcImpl, requestDelimited, responseDelimited) {
			$protobuf.rpc.Service.call(
				this,
				rpcImpl,
				requestDelimited,
				responseDelimited
			);
		}

		(FileService.prototype = Object.create(
			$protobuf.rpc.Service.prototype
		)).constructor = FileService;

		/**
		 * Creates new FileService service using the specified rpc implementation.
		 * @function create
		 * @memberof file.FileService
		 * @static
		 * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
		 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
		 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
		 * @returns {FileService} RPC service. Useful where requests and/or responses are streamed.
		 */
		FileService.create = function create(
			rpcImpl,
			requestDelimited,
			responseDelimited
		) {
			return new this(rpcImpl, requestDelimited, responseDelimited);
		};

		/**
		 * Callback as used by {@link file.FileService#uploadFile}.
		 * @memberof file.FileService
		 * @typedef UploadFileCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {file.GetFileUploadResponse} [response] GetFileUploadResponse
		 */

		/**
		 * Calls UploadFile.
		 * @function uploadFile
		 * @memberof file.FileService
		 * @instance
		 * @param {file.IGetFileUploadInput} request GetFileUploadInput message or plain object
		 * @param {file.FileService.UploadFileCallback} callback Node-style callback called with the error, if any, and GetFileUploadResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(FileService.prototype.uploadFile = function uploadFile(
				request,
				callback
			) {
				return this.rpcCall(
					uploadFile,
					$root.file.GetFileUploadInput,
					$root.file.GetFileUploadResponse,
					request,
					callback
				);
			}),
			"name",
			{ value: "UploadFile" }
		);

		/**
		 * Calls UploadFile.
		 * @function uploadFile
		 * @memberof file.FileService
		 * @instance
		 * @param {file.IGetFileUploadInput} request GetFileUploadInput message or plain object
		 * @returns {Promise<file.GetFileUploadResponse>} Promise
		 * @variation 2
		 */

		return FileService;
	})();

	file.GetFileUploadInput = (function () {
		/**
		 * Properties of a GetFileUploadInput.
		 * @memberof file
		 * @interface IGetFileUploadInput
		 * @property {Uint8Array|null} [file] GetFileUploadInput file
		 * @property {string|null} [conversationId] GetFileUploadInput conversationId
		 * @property {string|null} [fileName] GetFileUploadInput fileName
		 */

		/**
		 * Constructs a new GetFileUploadInput.
		 * @memberof file
		 * @classdesc Represents a GetFileUploadInput.
		 * @implements IGetFileUploadInput
		 * @constructor
		 * @param {file.IGetFileUploadInput=} [properties] Properties to set
		 */
		function GetFileUploadInput(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * GetFileUploadInput file.
		 * @member {Uint8Array} file
		 * @memberof file.GetFileUploadInput
		 * @instance
		 */
		GetFileUploadInput.prototype.file = $util.newBuffer([]);

		/**
		 * GetFileUploadInput conversationId.
		 * @member {string} conversationId
		 * @memberof file.GetFileUploadInput
		 * @instance
		 */
		GetFileUploadInput.prototype.conversationId = "";

		/**
		 * GetFileUploadInput fileName.
		 * @member {string} fileName
		 * @memberof file.GetFileUploadInput
		 * @instance
		 */
		GetFileUploadInput.prototype.fileName = "";

		/**
		 * Creates a new GetFileUploadInput instance using the specified properties.
		 * @function create
		 * @memberof file.GetFileUploadInput
		 * @static
		 * @param {file.IGetFileUploadInput=} [properties] Properties to set
		 * @returns {file.GetFileUploadInput} GetFileUploadInput instance
		 */
		GetFileUploadInput.create = function create(properties) {
			return new GetFileUploadInput(properties);
		};

		/**
		 * Encodes the specified GetFileUploadInput message. Does not implicitly {@link file.GetFileUploadInput.verify|verify} messages.
		 * @function encode
		 * @memberof file.GetFileUploadInput
		 * @static
		 * @param {file.IGetFileUploadInput} message GetFileUploadInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		GetFileUploadInput.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.file !== null && Object.hasOwnProperty.call(message, "file"))
				writer.uint32(/* id 1, wireType 2 =*/ 10).bytes(message.file);
			if (
				message.conversationId !== null &&
				Object.hasOwnProperty.call(message, "conversationId")
			)
				writer
					.uint32(/* id 2, wireType 2 =*/ 18)
					.string(message.conversationId);
			if (
				message.fileName !== null &&
				Object.hasOwnProperty.call(message, "fileName")
			)
				writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.fileName);
			return writer;
		};

		/**
		 * Encodes the specified GetFileUploadInput message, length delimited. Does not implicitly {@link file.GetFileUploadInput.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof file.GetFileUploadInput
		 * @static
		 * @param {file.IGetFileUploadInput} message GetFileUploadInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		GetFileUploadInput.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a GetFileUploadInput message from the specified reader or buffer.
		 * @function decode
		 * @memberof file.GetFileUploadInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {file.GetFileUploadInput} GetFileUploadInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		GetFileUploadInput.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.file.GetFileUploadInput();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.file = reader.bytes();
						break;
					case 2:
						message.conversationId = reader.string();
						break;
					case 3:
						message.fileName = reader.string();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a GetFileUploadInput message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof file.GetFileUploadInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {file.GetFileUploadInput} GetFileUploadInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		GetFileUploadInput.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a GetFileUploadInput message.
		 * @function verify
		 * @memberof file.GetFileUploadInput
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		GetFileUploadInput.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.file !== null && message.hasOwnProperty("file"))
				if (
					!(
						(message.file && typeof message.file.length === "number") ||
						$util.isString(message.file)
					)
				)
					return "file: buffer expected";
			if (
				message.conversationId !== null &&
				message.hasOwnProperty("conversationId")
			)
				if (!$util.isString(message.conversationId))
					return "conversationId: string expected";
			if (message.fileName !== null && message.hasOwnProperty("fileName"))
				if (!$util.isString(message.fileName))
					return "fileName: string expected";
			return null;
		};

		/**
		 * Creates a GetFileUploadInput message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof file.GetFileUploadInput
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {file.GetFileUploadInput} GetFileUploadInput
		 */
		GetFileUploadInput.fromObject = function fromObject(object) {
			if (object instanceof $root.file.GetFileUploadInput) return object;
			var message = new $root.file.GetFileUploadInput();
			if (object.file !== null)
				if (typeof object.file === "string")
					$util.base64.decode(
						object.file,
						(message.file = $util.newBuffer($util.base64.length(object.file))),
						0
					);
				else if (object.file.length) message.file = object.file;
			if (object.conversationId !== null)
				message.conversationId = String(object.conversationId);
			if (object.fileName !== null) message.fileName = String(object.fileName);
			return message;
		};

		/**
		 * Creates a plain object from a GetFileUploadInput message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof file.GetFileUploadInput
		 * @static
		 * @param {file.GetFileUploadInput} message GetFileUploadInput
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		GetFileUploadInput.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				if (options.bytes === String) object.file = "";
				else {
					object.file = [];
					if (options.bytes !== Array)
						object.file = $util.newBuffer(object.file);
				}
				object.conversationId = "";
				object.fileName = "";
			}
			if (message.file !== null && message.hasOwnProperty("file"))
				object.file =
					options.bytes === String
						? $util.base64.encode(message.file, 0, message.file.length)
						: options.bytes === Array
						? Array.prototype.slice.call(message.file)
						: message.file;
			if (
				message.conversationId !== null &&
				message.hasOwnProperty("conversationId")
			)
				object.conversationId = message.conversationId;
			if (message.fileName !== null && message.hasOwnProperty("fileName"))
				object.fileName = message.fileName;
			return object;
		};

		/**
		 * Converts this GetFileUploadInput to JSON.
		 * @function toJSON
		 * @memberof file.GetFileUploadInput
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		GetFileUploadInput.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return GetFileUploadInput;
	})();

	file.GetFileUploadResponse = (function () {
		/**
		 * Properties of a GetFileUploadResponse.
		 * @memberof file
		 * @interface IGetFileUploadResponse
		 * @property {boolean|null} [success] GetFileUploadResponse success
		 */

		/**
		 * Constructs a new GetFileUploadResponse.
		 * @memberof file
		 * @classdesc Represents a GetFileUploadResponse.
		 * @implements IGetFileUploadResponse
		 * @constructor
		 * @param {file.IGetFileUploadResponse=} [properties] Properties to set
		 */
		function GetFileUploadResponse(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * GetFileUploadResponse success.
		 * @member {boolean} success
		 * @memberof file.GetFileUploadResponse
		 * @instance
		 */
		GetFileUploadResponse.prototype.success = false;

		/**
		 * Creates a new GetFileUploadResponse instance using the specified properties.
		 * @function create
		 * @memberof file.GetFileUploadResponse
		 * @static
		 * @param {file.IGetFileUploadResponse=} [properties] Properties to set
		 * @returns {file.GetFileUploadResponse} GetFileUploadResponse instance
		 */
		GetFileUploadResponse.create = function create(properties) {
			return new GetFileUploadResponse(properties);
		};

		/**
		 * Encodes the specified GetFileUploadResponse message. Does not implicitly {@link file.GetFileUploadResponse.verify|verify} messages.
		 * @function encode
		 * @memberof file.GetFileUploadResponse
		 * @static
		 * @param {file.IGetFileUploadResponse} message GetFileUploadResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		GetFileUploadResponse.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.success !== null &&
				Object.hasOwnProperty.call(message, "success")
			)
				writer.uint32(/* id 1, wireType 0 =*/ 8).bool(message.success);
			return writer;
		};

		/**
		 * Encodes the specified GetFileUploadResponse message, length delimited. Does not implicitly {@link file.GetFileUploadResponse.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof file.GetFileUploadResponse
		 * @static
		 * @param {file.IGetFileUploadResponse} message GetFileUploadResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		GetFileUploadResponse.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a GetFileUploadResponse message from the specified reader or buffer.
		 * @function decode
		 * @memberof file.GetFileUploadResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {file.GetFileUploadResponse} GetFileUploadResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		GetFileUploadResponse.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.file.GetFileUploadResponse();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.success = reader.bool();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a GetFileUploadResponse message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof file.GetFileUploadResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {file.GetFileUploadResponse} GetFileUploadResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		GetFileUploadResponse.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a GetFileUploadResponse message.
		 * @function verify
		 * @memberof file.GetFileUploadResponse
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		GetFileUploadResponse.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.success !== null && message.hasOwnProperty("success"))
				if (typeof message.success !== "boolean")
					return "success: boolean expected";
			return null;
		};

		/**
		 * Creates a GetFileUploadResponse message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof file.GetFileUploadResponse
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {file.GetFileUploadResponse} GetFileUploadResponse
		 */
		GetFileUploadResponse.fromObject = function fromObject(object) {
			if (object instanceof $root.file.GetFileUploadResponse) return object;
			var message = new $root.file.GetFileUploadResponse();
			if (object.success !== null) message.success = Boolean(object.success);
			return message;
		};

		/**
		 * Creates a plain object from a GetFileUploadResponse message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof file.GetFileUploadResponse
		 * @static
		 * @param {file.GetFileUploadResponse} message GetFileUploadResponse
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		GetFileUploadResponse.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) object.success = false;
			if (message.success !== null && message.hasOwnProperty("success"))
				object.success = message.success;
			return object;
		};

		/**
		 * Converts this GetFileUploadResponse to JSON.
		 * @function toJSON
		 * @memberof file.GetFileUploadResponse
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		GetFileUploadResponse.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return GetFileUploadResponse;
	})();

	return file;
})();

module.exports = $root;
