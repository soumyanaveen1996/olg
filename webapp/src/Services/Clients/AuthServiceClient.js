// import { auth } from "../gRPC/Generated/AuthService";
// import RPC from "./RPC";

import AuthService from "../gRPC/Generated/AuthService";
import RPC from "./RPC";
import UserService from "../gRPC/Generated/UserService";
const auth = AuthService.auth;
const commonmessages = UserService.commonmessages;

class AuthServiceClient {
	static doConfirmSignUp(confirmSignUpInfo) {
		// console.log("doConfirmSignUp", confirmSignUpInfo);
		return RPC.rpcCall(
			"/auth.AuthService/ConfirmSignup",
			confirmSignUpInfo,
			auth.SignupResponse,
			(request) => {
				return auth.SignupUser.encode(request).finish();
			},
			auth.SignupResponse.decode
		);
	}

	static doSignUp(signUpInfo) {
		// console.log("doSignup", signUpInfo);
		return RPC.rpcCall(
			"/auth.AuthService/Signup",
			signUpInfo,
			auth.SignupResponse,
			(request) => {
				return auth.SignupUser.encode(request).finish();
			},
			auth.SignupResponse.decode
		);
	}

	static doFrontMLogin(loginObj) {
		// console.log("login obj ==== ", loginObj);
		return RPC.rpcCall(
			"/auth.AuthService/FrontmSignin",
			loginObj,
			auth.SigninResponse,
			(request) => {
				return auth.FrontmSigninInput.encode(request).finish();
			},
			auth.SigninResponse.decode
		);
	}

	static resetPassword(data) {
		return RPC.rpcCall(
			"/auth.AuthService/ResetPassword",
			data,
			auth.SignupResponse,
			(request) => {
				return auth.SignupUser.encode(request).finish();
			},
			auth.SignupResponse.decode
		);
	}
	static confirmPasswordReset(data) {
		return RPC.rpcCall(
			"/auth.AuthService/ConfirmPasswordReset",
			data,
			auth.SignupResponse,
			(request) => {
				return auth.SignupUser.encode(request).finish();
			},
			auth.SignupResponse.decode
		);
	}
	static sendCodeAgain(data) {
		console.log("ResendSignupConfirmCode", data);
		return RPC.rpcCall(
			"/auth.AuthService/ResendSignupConfirmCode",
			data,
			auth.SignupResponse,
			(request) => {
				return auth.SignupUser.encode(request).finish();
			},
			auth.SignupResponse.decode
		);
	}
	static resetUserActivity(data) {
		// console.log("sendCodeAgain", data);
		return RPC.rpcCall(
			"/auth.AuthService/ResetUserActivity",
			data,
			auth.SignupResponse,
			(request) => {
				return auth.UserActivityInput.encode(request).finish();
			},
			auth.SignupResponse.decode
		);
	}
	static initiateSoftwareMfa(data) {
		return RPC.rpcCall(
			"/auth.AuthService/InitiateSoftwareMfa",
			data,
			auth.MFAOutput,
			(request) => {
				return auth.MFAInput.encode(request).finish();
			},
			auth.MFAOutput.decode
		);
	}
	static activeSoftwareMfa(data) {
		return RPC.rpcCall(
			"/auth.AuthService/ActivateSoftwareMfa",
			data,
			auth.MFAOutput,
			(request) => {
				return auth.MFAInput.encode(request).finish();
			},
			auth.MFAOutput.decode
		);
	}
	static deactivateSoftwareMfa(data) {
		return RPC.rpcCall(
			"/auth.AuthService/DeactivateSoftwareMfa",
			data,
			auth.MFAOutput,
			(request) => {
				return auth.MFAInput.encode(request).finish();
			},
			auth.MFAOutput.decode
		);
	}
	static changeSoftwareMfa(data) {
		return RPC.rpcCall(
			"/auth.AuthService/ChangeSoftwareMfa",
			data,
			auth.MFAOutput,
			(request) => {
				return auth.MFAInput.encode(request).finish();
			},
			auth.MFAOutput.decode
		);
	}

	static doGoogleLogin(code, appType) {
		return RPC.rpcCall(
			"/auth.AuthService/GoogleSignin",
			{
				code,
				platform: "web",
				appType: appType,
			},
			auth.SigninResponse,
			(request) => {
				return auth.GoogleSigninInput.encode(request).finish();
			},
			auth.SigninResponse.decode
		);
	}

	static changePassword = (request) => {
		return RPC.rpcCall(
			"/auth.AuthService/ChangePassword",
			request,
			auth.SignupResponse,
			(request) => {
				return auth.SignupUser.encode(request).finish();
			},
			auth.SignupResponse.decode
		);
	};

	static createAnonymousAccess = (createAnonymousAccessObj) => {
		return RPC.rpcCall(
			"/auth.AuthService/CreateAnonymousAccess",
			createAnonymousAccessObj,
			auth.SigninResponse,
			(request) => {
				return auth.AnonAccessInput.encode(request).finish();
			},
			auth.SigninResponse.decode
		);
	};

	static refreshAnonymousUserSession = (dataObj) => {
		return RPC.rpcCall(
			"/auth.AuthService/RefreshAnonymousUserSession",
			dataObj,
			auth.SignupResponse,
			(request) => {
				return commonmessages.Empty.encode(request).finish();
			},
			auth.SignupResponse.decode
		);
	};
}

export default AuthServiceClient;
