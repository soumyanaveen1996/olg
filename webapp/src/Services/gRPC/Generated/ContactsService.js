/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader,
	$Writer = $protobuf.Writer,
	$util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.contacts = (function () {
	/**
	 * Namespace contacts.
	 * @exports contacts
	 * @namespace
	 */
	var contacts = {};

	contacts.ContactsService = (function () {
		/**
		 * Constructs a new ContactsService service.
		 * @memberof contacts
		 * @classdesc Represents a ContactsService
		 * @extends $protobuf.rpc.Service
		 * @constructor
		 * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
		 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
		 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
		 */
		function ContactsService(rpcImpl, requestDelimited, responseDelimited) {
			$protobuf.rpc.Service.call(
				this,
				rpcImpl,
				requestDelimited,
				responseDelimited
			);
		}

		(ContactsService.prototype = Object.create(
			$protobuf.rpc.Service.prototype
		)).constructor = ContactsService;

		/**
		 * Creates new ContactsService service using the specified rpc implementation.
		 * @function create
		 * @memberof contacts.ContactsService
		 * @static
		 * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
		 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
		 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
		 * @returns {ContactsService} RPC service. Useful where requests and/or responses are streamed.
		 */
		ContactsService.create = function create(
			rpcImpl,
			requestDelimited,
			responseDelimited
		) {
			return new this(rpcImpl, requestDelimited, responseDelimited);
		};

		/**
		 * Callback as used by {@link contacts.ContactsService#find}.
		 * @memberof contacts.ContactsService
		 * @typedef FindCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {contacts.FindResponse} [response] FindResponse
		 */

		/**
		 * Calls Find.
		 * @function find
		 * @memberof contacts.ContactsService
		 * @instance
		 * @param {contacts.ISearchQuery} request SearchQuery message or plain object
		 * @param {contacts.ContactsService.FindCallback} callback Node-style callback called with the error, if any, and FindResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(ContactsService.prototype.find = function find(request, callback) {
				return this.rpcCall(
					find,
					$root.contacts.SearchQuery,
					$root.contacts.FindResponse,
					request,
					callback
				);
			}),
			"name",
			{ value: "Find" }
		);

		/**
		 * Calls Find.
		 * @function find
		 * @memberof contacts.ContactsService
		 * @instance
		 * @param {contacts.ISearchQuery} request SearchQuery message or plain object
		 * @returns {Promise<contacts.FindResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link contacts.ContactsService#add}.
		 * @memberof contacts.ContactsService
		 * @typedef AddCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {contacts.AgentGuardBoolResponse} [response] AgentGuardBoolResponse
		 */

		/**
		 * Calls Add.
		 * @function add
		 * @memberof contacts.ContactsService
		 * @instance
		 * @param {contacts.IContactsInput} request ContactsInput message or plain object
		 * @param {contacts.ContactsService.AddCallback} callback Node-style callback called with the error, if any, and AgentGuardBoolResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(ContactsService.prototype.add = function add(request, callback) {
				return this.rpcCall(
					add,
					$root.contacts.ContactsInput,
					$root.contacts.AgentGuardBoolResponse,
					request,
					callback
				);
			}),
			"name",
			{ value: "Add" }
		);

		/**
		 * Calls Add.
		 * @function add
		 * @memberof contacts.ContactsService
		 * @instance
		 * @param {contacts.IContactsInput} request ContactsInput message or plain object
		 * @returns {Promise<contacts.AgentGuardBoolResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link contacts.ContactsService#accept}.
		 * @memberof contacts.ContactsService
		 * @typedef AcceptCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {contacts.AgentGuardBoolResponse} [response] AgentGuardBoolResponse
		 */

		/**
		 * Calls Accept.
		 * @function accept
		 * @memberof contacts.ContactsService
		 * @instance
		 * @param {contacts.IContactsInput} request ContactsInput message or plain object
		 * @param {contacts.ContactsService.AcceptCallback} callback Node-style callback called with the error, if any, and AgentGuardBoolResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(ContactsService.prototype.accept = function accept(request, callback) {
				return this.rpcCall(
					accept,
					$root.contacts.ContactsInput,
					$root.contacts.AgentGuardBoolResponse,
					request,
					callback
				);
			}),
			"name",
			{ value: "Accept" }
		);

		/**
		 * Calls Accept.
		 * @function accept
		 * @memberof contacts.ContactsService
		 * @instance
		 * @param {contacts.IContactsInput} request ContactsInput message or plain object
		 * @returns {Promise<contacts.AgentGuardBoolResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link contacts.ContactsService#ignore}.
		 * @memberof contacts.ContactsService
		 * @typedef IgnoreCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {contacts.AgentGuardBoolResponse} [response] AgentGuardBoolResponse
		 */

		/**
		 * Calls Ignore.
		 * @function ignore
		 * @memberof contacts.ContactsService
		 * @instance
		 * @param {contacts.IContactsInput} request ContactsInput message or plain object
		 * @param {contacts.ContactsService.IgnoreCallback} callback Node-style callback called with the error, if any, and AgentGuardBoolResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(ContactsService.prototype.ignore = function ignore(request, callback) {
				return this.rpcCall(
					ignore,
					$root.contacts.ContactsInput,
					$root.contacts.AgentGuardBoolResponse,
					request,
					callback
				);
			}),
			"name",
			{ value: "Ignore" }
		);

		/**
		 * Calls Ignore.
		 * @function ignore
		 * @memberof contacts.ContactsService
		 * @instance
		 * @param {contacts.IContactsInput} request ContactsInput message or plain object
		 * @returns {Promise<contacts.AgentGuardBoolResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link contacts.ContactsService#remove}.
		 * @memberof contacts.ContactsService
		 * @typedef RemoveCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {contacts.AgentGuardBoolResponse} [response] AgentGuardBoolResponse
		 */

		/**
		 * Calls Remove.
		 * @function remove
		 * @memberof contacts.ContactsService
		 * @instance
		 * @param {contacts.IContactsInput} request ContactsInput message or plain object
		 * @param {contacts.ContactsService.RemoveCallback} callback Node-style callback called with the error, if any, and AgentGuardBoolResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(ContactsService.prototype.remove = function remove(request, callback) {
				return this.rpcCall(
					remove,
					$root.contacts.ContactsInput,
					$root.contacts.AgentGuardBoolResponse,
					request,
					callback
				);
			}),
			"name",
			{ value: "Remove" }
		);

		/**
		 * Calls Remove.
		 * @function remove
		 * @memberof contacts.ContactsService
		 * @instance
		 * @param {contacts.IContactsInput} request ContactsInput message or plain object
		 * @returns {Promise<contacts.AgentGuardBoolResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link contacts.ContactsService#invite}.
		 * @memberof contacts.ContactsService
		 * @typedef InviteCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {contacts.AgentGuardBoolResponse} [response] AgentGuardBoolResponse
		 */

		/**
		 * Calls Invite.
		 * @function invite
		 * @memberof contacts.ContactsService
		 * @instance
		 * @param {contacts.IEmailIdList} request EmailIdList message or plain object
		 * @param {contacts.ContactsService.InviteCallback} callback Node-style callback called with the error, if any, and AgentGuardBoolResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(ContactsService.prototype.invite = function invite(request, callback) {
				return this.rpcCall(
					invite,
					$root.contacts.EmailIdList,
					$root.contacts.AgentGuardBoolResponse,
					request,
					callback
				);
			}),
			"name",
			{ value: "Invite" }
		);

		/**
		 * Calls Invite.
		 * @function invite
		 * @memberof contacts.ContactsService
		 * @instance
		 * @param {contacts.IEmailIdList} request EmailIdList message or plain object
		 * @returns {Promise<contacts.AgentGuardBoolResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link contacts.ContactsService#update}.
		 * @memberof contacts.ContactsService
		 * @typedef UpdateCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {contacts.AgentGuardBoolResponse} [response] AgentGuardBoolResponse
		 */

		/**
		 * Calls Update.
		 * @function update
		 * @memberof contacts.ContactsService
		 * @instance
		 * @param {contacts.IContactsInput} request ContactsInput message or plain object
		 * @param {contacts.ContactsService.UpdateCallback} callback Node-style callback called with the error, if any, and AgentGuardBoolResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(ContactsService.prototype.update = function update(request, callback) {
				return this.rpcCall(
					update,
					$root.contacts.ContactsInput,
					$root.contacts.AgentGuardBoolResponse,
					request,
					callback
				);
			}),
			"name",
			{ value: "Update" }
		);

		/**
		 * Calls Update.
		 * @function update
		 * @memberof contacts.ContactsService
		 * @instance
		 * @param {contacts.IContactsInput} request ContactsInput message or plain object
		 * @returns {Promise<contacts.AgentGuardBoolResponse>} Promise
		 * @variation 2
		 */

		return ContactsService;
	})();

	contacts.SearchQuery = (function () {
		/**
		 * Properties of a SearchQuery.
		 * @memberof contacts
		 * @interface ISearchQuery
		 * @property {string|null} [queryString] SearchQuery queryString
		 * @property {string|null} [selectedDomain] SearchQuery selectedDomain
		 */

		/**
		 * Constructs a new SearchQuery.
		 * @memberof contacts
		 * @classdesc Represents a SearchQuery.
		 * @implements ISearchQuery
		 * @constructor
		 * @param {contacts.ISearchQuery=} [properties] Properties to set
		 */
		function SearchQuery(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * SearchQuery queryString.
		 * @member {string} queryString
		 * @memberof contacts.SearchQuery
		 * @instance
		 */
		SearchQuery.prototype.queryString = "";

		/**
		 * SearchQuery selectedDomain.
		 * @member {string} selectedDomain
		 * @memberof contacts.SearchQuery
		 * @instance
		 */
		SearchQuery.prototype.selectedDomain = "";

		/**
		 * Creates a new SearchQuery instance using the specified properties.
		 * @function create
		 * @memberof contacts.SearchQuery
		 * @static
		 * @param {contacts.ISearchQuery=} [properties] Properties to set
		 * @returns {contacts.SearchQuery} SearchQuery instance
		 */
		SearchQuery.create = function create(properties) {
			return new SearchQuery(properties);
		};

		/**
		 * Encodes the specified SearchQuery message. Does not implicitly {@link contacts.SearchQuery.verify|verify} messages.
		 * @function encode
		 * @memberof contacts.SearchQuery
		 * @static
		 * @param {contacts.ISearchQuery} message SearchQuery message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		SearchQuery.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.queryString !== null && message.hasOwnProperty("queryString"))
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.queryString);
			if (
				message.selectedDomain !== null &&
				message.hasOwnProperty("selectedDomain")
			)
				writer
					.uint32(/* id 2, wireType 2 =*/ 18)
					.string(message.selectedDomain);
			return writer;
		};

		/**
		 * Encodes the specified SearchQuery message, length delimited. Does not implicitly {@link contacts.SearchQuery.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof contacts.SearchQuery
		 * @static
		 * @param {contacts.ISearchQuery} message SearchQuery message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		SearchQuery.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a SearchQuery message from the specified reader or buffer.
		 * @function decode
		 * @memberof contacts.SearchQuery
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {contacts.SearchQuery} SearchQuery
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		SearchQuery.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.contacts.SearchQuery();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.queryString = reader.string();
						break;
					case 2:
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
		 * Decodes a SearchQuery message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof contacts.SearchQuery
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {contacts.SearchQuery} SearchQuery
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		SearchQuery.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a SearchQuery message.
		 * @function verify
		 * @memberof contacts.SearchQuery
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		SearchQuery.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.queryString !== null && message.hasOwnProperty("queryString"))
				if (!$util.isString(message.queryString))
					return "queryString: string expected";
			if (
				message.selectedDomain !== null &&
				message.hasOwnProperty("selectedDomain")
			)
				if (!$util.isString(message.selectedDomain))
					return "selectedDomain: string expected";
			return null;
		};

		/**
		 * Creates a SearchQuery message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof contacts.SearchQuery
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {contacts.SearchQuery} SearchQuery
		 */
		SearchQuery.fromObject = function fromObject(object) {
			if (object instanceof $root.contacts.SearchQuery) return object;
			var message = new $root.contacts.SearchQuery();
			if (object.queryString !== null)
				message.queryString = String(object.queryString);
			if (object.selectedDomain !== null)
				message.selectedDomain = String(object.selectedDomain);
			return message;
		};

		/**
		 * Creates a plain object from a SearchQuery message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof contacts.SearchQuery
		 * @static
		 * @param {contacts.SearchQuery} message SearchQuery
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		SearchQuery.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.queryString = "";
				object.selectedDomain = "";
			}
			if (message.queryString !== null && message.hasOwnProperty("queryString"))
				object.queryString = message.queryString;
			if (
				message.selectedDomain !== null &&
				message.hasOwnProperty("selectedDomain")
			)
				object.selectedDomain = message.selectedDomain;
			return object;
		};

		/**
		 * Converts this SearchQuery to JSON.
		 * @function toJSON
		 * @memberof contacts.SearchQuery
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		SearchQuery.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return SearchQuery;
	})();

	contacts.ContactsInput = (function () {
		/**
		 * Properties of a ContactsInput.
		 * @memberof contacts
		 * @interface IContactsInput
		 * @property {Array.<string>|null} [userIds] ContactsInput userIds
		 * @property {Array.<commonmessages.ILocalContact>|null} [localContacts] ContactsInput localContacts
		 */

		/**
		 * Constructs a new ContactsInput.
		 * @memberof contacts
		 * @classdesc Represents a ContactsInput.
		 * @implements IContactsInput
		 * @constructor
		 * @param {contacts.IContactsInput=} [properties] Properties to set
		 */
		function ContactsInput(properties) {
			this.userIds = [];
			this.localContacts = [];
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * ContactsInput userIds.
		 * @member {Array.<string>} userIds
		 * @memberof contacts.ContactsInput
		 * @instance
		 */
		ContactsInput.prototype.userIds = $util.emptyArray;

		/**
		 * ContactsInput localContacts.
		 * @member {Array.<commonmessages.ILocalContact>} localContacts
		 * @memberof contacts.ContactsInput
		 * @instance
		 */
		ContactsInput.prototype.localContacts = $util.emptyArray;

		/**
		 * Creates a new ContactsInput instance using the specified properties.
		 * @function create
		 * @memberof contacts.ContactsInput
		 * @static
		 * @param {contacts.IContactsInput=} [properties] Properties to set
		 * @returns {contacts.ContactsInput} ContactsInput instance
		 */
		ContactsInput.create = function create(properties) {
			return new ContactsInput(properties);
		};

		/**
		 * Encodes the specified ContactsInput message. Does not implicitly {@link contacts.ContactsInput.verify|verify} messages.
		 * @function encode
		 * @memberof contacts.ContactsInput
		 * @static
		 * @param {contacts.IContactsInput} message ContactsInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		ContactsInput.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.userIds !== null && message.userIds.length)
				for (var i = 0; i < message.userIds.length; ++i)
					writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.userIds[i]);
			if (message.localContacts !== null && message.localContacts.length)
				for (var i = 0; i < message.localContacts.length; ++i)
					$root.commonmessages.LocalContact.encode(
						message.localContacts[i],
						writer.uint32(/* id 2, wireType 2 =*/ 18).fork()
					).ldelim();
			return writer;
		};

		/**
		 * Encodes the specified ContactsInput message, length delimited. Does not implicitly {@link contacts.ContactsInput.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof contacts.ContactsInput
		 * @static
		 * @param {contacts.IContactsInput} message ContactsInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		ContactsInput.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a ContactsInput message from the specified reader or buffer.
		 * @function decode
		 * @memberof contacts.ContactsInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {contacts.ContactsInput} ContactsInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		ContactsInput.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.contacts.ContactsInput();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						if (!(message.userIds && message.userIds.length))
							message.userIds = [];
						message.userIds.push(reader.string());
						break;
					case 2:
						if (!(message.localContacts && message.localContacts.length))
							message.localContacts = [];
						message.localContacts.push(
							$root.commonmessages.LocalContact.decode(reader, reader.uint32())
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
		 * Decodes a ContactsInput message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof contacts.ContactsInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {contacts.ContactsInput} ContactsInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		ContactsInput.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a ContactsInput message.
		 * @function verify
		 * @memberof contacts.ContactsInput
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		ContactsInput.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.userIds !== null && message.hasOwnProperty("userIds")) {
				if (!Array.isArray(message.userIds)) return "userIds: array expected";
				for (var i = 0; i < message.userIds.length; ++i)
					if (!$util.isString(message.userIds[i]))
						return "userIds: string[] expected";
			}
			if (
				message.localContacts !== null &&
				message.hasOwnProperty("localContacts")
			) {
				if (!Array.isArray(message.localContacts))
					return "localContacts: array expected";
				for (var i = 0; i < message.localContacts.length; ++i) {
					var error = $root.commonmessages.LocalContact.verify(
						message.localContacts[i]
					);
					if (error) return "localContacts." + error;
				}
			}
			return null;
		};

		/**
		 * Creates a ContactsInput message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof contacts.ContactsInput
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {contacts.ContactsInput} ContactsInput
		 */
		ContactsInput.fromObject = function fromObject(object) {
			if (object instanceof $root.contacts.ContactsInput) return object;
			var message = new $root.contacts.ContactsInput();
			if (object.userIds) {
				if (!Array.isArray(object.userIds))
					throw TypeError(".contacts.ContactsInput.userIds: array expected");
				message.userIds = [];
				for (var i = 0; i < object.userIds.length; ++i)
					message.userIds[i] = String(object.userIds[i]);
			}
			if (object.localContacts) {
				if (!Array.isArray(object.localContacts))
					throw TypeError(
						".contacts.ContactsInput.localContacts: array expected"
					);
				message.localContacts = [];
				for (var i = 0; i < object.localContacts.length; ++i) {
					if (typeof object.localContacts[i] !== "object")
						throw TypeError(
							".contacts.ContactsInput.localContacts: object expected"
						);
					message.localContacts[i] =
						$root.commonmessages.LocalContact.fromObject(
							object.localContacts[i]
						);
				}
			}
			return message;
		};

		/**
		 * Creates a plain object from a ContactsInput message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof contacts.ContactsInput
		 * @static
		 * @param {contacts.ContactsInput} message ContactsInput
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		ContactsInput.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.arrays || options.defaults) {
				object.userIds = [];
				object.localContacts = [];
			}
			if (message.userIds && message.userIds.length) {
				object.userIds = [];
				for (var j = 0; j < message.userIds.length; ++j)
					object.userIds[j] = message.userIds[j];
			}
			if (message.localContacts && message.localContacts.length) {
				object.localContacts = [];
				for (var j = 0; j < message.localContacts.length; ++j)
					object.localContacts[j] = $root.commonmessages.LocalContact.toObject(
						message.localContacts[j],
						options
					);
			}
			return object;
		};

		/**
		 * Converts this ContactsInput to JSON.
		 * @function toJSON
		 * @memberof contacts.ContactsInput
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		ContactsInput.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return ContactsInput;
	})();

	contacts.EmailIdList = (function () {
		/**
		 * Properties of an EmailIdList.
		 * @memberof contacts
		 * @interface IEmailIdList
		 * @property {Array.<string>|null} [emailIds] EmailIdList emailIds
		 * @property {string|null} [selectedDomain] EmailIdList selectedDomain
		 */

		/**
		 * Constructs a new EmailIdList.
		 * @memberof contacts
		 * @classdesc Represents an EmailIdList.
		 * @implements IEmailIdList
		 * @constructor
		 * @param {contacts.IEmailIdList=} [properties] Properties to set
		 */
		function EmailIdList(properties) {
			this.emailIds = [];
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * EmailIdList emailIds.
		 * @member {Array.<string>} emailIds
		 * @memberof contacts.EmailIdList
		 * @instance
		 */
		EmailIdList.prototype.emailIds = $util.emptyArray;

		/**
		 * EmailIdList selectedDomain.
		 * @member {string} selectedDomain
		 * @memberof contacts.EmailIdList
		 * @instance
		 */
		EmailIdList.prototype.selectedDomain = "";

		/**
		 * Creates a new EmailIdList instance using the specified properties.
		 * @function create
		 * @memberof contacts.EmailIdList
		 * @static
		 * @param {contacts.IEmailIdList=} [properties] Properties to set
		 * @returns {contacts.EmailIdList} EmailIdList instance
		 */
		EmailIdList.create = function create(properties) {
			return new EmailIdList(properties);
		};

		/**
		 * Encodes the specified EmailIdList message. Does not implicitly {@link contacts.EmailIdList.verify|verify} messages.
		 * @function encode
		 * @memberof contacts.EmailIdList
		 * @static
		 * @param {contacts.IEmailIdList} message EmailIdList message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		EmailIdList.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.emailIds !== null && message.emailIds.length)
				for (var i = 0; i < message.emailIds.length; ++i)
					writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.emailIds[i]);
			if (
				message.selectedDomain !== null &&
				message.hasOwnProperty("selectedDomain")
			)
				writer
					.uint32(/* id 2, wireType 2 =*/ 18)
					.string(message.selectedDomain);
			return writer;
		};

		/**
		 * Encodes the specified EmailIdList message, length delimited. Does not implicitly {@link contacts.EmailIdList.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof contacts.EmailIdList
		 * @static
		 * @param {contacts.IEmailIdList} message EmailIdList message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		EmailIdList.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes an EmailIdList message from the specified reader or buffer.
		 * @function decode
		 * @memberof contacts.EmailIdList
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {contacts.EmailIdList} EmailIdList
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		EmailIdList.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.contacts.EmailIdList();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						if (!(message.emailIds && message.emailIds.length))
							message.emailIds = [];
						message.emailIds.push(reader.string());
						break;
					case 2:
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
		 * Decodes an EmailIdList message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof contacts.EmailIdList
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {contacts.EmailIdList} EmailIdList
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		EmailIdList.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies an EmailIdList message.
		 * @function verify
		 * @memberof contacts.EmailIdList
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		EmailIdList.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.emailIds !== null && message.hasOwnProperty("emailIds")) {
				if (!Array.isArray(message.emailIds)) return "emailIds: array expected";
				for (var i = 0; i < message.emailIds.length; ++i)
					if (!$util.isString(message.emailIds[i]))
						return "emailIds: string[] expected";
			}
			if (
				message.selectedDomain !== null &&
				message.hasOwnProperty("selectedDomain")
			)
				if (!$util.isString(message.selectedDomain))
					return "selectedDomain: string expected";
			return null;
		};

		/**
		 * Creates an EmailIdList message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof contacts.EmailIdList
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {contacts.EmailIdList} EmailIdList
		 */
		EmailIdList.fromObject = function fromObject(object) {
			if (object instanceof $root.contacts.EmailIdList) return object;
			var message = new $root.contacts.EmailIdList();
			if (object.emailIds) {
				if (!Array.isArray(object.emailIds))
					throw TypeError(".contacts.EmailIdList.emailIds: array expected");
				message.emailIds = [];
				for (var i = 0; i < object.emailIds.length; ++i)
					message.emailIds[i] = String(object.emailIds[i]);
			}
			if (object.selectedDomain !== null)
				message.selectedDomain = String(object.selectedDomain);
			return message;
		};

		/**
		 * Creates a plain object from an EmailIdList message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof contacts.EmailIdList
		 * @static
		 * @param {contacts.EmailIdList} message EmailIdList
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		EmailIdList.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.arrays || options.defaults) object.emailIds = [];
			if (options.defaults) object.selectedDomain = "";
			if (message.emailIds && message.emailIds.length) {
				object.emailIds = [];
				for (var j = 0; j < message.emailIds.length; ++j)
					object.emailIds[j] = message.emailIds[j];
			}
			if (
				message.selectedDomain !== null &&
				message.hasOwnProperty("selectedDomain")
			)
				object.selectedDomain = message.selectedDomain;
			return object;
		};

		/**
		 * Converts this EmailIdList to JSON.
		 * @function toJSON
		 * @memberof contacts.EmailIdList
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		EmailIdList.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return EmailIdList;
	})();

	contacts.AgentGuardBoolResponse = (function () {
		/**
		 * Properties of an AgentGuardBoolResponse.
		 * @memberof contacts
		 * @interface IAgentGuardBoolResponse
		 * @property {number|null} [error] AgentGuardBoolResponse error
		 * @property {Array.<boolean>|null} [content] AgentGuardBoolResponse content
		 */

		/**
		 * Constructs a new AgentGuardBoolResponse.
		 * @memberof contacts
		 * @classdesc Represents an AgentGuardBoolResponse.
		 * @implements IAgentGuardBoolResponse
		 * @constructor
		 * @param {contacts.IAgentGuardBoolResponse=} [properties] Properties to set
		 */
		function AgentGuardBoolResponse(properties) {
			this.content = [];
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * AgentGuardBoolResponse error.
		 * @member {number} error
		 * @memberof contacts.AgentGuardBoolResponse
		 * @instance
		 */
		AgentGuardBoolResponse.prototype.error = 0;

		/**
		 * AgentGuardBoolResponse content.
		 * @member {Array.<boolean>} content
		 * @memberof contacts.AgentGuardBoolResponse
		 * @instance
		 */
		AgentGuardBoolResponse.prototype.content = $util.emptyArray;

		/**
		 * Creates a new AgentGuardBoolResponse instance using the specified properties.
		 * @function create
		 * @memberof contacts.AgentGuardBoolResponse
		 * @static
		 * @param {contacts.IAgentGuardBoolResponse=} [properties] Properties to set
		 * @returns {contacts.AgentGuardBoolResponse} AgentGuardBoolResponse instance
		 */
		AgentGuardBoolResponse.create = function create(properties) {
			return new AgentGuardBoolResponse(properties);
		};

		/**
		 * Encodes the specified AgentGuardBoolResponse message. Does not implicitly {@link contacts.AgentGuardBoolResponse.verify|verify} messages.
		 * @function encode
		 * @memberof contacts.AgentGuardBoolResponse
		 * @static
		 * @param {contacts.IAgentGuardBoolResponse} message AgentGuardBoolResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		AgentGuardBoolResponse.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.error !== null && message.hasOwnProperty("error"))
				writer.uint32(/* id 1, wireType 0 =*/ 8).int32(message.error);
			if (message.content !== null && message.content.length) {
				writer.uint32(/* id 2, wireType 2 =*/ 18).fork();
				for (var i = 0; i < message.content.length; ++i)
					writer.bool(message.content[i]);
				writer.ldelim();
			}
			return writer;
		};

		/**
		 * Encodes the specified AgentGuardBoolResponse message, length delimited. Does not implicitly {@link contacts.AgentGuardBoolResponse.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof contacts.AgentGuardBoolResponse
		 * @static
		 * @param {contacts.IAgentGuardBoolResponse} message AgentGuardBoolResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		AgentGuardBoolResponse.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes an AgentGuardBoolResponse message from the specified reader or buffer.
		 * @function decode
		 * @memberof contacts.AgentGuardBoolResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {contacts.AgentGuardBoolResponse} AgentGuardBoolResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		AgentGuardBoolResponse.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.contacts.AgentGuardBoolResponse();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.error = reader.int32();
						break;
					case 2:
						if (!(message.content && message.content.length))
							message.content = [];
						if ((tag & 7) === 2) {
							var end2 = reader.uint32() + reader.pos;
							while (reader.pos < end2) message.content.push(reader.bool());
						} else message.content.push(reader.bool());
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes an AgentGuardBoolResponse message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof contacts.AgentGuardBoolResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {contacts.AgentGuardBoolResponse} AgentGuardBoolResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		AgentGuardBoolResponse.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies an AgentGuardBoolResponse message.
		 * @function verify
		 * @memberof contacts.AgentGuardBoolResponse
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		AgentGuardBoolResponse.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.error !== null && message.hasOwnProperty("error"))
				if (!$util.isInteger(message.error)) return "error: integer expected";
			if (message.content !== null && message.hasOwnProperty("content")) {
				if (!Array.isArray(message.content)) return "content: array expected";
				for (var i = 0; i < message.content.length; ++i)
					if (typeof message.content[i] !== "boolean")
						return "content: boolean[] expected";
			}
			return null;
		};

		/**
		 * Creates an AgentGuardBoolResponse message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof contacts.AgentGuardBoolResponse
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {contacts.AgentGuardBoolResponse} AgentGuardBoolResponse
		 */
		AgentGuardBoolResponse.fromObject = function fromObject(object) {
			if (object instanceof $root.contacts.AgentGuardBoolResponse)
				return object;
			var message = new $root.contacts.AgentGuardBoolResponse();
			if (object.error !== null) message.error = object.error | 0;
			if (object.content) {
				if (!Array.isArray(object.content))
					throw TypeError(
						".contacts.AgentGuardBoolResponse.content: array expected"
					);
				message.content = [];
				for (var i = 0; i < object.content.length; ++i)
					message.content[i] = Boolean(object.content[i]);
			}
			return message;
		};

		/**
		 * Creates a plain object from an AgentGuardBoolResponse message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof contacts.AgentGuardBoolResponse
		 * @static
		 * @param {contacts.AgentGuardBoolResponse} message AgentGuardBoolResponse
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		AgentGuardBoolResponse.toObject = function toObject(message, options) {
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
		 * Converts this AgentGuardBoolResponse to JSON.
		 * @function toJSON
		 * @memberof contacts.AgentGuardBoolResponse
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		AgentGuardBoolResponse.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return AgentGuardBoolResponse;
	})();

	contacts.FindResponse = (function () {
		/**
		 * Properties of a FindResponse.
		 * @memberof contacts
		 * @interface IFindResponse
		 * @property {number|null} [error] FindResponse error
		 * @property {Array.<contacts.IMatchedUser>|null} [content] FindResponse content
		 * @property {string|null} [errorMessage] FindResponse errorMessage
		 */

		/**
		 * Constructs a new FindResponse.
		 * @memberof contacts
		 * @classdesc Represents a FindResponse.
		 * @implements IFindResponse
		 * @constructor
		 * @param {contacts.IFindResponse=} [properties] Properties to set
		 */
		function FindResponse(properties) {
			this.content = [];
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * FindResponse error.
		 * @member {number} error
		 * @memberof contacts.FindResponse
		 * @instance
		 */
		FindResponse.prototype.error = 0;

		/**
		 * FindResponse content.
		 * @member {Array.<contacts.IMatchedUser>} content
		 * @memberof contacts.FindResponse
		 * @instance
		 */
		FindResponse.prototype.content = $util.emptyArray;

		/**
		 * FindResponse errorMessage.
		 * @member {string} errorMessage
		 * @memberof contacts.FindResponse
		 * @instance
		 */
		FindResponse.prototype.errorMessage = "";

		/**
		 * Creates a new FindResponse instance using the specified properties.
		 * @function create
		 * @memberof contacts.FindResponse
		 * @static
		 * @param {contacts.IFindResponse=} [properties] Properties to set
		 * @returns {contacts.FindResponse} FindResponse instance
		 */
		FindResponse.create = function create(properties) {
			return new FindResponse(properties);
		};

		/**
		 * Encodes the specified FindResponse message. Does not implicitly {@link contacts.FindResponse.verify|verify} messages.
		 * @function encode
		 * @memberof contacts.FindResponse
		 * @static
		 * @param {contacts.IFindResponse} message FindResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		FindResponse.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.error !== null && message.hasOwnProperty("error"))
				writer.uint32(/* id 1, wireType 0 =*/ 8).int32(message.error);
			if (message.content !== null && message.content.length)
				for (var i = 0; i < message.content.length; ++i)
					$root.contacts.MatchedUser.encode(
						message.content[i],
						writer.uint32(/* id 2, wireType 2 =*/ 18).fork()
					).ldelim();
			if (
				message.errorMessage !== null &&
				message.hasOwnProperty("errorMessage")
			)
				writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.errorMessage);
			return writer;
		};

		/**
		 * Encodes the specified FindResponse message, length delimited. Does not implicitly {@link contacts.FindResponse.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof contacts.FindResponse
		 * @static
		 * @param {contacts.IFindResponse} message FindResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		FindResponse.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a FindResponse message from the specified reader or buffer.
		 * @function decode
		 * @memberof contacts.FindResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {contacts.FindResponse} FindResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		FindResponse.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.contacts.FindResponse();
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
							$root.contacts.MatchedUser.decode(reader, reader.uint32())
						);
						break;
					case 3:
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
		 * Decodes a FindResponse message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof contacts.FindResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {contacts.FindResponse} FindResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		FindResponse.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a FindResponse message.
		 * @function verify
		 * @memberof contacts.FindResponse
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		FindResponse.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.error !== null && message.hasOwnProperty("error"))
				if (!$util.isInteger(message.error)) return "error: integer expected";
			if (message.content !== null && message.hasOwnProperty("content")) {
				if (!Array.isArray(message.content)) return "content: array expected";
				for (var i = 0; i < message.content.length; ++i) {
					var error = $root.contacts.MatchedUser.verify(message.content[i]);
					if (error) return "content." + error;
				}
			}
			if (
				message.errorMessage !== null &&
				message.hasOwnProperty("errorMessage")
			)
				if (!$util.isString(message.errorMessage))
					return "errorMessage: string expected";
			return null;
		};

		/**
		 * Creates a FindResponse message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof contacts.FindResponse
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {contacts.FindResponse} FindResponse
		 */
		FindResponse.fromObject = function fromObject(object) {
			if (object instanceof $root.contacts.FindResponse) return object;
			var message = new $root.contacts.FindResponse();
			if (object.error !== null) message.error = object.error | 0;
			if (object.content) {
				if (!Array.isArray(object.content))
					throw TypeError(".contacts.FindResponse.content: array expected");
				message.content = [];
				for (var i = 0; i < object.content.length; ++i) {
					if (typeof object.content[i] !== "object")
						throw TypeError(".contacts.FindResponse.content: object expected");
					message.content[i] = $root.contacts.MatchedUser.fromObject(
						object.content[i]
					);
				}
			}
			if (object.errorMessage !== null)
				message.errorMessage = String(object.errorMessage);
			return message;
		};

		/**
		 * Creates a plain object from a FindResponse message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof contacts.FindResponse
		 * @static
		 * @param {contacts.FindResponse} message FindResponse
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		FindResponse.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.arrays || options.defaults) object.content = [];
			if (options.defaults) {
				object.error = 0;
				object.errorMessage = "";
			}
			if (message.error !== null && message.hasOwnProperty("error"))
				object.error = message.error;
			if (message.content && message.content.length) {
				object.content = [];
				for (var j = 0; j < message.content.length; ++j)
					object.content[j] = $root.contacts.MatchedUser.toObject(
						message.content[j],
						options
					);
			}
			if (
				message.errorMessage !== null &&
				message.hasOwnProperty("errorMessage")
			)
				object.errorMessage = message.errorMessage;
			return object;
		};

		/**
		 * Converts this FindResponse to JSON.
		 * @function toJSON
		 * @memberof contacts.FindResponse
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		FindResponse.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return FindResponse;
	})();

	contacts.MatchedUser = (function () {
		/**
		 * Properties of a MatchedUser.
		 * @memberof contacts
		 * @interface IMatchedUser
		 * @property {string|null} [userName] MatchedUser userName
		 * @property {string|null} [userId] MatchedUser userId
		 * @property {string|null} [userCompanyName] MatchedUser userCompanyName
		 * @property {commonmessages.IUserAddress|null} [address] MatchedUser address
		 */

		/**
		 * Constructs a new MatchedUser.
		 * @memberof contacts
		 * @classdesc Represents a MatchedUser.
		 * @implements IMatchedUser
		 * @constructor
		 * @param {contacts.IMatchedUser=} [properties] Properties to set
		 */
		function MatchedUser(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * MatchedUser userName.
		 * @member {string} userName
		 * @memberof contacts.MatchedUser
		 * @instance
		 */
		MatchedUser.prototype.userName = "";

		/**
		 * MatchedUser userId.
		 * @member {string} userId
		 * @memberof contacts.MatchedUser
		 * @instance
		 */
		MatchedUser.prototype.userId = "";

		/**
		 * MatchedUser userCompanyName.
		 * @member {string} userCompanyName
		 * @memberof contacts.MatchedUser
		 * @instance
		 */
		MatchedUser.prototype.userCompanyName = "";

		/**
		 * MatchedUser address.
		 * @member {commonmessages.IUserAddress|null|undefined} address
		 * @memberof contacts.MatchedUser
		 * @instance
		 */
		MatchedUser.prototype.address = null;

		/**
		 * Creates a new MatchedUser instance using the specified properties.
		 * @function create
		 * @memberof contacts.MatchedUser
		 * @static
		 * @param {contacts.IMatchedUser=} [properties] Properties to set
		 * @returns {contacts.MatchedUser} MatchedUser instance
		 */
		MatchedUser.create = function create(properties) {
			return new MatchedUser(properties);
		};

		/**
		 * Encodes the specified MatchedUser message. Does not implicitly {@link contacts.MatchedUser.verify|verify} messages.
		 * @function encode
		 * @memberof contacts.MatchedUser
		 * @static
		 * @param {contacts.IMatchedUser} message MatchedUser message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		MatchedUser.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.userName !== null && message.hasOwnProperty("userName"))
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.userName);
			if (message.userId !== null && message.hasOwnProperty("userId"))
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.userId);
			if (
				message.userCompanyName !== null &&
				message.hasOwnProperty("userCompanyName")
			)
				writer
					.uint32(/* id 3, wireType 2 =*/ 26)
					.string(message.userCompanyName);
			if (message.address !== null && message.hasOwnProperty("address"))
				$root.commonmessages.UserAddress.encode(
					message.address,
					writer.uint32(/* id 4, wireType 2 =*/ 34).fork()
				).ldelim();
			return writer;
		};

		/**
		 * Encodes the specified MatchedUser message, length delimited. Does not implicitly {@link contacts.MatchedUser.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof contacts.MatchedUser
		 * @static
		 * @param {contacts.IMatchedUser} message MatchedUser message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		MatchedUser.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a MatchedUser message from the specified reader or buffer.
		 * @function decode
		 * @memberof contacts.MatchedUser
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {contacts.MatchedUser} MatchedUser
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		MatchedUser.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.contacts.MatchedUser();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.userName = reader.string();
						break;
					case 2:
						message.userId = reader.string();
						break;
					case 3:
						message.userCompanyName = reader.string();
						break;
					case 4:
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
		 * Decodes a MatchedUser message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof contacts.MatchedUser
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {contacts.MatchedUser} MatchedUser
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		MatchedUser.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a MatchedUser message.
		 * @function verify
		 * @memberof contacts.MatchedUser
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		MatchedUser.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.userName !== null && message.hasOwnProperty("userName"))
				if (!$util.isString(message.userName))
					return "userName: string expected";
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
		 * Creates a MatchedUser message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof contacts.MatchedUser
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {contacts.MatchedUser} MatchedUser
		 */
		MatchedUser.fromObject = function fromObject(object) {
			if (object instanceof $root.contacts.MatchedUser) return object;
			var message = new $root.contacts.MatchedUser();
			if (object.userName !== null) message.userName = String(object.userName);
			if (object.userId !== null) message.userId = String(object.userId);
			if (object.userCompanyName !== null)
				message.userCompanyName = String(object.userCompanyName);
			if (object.address !== null) {
				if (typeof object.address !== "object")
					throw TypeError(".contacts.MatchedUser.address: object expected");
				message.address = $root.commonmessages.UserAddress.fromObject(
					object.address
				);
			}
			return message;
		};

		/**
		 * Creates a plain object from a MatchedUser message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof contacts.MatchedUser
		 * @static
		 * @param {contacts.MatchedUser} message MatchedUser
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		MatchedUser.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.userName = "";
				object.userId = "";
				object.userCompanyName = "";
				object.address = null;
			}
			if (message.userName !== null && message.hasOwnProperty("userName"))
				object.userName = message.userName;
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
		 * Converts this MatchedUser to JSON.
		 * @function toJSON
		 * @memberof contacts.MatchedUser
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		MatchedUser.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return MatchedUser;
	})();

	return contacts;
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
