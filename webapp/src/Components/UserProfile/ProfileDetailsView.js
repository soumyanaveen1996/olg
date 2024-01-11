import React, { Component } from "react";
import Avatar from "../Common/Avatar";
import Switch from "../Common/Switch";
import { NavLink } from "react-router-dom";

import _ from "lodash";
import { Label } from "reactstrap";
import {
	getProfilePhoto,
	uploadProfilePhoto,
} from "../../Services/FilesService";
import countries from "../../Utils/ListOfCountries";
import moment from "moment-timezone";
import ErrorMessage from "../Common/ErrorMessage";
import ModalPopup from "../ModalMessages/ModalPopup";
import RouteLeavingGuard from "../Interactions/RouteLeavingGuard";
import store from "../../State/configureStore";
import { connect } from "react-redux";
import {
	unsavedForm,
	LOGOUT_USER,
	removeSelectedDomain,
	removeDomains,
	setUserProfileImage,
} from "../../State/actions/user";
import {
	removeAuthData,
	removeOpenForm,
	removeDomainSelcted,
	removeFromStorage,
	removeLoginState,
	getSelectedConversation,
} from "../../Services/StorageService";
import Button from "../Interactions/content/forms/Elements/Button";
import AddRole from "./AddRole";
import { border, borderRadius } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import { number } from "prop-types";
import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	stepLabelClasses,
} from "@mui/material";
import { none, tryCatch } from "ramda";
import { FormControlSingle, StyledSelect, styles } from "./styles";
import UserServiceClient from "../../Services/Clients/UserServiceClient";
import { createConversation } from "../../State/actions/chats";
import { getEdgeConfig, updateEdgeConfig } from "../../Services/OneLearnServices";
import Toast from "../ModalMessages/Toast";
import { toast } from "react-toastify";

const CONTACTS_ROUTE = "/app/contacts";

