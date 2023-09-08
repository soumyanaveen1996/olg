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
import { none } from "ramda";
import { FormControlSingle, StyledSelect, styles } from "./styles";
import UserServiceClient from "../../Services/Clients/UserServiceClient";

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
	}

	settingState = () => {
		const { user = {} } = this.props;
		let addedTypes = [];
		let phones = user.phoneNumbers || {};
		let phonesArray = Object.keys(phones).map((key) => {
			addedTypes.push(key);
			return { key, value: phones[key] };
		});
		this.setState({
			phoneNumbers: [...phonesArray],
			addedTypes,
			emailAddress: user.emailAddress || "",
			userName: user.userName || "",
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
		});
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

	saveProfile = (eve, fromAddRole) => {
		let {
			phoneNumbers,
			emailAddress,
			userName,
			userCompanyName,
			nationality,
			addressLine1,
			addressLine2,
			city,
			state,
			country,
			postCode,
			userTimezone,
			visible,
			searchable,
		} = this.state;

		let pns = {};
		phoneNumbers.forEach((p) => {
			if (p.value && p.value.trim()) {
				pns[p.key] = p.value;
			}
		});
		// if (!city || city === "") {
		// 	// debugger;
		// 	this.setState({ cityError: true });
		// 	// this.props.sendMsgForBanner(BANNER_TYPE_INFO, "State field is required.");
		// 	return;
		// }

		if (!userName) {
			this.setState({ nameError: true });
			return;
		}

		let data = {
			phoneNumbers: pns,
			userName,
			emailAddress,
			userCompanyName,
			nationality,
			address: {
				addressLine1,
				city,
				state,
				country,
				postCode,
			},
			userTimezone,
			visible,
			searchable,
		};

		if (!city || city === "") {
			this.setState({ cityError: true });
			// Adds role when the mandatory city field is empty
			if (fromAddRole) {
				this.setState({ cityError: false });
				data["rank"] = fromAddRole.rank;
				data["role"] = fromAddRole.role;
				data["rankLevel1"] = fromAddRole.rankLevel1;
				data["rankLevel2"] = fromAddRole.rankLevel2;
				data["rankLevel3"] = fromAddRole.rankLevel3;
				data["shipName"] = fromAddRole.shipName;
				data["shipIMO"] = fromAddRole.shipIMO;
				data["sailingStatus"] = fromAddRole.sailingStatus;
				this.hideAddRole();
			} else {
				return;
			}
		}
		if (city) {
			if (fromAddRole) {
				// Adds role when city field is non-empty
				data["rank"] = fromAddRole.rank;
				data["role"] = fromAddRole.role;
				data["rankLevel1"] = fromAddRole.rankLevel1;
				data["rankLevel2"] = fromAddRole.rankLevel2;
				data["rankLevel3"] = fromAddRole.rankLevel3;
				data["shipName"] = fromAddRole.shipName;
				data["shipIMO"] = fromAddRole.shipIMO;
				data["sailingStatus"] = fromAddRole.sailingStatus;
				this.hideAddRole();
			}
			this.setState({ cityError: false });
		}

		this.setState({
			disableCancel: true,
			isDirty: false,
		});
		this.props.save(data);
	};

	checkForChanges = (data) => {
		const { user } = this.props;
		if (user.userName !== data) {
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

	render() {
		const allCountries = countries;
		const {
			phoneNumbers,
			emailAddress,
			userName,
			profilePhoto,
			uploading,
			percentCompleted,
			isDirty,
			visible,
			searchable,
		} = this.state;
		const { history, appNotification } = this.props;
		let phoneFields = this.getPhoneFields();
		const { closeConfirmCancel } = this.state;
		// let { searchable, visible } = this.props.user;
		return (
			<React.Fragment>
				{/* removed protected route as it is not needed since we are already checking isDirty variable to let the user choose to stay or leave my profile  */}
				<div
					className="Catalog-sidebar d-flex align-items-center sidebar-sm"
					id="sidebar-collapse"
					style={Object.assign({}, this.props.style, {
						overflowY: "auto",
						height: `calc(100vh - 35px ${
							appNotification.show ? "- 50px" : null
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
										<NavLink to={{ pathname: "/app/home" }}>
											<button
												type="button"
												className="btn btn-lg btn-open m-1"
												onClick={() => this.setState({ isDirty: false })}
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
										</NavLink>
									</div>
								</div>
							</div>
						</ModalPopup>
					)}
					<div className="col-lg-10 px-2 py-3">
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

								<a
									className="primary-link d-flex justify-content-center align-items-center"
									style={{
										position: "absolute",
										top: "128px",
										right: "35px",
										width: "30px",
										height: "30px",
										borderRadius: "50%",
										backgroundColor: "#638dff",
										marginLeft: "-12px",
										zIndex: 9,
										border: " 1px solid #fff",
									}}
								>
									<Label
										htmlFor="fileBrowser"
										style={{
											cursor: "pointer",
											marginBottom: 0,
											width: "23px",
											height: "23px",
										}}
										className="d-flex justify-content-center align-items-center"
									>
										<i className="fa fa-camera" style={{ color: "#fff" }} />
									</Label>
									<input
										type="file"
										id="fileBrowser"
										name="customFile"
										accept=".png"
										onChange={this.uploadPhoto}
										className="displayNone"
									/>
								</a>
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
										style={{
											color: "#4f5b7d",
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
										onBlur={(e) => {
											if (e.target.value === "") {
												this.setState({ nameError: true });
											} else {
												this.setState({ nameError: false });
											}
										}}
										onChange={(e) =>
											this.setState({ userName: e.target.value }, () => {
												this.checkForChanges(this.state.userName);
											})
										}
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
										{this.props.user?.rankLevel3 &&
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
										)}
										<div className="contact-details">
											{phoneNumbers.map((phone, index) => {
												let phoneNum = "";
												phoneNum = phone.value;
												return (
													<div key={index}>
														<div
															className="form-group contactRow d-flex"
															style={{ color: "#9B9B9B" }}
														>
															<div className="d-flex align-items-center">
																<div>
																	{phone.key === "mobile" && (
																		<div
																			className="inputPlaceholder d-flex"
																			style={{ paddingLeft: "9px" }}
																		>
																			<i
																				className="icon-phone primary-link "
																				style={{ marginRight: "12px" }}
																			/>
																			Mobile
																		</div>
																	)}
																	{phone.key === "land" && (
																		<div
																			className="inputPlaceholder d-flex"
																			style={{ paddingLeft: "9px" }}
																		>
																			<i
																				className="fa fa-phone primary-link"
																				style={{
																					// color: "#fff",
																					marginRight: "12px",
																				}}
																			/>{" "}
																			Landline
																		</div>
																	)}
																	{phone.key === "satellite" && (
																		<div
																			className="inputPlaceholder d-flex"
																			style={{ paddingLeft: "9px" }}
																		>
																			<i
																				className="icon-satellite fa-rotate-270 primary-link"
																				style={{
																					marginRight: "12px",
																				}}
																			/>{" "}
																			Satellite
																		</div>
																	)}
																</div>
															</div>
															<div
																style={{ width: "70%", marginLeft: "36px" }}
																className="d-flex justify-content-center"
															>
																<input
																	type="text"
																	// className="form-control form-control-lg w-60 h-100 no-border-input contact-form-text"
																	className="newInputValue"
																	placeholder={"118930475"}
																	maxLength={16}
																	value={phoneNum}
																	onChange={this.changePhoneValue.bind(
																		this,
																		index
																	)}
																/>
																<a
																	className="primary-link my-2 ml-2 d-flex justify-content-center align-items-center"
																	onClick={() =>
																		this.deletePhone(index, phone.key)
																	}
																	style={{
																		width: "23px",
																		backgroundColor: "inherit !important",
																		height: "23px",
																		borderRadius: "50%",
																		paddingLeft: "12px",
																	}}
																></a>
															</div>
														</div>
													</div>
												);
											})}

											{phoneNumbers.length < 3 && (
												<a
													className="primary-link my-2 inputPlaceholder"
													onClick={this.addPhone}
													style={{ padding: "10px" }}
												>
													<i
														className="icon-plus mr-2"
														style={{ fontWeight: "bold" }}
													/>
													Add Phone
												</a>
											)}
											<hr
												style={{
													borderTop: "1px solid rgb(221, 222, 227,0.5)",
													width: "90%",
													margin: "auto",
												}}
											/>

											<div
												style={{ color: "#9B9B9B" }}
												className="form-contactdetails"
											>
												<div>
													<i
														className="icon-envelope mr-2 primary-link"
														style={{ fontWeight: "bold", marginLeft: "20px" }}
													/>{" "}
													<label className="inputPlaceholder-email">
														Email
													</label>
												</div>
												<div
													style={{
														position: "absolute",
														left: "38%",
													}}
												>
													<input
														type="text"
														disabled
														style={{
															opacity: "1",
														}}
														// className="form-control form-control-lg form-input-box-380-reverse remove-outline"
														className="newInputValue"
														value={emailAddress}
														onChange={(e) =>
															this.setState({ emailAddress: e.target.value })
														}
													/>
												</div>
											</div>
										</div>
										<div className="regional-details">
											<form
												className="billing-form"
												style={{ color: "#9B9B9B" }}
											>
												<div
													className="form-contactdetails"
													style={{ color: "#9B9B9B", padding: "12px" }}
													id="nationality"
												>
													<div
														className="d-flex  inputPlaceholder"
														style={{ width: "50%" }}
													>
														<i
															className="icon-flag mr-2 primary-link"
															style={{
																color: "rgb(0, 189, 242)",
																fontWeight: "bold",
															}}
														/>{" "}
														<label
															htmlFor="nationality"
															className="inputPlaceholder"
															style={{ marginLeft: "4px" }}
														>
															Nationality
														</label>
													</div>
													<div style={{ position: "absolute", left: "37%" }}>
														<FormControlSingle>
															<StyledSelect
																id="nationality"
																labelId="nationality"
																value={this.state.nationality}
																onChange={this.selectNationality}
																variant="outlined"
																single
																style={{
																	width: "200px",
																	fontSize: "12px",
																	height: "30px",
																	backgroundColor: "inherit",
																}}
																MenuProps={styles.selectMenuPropsMini}
															>
																<MenuItem>Select Nationality</MenuItem>
																{allCountries.map((nationality, index) => {
																	return (
																		<MenuItem
																			key={index}
																			value={nationality.nation}
																		>
																			{nationality.nation}
																		</MenuItem>
																	);
																})}
															</StyledSelect>
														</FormControlSingle>
													</div>
												</div>

												<hr
													style={{
														borderTop: "1px solid rgb(221, 222, 227,0.5)",
														width: "90%",
														margin: "auto",
														// marginTop: "16px",
														// marginBottom: "16px",
													}}
												/>
												<div
													className="form-contactdetails "
													style={{ padding: "12px" }}
													id="company"
												>
													<div
														className="d-flex  inputPlaceholder"
														style={{ width: "50%" }}
													>
														<i
															className="fa fa-building mr-2"
															style={{ color: "#638dff" }}
														/>{" "}
														<label
															htmlFor="company"
															className="inputPlaceholder"
															style={{ marginLeft: "2px" }}
														>
															Company
														</label>
													</div>
													<div style={{ position: "absolute", left: "38%" }}>
														<input
															id="company"
															value={this.state.userCompanyName}
															type="text"
															className="newInputValue"
															// className="form-control form-control-lg form-input-box-380-reverse remove-outline"
															onChange={(e) => {
																this.onChangeCompany(e.target.value);
															}}
														/>
													</div>
												</div>
												<hr
													style={{
														borderTop: "1px solid rgb(221, 222, 227,0.5)",
														width: "90%",
														margin: "auto",
														// marginTop: "16px",
														// marginBottom: "16px",
													}}
												/>

												<div
													className="form-contactdetails"
													style={{ padding: "12px" }}
													id="addressBill"
												>
													<div className="d-flex  inputPlaceholder">
														<i
															className="icon-home mr-2 primary-link"
															style={{
																fontWeight: "bold",
																marginBottom: "10px",
															}}
														/>{" "}
														<label
															htmlFor="addressBill"
															style={{ marginLeft: "3px" }}
															className="inputPlaceholder"
														>
															Address
														</label>
													</div>
													<div style={{ position: "absolute", left: "38%" }}>
														<input
															id="addressBill"
															value={this.state.addressLine1}
															type="text"
															className="newInputValue"
															onChange={(e) => {
																this.onChangeAddressInput(e.target.value);
															}}
														/>
													</div>
												</div>

												<hr
													style={{
														borderTop: "1px solid rgb(221, 222, 227,0.5)",
														width: "90%",
														margin: "auto",
													}}
												/>
												<div
													className="form-contactdetails"
													style={{ marginTop: "10px" }}
													id="cityBill"
												>
													<div>
														<label
															htmlFor="cityBill"
															className="inputPlaceholder ml-4"
														>
															City <span className="primary-link">*</span>
														</label>
													</div>
													<div
														className={"d-flex"}
														style={{ position: "absolute", left: "38%" }}
													>
														<input
															id="cityBill"
															value={this.state.city}
															type="text"
															// className="form-control form-control-lg form-input-box-380-reverse remove-outline"
															className="newInputValue"
															onChange={(e) => {
																this.setState(
																	{ city: e.target.value, cityError: false },
																	() => {
																		this.checkForChanges(this.state.city);
																	}
																);
															}}
														/>
														{this.state.cityError && (
															<ErrorMessage
																message={"City field is required"}
															/>
														)}
													</div>
												</div>
												<hr
													style={{
														borderTop: "1px solid rgb(221, 222, 227,0.5)",
														width: "90%",
														margin: "auto",
													}}
												/>
												<div
													className="form-contactdetails"
													style={{ marginTop: "10px" }}
													id="stateBill"
												>
													<label
														htmlFor="stateBill"
														className="inputPlaceholder ml-4"
													>
														State
													</label>
													<div style={{ position: "absolute", left: "38%" }}>
														<input
															id="stateBill"
															value={this.state.state}
															type="text"
															// className="form-control form-control-lg form-input-box-220-reverse remove-outline"
															className="newInputValue"
															onChange={(e) => {
																this.setState({ state: e.target.value }, () => {
																	this.checkForChanges(this.state.state);
																});
															}}
														/>
													</div>
												</div>
												<hr
													style={{
														borderTop: "1px solid rgb(221, 222, 227,0.5)",
														width: "90%",
														margin: "auto",
													}}
												/>
												<div
													className="form-contactdetails"
													style={{ marginTop: "13px" }}
													id="zipcodeBill"
												>
													<label
														htmlFor="zipcodeBill"
														className="inputPlaceholder ml-4"
													>
														Code
													</label>
													<div style={{ position: "absolute", left: "38%" }}>
														<input
															id="zipcodeBill"
															value={this.state.postCode}
															type="text"
															// className="form-control form-control-lg form-input-box-150-reverse remove-outline"
															className="newInputValue"
															onChange={(e) => {
																this.setState(
																	{ postCode: e.target.value },
																	() => {
																		this.checkForChanges(this.state.postCode);
																	}
																);
															}}
														/>
													</div>
												</div>
												<hr
													style={{
														borderTop: "1px solid rgb(221, 222, 227,0.5)",
														width: "90%",
														margin: "auto",
													}}
												/>
												<div
													className="form-contactdetails"
													style={{ marginTop: "13px" }}
													id="country"
												>
													<label
														htmlFor="country"
														className="inputPlaceholder ml-4"
													>
														Country
													</label>
													<div style={{ position: "absolute", left: "37%" }}>
														<FormControlSingle>
															<StyledSelect
																// className="form-control form-input-box-380-reverse"
																id="country"
																value={this.state.country}
																onChange={this.selectCountry}
																variant="outlined"
																style={{
																	width: "200px",
																	fontSize: "12px",
																	height: "30px",
																	backgroundColor: "inherit",
																}}
																MenuProps={styles.selectMenuPropsMini}
															>
																<MenuItem>Select Country</MenuItem>
																{allCountries.map((country, index) => {
																	return (
																		<MenuItem key={index} value={country.code}>
																			{country.name}
																		</MenuItem>
																	);
																})}
															</StyledSelect>
														</FormControlSingle>
													</div>
												</div>
												<hr
													style={{
														borderTop: "1px solid rgb(221, 222, 227,0.5)",
														width: "90%",
														margin: "auto",
													}}
												/>
												<div
													className="form-contactdetails"
													style={{ marginTop: "13px" }}
													id="timezone"
												>
													<label
														htmlFor="timezone"
														className="inputPlaceholder ml-4"
													>
														Timezone
													</label>
													<div style={{ position: "absolute", left: "37%" }}>
														<FormControlSingle>
															<Select
																id="timezone"
																value={this.state.userTimezone}
																onChange={this.selectTimezone}
																variant="outlined"
																style={{
																	width: "200px",
																	fontSize: "12px",
																	height: "30px",
																	backgroundColor: "inherit",
																}}
																MenuProps={styles.selectMenuPropsMini}
															>
																<MenuItem>Select Timezone</MenuItem>
																{this.state.timeZones.map((timezone, index) => {
																	return (
																		<MenuItem
																			key={index}
																			value={timezone.value}
																		>
																			{timezone.placeholder}
																		</MenuItem>
																	);
																})}
															</Select>
														</FormControlSingle>
													</div>
												</div>
											</form>
										</div>
										<div className="privacy-details">
											<div className=" py-2 d-flex justify-content-between switchDetails">
												I want to appear in onship user directory search results
												<Switch
													variant={"pill"}
													color={"primary"}
													checked={searchable}
													// onChange={() =>
													// 	this.props.onChangeSettings(
													// 		"searchable",
													// 		!searchable
													// 	)
													// }
													onChange={(e) => {
														this.setState({ searchable: !searchable }, () => {
															this.checkForChanges(!searchable);
														});
													}}
												/>
											</div>
											<div>
												<hr
													style={{
														borderTop: "1px solid rgb(221, 222, 227,0.5)",
														// opacity: "0.05",
													}}
												/>
											</div>

											<div className="d-flex justify-content-between switchDetails">
												<div>
													I want to share my profile information with my
													contacts
												</div>
												<Switch
													variant={"pill"}
													color={"primary"}
													checked={visible}
													// onChange={() =>
													// 	this.props.onChangeSettings("visible", !visible)
													// }
													onChange={(e) => {
														this.setState({ visible: !visible }, () => {
															this.checkForChanges(!visible);
														});
													}}
												/>
											</div>
										</div>
									</div>
								</div>

								<div className="pb-50 d-flex">
									<button
										type="button"
										className="btn btn-open m-1"
										onClick={this.saveProfile}
										style={{
											height: "30px",
											width: "100px",
											borderRadius: "20px",
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
											margin: "0 21.4px 0 0",
											padding: "15px 55px 15px 55px",
										}}
									>
										Save
									</button>
									<button
										type="button"
										className="btn btn-cancel m-1"
										onClick={() => {
											this.setState({ confirmCancel: true });
										}}
										disabled={this.state.disableCancel}
										style={{
											height: "30px",
											width: "100px",
											borderRadius: "20px",
											backgroundColor: "rgba(99, 141, 255, 0.1)",
											margin: "0 21.4px 0 0",
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
											padding: "15px 55px 15px 55px",
										}}
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
};

export default connect(mapDataToProps, mapActionsToProps)(ProfileDetailsView);
