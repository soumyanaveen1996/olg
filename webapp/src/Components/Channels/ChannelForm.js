import React, { Component } from "react";
import _ from "lodash";
import { Label } from "reactstrap";
import Error from "./../Common/Error";
import Config from "../../Utils/Config";
import { validateNewChannelForm } from "../../Utils/Validator";
import ModalPopup from "../../Components/ModalMessages/ModalPopup";
import AddMembersView from "./AddMembersView";
import {
	authorizeParticipants,
	changeChannelOwner,
	updateChannelAdmin,
	getChannelAdmins,
} from "../../Services/ChannelsService";
import Avatar from "../Common/Avatar";
import ManageAdminsView from "./ManageAdminsView";
import { fetchAllChannels } from "../../State/actions/channels";
import {
	uploadChannelLogoFile,
	getChannelImgPhoto,
} from "../../Services/FilesService";
const R = require("ramda");
// eslint-disable-next-line react/no-deprecated
class ChannelForm extends Component {
	constructor(props) {
		super(props);

		if (this.props.channel) {
			this.state = {
				settingOwnerName: "",
				userDomain: "frontmai",
				ownerCheck: false,
				imgFile: null,
				error: null,
			};
		} else {
			this.state = {
				ownerCheck: false,
				discoverable: "private",
				channelType: "platform",
				userDomain: "",
				members: [],
				imgFile: null,
				error: null,
			};
		}
	}

