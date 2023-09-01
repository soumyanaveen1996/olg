import {
	createNewChannel,
	deleteChannel,
	getSubscribedChannels,
	getUnsubscribedChannels,
	subscribeChannel,
	unsubscribeChannel,
	changeChannelOwner,
	fetchPendingParticipants,
	requestAccessToPrivateChannel,
	getChannelAdmins,
} from "../../Services/ChannelsService";
import {
	getTimeLine,
	parseMessages,
	removeConversationFromFavourites,
} from "./chats";

export const CHANNELS_RECEIVED = "CHANNELS_RECEIVED";
export const SUBSCRIBED_CHANNELS_RECEIVED = "SUBSCRIBED_CHANNELS_RECEIVED";
export const UPDATE_CHANNEL = "UPDATE_CHANNEL";
export const UPDATE_FILTERS = "UPDATE_FILTERS";
export const CLEAR_FILTERS = "CLEAR_FILTERS";
export const UPDATE_CHANNEL_SEARCH_KEY = "UPDATE_CHANNEL_SEARCH_KEY";

export function fetchAllChannels(selectedDomain) {
	// console.log("fetch all domain ", selectedDomain);
	return (dispatch, getState) => {
		let domain = getState();
		// let domains = getState().user.user.domains;
		// let filters = getState().channels.filters;
		let selectedDomainObj = {
			selectedDomain: selectedDomain.userDomain,
		};
		Promise.all([
			getSubscribedChannels(selectedDomainObj),
			getUnsubscribedChannels(selectedDomainObj),
		]).then((response) => {
			let [subscribed = [], unsubscribed = []] = response;
			subscribed.forEach((s) => (s.subscribed = true));

			dispatch({
				type: CHANNELS_RECEIVED,
				data: {
					channels: subscribed.concat(unsubscribed),
					subscribed: subscribed,
				},
			});
			// dispatch(applyFilters(filters));
		});
	};
}

export function updateChannelList(rawMessage) {
	return (dispatch, getState) => {
		const allSubscibedChannels = getState().subscribed;
		const parsed_message = parseMessages(rawMessage);
		const channel = parsed_message[0].message;
		const channelDetails = { ...channel };

		switch (parseInt(rawMessage.contentType)) {
			case 11001:
				console.log(
					"added to new channel",
					channelDetails,
					allSubscibedChannels
				);
				break;
			case 11002:
				console.log(
					"unsubscribe to channel",
					channelDetails,
					allSubscibedChannels
				);
				break;
		}
	};
}

export function getPendingParticipants(channel) {
	return (dispatch, getState) => {
		fetchPendingParticipants(channel.channelName, channel.userDomain).then(
			(data) => {
				// console.log("get all pending request ", data);
				dispatch({
					type: UPDATE_CHANNEL,
					data: { channel, pendingRequests: [...data] },
				});
			}
		);
	};
}

export function fetchSubscribedChannels(domainSelected) {
	return (dispatch, getState) => {
		// let domains = getState().user.user.domains;
		// console.log("fetchSubscribedChannels ====== ", domainSelected);
		getSubscribedChannels(domainSelected).then((subscribed) => {
			dispatch({
				type: SUBSCRIBED_CHANNELS_RECEIVED,
				data: { channels: subscribed },
			});
		});
	};
}

export function doSubscribeChannel(channel) {
	// console.log("channle details", channel);

	let domainChannels = [
		{ userDomain: channel.userDomain, channels: [channel.channelName] },
	];
	return (dispatch, getState) => {
		subscribeChannel(domainChannels).then((data) => {
			channel.subscribed = true;
			dispatch({
				type: UPDATE_CHANNEL,
				data: { channel, subscribed: true },
			});
		});
	};
}

export function doUnsubscribeChannel(channel, callback) {
	return (dispatch, getState) => {
		unsubscribeChannel(channel.userDomain, channel.channelName)
			.then((data) => {
				if (data.error && data.error !== "0") {
					console.error("there is an error");
					throw { error: data.error };
				}

				channel.subscribed = false;

				dispatch({
					type: UPDATE_CHANNEL,
					data: { channel, subscribed: false },
				});
				dispatch(getTimeLine());
			})
			.catch((err) => {
				console.log("through user doUnsubscribeChannel", err);
				callback(err);
			});
	};
}

export function createChannel(channelData, callback) {
	return (dispatch) => {
		createNewChannel(channelData)
			.then((data) => {
				// dispatch(fetchCreatedChannels());
				callback(null);
			})
			.catch((err) => {
				callback(err);
			});
	};
}

export function deleteMyChannel(channelData, callback) {
	return (dispatch) => {
		deleteChannel(channelData)
			.then((data) => {
				callback(null);
			})
			.catch((err) => {
				callback(err);
			});
	};
}

export function changeOwner(channelData, callback) {
	return (dispatch) => {
		changeChannelOwner(channelData)
			.then((data) => {
				callback(null);
			})
			.catch((err) => {
				callback(err);
			});
	};
}

export function channelAdmins(channel) {
	return (dispatch, getState) => {
		getChannelAdmins(channel)
			.then((data) => {
				console.log("all channel asmindssss", data);

				if (data.error && data.error !== "0") {
					console.error("there is an error");
					throw { error: data.error };
				}

				dispatch({
					type: UPDATE_CHANNEL,
					data: { channel, channelAdmins: data },
				});
			})
			.catch((err) => {
				return err;
			});
	};
}

export function subscriptionRequest(channel, callback) {
	return (dispatch) => {
		requestAccessToPrivateChannel(channel).then((data) => {
			dispatch({
				type: UPDATE_CHANNEL,
				data: { channel, requestSent: true },
			});
		});
	};
}

// export function fetchingPendingParticipants(channel){
//   return
// }

export function updateChannelSearchKey(searchKey) {
	return {
		type: UPDATE_CHANNEL_SEARCH_KEY,
		data: { searchKey },
	};
}

export function applyFilters(filters) {
	// console.log("we will se +++++++++++++++", filters);

	return {
		type: UPDATE_FILTERS,
		data: { filters },
	};
}

export function clearFilters() {
	return {
		type: CLEAR_FILTERS,
		data: {},
	};
}
