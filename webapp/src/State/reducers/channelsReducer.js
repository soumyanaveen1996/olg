import {
	SUBSCRIBED_CHANNELS_RECEIVED,
	CHANNELS_RECEIVED,
	UPDATE_CHANNEL,
	UPDATE_FILTERS,
	CLEAR_FILTERS,
	UPDATE_CHANNEL_SEARCH_KEY,
} from "../actions/channels";
import { filterChannels } from "../../Services/ChannelsService";
import { LOGOUT_USER, USER_LOGGED_IN } from "../actions/user";

function getInitialFilters() {
	return {
		subscribed: { value: false, label: "Subscribed" },
		created: { value: false, label: "Created" },
		unsubscribed: { value: false, label: "Unsubscribed" },
		team: { value: null, label: "Team" },
		platform: { value: false, label: "Platform" },
		publicChannel: { value: false, label: "Public" },
	};
}

let initialState = {
	channels: [],
	filtered: [],
	subscribed: [],
	searched: [],
	filters: getInitialFilters(),
	searchKey: null,
};

function channelsReducer(state = initialState, action) {
	switch (action.type) {
		case CHANNELS_RECEIVED: {
			const filteredChannels = filterChannels(
				action.data.subscribed,
				null,
				null,
				state.user
			);
			return {
				...state,
				channels: [].concat(action.data.channels),
				filtered: [].concat(filteredChannels),
			};
		}
		case SUBSCRIBED_CHANNELS_RECEIVED:
			return {
				...state,
				subscribed: [].concat(action.data.channels),
			};

		case UPDATE_CHANNEL: {
			let channels = state.channels;
			let filtered = state.filtered;
			let channel = action.data.channel;
			let subscribed = state.subscribed;
			let index = channels.findIndex((c) => c.channelId === channel.channelId);
			let fIndex = filtered.findIndex((c) => c.channelId === channel.channelId);
			channels[index] = { ...channel };
			if (fIndex !== -1) {
				filtered[fIndex] = { ...channel };
			}

			if (action.data.pendingRequests) {
				channels[index] = {
					...channel,
					pendingRequests: [...action.data.pendingRequests],
				};
			}

			if (action.data.channelAdmins) {
				channels[index] = {
					...channel,
					channelAdmins: [...action.data.channelAdmins],
				};
			}

			let newState = {
				...state,
				channels: [...channels],
				filtered: [...filtered],
			};

			if (action.data.subscribed) {
				newState.subscribed = [channel, ...subscribed];
			} else {
				let subscribedIndex = subscribed.findIndex(
					(c) => c.channelId === channel.channelId
				);
				newState.subscribed = [
					...subscribed.slice(0, subscribedIndex),
					...subscribed.slice(subscribedIndex + 1),
				];
			}
			return newState;
		}

		case UPDATE_FILTERS: {
			let filters = action.data.filters;
			// console.log("in reducers the filter ", filters);

			return {
				...state,
				filters,
				filtered: filterChannels(
					state.channels,
					filters,
					state.searchKey,
					state.user
				),
			};
		}

		case CLEAR_FILTERS:
			return {
				...state,
				filters: { ...getInitialFilters() },
				filtered: filterChannels(
					state.channels,
					null,
					state.searchKey,
					state.user
				),
			};

		case UPDATE_CHANNEL_SEARCH_KEY:
			return {
				...state,
				searchKey: action.data.searchKey,
				searched: filterChannels(
					state.subscribed,
					state.filters,
					action.data.searchKey,
					state.user
				),
				filtered: filterChannels(
					state.subscribed,
					state.filters,
					action.data.searchKey,
					state.user
				),
			};

		case USER_LOGGED_IN:
			return {
				...state,
				user: action.data.user,
			};

		case LOGOUT_USER:
			return { ...initialState };

		default:
			return state;
	}
}

export default channelsReducer;
