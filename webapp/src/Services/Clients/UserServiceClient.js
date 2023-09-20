// import { user, commonmessages } from "../gRPC/Generated/UserService";

import UserService from "../gRPC/Generated/UserService";
import RPC from "./RPC";
const user = UserService.user;
const commonmessages = UserService.commonmessages;

class UserServiceClient {
	static fetchUserDetails(reqInfo) {
		// console.log("fetching request ", reqInfo, user);

		return RPC.rpcCall(
			"/user.UserService/GetUserDetails",
			reqInfo,
			user.User,
			(request) => {
				return user.User.encode(request).finish();
			},
			user.User.decode,
			{},
			true
		);
	}

	static getAppBroadcastMessages() {
		return RPC.rpcCall(
			"/user.UserService/GetAppBroadcastMessages",
			{},
			user.AppBroadcastMessagesResponse,
			(request) => {
				return commonmessages.Empty.encode(request).finish();
			},
			user.AppBroadcastMessagesResponse.decode
		);
	}

	static sendVoipCall(callInfo) {
		console.log("data on senidng SendVoipPushNotification", callInfo);
		return RPC.rpcCall(
			"/user.UserService/SendVoipPushNotification",
			callInfo,
			user.VoipPushResponse,
			(request) => {
				return user.VoipPushInput.encode(request).finish();
			},
			user.VoipPushResponse.decode
		);
	}

	static sendUserAvailableForCall() {
		return RPC.rpcCall(
			"/user.UserService/SetUserAvailableForCall",
			{},
			commonmessages.Empty,
			(request) => {
				return commonmessages.Empty.encode(request).finish();
			},
			commonmessages.Empty.decode
		);
	}

	static getTwilioIceServers() {
		return RPC.rpcCall(
			"/user.UserService/GetTwilioIceServers",
			{},
			user.TwilioIceServersResponse,
			(request) => {
				return commonmessages.Empty.encode(request).finish();
			},
			user.TwilioIceServersResponse.decode
		);
	}

	static updateUserProfile(userInfo) {
		console.log("udate user ", userInfo);

		return RPC.rpcCall(
			"/user.UserService/UpdateUserProfile",
			userInfo,
			user.UpdateUserProfileResponse,
			(request) => {
				console.log("let see the request", request);

				return user.User.encode(request).finish();
			},
			user.UpdateUserProfileResponse.decode
		);
	}

	static getShipDetails(payload) {
		return RPC.rpcCall("/user.UserService/getShipDetails", payload);
	}

	static getLevel3Ranks() {
		return RPC.rpcCall("/user.UserService/GetLevel3Ranks");
	}

	static getContacts(data) {
		return RPC.rpcCall(
			"/user.UserService/GetContacts",
			data,
			user.ContactsResponse,
			(request) => {
				return commonmessages.SelectedDomainInput.encode(request).finish();
			},
			user.ContactsResponse.decode
		);
	}
	static getBotSubscriptionsInfo(data) {
		return RPC.rpcCall(
			"/UserService/GetUserBotMetaData",
			data,
			user.BotSubscriptionsInfoResponse,
			(request) => {
				return commonmessages.SelectedDomainInput.encode(request).finish();
			},
			user.BotSubscriptionsInfoResponse.decode
		);
	}

	static getContactHistory(data) {
		return RPC.rpcCall(
			"/user.UserService/GetCallHistoryForContact",
			data,
			user.CallHistoryResponse,
			(request) => {
				return user.CallHistoryInput.encode(request).finish();
			},
			user.CallHistoryResponse.decode
		);
	}

	static preConnectCallCheck(checkInfo) {
		return RPC.rpcCall(
			"/user.UserService/PreConnectCallCheck",
			checkInfo,
			user.PreConnectCallCheckResponse,
			(request) => {
				return user.PreConnectCallCheckInput.encode(request).finish();
			},
			user.PreConnectCallCheckResponse.decode
		);
	}

	static fetchBotSubscriptions(data) {
		return RPC.rpcCall(
			"/UserService/GetUserBotMetaData",
			data,
			user.BotSubscriptionsResponse,
			(request) => {
				return commonmessages.SelectedDomainInput.encode(request).finish();
			},
			user.BotSubscriptionsResponse.decode
		);
	}

	static subscribeBot(req) {
		// console.log("subscribe req ", req);

		return RPC.rpcCall(
			"/user.UserService/SubscribeBot",
			req,
			user.SubscribeBotResponse,
			(request) => {
				return user.SubscribeBotInput.encode(request).finish();
			},
			user.SubscribeBotResponse.decode
		);
	}
	static GetVoipStatus(req) {
		// console.log("GetVoipStatus req ", req);

		return RPC.rpcCall(
			"/user.UserService/GetVoipStatus",
			req,
			user.VoipStatusResponse,
			(request) => {
				return user.VoipStatusInput.encode(request).finish();
			},
			user.VoipStatusResponse.decode
		);
	}

	//todo change it to new method for web or pass appropriate params.
	static generateTwilioToken(data) {
		return RPC.rpcCall(
			"/user.UserService/GenerateWebTwilioToken",
			data,
			user.TwilioTokenResponse,
			(request) => {
				return user.TwilioTokenInput.encode(request).finish();
			},
			user.TwilioTokenResponse.decode
		);
	}

	static subscribeDomain(req) {
		return RPC.rpcCall(
			"/user.UserService/SubscribeDomain",
			req,
			user.SubscribeDomainResponse,
			(request) => {
				return user.SubscribeDomainInput.encode(request).finish();
			},
			user.SubscribeDomainResponse.decode
		);
	}

	static updateTnC(accepted) {
		return RPC.rpcCall(
			"/user.UserService/ManageTnc",
			{ action: accepted ? "accept" : "reject" },
			user.ManageTncResponse,
			(request) => {
				return user.ManageTncInput.encode(request).finish();
			},
			user.ManageTncResponse.decode
		);
	}

	static getDomain() {
		return RPC.rpcCall(
			"/UserService/GetDomainsMetaData",
			{},
			user.UserDomainsResponse,
			(request) => {
				return commonmessages.Empty.encode(request).finish();
			},
			user.UserDomainsResponse.decode
		);
	}

	static updateLastLoggedInDomain(data) {
		return RPC.rpcCall(
			"/user.UserService/UpdateLastLoggedInDomain",
			data,
			commonmessages.Empty,
			(request) => {
				return user.LastLoggedInDomainInput.encode(request).finish();
			},
			commonmessages.Empty.decode
		);
	}

	static getCallHistory() {
		return RPC.rpcCall(
			"/user.UserService/GetCallHistory",
			{},
			user.CallHistoryResponse,
			(request) => {
				return commonmessages.Empty.encode(request).finish();
			},
			user.CallHistoryResponse.decode
		);
	}

	static getPaginatedCallHistory(startTime) {
		let data = { startTime: startTime };
		return RPC.rpcCall(
			"/user.UserService/GetPaginatedCallHistory",
			data,
			user.PaginatedCallHistoryResponse,
			(request) => {
				return user.PaginatedCallHistoryInput.encode(request).finish();
			},
			user.PaginatedCallHistoryResponse.decode
		);
	}

	static getAllSystemBots() {
		return RPC.rpcCall(
			"/user.UserService/GetSystemBots",
			{},
			user.SystemBotsResponse,
			(request) => {
				return commonmessages.Empty.encode(request).finish();
			},
			user.SystemBotsResponse.decode
		);
	}
}

export default UserServiceClient;
