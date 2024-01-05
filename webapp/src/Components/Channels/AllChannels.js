import React, { Component } from "react";
import ChannelGrid from "./ChannelGrid";
import NewChannel from "./NewChannel";
import ModalPopup from "./../ModalMessages/ModalPopup";
class AllChannels extends Component {
	openChannel = (channel) => {
		this.props.history.push("/offlinelms/app/chats");
		this.props.initiateChannelConversation(channel, () => {});
	};
	state = {};
	showCreateChannel = () => {
		this.setState({ newChannel: true });
	};

	hideCreateChannel = () => {
		this.setState({ newChannel: false });
	};
	render() {
		let {
			filtered: channels,
			userId,
			subscribedChannels,
			searched,
			searchKey,
		} = this.props;
		let { newChannel } = this.state;
		// console.log("get all channel list", channels);
		return (
			<div>
				<div className="flex">
					<div className="pt-2">
						<div className="container-fluid">
							{searched && searched.length > 0 ? (
								<div className="row">
									{searched.map((channel) => {
										return (
											<div
												className="col-md-4 col-sm-6 Catalog-bp"
												key={channel.channelId}
											>
												<ChannelGrid
													owner={
														channel.channelOwner &&
														channel.channelOwner.userId === this.props.userId
													}
													userId={userId}
													channel={channel}
													channels={channels}
													open={this.openChannel}
													removeConversationFromFavourites={
														this.props.removeConversationFromFavourites
													}
													selectedDomain={this.props.selectedDomain}
													favourites={this.props.favourites}
													unsubscribe={(data, fn) =>
														this.props.unsubscribeChannel(data, fn)
													}
													subscribe={this.props.subscribeChannel}
													sendRequest={this.props.subscriptionRequest}
													editChannel={this.props.editChannel}
												/>
											</div>
										);
									})}
								</div>
							) : (
								<div className="row">
									{!searchKey &&
										subscribedChannels.map((channel) => {
											return (
												<div
													className="col-md-4 col-sm-6 Catalog-bp"
													key={channel.channelId}
												>
													<ChannelGrid
														owner={
															channel.channelOwner &&
															channel.channelOwner.userId === this.props.userId
														}
														userId={userId}
														channel={channel}
														channels={channels}
														open={this.openChannel}
														removeConversationFromFavourites={
															this.props.removeConversationFromFavourites
														}
														selectedDomain={this.props.selectedDomain}
														favourites={this.props.favourites}
														unsubscribe={(data, fn) =>
															this.props.unsubscribeChannel(data, fn)
														}
														subscribe={this.props.subscribeChannel}
														sendRequest={this.props.subscriptionRequest}
														editChannel={this.props.editChannel}
													/>
												</div>
											);
										})}
								</div>
							)}

							{((searchKey && searched.length === 0) ||
								!subscribedChannels ||
								!subscribedChannels.length) && (
								<div className="">
									<div className="row justify-content-center">
										<img
											loading="lazy"
											src="/offlinelms/img/empty-state-channels@2x.png"
											style={{ width: "400px" }}
										/>
									</div>
									<p
										style={{
											textAlign: "center",
											padding: "20px",
										}}
									>
										You are not subscribed to any group.
										<br /> Search or create a new one.
									</p>
									<a
										onClick={this.showCreateChannel}
										className="btn btn-block btn-md btn-icon code-btn"
										style={{ margin: "auto", display: "block" }}
									>
										{" "}
										New Group{" "}
									</a>
									{newChannel && (
										<ModalPopup
											onClose={this.hideCreateChannel}
											size="sm"
											noHeader
										>
											<NewChannel
												cancel={this.hideCreateChannel}
												fetchAllChannels={this.props.fetchAllChannels}
												// channels={channels}
											/>
										</ModalPopup>
									)}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default AllChannels;