class ProfileDetailsView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedNumberType: ["mobile", "land", "satellite"],
			numberType: {
				mobile: { key: "mobile", value: "" },
				land: { key: "land", value: "" },
				satellite: { key: "satellite", value: "" },
			},
			addedTypes: [],
			isDirty: false,
			phoneNumbers: [],
			emailAddress: "",
			userName: "",
			userCompanyName: "",
			addressLine1: "",
			city: "",
			state: "",
			vesselIMO: "",
			country: "Select Country",
			nationality: "Select nationality",
			postCode: "",
			disableCancel: true,
			userTimezone: "Etc/UTC",
			profilePhoto: this.props.profileImage,
			timeZones: [],
			hideDialog: false,
			visible: false,
			searchable: false,
		};
		this.dialogClose = () => {
			this.setState({ hideDialog: false });
		};
		this.btnStyle = {
			backgroundColor: "#638dff",
			color: "#fff",
			borderRadius: "20px",
			width: "209px",
			height: "30px",
			textAlign: "center",
			fontSize: "14px",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		};
		this.rankStyle = {
			flexGrow: 0,
			margin: "0 7px 0 0",
			padding: "3px 6px 3px 7px",
			borderRadius: "4px",
			color: "#178947",
			backgroundColor: "rgba(23, 137, 71, 0.1)",
		};
		this.confirmBtnStyle = {
			height: "30px",
			width: "100px",
			borderRadius: "20px",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			margin: "0 21.4px 0 0",
		};
	}

	settingState = async () => {
		const { user = {} } = this.props;
		let addedTypes = [];
		let phones = user.phoneNumbers || {};
		let phonesArray = Object.keys(phones).map((key) => {
			addedTypes.push(key);
			return { key, value: phones[key] };
		});
		let data = {
			phoneNumbers: [...phonesArray],
			addedTypes,
			emailAddress: user.emailAddress || "",
			userName: user.userName || user.name || "",
			userCompanyName: user.userCompanyName || "",
			nationality: user.nationality || "Select Country",
			addressLine1:
				user.address && user.address.addressLine1
					? user.address.addressLine1
					: "",
			addressLine2:
				user.address && user.address.addressLine2
					? user.address.addressLine2
					: "",
			city: user.address && user.address.city ? user.address.city : "",
			state: user.address && user.address.state ? user.address.state : "",
			country:
				user.address && user.address.country
					? user.address.country
					: "Select Country",
			postCode:
				user.address && user.address.postCode ? user.address.postCode : "",
			userTimezone: user.userTimezone || "Etc/UTC",
			visible: user?.visible,
			searchable: user?.searchable,
			vesselIMO: null,
			nodeId: "Nil",
			lastSyncTime: moment().tz(user.userTimezone || "Etc/UTC").format('MMMM Do YYYY, h:mm:ss a')
		};
		try {
			let res = await getEdgeConfig();
			if (res(
				data = {
					...data,
					vesselIMO: res.imo || null,
					nodeId: res.nodeId || "Nil",
					lastSyncTime: res.lastSyncTime || moment().tz(user.userTimezone || "Etc/UTC").format('MMMM Do YYYY, h:mm:ss a'),
					...res
				}
			));
		} catch (error) {
			console.log("Something went wrong in getEdgeConfig");
		}
		this.setState(data);
	};

	componentDidMount() {
		this.settingState();
		this.fetchTimeZone();
		this.loadProfilePic();
	}

	componentWillUnmount() {
		clearInterval(this.loadPreState);
	}

	fetchTimeZone = () => {
		let timeZones = moment.tz.names();
		let offsetTmz = [];
		offsetTmz = timeZones?.map((i, number) => {
			return {
				value: i,
				placeholder: "(GMT " + moment.tz(i).format("Z") + ") " + i,
				time: parseFloat(moment.tz(i).format("Z").split(":").join("")) * 0.01,
			};
		});
		this.setState({ timeZones: _.orderBy(offsetTmz, ["time"], ["asc"]) });
	};

	selectTimezone = (e) => {
		this.setState({ userTimezone: e.target.value }, () => {
			this.checkForChanges(this.state.userTimezone);
		});
	};

	loadProfilePic = (newPic = false) => {
		if (this.props.userProfileImage && !newPic) {
			this.setState({ profilePhoto: this.props.userProfileImage });
		} else {
			getProfilePhoto(this.props.user.userId + "_75x75.png")
				.then((file) => {
					this.props.setUserProfileImage(file);
					this.setState({ profilePhoto: file });
				})
				.catch((err) => {
					console.error("profile details view image load err", err);
				});
		}
	};

	uploadPhoto = (e) => {
		let filesObj = e.target.files;
		if (!filesObj) {
			return;
		}
		this.setState({ uploading: true });
		uploadProfilePhoto(this.props.user.userId + ".png", filesObj[0])
			.then((response) => {
				this.setState({ uploading: false });
				this.loadProfilePic(true);
			})
			.catch((error) => {
				this.setState({ uploading: false });
			});
	};

	changePhoneKey = (index, key) => {
		let { phoneNumbers } = this.state;
		phoneNumbers[index] = Object.assign({}, phoneNumbers[index], { key });
		this.setState({ phoneNumbers: [...phoneNumbers] });
	};

	comparePhoneNumber = (data) => {
		const { user = {} } = this.props;
		let phones = user.phoneNumbers || {};
		let phonesArray = Object.keys(phones).map((key) => {
			return { key, value: phones[key] };
		});

		if (data.length === phonesArray.length) {
			for (let i = 0; i < data.length; i++) {
				// console.log(data[i], phonesArray[i]);

				if (data[i].value !== phonesArray[i].value) {
					store.dispatch(unsavedForm(true));
					this.setState({ disableCancel: false, isDirty: true });
				} else {
					store.dispatch(unsavedForm(false));
					this.setState({ disableCancel: true, isDirty: false });
				}
			}
		}
	};

	changePhoneValue = (index, e) => {
		const checkchar = /^[+0-9\b]+$/;
		let value = e.target.value;
		// const checkchar = /^\+[0-9\b]*$/;

		let phoneNumbersObj = _.cloneDeep(this.state.phoneNumbers);
		// if (indicate == "code") {-
		//   if (checkchar.test(value)) {
		//     value = value + " " + phoneNumbers[index].value.split(" ")[1];
		//   } else {
		//     value = "+" + value + " " + phoneNumbers[index].value.split(" ")[1];
		//   }
		// } else {
		//   value = phoneNumbers[index].value.split(" ")[0] + " " + value;
		// }
		if (value === "" || checkchar.test(value)) {
			phoneNumbersObj[index].value = value;

			this.setState({ phoneNumbers: phoneNumbersObj }, () => {
				this.comparePhoneNumber(this.state.phoneNumbers);
				// console.log(this.state.phoneNumbers);
			});
		}
	};

	deletePhone = (index, key) => {
		let { phoneNumbers, selectedNumberType, addedTypes } = this.state;
		let indexOfkeyInAddedType = addedTypes.indexOf(key);
		addedTypes.splice(indexOfkeyInAddedType, 1);
		phoneNumbers.splice(indexOfkeyInAddedType, 1);

		store.dispatch(unsavedForm(true));
		this.setState({
			phoneNumbers,
			addedTypes,
			selectedNumberType,
			isDirty: true,
		});
	};

	addPhone = () => {
		let {
			phoneNumbers,
			selectedNumberType,
			deletedPhone,
			numberType,
			addedTypes,
		} = this.state;
		let newSelectedNumberType = _.cloneDeep(selectedNumberType);
		let newPhoneNumbers = _.cloneDeep(phoneNumbers);
		let newAddedTypes = _.cloneDeep(addedTypes);
		let newNumberType = _.cloneDeep(numberType);
		if (newAddedTypes.length === 0) {
			newAddedTypes.push("mobile");
			newPhoneNumbers.push({ ...newNumberType["mobile"] });
		} else {
			for (let i = 0; i < newSelectedNumberType.length; i++) {
				if (newAddedTypes.indexOf(newSelectedNumberType[i]) === -1) {
					const type = newSelectedNumberType[i];
					newAddedTypes.push(type);
					newPhoneNumbers.push(newNumberType[type]);
					break;
				}
			}
		}

		store.dispatch(unsavedForm(true));
		this.setState({
			phoneNumbers: newPhoneNumbers,
			addedTypes: newAddedTypes,
			deletedPhone,
			disableCancel: false,
			isDirty: true,
		});
	};

	getPhoneFields = () => {
		let all = ["mobile", "land", "satellite"];
		let phoneKeys = this.state.phoneNumbers.map((phone) => phone.key);
		return all.filter(function (el) {
			return phoneKeys.indexOf(el) < 0;
		});
	};

	onChangeCompany = (value) => {
		this.setState({ userCompanyName: value }, () => {
			this.checkForChanges(this.state.userCompanyName);
		});
	};

	onChangeAddressInput = (value) => {
		this.setState({ addressLine1: value }, () => {
			this.checkForChanges(this.state.addressLine1);
		});
	};

	goTolandingBot = () => {
		let botData = getSelectedConversation()?.bot;
		if (botData) {
			this.props.createConversation(botData, this.props.userId);
			return this.props.history.push("/offlinelms/app/chats");
		}
	}

	saveProfile = async () => {
		let { vesselIMO, lastSyncTime } = this.state;
		let payload = { imo: vesselIMO, lastSyncTime };

		if (!vesselIMO || vesselIMO.length == 0) return toast["error"]("Please enter Vessel IMO and save.");

		try {
			let res = await updateEdgeConfig(payload);
			if (res) {
				toast["success"]("Vessel IMO updated successfully.")
				return this.goTolandingBot();
			}

		} catch (error) {
			toast["error"]("Error occured in updateEdgeConfig :" + error);
		}

	};

	checkForChanges = (data) => {
		const { user } = this.props;
		if (user.userName || user.name !== data) {
			store.dispatch(unsavedForm(true));
			this.setState({ disableCancel: false, isDirty: true });
		} else if (user.address.addressLine1 !== data) {
			store.dispatch(unsavedForm(true));
			this.setState({ disableCancel: false, isDirty: true });
		} else if (user.address.addressLine2 !== data) {
			store.dispatch(unsavedForm(true));
			this.setState({ disableCancel: false, isDirty: true });
		} else if (user.address.city !== data) {
			store.dispatch(unsavedForm(true));
			this.setState({ disableCancel: false, isDirty: true });
		} else if (user.address.state !== data) {
			store.dispatch(unsavedForm(true));
			this.setState({ disableCancel: false, isDirty: true });
		} else if (user.address.country !== data) {
			store.dispatch(unsavedForm(true));
			this.setState({ disableCancel: false, isDirty: true });
		} else if (user.address.postCode !== data) {
			store.dispatch(unsavedForm(true));
			this.setState({ disableCancel: false, isDirty: true });
		} else if (user.userTimezone !== data) {
			store.dispatch(unsavedForm(true));
			this.setState({ disableCancel: false, isDirty: true });
		} else if (user.userCompanyName !== data) {
			store.dispatch(unsavedForm(true));
			this.setState({ disableCancel: false, isDirty: true });
		} else if (user.nationality !== data) {
			store.dispatch(unsavedForm(true));
			this.setState({ disableCancel: true, isDirty: true });
		} else if (user.searchable !== data) {
			store.dispatch(unsavedForm(true));
			this.setState({ disableCancel: true, isDirty: true });
		} else if (user.visible !== data) {
			store.dispatch(unsavedForm(true));
			this.setState({ disableCancel: true, isDirty: true });
		} else {
			store.dispatch(unsavedForm(true));
			this.setState({ disableCancel: true, isDirty: true });
		}
	};

	cancel = () => {
		this.setState({ disableCancel: true });
		this.closeConfirmCancel();
		this.settingState();
	};

	closeConfirmCancel = () => {
		this.setState({ confirmCancel: false });
	};

	selectCountry = (e) => {
		this.setState({ country: e.target.value }, () => {
			this.checkForChanges(this.state.country);
		});
	};
	selectNationality = (e) => {
		this.setState({ nationality: e.target.value }, () => {
			this.checkForChanges(this.state.nationality);
		});
	};
	showAddRole = () => {
		this.props.toggleCPDialog();
		this.setState({ cpDialog: true });
	};

	hideAddRole = () => {
		this.props.toggleCPDialog();
		this.setState({ cpDialog: false });
	};

	handleIMOChange = (e) => {
		this.setState({ vesselIMO: e.target.value, disableCancel: false });
	};

	render() {
		const allCountries = countries;
		const {
			phoneNumbers,
			emailAddress,
			userName,
			profilePhoto,
			uploading,
			percentCompleted,
			vesselIMO,
			userTimezone,
			isDirty,
			visible,
			searchable,
		} = this.state;
		const { history, appNotification } = this.props;
		let phoneFields = this.getPhoneFields();
		const { closeConfirmCancel } = this.state;
		let divider = (<hr style={{ borderTop: "1px solid rgb(221, 222, 227,0.5)", width: "90%", margin: "auto", }} />);
		// let { searchable, visible } = this.props.user;
		return (
			<React.Fragment>
				{/* removed protected route as it is not needed since we are already checking isDirty variable to let the user choose to stay or leave my profile  */}
				<div
					className="Catalog-sidebar d-flex align-items-center sidebar-sm"
					id="sidebar-collapse"
					style={Object.assign({}, this.props.style, {
						overflowY: "auto",
						height: `calc(100vh - 35px ${appNotification.show ? "- 50px" : null
							})`,
					})}
				>
					{this.state.confirmCancel && (
						<ModalPopup size="sm" noHeader>
							<div className="py-1">
								<div style={{ textAlign: "center" }}>
									<p className="fs17" style={{ color: "#4f5b7d" }}>
										Your changes are not saved. Do you still want to leave?
									</p>
								</div>
								<div>
									<div
										className="py-2 d-flex justify-content-center align-items-center mt-3"
										onClose={this.closeConfirmCancel}
										style={{ width: "60%", paddingLeft: "40%" }}
									>
										<button
											type="button"
											className="btn btn-lg btn-cancel m-1"
											onClick={this.closeConfirmCancel}
											style={{
												height: "40px",
												width: "110%",
												borderRadius: "20px",
												backgroundColor: "rgba(99, 141, 255, 0.1)",
												margin: "0 21.4px 0 0",
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
												padding: "15px 55px 15px 55px",
											}}
										>
											No
										</button>
										{/*<NavLink to={{ pathname: "/offlinelms/app/my-profile" }}>*/}
											<button
												type="button"
												className="btn btn-lg btn-open m-1"
												onClick={() => {
													window.location.reload();
												}}
												style={{
													height: "40px",
													width: "110%",
													borderRadius: "20px",
													display: "flex",
													justifyContent: "center",
													alignItems: "center",
													margin: "0 21.4px 0 0",
													padding: "15px 55px 15px 55px",
												}}
											>
												Yes
											</button>
										{/*</NavLink>*/}
									</div>
								</div>
							</div>
						</ModalPopup>
					)}
					<div className="col-lg-8 px-2 py-3">
						{/* <div className="container-fluid d-flex flex-column"> */}
						<div className="d-flex flex-row">
							<div
								className="form-group"
								style={{
									position: "relative",
									marginRight: "20px",
									marginBottom: "0",
								}}
							>
								<Avatar
									color="bg-fm"
									name={userName}
									size={160}
									imgSrc={profilePhoto}
									style={{
										borderRadius: "50%",
										// color: "#e5743b",
										backgroundColor: "#e5743b",
										display: "flex",
										textAlign: "center",
										justifyContent: "center",
										objectFit: "cover",
										height: "50%",
										width: "80%",
										margin: "10px 30px 49px 0",
									}}
								/>
								{uploading && (
									<CircularProgress
										id="progressBar"
										value={percentCompleted}
										className="primary-link"
										max="100"
										style={{
											position: "absolute",
											top: "4.5rem",
											marginLeft: "57px",
										}}
									/>
								)}

							</div>
							<div
								className="profileDetailsViewHeight container-fluid"
								style={{ marginTop: "30px", paddingTop: "25px" }}
							>
								<div className="">
									<input
										type="text"
										// className="form-control form-control-lg form-input-box-p-100-reverse remove-outline"
										className="form-input-box-p-100-reverse remove-outline"
										disabled
										style={{
											color: "#4f5b7d",
											opacity: "1",
											position: "relative",
											fontSize: "27px",
											fontWeight: "500",
											fontStyle: "normal",
											fontStretch: "normal",
											letterSpacing: "normal",
											border: "none",
											backgroundColor: "#f6f8fc",
											lineHeight: "normal",
											height: "36px",
											textAlign: "left",
											marginLeft: "10px",
										}}
										value={userName}
									/>
									{this.state.nameError && (
										<ErrorMessage message={"Name field is required"} />
									)}
								</div>
								<div>
									<div
										style={{
											width: "100%",
											height: "0.1px",
											backgroundColor: "rgb(79, 91, 125 , 0.2)",
											marginTop: "10px",
											marginBottom: "20px",
										}}
									></div>
									<div>
										{/* {this.props.user?.rankLevel3 &&
										this.props.user?.rankLevel2 ? (
											<div
												style={{
													display: "flex",
													flexDirection: "row",
													justifyContent: "space-between",
												}}
											>
												<div
													style={{
														color: "#666666",
														fontSize: "25px",
														padding: "0px 5px 5px 10px",
													}}
												>
													<span
														className={"mr-10 fs14"}
														style={this.rankStyle}
													>{`${this.props.user.rankLevel3}`}</span>
													<span className="fs14">
														{" "}
														{`${this.props.user.rankLevel2}`}
													</span>
												</div>
												<button
													type="button"
													className="btn btn-lg m-1"
													onClick={this.showAddRole}
													style={{ ...this.btnStyle, fontWeight: "bold" }}
												>
													Edit position or role
												</button>
												{this.state.cpDialog && this.props.showCPDialog && (
													<ModalPopup
														// onClose={this.hideAddRole}
														size="sm"
														title="Add Role"
													>
														<div className="p-2">
															<AddRole
																{...this.props}
																save={this.saveProfile}
																addNotification={this.props.appNotification}
																checkForChanges={this.checkForChanges}
																userData={this.props.user}
																roleHide={this.hideAddRole}
															/>
														</div>
													</ModalPopup>
												)}
											</div>
										) : (
											<div>
												<button
													type="button"
													className="btn btn-lg m-1"
													onClick={this.showAddRole}
													style={this.btnStyle}
												>
													Add your position or role
												</button>
												{this.state.cpDialog && this.props.showCPDialog && (
													<ModalPopup
														// onClose={this.hideAddRole}
														size="sm"
														title="Add Role"
													>
														<div className="p-2">
															<AddRole
																{...this.props}
																save={this.saveProfile}
																addNotification={this.props.appNotification}
																checkForChanges={this.checkForChanges}
																userData={this.props.user}
																roleHide={this.hideAddRole}
															/>
														</div>
													</ModalPopup>
												)}
											</div>
										)} */}
										<div className="contact-details">
											<div style={{ color: "#9B9B9B" }} className="form-contactdetails" >
												<div>
													{/* <i className="icon-envelope mr-2 primary-link" style={{ fontWeight: "bold", marginLeft: "20px" }} />{" "} */}
													<label className="inputPlaceholder-email ml-5">
														Node ID
													</label>
												</div>
												<div style={{ position: "absolute", left: "38%", }} >
													<input
														type="text"
														disabled
														style={{ opacity: "1", }}
														className="newInputValue"
														value={this.state.nodeId}
													/>
												</div>
											</div>
											{divider}
											<div style={{ color: "#9B9B9B" }} className="form-contactdetails" >
												<div>
													{/* <i className="icon-envelope mr-2 primary-link" style={{ fontWeight: "bold", marginLeft: "20px" }} />{" "} */}
													<label className="inputPlaceholder-email ml-5">
														IMO
													</label>
												</div>
												<div style={{ position: "absolute", left: "38%", }} >
													<input
														type="text"
														placeholder="Vessel IMO"
														style={{ opacity: "1", }}
														className="newInputValue"
														value={vesselIMO}
														onChange={this.handleIMOChange}
													/>
												</div>
											</div>
											{divider}
											<div style={{ color: "#9B9B9B" }} className="form-contactdetails" >
												<div>
													{/* <i className="icon-envelope mr-2 primary-link" style={{ fontWeight: "bold", marginLeft: "20px" }} />{" "} */}
													<label className="inputPlaceholder-email ml-5">
														Last Sync
													</label>
												</div>
												<div style={{ position: "absolute", left: "38%", }} >
													<input
														type="text"
														disabled
														style={{ opacity: "1", }}
														className="newInputValue"
														value={moment(this.state.lastSyncTime).tz(this.props?.user?.userTimezone || "Etc/UTC").format('MMMM Do YYYY, h:mm:ss a')}
													/>
												</div>
											</div>
											{divider}
											<div style={{ color: "#9B9B9B" }} className="form-contactdetails" >
												<div>
													{/* <i className="icon-envelope mr-2 primary-link" style={{ fontWeight: "bold", marginLeft: "20px" }} />{" "} */}
													<label className="ml-3 font600">
														Cloud to Edge Sync
													</label>
												</div>
												{/* <div style={{ position: "absolute", left: "38%", }} >
													<input
														type="text"
														disabled
														style={{ opacity: "1", }}
														className="newInputValue"
														value={this.state?.cloudToEdgeSyncStatus?.syncStatus}
													/>
												</div> */}
											</div>
											<div className="ml-10">
												<div style={{ color: "#9B9B9B" }} className="form-contactdetails" >
													<div>
														{/* <i className="icon-envelope mr-2 primary-link" style={{ fontWeight: "bold", marginLeft: "20px" }} />{" "} */}
														<label className="inputPlaceholder-email ml-5">
															Status
														</label>
													</div>
													<div style={{ position: "absolute", left: "38%", }} >
														<input
															type="text"
															disabled
															style={{ opacity: "1", }}
															className="newInputValue"
															value={this.state.cloudToEdgeSyncStatus?.syncStatus}
														/>
													</div>
												</div>
											</div>
											<div className="ml-10">
												<div style={{ color: "#9B9B9B" }} className="form-contactdetails" >
													<div>
														{/* <i className="icon-envelope mr-2 primary-link" style={{ fontWeight: "bold", marginLeft: "20px" }} />{" "} */}
														<label className="inputPlaceholder-email ml-5">
															Message
														</label>
													</div>
													<div style={{ position: "absolute", left: "38%", }} >
														<input
															type="text"
															disabled
															style={{ opacity: "1", }}
															className="newInputValue"
															value={this.state.cloudToEdgeSyncStatus?.syncMessage}
														/>
													</div>
												</div>
											</div>
											<div className="ml-10">
												<div style={{ color: "#9B9B9B" }} className="form-contactdetails" >
													<div>
														{/* <i className="icon-envelope mr-2 primary-link" style={{ fontWeight: "bold", marginLeft: "20px" }} />{" "} */}
														<label className="inputPlaceholder-email ml-5">
															Last Sync
														</label>
													</div>
													<div style={{ position: "absolute", left: "38%", }} >
														<input
															type="text"
															disabled
															style={{ opacity: "1", }}
															className="newInputValue"
															value={moment(this.state.cloudToEdgeSyncStatus?.syncTime).tz(this.props?.user?.userTimezone || "Etc/UTC").format('MMMM Do YYYY, h:mm:ss a')}
														/>
													</div>
												</div>
											</div>


											{divider}
											<div style={{ color: "#9B9B9B" }} className="form-contactdetails" >
												<div>
													{/* <i className="icon-envelope mr-2 primary-link" style={{ fontWeight: "bold", marginLeft: "20px" }} />{" "} */}
													<label className="ml-3 font600">
														Edge to Cloud Sync
													</label>
												</div>
												{/* <div style={{ position: "absolute", left: "38%", }} >
													<input
														type="text"
														disabled
														style={{ opacity: "1", }}
														className="newInputValue"
														value={this.state?.edgeToCloudSyncStatus?.syncStatus}
													/>
												</div> */}
											</div>
											<div className="ml-10">
												<div style={{ color: "#9B9B9B" }} className="form-contactdetails" >
													<div>
														{/* <i className="icon-envelope mr-2 primary-link" style={{ fontWeight: "bold", marginLeft: "20px" }} />{" "} */}
														<label className="inputPlaceholder-email ml-5">
															Status
														</label>
													</div>
													<div style={{ position: "absolute", left: "38%", }} >
														<input
															type="text"
															disabled
															style={{ opacity: "1", }}
															className="newInputValue"
															value={this.state.edgeToCloudSyncStatus?.syncStatus}
														/>
													</div>
												</div>
											</div>
											<div className="ml-10">
												<div style={{ color: "#9B9B9B" }} className="form-contactdetails" >
													<div>
														{/* <i className="icon-envelope mr-2 primary-link" style={{ fontWeight: "bold", marginLeft: "20px" }} />{" "} */}
														<label className="inputPlaceholder-email ml-5">
															Message
														</label>
													</div>
													<div style={{ position: "absolute", left: "38%", }} >
														<input
															type="text"
															disabled
															style={{ opacity: "1", }}
															className="newInputValue"
															value={this.state.edgeToCloudSyncStatus?.syncMessage}
														/>
													</div>
												</div>
											</div>
											<div className="ml-10">
												<div style={{ color: "#9B9B9B" }} className="form-contactdetails" >
													<div>
														{/* <i className="icon-envelope mr-2 primary-link" style={{ fontWeight: "bold", marginLeft: "20px" }} />{" "} */}
														<label className="inputPlaceholder-email ml-5">
															Last Sync
														</label>
													</div>
													<div style={{ position: "absolute", left: "38%", }} >
														<input
															type="text"
															disabled
															style={{ opacity: "1", }}
															className="newInputValue"
															value={moment(this.state.edgeToCloudSyncStatus?.syncTime).tz(this.props?.user?.userTimezone || "Etc/UTC").format('MMMM Do YYYY, h:mm:ss a')}
														/>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className="pb-50 d-flex mt-25">
									<button
										type="button"
										className="btn btn-open m-1"
										onClick={this.saveProfile}
										disabled={this.state.disableCancel}
										style={{ ...this.confirmBtnStyle, padding: "15px 55px 15px 55px", }}
									>
										Save
									</button>
									<button
										type="button"
										className="btn btn-cancel m-1"
										onClick={() => {
											if (!this.state.disableCancel) {
												this.setState({ confirmCancel: true });
											} else {
												this.goTolandingBot();
											}
										}}
										style={{ ...this.confirmBtnStyle, backgroundColor: "rgba(99, 141, 255, 0.1)", }}
									>
										Cancel
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

const mapDataToProps = (state) => {
	return {
		userProfileImage: state.user.userProfileImage,
		appNotification: state.appNotification,
	};
};

const mapActionsToProps = {
	setUserProfileImage: setUserProfileImage,
	createConversation: createConversation,
};

export default connect(mapDataToProps, mapActionsToProps)(ProfileDetailsView);
