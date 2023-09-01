/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader,
	$Writer = $protobuf.Writer,
	$util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.channels = (function () {
	/**
	 * Namespace channels.
	 * @exports channels
	 * @namespace
	 */
	var channels = {};

	channels.ChannelsService = (function () {
		/**
		 * Constructs a new ChannelsService service.
		 * @memberof channels
		 * @classdesc Represents a ChannelsService
		 * @extends $protobuf.rpc.Service
		 * @constructor
		 * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
		 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
		 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
		 */
		function ChannelsService(rpcImpl, requestDelimited, responseDelimited) {
			$protobuf.rpc.Service.call(
				this,
				rpcImpl,
				requestDelimited,
				responseDelimited
			);
		}

		(ChannelsService.prototype = Object.create(
			$protobuf.rpc.Service.prototype
		)).constructor = ChannelsService;

		/**
		 * Creates new ChannelsService service using the specified rpc implementation.
		 * @function create
		 * @memberof channels.ChannelsService
		 * @static
		 * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
		 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
		 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
		 * @returns {ChannelsService} RPC service. Useful where requests and/or responses are streamed.
		 */
		ChannelsService.create = function create(
			rpcImpl,
			requestDelimited,
			responseDelimited
		) {
			return new this(rpcImpl, requestDelimited, responseDelimited);
		};

		/**
		 * Callback as used by {@link channels.ChannelsService#getSubscribed}.
		 * @memberof channels.ChannelsService
		 * @typedef GetSubscribedCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {channels.ChannelListResponse} [response] ChannelListResponse
		 */

		/**
		 * Calls GetSubscribed.
		 * @function getSubscribed
		 * @memberof channels.ChannelsService
		 * @instance
		 * @param {commonmessages.ISelectedDomainInput} request SelectedDomainInput message or plain object
		 * @param {channels.ChannelsService.GetSubscribedCallback} callback Node-style callback called with the error, if any, and ChannelListResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(ChannelsService.prototype.getSubscribed = function getSubscribed(
				request,
				callback
			) {
				return this.rpcCall(
					getSubscribed,
					$root.commonmessages.SelectedDomainInput,
					$root.channels.ChannelListResponse,
					request,
					callback
				);
			}),
			"name",
			{ value: "GetSubscribed" }
		);

		/**
		 * Calls GetSubscribed.
		 * @function getSubscribed
		 * @memberof channels.ChannelsService
		 * @instance
		 * @param {commonmessages.ISelectedDomainInput} request SelectedDomainInput message or plain object
		 * @returns {Promise<channels.ChannelListResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link channels.ChannelsService#getUnsubscribed}.
		 * @memberof channels.ChannelsService
		 * @typedef GetUnsubscribedCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {channels.ChannelListResponse} [response] ChannelListResponse
		 */

		/**
		 * Calls GetUnsubscribed.
		 * @function getUnsubscribed
		 * @memberof channels.ChannelsService
		 * @instance
		 * @param {commonmessages.ISelectedDomainInput} request SelectedDomainInput message or plain object
		 * @param {channels.ChannelsService.GetUnsubscribedCallback} callback Node-style callback called with the error, if any, and ChannelListResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(ChannelsService.prototype.getUnsubscribed = function getUnsubscribed(
				request,
				callback
			) {
				return this.rpcCall(
					getUnsubscribed,
					$root.commonmessages.SelectedDomainInput,
					$root.channels.ChannelListResponse,
					request,
					callback
				);
			}),
			"name",
			{ value: "GetUnsubscribed" }
		);

		/**
		 * Calls GetUnsubscribed.
		 * @function getUnsubscribed
		 * @memberof channels.ChannelsService
		 * @instance
		 * @param {commonmessages.ISelectedDomainInput} request SelectedDomainInput message or plain object
		 * @returns {Promise<channels.ChannelListResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link channels.ChannelsService#getOwned}.
		 * @memberof channels.ChannelsService
		 * @typedef GetOwnedCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {channels.ChannelListResponse} [response] ChannelListResponse
		 */

		/**
		 * Calls GetOwned.
		 * @function getOwned
		 * @memberof channels.ChannelsService
		 * @instance
		 * @param {commonmessages.IEmpty} request Empty message or plain object
		 * @param {channels.ChannelsService.GetOwnedCallback} callback Node-style callback called with the error, if any, and ChannelListResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(ChannelsService.prototype.getOwned = function getOwned(
				request,
				callback
			) {
				return this.rpcCall(
					getOwned,
					$root.commonmessages.Empty,
					$root.channels.ChannelListResponse,
					request,
					callback
				);
			}),
			"name",
			{ value: "GetOwned" }
		);

		/**
		 * Calls GetOwned.
		 * @function getOwned
		 * @memberof channels.ChannelsService
		 * @instance
		 * @param {commonmessages.IEmpty} request Empty message or plain object
		 * @returns {Promise<channels.ChannelListResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link channels.ChannelsService#subscribe}.
		 * @memberof channels.ChannelsService
		 * @typedef SubscribeCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {channels.BooleanResponse} [response] BooleanResponse
		 */

		/**
		 * Calls Subscribe.
		 * @function subscribe
		 * @memberof channels.ChannelsService
		 * @instance
		 * @param {channels.ISubUnsubInput} request SubUnsubInput message or plain object
		 * @param {channels.ChannelsService.SubscribeCallback} callback Node-style callback called with the error, if any, and BooleanResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(ChannelsService.prototype.subscribe = function subscribe(
				request,
				callback
			) {
				return this.rpcCall(
					subscribe,
					$root.channels.SubUnsubInput,
					$root.channels.BooleanResponse,
					request,
					callback
				);
			}),
			"name",
			{ value: "Subscribe" }
		);

		/**
		 * Calls Subscribe.
		 * @function subscribe
		 * @memberof channels.ChannelsService
		 * @instance
		 * @param {channels.ISubUnsubInput} request SubUnsubInput message or plain object
		 * @returns {Promise<channels.BooleanResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link channels.ChannelsService#unsubscribe}.
		 * @memberof channels.ChannelsService
		 * @typedef UnsubscribeCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {channels.BooleanResponse} [response] BooleanResponse
		 */

		/**
		 * Calls Unsubscribe.
		 * @function unsubscribe
		 * @memberof channels.ChannelsService
		 * @instance
		 * @param {channels.ISubUnsubInput} request SubUnsubInput message or plain object
		 * @param {channels.ChannelsService.UnsubscribeCallback} callback Node-style callback called with the error, if any, and BooleanResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(ChannelsService.prototype.unsubscribe = function unsubscribe(
				request,
				callback
			) {
				return this.rpcCall(
					unsubscribe,
					$root.channels.SubUnsubInput,
					$root.channels.BooleanResponse,
					request,
					callback
				);
			}),
			"name",
			{ value: "Unsubscribe" }
		);

		/**
		 * Calls Unsubscribe.
		 * @function unsubscribe
		 * @memberof channels.ChannelsService
		 * @instance
		 * @param {channels.ISubUnsubInput} request SubUnsubInput message or plain object
		 * @returns {Promise<channels.BooleanResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link channels.ChannelsService#addParticipants}.
		 * @memberof channels.ChannelsService
		 * @typedef AddParticipantsCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {channels.BooleanResponse} [response] BooleanResponse
		 */

		/**
		 * Calls AddParticipants.
		 * @function addParticipants
		 * @memberof channels.ChannelsService
		 * @instance
		 * @param {channels.IAddParticipantsInput} request AddParticipantsInput message or plain object
		 * @param {channels.ChannelsService.AddParticipantsCallback} callback Node-style callback called with the error, if any, and BooleanResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(ChannelsService.prototype.addParticipants = function addParticipants(
				request,
				callback
			) {
				return this.rpcCall(
					addParticipants,
					$root.channels.AddParticipantsInput,
					$root.channels.BooleanResponse,
					request,
					callback
				);
			}),
			"name",
			{ value: "AddParticipants" }
		);

		/**
		 * Calls AddParticipants.
		 * @function addParticipants
		 * @memberof channels.ChannelsService
		 * @instance
		 * @param {channels.IAddParticipantsInput} request AddParticipantsInput message or plain object
		 * @returns {Promise<channels.BooleanResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link channels.ChannelsService#create}.
		 * @memberof channels.ChannelsService
		 * @typedef CreateCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {channels.CreateChannelResponse} [response] CreateChannelResponse
		 */

		/**
		 * Calls Create.
		 * @function create
		 * @memberof channels.ChannelsService
		 * @instance
		 * @param {channels.ICreateEditInput} request CreateEditInput message or plain object
		 * @param {channels.ChannelsService.CreateCallback} callback Node-style callback called with the error, if any, and CreateChannelResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(ChannelsService.prototype.create = function create(request, callback) {
				return this.rpcCall(
					create,
					$root.channels.CreateEditInput,
					$root.channels.CreateChannelResponse,
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
		 * @memberof channels.ChannelsService
		 * @instance
		 * @param {channels.ICreateEditInput} request CreateEditInput message or plain object
		 * @returns {Promise<channels.CreateChannelResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link channels.ChannelsService#edit}.
		 * @memberof channels.ChannelsService
		 * @typedef EditCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {channels.BooleanResponse} [response] BooleanResponse
		 */

		/**
		 * Calls Edit.
		 * @function edit
		 * @memberof channels.ChannelsService
		 * @instance
		 * @param {channels.ICreateEditInput} request CreateEditInput message or plain object
		 * @param {channels.ChannelsService.EditCallback} callback Node-style callback called with the error, if any, and BooleanResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(ChannelsService.prototype.edit = function edit(request, callback) {
				return this.rpcCall(
					edit,
					$root.channels.CreateEditInput,
					$root.channels.BooleanResponse,
					request,
					callback
				);
			}),
			"name",
			{ value: "Edit" }
		);

		/**
		 * Calls Edit.
		 * @function edit
		 * @memberof channels.ChannelsService
		 * @instance
		 * @param {channels.ICreateEditInput} request CreateEditInput message or plain object
		 * @returns {Promise<channels.BooleanResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link channels.ChannelsService#getParticipants}.
		 * @memberof channels.ChannelsService
		 * @typedef GetParticipantsCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {channels.ParticipantsListResponse} [response] ParticipantsListResponse
		 */

		/**
		 * Calls GetParticipants.
		 * @function getParticipants
		 * @memberof channels.ChannelsService
		 * @instance
		 * @param {channels.IChannelDomainInput} request ChannelDomainInput message or plain object
		 * @param {channels.ChannelsService.GetParticipantsCallback} callback Node-style callback called with the error, if any, and ParticipantsListResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(ChannelsService.prototype.getParticipants = function getParticipants(
				request,
				callback
			) {
				return this.rpcCall(
					getParticipants,
					$root.channels.ChannelDomainInput,
					$root.channels.ParticipantsListResponse,
					request,
					callback
				);
			}),
			"name",
			{ value: "GetParticipants" }
		);

		/**
		 * Calls GetParticipants.
		 * @function getParticipants
		 * @memberof channels.ChannelsService
		 * @instance
		 * @param {channels.IChannelDomainInput} request ChannelDomainInput message or plain object
		 * @returns {Promise<channels.ParticipantsListResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link channels.ChannelsService#getPendingParticipants}.
		 * @memberof channels.ChannelsService
		 * @typedef GetPendingParticipantsCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {channels.ParticipantsListResponse} [response] ParticipantsListResponse
		 */

		/**
		 * Calls GetPendingParticipants.
		 * @function getPendingParticipants
		 * @memberof channels.ChannelsService
		 * @instance
		 * @param {channels.IChannelDomainInput} request ChannelDomainInput message or plain object
		 * @param {channels.ChannelsService.GetPendingParticipantsCallback} callback Node-style callback called with the error, if any, and ParticipantsListResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(ChannelsService.prototype.getPendingParticipants =
				function getPendingParticipants(request, callback) {
					return this.rpcCall(
						getPendingParticipants,
						$root.channels.ChannelDomainInput,
						$root.channels.ParticipantsListResponse,
						request,
						callback
					);
				}),
			"name",
			{ value: "GetPendingParticipants" }
		);

		/**
		 * Calls GetPendingParticipants.
		 * @function getPendingParticipants
		 * @memberof channels.ChannelsService
		 * @instance
		 * @param {channels.IChannelDomainInput} request ChannelDomainInput message or plain object
		 * @returns {Promise<channels.ParticipantsListResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link channels.ChannelsService#updateParticipants}.
		 * @memberof channels.ChannelsService
		 * @typedef UpdateParticipantsCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {channels.BooleanResponse} [response] BooleanResponse
		 */

		/**
		 * Calls UpdateParticipants.
		 * @function updateParticipants
		 * @memberof channels.ChannelsService
		 * @instance
		 * @param {channels.IUpdateUsersInput} request UpdateUsersInput message or plain object
		 * @param {channels.ChannelsService.UpdateParticipantsCallback} callback Node-style callback called with the error, if any, and BooleanResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(ChannelsService.prototype.updateParticipants =
				function updateParticipants(request, callback) {
					return this.rpcCall(
						updateParticipants,
						$root.channels.UpdateUsersInput,
						$root.channels.BooleanResponse,
						request,
						callback
					);
				}),
			"name",
			{ value: "UpdateParticipants" }
		);

		/**
		 * Calls UpdateParticipants.
		 * @function updateParticipants
		 * @memberof channels.ChannelsService
		 * @instance
		 * @param {channels.IUpdateUsersInput} request UpdateUsersInput message or plain object
		 * @returns {Promise<channels.BooleanResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link channels.ChannelsService#requestPrivateChannelAccess}.
		 * @memberof channels.ChannelsService
		 * @typedef RequestPrivateChannelAccessCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {channels.BooleanResponse} [response] BooleanResponse
		 */

		/**
		 * Calls RequestPrivateChannelAccess.
		 * @function requestPrivateChannelAccess
		 * @memberof channels.ChannelsService
		 * @instance
		 * @param {channels.IChannelDomainInput} request ChannelDomainInput message or plain object
		 * @param {channels.ChannelsService.RequestPrivateChannelAccessCallback} callback Node-style callback called with the error, if any, and BooleanResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(ChannelsService.prototype.requestPrivateChannelAccess =
				function requestPrivateChannelAccess(request, callback) {
					return this.rpcCall(
						requestPrivateChannelAccess,
						$root.channels.ChannelDomainInput,
						$root.channels.BooleanResponse,
						request,
						callback
					);
				}),
			"name",
			{ value: "RequestPrivateChannelAccess" }
		);

		/**
		 * Calls RequestPrivateChannelAccess.
		 * @function requestPrivateChannelAccess
		 * @memberof channels.ChannelsService
		 * @instance
		 * @param {channels.IChannelDomainInput} request ChannelDomainInput message or plain object
		 * @returns {Promise<channels.BooleanResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link channels.ChannelsService#authorizeParticipants}.
		 * @memberof channels.ChannelsService
		 * @typedef AuthorizeParticipantsCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {channels.BooleanResponse} [response] BooleanResponse
		 */

		/**
		 * Calls AuthorizeParticipants.
		 * @function authorizeParticipants
		 * @memberof channels.ChannelsService
		 * @instance
		 * @param {channels.IAuthorizeParticipantInput} request AuthorizeParticipantInput message or plain object
		 * @param {channels.ChannelsService.AuthorizeParticipantsCallback} callback Node-style callback called with the error, if any, and BooleanResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(ChannelsService.prototype.authorizeParticipants =
				function authorizeParticipants(request, callback) {
					return this.rpcCall(
						authorizeParticipants,
						$root.channels.AuthorizeParticipantInput,
						$root.channels.BooleanResponse,
						request,
						callback
					);
				}),
			"name",
			{ value: "AuthorizeParticipants" }
		);

		/**
		 * Calls AuthorizeParticipants.
		 * @function authorizeParticipants
		 * @memberof channels.ChannelsService
		 * @instance
		 * @param {channels.IAuthorizeParticipantInput} request AuthorizeParticipantInput message or plain object
		 * @returns {Promise<channels.BooleanResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link channels.ChannelsService#changeOwner}.
		 * @memberof channels.ChannelsService
		 * @typedef ChangeOwnerCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {channels.BooleanResponse} [response] BooleanResponse
		 */

		/**
		 * Calls ChangeOwner.
		 * @function changeOwner
		 * @memberof channels.ChannelsService
		 * @instance
		 * @param {channels.IChangeOwnerInput} request ChangeOwnerInput message or plain object
		 * @param {channels.ChannelsService.ChangeOwnerCallback} callback Node-style callback called with the error, if any, and BooleanResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(ChannelsService.prototype.changeOwner = function changeOwner(
				request,
				callback
			) {
				return this.rpcCall(
					changeOwner,
					$root.channels.ChangeOwnerInput,
					$root.channels.BooleanResponse,
					request,
					callback
				);
			}),
			"name",
			{ value: "ChangeOwner" }
		);

		/**
		 * Calls ChangeOwner.
		 * @function changeOwner
		 * @memberof channels.ChannelsService
		 * @instance
		 * @param {channels.IChangeOwnerInput} request ChangeOwnerInput message or plain object
		 * @returns {Promise<channels.BooleanResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link channels.ChannelsService#getChannelAdmins}.
		 * @memberof channels.ChannelsService
		 * @typedef GetChannelAdminsCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {channels.ParticipantsListResponse} [response] ParticipantsListResponse
		 */

		/**
		 * Calls GetChannelAdmins.
		 * @function getChannelAdmins
		 * @memberof channels.ChannelsService
		 * @instance
		 * @param {channels.IChannelDomainInput} request ChannelDomainInput message or plain object
		 * @param {channels.ChannelsService.GetChannelAdminsCallback} callback Node-style callback called with the error, if any, and ParticipantsListResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(ChannelsService.prototype.getChannelAdmins = function getChannelAdmins(
				request,
				callback
			) {
				return this.rpcCall(
					getChannelAdmins,
					$root.channels.ChannelDomainInput,
					$root.channels.ParticipantsListResponse,
					request,
					callback
				);
			}),
			"name",
			{ value: "GetChannelAdmins" }
		);

		/**
		 * Calls GetChannelAdmins.
		 * @function getChannelAdmins
		 * @memberof channels.ChannelsService
		 * @instance
		 * @param {channels.IChannelDomainInput} request ChannelDomainInput message or plain object
		 * @returns {Promise<channels.ParticipantsListResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link channels.ChannelsService#updateChannelAdmins}.
		 * @memberof channels.ChannelsService
		 * @typedef UpdateChannelAdminsCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {channels.BooleanResponse} [response] BooleanResponse
		 */

		/**
		 * Calls UpdateChannelAdmins.
		 * @function updateChannelAdmins
		 * @memberof channels.ChannelsService
		 * @instance
		 * @param {channels.IUpdateUsersInput} request UpdateUsersInput message or plain object
		 * @param {channels.ChannelsService.UpdateChannelAdminsCallback} callback Node-style callback called with the error, if any, and BooleanResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(ChannelsService.prototype.updateChannelAdmins =
				function updateChannelAdmins(request, callback) {
					return this.rpcCall(
						updateChannelAdmins,
						$root.channels.UpdateUsersInput,
						$root.channels.BooleanResponse,
						request,
						callback
					);
				}),
			"name",
			{ value: "UpdateChannelAdmins" }
		);

		/**
		 * Calls UpdateChannelAdmins.
		 * @function updateChannelAdmins
		 * @memberof channels.ChannelsService
		 * @instance
		 * @param {channels.IUpdateUsersInput} request UpdateUsersInput message or plain object
		 * @returns {Promise<channels.BooleanResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link channels.ChannelsService#deleteChannel}.
		 * @memberof channels.ChannelsService
		 * @typedef DeleteChannelCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {channels.BooleanResponse} [response] BooleanResponse
		 */

		/**
		 * Calls DeleteChannel.
		 * @function deleteChannel
		 * @memberof channels.ChannelsService
		 * @instance
		 * @param {channels.IChannelDomainInput} request ChannelDomainInput message or plain object
		 * @param {channels.ChannelsService.DeleteChannelCallback} callback Node-style callback called with the error, if any, and BooleanResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(ChannelsService.prototype.deleteChannel = function deleteChannel(
				request,
				callback
			) {
				return this.rpcCall(
					deleteChannel,
					$root.channels.ChannelDomainInput,
					$root.channels.BooleanResponse,
					request,
					callback
				);
			}),
			"name",
			{ value: "DeleteChannel" }
		);

		/**
		 * Calls DeleteChannel.
		 * @function deleteChannel
		 * @memberof channels.ChannelsService
		 * @instance
		 * @param {channels.IChannelDomainInput} request ChannelDomainInput message or plain object
		 * @returns {Promise<channels.BooleanResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link channels.ChannelsService#findNewParticipants}.
		 * @memberof channels.ChannelsService
		 * @typedef FindNewParticipantsCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {channels.FindNewParticipantsResponse} [response] FindNewParticipantsResponse
		 */

		/**
		 * Calls FindNewParticipants.
		 * @function findNewParticipants
		 * @memberof channels.ChannelsService
		 * @instance
		 * @param {channels.IFindNewParticipantsInput} request FindNewParticipantsInput message or plain object
		 * @param {channels.ChannelsService.FindNewParticipantsCallback} callback Node-style callback called with the error, if any, and FindNewParticipantsResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(ChannelsService.prototype.findNewParticipants =
				function findNewParticipants(request, callback) {
					return this.rpcCall(
						findNewParticipants,
						$root.channels.FindNewParticipantsInput,
						$root.channels.FindNewParticipantsResponse,
						request,
						callback
					);
				}),
			"name",
			{ value: "FindNewParticipants" }
		);

		/**
		 * Calls FindNewParticipants.
		 * @function findNewParticipants
		 * @memberof channels.ChannelsService
		 * @instance
		 * @param {channels.IFindNewParticipantsInput} request FindNewParticipantsInput message or plain object
		 * @returns {Promise<channels.FindNewParticipantsResponse>} Promise
		 * @variation 2
		 */

		return ChannelsService;
	})();

	channels.SubUnsubInput = (function () {
		/**
		 * Properties of a SubUnsubInput.
		 * @memberof channels
		 * @interface ISubUnsubInput
		 * @property {Array.<channels.IDomainChannels>|null} [domainChannels] SubUnsubInput domainChannels
		 */

		/**
		 * Constructs a new SubUnsubInput.
		 * @memberof channels
		 * @classdesc Represents a SubUnsubInput.
		 * @implements ISubUnsubInput
		 * @constructor
		 * @param {channels.ISubUnsubInput=} [properties] Properties to set
		 */
		function SubUnsubInput(properties) {
			this.domainChannels = [];
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * SubUnsubInput domainChannels.
		 * @member {Array.<channels.IDomainChannels>} domainChannels
		 * @memberof channels.SubUnsubInput
		 * @instance
		 */
		SubUnsubInput.prototype.domainChannels = $util.emptyArray;

		/**
		 * Creates a new SubUnsubInput instance using the specified properties.
		 * @function create
		 * @memberof channels.SubUnsubInput
		 * @static
		 * @param {channels.ISubUnsubInput=} [properties] Properties to set
		 * @returns {channels.SubUnsubInput} SubUnsubInput instance
		 */
		SubUnsubInput.create = function create(properties) {
			return new SubUnsubInput(properties);
		};

		/**
		 * Encodes the specified SubUnsubInput message. Does not implicitly {@link channels.SubUnsubInput.verify|verify} messages.
		 * @function encode
		 * @memberof channels.SubUnsubInput
		 * @static
		 * @param {channels.ISubUnsubInput} message SubUnsubInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		SubUnsubInput.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.domainChannels !== null && message.domainChannels.length)
				for (var i = 0; i < message.domainChannels.length; ++i)
					$root.channels.DomainChannels.encode(
						message.domainChannels[i],
						writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
					).ldelim();
			return writer;
		};

		/**
		 * Encodes the specified SubUnsubInput message, length delimited. Does not implicitly {@link channels.SubUnsubInput.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof channels.SubUnsubInput
		 * @static
		 * @param {channels.ISubUnsubInput} message SubUnsubInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		SubUnsubInput.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a SubUnsubInput message from the specified reader or buffer.
		 * @function decode
		 * @memberof channels.SubUnsubInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {channels.SubUnsubInput} SubUnsubInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		SubUnsubInput.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.channels.SubUnsubInput();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						if (!(message.domainChannels && message.domainChannels.length))
							message.domainChannels = [];
						message.domainChannels.push(
							$root.channels.DomainChannels.decode(reader, reader.uint32())
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
		 * Decodes a SubUnsubInput message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof channels.SubUnsubInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {channels.SubUnsubInput} SubUnsubInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		SubUnsubInput.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a SubUnsubInput message.
		 * @function verify
		 * @memberof channels.SubUnsubInput
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		SubUnsubInput.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (
				message.domainChannels !== null &&
				message.hasOwnProperty("domainChannels")
			) {
				if (!Array.isArray(message.domainChannels))
					return "domainChannels: array expected";
				for (var i = 0; i < message.domainChannels.length; ++i) {
					var error = $root.channels.DomainChannels.verify(
						message.domainChannels[i]
					);
					if (error) return "domainChannels." + error;
				}
			}
			return null;
		};

		/**
		 * Creates a SubUnsubInput message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof channels.SubUnsubInput
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {channels.SubUnsubInput} SubUnsubInput
		 */
		SubUnsubInput.fromObject = function fromObject(object) {
			if (object instanceof $root.channels.SubUnsubInput) return object;
			var message = new $root.channels.SubUnsubInput();
			if (object.domainChannels) {
				if (!Array.isArray(object.domainChannels))
					throw TypeError(
						".channels.SubUnsubInput.domainChannels: array expected"
					);
				message.domainChannels = [];
				for (var i = 0; i < object.domainChannels.length; ++i) {
					if (typeof object.domainChannels[i] !== "object")
						throw TypeError(
							".channels.SubUnsubInput.domainChannels: object expected"
						);
					message.domainChannels[i] = $root.channels.DomainChannels.fromObject(
						object.domainChannels[i]
					);
				}
			}
			return message;
		};

		/**
		 * Creates a plain object from a SubUnsubInput message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof channels.SubUnsubInput
		 * @static
		 * @param {channels.SubUnsubInput} message SubUnsubInput
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		SubUnsubInput.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.arrays || options.defaults) object.domainChannels = [];
			if (message.domainChannels && message.domainChannels.length) {
				object.domainChannels = [];
				for (var j = 0; j < message.domainChannels.length; ++j)
					object.domainChannels[j] = $root.channels.DomainChannels.toObject(
						message.domainChannels[j],
						options
					);
			}
			return object;
		};

		/**
		 * Converts this SubUnsubInput to JSON.
		 * @function toJSON
		 * @memberof channels.SubUnsubInput
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		SubUnsubInput.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return SubUnsubInput;
	})();

	channels.DomainChannels = (function () {
		/**
		 * Properties of a DomainChannels.
		 * @memberof channels
		 * @interface IDomainChannels
		 * @property {string|null} [userDomain] DomainChannels userDomain
		 * @property {Array.<string>|null} [channels] DomainChannels channels
		 */

		/**
		 * Constructs a new DomainChannels.
		 * @memberof channels
		 * @classdesc Represents a DomainChannels.
		 * @implements IDomainChannels
		 * @constructor
		 * @param {channels.IDomainChannels=} [properties] Properties to set
		 */
		function DomainChannels(properties) {
			this.channels = [];
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * DomainChannels userDomain.
		 * @member {string} userDomain
		 * @memberof channels.DomainChannels
		 * @instance
		 */
		DomainChannels.prototype.userDomain = "";

		/**
		 * DomainChannels channels.
		 * @member {Array.<string>} channels
		 * @memberof channels.DomainChannels
		 * @instance
		 */
		DomainChannels.prototype.channels = $util.emptyArray;

		/**
		 * Creates a new DomainChannels instance using the specified properties.
		 * @function create
		 * @memberof channels.DomainChannels
		 * @static
		 * @param {channels.IDomainChannels=} [properties] Properties to set
		 * @returns {channels.DomainChannels} DomainChannels instance
		 */
		DomainChannels.create = function create(properties) {
			return new DomainChannels(properties);
		};

		/**
		 * Encodes the specified DomainChannels message. Does not implicitly {@link channels.DomainChannels.verify|verify} messages.
		 * @function encode
		 * @memberof channels.DomainChannels
		 * @static
		 * @param {channels.IDomainChannels} message DomainChannels message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		DomainChannels.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.userDomain !== null && message.hasOwnProperty("userDomain"))
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.userDomain);
			if (message.channels !== null && message.channels.length)
				for (var i = 0; i < message.channels.length; ++i)
					writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.channels[i]);
			return writer;
		};

		/**
		 * Encodes the specified DomainChannels message, length delimited. Does not implicitly {@link channels.DomainChannels.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof channels.DomainChannels
		 * @static
		 * @param {channels.IDomainChannels} message DomainChannels message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		DomainChannels.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a DomainChannels message from the specified reader or buffer.
		 * @function decode
		 * @memberof channels.DomainChannels
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {channels.DomainChannels} DomainChannels
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		DomainChannels.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.channels.DomainChannels();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.userDomain = reader.string();
						break;
					case 2:
						if (!(message.channels && message.channels.length))
							message.channels = [];
						message.channels.push(reader.string());
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a DomainChannels message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof channels.DomainChannels
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {channels.DomainChannels} DomainChannels
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		DomainChannels.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a DomainChannels message.
		 * @function verify
		 * @memberof channels.DomainChannels
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		DomainChannels.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.userDomain !== null && message.hasOwnProperty("userDomain"))
				if (!$util.isString(message.userDomain))
					return "userDomain: string expected";
			if (message.channels !== null && message.hasOwnProperty("channels")) {
				if (!Array.isArray(message.channels)) return "channels: array expected";
				for (var i = 0; i < message.channels.length; ++i)
					if (!$util.isString(message.channels[i]))
						return "channels: string[] expected";
			}
			return null;
		};

		/**
		 * Creates a DomainChannels message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof channels.DomainChannels
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {channels.DomainChannels} DomainChannels
		 */
		DomainChannels.fromObject = function fromObject(object) {
			if (object instanceof $root.channels.DomainChannels) return object;
			var message = new $root.channels.DomainChannels();
			if (object.userDomain !== null)
				message.userDomain = String(object.userDomain);
			if (object.channels) {
				if (!Array.isArray(object.channels))
					throw TypeError(".channels.DomainChannels.channels: array expected");
				message.channels = [];
				for (var i = 0; i < object.channels.length; ++i)
					message.channels[i] = String(object.channels[i]);
			}
			return message;
		};

		/**
		 * Creates a plain object from a DomainChannels message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof channels.DomainChannels
		 * @static
		 * @param {channels.DomainChannels} message DomainChannels
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		DomainChannels.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.arrays || options.defaults) object.channels = [];
			if (options.defaults) object.userDomain = "";
			if (message.userDomain !== null && message.hasOwnProperty("userDomain"))
				object.userDomain = message.userDomain;
			if (message.channels && message.channels.length) {
				object.channels = [];
				for (var j = 0; j < message.channels.length; ++j)
					object.channels[j] = message.channels[j];
			}
			return object;
		};

		/**
		 * Converts this DomainChannels to JSON.
		 * @function toJSON
		 * @memberof channels.DomainChannels
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		DomainChannels.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return DomainChannels;
	})();

	channels.AddParticipantsInput = (function () {
		/**
		 * Properties of an AddParticipantsInput.
		 * @memberof channels
		 * @interface IAddParticipantsInput
		 * @property {string|null} [channelName] AddParticipantsInput channelName
		 * @property {string|null} [userDomain] AddParticipantsInput userDomain
		 * @property {Array.<string>|null} [newUserIds] AddParticipantsInput newUserIds
		 */

		/**
		 * Constructs a new AddParticipantsInput.
		 * @memberof channels
		 * @classdesc Represents an AddParticipantsInput.
		 * @implements IAddParticipantsInput
		 * @constructor
		 * @param {channels.IAddParticipantsInput=} [properties] Properties to set
		 */
		function AddParticipantsInput(properties) {
			this.newUserIds = [];
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * AddParticipantsInput channelName.
		 * @member {string} channelName
		 * @memberof channels.AddParticipantsInput
		 * @instance
		 */
		AddParticipantsInput.prototype.channelName = "";

		/**
		 * AddParticipantsInput userDomain.
		 * @member {string} userDomain
		 * @memberof channels.AddParticipantsInput
		 * @instance
		 */
		AddParticipantsInput.prototype.userDomain = "";

		/**
		 * AddParticipantsInput newUserIds.
		 * @member {Array.<string>} newUserIds
		 * @memberof channels.AddParticipantsInput
		 * @instance
		 */
		AddParticipantsInput.prototype.newUserIds = $util.emptyArray;

		/**
		 * Creates a new AddParticipantsInput instance using the specified properties.
		 * @function create
		 * @memberof channels.AddParticipantsInput
		 * @static
		 * @param {channels.IAddParticipantsInput=} [properties] Properties to set
		 * @returns {channels.AddParticipantsInput} AddParticipantsInput instance
		 */
		AddParticipantsInput.create = function create(properties) {
			return new AddParticipantsInput(properties);
		};

		/**
		 * Encodes the specified AddParticipantsInput message. Does not implicitly {@link channels.AddParticipantsInput.verify|verify} messages.
		 * @function encode
		 * @memberof channels.AddParticipantsInput
		 * @static
		 * @param {channels.IAddParticipantsInput} message AddParticipantsInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		AddParticipantsInput.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.channelName !== null && message.hasOwnProperty("channelName"))
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.channelName);
			if (message.userDomain !== null && message.hasOwnProperty("userDomain"))
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.userDomain);
			if (message.newUserIds !== null && message.newUserIds.length)
				for (var i = 0; i < message.newUserIds.length; ++i)
					writer
						.uint32(/* id 3, wireType 2 =*/ 26)
						.string(message.newUserIds[i]);
			return writer;
		};

		/**
		 * Encodes the specified AddParticipantsInput message, length delimited. Does not implicitly {@link channels.AddParticipantsInput.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof channels.AddParticipantsInput
		 * @static
		 * @param {channels.IAddParticipantsInput} message AddParticipantsInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		AddParticipantsInput.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes an AddParticipantsInput message from the specified reader or buffer.
		 * @function decode
		 * @memberof channels.AddParticipantsInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {channels.AddParticipantsInput} AddParticipantsInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		AddParticipantsInput.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.channels.AddParticipantsInput();
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
						if (!(message.newUserIds && message.newUserIds.length))
							message.newUserIds = [];
						message.newUserIds.push(reader.string());
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes an AddParticipantsInput message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof channels.AddParticipantsInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {channels.AddParticipantsInput} AddParticipantsInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		AddParticipantsInput.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies an AddParticipantsInput message.
		 * @function verify
		 * @memberof channels.AddParticipantsInput
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		AddParticipantsInput.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.channelName !== null && message.hasOwnProperty("channelName"))
				if (!$util.isString(message.channelName))
					return "channelName: string expected";
			if (message.userDomain !== null && message.hasOwnProperty("userDomain"))
				if (!$util.isString(message.userDomain))
					return "userDomain: string expected";
			if (message.newUserIds !== null && message.hasOwnProperty("newUserIds")) {
				if (!Array.isArray(message.newUserIds))
					return "newUserIds: array expected";
				for (var i = 0; i < message.newUserIds.length; ++i)
					if (!$util.isString(message.newUserIds[i]))
						return "newUserIds: string[] expected";
			}
			return null;
		};

		/**
		 * Creates an AddParticipantsInput message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof channels.AddParticipantsInput
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {channels.AddParticipantsInput} AddParticipantsInput
		 */
		AddParticipantsInput.fromObject = function fromObject(object) {
			if (object instanceof $root.channels.AddParticipantsInput) return object;
			var message = new $root.channels.AddParticipantsInput();
			if (object.channelName !== null)
				message.channelName = String(object.channelName);
			if (object.userDomain !== null)
				message.userDomain = String(object.userDomain);
			if (object.newUserIds) {
				if (!Array.isArray(object.newUserIds))
					throw TypeError(
						".channels.AddParticipantsInput.newUserIds: array expected"
					);
				message.newUserIds = [];
				for (var i = 0; i < object.newUserIds.length; ++i)
					message.newUserIds[i] = String(object.newUserIds[i]);
			}
			return message;
		};

		/**
		 * Creates a plain object from an AddParticipantsInput message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof channels.AddParticipantsInput
		 * @static
		 * @param {channels.AddParticipantsInput} message AddParticipantsInput
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		AddParticipantsInput.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.arrays || options.defaults) object.newUserIds = [];
			if (options.defaults) {
				object.channelName = "";
				object.userDomain = "";
			}
			if (message.channelName !== null && message.hasOwnProperty("channelName"))
				object.channelName = message.channelName;
			if (message.userDomain !== null && message.hasOwnProperty("userDomain"))
				object.userDomain = message.userDomain;
			if (message.newUserIds && message.newUserIds.length) {
				object.newUserIds = [];
				for (var j = 0; j < message.newUserIds.length; ++j)
					object.newUserIds[j] = message.newUserIds[j];
			}
			return object;
		};

		/**
		 * Converts this AddParticipantsInput to JSON.
		 * @function toJSON
		 * @memberof channels.AddParticipantsInput
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		AddParticipantsInput.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return AddParticipantsInput;
	})();

	channels.CreateEditInput = (function () {
		/**
		 * Properties of a CreateEditInput.
		 * @memberof channels
		 * @interface ICreateEditInput
		 * @property {channels.IInputChannel|null} [channel] CreateEditInput channel
		 */

		/**
		 * Constructs a new CreateEditInput.
		 * @memberof channels
		 * @classdesc Represents a CreateEditInput.
		 * @implements ICreateEditInput
		 * @constructor
		 * @param {channels.ICreateEditInput=} [properties] Properties to set
		 */
		function CreateEditInput(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * CreateEditInput channel.
		 * @member {channels.IInputChannel|null|undefined} channel
		 * @memberof channels.CreateEditInput
		 * @instance
		 */
		CreateEditInput.prototype.channel = null;

		/**
		 * Creates a new CreateEditInput instance using the specified properties.
		 * @function create
		 * @memberof channels.CreateEditInput
		 * @static
		 * @param {channels.ICreateEditInput=} [properties] Properties to set
		 * @returns {channels.CreateEditInput} CreateEditInput instance
		 */
		CreateEditInput.create = function create(properties) {
			return new CreateEditInput(properties);
		};

		/**
		 * Encodes the specified CreateEditInput message. Does not implicitly {@link channels.CreateEditInput.verify|verify} messages.
		 * @function encode
		 * @memberof channels.CreateEditInput
		 * @static
		 * @param {channels.ICreateEditInput} message CreateEditInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		CreateEditInput.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.channel !== null && message.hasOwnProperty("channel"))
				$root.channels.InputChannel.encode(
					message.channel,
					writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
				).ldelim();
			return writer;
		};

		/**
		 * Encodes the specified CreateEditInput message, length delimited. Does not implicitly {@link channels.CreateEditInput.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof channels.CreateEditInput
		 * @static
		 * @param {channels.ICreateEditInput} message CreateEditInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		CreateEditInput.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a CreateEditInput message from the specified reader or buffer.
		 * @function decode
		 * @memberof channels.CreateEditInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {channels.CreateEditInput} CreateEditInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		CreateEditInput.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.channels.CreateEditInput();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.channel = $root.channels.InputChannel.decode(
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
		 * Decodes a CreateEditInput message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof channels.CreateEditInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {channels.CreateEditInput} CreateEditInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		CreateEditInput.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a CreateEditInput message.
		 * @function verify
		 * @memberof channels.CreateEditInput
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		CreateEditInput.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.channel !== null && message.hasOwnProperty("channel")) {
				var error = $root.channels.InputChannel.verify(message.channel);
				if (error) return "channel." + error;
			}
			return null;
		};

		/**
		 * Creates a CreateEditInput message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof channels.CreateEditInput
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {channels.CreateEditInput} CreateEditInput
		 */
		CreateEditInput.fromObject = function fromObject(object) {
			if (object instanceof $root.channels.CreateEditInput) return object;
			var message = new $root.channels.CreateEditInput();
			if (object.channel !== null) {
				if (typeof object.channel !== "object")
					throw TypeError(".channels.CreateEditInput.channel: object expected");
				message.channel = $root.channels.InputChannel.fromObject(
					object.channel
				);
			}
			return message;
		};

		/**
		 * Creates a plain object from a CreateEditInput message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof channels.CreateEditInput
		 * @static
		 * @param {channels.CreateEditInput} message CreateEditInput
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		CreateEditInput.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) object.channel = null;
			if (message.channel !== null && message.hasOwnProperty("channel"))
				object.channel = $root.channels.InputChannel.toObject(
					message.channel,
					options
				);
			return object;
		};

		/**
		 * Converts this CreateEditInput to JSON.
		 * @function toJSON
		 * @memberof channels.CreateEditInput
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		CreateEditInput.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return CreateEditInput;
	})();

	channels.InputChannel = (function () {
		/**
		 * Properties of an InputChannel.
		 * @memberof channels
		 * @interface IInputChannel
		 * @property {string|null} [channelName] InputChannel channelName
		 * @property {string|null} [userDomain] InputChannel userDomain
		 * @property {string|null} [description] InputChannel description
		 * @property {string|null} [channelType] InputChannel channelType
		 * @property {string|null} [discoverable] InputChannel discoverable
		 */

		/**
		 * Constructs a new InputChannel.
		 * @memberof channels
		 * @classdesc Represents an InputChannel.
		 * @implements IInputChannel
		 * @constructor
		 * @param {channels.IInputChannel=} [properties] Properties to set
		 */
		function InputChannel(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * InputChannel channelName.
		 * @member {string} channelName
		 * @memberof channels.InputChannel
		 * @instance
		 */
		InputChannel.prototype.channelName = "";

		/**
		 * InputChannel userDomain.
		 * @member {string} userDomain
		 * @memberof channels.InputChannel
		 * @instance
		 */
		InputChannel.prototype.userDomain = "";

		/**
		 * InputChannel description.
		 * @member {string} description
		 * @memberof channels.InputChannel
		 * @instance
		 */
		InputChannel.prototype.description = "";

		/**
		 * InputChannel channelType.
		 * @member {string} channelType
		 * @memberof channels.InputChannel
		 * @instance
		 */
		InputChannel.prototype.channelType = "";

		/**
		 * InputChannel discoverable.
		 * @member {string} discoverable
		 * @memberof channels.InputChannel
		 * @instance
		 */
		InputChannel.prototype.discoverable = "";

		/**
		 * Creates a new InputChannel instance using the specified properties.
		 * @function create
		 * @memberof channels.InputChannel
		 * @static
		 * @param {channels.IInputChannel=} [properties] Properties to set
		 * @returns {channels.InputChannel} InputChannel instance
		 */
		InputChannel.create = function create(properties) {
			return new InputChannel(properties);
		};

		/**
		 * Encodes the specified InputChannel message. Does not implicitly {@link channels.InputChannel.verify|verify} messages.
		 * @function encode
		 * @memberof channels.InputChannel
		 * @static
		 * @param {channels.IInputChannel} message InputChannel message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		InputChannel.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.channelName !== null && message.hasOwnProperty("channelName"))
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.channelName);
			if (message.userDomain !== null && message.hasOwnProperty("userDomain"))
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.userDomain);
			if (message.description !== null && message.hasOwnProperty("description"))
				writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.description);
			if (message.channelType !== null && message.hasOwnProperty("channelType"))
				writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.channelType);
			if (
				message.discoverable !== null &&
				message.hasOwnProperty("discoverable")
			)
				writer.uint32(/* id 5, wireType 2 =*/ 42).string(message.discoverable);
			return writer;
		};

		/**
		 * Encodes the specified InputChannel message, length delimited. Does not implicitly {@link channels.InputChannel.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof channels.InputChannel
		 * @static
		 * @param {channels.IInputChannel} message InputChannel message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		InputChannel.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes an InputChannel message from the specified reader or buffer.
		 * @function decode
		 * @memberof channels.InputChannel
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {channels.InputChannel} InputChannel
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		InputChannel.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.channels.InputChannel();
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
						message.description = reader.string();
						break;
					case 4:
						message.channelType = reader.string();
						break;
					case 5:
						message.discoverable = reader.string();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes an InputChannel message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof channels.InputChannel
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {channels.InputChannel} InputChannel
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		InputChannel.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies an InputChannel message.
		 * @function verify
		 * @memberof channels.InputChannel
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		InputChannel.verify = function verify(message) {
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
			if (message.channelType !== null && message.hasOwnProperty("channelType"))
				if (!$util.isString(message.channelType))
					return "channelType: string expected";
			if (
				message.discoverable !== null &&
				message.hasOwnProperty("discoverable")
			)
				if (!$util.isString(message.discoverable))
					return "discoverable: string expected";
			return null;
		};

		/**
		 * Creates an InputChannel message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof channels.InputChannel
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {channels.InputChannel} InputChannel
		 */
		InputChannel.fromObject = function fromObject(object) {
			if (object instanceof $root.channels.InputChannel) return object;
			var message = new $root.channels.InputChannel();
			if (object.channelName !== null)
				message.channelName = String(object.channelName);
			if (object.userDomain !== null)
				message.userDomain = String(object.userDomain);
			if (object.description !== null)
				message.description = String(object.description);
			if (object.channelType !== null)
				message.channelType = String(object.channelType);
			if (object.discoverable !== null)
				message.discoverable = String(object.discoverable);
			return message;
		};

		/**
		 * Creates a plain object from an InputChannel message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof channels.InputChannel
		 * @static
		 * @param {channels.InputChannel} message InputChannel
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		InputChannel.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.channelName = "";
				object.userDomain = "";
				object.description = "";
				object.channelType = "";
				object.discoverable = "";
			}
			if (message.channelName !== null && message.hasOwnProperty("channelName"))
				object.channelName = message.channelName;
			if (message.userDomain !== null && message.hasOwnProperty("userDomain"))
				object.userDomain = message.userDomain;
			if (message.description !== null && message.hasOwnProperty("description"))
				object.description = message.description;
			if (message.channelType !== null && message.hasOwnProperty("channelType"))
				object.channelType = message.channelType;
			if (
				message.discoverable !== null &&
				message.hasOwnProperty("discoverable")
			)
				object.discoverable = message.discoverable;
			return object;
		};

		/**
		 * Converts this InputChannel to JSON.
		 * @function toJSON
		 * @memberof channels.InputChannel
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		InputChannel.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return InputChannel;
	})();

	channels.ChannelListResponse = (function () {
		/**
		 * Properties of a ChannelListResponse.
		 * @memberof channels
		 * @interface IChannelListResponse
		 * @property {number|null} [error] ChannelListResponse error
		 * @property {Array.<channels.IDBChannel>|null} [content] ChannelListResponse content
		 */

		/**
		 * Constructs a new ChannelListResponse.
		 * @memberof channels
		 * @classdesc Represents a ChannelListResponse.
		 * @implements IChannelListResponse
		 * @constructor
		 * @param {channels.IChannelListResponse=} [properties] Properties to set
		 */
		function ChannelListResponse(properties) {
			this.content = [];
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * ChannelListResponse error.
		 * @member {number} error
		 * @memberof channels.ChannelListResponse
		 * @instance
		 */
		ChannelListResponse.prototype.error = 0;

		/**
		 * ChannelListResponse content.
		 * @member {Array.<channels.IDBChannel>} content
		 * @memberof channels.ChannelListResponse
		 * @instance
		 */
		ChannelListResponse.prototype.content = $util.emptyArray;

		/**
		 * Creates a new ChannelListResponse instance using the specified properties.
		 * @function create
		 * @memberof channels.ChannelListResponse
		 * @static
		 * @param {channels.IChannelListResponse=} [properties] Properties to set
		 * @returns {channels.ChannelListResponse} ChannelListResponse instance
		 */
		ChannelListResponse.create = function create(properties) {
			return new ChannelListResponse(properties);
		};

		/**
		 * Encodes the specified ChannelListResponse message. Does not implicitly {@link channels.ChannelListResponse.verify|verify} messages.
		 * @function encode
		 * @memberof channels.ChannelListResponse
		 * @static
		 * @param {channels.IChannelListResponse} message ChannelListResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		ChannelListResponse.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.error !== null && message.hasOwnProperty("error"))
				writer.uint32(/* id 1, wireType 0 =*/ 8).int32(message.error);
			if (message.content !== null && message.content.length)
				for (var i = 0; i < message.content.length; ++i)
					$root.channels.DBChannel.encode(
						message.content[i],
						writer.uint32(/* id 2, wireType 2 =*/ 18).fork()
					).ldelim();
			return writer;
		};

		/**
		 * Encodes the specified ChannelListResponse message, length delimited. Does not implicitly {@link channels.ChannelListResponse.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof channels.ChannelListResponse
		 * @static
		 * @param {channels.IChannelListResponse} message ChannelListResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		ChannelListResponse.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a ChannelListResponse message from the specified reader or buffer.
		 * @function decode
		 * @memberof channels.ChannelListResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {channels.ChannelListResponse} ChannelListResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		ChannelListResponse.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.channels.ChannelListResponse();
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
							$root.channels.DBChannel.decode(reader, reader.uint32())
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
		 * Decodes a ChannelListResponse message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof channels.ChannelListResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {channels.ChannelListResponse} ChannelListResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		ChannelListResponse.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a ChannelListResponse message.
		 * @function verify
		 * @memberof channels.ChannelListResponse
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		ChannelListResponse.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.error !== null && message.hasOwnProperty("error"))
				if (!$util.isInteger(message.error)) return "error: integer expected";
			if (message.content !== null && message.hasOwnProperty("content")) {
				if (!Array.isArray(message.content)) return "content: array expected";
				for (var i = 0; i < message.content.length; ++i) {
					var error = $root.channels.DBChannel.verify(message.content[i]);
					if (error) return "content." + error;
				}
			}
			return null;
		};

		/**
		 * Creates a ChannelListResponse message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof channels.ChannelListResponse
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {channels.ChannelListResponse} ChannelListResponse
		 */
		ChannelListResponse.fromObject = function fromObject(object) {
			if (object instanceof $root.channels.ChannelListResponse) return object;
			var message = new $root.channels.ChannelListResponse();
			if (object.error !== null) message.error = object.error | 0;
			if (object.content) {
				if (!Array.isArray(object.content))
					throw TypeError(
						".channels.ChannelListResponse.content: array expected"
					);
				message.content = [];
				for (var i = 0; i < object.content.length; ++i) {
					if (typeof object.content[i] !== "object")
						throw TypeError(
							".channels.ChannelListResponse.content: object expected"
						);
					message.content[i] = $root.channels.DBChannel.fromObject(
						object.content[i]
					);
				}
			}
			return message;
		};

		/**
		 * Creates a plain object from a ChannelListResponse message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof channels.ChannelListResponse
		 * @static
		 * @param {channels.ChannelListResponse} message ChannelListResponse
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		ChannelListResponse.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.arrays || options.defaults) object.content = [];
			if (options.defaults) object.error = 0;
			if (message.error !== null && message.hasOwnProperty("error"))
				object.error = message.error;
			if (message.content && message.content.length) {
				object.content = [];
				for (var j = 0; j < message.content.length; ++j)
					object.content[j] = $root.channels.DBChannel.toObject(
						message.content[j],
						options
					);
			}
			return object;
		};

		/**
		 * Converts this ChannelListResponse to JSON.
		 * @function toJSON
		 * @memberof channels.ChannelListResponse
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		ChannelListResponse.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return ChannelListResponse;
	})();

	channels.DBChannel = (function () {
		/**
		 * Properties of a DBChannel.
		 * @memberof channels
		 * @interface IDBChannel
		 * @property {string|null} [channelId] DBChannel channelId
		 * @property {string|null} [channelType] DBChannel channelType
		 * @property {number|null} [createdOn] DBChannel createdOn
		 * @property {string|null} [channelName] DBChannel channelName
		 * @property {string|null} [userDomain] DBChannel userDomain
		 * @property {channels.IChannelOwner|null} [channelOwner] DBChannel channelOwner
		 * @property {string|null} [description] DBChannel description
		 * @property {string|null} [discoverable] DBChannel discoverable
		 * @property {string|null} [logo] DBChannel logo
		 * @property {boolean|null} [isPlatformChannel] DBChannel isPlatformChannel
		 * @property {Array.<string>|null} [participants] DBChannel participants
		 * @property {boolean|null} [requestSent] DBChannel requestSent
		 * @property {boolean|null} [isFavourite] DBChannel isFavourite
		 */

		/**
		 * Constructs a new DBChannel.
		 * @memberof channels
		 * @classdesc Represents a DBChannel.
		 * @implements IDBChannel
		 * @constructor
		 * @param {channels.IDBChannel=} [properties] Properties to set
		 */
		function DBChannel(properties) {
			this.participants = [];
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * DBChannel channelId.
		 * @member {string} channelId
		 * @memberof channels.DBChannel
		 * @instance
		 */
		DBChannel.prototype.channelId = "";

		/**
		 * DBChannel channelType.
		 * @member {string} channelType
		 * @memberof channels.DBChannel
		 * @instance
		 */
		DBChannel.prototype.channelType = "";

		/**
		 * DBChannel createdOn.
		 * @member {number} createdOn
		 * @memberof channels.DBChannel
		 * @instance
		 */
		DBChannel.prototype.createdOn = 0;

		/**
		 * DBChannel channelName.
		 * @member {string} channelName
		 * @memberof channels.DBChannel
		 * @instance
		 */
		DBChannel.prototype.channelName = "";

		/**
		 * DBChannel userDomain.
		 * @member {string} userDomain
		 * @memberof channels.DBChannel
		 * @instance
		 */
		DBChannel.prototype.userDomain = "";

		/**
		 * DBChannel channelOwner.
		 * @member {channels.IChannelOwner|null|undefined} channelOwner
		 * @memberof channels.DBChannel
		 * @instance
		 */
		DBChannel.prototype.channelOwner = null;

		/**
		 * DBChannel description.
		 * @member {string} description
		 * @memberof channels.DBChannel
		 * @instance
		 */
		DBChannel.prototype.description = "";

		/**
		 * DBChannel discoverable.
		 * @member {string} discoverable
		 * @memberof channels.DBChannel
		 * @instance
		 */
		DBChannel.prototype.discoverable = "";

		/**
		 * DBChannel logo.
		 * @member {string} logo
		 * @memberof channels.DBChannel
		 * @instance
		 */
		DBChannel.prototype.logo = "";

		/**
		 * DBChannel isPlatformChannel.
		 * @member {boolean} isPlatformChannel
		 * @memberof channels.DBChannel
		 * @instance
		 */
		DBChannel.prototype.isPlatformChannel = false;

		/**
		 * DBChannel participants.
		 * @member {Array.<string>} participants
		 * @memberof channels.DBChannel
		 * @instance
		 */
		DBChannel.prototype.participants = $util.emptyArray;

		/**
		 * DBChannel requestSent.
		 * @member {boolean} requestSent
		 * @memberof channels.DBChannel
		 * @instance
		 */
		DBChannel.prototype.requestSent = false;

		/**
		 * DBChannel isFavourite.
		 * @member {boolean} isFavourite
		 * @memberof channels.DBChannel
		 * @instance
		 */
		DBChannel.prototype.isFavourite = false;

		/**
		 * Creates a new DBChannel instance using the specified properties.
		 * @function create
		 * @memberof channels.DBChannel
		 * @static
		 * @param {channels.IDBChannel=} [properties] Properties to set
		 * @returns {channels.DBChannel} DBChannel instance
		 */
		DBChannel.create = function create(properties) {
			return new DBChannel(properties);
		};

		/**
		 * Encodes the specified DBChannel message. Does not implicitly {@link channels.DBChannel.verify|verify} messages.
		 * @function encode
		 * @memberof channels.DBChannel
		 * @static
		 * @param {channels.IDBChannel} message DBChannel message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		DBChannel.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.channelId !== null && message.hasOwnProperty("channelId"))
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.channelId);
			if (message.channelType !== null && message.hasOwnProperty("channelType"))
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.channelType);
			if (message.createdOn !== null && message.hasOwnProperty("createdOn"))
				writer.uint32(/* id 3, wireType 1 =*/ 25).double(message.createdOn);
			if (message.channelName !== null && message.hasOwnProperty("channelName"))
				writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.channelName);
			if (message.userDomain !== null && message.hasOwnProperty("userDomain"))
				writer.uint32(/* id 5, wireType 2 =*/ 42).string(message.userDomain);
			if (
				message.channelOwner !== null &&
				message.hasOwnProperty("channelOwner")
			)
				$root.channels.ChannelOwner.encode(
					message.channelOwner,
					writer.uint32(/* id 6, wireType 2 =*/ 50).fork()
				).ldelim();
			if (message.description !== null && message.hasOwnProperty("description"))
				writer.uint32(/* id 7, wireType 2 =*/ 58).string(message.description);
			if (
				message.discoverable !== null &&
				message.hasOwnProperty("discoverable")
			)
				writer.uint32(/* id 8, wireType 2 =*/ 66).string(message.discoverable);
			if (message.logo !== null && message.hasOwnProperty("logo"))
				writer.uint32(/* id 9, wireType 2 =*/ 74).string(message.logo);
			if (
				message.isPlatformChannel !== null &&
				message.hasOwnProperty("isPlatformChannel")
			)
				writer
					.uint32(/* id 10, wireType 0 =*/ 80)
					.bool(message.isPlatformChannel);
			if (message.participants !== null && message.participants.length)
				for (var i = 0; i < message.participants.length; ++i)
					writer
						.uint32(/* id 11, wireType 2 =*/ 90)
						.string(message.participants[i]);
			if (message.requestSent !== null && message.hasOwnProperty("requestSent"))
				writer.uint32(/* id 12, wireType 0 =*/ 96).bool(message.requestSent);
			if (message.isFavourite !== null && message.hasOwnProperty("isFavourite"))
				writer.uint32(/* id 13, wireType 0 =*/ 104).bool(message.isFavourite);
			return writer;
		};

		/**
		 * Encodes the specified DBChannel message, length delimited. Does not implicitly {@link channels.DBChannel.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof channels.DBChannel
		 * @static
		 * @param {channels.IDBChannel} message DBChannel message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		DBChannel.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a DBChannel message from the specified reader or buffer.
		 * @function decode
		 * @memberof channels.DBChannel
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {channels.DBChannel} DBChannel
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		DBChannel.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.channels.DBChannel();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.channelId = reader.string();
						break;
					case 2:
						message.channelType = reader.string();
						break;
					case 3:
						message.createdOn = reader.double();
						break;
					case 4:
						message.channelName = reader.string();
						break;
					case 5:
						message.userDomain = reader.string();
						break;
					case 6:
						message.channelOwner = $root.channels.ChannelOwner.decode(
							reader,
							reader.uint32()
						);
						break;
					case 7:
						message.description = reader.string();
						break;
					case 8:
						message.discoverable = reader.string();
						break;
					case 9:
						message.logo = reader.string();
						break;
					case 10:
						message.isPlatformChannel = reader.bool();
						break;
					case 11:
						if (!(message.participants && message.participants.length))
							message.participants = [];
						message.participants.push(reader.string());
						break;
					case 12:
						message.requestSent = reader.bool();
						break;
					case 13:
						message.isFavourite = reader.bool();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a DBChannel message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof channels.DBChannel
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {channels.DBChannel} DBChannel
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		DBChannel.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a DBChannel message.
		 * @function verify
		 * @memberof channels.DBChannel
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		DBChannel.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.channelId !== null && message.hasOwnProperty("channelId"))
				if (!$util.isString(message.channelId))
					return "channelId: string expected";
			if (message.channelType !== null && message.hasOwnProperty("channelType"))
				if (!$util.isString(message.channelType))
					return "channelType: string expected";
			if (message.createdOn !== null && message.hasOwnProperty("createdOn"))
				if (typeof message.createdOn !== "number")
					return "createdOn: number expected";
			if (message.channelName !== null && message.hasOwnProperty("channelName"))
				if (!$util.isString(message.channelName))
					return "channelName: string expected";
			if (message.userDomain !== null && message.hasOwnProperty("userDomain"))
				if (!$util.isString(message.userDomain))
					return "userDomain: string expected";
			if (
				message.channelOwner !== null &&
				message.hasOwnProperty("channelOwner")
			) {
				var error = $root.channels.ChannelOwner.verify(message.channelOwner);
				if (error) return "channelOwner." + error;
			}
			if (message.description !== null && message.hasOwnProperty("description"))
				if (!$util.isString(message.description))
					return "description: string expected";
			if (
				message.discoverable !== null &&
				message.hasOwnProperty("discoverable")
			)
				if (!$util.isString(message.discoverable))
					return "discoverable: string expected";
			if (message.logo !== null && message.hasOwnProperty("logo"))
				if (!$util.isString(message.logo)) return "logo: string expected";
			if (
				message.isPlatformChannel !== null &&
				message.hasOwnProperty("isPlatformChannel")
			)
				if (typeof message.isPlatformChannel !== "boolean")
					return "isPlatformChannel: boolean expected";
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
			if (message.requestSent !== null && message.hasOwnProperty("requestSent"))
				if (typeof message.requestSent !== "boolean")
					return "requestSent: boolean expected";
			if (message.isFavourite !== null && message.hasOwnProperty("isFavourite"))
				if (typeof message.isFavourite !== "boolean")
					return "isFavourite: boolean expected";
			return null;
		};

		/**
		 * Creates a DBChannel message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof channels.DBChannel
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {channels.DBChannel} DBChannel
		 */
		DBChannel.fromObject = function fromObject(object) {
			if (object instanceof $root.channels.DBChannel) return object;
			var message = new $root.channels.DBChannel();
			if (object.channelId !== null)
				message.channelId = String(object.channelId);
			if (object.channelType !== null)
				message.channelType = String(object.channelType);
			if (object.createdOn !== null)
				message.createdOn = Number(object.createdOn);
			if (object.channelName !== null)
				message.channelName = String(object.channelName);
			if (object.userDomain !== null)
				message.userDomain = String(object.userDomain);
			if (object.channelOwner !== null) {
				if (typeof object.channelOwner !== "object")
					throw TypeError(".channels.DBChannel.channelOwner: object expected");
				message.channelOwner = $root.channels.ChannelOwner.fromObject(
					object.channelOwner
				);
			}
			if (object.description !== null)
				message.description = String(object.description);
			if (object.discoverable !== null)
				message.discoverable = String(object.discoverable);
			if (object.logo !== null) message.logo = String(object.logo);
			if (object.isPlatformChannel !== null)
				message.isPlatformChannel = Boolean(object.isPlatformChannel);
			if (object.participants) {
				if (!Array.isArray(object.participants))
					throw TypeError(".channels.DBChannel.participants: array expected");
				message.participants = [];
				for (var i = 0; i < object.participants.length; ++i)
					message.participants[i] = String(object.participants[i]);
			}
			if (object.requestSent !== null)
				message.requestSent = Boolean(object.requestSent);
			if (object.isFavourite !== null)
				message.isFavourite = Boolean(object.isFavourite);
			return message;
		};

		/**
		 * Creates a plain object from a DBChannel message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof channels.DBChannel
		 * @static
		 * @param {channels.DBChannel} message DBChannel
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		DBChannel.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.arrays || options.defaults) object.participants = [];
			if (options.defaults) {
				object.channelId = "";
				object.channelType = "";
				object.createdOn = 0;
				object.channelName = "";
				object.userDomain = "";
				object.channelOwner = null;
				object.description = "";
				object.discoverable = "";
				object.logo = "";
				object.isPlatformChannel = false;
				object.requestSent = false;
				object.isFavourite = false;
			}
			if (message.channelId !== null && message.hasOwnProperty("channelId"))
				object.channelId = message.channelId;
			if (message.channelType !== null && message.hasOwnProperty("channelType"))
				object.channelType = message.channelType;
			if (message.createdOn !== null && message.hasOwnProperty("createdOn"))
				object.createdOn =
					options.json && !isFinite(message.createdOn)
						? String(message.createdOn)
						: message.createdOn;
			if (message.channelName !== null && message.hasOwnProperty("channelName"))
				object.channelName = message.channelName;
			if (message.userDomain !== null && message.hasOwnProperty("userDomain"))
				object.userDomain = message.userDomain;
			if (
				message.channelOwner !== null &&
				message.hasOwnProperty("channelOwner")
			)
				object.channelOwner = $root.channels.ChannelOwner.toObject(
					message.channelOwner,
					options
				);
			if (message.description !== null && message.hasOwnProperty("description"))
				object.description = message.description;
			if (
				message.discoverable !== null &&
				message.hasOwnProperty("discoverable")
			)
				object.discoverable = message.discoverable;
			if (message.logo !== null && message.hasOwnProperty("logo"))
				object.logo = message.logo;
			if (
				message.isPlatformChannel !== null &&
				message.hasOwnProperty("isPlatformChannel")
			)
				object.isPlatformChannel = message.isPlatformChannel;
			if (message.participants && message.participants.length) {
				object.participants = [];
				for (var j = 0; j < message.participants.length; ++j)
					object.participants[j] = message.participants[j];
			}
			if (message.requestSent !== null && message.hasOwnProperty("requestSent"))
				object.requestSent = message.requestSent;
			if (message.isFavourite !== null && message.hasOwnProperty("isFavourite"))
				object.isFavourite = message.isFavourite;
			return object;
		};

		/**
		 * Converts this DBChannel to JSON.
		 * @function toJSON
		 * @memberof channels.DBChannel
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		DBChannel.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return DBChannel;
	})();

	channels.ChannelOwner = (function () {
		/**
		 * Properties of a ChannelOwner.
		 * @memberof channels
		 * @interface IChannelOwner
		 * @property {string|null} [emailAddress] ChannelOwner emailAddress
		 * @property {string|null} [userName] ChannelOwner userName
		 * @property {string|null} [userId] ChannelOwner userId
		 */

		/**
		 * Constructs a new ChannelOwner.
		 * @memberof channels
		 * @classdesc Represents a ChannelOwner.
		 * @implements IChannelOwner
		 * @constructor
		 * @param {channels.IChannelOwner=} [properties] Properties to set
		 */
		function ChannelOwner(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * ChannelOwner emailAddress.
		 * @member {string} emailAddress
		 * @memberof channels.ChannelOwner
		 * @instance
		 */
		ChannelOwner.prototype.emailAddress = "";

		/**
		 * ChannelOwner userName.
		 * @member {string} userName
		 * @memberof channels.ChannelOwner
		 * @instance
		 */
		ChannelOwner.prototype.userName = "";

		/**
		 * ChannelOwner userId.
		 * @member {string} userId
		 * @memberof channels.ChannelOwner
		 * @instance
		 */
		ChannelOwner.prototype.userId = "";

		/**
		 * Creates a new ChannelOwner instance using the specified properties.
		 * @function create
		 * @memberof channels.ChannelOwner
		 * @static
		 * @param {channels.IChannelOwner=} [properties] Properties to set
		 * @returns {channels.ChannelOwner} ChannelOwner instance
		 */
		ChannelOwner.create = function create(properties) {
			return new ChannelOwner(properties);
		};

		/**
		 * Encodes the specified ChannelOwner message. Does not implicitly {@link channels.ChannelOwner.verify|verify} messages.
		 * @function encode
		 * @memberof channels.ChannelOwner
		 * @static
		 * @param {channels.IChannelOwner} message ChannelOwner message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		ChannelOwner.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.emailAddress !== null &&
				message.hasOwnProperty("emailAddress")
			)
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.emailAddress);
			if (message.userName !== null && message.hasOwnProperty("userName"))
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.userName);
			if (message.userId !== null && message.hasOwnProperty("userId"))
				writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.userId);
			return writer;
		};

		/**
		 * Encodes the specified ChannelOwner message, length delimited. Does not implicitly {@link channels.ChannelOwner.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof channels.ChannelOwner
		 * @static
		 * @param {channels.IChannelOwner} message ChannelOwner message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		ChannelOwner.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a ChannelOwner message from the specified reader or buffer.
		 * @function decode
		 * @memberof channels.ChannelOwner
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {channels.ChannelOwner} ChannelOwner
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		ChannelOwner.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.channels.ChannelOwner();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.emailAddress = reader.string();
						break;
					case 2:
						message.userName = reader.string();
						break;
					case 3:
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
		 * Decodes a ChannelOwner message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof channels.ChannelOwner
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {channels.ChannelOwner} ChannelOwner
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		ChannelOwner.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a ChannelOwner message.
		 * @function verify
		 * @memberof channels.ChannelOwner
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		ChannelOwner.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (
				message.emailAddress !== null &&
				message.hasOwnProperty("emailAddress")
			)
				if (!$util.isString(message.emailAddress))
					return "emailAddress: string expected";
			if (message.userName !== null && message.hasOwnProperty("userName"))
				if (!$util.isString(message.userName))
					return "userName: string expected";
			if (message.userId !== null && message.hasOwnProperty("userId"))
				if (!$util.isString(message.userId)) return "userId: string expected";
			return null;
		};

		/**
		 * Creates a ChannelOwner message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof channels.ChannelOwner
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {channels.ChannelOwner} ChannelOwner
		 */
		ChannelOwner.fromObject = function fromObject(object) {
			if (object instanceof $root.channels.ChannelOwner) return object;
			var message = new $root.channels.ChannelOwner();
			if (object.emailAddress !== null)
				message.emailAddress = String(object.emailAddress);
			if (object.userName !== null) message.userName = String(object.userName);
			if (object.userId !== null) message.userId = String(object.userId);
			return message;
		};

		/**
		 * Creates a plain object from a ChannelOwner message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof channels.ChannelOwner
		 * @static
		 * @param {channels.ChannelOwner} message ChannelOwner
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		ChannelOwner.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.emailAddress = "";
				object.userName = "";
				object.userId = "";
			}
			if (
				message.emailAddress !== null &&
				message.hasOwnProperty("emailAddress")
			)
				object.emailAddress = message.emailAddress;
			if (message.userName !== null && message.hasOwnProperty("userName"))
				object.userName = message.userName;
			if (message.userId !== null && message.hasOwnProperty("userId"))
				object.userId = message.userId;
			return object;
		};

		/**
		 * Converts this ChannelOwner to JSON.
		 * @function toJSON
		 * @memberof channels.ChannelOwner
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		ChannelOwner.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return ChannelOwner;
	})();

	channels.BooleanResponse = (function () {
		/**
		 * Properties of a BooleanResponse.
		 * @memberof channels
		 * @interface IBooleanResponse
		 * @property {number|null} [error] BooleanResponse error
		 * @property {Array.<boolean>|null} [content] BooleanResponse content
		 * @property {string|null} [errorMessage] BooleanResponse errorMessage
		 */

		/**
		 * Constructs a new BooleanResponse.
		 * @memberof channels
		 * @classdesc Represents a BooleanResponse.
		 * @implements IBooleanResponse
		 * @constructor
		 * @param {channels.IBooleanResponse=} [properties] Properties to set
		 */
		function BooleanResponse(properties) {
			this.content = [];
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * BooleanResponse error.
		 * @member {number} error
		 * @memberof channels.BooleanResponse
		 * @instance
		 */
		BooleanResponse.prototype.error = 0;

		/**
		 * BooleanResponse content.
		 * @member {Array.<boolean>} content
		 * @memberof channels.BooleanResponse
		 * @instance
		 */
		BooleanResponse.prototype.content = $util.emptyArray;

		/**
		 * BooleanResponse errorMessage.
		 * @member {string} errorMessage
		 * @memberof channels.BooleanResponse
		 * @instance
		 */
		BooleanResponse.prototype.errorMessage = "";

		/**
		 * Creates a new BooleanResponse instance using the specified properties.
		 * @function create
		 * @memberof channels.BooleanResponse
		 * @static
		 * @param {channels.IBooleanResponse=} [properties] Properties to set
		 * @returns {channels.BooleanResponse} BooleanResponse instance
		 */
		BooleanResponse.create = function create(properties) {
			return new BooleanResponse(properties);
		};

		/**
		 * Encodes the specified BooleanResponse message. Does not implicitly {@link channels.BooleanResponse.verify|verify} messages.
		 * @function encode
		 * @memberof channels.BooleanResponse
		 * @static
		 * @param {channels.IBooleanResponse} message BooleanResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		BooleanResponse.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.error !== null && message.hasOwnProperty("error"))
				writer.uint32(/* id 1, wireType 0 =*/ 8).int32(message.error);
			if (message.content !== null && message.content.length) {
				writer.uint32(/* id 2, wireType 2 =*/ 18).fork();
				for (var i = 0; i < message.content.length; ++i)
					writer.bool(message.content[i]);
				writer.ldelim();
			}
			if (
				message.errorMessage !== null &&
				message.hasOwnProperty("errorMessage")
			)
				writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.errorMessage);
			return writer;
		};

		/**
		 * Encodes the specified BooleanResponse message, length delimited. Does not implicitly {@link channels.BooleanResponse.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof channels.BooleanResponse
		 * @static
		 * @param {channels.IBooleanResponse} message BooleanResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		BooleanResponse.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a BooleanResponse message from the specified reader or buffer.
		 * @function decode
		 * @memberof channels.BooleanResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {channels.BooleanResponse} BooleanResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		BooleanResponse.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.channels.BooleanResponse();
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
		 * Decodes a BooleanResponse message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof channels.BooleanResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {channels.BooleanResponse} BooleanResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		BooleanResponse.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a BooleanResponse message.
		 * @function verify
		 * @memberof channels.BooleanResponse
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		BooleanResponse.verify = function verify(message) {
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
			if (
				message.errorMessage !== null &&
				message.hasOwnProperty("errorMessage")
			)
				if (!$util.isString(message.errorMessage))
					return "errorMessage: string expected";
			return null;
		};

		/**
		 * Creates a BooleanResponse message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof channels.BooleanResponse
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {channels.BooleanResponse} BooleanResponse
		 */
		BooleanResponse.fromObject = function fromObject(object) {
			if (object instanceof $root.channels.BooleanResponse) return object;
			var message = new $root.channels.BooleanResponse();
			if (object.error !== null) message.error = object.error | 0;
			if (object.content) {
				if (!Array.isArray(object.content))
					throw TypeError(".channels.BooleanResponse.content: array expected");
				message.content = [];
				for (var i = 0; i < object.content.length; ++i)
					message.content[i] = Boolean(object.content[i]);
			}
			if (object.errorMessage !== null)
				message.errorMessage = String(object.errorMessage);
			return message;
		};

		/**
		 * Creates a plain object from a BooleanResponse message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof channels.BooleanResponse
		 * @static
		 * @param {channels.BooleanResponse} message BooleanResponse
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		BooleanResponse.toObject = function toObject(message, options) {
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
					object.content[j] = message.content[j];
			}
			if (
				message.errorMessage !== null &&
				message.hasOwnProperty("errorMessage")
			)
				object.errorMessage = message.errorMessage;
			return object;
		};

		/**
		 * Converts this BooleanResponse to JSON.
		 * @function toJSON
		 * @memberof channels.BooleanResponse
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		BooleanResponse.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return BooleanResponse;
	})();

	channels.CreateChannelResponse = (function () {
		/**
		 * Properties of a CreateChannelResponse.
		 * @memberof channels
		 * @interface ICreateChannelResponse
		 * @property {number|null} [error] CreateChannelResponse error
		 * @property {Array.<string>|null} [content] CreateChannelResponse content
		 * @property {string|null} [errorMessage] CreateChannelResponse errorMessage
		 */

		/**
		 * Constructs a new CreateChannelResponse.
		 * @memberof channels
		 * @classdesc Represents a CreateChannelResponse.
		 * @implements ICreateChannelResponse
		 * @constructor
		 * @param {channels.ICreateChannelResponse=} [properties] Properties to set
		 */
		function CreateChannelResponse(properties) {
			this.content = [];
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * CreateChannelResponse error.
		 * @member {number} error
		 * @memberof channels.CreateChannelResponse
		 * @instance
		 */
		CreateChannelResponse.prototype.error = 0;

		/**
		 * CreateChannelResponse content.
		 * @member {Array.<string>} content
		 * @memberof channels.CreateChannelResponse
		 * @instance
		 */
		CreateChannelResponse.prototype.content = $util.emptyArray;

		/**
		 * CreateChannelResponse errorMessage.
		 * @member {string} errorMessage
		 * @memberof channels.CreateChannelResponse
		 * @instance
		 */
		CreateChannelResponse.prototype.errorMessage = "";

		/**
		 * Creates a new CreateChannelResponse instance using the specified properties.
		 * @function create
		 * @memberof channels.CreateChannelResponse
		 * @static
		 * @param {channels.ICreateChannelResponse=} [properties] Properties to set
		 * @returns {channels.CreateChannelResponse} CreateChannelResponse instance
		 */
		CreateChannelResponse.create = function create(properties) {
			return new CreateChannelResponse(properties);
		};

		/**
		 * Encodes the specified CreateChannelResponse message. Does not implicitly {@link channels.CreateChannelResponse.verify|verify} messages.
		 * @function encode
		 * @memberof channels.CreateChannelResponse
		 * @static
		 * @param {channels.ICreateChannelResponse} message CreateChannelResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		CreateChannelResponse.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.error !== null && message.hasOwnProperty("error"))
				writer.uint32(/* id 1, wireType 0 =*/ 8).int32(message.error);
			if (message.content !== null && message.content.length)
				for (var i = 0; i < message.content.length; ++i)
					writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.content[i]);
			if (
				message.errorMessage !== null &&
				message.hasOwnProperty("errorMessage")
			)
				writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.errorMessage);
			return writer;
		};

		/**
		 * Encodes the specified CreateChannelResponse message, length delimited. Does not implicitly {@link channels.CreateChannelResponse.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof channels.CreateChannelResponse
		 * @static
		 * @param {channels.ICreateChannelResponse} message CreateChannelResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		CreateChannelResponse.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a CreateChannelResponse message from the specified reader or buffer.
		 * @function decode
		 * @memberof channels.CreateChannelResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {channels.CreateChannelResponse} CreateChannelResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		CreateChannelResponse.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.channels.CreateChannelResponse();
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
		 * Decodes a CreateChannelResponse message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof channels.CreateChannelResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {channels.CreateChannelResponse} CreateChannelResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		CreateChannelResponse.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a CreateChannelResponse message.
		 * @function verify
		 * @memberof channels.CreateChannelResponse
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		CreateChannelResponse.verify = function verify(message) {
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
			if (
				message.errorMessage !== null &&
				message.hasOwnProperty("errorMessage")
			)
				if (!$util.isString(message.errorMessage))
					return "errorMessage: string expected";
			return null;
		};

		/**
		 * Creates a CreateChannelResponse message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof channels.CreateChannelResponse
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {channels.CreateChannelResponse} CreateChannelResponse
		 */
		CreateChannelResponse.fromObject = function fromObject(object) {
			if (object instanceof $root.channels.CreateChannelResponse) return object;
			var message = new $root.channels.CreateChannelResponse();
			if (object.error !== null) message.error = object.error | 0;
			if (object.content) {
				if (!Array.isArray(object.content))
					throw TypeError(
						".channels.CreateChannelResponse.content: array expected"
					);
				message.content = [];
				for (var i = 0; i < object.content.length; ++i)
					message.content[i] = String(object.content[i]);
			}
			if (object.errorMessage !== null)
				message.errorMessage = String(object.errorMessage);
			return message;
		};

		/**
		 * Creates a plain object from a CreateChannelResponse message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof channels.CreateChannelResponse
		 * @static
		 * @param {channels.CreateChannelResponse} message CreateChannelResponse
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		CreateChannelResponse.toObject = function toObject(message, options) {
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
					object.content[j] = message.content[j];
			}
			if (
				message.errorMessage !== null &&
				message.hasOwnProperty("errorMessage")
			)
				object.errorMessage = message.errorMessage;
			return object;
		};

		/**
		 * Converts this CreateChannelResponse to JSON.
		 * @function toJSON
		 * @memberof channels.CreateChannelResponse
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		CreateChannelResponse.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return CreateChannelResponse;
	})();

	channels.ChannelDomainInput = (function () {
		/**
		 * Properties of a ChannelDomainInput.
		 * @memberof channels
		 * @interface IChannelDomainInput
		 * @property {string|null} [channelName] ChannelDomainInput channelName
		 * @property {string|null} [userDomain] ChannelDomainInput userDomain
		 */

		/**
		 * Constructs a new ChannelDomainInput.
		 * @memberof channels
		 * @classdesc Represents a ChannelDomainInput.
		 * @implements IChannelDomainInput
		 * @constructor
		 * @param {channels.IChannelDomainInput=} [properties] Properties to set
		 */
		function ChannelDomainInput(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * ChannelDomainInput channelName.
		 * @member {string} channelName
		 * @memberof channels.ChannelDomainInput
		 * @instance
		 */
		ChannelDomainInput.prototype.channelName = "";

		/**
		 * ChannelDomainInput userDomain.
		 * @member {string} userDomain
		 * @memberof channels.ChannelDomainInput
		 * @instance
		 */
		ChannelDomainInput.prototype.userDomain = "";

		/**
		 * Creates a new ChannelDomainInput instance using the specified properties.
		 * @function create
		 * @memberof channels.ChannelDomainInput
		 * @static
		 * @param {channels.IChannelDomainInput=} [properties] Properties to set
		 * @returns {channels.ChannelDomainInput} ChannelDomainInput instance
		 */
		ChannelDomainInput.create = function create(properties) {
			return new ChannelDomainInput(properties);
		};

		/**
		 * Encodes the specified ChannelDomainInput message. Does not implicitly {@link channels.ChannelDomainInput.verify|verify} messages.
		 * @function encode
		 * @memberof channels.ChannelDomainInput
		 * @static
		 * @param {channels.IChannelDomainInput} message ChannelDomainInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		ChannelDomainInput.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.channelName !== null && message.hasOwnProperty("channelName"))
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.channelName);
			if (message.userDomain !== null && message.hasOwnProperty("userDomain"))
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.userDomain);
			return writer;
		};

		/**
		 * Encodes the specified ChannelDomainInput message, length delimited. Does not implicitly {@link channels.ChannelDomainInput.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof channels.ChannelDomainInput
		 * @static
		 * @param {channels.IChannelDomainInput} message ChannelDomainInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		ChannelDomainInput.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a ChannelDomainInput message from the specified reader or buffer.
		 * @function decode
		 * @memberof channels.ChannelDomainInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {channels.ChannelDomainInput} ChannelDomainInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		ChannelDomainInput.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.channels.ChannelDomainInput();
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
		 * Decodes a ChannelDomainInput message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof channels.ChannelDomainInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {channels.ChannelDomainInput} ChannelDomainInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		ChannelDomainInput.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a ChannelDomainInput message.
		 * @function verify
		 * @memberof channels.ChannelDomainInput
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		ChannelDomainInput.verify = function verify(message) {
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
		 * Creates a ChannelDomainInput message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof channels.ChannelDomainInput
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {channels.ChannelDomainInput} ChannelDomainInput
		 */
		ChannelDomainInput.fromObject = function fromObject(object) {
			if (object instanceof $root.channels.ChannelDomainInput) return object;
			var message = new $root.channels.ChannelDomainInput();
			if (object.channelName !== null)
				message.channelName = String(object.channelName);
			if (object.userDomain !== null)
				message.userDomain = String(object.userDomain);
			return message;
		};

		/**
		 * Creates a plain object from a ChannelDomainInput message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof channels.ChannelDomainInput
		 * @static
		 * @param {channels.ChannelDomainInput} message ChannelDomainInput
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		ChannelDomainInput.toObject = function toObject(message, options) {
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
		 * Converts this ChannelDomainInput to JSON.
		 * @function toJSON
		 * @memberof channels.ChannelDomainInput
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		ChannelDomainInput.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return ChannelDomainInput;
	})();

	channels.ParticipantsListResponse = (function () {
		/**
		 * Properties of a ParticipantsListResponse.
		 * @memberof channels
		 * @interface IParticipantsListResponse
		 * @property {number|null} [error] ParticipantsListResponse error
		 * @property {Array.<channels.IParticpantUser>|null} [content] ParticipantsListResponse content
		 */

		/**
		 * Constructs a new ParticipantsListResponse.
		 * @memberof channels
		 * @classdesc Represents a ParticipantsListResponse.
		 * @implements IParticipantsListResponse
		 * @constructor
		 * @param {channels.IParticipantsListResponse=} [properties] Properties to set
		 */
		function ParticipantsListResponse(properties) {
			this.content = [];
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * ParticipantsListResponse error.
		 * @member {number} error
		 * @memberof channels.ParticipantsListResponse
		 * @instance
		 */
		ParticipantsListResponse.prototype.error = 0;

		/**
		 * ParticipantsListResponse content.
		 * @member {Array.<channels.IParticpantUser>} content
		 * @memberof channels.ParticipantsListResponse
		 * @instance
		 */
		ParticipantsListResponse.prototype.content = $util.emptyArray;

		/**
		 * Creates a new ParticipantsListResponse instance using the specified properties.
		 * @function create
		 * @memberof channels.ParticipantsListResponse
		 * @static
		 * @param {channels.IParticipantsListResponse=} [properties] Properties to set
		 * @returns {channels.ParticipantsListResponse} ParticipantsListResponse instance
		 */
		ParticipantsListResponse.create = function create(properties) {
			return new ParticipantsListResponse(properties);
		};

		/**
		 * Encodes the specified ParticipantsListResponse message. Does not implicitly {@link channels.ParticipantsListResponse.verify|verify} messages.
		 * @function encode
		 * @memberof channels.ParticipantsListResponse
		 * @static
		 * @param {channels.IParticipantsListResponse} message ParticipantsListResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		ParticipantsListResponse.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.error !== null && message.hasOwnProperty("error"))
				writer.uint32(/* id 1, wireType 0 =*/ 8).int32(message.error);
			if (message.content !== null && message.content.length)
				for (var i = 0; i < message.content.length; ++i)
					$root.channels.ParticpantUser.encode(
						message.content[i],
						writer.uint32(/* id 2, wireType 2 =*/ 18).fork()
					).ldelim();
			return writer;
		};

		/**
		 * Encodes the specified ParticipantsListResponse message, length delimited. Does not implicitly {@link channels.ParticipantsListResponse.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof channels.ParticipantsListResponse
		 * @static
		 * @param {channels.IParticipantsListResponse} message ParticipantsListResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		ParticipantsListResponse.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a ParticipantsListResponse message from the specified reader or buffer.
		 * @function decode
		 * @memberof channels.ParticipantsListResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {channels.ParticipantsListResponse} ParticipantsListResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		ParticipantsListResponse.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.channels.ParticipantsListResponse();
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
							$root.channels.ParticpantUser.decode(reader, reader.uint32())
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
		 * Decodes a ParticipantsListResponse message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof channels.ParticipantsListResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {channels.ParticipantsListResponse} ParticipantsListResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		ParticipantsListResponse.decodeDelimited = function decodeDelimited(
			reader
		) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a ParticipantsListResponse message.
		 * @function verify
		 * @memberof channels.ParticipantsListResponse
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		ParticipantsListResponse.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.error !== null && message.hasOwnProperty("error"))
				if (!$util.isInteger(message.error)) return "error: integer expected";
			if (message.content !== null && message.hasOwnProperty("content")) {
				if (!Array.isArray(message.content)) return "content: array expected";
				for (var i = 0; i < message.content.length; ++i) {
					var error = $root.channels.ParticpantUser.verify(message.content[i]);
					if (error) return "content." + error;
				}
			}
			return null;
		};

		/**
		 * Creates a ParticipantsListResponse message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof channels.ParticipantsListResponse
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {channels.ParticipantsListResponse} ParticipantsListResponse
		 */
		ParticipantsListResponse.fromObject = function fromObject(object) {
			if (object instanceof $root.channels.ParticipantsListResponse)
				return object;
			var message = new $root.channels.ParticipantsListResponse();
			if (object.error !== null) message.error = object.error | 0;
			if (object.content) {
				if (!Array.isArray(object.content))
					throw TypeError(
						".channels.ParticipantsListResponse.content: array expected"
					);
				message.content = [];
				for (var i = 0; i < object.content.length; ++i) {
					if (typeof object.content[i] !== "object")
						throw TypeError(
							".channels.ParticipantsListResponse.content: object expected"
						);
					message.content[i] = $root.channels.ParticpantUser.fromObject(
						object.content[i]
					);
				}
			}
			return message;
		};

		/**
		 * Creates a plain object from a ParticipantsListResponse message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof channels.ParticipantsListResponse
		 * @static
		 * @param {channels.ParticipantsListResponse} message ParticipantsListResponse
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		ParticipantsListResponse.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.arrays || options.defaults) object.content = [];
			if (options.defaults) object.error = 0;
			if (message.error !== null && message.hasOwnProperty("error"))
				object.error = message.error;
			if (message.content && message.content.length) {
				object.content = [];
				for (var j = 0; j < message.content.length; ++j)
					object.content[j] = $root.channels.ParticpantUser.toObject(
						message.content[j],
						options
					);
			}
			return object;
		};

		/**
		 * Converts this ParticipantsListResponse to JSON.
		 * @function toJSON
		 * @memberof channels.ParticipantsListResponse
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		ParticipantsListResponse.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return ParticipantsListResponse;
	})();

	channels.ParticpantUser = (function () {
		/**
		 * Properties of a ParticpantUser.
		 * @memberof channels
		 * @interface IParticpantUser
		 * @property {string|null} [userName] ParticpantUser userName
		 * @property {string|null} [userId] ParticpantUser userId
		 * @property {string|null} [role] ParticpantUser role
		 */

		/**
		 * Constructs a new ParticpantUser.
		 * @memberof channels
		 * @classdesc Represents a ParticpantUser.
		 * @implements IParticpantUser
		 * @constructor
		 * @param {channels.IParticpantUser=} [properties] Properties to set
		 */
		function ParticpantUser(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * ParticpantUser userName.
		 * @member {string} userName
		 * @memberof channels.ParticpantUser
		 * @instance
		 */
		ParticpantUser.prototype.userName = "";

		/**
		 * ParticpantUser userId.
		 * @member {string} userId
		 * @memberof channels.ParticpantUser
		 * @instance
		 */
		ParticpantUser.prototype.userId = "";

		/**
		 * ParticpantUser role.
		 * @member {string} role
		 * @memberof channels.ParticpantUser
		 * @instance
		 */
		ParticpantUser.prototype.role = "";

		/**
		 * Creates a new ParticpantUser instance using the specified properties.
		 * @function create
		 * @memberof channels.ParticpantUser
		 * @static
		 * @param {channels.IParticpantUser=} [properties] Properties to set
		 * @returns {channels.ParticpantUser} ParticpantUser instance
		 */
		ParticpantUser.create = function create(properties) {
			return new ParticpantUser(properties);
		};

		/**
		 * Encodes the specified ParticpantUser message. Does not implicitly {@link channels.ParticpantUser.verify|verify} messages.
		 * @function encode
		 * @memberof channels.ParticpantUser
		 * @static
		 * @param {channels.IParticpantUser} message ParticpantUser message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		ParticpantUser.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.userName !== null && message.hasOwnProperty("userName"))
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.userName);
			if (message.userId !== null && message.hasOwnProperty("userId"))
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.userId);
			if (message.role !== null && message.hasOwnProperty("role"))
				writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.role);
			return writer;
		};

		/**
		 * Encodes the specified ParticpantUser message, length delimited. Does not implicitly {@link channels.ParticpantUser.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof channels.ParticpantUser
		 * @static
		 * @param {channels.IParticpantUser} message ParticpantUser message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		ParticpantUser.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a ParticpantUser message from the specified reader or buffer.
		 * @function decode
		 * @memberof channels.ParticpantUser
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {channels.ParticpantUser} ParticpantUser
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		ParticpantUser.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.channels.ParticpantUser();
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
						message.role = reader.string();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a ParticpantUser message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof channels.ParticpantUser
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {channels.ParticpantUser} ParticpantUser
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		ParticpantUser.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a ParticpantUser message.
		 * @function verify
		 * @memberof channels.ParticpantUser
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		ParticpantUser.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.userName !== null && message.hasOwnProperty("userName"))
				if (!$util.isString(message.userName))
					return "userName: string expected";
			if (message.userId !== null && message.hasOwnProperty("userId"))
				if (!$util.isString(message.userId)) return "userId: string expected";
			if (message.role !== null && message.hasOwnProperty("role"))
				if (!$util.isString(message.role)) return "role: string expected";
			return null;
		};

		/**
		 * Creates a ParticpantUser message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof channels.ParticpantUser
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {channels.ParticpantUser} ParticpantUser
		 */
		ParticpantUser.fromObject = function fromObject(object) {
			if (object instanceof $root.channels.ParticpantUser) return object;
			var message = new $root.channels.ParticpantUser();
			if (object.userName !== null) message.userName = String(object.userName);
			if (object.userId !== null) message.userId = String(object.userId);
			if (object.role !== null) message.role = String(object.role);
			return message;
		};

		/**
		 * Creates a plain object from a ParticpantUser message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof channels.ParticpantUser
		 * @static
		 * @param {channels.ParticpantUser} message ParticpantUser
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		ParticpantUser.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.userName = "";
				object.userId = "";
				object.role = "";
			}
			if (message.userName !== null && message.hasOwnProperty("userName"))
				object.userName = message.userName;
			if (message.userId !== null && message.hasOwnProperty("userId"))
				object.userId = message.userId;
			if (message.role !== null && message.hasOwnProperty("role"))
				object.role = message.role;
			return object;
		};

		/**
		 * Converts this ParticpantUser to JSON.
		 * @function toJSON
		 * @memberof channels.ParticpantUser
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		ParticpantUser.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return ParticpantUser;
	})();

	channels.UpdateUsersInput = (function () {
		/**
		 * Properties of an UpdateUsersInput.
		 * @memberof channels
		 * @interface IUpdateUsersInput
		 * @property {string|null} [channelName] UpdateUsersInput channelName
		 * @property {string|null} [userDomain] UpdateUsersInput userDomain
		 * @property {Array.<string>|null} [userIds] UpdateUsersInput userIds
		 */

		/**
		 * Constructs a new UpdateUsersInput.
		 * @memberof channels
		 * @classdesc Represents an UpdateUsersInput.
		 * @implements IUpdateUsersInput
		 * @constructor
		 * @param {channels.IUpdateUsersInput=} [properties] Properties to set
		 */
		function UpdateUsersInput(properties) {
			this.userIds = [];
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * UpdateUsersInput channelName.
		 * @member {string} channelName
		 * @memberof channels.UpdateUsersInput
		 * @instance
		 */
		UpdateUsersInput.prototype.channelName = "";

		/**
		 * UpdateUsersInput userDomain.
		 * @member {string} userDomain
		 * @memberof channels.UpdateUsersInput
		 * @instance
		 */
		UpdateUsersInput.prototype.userDomain = "";

		/**
		 * UpdateUsersInput userIds.
		 * @member {Array.<string>} userIds
		 * @memberof channels.UpdateUsersInput
		 * @instance
		 */
		UpdateUsersInput.prototype.userIds = $util.emptyArray;

		/**
		 * Creates a new UpdateUsersInput instance using the specified properties.
		 * @function create
		 * @memberof channels.UpdateUsersInput
		 * @static
		 * @param {channels.IUpdateUsersInput=} [properties] Properties to set
		 * @returns {channels.UpdateUsersInput} UpdateUsersInput instance
		 */
		UpdateUsersInput.create = function create(properties) {
			return new UpdateUsersInput(properties);
		};

		/**
		 * Encodes the specified UpdateUsersInput message. Does not implicitly {@link channels.UpdateUsersInput.verify|verify} messages.
		 * @function encode
		 * @memberof channels.UpdateUsersInput
		 * @static
		 * @param {channels.IUpdateUsersInput} message UpdateUsersInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		UpdateUsersInput.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.channelName !== null && message.hasOwnProperty("channelName"))
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.channelName);
			if (message.userDomain !== null && message.hasOwnProperty("userDomain"))
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.userDomain);
			if (message.userIds !== null && message.userIds.length)
				for (var i = 0; i < message.userIds.length; ++i)
					writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.userIds[i]);
			return writer;
		};

		/**
		 * Encodes the specified UpdateUsersInput message, length delimited. Does not implicitly {@link channels.UpdateUsersInput.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof channels.UpdateUsersInput
		 * @static
		 * @param {channels.IUpdateUsersInput} message UpdateUsersInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		UpdateUsersInput.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes an UpdateUsersInput message from the specified reader or buffer.
		 * @function decode
		 * @memberof channels.UpdateUsersInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {channels.UpdateUsersInput} UpdateUsersInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		UpdateUsersInput.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.channels.UpdateUsersInput();
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
						if (!(message.userIds && message.userIds.length))
							message.userIds = [];
						message.userIds.push(reader.string());
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes an UpdateUsersInput message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof channels.UpdateUsersInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {channels.UpdateUsersInput} UpdateUsersInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		UpdateUsersInput.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies an UpdateUsersInput message.
		 * @function verify
		 * @memberof channels.UpdateUsersInput
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		UpdateUsersInput.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.channelName !== null && message.hasOwnProperty("channelName"))
				if (!$util.isString(message.channelName))
					return "channelName: string expected";
			if (message.userDomain !== null && message.hasOwnProperty("userDomain"))
				if (!$util.isString(message.userDomain))
					return "userDomain: string expected";
			if (message.userIds !== null && message.hasOwnProperty("userIds")) {
				if (!Array.isArray(message.userIds)) return "userIds: array expected";
				for (var i = 0; i < message.userIds.length; ++i)
					if (!$util.isString(message.userIds[i]))
						return "userIds: string[] expected";
			}
			return null;
		};

		/**
		 * Creates an UpdateUsersInput message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof channels.UpdateUsersInput
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {channels.UpdateUsersInput} UpdateUsersInput
		 */
		UpdateUsersInput.fromObject = function fromObject(object) {
			if (object instanceof $root.channels.UpdateUsersInput) return object;
			var message = new $root.channels.UpdateUsersInput();
			if (object.channelName !== null)
				message.channelName = String(object.channelName);
			if (object.userDomain !== null)
				message.userDomain = String(object.userDomain);
			if (object.userIds) {
				if (!Array.isArray(object.userIds))
					throw TypeError(".channels.UpdateUsersInput.userIds: array expected");
				message.userIds = [];
				for (var i = 0; i < object.userIds.length; ++i)
					message.userIds[i] = String(object.userIds[i]);
			}
			return message;
		};

		/**
		 * Creates a plain object from an UpdateUsersInput message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof channels.UpdateUsersInput
		 * @static
		 * @param {channels.UpdateUsersInput} message UpdateUsersInput
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		UpdateUsersInput.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.arrays || options.defaults) object.userIds = [];
			if (options.defaults) {
				object.channelName = "";
				object.userDomain = "";
			}
			if (message.channelName !== null && message.hasOwnProperty("channelName"))
				object.channelName = message.channelName;
			if (message.userDomain !== null && message.hasOwnProperty("userDomain"))
				object.userDomain = message.userDomain;
			if (message.userIds && message.userIds.length) {
				object.userIds = [];
				for (var j = 0; j < message.userIds.length; ++j)
					object.userIds[j] = message.userIds[j];
			}
			return object;
		};

		/**
		 * Converts this UpdateUsersInput to JSON.
		 * @function toJSON
		 * @memberof channels.UpdateUsersInput
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		UpdateUsersInput.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return UpdateUsersInput;
	})();

	channels.AuthorizeParticipantInput = (function () {
		/**
		 * Properties of an AuthorizeParticipantInput.
		 * @memberof channels
		 * @interface IAuthorizeParticipantInput
		 * @property {string|null} [channelName] AuthorizeParticipantInput channelName
		 * @property {string|null} [userDomain] AuthorizeParticipantInput userDomain
		 * @property {Array.<string>|null} [accepted] AuthorizeParticipantInput accepted
		 * @property {Array.<string>|null} [ignored] AuthorizeParticipantInput ignored
		 */

		/**
		 * Constructs a new AuthorizeParticipantInput.
		 * @memberof channels
		 * @classdesc Represents an AuthorizeParticipantInput.
		 * @implements IAuthorizeParticipantInput
		 * @constructor
		 * @param {channels.IAuthorizeParticipantInput=} [properties] Properties to set
		 */
		function AuthorizeParticipantInput(properties) {
			this.accepted = [];
			this.ignored = [];
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * AuthorizeParticipantInput channelName.
		 * @member {string} channelName
		 * @memberof channels.AuthorizeParticipantInput
		 * @instance
		 */
		AuthorizeParticipantInput.prototype.channelName = "";

		/**
		 * AuthorizeParticipantInput userDomain.
		 * @member {string} userDomain
		 * @memberof channels.AuthorizeParticipantInput
		 * @instance
		 */
		AuthorizeParticipantInput.prototype.userDomain = "";

		/**
		 * AuthorizeParticipantInput accepted.
		 * @member {Array.<string>} accepted
		 * @memberof channels.AuthorizeParticipantInput
		 * @instance
		 */
		AuthorizeParticipantInput.prototype.accepted = $util.emptyArray;

		/**
		 * AuthorizeParticipantInput ignored.
		 * @member {Array.<string>} ignored
		 * @memberof channels.AuthorizeParticipantInput
		 * @instance
		 */
		AuthorizeParticipantInput.prototype.ignored = $util.emptyArray;

		/**
		 * Creates a new AuthorizeParticipantInput instance using the specified properties.
		 * @function create
		 * @memberof channels.AuthorizeParticipantInput
		 * @static
		 * @param {channels.IAuthorizeParticipantInput=} [properties] Properties to set
		 * @returns {channels.AuthorizeParticipantInput} AuthorizeParticipantInput instance
		 */
		AuthorizeParticipantInput.create = function create(properties) {
			return new AuthorizeParticipantInput(properties);
		};

		/**
		 * Encodes the specified AuthorizeParticipantInput message. Does not implicitly {@link channels.AuthorizeParticipantInput.verify|verify} messages.
		 * @function encode
		 * @memberof channels.AuthorizeParticipantInput
		 * @static
		 * @param {channels.IAuthorizeParticipantInput} message AuthorizeParticipantInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		AuthorizeParticipantInput.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.channelName !== null && message.hasOwnProperty("channelName"))
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.channelName);
			if (message.userDomain !== null && message.hasOwnProperty("userDomain"))
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.userDomain);
			if (message.accepted !== null && message.accepted.length)
				for (var i = 0; i < message.accepted.length; ++i)
					writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.accepted[i]);
			if (message.ignored !== null && message.ignored.length)
				for (var i = 0; i < message.ignored.length; ++i)
					writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.ignored[i]);
			return writer;
		};

		/**
		 * Encodes the specified AuthorizeParticipantInput message, length delimited. Does not implicitly {@link channels.AuthorizeParticipantInput.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof channels.AuthorizeParticipantInput
		 * @static
		 * @param {channels.IAuthorizeParticipantInput} message AuthorizeParticipantInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		AuthorizeParticipantInput.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes an AuthorizeParticipantInput message from the specified reader or buffer.
		 * @function decode
		 * @memberof channels.AuthorizeParticipantInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {channels.AuthorizeParticipantInput} AuthorizeParticipantInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		AuthorizeParticipantInput.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.channels.AuthorizeParticipantInput();
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
						if (!(message.accepted && message.accepted.length))
							message.accepted = [];
						message.accepted.push(reader.string());
						break;
					case 4:
						if (!(message.ignored && message.ignored.length))
							message.ignored = [];
						message.ignored.push(reader.string());
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes an AuthorizeParticipantInput message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof channels.AuthorizeParticipantInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {channels.AuthorizeParticipantInput} AuthorizeParticipantInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		AuthorizeParticipantInput.decodeDelimited = function decodeDelimited(
			reader
		) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies an AuthorizeParticipantInput message.
		 * @function verify
		 * @memberof channels.AuthorizeParticipantInput
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		AuthorizeParticipantInput.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.channelName !== null && message.hasOwnProperty("channelName"))
				if (!$util.isString(message.channelName))
					return "channelName: string expected";
			if (message.userDomain !== null && message.hasOwnProperty("userDomain"))
				if (!$util.isString(message.userDomain))
					return "userDomain: string expected";
			if (message.accepted !== null && message.hasOwnProperty("accepted")) {
				if (!Array.isArray(message.accepted)) return "accepted: array expected";
				for (var i = 0; i < message.accepted.length; ++i)
					if (!$util.isString(message.accepted[i]))
						return "accepted: string[] expected";
			}
			if (message.ignored !== null && message.hasOwnProperty("ignored")) {
				if (!Array.isArray(message.ignored)) return "ignored: array expected";
				for (var i = 0; i < message.ignored.length; ++i)
					if (!$util.isString(message.ignored[i]))
						return "ignored: string[] expected";
			}
			return null;
		};

		/**
		 * Creates an AuthorizeParticipantInput message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof channels.AuthorizeParticipantInput
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {channels.AuthorizeParticipantInput} AuthorizeParticipantInput
		 */
		AuthorizeParticipantInput.fromObject = function fromObject(object) {
			if (object instanceof $root.channels.AuthorizeParticipantInput)
				return object;
			var message = new $root.channels.AuthorizeParticipantInput();
			if (object.channelName !== null)
				message.channelName = String(object.channelName);
			if (object.userDomain !== null)
				message.userDomain = String(object.userDomain);
			if (object.accepted) {
				if (!Array.isArray(object.accepted))
					throw TypeError(
						".channels.AuthorizeParticipantInput.accepted: array expected"
					);
				message.accepted = [];
				for (var i = 0; i < object.accepted.length; ++i)
					message.accepted[i] = String(object.accepted[i]);
			}
			if (object.ignored) {
				if (!Array.isArray(object.ignored))
					throw TypeError(
						".channels.AuthorizeParticipantInput.ignored: array expected"
					);
				message.ignored = [];
				for (var i = 0; i < object.ignored.length; ++i)
					message.ignored[i] = String(object.ignored[i]);
			}
			return message;
		};

		/**
		 * Creates a plain object from an AuthorizeParticipantInput message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof channels.AuthorizeParticipantInput
		 * @static
		 * @param {channels.AuthorizeParticipantInput} message AuthorizeParticipantInput
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		AuthorizeParticipantInput.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.arrays || options.defaults) {
				object.accepted = [];
				object.ignored = [];
			}
			if (options.defaults) {
				object.channelName = "";
				object.userDomain = "";
			}
			if (message.channelName !== null && message.hasOwnProperty("channelName"))
				object.channelName = message.channelName;
			if (message.userDomain !== null && message.hasOwnProperty("userDomain"))
				object.userDomain = message.userDomain;
			if (message.accepted && message.accepted.length) {
				object.accepted = [];
				for (var j = 0; j < message.accepted.length; ++j)
					object.accepted[j] = message.accepted[j];
			}
			if (message.ignored && message.ignored.length) {
				object.ignored = [];
				for (var j = 0; j < message.ignored.length; ++j)
					object.ignored[j] = message.ignored[j];
			}
			return object;
		};

		/**
		 * Converts this AuthorizeParticipantInput to JSON.
		 * @function toJSON
		 * @memberof channels.AuthorizeParticipantInput
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		AuthorizeParticipantInput.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return AuthorizeParticipantInput;
	})();

	channels.ChangeOwnerInput = (function () {
		/**
		 * Properties of a ChangeOwnerInput.
		 * @memberof channels
		 * @interface IChangeOwnerInput
		 * @property {string|null} [channelName] ChangeOwnerInput channelName
		 * @property {string|null} [userDomain] ChangeOwnerInput userDomain
		 * @property {string|null} [newOwnerId] ChangeOwnerInput newOwnerId
		 */

		/**
		 * Constructs a new ChangeOwnerInput.
		 * @memberof channels
		 * @classdesc Represents a ChangeOwnerInput.
		 * @implements IChangeOwnerInput
		 * @constructor
		 * @param {channels.IChangeOwnerInput=} [properties] Properties to set
		 */
		function ChangeOwnerInput(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * ChangeOwnerInput channelName.
		 * @member {string} channelName
		 * @memberof channels.ChangeOwnerInput
		 * @instance
		 */
		ChangeOwnerInput.prototype.channelName = "";

		/**
		 * ChangeOwnerInput userDomain.
		 * @member {string} userDomain
		 * @memberof channels.ChangeOwnerInput
		 * @instance
		 */
		ChangeOwnerInput.prototype.userDomain = "";

		/**
		 * ChangeOwnerInput newOwnerId.
		 * @member {string} newOwnerId
		 * @memberof channels.ChangeOwnerInput
		 * @instance
		 */
		ChangeOwnerInput.prototype.newOwnerId = "";

		/**
		 * Creates a new ChangeOwnerInput instance using the specified properties.
		 * @function create
		 * @memberof channels.ChangeOwnerInput
		 * @static
		 * @param {channels.IChangeOwnerInput=} [properties] Properties to set
		 * @returns {channels.ChangeOwnerInput} ChangeOwnerInput instance
		 */
		ChangeOwnerInput.create = function create(properties) {
			return new ChangeOwnerInput(properties);
		};

		/**
		 * Encodes the specified ChangeOwnerInput message. Does not implicitly {@link channels.ChangeOwnerInput.verify|verify} messages.
		 * @function encode
		 * @memberof channels.ChangeOwnerInput
		 * @static
		 * @param {channels.IChangeOwnerInput} message ChangeOwnerInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		ChangeOwnerInput.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.channelName !== null && message.hasOwnProperty("channelName"))
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.channelName);
			if (message.userDomain !== null && message.hasOwnProperty("userDomain"))
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.userDomain);
			if (message.newOwnerId !== null && message.hasOwnProperty("newOwnerId"))
				writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.newOwnerId);
			return writer;
		};

		/**
		 * Encodes the specified ChangeOwnerInput message, length delimited. Does not implicitly {@link channels.ChangeOwnerInput.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof channels.ChangeOwnerInput
		 * @static
		 * @param {channels.IChangeOwnerInput} message ChangeOwnerInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		ChangeOwnerInput.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a ChangeOwnerInput message from the specified reader or buffer.
		 * @function decode
		 * @memberof channels.ChangeOwnerInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {channels.ChangeOwnerInput} ChangeOwnerInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		ChangeOwnerInput.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.channels.ChangeOwnerInput();
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
						message.newOwnerId = reader.string();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a ChangeOwnerInput message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof channels.ChangeOwnerInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {channels.ChangeOwnerInput} ChangeOwnerInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		ChangeOwnerInput.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a ChangeOwnerInput message.
		 * @function verify
		 * @memberof channels.ChangeOwnerInput
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		ChangeOwnerInput.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.channelName !== null && message.hasOwnProperty("channelName"))
				if (!$util.isString(message.channelName))
					return "channelName: string expected";
			if (message.userDomain !== null && message.hasOwnProperty("userDomain"))
				if (!$util.isString(message.userDomain))
					return "userDomain: string expected";
			if (message.newOwnerId !== null && message.hasOwnProperty("newOwnerId"))
				if (!$util.isString(message.newOwnerId))
					return "newOwnerId: string expected";
			return null;
		};

		/**
		 * Creates a ChangeOwnerInput message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof channels.ChangeOwnerInput
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {channels.ChangeOwnerInput} ChangeOwnerInput
		 */
		ChangeOwnerInput.fromObject = function fromObject(object) {
			if (object instanceof $root.channels.ChangeOwnerInput) return object;
			var message = new $root.channels.ChangeOwnerInput();
			if (object.channelName !== null)
				message.channelName = String(object.channelName);
			if (object.userDomain !== null)
				message.userDomain = String(object.userDomain);
			if (object.newOwnerId !== null)
				message.newOwnerId = String(object.newOwnerId);
			return message;
		};

		/**
		 * Creates a plain object from a ChangeOwnerInput message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof channels.ChangeOwnerInput
		 * @static
		 * @param {channels.ChangeOwnerInput} message ChangeOwnerInput
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		ChangeOwnerInput.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.channelName = "";
				object.userDomain = "";
				object.newOwnerId = "";
			}
			if (message.channelName !== null && message.hasOwnProperty("channelName"))
				object.channelName = message.channelName;
			if (message.userDomain !== null && message.hasOwnProperty("userDomain"))
				object.userDomain = message.userDomain;
			if (message.newOwnerId !== null && message.hasOwnProperty("newOwnerId"))
				object.newOwnerId = message.newOwnerId;
			return object;
		};

		/**
		 * Converts this ChangeOwnerInput to JSON.
		 * @function toJSON
		 * @memberof channels.ChangeOwnerInput
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		ChangeOwnerInput.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return ChangeOwnerInput;
	})();

	channels.FindNewParticipantsInput = (function () {
		/**
		 * Properties of a FindNewParticipantsInput.
		 * @memberof channels
		 * @interface IFindNewParticipantsInput
		 * @property {string|null} [queryString] FindNewParticipantsInput queryString
		 * @property {string|null} [channelName] FindNewParticipantsInput channelName
		 * @property {string|null} [userDomain] FindNewParticipantsInput userDomain
		 */

		/**
		 * Constructs a new FindNewParticipantsInput.
		 * @memberof channels
		 * @classdesc Represents a FindNewParticipantsInput.
		 * @implements IFindNewParticipantsInput
		 * @constructor
		 * @param {channels.IFindNewParticipantsInput=} [properties] Properties to set
		 */
		function FindNewParticipantsInput(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * FindNewParticipantsInput queryString.
		 * @member {string} queryString
		 * @memberof channels.FindNewParticipantsInput
		 * @instance
		 */
		FindNewParticipantsInput.prototype.queryString = "";

		/**
		 * FindNewParticipantsInput channelName.
		 * @member {string} channelName
		 * @memberof channels.FindNewParticipantsInput
		 * @instance
		 */
		FindNewParticipantsInput.prototype.channelName = "";

		/**
		 * FindNewParticipantsInput userDomain.
		 * @member {string} userDomain
		 * @memberof channels.FindNewParticipantsInput
		 * @instance
		 */
		FindNewParticipantsInput.prototype.userDomain = "";

		/**
		 * Creates a new FindNewParticipantsInput instance using the specified properties.
		 * @function create
		 * @memberof channels.FindNewParticipantsInput
		 * @static
		 * @param {channels.IFindNewParticipantsInput=} [properties] Properties to set
		 * @returns {channels.FindNewParticipantsInput} FindNewParticipantsInput instance
		 */
		FindNewParticipantsInput.create = function create(properties) {
			return new FindNewParticipantsInput(properties);
		};

		/**
		 * Encodes the specified FindNewParticipantsInput message. Does not implicitly {@link channels.FindNewParticipantsInput.verify|verify} messages.
		 * @function encode
		 * @memberof channels.FindNewParticipantsInput
		 * @static
		 * @param {channels.IFindNewParticipantsInput} message FindNewParticipantsInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		FindNewParticipantsInput.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.queryString !== null && message.hasOwnProperty("queryString"))
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.queryString);
			if (message.channelName !== null && message.hasOwnProperty("channelName"))
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.channelName);
			if (message.userDomain !== null && message.hasOwnProperty("userDomain"))
				writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.userDomain);
			return writer;
		};

		/**
		 * Encodes the specified FindNewParticipantsInput message, length delimited. Does not implicitly {@link channels.FindNewParticipantsInput.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof channels.FindNewParticipantsInput
		 * @static
		 * @param {channels.IFindNewParticipantsInput} message FindNewParticipantsInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		FindNewParticipantsInput.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a FindNewParticipantsInput message from the specified reader or buffer.
		 * @function decode
		 * @memberof channels.FindNewParticipantsInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {channels.FindNewParticipantsInput} FindNewParticipantsInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		FindNewParticipantsInput.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.channels.FindNewParticipantsInput();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.queryString = reader.string();
						break;
					case 2:
						message.channelName = reader.string();
						break;
					case 3:
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
		 * Decodes a FindNewParticipantsInput message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof channels.FindNewParticipantsInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {channels.FindNewParticipantsInput} FindNewParticipantsInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		FindNewParticipantsInput.decodeDelimited = function decodeDelimited(
			reader
		) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a FindNewParticipantsInput message.
		 * @function verify
		 * @memberof channels.FindNewParticipantsInput
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		FindNewParticipantsInput.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.queryString !== null && message.hasOwnProperty("queryString"))
				if (!$util.isString(message.queryString))
					return "queryString: string expected";
			if (message.channelName !== null && message.hasOwnProperty("channelName"))
				if (!$util.isString(message.channelName))
					return "channelName: string expected";
			if (message.userDomain !== null && message.hasOwnProperty("userDomain"))
				if (!$util.isString(message.userDomain))
					return "userDomain: string expected";
			return null;
		};

		/**
		 * Creates a FindNewParticipantsInput message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof channels.FindNewParticipantsInput
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {channels.FindNewParticipantsInput} FindNewParticipantsInput
		 */
		FindNewParticipantsInput.fromObject = function fromObject(object) {
			if (object instanceof $root.channels.FindNewParticipantsInput)
				return object;
			var message = new $root.channels.FindNewParticipantsInput();
			if (object.queryString !== null)
				message.queryString = String(object.queryString);
			if (object.channelName !== null)
				message.channelName = String(object.channelName);
			if (object.userDomain !== null)
				message.userDomain = String(object.userDomain);
			return message;
		};

		/**
		 * Creates a plain object from a FindNewParticipantsInput message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof channels.FindNewParticipantsInput
		 * @static
		 * @param {channels.FindNewParticipantsInput} message FindNewParticipantsInput
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		FindNewParticipantsInput.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.queryString = "";
				object.channelName = "";
				object.userDomain = "";
			}
			if (message.queryString !== null && message.hasOwnProperty("queryString"))
				object.queryString = message.queryString;
			if (message.channelName !== null && message.hasOwnProperty("channelName"))
				object.channelName = message.channelName;
			if (message.userDomain !== null && message.hasOwnProperty("userDomain"))
				object.userDomain = message.userDomain;
			return object;
		};

		/**
		 * Converts this FindNewParticipantsInput to JSON.
		 * @function toJSON
		 * @memberof channels.FindNewParticipantsInput
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		FindNewParticipantsInput.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return FindNewParticipantsInput;
	})();

	channels.FindNewParticipantsResponse = (function () {
		/**
		 * Properties of a FindNewParticipantsResponse.
		 * @memberof channels
		 * @interface IFindNewParticipantsResponse
		 * @property {number|null} [error] FindNewParticipantsResponse error
		 * @property {Array.<channels.INewParticipant>|null} [content] FindNewParticipantsResponse content
		 * @property {string|null} [errorMessage] FindNewParticipantsResponse errorMessage
		 */

		/**
		 * Constructs a new FindNewParticipantsResponse.
		 * @memberof channels
		 * @classdesc Represents a FindNewParticipantsResponse.
		 * @implements IFindNewParticipantsResponse
		 * @constructor
		 * @param {channels.IFindNewParticipantsResponse=} [properties] Properties to set
		 */
		function FindNewParticipantsResponse(properties) {
			this.content = [];
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * FindNewParticipantsResponse error.
		 * @member {number} error
		 * @memberof channels.FindNewParticipantsResponse
		 * @instance
		 */
		FindNewParticipantsResponse.prototype.error = 0;

		/**
		 * FindNewParticipantsResponse content.
		 * @member {Array.<channels.INewParticipant>} content
		 * @memberof channels.FindNewParticipantsResponse
		 * @instance
		 */
		FindNewParticipantsResponse.prototype.content = $util.emptyArray;

		/**
		 * FindNewParticipantsResponse errorMessage.
		 * @member {string} errorMessage
		 * @memberof channels.FindNewParticipantsResponse
		 * @instance
		 */
		FindNewParticipantsResponse.prototype.errorMessage = "";

		/**
		 * Creates a new FindNewParticipantsResponse instance using the specified properties.
		 * @function create
		 * @memberof channels.FindNewParticipantsResponse
		 * @static
		 * @param {channels.IFindNewParticipantsResponse=} [properties] Properties to set
		 * @returns {channels.FindNewParticipantsResponse} FindNewParticipantsResponse instance
		 */
		FindNewParticipantsResponse.create = function create(properties) {
			return new FindNewParticipantsResponse(properties);
		};

		/**
		 * Encodes the specified FindNewParticipantsResponse message. Does not implicitly {@link channels.FindNewParticipantsResponse.verify|verify} messages.
		 * @function encode
		 * @memberof channels.FindNewParticipantsResponse
		 * @static
		 * @param {channels.IFindNewParticipantsResponse} message FindNewParticipantsResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		FindNewParticipantsResponse.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.error !== null && message.hasOwnProperty("error"))
				writer.uint32(/* id 1, wireType 0 =*/ 8).int32(message.error);
			if (message.content !== null && message.content.length)
				for (var i = 0; i < message.content.length; ++i)
					$root.channels.NewParticipant.encode(
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
		 * Encodes the specified FindNewParticipantsResponse message, length delimited. Does not implicitly {@link channels.FindNewParticipantsResponse.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof channels.FindNewParticipantsResponse
		 * @static
		 * @param {channels.IFindNewParticipantsResponse} message FindNewParticipantsResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		FindNewParticipantsResponse.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a FindNewParticipantsResponse message from the specified reader or buffer.
		 * @function decode
		 * @memberof channels.FindNewParticipantsResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {channels.FindNewParticipantsResponse} FindNewParticipantsResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		FindNewParticipantsResponse.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.channels.FindNewParticipantsResponse();
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
							$root.channels.NewParticipant.decode(reader, reader.uint32())
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
		 * Decodes a FindNewParticipantsResponse message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof channels.FindNewParticipantsResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {channels.FindNewParticipantsResponse} FindNewParticipantsResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		FindNewParticipantsResponse.decodeDelimited = function decodeDelimited(
			reader
		) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a FindNewParticipantsResponse message.
		 * @function verify
		 * @memberof channels.FindNewParticipantsResponse
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		FindNewParticipantsResponse.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.error !== null && message.hasOwnProperty("error"))
				if (!$util.isInteger(message.error)) return "error: integer expected";
			if (message.content !== null && message.hasOwnProperty("content")) {
				if (!Array.isArray(message.content)) return "content: array expected";
				for (var i = 0; i < message.content.length; ++i) {
					var error = $root.channels.NewParticipant.verify(message.content[i]);
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
		 * Creates a FindNewParticipantsResponse message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof channels.FindNewParticipantsResponse
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {channels.FindNewParticipantsResponse} FindNewParticipantsResponse
		 */
		FindNewParticipantsResponse.fromObject = function fromObject(object) {
			if (object instanceof $root.channels.FindNewParticipantsResponse)
				return object;
			var message = new $root.channels.FindNewParticipantsResponse();
			if (object.error !== null) message.error = object.error | 0;
			if (object.content) {
				if (!Array.isArray(object.content))
					throw TypeError(
						".channels.FindNewParticipantsResponse.content: array expected"
					);
				message.content = [];
				for (var i = 0; i < object.content.length; ++i) {
					if (typeof object.content[i] !== "object")
						throw TypeError(
							".channels.FindNewParticipantsResponse.content: object expected"
						);
					message.content[i] = $root.channels.NewParticipant.fromObject(
						object.content[i]
					);
				}
			}
			if (object.errorMessage !== null)
				message.errorMessage = String(object.errorMessage);
			return message;
		};

		/**
		 * Creates a plain object from a FindNewParticipantsResponse message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof channels.FindNewParticipantsResponse
		 * @static
		 * @param {channels.FindNewParticipantsResponse} message FindNewParticipantsResponse
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		FindNewParticipantsResponse.toObject = function toObject(message, options) {
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
					object.content[j] = $root.channels.NewParticipant.toObject(
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
		 * Converts this FindNewParticipantsResponse to JSON.
		 * @function toJSON
		 * @memberof channels.FindNewParticipantsResponse
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		FindNewParticipantsResponse.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return FindNewParticipantsResponse;
	})();

	channels.NewParticipant = (function () {
		/**
		 * Properties of a NewParticipant.
		 * @memberof channels
		 * @interface INewParticipant
		 * @property {string|null} [userName] NewParticipant userName
		 * @property {string|null} [userId] NewParticipant userId
		 * @property {string|null} [userCompanyName] NewParticipant userCompanyName
		 * @property {commonmessages.IUserAddress|null} [address] NewParticipant address
		 */

		/**
		 * Constructs a new NewParticipant.
		 * @memberof channels
		 * @classdesc Represents a NewParticipant.
		 * @implements INewParticipant
		 * @constructor
		 * @param {channels.INewParticipant=} [properties] Properties to set
		 */
		function NewParticipant(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * NewParticipant userName.
		 * @member {string} userName
		 * @memberof channels.NewParticipant
		 * @instance
		 */
		NewParticipant.prototype.userName = "";

		/**
		 * NewParticipant userId.
		 * @member {string} userId
		 * @memberof channels.NewParticipant
		 * @instance
		 */
		NewParticipant.prototype.userId = "";

		/**
		 * NewParticipant userCompanyName.
		 * @member {string} userCompanyName
		 * @memberof channels.NewParticipant
		 * @instance
		 */
		NewParticipant.prototype.userCompanyName = "";

		/**
		 * NewParticipant address.
		 * @member {commonmessages.IUserAddress|null|undefined} address
		 * @memberof channels.NewParticipant
		 * @instance
		 */
		NewParticipant.prototype.address = null;

		/**
		 * Creates a new NewParticipant instance using the specified properties.
		 * @function create
		 * @memberof channels.NewParticipant
		 * @static
		 * @param {channels.INewParticipant=} [properties] Properties to set
		 * @returns {channels.NewParticipant} NewParticipant instance
		 */
		NewParticipant.create = function create(properties) {
			return new NewParticipant(properties);
		};

		/**
		 * Encodes the specified NewParticipant message. Does not implicitly {@link channels.NewParticipant.verify|verify} messages.
		 * @function encode
		 * @memberof channels.NewParticipant
		 * @static
		 * @param {channels.INewParticipant} message NewParticipant message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		NewParticipant.encode = function encode(message, writer) {
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
		 * Encodes the specified NewParticipant message, length delimited. Does not implicitly {@link channels.NewParticipant.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof channels.NewParticipant
		 * @static
		 * @param {channels.INewParticipant} message NewParticipant message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		NewParticipant.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a NewParticipant message from the specified reader or buffer.
		 * @function decode
		 * @memberof channels.NewParticipant
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {channels.NewParticipant} NewParticipant
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		NewParticipant.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.channels.NewParticipant();
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
		 * Decodes a NewParticipant message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof channels.NewParticipant
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {channels.NewParticipant} NewParticipant
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		NewParticipant.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a NewParticipant message.
		 * @function verify
		 * @memberof channels.NewParticipant
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		NewParticipant.verify = function verify(message) {
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
		 * Creates a NewParticipant message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof channels.NewParticipant
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {channels.NewParticipant} NewParticipant
		 */
		NewParticipant.fromObject = function fromObject(object) {
			if (object instanceof $root.channels.NewParticipant) return object;
			var message = new $root.channels.NewParticipant();
			if (object.userName !== null) message.userName = String(object.userName);
			if (object.userId !== null) message.userId = String(object.userId);
			if (object.userCompanyName !== null)
				message.userCompanyName = String(object.userCompanyName);
			if (object.address !== null) {
				if (typeof object.address !== "object")
					throw TypeError(".channels.NewParticipant.address: object expected");
				message.address = $root.commonmessages.UserAddress.fromObject(
					object.address
				);
			}
			return message;
		};

		/**
		 * Creates a plain object from a NewParticipant message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof channels.NewParticipant
		 * @static
		 * @param {channels.NewParticipant} message NewParticipant
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		NewParticipant.toObject = function toObject(message, options) {
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
		 * Converts this NewParticipant to JSON.
		 * @function toJSON
		 * @memberof channels.NewParticipant
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		NewParticipant.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return NewParticipant;
	})();

	return channels;
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
