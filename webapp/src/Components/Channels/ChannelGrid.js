import React, { Component } from "react";
import Avatar from "../Common/Avatar";
import Config from "../../Utils/Config";
import _ from "lodash";
import { getChannelAdmins } from "../../Services/ChannelsService";
const R = require("ramda");
class ChannelGrid extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// channelRequest: this.props.channel.requestSent,
			channel: null,
			owner: false,
			channelImg: null,
		};
	}

	componentDidMount() {
		if (this.props.channel) {
			this.loadChannelImg(this.props.channel);
			this.setState({
				channel: this.props.channel,
				owner: this.props.owner,
			});
			this.getAllChannelAdmins(this.props.channel);
		}
	}

	getAllChannelAdmins = (channel) => {
		getChannelAdmins(channel)
			.then((admins) => {
				const isAdmin =
					admins.filter((user) => user.userId === this.props.userId).length > 0
						? true
						: false;
				this.setState({ isAdmin });
			})
			.catch((error) => {
				console.log("Error on getting new data for admin", error);
			});
	};

	componentDidUpdate(prevProps) {
		if (!_.isEqual(this.props.channel, prevProps.channel)) {
			this.loadChannelImg(this.props.channel);
			this.setState({
				channel: this.props.channel,
			});
			// this.getAllChannelAdmins(this.props.channel);
		}
	}

	loadChannelImg = (channelData) => {
		if (channelData.logo !== "ChannelsBotLogo.png") {
			let img = `${R.prop("contentURL", Config)}channelLogos/${
				channelData.logo
			}`;
			this.setState({
				channelImg: img,
			});
		}
	};

	getActions = () => {
		let props = this.props;
		let checkOwner = false;
		let ownerId =
			props.channel.channelOwner && props.channel.channelOwner.userId;

		// console.log("channel details", ownerId, props.userId);

		if (ownerId === props.userId) {
			checkOwner = true;
		}

		// let { subscribed } = this.props.channel;

		if (checkOwner) {
			return (
				<div>
					<a
						onClick={() => {
							props.open(props.channel);
						}}
						className="btn btn-sm btn-open"
					>
						Open
					</a>
				</div>
			);
		} else {
			return (
				<div>
					<a
						onClick={() => {
							props.open(props.channel);
						}}
						className="btn btn-sm btn-open"
					>
						Open
					</a>
					<a
						onClick={() => {
							if (!checkOwner) {
								this.props.unsubscribe(props.channel, (err) => {
									console.log("we will check err ", err);
								});
							} else {
								alert("You can't unsubscribe because you are the owner.");
							}
						}}
						className="btn btn-sm btn-outline-info btn-install ml-2"
					>
						Unsubscribe
					</a>
				</div>
			);
		}

		/*if (subscribed) {
	  return (
		<div>
		  <a
			onClick={() => {
			  props.open(props.channel);
			}}
			className="btn btn-sm btn-open"
		  >
			Open
		  </a>
		  <a
			onClick={() => {
			  console.log(checkOwner);
			  if (!checkOwner) {
				props.unsubscribe(props.channel, (err) => {
				  console.log("we will check err ", err);
				});
			  } else {
				alert("You can't unsubscribe because you are the owner.");
			  }
			}}
			className="btn btn-sm btn-outline-info btn-install ml-2"
		  >
			Unsubscribe
		  </a>
		</div>
	  );
	} else if (props.owner) {
	  return (
		<div>
		  <a
			onClick={() => {
			  props.open(props.channel);
			}}
			className="btn btn-sm btn-open"
		  >
			Open
		  </a>
		</div>
	  );
	} else {
	  if (props.channel.discoverable === "public") {
		return (
		  <div>
			<a
			  onClick={() => {
				props.subscribe(props.channel);
			  }}
			  className="btn btn-sm btn-open"
			>
			  Subscribe
			</a>
		  </div>
		);
	  } else {
		if (this.state.channelRequest) {
		  return (
			<div>
			  <a
				className="btn btn-sm btn-outline-info btn-install ml-2"
				disabled
			  >
				Request sent
			  </a>
			</div>
		  );
		} else {
		  return (
			<div>
			  <a
				onClick={() => {
				  props.sendRequest(props.channel);
				  this.setState({ channelRequest: true });
				}}
				className="btn btn-sm btn-open"
			  >
				Send request
			  </a>
			</div>
		  );
		}
	  }
	}*/
	};

	render() {
		let { channel, owner, isAdmin, channelImg } = this.state;
		// console.log("channel details in a grid ", this.state);
		let trimmedChannelName = "";
		if (channel) {
			if (channel.channelName.length > 30) {
				trimmedChannelName = channel.channelName.substr(0, 20) + "...";
			} else {
				trimmedChannelName = channel.channelName;
			}
		}
		if (channel) {
			return (
				<div
					className="card box-shadow-custom box-border-radius-10"
					style={{ borderRadius: "10px", border: "0px" }}
				>
					<div className="card-header px-2 py-0">
						<div
							style={{
								padding: "10px",
								borderRight: "1px solid #edf2f4",
							}}
						>
							{channel && !channelImg ? (
								<Avatar
									name={channel.channelName}
									size={40}
									height={40}
									color="bg-info"
								/>
							) : (
								<Avatar
									style={{ marginRight: "10px", borderRadius: "50%" }}
									imgSrc={channelImg}
									size={40}
									height={40}
								/>
							)}
						</div>
						<div
							className="d-flex justify-content-between"
							style={{
								width: "100%",
							}}
						>
							<div style={{ width: "100%" }}>
								<h3
									className="title mb-0 flex mr-auto order-0 ml-3"
									style={{
										color: "#666666",
										fontWeight: 600,
										textOverflow: "ellipsis",
										overflow: "hidden",
										whiteSpace: "nowrap",
									}}
									title={channel.channelName}
								>
									{trimmedChannelName}
								</h3>
								<div
									className="ml-3"
									style={{ fontSize: "10px", color: "#999999" }}
								>
									{"Created by " +
										(owner
											? "you "
											: channel.channelOwner
											? channel.channelOwner.userName + " "
											: "") +
										(channel.createdOn
											? "on " + new Date(channel.createdOn).toLocaleDateString()
											: "")}
								</div>
							</div>
							<div>
								<a
									onClick={() => {
										this.props.editChannel(channel);
									}}
								>
									{owner || isAdmin ? (
										<i className="icon-pencil fs16 pull-right" />
									) : (
										<i className="fa fa-info-circle fa-lg pull-right" />
									)}
								</a>
							</div>
						</div>
					</div>

					<div className="card-body px-2 d-flex justify-content-center align-items-center flex-column">
						{/* <div>
            <span style={{ color: "#65d594" }}>
              {channel.discoverable === "public" ? "Public" : "Private"}
            </span>
            &nbsp;|&nbsp;
            <span style={{ color: "#638DFF" }}>
              {channel.channelType === "platform"
                ? "Platform Group"
                : "Team Group"}
            </span>
          </div> To hide the two fields channel type and channel visibility this part of code was commented */}
						<div
							style={{
								color: "#999999",
								width: "300px",
								textOverflow: "ellipsis",
								overflow: "hidden",
								whiteSpace: "nowrap",
								textAlign: "center",
							}}
						>
							{channel.description}
						</div>
						<div className="d-flex justify-content-around align-items-start mt-3">
							{this.getActions()}
						</div>
					</div>
				</div>
			);
		} else return null;
	}
}

export default ChannelGrid;
