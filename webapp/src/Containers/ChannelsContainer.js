import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import {
	applyFilters,
	clearFilters,
	doSubscribeChannel,
	doUnsubscribeChannel,
	subscriptionRequest,
	getPendingParticipants,
	fetchAllChannels,
	fetchSubscribedChannels,
	channelAdmins,
} from "../State/actions/channels";
import ChannelsView from "../Components/Channels/ChannelsView";
import {
	initiateChannelConversation,
	changeSelectedConversation,
	removeConversationFromFavourites,
} from "../State/actions/chats";
import { showSpinner } from "../State/actions/spinner";

class ChannelsContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedDomain: null,
		};
	}
	componentDidMount() {
		window.document.title = "Groups";
		let domain = {};
		if (this.props.selectedDomain) {
			domain = {
				selectedDomain: this.props.selectedDomain.userDomain,
			};

			this.setState({ selectedDomain: { ...this.props.selectedDomain } });
		}

		console.log("Loaded Channels", this.props.selectedDomain);
		this.props.changeSelectedConversation(null, false);

		this.props.fetchAllChannels(domain);

		this.props.fetchSubscribedChannels(domain);
	}

	componentDidUpdate(prevProps) {
		if (!_.isEqual(this.props.selectedDomain, prevProps.selectedDomain)) {
			this.setState({ selectedDomain: { ...this.props.selectedDomain } });
		}
	}

	unsubscribeThisChannel = (data, fn) => {
		let allFavourites = this.props.favourites || [];
		if (allFavourites && allFavourites.length) {
			let conversationId;
			let userDomain = this.props.selectedDomain.userDomain;
			let favElement = allFavourites.filter((favElem) => {
				if (favElem.channel) {
					if (favElem.channel.channelName === data.channelName) {
						return favElem.conversationId;
					}
				}
			});
			if (favElement && favElement.length) {
				conversationId = favElement[0].conversationId;
				this.props.removeConversationFromFavourites(
					conversationId,
					userDomain,
					true
				);
			}
		}
		this.props.doUnsubscribeChannel(data, fn);
	};

	render() {
		return (
			<ChannelsView
				{...this.props}
				unsubscribeThisChannel={(data, fn) =>
					this.unsubscribeThisChannel(data, fn)
				}
			/>
		);
	}
}

const mapActionToProps = {
	fetchAllChannels,
	initiateChannelConversation,
	subscribeChannel: doSubscribeChannel,
	doUnsubscribeChannel: doUnsubscribeChannel,
	subscriptionRequest,
	channelAdmins,
	getPendingParticipants,
	applyFilters: applyFilters,
	clearFilters: clearFilters,
	fetchSubscribedChannels: fetchSubscribedChannels,
	removeConversationFromFavourites: removeConversationFromFavourites,
	changeSelectedConversation,
	showSpinner: showSpinner,
};

const mapDataToProps = (state) => {
	let filtersUpdate = state.channels.filters;

	return {
		user: state.user.user,
		userId: state.user.user.userId,
		channels: state.channels.channels,
		filtered: state.channels.filtered,
		searched: state.channels.searched,
		filters: filtersUpdate,
		subscribedChannels: state.channels.subscribed,
		selectedDomain: state.selectedDomain,
		favourites: state.chats.favourites || [],
		searchKey: state.channels.searchKey,
	};
};

export default connect(mapDataToProps, mapActionToProps)(ChannelsContainer);
