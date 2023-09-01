import React, { Component } from "react";
import { connect } from "react-redux";
import AppHeader from "../Components/App/Header/AppHeader";
import {
	addConversationToFavourites,
	removeConversationFromFavourites,
} from "../State/actions/chats";
import {
	fetchAllChannels,
	updateChannelSearchKey,
} from "../State/actions/channels";
import {
	fetchContacts,
	selectedContactAction,
} from "../State/actions/contacts";
import { closeBanner } from "../State/actions/user";
import { searchCatalogue } from "../State/actions/catalogue";
import {
	setBannerVisibility,
	setCounter,
} from "../State/actions/offlineBanner";
import { makeCall } from "../State/actions/phone";

const AppHeaderContainer = (props) => {
	return <AppHeader {...props} newContactAdded={props.newContactAdded} />;
};

const mapActionsToProps = {
	addConversationToFavourites,
	removeConversationFromFavourites,
	updateChannelSearchKey: updateChannelSearchKey,
	fetchAllChannels: fetchAllChannels,
	fetchContacts: fetchContacts,
	searchCatalogue: searchCatalogue,
	setBannerVisibility: setBannerVisibility,
	setCounter: setCounter,
	makeCall,
	closeBanner,
	selectedContactAction,
};

const mapDataToProps = (state) => {
	return {
		user: state.user.user,
		isAnonymousUser: state.user.isAnonymousUser,
		selectedConversation: state.chats.selectedConversation,
		channels: state.channels.channels,
		contacts: state.contacts.accepted,
		channelSearchKey: state.channels.searchKey,
		hiddenTimeLine: state.chats.hiddenTimeLine,
		counter: state.offlineBanner.counter,
		visibility: state.offlineBanner.visibility,
		latestAPIRequest: state.offlineBanner.latestAPIRequest,
		selectedDomain: state.selectedDomain,
		bannerDetails: state.user.bannerDetails,
		selectedContactStore: state.contacts.selectedContact,
		allProfileImages: state.profileImages || {},
	};
};
export default connect(mapDataToProps, mapActionsToProps)(AppHeaderContainer);