	async componentDidMount() {
		this.updatingChannel(this.props.channel);
		this.preProcessUserDomains(this.props.userDomains);
		this.setState({
			userDomain: this.props.selectedDomain.userDomain,
		});

		if (this.props.channel) {
			if (this.props.channel.logo !== "ChannelsBotLogo.png") {
				this.setState({
					imgFile: `${R.prop("contentURL", Config)}channelLogos/${
						this.props.channel.logo
					}`,
				});
			}
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (!_.isEqual(this.props.userDomains, prevProps.userDomains)) {
			this.preProcessUserDomains(this.props.userDomains);
			this.updatingChannel(this.props.channel);
		}
		if (this.props.errorMsg) {
			if (this.props.errorMsg !== prevState.error) {
				this.setState({
					error: this.props.errorMsg,
				});
			}
		}
	}

	updatingChannel = (data) => {
		console.log("data ======", data, this.props);

		this.setState(
			{
				...data,
				members: data ? data.participants : [],
			},
			() => {
				if (data) {
					this.checkingTheOwner(data.channelOwner);
				}
			}
		);
	};

	preProcessUserDomains = (userDomains = []) => {
		userDomains = userDomains
			.filter((domain) => domain.domain !== "frontmai")
			.map((domain) => {
				return { label: domain.domain, value: domain.domain };
			});

		if (userDomains.length === 1) {
			this.setState({ domain: userDomains[0], userDomains });
		} else {
			this.setState({ userDomains });
		}
	};

	onSubmit = (e) => {
		e.preventDefault();
		this.setState({ error: null });
		let error = validateNewChannelForm(this.state, this.props.groups);
		if (error) {
			this.setState({ error: error });
			return;
		}

		console.log("data to save ", this.state);

		this.props.submitForm(this.state);
	};

	uploadPhoto = (e) => {
		let filesObj = e.target.files;

		if (!filesObj) {
			return;
		}

		let re = /(?:\.([^.]+))?$/;
		let file = filesObj[0];
		let fileName = file.name;
		let fileExtension = re.exec(fileName)[1];

		if (this.props.edit && this.props.channel && this.props.channel.channelId) {
			let {
				channel: { channelId },
			} = this.props;
			this.props.channelImgUpload(channelId + "." + fileExtension, file);
		} else {
			this.props.channelImgUpload(fileExtension, file);
		}

		this.setState({
			imgFile: URL.createObjectURL(file),
		});
	};

	transferOwnership = () => {
		let channelData = {
			channelName: this.state.channelName,
			userDomain: this.state.userDomain,
			newOwnerId: this.state.settingOwnerUserId,
		};

		console.log("transfering data ", channelData);
		changeChannelOwner(channelData).then((data) => {
			this.closeConfirmOwnership();
			this.closeTransferOwner();
			// this.props.submitForm(this.state);
		});
	};
	transferOwner = () => {
		// console.log("transfer owner");

		this.setState({ showTransferOwner: true });
	};
	closeTransferOwner = () => {
		this.setState({ showTransferOwner: false });
	};

	showAddMember = () => {
		this.setState({ showAddMember: true });
	};
	showAdmins = () => {
		this.setState({ showAdmins: true });
	};

	showAwaitingAuth = () => {
		this.setState({ showPendingAuth: true });
	};

	closeAddMember = () => {
		this.setState({ showAddMember: false });
	};
	closeAdmins = () => {
		this.setState({ showAdmins: false });
	};

	closeAwaitingMember = () => {
		this.setState({ showPendingAuth: false });
	};

	addMembers = (newMembers, newMemberDetails) => {
		// let members = this.state.members;
		// members.push(newMembers);
		this.setState({ members: newMembers, memberDetails: newMemberDetails });
		this.closeAddMember();
	};
	addAdmins = (newMembers) => {
		// console.log("list of admin to add ", newMembers);
		let { channelName, userDomain } = this.state;
		let obj = {
			channelName: channelName,
			userDomain: userDomain,
			admins: [...newMembers],
		};
		updateChannelAdmin(obj).then((elem) => {
			// console.log("all admin response ", elem);
			if (elem[0] === true) {
				// console.log("admin added");
				getChannelAdmins(this.props.channel)
					.then((data) => {
						// console.log("all new data ", data);
						this.setState({ channelAdmins: [...data] });
					})
					.catch((error) => {
						console.log("Error on getting new data for admin", error);
					});
			}
		});
		this.closeAdmins();
	};

	confirmOwnership(memeberData, index) {
		this.setState({
			showTransferOwnershipConfirmation: true,
			settingOwnerName: memeberData.userName,
			settingOwnerUserId: memeberData.userId,
		});
	}
	askConfirmDelete = () => {
		this.setState({ deleteChannelConfirmation: true });
	};
	closeConfirmOwnership = () => {
		this.setState({ showTransferOwnershipConfirmation: false });
	};
	closeConfirmDeleteChannel = () => {
		this.setState({ deleteChannelConfirmation: false });
	};

	deleteChannel = () => {
		this.askConfirmDelete();
	};

	ignoreRequest(userDetails, index) {
		let { channelName, userDomain, pendingRequests } = this.state;
		let ignoredList = [userDetails.userId];
		let acceptedList = [];

		console.log("ignored ", userDetails);

		authorizeParticipants(
			channelName,
			userDomain,
			acceptedList,
			ignoredList
		).then((data) => {
			console.log("requests ignore", data);
			let array = [...this.state.pendingRequests];
			if (index !== -1) {
				array.splice(index, 1);
				this.setState({ pendingRequests: array }, () => {
					if (pendingRequests.length < 1) {
						this.closeAwaitingMember();
					}
				});
			}
		});
	}

	acceptRequest(userDetails, index) {
		let { channelName, userDomain, pendingRequests } = this.state;
		let acceptedList = [userDetails.userId];
		let ignoredList = [];

		authorizeParticipants(channelName, userDomain, acceptedList, ignoredList)
			.then((data) => {
				let array = [...this.state.pendingRequests];
				console.log("requests accept", data);
				if (index !== -1) {
					array.splice(index, 1);
					this.setState({ pendingRequests: array }, () => {
						this.closeAwaitingMember();
						const channelObj = {
							...this.props.channel,
						};
						this.props.callFetchChannelParticipants(channelObj);
					});
				}
			})
			.catch((err) => {
				console.log("error on accepting the request ", err);
			});
	}

	checkingTheOwner = (channelOwner) => {
		let ownerId = channelOwner.userId || "";

		// console.log("channel checking ");

		if (ownerId === this.props.userId) {
			// console.log("you ARE THE owner");
			this.setState({
				ownerCheck: true,
			});
		}
	};

	deleteThisChannel = () => {
		let channelData = {
			channelName: this.state.channelName,
			userDomain: this.state.userDomain,
		};
		this.closeConfirmDeleteChannel();
		this.props.deleteChannel(channelData);
	};

	handleInputChange = (e) => {
		this.setState({ channelName: e.target.value });
	};

	// participantsAwaitingRender = () => {
	//   let { edit } = this.props;
	//   let { discoverable, pendingRequests } = this.state;

	//   if (edit && discoverable === "private") {
	//     return (
	//       <div>
	//         <div className="form-group my-3">
	//           <div className="mb-2 d-flex justify-content-between align-items-center">
	//             <div>Participants awaiting authorization</div>
	//             <div>
	//               {" "}
	//               <a
	//                 className="primary-link my-2"
	//                 onClick={this.showAwaitingAuth}
	//               >
	//                 Edit
	//               </a>
	//             </div>
	//           </div>
	//           <div>
	//             <small>Pending authorization: {pendingRequests.length}</small>
	//           </div>
	//         </div>
	//         <hr />
	//       </div>
	//     );
	//   }
	// };

	render() {
		let { edit, isOwner, isAdmin } = this.props;
		let {
			channelAdmins,
			channelName,
			description,
			imgFile,
			discoverable,
			userDomains,
			userDomainsObj,
			members,
			uploading,
			percentCompleted,
			memberDetails,
			pendingRequests,
			error,
			showAddMember,
			showAdmins,
			showPendingAuth,
			showTransferOwner,
			showTransferOwnershipConfirmation,
			deleteChannelConfirmation,
			settingOwnerName,
			channelOwner,
			ownerCheck,
		} = this.state;

		// console.log("this channel state ", this.props.groups);

		return (
			<div>
				{error && (
					<div className="my-1">
						<Error message={error} />
					</div>
				)}
				<form role="form" onSubmit={this.onSubmit}>
					<div className="d-flex justify-content-between my-3">
						<div style={{ flex: 1, position: "relative" }}>
							{imgFile ? (
								<div
									className="d-flex justify-content-center align-items-center"
									style={{
										height: "120px",
										width: "120px",
										backgroundColor: "#F4F4F4",
										borderRadius: "50%",
									}}
								>
									<img
										style={{
											height: "120px",
											width: "120px",
											backgroundColor: "#F4F4F4",
											borderRadius: "50%",
										}}
										src={imgFile}
										alt="up-img"
									/>
								</div>
							) : (
								<div
									className="d-flex justify-content-center align-items-center"
									style={{
										height: "120px",
										width: "120px",
										backgroundColor: "#F4F4F4",
										borderRadius: "50%",
									}}
								>
									<i
										className="icon-camera2 fs-2x"
										style={{ color: "#638DFF" }}
									/>
								</div>
							)}

							{(isOwner || isAdmin) && (
								<a
									className="primary-link my-2 d-flex justify-content-center align-items-center mr-2"
									style={{
										position: "absolute",
										top: "10px",
										right: "10px",
										width: "23px",
										height: "23px",
										borderRadius: "50%",
										backgroundColor: "#f8f9fa",
										marginLeft: "-12px",
										zIndex: 9,
									}}
								>
									<Label
										htmlFor="localContactImageBrowser"
										style={{
											cursor: "pointer",
											marginBottom: 0,
											width: "23px",
											height: "23px",
										}}
										className="d-flex justify-content-center align-items-center"
									>
										<i className="icon-pencil" />
									</Label>
									<input
										type="file"
										id="localContactImageBrowser"
										name="customFile"
										accept=".png"
										onChange={this.uploadPhoto}
										className="displayNone"
									/>
								</a>
							)}
						</div>
						<div
							className="d-flex flex-column justify-content-between"
							style={{ flex: 2 }}
						>
							<input
								placeholder="Group Name"
								type="text"
								className="form-control form-control-lg"
								onChange={this.handleInputChange}
								value={channelName || ""}
								style={{
									backgroundColor: "#F4F4F4",
									border: "0px",
									borderRadius: "10px",
								}}
								disabled={edit}
							/>
							<textarea
								rows={3}
								placeholder="Description about your group"
								className="form-control form-control-lg"
								onChange={(e) => {
									this.setState({ description: e.target.value });
								}}
								value={description}
								style={{
									backgroundColor: "#F4F4F4",
									border: "0px",
									borderRadius: "10px",
								}}
								disabled={!(isOwner || isAdmin)}
							/>
						</div>
					</div>
					{uploading && (
						<progress
							id="progressBar"
							value={percentCompleted}
							max="100"
							style={{ width: "100%" }}
						/>
					)}

					<hr />

					{/* <div className="form-group my-3">
            <label>Group Type</label>

            <div className="mb-2 d-flex justify-content-between align-items-center">
              <div style={{ flex: 1 }}>
                <input
                  type="radio"
                  className="checkbox-lg mr-2"
                  onChange={e => {
                    this.setState({ channelType: "team" });
                  }}
                  checked={channelType === "team"}
                  disabled={edit}
                />
                Team
              </div>

              {channelType === "team" && (
                <div className="channel-teams-select">
                  <Select
                    onChange={domain => {
                      this.setState({
                        userDomain: domain.value,
                        userDomainsObj: domain
                      });
                    }}
                    placeholder=""
                    value={userDomainsObj}
                    options={userDomains}
                    minMenuHeight={30}
                    theme={{ borderRadius: 10 }}
                    disabled={edit}
                  />
                </div>
              )}
            </div>
            <div>
              <input
                type="radio"
                className="checkbox-lg mr-2"
                onChange={e => {
                  this.setState({
                    channelType: "platform",
                    userDomain: "frontmai"
                  });
                }}
                checked={channelType === "platform"}
                disabled={edit}
              />
              Platform
            </div>
          </div>

          <hr />

          <div className="form-group my-3">
            <label>Group Visibility</label>

            <div className="mb-2 d-flex justify-content-between align-items-center">
              <div>
                <input
                  type="radio"
                  className="checkbox-lg mr-2"
                  onChange={e => {
                    this.setState({ discoverable: "public" });
                  }}
                  checked={discoverable === "public"}
                  disabled={edit}
                />
                Public
                <small className="ml-4">
                  Your channel will be discoverable by anyone
                </small>
              </div>
            </div>
            <div>
              <input
                type="radio"
                className="checkbox-lg mr-2"
                onChange={e => {
                  this.setState({ discoverable: "private" });
                }}
                checked={discoverable === "private"}
                disabled={edit}
              />
              Private
            </div>
          </div>

          <hr /> The Name Group is changed into group. So Group Type and Group Visibility was commented in the form */}

					{this.props.edit && (
						<div>
							<div className="form-group my-3">
								{isOwner ? (
									<a
										className="secondary-link my-2"
										onClick={this.transferOwner}
									>
										Transfer ownership
									</a>
								) : (
									<p>Group Owner: {this.props.channel.channelOwner.userName}</p>
								)}
							</div>
							<hr />
							{!isOwner && members && members.length >= 1 ? (
								<div>
									<div className="form-group my-3">
										<a
											onClick={() =>
												this.props.leaveThisChannel(this.state, (err) => {
													console.log("we will check err ", err);
												})
											}
											className="text-danger"
										>
											Unsubscribe
										</a>
									</div>
									<hr />
								</div>
							) : null}

							{isOwner && (
								<div className="form-group my-3">
									<a onClick={this.deleteChannel} className="text-danger">
										Delete group
									</a>
									<hr />
								</div>
							)}
							<div className="form-group my-3">
								<div className="mb-2 d-flex justify-content-between align-items-center">
									{isOwner || isAdmin ? (
										<>
											<div>Manage Admin</div>
											<div>
												{" "}
												<a
													className="primary-link my-2"
													onClick={this.showAdmins}
												>
													Edit
												</a>
											</div>
										</>
									) : (
										<>
											<div>View Admins</div>
											<div>
												{" "}
												<a
													className="primary-link my-2"
													onClick={this.showAdmins}
												>
													View
												</a>
											</div>
										</>
									)}
								</div>
							</div>
							<hr />
						</div>
					)}

					<div className="form-group my-3">
						<div className="mb-2 d-flex justify-content-between align-items-center">
							{isOwner || isAdmin ? (
								<>
									<div>Add Participants</div>
									<div>
										{" "}
										{this.state.channelName &&
										this.state.channelName.length > 0 ? (
											<a
												className="primary-link my-2"
												onClick={this.showAddMember}
											>
												Edit
											</a>
										) : (
											<a
												className="primary-link my-2 disabled"
												onClick={this.showAddMember}
											>
												Edit
											</a>
										)}
									</div>
								</>
							) : (
								<>
									<div>View Participants</div>
									<div>
										{" "}
										{this.state.channelName &&
										this.state.channelName.length > 0 ? (
											<a
												className="primary-link my-2"
												onClick={this.showAddMember}
											>
												View
											</a>
										) : (
											<a
												className="primary-link my-2 disabled"
												onClick={this.showAddMember}
											>
												View
											</a>
										)}
									</div>
								</>
							)}
						</div>
						<div>
							<small>
								Participants in this group:{" "}
								{memberDetails
									? memberDetails.length + 1
									: members && members.length + 1}
							</small>
						</div>
					</div>

					<hr />
					{/* 
          {edit && discoverable === "private" ? (
            <div>
              <div className="form-group my-3">
                <div className="mb-2 d-flex justify-content-between align-items-center">
                  <div>Participants awaiting authorization</div>
                  <div>
                    {" "}
                    <a
                      className="primary-link my-2"
                      onClick={this.showAwaitingAuth}
                    >
                      Edit
                    </a>
                  </div>
                </div>
                <div>
                  <small>Pending authorization: {pendingRequests.length}</small>
                </div>
              </div>
              <hr />
            </div>
          ) : null} */}

					<div className="d-flex justify-content-center">
						<button type="submit" className="btn btn-sm btn-open">
							Done
						</button>
						<a
							className="btn btn-sm btn-install ml-2"
							onClick={this.props.cancel}
						>
							Cancel
						</a>
					</div>
				</form>
				{showAddMember && (
					<ModalPopup
						onClose={this.closeAddMember}
						size="sm"
						title={
							isOwner || isAdmin ? "Add Participants" : "View Participants"
						}
					>
						<AddMembersView
							isReadOnly={!(isOwner || isAdmin)}
							channelName={channelName}
							members={members}
							memberDetails={memberDetails}
							addMembers={this.addMembers}
							cancel={this.closeAddMember}
							selectedDomain={this.props.selectedDomain}
						/>
					</ModalPopup>
				)}
				{showAdmins && (
					<ModalPopup
						onClose={this.closeAdmins}
						size="sm"
						title={isOwner || isAdmin ? "Manage Admins" : "View Admins"}
					>
						<ManageAdminsView
							isReadOnly={!(isOwner || isAdmin)}
							members={members}
							channelAdmins={channelAdmins}
							channelOwner={channelOwner}
							memberDetails={memberDetails}
							addAdmins={this.addAdmins}
							cancel={this.closeAdmins}
						/>
					</ModalPopup>
				)}

				{/* {showPendingAuth && (
          <ModalPopup
            onClose={this.closeAwaitingMember}
            size="sm"
            title="Participants awaiting authorization"
          >
            <div>
              {pendingRequests.map((elem, index) => {
                return (
                  <div key={index}>
                    <div className="d-flex">
                      <div className="p-2">
                        <img
                          loading="lazy"
                          src="http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
                          alt="profile"
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "20px",
                          }}
                        />
                      </div>
                      <div className="p-2 d-flex align-items-center">
                        <span>{elem.userName}</span>
                      </div>
                      <div className="ml-auto d-flex align-items-center">
                        <a
                          className="btn btn-sm btn-install"
                          onClick={this.ignoreRequest.bind(this, elem, index)}
                        >
                          Ignore
                        </a>
                        <button
                          className="btn ml-2 btn-sm btn-open"
                          onClick={this.acceptRequest.bind(this, elem, index)}
                        >
                          Accept
                        </button>
                      </div>
                    </div>
                    <hr />
                  </div>
                );
              })}
            </div>
          </ModalPopup>
        )} */}

				{showTransferOwner && (
					<ModalPopup
						onClose={this.closeTransferOwner}
						size="sm"
						title="Transfer ownership"
					>
						<div>
							<p>
								You cannot undo this action, and the transfer is immediate.{" "}
							</p>
							<p>
								The new owner will have ultimate authority over the group -
								including promoting others to ownership roles.
							</p>

							<h6>Select new owner</h6>
							{memberDetails.map((memberData, index) => {
								return (
									<div key={index}>
										<div
											className="d-flex"
											onClick={this.confirmOwnership.bind(
												this,
												memberData,
												index
											)}
										>
											<div className="p-2">
												{/* <img loading="lazy"
                          src="http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
                          alt="profile"
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "20px"
                          }}
                        /> */}
												<Avatar
													color="bg-fm-primary"
													name={memberData.userName || "NA"}
													size={40}
													height={40}
												/>
											</div>
											<div className="p-2 d-flex align-items-center">
												<span className="user-name-text">
													{memberData.userName || "N/A"}
												</span>
											</div>
											<div className="ml-auto d-flex align-items-center">
												<span className="user-position">{memberData.role}</span>
											</div>
										</div>
										<hr />
									</div>
								);
							})}
						</div>
					</ModalPopup>
				)}
				{showTransferOwnershipConfirmation && (
					<ModalPopup
						onClose={this.closeConfirmOwnership}
						size="sm"
						title="Transfer ownership"
					>
						<div
							className="d-flex justify-content-center align-items-center flex-column"
							style={{ height: "250px" }}
						>
							<div className="mt-auto flex-column justify-content-center align-items-center">
								<p className="text-center">
									Are you sure you want to transfer ownership to{" "}
									{settingOwnerName}?{" "}
								</p>
								<p className="text-center warning-text">
									You can’t revert this action
								</p>
							</div>

							<div className="mt-auto justify-content-center align-items-center">
								<a
									className="btn btn-sm btn-cancel ml-2"
									onClick={this.closeConfirmOwnership}
								>
									Cancel
								</a>
								<a
									className="btn btn-sm btn-confirm ml-2"
									onClick={this.transferOwnership}
								>
									Yes, transfer
								</a>
							</div>
						</div>
					</ModalPopup>
				)}

				{deleteChannelConfirmation && (
					<ModalPopup
						onClose={this.closeConfirmDeleteChannel}
						size="sm"
						title="Delete group"
					>
						<div className="d-flex justify-content-center align-items-center flex-column p-3">
							<div className="mt-auto flex-column justify-content-center align-items-center p-3">
								<p className="text-center">
									Are you sure you want to delete this group?{" "}
								</p>
							</div>

							<div className="mt-auto justify-content-center align-items-center">
								<a
									className="btn btn-sm btn-cancel ml-2"
									onClick={this.closeConfirmDeleteChannel}
								>
									Cancel
								</a>
								<a
									className="btn btn-sm btn-confirm ml-2"
									onClick={this.deleteThisChannel}
								>
									Yes, delete
								</a>
							</div>
						</div>
					</ModalPopup>
				)}
			</div>
		);
	}
}

export default ChannelForm;
