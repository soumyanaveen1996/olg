/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader,
	$Writer = $protobuf.Writer,
	$util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.user = (function () {
	/**
	 * Namespace user.
	 * @exports user
	 * @namespace
	 */
	var user = {};

	user.UserService = (function () {
		/**
		 * Constructs a new UserService service.
		 * @memberof user
		 * @classdesc Represents a UserService
		 * @extends $protobuf.rpc.Service
		 * @constructor
		 * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
		 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
		 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
		 */
		function UserService(rpcImpl, requestDelimited, responseDelimited) {
			$protobuf.rpc.Service.call(
				this,
				rpcImpl,
				requestDelimited,
				responseDelimited
			);
		}

		(UserService.prototype = Object.create(
			$protobuf.rpc.Service.prototype
		)).constructor = UserService;

		/**
		 * Creates new UserService service using the specified rpc implementation.
		 * @function create
		 * @memberof user.UserService
		 * @static
		 * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
		 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
		 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
		 * @returns {UserService} RPC service. Useful where requests and/or responses are streamed.
		 */
		UserService.create = function create(
			rpcImpl,
			requestDelimited,
			responseDelimited
		) {
			return new this(rpcImpl, requestDelimited, responseDelimited);
		};

		/**
		 * Callback as used by {@link user.UserService#updateUserProfile}.
		 * @memberof user.UserService
		 * @typedef UpdateUserProfileCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {user.UpdateUserProfileResponse} [response] UpdateUserProfileResponse
		 */

		/**
		 * Calls UpdateUserProfile.
		 * @function updateUserProfile
		 * @memberof user.UserService
		 * @instance
		 * @param {user.IUser} request User message or plain object
		 * @param {user.UserService.UpdateUserProfileCallback} callback Node-style callback called with the error, if any, and UpdateUserProfileResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(UserService.prototype.updateUserProfile = function updateUserProfile(
				request,
				callback
			) {
				return this.rpcCall(
					updateUserProfile,
					$root.user.User,
					$root.user.UpdateUserProfileResponse,
					request,
					callback
				);
			}),
			"name",
			{ value: "UpdateUserProfile" }
		);

		/**
		 * Calls UpdateUserProfile.
		 * @function updateUserProfile
		 * @memberof user.UserService
		 * @instance
		 * @param {user.IUser} request User message or plain object
		 * @returns {Promise<user.UpdateUserProfileResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link user.UserService#getUserDetails}.
		 * @memberof user.UserService
		 * @typedef GetUserDetailsCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {user.User} [response] User
		 */

		/**
		 * Calls GetUserDetails.
		 * @function getUserDetails
		 * @memberof user.UserService
		 * @instance
		 * @param {user.IUser} request User message or plain object
		 * @param {user.UserService.GetUserDetailsCallback} callback Node-style callback called with the error, if any, and User
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(UserService.prototype.getUserDetails = function getUserDetails(
				request,
				callback
			) {
				return this.rpcCall(
					getUserDetails,
					$root.user.User,
					$root.user.User,
					request,
					callback
				);
			}),
			"name",
			{ value: "GetUserDetails" }
		);

		/**
		 * Calls GetUserDetails.
		 * @function getUserDetails
		 * @memberof user.UserService
		 * @instance
		 * @param {user.IUser} request User message or plain object
		 * @returns {Promise<user.User>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link user.UserService#getLocalUserDetails}.
		 * @memberof user.UserService
		 * @typedef GetLocalUserDetailsCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {commonmessages.LocalContact} [response] LocalContact
		 */

		/**
		 * Calls GetLocalUserDetails.
		 * @function getLocalUserDetails
		 * @memberof user.UserService
		 * @instance
		 * @param {user.ILocalUserInput} request LocalUserInput message or plain object
		 * @param {user.UserService.GetLocalUserDetailsCallback} callback Node-style callback called with the error, if any, and LocalContact
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(UserService.prototype.getLocalUserDetails = function getLocalUserDetails(
				request,
				callback
			) {
				return this.rpcCall(
					getLocalUserDetails,
					$root.user.LocalUserInput,
					$root.commonmessages.LocalContact,
					request,
					callback
				);
			}),
			"name",
			{ value: "GetLocalUserDetails" }
		);

		/**
		 * Calls GetLocalUserDetails.
		 * @function getLocalUserDetails
		 * @memberof user.UserService
		 * @instance
		 * @param {user.ILocalUserInput} request LocalUserInput message or plain object
		 * @returns {Promise<commonmessages.LocalContact>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link user.UserService#getBotSubscriptions}.
		 * @memberof user.UserService
		 * @typedef GetBotSubscriptionsCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {user.BotSubscriptionsResponse} [response] BotSubscriptionsResponse
		 */

		/**
		 * Calls GetBotSubscriptions.
		 * @function getBotSubscriptions
		 * @memberof user.UserService
		 * @instance
		 * @param {commonmessages.ISelectedDomainInput} request SelectedDomainInput message or plain object
		 * @param {user.UserService.GetBotSubscriptionsCallback} callback Node-style callback called with the error, if any, and BotSubscriptionsResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(UserService.prototype.getBotSubscriptions = function getBotSubscriptions(
				request,
				callback
			) {
				return this.rpcCall(
					getBotSubscriptions,
					$root.commonmessages.SelectedDomainInput,
					$root.user.BotSubscriptionsResponse,
					request,
					callback
				);
			}),
			"name",
			{ value: "GetBotSubscriptions" }
		);

		/**
		 * Calls GetBotSubscriptions.
		 * @function getBotSubscriptions
		 * @memberof user.UserService
		 * @instance
		 * @param {commonmessages.ISelectedDomainInput} request SelectedDomainInput message or plain object
		 * @returns {Promise<user.BotSubscriptionsResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link user.UserService#getBotSubscriptionsInfo}.
		 * @memberof user.UserService
		 * @typedef GetBotSubscriptionsInfoCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {user.BotSubscriptionsInfoResponse} [response] BotSubscriptionsInfoResponse
		 */

		/**
		 * Calls GetBotSubscriptionsInfo.
		 * @function getBotSubscriptionsInfo
		 * @memberof user.UserService
		 * @instance
		 * @param {commonmessages.ISelectedDomainInput} request SelectedDomainInput message or plain object
		 * @param {user.UserService.GetBotSubscriptionsInfoCallback} callback Node-style callback called with the error, if any, and BotSubscriptionsInfoResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(UserService.prototype.getBotSubscriptionsInfo =
				function getBotSubscriptionsInfo(request, callback) {
					return this.rpcCall(
						getBotSubscriptionsInfo,
						$root.commonmessages.SelectedDomainInput,
						$root.user.BotSubscriptionsInfoResponse,
						request,
						callback
					);
				}),
			"name",
			{ value: "GetBotSubscriptionsInfo" }
		);

		/**
		 * Calls GetBotSubscriptionsInfo.
		 * @function getBotSubscriptionsInfo
		 * @memberof user.UserService
		 * @instance
		 * @param {commonmessages.ISelectedDomainInput} request SelectedDomainInput message or plain object
		 * @returns {Promise<user.BotSubscriptionsInfoResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link user.UserService#getContacts}.
		 * @memberof user.UserService
		 * @typedef GetContactsCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {user.ContactsResponse} [response] ContactsResponse
		 */

		/**
		 * Calls GetContacts.
		 * @function getContacts
		 * @memberof user.UserService
		 * @instance
		 * @param {commonmessages.ISelectedDomainInput} request SelectedDomainInput message or plain object
		 * @param {user.UserService.GetContactsCallback} callback Node-style callback called with the error, if any, and ContactsResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(UserService.prototype.getContacts = function getContacts(
				request,
				callback
			) {
				return this.rpcCall(
					getContacts,
					$root.commonmessages.SelectedDomainInput,
					$root.user.ContactsResponse,
					request,
					callback
				);
			}),
			"name",
			{ value: "GetContacts" }
		);

		/**
		 * Calls GetContacts.
		 * @function getContacts
		 * @memberof user.UserService
		 * @instance
		 * @param {commonmessages.ISelectedDomainInput} request SelectedDomainInput message or plain object
		 * @returns {Promise<user.ContactsResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link user.UserService#subscribeBot}.
		 * @memberof user.UserService
		 * @typedef SubscribeBotCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {user.SubscribeBotResponse} [response] SubscribeBotResponse
		 */

		/**
		 * Calls SubscribeBot.
		 * @function subscribeBot
		 * @memberof user.UserService
		 * @instance
		 * @param {user.ISubscribeBotInput} request SubscribeBotInput message or plain object
		 * @param {user.UserService.SubscribeBotCallback} callback Node-style callback called with the error, if any, and SubscribeBotResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(UserService.prototype.subscribeBot = function subscribeBot(
				request,
				callback
			) {
				return this.rpcCall(
					subscribeBot,
					$root.user.SubscribeBotInput,
					$root.user.SubscribeBotResponse,
					request,
					callback
				);
			}),
			"name",
			{ value: "SubscribeBot" }
		);

		/**
		 * Calls SubscribeBot.
		 * @function subscribeBot
		 * @memberof user.UserService
		 * @instance
		 * @param {user.ISubscribeBotInput} request SubscribeBotInput message or plain object
		 * @returns {Promise<user.SubscribeBotResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link user.UserService#unsubscribeBot}.
		 * @memberof user.UserService
		 * @typedef UnsubscribeBotCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {user.SubscribeBotResponse} [response] SubscribeBotResponse
		 */

		/**
		 * Calls UnsubscribeBot.
		 * @function unsubscribeBot
		 * @memberof user.UserService
		 * @instance
		 * @param {user.ISubscribeBotInput} request SubscribeBotInput message or plain object
		 * @param {user.UserService.UnsubscribeBotCallback} callback Node-style callback called with the error, if any, and SubscribeBotResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(UserService.prototype.unsubscribeBot = function unsubscribeBot(
				request,
				callback
			) {
				return this.rpcCall(
					unsubscribeBot,
					$root.user.SubscribeBotInput,
					$root.user.SubscribeBotResponse,
					request,
					callback
				);
			}),
			"name",
			{ value: "UnsubscribeBot" }
		);

		/**
		 * Calls UnsubscribeBot.
		 * @function unsubscribeBot
		 * @memberof user.UserService
		 * @instance
		 * @param {user.ISubscribeBotInput} request SubscribeBotInput message or plain object
		 * @returns {Promise<user.SubscribeBotResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link user.UserService#subscribeDomain}.
		 * @memberof user.UserService
		 * @typedef SubscribeDomainCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {user.SubscribeDomainResponse} [response] SubscribeDomainResponse
		 */

		/**
		 * Calls SubscribeDomain.
		 * @function subscribeDomain
		 * @memberof user.UserService
		 * @instance
		 * @param {user.ISubscribeDomainInput} request SubscribeDomainInput message or plain object
		 * @param {user.UserService.SubscribeDomainCallback} callback Node-style callback called with the error, if any, and SubscribeDomainResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(UserService.prototype.subscribeDomain = function subscribeDomain(
				request,
				callback
			) {
				return this.rpcCall(
					subscribeDomain,
					$root.user.SubscribeDomainInput,
					$root.user.SubscribeDomainResponse,
					request,
					callback
				);
			}),
			"name",
			{ value: "SubscribeDomain" }
		);

		/**
		 * Calls SubscribeDomain.
		 * @function subscribeDomain
		 * @memberof user.UserService
		 * @instance
		 * @param {user.ISubscribeDomainInput} request SubscribeDomainInput message or plain object
		 * @returns {Promise<user.SubscribeDomainResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link user.UserService#enableVoip}.
		 * @memberof user.UserService
		 * @typedef EnableVoipCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {user.VoipToggleResponse} [response] VoipToggleResponse
		 */

		/**
		 * Calls EnableVoip.
		 * @function enableVoip
		 * @memberof user.UserService
		 * @instance
		 * @param {commonmessages.IEmpty} request Empty message or plain object
		 * @param {user.UserService.EnableVoipCallback} callback Node-style callback called with the error, if any, and VoipToggleResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(UserService.prototype.enableVoip = function enableVoip(
				request,
				callback
			) {
				return this.rpcCall(
					enableVoip,
					$root.commonmessages.Empty,
					$root.user.VoipToggleResponse,
					request,
					callback
				);
			}),
			"name",
			{ value: "EnableVoip" }
		);

		/**
		 * Calls EnableVoip.
		 * @function enableVoip
		 * @memberof user.UserService
		 * @instance
		 * @param {commonmessages.IEmpty} request Empty message or plain object
		 * @returns {Promise<user.VoipToggleResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link user.UserService#disableVoip}.
		 * @memberof user.UserService
		 * @typedef DisableVoipCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {user.VoipToggleResponse} [response] VoipToggleResponse
		 */

		/**
		 * Calls DisableVoip.
		 * @function disableVoip
		 * @memberof user.UserService
		 * @instance
		 * @param {commonmessages.IEmpty} request Empty message or plain object
		 * @param {user.UserService.DisableVoipCallback} callback Node-style callback called with the error, if any, and VoipToggleResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(UserService.prototype.disableVoip = function disableVoip(
				request,
				callback
			) {
				return this.rpcCall(
					disableVoip,
					$root.commonmessages.Empty,
					$root.user.VoipToggleResponse,
					request,
					callback
				);
			}),
			"name",
			{ value: "DisableVoip" }
		);

		/**
		 * Calls DisableVoip.
		 * @function disableVoip
		 * @memberof user.UserService
		 * @instance
		 * @param {commonmessages.IEmpty} request Empty message or plain object
		 * @returns {Promise<user.VoipToggleResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link user.UserService#getVoipStatus}.
		 * @memberof user.UserService
		 * @typedef GetVoipStatusCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {user.VoipStatusResponse} [response] VoipStatusResponse
		 */

		/**
		 * Calls GetVoipStatus.
		 * @function getVoipStatus
		 * @memberof user.UserService
		 * @instance
		 * @param {user.IVoipStatusInput} request VoipStatusInput message or plain object
		 * @param {user.UserService.GetVoipStatusCallback} callback Node-style callback called with the error, if any, and VoipStatusResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(UserService.prototype.getVoipStatus = function getVoipStatus(
				request,
				callback
			) {
				return this.rpcCall(
					getVoipStatus,
					$root.user.VoipStatusInput,
					$root.user.VoipStatusResponse,
					request,
					callback
				);
			}),
			"name",
			{ value: "GetVoipStatus" }
		);

		/**
		 * Calls GetVoipStatus.
		 * @function getVoipStatus
		 * @memberof user.UserService
		 * @instance
		 * @param {user.IVoipStatusInput} request VoipStatusInput message or plain object
		 * @returns {Promise<user.VoipStatusResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link user.UserService#generateTwilioToken}.
		 * @memberof user.UserService
		 * @typedef GenerateTwilioTokenCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {user.TwilioTokenResponse} [response] TwilioTokenResponse
		 */

		/**
		 * Calls GenerateTwilioToken.
		 * @function generateTwilioToken
		 * @memberof user.UserService
		 * @instance
		 * @param {user.ITwilioTokenInput} request TwilioTokenInput message or plain object
		 * @param {user.UserService.GenerateTwilioTokenCallback} callback Node-style callback called with the error, if any, and TwilioTokenResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(UserService.prototype.generateTwilioToken = function generateTwilioToken(
				request,
				callback
			) {
				return this.rpcCall(
					generateTwilioToken,
					$root.user.TwilioTokenInput,
					$root.user.TwilioTokenResponse,
					request,
					callback
				);
			}),
			"name",
			{ value: "GenerateTwilioToken" }
		);

		/**
		 * Calls GenerateTwilioToken.
		 * @function generateTwilioToken
		 * @memberof user.UserService
		 * @instance
		 * @param {user.ITwilioTokenInput} request TwilioTokenInput message or plain object
		 * @returns {Promise<user.TwilioTokenResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link user.UserService#generateWebTwilioToken}.
		 * @memberof user.UserService
		 * @typedef GenerateWebTwilioTokenCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {user.TwilioTokenResponse} [response] TwilioTokenResponse
		 */

		/**
		 * Calls GenerateWebTwilioToken.
		 * @function generateWebTwilioToken
		 * @memberof user.UserService
		 * @instance
		 * @param {user.ITwilioTokenInput} request TwilioTokenInput message or plain object
		 * @param {user.UserService.GenerateWebTwilioTokenCallback} callback Node-style callback called with the error, if any, and TwilioTokenResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(UserService.prototype.generateWebTwilioToken =
				function generateWebTwilioToken(request, callback) {
					return this.rpcCall(
						generateWebTwilioToken,
						$root.user.TwilioTokenInput,
						$root.user.TwilioTokenResponse,
						request,
						callback
					);
				}),
			"name",
			{ value: "GenerateWebTwilioToken" }
		);

		/**
		 * Calls GenerateWebTwilioToken.
		 * @function generateWebTwilioToken
		 * @memberof user.UserService
		 * @instance
		 * @param {user.ITwilioTokenInput} request TwilioTokenInput message or plain object
		 * @returns {Promise<user.TwilioTokenResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link user.UserService#manageTnc}.
		 * @memberof user.UserService
		 * @typedef ManageTncCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {user.ManageTncResponse} [response] ManageTncResponse
		 */

		/**
		 * Calls ManageTnc.
		 * @function manageTnc
		 * @memberof user.UserService
		 * @instance
		 * @param {user.IManageTncInput} request ManageTncInput message or plain object
		 * @param {user.UserService.ManageTncCallback} callback Node-style callback called with the error, if any, and ManageTncResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(UserService.prototype.manageTnc = function manageTnc(request, callback) {
				return this.rpcCall(
					manageTnc,
					$root.user.ManageTncInput,
					$root.user.ManageTncResponse,
					request,
					callback
				);
			}),
			"name",
			{ value: "ManageTnc" }
		);

		/**
		 * Calls ManageTnc.
		 * @function manageTnc
		 * @memberof user.UserService
		 * @instance
		 * @param {user.IManageTncInput} request ManageTncInput message or plain object
		 * @returns {Promise<user.ManageTncResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link user.UserService#getCompanies}.
		 * @memberof user.UserService
		 * @typedef GetCompaniesCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {user.CompaniesResponse} [response] CompaniesResponse
		 */

		/**
		 * Calls GetCompanies.
		 * @function getCompanies
		 * @memberof user.UserService
		 * @instance
		 * @param {commonmessages.IEmpty} request Empty message or plain object
		 * @param {user.UserService.GetCompaniesCallback} callback Node-style callback called with the error, if any, and CompaniesResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(UserService.prototype.getCompanies = function getCompanies(
				request,
				callback
			) {
				return this.rpcCall(
					getCompanies,
					$root.commonmessages.Empty,
					$root.user.CompaniesResponse,
					request,
					callback
				);
			}),
			"name",
			{ value: "GetCompanies" }
		);

		/**
		 * Calls GetCompanies.
		 * @function getCompanies
		 * @memberof user.UserService
		 * @instance
		 * @param {commonmessages.IEmpty} request Empty message or plain object
		 * @returns {Promise<user.CompaniesResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link user.UserService#getCallHistory}.
		 * @memberof user.UserService
		 * @typedef GetCallHistoryCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {user.CallHistoryResponse} [response] CallHistoryResponse
		 */

		/**
		 * Calls GetCallHistory.
		 * @function getCallHistory
		 * @memberof user.UserService
		 * @instance
		 * @param {commonmessages.IEmpty} request Empty message or plain object
		 * @param {user.UserService.GetCallHistoryCallback} callback Node-style callback called with the error, if any, and CallHistoryResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(UserService.prototype.getCallHistory = function getCallHistory(
				request,
				callback
			) {
				return this.rpcCall(
					getCallHistory,
					$root.commonmessages.Empty,
					$root.user.CallHistoryResponse,
					request,
					callback
				);
			}),
			"name",
			{ value: "GetCallHistory" }
		);

		/**
		 * Calls GetCallHistory.
		 * @function getCallHistory
		 * @memberof user.UserService
		 * @instance
		 * @param {commonmessages.IEmpty} request Empty message or plain object
		 * @returns {Promise<user.CallHistoryResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link user.UserService#getPaginatedCallHistory}.
		 * @memberof user.UserService
		 * @typedef GetPaginatedCallHistoryCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {user.PaginatedCallHistoryResponse} [response] PaginatedCallHistoryResponse
		 */

		/**
		 * Calls GetPaginatedCallHistory.
		 * @function getPaginatedCallHistory
		 * @memberof user.UserService
		 * @instance
		 * @param {user.IPaginatedCallHistoryInput} request PaginatedCallHistoryInput message or plain object
		 * @param {user.UserService.GetPaginatedCallHistoryCallback} callback Node-style callback called with the error, if any, and PaginatedCallHistoryResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(UserService.prototype.getPaginatedCallHistory =
				function getPaginatedCallHistory(request, callback) {
					return this.rpcCall(
						getPaginatedCallHistory,
						$root.user.PaginatedCallHistoryInput,
						$root.user.PaginatedCallHistoryResponse,
						request,
						callback
					);
				}),
			"name",
			{ value: "GetPaginatedCallHistory" }
		);

		/**
		 * Calls GetPaginatedCallHistory.
		 * @function getPaginatedCallHistory
		 * @memberof user.UserService
		 * @instance
		 * @param {user.IPaginatedCallHistoryInput} request PaginatedCallHistoryInput message or plain object
		 * @returns {Promise<user.PaginatedCallHistoryResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link user.UserService#getCallHistoryForContact}.
		 * @memberof user.UserService
		 * @typedef GetCallHistoryForContactCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {user.CallHistoryResponse} [response] CallHistoryResponse
		 */

		/**
		 * Calls GetCallHistoryForContact.
		 * @function getCallHistoryForContact
		 * @memberof user.UserService
		 * @instance
		 * @param {user.ICallHistoryInput} request CallHistoryInput message or plain object
		 * @param {user.UserService.GetCallHistoryForContactCallback} callback Node-style callback called with the error, if any, and CallHistoryResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(UserService.prototype.getCallHistoryForContact =
				function getCallHistoryForContact(request, callback) {
					return this.rpcCall(
						getCallHistoryForContact,
						$root.user.CallHistoryInput,
						$root.user.CallHistoryResponse,
						request,
						callback
					);
				}),
			"name",
			{ value: "GetCallHistoryForContact" }
		);

		/**
		 * Calls GetCallHistoryForContact.
		 * @function getCallHistoryForContact
		 * @memberof user.UserService
		 * @instance
		 * @param {user.ICallHistoryInput} request CallHistoryInput message or plain object
		 * @returns {Promise<user.CallHistoryResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link user.UserService#getUserDomains}.
		 * @memberof user.UserService
		 * @typedef GetUserDomainsCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {user.UserDomainsResponse} [response] UserDomainsResponse
		 */

		/**
		 * Calls GetUserDomains.
		 * @function getUserDomains
		 * @memberof user.UserService
		 * @instance
		 * @param {commonmessages.IEmpty} request Empty message or plain object
		 * @param {user.UserService.GetUserDomainsCallback} callback Node-style callback called with the error, if any, and UserDomainsResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(UserService.prototype.getUserDomains = function getUserDomains(
				request,
				callback
			) {
				return this.rpcCall(
					getUserDomains,
					$root.commonmessages.Empty,
					$root.user.UserDomainsResponse,
					request,
					callback
				);
			}),
			"name",
			{ value: "GetUserDomains" }
		);

		/**
		 * Calls GetUserDomains.
		 * @function getUserDomains
		 * @memberof user.UserService
		 * @instance
		 * @param {commonmessages.IEmpty} request Empty message or plain object
		 * @returns {Promise<user.UserDomainsResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link user.UserService#updateLastLoggedInDomain}.
		 * @memberof user.UserService
		 * @typedef UpdateLastLoggedInDomainCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {commonmessages.Empty} [response] Empty
		 */

		/**
		 * Calls UpdateLastLoggedInDomain.
		 * @function updateLastLoggedInDomain
		 * @memberof user.UserService
		 * @instance
		 * @param {user.ILastLoggedInDomainInput} request LastLoggedInDomainInput message or plain object
		 * @param {user.UserService.UpdateLastLoggedInDomainCallback} callback Node-style callback called with the error, if any, and Empty
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(UserService.prototype.updateLastLoggedInDomain =
				function updateLastLoggedInDomain(request, callback) {
					return this.rpcCall(
						updateLastLoggedInDomain,
						$root.user.LastLoggedInDomainInput,
						$root.commonmessages.Empty,
						request,
						callback
					);
				}),
			"name",
			{ value: "UpdateLastLoggedInDomain" }
		);

		/**
		 * Calls UpdateLastLoggedInDomain.
		 * @function updateLastLoggedInDomain
		 * @memberof user.UserService
		 * @instance
		 * @param {user.ILastLoggedInDomainInput} request LastLoggedInDomainInput message or plain object
		 * @returns {Promise<commonmessages.Empty>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link user.UserService#topupUserBalance}.
		 * @memberof user.UserService
		 * @typedef TopupUserBalanceCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {user.TopupBalanceResponse} [response] TopupBalanceResponse
		 */

		/**
		 * Calls TopupUserBalance.
		 * @function topupUserBalance
		 * @memberof user.UserService
		 * @instance
		 * @param {user.ITopupBalanceInput} request TopupBalanceInput message or plain object
		 * @param {user.UserService.TopupUserBalanceCallback} callback Node-style callback called with the error, if any, and TopupBalanceResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(UserService.prototype.topupUserBalance = function topupUserBalance(
				request,
				callback
			) {
				return this.rpcCall(
					topupUserBalance,
					$root.user.TopupBalanceInput,
					$root.user.TopupBalanceResponse,
					request,
					callback
				);
			}),
			"name",
			{ value: "TopupUserBalance" }
		);

		/**
		 * Calls TopupUserBalance.
		 * @function topupUserBalance
		 * @memberof user.UserService
		 * @instance
		 * @param {user.ITopupBalanceInput} request TopupBalanceInput message or plain object
		 * @returns {Promise<user.TopupBalanceResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link user.UserService#registerDevice}.
		 * @memberof user.UserService
		 * @typedef RegisterDeviceCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {user.DeviceBoolResponse} [response] DeviceBoolResponse
		 */

		/**
		 * Calls RegisterDevice.
		 * @function registerDevice
		 * @memberof user.UserService
		 * @instance
		 * @param {user.IDeviceInfo} request DeviceInfo message or plain object
		 * @param {user.UserService.RegisterDeviceCallback} callback Node-style callback called with the error, if any, and DeviceBoolResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(UserService.prototype.registerDevice = function registerDevice(
				request,
				callback
			) {
				return this.rpcCall(
					registerDevice,
					$root.user.DeviceInfo,
					$root.user.DeviceBoolResponse,
					request,
					callback
				);
			}),
			"name",
			{ value: "RegisterDevice" }
		);

		/**
		 * Calls RegisterDevice.
		 * @function registerDevice
		 * @memberof user.UserService
		 * @instance
		 * @param {user.IDeviceInfo} request DeviceInfo message or plain object
		 * @returns {Promise<user.DeviceBoolResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link user.UserService#deregisterDevice}.
		 * @memberof user.UserService
		 * @typedef DeregisterDeviceCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {user.DeviceBoolResponse} [response] DeviceBoolResponse
		 */

		/**
		 * Calls DeregisterDevice.
		 * @function deregisterDevice
		 * @memberof user.UserService
		 * @instance
		 * @param {user.IDeviceInfo} request DeviceInfo message or plain object
		 * @param {user.UserService.DeregisterDeviceCallback} callback Node-style callback called with the error, if any, and DeviceBoolResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(UserService.prototype.deregisterDevice = function deregisterDevice(
				request,
				callback
			) {
				return this.rpcCall(
					deregisterDevice,
					$root.user.DeviceInfo,
					$root.user.DeviceBoolResponse,
					request,
					callback
				);
			}),
			"name",
			{ value: "DeregisterDevice" }
		);

		/**
		 * Calls DeregisterDevice.
		 * @function deregisterDevice
		 * @memberof user.UserService
		 * @instance
		 * @param {user.IDeviceInfo} request DeviceInfo message or plain object
		 * @returns {Promise<user.DeviceBoolResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link user.UserService#registerDeviceForVoip}.
		 * @memberof user.UserService
		 * @typedef RegisterDeviceForVoipCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {user.DeviceBoolResponse} [response] DeviceBoolResponse
		 */

		/**
		 * Calls RegisterDeviceForVoip.
		 * @function registerDeviceForVoip
		 * @memberof user.UserService
		 * @instance
		 * @param {user.IDeviceInfo} request DeviceInfo message or plain object
		 * @param {user.UserService.RegisterDeviceForVoipCallback} callback Node-style callback called with the error, if any, and DeviceBoolResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(UserService.prototype.registerDeviceForVoip =
				function registerDeviceForVoip(request, callback) {
					return this.rpcCall(
						registerDeviceForVoip,
						$root.user.DeviceInfo,
						$root.user.DeviceBoolResponse,
						request,
						callback
					);
				}),
			"name",
			{ value: "RegisterDeviceForVoip" }
		);

		/**
		 * Calls RegisterDeviceForVoip.
		 * @function registerDeviceForVoip
		 * @memberof user.UserService
		 * @instance
		 * @param {user.IDeviceInfo} request DeviceInfo message or plain object
		 * @returns {Promise<user.DeviceBoolResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link user.UserService#deregisterDeviceForVoip}.
		 * @memberof user.UserService
		 * @typedef DeregisterDeviceForVoipCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {user.DeviceBoolResponse} [response] DeviceBoolResponse
		 */

		/**
		 * Calls DeregisterDeviceForVoip.
		 * @function deregisterDeviceForVoip
		 * @memberof user.UserService
		 * @instance
		 * @param {user.IDeviceInfo} request DeviceInfo message or plain object
		 * @param {user.UserService.DeregisterDeviceForVoipCallback} callback Node-style callback called with the error, if any, and DeviceBoolResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(UserService.prototype.deregisterDeviceForVoip =
				function deregisterDeviceForVoip(request, callback) {
					return this.rpcCall(
						deregisterDeviceForVoip,
						$root.user.DeviceInfo,
						$root.user.DeviceBoolResponse,
						request,
						callback
					);
				}),
			"name",
			{ value: "DeregisterDeviceForVoip" }
		);

		/**
		 * Calls DeregisterDeviceForVoip.
		 * @function deregisterDeviceForVoip
		 * @memberof user.UserService
		 * @instance
		 * @param {user.IDeviceInfo} request DeviceInfo message or plain object
		 * @returns {Promise<user.DeviceBoolResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link user.UserService#getUserBalance}.
		 * @memberof user.UserService
		 * @typedef GetUserBalanceCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {user.UserBalanceResponse} [response] UserBalanceResponse
		 */

		/**
		 * Calls GetUserBalance.
		 * @function getUserBalance
		 * @memberof user.UserService
		 * @instance
		 * @param {commonmessages.IEmpty} request Empty message or plain object
		 * @param {user.UserService.GetUserBalanceCallback} callback Node-style callback called with the error, if any, and UserBalanceResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(UserService.prototype.getUserBalance = function getUserBalance(
				request,
				callback
			) {
				return this.rpcCall(
					getUserBalance,
					$root.commonmessages.Empty,
					$root.user.UserBalanceResponse,
					request,
					callback
				);
			}),
			"name",
			{ value: "GetUserBalance" }
		);

		/**
		 * Calls GetUserBalance.
		 * @function getUserBalance
		 * @memberof user.UserService
		 * @instance
		 * @param {commonmessages.IEmpty} request Empty message or plain object
		 * @returns {Promise<user.UserBalanceResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link user.UserService#getTwilioIceServers}.
		 * @memberof user.UserService
		 * @typedef GetTwilioIceServersCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {user.TwilioIceServersResponse} [response] TwilioIceServersResponse
		 */

		/**
		 * Calls GetTwilioIceServers.
		 * @function getTwilioIceServers
		 * @memberof user.UserService
		 * @instance
		 * @param {commonmessages.IEmpty} request Empty message or plain object
		 * @param {user.UserService.GetTwilioIceServersCallback} callback Node-style callback called with the error, if any, and TwilioIceServersResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(UserService.prototype.getTwilioIceServers = function getTwilioIceServers(
				request,
				callback
			) {
				return this.rpcCall(
					getTwilioIceServers,
					$root.commonmessages.Empty,
					$root.user.TwilioIceServersResponse,
					request,
					callback
				);
			}),
			"name",
			{ value: "GetTwilioIceServers" }
		);

		/**
		 * Calls GetTwilioIceServers.
		 * @function getTwilioIceServers
		 * @memberof user.UserService
		 * @instance
		 * @param {commonmessages.IEmpty} request Empty message or plain object
		 * @returns {Promise<user.TwilioIceServersResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link user.UserService#preConnectCallCheck}.
		 * @memberof user.UserService
		 * @typedef PreConnectCallCheckCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {user.PreConnectCallCheckResponse} [response] PreConnectCallCheckResponse
		 */

		/**
		 * Calls PreConnectCallCheck.
		 * @function preConnectCallCheck
		 * @memberof user.UserService
		 * @instance
		 * @param {user.IPreConnectCallCheckInput} request PreConnectCallCheckInput message or plain object
		 * @param {user.UserService.PreConnectCallCheckCallback} callback Node-style callback called with the error, if any, and PreConnectCallCheckResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(UserService.prototype.preConnectCallCheck = function preConnectCallCheck(
				request,
				callback
			) {
				return this.rpcCall(
					preConnectCallCheck,
					$root.user.PreConnectCallCheckInput,
					$root.user.PreConnectCallCheckResponse,
					request,
					callback
				);
			}),
			"name",
			{ value: "PreConnectCallCheck" }
		);

		/**
		 * Calls PreConnectCallCheck.
		 * @function preConnectCallCheck
		 * @memberof user.UserService
		 * @instance
		 * @param {user.IPreConnectCallCheckInput} request PreConnectCallCheckInput message or plain object
		 * @returns {Promise<user.PreConnectCallCheckResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link user.UserService#getAppBroadcastMessages}.
		 * @memberof user.UserService
		 * @typedef GetAppBroadcastMessagesCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {user.AppBroadcastMessagesResponse} [response] AppBroadcastMessagesResponse
		 */

		/**
		 * Calls GetAppBroadcastMessages.
		 * @function getAppBroadcastMessages
		 * @memberof user.UserService
		 * @instance
		 * @param {commonmessages.IEmpty} request Empty message or plain object
		 * @param {user.UserService.GetAppBroadcastMessagesCallback} callback Node-style callback called with the error, if any, and AppBroadcastMessagesResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(UserService.prototype.getAppBroadcastMessages =
				function getAppBroadcastMessages(request, callback) {
					return this.rpcCall(
						getAppBroadcastMessages,
						$root.commonmessages.Empty,
						$root.user.AppBroadcastMessagesResponse,
						request,
						callback
					);
				}),
			"name",
			{ value: "GetAppBroadcastMessages" }
		);

		/**
		 * Calls GetAppBroadcastMessages.
		 * @function getAppBroadcastMessages
		 * @memberof user.UserService
		 * @instance
		 * @param {commonmessages.IEmpty} request Empty message or plain object
		 * @returns {Promise<user.AppBroadcastMessagesResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link user.UserService#postPaidUserCallsCheck}.
		 * @memberof user.UserService
		 * @typedef PostPaidUserCallsCheckCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {user.PostPaidUserCallsCheckResponse} [response] PostPaidUserCallsCheckResponse
		 */

		/**
		 * Calls PostPaidUserCallsCheck.
		 * @function postPaidUserCallsCheck
		 * @memberof user.UserService
		 * @instance
		 * @param {commonmessages.IEmpty} request Empty message or plain object
		 * @param {user.UserService.PostPaidUserCallsCheckCallback} callback Node-style callback called with the error, if any, and PostPaidUserCallsCheckResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(UserService.prototype.postPaidUserCallsCheck =
				function postPaidUserCallsCheck(request, callback) {
					return this.rpcCall(
						postPaidUserCallsCheck,
						$root.commonmessages.Empty,
						$root.user.PostPaidUserCallsCheckResponse,
						request,
						callback
					);
				}),
			"name",
			{ value: "PostPaidUserCallsCheck" }
		);

		/**
		 * Calls PostPaidUserCallsCheck.
		 * @function postPaidUserCallsCheck
		 * @memberof user.UserService
		 * @instance
		 * @param {commonmessages.IEmpty} request Empty message or plain object
		 * @returns {Promise<user.PostPaidUserCallsCheckResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link user.UserService#sendVoipPushNotification}.
		 * @memberof user.UserService
		 * @typedef SendVoipPushNotificationCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {user.VoipPushResponse} [response] VoipPushResponse
		 */

		/**
		 * Calls SendVoipPushNotification.
		 * @function sendVoipPushNotification
		 * @memberof user.UserService
		 * @instance
		 * @param {user.IVoipPushInput} request VoipPushInput message or plain object
		 * @param {user.UserService.SendVoipPushNotificationCallback} callback Node-style callback called with the error, if any, and VoipPushResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(UserService.prototype.sendVoipPushNotification =
				function sendVoipPushNotification(request, callback) {
					return this.rpcCall(
						sendVoipPushNotification,
						$root.user.VoipPushInput,
						$root.user.VoipPushResponse,
						request,
						callback
					);
				}),
			"name",
			{ value: "SendVoipPushNotification" }
		);

		/**
		 * Calls SendVoipPushNotification.
		 * @function sendVoipPushNotification
		 * @memberof user.UserService
		 * @instance
		 * @param {user.IVoipPushInput} request VoipPushInput message or plain object
		 * @returns {Promise<user.VoipPushResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link user.UserService#setUserAvailableForCall}.
		 * @memberof user.UserService
		 * @typedef SetUserAvailableForCallCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {commonmessages.Empty} [response] Empty
		 */

		/**
		 * Calls SetUserAvailableForCall.
		 * @function setUserAvailableForCall
		 * @memberof user.UserService
		 * @instance
		 * @param {commonmessages.IEmpty} request Empty message or plain object
		 * @param {user.UserService.SetUserAvailableForCallCallback} callback Node-style callback called with the error, if any, and Empty
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(UserService.prototype.setUserAvailableForCall =
				function setUserAvailableForCall(request, callback) {
					return this.rpcCall(
						setUserAvailableForCall,
						$root.commonmessages.Empty,
						$root.commonmessages.Empty,
						request,
						callback
					);
				}),
			"name",
			{ value: "SetUserAvailableForCall" }
		);

		/**
		 * Calls SetUserAvailableForCall.
		 * @function setUserAvailableForCall
		 * @memberof user.UserService
		 * @instance
		 * @param {commonmessages.IEmpty} request Empty message or plain object
		 * @returns {Promise<commonmessages.Empty>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link user.UserService#getSystemBots}.
		 * @memberof user.UserService
		 * @typedef GetSystemBotsCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {user.SystemBotsResponse} [response] SystemBotsResponse
		 */

		/**
		 * Calls GetSystemBots.
		 * @function getSystemBots
		 * @memberof user.UserService
		 * @instance
		 * @param {commonmessages.IEmpty} request Empty message or plain object
		 * @param {user.UserService.GetSystemBotsCallback} callback Node-style callback called with the error, if any, and SystemBotsResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(UserService.prototype.getSystemBots = function getSystemBots(
				request,
				callback
			) {
				return this.rpcCall(
					getSystemBots,
					$root.commonmessages.Empty,
					$root.user.SystemBotsResponse,
					request,
					callback
				);
			}),
			"name",
			{ value: "GetSystemBots" }
		);

		/**
		 * Calls GetSystemBots.
		 * @function getSystemBots
		 * @memberof user.UserService
		 * @instance
		 * @param {commonmessages.IEmpty} request Empty message or plain object
		 * @returns {Promise<user.SystemBotsResponse>} Promise
		 * @variation 2
		 */

		return UserService;
	})();

	user.User = (function () {
		/**
		 * Properties of a User.
		 * @memberof user
		 * @interface IUser
		 * @property {string|null} [userName] User userName
		 * @property {string|null} [emailAddress] User emailAddress
		 * @property {commonmessages.IPhoneNumbers|null} [phoneNumbers] User phoneNumbers
		 * @property {boolean|null} [searchable] User searchable
		 * @property {boolean|null} [visible] User visible
		 * @property {string|null} [userId] User userId
		 * @property {string|null} [companyId] User companyId
		 * @property {string|null} [userCompanyName] User userCompanyName
		 * @property {commonmessages.IUserAddress|null} [address] User address
		 * @property {string|null} [userTimezone] User userTimezone
		 * @property {boolean|null} [lowBandwidthCalls] User lowBandwidthCalls
		 */

		/**
		 * Constructs a new User.
		 * @memberof user
		 * @classdesc Represents a User.
		 * @implements IUser
		 * @constructor
		 * @param {user.IUser=} [properties] Properties to set
		 */
		function User(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * User userName.
		 * @member {string} userName
		 * @memberof user.User
		 * @instance
		 */
		User.prototype.userName = "";

		/**
		 * User emailAddress.
		 * @member {string} emailAddress
		 * @memberof user.User
		 * @instance
		 */
		User.prototype.emailAddress = "";

		/**
		 * User phoneNumbers.
		 * @member {commonmessages.IPhoneNumbers|null|undefined} phoneNumbers
		 * @memberof user.User
		 * @instance
		 */
		User.prototype.phoneNumbers = null;

		/**
		 * User searchable.
		 * @member {boolean} searchable
		 * @memberof user.User
		 * @instance
		 */
		User.prototype.searchable = false;

		/**
		 * User visible.
		 * @member {boolean} visible
		 * @memberof user.User
		 * @instance
		 */
		User.prototype.visible = false;

		/**
		 * User userId.
		 * @member {string} userId
		 * @memberof user.User
		 * @instance
		 */
		User.prototype.userId = "";

		/**
		 * User companyId.
		 * @member {string} companyId
		 * @memberof user.User
		 * @instance
		 */
		User.prototype.companyId = "";

		/**
		 * User userCompanyName.
		 * @member {string} userCompanyName
		 * @memberof user.User
		 * @instance
		 */
		User.prototype.userCompanyName = "";

		/**
		 * User address.
		 * @member {commonmessages.IUserAddress|null|undefined} address
		 * @memberof user.User
		 * @instance
		 */
		User.prototype.address = null;

		/**
		 * User userTimezone.
		 * @member {string} userTimezone
		 * @memberof user.User
		 * @instance
		 */
		User.prototype.userTimezone = "";

		/**
		 * User lowBandwidthCalls.
		 * @member {boolean} lowBandwidthCalls
		 * @memberof user.User
		 * @instance
		 */
		User.prototype.lowBandwidthCalls = false;

		/**
		 * Creates a new User instance using the specified properties.
		 * @function create
		 * @memberof user.User
		 * @static
		 * @param {user.IUser=} [properties] Properties to set
		 * @returns {user.User} User instance
		 */
		User.create = function create(properties) {
			return new User(properties);
		};

		/**
		 * Encodes the specified User message. Does not implicitly {@link user.User.verify|verify} messages.
		 * @function encode
		 * @memberof user.User
		 * @static
		 * @param {user.IUser} message User message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		User.encode = function encode(message, writer) {
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
				message.searchable !== null &&
				Object.hasOwnProperty.call(message, "searchable")
			)
				writer.uint32(/* id 4, wireType 0 =*/ 32).bool(message.searchable);
			if (
				message.visible !== null &&
				Object.hasOwnProperty.call(message, "visible")
			)
				writer.uint32(/* id 5, wireType 0 =*/ 40).bool(message.visible);
			if (
				message.userId !== null &&
				Object.hasOwnProperty.call(message, "userId")
			)
				writer.uint32(/* id 6, wireType 2 =*/ 50).string(message.userId);
			if (
				message.companyId !== null &&
				Object.hasOwnProperty.call(message, "companyId")
			)
				writer.uint32(/* id 7, wireType 2 =*/ 58).string(message.companyId);
			if (
				message.userCompanyName !== null &&
				Object.hasOwnProperty.call(message, "userCompanyName")
			)
				writer
					.uint32(/* id 8, wireType 2 =*/ 66)
					.string(message.userCompanyName);
			if (
				message.address !== null &&
				Object.hasOwnProperty.call(message, "address")
			)
				$root.commonmessages.UserAddress.encode(
					message.address,
					writer.uint32(/* id 9, wireType 2 =*/ 74).fork()
				).ldelim();
			if (
				message.userTimezone !== null &&
				Object.hasOwnProperty.call(message, "userTimezone")
			)
				writer.uint32(/* id 10, wireType 2 =*/ 82).string(message.userTimezone);
			if (
				message.lowBandwidthCalls !== null &&
				Object.hasOwnProperty.call(message, "lowBandwidthCalls")
			)
				writer
					.uint32(/* id 11, wireType 0 =*/ 88)
					.bool(message.lowBandwidthCalls);
			return writer;
		};

		/**
		 * Encodes the specified User message, length delimited. Does not implicitly {@link user.User.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof user.User
		 * @static
		 * @param {user.IUser} message User message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		User.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a User message from the specified reader or buffer.
		 * @function decode
		 * @memberof user.User
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {user.User} User
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		User.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.user.User();
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
						message.searchable = reader.bool();
						break;
					case 5:
						message.visible = reader.bool();
						break;
					case 6:
						message.userId = reader.string();
						break;
					case 7:
						message.companyId = reader.string();
						break;
					case 8:
						message.userCompanyName = reader.string();
						break;
					case 9:
						message.address = $root.commonmessages.UserAddress.decode(
							reader,
							reader.uint32()
						);
						break;
					case 10:
						message.userTimezone = reader.string();
						break;
					case 11:
						message.lowBandwidthCalls = reader.bool();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a User message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof user.User
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {user.User} User
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		User.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a User message.
		 * @function verify
		 * @memberof user.User
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		User.verify = function verify(message) {
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
			if (message.searchable !== null && message.hasOwnProperty("searchable"))
				if (typeof message.searchable !== "boolean")
					return "searchable: boolean expected";
			if (message.visible !== null && message.hasOwnProperty("visible"))
				if (typeof message.visible !== "boolean")
					return "visible: boolean expected";
			if (message.userId !== null && message.hasOwnProperty("userId"))
				if (!$util.isString(message.userId)) return "userId: string expected";
			if (message.companyId !== null && message.hasOwnProperty("companyId"))
				if (!$util.isString(message.companyId))
					return "companyId: string expected";
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
			if (
				message.userTimezone !== null &&
				message.hasOwnProperty("userTimezone")
			)
				if (!$util.isString(message.userTimezone))
					return "userTimezone: string expected";
			if (
				message.lowBandwidthCalls !== null &&
				message.hasOwnProperty("lowBandwidthCalls")
			)
				if (typeof message.lowBandwidthCalls !== "boolean")
					return "lowBandwidthCalls: boolean expected";
			return null;
		};

		/**
		 * Creates a User message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof user.User
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {user.User} User
		 */
		User.fromObject = function fromObject(object) {
			if (object instanceof $root.user.User) return object;
			var message = new $root.user.User();
			if (object.userName !== null) message.userName = String(object.userName);
			if (object.emailAddress !== null)
				message.emailAddress = String(object.emailAddress);
			if (object.phoneNumbers !== null) {
				if (typeof object.phoneNumbers !== "object")
					throw TypeError(".user.User.phoneNumbers: object expected");
				message.phoneNumbers = $root.commonmessages.PhoneNumbers.fromObject(
					object.phoneNumbers
				);
			}
			if (object.searchable !== null)
				message.searchable = Boolean(object.searchable);
			if (object.visible !== null) message.visible = Boolean(object.visible);
			if (object.userId !== null) message.userId = String(object.userId);
			if (object.companyId !== null)
				message.companyId = String(object.companyId);
			if (object.userCompanyName !== null)
				message.userCompanyName = String(object.userCompanyName);
			if (object.address !== null) {
				if (typeof object.address !== "object")
					throw TypeError(".user.User.address: object expected");
				message.address = $root.commonmessages.UserAddress.fromObject(
					object.address
				);
			}
			if (object.userTimezone !== null)
				message.userTimezone = String(object.userTimezone);
			if (object.lowBandwidthCalls !== null)
				message.lowBandwidthCalls = Boolean(object.lowBandwidthCalls);
			return message;
		};

		/**
		 * Creates a plain object from a User message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof user.User
		 * @static
		 * @param {user.User} message User
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		User.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.userName = "";
				object.emailAddress = "";
				object.phoneNumbers = null;
				object.searchable = false;
				object.visible = false;
				object.userId = "";
				object.companyId = "";
				object.userCompanyName = "";
				object.address = null;
				object.userTimezone = "";
				object.lowBandwidthCalls = false;
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
			if (message.searchable !== null && message.hasOwnProperty("searchable"))
				object.searchable = message.searchable;
			if (message.visible !== null && message.hasOwnProperty("visible"))
				object.visible = message.visible;
			if (message.userId !== null && message.hasOwnProperty("userId"))
				object.userId = message.userId;
			if (message.companyId !== null && message.hasOwnProperty("companyId"))
				object.companyId = message.companyId;
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
			if (
				message.userTimezone !== null &&
				message.hasOwnProperty("userTimezone")
			)
				object.userTimezone = message.userTimezone;
			if (
				message.lowBandwidthCalls !== null &&
				message.hasOwnProperty("lowBandwidthCalls")
			)
				object.lowBandwidthCalls = message.lowBandwidthCalls;
			return object;
		};

		/**
		 * Converts this User to JSON.
		 * @function toJSON
		 * @memberof user.User
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		User.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return User;
	})();

	user.UpdateUserProfileResponse = (function () {
		/**
		 * Properties of an UpdateUserProfileResponse.
		 * @memberof user
		 * @interface IUpdateUserProfileResponse
		 * @property {number|null} [error] UpdateUserProfileResponse error
		 * @property {Array.<boolean>|null} [content] UpdateUserProfileResponse content
		 */

		/**
		 * Constructs a new UpdateUserProfileResponse.
		 * @memberof user
		 * @classdesc Represents an UpdateUserProfileResponse.
		 * @implements IUpdateUserProfileResponse
		 * @constructor
		 * @param {user.IUpdateUserProfileResponse=} [properties] Properties to set
		 */
		function UpdateUserProfileResponse(properties) {
			this.content = [];
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * UpdateUserProfileResponse error.
		 * @member {number} error
		 * @memberof user.UpdateUserProfileResponse
		 * @instance
		 */
		UpdateUserProfileResponse.prototype.error = 0;

		/**
		 * UpdateUserProfileResponse content.
		 * @member {Array.<boolean>} content
		 * @memberof user.UpdateUserProfileResponse
		 * @instance
		 */
		UpdateUserProfileResponse.prototype.content = $util.emptyArray;

		/**
		 * Creates a new UpdateUserProfileResponse instance using the specified properties.
		 * @function create
		 * @memberof user.UpdateUserProfileResponse
		 * @static
		 * @param {user.IUpdateUserProfileResponse=} [properties] Properties to set
		 * @returns {user.UpdateUserProfileResponse} UpdateUserProfileResponse instance
		 */
		UpdateUserProfileResponse.create = function create(properties) {
			return new UpdateUserProfileResponse(properties);
		};

		/**
		 * Encodes the specified UpdateUserProfileResponse message. Does not implicitly {@link user.UpdateUserProfileResponse.verify|verify} messages.
		 * @function encode
		 * @memberof user.UpdateUserProfileResponse
		 * @static
		 * @param {user.IUpdateUserProfileResponse} message UpdateUserProfileResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		UpdateUserProfileResponse.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.error !== null &&
				Object.hasOwnProperty.call(message, "error")
			)
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
		 * Encodes the specified UpdateUserProfileResponse message, length delimited. Does not implicitly {@link user.UpdateUserProfileResponse.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof user.UpdateUserProfileResponse
		 * @static
		 * @param {user.IUpdateUserProfileResponse} message UpdateUserProfileResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		UpdateUserProfileResponse.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes an UpdateUserProfileResponse message from the specified reader or buffer.
		 * @function decode
		 * @memberof user.UpdateUserProfileResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {user.UpdateUserProfileResponse} UpdateUserProfileResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		UpdateUserProfileResponse.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.user.UpdateUserProfileResponse();
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
		 * Decodes an UpdateUserProfileResponse message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof user.UpdateUserProfileResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {user.UpdateUserProfileResponse} UpdateUserProfileResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		UpdateUserProfileResponse.decodeDelimited = function decodeDelimited(
			reader
		) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies an UpdateUserProfileResponse message.
		 * @function verify
		 * @memberof user.UpdateUserProfileResponse
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		UpdateUserProfileResponse.verify = function verify(message) {
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
		 * Creates an UpdateUserProfileResponse message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof user.UpdateUserProfileResponse
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {user.UpdateUserProfileResponse} UpdateUserProfileResponse
		 */
		UpdateUserProfileResponse.fromObject = function fromObject(object) {
			if (object instanceof $root.user.UpdateUserProfileResponse) return object;
			var message = new $root.user.UpdateUserProfileResponse();
			if (object.error !== null) message.error = object.error | 0;
			if (object.content) {
				if (!Array.isArray(object.content))
					throw TypeError(
						".user.UpdateUserProfileResponse.content: array expected"
					);
				message.content = [];
				for (var i = 0; i < object.content.length; ++i)
					message.content[i] = Boolean(object.content[i]);
			}
			return message;
		};

		/**
		 * Creates a plain object from an UpdateUserProfileResponse message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof user.UpdateUserProfileResponse
		 * @static
		 * @param {user.UpdateUserProfileResponse} message UpdateUserProfileResponse
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		UpdateUserProfileResponse.toObject = function toObject(message, options) {
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
		 * Converts this UpdateUserProfileResponse to JSON.
		 * @function toJSON
		 * @memberof user.UpdateUserProfileResponse
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		UpdateUserProfileResponse.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return UpdateUserProfileResponse;
	})();

	user.SystemBotsResponse = (function () {
		/**
		 * Properties of a SystemBotsResponse.
		 * @memberof user
		 * @interface ISystemBotsResponse
		 * @property {number|null} [error] SystemBotsResponse error
		 * @property {user.ISystemBotsData|null} [content] SystemBotsResponse content
		 */

		/**
		 * Constructs a new SystemBotsResponse.
		 * @memberof user
		 * @classdesc Represents a SystemBotsResponse.
		 * @implements ISystemBotsResponse
		 * @constructor
		 * @param {user.ISystemBotsResponse=} [properties] Properties to set
		 */
		function SystemBotsResponse(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * SystemBotsResponse error.
		 * @member {number} error
		 * @memberof user.SystemBotsResponse
		 * @instance
		 */
		SystemBotsResponse.prototype.error = 0;

		/**
		 * SystemBotsResponse content.
		 * @member {user.ISystemBotsData|null|undefined} content
		 * @memberof user.SystemBotsResponse
		 * @instance
		 */
		SystemBotsResponse.prototype.content = null;

		/**
		 * Creates a new SystemBotsResponse instance using the specified properties.
		 * @function create
		 * @memberof user.SystemBotsResponse
		 * @static
		 * @param {user.ISystemBotsResponse=} [properties] Properties to set
		 * @returns {user.SystemBotsResponse} SystemBotsResponse instance
		 */
		SystemBotsResponse.create = function create(properties) {
			return new SystemBotsResponse(properties);
		};

		/**
		 * Encodes the specified SystemBotsResponse message. Does not implicitly {@link user.SystemBotsResponse.verify|verify} messages.
		 * @function encode
		 * @memberof user.SystemBotsResponse
		 * @static
		 * @param {user.ISystemBotsResponse} message SystemBotsResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		SystemBotsResponse.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.error !== null &&
				Object.hasOwnProperty.call(message, "error")
			)
				writer.uint32(/* id 1, wireType 0 =*/ 8).int32(message.error);
			if (
				message.content !== null &&
				Object.hasOwnProperty.call(message, "content")
			)
				$root.user.SystemBotsData.encode(
					message.content,
					writer.uint32(/* id 2, wireType 2 =*/ 18).fork()
				).ldelim();
			return writer;
		};

		/**
		 * Encodes the specified SystemBotsResponse message, length delimited. Does not implicitly {@link user.SystemBotsResponse.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof user.SystemBotsResponse
		 * @static
		 * @param {user.ISystemBotsResponse} message SystemBotsResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		SystemBotsResponse.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a SystemBotsResponse message from the specified reader or buffer.
		 * @function decode
		 * @memberof user.SystemBotsResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {user.SystemBotsResponse} SystemBotsResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		SystemBotsResponse.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.user.SystemBotsResponse();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.error = reader.int32();
						break;
					case 2:
						message.content = $root.user.SystemBotsData.decode(
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
		 * Decodes a SystemBotsResponse message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof user.SystemBotsResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {user.SystemBotsResponse} SystemBotsResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		SystemBotsResponse.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a SystemBotsResponse message.
		 * @function verify
		 * @memberof user.SystemBotsResponse
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		SystemBotsResponse.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.error !== null && message.hasOwnProperty("error"))
				if (!$util.isInteger(message.error)) return "error: integer expected";
			if (message.content !== null && message.hasOwnProperty("content")) {
				var error = $root.user.SystemBotsData.verify(message.content);
				if (error) return "content." + error;
			}
			return null;
		};

		/**
		 * Creates a SystemBotsResponse message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof user.SystemBotsResponse
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {user.SystemBotsResponse} SystemBotsResponse
		 */
		SystemBotsResponse.fromObject = function fromObject(object) {
			if (object instanceof $root.user.SystemBotsResponse) return object;
			var message = new $root.user.SystemBotsResponse();
			if (object.error !== null) message.error = object.error | 0;
			if (object.content !== null) {
				if (typeof object.content !== "object")
					throw TypeError(".user.SystemBotsResponse.content: object expected");
				message.content = $root.user.SystemBotsData.fromObject(object.content);
			}
			return message;
		};

		/**
		 * Creates a plain object from a SystemBotsResponse message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof user.SystemBotsResponse
		 * @static
		 * @param {user.SystemBotsResponse} message SystemBotsResponse
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		SystemBotsResponse.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.error = 0;
				object.content = null;
			}
			if (message.error !== null && message.hasOwnProperty("error"))
				object.error = message.error;
			if (message.content !== null && message.hasOwnProperty("content"))
				object.content = $root.user.SystemBotsData.toObject(
					message.content,
					options
				);
			return object;
		};

		/**
		 * Converts this SystemBotsResponse to JSON.
		 * @function toJSON
		 * @memberof user.SystemBotsResponse
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		SystemBotsResponse.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return SystemBotsResponse;
	})();

	user.SystemBotsData = (function () {
		/**
		 * Properties of a SystemBotsData.
		 * @memberof user
		 * @interface ISystemBotsData
		 * @property {number|null} [error] SystemBotsData error
		 * @property {Array.<user.ISubscribedBots>|null} [Items] SystemBotsData Items
		 */

		/**
		 * Constructs a new SystemBotsData.
		 * @memberof user
		 * @classdesc Represents a SystemBotsData.
		 * @implements ISystemBotsData
		 * @constructor
		 * @param {user.ISystemBotsData=} [properties] Properties to set
		 */
		function SystemBotsData(properties) {
			this.Items = [];
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * SystemBotsData error.
		 * @member {number} error
		 * @memberof user.SystemBotsData
		 * @instance
		 */
		SystemBotsData.prototype.error = 0;

		/**
		 * SystemBotsData Items.
		 * @member {Array.<user.ISubscribedBots>} Items
		 * @memberof user.SystemBotsData
		 * @instance
		 */
		SystemBotsData.prototype.Items = $util.emptyArray;

		/**
		 * Creates a new SystemBotsData instance using the specified properties.
		 * @function create
		 * @memberof user.SystemBotsData
		 * @static
		 * @param {user.ISystemBotsData=} [properties] Properties to set
		 * @returns {user.SystemBotsData} SystemBotsData instance
		 */
		SystemBotsData.create = function create(properties) {
			return new SystemBotsData(properties);
		};

		/**
		 * Encodes the specified SystemBotsData message. Does not implicitly {@link user.SystemBotsData.verify|verify} messages.
		 * @function encode
		 * @memberof user.SystemBotsData
		 * @static
		 * @param {user.ISystemBotsData} message SystemBotsData message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		SystemBotsData.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.error !== null &&
				Object.hasOwnProperty.call(message, "error")
			)
				writer.uint32(/* id 1, wireType 0 =*/ 8).int32(message.error);
			if (message.Items !== null && message.Items.length)
				for (var i = 0; i < message.Items.length; ++i)
					$root.user.SubscribedBots.encode(
						message.Items[i],
						writer.uint32(/* id 2, wireType 2 =*/ 18).fork()
					).ldelim();
			return writer;
		};

		/**
		 * Encodes the specified SystemBotsData message, length delimited. Does not implicitly {@link user.SystemBotsData.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof user.SystemBotsData
		 * @static
		 * @param {user.ISystemBotsData} message SystemBotsData message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		SystemBotsData.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a SystemBotsData message from the specified reader or buffer.
		 * @function decode
		 * @memberof user.SystemBotsData
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {user.SystemBotsData} SystemBotsData
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		SystemBotsData.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.user.SystemBotsData();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.error = reader.int32();
						break;
					case 2:
						if (!(message.Items && message.Items.length)) message.Items = [];
						message.Items.push(
							$root.user.SubscribedBots.decode(reader, reader.uint32())
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
		 * Decodes a SystemBotsData message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof user.SystemBotsData
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {user.SystemBotsData} SystemBotsData
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		SystemBotsData.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a SystemBotsData message.
		 * @function verify
		 * @memberof user.SystemBotsData
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		SystemBotsData.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.error !== null && message.hasOwnProperty("error"))
				if (!$util.isInteger(message.error)) return "error: integer expected";
			if (message.Items !== null && message.hasOwnProperty("Items")) {
				if (!Array.isArray(message.Items)) return "Items: array expected";
				for (var i = 0; i < message.Items.length; ++i) {
					var error = $root.user.SubscribedBots.verify(message.Items[i]);
					if (error) return "Items." + error;
				}
			}
			return null;
		};

		/**
		 * Creates a SystemBotsData message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof user.SystemBotsData
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {user.SystemBotsData} SystemBotsData
		 */
		SystemBotsData.fromObject = function fromObject(object) {
			if (object instanceof $root.user.SystemBotsData) return object;
			var message = new $root.user.SystemBotsData();
			if (object.error !== null) message.error = object.error | 0;
			if (object.Items) {
				if (!Array.isArray(object.Items))
					throw TypeError(".user.SystemBotsData.Items: array expected");
				message.Items = [];
				for (var i = 0; i < object.Items.length; ++i) {
					if (typeof object.Items[i] !== "object")
						throw TypeError(".user.SystemBotsData.Items: object expected");
					message.Items[i] = $root.user.SubscribedBots.fromObject(
						object.Items[i]
					);
				}
			}
			return message;
		};

		/**
		 * Creates a plain object from a SystemBotsData message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof user.SystemBotsData
		 * @static
		 * @param {user.SystemBotsData} message SystemBotsData
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		SystemBotsData.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.arrays || options.defaults) object.Items = [];
			if (options.defaults) object.error = 0;
			if (message.error !== null && message.hasOwnProperty("error"))
				object.error = message.error;
			if (message.Items && message.Items.length) {
				object.Items = [];
				for (var j = 0; j < message.Items.length; ++j)
					object.Items[j] = $root.user.SubscribedBots.toObject(
						message.Items[j],
						options
					);
			}
			return object;
		};

		/**
		 * Converts this SystemBotsData to JSON.
		 * @function toJSON
		 * @memberof user.SystemBotsData
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		SystemBotsData.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return SystemBotsData;
	})();

	user.BotSubscriptionsResponse = (function () {
		/**
		 * Properties of a BotSubscriptionsResponse.
		 * @memberof user
		 * @interface IBotSubscriptionsResponse
		 * @property {number|null} [error] BotSubscriptionsResponse error
		 * @property {user.ISubscribedBotsContent|null} [content] BotSubscriptionsResponse content
		 */

		/**
		 * Constructs a new BotSubscriptionsResponse.
		 * @memberof user
		 * @classdesc Represents a BotSubscriptionsResponse.
		 * @implements IBotSubscriptionsResponse
		 * @constructor
		 * @param {user.IBotSubscriptionsResponse=} [properties] Properties to set
		 */
		function BotSubscriptionsResponse(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * BotSubscriptionsResponse error.
		 * @member {number} error
		 * @memberof user.BotSubscriptionsResponse
		 * @instance
		 */
		BotSubscriptionsResponse.prototype.error = 0;

		/**
		 * BotSubscriptionsResponse content.
		 * @member {user.ISubscribedBotsContent|null|undefined} content
		 * @memberof user.BotSubscriptionsResponse
		 * @instance
		 */
		BotSubscriptionsResponse.prototype.content = null;

		/**
		 * Creates a new BotSubscriptionsResponse instance using the specified properties.
		 * @function create
		 * @memberof user.BotSubscriptionsResponse
		 * @static
		 * @param {user.IBotSubscriptionsResponse=} [properties] Properties to set
		 * @returns {user.BotSubscriptionsResponse} BotSubscriptionsResponse instance
		 */
		BotSubscriptionsResponse.create = function create(properties) {
			return new BotSubscriptionsResponse(properties);
		};

		/**
		 * Encodes the specified BotSubscriptionsResponse message. Does not implicitly {@link user.BotSubscriptionsResponse.verify|verify} messages.
		 * @function encode
		 * @memberof user.BotSubscriptionsResponse
		 * @static
		 * @param {user.IBotSubscriptionsResponse} message BotSubscriptionsResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		BotSubscriptionsResponse.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.error !== null &&
				Object.hasOwnProperty.call(message, "error")
			)
				writer.uint32(/* id 1, wireType 0 =*/ 8).int32(message.error);
			if (
				message.content !== null &&
				Object.hasOwnProperty.call(message, "content")
			)
				$root.user.SubscribedBotsContent.encode(
					message.content,
					writer.uint32(/* id 2, wireType 2 =*/ 18).fork()
				).ldelim();
			return writer;
		};

		/**
		 * Encodes the specified BotSubscriptionsResponse message, length delimited. Does not implicitly {@link user.BotSubscriptionsResponse.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof user.BotSubscriptionsResponse
		 * @static
		 * @param {user.IBotSubscriptionsResponse} message BotSubscriptionsResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		BotSubscriptionsResponse.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a BotSubscriptionsResponse message from the specified reader or buffer.
		 * @function decode
		 * @memberof user.BotSubscriptionsResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {user.BotSubscriptionsResponse} BotSubscriptionsResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		BotSubscriptionsResponse.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.user.BotSubscriptionsResponse();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.error = reader.int32();
						break;
					case 2:
						message.content = $root.user.SubscribedBotsContent.decode(
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
		 * Decodes a BotSubscriptionsResponse message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof user.BotSubscriptionsResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {user.BotSubscriptionsResponse} BotSubscriptionsResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		BotSubscriptionsResponse.decodeDelimited = function decodeDelimited(
			reader
		) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a BotSubscriptionsResponse message.
		 * @function verify
		 * @memberof user.BotSubscriptionsResponse
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		BotSubscriptionsResponse.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.error !== null && message.hasOwnProperty("error"))
				if (!$util.isInteger(message.error)) return "error: integer expected";
			if (message.content !== null && message.hasOwnProperty("content")) {
				var error = $root.user.SubscribedBotsContent.verify(message.content);
				if (error) return "content." + error;
			}
			return null;
		};

		/**
		 * Creates a BotSubscriptionsResponse message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof user.BotSubscriptionsResponse
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {user.BotSubscriptionsResponse} BotSubscriptionsResponse
		 */
		BotSubscriptionsResponse.fromObject = function fromObject(object) {
			if (object instanceof $root.user.BotSubscriptionsResponse) return object;
			var message = new $root.user.BotSubscriptionsResponse();
			if (object.error !== null) message.error = object.error | 0;
			if (object.content !== null) {
				if (typeof object.content !== "object")
					throw TypeError(
						".user.BotSubscriptionsResponse.content: object expected"
					);
				message.content = $root.user.SubscribedBotsContent.fromObject(
					object.content
				);
			}
			return message;
		};

		/**
		 * Creates a plain object from a BotSubscriptionsResponse message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof user.BotSubscriptionsResponse
		 * @static
		 * @param {user.BotSubscriptionsResponse} message BotSubscriptionsResponse
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		BotSubscriptionsResponse.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.error = 0;
				object.content = null;
			}
			if (message.error !== null && message.hasOwnProperty("error"))
				object.error = message.error;
			if (message.content !== null && message.hasOwnProperty("content"))
				object.content = $root.user.SubscribedBotsContent.toObject(
					message.content,
					options
				);
			return object;
		};

		/**
		 * Converts this BotSubscriptionsResponse to JSON.
		 * @function toJSON
		 * @memberof user.BotSubscriptionsResponse
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		BotSubscriptionsResponse.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return BotSubscriptionsResponse;
	})();

	user.SubscribedBotsContent = (function () {
		/**
		 * Properties of a SubscribedBotsContent.
		 * @memberof user
		 * @interface ISubscribedBotsContent
		 * @property {Array.<string>|null} [subscribed] SubscribedBotsContent subscribed
		 * @property {Array.<string>|null} [favourites] SubscribedBotsContent favourites
		 */

		/**
		 * Constructs a new SubscribedBotsContent.
		 * @memberof user
		 * @classdesc Represents a SubscribedBotsContent.
		 * @implements ISubscribedBotsContent
		 * @constructor
		 * @param {user.ISubscribedBotsContent=} [properties] Properties to set
		 */
		function SubscribedBotsContent(properties) {
			this.subscribed = [];
			this.favourites = [];
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * SubscribedBotsContent subscribed.
		 * @member {Array.<string>} subscribed
		 * @memberof user.SubscribedBotsContent
		 * @instance
		 */
		SubscribedBotsContent.prototype.subscribed = $util.emptyArray;

		/**
		 * SubscribedBotsContent favourites.
		 * @member {Array.<string>} favourites
		 * @memberof user.SubscribedBotsContent
		 * @instance
		 */
		SubscribedBotsContent.prototype.favourites = $util.emptyArray;

		/**
		 * Creates a new SubscribedBotsContent instance using the specified properties.
		 * @function create
		 * @memberof user.SubscribedBotsContent
		 * @static
		 * @param {user.ISubscribedBotsContent=} [properties] Properties to set
		 * @returns {user.SubscribedBotsContent} SubscribedBotsContent instance
		 */
		SubscribedBotsContent.create = function create(properties) {
			return new SubscribedBotsContent(properties);
		};

		/**
		 * Encodes the specified SubscribedBotsContent message. Does not implicitly {@link user.SubscribedBotsContent.verify|verify} messages.
		 * @function encode
		 * @memberof user.SubscribedBotsContent
		 * @static
		 * @param {user.ISubscribedBotsContent} message SubscribedBotsContent message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		SubscribedBotsContent.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.subscribed !== null && message.subscribed.length)
				for (var i = 0; i < message.subscribed.length; ++i)
					writer
						.uint32(/* id 1, wireType 2 =*/ 10)
						.string(message.subscribed[i]);
			if (message.favourites !== null && message.favourites.length)
				for (var i = 0; i < message.favourites.length; ++i)
					writer
						.uint32(/* id 2, wireType 2 =*/ 18)
						.string(message.favourites[i]);
			return writer;
		};

		/**
		 * Encodes the specified SubscribedBotsContent message, length delimited. Does not implicitly {@link user.SubscribedBotsContent.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof user.SubscribedBotsContent
		 * @static
		 * @param {user.ISubscribedBotsContent} message SubscribedBotsContent message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		SubscribedBotsContent.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a SubscribedBotsContent message from the specified reader or buffer.
		 * @function decode
		 * @memberof user.SubscribedBotsContent
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {user.SubscribedBotsContent} SubscribedBotsContent
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		SubscribedBotsContent.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.user.SubscribedBotsContent();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						if (!(message.subscribed && message.subscribed.length))
							message.subscribed = [];
						message.subscribed.push(reader.string());
						break;
					case 2:
						if (!(message.favourites && message.favourites.length))
							message.favourites = [];
						message.favourites.push(reader.string());
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a SubscribedBotsContent message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof user.SubscribedBotsContent
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {user.SubscribedBotsContent} SubscribedBotsContent
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		SubscribedBotsContent.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a SubscribedBotsContent message.
		 * @function verify
		 * @memberof user.SubscribedBotsContent
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		SubscribedBotsContent.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.subscribed !== null && message.hasOwnProperty("subscribed")) {
				if (!Array.isArray(message.subscribed))
					return "subscribed: array expected";
				for (var i = 0; i < message.subscribed.length; ++i)
					if (!$util.isString(message.subscribed[i]))
						return "subscribed: string[] expected";
			}
			if (message.favourites !== null && message.hasOwnProperty("favourites")) {
				if (!Array.isArray(message.favourites))
					return "favourites: array expected";
				for (var i = 0; i < message.favourites.length; ++i)
					if (!$util.isString(message.favourites[i]))
						return "favourites: string[] expected";
			}
			return null;
		};

		/**
		 * Creates a SubscribedBotsContent message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof user.SubscribedBotsContent
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {user.SubscribedBotsContent} SubscribedBotsContent
		 */
		SubscribedBotsContent.fromObject = function fromObject(object) {
			if (object instanceof $root.user.SubscribedBotsContent) return object;
			var message = new $root.user.SubscribedBotsContent();
			if (object.subscribed) {
				if (!Array.isArray(object.subscribed))
					throw TypeError(
						".user.SubscribedBotsContent.subscribed: array expected"
					);
				message.subscribed = [];
				for (var i = 0; i < object.subscribed.length; ++i)
					message.subscribed[i] = String(object.subscribed[i]);
			}
			if (object.favourites) {
				if (!Array.isArray(object.favourites))
					throw TypeError(
						".user.SubscribedBotsContent.favourites: array expected"
					);
				message.favourites = [];
				for (var i = 0; i < object.favourites.length; ++i)
					message.favourites[i] = String(object.favourites[i]);
			}
			return message;
		};

		/**
		 * Creates a plain object from a SubscribedBotsContent message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof user.SubscribedBotsContent
		 * @static
		 * @param {user.SubscribedBotsContent} message SubscribedBotsContent
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		SubscribedBotsContent.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.arrays || options.defaults) {
				object.subscribed = [];
				object.favourites = [];
			}
			if (message.subscribed && message.subscribed.length) {
				object.subscribed = [];
				for (var j = 0; j < message.subscribed.length; ++j)
					object.subscribed[j] = message.subscribed[j];
			}
			if (message.favourites && message.favourites.length) {
				object.favourites = [];
				for (var j = 0; j < message.favourites.length; ++j)
					object.favourites[j] = message.favourites[j];
			}
			return object;
		};

		/**
		 * Converts this SubscribedBotsContent to JSON.
		 * @function toJSON
		 * @memberof user.SubscribedBotsContent
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		SubscribedBotsContent.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return SubscribedBotsContent;
	})();

	user.BotSubscriptionsInfoResponse = (function () {
		/**
		 * Properties of a BotSubscriptionsInfoResponse.
		 * @memberof user
		 * @interface IBotSubscriptionsInfoResponse
		 * @property {number|null} [error] BotSubscriptionsInfoResponse error
		 * @property {user.ISubscribedBotsInfoContent|null} [content] BotSubscriptionsInfoResponse content
		 */

		/**
		 * Constructs a new BotSubscriptionsInfoResponse.
		 * @memberof user
		 * @classdesc Represents a BotSubscriptionsInfoResponse.
		 * @implements IBotSubscriptionsInfoResponse
		 * @constructor
		 * @param {user.IBotSubscriptionsInfoResponse=} [properties] Properties to set
		 */
		function BotSubscriptionsInfoResponse(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * BotSubscriptionsInfoResponse error.
		 * @member {number} error
		 * @memberof user.BotSubscriptionsInfoResponse
		 * @instance
		 */
		BotSubscriptionsInfoResponse.prototype.error = 0;

		/**
		 * BotSubscriptionsInfoResponse content.
		 * @member {user.ISubscribedBotsInfoContent|null|undefined} content
		 * @memberof user.BotSubscriptionsInfoResponse
		 * @instance
		 */
		BotSubscriptionsInfoResponse.prototype.content = null;

		/**
		 * Creates a new BotSubscriptionsInfoResponse instance using the specified properties.
		 * @function create
		 * @memberof user.BotSubscriptionsInfoResponse
		 * @static
		 * @param {user.IBotSubscriptionsInfoResponse=} [properties] Properties to set
		 * @returns {user.BotSubscriptionsInfoResponse} BotSubscriptionsInfoResponse instance
		 */
		BotSubscriptionsInfoResponse.create = function create(properties) {
			return new BotSubscriptionsInfoResponse(properties);
		};

		/**
		 * Encodes the specified BotSubscriptionsInfoResponse message. Does not implicitly {@link user.BotSubscriptionsInfoResponse.verify|verify} messages.
		 * @function encode
		 * @memberof user.BotSubscriptionsInfoResponse
		 * @static
		 * @param {user.IBotSubscriptionsInfoResponse} message BotSubscriptionsInfoResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		BotSubscriptionsInfoResponse.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.error !== null &&
				Object.hasOwnProperty.call(message, "error")
			)
				writer.uint32(/* id 1, wireType 0 =*/ 8).int32(message.error);
			if (
				message.content !== null &&
				Object.hasOwnProperty.call(message, "content")
			)
				$root.user.SubscribedBotsInfoContent.encode(
					message.content,
					writer.uint32(/* id 2, wireType 2 =*/ 18).fork()
				).ldelim();
			return writer;
		};

		/**
		 * Encodes the specified BotSubscriptionsInfoResponse message, length delimited. Does not implicitly {@link user.BotSubscriptionsInfoResponse.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof user.BotSubscriptionsInfoResponse
		 * @static
		 * @param {user.IBotSubscriptionsInfoResponse} message BotSubscriptionsInfoResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		BotSubscriptionsInfoResponse.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a BotSubscriptionsInfoResponse message from the specified reader or buffer.
		 * @function decode
		 * @memberof user.BotSubscriptionsInfoResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {user.BotSubscriptionsInfoResponse} BotSubscriptionsInfoResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		BotSubscriptionsInfoResponse.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.user.BotSubscriptionsInfoResponse();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.error = reader.int32();
						break;
					case 2:
						message.content = $root.user.SubscribedBotsInfoContent.decode(
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
		 * Decodes a BotSubscriptionsInfoResponse message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof user.BotSubscriptionsInfoResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {user.BotSubscriptionsInfoResponse} BotSubscriptionsInfoResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		BotSubscriptionsInfoResponse.decodeDelimited = function decodeDelimited(
			reader
		) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a BotSubscriptionsInfoResponse message.
		 * @function verify
		 * @memberof user.BotSubscriptionsInfoResponse
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		BotSubscriptionsInfoResponse.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.error !== null && message.hasOwnProperty("error"))
				if (!$util.isInteger(message.error)) return "error: integer expected";
			if (message.content !== null && message.hasOwnProperty("content")) {
				var error = $root.user.SubscribedBotsInfoContent.verify(
					message.content
				);
				if (error) return "content." + error;
			}
			return null;
		};

		/**
		 * Creates a BotSubscriptionsInfoResponse message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof user.BotSubscriptionsInfoResponse
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {user.BotSubscriptionsInfoResponse} BotSubscriptionsInfoResponse
		 */
		BotSubscriptionsInfoResponse.fromObject = function fromObject(object) {
			if (object instanceof $root.user.BotSubscriptionsInfoResponse)
				return object;
			var message = new $root.user.BotSubscriptionsInfoResponse();
			if (object.error !== null) message.error = object.error | 0;
			if (object.content !== null) {
				if (typeof object.content !== "object")
					throw TypeError(
						".user.BotSubscriptionsInfoResponse.content: object expected"
					);
				message.content = $root.user.SubscribedBotsInfoContent.fromObject(
					object.content
				);
			}
			return message;
		};

		/**
		 * Creates a plain object from a BotSubscriptionsInfoResponse message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof user.BotSubscriptionsInfoResponse
		 * @static
		 * @param {user.BotSubscriptionsInfoResponse} message BotSubscriptionsInfoResponse
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		BotSubscriptionsInfoResponse.toObject = function toObject(
			message,
			options
		) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.error = 0;
				object.content = null;
			}
			if (message.error !== null && message.hasOwnProperty("error"))
				object.error = message.error;
			if (message.content !== null && message.hasOwnProperty("content"))
				object.content = $root.user.SubscribedBotsInfoContent.toObject(
					message.content,
					options
				);
			return object;
		};

		/**
		 * Converts this BotSubscriptionsInfoResponse to JSON.
		 * @function toJSON
		 * @memberof user.BotSubscriptionsInfoResponse
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		BotSubscriptionsInfoResponse.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return BotSubscriptionsInfoResponse;
	})();

	user.SubscribedBotsInfoContent = (function () {
		/**
		 * Properties of a SubscribedBotsInfoContent.
		 * @memberof user
		 * @interface ISubscribedBotsInfoContent
		 * @property {Array.<user.ISubscribedBots>|null} [subscribed] SubscribedBotsInfoContent subscribed
		 * @property {Array.<user.ISubscribedBots>|null} [favourites] SubscribedBotsInfoContent favourites
		 */

		/**
		 * Constructs a new SubscribedBotsInfoContent.
		 * @memberof user
		 * @classdesc Represents a SubscribedBotsInfoContent.
		 * @implements ISubscribedBotsInfoContent
		 * @constructor
		 * @param {user.ISubscribedBotsInfoContent=} [properties] Properties to set
		 */
		function SubscribedBotsInfoContent(properties) {
			this.subscribed = [];
			this.favourites = [];
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * SubscribedBotsInfoContent subscribed.
		 * @member {Array.<user.ISubscribedBots>} subscribed
		 * @memberof user.SubscribedBotsInfoContent
		 * @instance
		 */
		SubscribedBotsInfoContent.prototype.subscribed = $util.emptyArray;

		/**
		 * SubscribedBotsInfoContent favourites.
		 * @member {Array.<user.ISubscribedBots>} favourites
		 * @memberof user.SubscribedBotsInfoContent
		 * @instance
		 */
		SubscribedBotsInfoContent.prototype.favourites = $util.emptyArray;

		/**
		 * Creates a new SubscribedBotsInfoContent instance using the specified properties.
		 * @function create
		 * @memberof user.SubscribedBotsInfoContent
		 * @static
		 * @param {user.ISubscribedBotsInfoContent=} [properties] Properties to set
		 * @returns {user.SubscribedBotsInfoContent} SubscribedBotsInfoContent instance
		 */
		SubscribedBotsInfoContent.create = function create(properties) {
			return new SubscribedBotsInfoContent(properties);
		};

		/**
		 * Encodes the specified SubscribedBotsInfoContent message. Does not implicitly {@link user.SubscribedBotsInfoContent.verify|verify} messages.
		 * @function encode
		 * @memberof user.SubscribedBotsInfoContent
		 * @static
		 * @param {user.ISubscribedBotsInfoContent} message SubscribedBotsInfoContent message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		SubscribedBotsInfoContent.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.subscribed !== null && message.subscribed.length)
				for (var i = 0; i < message.subscribed.length; ++i)
					$root.user.SubscribedBots.encode(
						message.subscribed[i],
						writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
					).ldelim();
			if (message.favourites !== null && message.favourites.length)
				for (var i = 0; i < message.favourites.length; ++i)
					$root.user.SubscribedBots.encode(
						message.favourites[i],
						writer.uint32(/* id 2, wireType 2 =*/ 18).fork()
					).ldelim();
			return writer;
		};

		/**
		 * Encodes the specified SubscribedBotsInfoContent message, length delimited. Does not implicitly {@link user.SubscribedBotsInfoContent.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof user.SubscribedBotsInfoContent
		 * @static
		 * @param {user.ISubscribedBotsInfoContent} message SubscribedBotsInfoContent message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		SubscribedBotsInfoContent.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a SubscribedBotsInfoContent message from the specified reader or buffer.
		 * @function decode
		 * @memberof user.SubscribedBotsInfoContent
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {user.SubscribedBotsInfoContent} SubscribedBotsInfoContent
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		SubscribedBotsInfoContent.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.user.SubscribedBotsInfoContent();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						if (!(message.subscribed && message.subscribed.length))
							message.subscribed = [];
						message.subscribed.push(
							$root.user.SubscribedBots.decode(reader, reader.uint32())
						);
						break;
					case 2:
						if (!(message.favourites && message.favourites.length))
							message.favourites = [];
						message.favourites.push(
							$root.user.SubscribedBots.decode(reader, reader.uint32())
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
		 * Decodes a SubscribedBotsInfoContent message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof user.SubscribedBotsInfoContent
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {user.SubscribedBotsInfoContent} SubscribedBotsInfoContent
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		SubscribedBotsInfoContent.decodeDelimited = function decodeDelimited(
			reader
		) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a SubscribedBotsInfoContent message.
		 * @function verify
		 * @memberof user.SubscribedBotsInfoContent
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		SubscribedBotsInfoContent.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.subscribed !== null && message.hasOwnProperty("subscribed")) {
				if (!Array.isArray(message.subscribed))
					return "subscribed: array expected";
				for (var i = 0; i < message.subscribed.length; ++i) {
					var error = $root.user.SubscribedBots.verify(message.subscribed[i]);
					if (error) return "subscribed." + error;
				}
			}
			if (message.favourites !== null && message.hasOwnProperty("favourites")) {
				if (!Array.isArray(message.favourites))
					return "favourites: array expected";
				for (var i = 0; i < message.favourites.length; ++i) {
					var error = $root.user.SubscribedBots.verify(message.favourites[i]);
					if (error) return "favourites." + error;
				}
			}
			return null;
		};

		/**
		 * Creates a SubscribedBotsInfoContent message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof user.SubscribedBotsInfoContent
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {user.SubscribedBotsInfoContent} SubscribedBotsInfoContent
		 */
		SubscribedBotsInfoContent.fromObject = function fromObject(object) {
			if (object instanceof $root.user.SubscribedBotsInfoContent) return object;
			var message = new $root.user.SubscribedBotsInfoContent();
			if (object.subscribed) {
				if (!Array.isArray(object.subscribed))
					throw TypeError(
						".user.SubscribedBotsInfoContent.subscribed: array expected"
					);
				message.subscribed = [];
				for (var i = 0; i < object.subscribed.length; ++i) {
					if (typeof object.subscribed[i] !== "object")
						throw TypeError(
							".user.SubscribedBotsInfoContent.subscribed: object expected"
						);
					message.subscribed[i] = $root.user.SubscribedBots.fromObject(
						object.subscribed[i]
					);
				}
			}
			if (object.favourites) {
				if (!Array.isArray(object.favourites))
					throw TypeError(
						".user.SubscribedBotsInfoContent.favourites: array expected"
					);
				message.favourites = [];
				for (var i = 0; i < object.favourites.length; ++i) {
					if (typeof object.favourites[i] !== "object")
						throw TypeError(
							".user.SubscribedBotsInfoContent.favourites: object expected"
						);
					message.favourites[i] = $root.user.SubscribedBots.fromObject(
						object.favourites[i]
					);
				}
			}
			return message;
		};

		/**
		 * Creates a plain object from a SubscribedBotsInfoContent message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof user.SubscribedBotsInfoContent
		 * @static
		 * @param {user.SubscribedBotsInfoContent} message SubscribedBotsInfoContent
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		SubscribedBotsInfoContent.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.arrays || options.defaults) {
				object.subscribed = [];
				object.favourites = [];
			}
			if (message.subscribed && message.subscribed.length) {
				object.subscribed = [];
				for (var j = 0; j < message.subscribed.length; ++j)
					object.subscribed[j] = $root.user.SubscribedBots.toObject(
						message.subscribed[j],
						options
					);
			}
			if (message.favourites && message.favourites.length) {
				object.favourites = [];
				for (var j = 0; j < message.favourites.length; ++j)
					object.favourites[j] = $root.user.SubscribedBots.toObject(
						message.favourites[j],
						options
					);
			}
			return object;
		};

		/**
		 * Converts this SubscribedBotsInfoContent to JSON.
		 * @function toJSON
		 * @memberof user.SubscribedBotsInfoContent
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		SubscribedBotsInfoContent.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return SubscribedBotsInfoContent;
	})();

	user.SubscribedBots = (function () {
		/**
		 * Properties of a SubscribedBots.
		 * @memberof user
		 * @interface ISubscribedBots
		 * @property {string|null} [botId] SubscribedBots botId
		 * @property {string|null} [userDomain] SubscribedBots userDomain
		 * @property {string|null} [allowResetConversation] SubscribedBots allowResetConversation
		 * @property {user.ISubscribedBotClients|null} [botClients] SubscribedBots botClients
		 * @property {string|null} [botName] SubscribedBots botName
		 * @property {string|null} [botNameSearch] SubscribedBots botNameSearch
		 * @property {string|null} [botUrl] SubscribedBots botUrl
		 * @property {Array.<string>|null} [category] SubscribedBots category
		 * @property {user.ISubscribedDependencies|null} [dependencies] SubscribedBots dependencies
		 * @property {string|null} [description] SubscribedBots description
		 * @property {string|null} [descriptionSearch] SubscribedBots descriptionSearch
		 * @property {string|null} [logoUrl] SubscribedBots logoUrl
		 * @property {string|null} [slug] SubscribedBots slug
		 * @property {Array.<string>|null} [userRoles] SubscribedBots userRoles
		 * @property {string|null} [version] SubscribedBots version
		 * @property {string|null} [developer] SubscribedBots developer
		 * @property {boolean|null} [featured] SubscribedBots featured
		 * @property {boolean|null} [systemBot] SubscribedBots systemBot
		 * @property {string|null} [minRequiredPlatformVersion] SubscribedBots minRequiredPlatformVersion
		 * @property {boolean|null} [conversational] SubscribedBots conversational
		 * @property {boolean|null} [isFavourite] SubscribedBots isFavourite
		 * @property {number|null} [inactivityDuration] SubscribedBots inactivityDuration
		 * @property {boolean|null} [authorisedAccess] SubscribedBots authorisedAccess
		 */

		/**
		 * Constructs a new SubscribedBots.
		 * @memberof user
		 * @classdesc Represents a SubscribedBots.
		 * @implements ISubscribedBots
		 * @constructor
		 * @param {user.ISubscribedBots=} [properties] Properties to set
		 */
		function SubscribedBots(properties) {
			this.category = [];
			this.userRoles = [];
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * SubscribedBots botId.
		 * @member {string} botId
		 * @memberof user.SubscribedBots
		 * @instance
		 */
		SubscribedBots.prototype.botId = "";

		/**
		 * SubscribedBots userDomain.
		 * @member {string} userDomain
		 * @memberof user.SubscribedBots
		 * @instance
		 */
		SubscribedBots.prototype.userDomain = "";

		/**
		 * SubscribedBots allowResetConversation.
		 * @member {string} allowResetConversation
		 * @memberof user.SubscribedBots
		 * @instance
		 */
		SubscribedBots.prototype.allowResetConversation = "";

		/**
		 * SubscribedBots botClients.
		 * @member {user.ISubscribedBotClients|null|undefined} botClients
		 * @memberof user.SubscribedBots
		 * @instance
		 */
		SubscribedBots.prototype.botClients = null;

		/**
		 * SubscribedBots botName.
		 * @member {string} botName
		 * @memberof user.SubscribedBots
		 * @instance
		 */
		SubscribedBots.prototype.botName = "";

		/**
		 * SubscribedBots botNameSearch.
		 * @member {string} botNameSearch
		 * @memberof user.SubscribedBots
		 * @instance
		 */
		SubscribedBots.prototype.botNameSearch = "";

		/**
		 * SubscribedBots botUrl.
		 * @member {string} botUrl
		 * @memberof user.SubscribedBots
		 * @instance
		 */
		SubscribedBots.prototype.botUrl = "";

		/**
		 * SubscribedBots category.
		 * @member {Array.<string>} category
		 * @memberof user.SubscribedBots
		 * @instance
		 */
		SubscribedBots.prototype.category = $util.emptyArray;

		/**
		 * SubscribedBots dependencies.
		 * @member {user.ISubscribedDependencies|null|undefined} dependencies
		 * @memberof user.SubscribedBots
		 * @instance
		 */
		SubscribedBots.prototype.dependencies = null;

		/**
		 * SubscribedBots description.
		 * @member {string} description
		 * @memberof user.SubscribedBots
		 * @instance
		 */
		SubscribedBots.prototype.description = "";

		/**
		 * SubscribedBots descriptionSearch.
		 * @member {string} descriptionSearch
		 * @memberof user.SubscribedBots
		 * @instance
		 */
		SubscribedBots.prototype.descriptionSearch = "";

		/**
		 * SubscribedBots logoUrl.
		 * @member {string} logoUrl
		 * @memberof user.SubscribedBots
		 * @instance
		 */
		SubscribedBots.prototype.logoUrl = "";

		/**
		 * SubscribedBots slug.
		 * @member {string} slug
		 * @memberof user.SubscribedBots
		 * @instance
		 */
		SubscribedBots.prototype.slug = "";

		/**
		 * SubscribedBots userRoles.
		 * @member {Array.<string>} userRoles
		 * @memberof user.SubscribedBots
		 * @instance
		 */
		SubscribedBots.prototype.userRoles = $util.emptyArray;

		/**
		 * SubscribedBots version.
		 * @member {string} version
		 * @memberof user.SubscribedBots
		 * @instance
		 */
		SubscribedBots.prototype.version = "";

		/**
		 * SubscribedBots developer.
		 * @member {string} developer
		 * @memberof user.SubscribedBots
		 * @instance
		 */
		SubscribedBots.prototype.developer = "";

		/**
		 * SubscribedBots featured.
		 * @member {boolean} featured
		 * @memberof user.SubscribedBots
		 * @instance
		 */
		SubscribedBots.prototype.featured = false;

		/**
		 * SubscribedBots systemBot.
		 * @member {boolean} systemBot
		 * @memberof user.SubscribedBots
		 * @instance
		 */
		SubscribedBots.prototype.systemBot = false;

		/**
		 * SubscribedBots minRequiredPlatformVersion.
		 * @member {string} minRequiredPlatformVersion
		 * @memberof user.SubscribedBots
		 * @instance
		 */
		SubscribedBots.prototype.minRequiredPlatformVersion = "";

		/**
		 * SubscribedBots conversational.
		 * @member {boolean} conversational
		 * @memberof user.SubscribedBots
		 * @instance
		 */
		SubscribedBots.prototype.conversational = false;

		/**
		 * SubscribedBots isFavourite.
		 * @member {boolean} isFavourite
		 * @memberof user.SubscribedBots
		 * @instance
		 */
		SubscribedBots.prototype.isFavourite = false;

		/**
		 * SubscribedBots inactivityDuration.
		 * @member {number} inactivityDuration
		 * @memberof user.SubscribedBots
		 * @instance
		 */
		SubscribedBots.prototype.inactivityDuration = 0;

		/**
		 * SubscribedBots authorisedAccess.
		 * @member {boolean} authorisedAccess
		 * @memberof user.SubscribedBots
		 * @instance
		 */
		SubscribedBots.prototype.authorisedAccess = false;

		/**
		 * Creates a new SubscribedBots instance using the specified properties.
		 * @function create
		 * @memberof user.SubscribedBots
		 * @static
		 * @param {user.ISubscribedBots=} [properties] Properties to set
		 * @returns {user.SubscribedBots} SubscribedBots instance
		 */
		SubscribedBots.create = function create(properties) {
			return new SubscribedBots(properties);
		};

		/**
		 * Encodes the specified SubscribedBots message. Does not implicitly {@link user.SubscribedBots.verify|verify} messages.
		 * @function encode
		 * @memberof user.SubscribedBots
		 * @static
		 * @param {user.ISubscribedBots} message SubscribedBots message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		SubscribedBots.encode = function encode(message, writer) {
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
				$root.user.SubscribedBotClients.encode(
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
				$root.user.SubscribedDependencies.encode(
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
				message.isFavourite !== null &&
				Object.hasOwnProperty.call(message, "isFavourite")
			)
				writer.uint32(/* id 21, wireType 0 =*/ 168).bool(message.isFavourite);
			if (
				message.inactivityDuration !== null &&
				Object.hasOwnProperty.call(message, "inactivityDuration")
			)
				writer
					.uint32(/* id 22, wireType 0 =*/ 176)
					.int32(message.inactivityDuration);
			if (
				message.authorisedAccess !== null &&
				Object.hasOwnProperty.call(message, "authorisedAccess")
			)
				writer
					.uint32(/* id 23, wireType 0 =*/ 184)
					.bool(message.authorisedAccess);
			return writer;
		};

		/**
		 * Encodes the specified SubscribedBots message, length delimited. Does not implicitly {@link user.SubscribedBots.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof user.SubscribedBots
		 * @static
		 * @param {user.ISubscribedBots} message SubscribedBots message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		SubscribedBots.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a SubscribedBots message from the specified reader or buffer.
		 * @function decode
		 * @memberof user.SubscribedBots
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {user.SubscribedBots} SubscribedBots
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		SubscribedBots.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.user.SubscribedBots();
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
						message.botClients = $root.user.SubscribedBotClients.decode(
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
						message.dependencies = $root.user.SubscribedDependencies.decode(
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
						message.isFavourite = reader.bool();
						break;
					case 22:
						message.inactivityDuration = reader.int32();
						break;
					case 23:
						message.authorisedAccess = reader.bool();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a SubscribedBots message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof user.SubscribedBots
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {user.SubscribedBots} SubscribedBots
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		SubscribedBots.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a SubscribedBots message.
		 * @function verify
		 * @memberof user.SubscribedBots
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		SubscribedBots.verify = function verify(message) {
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
				var error = $root.user.SubscribedBotClients.verify(message.botClients);
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
				var error = $root.user.SubscribedDependencies.verify(
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
			if (message.isFavourite !== null && message.hasOwnProperty("isFavourite"))
				if (typeof message.isFavourite !== "boolean")
					return "isFavourite: boolean expected";
			if (
				message.inactivityDuration !== null &&
				message.hasOwnProperty("inactivityDuration")
			)
				if (!$util.isInteger(message.inactivityDuration))
					return "inactivityDuration: integer expected";
			if (
				message.authorisedAccess !== null &&
				message.hasOwnProperty("authorisedAccess")
			)
				if (typeof message.authorisedAccess !== "boolean")
					return "authorisedAccess: boolean expected";
			return null;
		};

		/**
		 * Creates a SubscribedBots message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof user.SubscribedBots
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {user.SubscribedBots} SubscribedBots
		 */
		SubscribedBots.fromObject = function fromObject(object) {
			if (object instanceof $root.user.SubscribedBots) return object;
			var message = new $root.user.SubscribedBots();
			if (object.botId !== null) message.botId = String(object.botId);
			if (object.userDomain !== null)
				message.userDomain = String(object.userDomain);
			if (object.allowResetConversation !== null)
				message.allowResetConversation = String(object.allowResetConversation);
			if (object.botClients !== null) {
				if (typeof object.botClients !== "object")
					throw TypeError(".user.SubscribedBots.botClients: object expected");
				message.botClients = $root.user.SubscribedBotClients.fromObject(
					object.botClients
				);
			}
			if (object.botName !== null) message.botName = String(object.botName);
			if (object.botNameSearch !== null)
				message.botNameSearch = String(object.botNameSearch);
			if (object.botUrl !== null) message.botUrl = String(object.botUrl);
			if (object.category) {
				if (!Array.isArray(object.category))
					throw TypeError(".user.SubscribedBots.category: array expected");
				message.category = [];
				for (var i = 0; i < object.category.length; ++i)
					message.category[i] = String(object.category[i]);
			}
			if (object.dependencies !== null) {
				if (typeof object.dependencies !== "object")
					throw TypeError(".user.SubscribedBots.dependencies: object expected");
				message.dependencies = $root.user.SubscribedDependencies.fromObject(
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
					throw TypeError(".user.SubscribedBots.userRoles: array expected");
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
			if (object.isFavourite !== null)
				message.isFavourite = Boolean(object.isFavourite);
			if (object.inactivityDuration !== null)
				message.inactivityDuration = object.inactivityDuration | 0;
			if (object.authorisedAccess !== null)
				message.authorisedAccess = Boolean(object.authorisedAccess);
			return message;
		};

		/**
		 * Creates a plain object from a SubscribedBots message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof user.SubscribedBots
		 * @static
		 * @param {user.SubscribedBots} message SubscribedBots
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		SubscribedBots.toObject = function toObject(message, options) {
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
				object.isFavourite = false;
				object.inactivityDuration = 0;
				object.authorisedAccess = false;
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
				object.botClients = $root.user.SubscribedBotClients.toObject(
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
				object.dependencies = $root.user.SubscribedDependencies.toObject(
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
			if (message.isFavourite !== null && message.hasOwnProperty("isFavourite"))
				object.isFavourite = message.isFavourite;
			if (
				message.inactivityDuration !== null &&
				message.hasOwnProperty("inactivityDuration")
			)
				object.inactivityDuration = message.inactivityDuration;
			if (
				message.authorisedAccess !== null &&
				message.hasOwnProperty("authorisedAccess")
			)
				object.authorisedAccess = message.authorisedAccess;
			return object;
		};

		/**
		 * Converts this SubscribedBots to JSON.
		 * @function toJSON
		 * @memberof user.SubscribedBots
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		SubscribedBots.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return SubscribedBots;
	})();

	user.SubscribedBotClients = (function () {
		/**
		 * Properties of a SubscribedBotClients.
		 * @memberof user
		 * @interface ISubscribedBotClients
		 * @property {boolean|null} [mobile] SubscribedBotClients mobile
		 * @property {boolean|null} [web] SubscribedBotClients web
		 */

		/**
		 * Constructs a new SubscribedBotClients.
		 * @memberof user
		 * @classdesc Represents a SubscribedBotClients.
		 * @implements ISubscribedBotClients
		 * @constructor
		 * @param {user.ISubscribedBotClients=} [properties] Properties to set
		 */
		function SubscribedBotClients(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * SubscribedBotClients mobile.
		 * @member {boolean} mobile
		 * @memberof user.SubscribedBotClients
		 * @instance
		 */
		SubscribedBotClients.prototype.mobile = false;

		/**
		 * SubscribedBotClients web.
		 * @member {boolean} web
		 * @memberof user.SubscribedBotClients
		 * @instance
		 */
		SubscribedBotClients.prototype.web = false;

		/**
		 * Creates a new SubscribedBotClients instance using the specified properties.
		 * @function create
		 * @memberof user.SubscribedBotClients
		 * @static
		 * @param {user.ISubscribedBotClients=} [properties] Properties to set
		 * @returns {user.SubscribedBotClients} SubscribedBotClients instance
		 */
		SubscribedBotClients.create = function create(properties) {
			return new SubscribedBotClients(properties);
		};

		/**
		 * Encodes the specified SubscribedBotClients message. Does not implicitly {@link user.SubscribedBotClients.verify|verify} messages.
		 * @function encode
		 * @memberof user.SubscribedBotClients
		 * @static
		 * @param {user.ISubscribedBotClients} message SubscribedBotClients message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		SubscribedBotClients.encode = function encode(message, writer) {
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
		 * Encodes the specified SubscribedBotClients message, length delimited. Does not implicitly {@link user.SubscribedBotClients.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof user.SubscribedBotClients
		 * @static
		 * @param {user.ISubscribedBotClients} message SubscribedBotClients message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		SubscribedBotClients.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a SubscribedBotClients message from the specified reader or buffer.
		 * @function decode
		 * @memberof user.SubscribedBotClients
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {user.SubscribedBotClients} SubscribedBotClients
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		SubscribedBotClients.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.user.SubscribedBotClients();
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
		 * Decodes a SubscribedBotClients message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof user.SubscribedBotClients
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {user.SubscribedBotClients} SubscribedBotClients
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		SubscribedBotClients.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a SubscribedBotClients message.
		 * @function verify
		 * @memberof user.SubscribedBotClients
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		SubscribedBotClients.verify = function verify(message) {
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
		 * Creates a SubscribedBotClients message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof user.SubscribedBotClients
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {user.SubscribedBotClients} SubscribedBotClients
		 */
		SubscribedBotClients.fromObject = function fromObject(object) {
			if (object instanceof $root.user.SubscribedBotClients) return object;
			var message = new $root.user.SubscribedBotClients();
			if (object.mobile !== null) message.mobile = Boolean(object.mobile);
			if (object.web !== null) message.web = Boolean(object.web);
			return message;
		};

		/**
		 * Creates a plain object from a SubscribedBotClients message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof user.SubscribedBotClients
		 * @static
		 * @param {user.SubscribedBotClients} message SubscribedBotClients
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		SubscribedBotClients.toObject = function toObject(message, options) {
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
		 * Converts this SubscribedBotClients to JSON.
		 * @function toJSON
		 * @memberof user.SubscribedBotClients
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		SubscribedBotClients.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return SubscribedBotClients;
	})();

	user.SubscribedDependencies = (function () {
		/**
		 * Properties of a SubscribedDependencies.
		 * @memberof user
		 * @interface ISubscribedDependencies
		 * @property {user.ISubscribedDependency|null} [agentGuardService] SubscribedDependencies agentGuardService
		 * @property {user.ISubscribedDependency|null} [authContext] SubscribedDependencies authContext
		 * @property {user.ISubscribedDependency|null} [archiveUtils] SubscribedDependencies archiveUtils
		 * @property {user.ISubscribedDependency|null} [botUtils] SubscribedDependencies botUtils
		 * @property {user.ISubscribedDependency|null} [autoRenewConversationContext] SubscribedDependencies autoRenewConversationContext
		 */

		/**
		 * Constructs a new SubscribedDependencies.
		 * @memberof user
		 * @classdesc Represents a SubscribedDependencies.
		 * @implements ISubscribedDependencies
		 * @constructor
		 * @param {user.ISubscribedDependencies=} [properties] Properties to set
		 */
		function SubscribedDependencies(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * SubscribedDependencies agentGuardService.
		 * @member {user.ISubscribedDependency|null|undefined} agentGuardService
		 * @memberof user.SubscribedDependencies
		 * @instance
		 */
		SubscribedDependencies.prototype.agentGuardService = null;

		/**
		 * SubscribedDependencies authContext.
		 * @member {user.ISubscribedDependency|null|undefined} authContext
		 * @memberof user.SubscribedDependencies
		 * @instance
		 */
		SubscribedDependencies.prototype.authContext = null;

		/**
		 * SubscribedDependencies archiveUtils.
		 * @member {user.ISubscribedDependency|null|undefined} archiveUtils
		 * @memberof user.SubscribedDependencies
		 * @instance
		 */
		SubscribedDependencies.prototype.archiveUtils = null;

		/**
		 * SubscribedDependencies botUtils.
		 * @member {user.ISubscribedDependency|null|undefined} botUtils
		 * @memberof user.SubscribedDependencies
		 * @instance
		 */
		SubscribedDependencies.prototype.botUtils = null;

		/**
		 * SubscribedDependencies autoRenewConversationContext.
		 * @member {user.ISubscribedDependency|null|undefined} autoRenewConversationContext
		 * @memberof user.SubscribedDependencies
		 * @instance
		 */
		SubscribedDependencies.prototype.autoRenewConversationContext = null;

		/**
		 * Creates a new SubscribedDependencies instance using the specified properties.
		 * @function create
		 * @memberof user.SubscribedDependencies
		 * @static
		 * @param {user.ISubscribedDependencies=} [properties] Properties to set
		 * @returns {user.SubscribedDependencies} SubscribedDependencies instance
		 */
		SubscribedDependencies.create = function create(properties) {
			return new SubscribedDependencies(properties);
		};

		/**
		 * Encodes the specified SubscribedDependencies message. Does not implicitly {@link user.SubscribedDependencies.verify|verify} messages.
		 * @function encode
		 * @memberof user.SubscribedDependencies
		 * @static
		 * @param {user.ISubscribedDependencies} message SubscribedDependencies message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		SubscribedDependencies.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.agentGuardService !== null &&
				Object.hasOwnProperty.call(message, "agentGuardService")
			)
				$root.user.SubscribedDependency.encode(
					message.agentGuardService,
					writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
				).ldelim();
			if (
				message.authContext !== null &&
				Object.hasOwnProperty.call(message, "authContext")
			)
				$root.user.SubscribedDependency.encode(
					message.authContext,
					writer.uint32(/* id 2, wireType 2 =*/ 18).fork()
				).ldelim();
			if (
				message.archiveUtils !== null &&
				Object.hasOwnProperty.call(message, "archiveUtils")
			)
				$root.user.SubscribedDependency.encode(
					message.archiveUtils,
					writer.uint32(/* id 3, wireType 2 =*/ 26).fork()
				).ldelim();
			if (
				message.botUtils !== null &&
				Object.hasOwnProperty.call(message, "botUtils")
			)
				$root.user.SubscribedDependency.encode(
					message.botUtils,
					writer.uint32(/* id 4, wireType 2 =*/ 34).fork()
				).ldelim();
			if (
				message.autoRenewConversationContext !== null &&
				Object.hasOwnProperty.call(message, "autoRenewConversationContext")
			)
				$root.user.SubscribedDependency.encode(
					message.autoRenewConversationContext,
					writer.uint32(/* id 5, wireType 2 =*/ 42).fork()
				).ldelim();
			return writer;
		};

		/**
		 * Encodes the specified SubscribedDependencies message, length delimited. Does not implicitly {@link user.SubscribedDependencies.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof user.SubscribedDependencies
		 * @static
		 * @param {user.ISubscribedDependencies} message SubscribedDependencies message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		SubscribedDependencies.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a SubscribedDependencies message from the specified reader or buffer.
		 * @function decode
		 * @memberof user.SubscribedDependencies
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {user.SubscribedDependencies} SubscribedDependencies
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		SubscribedDependencies.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.user.SubscribedDependencies();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.agentGuardService = $root.user.SubscribedDependency.decode(
							reader,
							reader.uint32()
						);
						break;
					case 2:
						message.authContext = $root.user.SubscribedDependency.decode(
							reader,
							reader.uint32()
						);
						break;
					case 3:
						message.archiveUtils = $root.user.SubscribedDependency.decode(
							reader,
							reader.uint32()
						);
						break;
					case 4:
						message.botUtils = $root.user.SubscribedDependency.decode(
							reader,
							reader.uint32()
						);
						break;
					case 5:
						message.autoRenewConversationContext =
							$root.user.SubscribedDependency.decode(reader, reader.uint32());
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a SubscribedDependencies message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof user.SubscribedDependencies
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {user.SubscribedDependencies} SubscribedDependencies
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		SubscribedDependencies.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a SubscribedDependencies message.
		 * @function verify
		 * @memberof user.SubscribedDependencies
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		SubscribedDependencies.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (
				message.agentGuardService !== null &&
				message.hasOwnProperty("agentGuardService")
			) {
				var error = $root.user.SubscribedDependency.verify(
					message.agentGuardService
				);
				if (error) return "agentGuardService." + error;
			}
			if (
				message.authContext !== null &&
				message.hasOwnProperty("authContext")
			) {
				var error = $root.user.SubscribedDependency.verify(message.authContext);
				if (error) return "authContext." + error;
			}
			if (
				message.archiveUtils !== null &&
				message.hasOwnProperty("archiveUtils")
			) {
				var error = $root.user.SubscribedDependency.verify(
					message.archiveUtils
				);
				if (error) return "archiveUtils." + error;
			}
			if (message.botUtils !== null && message.hasOwnProperty("botUtils")) {
				var error = $root.user.SubscribedDependency.verify(message.botUtils);
				if (error) return "botUtils." + error;
			}
			if (
				message.autoRenewConversationContext !== null &&
				message.hasOwnProperty("autoRenewConversationContext")
			) {
				var error = $root.user.SubscribedDependency.verify(
					message.autoRenewConversationContext
				);
				if (error) return "autoRenewConversationContext." + error;
			}
			return null;
		};

		/**
		 * Creates a SubscribedDependencies message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof user.SubscribedDependencies
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {user.SubscribedDependencies} SubscribedDependencies
		 */
		SubscribedDependencies.fromObject = function fromObject(object) {
			if (object instanceof $root.user.SubscribedDependencies) return object;
			var message = new $root.user.SubscribedDependencies();
			if (object.agentGuardService !== null) {
				if (typeof object.agentGuardService !== "object")
					throw TypeError(
						".user.SubscribedDependencies.agentGuardService: object expected"
					);
				message.agentGuardService = $root.user.SubscribedDependency.fromObject(
					object.agentGuardService
				);
			}
			if (object.authContext !== null) {
				if (typeof object.authContext !== "object")
					throw TypeError(
						".user.SubscribedDependencies.authContext: object expected"
					);
				message.authContext = $root.user.SubscribedDependency.fromObject(
					object.authContext
				);
			}
			if (object.archiveUtils !== null) {
				if (typeof object.archiveUtils !== "object")
					throw TypeError(
						".user.SubscribedDependencies.archiveUtils: object expected"
					);
				message.archiveUtils = $root.user.SubscribedDependency.fromObject(
					object.archiveUtils
				);
			}
			if (object.botUtils !== null) {
				if (typeof object.botUtils !== "object")
					throw TypeError(
						".user.SubscribedDependencies.botUtils: object expected"
					);
				message.botUtils = $root.user.SubscribedDependency.fromObject(
					object.botUtils
				);
			}
			if (object.autoRenewConversationContext !== null) {
				if (typeof object.autoRenewConversationContext !== "object")
					throw TypeError(
						".user.SubscribedDependencies.autoRenewConversationContext: object expected"
					);
				message.autoRenewConversationContext =
					$root.user.SubscribedDependency.fromObject(
						object.autoRenewConversationContext
					);
			}
			return message;
		};

		/**
		 * Creates a plain object from a SubscribedDependencies message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof user.SubscribedDependencies
		 * @static
		 * @param {user.SubscribedDependencies} message SubscribedDependencies
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		SubscribedDependencies.toObject = function toObject(message, options) {
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
				object.agentGuardService = $root.user.SubscribedDependency.toObject(
					message.agentGuardService,
					options
				);
			if (message.authContext !== null && message.hasOwnProperty("authContext"))
				object.authContext = $root.user.SubscribedDependency.toObject(
					message.authContext,
					options
				);
			if (
				message.archiveUtils !== null &&
				message.hasOwnProperty("archiveUtils")
			)
				object.archiveUtils = $root.user.SubscribedDependency.toObject(
					message.archiveUtils,
					options
				);
			if (message.botUtils !== null && message.hasOwnProperty("botUtils"))
				object.botUtils = $root.user.SubscribedDependency.toObject(
					message.botUtils,
					options
				);
			if (
				message.autoRenewConversationContext !== null &&
				message.hasOwnProperty("autoRenewConversationContext")
			)
				object.autoRenewConversationContext =
					$root.user.SubscribedDependency.toObject(
						message.autoRenewConversationContext,
						options
					);
			return object;
		};

		/**
		 * Converts this SubscribedDependencies to JSON.
		 * @function toJSON
		 * @memberof user.SubscribedDependencies
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		SubscribedDependencies.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return SubscribedDependencies;
	})();

	user.SubscribedDependency = (function () {
		/**
		 * Properties of a SubscribedDependency.
		 * @memberof user
		 * @interface ISubscribedDependency
		 * @property {boolean|null} [remote] SubscribedDependency remote
		 * @property {string|null} [version] SubscribedDependency version
		 * @property {string|null} [url] SubscribedDependency url
		 */

		/**
		 * Constructs a new SubscribedDependency.
		 * @memberof user
		 * @classdesc Represents a SubscribedDependency.
		 * @implements ISubscribedDependency
		 * @constructor
		 * @param {user.ISubscribedDependency=} [properties] Properties to set
		 */
		function SubscribedDependency(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * SubscribedDependency remote.
		 * @member {boolean} remote
		 * @memberof user.SubscribedDependency
		 * @instance
		 */
		SubscribedDependency.prototype.remote = false;

		/**
		 * SubscribedDependency version.
		 * @member {string} version
		 * @memberof user.SubscribedDependency
		 * @instance
		 */
		SubscribedDependency.prototype.version = "";

		/**
		 * SubscribedDependency url.
		 * @member {string} url
		 * @memberof user.SubscribedDependency
		 * @instance
		 */
		SubscribedDependency.prototype.url = "";

		/**
		 * Creates a new SubscribedDependency instance using the specified properties.
		 * @function create
		 * @memberof user.SubscribedDependency
		 * @static
		 * @param {user.ISubscribedDependency=} [properties] Properties to set
		 * @returns {user.SubscribedDependency} SubscribedDependency instance
		 */
		SubscribedDependency.create = function create(properties) {
			return new SubscribedDependency(properties);
		};

		/**
		 * Encodes the specified SubscribedDependency message. Does not implicitly {@link user.SubscribedDependency.verify|verify} messages.
		 * @function encode
		 * @memberof user.SubscribedDependency
		 * @static
		 * @param {user.ISubscribedDependency} message SubscribedDependency message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		SubscribedDependency.encode = function encode(message, writer) {
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
		 * Encodes the specified SubscribedDependency message, length delimited. Does not implicitly {@link user.SubscribedDependency.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof user.SubscribedDependency
		 * @static
		 * @param {user.ISubscribedDependency} message SubscribedDependency message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		SubscribedDependency.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a SubscribedDependency message from the specified reader or buffer.
		 * @function decode
		 * @memberof user.SubscribedDependency
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {user.SubscribedDependency} SubscribedDependency
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		SubscribedDependency.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.user.SubscribedDependency();
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
		 * Decodes a SubscribedDependency message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof user.SubscribedDependency
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {user.SubscribedDependency} SubscribedDependency
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		SubscribedDependency.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a SubscribedDependency message.
		 * @function verify
		 * @memberof user.SubscribedDependency
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		SubscribedDependency.verify = function verify(message) {
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
		 * Creates a SubscribedDependency message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof user.SubscribedDependency
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {user.SubscribedDependency} SubscribedDependency
		 */
		SubscribedDependency.fromObject = function fromObject(object) {
			if (object instanceof $root.user.SubscribedDependency) return object;
			var message = new $root.user.SubscribedDependency();
			if (object.remote !== null) message.remote = Boolean(object.remote);
			if (object.version !== null) message.version = String(object.version);
			if (object.url !== null) message.url = String(object.url);
			return message;
		};

		/**
		 * Creates a plain object from a SubscribedDependency message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof user.SubscribedDependency
		 * @static
		 * @param {user.SubscribedDependency} message SubscribedDependency
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		SubscribedDependency.toObject = function toObject(message, options) {
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
		 * Converts this SubscribedDependency to JSON.
		 * @function toJSON
		 * @memberof user.SubscribedDependency
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		SubscribedDependency.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return SubscribedDependency;
	})();

	user.ContactsResponse = (function () {
		/**
		 * Properties of a ContactsResponse.
		 * @memberof user
		 * @interface IContactsResponse
		 * @property {Array.<user.IContact>|null} [contacts] ContactsResponse contacts
		 * @property {Array.<user.IContact>|null} [ignored] ContactsResponse ignored
		 * @property {Array.<commonmessages.ILocalContact>|null} [localContacts] ContactsResponse localContacts
		 * @property {string|null} [sites] ContactsResponse sites
		 */

		/**
		 * Constructs a new ContactsResponse.
		 * @memberof user
		 * @classdesc Represents a ContactsResponse.
		 * @implements IContactsResponse
		 * @constructor
		 * @param {user.IContactsResponse=} [properties] Properties to set
		 */
		function ContactsResponse(properties) {
			this.contacts = [];
			this.ignored = [];
			this.localContacts = [];
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * ContactsResponse contacts.
		 * @member {Array.<user.IContact>} contacts
		 * @memberof user.ContactsResponse
		 * @instance
		 */
		ContactsResponse.prototype.contacts = $util.emptyArray;

		/**
		 * ContactsResponse ignored.
		 * @member {Array.<user.IContact>} ignored
		 * @memberof user.ContactsResponse
		 * @instance
		 */
		ContactsResponse.prototype.ignored = $util.emptyArray;

		/**
		 * ContactsResponse localContacts.
		 * @member {Array.<commonmessages.ILocalContact>} localContacts
		 * @memberof user.ContactsResponse
		 * @instance
		 */
		ContactsResponse.prototype.localContacts = $util.emptyArray;

		/**
		 * ContactsResponse sites.
		 * @member {string} sites
		 * @memberof user.ContactsResponse
		 * @instance
		 */
		ContactsResponse.prototype.sites = "";

		/**
		 * Creates a new ContactsResponse instance using the specified properties.
		 * @function create
		 * @memberof user.ContactsResponse
		 * @static
		 * @param {user.IContactsResponse=} [properties] Properties to set
		 * @returns {user.ContactsResponse} ContactsResponse instance
		 */
		ContactsResponse.create = function create(properties) {
			return new ContactsResponse(properties);
		};

		/**
		 * Encodes the specified ContactsResponse message. Does not implicitly {@link user.ContactsResponse.verify|verify} messages.
		 * @function encode
		 * @memberof user.ContactsResponse
		 * @static
		 * @param {user.IContactsResponse} message ContactsResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		ContactsResponse.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.contacts !== null && message.contacts.length)
				for (var i = 0; i < message.contacts.length; ++i)
					$root.user.Contact.encode(
						message.contacts[i],
						writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
					).ldelim();
			if (message.ignored !== null && message.ignored.length)
				for (var i = 0; i < message.ignored.length; ++i)
					$root.user.Contact.encode(
						message.ignored[i],
						writer.uint32(/* id 2, wireType 2 =*/ 18).fork()
					).ldelim();
			if (message.localContacts !== null && message.localContacts.length)
				for (var i = 0; i < message.localContacts.length; ++i)
					$root.commonmessages.LocalContact.encode(
						message.localContacts[i],
						writer.uint32(/* id 3, wireType 2 =*/ 26).fork()
					).ldelim();
			if (
				message.sites !== null &&
				Object.hasOwnProperty.call(message, "sites")
			)
				writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.sites);
			return writer;
		};

		/**
		 * Encodes the specified ContactsResponse message, length delimited. Does not implicitly {@link user.ContactsResponse.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof user.ContactsResponse
		 * @static
		 * @param {user.IContactsResponse} message ContactsResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		ContactsResponse.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a ContactsResponse message from the specified reader or buffer.
		 * @function decode
		 * @memberof user.ContactsResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {user.ContactsResponse} ContactsResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		ContactsResponse.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.user.ContactsResponse();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						if (!(message.contacts && message.contacts.length))
							message.contacts = [];
						message.contacts.push(
							$root.user.Contact.decode(reader, reader.uint32())
						);
						break;
					case 2:
						if (!(message.ignored && message.ignored.length))
							message.ignored = [];
						message.ignored.push(
							$root.user.Contact.decode(reader, reader.uint32())
						);
						break;
					case 3:
						if (!(message.localContacts && message.localContacts.length))
							message.localContacts = [];
						message.localContacts.push(
							$root.commonmessages.LocalContact.decode(reader, reader.uint32())
						);
						break;
					case 4:
						message.sites = reader.string();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a ContactsResponse message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof user.ContactsResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {user.ContactsResponse} ContactsResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		ContactsResponse.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a ContactsResponse message.
		 * @function verify
		 * @memberof user.ContactsResponse
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		ContactsResponse.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.contacts !== null && message.hasOwnProperty("contacts")) {
				if (!Array.isArray(message.contacts)) return "contacts: array expected";
				for (var i = 0; i < message.contacts.length; ++i) {
					var error = $root.user.Contact.verify(message.contacts[i]);
					if (error) return "contacts." + error;
				}
			}
			if (message.ignored !== null && message.hasOwnProperty("ignored")) {
				if (!Array.isArray(message.ignored)) return "ignored: array expected";
				for (var i = 0; i < message.ignored.length; ++i) {
					var error = $root.user.Contact.verify(message.ignored[i]);
					if (error) return "ignored." + error;
				}
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
			if (message.sites !== null && message.hasOwnProperty("sites"))
				if (!$util.isString(message.sites)) return "sites: string expected";
			return null;
		};

		/**
		 * Creates a ContactsResponse message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof user.ContactsResponse
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {user.ContactsResponse} ContactsResponse
		 */
		ContactsResponse.fromObject = function fromObject(object) {
			if (object instanceof $root.user.ContactsResponse) return object;
			var message = new $root.user.ContactsResponse();
			if (object.contacts) {
				if (!Array.isArray(object.contacts))
					throw TypeError(".user.ContactsResponse.contacts: array expected");
				message.contacts = [];
				for (var i = 0; i < object.contacts.length; ++i) {
					if (typeof object.contacts[i] !== "object")
						throw TypeError(".user.ContactsResponse.contacts: object expected");
					message.contacts[i] = $root.user.Contact.fromObject(
						object.contacts[i]
					);
				}
			}
			if (object.ignored) {
				if (!Array.isArray(object.ignored))
					throw TypeError(".user.ContactsResponse.ignored: array expected");
				message.ignored = [];
				for (var i = 0; i < object.ignored.length; ++i) {
					if (typeof object.ignored[i] !== "object")
						throw TypeError(".user.ContactsResponse.ignored: object expected");
					message.ignored[i] = $root.user.Contact.fromObject(object.ignored[i]);
				}
			}
			if (object.localContacts) {
				if (!Array.isArray(object.localContacts))
					throw TypeError(
						".user.ContactsResponse.localContacts: array expected"
					);
				message.localContacts = [];
				for (var i = 0; i < object.localContacts.length; ++i) {
					if (typeof object.localContacts[i] !== "object")
						throw TypeError(
							".user.ContactsResponse.localContacts: object expected"
						);
					message.localContacts[i] =
						$root.commonmessages.LocalContact.fromObject(
							object.localContacts[i]
						);
				}
			}
			if (object.sites !== null) message.sites = String(object.sites);
			return message;
		};

		/**
		 * Creates a plain object from a ContactsResponse message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof user.ContactsResponse
		 * @static
		 * @param {user.ContactsResponse} message ContactsResponse
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		ContactsResponse.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.arrays || options.defaults) {
				object.contacts = [];
				object.ignored = [];
				object.localContacts = [];
			}
			if (options.defaults) object.sites = "";
			if (message.contacts && message.contacts.length) {
				object.contacts = [];
				for (var j = 0; j < message.contacts.length; ++j)
					object.contacts[j] = $root.user.Contact.toObject(
						message.contacts[j],
						options
					);
			}
			if (message.ignored && message.ignored.length) {
				object.ignored = [];
				for (var j = 0; j < message.ignored.length; ++j)
					object.ignored[j] = $root.user.Contact.toObject(
						message.ignored[j],
						options
					);
			}
			if (message.localContacts && message.localContacts.length) {
				object.localContacts = [];
				for (var j = 0; j < message.localContacts.length; ++j)
					object.localContacts[j] = $root.commonmessages.LocalContact.toObject(
						message.localContacts[j],
						options
					);
			}
			if (message.sites !== null && message.hasOwnProperty("sites"))
				object.sites = message.sites;
			return object;
		};

		/**
		 * Converts this ContactsResponse to JSON.
		 * @function toJSON
		 * @memberof user.ContactsResponse
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		ContactsResponse.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return ContactsResponse;
	})();

	user.Contact = (function () {
		/**
		 * Properties of a Contact.
		 * @memberof user
		 * @interface IContact
		 * @property {string|null} [userName] Contact userName
		 * @property {string|null} [emailAddress] Contact emailAddress
		 * @property {commonmessages.IPhoneNumbers|null} [phoneNumbers] Contact phoneNumbers
		 * @property {string|null} [userId] Contact userId
		 * @property {boolean|null} [waitingForConfirmation] Contact waitingForConfirmation
		 * @property {string|null} [userCompanyName] Contact userCompanyName
		 * @property {commonmessages.IUserAddress|null} [address] Contact address
		 * @property {boolean|null} [showAcceptIgnoreMsg] Contact showAcceptIgnoreMsg
		 */

		/**
		 * Constructs a new Contact.
		 * @memberof user
		 * @classdesc Represents a Contact.
		 * @implements IContact
		 * @constructor
		 * @param {user.IContact=} [properties] Properties to set
		 */
		function Contact(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * Contact userName.
		 * @member {string} userName
		 * @memberof user.Contact
		 * @instance
		 */
		Contact.prototype.userName = "";

		/**
		 * Contact emailAddress.
		 * @member {string} emailAddress
		 * @memberof user.Contact
		 * @instance
		 */
		Contact.prototype.emailAddress = "";

		/**
		 * Contact phoneNumbers.
		 * @member {commonmessages.IPhoneNumbers|null|undefined} phoneNumbers
		 * @memberof user.Contact
		 * @instance
		 */
		Contact.prototype.phoneNumbers = null;

		/**
		 * Contact userId.
		 * @member {string} userId
		 * @memberof user.Contact
		 * @instance
		 */
		Contact.prototype.userId = "";

		/**
		 * Contact waitingForConfirmation.
		 * @member {boolean} waitingForConfirmation
		 * @memberof user.Contact
		 * @instance
		 */
		Contact.prototype.waitingForConfirmation = false;

		/**
		 * Contact userCompanyName.
		 * @member {string} userCompanyName
		 * @memberof user.Contact
		 * @instance
		 */
		Contact.prototype.userCompanyName = "";

		/**
		 * Contact address.
		 * @member {commonmessages.IUserAddress|null|undefined} address
		 * @memberof user.Contact
		 * @instance
		 */
		Contact.prototype.address = null;

		/**
		 * Contact showAcceptIgnoreMsg.
		 * @member {boolean} showAcceptIgnoreMsg
		 * @memberof user.Contact
		 * @instance
		 */
		Contact.prototype.showAcceptIgnoreMsg = false;

		/**
		 * Creates a new Contact instance using the specified properties.
		 * @function create
		 * @memberof user.Contact
		 * @static
		 * @param {user.IContact=} [properties] Properties to set
		 * @returns {user.Contact} Contact instance
		 */
		Contact.create = function create(properties) {
			return new Contact(properties);
		};

		/**
		 * Encodes the specified Contact message. Does not implicitly {@link user.Contact.verify|verify} messages.
		 * @function encode
		 * @memberof user.Contact
		 * @static
		 * @param {user.IContact} message Contact message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		Contact.encode = function encode(message, writer) {
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
				message.waitingForConfirmation !== null &&
				Object.hasOwnProperty.call(message, "waitingForConfirmation")
			)
				writer
					.uint32(/* id 5, wireType 0 =*/ 40)
					.bool(message.waitingForConfirmation);
			if (
				message.userCompanyName !== null &&
				Object.hasOwnProperty.call(message, "userCompanyName")
			)
				writer
					.uint32(/* id 6, wireType 2 =*/ 50)
					.string(message.userCompanyName);
			if (
				message.address !== null &&
				Object.hasOwnProperty.call(message, "address")
			)
				$root.commonmessages.UserAddress.encode(
					message.address,
					writer.uint32(/* id 7, wireType 2 =*/ 58).fork()
				).ldelim();
			if (
				message.showAcceptIgnoreMsg !== null &&
				Object.hasOwnProperty.call(message, "showAcceptIgnoreMsg")
			)
				writer
					.uint32(/* id 8, wireType 0 =*/ 64)
					.bool(message.showAcceptIgnoreMsg);
			return writer;
		};

		/**
		 * Encodes the specified Contact message, length delimited. Does not implicitly {@link user.Contact.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof user.Contact
		 * @static
		 * @param {user.IContact} message Contact message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		Contact.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a Contact message from the specified reader or buffer.
		 * @function decode
		 * @memberof user.Contact
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {user.Contact} Contact
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		Contact.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.user.Contact();
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
						message.waitingForConfirmation = reader.bool();
						break;
					case 6:
						message.userCompanyName = reader.string();
						break;
					case 7:
						message.address = $root.commonmessages.UserAddress.decode(
							reader,
							reader.uint32()
						);
						break;
					case 8:
						message.showAcceptIgnoreMsg = reader.bool();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a Contact message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof user.Contact
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {user.Contact} Contact
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		Contact.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a Contact message.
		 * @function verify
		 * @memberof user.Contact
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		Contact.verify = function verify(message) {
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
				message.waitingForConfirmation !== null &&
				message.hasOwnProperty("waitingForConfirmation")
			)
				if (typeof message.waitingForConfirmation !== "boolean")
					return "waitingForConfirmation: boolean expected";
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
			if (
				message.showAcceptIgnoreMsg !== null &&
				message.hasOwnProperty("showAcceptIgnoreMsg")
			)
				if (typeof message.showAcceptIgnoreMsg !== "boolean")
					return "showAcceptIgnoreMsg: boolean expected";
			return null;
		};

		/**
		 * Creates a Contact message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof user.Contact
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {user.Contact} Contact
		 */
		Contact.fromObject = function fromObject(object) {
			if (object instanceof $root.user.Contact) return object;
			var message = new $root.user.Contact();
			if (object.userName !== null) message.userName = String(object.userName);
			if (object.emailAddress !== null)
				message.emailAddress = String(object.emailAddress);
			if (object.phoneNumbers !== null) {
				if (typeof object.phoneNumbers !== "object")
					throw TypeError(".user.Contact.phoneNumbers: object expected");
				message.phoneNumbers = $root.commonmessages.PhoneNumbers.fromObject(
					object.phoneNumbers
				);
			}
			if (object.userId !== null) message.userId = String(object.userId);
			if (object.waitingForConfirmation !== null)
				message.waitingForConfirmation = Boolean(object.waitingForConfirmation);
			if (object.userCompanyName !== null)
				message.userCompanyName = String(object.userCompanyName);
			if (object.address !== null) {
				if (typeof object.address !== "object")
					throw TypeError(".user.Contact.address: object expected");
				message.address = $root.commonmessages.UserAddress.fromObject(
					object.address
				);
			}
			if (object.showAcceptIgnoreMsg !== null)
				message.showAcceptIgnoreMsg = Boolean(object.showAcceptIgnoreMsg);
			return message;
		};

		/**
		 * Creates a plain object from a Contact message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof user.Contact
		 * @static
		 * @param {user.Contact} message Contact
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		Contact.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.userName = "";
				object.emailAddress = "";
				object.phoneNumbers = null;
				object.userId = "";
				object.waitingForConfirmation = false;
				object.userCompanyName = "";
				object.address = null;
				object.showAcceptIgnoreMsg = false;
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
				message.waitingForConfirmation !== null &&
				message.hasOwnProperty("waitingForConfirmation")
			)
				object.waitingForConfirmation = message.waitingForConfirmation;
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
			if (
				message.showAcceptIgnoreMsg !== null &&
				message.hasOwnProperty("showAcceptIgnoreMsg")
			)
				object.showAcceptIgnoreMsg = message.showAcceptIgnoreMsg;
			return object;
		};

		/**
		 * Converts this Contact to JSON.
		 * @function toJSON
		 * @memberof user.Contact
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		Contact.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return Contact;
	})();

	user.SubscribeBotInput = (function () {
		/**
		 * Properties of a SubscribeBotInput.
		 * @memberof user
		 * @interface ISubscribeBotInput
		 * @property {string|null} [botId] SubscribeBotInput botId
		 */

		/**
		 * Constructs a new SubscribeBotInput.
		 * @memberof user
		 * @classdesc Represents a SubscribeBotInput.
		 * @implements ISubscribeBotInput
		 * @constructor
		 * @param {user.ISubscribeBotInput=} [properties] Properties to set
		 */
		function SubscribeBotInput(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * SubscribeBotInput botId.
		 * @member {string} botId
		 * @memberof user.SubscribeBotInput
		 * @instance
		 */
		SubscribeBotInput.prototype.botId = "";

		/**
		 * Creates a new SubscribeBotInput instance using the specified properties.
		 * @function create
		 * @memberof user.SubscribeBotInput
		 * @static
		 * @param {user.ISubscribeBotInput=} [properties] Properties to set
		 * @returns {user.SubscribeBotInput} SubscribeBotInput instance
		 */
		SubscribeBotInput.create = function create(properties) {
			return new SubscribeBotInput(properties);
		};

		/**
		 * Encodes the specified SubscribeBotInput message. Does not implicitly {@link user.SubscribeBotInput.verify|verify} messages.
		 * @function encode
		 * @memberof user.SubscribeBotInput
		 * @static
		 * @param {user.ISubscribeBotInput} message SubscribeBotInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		SubscribeBotInput.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.botId !== null &&
				Object.hasOwnProperty.call(message, "botId")
			)
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.botId);
			return writer;
		};

		/**
		 * Encodes the specified SubscribeBotInput message, length delimited. Does not implicitly {@link user.SubscribeBotInput.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof user.SubscribeBotInput
		 * @static
		 * @param {user.ISubscribeBotInput} message SubscribeBotInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		SubscribeBotInput.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a SubscribeBotInput message from the specified reader or buffer.
		 * @function decode
		 * @memberof user.SubscribeBotInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {user.SubscribeBotInput} SubscribeBotInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		SubscribeBotInput.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.user.SubscribeBotInput();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
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
		 * Decodes a SubscribeBotInput message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof user.SubscribeBotInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {user.SubscribeBotInput} SubscribeBotInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		SubscribeBotInput.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a SubscribeBotInput message.
		 * @function verify
		 * @memberof user.SubscribeBotInput
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		SubscribeBotInput.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.botId !== null && message.hasOwnProperty("botId"))
				if (!$util.isString(message.botId)) return "botId: string expected";
			return null;
		};

		/**
		 * Creates a SubscribeBotInput message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof user.SubscribeBotInput
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {user.SubscribeBotInput} SubscribeBotInput
		 */
		SubscribeBotInput.fromObject = function fromObject(object) {
			if (object instanceof $root.user.SubscribeBotInput) return object;
			var message = new $root.user.SubscribeBotInput();
			if (object.botId !== null) message.botId = String(object.botId);
			return message;
		};

		/**
		 * Creates a plain object from a SubscribeBotInput message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof user.SubscribeBotInput
		 * @static
		 * @param {user.SubscribeBotInput} message SubscribeBotInput
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		SubscribeBotInput.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) object.botId = "";
			if (message.botId !== null && message.hasOwnProperty("botId"))
				object.botId = message.botId;
			return object;
		};

		/**
		 * Converts this SubscribeBotInput to JSON.
		 * @function toJSON
		 * @memberof user.SubscribeBotInput
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		SubscribeBotInput.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return SubscribeBotInput;
	})();

	user.SubscribeBotResponse = (function () {
		/**
		 * Properties of a SubscribeBotResponse.
		 * @memberof user
		 * @interface ISubscribeBotResponse
		 * @property {number|null} [error] SubscribeBotResponse error
		 * @property {Array.<boolean>|null} [content] SubscribeBotResponse content
		 */

		/**
		 * Constructs a new SubscribeBotResponse.
		 * @memberof user
		 * @classdesc Represents a SubscribeBotResponse.
		 * @implements ISubscribeBotResponse
		 * @constructor
		 * @param {user.ISubscribeBotResponse=} [properties] Properties to set
		 */
		function SubscribeBotResponse(properties) {
			this.content = [];
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * SubscribeBotResponse error.
		 * @member {number} error
		 * @memberof user.SubscribeBotResponse
		 * @instance
		 */
		SubscribeBotResponse.prototype.error = 0;

		/**
		 * SubscribeBotResponse content.
		 * @member {Array.<boolean>} content
		 * @memberof user.SubscribeBotResponse
		 * @instance
		 */
		SubscribeBotResponse.prototype.content = $util.emptyArray;

		/**
		 * Creates a new SubscribeBotResponse instance using the specified properties.
		 * @function create
		 * @memberof user.SubscribeBotResponse
		 * @static
		 * @param {user.ISubscribeBotResponse=} [properties] Properties to set
		 * @returns {user.SubscribeBotResponse} SubscribeBotResponse instance
		 */
		SubscribeBotResponse.create = function create(properties) {
			return new SubscribeBotResponse(properties);
		};

		/**
		 * Encodes the specified SubscribeBotResponse message. Does not implicitly {@link user.SubscribeBotResponse.verify|verify} messages.
		 * @function encode
		 * @memberof user.SubscribeBotResponse
		 * @static
		 * @param {user.ISubscribeBotResponse} message SubscribeBotResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		SubscribeBotResponse.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.error !== null &&
				Object.hasOwnProperty.call(message, "error")
			)
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
		 * Encodes the specified SubscribeBotResponse message, length delimited. Does not implicitly {@link user.SubscribeBotResponse.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof user.SubscribeBotResponse
		 * @static
		 * @param {user.ISubscribeBotResponse} message SubscribeBotResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		SubscribeBotResponse.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a SubscribeBotResponse message from the specified reader or buffer.
		 * @function decode
		 * @memberof user.SubscribeBotResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {user.SubscribeBotResponse} SubscribeBotResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		SubscribeBotResponse.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.user.SubscribeBotResponse();
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
		 * Decodes a SubscribeBotResponse message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof user.SubscribeBotResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {user.SubscribeBotResponse} SubscribeBotResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		SubscribeBotResponse.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a SubscribeBotResponse message.
		 * @function verify
		 * @memberof user.SubscribeBotResponse
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		SubscribeBotResponse.verify = function verify(message) {
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
		 * Creates a SubscribeBotResponse message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof user.SubscribeBotResponse
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {user.SubscribeBotResponse} SubscribeBotResponse
		 */
		SubscribeBotResponse.fromObject = function fromObject(object) {
			if (object instanceof $root.user.SubscribeBotResponse) return object;
			var message = new $root.user.SubscribeBotResponse();
			if (object.error !== null) message.error = object.error | 0;
			if (object.content) {
				if (!Array.isArray(object.content))
					throw TypeError(".user.SubscribeBotResponse.content: array expected");
				message.content = [];
				for (var i = 0; i < object.content.length; ++i)
					message.content[i] = Boolean(object.content[i]);
			}
			return message;
		};

		/**
		 * Creates a plain object from a SubscribeBotResponse message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof user.SubscribeBotResponse
		 * @static
		 * @param {user.SubscribeBotResponse} message SubscribeBotResponse
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		SubscribeBotResponse.toObject = function toObject(message, options) {
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
		 * Converts this SubscribeBotResponse to JSON.
		 * @function toJSON
		 * @memberof user.SubscribeBotResponse
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		SubscribeBotResponse.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return SubscribeBotResponse;
	})();

	user.SubscribeDomainInput = (function () {
		/**
		 * Properties of a SubscribeDomainInput.
		 * @memberof user
		 * @interface ISubscribeDomainInput
		 * @property {string|null} [verificationCode] SubscribeDomainInput verificationCode
		 */

		/**
		 * Constructs a new SubscribeDomainInput.
		 * @memberof user
		 * @classdesc Represents a SubscribeDomainInput.
		 * @implements ISubscribeDomainInput
		 * @constructor
		 * @param {user.ISubscribeDomainInput=} [properties] Properties to set
		 */
		function SubscribeDomainInput(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * SubscribeDomainInput verificationCode.
		 * @member {string} verificationCode
		 * @memberof user.SubscribeDomainInput
		 * @instance
		 */
		SubscribeDomainInput.prototype.verificationCode = "";

		/**
		 * Creates a new SubscribeDomainInput instance using the specified properties.
		 * @function create
		 * @memberof user.SubscribeDomainInput
		 * @static
		 * @param {user.ISubscribeDomainInput=} [properties] Properties to set
		 * @returns {user.SubscribeDomainInput} SubscribeDomainInput instance
		 */
		SubscribeDomainInput.create = function create(properties) {
			return new SubscribeDomainInput(properties);
		};

		/**
		 * Encodes the specified SubscribeDomainInput message. Does not implicitly {@link user.SubscribeDomainInput.verify|verify} messages.
		 * @function encode
		 * @memberof user.SubscribeDomainInput
		 * @static
		 * @param {user.ISubscribeDomainInput} message SubscribeDomainInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		SubscribeDomainInput.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.verificationCode !== null &&
				Object.hasOwnProperty.call(message, "verificationCode")
			)
				writer
					.uint32(/* id 1, wireType 2 =*/ 10)
					.string(message.verificationCode);
			return writer;
		};

		/**
		 * Encodes the specified SubscribeDomainInput message, length delimited. Does not implicitly {@link user.SubscribeDomainInput.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof user.SubscribeDomainInput
		 * @static
		 * @param {user.ISubscribeDomainInput} message SubscribeDomainInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		SubscribeDomainInput.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a SubscribeDomainInput message from the specified reader or buffer.
		 * @function decode
		 * @memberof user.SubscribeDomainInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {user.SubscribeDomainInput} SubscribeDomainInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		SubscribeDomainInput.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.user.SubscribeDomainInput();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.verificationCode = reader.string();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a SubscribeDomainInput message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof user.SubscribeDomainInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {user.SubscribeDomainInput} SubscribeDomainInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		SubscribeDomainInput.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a SubscribeDomainInput message.
		 * @function verify
		 * @memberof user.SubscribeDomainInput
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		SubscribeDomainInput.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (
				message.verificationCode !== null &&
				message.hasOwnProperty("verificationCode")
			)
				if (!$util.isString(message.verificationCode))
					return "verificationCode: string expected";
			return null;
		};

		/**
		 * Creates a SubscribeDomainInput message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof user.SubscribeDomainInput
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {user.SubscribeDomainInput} SubscribeDomainInput
		 */
		SubscribeDomainInput.fromObject = function fromObject(object) {
			if (object instanceof $root.user.SubscribeDomainInput) return object;
			var message = new $root.user.SubscribeDomainInput();
			if (object.verificationCode !== null)
				message.verificationCode = String(object.verificationCode);
			return message;
		};

		/**
		 * Creates a plain object from a SubscribeDomainInput message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof user.SubscribeDomainInput
		 * @static
		 * @param {user.SubscribeDomainInput} message SubscribeDomainInput
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		SubscribeDomainInput.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) object.verificationCode = "";
			if (
				message.verificationCode !== null &&
				message.hasOwnProperty("verificationCode")
			)
				object.verificationCode = message.verificationCode;
			return object;
		};

		/**
		 * Converts this SubscribeDomainInput to JSON.
		 * @function toJSON
		 * @memberof user.SubscribeDomainInput
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		SubscribeDomainInput.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return SubscribeDomainInput;
	})();

	user.SubscribeDomainResponse = (function () {
		/**
		 * Properties of a SubscribeDomainResponse.
		 * @memberof user
		 * @interface ISubscribeDomainResponse
		 * @property {Array.<user.IUserDomain>|null} [content] SubscribeDomainResponse content
		 * @property {number|null} [error] SubscribeDomainResponse error
		 * @property {string|null} [errorMessage] SubscribeDomainResponse errorMessage
		 */

		/**
		 * Constructs a new SubscribeDomainResponse.
		 * @memberof user
		 * @classdesc Represents a SubscribeDomainResponse.
		 * @implements ISubscribeDomainResponse
		 * @constructor
		 * @param {user.ISubscribeDomainResponse=} [properties] Properties to set
		 */
		function SubscribeDomainResponse(properties) {
			this.content = [];
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * SubscribeDomainResponse content.
		 * @member {Array.<user.IUserDomain>} content
		 * @memberof user.SubscribeDomainResponse
		 * @instance
		 */
		SubscribeDomainResponse.prototype.content = $util.emptyArray;

		/**
		 * SubscribeDomainResponse error.
		 * @member {number} error
		 * @memberof user.SubscribeDomainResponse
		 * @instance
		 */
		SubscribeDomainResponse.prototype.error = 0;

		/**
		 * SubscribeDomainResponse errorMessage.
		 * @member {string} errorMessage
		 * @memberof user.SubscribeDomainResponse
		 * @instance
		 */
		SubscribeDomainResponse.prototype.errorMessage = "";

		/**
		 * Creates a new SubscribeDomainResponse instance using the specified properties.
		 * @function create
		 * @memberof user.SubscribeDomainResponse
		 * @static
		 * @param {user.ISubscribeDomainResponse=} [properties] Properties to set
		 * @returns {user.SubscribeDomainResponse} SubscribeDomainResponse instance
		 */
		SubscribeDomainResponse.create = function create(properties) {
			return new SubscribeDomainResponse(properties);
		};

		/**
		 * Encodes the specified SubscribeDomainResponse message. Does not implicitly {@link user.SubscribeDomainResponse.verify|verify} messages.
		 * @function encode
		 * @memberof user.SubscribeDomainResponse
		 * @static
		 * @param {user.ISubscribeDomainResponse} message SubscribeDomainResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		SubscribeDomainResponse.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.content !== null && message.content.length)
				for (var i = 0; i < message.content.length; ++i)
					$root.user.UserDomain.encode(
						message.content[i],
						writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
					).ldelim();
			if (
				message.error !== null &&
				Object.hasOwnProperty.call(message, "error")
			)
				writer.uint32(/* id 2, wireType 0 =*/ 16).int32(message.error);
			if (
				message.errorMessage !== null &&
				Object.hasOwnProperty.call(message, "errorMessage")
			)
				writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.errorMessage);
			return writer;
		};

		/**
		 * Encodes the specified SubscribeDomainResponse message, length delimited. Does not implicitly {@link user.SubscribeDomainResponse.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof user.SubscribeDomainResponse
		 * @static
		 * @param {user.ISubscribeDomainResponse} message SubscribeDomainResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		SubscribeDomainResponse.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a SubscribeDomainResponse message from the specified reader or buffer.
		 * @function decode
		 * @memberof user.SubscribeDomainResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {user.SubscribeDomainResponse} SubscribeDomainResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		SubscribeDomainResponse.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.user.SubscribeDomainResponse();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						if (!(message.content && message.content.length))
							message.content = [];
						message.content.push(
							$root.user.UserDomain.decode(reader, reader.uint32())
						);
						break;
					case 2:
						message.error = reader.int32();
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
		 * Decodes a SubscribeDomainResponse message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof user.SubscribeDomainResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {user.SubscribeDomainResponse} SubscribeDomainResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		SubscribeDomainResponse.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a SubscribeDomainResponse message.
		 * @function verify
		 * @memberof user.SubscribeDomainResponse
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		SubscribeDomainResponse.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.content !== null && message.hasOwnProperty("content")) {
				if (!Array.isArray(message.content)) return "content: array expected";
				for (var i = 0; i < message.content.length; ++i) {
					var error = $root.user.UserDomain.verify(message.content[i]);
					if (error) return "content." + error;
				}
			}
			if (message.error !== null && message.hasOwnProperty("error"))
				if (!$util.isInteger(message.error)) return "error: integer expected";
			if (
				message.errorMessage !== null &&
				message.hasOwnProperty("errorMessage")
			)
				if (!$util.isString(message.errorMessage))
					return "errorMessage: string expected";
			return null;
		};

		/**
		 * Creates a SubscribeDomainResponse message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof user.SubscribeDomainResponse
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {user.SubscribeDomainResponse} SubscribeDomainResponse
		 */
		SubscribeDomainResponse.fromObject = function fromObject(object) {
			if (object instanceof $root.user.SubscribeDomainResponse) return object;
			var message = new $root.user.SubscribeDomainResponse();
			if (object.content) {
				if (!Array.isArray(object.content))
					throw TypeError(
						".user.SubscribeDomainResponse.content: array expected"
					);
				message.content = [];
				for (var i = 0; i < object.content.length; ++i) {
					if (typeof object.content[i] !== "object")
						throw TypeError(
							".user.SubscribeDomainResponse.content: object expected"
						);
					message.content[i] = $root.user.UserDomain.fromObject(
						object.content[i]
					);
				}
			}
			if (object.error !== null) message.error = object.error | 0;
			if (object.errorMessage !== null)
				message.errorMessage = String(object.errorMessage);
			return message;
		};

		/**
		 * Creates a plain object from a SubscribeDomainResponse message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof user.SubscribeDomainResponse
		 * @static
		 * @param {user.SubscribeDomainResponse} message SubscribeDomainResponse
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		SubscribeDomainResponse.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.arrays || options.defaults) object.content = [];
			if (options.defaults) {
				object.error = 0;
				object.errorMessage = "";
			}
			if (message.content && message.content.length) {
				object.content = [];
				for (var j = 0; j < message.content.length; ++j)
					object.content[j] = $root.user.UserDomain.toObject(
						message.content[j],
						options
					);
			}
			if (message.error !== null && message.hasOwnProperty("error"))
				object.error = message.error;
			if (
				message.errorMessage !== null &&
				message.hasOwnProperty("errorMessage")
			)
				object.errorMessage = message.errorMessage;
			return object;
		};

		/**
		 * Converts this SubscribeDomainResponse to JSON.
		 * @function toJSON
		 * @memberof user.SubscribeDomainResponse
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		SubscribeDomainResponse.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return SubscribeDomainResponse;
	})();

	user.VoipToggleResponse = (function () {
		/**
		 * Properties of a VoipToggleResponse.
		 * @memberof user
		 * @interface IVoipToggleResponse
		 * @property {boolean|null} [success] VoipToggleResponse success
		 */

		/**
		 * Constructs a new VoipToggleResponse.
		 * @memberof user
		 * @classdesc Represents a VoipToggleResponse.
		 * @implements IVoipToggleResponse
		 * @constructor
		 * @param {user.IVoipToggleResponse=} [properties] Properties to set
		 */
		function VoipToggleResponse(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * VoipToggleResponse success.
		 * @member {boolean} success
		 * @memberof user.VoipToggleResponse
		 * @instance
		 */
		VoipToggleResponse.prototype.success = false;

		/**
		 * Creates a new VoipToggleResponse instance using the specified properties.
		 * @function create
		 * @memberof user.VoipToggleResponse
		 * @static
		 * @param {user.IVoipToggleResponse=} [properties] Properties to set
		 * @returns {user.VoipToggleResponse} VoipToggleResponse instance
		 */
		VoipToggleResponse.create = function create(properties) {
			return new VoipToggleResponse(properties);
		};

		/**
		 * Encodes the specified VoipToggleResponse message. Does not implicitly {@link user.VoipToggleResponse.verify|verify} messages.
		 * @function encode
		 * @memberof user.VoipToggleResponse
		 * @static
		 * @param {user.IVoipToggleResponse} message VoipToggleResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		VoipToggleResponse.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.success !== null &&
				Object.hasOwnProperty.call(message, "success")
			)
				writer.uint32(/* id 1, wireType 0 =*/ 8).bool(message.success);
			return writer;
		};

		/**
		 * Encodes the specified VoipToggleResponse message, length delimited. Does not implicitly {@link user.VoipToggleResponse.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof user.VoipToggleResponse
		 * @static
		 * @param {user.IVoipToggleResponse} message VoipToggleResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		VoipToggleResponse.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a VoipToggleResponse message from the specified reader or buffer.
		 * @function decode
		 * @memberof user.VoipToggleResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {user.VoipToggleResponse} VoipToggleResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		VoipToggleResponse.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.user.VoipToggleResponse();
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
		 * Decodes a VoipToggleResponse message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof user.VoipToggleResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {user.VoipToggleResponse} VoipToggleResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		VoipToggleResponse.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a VoipToggleResponse message.
		 * @function verify
		 * @memberof user.VoipToggleResponse
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		VoipToggleResponse.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.success !== null && message.hasOwnProperty("success"))
				if (typeof message.success !== "boolean")
					return "success: boolean expected";
			return null;
		};

		/**
		 * Creates a VoipToggleResponse message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof user.VoipToggleResponse
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {user.VoipToggleResponse} VoipToggleResponse
		 */
		VoipToggleResponse.fromObject = function fromObject(object) {
			if (object instanceof $root.user.VoipToggleResponse) return object;
			var message = new $root.user.VoipToggleResponse();
			if (object.success !== null) message.success = Boolean(object.success);
			return message;
		};

		/**
		 * Creates a plain object from a VoipToggleResponse message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof user.VoipToggleResponse
		 * @static
		 * @param {user.VoipToggleResponse} message VoipToggleResponse
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		VoipToggleResponse.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) object.success = false;
			if (message.success !== null && message.hasOwnProperty("success"))
				object.success = message.success;
			return object;
		};

		/**
		 * Converts this VoipToggleResponse to JSON.
		 * @function toJSON
		 * @memberof user.VoipToggleResponse
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		VoipToggleResponse.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return VoipToggleResponse;
	})();

	user.VoipStatusInput = (function () {
		/**
		 * Properties of a VoipStatusInput.
		 * @memberof user
		 * @interface IVoipStatusInput
		 * @property {string|null} [userId] VoipStatusInput userId
		 */

		/**
		 * Constructs a new VoipStatusInput.
		 * @memberof user
		 * @classdesc Represents a VoipStatusInput.
		 * @implements IVoipStatusInput
		 * @constructor
		 * @param {user.IVoipStatusInput=} [properties] Properties to set
		 */
		function VoipStatusInput(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * VoipStatusInput userId.
		 * @member {string} userId
		 * @memberof user.VoipStatusInput
		 * @instance
		 */
		VoipStatusInput.prototype.userId = "";

		/**
		 * Creates a new VoipStatusInput instance using the specified properties.
		 * @function create
		 * @memberof user.VoipStatusInput
		 * @static
		 * @param {user.IVoipStatusInput=} [properties] Properties to set
		 * @returns {user.VoipStatusInput} VoipStatusInput instance
		 */
		VoipStatusInput.create = function create(properties) {
			return new VoipStatusInput(properties);
		};

		/**
		 * Encodes the specified VoipStatusInput message. Does not implicitly {@link user.VoipStatusInput.verify|verify} messages.
		 * @function encode
		 * @memberof user.VoipStatusInput
		 * @static
		 * @param {user.IVoipStatusInput} message VoipStatusInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		VoipStatusInput.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.userId !== null &&
				Object.hasOwnProperty.call(message, "userId")
			)
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.userId);
			return writer;
		};

		/**
		 * Encodes the specified VoipStatusInput message, length delimited. Does not implicitly {@link user.VoipStatusInput.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof user.VoipStatusInput
		 * @static
		 * @param {user.IVoipStatusInput} message VoipStatusInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		VoipStatusInput.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a VoipStatusInput message from the specified reader or buffer.
		 * @function decode
		 * @memberof user.VoipStatusInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {user.VoipStatusInput} VoipStatusInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		VoipStatusInput.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.user.VoipStatusInput();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
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
		 * Decodes a VoipStatusInput message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof user.VoipStatusInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {user.VoipStatusInput} VoipStatusInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		VoipStatusInput.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a VoipStatusInput message.
		 * @function verify
		 * @memberof user.VoipStatusInput
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		VoipStatusInput.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.userId !== null && message.hasOwnProperty("userId"))
				if (!$util.isString(message.userId)) return "userId: string expected";
			return null;
		};

		/**
		 * Creates a VoipStatusInput message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof user.VoipStatusInput
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {user.VoipStatusInput} VoipStatusInput
		 */
		VoipStatusInput.fromObject = function fromObject(object) {
			if (object instanceof $root.user.VoipStatusInput) return object;
			var message = new $root.user.VoipStatusInput();
			if (object.userId !== null) message.userId = String(object.userId);
			return message;
		};

		/**
		 * Creates a plain object from a VoipStatusInput message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof user.VoipStatusInput
		 * @static
		 * @param {user.VoipStatusInput} message VoipStatusInput
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		VoipStatusInput.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) object.userId = "";
			if (message.userId !== null && message.hasOwnProperty("userId"))
				object.userId = message.userId;
			return object;
		};

		/**
		 * Converts this VoipStatusInput to JSON.
		 * @function toJSON
		 * @memberof user.VoipStatusInput
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		VoipStatusInput.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return VoipStatusInput;
	})();

	user.VoipStatusResponse = (function () {
		/**
		 * Properties of a VoipStatusResponse.
		 * @memberof user
		 * @interface IVoipStatusResponse
		 * @property {boolean|null} [voipEnabled] VoipStatusResponse voipEnabled
		 * @property {boolean|null} [isPostpaidUser] VoipStatusResponse isPostpaidUser
		 * @property {number|null} [error] VoipStatusResponse error
		 */

		/**
		 * Constructs a new VoipStatusResponse.
		 * @memberof user
		 * @classdesc Represents a VoipStatusResponse.
		 * @implements IVoipStatusResponse
		 * @constructor
		 * @param {user.IVoipStatusResponse=} [properties] Properties to set
		 */
		function VoipStatusResponse(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * VoipStatusResponse voipEnabled.
		 * @member {boolean} voipEnabled
		 * @memberof user.VoipStatusResponse
		 * @instance
		 */
		VoipStatusResponse.prototype.voipEnabled = false;

		/**
		 * VoipStatusResponse isPostpaidUser.
		 * @member {boolean} isPostpaidUser
		 * @memberof user.VoipStatusResponse
		 * @instance
		 */
		VoipStatusResponse.prototype.isPostpaidUser = false;

		/**
		 * VoipStatusResponse error.
		 * @member {number} error
		 * @memberof user.VoipStatusResponse
		 * @instance
		 */
		VoipStatusResponse.prototype.error = 0;

		/**
		 * Creates a new VoipStatusResponse instance using the specified properties.
		 * @function create
		 * @memberof user.VoipStatusResponse
		 * @static
		 * @param {user.IVoipStatusResponse=} [properties] Properties to set
		 * @returns {user.VoipStatusResponse} VoipStatusResponse instance
		 */
		VoipStatusResponse.create = function create(properties) {
			return new VoipStatusResponse(properties);
		};

		/**
		 * Encodes the specified VoipStatusResponse message. Does not implicitly {@link user.VoipStatusResponse.verify|verify} messages.
		 * @function encode
		 * @memberof user.VoipStatusResponse
		 * @static
		 * @param {user.IVoipStatusResponse} message VoipStatusResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		VoipStatusResponse.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.voipEnabled !== null &&
				Object.hasOwnProperty.call(message, "voipEnabled")
			)
				writer.uint32(/* id 1, wireType 0 =*/ 8).bool(message.voipEnabled);
			if (
				message.isPostpaidUser !== null &&
				Object.hasOwnProperty.call(message, "isPostpaidUser")
			)
				writer.uint32(/* id 2, wireType 0 =*/ 16).bool(message.isPostpaidUser);
			if (
				message.error !== null &&
				Object.hasOwnProperty.call(message, "error")
			)
				writer.uint32(/* id 3, wireType 0 =*/ 24).int32(message.error);
			return writer;
		};

		/**
		 * Encodes the specified VoipStatusResponse message, length delimited. Does not implicitly {@link user.VoipStatusResponse.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof user.VoipStatusResponse
		 * @static
		 * @param {user.IVoipStatusResponse} message VoipStatusResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		VoipStatusResponse.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a VoipStatusResponse message from the specified reader or buffer.
		 * @function decode
		 * @memberof user.VoipStatusResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {user.VoipStatusResponse} VoipStatusResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		VoipStatusResponse.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.user.VoipStatusResponse();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.voipEnabled = reader.bool();
						break;
					case 2:
						message.isPostpaidUser = reader.bool();
						break;
					case 3:
						message.error = reader.int32();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a VoipStatusResponse message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof user.VoipStatusResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {user.VoipStatusResponse} VoipStatusResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		VoipStatusResponse.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a VoipStatusResponse message.
		 * @function verify
		 * @memberof user.VoipStatusResponse
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		VoipStatusResponse.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.voipEnabled !== null && message.hasOwnProperty("voipEnabled"))
				if (typeof message.voipEnabled !== "boolean")
					return "voipEnabled: boolean expected";
			if (
				message.isPostpaidUser !== null &&
				message.hasOwnProperty("isPostpaidUser")
			)
				if (typeof message.isPostpaidUser !== "boolean")
					return "isPostpaidUser: boolean expected";
			if (message.error !== null && message.hasOwnProperty("error"))
				if (!$util.isInteger(message.error)) return "error: integer expected";
			return null;
		};

		/**
		 * Creates a VoipStatusResponse message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof user.VoipStatusResponse
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {user.VoipStatusResponse} VoipStatusResponse
		 */
		VoipStatusResponse.fromObject = function fromObject(object) {
			if (object instanceof $root.user.VoipStatusResponse) return object;
			var message = new $root.user.VoipStatusResponse();
			if (object.voipEnabled !== null)
				message.voipEnabled = Boolean(object.voipEnabled);
			if (object.isPostpaidUser !== null)
				message.isPostpaidUser = Boolean(object.isPostpaidUser);
			if (object.error !== null) message.error = object.error | 0;
			return message;
		};

		/**
		 * Creates a plain object from a VoipStatusResponse message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof user.VoipStatusResponse
		 * @static
		 * @param {user.VoipStatusResponse} message VoipStatusResponse
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		VoipStatusResponse.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.voipEnabled = false;
				object.isPostpaidUser = false;
				object.error = 0;
			}
			if (message.voipEnabled !== null && message.hasOwnProperty("voipEnabled"))
				object.voipEnabled = message.voipEnabled;
			if (
				message.isPostpaidUser !== null &&
				message.hasOwnProperty("isPostpaidUser")
			)
				object.isPostpaidUser = message.isPostpaidUser;
			if (message.error !== null && message.hasOwnProperty("error"))
				object.error = message.error;
			return object;
		};

		/**
		 * Converts this VoipStatusResponse to JSON.
		 * @function toJSON
		 * @memberof user.VoipStatusResponse
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		VoipStatusResponse.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return VoipStatusResponse;
	})();

	user.TwilioTokenInput = (function () {
		/**
		 * Properties of a TwilioTokenInput.
		 * @memberof user
		 * @interface ITwilioTokenInput
		 * @property {string|null} [platform] TwilioTokenInput platform
		 * @property {string|null} [env] TwilioTokenInput env
		 * @property {string|null} [appType] TwilioTokenInput appType
		 */

		/**
		 * Constructs a new TwilioTokenInput.
		 * @memberof user
		 * @classdesc Represents a TwilioTokenInput.
		 * @implements ITwilioTokenInput
		 * @constructor
		 * @param {user.ITwilioTokenInput=} [properties] Properties to set
		 */
		function TwilioTokenInput(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * TwilioTokenInput platform.
		 * @member {string} platform
		 * @memberof user.TwilioTokenInput
		 * @instance
		 */
		TwilioTokenInput.prototype.platform = "";

		/**
		 * TwilioTokenInput env.
		 * @member {string} env
		 * @memberof user.TwilioTokenInput
		 * @instance
		 */
		TwilioTokenInput.prototype.env = "";

		/**
		 * TwilioTokenInput appType.
		 * @member {string} appType
		 * @memberof user.TwilioTokenInput
		 * @instance
		 */
		TwilioTokenInput.prototype.appType = "";

		/**
		 * Creates a new TwilioTokenInput instance using the specified properties.
		 * @function create
		 * @memberof user.TwilioTokenInput
		 * @static
		 * @param {user.ITwilioTokenInput=} [properties] Properties to set
		 * @returns {user.TwilioTokenInput} TwilioTokenInput instance
		 */
		TwilioTokenInput.create = function create(properties) {
			return new TwilioTokenInput(properties);
		};

		/**
		 * Encodes the specified TwilioTokenInput message. Does not implicitly {@link user.TwilioTokenInput.verify|verify} messages.
		 * @function encode
		 * @memberof user.TwilioTokenInput
		 * @static
		 * @param {user.ITwilioTokenInput} message TwilioTokenInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		TwilioTokenInput.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.platform !== null &&
				Object.hasOwnProperty.call(message, "platform")
			)
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.platform);
			if (message.env !== null && Object.hasOwnProperty.call(message, "env"))
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.env);
			if (
				message.appType !== null &&
				Object.hasOwnProperty.call(message, "appType")
			)
				writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.appType);
			return writer;
		};

		/**
		 * Encodes the specified TwilioTokenInput message, length delimited. Does not implicitly {@link user.TwilioTokenInput.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof user.TwilioTokenInput
		 * @static
		 * @param {user.ITwilioTokenInput} message TwilioTokenInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		TwilioTokenInput.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a TwilioTokenInput message from the specified reader or buffer.
		 * @function decode
		 * @memberof user.TwilioTokenInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {user.TwilioTokenInput} TwilioTokenInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		TwilioTokenInput.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.user.TwilioTokenInput();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.platform = reader.string();
						break;
					case 2:
						message.env = reader.string();
						break;
					case 3:
						message.appType = reader.string();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a TwilioTokenInput message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof user.TwilioTokenInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {user.TwilioTokenInput} TwilioTokenInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		TwilioTokenInput.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a TwilioTokenInput message.
		 * @function verify
		 * @memberof user.TwilioTokenInput
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		TwilioTokenInput.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.platform !== null && message.hasOwnProperty("platform"))
				if (!$util.isString(message.platform))
					return "platform: string expected";
			if (message.env !== null && message.hasOwnProperty("env"))
				if (!$util.isString(message.env)) return "env: string expected";
			if (message.appType !== null && message.hasOwnProperty("appType"))
				if (!$util.isString(message.appType)) return "appType: string expected";
			return null;
		};

		/**
		 * Creates a TwilioTokenInput message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof user.TwilioTokenInput
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {user.TwilioTokenInput} TwilioTokenInput
		 */
		TwilioTokenInput.fromObject = function fromObject(object) {
			if (object instanceof $root.user.TwilioTokenInput) return object;
			var message = new $root.user.TwilioTokenInput();
			if (object.platform !== null) message.platform = String(object.platform);
			if (object.env !== null) message.env = String(object.env);
			if (object.appType !== null) message.appType = String(object.appType);
			return message;
		};

		/**
		 * Creates a plain object from a TwilioTokenInput message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof user.TwilioTokenInput
		 * @static
		 * @param {user.TwilioTokenInput} message TwilioTokenInput
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		TwilioTokenInput.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.platform = "";
				object.env = "";
				object.appType = "";
			}
			if (message.platform !== null && message.hasOwnProperty("platform"))
				object.platform = message.platform;
			if (message.env !== null && message.hasOwnProperty("env"))
				object.env = message.env;
			if (message.appType !== null && message.hasOwnProperty("appType"))
				object.appType = message.appType;
			return object;
		};

		/**
		 * Converts this TwilioTokenInput to JSON.
		 * @function toJSON
		 * @memberof user.TwilioTokenInput
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		TwilioTokenInput.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return TwilioTokenInput;
	})();

	user.TwilioTokenResponse = (function () {
		/**
		 * Properties of a TwilioTokenResponse.
		 * @memberof user
		 * @interface ITwilioTokenResponse
		 * @property {string|null} [accessToken] TwilioTokenResponse accessToken
		 */

		/**
		 * Constructs a new TwilioTokenResponse.
		 * @memberof user
		 * @classdesc Represents a TwilioTokenResponse.
		 * @implements ITwilioTokenResponse
		 * @constructor
		 * @param {user.ITwilioTokenResponse=} [properties] Properties to set
		 */
		function TwilioTokenResponse(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * TwilioTokenResponse accessToken.
		 * @member {string} accessToken
		 * @memberof user.TwilioTokenResponse
		 * @instance
		 */
		TwilioTokenResponse.prototype.accessToken = "";

		/**
		 * Creates a new TwilioTokenResponse instance using the specified properties.
		 * @function create
		 * @memberof user.TwilioTokenResponse
		 * @static
		 * @param {user.ITwilioTokenResponse=} [properties] Properties to set
		 * @returns {user.TwilioTokenResponse} TwilioTokenResponse instance
		 */
		TwilioTokenResponse.create = function create(properties) {
			return new TwilioTokenResponse(properties);
		};

		/**
		 * Encodes the specified TwilioTokenResponse message. Does not implicitly {@link user.TwilioTokenResponse.verify|verify} messages.
		 * @function encode
		 * @memberof user.TwilioTokenResponse
		 * @static
		 * @param {user.ITwilioTokenResponse} message TwilioTokenResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		TwilioTokenResponse.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.accessToken !== null &&
				Object.hasOwnProperty.call(message, "accessToken")
			)
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.accessToken);
			return writer;
		};

		/**
		 * Encodes the specified TwilioTokenResponse message, length delimited. Does not implicitly {@link user.TwilioTokenResponse.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof user.TwilioTokenResponse
		 * @static
		 * @param {user.ITwilioTokenResponse} message TwilioTokenResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		TwilioTokenResponse.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a TwilioTokenResponse message from the specified reader or buffer.
		 * @function decode
		 * @memberof user.TwilioTokenResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {user.TwilioTokenResponse} TwilioTokenResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		TwilioTokenResponse.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.user.TwilioTokenResponse();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.accessToken = reader.string();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a TwilioTokenResponse message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof user.TwilioTokenResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {user.TwilioTokenResponse} TwilioTokenResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		TwilioTokenResponse.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a TwilioTokenResponse message.
		 * @function verify
		 * @memberof user.TwilioTokenResponse
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		TwilioTokenResponse.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.accessToken !== null && message.hasOwnProperty("accessToken"))
				if (!$util.isString(message.accessToken))
					return "accessToken: string expected";
			return null;
		};

		/**
		 * Creates a TwilioTokenResponse message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof user.TwilioTokenResponse
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {user.TwilioTokenResponse} TwilioTokenResponse
		 */
		TwilioTokenResponse.fromObject = function fromObject(object) {
			if (object instanceof $root.user.TwilioTokenResponse) return object;
			var message = new $root.user.TwilioTokenResponse();
			if (object.accessToken !== null)
				message.accessToken = String(object.accessToken);
			return message;
		};

		/**
		 * Creates a plain object from a TwilioTokenResponse message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof user.TwilioTokenResponse
		 * @static
		 * @param {user.TwilioTokenResponse} message TwilioTokenResponse
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		TwilioTokenResponse.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) object.accessToken = "";
			if (message.accessToken !== null && message.hasOwnProperty("accessToken"))
				object.accessToken = message.accessToken;
			return object;
		};

		/**
		 * Converts this TwilioTokenResponse to JSON.
		 * @function toJSON
		 * @memberof user.TwilioTokenResponse
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		TwilioTokenResponse.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return TwilioTokenResponse;
	})();

	user.TwilioIceServersResponse = (function () {
		/**
		 * Properties of a TwilioIceServersResponse.
		 * @memberof user
		 * @interface ITwilioIceServersResponse
		 * @property {Array.<user.IIceServerObject>|null} [iceServers] TwilioIceServersResponse iceServers
		 */

		/**
		 * Constructs a new TwilioIceServersResponse.
		 * @memberof user
		 * @classdesc Represents a TwilioIceServersResponse.
		 * @implements ITwilioIceServersResponse
		 * @constructor
		 * @param {user.ITwilioIceServersResponse=} [properties] Properties to set
		 */
		function TwilioIceServersResponse(properties) {
			this.iceServers = [];
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * TwilioIceServersResponse iceServers.
		 * @member {Array.<user.IIceServerObject>} iceServers
		 * @memberof user.TwilioIceServersResponse
		 * @instance
		 */
		TwilioIceServersResponse.prototype.iceServers = $util.emptyArray;

		/**
		 * Creates a new TwilioIceServersResponse instance using the specified properties.
		 * @function create
		 * @memberof user.TwilioIceServersResponse
		 * @static
		 * @param {user.ITwilioIceServersResponse=} [properties] Properties to set
		 * @returns {user.TwilioIceServersResponse} TwilioIceServersResponse instance
		 */
		TwilioIceServersResponse.create = function create(properties) {
			return new TwilioIceServersResponse(properties);
		};

		/**
		 * Encodes the specified TwilioIceServersResponse message. Does not implicitly {@link user.TwilioIceServersResponse.verify|verify} messages.
		 * @function encode
		 * @memberof user.TwilioIceServersResponse
		 * @static
		 * @param {user.ITwilioIceServersResponse} message TwilioIceServersResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		TwilioIceServersResponse.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.iceServers !== null && message.iceServers.length)
				for (var i = 0; i < message.iceServers.length; ++i)
					$root.user.IceServerObject.encode(
						message.iceServers[i],
						writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
					).ldelim();
			return writer;
		};

		/**
		 * Encodes the specified TwilioIceServersResponse message, length delimited. Does not implicitly {@link user.TwilioIceServersResponse.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof user.TwilioIceServersResponse
		 * @static
		 * @param {user.ITwilioIceServersResponse} message TwilioIceServersResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		TwilioIceServersResponse.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a TwilioIceServersResponse message from the specified reader or buffer.
		 * @function decode
		 * @memberof user.TwilioIceServersResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {user.TwilioIceServersResponse} TwilioIceServersResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		TwilioIceServersResponse.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.user.TwilioIceServersResponse();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						if (!(message.iceServers && message.iceServers.length))
							message.iceServers = [];
						message.iceServers.push(
							$root.user.IceServerObject.decode(reader, reader.uint32())
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
		 * Decodes a TwilioIceServersResponse message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof user.TwilioIceServersResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {user.TwilioIceServersResponse} TwilioIceServersResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		TwilioIceServersResponse.decodeDelimited = function decodeDelimited(
			reader
		) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a TwilioIceServersResponse message.
		 * @function verify
		 * @memberof user.TwilioIceServersResponse
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		TwilioIceServersResponse.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.iceServers !== null && message.hasOwnProperty("iceServers")) {
				if (!Array.isArray(message.iceServers))
					return "iceServers: array expected";
				for (var i = 0; i < message.iceServers.length; ++i) {
					var error = $root.user.IceServerObject.verify(message.iceServers[i]);
					if (error) return "iceServers." + error;
				}
			}
			return null;
		};

		/**
		 * Creates a TwilioIceServersResponse message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof user.TwilioIceServersResponse
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {user.TwilioIceServersResponse} TwilioIceServersResponse
		 */
		TwilioIceServersResponse.fromObject = function fromObject(object) {
			if (object instanceof $root.user.TwilioIceServersResponse) return object;
			var message = new $root.user.TwilioIceServersResponse();
			if (object.iceServers) {
				if (!Array.isArray(object.iceServers))
					throw TypeError(
						".user.TwilioIceServersResponse.iceServers: array expected"
					);
				message.iceServers = [];
				for (var i = 0; i < object.iceServers.length; ++i) {
					if (typeof object.iceServers[i] !== "object")
						throw TypeError(
							".user.TwilioIceServersResponse.iceServers: object expected"
						);
					message.iceServers[i] = $root.user.IceServerObject.fromObject(
						object.iceServers[i]
					);
				}
			}
			return message;
		};

		/**
		 * Creates a plain object from a TwilioIceServersResponse message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof user.TwilioIceServersResponse
		 * @static
		 * @param {user.TwilioIceServersResponse} message TwilioIceServersResponse
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		TwilioIceServersResponse.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.arrays || options.defaults) object.iceServers = [];
			if (message.iceServers && message.iceServers.length) {
				object.iceServers = [];
				for (var j = 0; j < message.iceServers.length; ++j)
					object.iceServers[j] = $root.user.IceServerObject.toObject(
						message.iceServers[j],
						options
					);
			}
			return object;
		};

		/**
		 * Converts this TwilioIceServersResponse to JSON.
		 * @function toJSON
		 * @memberof user.TwilioIceServersResponse
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		TwilioIceServersResponse.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return TwilioIceServersResponse;
	})();

	user.IceServerObject = (function () {
		/**
		 * Properties of an IceServerObject.
		 * @memberof user
		 * @interface IIceServerObject
		 * @property {string|null} [url] IceServerObject url
		 * @property {string|null} [urls] IceServerObject urls
		 * @property {string|null} [username] IceServerObject username
		 * @property {string|null} [credential] IceServerObject credential
		 */

		/**
		 * Constructs a new IceServerObject.
		 * @memberof user
		 * @classdesc Represents an IceServerObject.
		 * @implements IIceServerObject
		 * @constructor
		 * @param {user.IIceServerObject=} [properties] Properties to set
		 */
		function IceServerObject(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * IceServerObject url.
		 * @member {string} url
		 * @memberof user.IceServerObject
		 * @instance
		 */
		IceServerObject.prototype.url = "";

		/**
		 * IceServerObject urls.
		 * @member {string} urls
		 * @memberof user.IceServerObject
		 * @instance
		 */
		IceServerObject.prototype.urls = "";

		/**
		 * IceServerObject username.
		 * @member {string} username
		 * @memberof user.IceServerObject
		 * @instance
		 */
		IceServerObject.prototype.username = "";

		/**
		 * IceServerObject credential.
		 * @member {string} credential
		 * @memberof user.IceServerObject
		 * @instance
		 */
		IceServerObject.prototype.credential = "";

		/**
		 * Creates a new IceServerObject instance using the specified properties.
		 * @function create
		 * @memberof user.IceServerObject
		 * @static
		 * @param {user.IIceServerObject=} [properties] Properties to set
		 * @returns {user.IceServerObject} IceServerObject instance
		 */
		IceServerObject.create = function create(properties) {
			return new IceServerObject(properties);
		};

		/**
		 * Encodes the specified IceServerObject message. Does not implicitly {@link user.IceServerObject.verify|verify} messages.
		 * @function encode
		 * @memberof user.IceServerObject
		 * @static
		 * @param {user.IIceServerObject} message IceServerObject message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		IceServerObject.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.url !== null && Object.hasOwnProperty.call(message, "url"))
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.url);
			if (message.urls !== null && Object.hasOwnProperty.call(message, "urls"))
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.urls);
			if (
				message.username !== null &&
				Object.hasOwnProperty.call(message, "username")
			)
				writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.username);
			if (
				message.credential !== null &&
				Object.hasOwnProperty.call(message, "credential")
			)
				writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.credential);
			return writer;
		};

		/**
		 * Encodes the specified IceServerObject message, length delimited. Does not implicitly {@link user.IceServerObject.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof user.IceServerObject
		 * @static
		 * @param {user.IIceServerObject} message IceServerObject message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		IceServerObject.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes an IceServerObject message from the specified reader or buffer.
		 * @function decode
		 * @memberof user.IceServerObject
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {user.IceServerObject} IceServerObject
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		IceServerObject.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.user.IceServerObject();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.url = reader.string();
						break;
					case 2:
						message.urls = reader.string();
						break;
					case 3:
						message.username = reader.string();
						break;
					case 4:
						message.credential = reader.string();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes an IceServerObject message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof user.IceServerObject
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {user.IceServerObject} IceServerObject
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		IceServerObject.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies an IceServerObject message.
		 * @function verify
		 * @memberof user.IceServerObject
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		IceServerObject.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.url !== null && message.hasOwnProperty("url"))
				if (!$util.isString(message.url)) return "url: string expected";
			if (message.urls !== null && message.hasOwnProperty("urls"))
				if (!$util.isString(message.urls)) return "urls: string expected";
			if (message.username !== null && message.hasOwnProperty("username"))
				if (!$util.isString(message.username))
					return "username: string expected";
			if (message.credential !== null && message.hasOwnProperty("credential"))
				if (!$util.isString(message.credential))
					return "credential: string expected";
			return null;
		};

		/**
		 * Creates an IceServerObject message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof user.IceServerObject
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {user.IceServerObject} IceServerObject
		 */
		IceServerObject.fromObject = function fromObject(object) {
			if (object instanceof $root.user.IceServerObject) return object;
			var message = new $root.user.IceServerObject();
			if (object.url !== null) message.url = String(object.url);
			if (object.urls !== null) message.urls = String(object.urls);
			if (object.username !== null) message.username = String(object.username);
			if (object.credential !== null)
				message.credential = String(object.credential);
			return message;
		};

		/**
		 * Creates a plain object from an IceServerObject message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof user.IceServerObject
		 * @static
		 * @param {user.IceServerObject} message IceServerObject
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		IceServerObject.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.url = "";
				object.urls = "";
				object.username = "";
				object.credential = "";
			}
			if (message.url !== null && message.hasOwnProperty("url"))
				object.url = message.url;
			if (message.urls !== null && message.hasOwnProperty("urls"))
				object.urls = message.urls;
			if (message.username !== null && message.hasOwnProperty("username"))
				object.username = message.username;
			if (message.credential !== null && message.hasOwnProperty("credential"))
				object.credential = message.credential;
			return object;
		};

		/**
		 * Converts this IceServerObject to JSON.
		 * @function toJSON
		 * @memberof user.IceServerObject
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		IceServerObject.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return IceServerObject;
	})();

	user.ManageTncInput = (function () {
		/**
		 * Properties of a ManageTncInput.
		 * @memberof user
		 * @interface IManageTncInput
		 * @property {string|null} [action] ManageTncInput action
		 */

		/**
		 * Constructs a new ManageTncInput.
		 * @memberof user
		 * @classdesc Represents a ManageTncInput.
		 * @implements IManageTncInput
		 * @constructor
		 * @param {user.IManageTncInput=} [properties] Properties to set
		 */
		function ManageTncInput(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * ManageTncInput action.
		 * @member {string} action
		 * @memberof user.ManageTncInput
		 * @instance
		 */
		ManageTncInput.prototype.action = "";

		/**
		 * Creates a new ManageTncInput instance using the specified properties.
		 * @function create
		 * @memberof user.ManageTncInput
		 * @static
		 * @param {user.IManageTncInput=} [properties] Properties to set
		 * @returns {user.ManageTncInput} ManageTncInput instance
		 */
		ManageTncInput.create = function create(properties) {
			return new ManageTncInput(properties);
		};

		/**
		 * Encodes the specified ManageTncInput message. Does not implicitly {@link user.ManageTncInput.verify|verify} messages.
		 * @function encode
		 * @memberof user.ManageTncInput
		 * @static
		 * @param {user.IManageTncInput} message ManageTncInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		ManageTncInput.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.action !== null &&
				Object.hasOwnProperty.call(message, "action")
			)
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.action);
			return writer;
		};

		/**
		 * Encodes the specified ManageTncInput message, length delimited. Does not implicitly {@link user.ManageTncInput.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof user.ManageTncInput
		 * @static
		 * @param {user.IManageTncInput} message ManageTncInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		ManageTncInput.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a ManageTncInput message from the specified reader or buffer.
		 * @function decode
		 * @memberof user.ManageTncInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {user.ManageTncInput} ManageTncInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		ManageTncInput.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.user.ManageTncInput();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
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
		 * Decodes a ManageTncInput message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof user.ManageTncInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {user.ManageTncInput} ManageTncInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		ManageTncInput.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a ManageTncInput message.
		 * @function verify
		 * @memberof user.ManageTncInput
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		ManageTncInput.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.action !== null && message.hasOwnProperty("action"))
				if (!$util.isString(message.action)) return "action: string expected";
			return null;
		};

		/**
		 * Creates a ManageTncInput message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof user.ManageTncInput
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {user.ManageTncInput} ManageTncInput
		 */
		ManageTncInput.fromObject = function fromObject(object) {
			if (object instanceof $root.user.ManageTncInput) return object;
			var message = new $root.user.ManageTncInput();
			if (object.action !== null) message.action = String(object.action);
			return message;
		};

		/**
		 * Creates a plain object from a ManageTncInput message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof user.ManageTncInput
		 * @static
		 * @param {user.ManageTncInput} message ManageTncInput
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		ManageTncInput.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) object.action = "";
			if (message.action !== null && message.hasOwnProperty("action"))
				object.action = message.action;
			return object;
		};

		/**
		 * Converts this ManageTncInput to JSON.
		 * @function toJSON
		 * @memberof user.ManageTncInput
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		ManageTncInput.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return ManageTncInput;
	})();

	user.ManageTncResponse = (function () {
		/**
		 * Properties of a ManageTncResponse.
		 * @memberof user
		 * @interface IManageTncResponse
		 * @property {number|null} [error] ManageTncResponse error
		 * @property {Array.<user.IManageTncObject>|null} [content] ManageTncResponse content
		 */

		/**
		 * Constructs a new ManageTncResponse.
		 * @memberof user
		 * @classdesc Represents a ManageTncResponse.
		 * @implements IManageTncResponse
		 * @constructor
		 * @param {user.IManageTncResponse=} [properties] Properties to set
		 */
		function ManageTncResponse(properties) {
			this.content = [];
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * ManageTncResponse error.
		 * @member {number} error
		 * @memberof user.ManageTncResponse
		 * @instance
		 */
		ManageTncResponse.prototype.error = 0;

		/**
		 * ManageTncResponse content.
		 * @member {Array.<user.IManageTncObject>} content
		 * @memberof user.ManageTncResponse
		 * @instance
		 */
		ManageTncResponse.prototype.content = $util.emptyArray;

		/**
		 * Creates a new ManageTncResponse instance using the specified properties.
		 * @function create
		 * @memberof user.ManageTncResponse
		 * @static
		 * @param {user.IManageTncResponse=} [properties] Properties to set
		 * @returns {user.ManageTncResponse} ManageTncResponse instance
		 */
		ManageTncResponse.create = function create(properties) {
			return new ManageTncResponse(properties);
		};

		/**
		 * Encodes the specified ManageTncResponse message. Does not implicitly {@link user.ManageTncResponse.verify|verify} messages.
		 * @function encode
		 * @memberof user.ManageTncResponse
		 * @static
		 * @param {user.IManageTncResponse} message ManageTncResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		ManageTncResponse.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.error !== null &&
				Object.hasOwnProperty.call(message, "error")
			)
				writer.uint32(/* id 1, wireType 0 =*/ 8).int32(message.error);
			if (message.content !== null && message.content.length)
				for (var i = 0; i < message.content.length; ++i)
					$root.user.ManageTncObject.encode(
						message.content[i],
						writer.uint32(/* id 2, wireType 2 =*/ 18).fork()
					).ldelim();
			return writer;
		};

		/**
		 * Encodes the specified ManageTncResponse message, length delimited. Does not implicitly {@link user.ManageTncResponse.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof user.ManageTncResponse
		 * @static
		 * @param {user.IManageTncResponse} message ManageTncResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		ManageTncResponse.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a ManageTncResponse message from the specified reader or buffer.
		 * @function decode
		 * @memberof user.ManageTncResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {user.ManageTncResponse} ManageTncResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		ManageTncResponse.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.user.ManageTncResponse();
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
							$root.user.ManageTncObject.decode(reader, reader.uint32())
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
		 * Decodes a ManageTncResponse message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof user.ManageTncResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {user.ManageTncResponse} ManageTncResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		ManageTncResponse.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a ManageTncResponse message.
		 * @function verify
		 * @memberof user.ManageTncResponse
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		ManageTncResponse.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.error !== null && message.hasOwnProperty("error"))
				if (!$util.isInteger(message.error)) return "error: integer expected";
			if (message.content !== null && message.hasOwnProperty("content")) {
				if (!Array.isArray(message.content)) return "content: array expected";
				for (var i = 0; i < message.content.length; ++i) {
					var error = $root.user.ManageTncObject.verify(message.content[i]);
					if (error) return "content." + error;
				}
			}
			return null;
		};

		/**
		 * Creates a ManageTncResponse message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof user.ManageTncResponse
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {user.ManageTncResponse} ManageTncResponse
		 */
		ManageTncResponse.fromObject = function fromObject(object) {
			if (object instanceof $root.user.ManageTncResponse) return object;
			var message = new $root.user.ManageTncResponse();
			if (object.error !== null) message.error = object.error | 0;
			if (object.content) {
				if (!Array.isArray(object.content))
					throw TypeError(".user.ManageTncResponse.content: array expected");
				message.content = [];
				for (var i = 0; i < object.content.length; ++i) {
					if (typeof object.content[i] !== "object")
						throw TypeError(".user.ManageTncResponse.content: object expected");
					message.content[i] = $root.user.ManageTncObject.fromObject(
						object.content[i]
					);
				}
			}
			return message;
		};

		/**
		 * Creates a plain object from a ManageTncResponse message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof user.ManageTncResponse
		 * @static
		 * @param {user.ManageTncResponse} message ManageTncResponse
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		ManageTncResponse.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.arrays || options.defaults) object.content = [];
			if (options.defaults) object.error = 0;
			if (message.error !== null && message.hasOwnProperty("error"))
				object.error = message.error;
			if (message.content && message.content.length) {
				object.content = [];
				for (var j = 0; j < message.content.length; ++j)
					object.content[j] = $root.user.ManageTncObject.toObject(
						message.content[j],
						options
					);
			}
			return object;
		};

		/**
		 * Converts this ManageTncResponse to JSON.
		 * @function toJSON
		 * @memberof user.ManageTncResponse
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		ManageTncResponse.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return ManageTncResponse;
	})();

	user.ManageTncObject = (function () {
		/**
		 * Properties of a ManageTncObject.
		 * @memberof user
		 * @interface IManageTncObject
		 * @property {boolean|null} [tncAccept] ManageTncObject tncAccept
		 */

		/**
		 * Constructs a new ManageTncObject.
		 * @memberof user
		 * @classdesc Represents a ManageTncObject.
		 * @implements IManageTncObject
		 * @constructor
		 * @param {user.IManageTncObject=} [properties] Properties to set
		 */
		function ManageTncObject(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * ManageTncObject tncAccept.
		 * @member {boolean} tncAccept
		 * @memberof user.ManageTncObject
		 * @instance
		 */
		ManageTncObject.prototype.tncAccept = false;

		/**
		 * Creates a new ManageTncObject instance using the specified properties.
		 * @function create
		 * @memberof user.ManageTncObject
		 * @static
		 * @param {user.IManageTncObject=} [properties] Properties to set
		 * @returns {user.ManageTncObject} ManageTncObject instance
		 */
		ManageTncObject.create = function create(properties) {
			return new ManageTncObject(properties);
		};

		/**
		 * Encodes the specified ManageTncObject message. Does not implicitly {@link user.ManageTncObject.verify|verify} messages.
		 * @function encode
		 * @memberof user.ManageTncObject
		 * @static
		 * @param {user.IManageTncObject} message ManageTncObject message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		ManageTncObject.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.tncAccept !== null &&
				Object.hasOwnProperty.call(message, "tncAccept")
			)
				writer.uint32(/* id 1, wireType 0 =*/ 8).bool(message.tncAccept);
			return writer;
		};

		/**
		 * Encodes the specified ManageTncObject message, length delimited. Does not implicitly {@link user.ManageTncObject.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof user.ManageTncObject
		 * @static
		 * @param {user.IManageTncObject} message ManageTncObject message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		ManageTncObject.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a ManageTncObject message from the specified reader or buffer.
		 * @function decode
		 * @memberof user.ManageTncObject
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {user.ManageTncObject} ManageTncObject
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		ManageTncObject.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.user.ManageTncObject();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.tncAccept = reader.bool();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a ManageTncObject message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof user.ManageTncObject
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {user.ManageTncObject} ManageTncObject
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		ManageTncObject.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a ManageTncObject message.
		 * @function verify
		 * @memberof user.ManageTncObject
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		ManageTncObject.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.tncAccept !== null && message.hasOwnProperty("tncAccept"))
				if (typeof message.tncAccept !== "boolean")
					return "tncAccept: boolean expected";
			return null;
		};

		/**
		 * Creates a ManageTncObject message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof user.ManageTncObject
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {user.ManageTncObject} ManageTncObject
		 */
		ManageTncObject.fromObject = function fromObject(object) {
			if (object instanceof $root.user.ManageTncObject) return object;
			var message = new $root.user.ManageTncObject();
			if (object.tncAccept !== null)
				message.tncAccept = Boolean(object.tncAccept);
			return message;
		};

		/**
		 * Creates a plain object from a ManageTncObject message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof user.ManageTncObject
		 * @static
		 * @param {user.ManageTncObject} message ManageTncObject
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		ManageTncObject.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) object.tncAccept = false;
			if (message.tncAccept !== null && message.hasOwnProperty("tncAccept"))
				object.tncAccept = message.tncAccept;
			return object;
		};

		/**
		 * Converts this ManageTncObject to JSON.
		 * @function toJSON
		 * @memberof user.ManageTncObject
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		ManageTncObject.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return ManageTncObject;
	})();

	user.CompaniesResponse = (function () {
		/**
		 * Properties of a CompaniesResponse.
		 * @memberof user
		 * @interface ICompaniesResponse
		 * @property {Array.<string>|null} [companies] CompaniesResponse companies
		 */

		/**
		 * Constructs a new CompaniesResponse.
		 * @memberof user
		 * @classdesc Represents a CompaniesResponse.
		 * @implements ICompaniesResponse
		 * @constructor
		 * @param {user.ICompaniesResponse=} [properties] Properties to set
		 */
		function CompaniesResponse(properties) {
			this.companies = [];
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * CompaniesResponse companies.
		 * @member {Array.<string>} companies
		 * @memberof user.CompaniesResponse
		 * @instance
		 */
		CompaniesResponse.prototype.companies = $util.emptyArray;

		/**
		 * Creates a new CompaniesResponse instance using the specified properties.
		 * @function create
		 * @memberof user.CompaniesResponse
		 * @static
		 * @param {user.ICompaniesResponse=} [properties] Properties to set
		 * @returns {user.CompaniesResponse} CompaniesResponse instance
		 */
		CompaniesResponse.create = function create(properties) {
			return new CompaniesResponse(properties);
		};

		/**
		 * Encodes the specified CompaniesResponse message. Does not implicitly {@link user.CompaniesResponse.verify|verify} messages.
		 * @function encode
		 * @memberof user.CompaniesResponse
		 * @static
		 * @param {user.ICompaniesResponse} message CompaniesResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		CompaniesResponse.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.companies !== null && message.companies.length)
				for (var i = 0; i < message.companies.length; ++i)
					writer
						.uint32(/* id 1, wireType 2 =*/ 10)
						.string(message.companies[i]);
			return writer;
		};

		/**
		 * Encodes the specified CompaniesResponse message, length delimited. Does not implicitly {@link user.CompaniesResponse.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof user.CompaniesResponse
		 * @static
		 * @param {user.ICompaniesResponse} message CompaniesResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		CompaniesResponse.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a CompaniesResponse message from the specified reader or buffer.
		 * @function decode
		 * @memberof user.CompaniesResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {user.CompaniesResponse} CompaniesResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		CompaniesResponse.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.user.CompaniesResponse();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						if (!(message.companies && message.companies.length))
							message.companies = [];
						message.companies.push(reader.string());
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a CompaniesResponse message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof user.CompaniesResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {user.CompaniesResponse} CompaniesResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		CompaniesResponse.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a CompaniesResponse message.
		 * @function verify
		 * @memberof user.CompaniesResponse
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		CompaniesResponse.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.companies !== null && message.hasOwnProperty("companies")) {
				if (!Array.isArray(message.companies))
					return "companies: array expected";
				for (var i = 0; i < message.companies.length; ++i)
					if (!$util.isString(message.companies[i]))
						return "companies: string[] expected";
			}
			return null;
		};

		/**
		 * Creates a CompaniesResponse message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof user.CompaniesResponse
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {user.CompaniesResponse} CompaniesResponse
		 */
		CompaniesResponse.fromObject = function fromObject(object) {
			if (object instanceof $root.user.CompaniesResponse) return object;
			var message = new $root.user.CompaniesResponse();
			if (object.companies) {
				if (!Array.isArray(object.companies))
					throw TypeError(".user.CompaniesResponse.companies: array expected");
				message.companies = [];
				for (var i = 0; i < object.companies.length; ++i)
					message.companies[i] = String(object.companies[i]);
			}
			return message;
		};

		/**
		 * Creates a plain object from a CompaniesResponse message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof user.CompaniesResponse
		 * @static
		 * @param {user.CompaniesResponse} message CompaniesResponse
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		CompaniesResponse.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.arrays || options.defaults) object.companies = [];
			if (message.companies && message.companies.length) {
				object.companies = [];
				for (var j = 0; j < message.companies.length; ++j)
					object.companies[j] = message.companies[j];
			}
			return object;
		};

		/**
		 * Converts this CompaniesResponse to JSON.
		 * @function toJSON
		 * @memberof user.CompaniesResponse
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		CompaniesResponse.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return CompaniesResponse;
	})();

	user.PaginatedCallHistoryInput = (function () {
		/**
		 * Properties of a PaginatedCallHistoryInput.
		 * @memberof user
		 * @interface IPaginatedCallHistoryInput
		 * @property {number|null} [startTime] PaginatedCallHistoryInput startTime
		 */

		/**
		 * Constructs a new PaginatedCallHistoryInput.
		 * @memberof user
		 * @classdesc Represents a PaginatedCallHistoryInput.
		 * @implements IPaginatedCallHistoryInput
		 * @constructor
		 * @param {user.IPaginatedCallHistoryInput=} [properties] Properties to set
		 */
		function PaginatedCallHistoryInput(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * PaginatedCallHistoryInput startTime.
		 * @member {number} startTime
		 * @memberof user.PaginatedCallHistoryInput
		 * @instance
		 */
		PaginatedCallHistoryInput.prototype.startTime = 0;

		/**
		 * Creates a new PaginatedCallHistoryInput instance using the specified properties.
		 * @function create
		 * @memberof user.PaginatedCallHistoryInput
		 * @static
		 * @param {user.IPaginatedCallHistoryInput=} [properties] Properties to set
		 * @returns {user.PaginatedCallHistoryInput} PaginatedCallHistoryInput instance
		 */
		PaginatedCallHistoryInput.create = function create(properties) {
			return new PaginatedCallHistoryInput(properties);
		};

		/**
		 * Encodes the specified PaginatedCallHistoryInput message. Does not implicitly {@link user.PaginatedCallHistoryInput.verify|verify} messages.
		 * @function encode
		 * @memberof user.PaginatedCallHistoryInput
		 * @static
		 * @param {user.IPaginatedCallHistoryInput} message PaginatedCallHistoryInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		PaginatedCallHistoryInput.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.startTime !== null &&
				Object.hasOwnProperty.call(message, "startTime")
			)
				writer.uint32(/* id 1, wireType 1 =*/ 9).double(message.startTime);
			return writer;
		};

		/**
		 * Encodes the specified PaginatedCallHistoryInput message, length delimited. Does not implicitly {@link user.PaginatedCallHistoryInput.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof user.PaginatedCallHistoryInput
		 * @static
		 * @param {user.IPaginatedCallHistoryInput} message PaginatedCallHistoryInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		PaginatedCallHistoryInput.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a PaginatedCallHistoryInput message from the specified reader or buffer.
		 * @function decode
		 * @memberof user.PaginatedCallHistoryInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {user.PaginatedCallHistoryInput} PaginatedCallHistoryInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		PaginatedCallHistoryInput.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.user.PaginatedCallHistoryInput();
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
		 * Decodes a PaginatedCallHistoryInput message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof user.PaginatedCallHistoryInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {user.PaginatedCallHistoryInput} PaginatedCallHistoryInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		PaginatedCallHistoryInput.decodeDelimited = function decodeDelimited(
			reader
		) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a PaginatedCallHistoryInput message.
		 * @function verify
		 * @memberof user.PaginatedCallHistoryInput
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		PaginatedCallHistoryInput.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.startTime !== null && message.hasOwnProperty("startTime"))
				if (typeof message.startTime !== "number")
					return "startTime: number expected";
			return null;
		};

		/**
		 * Creates a PaginatedCallHistoryInput message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof user.PaginatedCallHistoryInput
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {user.PaginatedCallHistoryInput} PaginatedCallHistoryInput
		 */
		PaginatedCallHistoryInput.fromObject = function fromObject(object) {
			if (object instanceof $root.user.PaginatedCallHistoryInput) return object;
			var message = new $root.user.PaginatedCallHistoryInput();
			if (object.startTime !== null)
				message.startTime = Number(object.startTime);
			return message;
		};

		/**
		 * Creates a plain object from a PaginatedCallHistoryInput message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof user.PaginatedCallHistoryInput
		 * @static
		 * @param {user.PaginatedCallHistoryInput} message PaginatedCallHistoryInput
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		PaginatedCallHistoryInput.toObject = function toObject(message, options) {
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
		 * Converts this PaginatedCallHistoryInput to JSON.
		 * @function toJSON
		 * @memberof user.PaginatedCallHistoryInput
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		PaginatedCallHistoryInput.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return PaginatedCallHistoryInput;
	})();

	user.PaginatedCallHistoryResponse = (function () {
		/**
		 * Properties of a PaginatedCallHistoryResponse.
		 * @memberof user
		 * @interface IPaginatedCallHistoryResponse
		 * @property {number|null} [error] PaginatedCallHistoryResponse error
		 * @property {Array.<user.ICallHistoryObject>|null} [records] PaginatedCallHistoryResponse records
		 * @property {boolean|null} [moreRecordsExist] PaginatedCallHistoryResponse moreRecordsExist
		 */

		/**
		 * Constructs a new PaginatedCallHistoryResponse.
		 * @memberof user
		 * @classdesc Represents a PaginatedCallHistoryResponse.
		 * @implements IPaginatedCallHistoryResponse
		 * @constructor
		 * @param {user.IPaginatedCallHistoryResponse=} [properties] Properties to set
		 */
		function PaginatedCallHistoryResponse(properties) {
			this.records = [];
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * PaginatedCallHistoryResponse error.
		 * @member {number} error
		 * @memberof user.PaginatedCallHistoryResponse
		 * @instance
		 */
		PaginatedCallHistoryResponse.prototype.error = 0;

		/**
		 * PaginatedCallHistoryResponse records.
		 * @member {Array.<user.ICallHistoryObject>} records
		 * @memberof user.PaginatedCallHistoryResponse
		 * @instance
		 */
		PaginatedCallHistoryResponse.prototype.records = $util.emptyArray;

		/**
		 * PaginatedCallHistoryResponse moreRecordsExist.
		 * @member {boolean} moreRecordsExist
		 * @memberof user.PaginatedCallHistoryResponse
		 * @instance
		 */
		PaginatedCallHistoryResponse.prototype.moreRecordsExist = false;

		/**
		 * Creates a new PaginatedCallHistoryResponse instance using the specified properties.
		 * @function create
		 * @memberof user.PaginatedCallHistoryResponse
		 * @static
		 * @param {user.IPaginatedCallHistoryResponse=} [properties] Properties to set
		 * @returns {user.PaginatedCallHistoryResponse} PaginatedCallHistoryResponse instance
		 */
		PaginatedCallHistoryResponse.create = function create(properties) {
			return new PaginatedCallHistoryResponse(properties);
		};

		/**
		 * Encodes the specified PaginatedCallHistoryResponse message. Does not implicitly {@link user.PaginatedCallHistoryResponse.verify|verify} messages.
		 * @function encode
		 * @memberof user.PaginatedCallHistoryResponse
		 * @static
		 * @param {user.IPaginatedCallHistoryResponse} message PaginatedCallHistoryResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		PaginatedCallHistoryResponse.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.error !== null &&
				Object.hasOwnProperty.call(message, "error")
			)
				writer.uint32(/* id 1, wireType 0 =*/ 8).int32(message.error);
			if (message.records !== null && message.records.length)
				for (var i = 0; i < message.records.length; ++i)
					$root.user.CallHistoryObject.encode(
						message.records[i],
						writer.uint32(/* id 2, wireType 2 =*/ 18).fork()
					).ldelim();
			if (
				message.moreRecordsExist !== null &&
				Object.hasOwnProperty.call(message, "moreRecordsExist")
			)
				writer
					.uint32(/* id 3, wireType 0 =*/ 24)
					.bool(message.moreRecordsExist);
			return writer;
		};

		/**
		 * Encodes the specified PaginatedCallHistoryResponse message, length delimited. Does not implicitly {@link user.PaginatedCallHistoryResponse.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof user.PaginatedCallHistoryResponse
		 * @static
		 * @param {user.IPaginatedCallHistoryResponse} message PaginatedCallHistoryResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		PaginatedCallHistoryResponse.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a PaginatedCallHistoryResponse message from the specified reader or buffer.
		 * @function decode
		 * @memberof user.PaginatedCallHistoryResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {user.PaginatedCallHistoryResponse} PaginatedCallHistoryResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		PaginatedCallHistoryResponse.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.user.PaginatedCallHistoryResponse();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.error = reader.int32();
						break;
					case 2:
						if (!(message.records && message.records.length))
							message.records = [];
						message.records.push(
							$root.user.CallHistoryObject.decode(reader, reader.uint32())
						);
						break;
					case 3:
						message.moreRecordsExist = reader.bool();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a PaginatedCallHistoryResponse message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof user.PaginatedCallHistoryResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {user.PaginatedCallHistoryResponse} PaginatedCallHistoryResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		PaginatedCallHistoryResponse.decodeDelimited = function decodeDelimited(
			reader
		) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a PaginatedCallHistoryResponse message.
		 * @function verify
		 * @memberof user.PaginatedCallHistoryResponse
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		PaginatedCallHistoryResponse.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.error !== null && message.hasOwnProperty("error"))
				if (!$util.isInteger(message.error)) return "error: integer expected";
			if (message.records !== null && message.hasOwnProperty("records")) {
				if (!Array.isArray(message.records)) return "records: array expected";
				for (var i = 0; i < message.records.length; ++i) {
					var error = $root.user.CallHistoryObject.verify(message.records[i]);
					if (error) return "records." + error;
				}
			}
			if (
				message.moreRecordsExist !== null &&
				message.hasOwnProperty("moreRecordsExist")
			)
				if (typeof message.moreRecordsExist !== "boolean")
					return "moreRecordsExist: boolean expected";
			return null;
		};

		/**
		 * Creates a PaginatedCallHistoryResponse message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof user.PaginatedCallHistoryResponse
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {user.PaginatedCallHistoryResponse} PaginatedCallHistoryResponse
		 */
		PaginatedCallHistoryResponse.fromObject = function fromObject(object) {
			if (object instanceof $root.user.PaginatedCallHistoryResponse)
				return object;
			var message = new $root.user.PaginatedCallHistoryResponse();
			if (object.error !== null) message.error = object.error | 0;
			if (object.records) {
				if (!Array.isArray(object.records))
					throw TypeError(
						".user.PaginatedCallHistoryResponse.records: array expected"
					);
				message.records = [];
				for (var i = 0; i < object.records.length; ++i) {
					if (typeof object.records[i] !== "object")
						throw TypeError(
							".user.PaginatedCallHistoryResponse.records: object expected"
						);
					message.records[i] = $root.user.CallHistoryObject.fromObject(
						object.records[i]
					);
				}
			}
			if (object.moreRecordsExist !== null)
				message.moreRecordsExist = Boolean(object.moreRecordsExist);
			return message;
		};

		/**
		 * Creates a plain object from a PaginatedCallHistoryResponse message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof user.PaginatedCallHistoryResponse
		 * @static
		 * @param {user.PaginatedCallHistoryResponse} message PaginatedCallHistoryResponse
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		PaginatedCallHistoryResponse.toObject = function toObject(
			message,
			options
		) {
			if (!options) options = {};
			var object = {};
			if (options.arrays || options.defaults) object.records = [];
			if (options.defaults) {
				object.error = 0;
				object.moreRecordsExist = false;
			}
			if (message.error !== null && message.hasOwnProperty("error"))
				object.error = message.error;
			if (message.records && message.records.length) {
				object.records = [];
				for (var j = 0; j < message.records.length; ++j)
					object.records[j] = $root.user.CallHistoryObject.toObject(
						message.records[j],
						options
					);
			}
			if (
				message.moreRecordsExist !== null &&
				message.hasOwnProperty("moreRecordsExist")
			)
				object.moreRecordsExist = message.moreRecordsExist;
			return object;
		};

		/**
		 * Converts this PaginatedCallHistoryResponse to JSON.
		 * @function toJSON
		 * @memberof user.PaginatedCallHistoryResponse
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		PaginatedCallHistoryResponse.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return PaginatedCallHistoryResponse;
	})();

	user.CallHistoryResponse = (function () {
		/**
		 * Properties of a CallHistoryResponse.
		 * @memberof user
		 * @interface ICallHistoryResponse
		 * @property {Array.<user.ICallHistoryObject>|null} [content] CallHistoryResponse content
		 */

		/**
		 * Constructs a new CallHistoryResponse.
		 * @memberof user
		 * @classdesc Represents a CallHistoryResponse.
		 * @implements ICallHistoryResponse
		 * @constructor
		 * @param {user.ICallHistoryResponse=} [properties] Properties to set
		 */
		function CallHistoryResponse(properties) {
			this.content = [];
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * CallHistoryResponse content.
		 * @member {Array.<user.ICallHistoryObject>} content
		 * @memberof user.CallHistoryResponse
		 * @instance
		 */
		CallHistoryResponse.prototype.content = $util.emptyArray;

		/**
		 * Creates a new CallHistoryResponse instance using the specified properties.
		 * @function create
		 * @memberof user.CallHistoryResponse
		 * @static
		 * @param {user.ICallHistoryResponse=} [properties] Properties to set
		 * @returns {user.CallHistoryResponse} CallHistoryResponse instance
		 */
		CallHistoryResponse.create = function create(properties) {
			return new CallHistoryResponse(properties);
		};

		/**
		 * Encodes the specified CallHistoryResponse message. Does not implicitly {@link user.CallHistoryResponse.verify|verify} messages.
		 * @function encode
		 * @memberof user.CallHistoryResponse
		 * @static
		 * @param {user.ICallHistoryResponse} message CallHistoryResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		CallHistoryResponse.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.content !== null && message.content.length)
				for (var i = 0; i < message.content.length; ++i)
					$root.user.CallHistoryObject.encode(
						message.content[i],
						writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
					).ldelim();
			return writer;
		};

		/**
		 * Encodes the specified CallHistoryResponse message, length delimited. Does not implicitly {@link user.CallHistoryResponse.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof user.CallHistoryResponse
		 * @static
		 * @param {user.ICallHistoryResponse} message CallHistoryResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		CallHistoryResponse.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a CallHistoryResponse message from the specified reader or buffer.
		 * @function decode
		 * @memberof user.CallHistoryResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {user.CallHistoryResponse} CallHistoryResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		CallHistoryResponse.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.user.CallHistoryResponse();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						if (!(message.content && message.content.length))
							message.content = [];
						message.content.push(
							$root.user.CallHistoryObject.decode(reader, reader.uint32())
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
		 * Decodes a CallHistoryResponse message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof user.CallHistoryResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {user.CallHistoryResponse} CallHistoryResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		CallHistoryResponse.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a CallHistoryResponse message.
		 * @function verify
		 * @memberof user.CallHistoryResponse
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		CallHistoryResponse.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.content !== null && message.hasOwnProperty("content")) {
				if (!Array.isArray(message.content)) return "content: array expected";
				for (var i = 0; i < message.content.length; ++i) {
					var error = $root.user.CallHistoryObject.verify(message.content[i]);
					if (error) return "content." + error;
				}
			}
			return null;
		};

		/**
		 * Creates a CallHistoryResponse message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof user.CallHistoryResponse
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {user.CallHistoryResponse} CallHistoryResponse
		 */
		CallHistoryResponse.fromObject = function fromObject(object) {
			if (object instanceof $root.user.CallHistoryResponse) return object;
			var message = new $root.user.CallHistoryResponse();
			if (object.content) {
				if (!Array.isArray(object.content))
					throw TypeError(".user.CallHistoryResponse.content: array expected");
				message.content = [];
				for (var i = 0; i < object.content.length; ++i) {
					if (typeof object.content[i] !== "object")
						throw TypeError(
							".user.CallHistoryResponse.content: object expected"
						);
					message.content[i] = $root.user.CallHistoryObject.fromObject(
						object.content[i]
					);
				}
			}
			return message;
		};

		/**
		 * Creates a plain object from a CallHistoryResponse message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof user.CallHistoryResponse
		 * @static
		 * @param {user.CallHistoryResponse} message CallHistoryResponse
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		CallHistoryResponse.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.arrays || options.defaults) object.content = [];
			if (message.content && message.content.length) {
				object.content = [];
				for (var j = 0; j < message.content.length; ++j)
					object.content[j] = $root.user.CallHistoryObject.toObject(
						message.content[j],
						options
					);
			}
			return object;
		};

		/**
		 * Converts this CallHistoryResponse to JSON.
		 * @function toJSON
		 * @memberof user.CallHistoryResponse
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		CallHistoryResponse.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return CallHistoryResponse;
	})();

	user.CallHistoryObject = (function () {
		/**
		 * Properties of a CallHistoryObject.
		 * @memberof user
		 * @interface ICallHistoryObject
		 * @property {number|null} [callCharge] CallHistoryObject callCharge
		 * @property {number|Long|null} [callTimestamp] CallHistoryObject callTimestamp
		 * @property {number|null} [currentBalance] CallHistoryObject currentBalance
		 * @property {number|null} [duration] CallHistoryObject duration
		 * @property {string|null} [userId] CallHistoryObject userId
		 * @property {string|null} [callType] CallHistoryObject callType
		 * @property {string|null} [callDirection] CallHistoryObject callDirection
		 * @property {string|null} [fromUserId] CallHistoryObject fromUserId
		 * @property {string|null} [fromUserName] CallHistoryObject fromUserName
		 * @property {string|null} [toNumber] CallHistoryObject toNumber
		 * @property {string|null} [toUserId] CallHistoryObject toUserId
		 * @property {string|null} [toUserName] CallHistoryObject toUserName
		 * @property {boolean|null} [video] CallHistoryObject video
		 */

		/**
		 * Constructs a new CallHistoryObject.
		 * @memberof user
		 * @classdesc Represents a CallHistoryObject.
		 * @implements ICallHistoryObject
		 * @constructor
		 * @param {user.ICallHistoryObject=} [properties] Properties to set
		 */
		function CallHistoryObject(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * CallHistoryObject callCharge.
		 * @member {number} callCharge
		 * @memberof user.CallHistoryObject
		 * @instance
		 */
		CallHistoryObject.prototype.callCharge = 0;

		/**
		 * CallHistoryObject callTimestamp.
		 * @member {number|Long} callTimestamp
		 * @memberof user.CallHistoryObject
		 * @instance
		 */
		CallHistoryObject.prototype.callTimestamp = $util.Long
			? $util.Long.fromBits(0, 0, false)
			: 0;

		/**
		 * CallHistoryObject currentBalance.
		 * @member {number} currentBalance
		 * @memberof user.CallHistoryObject
		 * @instance
		 */
		CallHistoryObject.prototype.currentBalance = 0;

		/**
		 * CallHistoryObject duration.
		 * @member {number} duration
		 * @memberof user.CallHistoryObject
		 * @instance
		 */
		CallHistoryObject.prototype.duration = 0;

		/**
		 * CallHistoryObject userId.
		 * @member {string} userId
		 * @memberof user.CallHistoryObject
		 * @instance
		 */
		CallHistoryObject.prototype.userId = "";

		/**
		 * CallHistoryObject callType.
		 * @member {string} callType
		 * @memberof user.CallHistoryObject
		 * @instance
		 */
		CallHistoryObject.prototype.callType = "";

		/**
		 * CallHistoryObject callDirection.
		 * @member {string} callDirection
		 * @memberof user.CallHistoryObject
		 * @instance
		 */
		CallHistoryObject.prototype.callDirection = "";

		/**
		 * CallHistoryObject fromUserId.
		 * @member {string} fromUserId
		 * @memberof user.CallHistoryObject
		 * @instance
		 */
		CallHistoryObject.prototype.fromUserId = "";

		/**
		 * CallHistoryObject fromUserName.
		 * @member {string} fromUserName
		 * @memberof user.CallHistoryObject
		 * @instance
		 */
		CallHistoryObject.prototype.fromUserName = "";

		/**
		 * CallHistoryObject toNumber.
		 * @member {string} toNumber
		 * @memberof user.CallHistoryObject
		 * @instance
		 */
		CallHistoryObject.prototype.toNumber = "";

		/**
		 * CallHistoryObject toUserId.
		 * @member {string} toUserId
		 * @memberof user.CallHistoryObject
		 * @instance
		 */
		CallHistoryObject.prototype.toUserId = "";

		/**
		 * CallHistoryObject toUserName.
		 * @member {string} toUserName
		 * @memberof user.CallHistoryObject
		 * @instance
		 */
		CallHistoryObject.prototype.toUserName = "";

		/**
		 * CallHistoryObject video.
		 * @member {boolean} video
		 * @memberof user.CallHistoryObject
		 * @instance
		 */
		CallHistoryObject.prototype.video = false;

		/**
		 * Creates a new CallHistoryObject instance using the specified properties.
		 * @function create
		 * @memberof user.CallHistoryObject
		 * @static
		 * @param {user.ICallHistoryObject=} [properties] Properties to set
		 * @returns {user.CallHistoryObject} CallHistoryObject instance
		 */
		CallHistoryObject.create = function create(properties) {
			return new CallHistoryObject(properties);
		};

		/**
		 * Encodes the specified CallHistoryObject message. Does not implicitly {@link user.CallHistoryObject.verify|verify} messages.
		 * @function encode
		 * @memberof user.CallHistoryObject
		 * @static
		 * @param {user.ICallHistoryObject} message CallHistoryObject message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		CallHistoryObject.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.callCharge !== null &&
				Object.hasOwnProperty.call(message, "callCharge")
			)
				writer.uint32(/* id 1, wireType 1 =*/ 9).double(message.callCharge);
			if (
				message.callTimestamp !== null &&
				Object.hasOwnProperty.call(message, "callTimestamp")
			)
				writer.uint32(/* id 2, wireType 0 =*/ 16).int64(message.callTimestamp);
			if (
				message.currentBalance !== null &&
				Object.hasOwnProperty.call(message, "currentBalance")
			)
				writer.uint32(/* id 3, wireType 5 =*/ 29).float(message.currentBalance);
			if (
				message.duration !== null &&
				Object.hasOwnProperty.call(message, "duration")
			)
				writer.uint32(/* id 4, wireType 1 =*/ 33).double(message.duration);
			if (
				message.userId !== null &&
				Object.hasOwnProperty.call(message, "userId")
			)
				writer.uint32(/* id 5, wireType 2 =*/ 42).string(message.userId);
			if (
				message.callType !== null &&
				Object.hasOwnProperty.call(message, "callType")
			)
				writer.uint32(/* id 6, wireType 2 =*/ 50).string(message.callType);
			if (
				message.callDirection !== null &&
				Object.hasOwnProperty.call(message, "callDirection")
			)
				writer.uint32(/* id 7, wireType 2 =*/ 58).string(message.callDirection);
			if (
				message.fromUserId !== null &&
				Object.hasOwnProperty.call(message, "fromUserId")
			)
				writer.uint32(/* id 8, wireType 2 =*/ 66).string(message.fromUserId);
			if (
				message.fromUserName !== null &&
				Object.hasOwnProperty.call(message, "fromUserName")
			)
				writer.uint32(/* id 9, wireType 2 =*/ 74).string(message.fromUserName);
			if (
				message.toNumber !== null &&
				Object.hasOwnProperty.call(message, "toNumber")
			)
				writer.uint32(/* id 10, wireType 2 =*/ 82).string(message.toNumber);
			if (
				message.toUserId !== null &&
				Object.hasOwnProperty.call(message, "toUserId")
			)
				writer.uint32(/* id 11, wireType 2 =*/ 90).string(message.toUserId);
			if (
				message.toUserName !== null &&
				Object.hasOwnProperty.call(message, "toUserName")
			)
				writer.uint32(/* id 12, wireType 2 =*/ 98).string(message.toUserName);
			if (
				message.video !== null &&
				Object.hasOwnProperty.call(message, "video")
			)
				writer.uint32(/* id 13, wireType 0 =*/ 104).bool(message.video);
			return writer;
		};

		/**
		 * Encodes the specified CallHistoryObject message, length delimited. Does not implicitly {@link user.CallHistoryObject.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof user.CallHistoryObject
		 * @static
		 * @param {user.ICallHistoryObject} message CallHistoryObject message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		CallHistoryObject.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a CallHistoryObject message from the specified reader or buffer.
		 * @function decode
		 * @memberof user.CallHistoryObject
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {user.CallHistoryObject} CallHistoryObject
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		CallHistoryObject.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.user.CallHistoryObject();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.callCharge = reader.double();
						break;
					case 2:
						message.callTimestamp = reader.int64();
						break;
					case 3:
						message.currentBalance = reader.float();
						break;
					case 4:
						message.duration = reader.double();
						break;
					case 5:
						message.userId = reader.string();
						break;
					case 6:
						message.callType = reader.string();
						break;
					case 7:
						message.callDirection = reader.string();
						break;
					case 8:
						message.fromUserId = reader.string();
						break;
					case 9:
						message.fromUserName = reader.string();
						break;
					case 10:
						message.toNumber = reader.string();
						break;
					case 11:
						message.toUserId = reader.string();
						break;
					case 12:
						message.toUserName = reader.string();
						break;
					case 13:
						message.video = reader.bool();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a CallHistoryObject message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof user.CallHistoryObject
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {user.CallHistoryObject} CallHistoryObject
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		CallHistoryObject.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a CallHistoryObject message.
		 * @function verify
		 * @memberof user.CallHistoryObject
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		CallHistoryObject.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.callCharge !== null && message.hasOwnProperty("callCharge"))
				if (typeof message.callCharge !== "number")
					return "callCharge: number expected";
			if (
				message.callTimestamp !== null &&
				message.hasOwnProperty("callTimestamp")
			)
				if (
					!$util.isInteger(message.callTimestamp) &&
					!(
						message.callTimestamp &&
						$util.isInteger(message.callTimestamp.low) &&
						$util.isInteger(message.callTimestamp.high)
					)
				)
					return "callTimestamp: integer|Long expected";
			if (
				message.currentBalance !== null &&
				message.hasOwnProperty("currentBalance")
			)
				if (typeof message.currentBalance !== "number")
					return "currentBalance: number expected";
			if (message.duration !== null && message.hasOwnProperty("duration"))
				if (typeof message.duration !== "number")
					return "duration: number expected";
			if (message.userId !== null && message.hasOwnProperty("userId"))
				if (!$util.isString(message.userId)) return "userId: string expected";
			if (message.callType !== null && message.hasOwnProperty("callType"))
				if (!$util.isString(message.callType))
					return "callType: string expected";
			if (
				message.callDirection !== null &&
				message.hasOwnProperty("callDirection")
			)
				if (!$util.isString(message.callDirection))
					return "callDirection: string expected";
			if (message.fromUserId !== null && message.hasOwnProperty("fromUserId"))
				if (!$util.isString(message.fromUserId))
					return "fromUserId: string expected";
			if (
				message.fromUserName !== null &&
				message.hasOwnProperty("fromUserName")
			)
				if (!$util.isString(message.fromUserName))
					return "fromUserName: string expected";
			if (message.toNumber !== null && message.hasOwnProperty("toNumber"))
				if (!$util.isString(message.toNumber))
					return "toNumber: string expected";
			if (message.toUserId !== null && message.hasOwnProperty("toUserId"))
				if (!$util.isString(message.toUserId))
					return "toUserId: string expected";
			if (message.toUserName !== null && message.hasOwnProperty("toUserName"))
				if (!$util.isString(message.toUserName))
					return "toUserName: string expected";
			if (message.video !== null && message.hasOwnProperty("video"))
				if (typeof message.video !== "boolean")
					return "video: boolean expected";
			return null;
		};

		/**
		 * Creates a CallHistoryObject message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof user.CallHistoryObject
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {user.CallHistoryObject} CallHistoryObject
		 */
		CallHistoryObject.fromObject = function fromObject(object) {
			if (object instanceof $root.user.CallHistoryObject) return object;
			var message = new $root.user.CallHistoryObject();
			if (object.callCharge !== null)
				message.callCharge = Number(object.callCharge);
			if (object.callTimestamp !== null)
				if ($util.Long)
					(message.callTimestamp = $util.Long.fromValue(
						object.callTimestamp
					)).unsigned = false;
				else if (typeof object.callTimestamp === "string")
					message.callTimestamp = parseInt(object.callTimestamp, 10);
				else if (typeof object.callTimestamp === "number")
					message.callTimestamp = object.callTimestamp;
				else if (typeof object.callTimestamp === "object")
					message.callTimestamp = new $util.LongBits(
						object.callTimestamp.low >>> 0,
						object.callTimestamp.high >>> 0
					).toNumber();
			if (object.currentBalance !== null)
				message.currentBalance = Number(object.currentBalance);
			if (object.duration !== null) message.duration = Number(object.duration);
			if (object.userId !== null) message.userId = String(object.userId);
			if (object.callType !== null) message.callType = String(object.callType);
			if (object.callDirection !== null)
				message.callDirection = String(object.callDirection);
			if (object.fromUserId !== null)
				message.fromUserId = String(object.fromUserId);
			if (object.fromUserName !== null)
				message.fromUserName = String(object.fromUserName);
			if (object.toNumber !== null) message.toNumber = String(object.toNumber);
			if (object.toUserId !== null) message.toUserId = String(object.toUserId);
			if (object.toUserName !== null)
				message.toUserName = String(object.toUserName);
			if (object.video !== null) message.video = Boolean(object.video);
			return message;
		};

		/**
		 * Creates a plain object from a CallHistoryObject message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof user.CallHistoryObject
		 * @static
		 * @param {user.CallHistoryObject} message CallHistoryObject
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		CallHistoryObject.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.callCharge = 0;
				if ($util.Long) {
					var long = new $util.Long(0, 0, false);
					object.callTimestamp =
						options.longs === String
							? long.toString()
							: options.longs === Number
							? long.toNumber()
							: long;
				} else object.callTimestamp = options.longs === String ? "0" : 0;
				object.currentBalance = 0;
				object.duration = 0;
				object.userId = "";
				object.callType = "";
				object.callDirection = "";
				object.fromUserId = "";
				object.fromUserName = "";
				object.toNumber = "";
				object.toUserId = "";
				object.toUserName = "";
				object.video = false;
			}
			if (message.callCharge !== null && message.hasOwnProperty("callCharge"))
				object.callCharge =
					options.json && !isFinite(message.callCharge)
						? String(message.callCharge)
						: message.callCharge;
			if (
				message.callTimestamp !== null &&
				message.hasOwnProperty("callTimestamp")
			)
				if (typeof message.callTimestamp === "number")
					object.callTimestamp =
						options.longs === String
							? String(message.callTimestamp)
							: message.callTimestamp;
				else
					object.callTimestamp =
						options.longs === String
							? $util.Long.prototype.toString.call(message.callTimestamp)
							: options.longs === Number
							? new $util.LongBits(
									message.callTimestamp.low >>> 0,
									message.callTimestamp.high >>> 0
							  ).toNumber()
							: message.callTimestamp;
			if (
				message.currentBalance !== null &&
				message.hasOwnProperty("currentBalance")
			)
				object.currentBalance =
					options.json && !isFinite(message.currentBalance)
						? String(message.currentBalance)
						: message.currentBalance;
			if (message.duration !== null && message.hasOwnProperty("duration"))
				object.duration =
					options.json && !isFinite(message.duration)
						? String(message.duration)
						: message.duration;
			if (message.userId !== null && message.hasOwnProperty("userId"))
				object.userId = message.userId;
			if (message.callType !== null && message.hasOwnProperty("callType"))
				object.callType = message.callType;
			if (
				message.callDirection !== null &&
				message.hasOwnProperty("callDirection")
			)
				object.callDirection = message.callDirection;
			if (message.fromUserId !== null && message.hasOwnProperty("fromUserId"))
				object.fromUserId = message.fromUserId;
			if (
				message.fromUserName !== null &&
				message.hasOwnProperty("fromUserName")
			)
				object.fromUserName = message.fromUserName;
			if (message.toNumber !== null && message.hasOwnProperty("toNumber"))
				object.toNumber = message.toNumber;
			if (message.toUserId !== null && message.hasOwnProperty("toUserId"))
				object.toUserId = message.toUserId;
			if (message.toUserName !== null && message.hasOwnProperty("toUserName"))
				object.toUserName = message.toUserName;
			if (message.video !== null && message.hasOwnProperty("video"))
				object.video = message.video;
			return object;
		};

		/**
		 * Converts this CallHistoryObject to JSON.
		 * @function toJSON
		 * @memberof user.CallHistoryObject
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		CallHistoryObject.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return CallHistoryObject;
	})();

	user.UserDomainsResponse = (function () {
		/**
		 * Properties of a UserDomainsResponse.
		 * @memberof user
		 * @interface IUserDomainsResponse
		 * @property {Array.<user.IUserDomain>|null} [domains] UserDomainsResponse domains
		 */

		/**
		 * Constructs a new UserDomainsResponse.
		 * @memberof user
		 * @classdesc Represents a UserDomainsResponse.
		 * @implements IUserDomainsResponse
		 * @constructor
		 * @param {user.IUserDomainsResponse=} [properties] Properties to set
		 */
		function UserDomainsResponse(properties) {
			this.domains = [];
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * UserDomainsResponse domains.
		 * @member {Array.<user.IUserDomain>} domains
		 * @memberof user.UserDomainsResponse
		 * @instance
		 */
		UserDomainsResponse.prototype.domains = $util.emptyArray;

		/**
		 * Creates a new UserDomainsResponse instance using the specified properties.
		 * @function create
		 * @memberof user.UserDomainsResponse
		 * @static
		 * @param {user.IUserDomainsResponse=} [properties] Properties to set
		 * @returns {user.UserDomainsResponse} UserDomainsResponse instance
		 */
		UserDomainsResponse.create = function create(properties) {
			return new UserDomainsResponse(properties);
		};

		/**
		 * Encodes the specified UserDomainsResponse message. Does not implicitly {@link user.UserDomainsResponse.verify|verify} messages.
		 * @function encode
		 * @memberof user.UserDomainsResponse
		 * @static
		 * @param {user.IUserDomainsResponse} message UserDomainsResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		UserDomainsResponse.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.domains !== null && message.domains.length)
				for (var i = 0; i < message.domains.length; ++i)
					$root.user.UserDomain.encode(
						message.domains[i],
						writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
					).ldelim();
			return writer;
		};

		/**
		 * Encodes the specified UserDomainsResponse message, length delimited. Does not implicitly {@link user.UserDomainsResponse.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof user.UserDomainsResponse
		 * @static
		 * @param {user.IUserDomainsResponse} message UserDomainsResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		UserDomainsResponse.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a UserDomainsResponse message from the specified reader or buffer.
		 * @function decode
		 * @memberof user.UserDomainsResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {user.UserDomainsResponse} UserDomainsResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		UserDomainsResponse.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.user.UserDomainsResponse();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						if (!(message.domains && message.domains.length))
							message.domains = [];
						message.domains.push(
							$root.user.UserDomain.decode(reader, reader.uint32())
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
		 * Decodes a UserDomainsResponse message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof user.UserDomainsResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {user.UserDomainsResponse} UserDomainsResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		UserDomainsResponse.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a UserDomainsResponse message.
		 * @function verify
		 * @memberof user.UserDomainsResponse
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		UserDomainsResponse.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.domains !== null && message.hasOwnProperty("domains")) {
				if (!Array.isArray(message.domains)) return "domains: array expected";
				for (var i = 0; i < message.domains.length; ++i) {
					var error = $root.user.UserDomain.verify(message.domains[i]);
					if (error) return "domains." + error;
				}
			}
			return null;
		};

		/**
		 * Creates a UserDomainsResponse message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof user.UserDomainsResponse
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {user.UserDomainsResponse} UserDomainsResponse
		 */
		UserDomainsResponse.fromObject = function fromObject(object) {
			if (object instanceof $root.user.UserDomainsResponse) return object;
			var message = new $root.user.UserDomainsResponse();
			if (object.domains) {
				if (!Array.isArray(object.domains))
					throw TypeError(".user.UserDomainsResponse.domains: array expected");
				message.domains = [];
				for (var i = 0; i < object.domains.length; ++i) {
					if (typeof object.domains[i] !== "object")
						throw TypeError(
							".user.UserDomainsResponse.domains: object expected"
						);
					message.domains[i] = $root.user.UserDomain.fromObject(
						object.domains[i]
					);
				}
			}
			return message;
		};

		/**
		 * Creates a plain object from a UserDomainsResponse message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof user.UserDomainsResponse
		 * @static
		 * @param {user.UserDomainsResponse} message UserDomainsResponse
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		UserDomainsResponse.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.arrays || options.defaults) object.domains = [];
			if (message.domains && message.domains.length) {
				object.domains = [];
				for (var j = 0; j < message.domains.length; ++j)
					object.domains[j] = $root.user.UserDomain.toObject(
						message.domains[j],
						options
					);
			}
			return object;
		};

		/**
		 * Converts this UserDomainsResponse to JSON.
		 * @function toJSON
		 * @memberof user.UserDomainsResponse
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		UserDomainsResponse.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return UserDomainsResponse;
	})();

	user.AssistantBotConfig = (function () {
		/**
		 * Properties of an AssistantBotConfig.
		 * @memberof user
		 * @interface IAssistantBotConfig
		 * @property {string|null} [botId] AssistantBotConfig botId
		 * @property {string|null} [logoUrl] AssistantBotConfig logoUrl
		 * @property {string|null} [name] AssistantBotConfig name
		 */

		/**
		 * Constructs a new AssistantBotConfig.
		 * @memberof user
		 * @classdesc Represents an AssistantBotConfig.
		 * @implements IAssistantBotConfig
		 * @constructor
		 * @param {user.IAssistantBotConfig=} [properties] Properties to set
		 */
		function AssistantBotConfig(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * AssistantBotConfig botId.
		 * @member {string} botId
		 * @memberof user.AssistantBotConfig
		 * @instance
		 */
		AssistantBotConfig.prototype.botId = "";

		/**
		 * AssistantBotConfig logoUrl.
		 * @member {string} logoUrl
		 * @memberof user.AssistantBotConfig
		 * @instance
		 */
		AssistantBotConfig.prototype.logoUrl = "";

		/**
		 * AssistantBotConfig name.
		 * @member {string} name
		 * @memberof user.AssistantBotConfig
		 * @instance
		 */
		AssistantBotConfig.prototype.name = "";

		/**
		 * Creates a new AssistantBotConfig instance using the specified properties.
		 * @function create
		 * @memberof user.AssistantBotConfig
		 * @static
		 * @param {user.IAssistantBotConfig=} [properties] Properties to set
		 * @returns {user.AssistantBotConfig} AssistantBotConfig instance
		 */
		AssistantBotConfig.create = function create(properties) {
			return new AssistantBotConfig(properties);
		};

		/**
		 * Encodes the specified AssistantBotConfig message. Does not implicitly {@link user.AssistantBotConfig.verify|verify} messages.
		 * @function encode
		 * @memberof user.AssistantBotConfig
		 * @static
		 * @param {user.IAssistantBotConfig} message AssistantBotConfig message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		AssistantBotConfig.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.botId !== null &&
				Object.hasOwnProperty.call(message, "botId")
			)
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.botId);
			if (
				message.logoUrl !== null &&
				Object.hasOwnProperty.call(message, "logoUrl")
			)
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.logoUrl);
			if (message.name !== null && Object.hasOwnProperty.call(message, "name"))
				writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.name);
			return writer;
		};

		/**
		 * Encodes the specified AssistantBotConfig message, length delimited. Does not implicitly {@link user.AssistantBotConfig.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof user.AssistantBotConfig
		 * @static
		 * @param {user.IAssistantBotConfig} message AssistantBotConfig message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		AssistantBotConfig.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes an AssistantBotConfig message from the specified reader or buffer.
		 * @function decode
		 * @memberof user.AssistantBotConfig
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {user.AssistantBotConfig} AssistantBotConfig
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		AssistantBotConfig.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.user.AssistantBotConfig();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.botId = reader.string();
						break;
					case 2:
						message.logoUrl = reader.string();
						break;
					case 3:
						message.name = reader.string();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes an AssistantBotConfig message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof user.AssistantBotConfig
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {user.AssistantBotConfig} AssistantBotConfig
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		AssistantBotConfig.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies an AssistantBotConfig message.
		 * @function verify
		 * @memberof user.AssistantBotConfig
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		AssistantBotConfig.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.botId !== null && message.hasOwnProperty("botId"))
				if (!$util.isString(message.botId)) return "botId: string expected";
			if (message.logoUrl !== null && message.hasOwnProperty("logoUrl"))
				if (!$util.isString(message.logoUrl)) return "logoUrl: string expected";
			if (message.name !== null && message.hasOwnProperty("name"))
				if (!$util.isString(message.name)) return "name: string expected";
			return null;
		};

		/**
		 * Creates an AssistantBotConfig message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof user.AssistantBotConfig
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {user.AssistantBotConfig} AssistantBotConfig
		 */
		AssistantBotConfig.fromObject = function fromObject(object) {
			if (object instanceof $root.user.AssistantBotConfig) return object;
			var message = new $root.user.AssistantBotConfig();
			if (object.botId !== null) message.botId = String(object.botId);
			if (object.logoUrl !== null) message.logoUrl = String(object.logoUrl);
			if (object.name !== null) message.name = String(object.name);
			return message;
		};

		/**
		 * Creates a plain object from an AssistantBotConfig message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof user.AssistantBotConfig
		 * @static
		 * @param {user.AssistantBotConfig} message AssistantBotConfig
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		AssistantBotConfig.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.botId = "";
				object.logoUrl = "";
				object.name = "";
			}
			if (message.botId !== null && message.hasOwnProperty("botId"))
				object.botId = message.botId;
			if (message.logoUrl !== null && message.hasOwnProperty("logoUrl"))
				object.logoUrl = message.logoUrl;
			if (message.name !== null && message.hasOwnProperty("name"))
				object.name = message.name;
			return object;
		};

		/**
		 * Converts this AssistantBotConfig to JSON.
		 * @function toJSON
		 * @memberof user.AssistantBotConfig
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		AssistantBotConfig.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return AssistantBotConfig;
	})();

	user.HomeLogoConfig = (function () {
		/**
		 * Properties of a HomeLogoConfig.
		 * @memberof user
		 * @interface IHomeLogoConfig
		 * @property {string|null} [url] HomeLogoConfig url
		 * @property {string|null} [name] HomeLogoConfig name
		 */

		/**
		 * Constructs a new HomeLogoConfig.
		 * @memberof user
		 * @classdesc Represents a HomeLogoConfig.
		 * @implements IHomeLogoConfig
		 * @constructor
		 * @param {user.IHomeLogoConfig=} [properties] Properties to set
		 */
		function HomeLogoConfig(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * HomeLogoConfig url.
		 * @member {string} url
		 * @memberof user.HomeLogoConfig
		 * @instance
		 */
		HomeLogoConfig.prototype.url = "";

		/**
		 * HomeLogoConfig name.
		 * @member {string} name
		 * @memberof user.HomeLogoConfig
		 * @instance
		 */
		HomeLogoConfig.prototype.name = "";

		/**
		 * Creates a new HomeLogoConfig instance using the specified properties.
		 * @function create
		 * @memberof user.HomeLogoConfig
		 * @static
		 * @param {user.IHomeLogoConfig=} [properties] Properties to set
		 * @returns {user.HomeLogoConfig} HomeLogoConfig instance
		 */
		HomeLogoConfig.create = function create(properties) {
			return new HomeLogoConfig(properties);
		};

		/**
		 * Encodes the specified HomeLogoConfig message. Does not implicitly {@link user.HomeLogoConfig.verify|verify} messages.
		 * @function encode
		 * @memberof user.HomeLogoConfig
		 * @static
		 * @param {user.IHomeLogoConfig} message HomeLogoConfig message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		HomeLogoConfig.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.url !== null && Object.hasOwnProperty.call(message, "url"))
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.url);
			if (message.name !== null && Object.hasOwnProperty.call(message, "name"))
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.name);
			return writer;
		};

		/**
		 * Encodes the specified HomeLogoConfig message, length delimited. Does not implicitly {@link user.HomeLogoConfig.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof user.HomeLogoConfig
		 * @static
		 * @param {user.IHomeLogoConfig} message HomeLogoConfig message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		HomeLogoConfig.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a HomeLogoConfig message from the specified reader or buffer.
		 * @function decode
		 * @memberof user.HomeLogoConfig
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {user.HomeLogoConfig} HomeLogoConfig
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		HomeLogoConfig.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.user.HomeLogoConfig();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.url = reader.string();
						break;
					case 2:
						message.name = reader.string();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a HomeLogoConfig message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof user.HomeLogoConfig
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {user.HomeLogoConfig} HomeLogoConfig
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		HomeLogoConfig.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a HomeLogoConfig message.
		 * @function verify
		 * @memberof user.HomeLogoConfig
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		HomeLogoConfig.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.url !== null && message.hasOwnProperty("url"))
				if (!$util.isString(message.url)) return "url: string expected";
			if (message.name !== null && message.hasOwnProperty("name"))
				if (!$util.isString(message.name)) return "name: string expected";
			return null;
		};

		/**
		 * Creates a HomeLogoConfig message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof user.HomeLogoConfig
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {user.HomeLogoConfig} HomeLogoConfig
		 */
		HomeLogoConfig.fromObject = function fromObject(object) {
			if (object instanceof $root.user.HomeLogoConfig) return object;
			var message = new $root.user.HomeLogoConfig();
			if (object.url !== null) message.url = String(object.url);
			if (object.name !== null) message.name = String(object.name);
			return message;
		};

		/**
		 * Creates a plain object from a HomeLogoConfig message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof user.HomeLogoConfig
		 * @static
		 * @param {user.HomeLogoConfig} message HomeLogoConfig
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		HomeLogoConfig.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.url = "";
				object.name = "";
			}
			if (message.url !== null && message.hasOwnProperty("url"))
				object.url = message.url;
			if (message.name !== null && message.hasOwnProperty("name"))
				object.name = message.name;
			return object;
		};

		/**
		 * Converts this HomeLogoConfig to JSON.
		 * @function toJSON
		 * @memberof user.HomeLogoConfig
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		HomeLogoConfig.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return HomeLogoConfig;
	})();

	user.UserDomain = (function () {
		/**
		 * Properties of a UserDomain.
		 * @memberof user
		 * @interface IUserDomain
		 * @property {string|null} [userDomain] UserDomain userDomain
		 * @property {string|null} [name] UserDomain name
		 * @property {user.IDomainViewMode|null} [viewModes] UserDomain viewModes
		 * @property {string|null} [logoUrl] UserDomain logoUrl
		 * @property {boolean|null} [lastLoggedIn] UserDomain lastLoggedIn
		 * @property {boolean|null} [lockInUsers] UserDomain lockInUsers
		 * @property {string|null} [landingBotId] UserDomain landingBotId
		 * @property {user.IAssistantBotConfig|null} [assistantBotConfig] UserDomain assistantBotConfig
		 * @property {string|null} [tncUrl] UserDomain tncUrl
		 * @property {string|null} [backgroundUrl] UserDomain backgroundUrl
		 * @property {user.IHomeLogoConfig|null} [homeLogoConfig] UserDomain homeLogoConfig
		 */

		/**
		 * Constructs a new UserDomain.
		 * @memberof user
		 * @classdesc Represents a UserDomain.
		 * @implements IUserDomain
		 * @constructor
		 * @param {user.IUserDomain=} [properties] Properties to set
		 */
		function UserDomain(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * UserDomain userDomain.
		 * @member {string} userDomain
		 * @memberof user.UserDomain
		 * @instance
		 */
		UserDomain.prototype.userDomain = "";

		/**
		 * UserDomain name.
		 * @member {string} name
		 * @memberof user.UserDomain
		 * @instance
		 */
		UserDomain.prototype.name = "";

		/**
		 * UserDomain viewModes.
		 * @member {user.IDomainViewMode|null|undefined} viewModes
		 * @memberof user.UserDomain
		 * @instance
		 */
		UserDomain.prototype.viewModes = null;

		/**
		 * UserDomain logoUrl.
		 * @member {string} logoUrl
		 * @memberof user.UserDomain
		 * @instance
		 */
		UserDomain.prototype.logoUrl = "";

		/**
		 * UserDomain lastLoggedIn.
		 * @member {boolean} lastLoggedIn
		 * @memberof user.UserDomain
		 * @instance
		 */
		UserDomain.prototype.lastLoggedIn = false;

		/**
		 * UserDomain lockInUsers.
		 * @member {boolean} lockInUsers
		 * @memberof user.UserDomain
		 * @instance
		 */
		UserDomain.prototype.lockInUsers = false;

		/**
		 * UserDomain landingBotId.
		 * @member {string} landingBotId
		 * @memberof user.UserDomain
		 * @instance
		 */
		UserDomain.prototype.landingBotId = "";

		/**
		 * UserDomain assistantBotConfig.
		 * @member {user.IAssistantBotConfig|null|undefined} assistantBotConfig
		 * @memberof user.UserDomain
		 * @instance
		 */
		UserDomain.prototype.assistantBotConfig = null;

		/**
		 * UserDomain tncUrl.
		 * @member {string} tncUrl
		 * @memberof user.UserDomain
		 * @instance
		 */
		UserDomain.prototype.tncUrl = "";

		/**
		 * UserDomain backgroundUrl.
		 * @member {string} backgroundUrl
		 * @memberof user.UserDomain
		 * @instance
		 */
		UserDomain.prototype.backgroundUrl = "";

		/**
		 * UserDomain homeLogoConfig.
		 * @member {user.IHomeLogoConfig|null|undefined} homeLogoConfig
		 * @memberof user.UserDomain
		 * @instance
		 */
		UserDomain.prototype.homeLogoConfig = null;

		/**
		 * Creates a new UserDomain instance using the specified properties.
		 * @function create
		 * @memberof user.UserDomain
		 * @static
		 * @param {user.IUserDomain=} [properties] Properties to set
		 * @returns {user.UserDomain} UserDomain instance
		 */
		UserDomain.create = function create(properties) {
			return new UserDomain(properties);
		};

		/**
		 * Encodes the specified UserDomain message. Does not implicitly {@link user.UserDomain.verify|verify} messages.
		 * @function encode
		 * @memberof user.UserDomain
		 * @static
		 * @param {user.IUserDomain} message UserDomain message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		UserDomain.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.userDomain !== null &&
				Object.hasOwnProperty.call(message, "userDomain")
			)
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.userDomain);
			if (message.name !== null && Object.hasOwnProperty.call(message, "name"))
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.name);
			if (
				message.viewModes !== null &&
				Object.hasOwnProperty.call(message, "viewModes")
			)
				$root.user.DomainViewMode.encode(
					message.viewModes,
					writer.uint32(/* id 3, wireType 2 =*/ 26).fork()
				).ldelim();
			if (
				message.logoUrl !== null &&
				Object.hasOwnProperty.call(message, "logoUrl")
			)
				writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.logoUrl);
			if (
				message.lastLoggedIn !== null &&
				Object.hasOwnProperty.call(message, "lastLoggedIn")
			)
				writer.uint32(/* id 5, wireType 0 =*/ 40).bool(message.lastLoggedIn);
			if (
				message.lockInUsers !== null &&
				Object.hasOwnProperty.call(message, "lockInUsers")
			)
				writer.uint32(/* id 6, wireType 0 =*/ 48).bool(message.lockInUsers);
			if (
				message.landingBotId !== null &&
				Object.hasOwnProperty.call(message, "landingBotId")
			)
				writer.uint32(/* id 7, wireType 2 =*/ 58).string(message.landingBotId);
			if (
				message.assistantBotConfig !== null &&
				Object.hasOwnProperty.call(message, "assistantBotConfig")
			)
				$root.user.AssistantBotConfig.encode(
					message.assistantBotConfig,
					writer.uint32(/* id 8, wireType 2 =*/ 66).fork()
				).ldelim();
			if (
				message.tncUrl !== null &&
				Object.hasOwnProperty.call(message, "tncUrl")
			)
				writer.uint32(/* id 9, wireType 2 =*/ 74).string(message.tncUrl);
			if (
				message.backgroundUrl !== null &&
				Object.hasOwnProperty.call(message, "backgroundUrl")
			)
				writer
					.uint32(/* id 10, wireType 2 =*/ 82)
					.string(message.backgroundUrl);
			if (
				message.homeLogoConfig !== null &&
				Object.hasOwnProperty.call(message, "homeLogoConfig")
			)
				$root.user.HomeLogoConfig.encode(
					message.homeLogoConfig,
					writer.uint32(/* id 11, wireType 2 =*/ 90).fork()
				).ldelim();
			return writer;
		};

		/**
		 * Encodes the specified UserDomain message, length delimited. Does not implicitly {@link user.UserDomain.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof user.UserDomain
		 * @static
		 * @param {user.IUserDomain} message UserDomain message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		UserDomain.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a UserDomain message from the specified reader or buffer.
		 * @function decode
		 * @memberof user.UserDomain
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {user.UserDomain} UserDomain
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		UserDomain.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.user.UserDomain();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.userDomain = reader.string();
						break;
					case 2:
						message.name = reader.string();
						break;
					case 3:
						message.viewModes = $root.user.DomainViewMode.decode(
							reader,
							reader.uint32()
						);
						break;
					case 4:
						message.logoUrl = reader.string();
						break;
					case 5:
						message.lastLoggedIn = reader.bool();
						break;
					case 6:
						message.lockInUsers = reader.bool();
						break;
					case 7:
						message.landingBotId = reader.string();
						break;
					case 8:
						message.assistantBotConfig = $root.user.AssistantBotConfig.decode(
							reader,
							reader.uint32()
						);
						break;
					case 9:
						message.tncUrl = reader.string();
						break;
					case 10:
						message.backgroundUrl = reader.string();
						break;
					case 11:
						message.homeLogoConfig = $root.user.HomeLogoConfig.decode(
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
		 * Decodes a UserDomain message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof user.UserDomain
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {user.UserDomain} UserDomain
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		UserDomain.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a UserDomain message.
		 * @function verify
		 * @memberof user.UserDomain
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		UserDomain.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.userDomain !== null && message.hasOwnProperty("userDomain"))
				if (!$util.isString(message.userDomain))
					return "userDomain: string expected";
			if (message.name !== null && message.hasOwnProperty("name"))
				if (!$util.isString(message.name)) return "name: string expected";
			if (message.viewModes !== null && message.hasOwnProperty("viewModes")) {
				var error = $root.user.DomainViewMode.verify(message.viewModes);
				if (error) return "viewModes." + error;
			}
			if (message.logoUrl !== null && message.hasOwnProperty("logoUrl"))
				if (!$util.isString(message.logoUrl)) return "logoUrl: string expected";
			if (
				message.lastLoggedIn !== null &&
				message.hasOwnProperty("lastLoggedIn")
			)
				if (typeof message.lastLoggedIn !== "boolean")
					return "lastLoggedIn: boolean expected";
			if (message.lockInUsers !== null && message.hasOwnProperty("lockInUsers"))
				if (typeof message.lockInUsers !== "boolean")
					return "lockInUsers: boolean expected";
			if (
				message.landingBotId !== null &&
				message.hasOwnProperty("landingBotId")
			)
				if (!$util.isString(message.landingBotId))
					return "landingBotId: string expected";
			if (
				message.assistantBotConfig !== null &&
				message.hasOwnProperty("assistantBotConfig")
			) {
				var error = $root.user.AssistantBotConfig.verify(
					message.assistantBotConfig
				);
				if (error) return "assistantBotConfig." + error;
			}
			if (message.tncUrl !== null && message.hasOwnProperty("tncUrl"))
				if (!$util.isString(message.tncUrl)) return "tncUrl: string expected";
			if (
				message.backgroundUrl !== null &&
				message.hasOwnProperty("backgroundUrl")
			)
				if (!$util.isString(message.backgroundUrl))
					return "backgroundUrl: string expected";
			if (
				message.homeLogoConfig !== null &&
				message.hasOwnProperty("homeLogoConfig")
			) {
				var error = $root.user.HomeLogoConfig.verify(message.homeLogoConfig);
				if (error) return "homeLogoConfig." + error;
			}
			return null;
		};

		/**
		 * Creates a UserDomain message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof user.UserDomain
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {user.UserDomain} UserDomain
		 */
		UserDomain.fromObject = function fromObject(object) {
			if (object instanceof $root.user.UserDomain) return object;
			var message = new $root.user.UserDomain();
			if (object.userDomain !== null)
				message.userDomain = String(object.userDomain);
			if (object.name !== null) message.name = String(object.name);
			if (object.viewModes !== null) {
				if (typeof object.viewModes !== "object")
					throw TypeError(".user.UserDomain.viewModes: object expected");
				message.viewModes = $root.user.DomainViewMode.fromObject(
					object.viewModes
				);
			}
			if (object.logoUrl !== null) message.logoUrl = String(object.logoUrl);
			if (object.lastLoggedIn !== null)
				message.lastLoggedIn = Boolean(object.lastLoggedIn);
			if (object.lockInUsers !== null)
				message.lockInUsers = Boolean(object.lockInUsers);
			if (object.landingBotId !== null)
				message.landingBotId = String(object.landingBotId);
			if (object.assistantBotConfig !== null) {
				if (typeof object.assistantBotConfig !== "object")
					throw TypeError(
						".user.UserDomain.assistantBotConfig: object expected"
					);
				message.assistantBotConfig = $root.user.AssistantBotConfig.fromObject(
					object.assistantBotConfig
				);
			}
			if (object.tncUrl !== null) message.tncUrl = String(object.tncUrl);
			if (object.backgroundUrl !== null)
				message.backgroundUrl = String(object.backgroundUrl);
			if (object.homeLogoConfig !== null) {
				if (typeof object.homeLogoConfig !== "object")
					throw TypeError(".user.UserDomain.homeLogoConfig: object expected");
				message.homeLogoConfig = $root.user.HomeLogoConfig.fromObject(
					object.homeLogoConfig
				);
			}
			return message;
		};

		/**
		 * Creates a plain object from a UserDomain message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof user.UserDomain
		 * @static
		 * @param {user.UserDomain} message UserDomain
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		UserDomain.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.userDomain = "";
				object.name = "";
				object.viewModes = null;
				object.logoUrl = "";
				object.lastLoggedIn = false;
				object.lockInUsers = false;
				object.landingBotId = "";
				object.assistantBotConfig = null;
				object.tncUrl = "";
				object.backgroundUrl = "";
				object.homeLogoConfig = null;
			}
			if (message.userDomain !== null && message.hasOwnProperty("userDomain"))
				object.userDomain = message.userDomain;
			if (message.name !== null && message.hasOwnProperty("name"))
				object.name = message.name;
			if (message.viewModes !== null && message.hasOwnProperty("viewModes"))
				object.viewModes = $root.user.DomainViewMode.toObject(
					message.viewModes,
					options
				);
			if (message.logoUrl !== null && message.hasOwnProperty("logoUrl"))
				object.logoUrl = message.logoUrl;
			if (
				message.lastLoggedIn !== null &&
				message.hasOwnProperty("lastLoggedIn")
			)
				object.lastLoggedIn = message.lastLoggedIn;
			if (message.lockInUsers !== null && message.hasOwnProperty("lockInUsers"))
				object.lockInUsers = message.lockInUsers;
			if (
				message.landingBotId !== null &&
				message.hasOwnProperty("landingBotId")
			)
				object.landingBotId = message.landingBotId;
			if (
				message.assistantBotConfig !== null &&
				message.hasOwnProperty("assistantBotConfig")
			)
				object.assistantBotConfig = $root.user.AssistantBotConfig.toObject(
					message.assistantBotConfig,
					options
				);
			if (message.tncUrl !== null && message.hasOwnProperty("tncUrl"))
				object.tncUrl = message.tncUrl;
			if (
				message.backgroundUrl !== null &&
				message.hasOwnProperty("backgroundUrl")
			)
				object.backgroundUrl = message.backgroundUrl;
			if (
				message.homeLogoConfig !== null &&
				message.hasOwnProperty("homeLogoConfig")
			)
				object.homeLogoConfig = $root.user.HomeLogoConfig.toObject(
					message.homeLogoConfig,
					options
				);
			return object;
		};

		/**
		 * Converts this UserDomain to JSON.
		 * @function toJSON
		 * @memberof user.UserDomain
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		UserDomain.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return UserDomain;
	})();

	user.DomainViewMode = (function () {
		/**
		 * Properties of a DomainViewMode.
		 * @memberof user
		 * @interface IDomainViewMode
		 * @property {boolean|null} [apps] DomainViewMode apps
		 * @property {boolean|null} [channels] DomainViewMode channels
		 * @property {boolean|null} [chat] DomainViewMode chat
		 * @property {boolean|null} [voip] DomainViewMode voip
		 * @property {boolean|null} [pstn] DomainViewMode pstn
		 */

		/**
		 * Constructs a new DomainViewMode.
		 * @memberof user
		 * @classdesc Represents a DomainViewMode.
		 * @implements IDomainViewMode
		 * @constructor
		 * @param {user.IDomainViewMode=} [properties] Properties to set
		 */
		function DomainViewMode(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * DomainViewMode apps.
		 * @member {boolean} apps
		 * @memberof user.DomainViewMode
		 * @instance
		 */
		DomainViewMode.prototype.apps = false;

		/**
		 * DomainViewMode channels.
		 * @member {boolean} channels
		 * @memberof user.DomainViewMode
		 * @instance
		 */
		DomainViewMode.prototype.channels = false;

		/**
		 * DomainViewMode chat.
		 * @member {boolean} chat
		 * @memberof user.DomainViewMode
		 * @instance
		 */
		DomainViewMode.prototype.chat = false;

		/**
		 * DomainViewMode voip.
		 * @member {boolean} voip
		 * @memberof user.DomainViewMode
		 * @instance
		 */
		DomainViewMode.prototype.voip = false;

		/**
		 * DomainViewMode pstn.
		 * @member {boolean} pstn
		 * @memberof user.DomainViewMode
		 * @instance
		 */
		DomainViewMode.prototype.pstn = false;

		/**
		 * Creates a new DomainViewMode instance using the specified properties.
		 * @function create
		 * @memberof user.DomainViewMode
		 * @static
		 * @param {user.IDomainViewMode=} [properties] Properties to set
		 * @returns {user.DomainViewMode} DomainViewMode instance
		 */
		DomainViewMode.create = function create(properties) {
			return new DomainViewMode(properties);
		};

		/**
		 * Encodes the specified DomainViewMode message. Does not implicitly {@link user.DomainViewMode.verify|verify} messages.
		 * @function encode
		 * @memberof user.DomainViewMode
		 * @static
		 * @param {user.IDomainViewMode} message DomainViewMode message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		DomainViewMode.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.apps !== null && Object.hasOwnProperty.call(message, "apps"))
				writer.uint32(/* id 1, wireType 0 =*/ 8).bool(message.apps);
			if (
				message.channels !== null &&
				Object.hasOwnProperty.call(message, "channels")
			)
				writer.uint32(/* id 2, wireType 0 =*/ 16).bool(message.channels);
			if (message.chat !== null && Object.hasOwnProperty.call(message, "chat"))
				writer.uint32(/* id 3, wireType 0 =*/ 24).bool(message.chat);
			if (message.voip !== null && Object.hasOwnProperty.call(message, "voip"))
				writer.uint32(/* id 4, wireType 0 =*/ 32).bool(message.voip);
			if (message.pstn !== null && Object.hasOwnProperty.call(message, "pstn"))
				writer.uint32(/* id 5, wireType 0 =*/ 40).bool(message.pstn);
			return writer;
		};

		/**
		 * Encodes the specified DomainViewMode message, length delimited. Does not implicitly {@link user.DomainViewMode.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof user.DomainViewMode
		 * @static
		 * @param {user.IDomainViewMode} message DomainViewMode message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		DomainViewMode.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a DomainViewMode message from the specified reader or buffer.
		 * @function decode
		 * @memberof user.DomainViewMode
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {user.DomainViewMode} DomainViewMode
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		DomainViewMode.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.user.DomainViewMode();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.apps = reader.bool();
						break;
					case 2:
						message.channels = reader.bool();
						break;
					case 3:
						message.chat = reader.bool();
						break;
					case 4:
						message.voip = reader.bool();
						break;
					case 5:
						message.pstn = reader.bool();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a DomainViewMode message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof user.DomainViewMode
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {user.DomainViewMode} DomainViewMode
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		DomainViewMode.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a DomainViewMode message.
		 * @function verify
		 * @memberof user.DomainViewMode
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		DomainViewMode.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.apps !== null && message.hasOwnProperty("apps"))
				if (typeof message.apps !== "boolean") return "apps: boolean expected";
			if (message.channels !== null && message.hasOwnProperty("channels"))
				if (typeof message.channels !== "boolean")
					return "channels: boolean expected";
			if (message.chat !== null && message.hasOwnProperty("chat"))
				if (typeof message.chat !== "boolean") return "chat: boolean expected";
			if (message.voip !== null && message.hasOwnProperty("voip"))
				if (typeof message.voip !== "boolean") return "voip: boolean expected";
			if (message.pstn !== null && message.hasOwnProperty("pstn"))
				if (typeof message.pstn !== "boolean") return "pstn: boolean expected";
			return null;
		};

		/**
		 * Creates a DomainViewMode message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof user.DomainViewMode
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {user.DomainViewMode} DomainViewMode
		 */
		DomainViewMode.fromObject = function fromObject(object) {
			if (object instanceof $root.user.DomainViewMode) return object;
			var message = new $root.user.DomainViewMode();
			if (object.apps !== null) message.apps = Boolean(object.apps);
			if (object.channels !== null) message.channels = Boolean(object.channels);
			if (object.chat !== null) message.chat = Boolean(object.chat);
			if (object.voip !== null) message.voip = Boolean(object.voip);
			if (object.pstn !== null) message.pstn = Boolean(object.pstn);
			return message;
		};

		/**
		 * Creates a plain object from a DomainViewMode message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof user.DomainViewMode
		 * @static
		 * @param {user.DomainViewMode} message DomainViewMode
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		DomainViewMode.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.apps = false;
				object.channels = false;
				object.chat = false;
				object.voip = false;
				object.pstn = false;
			}
			if (message.apps !== null && message.hasOwnProperty("apps"))
				object.apps = message.apps;
			if (message.channels !== null && message.hasOwnProperty("channels"))
				object.channels = message.channels;
			if (message.chat !== null && message.hasOwnProperty("chat"))
				object.chat = message.chat;
			if (message.voip !== null && message.hasOwnProperty("voip"))
				object.voip = message.voip;
			if (message.pstn !== null && message.hasOwnProperty("pstn"))
				object.pstn = message.pstn;
			return object;
		};

		/**
		 * Converts this DomainViewMode to JSON.
		 * @function toJSON
		 * @memberof user.DomainViewMode
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		DomainViewMode.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return DomainViewMode;
	})();

	user.CallHistoryInput = (function () {
		/**
		 * Properties of a CallHistoryInput.
		 * @memberof user
		 * @interface ICallHistoryInput
		 * @property {string|null} [contactId] CallHistoryInput contactId
		 */

		/**
		 * Constructs a new CallHistoryInput.
		 * @memberof user
		 * @classdesc Represents a CallHistoryInput.
		 * @implements ICallHistoryInput
		 * @constructor
		 * @param {user.ICallHistoryInput=} [properties] Properties to set
		 */
		function CallHistoryInput(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * CallHistoryInput contactId.
		 * @member {string} contactId
		 * @memberof user.CallHistoryInput
		 * @instance
		 */
		CallHistoryInput.prototype.contactId = "";

		/**
		 * Creates a new CallHistoryInput instance using the specified properties.
		 * @function create
		 * @memberof user.CallHistoryInput
		 * @static
		 * @param {user.ICallHistoryInput=} [properties] Properties to set
		 * @returns {user.CallHistoryInput} CallHistoryInput instance
		 */
		CallHistoryInput.create = function create(properties) {
			return new CallHistoryInput(properties);
		};

		/**
		 * Encodes the specified CallHistoryInput message. Does not implicitly {@link user.CallHistoryInput.verify|verify} messages.
		 * @function encode
		 * @memberof user.CallHistoryInput
		 * @static
		 * @param {user.ICallHistoryInput} message CallHistoryInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		CallHistoryInput.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.contactId !== null &&
				Object.hasOwnProperty.call(message, "contactId")
			)
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.contactId);
			return writer;
		};

		/**
		 * Encodes the specified CallHistoryInput message, length delimited. Does not implicitly {@link user.CallHistoryInput.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof user.CallHistoryInput
		 * @static
		 * @param {user.ICallHistoryInput} message CallHistoryInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		CallHistoryInput.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a CallHistoryInput message from the specified reader or buffer.
		 * @function decode
		 * @memberof user.CallHistoryInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {user.CallHistoryInput} CallHistoryInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		CallHistoryInput.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.user.CallHistoryInput();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.contactId = reader.string();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a CallHistoryInput message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof user.CallHistoryInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {user.CallHistoryInput} CallHistoryInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		CallHistoryInput.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a CallHistoryInput message.
		 * @function verify
		 * @memberof user.CallHistoryInput
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		CallHistoryInput.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.contactId !== null && message.hasOwnProperty("contactId"))
				if (!$util.isString(message.contactId))
					return "contactId: string expected";
			return null;
		};

		/**
		 * Creates a CallHistoryInput message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof user.CallHistoryInput
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {user.CallHistoryInput} CallHistoryInput
		 */
		CallHistoryInput.fromObject = function fromObject(object) {
			if (object instanceof $root.user.CallHistoryInput) return object;
			var message = new $root.user.CallHistoryInput();
			if (object.contactId !== null)
				message.contactId = String(object.contactId);
			return message;
		};

		/**
		 * Creates a plain object from a CallHistoryInput message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof user.CallHistoryInput
		 * @static
		 * @param {user.CallHistoryInput} message CallHistoryInput
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		CallHistoryInput.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) object.contactId = "";
			if (message.contactId !== null && message.hasOwnProperty("contactId"))
				object.contactId = message.contactId;
			return object;
		};

		/**
		 * Converts this CallHistoryInput to JSON.
		 * @function toJSON
		 * @memberof user.CallHistoryInput
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		CallHistoryInput.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return CallHistoryInput;
	})();

	user.LastLoggedInDomainInput = (function () {
		/**
		 * Properties of a LastLoggedInDomainInput.
		 * @memberof user
		 * @interface ILastLoggedInDomainInput
		 * @property {string|null} [userDomain] LastLoggedInDomainInput userDomain
		 */

		/**
		 * Constructs a new LastLoggedInDomainInput.
		 * @memberof user
		 * @classdesc Represents a LastLoggedInDomainInput.
		 * @implements ILastLoggedInDomainInput
		 * @constructor
		 * @param {user.ILastLoggedInDomainInput=} [properties] Properties to set
		 */
		function LastLoggedInDomainInput(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * LastLoggedInDomainInput userDomain.
		 * @member {string} userDomain
		 * @memberof user.LastLoggedInDomainInput
		 * @instance
		 */
		LastLoggedInDomainInput.prototype.userDomain = "";

		/**
		 * Creates a new LastLoggedInDomainInput instance using the specified properties.
		 * @function create
		 * @memberof user.LastLoggedInDomainInput
		 * @static
		 * @param {user.ILastLoggedInDomainInput=} [properties] Properties to set
		 * @returns {user.LastLoggedInDomainInput} LastLoggedInDomainInput instance
		 */
		LastLoggedInDomainInput.create = function create(properties) {
			return new LastLoggedInDomainInput(properties);
		};

		/**
		 * Encodes the specified LastLoggedInDomainInput message. Does not implicitly {@link user.LastLoggedInDomainInput.verify|verify} messages.
		 * @function encode
		 * @memberof user.LastLoggedInDomainInput
		 * @static
		 * @param {user.ILastLoggedInDomainInput} message LastLoggedInDomainInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		LastLoggedInDomainInput.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.userDomain !== null &&
				Object.hasOwnProperty.call(message, "userDomain")
			)
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.userDomain);
			return writer;
		};

		/**
		 * Encodes the specified LastLoggedInDomainInput message, length delimited. Does not implicitly {@link user.LastLoggedInDomainInput.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof user.LastLoggedInDomainInput
		 * @static
		 * @param {user.ILastLoggedInDomainInput} message LastLoggedInDomainInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		LastLoggedInDomainInput.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a LastLoggedInDomainInput message from the specified reader or buffer.
		 * @function decode
		 * @memberof user.LastLoggedInDomainInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {user.LastLoggedInDomainInput} LastLoggedInDomainInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		LastLoggedInDomainInput.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.user.LastLoggedInDomainInput();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
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
		 * Decodes a LastLoggedInDomainInput message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof user.LastLoggedInDomainInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {user.LastLoggedInDomainInput} LastLoggedInDomainInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		LastLoggedInDomainInput.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a LastLoggedInDomainInput message.
		 * @function verify
		 * @memberof user.LastLoggedInDomainInput
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		LastLoggedInDomainInput.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.userDomain !== null && message.hasOwnProperty("userDomain"))
				if (!$util.isString(message.userDomain))
					return "userDomain: string expected";
			return null;
		};

		/**
		 * Creates a LastLoggedInDomainInput message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof user.LastLoggedInDomainInput
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {user.LastLoggedInDomainInput} LastLoggedInDomainInput
		 */
		LastLoggedInDomainInput.fromObject = function fromObject(object) {
			if (object instanceof $root.user.LastLoggedInDomainInput) return object;
			var message = new $root.user.LastLoggedInDomainInput();
			if (object.userDomain !== null)
				message.userDomain = String(object.userDomain);
			return message;
		};

		/**
		 * Creates a plain object from a LastLoggedInDomainInput message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof user.LastLoggedInDomainInput
		 * @static
		 * @param {user.LastLoggedInDomainInput} message LastLoggedInDomainInput
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		LastLoggedInDomainInput.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) object.userDomain = "";
			if (message.userDomain !== null && message.hasOwnProperty("userDomain"))
				object.userDomain = message.userDomain;
			return object;
		};

		/**
		 * Converts this LastLoggedInDomainInput to JSON.
		 * @function toJSON
		 * @memberof user.LastLoggedInDomainInput
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		LastLoggedInDomainInput.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return LastLoggedInDomainInput;
	})();

	user.TopupBalanceInput = (function () {
		/**
		 * Properties of a TopupBalanceInput.
		 * @memberof user
		 * @interface ITopupBalanceInput
		 * @property {string|null} [paymentCode] TopupBalanceInput paymentCode
		 * @property {number|null} [amount] TopupBalanceInput amount
		 * @property {string|null} [token] TopupBalanceInput token
		 * @property {string|null} [platform] TopupBalanceInput platform
		 */

		/**
		 * Constructs a new TopupBalanceInput.
		 * @memberof user
		 * @classdesc Represents a TopupBalanceInput.
		 * @implements ITopupBalanceInput
		 * @constructor
		 * @param {user.ITopupBalanceInput=} [properties] Properties to set
		 */
		function TopupBalanceInput(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * TopupBalanceInput paymentCode.
		 * @member {string} paymentCode
		 * @memberof user.TopupBalanceInput
		 * @instance
		 */
		TopupBalanceInput.prototype.paymentCode = "";

		/**
		 * TopupBalanceInput amount.
		 * @member {number} amount
		 * @memberof user.TopupBalanceInput
		 * @instance
		 */
		TopupBalanceInput.prototype.amount = 0;

		/**
		 * TopupBalanceInput token.
		 * @member {string} token
		 * @memberof user.TopupBalanceInput
		 * @instance
		 */
		TopupBalanceInput.prototype.token = "";

		/**
		 * TopupBalanceInput platform.
		 * @member {string} platform
		 * @memberof user.TopupBalanceInput
		 * @instance
		 */
		TopupBalanceInput.prototype.platform = "";

		/**
		 * Creates a new TopupBalanceInput instance using the specified properties.
		 * @function create
		 * @memberof user.TopupBalanceInput
		 * @static
		 * @param {user.ITopupBalanceInput=} [properties] Properties to set
		 * @returns {user.TopupBalanceInput} TopupBalanceInput instance
		 */
		TopupBalanceInput.create = function create(properties) {
			return new TopupBalanceInput(properties);
		};

		/**
		 * Encodes the specified TopupBalanceInput message. Does not implicitly {@link user.TopupBalanceInput.verify|verify} messages.
		 * @function encode
		 * @memberof user.TopupBalanceInput
		 * @static
		 * @param {user.ITopupBalanceInput} message TopupBalanceInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		TopupBalanceInput.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.paymentCode !== null &&
				Object.hasOwnProperty.call(message, "paymentCode")
			)
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.paymentCode);
			if (
				message.amount !== null &&
				Object.hasOwnProperty.call(message, "amount")
			)
				writer.uint32(/* id 2, wireType 1 =*/ 17).double(message.amount);
			if (
				message.token !== null &&
				Object.hasOwnProperty.call(message, "token")
			)
				writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.token);
			if (
				message.platform !== null &&
				Object.hasOwnProperty.call(message, "platform")
			)
				writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.platform);
			return writer;
		};

		/**
		 * Encodes the specified TopupBalanceInput message, length delimited. Does not implicitly {@link user.TopupBalanceInput.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof user.TopupBalanceInput
		 * @static
		 * @param {user.ITopupBalanceInput} message TopupBalanceInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		TopupBalanceInput.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a TopupBalanceInput message from the specified reader or buffer.
		 * @function decode
		 * @memberof user.TopupBalanceInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {user.TopupBalanceInput} TopupBalanceInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		TopupBalanceInput.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.user.TopupBalanceInput();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.paymentCode = reader.string();
						break;
					case 2:
						message.amount = reader.double();
						break;
					case 3:
						message.token = reader.string();
						break;
					case 4:
						message.platform = reader.string();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a TopupBalanceInput message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof user.TopupBalanceInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {user.TopupBalanceInput} TopupBalanceInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		TopupBalanceInput.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a TopupBalanceInput message.
		 * @function verify
		 * @memberof user.TopupBalanceInput
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		TopupBalanceInput.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.paymentCode !== null && message.hasOwnProperty("paymentCode"))
				if (!$util.isString(message.paymentCode))
					return "paymentCode: string expected";
			if (message.amount !== null && message.hasOwnProperty("amount"))
				if (typeof message.amount !== "number")
					return "amount: number expected";
			if (message.token !== null && message.hasOwnProperty("token"))
				if (!$util.isString(message.token)) return "token: string expected";
			if (message.platform !== null && message.hasOwnProperty("platform"))
				if (!$util.isString(message.platform))
					return "platform: string expected";
			return null;
		};

		/**
		 * Creates a TopupBalanceInput message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof user.TopupBalanceInput
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {user.TopupBalanceInput} TopupBalanceInput
		 */
		TopupBalanceInput.fromObject = function fromObject(object) {
			if (object instanceof $root.user.TopupBalanceInput) return object;
			var message = new $root.user.TopupBalanceInput();
			if (object.paymentCode !== null)
				message.paymentCode = String(object.paymentCode);
			if (object.amount !== null) message.amount = Number(object.amount);
			if (object.token !== null) message.token = String(object.token);
			if (object.platform !== null) message.platform = String(object.platform);
			return message;
		};

		/**
		 * Creates a plain object from a TopupBalanceInput message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof user.TopupBalanceInput
		 * @static
		 * @param {user.TopupBalanceInput} message TopupBalanceInput
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		TopupBalanceInput.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.paymentCode = "";
				object.amount = 0;
				object.token = "";
				object.platform = "";
			}
			if (message.paymentCode !== null && message.hasOwnProperty("paymentCode"))
				object.paymentCode = message.paymentCode;
			if (message.amount !== null && message.hasOwnProperty("amount"))
				object.amount =
					options.json && !isFinite(message.amount)
						? String(message.amount)
						: message.amount;
			if (message.token !== null && message.hasOwnProperty("token"))
				object.token = message.token;
			if (message.platform !== null && message.hasOwnProperty("platform"))
				object.platform = message.platform;
			return object;
		};

		/**
		 * Converts this TopupBalanceInput to JSON.
		 * @function toJSON
		 * @memberof user.TopupBalanceInput
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		TopupBalanceInput.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return TopupBalanceInput;
	})();

	user.TopupBalanceResponse = (function () {
		/**
		 * Properties of a TopupBalanceResponse.
		 * @memberof user
		 * @interface ITopupBalanceResponse
		 * @property {number|null} [error] TopupBalanceResponse error
		 * @property {number|null} [callQuota] TopupBalanceResponse callQuota
		 */

		/**
		 * Constructs a new TopupBalanceResponse.
		 * @memberof user
		 * @classdesc Represents a TopupBalanceResponse.
		 * @implements ITopupBalanceResponse
		 * @constructor
		 * @param {user.ITopupBalanceResponse=} [properties] Properties to set
		 */
		function TopupBalanceResponse(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * TopupBalanceResponse error.
		 * @member {number} error
		 * @memberof user.TopupBalanceResponse
		 * @instance
		 */
		TopupBalanceResponse.prototype.error = 0;

		/**
		 * TopupBalanceResponse callQuota.
		 * @member {number} callQuota
		 * @memberof user.TopupBalanceResponse
		 * @instance
		 */
		TopupBalanceResponse.prototype.callQuota = 0;

		/**
		 * Creates a new TopupBalanceResponse instance using the specified properties.
		 * @function create
		 * @memberof user.TopupBalanceResponse
		 * @static
		 * @param {user.ITopupBalanceResponse=} [properties] Properties to set
		 * @returns {user.TopupBalanceResponse} TopupBalanceResponse instance
		 */
		TopupBalanceResponse.create = function create(properties) {
			return new TopupBalanceResponse(properties);
		};

		/**
		 * Encodes the specified TopupBalanceResponse message. Does not implicitly {@link user.TopupBalanceResponse.verify|verify} messages.
		 * @function encode
		 * @memberof user.TopupBalanceResponse
		 * @static
		 * @param {user.ITopupBalanceResponse} message TopupBalanceResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		TopupBalanceResponse.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.error !== null &&
				Object.hasOwnProperty.call(message, "error")
			)
				writer.uint32(/* id 1, wireType 0 =*/ 8).int32(message.error);
			if (
				message.callQuota !== null &&
				Object.hasOwnProperty.call(message, "callQuota")
			)
				writer.uint32(/* id 2, wireType 1 =*/ 17).double(message.callQuota);
			return writer;
		};

		/**
		 * Encodes the specified TopupBalanceResponse message, length delimited. Does not implicitly {@link user.TopupBalanceResponse.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof user.TopupBalanceResponse
		 * @static
		 * @param {user.ITopupBalanceResponse} message TopupBalanceResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		TopupBalanceResponse.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a TopupBalanceResponse message from the specified reader or buffer.
		 * @function decode
		 * @memberof user.TopupBalanceResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {user.TopupBalanceResponse} TopupBalanceResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		TopupBalanceResponse.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.user.TopupBalanceResponse();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.error = reader.int32();
						break;
					case 2:
						message.callQuota = reader.double();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a TopupBalanceResponse message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof user.TopupBalanceResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {user.TopupBalanceResponse} TopupBalanceResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		TopupBalanceResponse.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a TopupBalanceResponse message.
		 * @function verify
		 * @memberof user.TopupBalanceResponse
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		TopupBalanceResponse.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.error !== null && message.hasOwnProperty("error"))
				if (!$util.isInteger(message.error)) return "error: integer expected";
			if (message.callQuota !== null && message.hasOwnProperty("callQuota"))
				if (typeof message.callQuota !== "number")
					return "callQuota: number expected";
			return null;
		};

		/**
		 * Creates a TopupBalanceResponse message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof user.TopupBalanceResponse
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {user.TopupBalanceResponse} TopupBalanceResponse
		 */
		TopupBalanceResponse.fromObject = function fromObject(object) {
			if (object instanceof $root.user.TopupBalanceResponse) return object;
			var message = new $root.user.TopupBalanceResponse();
			if (object.error !== null) message.error = object.error | 0;
			if (object.callQuota !== null)
				message.callQuota = Number(object.callQuota);
			return message;
		};

		/**
		 * Creates a plain object from a TopupBalanceResponse message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof user.TopupBalanceResponse
		 * @static
		 * @param {user.TopupBalanceResponse} message TopupBalanceResponse
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		TopupBalanceResponse.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.error = 0;
				object.callQuota = 0;
			}
			if (message.error !== null && message.hasOwnProperty("error"))
				object.error = message.error;
			if (message.callQuota !== null && message.hasOwnProperty("callQuota"))
				object.callQuota =
					options.json && !isFinite(message.callQuota)
						? String(message.callQuota)
						: message.callQuota;
			return object;
		};

		/**
		 * Converts this TopupBalanceResponse to JSON.
		 * @function toJSON
		 * @memberof user.TopupBalanceResponse
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		TopupBalanceResponse.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return TopupBalanceResponse;
	})();

	user.DeviceInfo = (function () {
		/**
		 * Properties of a DeviceInfo.
		 * @memberof user
		 * @interface IDeviceInfo
		 * @property {string|null} [deviceToken] DeviceInfo deviceToken
		 * @property {string|null} [deviceType] DeviceInfo deviceType
		 * @property {string|null} [platform] DeviceInfo platform
		 */

		/**
		 * Constructs a new DeviceInfo.
		 * @memberof user
		 * @classdesc Represents a DeviceInfo.
		 * @implements IDeviceInfo
		 * @constructor
		 * @param {user.IDeviceInfo=} [properties] Properties to set
		 */
		function DeviceInfo(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * DeviceInfo deviceToken.
		 * @member {string} deviceToken
		 * @memberof user.DeviceInfo
		 * @instance
		 */
		DeviceInfo.prototype.deviceToken = "";

		/**
		 * DeviceInfo deviceType.
		 * @member {string} deviceType
		 * @memberof user.DeviceInfo
		 * @instance
		 */
		DeviceInfo.prototype.deviceType = "";

		/**
		 * DeviceInfo platform.
		 * @member {string} platform
		 * @memberof user.DeviceInfo
		 * @instance
		 */
		DeviceInfo.prototype.platform = "";

		/**
		 * Creates a new DeviceInfo instance using the specified properties.
		 * @function create
		 * @memberof user.DeviceInfo
		 * @static
		 * @param {user.IDeviceInfo=} [properties] Properties to set
		 * @returns {user.DeviceInfo} DeviceInfo instance
		 */
		DeviceInfo.create = function create(properties) {
			return new DeviceInfo(properties);
		};

		/**
		 * Encodes the specified DeviceInfo message. Does not implicitly {@link user.DeviceInfo.verify|verify} messages.
		 * @function encode
		 * @memberof user.DeviceInfo
		 * @static
		 * @param {user.IDeviceInfo} message DeviceInfo message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		DeviceInfo.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.deviceToken !== null &&
				Object.hasOwnProperty.call(message, "deviceToken")
			)
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.deviceToken);
			if (
				message.deviceType !== null &&
				Object.hasOwnProperty.call(message, "deviceType")
			)
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.deviceType);
			if (
				message.platform !== null &&
				Object.hasOwnProperty.call(message, "platform")
			)
				writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.platform);
			return writer;
		};

		/**
		 * Encodes the specified DeviceInfo message, length delimited. Does not implicitly {@link user.DeviceInfo.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof user.DeviceInfo
		 * @static
		 * @param {user.IDeviceInfo} message DeviceInfo message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		DeviceInfo.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a DeviceInfo message from the specified reader or buffer.
		 * @function decode
		 * @memberof user.DeviceInfo
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {user.DeviceInfo} DeviceInfo
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		DeviceInfo.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.user.DeviceInfo();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.deviceToken = reader.string();
						break;
					case 2:
						message.deviceType = reader.string();
						break;
					case 3:
						message.platform = reader.string();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a DeviceInfo message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof user.DeviceInfo
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {user.DeviceInfo} DeviceInfo
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		DeviceInfo.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a DeviceInfo message.
		 * @function verify
		 * @memberof user.DeviceInfo
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		DeviceInfo.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.deviceToken !== null && message.hasOwnProperty("deviceToken"))
				if (!$util.isString(message.deviceToken))
					return "deviceToken: string expected";
			if (message.deviceType !== null && message.hasOwnProperty("deviceType"))
				if (!$util.isString(message.deviceType))
					return "deviceType: string expected";
			if (message.platform !== null && message.hasOwnProperty("platform"))
				if (!$util.isString(message.platform))
					return "platform: string expected";
			return null;
		};

		/**
		 * Creates a DeviceInfo message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof user.DeviceInfo
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {user.DeviceInfo} DeviceInfo
		 */
		DeviceInfo.fromObject = function fromObject(object) {
			if (object instanceof $root.user.DeviceInfo) return object;
			var message = new $root.user.DeviceInfo();
			if (object.deviceToken !== null)
				message.deviceToken = String(object.deviceToken);
			if (object.deviceType !== null)
				message.deviceType = String(object.deviceType);
			if (object.platform !== null) message.platform = String(object.platform);
			return message;
		};

		/**
		 * Creates a plain object from a DeviceInfo message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof user.DeviceInfo
		 * @static
		 * @param {user.DeviceInfo} message DeviceInfo
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		DeviceInfo.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.deviceToken = "";
				object.deviceType = "";
				object.platform = "";
			}
			if (message.deviceToken !== null && message.hasOwnProperty("deviceToken"))
				object.deviceToken = message.deviceToken;
			if (message.deviceType !== null && message.hasOwnProperty("deviceType"))
				object.deviceType = message.deviceType;
			if (message.platform !== null && message.hasOwnProperty("platform"))
				object.platform = message.platform;
			return object;
		};

		/**
		 * Converts this DeviceInfo to JSON.
		 * @function toJSON
		 * @memberof user.DeviceInfo
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		DeviceInfo.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return DeviceInfo;
	})();

	user.DeviceBoolResponse = (function () {
		/**
		 * Properties of a DeviceBoolResponse.
		 * @memberof user
		 * @interface IDeviceBoolResponse
		 * @property {number|null} [error] DeviceBoolResponse error
		 * @property {Array.<boolean>|null} [content] DeviceBoolResponse content
		 */

		/**
		 * Constructs a new DeviceBoolResponse.
		 * @memberof user
		 * @classdesc Represents a DeviceBoolResponse.
		 * @implements IDeviceBoolResponse
		 * @constructor
		 * @param {user.IDeviceBoolResponse=} [properties] Properties to set
		 */
		function DeviceBoolResponse(properties) {
			this.content = [];
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * DeviceBoolResponse error.
		 * @member {number} error
		 * @memberof user.DeviceBoolResponse
		 * @instance
		 */
		DeviceBoolResponse.prototype.error = 0;

		/**
		 * DeviceBoolResponse content.
		 * @member {Array.<boolean>} content
		 * @memberof user.DeviceBoolResponse
		 * @instance
		 */
		DeviceBoolResponse.prototype.content = $util.emptyArray;

		/**
		 * Creates a new DeviceBoolResponse instance using the specified properties.
		 * @function create
		 * @memberof user.DeviceBoolResponse
		 * @static
		 * @param {user.IDeviceBoolResponse=} [properties] Properties to set
		 * @returns {user.DeviceBoolResponse} DeviceBoolResponse instance
		 */
		DeviceBoolResponse.create = function create(properties) {
			return new DeviceBoolResponse(properties);
		};

		/**
		 * Encodes the specified DeviceBoolResponse message. Does not implicitly {@link user.DeviceBoolResponse.verify|verify} messages.
		 * @function encode
		 * @memberof user.DeviceBoolResponse
		 * @static
		 * @param {user.IDeviceBoolResponse} message DeviceBoolResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		DeviceBoolResponse.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.error !== null &&
				Object.hasOwnProperty.call(message, "error")
			)
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
		 * Encodes the specified DeviceBoolResponse message, length delimited. Does not implicitly {@link user.DeviceBoolResponse.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof user.DeviceBoolResponse
		 * @static
		 * @param {user.IDeviceBoolResponse} message DeviceBoolResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		DeviceBoolResponse.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a DeviceBoolResponse message from the specified reader or buffer.
		 * @function decode
		 * @memberof user.DeviceBoolResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {user.DeviceBoolResponse} DeviceBoolResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		DeviceBoolResponse.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.user.DeviceBoolResponse();
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
		 * Decodes a DeviceBoolResponse message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof user.DeviceBoolResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {user.DeviceBoolResponse} DeviceBoolResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		DeviceBoolResponse.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a DeviceBoolResponse message.
		 * @function verify
		 * @memberof user.DeviceBoolResponse
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		DeviceBoolResponse.verify = function verify(message) {
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
		 * Creates a DeviceBoolResponse message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof user.DeviceBoolResponse
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {user.DeviceBoolResponse} DeviceBoolResponse
		 */
		DeviceBoolResponse.fromObject = function fromObject(object) {
			if (object instanceof $root.user.DeviceBoolResponse) return object;
			var message = new $root.user.DeviceBoolResponse();
			if (object.error !== null) message.error = object.error | 0;
			if (object.content) {
				if (!Array.isArray(object.content))
					throw TypeError(".user.DeviceBoolResponse.content: array expected");
				message.content = [];
				for (var i = 0; i < object.content.length; ++i)
					message.content[i] = Boolean(object.content[i]);
			}
			return message;
		};

		/**
		 * Creates a plain object from a DeviceBoolResponse message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof user.DeviceBoolResponse
		 * @static
		 * @param {user.DeviceBoolResponse} message DeviceBoolResponse
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		DeviceBoolResponse.toObject = function toObject(message, options) {
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
		 * Converts this DeviceBoolResponse to JSON.
		 * @function toJSON
		 * @memberof user.DeviceBoolResponse
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		DeviceBoolResponse.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return DeviceBoolResponse;
	})();

	user.UserBalanceResponse = (function () {
		/**
		 * Properties of a UserBalanceResponse.
		 * @memberof user
		 * @interface IUserBalanceResponse
		 * @property {number|null} [callQuota] UserBalanceResponse callQuota
		 * @property {number|null} [error] UserBalanceResponse error
		 */

		/**
		 * Constructs a new UserBalanceResponse.
		 * @memberof user
		 * @classdesc Represents a UserBalanceResponse.
		 * @implements IUserBalanceResponse
		 * @constructor
		 * @param {user.IUserBalanceResponse=} [properties] Properties to set
		 */
		function UserBalanceResponse(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * UserBalanceResponse callQuota.
		 * @member {number} callQuota
		 * @memberof user.UserBalanceResponse
		 * @instance
		 */
		UserBalanceResponse.prototype.callQuota = 0;

		/**
		 * UserBalanceResponse error.
		 * @member {number} error
		 * @memberof user.UserBalanceResponse
		 * @instance
		 */
		UserBalanceResponse.prototype.error = 0;

		/**
		 * Creates a new UserBalanceResponse instance using the specified properties.
		 * @function create
		 * @memberof user.UserBalanceResponse
		 * @static
		 * @param {user.IUserBalanceResponse=} [properties] Properties to set
		 * @returns {user.UserBalanceResponse} UserBalanceResponse instance
		 */
		UserBalanceResponse.create = function create(properties) {
			return new UserBalanceResponse(properties);
		};

		/**
		 * Encodes the specified UserBalanceResponse message. Does not implicitly {@link user.UserBalanceResponse.verify|verify} messages.
		 * @function encode
		 * @memberof user.UserBalanceResponse
		 * @static
		 * @param {user.IUserBalanceResponse} message UserBalanceResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		UserBalanceResponse.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.callQuota !== null &&
				Object.hasOwnProperty.call(message, "callQuota")
			)
				writer.uint32(/* id 1, wireType 1 =*/ 9).double(message.callQuota);
			if (
				message.error !== null &&
				Object.hasOwnProperty.call(message, "error")
			)
				writer.uint32(/* id 2, wireType 0 =*/ 16).int32(message.error);
			return writer;
		};

		/**
		 * Encodes the specified UserBalanceResponse message, length delimited. Does not implicitly {@link user.UserBalanceResponse.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof user.UserBalanceResponse
		 * @static
		 * @param {user.IUserBalanceResponse} message UserBalanceResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		UserBalanceResponse.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a UserBalanceResponse message from the specified reader or buffer.
		 * @function decode
		 * @memberof user.UserBalanceResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {user.UserBalanceResponse} UserBalanceResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		UserBalanceResponse.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.user.UserBalanceResponse();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.callQuota = reader.double();
						break;
					case 2:
						message.error = reader.int32();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a UserBalanceResponse message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof user.UserBalanceResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {user.UserBalanceResponse} UserBalanceResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		UserBalanceResponse.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a UserBalanceResponse message.
		 * @function verify
		 * @memberof user.UserBalanceResponse
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		UserBalanceResponse.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.callQuota !== null && message.hasOwnProperty("callQuota"))
				if (typeof message.callQuota !== "number")
					return "callQuota: number expected";
			if (message.error !== null && message.hasOwnProperty("error"))
				if (!$util.isInteger(message.error)) return "error: integer expected";
			return null;
		};

		/**
		 * Creates a UserBalanceResponse message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof user.UserBalanceResponse
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {user.UserBalanceResponse} UserBalanceResponse
		 */
		UserBalanceResponse.fromObject = function fromObject(object) {
			if (object instanceof $root.user.UserBalanceResponse) return object;
			var message = new $root.user.UserBalanceResponse();
			if (object.callQuota !== null)
				message.callQuota = Number(object.callQuota);
			if (object.error !== null) message.error = object.error | 0;
			return message;
		};

		/**
		 * Creates a plain object from a UserBalanceResponse message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof user.UserBalanceResponse
		 * @static
		 * @param {user.UserBalanceResponse} message UserBalanceResponse
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		UserBalanceResponse.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.callQuota = 0;
				object.error = 0;
			}
			if (message.callQuota !== null && message.hasOwnProperty("callQuota"))
				object.callQuota =
					options.json && !isFinite(message.callQuota)
						? String(message.callQuota)
						: message.callQuota;
			if (message.error !== null && message.hasOwnProperty("error"))
				object.error = message.error;
			return object;
		};

		/**
		 * Converts this UserBalanceResponse to JSON.
		 * @function toJSON
		 * @memberof user.UserBalanceResponse
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		UserBalanceResponse.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return UserBalanceResponse;
	})();

	user.PreConnectCallCheckInput = (function () {
		/**
		 * Properties of a PreConnectCallCheckInput.
		 * @memberof user
		 * @interface IPreConnectCallCheckInput
		 * @property {string|null} [videoSessionId] PreConnectCallCheckInput videoSessionId
		 * @property {string|null} [callInitiatorUserId] PreConnectCallCheckInput callInitiatorUserId
		 */

		/**
		 * Constructs a new PreConnectCallCheckInput.
		 * @memberof user
		 * @classdesc Represents a PreConnectCallCheckInput.
		 * @implements IPreConnectCallCheckInput
		 * @constructor
		 * @param {user.IPreConnectCallCheckInput=} [properties] Properties to set
		 */
		function PreConnectCallCheckInput(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * PreConnectCallCheckInput videoSessionId.
		 * @member {string} videoSessionId
		 * @memberof user.PreConnectCallCheckInput
		 * @instance
		 */
		PreConnectCallCheckInput.prototype.videoSessionId = "";

		/**
		 * PreConnectCallCheckInput callInitiatorUserId.
		 * @member {string} callInitiatorUserId
		 * @memberof user.PreConnectCallCheckInput
		 * @instance
		 */
		PreConnectCallCheckInput.prototype.callInitiatorUserId = "";

		/**
		 * Creates a new PreConnectCallCheckInput instance using the specified properties.
		 * @function create
		 * @memberof user.PreConnectCallCheckInput
		 * @static
		 * @param {user.IPreConnectCallCheckInput=} [properties] Properties to set
		 * @returns {user.PreConnectCallCheckInput} PreConnectCallCheckInput instance
		 */
		PreConnectCallCheckInput.create = function create(properties) {
			return new PreConnectCallCheckInput(properties);
		};

		/**
		 * Encodes the specified PreConnectCallCheckInput message. Does not implicitly {@link user.PreConnectCallCheckInput.verify|verify} messages.
		 * @function encode
		 * @memberof user.PreConnectCallCheckInput
		 * @static
		 * @param {user.IPreConnectCallCheckInput} message PreConnectCallCheckInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		PreConnectCallCheckInput.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.videoSessionId !== null &&
				Object.hasOwnProperty.call(message, "videoSessionId")
			)
				writer
					.uint32(/* id 1, wireType 2 =*/ 10)
					.string(message.videoSessionId);
			if (
				message.callInitiatorUserId !== null &&
				Object.hasOwnProperty.call(message, "callInitiatorUserId")
			)
				writer
					.uint32(/* id 2, wireType 2 =*/ 18)
					.string(message.callInitiatorUserId);
			return writer;
		};

		/**
		 * Encodes the specified PreConnectCallCheckInput message, length delimited. Does not implicitly {@link user.PreConnectCallCheckInput.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof user.PreConnectCallCheckInput
		 * @static
		 * @param {user.IPreConnectCallCheckInput} message PreConnectCallCheckInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		PreConnectCallCheckInput.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a PreConnectCallCheckInput message from the specified reader or buffer.
		 * @function decode
		 * @memberof user.PreConnectCallCheckInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {user.PreConnectCallCheckInput} PreConnectCallCheckInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		PreConnectCallCheckInput.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.user.PreConnectCallCheckInput();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.videoSessionId = reader.string();
						break;
					case 2:
						message.callInitiatorUserId = reader.string();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a PreConnectCallCheckInput message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof user.PreConnectCallCheckInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {user.PreConnectCallCheckInput} PreConnectCallCheckInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		PreConnectCallCheckInput.decodeDelimited = function decodeDelimited(
			reader
		) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a PreConnectCallCheckInput message.
		 * @function verify
		 * @memberof user.PreConnectCallCheckInput
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		PreConnectCallCheckInput.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (
				message.videoSessionId !== null &&
				message.hasOwnProperty("videoSessionId")
			)
				if (!$util.isString(message.videoSessionId))
					return "videoSessionId: string expected";
			if (
				message.callInitiatorUserId !== null &&
				message.hasOwnProperty("callInitiatorUserId")
			)
				if (!$util.isString(message.callInitiatorUserId))
					return "callInitiatorUserId: string expected";
			return null;
		};

		/**
		 * Creates a PreConnectCallCheckInput message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof user.PreConnectCallCheckInput
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {user.PreConnectCallCheckInput} PreConnectCallCheckInput
		 */
		PreConnectCallCheckInput.fromObject = function fromObject(object) {
			if (object instanceof $root.user.PreConnectCallCheckInput) return object;
			var message = new $root.user.PreConnectCallCheckInput();
			if (object.videoSessionId !== null)
				message.videoSessionId = String(object.videoSessionId);
			if (object.callInitiatorUserId !== null)
				message.callInitiatorUserId = String(object.callInitiatorUserId);
			return message;
		};

		/**
		 * Creates a plain object from a PreConnectCallCheckInput message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof user.PreConnectCallCheckInput
		 * @static
		 * @param {user.PreConnectCallCheckInput} message PreConnectCallCheckInput
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		PreConnectCallCheckInput.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.videoSessionId = "";
				object.callInitiatorUserId = "";
			}
			if (
				message.videoSessionId !== null &&
				message.hasOwnProperty("videoSessionId")
			)
				object.videoSessionId = message.videoSessionId;
			if (
				message.callInitiatorUserId !== null &&
				message.hasOwnProperty("callInitiatorUserId")
			)
				object.callInitiatorUserId = message.callInitiatorUserId;
			return object;
		};

		/**
		 * Converts this PreConnectCallCheckInput to JSON.
		 * @function toJSON
		 * @memberof user.PreConnectCallCheckInput
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		PreConnectCallCheckInput.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return PreConnectCallCheckInput;
	})();

	user.PreConnectCallCheckResponse = (function () {
		/**
		 * Properties of a PreConnectCallCheckResponse.
		 * @memberof user
		 * @interface IPreConnectCallCheckResponse
		 * @property {boolean|null} [success] PreConnectCallCheckResponse success
		 * @property {string|null} [error] PreConnectCallCheckResponse error
		 */

		/**
		 * Constructs a new PreConnectCallCheckResponse.
		 * @memberof user
		 * @classdesc Represents a PreConnectCallCheckResponse.
		 * @implements IPreConnectCallCheckResponse
		 * @constructor
		 * @param {user.IPreConnectCallCheckResponse=} [properties] Properties to set
		 */
		function PreConnectCallCheckResponse(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * PreConnectCallCheckResponse success.
		 * @member {boolean} success
		 * @memberof user.PreConnectCallCheckResponse
		 * @instance
		 */
		PreConnectCallCheckResponse.prototype.success = false;

		/**
		 * PreConnectCallCheckResponse error.
		 * @member {string} error
		 * @memberof user.PreConnectCallCheckResponse
		 * @instance
		 */
		PreConnectCallCheckResponse.prototype.error = "";

		/**
		 * Creates a new PreConnectCallCheckResponse instance using the specified properties.
		 * @function create
		 * @memberof user.PreConnectCallCheckResponse
		 * @static
		 * @param {user.IPreConnectCallCheckResponse=} [properties] Properties to set
		 * @returns {user.PreConnectCallCheckResponse} PreConnectCallCheckResponse instance
		 */
		PreConnectCallCheckResponse.create = function create(properties) {
			return new PreConnectCallCheckResponse(properties);
		};

		/**
		 * Encodes the specified PreConnectCallCheckResponse message. Does not implicitly {@link user.PreConnectCallCheckResponse.verify|verify} messages.
		 * @function encode
		 * @memberof user.PreConnectCallCheckResponse
		 * @static
		 * @param {user.IPreConnectCallCheckResponse} message PreConnectCallCheckResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		PreConnectCallCheckResponse.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.success !== null &&
				Object.hasOwnProperty.call(message, "success")
			)
				writer.uint32(/* id 1, wireType 0 =*/ 8).bool(message.success);
			if (
				message.error !== null &&
				Object.hasOwnProperty.call(message, "error")
			)
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.error);
			return writer;
		};

		/**
		 * Encodes the specified PreConnectCallCheckResponse message, length delimited. Does not implicitly {@link user.PreConnectCallCheckResponse.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof user.PreConnectCallCheckResponse
		 * @static
		 * @param {user.IPreConnectCallCheckResponse} message PreConnectCallCheckResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		PreConnectCallCheckResponse.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a PreConnectCallCheckResponse message from the specified reader or buffer.
		 * @function decode
		 * @memberof user.PreConnectCallCheckResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {user.PreConnectCallCheckResponse} PreConnectCallCheckResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		PreConnectCallCheckResponse.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.user.PreConnectCallCheckResponse();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.success = reader.bool();
						break;
					case 2:
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
		 * Decodes a PreConnectCallCheckResponse message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof user.PreConnectCallCheckResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {user.PreConnectCallCheckResponse} PreConnectCallCheckResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		PreConnectCallCheckResponse.decodeDelimited = function decodeDelimited(
			reader
		) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a PreConnectCallCheckResponse message.
		 * @function verify
		 * @memberof user.PreConnectCallCheckResponse
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		PreConnectCallCheckResponse.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.success !== null && message.hasOwnProperty("success"))
				if (typeof message.success !== "boolean")
					return "success: boolean expected";
			if (message.error !== null && message.hasOwnProperty("error"))
				if (!$util.isString(message.error)) return "error: string expected";
			return null;
		};

		/**
		 * Creates a PreConnectCallCheckResponse message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof user.PreConnectCallCheckResponse
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {user.PreConnectCallCheckResponse} PreConnectCallCheckResponse
		 */
		PreConnectCallCheckResponse.fromObject = function fromObject(object) {
			if (object instanceof $root.user.PreConnectCallCheckResponse)
				return object;
			var message = new $root.user.PreConnectCallCheckResponse();
			if (object.success !== null) message.success = Boolean(object.success);
			if (object.error !== null) message.error = String(object.error);
			return message;
		};

		/**
		 * Creates a plain object from a PreConnectCallCheckResponse message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof user.PreConnectCallCheckResponse
		 * @static
		 * @param {user.PreConnectCallCheckResponse} message PreConnectCallCheckResponse
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		PreConnectCallCheckResponse.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.success = false;
				object.error = "";
			}
			if (message.success !== null && message.hasOwnProperty("success"))
				object.success = message.success;
			if (message.error !== null && message.hasOwnProperty("error"))
				object.error = message.error;
			return object;
		};

		/**
		 * Converts this PreConnectCallCheckResponse to JSON.
		 * @function toJSON
		 * @memberof user.PreConnectCallCheckResponse
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		PreConnectCallCheckResponse.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return PreConnectCallCheckResponse;
	})();

	user.AppBroadcastMessagesResponse = (function () {
		/**
		 * Properties of an AppBroadcastMessagesResponse.
		 * @memberof user
		 * @interface IAppBroadcastMessagesResponse
		 * @property {Array.<user.IAppBroadcastMessage>|null} [messages] AppBroadcastMessagesResponse messages
		 */

		/**
		 * Constructs a new AppBroadcastMessagesResponse.
		 * @memberof user
		 * @classdesc Represents an AppBroadcastMessagesResponse.
		 * @implements IAppBroadcastMessagesResponse
		 * @constructor
		 * @param {user.IAppBroadcastMessagesResponse=} [properties] Properties to set
		 */
		function AppBroadcastMessagesResponse(properties) {
			this.messages = [];
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * AppBroadcastMessagesResponse messages.
		 * @member {Array.<user.IAppBroadcastMessage>} messages
		 * @memberof user.AppBroadcastMessagesResponse
		 * @instance
		 */
		AppBroadcastMessagesResponse.prototype.messages = $util.emptyArray;

		/**
		 * Creates a new AppBroadcastMessagesResponse instance using the specified properties.
		 * @function create
		 * @memberof user.AppBroadcastMessagesResponse
		 * @static
		 * @param {user.IAppBroadcastMessagesResponse=} [properties] Properties to set
		 * @returns {user.AppBroadcastMessagesResponse} AppBroadcastMessagesResponse instance
		 */
		AppBroadcastMessagesResponse.create = function create(properties) {
			return new AppBroadcastMessagesResponse(properties);
		};

		/**
		 * Encodes the specified AppBroadcastMessagesResponse message. Does not implicitly {@link user.AppBroadcastMessagesResponse.verify|verify} messages.
		 * @function encode
		 * @memberof user.AppBroadcastMessagesResponse
		 * @static
		 * @param {user.IAppBroadcastMessagesResponse} message AppBroadcastMessagesResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		AppBroadcastMessagesResponse.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.messages !== null && message.messages.length)
				for (var i = 0; i < message.messages.length; ++i)
					$root.user.AppBroadcastMessage.encode(
						message.messages[i],
						writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
					).ldelim();
			return writer;
		};

		/**
		 * Encodes the specified AppBroadcastMessagesResponse message, length delimited. Does not implicitly {@link user.AppBroadcastMessagesResponse.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof user.AppBroadcastMessagesResponse
		 * @static
		 * @param {user.IAppBroadcastMessagesResponse} message AppBroadcastMessagesResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		AppBroadcastMessagesResponse.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes an AppBroadcastMessagesResponse message from the specified reader or buffer.
		 * @function decode
		 * @memberof user.AppBroadcastMessagesResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {user.AppBroadcastMessagesResponse} AppBroadcastMessagesResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		AppBroadcastMessagesResponse.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.user.AppBroadcastMessagesResponse();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						if (!(message.messages && message.messages.length))
							message.messages = [];
						message.messages.push(
							$root.user.AppBroadcastMessage.decode(reader, reader.uint32())
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
		 * Decodes an AppBroadcastMessagesResponse message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof user.AppBroadcastMessagesResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {user.AppBroadcastMessagesResponse} AppBroadcastMessagesResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		AppBroadcastMessagesResponse.decodeDelimited = function decodeDelimited(
			reader
		) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies an AppBroadcastMessagesResponse message.
		 * @function verify
		 * @memberof user.AppBroadcastMessagesResponse
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		AppBroadcastMessagesResponse.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.messages !== null && message.hasOwnProperty("messages")) {
				if (!Array.isArray(message.messages)) return "messages: array expected";
				for (var i = 0; i < message.messages.length; ++i) {
					var error = $root.user.AppBroadcastMessage.verify(
						message.messages[i]
					);
					if (error) return "messages." + error;
				}
			}
			return null;
		};

		/**
		 * Creates an AppBroadcastMessagesResponse message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof user.AppBroadcastMessagesResponse
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {user.AppBroadcastMessagesResponse} AppBroadcastMessagesResponse
		 */
		AppBroadcastMessagesResponse.fromObject = function fromObject(object) {
			if (object instanceof $root.user.AppBroadcastMessagesResponse)
				return object;
			var message = new $root.user.AppBroadcastMessagesResponse();
			if (object.messages) {
				if (!Array.isArray(object.messages))
					throw TypeError(
						".user.AppBroadcastMessagesResponse.messages: array expected"
					);
				message.messages = [];
				for (var i = 0; i < object.messages.length; ++i) {
					if (typeof object.messages[i] !== "object")
						throw TypeError(
							".user.AppBroadcastMessagesResponse.messages: object expected"
						);
					message.messages[i] = $root.user.AppBroadcastMessage.fromObject(
						object.messages[i]
					);
				}
			}
			return message;
		};

		/**
		 * Creates a plain object from an AppBroadcastMessagesResponse message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof user.AppBroadcastMessagesResponse
		 * @static
		 * @param {user.AppBroadcastMessagesResponse} message AppBroadcastMessagesResponse
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		AppBroadcastMessagesResponse.toObject = function toObject(
			message,
			options
		) {
			if (!options) options = {};
			var object = {};
			if (options.arrays || options.defaults) object.messages = [];
			if (message.messages && message.messages.length) {
				object.messages = [];
				for (var j = 0; j < message.messages.length; ++j)
					object.messages[j] = $root.user.AppBroadcastMessage.toObject(
						message.messages[j],
						options
					);
			}
			return object;
		};

		/**
		 * Converts this AppBroadcastMessagesResponse to JSON.
		 * @function toJSON
		 * @memberof user.AppBroadcastMessagesResponse
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		AppBroadcastMessagesResponse.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return AppBroadcastMessagesResponse;
	})();

	user.AppBroadcastMessage = (function () {
		/**
		 * Properties of an AppBroadcastMessage.
		 * @memberof user
		 * @interface IAppBroadcastMessage
		 * @property {string|null} [message] AppBroadcastMessage message
		 * @property {number|Long|null} [startTime] AppBroadcastMessage startTime
		 * @property {number|Long|null} [endTime] AppBroadcastMessage endTime
		 */

		/**
		 * Constructs a new AppBroadcastMessage.
		 * @memberof user
		 * @classdesc Represents an AppBroadcastMessage.
		 * @implements IAppBroadcastMessage
		 * @constructor
		 * @param {user.IAppBroadcastMessage=} [properties] Properties to set
		 */
		function AppBroadcastMessage(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * AppBroadcastMessage message.
		 * @member {string} message
		 * @memberof user.AppBroadcastMessage
		 * @instance
		 */
		AppBroadcastMessage.prototype.message = "";

		/**
		 * AppBroadcastMessage startTime.
		 * @member {number|Long} startTime
		 * @memberof user.AppBroadcastMessage
		 * @instance
		 */
		AppBroadcastMessage.prototype.startTime = $util.Long
			? $util.Long.fromBits(0, 0, false)
			: 0;

		/**
		 * AppBroadcastMessage endTime.
		 * @member {number|Long} endTime
		 * @memberof user.AppBroadcastMessage
		 * @instance
		 */
		AppBroadcastMessage.prototype.endTime = $util.Long
			? $util.Long.fromBits(0, 0, false)
			: 0;

		/**
		 * Creates a new AppBroadcastMessage instance using the specified properties.
		 * @function create
		 * @memberof user.AppBroadcastMessage
		 * @static
		 * @param {user.IAppBroadcastMessage=} [properties] Properties to set
		 * @returns {user.AppBroadcastMessage} AppBroadcastMessage instance
		 */
		AppBroadcastMessage.create = function create(properties) {
			return new AppBroadcastMessage(properties);
		};

		/**
		 * Encodes the specified AppBroadcastMessage message. Does not implicitly {@link user.AppBroadcastMessage.verify|verify} messages.
		 * @function encode
		 * @memberof user.AppBroadcastMessage
		 * @static
		 * @param {user.IAppBroadcastMessage} message AppBroadcastMessage message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		AppBroadcastMessage.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.message !== null &&
				Object.hasOwnProperty.call(message, "message")
			)
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.message);
			if (
				message.startTime !== null &&
				Object.hasOwnProperty.call(message, "startTime")
			)
				writer.uint32(/* id 2, wireType 0 =*/ 16).int64(message.startTime);
			if (
				message.endTime !== null &&
				Object.hasOwnProperty.call(message, "endTime")
			)
				writer.uint32(/* id 3, wireType 0 =*/ 24).int64(message.endTime);
			return writer;
		};

		/**
		 * Encodes the specified AppBroadcastMessage message, length delimited. Does not implicitly {@link user.AppBroadcastMessage.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof user.AppBroadcastMessage
		 * @static
		 * @param {user.IAppBroadcastMessage} message AppBroadcastMessage message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		AppBroadcastMessage.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes an AppBroadcastMessage message from the specified reader or buffer.
		 * @function decode
		 * @memberof user.AppBroadcastMessage
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {user.AppBroadcastMessage} AppBroadcastMessage
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		AppBroadcastMessage.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.user.AppBroadcastMessage();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.message = reader.string();
						break;
					case 2:
						message.startTime = reader.int64();
						break;
					case 3:
						message.endTime = reader.int64();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes an AppBroadcastMessage message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof user.AppBroadcastMessage
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {user.AppBroadcastMessage} AppBroadcastMessage
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		AppBroadcastMessage.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies an AppBroadcastMessage message.
		 * @function verify
		 * @memberof user.AppBroadcastMessage
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		AppBroadcastMessage.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.message !== null && message.hasOwnProperty("message"))
				if (!$util.isString(message.message)) return "message: string expected";
			if (message.startTime !== null && message.hasOwnProperty("startTime"))
				if (
					!$util.isInteger(message.startTime) &&
					!(
						message.startTime &&
						$util.isInteger(message.startTime.low) &&
						$util.isInteger(message.startTime.high)
					)
				)
					return "startTime: integer|Long expected";
			if (message.endTime !== null && message.hasOwnProperty("endTime"))
				if (
					!$util.isInteger(message.endTime) &&
					!(
						message.endTime &&
						$util.isInteger(message.endTime.low) &&
						$util.isInteger(message.endTime.high)
					)
				)
					return "endTime: integer|Long expected";
			return null;
		};

		/**
		 * Creates an AppBroadcastMessage message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof user.AppBroadcastMessage
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {user.AppBroadcastMessage} AppBroadcastMessage
		 */
		AppBroadcastMessage.fromObject = function fromObject(object) {
			if (object instanceof $root.user.AppBroadcastMessage) return object;
			var message = new $root.user.AppBroadcastMessage();
			if (object.message !== null) message.message = String(object.message);
			if (object.startTime !== null)
				if ($util.Long)
					(message.startTime = $util.Long.fromValue(
						object.startTime
					)).unsigned = false;
				else if (typeof object.startTime === "string")
					message.startTime = parseInt(object.startTime, 10);
				else if (typeof object.startTime === "number")
					message.startTime = object.startTime;
				else if (typeof object.startTime === "object")
					message.startTime = new $util.LongBits(
						object.startTime.low >>> 0,
						object.startTime.high >>> 0
					).toNumber();
			if (object.endTime !== null)
				if ($util.Long)
					(message.endTime = $util.Long.fromValue(
						object.endTime
					)).unsigned = false;
				else if (typeof object.endTime === "string")
					message.endTime = parseInt(object.endTime, 10);
				else if (typeof object.endTime === "number")
					message.endTime = object.endTime;
				else if (typeof object.endTime === "object")
					message.endTime = new $util.LongBits(
						object.endTime.low >>> 0,
						object.endTime.high >>> 0
					).toNumber();
			return message;
		};

		/**
		 * Creates a plain object from an AppBroadcastMessage message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof user.AppBroadcastMessage
		 * @static
		 * @param {user.AppBroadcastMessage} message AppBroadcastMessage
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		AppBroadcastMessage.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.message = "";
				if ($util.Long) {
					var long = new $util.Long(0, 0, false);
					object.startTime =
						options.longs === String
							? long.toString()
							: options.longs === Number
							? long.toNumber()
							: long;
				} else object.startTime = options.longs === String ? "0" : 0;
				if ($util.Long) {
					var long = new $util.Long(0, 0, false);
					object.endTime =
						options.longs === String
							? long.toString()
							: options.longs === Number
							? long.toNumber()
							: long;
				} else object.endTime = options.longs === String ? "0" : 0;
			}
			if (message.message !== null && message.hasOwnProperty("message"))
				object.message = message.message;
			if (message.startTime !== null && message.hasOwnProperty("startTime"))
				if (typeof message.startTime === "number")
					object.startTime =
						options.longs === String
							? String(message.startTime)
							: message.startTime;
				else
					object.startTime =
						options.longs === String
							? $util.Long.prototype.toString.call(message.startTime)
							: options.longs === Number
							? new $util.LongBits(
									message.startTime.low >>> 0,
									message.startTime.high >>> 0
							  ).toNumber()
							: message.startTime;
			if (message.endTime !== null && message.hasOwnProperty("endTime"))
				if (typeof message.endTime === "number")
					object.endTime =
						options.longs === String
							? String(message.endTime)
							: message.endTime;
				else
					object.endTime =
						options.longs === String
							? $util.Long.prototype.toString.call(message.endTime)
							: options.longs === Number
							? new $util.LongBits(
									message.endTime.low >>> 0,
									message.endTime.high >>> 0
							  ).toNumber()
							: message.endTime;
			return object;
		};

		/**
		 * Converts this AppBroadcastMessage to JSON.
		 * @function toJSON
		 * @memberof user.AppBroadcastMessage
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		AppBroadcastMessage.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return AppBroadcastMessage;
	})();

	user.PostPaidUserCallsCheckResponse = (function () {
		/**
		 * Properties of a PostPaidUserCallsCheckResponse.
		 * @memberof user
		 * @interface IPostPaidUserCallsCheckResponse
		 * @property {number|null} [error] PostPaidUserCallsCheckResponse error
		 * @property {boolean|null} [isCallAllowed] PostPaidUserCallsCheckResponse isCallAllowed
		 */

		/**
		 * Constructs a new PostPaidUserCallsCheckResponse.
		 * @memberof user
		 * @classdesc Represents a PostPaidUserCallsCheckResponse.
		 * @implements IPostPaidUserCallsCheckResponse
		 * @constructor
		 * @param {user.IPostPaidUserCallsCheckResponse=} [properties] Properties to set
		 */
		function PostPaidUserCallsCheckResponse(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * PostPaidUserCallsCheckResponse error.
		 * @member {number} error
		 * @memberof user.PostPaidUserCallsCheckResponse
		 * @instance
		 */
		PostPaidUserCallsCheckResponse.prototype.error = 0;

		/**
		 * PostPaidUserCallsCheckResponse isCallAllowed.
		 * @member {boolean} isCallAllowed
		 * @memberof user.PostPaidUserCallsCheckResponse
		 * @instance
		 */
		PostPaidUserCallsCheckResponse.prototype.isCallAllowed = false;

		/**
		 * Creates a new PostPaidUserCallsCheckResponse instance using the specified properties.
		 * @function create
		 * @memberof user.PostPaidUserCallsCheckResponse
		 * @static
		 * @param {user.IPostPaidUserCallsCheckResponse=} [properties] Properties to set
		 * @returns {user.PostPaidUserCallsCheckResponse} PostPaidUserCallsCheckResponse instance
		 */
		PostPaidUserCallsCheckResponse.create = function create(properties) {
			return new PostPaidUserCallsCheckResponse(properties);
		};

		/**
		 * Encodes the specified PostPaidUserCallsCheckResponse message. Does not implicitly {@link user.PostPaidUserCallsCheckResponse.verify|verify} messages.
		 * @function encode
		 * @memberof user.PostPaidUserCallsCheckResponse
		 * @static
		 * @param {user.IPostPaidUserCallsCheckResponse} message PostPaidUserCallsCheckResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		PostPaidUserCallsCheckResponse.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.error !== null &&
				Object.hasOwnProperty.call(message, "error")
			)
				writer.uint32(/* id 1, wireType 0 =*/ 8).int32(message.error);
			if (
				message.isCallAllowed !== null &&
				Object.hasOwnProperty.call(message, "isCallAllowed")
			)
				writer.uint32(/* id 2, wireType 0 =*/ 16).bool(message.isCallAllowed);
			return writer;
		};

		/**
		 * Encodes the specified PostPaidUserCallsCheckResponse message, length delimited. Does not implicitly {@link user.PostPaidUserCallsCheckResponse.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof user.PostPaidUserCallsCheckResponse
		 * @static
		 * @param {user.IPostPaidUserCallsCheckResponse} message PostPaidUserCallsCheckResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		PostPaidUserCallsCheckResponse.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a PostPaidUserCallsCheckResponse message from the specified reader or buffer.
		 * @function decode
		 * @memberof user.PostPaidUserCallsCheckResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {user.PostPaidUserCallsCheckResponse} PostPaidUserCallsCheckResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		PostPaidUserCallsCheckResponse.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.user.PostPaidUserCallsCheckResponse();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.error = reader.int32();
						break;
					case 2:
						message.isCallAllowed = reader.bool();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a PostPaidUserCallsCheckResponse message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof user.PostPaidUserCallsCheckResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {user.PostPaidUserCallsCheckResponse} PostPaidUserCallsCheckResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		PostPaidUserCallsCheckResponse.decodeDelimited = function decodeDelimited(
			reader
		) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a PostPaidUserCallsCheckResponse message.
		 * @function verify
		 * @memberof user.PostPaidUserCallsCheckResponse
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		PostPaidUserCallsCheckResponse.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.error !== null && message.hasOwnProperty("error"))
				if (!$util.isInteger(message.error)) return "error: integer expected";
			if (
				message.isCallAllowed !== null &&
				message.hasOwnProperty("isCallAllowed")
			)
				if (typeof message.isCallAllowed !== "boolean")
					return "isCallAllowed: boolean expected";
			return null;
		};

		/**
		 * Creates a PostPaidUserCallsCheckResponse message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof user.PostPaidUserCallsCheckResponse
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {user.PostPaidUserCallsCheckResponse} PostPaidUserCallsCheckResponse
		 */
		PostPaidUserCallsCheckResponse.fromObject = function fromObject(object) {
			if (object instanceof $root.user.PostPaidUserCallsCheckResponse)
				return object;
			var message = new $root.user.PostPaidUserCallsCheckResponse();
			if (object.error !== null) message.error = object.error | 0;
			if (object.isCallAllowed !== null)
				message.isCallAllowed = Boolean(object.isCallAllowed);
			return message;
		};

		/**
		 * Creates a plain object from a PostPaidUserCallsCheckResponse message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof user.PostPaidUserCallsCheckResponse
		 * @static
		 * @param {user.PostPaidUserCallsCheckResponse} message PostPaidUserCallsCheckResponse
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		PostPaidUserCallsCheckResponse.toObject = function toObject(
			message,
			options
		) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.error = 0;
				object.isCallAllowed = false;
			}
			if (message.error !== null && message.hasOwnProperty("error"))
				object.error = message.error;
			if (
				message.isCallAllowed !== null &&
				message.hasOwnProperty("isCallAllowed")
			)
				object.isCallAllowed = message.isCallAllowed;
			return object;
		};

		/**
		 * Converts this PostPaidUserCallsCheckResponse to JSON.
		 * @function toJSON
		 * @memberof user.PostPaidUserCallsCheckResponse
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		PostPaidUserCallsCheckResponse.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return PostPaidUserCallsCheckResponse;
	})();

	user.VoipPushInput = (function () {
		/**
		 * Properties of a VoipPushInput.
		 * @memberof user
		 * @interface IVoipPushInput
		 * @property {string|null} [userId] VoipPushInput userId
		 * @property {string|null} [callerUserId] VoipPushInput callerUserId
		 * @property {string|null} [videoSessionId] VoipPushInput videoSessionId
		 * @property {boolean|null} [video] VoipPushInput video
		 * @property {string|null} [callAction] VoipPushInput callAction
		 * @property {number|null} [callStartTime] VoipPushInput callStartTime
		 * @property {number|Long|null} [callDuration] VoipPushInput callDuration
		 * @property {string|null} [callType] VoipPushInput callType
		 * @property {string|null} [calledNumber] VoipPushInput calledNumber
		 * @property {string|null} [dialledSatPhoneNumber] VoipPushInput dialledSatPhoneNumber
		 * @property {boolean|null} [isLocalContact] VoipPushInput isLocalContact
		 * @property {string|null} [data] VoipPushInput data
		 */

		/**
		 * Constructs a new VoipPushInput.
		 * @memberof user
		 * @classdesc Represents a VoipPushInput.
		 * @implements IVoipPushInput
		 * @constructor
		 * @param {user.IVoipPushInput=} [properties] Properties to set
		 */
		function VoipPushInput(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * VoipPushInput userId.
		 * @member {string} userId
		 * @memberof user.VoipPushInput
		 * @instance
		 */
		VoipPushInput.prototype.userId = "";

		/**
		 * VoipPushInput callerUserId.
		 * @member {string} callerUserId
		 * @memberof user.VoipPushInput
		 * @instance
		 */
		VoipPushInput.prototype.callerUserId = "";

		/**
		 * VoipPushInput videoSessionId.
		 * @member {string} videoSessionId
		 * @memberof user.VoipPushInput
		 * @instance
		 */
		VoipPushInput.prototype.videoSessionId = "";

		/**
		 * VoipPushInput video.
		 * @member {boolean} video
		 * @memberof user.VoipPushInput
		 * @instance
		 */
		VoipPushInput.prototype.video = false;

		/**
		 * VoipPushInput callAction.
		 * @member {string} callAction
		 * @memberof user.VoipPushInput
		 * @instance
		 */
		VoipPushInput.prototype.callAction = "";

		/**
		 * VoipPushInput callStartTime.
		 * @member {number} callStartTime
		 * @memberof user.VoipPushInput
		 * @instance
		 */
		VoipPushInput.prototype.callStartTime = 0;

		/**
		 * VoipPushInput callDuration.
		 * @member {number|Long} callDuration
		 * @memberof user.VoipPushInput
		 * @instance
		 */
		VoipPushInput.prototype.callDuration = $util.Long
			? $util.Long.fromBits(0, 0, false)
			: 0;

		/**
		 * VoipPushInput callType.
		 * @member {string} callType
		 * @memberof user.VoipPushInput
		 * @instance
		 */
		VoipPushInput.prototype.callType = "";

		/**
		 * VoipPushInput calledNumber.
		 * @member {string} calledNumber
		 * @memberof user.VoipPushInput
		 * @instance
		 */
		VoipPushInput.prototype.calledNumber = "";

		/**
		 * VoipPushInput dialledSatPhoneNumber.
		 * @member {string} dialledSatPhoneNumber
		 * @memberof user.VoipPushInput
		 * @instance
		 */
		VoipPushInput.prototype.dialledSatPhoneNumber = "";

		/**
		 * VoipPushInput isLocalContact.
		 * @member {boolean} isLocalContact
		 * @memberof user.VoipPushInput
		 * @instance
		 */
		VoipPushInput.prototype.isLocalContact = false;

		/**
		 * VoipPushInput data.
		 * @member {string} data
		 * @memberof user.VoipPushInput
		 * @instance
		 */
		VoipPushInput.prototype.data = "";

		/**
		 * Creates a new VoipPushInput instance using the specified properties.
		 * @function create
		 * @memberof user.VoipPushInput
		 * @static
		 * @param {user.IVoipPushInput=} [properties] Properties to set
		 * @returns {user.VoipPushInput} VoipPushInput instance
		 */
		VoipPushInput.create = function create(properties) {
			return new VoipPushInput(properties);
		};

		/**
		 * Encodes the specified VoipPushInput message. Does not implicitly {@link user.VoipPushInput.verify|verify} messages.
		 * @function encode
		 * @memberof user.VoipPushInput
		 * @static
		 * @param {user.IVoipPushInput} message VoipPushInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		VoipPushInput.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.userId !== null &&
				Object.hasOwnProperty.call(message, "userId")
			)
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.userId);
			if (
				message.callerUserId !== null &&
				Object.hasOwnProperty.call(message, "callerUserId")
			)
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.callerUserId);
			if (
				message.videoSessionId !== null &&
				Object.hasOwnProperty.call(message, "videoSessionId")
			)
				writer
					.uint32(/* id 3, wireType 2 =*/ 26)
					.string(message.videoSessionId);
			if (
				message.video !== null &&
				Object.hasOwnProperty.call(message, "video")
			)
				writer.uint32(/* id 4, wireType 0 =*/ 32).bool(message.video);
			if (
				message.callAction !== null &&
				Object.hasOwnProperty.call(message, "callAction")
			)
				writer.uint32(/* id 5, wireType 2 =*/ 42).string(message.callAction);
			if (
				message.callStartTime !== null &&
				Object.hasOwnProperty.call(message, "callStartTime")
			)
				writer.uint32(/* id 6, wireType 1 =*/ 49).double(message.callStartTime);
			if (
				message.callDuration !== null &&
				Object.hasOwnProperty.call(message, "callDuration")
			)
				writer.uint32(/* id 7, wireType 0 =*/ 56).int64(message.callDuration);
			if (
				message.callType !== null &&
				Object.hasOwnProperty.call(message, "callType")
			)
				writer.uint32(/* id 8, wireType 2 =*/ 66).string(message.callType);
			if (
				message.calledNumber !== null &&
				Object.hasOwnProperty.call(message, "calledNumber")
			)
				writer.uint32(/* id 9, wireType 2 =*/ 74).string(message.calledNumber);
			if (
				message.dialledSatPhoneNumber !== null &&
				Object.hasOwnProperty.call(message, "dialledSatPhoneNumber")
			)
				writer
					.uint32(/* id 10, wireType 2 =*/ 82)
					.string(message.dialledSatPhoneNumber);
			if (
				message.isLocalContact !== null &&
				Object.hasOwnProperty.call(message, "isLocalContact")
			)
				writer.uint32(/* id 11, wireType 0 =*/ 88).bool(message.isLocalContact);
			if (message.data !== null && Object.hasOwnProperty.call(message, "data"))
				writer.uint32(/* id 12, wireType 2 =*/ 98).string(message.data);
			return writer;
		};

		/**
		 * Encodes the specified VoipPushInput message, length delimited. Does not implicitly {@link user.VoipPushInput.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof user.VoipPushInput
		 * @static
		 * @param {user.IVoipPushInput} message VoipPushInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		VoipPushInput.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a VoipPushInput message from the specified reader or buffer.
		 * @function decode
		 * @memberof user.VoipPushInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {user.VoipPushInput} VoipPushInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		VoipPushInput.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.user.VoipPushInput();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.userId = reader.string();
						break;
					case 2:
						message.callerUserId = reader.string();
						break;
					case 3:
						message.videoSessionId = reader.string();
						break;
					case 4:
						message.video = reader.bool();
						break;
					case 5:
						message.callAction = reader.string();
						break;
					case 6:
						message.callStartTime = reader.double();
						break;
					case 7:
						message.callDuration = reader.int64();
						break;
					case 8:
						message.callType = reader.string();
						break;
					case 9:
						message.calledNumber = reader.string();
						break;
					case 10:
						message.dialledSatPhoneNumber = reader.string();
						break;
					case 11:
						message.isLocalContact = reader.bool();
						break;
					case 12:
						message.data = reader.string();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a VoipPushInput message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof user.VoipPushInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {user.VoipPushInput} VoipPushInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		VoipPushInput.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a VoipPushInput message.
		 * @function verify
		 * @memberof user.VoipPushInput
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		VoipPushInput.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.userId !== null && message.hasOwnProperty("userId"))
				if (!$util.isString(message.userId)) return "userId: string expected";
			if (
				message.callerUserId !== null &&
				message.hasOwnProperty("callerUserId")
			)
				if (!$util.isString(message.callerUserId))
					return "callerUserId: string expected";
			if (
				message.videoSessionId !== null &&
				message.hasOwnProperty("videoSessionId")
			)
				if (!$util.isString(message.videoSessionId))
					return "videoSessionId: string expected";
			if (message.video !== null && message.hasOwnProperty("video"))
				if (typeof message.video !== "boolean")
					return "video: boolean expected";
			if (message.callAction !== null && message.hasOwnProperty("callAction"))
				if (!$util.isString(message.callAction))
					return "callAction: string expected";
			if (
				message.callStartTime !== null &&
				message.hasOwnProperty("callStartTime")
			)
				if (typeof message.callStartTime !== "number")
					return "callStartTime: number expected";
			if (
				message.callDuration !== null &&
				message.hasOwnProperty("callDuration")
			)
				if (
					!$util.isInteger(message.callDuration) &&
					!(
						message.callDuration &&
						$util.isInteger(message.callDuration.low) &&
						$util.isInteger(message.callDuration.high)
					)
				)
					return "callDuration: integer|Long expected";
			if (message.callType !== null && message.hasOwnProperty("callType"))
				if (!$util.isString(message.callType))
					return "callType: string expected";
			if (
				message.calledNumber !== null &&
				message.hasOwnProperty("calledNumber")
			)
				if (!$util.isString(message.calledNumber))
					return "calledNumber: string expected";
			if (
				message.dialledSatPhoneNumber !== null &&
				message.hasOwnProperty("dialledSatPhoneNumber")
			)
				if (!$util.isString(message.dialledSatPhoneNumber))
					return "dialledSatPhoneNumber: string expected";
			if (
				message.isLocalContact !== null &&
				message.hasOwnProperty("isLocalContact")
			)
				if (typeof message.isLocalContact !== "boolean")
					return "isLocalContact: boolean expected";
			if (message.data !== null && message.hasOwnProperty("data"))
				if (!$util.isString(message.data)) return "data: string expected";
			return null;
		};

		/**
		 * Creates a VoipPushInput message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof user.VoipPushInput
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {user.VoipPushInput} VoipPushInput
		 */
		VoipPushInput.fromObject = function fromObject(object) {
			if (object instanceof $root.user.VoipPushInput) return object;
			var message = new $root.user.VoipPushInput();
			if (object.userId !== null) message.userId = String(object.userId);
			if (object.callerUserId !== null)
				message.callerUserId = String(object.callerUserId);
			if (object.videoSessionId !== null)
				message.videoSessionId = String(object.videoSessionId);
			if (object.video !== null) message.video = Boolean(object.video);
			if (object.callAction !== null)
				message.callAction = String(object.callAction);
			if (object.callStartTime !== null)
				message.callStartTime = Number(object.callStartTime);
			if (object.callDuration !== null)
				if ($util.Long)
					(message.callDuration = $util.Long.fromValue(
						object.callDuration
					)).unsigned = false;
				else if (typeof object.callDuration === "string")
					message.callDuration = parseInt(object.callDuration, 10);
				else if (typeof object.callDuration === "number")
					message.callDuration = object.callDuration;
				else if (typeof object.callDuration === "object")
					message.callDuration = new $util.LongBits(
						object.callDuration.low >>> 0,
						object.callDuration.high >>> 0
					).toNumber();
			if (object.callType !== null) message.callType = String(object.callType);
			if (object.calledNumber !== null)
				message.calledNumber = String(object.calledNumber);
			if (object.dialledSatPhoneNumber !== null)
				message.dialledSatPhoneNumber = String(object.dialledSatPhoneNumber);
			if (object.isLocalContact !== null)
				message.isLocalContact = Boolean(object.isLocalContact);
			if (object.data !== null) message.data = String(object.data);
			return message;
		};

		/**
		 * Creates a plain object from a VoipPushInput message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof user.VoipPushInput
		 * @static
		 * @param {user.VoipPushInput} message VoipPushInput
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		VoipPushInput.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.userId = "";
				object.callerUserId = "";
				object.videoSessionId = "";
				object.video = false;
				object.callAction = "";
				object.callStartTime = 0;
				if ($util.Long) {
					var long = new $util.Long(0, 0, false);
					object.callDuration =
						options.longs === String
							? long.toString()
							: options.longs === Number
							? long.toNumber()
							: long;
				} else object.callDuration = options.longs === String ? "0" : 0;
				object.callType = "";
				object.calledNumber = "";
				object.dialledSatPhoneNumber = "";
				object.isLocalContact = false;
				object.data = "";
			}
			if (message.userId !== null && message.hasOwnProperty("userId"))
				object.userId = message.userId;
			if (
				message.callerUserId !== null &&
				message.hasOwnProperty("callerUserId")
			)
				object.callerUserId = message.callerUserId;
			if (
				message.videoSessionId !== null &&
				message.hasOwnProperty("videoSessionId")
			)
				object.videoSessionId = message.videoSessionId;
			if (message.video !== null && message.hasOwnProperty("video"))
				object.video = message.video;
			if (message.callAction !== null && message.hasOwnProperty("callAction"))
				object.callAction = message.callAction;
			if (
				message.callStartTime !== null &&
				message.hasOwnProperty("callStartTime")
			)
				object.callStartTime =
					options.json && !isFinite(message.callStartTime)
						? String(message.callStartTime)
						: message.callStartTime;
			if (
				message.callDuration !== null &&
				message.hasOwnProperty("callDuration")
			)
				if (typeof message.callDuration === "number")
					object.callDuration =
						options.longs === String
							? String(message.callDuration)
							: message.callDuration;
				else
					object.callDuration =
						options.longs === String
							? $util.Long.prototype.toString.call(message.callDuration)
							: options.longs === Number
							? new $util.LongBits(
									message.callDuration.low >>> 0,
									message.callDuration.high >>> 0
							  ).toNumber()
							: message.callDuration;
			if (message.callType !== null && message.hasOwnProperty("callType"))
				object.callType = message.callType;
			if (
				message.calledNumber !== null &&
				message.hasOwnProperty("calledNumber")
			)
				object.calledNumber = message.calledNumber;
			if (
				message.dialledSatPhoneNumber !== null &&
				message.hasOwnProperty("dialledSatPhoneNumber")
			)
				object.dialledSatPhoneNumber = message.dialledSatPhoneNumber;
			if (
				message.isLocalContact !== null &&
				message.hasOwnProperty("isLocalContact")
			)
				object.isLocalContact = message.isLocalContact;
			if (message.data !== null && message.hasOwnProperty("data"))
				object.data = message.data;
			return object;
		};

		/**
		 * Converts this VoipPushInput to JSON.
		 * @function toJSON
		 * @memberof user.VoipPushInput
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		VoipPushInput.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return VoipPushInput;
	})();

	user.VoipPushResponse = (function () {
		/**
		 * Properties of a VoipPushResponse.
		 * @memberof user
		 * @interface IVoipPushResponse
		 * @property {boolean|null} [success] VoipPushResponse success
		 */

		/**
		 * Constructs a new VoipPushResponse.
		 * @memberof user
		 * @classdesc Represents a VoipPushResponse.
		 * @implements IVoipPushResponse
		 * @constructor
		 * @param {user.IVoipPushResponse=} [properties] Properties to set
		 */
		function VoipPushResponse(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * VoipPushResponse success.
		 * @member {boolean} success
		 * @memberof user.VoipPushResponse
		 * @instance
		 */
		VoipPushResponse.prototype.success = false;

		/**
		 * Creates a new VoipPushResponse instance using the specified properties.
		 * @function create
		 * @memberof user.VoipPushResponse
		 * @static
		 * @param {user.IVoipPushResponse=} [properties] Properties to set
		 * @returns {user.VoipPushResponse} VoipPushResponse instance
		 */
		VoipPushResponse.create = function create(properties) {
			return new VoipPushResponse(properties);
		};

		/**
		 * Encodes the specified VoipPushResponse message. Does not implicitly {@link user.VoipPushResponse.verify|verify} messages.
		 * @function encode
		 * @memberof user.VoipPushResponse
		 * @static
		 * @param {user.IVoipPushResponse} message VoipPushResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		VoipPushResponse.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.success !== null &&
				Object.hasOwnProperty.call(message, "success")
			)
				writer.uint32(/* id 1, wireType 0 =*/ 8).bool(message.success);
			return writer;
		};

		/**
		 * Encodes the specified VoipPushResponse message, length delimited. Does not implicitly {@link user.VoipPushResponse.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof user.VoipPushResponse
		 * @static
		 * @param {user.IVoipPushResponse} message VoipPushResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		VoipPushResponse.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a VoipPushResponse message from the specified reader or buffer.
		 * @function decode
		 * @memberof user.VoipPushResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {user.VoipPushResponse} VoipPushResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		VoipPushResponse.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.user.VoipPushResponse();
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
		 * Decodes a VoipPushResponse message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof user.VoipPushResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {user.VoipPushResponse} VoipPushResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		VoipPushResponse.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a VoipPushResponse message.
		 * @function verify
		 * @memberof user.VoipPushResponse
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		VoipPushResponse.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.success !== null && message.hasOwnProperty("success"))
				if (typeof message.success !== "boolean")
					return "success: boolean expected";
			return null;
		};

		/**
		 * Creates a VoipPushResponse message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof user.VoipPushResponse
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {user.VoipPushResponse} VoipPushResponse
		 */
		VoipPushResponse.fromObject = function fromObject(object) {
			if (object instanceof $root.user.VoipPushResponse) return object;
			var message = new $root.user.VoipPushResponse();
			if (object.success !== null) message.success = Boolean(object.success);
			return message;
		};

		/**
		 * Creates a plain object from a VoipPushResponse message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof user.VoipPushResponse
		 * @static
		 * @param {user.VoipPushResponse} message VoipPushResponse
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		VoipPushResponse.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) object.success = false;
			if (message.success !== null && message.hasOwnProperty("success"))
				object.success = message.success;
			return object;
		};

		/**
		 * Converts this VoipPushResponse to JSON.
		 * @function toJSON
		 * @memberof user.VoipPushResponse
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		VoipPushResponse.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return VoipPushResponse;
	})();

	user.LocalUserInput = (function () {
		/**
		 * Properties of a LocalUserInput.
		 * @memberof user
		 * @interface ILocalUserInput
		 * @property {string|null} [userId] LocalUserInput userId
		 * @property {string|null} [localUserId] LocalUserInput localUserId
		 */

		/**
		 * Constructs a new LocalUserInput.
		 * @memberof user
		 * @classdesc Represents a LocalUserInput.
		 * @implements ILocalUserInput
		 * @constructor
		 * @param {user.ILocalUserInput=} [properties] Properties to set
		 */
		function LocalUserInput(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * LocalUserInput userId.
		 * @member {string} userId
		 * @memberof user.LocalUserInput
		 * @instance
		 */
		LocalUserInput.prototype.userId = "";

		/**
		 * LocalUserInput localUserId.
		 * @member {string} localUserId
		 * @memberof user.LocalUserInput
		 * @instance
		 */
		LocalUserInput.prototype.localUserId = "";

		/**
		 * Creates a new LocalUserInput instance using the specified properties.
		 * @function create
		 * @memberof user.LocalUserInput
		 * @static
		 * @param {user.ILocalUserInput=} [properties] Properties to set
		 * @returns {user.LocalUserInput} LocalUserInput instance
		 */
		LocalUserInput.create = function create(properties) {
			return new LocalUserInput(properties);
		};

		/**
		 * Encodes the specified LocalUserInput message. Does not implicitly {@link user.LocalUserInput.verify|verify} messages.
		 * @function encode
		 * @memberof user.LocalUserInput
		 * @static
		 * @param {user.ILocalUserInput} message LocalUserInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		LocalUserInput.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.userId !== null &&
				Object.hasOwnProperty.call(message, "userId")
			)
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.userId);
			if (
				message.localUserId !== null &&
				Object.hasOwnProperty.call(message, "localUserId")
			)
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.localUserId);
			return writer;
		};

		/**
		 * Encodes the specified LocalUserInput message, length delimited. Does not implicitly {@link user.LocalUserInput.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof user.LocalUserInput
		 * @static
		 * @param {user.ILocalUserInput} message LocalUserInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		LocalUserInput.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a LocalUserInput message from the specified reader or buffer.
		 * @function decode
		 * @memberof user.LocalUserInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {user.LocalUserInput} LocalUserInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		LocalUserInput.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.user.LocalUserInput();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.userId = reader.string();
						break;
					case 2:
						message.localUserId = reader.string();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a LocalUserInput message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof user.LocalUserInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {user.LocalUserInput} LocalUserInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		LocalUserInput.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a LocalUserInput message.
		 * @function verify
		 * @memberof user.LocalUserInput
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		LocalUserInput.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.userId !== null && message.hasOwnProperty("userId"))
				if (!$util.isString(message.userId)) return "userId: string expected";
			if (message.localUserId !== null && message.hasOwnProperty("localUserId"))
				if (!$util.isString(message.localUserId))
					return "localUserId: string expected";
			return null;
		};

		/**
		 * Creates a LocalUserInput message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof user.LocalUserInput
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {user.LocalUserInput} LocalUserInput
		 */
		LocalUserInput.fromObject = function fromObject(object) {
			if (object instanceof $root.user.LocalUserInput) return object;
			var message = new $root.user.LocalUserInput();
			if (object.userId !== null) message.userId = String(object.userId);
			if (object.localUserId !== null)
				message.localUserId = String(object.localUserId);
			return message;
		};

		/**
		 * Creates a plain object from a LocalUserInput message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof user.LocalUserInput
		 * @static
		 * @param {user.LocalUserInput} message LocalUserInput
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		LocalUserInput.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.userId = "";
				object.localUserId = "";
			}
			if (message.userId !== null && message.hasOwnProperty("userId"))
				object.userId = message.userId;
			if (message.localUserId !== null && message.hasOwnProperty("localUserId"))
				object.localUserId = message.localUserId;
			return object;
		};

		/**
		 * Converts this LocalUserInput to JSON.
		 * @function toJSON
		 * @memberof user.LocalUserInput
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		LocalUserInput.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return LocalUserInput;
	})();

	return user;
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
