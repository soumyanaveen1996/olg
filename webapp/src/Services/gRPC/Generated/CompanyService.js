/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader,
	$Writer = $protobuf.Writer,
	$util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.company = (function () {
	/**
	 * Namespace company.
	 * @exports company
	 * @namespace
	 */
	var company = {};

	company.CompanyService = (function () {
		/**
		 * Constructs a new CompanyService service.
		 * @memberof company
		 * @classdesc Represents a CompanyService
		 * @extends $protobuf.rpc.Service
		 * @constructor
		 * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
		 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
		 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
		 */
		function CompanyService(rpcImpl, requestDelimited, responseDelimited) {
			$protobuf.rpc.Service.call(
				this,
				rpcImpl,
				requestDelimited,
				responseDelimited
			);
		}

		(CompanyService.prototype = Object.create(
			$protobuf.rpc.Service.prototype
		)).constructor = CompanyService;

		/**
		 * Creates new CompanyService service using the specified rpc implementation.
		 * @function create
		 * @memberof company.CompanyService
		 * @static
		 * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
		 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
		 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
		 * @returns {CompanyService} RPC service. Useful where requests and/or responses are streamed.
		 */
		CompanyService.create = function create(
			rpcImpl,
			requestDelimited,
			responseDelimited
		) {
			return new this(rpcImpl, requestDelimited, responseDelimited);
		};

		/**
		 * Callback as used by {@link company.CompanyService#create}.
		 * @memberof company.CompanyService
		 * @typedef CreateCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {company.CreateCompanyResponse} [response] CreateCompanyResponse
		 */

		/**
		 * Calls Create.
		 * @function create
		 * @memberof company.CompanyService
		 * @instance
		 * @param {company.ICreateCompanyInput} request CreateCompanyInput message or plain object
		 * @param {company.CompanyService.CreateCallback} callback Node-style callback called with the error, if any, and CreateCompanyResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(CompanyService.prototype.create = function create(request, callback) {
				return this.rpcCall(
					create,
					$root.company.CreateCompanyInput,
					$root.company.CreateCompanyResponse,
					request,
					callback
				);
			}),
			"name",
			{ value: "Create" }
		);

		/**
		 * Calls Create.
		 * @function create
		 * @memberof company.CompanyService
		 * @instance
		 * @param {company.ICreateCompanyInput} request CreateCompanyInput message or plain object
		 * @returns {Promise<company.CreateCompanyResponse>} Promise
		 * @variation 2
		 */

		return CompanyService;
	})();

	company.CreateCompanyInput = (function () {
		/**
		 * Properties of a CreateCompanyInput.
		 * @memberof company
		 * @interface ICreateCompanyInput
		 * @property {string|null} [action] CreateCompanyInput action
		 * @property {string|null} [companyId] CreateCompanyInput companyId
		 * @property {string|null} [companyName] CreateCompanyInput companyName
		 * @property {string|null} [companyDescription] CreateCompanyInput companyDescription
		 * @property {string|null} [companyAddress] CreateCompanyInput companyAddress
		 * @property {string|null} [companyCountry] CreateCompanyInput companyCountry
		 * @property {Array.<commonmessages.IDomainRoles>|null} [domains] CreateCompanyInput domains
		 */

		/**
		 * Constructs a new CreateCompanyInput.
		 * @memberof company
		 * @classdesc Represents a CreateCompanyInput.
		 * @implements ICreateCompanyInput
		 * @constructor
		 * @param {company.ICreateCompanyInput=} [properties] Properties to set
		 */
		function CreateCompanyInput(properties) {
			this.domains = [];
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * CreateCompanyInput action.
		 * @member {string} action
		 * @memberof company.CreateCompanyInput
		 * @instance
		 */
		CreateCompanyInput.prototype.action = "";

		/**
		 * CreateCompanyInput companyId.
		 * @member {string} companyId
		 * @memberof company.CreateCompanyInput
		 * @instance
		 */
		CreateCompanyInput.prototype.companyId = "";

		/**
		 * CreateCompanyInput companyName.
		 * @member {string} companyName
		 * @memberof company.CreateCompanyInput
		 * @instance
		 */
		CreateCompanyInput.prototype.companyName = "";

		/**
		 * CreateCompanyInput companyDescription.
		 * @member {string} companyDescription
		 * @memberof company.CreateCompanyInput
		 * @instance
		 */
		CreateCompanyInput.prototype.companyDescription = "";

		/**
		 * CreateCompanyInput companyAddress.
		 * @member {string} companyAddress
		 * @memberof company.CreateCompanyInput
		 * @instance
		 */
		CreateCompanyInput.prototype.companyAddress = "";

		/**
		 * CreateCompanyInput companyCountry.
		 * @member {string} companyCountry
		 * @memberof company.CreateCompanyInput
		 * @instance
		 */
		CreateCompanyInput.prototype.companyCountry = "";

		/**
		 * CreateCompanyInput domains.
		 * @member {Array.<commonmessages.IDomainRoles>} domains
		 * @memberof company.CreateCompanyInput
		 * @instance
		 */
		CreateCompanyInput.prototype.domains = $util.emptyArray;

		/**
		 * Creates a new CreateCompanyInput instance using the specified properties.
		 * @function create
		 * @memberof company.CreateCompanyInput
		 * @static
		 * @param {company.ICreateCompanyInput=} [properties] Properties to set
		 * @returns {company.CreateCompanyInput} CreateCompanyInput instance
		 */
		CreateCompanyInput.create = function create(properties) {
			return new CreateCompanyInput(properties);
		};

		/**
		 * Encodes the specified CreateCompanyInput message. Does not implicitly {@link company.CreateCompanyInput.verify|verify} messages.
		 * @function encode
		 * @memberof company.CreateCompanyInput
		 * @static
		 * @param {company.ICreateCompanyInput} message CreateCompanyInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		CreateCompanyInput.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.action !== null && message.hasOwnProperty("action"))
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.action);
			if (message.companyId !== null && message.hasOwnProperty("companyId"))
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.companyId);
			if (message.companyName !== null && message.hasOwnProperty("companyName"))
				writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.companyName);
			if (
				message.companyDescription !== null &&
				message.hasOwnProperty("companyDescription")
			)
				writer
					.uint32(/* id 4, wireType 2 =*/ 34)
					.string(message.companyDescription);
			if (
				message.companyAddress !== null &&
				message.hasOwnProperty("companyAddress")
			)
				writer
					.uint32(/* id 5, wireType 2 =*/ 42)
					.string(message.companyAddress);
			if (message.domains !== null && message.domains.length)
				for (var i = 0; i < message.domains.length; ++i)
					$root.commonmessages.DomainRoles.encode(
						message.domains[i],
						writer.uint32(/* id 6, wireType 2 =*/ 50).fork()
					).ldelim();
			if (
				message.companyCountry !== null &&
				message.hasOwnProperty("companyCountry")
			)
				writer
					.uint32(/* id 7, wireType 2 =*/ 58)
					.string(message.companyCountry);
			return writer;
		};

		/**
		 * Encodes the specified CreateCompanyInput message, length delimited. Does not implicitly {@link company.CreateCompanyInput.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof company.CreateCompanyInput
		 * @static
		 * @param {company.ICreateCompanyInput} message CreateCompanyInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		CreateCompanyInput.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a CreateCompanyInput message from the specified reader or buffer.
		 * @function decode
		 * @memberof company.CreateCompanyInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {company.CreateCompanyInput} CreateCompanyInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		CreateCompanyInput.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.company.CreateCompanyInput();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.action = reader.string();
						break;
					case 2:
						message.companyId = reader.string();
						break;
					case 3:
						message.companyName = reader.string();
						break;
					case 4:
						message.companyDescription = reader.string();
						break;
					case 5:
						message.companyAddress = reader.string();
						break;
					case 7:
						message.companyCountry = reader.string();
						break;
					case 6:
						if (!(message.domains && message.domains.length))
							message.domains = [];
						message.domains.push(
							$root.commonmessages.DomainRoles.decode(reader, reader.uint32())
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
		 * Decodes a CreateCompanyInput message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof company.CreateCompanyInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {company.CreateCompanyInput} CreateCompanyInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		CreateCompanyInput.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a CreateCompanyInput message.
		 * @function verify
		 * @memberof company.CreateCompanyInput
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		CreateCompanyInput.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.action !== null && message.hasOwnProperty("action"))
				if (!$util.isString(message.action)) return "action: string expected";
			if (message.companyId !== null && message.hasOwnProperty("companyId"))
				if (!$util.isString(message.companyId))
					return "companyId: string expected";
			if (message.companyName !== null && message.hasOwnProperty("companyName"))
				if (!$util.isString(message.companyName))
					return "companyName: string expected";
			if (
				message.companyDescription !== null &&
				message.hasOwnProperty("companyDescription")
			)
				if (!$util.isString(message.companyDescription))
					return "companyDescription: string expected";
			if (
				message.companyAddress !== null &&
				message.hasOwnProperty("companyAddress")
			)
				if (!$util.isString(message.companyAddress))
					return "companyAddress: string expected";
			if (
				message.companyCountry !== null &&
				message.hasOwnProperty("companyCountry")
			)
				if (!$util.isString(message.companyCountry))
					return "companyCountry: string expected";
			if (message.domains !== null && message.hasOwnProperty("domains")) {
				if (!Array.isArray(message.domains)) return "domains: array expected";
				for (var i = 0; i < message.domains.length; ++i) {
					var error = $root.commonmessages.DomainRoles.verify(
						message.domains[i]
					);
					if (error) return "domains." + error;
				}
			}
			return null;
		};

		/**
		 * Creates a CreateCompanyInput message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof company.CreateCompanyInput
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {company.CreateCompanyInput} CreateCompanyInput
		 */
		CreateCompanyInput.fromObject = function fromObject(object) {
			if (object instanceof $root.company.CreateCompanyInput) return object;
			var message = new $root.company.CreateCompanyInput();
			if (object.action !== null) message.action = String(object.action);
			if (object.companyId !== null)
				message.companyId = String(object.companyId);
			if (object.companyName !== null)
				message.companyName = String(object.companyName);
			if (object.companyDescription !== null)
				message.companyDescription = String(object.companyDescription);
			if (object.companyAddress !== null)
				message.companyAddress = String(object.companyAddress);
			if (object.companyCountry !== null)
				message.companyCountry = String(object.companyCountry);
			if (object.domains) {
				if (!Array.isArray(object.domains))
					throw TypeError(
						".company.CreateCompanyInput.domains: array expected"
					);
				message.domains = [];
				for (var i = 0; i < object.domains.length; ++i) {
					if (typeof object.domains[i] !== "object")
						throw TypeError(
							".company.CreateCompanyInput.domains: object expected"
						);
					message.domains[i] = $root.commonmessages.DomainRoles.fromObject(
						object.domains[i]
					);
				}
			}
			return message;
		};

		/**
		 * Creates a plain object from a CreateCompanyInput message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof company.CreateCompanyInput
		 * @static
		 * @param {company.CreateCompanyInput} message CreateCompanyInput
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		CreateCompanyInput.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.arrays || options.defaults) object.domains = [];
			if (options.defaults) {
				object.action = "";
				object.companyId = "";
				object.companyName = "";
				object.companyDescription = "";
				object.companyAddress = "";
				object.companyCountry = "";
			}
			if (message.action !== null && message.hasOwnProperty("action"))
				object.action = message.action;
			if (message.companyId !== null && message.hasOwnProperty("companyId"))
				object.companyId = message.companyId;
			if (message.companyName !== null && message.hasOwnProperty("companyName"))
				object.companyName = message.companyName;
			if (
				message.companyDescription !== null &&
				message.hasOwnProperty("companyDescription")
			)
				object.companyDescription = message.companyDescription;
			if (
				message.companyAddress !== null &&
				message.hasOwnProperty("companyAddress")
			)
				object.companyAddress = message.companyAddress;
			if (message.domains && message.domains.length) {
				object.domains = [];
				for (var j = 0; j < message.domains.length; ++j)
					object.domains[j] = $root.commonmessages.DomainRoles.toObject(
						message.domains[j],
						options
					);
			}
			if (
				message.companyCountry !== null &&
				message.hasOwnProperty("companyCountry")
			)
				object.companyCountry = message.companyCountry;
			return object;
		};

		/**
		 * Converts this CreateCompanyInput to JSON.
		 * @function toJSON
		 * @memberof company.CreateCompanyInput
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		CreateCompanyInput.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return CreateCompanyInput;
	})();

	company.CreateCompanyResponse = (function () {
		/**
		 * Properties of a CreateCompanyResponse.
		 * @memberof company
		 * @interface ICreateCompanyResponse
		 * @property {boolean|null} [success] CreateCompanyResponse success
		 */

		/**
		 * Constructs a new CreateCompanyResponse.
		 * @memberof company
		 * @classdesc Represents a CreateCompanyResponse.
		 * @implements ICreateCompanyResponse
		 * @constructor
		 * @param {company.ICreateCompanyResponse=} [properties] Properties to set
		 */
		function CreateCompanyResponse(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * CreateCompanyResponse success.
		 * @member {boolean} success
		 * @memberof company.CreateCompanyResponse
		 * @instance
		 */
		CreateCompanyResponse.prototype.success = false;

		/**
		 * Creates a new CreateCompanyResponse instance using the specified properties.
		 * @function create
		 * @memberof company.CreateCompanyResponse
		 * @static
		 * @param {company.ICreateCompanyResponse=} [properties] Properties to set
		 * @returns {company.CreateCompanyResponse} CreateCompanyResponse instance
		 */
		CreateCompanyResponse.create = function create(properties) {
			return new CreateCompanyResponse(properties);
		};

		/**
		 * Encodes the specified CreateCompanyResponse message. Does not implicitly {@link company.CreateCompanyResponse.verify|verify} messages.
		 * @function encode
		 * @memberof company.CreateCompanyResponse
		 * @static
		 * @param {company.ICreateCompanyResponse} message CreateCompanyResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		CreateCompanyResponse.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.success !== null && message.hasOwnProperty("success"))
				writer.uint32(/* id 1, wireType 0 =*/ 8).bool(message.success);
			return writer;
		};

		/**
		 * Encodes the specified CreateCompanyResponse message, length delimited. Does not implicitly {@link company.CreateCompanyResponse.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof company.CreateCompanyResponse
		 * @static
		 * @param {company.ICreateCompanyResponse} message CreateCompanyResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		CreateCompanyResponse.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a CreateCompanyResponse message from the specified reader or buffer.
		 * @function decode
		 * @memberof company.CreateCompanyResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {company.CreateCompanyResponse} CreateCompanyResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		CreateCompanyResponse.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.company.CreateCompanyResponse();
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
		 * Decodes a CreateCompanyResponse message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof company.CreateCompanyResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {company.CreateCompanyResponse} CreateCompanyResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		CreateCompanyResponse.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a CreateCompanyResponse message.
		 * @function verify
		 * @memberof company.CreateCompanyResponse
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		CreateCompanyResponse.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.success !== null && message.hasOwnProperty("success"))
				if (typeof message.success !== "boolean")
					return "success: boolean expected";
			return null;
		};

		/**
		 * Creates a CreateCompanyResponse message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof company.CreateCompanyResponse
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {company.CreateCompanyResponse} CreateCompanyResponse
		 */
		CreateCompanyResponse.fromObject = function fromObject(object) {
			if (object instanceof $root.company.CreateCompanyResponse) return object;
			var message = new $root.company.CreateCompanyResponse();
			if (object.success !== null) message.success = Boolean(object.success);
			return message;
		};

		/**
		 * Creates a plain object from a CreateCompanyResponse message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof company.CreateCompanyResponse
		 * @static
		 * @param {company.CreateCompanyResponse} message CreateCompanyResponse
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		CreateCompanyResponse.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) object.success = false;
			if (message.success !== null && message.hasOwnProperty("success"))
				object.success = message.success;
			return object;
		};

		/**
		 * Converts this CreateCompanyResponse to JSON.
		 * @function toJSON
		 * @memberof company.CreateCompanyResponse
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		CreateCompanyResponse.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return CreateCompanyResponse;
	})();

	return company;
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
			if (message.satellite !== null && message.hasOwnProperty("satellite"))
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.satellite);
			if (message.land !== null && message.hasOwnProperty("land"))
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.land);
			if (message.mobile !== null && message.hasOwnProperty("mobile"))
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
			if (message.domain !== null && message.hasOwnProperty("domain"))
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
			if (message.home !== null && message.hasOwnProperty("home"))
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.home);
			if (message.work !== null && message.hasOwnProperty("work"))
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
			if (message.userName !== null && message.hasOwnProperty("userName"))
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.userName);
			if (
				message.emailAddresses !== null &&
				message.hasOwnProperty("emailAddresses")
			)
				$root.commonmessages.EmailAddresses.encode(
					message.emailAddresses,
					writer.uint32(/* id 2, wireType 2 =*/ 18).fork()
				).ldelim();
			if (
				message.phoneNumbers !== null &&
				message.hasOwnProperty("phoneNumbers")
			)
				$root.commonmessages.PhoneNumbers.encode(
					message.phoneNumbers,
					writer.uint32(/* id 3, wireType 2 =*/ 26).fork()
				).ldelim();
			if (message.userId !== null && message.hasOwnProperty("userId"))
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
				message.hasOwnProperty("addressLine1")
			)
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.addressLine1);
			if (
				message.addressLine2 !== null &&
				message.hasOwnProperty("addressLine2")
			)
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.addressLine2);
			if (message.city !== null && message.hasOwnProperty("city"))
				writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.city);
			if (message.state !== null && message.hasOwnProperty("state"))
				writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.state);
			if (message.country !== null && message.hasOwnProperty("country"))
				writer.uint32(/* id 5, wireType 2 =*/ 42).string(message.country);
			if (message.postCode !== null && message.hasOwnProperty("postCode"))
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
				message.hasOwnProperty("selectedDomain")
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
