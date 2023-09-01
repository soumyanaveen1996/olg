/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader,
	$Writer = $protobuf.Writer,
	$util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.payment = (function () {
	/**
	 * Namespace payment.
	 * @exports payment
	 * @namespace
	 */
	var payment = {};

	payment.PaymentService = (function () {
		/**
		 * Constructs a new PaymentService service.
		 * @memberof payment
		 * @classdesc Represents a PaymentService
		 * @extends $protobuf.rpc.Service
		 * @constructor
		 * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
		 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
		 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
		 */
		function PaymentService(rpcImpl, requestDelimited, responseDelimited) {
			$protobuf.rpc.Service.call(
				this,
				rpcImpl,
				requestDelimited,
				responseDelimited
			);
		}

		(PaymentService.prototype = Object.create(
			$protobuf.rpc.Service.prototype
		)).constructor = PaymentService;

		/**
		 * Creates new PaymentService service using the specified rpc implementation.
		 * @function create
		 * @memberof payment.PaymentService
		 * @static
		 * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
		 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
		 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
		 * @returns {PaymentService} RPC service. Useful where requests and/or responses are streamed.
		 */
		PaymentService.create = function create(
			rpcImpl,
			requestDelimited,
			responseDelimited
		) {
			return new this(rpcImpl, requestDelimited, responseDelimited);
		};

		/**
		 * Callback as used by {@link payment.PaymentService#initiatePayment}.
		 * @memberof payment.PaymentService
		 * @typedef InitiatePaymentCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {payment.InitiatePaymentResponse} [response] InitiatePaymentResponse
		 */

		/**
		 * Calls InitiatePayment.
		 * @function initiatePayment
		 * @memberof payment.PaymentService
		 * @instance
		 * @param {payment.IInitiatePaymentInput} request InitiatePaymentInput message or plain object
		 * @param {payment.PaymentService.InitiatePaymentCallback} callback Node-style callback called with the error, if any, and InitiatePaymentResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(PaymentService.prototype.initiatePayment = function initiatePayment(
				request,
				callback
			) {
				return this.rpcCall(
					initiatePayment,
					$root.payment.InitiatePaymentInput,
					$root.payment.InitiatePaymentResponse,
					request,
					callback
				);
			}),
			"name",
			{ value: "InitiatePayment" }
		);

		/**
		 * Calls InitiatePayment.
		 * @function initiatePayment
		 * @memberof payment.PaymentService
		 * @instance
		 * @param {payment.IInitiatePaymentInput} request InitiatePaymentInput message or plain object
		 * @returns {Promise<payment.InitiatePaymentResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link payment.PaymentService#confirmPayment}.
		 * @memberof payment.PaymentService
		 * @typedef ConfirmPaymentCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {payment.ConfirmPaymentResponse} [response] ConfirmPaymentResponse
		 */

		/**
		 * Calls ConfirmPayment.
		 * @function confirmPayment
		 * @memberof payment.PaymentService
		 * @instance
		 * @param {payment.IConfirmPaymentInput} request ConfirmPaymentInput message or plain object
		 * @param {payment.PaymentService.ConfirmPaymentCallback} callback Node-style callback called with the error, if any, and ConfirmPaymentResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(PaymentService.prototype.confirmPayment = function confirmPayment(
				request,
				callback
			) {
				return this.rpcCall(
					confirmPayment,
					$root.payment.ConfirmPaymentInput,
					$root.payment.ConfirmPaymentResponse,
					request,
					callback
				);
			}),
			"name",
			{ value: "ConfirmPayment" }
		);

		/**
		 * Calls ConfirmPayment.
		 * @function confirmPayment
		 * @memberof payment.PaymentService
		 * @instance
		 * @param {payment.IConfirmPaymentInput} request ConfirmPaymentInput message or plain object
		 * @returns {Promise<payment.ConfirmPaymentResponse>} Promise
		 * @variation 2
		 */

		return PaymentService;
	})();

	payment.InitiatePaymentInput = (function () {
		/**
		 * Properties of an InitiatePaymentInput.
		 * @memberof payment
		 * @interface IInitiatePaymentInput
		 * @property {string|null} [paymentMethodId] InitiatePaymentInput paymentMethodId
		 * @property {number|null} [topupAmount] InitiatePaymentInput topupAmount
		 * @property {number|null} [taxAmount] InitiatePaymentInput taxAmount
		 * @property {string|null} [currency] InitiatePaymentInput currency
		 * @property {string|null} [paymentCode] InitiatePaymentInput paymentCode
		 */

		/**
		 * Constructs a new InitiatePaymentInput.
		 * @memberof payment
		 * @classdesc Represents an InitiatePaymentInput.
		 * @implements IInitiatePaymentInput
		 * @constructor
		 * @param {payment.IInitiatePaymentInput=} [properties] Properties to set
		 */
		function InitiatePaymentInput(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * InitiatePaymentInput paymentMethodId.
		 * @member {string} paymentMethodId
		 * @memberof payment.InitiatePaymentInput
		 * @instance
		 */
		InitiatePaymentInput.prototype.paymentMethodId = "";

		/**
		 * InitiatePaymentInput topupAmount.
		 * @member {number} topupAmount
		 * @memberof payment.InitiatePaymentInput
		 * @instance
		 */
		InitiatePaymentInput.prototype.topupAmount = 0;

		/**
		 * InitiatePaymentInput taxAmount.
		 * @member {number} taxAmount
		 * @memberof payment.InitiatePaymentInput
		 * @instance
		 */
		InitiatePaymentInput.prototype.taxAmount = 0;

		/**
		 * InitiatePaymentInput currency.
		 * @member {string} currency
		 * @memberof payment.InitiatePaymentInput
		 * @instance
		 */
		InitiatePaymentInput.prototype.currency = "";

		/**
		 * InitiatePaymentInput paymentCode.
		 * @member {string} paymentCode
		 * @memberof payment.InitiatePaymentInput
		 * @instance
		 */
		InitiatePaymentInput.prototype.paymentCode = "";

		/**
		 * Creates a new InitiatePaymentInput instance using the specified properties.
		 * @function create
		 * @memberof payment.InitiatePaymentInput
		 * @static
		 * @param {payment.IInitiatePaymentInput=} [properties] Properties to set
		 * @returns {payment.InitiatePaymentInput} InitiatePaymentInput instance
		 */
		InitiatePaymentInput.create = function create(properties) {
			return new InitiatePaymentInput(properties);
		};

		/**
		 * Encodes the specified InitiatePaymentInput message. Does not implicitly {@link payment.InitiatePaymentInput.verify|verify} messages.
		 * @function encode
		 * @memberof payment.InitiatePaymentInput
		 * @static
		 * @param {payment.IInitiatePaymentInput} message InitiatePaymentInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		InitiatePaymentInput.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.paymentMethodId !== null &&
				message.hasOwnProperty("paymentMethodId")
			)
				writer
					.uint32(/* id 1, wireType 2 =*/ 10)
					.string(message.paymentMethodId);
			if (message.topupAmount !== null && message.hasOwnProperty("topupAmount"))
				writer.uint32(/* id 2, wireType 5 =*/ 21).float(message.topupAmount);
			if (message.taxAmount !== null && message.hasOwnProperty("taxAmount"))
				writer.uint32(/* id 3, wireType 5 =*/ 29).float(message.taxAmount);
			if (message.currency !== null && message.hasOwnProperty("currency"))
				writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.currency);
			if (message.paymentCode !== null && message.hasOwnProperty("paymentCode"))
				writer.uint32(/* id 5, wireType 2 =*/ 42).string(message.paymentCode);
			return writer;
		};

		/**
		 * Encodes the specified InitiatePaymentInput message, length delimited. Does not implicitly {@link payment.InitiatePaymentInput.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof payment.InitiatePaymentInput
		 * @static
		 * @param {payment.IInitiatePaymentInput} message InitiatePaymentInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		InitiatePaymentInput.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes an InitiatePaymentInput message from the specified reader or buffer.
		 * @function decode
		 * @memberof payment.InitiatePaymentInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {payment.InitiatePaymentInput} InitiatePaymentInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		InitiatePaymentInput.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.payment.InitiatePaymentInput();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.paymentMethodId = reader.string();
						break;
					case 2:
						message.topupAmount = reader.float();
						break;
					case 3:
						message.taxAmount = reader.float();
						break;
					case 4:
						message.currency = reader.string();
						break;
					case 5:
						message.paymentCode = reader.string();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes an InitiatePaymentInput message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof payment.InitiatePaymentInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {payment.InitiatePaymentInput} InitiatePaymentInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		InitiatePaymentInput.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies an InitiatePaymentInput message.
		 * @function verify
		 * @memberof payment.InitiatePaymentInput
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		InitiatePaymentInput.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (
				message.paymentMethodId !== null &&
				message.hasOwnProperty("paymentMethodId")
			)
				if (!$util.isString(message.paymentMethodId))
					return "paymentMethodId: string expected";
			if (message.topupAmount !== null && message.hasOwnProperty("topupAmount"))
				if (typeof message.topupAmount !== "number")
					return "topupAmount: number expected";
			if (message.taxAmount !== null && message.hasOwnProperty("taxAmount"))
				if (typeof message.taxAmount !== "number")
					return "taxAmount: number expected";
			if (message.currency !== null && message.hasOwnProperty("currency"))
				if (!$util.isString(message.currency))
					return "currency: string expected";
			if (message.paymentCode !== null && message.hasOwnProperty("paymentCode"))
				if (!$util.isString(message.paymentCode))
					return "paymentCode: string expected";
			return null;
		};

		/**
		 * Creates an InitiatePaymentInput message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof payment.InitiatePaymentInput
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {payment.InitiatePaymentInput} InitiatePaymentInput
		 */
		InitiatePaymentInput.fromObject = function fromObject(object) {
			if (object instanceof $root.payment.InitiatePaymentInput) return object;
			var message = new $root.payment.InitiatePaymentInput();
			if (object.paymentMethodId !== null)
				message.paymentMethodId = String(object.paymentMethodId);
			if (object.topupAmount !== null)
				message.topupAmount = Number(object.topupAmount);
			if (object.taxAmount !== null)
				message.taxAmount = Number(object.taxAmount);
			if (object.currency !== null) message.currency = String(object.currency);
			if (object.paymentCode !== null)
				message.paymentCode = String(object.paymentCode);
			return message;
		};

		/**
		 * Creates a plain object from an InitiatePaymentInput message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof payment.InitiatePaymentInput
		 * @static
		 * @param {payment.InitiatePaymentInput} message InitiatePaymentInput
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		InitiatePaymentInput.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.paymentMethodId = "";
				object.topupAmount = 0;
				object.taxAmount = 0;
				object.currency = "";
				object.paymentCode = "";
			}
			if (
				message.paymentMethodId !== null &&
				message.hasOwnProperty("paymentMethodId")
			)
				object.paymentMethodId = message.paymentMethodId;
			if (message.topupAmount !== null && message.hasOwnProperty("topupAmount"))
				object.topupAmount =
					options.json && !isFinite(message.topupAmount)
						? String(message.topupAmount)
						: message.topupAmount;
			if (message.taxAmount !== null && message.hasOwnProperty("taxAmount"))
				object.taxAmount =
					options.json && !isFinite(message.taxAmount)
						? String(message.taxAmount)
						: message.taxAmount;
			if (message.currency !== null && message.hasOwnProperty("currency"))
				object.currency = message.currency;
			if (message.paymentCode !== null && message.hasOwnProperty("paymentCode"))
				object.paymentCode = message.paymentCode;
			return object;
		};

		/**
		 * Converts this InitiatePaymentInput to JSON.
		 * @function toJSON
		 * @memberof payment.InitiatePaymentInput
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		InitiatePaymentInput.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return InitiatePaymentInput;
	})();

	payment.InitiatePaymentResponse = (function () {
		/**
		 * Properties of an InitiatePaymentResponse.
		 * @memberof payment
		 * @interface IInitiatePaymentResponse
		 * @property {boolean|null} [success] InitiatePaymentResponse success
		 * @property {string|null} [errorMessage] InitiatePaymentResponse errorMessage
		 * @property {boolean|null} [actionRequired] InitiatePaymentResponse actionRequired
		 * @property {string|null} [clientSecret] InitiatePaymentResponse clientSecret
		 */

		/**
		 * Constructs a new InitiatePaymentResponse.
		 * @memberof payment
		 * @classdesc Represents an InitiatePaymentResponse.
		 * @implements IInitiatePaymentResponse
		 * @constructor
		 * @param {payment.IInitiatePaymentResponse=} [properties] Properties to set
		 */
		function InitiatePaymentResponse(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * InitiatePaymentResponse success.
		 * @member {boolean} success
		 * @memberof payment.InitiatePaymentResponse
		 * @instance
		 */
		InitiatePaymentResponse.prototype.success = false;

		/**
		 * InitiatePaymentResponse errorMessage.
		 * @member {string} errorMessage
		 * @memberof payment.InitiatePaymentResponse
		 * @instance
		 */
		InitiatePaymentResponse.prototype.errorMessage = "";

		/**
		 * InitiatePaymentResponse actionRequired.
		 * @member {boolean} actionRequired
		 * @memberof payment.InitiatePaymentResponse
		 * @instance
		 */
		InitiatePaymentResponse.prototype.actionRequired = false;

		/**
		 * InitiatePaymentResponse clientSecret.
		 * @member {string} clientSecret
		 * @memberof payment.InitiatePaymentResponse
		 * @instance
		 */
		InitiatePaymentResponse.prototype.clientSecret = "";

		/**
		 * Creates a new InitiatePaymentResponse instance using the specified properties.
		 * @function create
		 * @memberof payment.InitiatePaymentResponse
		 * @static
		 * @param {payment.IInitiatePaymentResponse=} [properties] Properties to set
		 * @returns {payment.InitiatePaymentResponse} InitiatePaymentResponse instance
		 */
		InitiatePaymentResponse.create = function create(properties) {
			return new InitiatePaymentResponse(properties);
		};

		/**
		 * Encodes the specified InitiatePaymentResponse message. Does not implicitly {@link payment.InitiatePaymentResponse.verify|verify} messages.
		 * @function encode
		 * @memberof payment.InitiatePaymentResponse
		 * @static
		 * @param {payment.IInitiatePaymentResponse} message InitiatePaymentResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		InitiatePaymentResponse.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.success !== null && message.hasOwnProperty("success"))
				writer.uint32(/* id 1, wireType 0 =*/ 8).bool(message.success);
			if (
				message.errorMessage !== null &&
				message.hasOwnProperty("errorMessage")
			)
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.errorMessage);
			if (
				message.actionRequired !== null &&
				message.hasOwnProperty("actionRequired")
			)
				writer.uint32(/* id 3, wireType 0 =*/ 24).bool(message.actionRequired);
			if (
				message.clientSecret !== null &&
				message.hasOwnProperty("clientSecret")
			)
				writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.clientSecret);
			return writer;
		};

		/**
		 * Encodes the specified InitiatePaymentResponse message, length delimited. Does not implicitly {@link payment.InitiatePaymentResponse.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof payment.InitiatePaymentResponse
		 * @static
		 * @param {payment.IInitiatePaymentResponse} message InitiatePaymentResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		InitiatePaymentResponse.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes an InitiatePaymentResponse message from the specified reader or buffer.
		 * @function decode
		 * @memberof payment.InitiatePaymentResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {payment.InitiatePaymentResponse} InitiatePaymentResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		InitiatePaymentResponse.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.payment.InitiatePaymentResponse();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.success = reader.bool();
						break;
					case 2:
						message.errorMessage = reader.string();
						break;
					case 3:
						message.actionRequired = reader.bool();
						break;
					case 4:
						message.clientSecret = reader.string();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes an InitiatePaymentResponse message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof payment.InitiatePaymentResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {payment.InitiatePaymentResponse} InitiatePaymentResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		InitiatePaymentResponse.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies an InitiatePaymentResponse message.
		 * @function verify
		 * @memberof payment.InitiatePaymentResponse
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		InitiatePaymentResponse.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.success !== null && message.hasOwnProperty("success"))
				if (typeof message.success !== "boolean")
					return "success: boolean expected";
			if (
				message.errorMessage !== null &&
				message.hasOwnProperty("errorMessage")
			)
				if (!$util.isString(message.errorMessage))
					return "errorMessage: string expected";
			if (
				message.actionRequired !== null &&
				message.hasOwnProperty("actionRequired")
			)
				if (typeof message.actionRequired !== "boolean")
					return "actionRequired: boolean expected";
			if (
				message.clientSecret !== null &&
				message.hasOwnProperty("clientSecret")
			)
				if (!$util.isString(message.clientSecret))
					return "clientSecret: string expected";
			return null;
		};

		/**
		 * Creates an InitiatePaymentResponse message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof payment.InitiatePaymentResponse
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {payment.InitiatePaymentResponse} InitiatePaymentResponse
		 */
		InitiatePaymentResponse.fromObject = function fromObject(object) {
			if (object instanceof $root.payment.InitiatePaymentResponse)
				return object;
			var message = new $root.payment.InitiatePaymentResponse();
			if (object.success !== null) message.success = Boolean(object.success);
			if (object.errorMessage !== null)
				message.errorMessage = String(object.errorMessage);
			if (object.actionRequired !== null)
				message.actionRequired = Boolean(object.actionRequired);
			if (object.clientSecret !== null)
				message.clientSecret = String(object.clientSecret);
			return message;
		};

		/**
		 * Creates a plain object from an InitiatePaymentResponse message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof payment.InitiatePaymentResponse
		 * @static
		 * @param {payment.InitiatePaymentResponse} message InitiatePaymentResponse
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		InitiatePaymentResponse.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.success = false;
				object.errorMessage = "";
				object.actionRequired = false;
				object.clientSecret = "";
			}
			if (message.success !== null && message.hasOwnProperty("success"))
				object.success = message.success;
			if (
				message.errorMessage !== null &&
				message.hasOwnProperty("errorMessage")
			)
				object.errorMessage = message.errorMessage;
			if (
				message.actionRequired !== null &&
				message.hasOwnProperty("actionRequired")
			)
				object.actionRequired = message.actionRequired;
			if (
				message.clientSecret !== null &&
				message.hasOwnProperty("clientSecret")
			)
				object.clientSecret = message.clientSecret;
			return object;
		};

		/**
		 * Converts this InitiatePaymentResponse to JSON.
		 * @function toJSON
		 * @memberof payment.InitiatePaymentResponse
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		InitiatePaymentResponse.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return InitiatePaymentResponse;
	})();

	payment.ConfirmPaymentInput = (function () {
		/**
		 * Properties of a ConfirmPaymentInput.
		 * @memberof payment
		 * @interface IConfirmPaymentInput
		 * @property {string|null} [paymentIntentId] ConfirmPaymentInput paymentIntentId
		 * @property {number|null} [topupAmount] ConfirmPaymentInput topupAmount
		 * @property {number|null} [taxAmount] ConfirmPaymentInput taxAmount
		 * @property {string|null} [currency] ConfirmPaymentInput currency
		 * @property {string|null} [paymentCode] ConfirmPaymentInput paymentCode
		 */

		/**
		 * Constructs a new ConfirmPaymentInput.
		 * @memberof payment
		 * @classdesc Represents a ConfirmPaymentInput.
		 * @implements IConfirmPaymentInput
		 * @constructor
		 * @param {payment.IConfirmPaymentInput=} [properties] Properties to set
		 */
		function ConfirmPaymentInput(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * ConfirmPaymentInput paymentIntentId.
		 * @member {string} paymentIntentId
		 * @memberof payment.ConfirmPaymentInput
		 * @instance
		 */
		ConfirmPaymentInput.prototype.paymentIntentId = "";

		/**
		 * ConfirmPaymentInput topupAmount.
		 * @member {number} topupAmount
		 * @memberof payment.ConfirmPaymentInput
		 * @instance
		 */
		ConfirmPaymentInput.prototype.topupAmount = 0;

		/**
		 * ConfirmPaymentInput taxAmount.
		 * @member {number} taxAmount
		 * @memberof payment.ConfirmPaymentInput
		 * @instance
		 */
		ConfirmPaymentInput.prototype.taxAmount = 0;

		/**
		 * ConfirmPaymentInput currency.
		 * @member {string} currency
		 * @memberof payment.ConfirmPaymentInput
		 * @instance
		 */
		ConfirmPaymentInput.prototype.currency = "";

		/**
		 * ConfirmPaymentInput paymentCode.
		 * @member {string} paymentCode
		 * @memberof payment.ConfirmPaymentInput
		 * @instance
		 */
		ConfirmPaymentInput.prototype.paymentCode = "";

		/**
		 * Creates a new ConfirmPaymentInput instance using the specified properties.
		 * @function create
		 * @memberof payment.ConfirmPaymentInput
		 * @static
		 * @param {payment.IConfirmPaymentInput=} [properties] Properties to set
		 * @returns {payment.ConfirmPaymentInput} ConfirmPaymentInput instance
		 */
		ConfirmPaymentInput.create = function create(properties) {
			return new ConfirmPaymentInput(properties);
		};

		/**
		 * Encodes the specified ConfirmPaymentInput message. Does not implicitly {@link payment.ConfirmPaymentInput.verify|verify} messages.
		 * @function encode
		 * @memberof payment.ConfirmPaymentInput
		 * @static
		 * @param {payment.IConfirmPaymentInput} message ConfirmPaymentInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		ConfirmPaymentInput.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.paymentIntentId !== null &&
				message.hasOwnProperty("paymentIntentId")
			)
				writer
					.uint32(/* id 1, wireType 2 =*/ 10)
					.string(message.paymentIntentId);
			if (message.topupAmount !== null && message.hasOwnProperty("topupAmount"))
				writer.uint32(/* id 2, wireType 5 =*/ 21).float(message.topupAmount);
			if (message.taxAmount !== null && message.hasOwnProperty("taxAmount"))
				writer.uint32(/* id 3, wireType 5 =*/ 29).float(message.taxAmount);
			if (message.currency !== null && message.hasOwnProperty("currency"))
				writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.currency);
			if (message.paymentCode !== null && message.hasOwnProperty("paymentCode"))
				writer.uint32(/* id 5, wireType 2 =*/ 42).string(message.paymentCode);
			return writer;
		};

		/**
		 * Encodes the specified ConfirmPaymentInput message, length delimited. Does not implicitly {@link payment.ConfirmPaymentInput.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof payment.ConfirmPaymentInput
		 * @static
		 * @param {payment.IConfirmPaymentInput} message ConfirmPaymentInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		ConfirmPaymentInput.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a ConfirmPaymentInput message from the specified reader or buffer.
		 * @function decode
		 * @memberof payment.ConfirmPaymentInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {payment.ConfirmPaymentInput} ConfirmPaymentInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		ConfirmPaymentInput.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.payment.ConfirmPaymentInput();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.paymentIntentId = reader.string();
						break;
					case 2:
						message.topupAmount = reader.float();
						break;
					case 3:
						message.taxAmount = reader.float();
						break;
					case 4:
						message.currency = reader.string();
						break;
					case 5:
						message.paymentCode = reader.string();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a ConfirmPaymentInput message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof payment.ConfirmPaymentInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {payment.ConfirmPaymentInput} ConfirmPaymentInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		ConfirmPaymentInput.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a ConfirmPaymentInput message.
		 * @function verify
		 * @memberof payment.ConfirmPaymentInput
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		ConfirmPaymentInput.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (
				message.paymentIntentId !== null &&
				message.hasOwnProperty("paymentIntentId")
			)
				if (!$util.isString(message.paymentIntentId))
					return "paymentIntentId: string expected";
			if (message.topupAmount !== null && message.hasOwnProperty("topupAmount"))
				if (typeof message.topupAmount !== "number")
					return "topupAmount: number expected";
			if (message.taxAmount !== null && message.hasOwnProperty("taxAmount"))
				if (typeof message.taxAmount !== "number")
					return "taxAmount: number expected";
			if (message.currency !== null && message.hasOwnProperty("currency"))
				if (!$util.isString(message.currency))
					return "currency: string expected";
			if (message.paymentCode !== null && message.hasOwnProperty("paymentCode"))
				if (!$util.isString(message.paymentCode))
					return "paymentCode: string expected";
			return null;
		};

		/**
		 * Creates a ConfirmPaymentInput message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof payment.ConfirmPaymentInput
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {payment.ConfirmPaymentInput} ConfirmPaymentInput
		 */
		ConfirmPaymentInput.fromObject = function fromObject(object) {
			if (object instanceof $root.payment.ConfirmPaymentInput) return object;
			var message = new $root.payment.ConfirmPaymentInput();
			if (object.paymentIntentId !== null)
				message.paymentIntentId = String(object.paymentIntentId);
			if (object.topupAmount !== null)
				message.topupAmount = Number(object.topupAmount);
			if (object.taxAmount !== null)
				message.taxAmount = Number(object.taxAmount);
			if (object.currency !== null) message.currency = String(object.currency);
			if (object.paymentCode !== null)
				message.paymentCode = String(object.paymentCode);
			return message;
		};

		/**
		 * Creates a plain object from a ConfirmPaymentInput message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof payment.ConfirmPaymentInput
		 * @static
		 * @param {payment.ConfirmPaymentInput} message ConfirmPaymentInput
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		ConfirmPaymentInput.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.paymentIntentId = "";
				object.topupAmount = 0;
				object.taxAmount = 0;
				object.currency = "";
				object.paymentCode = "";
			}
			if (
				message.paymentIntentId !== null &&
				message.hasOwnProperty("paymentIntentId")
			)
				object.paymentIntentId = message.paymentIntentId;
			if (message.topupAmount !== null && message.hasOwnProperty("topupAmount"))
				object.topupAmount =
					options.json && !isFinite(message.topupAmount)
						? String(message.topupAmount)
						: message.topupAmount;
			if (message.taxAmount !== null && message.hasOwnProperty("taxAmount"))
				object.taxAmount =
					options.json && !isFinite(message.taxAmount)
						? String(message.taxAmount)
						: message.taxAmount;
			if (message.currency !== null && message.hasOwnProperty("currency"))
				object.currency = message.currency;
			if (message.paymentCode !== null && message.hasOwnProperty("paymentCode"))
				object.paymentCode = message.paymentCode;
			return object;
		};

		/**
		 * Converts this ConfirmPaymentInput to JSON.
		 * @function toJSON
		 * @memberof payment.ConfirmPaymentInput
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		ConfirmPaymentInput.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return ConfirmPaymentInput;
	})();

	payment.ConfirmPaymentResponse = (function () {
		/**
		 * Properties of a ConfirmPaymentResponse.
		 * @memberof payment
		 * @interface IConfirmPaymentResponse
		 * @property {boolean|null} [success] ConfirmPaymentResponse success
		 * @property {string|null} [errorMessage] ConfirmPaymentResponse errorMessage
		 */

		/**
		 * Constructs a new ConfirmPaymentResponse.
		 * @memberof payment
		 * @classdesc Represents a ConfirmPaymentResponse.
		 * @implements IConfirmPaymentResponse
		 * @constructor
		 * @param {payment.IConfirmPaymentResponse=} [properties] Properties to set
		 */
		function ConfirmPaymentResponse(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * ConfirmPaymentResponse success.
		 * @member {boolean} success
		 * @memberof payment.ConfirmPaymentResponse
		 * @instance
		 */
		ConfirmPaymentResponse.prototype.success = false;

		/**
		 * ConfirmPaymentResponse errorMessage.
		 * @member {string} errorMessage
		 * @memberof payment.ConfirmPaymentResponse
		 * @instance
		 */
		ConfirmPaymentResponse.prototype.errorMessage = "";

		/**
		 * Creates a new ConfirmPaymentResponse instance using the specified properties.
		 * @function create
		 * @memberof payment.ConfirmPaymentResponse
		 * @static
		 * @param {payment.IConfirmPaymentResponse=} [properties] Properties to set
		 * @returns {payment.ConfirmPaymentResponse} ConfirmPaymentResponse instance
		 */
		ConfirmPaymentResponse.create = function create(properties) {
			return new ConfirmPaymentResponse(properties);
		};

		/**
		 * Encodes the specified ConfirmPaymentResponse message. Does not implicitly {@link payment.ConfirmPaymentResponse.verify|verify} messages.
		 * @function encode
		 * @memberof payment.ConfirmPaymentResponse
		 * @static
		 * @param {payment.IConfirmPaymentResponse} message ConfirmPaymentResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		ConfirmPaymentResponse.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.success !== null && message.hasOwnProperty("success"))
				writer.uint32(/* id 1, wireType 0 =*/ 8).bool(message.success);
			if (
				message.errorMessage !== null &&
				message.hasOwnProperty("errorMessage")
			)
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.errorMessage);
			return writer;
		};

		/**
		 * Encodes the specified ConfirmPaymentResponse message, length delimited. Does not implicitly {@link payment.ConfirmPaymentResponse.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof payment.ConfirmPaymentResponse
		 * @static
		 * @param {payment.IConfirmPaymentResponse} message ConfirmPaymentResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		ConfirmPaymentResponse.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a ConfirmPaymentResponse message from the specified reader or buffer.
		 * @function decode
		 * @memberof payment.ConfirmPaymentResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {payment.ConfirmPaymentResponse} ConfirmPaymentResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		ConfirmPaymentResponse.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.payment.ConfirmPaymentResponse();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.success = reader.bool();
						break;
					case 2:
						message.errorMessage = reader.string();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a ConfirmPaymentResponse message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof payment.ConfirmPaymentResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {payment.ConfirmPaymentResponse} ConfirmPaymentResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		ConfirmPaymentResponse.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a ConfirmPaymentResponse message.
		 * @function verify
		 * @memberof payment.ConfirmPaymentResponse
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		ConfirmPaymentResponse.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.success !== null && message.hasOwnProperty("success"))
				if (typeof message.success !== "boolean")
					return "success: boolean expected";
			if (
				message.errorMessage !== null &&
				message.hasOwnProperty("errorMessage")
			)
				if (!$util.isString(message.errorMessage))
					return "errorMessage: string expected";
			return null;
		};

		/**
		 * Creates a ConfirmPaymentResponse message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof payment.ConfirmPaymentResponse
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {payment.ConfirmPaymentResponse} ConfirmPaymentResponse
		 */
		ConfirmPaymentResponse.fromObject = function fromObject(object) {
			if (object instanceof $root.payment.ConfirmPaymentResponse) return object;
			var message = new $root.payment.ConfirmPaymentResponse();
			if (object.success !== null) message.success = Boolean(object.success);
			if (object.errorMessage !== null)
				message.errorMessage = String(object.errorMessage);
			return message;
		};

		/**
		 * Creates a plain object from a ConfirmPaymentResponse message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof payment.ConfirmPaymentResponse
		 * @static
		 * @param {payment.ConfirmPaymentResponse} message ConfirmPaymentResponse
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		ConfirmPaymentResponse.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.success = false;
				object.errorMessage = "";
			}
			if (message.success !== null && message.hasOwnProperty("success"))
				object.success = message.success;
			if (
				message.errorMessage !== null &&
				message.hasOwnProperty("errorMessage")
			)
				object.errorMessage = message.errorMessage;
			return object;
		};

		/**
		 * Converts this ConfirmPaymentResponse to JSON.
		 * @function toJSON
		 * @memberof payment.ConfirmPaymentResponse
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		ConfirmPaymentResponse.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return ConfirmPaymentResponse;
	})();

	return payment;
})();

module.exports = $root;
