import React, { Component } from "react";
import { connect } from "react-redux";
import Notify from "../ModalMessages/ToastNotif";
import ChannelForm from "./ChannelForm";
import {
	editChannel,
	deleteChannel,
	updateParticipants,
} from "./../../Services/ChannelsService";
import { fetchSubscribedChannels } from "../../State/actions/channels";
import { uploadImageFile } from "../../Services/FilesService";
import {
	getFavourite,
	removeConversationFromFavourites,
} from "../../State/actions/chats";
import { element } from "prop-types";

class EditChannel extends Component {
	state = {
		imgDomainName: null,
		imgChannelName: null,
		imgFileName: null,
		imgFile: null,
	};
	giveUnique = (arr1, arr2) => {
		if (arr1.length > arr2.length) {
			return arr1.filter((e) => !arr2.includes(e));
		} else {
			return arr2.filter((e) => !arr1.includes(e));
		}
	};
	editChannel = (data) => {
		let { description, members } = data;
		let { channel } = this.props;
		let channelObj = {
			channel: {
				userDomain: channel.userDomain,
				channelName: channel.channelName,
				description: description,
			},
		};
		let propsParticpants = [...this.props.channel.participants];
		let newArry = this.giveUnique(propsParticpants, members);
		let addUserObj = {
			channelName: channel.channelName,
			userDomain: channel.userDomain,
			userIds: [...members],
		};

		editChannel(channelObj)
			.then(() => {
				if (newArry && newArry.length > 0) {
					updateParticipants(addUserObj);
				}
				this.props.cancel();
				if (this.state.imgFileName && this.state.imgFile) {
					this.uploadChannelImg(
						channel.channelId,
						this.state.imgFileName,
						this.state.imgFile
					);
				} else {
					this.fetchAllChannelsNSubChannels();
				}
			})
			.catch((error) => {
				console.error("err in editing channel", error);
				this.props.cancel();
				Notify({
					type: "error",
					message: `Error while creating the channel ${channel.channelName}. Please try again later.`,
				});
			});
	};

	fetchAllChannelsNSubChannels = () => {
		console.log("fetching everything");
		let selectedDomainObj = {
			selectedDomain: this.props.selectedDomain.userDomain,
		};
		this.props.fetchAllChannels(selectedDomainObj);
		this.props.fetchSubscribedChannels(selectedDomainObj);
		this.props.cancel();
	};

	deleteThisChannel = (data) => {
		let conversationId;
		let userDomain = this.props.selectedDomain.userDomain;
		if (this.props.favourites && this.props.favourites.length) {
			let favElement = this.props.favourites.filter((favElem) => {
				if (favElem.channel) {
					if (favElem.channel.channelName === this.props.channel.channelName) {
						return favElem.conversationId;
					}
				}
			});
			conversationId =
				favElement && favElement[0] && favElement[0].conversationId;
			if (favElement && favElement.length) {
				this.props.removeConversationFromFavourites(
					conversationId,
					userDomain,
					true
				);
			}
		}
		deleteChannel(data).then(() => {
			this.fetchAllChannelsNSubChannels();
		});
	};
	channelImgUpload = (fileName, file) => {
		this.setState({
			imgFileName: fileName,
			imgFile: file,
		});
	};

	uploadChannelImg = (channelId, fileName, file) => {
		uploadImageFile("uploadchannellogo", channelId, fileName, file)
			.then(() => {
				this.fetchAllChannelsNSubChannels();
			})
			.catch((error) => {
				console.error("error in uploading image", error);
			});
	};

	render() {
		// console.log("we will see the latest props ", this.props);
		const isOwner =
			(this.props.channel.channelOwner &&
				this.props.channel.channelOwner.userId === this.props.userId) ||
			false;
		const isAdmin =
			this.props.channel?.channelAdmins.filter(
				(user) => user.userId === this.props.userId
			).length > 0
				? true
				: false;
		return (
			<div className="page-wrapper d-flex flex align-items-center">
				<div className="container">
					<div className="row align-self-center">
						<div className="col-lg-12 ml-auto mr-auto col-md-12 col-12 mt-2">
							{isOwner ? (
								<>
									<h5>Edit Group</h5>
									<small>
										Only Group description, photo and participants can be
										modified.
									</small>
								</>
							) : (
								<h5>View Group</h5>
							)}
							<ChannelForm
								edit
								sessionId={this.props.sessionId}
								isOwner={isOwner}
								isAdmin={isAdmin}
								userId={this.props.userId}
								channel={this.props.channel}
								submitForm={this.editChannel}
								userDomains={this.props.userDomains}
								deleteChannel={this.deleteThisChannel}
								cancel={this.props.cancel}
								channelImgUpload={this.channelImgUpload}
								selectedDomain={this.props.selectedDomain}
								callFetchChannelParticipants={
									this.props.callFetchChannelParticipants
								}
								leaveThisChannel={this.props.leaveChannel}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const actions = {
	fetchSubscribedChannels: fetchSubscribedChannels,
	getFavourite: getFavourite,
	removeConversationFromFavourites: removeConversationFromFavourites,
};

const mapDataToProps = (state) => {
	// console.log("edit channel ", state.user.auth.sessionId);

	return {
		userId: state.user.user.userId,
		sessionId: state.user.auth.sessionId,
		userDomains: state.domains.domains || [],
		selectedDomain: state.selectedDomain,
		favourites: state.chats.favourites || [],
	};
};
export default connect(mapDataToProps, actions)(EditChannel);
