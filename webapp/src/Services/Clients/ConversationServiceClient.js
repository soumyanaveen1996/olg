import ConversationService from "../gRPC/Generated/ConversationService";
import ServiceClientUtils from "./ServiceClientUtils";
import RPC from "./RPC";
const conversation = ConversationService.conversation;
const commonmessages = ConversationService.commonmessages;

class ConversationServiceClient {
	static fetchTimeLine() {
		return RPC.rpcCall(
			"/conversation.ConversationService/GetTimeline",
			{ isWebRequest: true },
			conversation.TimelineResponse,
			(request) => {
				return conversation.TimeLineInput.encode(request).finish();
			},
			conversation.TimelineResponse.decode
		).then((response) => {
			if (response) {
				let recents = response.content ? response.content.conversations : [];
				let favourites = response.content ? response.content.favourites : [];

				recents.forEach((conversation) => {
					let lm = conversation.lastMessage;
					if (lm) {
						conversation.lastMessage = ServiceClientUtils.parseBytesContent(lm);
					}
				});

				favourites.forEach((conversation) => {
					let lm = conversation.lastMessage;
					if (lm) {
						conversation.lastMessage = ServiceClientUtils.parseBytesContent(lm);
					}
				});
			}
			return response;
		});
	}

	static updateMessageStatusForUser(reqInfo) {
		return RPC.rpcCall(
			"/conversation.ConversationService/UpdateMessageStatusForUser",
			reqInfo,
			conversation.MessageStatusResponse,
			(request) => {
				return conversation.MessageStatusInput.encode(request).finish();
			},
			conversation.MessageStatusResponse.decode,
			{},
			true
		);
	}

	static fetchFavourite(reqInfo) {
		return RPC.rpcCall(
			"/conversation.ConversationService/GetFavouriteConversations",
			reqInfo,
			conversation.FavouritesResponse,
			(request) => {
				return commonmessages.SelectedDomainInput.encode(request).finish();
			},
			conversation.FavouritesResponse.decode,
			{},
			true
		);
	}

	static fetchArchivedMessages(conversationId, botId) {
		return RPC.rpcCall(
			"/conversation.ConversationService/GetArchivedMessages",
			{ conversationId, botId },
			conversation.GetArchivedMessagesResponse,
			(request) => {
				return conversation.GetArchivedMessagesInput.encode(request).finish();
			},
			conversation.GetArchivedMessagesResponse.decode,
			{},
			true
		);
	}

	static fetchPaginatedArchiveMessage(conversationId, botId, startTime, fetchDirection = 'OLDER') {
		return RPC.rpcCall(
			"/conversation.ConversationService/GetPaginatedArchivedMessages",
			{ conversationId, botId, fetchDirection, startTime },
			conversation.GetPaginatedArchivedMessagesResponse,
			(request) => {
				return conversation.GetPaginatedArchivedMessagesInput.encode(
					request
				).finish();
			},
			conversation.GetPaginatedArchivedMessagesResponse.decode,
			{},
			true
		);
	}

	static fetchConversationDetails(conversationId, botId, createdBy) {
		return RPC.rpcCall(
			"/conversation.ConversationService/GetConversationDetails",
			{ conversationId, botId, createdBy },
			conversation.GetConversationDetailsResponse,
			(request) => {
				return conversation.GetConversationDetailsInput.encode(
					request
				).finish();
			},
			conversation.GetConversationDetailsResponse.decode,
			{},
			true
		);
	}

	static updateFavourites(reqInfo) {
		return RPC.rpcCall(
			"/conversation.ConversationService/UpdateFavourites",
			reqInfo,
			conversation.UpdateFavouritesResponse,
			(request) => {
				return conversation.UpdateFavouritesInput.encode(request).finish();
			},
			conversation.UpdateFavouritesResponse.decode,
			{},
			true
		);
	}

	static getCatalog(req, noSpinner) {
		return RPC.rpcCall(
			"/conversation.ConversationService/GetCatalog",
			req,
			conversation.CatalogResponse,
			(request) => {
				return conversation.CatalogInput.encode(request).finish();
			},
			conversation.CatalogResponse.decode,
			{},
			noSpinner
		);
	}
}

export default ConversationServiceClient;
