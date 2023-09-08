// import { channels, commonmessages } from "../gRPC/Generated/ChannelsService";

import ChannelsService from "../gRPC/Generated/ChannelsService";
import RPC from "./RPC";
const channels = ChannelsService.channels;
const commonmessages = ChannelsService.commonmessages;

class ChannelServiceClient {
	static createChannel(channelInfo) {
		return RPC.rpcCall(
			"/channels.ChannelsService/Create",
			channelInfo,
			channels.CreateChannelResponse,
			(request) => {
				return channels.CreateEditInput.encode(request).finish();
			},
			channels.CreateChannelResponse.decode
		);
	}

	static subscribeChannel(req) {
		return RPC.rpcCall(
			"/channels.ChannelsService/Subscribe",
			req,
			channels.BooleanResponse,
			(request) => {
				return channels.SubUnsubInput.encode(request).finish();
			},
			channels.BooleanResponse.decode
		);
	}

	static unsubscribeChannel(req) {
		return RPC.rpcCall(
			"/channels.ChannelsService/Unsubscribe",
			req,
			channels.BooleanResponse,
			(request) => {
				return channels.SubUnsubInput.encode(request).finish();
			},
			channels.BooleanResponse.decode
		);
	}

	static getSubscribedChannels(data) {
		return RPC.rpcCall(
			"/channels.ChannelsService/GetSubscribed",
			data,
			channels.ChannelListResponse,
			(request) => {
				return commonmessages.SelectedDomainInput.encode(request).finish();
			},
			channels.ChannelListResponse.decode
		);
	}

	static getUnsubscribedChannels(data) {
		return RPC.rpcCall(
			"/channels.ChannelsService/GetUnsubscribed",
			data,
			channels.ChannelListResponse,
			(request) => {
				return commonmessages.SelectedDomainInput.encode(request).finish();
			},
			channels.ChannelListResponse.decode
		);
	}

	static editChannel(channelInfo) {
		console.log("service data ", channelInfo);

		return RPC.rpcCall(
			"/channels.ChannelsService/Edit",
			channelInfo,
			channels.BooleanResponse,
			(request) => {
				return channels.CreateEditInput.encode(request).finish();
			},
			channels.BooleanResponse.decode
		);
	}

	static addUsersToChannel(req) {
		// console.log("service clinets =============", req);

		return RPC.rpcCall(
			"/channels.ChannelsService/AddParticipants",
			req,
			channels.BooleanResponse,
			(request) => {
				return channels.AddParticipantsInput.encode(request).finish();
			},
			channels.BooleanResponse.decode
		);
	}

	static requestAccessToPrivateChannel(req) {
		return RPC.rpcCall(
			"/channels.ChannelsService/RequestPrivateChannelAccess",
			req,
			channels.BooleanResponse,
			(request) => {
				return channels.ChannelDomainInput.encode(request).finish();
			},
			channels.BooleanResponse.decode
		);
	}

	static fetchPendingParticipants(req) {
		return RPC.rpcCall(
			"/channels.ChannelsService/GetPendingParticipants",
			req,
			channels.ParticipantsListResponse,
			(request) => {
				return channels.ChannelDomainInput.encode(request).finish();
			},
			channels.ParticipantsListResponse.decode
		);
	}

	static fetchChannelParticipants(req) {
		return RPC.rpcCall(
			"/channels.ChannelsService/GetParticipants",
			req,
			channels.ParticipantsListResponse,
			(request) => {
				return channels.ChannelDomainInput.encode(request).finish();
			},
			channels.ParticipantsListResponse.decode
		);
	}

	static authorizeParticipants(req) {
		return RPC.rpcCall(
			"/channels.ChannelsService/AuthorizeParticipants",
			req,
			channels.BooleanResponse,
			(request) => {
				return channels.AuthorizeParticipantInput.encode(request).finish();
			},
			channels.BooleanResponse.decode
		);
	}

	static deleteChannel(req) {
		return RPC.rpcCall(
			"/channels.ChannelsService/DeleteChannel",
			req,
			channels.BooleanResponse,
			(request) => {
				return channels.ChannelDomainInput.encode(request).finish();
			},
			channels.BooleanResponse.decode
		);
	}

	static changeChannelOwner(req) {
		return RPC.rpcCall(
			"/channels.ChannelsService/ChangeOwner",
			req,
			channels.BooleanResponse,
			(request) => {
				return channels.ChangeOwnerInput.encode(request).finish();
			},
			channels.BooleanResponse.decode
		);
	}
	static updateChannelAdmin(req) {
		return RPC.rpcCall(
			"/channels.ChannelsService/UpdateChannelAdmins",
			req,
			channels.BooleanResponse,
			(request) => {
				return channels.UpdateUsersInput.encode(request).finish();
			},
			channels.BooleanResponse.decode
		);
	}
	static getChannelAdmins(req) {
		return RPC.rpcCall(
			"/channels.ChannelsService/GetChannelAdmins",
			req,
			channels.ParticipantsListResponse,
			(request) => {
				return channels.ChannelDomainInput.encode(request).finish();
			},
			channels.ParticipantsListResponse.decode
		);
	}

	static findNewParticipants(req) {
		// console.log("Manish findNewParticipants req :: ", req);
		return RPC.rpcCall(
			"/channels.ChannelsService/FindNewParticipants",
			req,
			channels.FindNewParticipantsResponse,
			(request) => {
				return channels.FindNewParticipantsInput.encode(request).finish();
			},
			channels.FindNewParticipantsResponse.decode
		);
	}

	static updateParticipants(req) {
		// console.log("Manish updateParticipants req :: ", req);
		return RPC.rpcCall(
			"/channels.ChannelsService/UpdateParticipants",
			req,
			channels.BooleanResponse,
			(request) => {
				return channels.UpdateUsersInput.encode(request).finish();
			},
			channels.BooleanResponse.decode
		);
	}
}

export default ChannelServiceClient;
