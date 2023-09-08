import React, { Component } from "react";
import { connect } from "react-redux";
import Notify from "../ModalMessages/ToastNotif";
import ChannelForm from "./ChannelForm";
import {
	addUsersToChannel,
	createNewChannel,
} from "./../../Services/ChannelsService";
import { fetchSubscribedChannels } from "../../State/actions/channels";
import { uploadImageFile } from "../../Services/FilesService";

class NewChannel extends Component {
	state = {
		imgDomainName: null,
		imgChannelName: null,
		imgFileName: null,
		imgFile: null,
	};
	createChannel = (data) => {
		let {
			channelName,
			description,
			channelType,
			discoverable,
			userDomain,
			members,
		} = data;

		if (!userDomain) {
			userDomain = "frontmai";
		}

		let channelData = {
			channelName,
			description,
			channelType,
			discoverable,
			userDomain,
		};
		let newChannelObj = {
			channelName,
			userDomain,
			newUserIds: [...members],
		};

		createNewChannel(channelData)
			.then((response) => {
				// console.log("createNEwChannel ===== ", response[0]);
				addUsersToChannel(newChannelObj);
				this.props.cancel();
				if (this.state.imgFileName && this.state.imgFile) {
					this.uploadChannelImg(
						response[0],
						response[0] + "." + this.state.imgFileName,
						this.state.imgFile
					);
				} else {
					this.fetchAllChannelsNSubChannels();
				}
			})
			.catch((error) => {
				if (error.errorCode === 98) {
					this.setState({ errorMsg: error.errorMessage });
				} else {
					this.props.cancel();
					Notify({
						type: "error",
						message: `Error while creating the group ${channelName}. Please try again later.`,
					});
				}
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
				console.error("error in upload channel image", error);
			});
	};

	render() {
		return (
			<div className="page-wrapper d-flex flex align-items-center">
				<div className="container">
					<div className="row align-self-center">
						<div className="col-lg-12 ml-auto mr-auto col-md-12 col-12 mt-2">
							<h5>Create New Group</h5>
							<small>Please name your group and provide a description.</small>
							<ChannelForm
								isOwner={true}
								isAdmin={true}
								errorMsg={this.state.errorMsg}
								userId={this.props.userId}
								sessionId={this.props.sessionId}
								submitForm={this.createChannel}
								channelImgUpload={this.channelImgUpload}
								userDomains={this.props.userDomains}
								cancel={this.props.cancel}
								selectedDomain={this.props.selectedDomain}
								groups={this.props.channelGroups}
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
};

const mapDataToProps = (state) => {
	return {
		userId: state.user.user.userId,
		sessionId: state.user.auth.sessionId,
		userDomains: (state.domains && state.domains.domains) || [],
		selectedDomain: state.selectedDomain,
		channelGroups: state.channels.filtered,
	};
};
export default connect(mapDataToProps, actions)(NewChannel);
