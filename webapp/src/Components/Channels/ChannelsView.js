import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import AllChannels from "./AllChannels";
import "./../Catalog/Catalog.css";
import ModalPopup from "../ModalMessages/ModalPopup";
import EditChannel from "./EditChannel";
import {
	fetchPendingParticipants,
	fetchChannelParticipants,
	getChannelAdmins,
} from "../../Services/ChannelsService";
import Config from "../../Utils/Config";
import _ from "lodash";
const R = require("ramda");

class ChannelsView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			backgroundUrl: null,
			backgroundStyling: null,
		};
	}

	componentDidMount() {
		let { selectedDomain } = this.props;
		let selectedDomainObj = _.cloneDeep(selectedDomain);
		let bgUrl;
		console.log("backgroundUrl", bgUrl);
		if (selectedDomainObj.backgroundUrl === "white") {
			bgUrl = selectedDomainObj.backgroundUrl;
		} else {
			bgUrl = selectedDomainObj?.backgroundUrl
				? R.prop("contentURL", Config) + selectedDomainObj.backgroundUrl
				: "/img/welcomescreen-background.png";
		}
		this.setState({
			backgroundUrl: bgUrl,
		});
	}

	componentDidUpdate(prevProps) {
		if (
			this.props.selectedDomain &&
			!_.isEqual(this.props.selectedDomain, prevProps.selectedDomain)
		) {
			let { selectedDomain } = this.props;
			let selectedDomainObj = _.cloneDeep(selectedDomain);
			let bgUrl = selectedDomainObj?.backgroundUrl
				? R.prop("contentURL", Config) + selectedDomainObj.backgroundUrl
				: "/img/welcomescreen-background.png";
			this.setState({
				backgroundUrl: bgUrl,
			});
		}
	}
	setbackGroundUrl = () => {
		if (this.state.backgroundUrl) {
			if (this.state.backgroundUrl === "white") {
				return "#ffffff";
			} else return `url(${this.state.backgroundUrl}) no-repeat center`;
		} else {
			return 'url("/img/welcomescreen-background.png") no-repeat center';
		}
	};

	openChannelEdit = (channel) => {
		fetchPendingParticipants(channel.channelName, channel.userDomain)
			.then((data) => {
				channel.pendingRequests = [...data];
				fetchChannelParticipants(channel.channelName, channel.userDomain).then(
					(participantData) => {
						// console.log("participant data", participantData);
						if (participantData) {
							channel.memberDetails = [...participantData];
						}

						getChannelAdmins(channel).then((adminData) => {
							// console.log("all admin data ", adminData);
							if (adminData && adminData.length > 0) {
								channel.channelAdmins = [...adminData];
							}
							this.setState({ edit: channel });
						});
					}
				);
			})
			.catch((err) => {
				console.log("getting error", err);
			});
	};

	closeChannelEdit = () => {
		this.setState({ edit: null });
	};

	updateChannel = (channel) => {
		this.openChannelEdit(channel);
	};

	render() {
		console.log("all channels", this.props);

		return (
			<div className="flex d-flex">
				<div
					className="Catalog-chatarea bg-size-cover d-flex"
					style={{
						width: "100%",
						height: "100%",
						background: this.setbackGroundUrl(),
					}}
				>
					<div className="sidebar-body flex d-flex" id="app-body">
						<div className="d-flex flex flex-column">
							<Scrollbars
								autoHide
								style={{ height: "calc(100vh - 60px - 60px)" }}
							>
								<div className="flex ">
									<div className="p-3 mt-auto">
										<AllChannels
											{...this.props}
											// unsubscribeThisChannel={this.props.unsubscribeThisChannel}
											unsubscribeChannel={(data, fn) =>
												this.props.unsubscribeThisChannel(data, fn)
											}
											editChannel={this.openChannelEdit}
										/>
									</div>
								</div>
							</Scrollbars>
						</div>
					</div>
				</div>

				{this.state.edit && (
					<ModalPopup onClose={this.closeChannelEdit} size="sm" noHeader>
						<EditChannel
							channel={this.state.edit}
							cancel={this.closeChannelEdit}
							fetchAllChannels={this.props.fetchAllChannels}
							leaveChannel={this.props.doUnsubscribeChannel}
							fetchSubscribedChannels={this.props.fetchSubscribedChannels}
							callFetchChannelParticipants={this.updateChannel}
						/>
					</ModalPopup>
				)}
			</div>
		);
	}
}

export default ChannelsView;
