/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader,
	$Writer = $protobuf.Writer,
	$util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.auth = (function () {
	/**
	 * Namespace auth.
	 * @exports auth
	 * @namespace
	 */
	var auth = {};

	auth.AuthService = (function () {
		/**
		 * Constructs a new AuthService service.
		 * @memberof auth
		 * @classdesc Represents an AuthService
		 * @extends $protobuf.rpc.Service
		 * @constructor
		 * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
		 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
		 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
		 */
		function AuthService(rpcImpl, requestDelimited, responseDelimited) {
			$protobuf.rpc.Service.call(
				this,
				rpcImpl,
				requestDelimited,
				responseDelimited
			);
		}

		(AuthService.prototype = Object.create(
			$protobuf.rpc.Service.prototype
		)).constructor = AuthService;

		/**
		 * Creates new AuthService service using the specified rpc implementation.
		 * @function create
		 * @memberof auth.AuthService
		 * @static
		 * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
		 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
		 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
		 * @returns {AuthService} RPC service. Useful where requests and/or responses are streamed.
		 */
		AuthService.create = function create(
			rpcImpl,
			requestDelimited,
			responseDelimited
		) {
			return new this(rpcImpl, requestDelimited, responseDelimited);
		};

		/**
		 * Callback as used by {@link auth.AuthService#signup}.
		 * @memberof auth.AuthService
		 * @typedef SignupCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {auth.SignupResponse} [response] SignupResponse
		 */

		/**
		 * Calls Signup.
		 * @function signup
		 * @memberof auth.AuthService
		 * @instance
		 * @param {auth.ISignupUser} request SignupUser message or plain object
		 * @param {auth.AuthService.SignupCallback} callback Node-style callback called with the error, if any, and SignupResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(AuthService.prototype.signup = function signup(request, callback) {
				return this.rpcCall(
					signup,
					$root.auth.SignupUser,
					$root.auth.SignupResponse,
					request,
					callback
				);
			}),
			"name",
			{ value: "Signup" }
		);

		/**
		 * Calls Signup.
		 * @function signup
		 * @memberof auth.AuthService
		 * @instance
		 * @param {auth.ISignupUser} request SignupUser message or plain object
		 * @returns {Promise<auth.SignupResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link auth.AuthService#confirmSignup}.
		 * @memberof auth.AuthService
		 * @typedef ConfirmSignupCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {auth.SignupResponse} [response] SignupResponse
		 */

		/**
		 * Calls ConfirmSignup.
		 * @function confirmSignup
		 * @memberof auth.AuthService
		 * @instance
		 * @param {auth.ISignupUser} request SignupUser message or plain object
		 * @param {auth.AuthService.ConfirmSignupCallback} callback Node-style callback called with the error, if any, and SignupResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(AuthService.prototype.confirmSignup = function confirmSignup(
				request,
				callback
			) {
				return this.rpcCall(
					confirmSignup,
					$root.auth.SignupUser,
					$root.auth.SignupResponse,
					request,
					callback
				);
			}),
			"name",
			{ value: "ConfirmSignup" }
		);

		/**
		 * Calls ConfirmSignup.
		 * @function confirmSignup
		 * @memberof auth.AuthService
		 * @instance
		 * @param {auth.ISignupUser} request SignupUser message or plain object
		 * @returns {Promise<auth.SignupResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link auth.AuthService#resendSignupConfirmCode}.
		 * @memberof auth.AuthService
		 * @typedef ResendSignupConfirmCodeCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {auth.SignupResponse} [response] SignupResponse
		 */

		/**
		 * Calls ResendSignupConfirmCode.
		 * @function resendSignupConfirmCode
		 * @memberof auth.AuthService
		 * @instance
		 * @param {auth.ISignupUser} request SignupUser message or plain object
		 * @param {auth.AuthService.ResendSignupConfirmCodeCallback} callback Node-style callback called with the error, if any, and SignupResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(AuthService.prototype.resendSignupConfirmCode =
				function resendSignupConfirmCode(request, callback) {
					return this.rpcCall(
						resendSignupConfirmCode,
						$root.auth.SignupUser,
						$root.auth.SignupResponse,
						request,
						callback
					);
				}),
			"name",
			{ value: "ResendSignupConfirmCode" }
		);

		/**
		 * Calls ResendSignupConfirmCode.
		 * @function resendSignupConfirmCode
		 * @memberof auth.AuthService
		 * @instance
		 * @param {auth.ISignupUser} request SignupUser message or plain object
		 * @returns {Promise<auth.SignupResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link auth.AuthService#resetPassword}.
		 * @memberof auth.AuthService
		 * @typedef ResetPasswordCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {auth.SignupResponse} [response] SignupResponse
		 */

		/**
		 * Calls ResetPassword.
		 * @function resetPassword
		 * @memberof auth.AuthService
		 * @instance
		 * @param {auth.ISignupUser} request SignupUser message or plain object
		 * @param {auth.AuthService.ResetPasswordCallback} callback Node-style callback called with the error, if any, and SignupResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(AuthService.prototype.resetPassword = function resetPassword(
				request,
				callback
			) {
				return this.rpcCall(
					resetPassword,
					$root.auth.SignupUser,
					$root.auth.SignupResponse,
					request,
					callback
				);
			}),
			"name",
			{ value: "ResetPassword" }
		);

		/**
		 * Calls ResetPassword.
		 * @function resetPassword
		 * @memberof auth.AuthService
		 * @instance
		 * @param {auth.ISignupUser} request SignupUser message or plain object
		 * @returns {Promise<auth.SignupResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link auth.AuthService#confirmPasswordReset}.
		 * @memberof auth.AuthService
		 * @typedef ConfirmPasswordResetCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {auth.SignupResponse} [response] SignupResponse
		 */

		/**
		 * Calls ConfirmPasswordReset.
		 * @function confirmPasswordReset
		 * @memberof auth.AuthService
		 * @instance
		 * @param {auth.ISignupUser} request SignupUser message or plain object
		 * @param {auth.AuthService.ConfirmPasswordResetCallback} callback Node-style callback called with the error, if any, and SignupResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(AuthService.prototype.confirmPasswordReset =
				function confirmPasswordReset(request, callback) {
					return this.rpcCall(
						confirmPasswordReset,
						$root.auth.SignupUser,
						$root.auth.SignupResponse,
						request,
						callback
					);
				}),
			"name",
			{ value: "ConfirmPasswordReset" }
		);

		/**
		 * Calls ConfirmPasswordReset.
		 * @function confirmPasswordReset
		 * @memberof auth.AuthService
		 * @instance
		 * @param {auth.ISignupUser} request SignupUser message or plain object
		 * @returns {Promise<auth.SignupResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link auth.AuthService#changePassword}.
		 * @memberof auth.AuthService
		 * @typedef ChangePasswordCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {auth.SignupResponse} [response] SignupResponse
		 */

		/**
		 * Calls ChangePassword.
		 * @function changePassword
		 * @memberof auth.AuthService
		 * @instance
		 * @param {auth.ISignupUser} request SignupUser message or plain object
		 * @param {auth.AuthService.ChangePasswordCallback} callback Node-style callback called with the error, if any, and SignupResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(AuthService.prototype.changePassword = function changePassword(
				request,
				callback
			) {
				return this.rpcCall(
					changePassword,
					$root.auth.SignupUser,
					$root.auth.SignupResponse,
					request,
					callback
				);
			}),
			"name",
			{ value: "ChangePassword" }
		);

		/**
		 * Calls ChangePassword.
		 * @function changePassword
		 * @memberof auth.AuthService
		 * @instance
		 * @param {auth.ISignupUser} request SignupUser message or plain object
		 * @returns {Promise<auth.SignupResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link auth.AuthService#deleteUser}.
		 * @memberof auth.AuthService
		 * @typedef DeleteUserCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {auth.SignupResponse} [response] SignupResponse
		 */

		/**
		 * Calls DeleteUser.
		 * @function deleteUser
		 * @memberof auth.AuthService
		 * @instance
		 * @param {auth.ISignupUser} request SignupUser message or plain object
		 * @param {auth.AuthService.DeleteUserCallback} callback Node-style callback called with the error, if any, and SignupResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(AuthService.prototype.deleteUser = function deleteUser(
				request,
				callback
			) {
				return this.rpcCall(
					deleteUser,
					$root.auth.SignupUser,
					$root.auth.SignupResponse,
					request,
					callback
				);
			}),
			"name",
			{ value: "DeleteUser" }
		);

		/**
		 * Calls DeleteUser.
		 * @function deleteUser
		 * @memberof auth.AuthService
		 * @instance
		 * @param {auth.ISignupUser} request SignupUser message or plain object
		 * @returns {Promise<auth.SignupResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link auth.AuthService#frontmSignin}.
		 * @memberof auth.AuthService
		 * @typedef FrontmSigninCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {auth.SigninResponse} [response] SigninResponse
		 */

		/**
		 * Calls FrontmSignin.
		 * @function frontmSignin
		 * @memberof auth.AuthService
		 * @instance
		 * @param {auth.IFrontmSigninInput} request FrontmSigninInput message or plain object
		 * @param {auth.AuthService.FrontmSigninCallback} callback Node-style callback called with the error, if any, and SigninResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(AuthService.prototype.frontmSignin = function frontmSignin(
				request,
				callback
			) {
				return this.rpcCall(
					frontmSignin,
					$root.auth.FrontmSigninInput,
					$root.auth.SigninResponse,
					request,
					callback
				);
			}),
			"name",
			{ value: "FrontmSignin" }
		);

		/**
		 * Calls FrontmSignin.
		 * @function frontmSignin
		 * @memberof auth.AuthService
		 * @instance
		 * @param {auth.IFrontmSigninInput} request FrontmSigninInput message or plain object
		 * @returns {Promise<auth.SigninResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link auth.AuthService#googleSignin}.
		 * @memberof auth.AuthService
		 * @typedef GoogleSigninCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {auth.SigninResponse} [response] SigninResponse
		 */

		/**
		 * Calls GoogleSignin.
		 * @function googleSignin
		 * @memberof auth.AuthService
		 * @instance
		 * @param {auth.IGoogleSigninInput} request GoogleSigninInput message or plain object
		 * @param {auth.AuthService.GoogleSigninCallback} callback Node-style callback called with the error, if any, and SigninResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(AuthService.prototype.googleSignin = function googleSignin(
				request,
				callback
			) {
				return this.rpcCall(
					googleSignin,
					$root.auth.GoogleSigninInput,
					$root.auth.SigninResponse,
					request,
					callback
				);
			}),
			"name",
			{ value: "GoogleSignin" }
		);

		/**
		 * Calls GoogleSignin.
		 * @function googleSignin
		 * @memberof auth.AuthService
		 * @instance
		 * @param {auth.IGoogleSigninInput} request GoogleSigninInput message or plain object
		 * @returns {Promise<auth.SigninResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link auth.AuthService#appleSignin}.
		 * @memberof auth.AuthService
		 * @typedef AppleSigninCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {auth.SigninResponse} [response] SigninResponse
		 */

		/**
		 * Calls AppleSignin.
		 * @function appleSignin
		 * @memberof auth.AuthService
		 * @instance
		 * @param {auth.IAppleSigninInput} request AppleSigninInput message or plain object
		 * @param {auth.AuthService.AppleSigninCallback} callback Node-style callback called with the error, if any, and SigninResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(AuthService.prototype.appleSignin = function appleSignin(
				request,
				callback
			) {
				return this.rpcCall(
					appleSignin,
					$root.auth.AppleSigninInput,
					$root.auth.SigninResponse,
					request,
					callback
				);
			}),
			"name",
			{ value: "AppleSignin" }
		);

		/**
		 * Calls AppleSignin.
		 * @function appleSignin
		 * @memberof auth.AuthService
		 * @instance
		 * @param {auth.IAppleSigninInput} request AppleSigninInput message or plain object
		 * @returns {Promise<auth.SigninResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link auth.AuthService#facebookSignin}.
		 * @memberof auth.AuthService
		 * @typedef FacebookSigninCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {auth.SigninResponse} [response] SigninResponse
		 */

		/**
		 * Calls FacebookSignin.
		 * @function facebookSignin
		 * @memberof auth.AuthService
		 * @instance
		 * @param {auth.IFacebookSigninInput} request FacebookSigninInput message or plain object
		 * @param {auth.AuthService.FacebookSigninCallback} callback Node-style callback called with the error, if any, and SigninResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(AuthService.prototype.facebookSignin = function facebookSignin(
				request,
				callback
			) {
				return this.rpcCall(
					facebookSignin,
					$root.auth.FacebookSigninInput,
					$root.auth.SigninResponse,
					request,
					callback
				);
			}),
			"name",
			{ value: "FacebookSignin" }
		);

		/**
		 * Calls FacebookSignin.
		 * @function facebookSignin
		 * @memberof auth.AuthService
		 * @instance
		 * @param {auth.IFacebookSigninInput} request FacebookSigninInput message or plain object
		 * @returns {Promise<auth.SigninResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link auth.AuthService#createAnonymousAccess}.
		 * @memberof auth.AuthService
		 * @typedef CreateAnonymousAccessCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {auth.SigninResponse} [response] SigninResponse
		 */

		/**
		 * Calls CreateAnonymousAccess.
		 * @function createAnonymousAccess
		 * @memberof auth.AuthService
		 * @instance
		 * @param {auth.IAnonAccessInput} request AnonAccessInput message or plain object
		 * @param {auth.AuthService.CreateAnonymousAccessCallback} callback Node-style callback called with the error, if any, and SigninResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(AuthService.prototype.createAnonymousAccess =
				function createAnonymousAccess(request, callback) {
					return this.rpcCall(
						createAnonymousAccess,
						$root.auth.AnonAccessInput,
						$root.auth.SigninResponse,
						request,
						callback
					);
				}),
			"name",
			{ value: "CreateAnonymousAccess" }
		);

		/**
		 * Calls CreateAnonymousAccess.
		 * @function createAnonymousAccess
		 * @memberof auth.AuthService
		 * @instance
		 * @param {auth.IAnonAccessInput} request AnonAccessInput message or plain object
		 * @returns {Promise<auth.SigninResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link auth.AuthService#refreshAnonymousUserSession}.
		 * @memberof auth.AuthService
		 * @typedef RefreshAnonymousUserSessionCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {auth.SignupResponse} [response] SignupResponse
		 */

		/**
		 * Calls RefreshAnonymousUserSession.
		 * @function refreshAnonymousUserSession
		 * @memberof auth.AuthService
		 * @instance
		 * @param {auth.IAnonAccessInput} request AnonAccessInput message or plain object
		 * @param {auth.AuthService.RefreshAnonymousUserSessionCallback} callback Node-style callback called with the error, if any, and SignupResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(AuthService.prototype.refreshAnonymousUserSession =
				function refreshAnonymousUserSession(request, callback) {
					return this.rpcCall(
						refreshAnonymousUserSession,
						$root.auth.AnonAccessInput,
						$root.auth.SignupResponse,
						request,
						callback
					);
				}),
			"name",
			{ value: "RefreshAnonymousUserSession" }
		);

		/**
		 * Calls RefreshAnonymousUserSession.
		 * @function refreshAnonymousUserSession
		 * @memberof auth.AuthService
		 * @instance
		 * @param {auth.IAnonAccessInput} request AnonAccessInput message or plain object
		 * @returns {Promise<auth.SignupResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link auth.AuthService#resetUserActivity}.
		 * @memberof auth.AuthService
		 * @typedef ResetUserActivityCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {auth.SignupResponse} [response] SignupResponse
		 */

		/**
		 * Calls ResetUserActivity.
		 * @function resetUserActivity
		 * @memberof auth.AuthService
		 * @instance
		 * @param {auth.IUserActivityInput} request UserActivityInput message or plain object
		 * @param {auth.AuthService.ResetUserActivityCallback} callback Node-style callback called with the error, if any, and SignupResponse
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(AuthService.prototype.resetUserActivity = function resetUserActivity(
				request,
				callback
			) {
				return this.rpcCall(
					resetUserActivity,
					$root.auth.UserActivityInput,
					$root.auth.SignupResponse,
					request,
					callback
				);
			}),
			"name",
			{ value: "ResetUserActivity" }
		);

		/**
		 * Calls ResetUserActivity.
		 * @function resetUserActivity
		 * @memberof auth.AuthService
		 * @instance
		 * @param {auth.IUserActivityInput} request UserActivityInput message or plain object
		 * @returns {Promise<auth.SignupResponse>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link auth.AuthService#initiateSoftwareMfa}.
		 * @memberof auth.AuthService
		 * @typedef InitiateSoftwareMfaCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {auth.MFAOutput} [response] MFAOutput
		 */

		/**
		 * Calls InitiateSoftwareMfa.
		 * @function initiateSoftwareMfa
		 * @memberof auth.AuthService
		 * @instance
		 * @param {auth.IMFAInput} request MFAInput message or plain object
		 * @param {auth.AuthService.InitiateSoftwareMfaCallback} callback Node-style callback called with the error, if any, and MFAOutput
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(AuthService.prototype.initiateSoftwareMfa = function initiateSoftwareMfa(
				request,
				callback
			) {
				return this.rpcCall(
					initiateSoftwareMfa,
					$root.auth.MFAInput,
					$root.auth.MFAOutput,
					request,
					callback
				);
			}),
			"name",
			{ value: "InitiateSoftwareMfa" }
		);

		/**
		 * Calls InitiateSoftwareMfa.
		 * @function initiateSoftwareMfa
		 * @memberof auth.AuthService
		 * @instance
		 * @param {auth.IMFAInput} request MFAInput message or plain object
		 * @returns {Promise<auth.MFAOutput>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link auth.AuthService#activateSoftwareMfa}.
		 * @memberof auth.AuthService
		 * @typedef ActivateSoftwareMfaCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {auth.MFAOutput} [response] MFAOutput
		 */

		/**
		 * Calls ActivateSoftwareMfa.
		 * @function activateSoftwareMfa
		 * @memberof auth.AuthService
		 * @instance
		 * @param {auth.IMFAInput} request MFAInput message or plain object
		 * @param {auth.AuthService.ActivateSoftwareMfaCallback} callback Node-style callback called with the error, if any, and MFAOutput
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(AuthService.prototype.activateSoftwareMfa = function activateSoftwareMfa(
				request,
				callback
			) {
				return this.rpcCall(
					activateSoftwareMfa,
					$root.auth.MFAInput,
					$root.auth.MFAOutput,
					request,
					callback
				);
			}),
			"name",
			{ value: "ActivateSoftwareMfa" }
		);

		/**
		 * Calls ActivateSoftwareMfa.
		 * @function activateSoftwareMfa
		 * @memberof auth.AuthService
		 * @instance
		 * @param {auth.IMFAInput} request MFAInput message or plain object
		 * @returns {Promise<auth.MFAOutput>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link auth.AuthService#deactivateSoftwareMfa}.
		 * @memberof auth.AuthService
		 * @typedef DeactivateSoftwareMfaCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {auth.MFAOutput} [response] MFAOutput
		 */

		/**
		 * Calls DeactivateSoftwareMfa.
		 * @function deactivateSoftwareMfa
		 * @memberof auth.AuthService
		 * @instance
		 * @param {auth.IMFAInput} request MFAInput message or plain object
		 * @param {auth.AuthService.DeactivateSoftwareMfaCallback} callback Node-style callback called with the error, if any, and MFAOutput
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(AuthService.prototype.deactivateSoftwareMfa =
				function deactivateSoftwareMfa(request, callback) {
					return this.rpcCall(
						deactivateSoftwareMfa,
						$root.auth.MFAInput,
						$root.auth.MFAOutput,
						request,
						callback
					);
				}),
			"name",
			{ value: "DeactivateSoftwareMfa" }
		);

		/**
		 * Calls DeactivateSoftwareMfa.
		 * @function deactivateSoftwareMfa
		 * @memberof auth.AuthService
		 * @instance
		 * @param {auth.IMFAInput} request MFAInput message or plain object
		 * @returns {Promise<auth.MFAOutput>} Promise
		 * @variation 2
		 */

		/**
		 * Callback as used by {@link auth.AuthService#changeSoftwareMfa}.
		 * @memberof auth.AuthService
		 * @typedef ChangeSoftwareMfaCallback
		 * @type {function}
		 * @param {Error|null} error Error, if any
		 * @param {auth.MFAOutput} [response] MFAOutput
		 */

		/**
		 * Calls ChangeSoftwareMfa.
		 * @function changeSoftwareMfa
		 * @memberof auth.AuthService
		 * @instance
		 * @param {auth.IMFAInput} request MFAInput message or plain object
		 * @param {auth.AuthService.ChangeSoftwareMfaCallback} callback Node-style callback called with the error, if any, and MFAOutput
		 * @returns {undefined}
		 * @variation 1
		 */
		Object.defineProperty(
			(AuthService.prototype.changeSoftwareMfa = function changeSoftwareMfa(
				request,
				callback
			) {
				return this.rpcCall(
					changeSoftwareMfa,
					$root.auth.MFAInput,
					$root.auth.MFAOutput,
					request,
					callback
				);
			}),
			"name",
			{ value: "ChangeSoftwareMfa" }
		);

		/**
		 * Calls ChangeSoftwareMfa.
		 * @function changeSoftwareMfa
		 * @memberof auth.AuthService
		 * @instance
		 * @param {auth.IMFAInput} request MFAInput message or plain object
		 * @returns {Promise<auth.MFAOutput>} Promise
		 * @variation 2
		 */

		return AuthService;
	})();

	auth.SignupUser = (function () {
		/**
		 * Properties of a SignupUser.
		 * @memberof auth
		 * @interface ISignupUser
		 * @property {string|null} [email] SignupUser email
		 * @property {string|null} [userName] SignupUser userName
		 * @property {string|null} [password] SignupUser password
		 * @property {string|null} [confirmCode] SignupUser confirmCode
		 * @property {string|null} [oldPassword] SignupUser oldPassword
		 * @property {string|null} [newPassword] SignupUser newPassword
		 * @property {string|null} [verificationCode] SignupUser verificationCode
		 * @property {string|null} [appType] SignupUser appType
		 */

		/**
		 * Constructs a new SignupUser.
		 * @memberof auth
		 * @classdesc Represents a SignupUser.
		 * @implements ISignupUser
		 * @constructor
		 * @param {auth.ISignupUser=} [properties] Properties to set
		 */
		function SignupUser(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * SignupUser email.
		 * @member {string} email
		 * @memberof auth.SignupUser
		 * @instance
		 */
		SignupUser.prototype.email = "";

		/**
		 * SignupUser userName.
		 * @member {string} userName
		 * @memberof auth.SignupUser
		 * @instance
		 */
		SignupUser.prototype.userName = "";

		/**
		 * SignupUser password.
		 * @member {string} password
		 * @memberof auth.SignupUser
		 * @instance
		 */
		SignupUser.prototype.password = "";

		/**
		 * SignupUser confirmCode.
		 * @member {string} confirmCode
		 * @memberof auth.SignupUser
		 * @instance
		 */
		SignupUser.prototype.confirmCode = "";

		/**
		 * SignupUser oldPassword.
		 * @member {string} oldPassword
		 * @memberof auth.SignupUser
		 * @instance
		 */
		SignupUser.prototype.oldPassword = "";

		/**
		 * SignupUser newPassword.
		 * @member {string} newPassword
		 * @memberof auth.SignupUser
		 * @instance
		 */
		SignupUser.prototype.newPassword = "";

		/**
		 * SignupUser verificationCode.
		 * @member {string} verificationCode
		 * @memberof auth.SignupUser
		 * @instance
		 */
		SignupUser.prototype.verificationCode = "";

		/**
		 * SignupUser appType.
		 * @member {string} appType
		 * @memberof auth.SignupUser
		 * @instance
		 */
		SignupUser.prototype.appType = "";

		/**
		 * Creates a new SignupUser instance using the specified properties.
		 * @function create
		 * @memberof auth.SignupUser
		 * @static
		 * @param {auth.ISignupUser=} [properties] Properties to set
		 * @returns {auth.SignupUser} SignupUser instance
		 */
		SignupUser.create = function create(properties) {
			return new SignupUser(properties);
		};

		/**
		 * Encodes the specified SignupUser message. Does not implicitly {@link auth.SignupUser.verify|verify} messages.
		 * @function encode
		 * @memberof auth.SignupUser
		 * @static
		 * @param {auth.ISignupUser} message SignupUser message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		SignupUser.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.email !== null &&
				Object.hasOwnProperty.call(message, "email")
			)
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.email);
			if (
				message.userName !== null &&
				Object.hasOwnProperty.call(message, "userName")
			)
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.userName);
			if (
				message.password !== null &&
				Object.hasOwnProperty.call(message, "password")
			)
				writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.password);
			if (
				message.confirmCode !== null &&
				Object.hasOwnProperty.call(message, "confirmCode")
			)
				writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.confirmCode);
			if (
				message.oldPassword !== null &&
				Object.hasOwnProperty.call(message, "oldPassword")
			)
				writer.uint32(/* id 5, wireType 2 =*/ 42).string(message.oldPassword);
			if (
				message.newPassword !== null &&
				Object.hasOwnProperty.call(message, "newPassword")
			)
				writer.uint32(/* id 6, wireType 2 =*/ 50).string(message.newPassword);
			if (
				message.verificationCode !== null &&
				Object.hasOwnProperty.call(message, "verificationCode")
			)
				writer
					.uint32(/* id 7, wireType 2 =*/ 58)
					.string(message.verificationCode);
			if (
				message.appType !== null &&
				Object.hasOwnProperty.call(message, "appType")
			)
				writer.uint32(/* id 8, wireType 2 =*/ 66).string(message.appType);
			return writer;
		};

		/**
		 * Encodes the specified SignupUser message, length delimited. Does not implicitly {@link auth.SignupUser.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof auth.SignupUser
		 * @static
		 * @param {auth.ISignupUser} message SignupUser message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		SignupUser.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a SignupUser message from the specified reader or buffer.
		 * @function decode
		 * @memberof auth.SignupUser
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {auth.SignupUser} SignupUser
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		SignupUser.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.auth.SignupUser();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.email = reader.string();
						break;
					case 2:
						message.userName = reader.string();
						break;
					case 3:
						message.password = reader.string();
						break;
					case 4:
						message.confirmCode = reader.string();
						break;
					case 5:
						message.oldPassword = reader.string();
						break;
					case 6:
						message.newPassword = reader.string();
						break;
					case 7:
						message.verificationCode = reader.string();
						break;
					case 8:
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
		 * Decodes a SignupUser message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof auth.SignupUser
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {auth.SignupUser} SignupUser
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		SignupUser.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a SignupUser message.
		 * @function verify
		 * @memberof auth.SignupUser
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		SignupUser.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.email !== null && message.hasOwnProperty("email"))
				if (!$util.isString(message.email)) return "email: string expected";
			if (message.userName !== null && message.hasOwnProperty("userName"))
				if (!$util.isString(message.userName))
					return "userName: string expected";
			if (message.password !== null && message.hasOwnProperty("password"))
				if (!$util.isString(message.password))
					return "password: string expected";
			if (message.confirmCode !== null && message.hasOwnProperty("confirmCode"))
				if (!$util.isString(message.confirmCode))
					return "confirmCode: string expected";
			if (message.oldPassword !== null && message.hasOwnProperty("oldPassword"))
				if (!$util.isString(message.oldPassword))
					return "oldPassword: string expected";
			if (message.newPassword !== null && message.hasOwnProperty("newPassword"))
				if (!$util.isString(message.newPassword))
					return "newPassword: string expected";
			if (
				message.verificationCode !== null &&
				message.hasOwnProperty("verificationCode")
			)
				if (!$util.isString(message.verificationCode))
					return "verificationCode: string expected";
			if (message.appType !== null && message.hasOwnProperty("appType"))
				if (!$util.isString(message.appType)) return "appType: string expected";
			return null;
		};

		/**
		 * Creates a SignupUser message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof auth.SignupUser
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {auth.SignupUser} SignupUser
		 */
		SignupUser.fromObject = function fromObject(object) {
			if (object instanceof $root.auth.SignupUser) return object;
			var message = new $root.auth.SignupUser();
			if (object.email !== null) message.email = String(object.email);
			if (object.userName !== null) message.userName = String(object.userName);
			if (object.password !== null) message.password = String(object.password);
			if (object.confirmCode !== null)
				message.confirmCode = String(object.confirmCode);
			if (object.oldPassword !== null)
				message.oldPassword = String(object.oldPassword);
			if (object.newPassword !== null)
				message.newPassword = String(object.newPassword);
			if (object.verificationCode !== null)
				message.verificationCode = String(object.verificationCode);
			if (object.appType !== null) message.appType = String(object.appType);
			return message;
		};

		/**
		 * Creates a plain object from a SignupUser message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof auth.SignupUser
		 * @static
		 * @param {auth.SignupUser} message SignupUser
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		SignupUser.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.email = "";
				object.userName = "";
				object.password = "";
				object.confirmCode = "";
				object.oldPassword = "";
				object.newPassword = "";
				object.verificationCode = "";
				object.appType = "";
			}
			if (message.email !== null && message.hasOwnProperty("email"))
				object.email = message.email;
			if (message.userName !== null && message.hasOwnProperty("userName"))
				object.userName = message.userName;
			if (message.password !== null && message.hasOwnProperty("password"))
				object.password = message.password;
			if (message.confirmCode !== null && message.hasOwnProperty("confirmCode"))
				object.confirmCode = message.confirmCode;
			if (message.oldPassword !== null && message.hasOwnProperty("oldPassword"))
				object.oldPassword = message.oldPassword;
			if (message.newPassword !== null && message.hasOwnProperty("newPassword"))
				object.newPassword = message.newPassword;
			if (
				message.verificationCode !== null &&
				message.hasOwnProperty("verificationCode")
			)
				object.verificationCode = message.verificationCode;
			if (message.appType !== null && message.hasOwnProperty("appType"))
				object.appType = message.appType;
			return object;
		};

		/**
		 * Converts this SignupUser to JSON.
		 * @function toJSON
		 * @memberof auth.SignupUser
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		SignupUser.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return SignupUser;
	})();

	auth.SignupResponse = (function () {
		/**
		 * Properties of a SignupResponse.
		 * @memberof auth
		 * @interface ISignupResponse
		 * @property {boolean|null} [success] SignupResponse success
		 * @property {string|null} [data] SignupResponse data
		 * @property {string|null} [message] SignupResponse message
		 * @property {string|null} [errorCode] SignupResponse errorCode
		 */

		/**
		 * Constructs a new SignupResponse.
		 * @memberof auth
		 * @classdesc Represents a SignupResponse.
		 * @implements ISignupResponse
		 * @constructor
		 * @param {auth.ISignupResponse=} [properties] Properties to set
		 */
		function SignupResponse(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * SignupResponse success.
		 * @member {boolean} success
		 * @memberof auth.SignupResponse
		 * @instance
		 */
		SignupResponse.prototype.success = false;

		/**
		 * SignupResponse data.
		 * @member {string} data
		 * @memberof auth.SignupResponse
		 * @instance
		 */
		SignupResponse.prototype.data = "";

		/**
		 * SignupResponse message.
		 * @member {string} message
		 * @memberof auth.SignupResponse
		 * @instance
		 */
		SignupResponse.prototype.message = "";

		/**
		 * SignupResponse errorCode.
		 * @member {string} errorCode
		 * @memberof auth.SignupResponse
		 * @instance
		 */
		SignupResponse.prototype.errorCode = "";

		/**
		 * Creates a new SignupResponse instance using the specified properties.
		 * @function create
		 * @memberof auth.SignupResponse
		 * @static
		 * @param {auth.ISignupResponse=} [properties] Properties to set
		 * @returns {auth.SignupResponse} SignupResponse instance
		 */
		SignupResponse.create = function create(properties) {
			return new SignupResponse(properties);
		};

		/**
		 * Encodes the specified SignupResponse message. Does not implicitly {@link auth.SignupResponse.verify|verify} messages.
		 * @function encode
		 * @memberof auth.SignupResponse
		 * @static
		 * @param {auth.ISignupResponse} message SignupResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		SignupResponse.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.success !== null &&
				Object.hasOwnProperty.call(message, "success")
			)
				writer.uint32(/* id 1, wireType 0 =*/ 8).bool(message.success);
			if (message.data !== null && Object.hasOwnProperty.call(message, "data"))
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.data);
			if (
				message.message !== null &&
				Object.hasOwnProperty.call(message, "message")
			)
				writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.message);
			if (
				message.errorCode !== null &&
				Object.hasOwnProperty.call(message, "errorCode")
			)
				writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.errorCode);
			return writer;
		};

		/**
		 * Encodes the specified SignupResponse message, length delimited. Does not implicitly {@link auth.SignupResponse.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof auth.SignupResponse
		 * @static
		 * @param {auth.ISignupResponse} message SignupResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		SignupResponse.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a SignupResponse message from the specified reader or buffer.
		 * @function decode
		 * @memberof auth.SignupResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {auth.SignupResponse} SignupResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		SignupResponse.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.auth.SignupResponse();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.success = reader.bool();
						break;
					case 2:
						message.data = reader.string();
						break;
					case 3:
						message.message = reader.string();
						break;
					case 4:
						message.errorCode = reader.string();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a SignupResponse message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof auth.SignupResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {auth.SignupResponse} SignupResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		SignupResponse.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a SignupResponse message.
		 * @function verify
		 * @memberof auth.SignupResponse
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		SignupResponse.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.success !== null && message.hasOwnProperty("success"))
				if (typeof message.success !== "boolean")
					return "success: boolean expected";
			if (message.data !== null && message.hasOwnProperty("data"))
				if (!$util.isString(message.data)) return "data: string expected";
			if (message.message !== null && message.hasOwnProperty("message"))
				if (!$util.isString(message.message)) return "message: string expected";
			if (message.errorCode !== null && message.hasOwnProperty("errorCode"))
				if (!$util.isString(message.errorCode))
					return "errorCode: string expected";
			return null;
		};

		/**
		 * Creates a SignupResponse message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof auth.SignupResponse
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {auth.SignupResponse} SignupResponse
		 */
		SignupResponse.fromObject = function fromObject(object) {
			if (object instanceof $root.auth.SignupResponse) return object;
			var message = new $root.auth.SignupResponse();
			if (object.success !== null) message.success = Boolean(object.success);
			if (object.data !== null) message.data = String(object.data);
			if (object.message !== null) message.message = String(object.message);
			if (object.errorCode !== null)
				message.errorCode = String(object.errorCode);
			return message;
		};

		/**
		 * Creates a plain object from a SignupResponse message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof auth.SignupResponse
		 * @static
		 * @param {auth.SignupResponse} message SignupResponse
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		SignupResponse.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.success = false;
				object.data = "";
				object.message = "";
				object.errorCode = "";
			}
			if (message.success !== null && message.hasOwnProperty("success"))
				object.success = message.success;
			if (message.data !== null && message.hasOwnProperty("data"))
				object.data = message.data;
			if (message.message !== null && message.hasOwnProperty("message"))
				object.message = message.message;
			if (message.errorCode !== null && message.hasOwnProperty("errorCode"))
				object.errorCode = message.errorCode;
			return object;
		};

		/**
		 * Converts this SignupResponse to JSON.
		 * @function toJSON
		 * @memberof auth.SignupResponse
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		SignupResponse.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return SignupResponse;
	})();

	auth.FrontmSigninInput = (function () {
		/**
		 * Properties of a FrontmSigninInput.
		 * @memberof auth
		 * @interface IFrontmSigninInput
		 * @property {string|null} [email] FrontmSigninInput email
		 * @property {string|null} [password] FrontmSigninInput password
		 * @property {string|null} [platform] FrontmSigninInput platform
		 * @property {string|null} [appType] FrontmSigninInput appType
		 * @property {string|null} [otpToken] FrontmSigninInput otpToken
		 */

		/**
		 * Constructs a new FrontmSigninInput.
		 * @memberof auth
		 * @classdesc Represents a FrontmSigninInput.
		 * @implements IFrontmSigninInput
		 * @constructor
		 * @param {auth.IFrontmSigninInput=} [properties] Properties to set
		 */
		function FrontmSigninInput(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * FrontmSigninInput email.
		 * @member {string} email
		 * @memberof auth.FrontmSigninInput
		 * @instance
		 */
		FrontmSigninInput.prototype.email = "";

		/**
		 * FrontmSigninInput password.
		 * @member {string} password
		 * @memberof auth.FrontmSigninInput
		 * @instance
		 */
		FrontmSigninInput.prototype.password = "";

		/**
		 * FrontmSigninInput platform.
		 * @member {string} platform
		 * @memberof auth.FrontmSigninInput
		 * @instance
		 */
		FrontmSigninInput.prototype.platform = "";

		/**
		 * FrontmSigninInput appType.
		 * @member {string} appType
		 * @memberof auth.FrontmSigninInput
		 * @instance
		 */
		FrontmSigninInput.prototype.appType = "";

		/**
		 * FrontmSigninInput otpToken.
		 * @member {string} otpToken
		 * @memberof auth.FrontmSigninInput
		 * @instance
		 */
		FrontmSigninInput.prototype.otpToken = "";

		/**
		 * Creates a new FrontmSigninInput instance using the specified properties.
		 * @function create
		 * @memberof auth.FrontmSigninInput
		 * @static
		 * @param {auth.IFrontmSigninInput=} [properties] Properties to set
		 * @returns {auth.FrontmSigninInput} FrontmSigninInput instance
		 */
		FrontmSigninInput.create = function create(properties) {
			return new FrontmSigninInput(properties);
		};

		/**
		 * Encodes the specified FrontmSigninInput message. Does not implicitly {@link auth.FrontmSigninInput.verify|verify} messages.
		 * @function encode
		 * @memberof auth.FrontmSigninInput
		 * @static
		 * @param {auth.IFrontmSigninInput} message FrontmSigninInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		FrontmSigninInput.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.email !== null &&
				Object.hasOwnProperty.call(message, "email")
			)
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.email);
			if (
				message.password !== null &&
				Object.hasOwnProperty.call(message, "password")
			)
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.password);
			if (
				message.platform !== null &&
				Object.hasOwnProperty.call(message, "platform")
			)
				writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.platform);
			if (
				message.appType !== null &&
				Object.hasOwnProperty.call(message, "appType")
			)
				writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.appType);
			if (
				message.otpToken !== null &&
				Object.hasOwnProperty.call(message, "otpToken")
			)
				writer.uint32(/* id 5, wireType 2 =*/ 42).string(message.otpToken);
			return writer;
		};

		/**
		 * Encodes the specified FrontmSigninInput message, length delimited. Does not implicitly {@link auth.FrontmSigninInput.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof auth.FrontmSigninInput
		 * @static
		 * @param {auth.IFrontmSigninInput} message FrontmSigninInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		FrontmSigninInput.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a FrontmSigninInput message from the specified reader or buffer.
		 * @function decode
		 * @memberof auth.FrontmSigninInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {auth.FrontmSigninInput} FrontmSigninInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		FrontmSigninInput.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.auth.FrontmSigninInput();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.email = reader.string();
						break;
					case 2:
						message.password = reader.string();
						break;
					case 3:
						message.platform = reader.string();
						break;
					case 4:
						message.appType = reader.string();
						break;
					case 5:
						message.otpToken = reader.string();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a FrontmSigninInput message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof auth.FrontmSigninInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {auth.FrontmSigninInput} FrontmSigninInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		FrontmSigninInput.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a FrontmSigninInput message.
		 * @function verify
		 * @memberof auth.FrontmSigninInput
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		FrontmSigninInput.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.email !== null && message.hasOwnProperty("email"))
				if (!$util.isString(message.email)) return "email: string expected";
			if (message.password !== null && message.hasOwnProperty("password"))
				if (!$util.isString(message.password))
					return "password: string expected";
			if (message.platform !== null && message.hasOwnProperty("platform"))
				if (!$util.isString(message.platform))
					return "platform: string expected";
			if (message.appType !== null && message.hasOwnProperty("appType"))
				if (!$util.isString(message.appType)) return "appType: string expected";
			if (message.otpToken !== null && message.hasOwnProperty("otpToken"))
				if (!$util.isString(message.otpToken))
					return "otpToken: string expected";
			return null;
		};

		/**
		 * Creates a FrontmSigninInput message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof auth.FrontmSigninInput
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {auth.FrontmSigninInput} FrontmSigninInput
		 */
		FrontmSigninInput.fromObject = function fromObject(object) {
			if (object instanceof $root.auth.FrontmSigninInput) return object;
			var message = new $root.auth.FrontmSigninInput();
			if (object.email !== null) message.email = String(object.email);
			if (object.password !== null) message.password = String(object.password);
			if (object.platform !== null) message.platform = String(object.platform);
			if (object.appType !== null) message.appType = String(object.appType);
			if (object.otpToken !== null) message.otpToken = String(object.otpToken);
			return message;
		};

		/**
		 * Creates a plain object from a FrontmSigninInput message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof auth.FrontmSigninInput
		 * @static
		 * @param {auth.FrontmSigninInput} message FrontmSigninInput
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		FrontmSigninInput.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.email = "";
				object.password = "";
				object.platform = "";
				object.appType = "";
				object.otpToken = "";
			}
			if (message.email !== null && message.hasOwnProperty("email"))
				object.email = message.email;
			if (message.password !== null && message.hasOwnProperty("password"))
				object.password = message.password;
			if (message.platform !== null && message.hasOwnProperty("platform"))
				object.platform = message.platform;
			if (message.appType !== null && message.hasOwnProperty("appType"))
				object.appType = message.appType;
			if (message.otpToken !== null && message.hasOwnProperty("otpToken"))
				object.otpToken = message.otpToken;
			return object;
		};

		/**
		 * Converts this FrontmSigninInput to JSON.
		 * @function toJSON
		 * @memberof auth.FrontmSigninInput
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		FrontmSigninInput.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return FrontmSigninInput;
	})();

	auth.GoogleSigninInput = (function () {
		/**
		 * Properties of a GoogleSigninInput.
		 * @memberof auth
		 * @interface IGoogleSigninInput
		 * @property {string|null} [code] GoogleSigninInput code
		 * @property {string|null} [platform] GoogleSigninInput platform
		 * @property {string|null} [idToken] GoogleSigninInput idToken
		 * @property {string|null} [refreshToken] GoogleSigninInput refreshToken
		 * @property {string|null} [appType] GoogleSigninInput appType
		 */

		/**
		 * Constructs a new GoogleSigninInput.
		 * @memberof auth
		 * @classdesc Represents a GoogleSigninInput.
		 * @implements IGoogleSigninInput
		 * @constructor
		 * @param {auth.IGoogleSigninInput=} [properties] Properties to set
		 */
		function GoogleSigninInput(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * GoogleSigninInput code.
		 * @member {string} code
		 * @memberof auth.GoogleSigninInput
		 * @instance
		 */
		GoogleSigninInput.prototype.code = "";

		/**
		 * GoogleSigninInput platform.
		 * @member {string} platform
		 * @memberof auth.GoogleSigninInput
		 * @instance
		 */
		GoogleSigninInput.prototype.platform = "";

		/**
		 * GoogleSigninInput idToken.
		 * @member {string} idToken
		 * @memberof auth.GoogleSigninInput
		 * @instance
		 */
		GoogleSigninInput.prototype.idToken = "";

		/**
		 * GoogleSigninInput refreshToken.
		 * @member {string} refreshToken
		 * @memberof auth.GoogleSigninInput
		 * @instance
		 */
		GoogleSigninInput.prototype.refreshToken = "";

		/**
		 * GoogleSigninInput appType.
		 * @member {string} appType
		 * @memberof auth.GoogleSigninInput
		 * @instance
		 */
		GoogleSigninInput.prototype.appType = "";

		/**
		 * Creates a new GoogleSigninInput instance using the specified properties.
		 * @function create
		 * @memberof auth.GoogleSigninInput
		 * @static
		 * @param {auth.IGoogleSigninInput=} [properties] Properties to set
		 * @returns {auth.GoogleSigninInput} GoogleSigninInput instance
		 */
		GoogleSigninInput.create = function create(properties) {
			return new GoogleSigninInput(properties);
		};

		/**
		 * Encodes the specified GoogleSigninInput message. Does not implicitly {@link auth.GoogleSigninInput.verify|verify} messages.
		 * @function encode
		 * @memberof auth.GoogleSigninInput
		 * @static
		 * @param {auth.IGoogleSigninInput} message GoogleSigninInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		GoogleSigninInput.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (message.code !== null && Object.hasOwnProperty.call(message, "code"))
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.code);
			if (
				message.platform !== null &&
				Object.hasOwnProperty.call(message, "platform")
			)
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.platform);
			if (
				message.idToken !== null &&
				Object.hasOwnProperty.call(message, "idToken")
			)
				writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.idToken);
			if (
				message.refreshToken !== null &&
				Object.hasOwnProperty.call(message, "refreshToken")
			)
				writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.refreshToken);
			if (
				message.appType !== null &&
				Object.hasOwnProperty.call(message, "appType")
			)
				writer.uint32(/* id 5, wireType 2 =*/ 42).string(message.appType);
			return writer;
		};

		/**
		 * Encodes the specified GoogleSigninInput message, length delimited. Does not implicitly {@link auth.GoogleSigninInput.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof auth.GoogleSigninInput
		 * @static
		 * @param {auth.IGoogleSigninInput} message GoogleSigninInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		GoogleSigninInput.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a GoogleSigninInput message from the specified reader or buffer.
		 * @function decode
		 * @memberof auth.GoogleSigninInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {auth.GoogleSigninInput} GoogleSigninInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		GoogleSigninInput.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.auth.GoogleSigninInput();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.code = reader.string();
						break;
					case 2:
						message.platform = reader.string();
						break;
					case 3:
						message.idToken = reader.string();
						break;
					case 4:
						message.refreshToken = reader.string();
						break;
					case 5:
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
		 * Decodes a GoogleSigninInput message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof auth.GoogleSigninInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {auth.GoogleSigninInput} GoogleSigninInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		GoogleSigninInput.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a GoogleSigninInput message.
		 * @function verify
		 * @memberof auth.GoogleSigninInput
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		GoogleSigninInput.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.code !== null && message.hasOwnProperty("code"))
				if (!$util.isString(message.code)) return "code: string expected";
			if (message.platform !== null && message.hasOwnProperty("platform"))
				if (!$util.isString(message.platform))
					return "platform: string expected";
			if (message.idToken !== null && message.hasOwnProperty("idToken"))
				if (!$util.isString(message.idToken)) return "idToken: string expected";
			if (
				message.refreshToken !== null &&
				message.hasOwnProperty("refreshToken")
			)
				if (!$util.isString(message.refreshToken))
					return "refreshToken: string expected";
			if (message.appType !== null && message.hasOwnProperty("appType"))
				if (!$util.isString(message.appType)) return "appType: string expected";
			return null;
		};

		/**
		 * Creates a GoogleSigninInput message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof auth.GoogleSigninInput
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {auth.GoogleSigninInput} GoogleSigninInput
		 */
		GoogleSigninInput.fromObject = function fromObject(object) {
			if (object instanceof $root.auth.GoogleSigninInput) return object;
			var message = new $root.auth.GoogleSigninInput();
			if (object.code !== null) message.code = String(object.code);
			if (object.platform !== null) message.platform = String(object.platform);
			if (object.idToken !== null) message.idToken = String(object.idToken);
			if (object.refreshToken !== null)
				message.refreshToken = String(object.refreshToken);
			if (object.appType !== null) message.appType = String(object.appType);
			return message;
		};

		/**
		 * Creates a plain object from a GoogleSigninInput message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof auth.GoogleSigninInput
		 * @static
		 * @param {auth.GoogleSigninInput} message GoogleSigninInput
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		GoogleSigninInput.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.code = "";
				object.platform = "";
				object.idToken = "";
				object.refreshToken = "";
				object.appType = "";
			}
			if (message.code !== null && message.hasOwnProperty("code"))
				object.code = message.code;
			if (message.platform !== null && message.hasOwnProperty("platform"))
				object.platform = message.platform;
			if (message.idToken !== null && message.hasOwnProperty("idToken"))
				object.idToken = message.idToken;
			if (
				message.refreshToken !== null &&
				message.hasOwnProperty("refreshToken")
			)
				object.refreshToken = message.refreshToken;
			if (message.appType !== null && message.hasOwnProperty("appType"))
				object.appType = message.appType;
			return object;
		};

		/**
		 * Converts this GoogleSigninInput to JSON.
		 * @function toJSON
		 * @memberof auth.GoogleSigninInput
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		GoogleSigninInput.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return GoogleSigninInput;
	})();

	auth.AppleSigninInput = (function () {
		/**
		 * Properties of an AppleSigninInput.
		 * @memberof auth
		 * @interface IAppleSigninInput
		 * @property {string|null} [userName] AppleSigninInput userName
		 * @property {string|null} [code] AppleSigninInput code
		 * @property {string|null} [appType] AppleSigninInput appType
		 * @property {string|null} [platform] AppleSigninInput platform
		 */

		/**
		 * Constructs a new AppleSigninInput.
		 * @memberof auth
		 * @classdesc Represents an AppleSigninInput.
		 * @implements IAppleSigninInput
		 * @constructor
		 * @param {auth.IAppleSigninInput=} [properties] Properties to set
		 */
		function AppleSigninInput(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * AppleSigninInput userName.
		 * @member {string} userName
		 * @memberof auth.AppleSigninInput
		 * @instance
		 */
		AppleSigninInput.prototype.userName = "";

		/**
		 * AppleSigninInput code.
		 * @member {string} code
		 * @memberof auth.AppleSigninInput
		 * @instance
		 */
		AppleSigninInput.prototype.code = "";

		/**
		 * AppleSigninInput appType.
		 * @member {string} appType
		 * @memberof auth.AppleSigninInput
		 * @instance
		 */
		AppleSigninInput.prototype.appType = "";

		/**
		 * AppleSigninInput platform.
		 * @member {string} platform
		 * @memberof auth.AppleSigninInput
		 * @instance
		 */
		AppleSigninInput.prototype.platform = "";

		/**
		 * Creates a new AppleSigninInput instance using the specified properties.
		 * @function create
		 * @memberof auth.AppleSigninInput
		 * @static
		 * @param {auth.IAppleSigninInput=} [properties] Properties to set
		 * @returns {auth.AppleSigninInput} AppleSigninInput instance
		 */
		AppleSigninInput.create = function create(properties) {
			return new AppleSigninInput(properties);
		};

		/**
		 * Encodes the specified AppleSigninInput message. Does not implicitly {@link auth.AppleSigninInput.verify|verify} messages.
		 * @function encode
		 * @memberof auth.AppleSigninInput
		 * @static
		 * @param {auth.IAppleSigninInput} message AppleSigninInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		AppleSigninInput.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.userName !== null &&
				Object.hasOwnProperty.call(message, "userName")
			)
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.userName);
			if (message.code !== null && Object.hasOwnProperty.call(message, "code"))
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.code);
			if (
				message.appType !== null &&
				Object.hasOwnProperty.call(message, "appType")
			)
				writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.appType);
			if (
				message.platform !== null &&
				Object.hasOwnProperty.call(message, "platform")
			)
				writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.platform);
			return writer;
		};

		/**
		 * Encodes the specified AppleSigninInput message, length delimited. Does not implicitly {@link auth.AppleSigninInput.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof auth.AppleSigninInput
		 * @static
		 * @param {auth.IAppleSigninInput} message AppleSigninInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		AppleSigninInput.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes an AppleSigninInput message from the specified reader or buffer.
		 * @function decode
		 * @memberof auth.AppleSigninInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {auth.AppleSigninInput} AppleSigninInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		AppleSigninInput.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.auth.AppleSigninInput();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.userName = reader.string();
						break;
					case 2:
						message.code = reader.string();
						break;
					case 3:
						message.appType = reader.string();
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
		 * Decodes an AppleSigninInput message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof auth.AppleSigninInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {auth.AppleSigninInput} AppleSigninInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		AppleSigninInput.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies an AppleSigninInput message.
		 * @function verify
		 * @memberof auth.AppleSigninInput
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		AppleSigninInput.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.userName !== null && message.hasOwnProperty("userName"))
				if (!$util.isString(message.userName))
					return "userName: string expected";
			if (message.code !== null && message.hasOwnProperty("code"))
				if (!$util.isString(message.code)) return "code: string expected";
			if (message.appType !== null && message.hasOwnProperty("appType"))
				if (!$util.isString(message.appType)) return "appType: string expected";
			if (message.platform !== null && message.hasOwnProperty("platform"))
				if (!$util.isString(message.platform))
					return "platform: string expected";
			return null;
		};

		/**
		 * Creates an AppleSigninInput message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof auth.AppleSigninInput
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {auth.AppleSigninInput} AppleSigninInput
		 */
		AppleSigninInput.fromObject = function fromObject(object) {
			if (object instanceof $root.auth.AppleSigninInput) return object;
			var message = new $root.auth.AppleSigninInput();
			if (object.userName !== null) message.userName = String(object.userName);
			if (object.code !== null) message.code = String(object.code);
			if (object.appType !== null) message.appType = String(object.appType);
			if (object.platform !== null) message.platform = String(object.platform);
			return message;
		};

		/**
		 * Creates a plain object from an AppleSigninInput message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof auth.AppleSigninInput
		 * @static
		 * @param {auth.AppleSigninInput} message AppleSigninInput
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		AppleSigninInput.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.userName = "";
				object.code = "";
				object.appType = "";
				object.platform = "";
			}
			if (message.userName !== null && message.hasOwnProperty("userName"))
				object.userName = message.userName;
			if (message.code !== null && message.hasOwnProperty("code"))
				object.code = message.code;
			if (message.appType !== null && message.hasOwnProperty("appType"))
				object.appType = message.appType;
			if (message.platform !== null && message.hasOwnProperty("platform"))
				object.platform = message.platform;
			return object;
		};

		/**
		 * Converts this AppleSigninInput to JSON.
		 * @function toJSON
		 * @memberof auth.AppleSigninInput
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		AppleSigninInput.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return AppleSigninInput;
	})();

	auth.SigninResponse = (function () {
		/**
		 * Properties of a SigninResponse.
		 * @memberof auth
		 * @interface ISigninResponse
		 * @property {boolean|null} [success] SigninResponse success
		 * @property {string|null} [message] SigninResponse message
		 * @property {string|null} [sessionId] SigninResponse sessionId
		 * @property {auth.ISignInUser|null} [user] SigninResponse user
		 * @property {boolean|null} [newUser] SigninResponse newUser
		 * @property {string|null} [errorCode] SigninResponse errorCode
		 */

		/**
		 * Constructs a new SigninResponse.
		 * @memberof auth
		 * @classdesc Represents a SigninResponse.
		 * @implements ISigninResponse
		 * @constructor
		 * @param {auth.ISigninResponse=} [properties] Properties to set
		 */
		function SigninResponse(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * SigninResponse success.
		 * @member {boolean} success
		 * @memberof auth.SigninResponse
		 * @instance
		 */
		SigninResponse.prototype.success = false;

		/**
		 * SigninResponse message.
		 * @member {string} message
		 * @memberof auth.SigninResponse
		 * @instance
		 */
		SigninResponse.prototype.message = "";

		/**
		 * SigninResponse sessionId.
		 * @member {string} sessionId
		 * @memberof auth.SigninResponse
		 * @instance
		 */
		SigninResponse.prototype.sessionId = "";

		/**
		 * SigninResponse user.
		 * @member {auth.ISignInUser|null|undefined} user
		 * @memberof auth.SigninResponse
		 * @instance
		 */
		SigninResponse.prototype.user = null;

		/**
		 * SigninResponse newUser.
		 * @member {boolean} newUser
		 * @memberof auth.SigninResponse
		 * @instance
		 */
		SigninResponse.prototype.newUser = false;

		/**
		 * SigninResponse errorCode.
		 * @member {string} errorCode
		 * @memberof auth.SigninResponse
		 * @instance
		 */
		SigninResponse.prototype.errorCode = "";

		/**
		 * Creates a new SigninResponse instance using the specified properties.
		 * @function create
		 * @memberof auth.SigninResponse
		 * @static
		 * @param {auth.ISigninResponse=} [properties] Properties to set
		 * @returns {auth.SigninResponse} SigninResponse instance
		 */
		SigninResponse.create = function create(properties) {
			return new SigninResponse(properties);
		};

		/**
		 * Encodes the specified SigninResponse message. Does not implicitly {@link auth.SigninResponse.verify|verify} messages.
		 * @function encode
		 * @memberof auth.SigninResponse
		 * @static
		 * @param {auth.ISigninResponse} message SigninResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		SigninResponse.encode = function encode(message, writer) {
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
			if (
				message.sessionId !== null &&
				Object.hasOwnProperty.call(message, "sessionId")
			)
				writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.sessionId);
			if (message.user !== null && Object.hasOwnProperty.call(message, "user"))
				$root.auth.SignInUser.encode(
					message.user,
					writer.uint32(/* id 4, wireType 2 =*/ 34).fork()
				).ldelim();
			if (
				message.newUser !== null &&
				Object.hasOwnProperty.call(message, "newUser")
			)
				writer.uint32(/* id 5, wireType 0 =*/ 40).bool(message.newUser);
			if (
				message.errorCode !== null &&
				Object.hasOwnProperty.call(message, "errorCode")
			)
				writer.uint32(/* id 6, wireType 2 =*/ 50).string(message.errorCode);
			return writer;
		};

		/**
		 * Encodes the specified SigninResponse message, length delimited. Does not implicitly {@link auth.SigninResponse.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof auth.SigninResponse
		 * @static
		 * @param {auth.ISigninResponse} message SigninResponse message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		SigninResponse.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a SigninResponse message from the specified reader or buffer.
		 * @function decode
		 * @memberof auth.SigninResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {auth.SigninResponse} SigninResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		SigninResponse.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.auth.SigninResponse();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.success = reader.bool();
						break;
					case 2:
						message.message = reader.string();
						break;
					case 3:
						message.sessionId = reader.string();
						break;
					case 4:
						message.user = $root.auth.SignInUser.decode(
							reader,
							reader.uint32()
						);
						break;
					case 5:
						message.newUser = reader.bool();
						break;
					case 6:
						message.errorCode = reader.string();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a SigninResponse message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof auth.SigninResponse
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {auth.SigninResponse} SigninResponse
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		SigninResponse.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a SigninResponse message.
		 * @function verify
		 * @memberof auth.SigninResponse
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		SigninResponse.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.success !== null && message.hasOwnProperty("success"))
				if (typeof message.success !== "boolean")
					return "success: boolean expected";
			if (message.message !== null && message.hasOwnProperty("message"))
				if (!$util.isString(message.message)) return "message: string expected";
			if (message.sessionId !== null && message.hasOwnProperty("sessionId"))
				if (!$util.isString(message.sessionId))
					return "sessionId: string expected";
			if (message.user !== null && message.hasOwnProperty("user")) {
				var error = $root.auth.SignInUser.verify(message.user);
				if (error) return "user." + error;
			}
			if (message.newUser !== null && message.hasOwnProperty("newUser"))
				if (typeof message.newUser !== "boolean")
					return "newUser: boolean expected";
			if (message.errorCode !== null && message.hasOwnProperty("errorCode"))
				if (!$util.isString(message.errorCode))
					return "errorCode: string expected";
			return null;
		};

		/**
		 * Creates a SigninResponse message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof auth.SigninResponse
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {auth.SigninResponse} SigninResponse
		 */
		SigninResponse.fromObject = function fromObject(object) {
			if (object instanceof $root.auth.SigninResponse) return object;
			var message = new $root.auth.SigninResponse();
			if (object.success !== null) message.success = Boolean(object.success);
			if (object.message !== null) message.message = String(object.message);
			if (object.sessionId !== null)
				message.sessionId = String(object.sessionId);
			if (object.user !== null) {
				if (typeof object.user !== "object")
					throw TypeError(".auth.SigninResponse.user: object expected");
				message.user = $root.auth.SignInUser.fromObject(object.user);
			}
			if (object.newUser !== null) message.newUser = Boolean(object.newUser);
			if (object.errorCode !== null)
				message.errorCode = String(object.errorCode);
			return message;
		};

		/**
		 * Creates a plain object from a SigninResponse message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof auth.SigninResponse
		 * @static
		 * @param {auth.SigninResponse} message SigninResponse
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		SigninResponse.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.success = false;
				object.message = "";
				object.sessionId = "";
				object.user = null;
				object.newUser = false;
				object.errorCode = "";
			}
			if (message.success !== null && message.hasOwnProperty("success"))
				object.success = message.success;
			if (message.message !== null && message.hasOwnProperty("message"))
				object.message = message.message;
			if (message.sessionId !== null && message.hasOwnProperty("sessionId"))
				object.sessionId = message.sessionId;
			if (message.user !== null && message.hasOwnProperty("user"))
				object.user = $root.auth.SignInUser.toObject(message.user, options);
			if (message.newUser !== null && message.hasOwnProperty("newUser"))
				object.newUser = message.newUser;
			if (message.errorCode !== null && message.hasOwnProperty("errorCode"))
				object.errorCode = message.errorCode;
			return object;
		};

		/**
		 * Converts this SigninResponse to JSON.
		 * @function toJSON
		 * @memberof auth.SigninResponse
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		SigninResponse.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return SigninResponse;
	})();

	auth.SignInUser = (function () {
		/**
		 * Properties of a SignInUser.
		 * @memberof auth
		 * @interface ISignInUser
		 * @property {boolean|null} [searchable] SignInUser searchable
		 * @property {boolean|null} [visible] SignInUser visible
		 * @property {string|null} [emailAddress] SignInUser emailAddress
		 * @property {string|null} [userId] SignInUser userId
		 * @property {commonmessages.IPhoneNumbers|null} [phoneNumbers] SignInUser phoneNumbers
		 * @property {string|null} [userName] SignInUser userName
		 * @property {Array.<commonmessages.IDomainRoles>|null} [domains] SignInUser domains
		 * @property {boolean|null} [archiveMessages] SignInUser archiveMessages
		 * @property {boolean|null} [tncAccept] SignInUser tncAccept
		 * @property {string|null} [userTimezone] SignInUser userTimezone
		 * @property {string|null} [userCompanyName] SignInUser userCompanyName
		 * @property {commonmessages.IUserAddress|null} [address] SignInUser address
		 * @property {boolean|null} [tempUser] SignInUser tempUser
		 * @property {boolean|null} [isPostpaidUser] SignInUser isPostpaidUser
		 * @property {boolean|null} [lowBandwidthCalls] SignInUser lowBandwidthCalls
		 * @property {boolean|null} [softwareMfaEnabled] SignInUser softwareMfaEnabled
		 */

		/**
		 * Constructs a new SignInUser.
		 * @memberof auth
		 * @classdesc Represents a SignInUser.
		 * @implements ISignInUser
		 * @constructor
		 * @param {auth.ISignInUser=} [properties] Properties to set
		 */
		function SignInUser(properties) {
			this.domains = [];
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * SignInUser searchable.
		 * @member {boolean} searchable
		 * @memberof auth.SignInUser
		 * @instance
		 */
		SignInUser.prototype.searchable = false;

		/**
		 * SignInUser visible.
		 * @member {boolean} visible
		 * @memberof auth.SignInUser
		 * @instance
		 */
		SignInUser.prototype.visible = false;

		/**
		 * SignInUser emailAddress.
		 * @member {string} emailAddress
		 * @memberof auth.SignInUser
		 * @instance
		 */
		SignInUser.prototype.emailAddress = "";

		/**
		 * SignInUser userId.
		 * @member {string} userId
		 * @memberof auth.SignInUser
		 * @instance
		 */
		SignInUser.prototype.userId = "";

		/**
		 * SignInUser phoneNumbers.
		 * @member {commonmessages.IPhoneNumbers|null|undefined} phoneNumbers
		 * @memberof auth.SignInUser
		 * @instance
		 */
		SignInUser.prototype.phoneNumbers = null;

		/**
		 * SignInUser userName.
		 * @member {string} userName
		 * @memberof auth.SignInUser
		 * @instance
		 */
		SignInUser.prototype.userName = "";

		/**
		 * SignInUser domains.
		 * @member {Array.<commonmessages.IDomainRoles>} domains
		 * @memberof auth.SignInUser
		 * @instance
		 */
		SignInUser.prototype.domains = $util.emptyArray;

		/**
		 * SignInUser archiveMessages.
		 * @member {boolean} archiveMessages
		 * @memberof auth.SignInUser
		 * @instance
		 */
		SignInUser.prototype.archiveMessages = false;

		/**
		 * SignInUser tncAccept.
		 * @member {boolean} tncAccept
		 * @memberof auth.SignInUser
		 * @instance
		 */
		SignInUser.prototype.tncAccept = false;

		/**
		 * SignInUser userTimezone.
		 * @member {string} userTimezone
		 * @memberof auth.SignInUser
		 * @instance
		 */
		SignInUser.prototype.userTimezone = "";

		/**
		 * SignInUser userCompanyName.
		 * @member {string} userCompanyName
		 * @memberof auth.SignInUser
		 * @instance
		 */
		SignInUser.prototype.userCompanyName = "";

		/**
		 * SignInUser address.
		 * @member {commonmessages.IUserAddress|null|undefined} address
		 * @memberof auth.SignInUser
		 * @instance
		 */
		SignInUser.prototype.address = null;

		/**
		 * SignInUser tempUser.
		 * @member {boolean} tempUser
		 * @memberof auth.SignInUser
		 * @instance
		 */
		SignInUser.prototype.tempUser = false;

		/**
		 * SignInUser isPostpaidUser.
		 * @member {boolean} isPostpaidUser
		 * @memberof auth.SignInUser
		 * @instance
		 */
		SignInUser.prototype.isPostpaidUser = false;

		/**
		 * SignInUser lowBandwidthCalls.
		 * @member {boolean} lowBandwidthCalls
		 * @memberof auth.SignInUser
		 * @instance
		 */
		SignInUser.prototype.lowBandwidthCalls = false;

		/**
		 * SignInUser softwareMfaEnabled.
		 * @member {boolean} softwareMfaEnabled
		 * @memberof auth.SignInUser
		 * @instance
		 */
		SignInUser.prototype.softwareMfaEnabled = false;

		/**
		 * Creates a new SignInUser instance using the specified properties.
		 * @function create
		 * @memberof auth.SignInUser
		 * @static
		 * @param {auth.ISignInUser=} [properties] Properties to set
		 * @returns {auth.SignInUser} SignInUser instance
		 */
		SignInUser.create = function create(properties) {
			return new SignInUser(properties);
		};

		/**
		 * Encodes the specified SignInUser message. Does not implicitly {@link auth.SignInUser.verify|verify} messages.
		 * @function encode
		 * @memberof auth.SignInUser
		 * @static
		 * @param {auth.ISignInUser} message SignInUser message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		SignInUser.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.searchable !== null &&
				Object.hasOwnProperty.call(message, "searchable")
			)
				writer.uint32(/* id 1, wireType 0 =*/ 8).bool(message.searchable);
			if (
				message.visible !== null &&
				Object.hasOwnProperty.call(message, "visible")
			)
				writer.uint32(/* id 2, wireType 0 =*/ 16).bool(message.visible);
			if (
				message.emailAddress !== null &&
				Object.hasOwnProperty.call(message, "emailAddress")
			)
				writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.emailAddress);
			if (
				message.userId !== null &&
				Object.hasOwnProperty.call(message, "userId")
			)
				writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.userId);
			if (
				message.phoneNumbers !== null &&
				Object.hasOwnProperty.call(message, "phoneNumbers")
			)
				$root.commonmessages.PhoneNumbers.encode(
					message.phoneNumbers,
					writer.uint32(/* id 5, wireType 2 =*/ 42).fork()
				).ldelim();
			if (
				message.userName !== null &&
				Object.hasOwnProperty.call(message, "userName")
			)
				writer.uint32(/* id 6, wireType 2 =*/ 50).string(message.userName);
			if (message.domains !== null && message.domains.length)
				for (var i = 0; i < message.domains.length; ++i)
					$root.commonmessages.DomainRoles.encode(
						message.domains[i],
						writer.uint32(/* id 7, wireType 2 =*/ 58).fork()
					).ldelim();
			if (
				message.archiveMessages !== null &&
				Object.hasOwnProperty.call(message, "archiveMessages")
			)
				writer.uint32(/* id 8, wireType 0 =*/ 64).bool(message.archiveMessages);
			if (
				message.tncAccept !== null &&
				Object.hasOwnProperty.call(message, "tncAccept")
			)
				writer.uint32(/* id 9, wireType 0 =*/ 72).bool(message.tncAccept);
			if (
				message.userTimezone !== null &&
				Object.hasOwnProperty.call(message, "userTimezone")
			)
				writer.uint32(/* id 10, wireType 2 =*/ 82).string(message.userTimezone);
			if (
				message.userCompanyName !== null &&
				Object.hasOwnProperty.call(message, "userCompanyName")
			)
				writer
					.uint32(/* id 11, wireType 2 =*/ 90)
					.string(message.userCompanyName);
			if (
				message.address !== null &&
				Object.hasOwnProperty.call(message, "address")
			)
				$root.commonmessages.UserAddress.encode(
					message.address,
					writer.uint32(/* id 12, wireType 2 =*/ 98).fork()
				).ldelim();
			if (
				message.tempUser !== null &&
				Object.hasOwnProperty.call(message, "tempUser")
			)
				writer.uint32(/* id 13, wireType 0 =*/ 104).bool(message.tempUser);
			if (
				message.isPostpaidUser !== null &&
				Object.hasOwnProperty.call(message, "isPostpaidUser")
			)
				writer
					.uint32(/* id 14, wireType 0 =*/ 112)
					.bool(message.isPostpaidUser);
			if (
				message.lowBandwidthCalls !== null &&
				Object.hasOwnProperty.call(message, "lowBandwidthCalls")
			)
				writer
					.uint32(/* id 15, wireType 0 =*/ 120)
					.bool(message.lowBandwidthCalls);
			if (
				message.softwareMfaEnabled !== null &&
				Object.hasOwnProperty.call(message, "softwareMfaEnabled")
			)
				writer
					.uint32(/* id 16, wireType 0 =*/ 128)
					.bool(message.softwareMfaEnabled);
			return writer;
		};

		/**
		 * Encodes the specified SignInUser message, length delimited. Does not implicitly {@link auth.SignInUser.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof auth.SignInUser
		 * @static
		 * @param {auth.ISignInUser} message SignInUser message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		SignInUser.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a SignInUser message from the specified reader or buffer.
		 * @function decode
		 * @memberof auth.SignInUser
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {auth.SignInUser} SignInUser
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		SignInUser.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.auth.SignInUser();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.searchable = reader.bool();
						break;
					case 2:
						message.visible = reader.bool();
						break;
					case 3:
						message.emailAddress = reader.string();
						break;
					case 4:
						message.userId = reader.string();
						break;
					case 5:
						message.phoneNumbers = $root.commonmessages.PhoneNumbers.decode(
							reader,
							reader.uint32()
						);
						break;
					case 6:
						message.userName = reader.string();
						break;
					case 7:
						if (!(message.domains && message.domains.length))
							message.domains = [];
						message.domains.push(
							$root.commonmessages.DomainRoles.decode(reader, reader.uint32())
						);
						break;
					case 8:
						message.archiveMessages = reader.bool();
						break;
					case 9:
						message.tncAccept = reader.bool();
						break;
					case 10:
						message.userTimezone = reader.string();
						break;
					case 11:
						message.userCompanyName = reader.string();
						break;
					case 12:
						message.address = $root.commonmessages.UserAddress.decode(
							reader,
							reader.uint32()
						);
						break;
					case 13:
						message.tempUser = reader.bool();
						break;
					case 14:
						message.isPostpaidUser = reader.bool();
						break;
					case 15:
						message.lowBandwidthCalls = reader.bool();
						break;
					case 16:
						message.softwareMfaEnabled = reader.bool();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a SignInUser message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof auth.SignInUser
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {auth.SignInUser} SignInUser
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		SignInUser.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a SignInUser message.
		 * @function verify
		 * @memberof auth.SignInUser
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		SignInUser.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.searchable !== null && message.hasOwnProperty("searchable"))
				if (typeof message.searchable !== "boolean")
					return "searchable: boolean expected";
			if (message.visible !== null && message.hasOwnProperty("visible"))
				if (typeof message.visible !== "boolean")
					return "visible: boolean expected";
			if (
				message.emailAddress !== null &&
				message.hasOwnProperty("emailAddress")
			)
				if (!$util.isString(message.emailAddress))
					return "emailAddress: string expected";
			if (message.userId !== null && message.hasOwnProperty("userId"))
				if (!$util.isString(message.userId)) return "userId: string expected";
			if (
				message.phoneNumbers !== null &&
				message.hasOwnProperty("phoneNumbers")
			) {
				var error = $root.commonmessages.PhoneNumbers.verify(
					message.phoneNumbers
				);
				if (error) return "phoneNumbers." + error;
			}
			if (message.userName !== null && message.hasOwnProperty("userName"))
				if (!$util.isString(message.userName))
					return "userName: string expected";
			if (message.domains !== null && message.hasOwnProperty("domains")) {
				if (!Array.isArray(message.domains)) return "domains: array expected";
				for (var i = 0; i < message.domains.length; ++i) {
					var error = $root.commonmessages.DomainRoles.verify(
						message.domains[i]
					);
					if (error) return "domains." + error;
				}
			}
			if (
				message.archiveMessages !== null &&
				message.hasOwnProperty("archiveMessages")
			)
				if (typeof message.archiveMessages !== "boolean")
					return "archiveMessages: boolean expected";
			if (message.tncAccept !== null && message.hasOwnProperty("tncAccept"))
				if (typeof message.tncAccept !== "boolean")
					return "tncAccept: boolean expected";
			if (
				message.userTimezone !== null &&
				message.hasOwnProperty("userTimezone")
			)
				if (!$util.isString(message.userTimezone))
					return "userTimezone: string expected";
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
			if (message.tempUser !== null && message.hasOwnProperty("tempUser"))
				if (typeof message.tempUser !== "boolean")
					return "tempUser: boolean expected";
			if (
				message.isPostpaidUser !== null &&
				message.hasOwnProperty("isPostpaidUser")
			)
				if (typeof message.isPostpaidUser !== "boolean")
					return "isPostpaidUser: boolean expected";
			if (
				message.lowBandwidthCalls !== null &&
				message.hasOwnProperty("lowBandwidthCalls")
			)
				if (typeof message.lowBandwidthCalls !== "boolean")
					return "lowBandwidthCalls: boolean expected";
			if (
				message.softwareMfaEnabled !== null &&
				message.hasOwnProperty("softwareMfaEnabled")
			)
				if (typeof message.softwareMfaEnabled !== "boolean")
					return "softwareMfaEnabled: boolean expected";
			return null;
		};

		/**
		 * Creates a SignInUser message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof auth.SignInUser
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {auth.SignInUser} SignInUser
		 */
		SignInUser.fromObject = function fromObject(object) {
			if (object instanceof $root.auth.SignInUser) return object;
			var message = new $root.auth.SignInUser();
			if (object.searchable !== null)
				message.searchable = Boolean(object.searchable);
			if (object.visible !== null) message.visible = Boolean(object.visible);
			if (object.emailAddress !== null)
				message.emailAddress = String(object.emailAddress);
			if (object.userId !== null) message.userId = String(object.userId);
			if (object.phoneNumbers !== null) {
				if (typeof object.phoneNumbers !== "object")
					throw TypeError(".auth.SignInUser.phoneNumbers: object expected");
				message.phoneNumbers = $root.commonmessages.PhoneNumbers.fromObject(
					object.phoneNumbers
				);
			}
			if (object.userName !== null) message.userName = String(object.userName);
			if (object.domains) {
				if (!Array.isArray(object.domains))
					throw TypeError(".auth.SignInUser.domains: array expected");
				message.domains = [];
				for (var i = 0; i < object.domains.length; ++i) {
					if (typeof object.domains[i] !== "object")
						throw TypeError(".auth.SignInUser.domains: object expected");
					message.domains[i] = $root.commonmessages.DomainRoles.fromObject(
						object.domains[i]
					);
				}
			}
			if (object.archiveMessages !== null)
				message.archiveMessages = Boolean(object.archiveMessages);
			if (object.tncAccept !== null)
				message.tncAccept = Boolean(object.tncAccept);
			if (object.userTimezone !== null)
				message.userTimezone = String(object.userTimezone);
			if (object.userCompanyName !== null)
				message.userCompanyName = String(object.userCompanyName);
			if (object.address !== null) {
				if (typeof object.address !== "object")
					throw TypeError(".auth.SignInUser.address: object expected");
				message.address = $root.commonmessages.UserAddress.fromObject(
					object.address
				);
			}
			if (object.tempUser !== null) message.tempUser = Boolean(object.tempUser);
			if (object.isPostpaidUser !== null)
				message.isPostpaidUser = Boolean(object.isPostpaidUser);
			if (object.lowBandwidthCalls !== null)
				message.lowBandwidthCalls = Boolean(object.lowBandwidthCalls);
			if (object.softwareMfaEnabled !== null)
				message.softwareMfaEnabled = Boolean(object.softwareMfaEnabled);
			return message;
		};

		/**
		 * Creates a plain object from a SignInUser message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof auth.SignInUser
		 * @static
		 * @param {auth.SignInUser} message SignInUser
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		SignInUser.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.arrays || options.defaults) object.domains = [];
			if (options.defaults) {
				object.searchable = false;
				object.visible = false;
				object.emailAddress = "";
				object.userId = "";
				object.phoneNumbers = null;
				object.userName = "";
				object.archiveMessages = false;
				object.tncAccept = false;
				object.userTimezone = "";
				object.userCompanyName = "";
				object.address = null;
				object.tempUser = false;
				object.isPostpaidUser = false;
				object.lowBandwidthCalls = false;
				object.softwareMfaEnabled = false;
			}
			if (message.searchable !== null && message.hasOwnProperty("searchable"))
				object.searchable = message.searchable;
			if (message.visible !== null && message.hasOwnProperty("visible"))
				object.visible = message.visible;
			if (
				message.emailAddress !== null &&
				message.hasOwnProperty("emailAddress")
			)
				object.emailAddress = message.emailAddress;
			if (message.userId !== null && message.hasOwnProperty("userId"))
				object.userId = message.userId;
			if (
				message.phoneNumbers !== null &&
				message.hasOwnProperty("phoneNumbers")
			)
				object.phoneNumbers = $root.commonmessages.PhoneNumbers.toObject(
					message.phoneNumbers,
					options
				);
			if (message.userName !== null && message.hasOwnProperty("userName"))
				object.userName = message.userName;
			if (message.domains && message.domains.length) {
				object.domains = [];
				for (var j = 0; j < message.domains.length; ++j)
					object.domains[j] = $root.commonmessages.DomainRoles.toObject(
						message.domains[j],
						options
					);
			}
			if (
				message.archiveMessages !== null &&
				message.hasOwnProperty("archiveMessages")
			)
				object.archiveMessages = message.archiveMessages;
			if (message.tncAccept !== null && message.hasOwnProperty("tncAccept"))
				object.tncAccept = message.tncAccept;
			if (
				message.userTimezone !== null &&
				message.hasOwnProperty("userTimezone")
			)
				object.userTimezone = message.userTimezone;
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
			if (message.tempUser !== null && message.hasOwnProperty("tempUser"))
				object.tempUser = message.tempUser;
			if (
				message.isPostpaidUser !== null &&
				message.hasOwnProperty("isPostpaidUser")
			)
				object.isPostpaidUser = message.isPostpaidUser;
			if (
				message.lowBandwidthCalls !== null &&
				message.hasOwnProperty("lowBandwidthCalls")
			)
				object.lowBandwidthCalls = message.lowBandwidthCalls;
			if (
				message.softwareMfaEnabled !== null &&
				message.hasOwnProperty("softwareMfaEnabled")
			)
				object.softwareMfaEnabled = message.softwareMfaEnabled;
			return object;
		};

		/**
		 * Converts this SignInUser to JSON.
		 * @function toJSON
		 * @memberof auth.SignInUser
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		SignInUser.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return SignInUser;
	})();

	auth.FacebookSigninInput = (function () {
		/**
		 * Properties of a FacebookSigninInput.
		 * @memberof auth
		 * @interface IFacebookSigninInput
		 * @property {string|null} [token] FacebookSigninInput token
		 * @property {string|null} [platform] FacebookSigninInput platform
		 * @property {string|null} [userName] FacebookSigninInput userName
		 * @property {string|null} [emailAddress] FacebookSigninInput emailAddress
		 * @property {string|null} [appType] FacebookSigninInput appType
		 */

		/**
		 * Constructs a new FacebookSigninInput.
		 * @memberof auth
		 * @classdesc Represents a FacebookSigninInput.
		 * @implements IFacebookSigninInput
		 * @constructor
		 * @param {auth.IFacebookSigninInput=} [properties] Properties to set
		 */
		function FacebookSigninInput(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * FacebookSigninInput token.
		 * @member {string} token
		 * @memberof auth.FacebookSigninInput
		 * @instance
		 */
		FacebookSigninInput.prototype.token = "";

		/**
		 * FacebookSigninInput platform.
		 * @member {string} platform
		 * @memberof auth.FacebookSigninInput
		 * @instance
		 */
		FacebookSigninInput.prototype.platform = "";

		/**
		 * FacebookSigninInput userName.
		 * @member {string} userName
		 * @memberof auth.FacebookSigninInput
		 * @instance
		 */
		FacebookSigninInput.prototype.userName = "";

		/**
		 * FacebookSigninInput emailAddress.
		 * @member {string} emailAddress
		 * @memberof auth.FacebookSigninInput
		 * @instance
		 */
		FacebookSigninInput.prototype.emailAddress = "";

		/**
		 * FacebookSigninInput appType.
		 * @member {string} appType
		 * @memberof auth.FacebookSigninInput
		 * @instance
		 */
		FacebookSigninInput.prototype.appType = "";

		/**
		 * Creates a new FacebookSigninInput instance using the specified properties.
		 * @function create
		 * @memberof auth.FacebookSigninInput
		 * @static
		 * @param {auth.IFacebookSigninInput=} [properties] Properties to set
		 * @returns {auth.FacebookSigninInput} FacebookSigninInput instance
		 */
		FacebookSigninInput.create = function create(properties) {
			return new FacebookSigninInput(properties);
		};

		/**
		 * Encodes the specified FacebookSigninInput message. Does not implicitly {@link auth.FacebookSigninInput.verify|verify} messages.
		 * @function encode
		 * @memberof auth.FacebookSigninInput
		 * @static
		 * @param {auth.IFacebookSigninInput} message FacebookSigninInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		FacebookSigninInput.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.token !== null &&
				Object.hasOwnProperty.call(message, "token")
			)
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.token);
			if (
				message.platform !== null &&
				Object.hasOwnProperty.call(message, "platform")
			)
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.platform);
			if (
				message.userName !== null &&
				Object.hasOwnProperty.call(message, "userName")
			)
				writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.userName);
			if (
				message.emailAddress !== null &&
				Object.hasOwnProperty.call(message, "emailAddress")
			)
				writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.emailAddress);
			if (
				message.appType !== null &&
				Object.hasOwnProperty.call(message, "appType")
			)
				writer.uint32(/* id 5, wireType 2 =*/ 42).string(message.appType);
			return writer;
		};

		/**
		 * Encodes the specified FacebookSigninInput message, length delimited. Does not implicitly {@link auth.FacebookSigninInput.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof auth.FacebookSigninInput
		 * @static
		 * @param {auth.IFacebookSigninInput} message FacebookSigninInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		FacebookSigninInput.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a FacebookSigninInput message from the specified reader or buffer.
		 * @function decode
		 * @memberof auth.FacebookSigninInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {auth.FacebookSigninInput} FacebookSigninInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		FacebookSigninInput.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.auth.FacebookSigninInput();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.token = reader.string();
						break;
					case 2:
						message.platform = reader.string();
						break;
					case 3:
						message.userName = reader.string();
						break;
					case 4:
						message.emailAddress = reader.string();
						break;
					case 5:
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
		 * Decodes a FacebookSigninInput message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof auth.FacebookSigninInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {auth.FacebookSigninInput} FacebookSigninInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		FacebookSigninInput.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a FacebookSigninInput message.
		 * @function verify
		 * @memberof auth.FacebookSigninInput
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		FacebookSigninInput.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.token !== null && message.hasOwnProperty("token"))
				if (!$util.isString(message.token)) return "token: string expected";
			if (message.platform !== null && message.hasOwnProperty("platform"))
				if (!$util.isString(message.platform))
					return "platform: string expected";
			if (message.userName !== null && message.hasOwnProperty("userName"))
				if (!$util.isString(message.userName))
					return "userName: string expected";
			if (
				message.emailAddress !== null &&
				message.hasOwnProperty("emailAddress")
			)
				if (!$util.isString(message.emailAddress))
					return "emailAddress: string expected";
			if (message.appType !== null && message.hasOwnProperty("appType"))
				if (!$util.isString(message.appType)) return "appType: string expected";
			return null;
		};

		/**
		 * Creates a FacebookSigninInput message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof auth.FacebookSigninInput
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {auth.FacebookSigninInput} FacebookSigninInput
		 */
		FacebookSigninInput.fromObject = function fromObject(object) {
			if (object instanceof $root.auth.FacebookSigninInput) return object;
			var message = new $root.auth.FacebookSigninInput();
			if (object.token !== null) message.token = String(object.token);
			if (object.platform !== null) message.platform = String(object.platform);
			if (object.userName !== null) message.userName = String(object.userName);
			if (object.emailAddress !== null)
				message.emailAddress = String(object.emailAddress);
			if (object.appType !== null) message.appType = String(object.appType);
			return message;
		};

		/**
		 * Creates a plain object from a FacebookSigninInput message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof auth.FacebookSigninInput
		 * @static
		 * @param {auth.FacebookSigninInput} message FacebookSigninInput
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		FacebookSigninInput.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.token = "";
				object.platform = "";
				object.userName = "";
				object.emailAddress = "";
				object.appType = "";
			}
			if (message.token !== null && message.hasOwnProperty("token"))
				object.token = message.token;
			if (message.platform !== null && message.hasOwnProperty("platform"))
				object.platform = message.platform;
			if (message.userName !== null && message.hasOwnProperty("userName"))
				object.userName = message.userName;
			if (
				message.emailAddress !== null &&
				message.hasOwnProperty("emailAddress")
			)
				object.emailAddress = message.emailAddress;
			if (message.appType !== null && message.hasOwnProperty("appType"))
				object.appType = message.appType;
			return object;
		};

		/**
		 * Converts this FacebookSigninInput to JSON.
		 * @function toJSON
		 * @memberof auth.FacebookSigninInput
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		FacebookSigninInput.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return FacebookSigninInput;
	})();

	auth.AnonAccessInput = (function () {
		/**
		 * Properties of an AnonAccessInput.
		 * @memberof auth
		 * @interface IAnonAccessInput
		 * @property {string|null} [urlDomain] AnonAccessInput urlDomain
		 * @property {string|null} [botId] AnonAccessInput botId
		 * @property {string|null} [platform] AnonAccessInput platform
		 * @property {string|null} [appType] AnonAccessInput appType
		 */

		/**
		 * Constructs a new AnonAccessInput.
		 * @memberof auth
		 * @classdesc Represents an AnonAccessInput.
		 * @implements IAnonAccessInput
		 * @constructor
		 * @param {auth.IAnonAccessInput=} [properties] Properties to set
		 */
		function AnonAccessInput(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * AnonAccessInput urlDomain.
		 * @member {string} urlDomain
		 * @memberof auth.AnonAccessInput
		 * @instance
		 */
		AnonAccessInput.prototype.urlDomain = "";

		/**
		 * AnonAccessInput botId.
		 * @member {string} botId
		 * @memberof auth.AnonAccessInput
		 * @instance
		 */
		AnonAccessInput.prototype.botId = "";

		/**
		 * AnonAccessInput platform.
		 * @member {string} platform
		 * @memberof auth.AnonAccessInput
		 * @instance
		 */
		AnonAccessInput.prototype.platform = "";

		/**
		 * AnonAccessInput appType.
		 * @member {string} appType
		 * @memberof auth.AnonAccessInput
		 * @instance
		 */
		AnonAccessInput.prototype.appType = "";

		/**
		 * Creates a new AnonAccessInput instance using the specified properties.
		 * @function create
		 * @memberof auth.AnonAccessInput
		 * @static
		 * @param {auth.IAnonAccessInput=} [properties] Properties to set
		 * @returns {auth.AnonAccessInput} AnonAccessInput instance
		 */
		AnonAccessInput.create = function create(properties) {
			return new AnonAccessInput(properties);
		};

		/**
		 * Encodes the specified AnonAccessInput message. Does not implicitly {@link auth.AnonAccessInput.verify|verify} messages.
		 * @function encode
		 * @memberof auth.AnonAccessInput
		 * @static
		 * @param {auth.IAnonAccessInput} message AnonAccessInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		AnonAccessInput.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.urlDomain !== null &&
				Object.hasOwnProperty.call(message, "urlDomain")
			)
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.urlDomain);
			if (
				message.botId !== null &&
				Object.hasOwnProperty.call(message, "botId")
			)
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.botId);
			if (
				message.platform !== null &&
				Object.hasOwnProperty.call(message, "platform")
			)
				writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.platform);
			if (
				message.appType !== null &&
				Object.hasOwnProperty.call(message, "appType")
			)
				writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.appType);
			return writer;
		};

		/**
		 * Encodes the specified AnonAccessInput message, length delimited. Does not implicitly {@link auth.AnonAccessInput.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof auth.AnonAccessInput
		 * @static
		 * @param {auth.IAnonAccessInput} message AnonAccessInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		AnonAccessInput.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes an AnonAccessInput message from the specified reader or buffer.
		 * @function decode
		 * @memberof auth.AnonAccessInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {auth.AnonAccessInput} AnonAccessInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		AnonAccessInput.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.auth.AnonAccessInput();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.urlDomain = reader.string();
						break;
					case 2:
						message.botId = reader.string();
						break;
					case 3:
						message.platform = reader.string();
						break;
					case 4:
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
		 * Decodes an AnonAccessInput message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof auth.AnonAccessInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {auth.AnonAccessInput} AnonAccessInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		AnonAccessInput.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies an AnonAccessInput message.
		 * @function verify
		 * @memberof auth.AnonAccessInput
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		AnonAccessInput.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.urlDomain !== null && message.hasOwnProperty("urlDomain"))
				if (!$util.isString(message.urlDomain))
					return "urlDomain: string expected";
			if (message.botId !== null && message.hasOwnProperty("botId"))
				if (!$util.isString(message.botId)) return "botId: string expected";
			if (message.platform !== null && message.hasOwnProperty("platform"))
				if (!$util.isString(message.platform))
					return "platform: string expected";
			if (message.appType !== null && message.hasOwnProperty("appType"))
				if (!$util.isString(message.appType)) return "appType: string expected";
			return null;
		};

		/**
		 * Creates an AnonAccessInput message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof auth.AnonAccessInput
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {auth.AnonAccessInput} AnonAccessInput
		 */
		AnonAccessInput.fromObject = function fromObject(object) {
			if (object instanceof $root.auth.AnonAccessInput) return object;
			var message = new $root.auth.AnonAccessInput();
			if (object.urlDomain !== null)
				message.urlDomain = String(object.urlDomain);
			if (object.botId !== null) message.botId = String(object.botId);
			if (object.platform !== null) message.platform = String(object.platform);
			if (object.appType !== null) message.appType = String(object.appType);
			return message;
		};

		/**
		 * Creates a plain object from an AnonAccessInput message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof auth.AnonAccessInput
		 * @static
		 * @param {auth.AnonAccessInput} message AnonAccessInput
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		AnonAccessInput.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.urlDomain = "";
				object.botId = "";
				object.platform = "";
				object.appType = "";
			}
			if (message.urlDomain !== null && message.hasOwnProperty("urlDomain"))
				object.urlDomain = message.urlDomain;
			if (message.botId !== null && message.hasOwnProperty("botId"))
				object.botId = message.botId;
			if (message.platform !== null && message.hasOwnProperty("platform"))
				object.platform = message.platform;
			if (message.appType !== null && message.hasOwnProperty("appType"))
				object.appType = message.appType;
			return object;
		};

		/**
		 * Converts this AnonAccessInput to JSON.
		 * @function toJSON
		 * @memberof auth.AnonAccessInput
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		AnonAccessInput.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return AnonAccessInput;
	})();

	auth.UserActivityInput = (function () {
		/**
		 * Properties of a UserActivityInput.
		 * @memberof auth
		 * @interface IUserActivityInput
		 * @property {string|null} [botId] UserActivityInput botId
		 * @property {string|null} [loginProvider] UserActivityInput loginProvider
		 * @property {string|null} [password] UserActivityInput password
		 * @property {string|null} [code] UserActivityInput code
		 * @property {string|null} [idToken] UserActivityInput idToken
		 * @property {string|null} [platform] UserActivityInput platform
		 * @property {string|null} [appType] UserActivityInput appType
		 * @property {string|null} [otpToken] UserActivityInput otpToken
		 */

		/**
		 * Constructs a new UserActivityInput.
		 * @memberof auth
		 * @classdesc Represents a UserActivityInput.
		 * @implements IUserActivityInput
		 * @constructor
		 * @param {auth.IUserActivityInput=} [properties] Properties to set
		 */
		function UserActivityInput(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * UserActivityInput botId.
		 * @member {string} botId
		 * @memberof auth.UserActivityInput
		 * @instance
		 */
		UserActivityInput.prototype.botId = "";

		/**
		 * UserActivityInput loginProvider.
		 * @member {string} loginProvider
		 * @memberof auth.UserActivityInput
		 * @instance
		 */
		UserActivityInput.prototype.loginProvider = "";

		/**
		 * UserActivityInput password.
		 * @member {string} password
		 * @memberof auth.UserActivityInput
		 * @instance
		 */
		UserActivityInput.prototype.password = "";

		/**
		 * UserActivityInput code.
		 * @member {string} code
		 * @memberof auth.UserActivityInput
		 * @instance
		 */
		UserActivityInput.prototype.code = "";

		/**
		 * UserActivityInput idToken.
		 * @member {string} idToken
		 * @memberof auth.UserActivityInput
		 * @instance
		 */
		UserActivityInput.prototype.idToken = "";

		/**
		 * UserActivityInput platform.
		 * @member {string} platform
		 * @memberof auth.UserActivityInput
		 * @instance
		 */
		UserActivityInput.prototype.platform = "";

		/**
		 * UserActivityInput appType.
		 * @member {string} appType
		 * @memberof auth.UserActivityInput
		 * @instance
		 */
		UserActivityInput.prototype.appType = "";

		/**
		 * UserActivityInput otpToken.
		 * @member {string} otpToken
		 * @memberof auth.UserActivityInput
		 * @instance
		 */
		UserActivityInput.prototype.otpToken = "";

		/**
		 * Creates a new UserActivityInput instance using the specified properties.
		 * @function create
		 * @memberof auth.UserActivityInput
		 * @static
		 * @param {auth.IUserActivityInput=} [properties] Properties to set
		 * @returns {auth.UserActivityInput} UserActivityInput instance
		 */
		UserActivityInput.create = function create(properties) {
			return new UserActivityInput(properties);
		};

		/**
		 * Encodes the specified UserActivityInput message. Does not implicitly {@link auth.UserActivityInput.verify|verify} messages.
		 * @function encode
		 * @memberof auth.UserActivityInput
		 * @static
		 * @param {auth.IUserActivityInput} message UserActivityInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		UserActivityInput.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.botId !== null &&
				Object.hasOwnProperty.call(message, "botId")
			)
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.botId);
			if (
				message.loginProvider !== null &&
				Object.hasOwnProperty.call(message, "loginProvider")
			)
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.loginProvider);
			if (
				message.password !== null &&
				Object.hasOwnProperty.call(message, "password")
			)
				writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.password);
			if (message.code !== null && Object.hasOwnProperty.call(message, "code"))
				writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.code);
			if (
				message.idToken !== null &&
				Object.hasOwnProperty.call(message, "idToken")
			)
				writer.uint32(/* id 5, wireType 2 =*/ 42).string(message.idToken);
			if (
				message.platform !== null &&
				Object.hasOwnProperty.call(message, "platform")
			)
				writer.uint32(/* id 6, wireType 2 =*/ 50).string(message.platform);
			if (
				message.appType !== null &&
				Object.hasOwnProperty.call(message, "appType")
			)
				writer.uint32(/* id 7, wireType 2 =*/ 58).string(message.appType);
			if (
				message.otpToken !== null &&
				Object.hasOwnProperty.call(message, "otpToken")
			)
				writer.uint32(/* id 8, wireType 2 =*/ 66).string(message.otpToken);
			return writer;
		};

		/**
		 * Encodes the specified UserActivityInput message, length delimited. Does not implicitly {@link auth.UserActivityInput.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof auth.UserActivityInput
		 * @static
		 * @param {auth.IUserActivityInput} message UserActivityInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		UserActivityInput.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a UserActivityInput message from the specified reader or buffer.
		 * @function decode
		 * @memberof auth.UserActivityInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {auth.UserActivityInput} UserActivityInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		UserActivityInput.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.auth.UserActivityInput();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.botId = reader.string();
						break;
					case 2:
						message.loginProvider = reader.string();
						break;
					case 3:
						message.password = reader.string();
						break;
					case 4:
						message.code = reader.string();
						break;
					case 5:
						message.idToken = reader.string();
						break;
					case 6:
						message.platform = reader.string();
						break;
					case 7:
						message.appType = reader.string();
						break;
					case 8:
						message.otpToken = reader.string();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a UserActivityInput message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof auth.UserActivityInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {auth.UserActivityInput} UserActivityInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		UserActivityInput.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a UserActivityInput message.
		 * @function verify
		 * @memberof auth.UserActivityInput
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		UserActivityInput.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.botId !== null && message.hasOwnProperty("botId"))
				if (!$util.isString(message.botId)) return "botId: string expected";
			if (
				message.loginProvider !== null &&
				message.hasOwnProperty("loginProvider")
			)
				if (!$util.isString(message.loginProvider))
					return "loginProvider: string expected";
			if (message.password !== null && message.hasOwnProperty("password"))
				if (!$util.isString(message.password))
					return "password: string expected";
			if (message.code !== null && message.hasOwnProperty("code"))
				if (!$util.isString(message.code)) return "code: string expected";
			if (message.idToken !== null && message.hasOwnProperty("idToken"))
				if (!$util.isString(message.idToken)) return "idToken: string expected";
			if (message.platform !== null && message.hasOwnProperty("platform"))
				if (!$util.isString(message.platform))
					return "platform: string expected";
			if (message.appType !== null && message.hasOwnProperty("appType"))
				if (!$util.isString(message.appType)) return "appType: string expected";
			if (message.otpToken !== null && message.hasOwnProperty("otpToken"))
				if (!$util.isString(message.otpToken))
					return "otpToken: string expected";
			return null;
		};

		/**
		 * Creates a UserActivityInput message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof auth.UserActivityInput
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {auth.UserActivityInput} UserActivityInput
		 */
		UserActivityInput.fromObject = function fromObject(object) {
			if (object instanceof $root.auth.UserActivityInput) return object;
			var message = new $root.auth.UserActivityInput();
			if (object.botId !== null) message.botId = String(object.botId);
			if (object.loginProvider !== null)
				message.loginProvider = String(object.loginProvider);
			if (object.password !== null) message.password = String(object.password);
			if (object.code !== null) message.code = String(object.code);
			if (object.idToken !== null) message.idToken = String(object.idToken);
			if (object.platform !== null) message.platform = String(object.platform);
			if (object.appType !== null) message.appType = String(object.appType);
			if (object.otpToken !== null) message.otpToken = String(object.otpToken);
			return message;
		};

		/**
		 * Creates a plain object from a UserActivityInput message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof auth.UserActivityInput
		 * @static
		 * @param {auth.UserActivityInput} message UserActivityInput
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		UserActivityInput.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.botId = "";
				object.loginProvider = "";
				object.password = "";
				object.code = "";
				object.idToken = "";
				object.platform = "";
				object.appType = "";
				object.otpToken = "";
			}
			if (message.botId !== null && message.hasOwnProperty("botId"))
				object.botId = message.botId;
			if (
				message.loginProvider !== null &&
				message.hasOwnProperty("loginProvider")
			)
				object.loginProvider = message.loginProvider;
			if (message.password !== null && message.hasOwnProperty("password"))
				object.password = message.password;
			if (message.code !== null && message.hasOwnProperty("code"))
				object.code = message.code;
			if (message.idToken !== null && message.hasOwnProperty("idToken"))
				object.idToken = message.idToken;
			if (message.platform !== null && message.hasOwnProperty("platform"))
				object.platform = message.platform;
			if (message.appType !== null && message.hasOwnProperty("appType"))
				object.appType = message.appType;
			if (message.otpToken !== null && message.hasOwnProperty("otpToken"))
				object.otpToken = message.otpToken;
			return object;
		};

		/**
		 * Converts this UserActivityInput to JSON.
		 * @function toJSON
		 * @memberof auth.UserActivityInput
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		UserActivityInput.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return UserActivityInput;
	})();

	auth.MFAInput = (function () {
		/**
		 * Properties of a MFAInput.
		 * @memberof auth
		 * @interface IMFAInput
		 * @property {string|null} [appType] MFAInput appType
		 * @property {string|null} [password] MFAInput password
		 * @property {string|null} [otpToken] MFAInput otpToken
		 */

		/**
		 * Constructs a new MFAInput.
		 * @memberof auth
		 * @classdesc Represents a MFAInput.
		 * @implements IMFAInput
		 * @constructor
		 * @param {auth.IMFAInput=} [properties] Properties to set
		 */
		function MFAInput(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * MFAInput appType.
		 * @member {string} appType
		 * @memberof auth.MFAInput
		 * @instance
		 */
		MFAInput.prototype.appType = "";

		/**
		 * MFAInput password.
		 * @member {string} password
		 * @memberof auth.MFAInput
		 * @instance
		 */
		MFAInput.prototype.password = "";

		/**
		 * MFAInput otpToken.
		 * @member {string} otpToken
		 * @memberof auth.MFAInput
		 * @instance
		 */
		MFAInput.prototype.otpToken = "";

		/**
		 * Creates a new MFAInput instance using the specified properties.
		 * @function create
		 * @memberof auth.MFAInput
		 * @static
		 * @param {auth.IMFAInput=} [properties] Properties to set
		 * @returns {auth.MFAInput} MFAInput instance
		 */
		MFAInput.create = function create(properties) {
			return new MFAInput(properties);
		};

		/**
		 * Encodes the specified MFAInput message. Does not implicitly {@link auth.MFAInput.verify|verify} messages.
		 * @function encode
		 * @memberof auth.MFAInput
		 * @static
		 * @param {auth.IMFAInput} message MFAInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		MFAInput.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.appType !== null &&
				Object.hasOwnProperty.call(message, "appType")
			)
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.appType);
			if (
				message.password !== null &&
				Object.hasOwnProperty.call(message, "password")
			)
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.password);
			if (
				message.otpToken !== null &&
				Object.hasOwnProperty.call(message, "otpToken")
			)
				writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.otpToken);
			return writer;
		};

		/**
		 * Encodes the specified MFAInput message, length delimited. Does not implicitly {@link auth.MFAInput.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof auth.MFAInput
		 * @static
		 * @param {auth.IMFAInput} message MFAInput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		MFAInput.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a MFAInput message from the specified reader or buffer.
		 * @function decode
		 * @memberof auth.MFAInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {auth.MFAInput} MFAInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		MFAInput.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.auth.MFAInput();
			while (reader.pos < end) {
				var tag = reader.uint32();
				switch (tag >>> 3) {
					case 1:
						message.appType = reader.string();
						break;
					case 2:
						message.password = reader.string();
						break;
					case 3:
						message.otpToken = reader.string();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a MFAInput message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof auth.MFAInput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {auth.MFAInput} MFAInput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		MFAInput.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a MFAInput message.
		 * @function verify
		 * @memberof auth.MFAInput
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		MFAInput.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.appType !== null && message.hasOwnProperty("appType"))
				if (!$util.isString(message.appType)) return "appType: string expected";
			if (message.password !== null && message.hasOwnProperty("password"))
				if (!$util.isString(message.password))
					return "password: string expected";
			if (message.otpToken !== null && message.hasOwnProperty("otpToken"))
				if (!$util.isString(message.otpToken))
					return "otpToken: string expected";
			return null;
		};

		/**
		 * Creates a MFAInput message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof auth.MFAInput
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {auth.MFAInput} MFAInput
		 */
		MFAInput.fromObject = function fromObject(object) {
			if (object instanceof $root.auth.MFAInput) return object;
			var message = new $root.auth.MFAInput();
			if (object.appType !== null) message.appType = String(object.appType);
			if (object.password !== null) message.password = String(object.password);
			if (object.otpToken !== null) message.otpToken = String(object.otpToken);
			return message;
		};

		/**
		 * Creates a plain object from a MFAInput message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof auth.MFAInput
		 * @static
		 * @param {auth.MFAInput} message MFAInput
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		MFAInput.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.appType = "";
				object.password = "";
				object.otpToken = "";
			}
			if (message.appType !== null && message.hasOwnProperty("appType"))
				object.appType = message.appType;
			if (message.password !== null && message.hasOwnProperty("password"))
				object.password = message.password;
			if (message.otpToken !== null && message.hasOwnProperty("otpToken"))
				object.otpToken = message.otpToken;
			return object;
		};

		/**
		 * Converts this MFAInput to JSON.
		 * @function toJSON
		 * @memberof auth.MFAInput
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		MFAInput.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return MFAInput;
	})();

	auth.MFAOutput = (function () {
		/**
		 * Properties of a MFAOutput.
		 * @memberof auth
		 * @interface IMFAOutput
		 * @property {boolean|null} [success] MFAOutput success
		 * @property {string|null} [errorMessage] MFAOutput errorMessage
		 * @property {string|null} [errorCode] MFAOutput errorCode
		 * @property {string|null} [qrCodeUri] MFAOutput qrCodeUri
		 */

		/**
		 * Constructs a new MFAOutput.
		 * @memberof auth
		 * @classdesc Represents a MFAOutput.
		 * @implements IMFAOutput
		 * @constructor
		 * @param {auth.IMFAOutput=} [properties] Properties to set
		 */
		function MFAOutput(properties) {
			if (properties)
				for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
					if (properties[keys[i]] !== null) this[keys[i]] = properties[keys[i]];
		}

		/**
		 * MFAOutput success.
		 * @member {boolean} success
		 * @memberof auth.MFAOutput
		 * @instance
		 */
		MFAOutput.prototype.success = false;

		/**
		 * MFAOutput errorMessage.
		 * @member {string} errorMessage
		 * @memberof auth.MFAOutput
		 * @instance
		 */
		MFAOutput.prototype.errorMessage = "";

		/**
		 * MFAOutput errorCode.
		 * @member {string} errorCode
		 * @memberof auth.MFAOutput
		 * @instance
		 */
		MFAOutput.prototype.errorCode = "";

		/**
		 * MFAOutput qrCodeUri.
		 * @member {string} qrCodeUri
		 * @memberof auth.MFAOutput
		 * @instance
		 */
		MFAOutput.prototype.qrCodeUri = "";

		/**
		 * Creates a new MFAOutput instance using the specified properties.
		 * @function create
		 * @memberof auth.MFAOutput
		 * @static
		 * @param {auth.IMFAOutput=} [properties] Properties to set
		 * @returns {auth.MFAOutput} MFAOutput instance
		 */
		MFAOutput.create = function create(properties) {
			return new MFAOutput(properties);
		};

		/**
		 * Encodes the specified MFAOutput message. Does not implicitly {@link auth.MFAOutput.verify|verify} messages.
		 * @function encode
		 * @memberof auth.MFAOutput
		 * @static
		 * @param {auth.IMFAOutput} message MFAOutput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		MFAOutput.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.success !== null &&
				Object.hasOwnProperty.call(message, "success")
			)
				writer.uint32(/* id 1, wireType 0 =*/ 8).bool(message.success);
			if (
				message.errorMessage !== null &&
				Object.hasOwnProperty.call(message, "errorMessage")
			)
				writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.errorMessage);
			if (
				message.errorCode !== null &&
				Object.hasOwnProperty.call(message, "errorCode")
			)
				writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.errorCode);
			if (
				message.qrCodeUri !== null &&
				Object.hasOwnProperty.call(message, "qrCodeUri")
			)
				writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.qrCodeUri);
			return writer;
		};

		/**
		 * Encodes the specified MFAOutput message, length delimited. Does not implicitly {@link auth.MFAOutput.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof auth.MFAOutput
		 * @static
		 * @param {auth.IMFAOutput} message MFAOutput message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		MFAOutput.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a MFAOutput message from the specified reader or buffer.
		 * @function decode
		 * @memberof auth.MFAOutput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {auth.MFAOutput} MFAOutput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		MFAOutput.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			var end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.auth.MFAOutput();
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
						message.errorCode = reader.string();
						break;
					case 4:
						message.qrCodeUri = reader.string();
						break;
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a MFAOutput message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof auth.MFAOutput
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {auth.MFAOutput} MFAOutput
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		MFAOutput.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a MFAOutput message.
		 * @function verify
		 * @memberof auth.MFAOutput
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		MFAOutput.verify = function verify(message) {
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
			if (message.errorCode !== null && message.hasOwnProperty("errorCode"))
				if (!$util.isString(message.errorCode))
					return "errorCode: string expected";
			if (message.qrCodeUri !== null && message.hasOwnProperty("qrCodeUri"))
				if (!$util.isString(message.qrCodeUri))
					return "qrCodeUri: string expected";
			return null;
		};

		/**
		 * Creates a MFAOutput message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof auth.MFAOutput
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {auth.MFAOutput} MFAOutput
		 */
		MFAOutput.fromObject = function fromObject(object) {
			if (object instanceof $root.auth.MFAOutput) return object;
			var message = new $root.auth.MFAOutput();
			if (object.success !== null) message.success = Boolean(object.success);
			if (object.errorMessage !== null)
				message.errorMessage = String(object.errorMessage);
			if (object.errorCode !== null)
				message.errorCode = String(object.errorCode);
			if (object.qrCodeUri !== null)
				message.qrCodeUri = String(object.qrCodeUri);
			return message;
		};

		/**
		 * Creates a plain object from a MFAOutput message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof auth.MFAOutput
		 * @static
		 * @param {auth.MFAOutput} message MFAOutput
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		MFAOutput.toObject = function toObject(message, options) {
			if (!options) options = {};
			var object = {};
			if (options.defaults) {
				object.success = false;
				object.errorMessage = "";
				object.errorCode = "";
				object.qrCodeUri = "";
			}
			if (message.success !== null && message.hasOwnProperty("success"))
				object.success = message.success;
			if (
				message.errorMessage !== null &&
				message.hasOwnProperty("errorMessage")
			)
				object.errorMessage = message.errorMessage;
			if (message.errorCode !== null && message.hasOwnProperty("errorCode"))
				object.errorCode = message.errorCode;
			if (message.qrCodeUri !== null && message.hasOwnProperty("qrCodeUri"))
				object.qrCodeUri = message.qrCodeUri;
			return object;
		};

		/**
		 * Converts this MFAOutput to JSON.
		 * @function toJSON
		 * @memberof auth.MFAOutput
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		MFAOutput.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
		};

		return MFAOutput;
	})();

	return auth;
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
