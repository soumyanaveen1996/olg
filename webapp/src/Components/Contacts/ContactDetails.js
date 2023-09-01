import React, { Component } from "react";
import Avatar from "../Common/Avatar";
import CallButton from "../Telephony/CallButton";
import AcceptIgnoreUser from "./AcceptOrIgnoreUser";
import ModalPopup from "../ModalMessages/ModalPopup";
import Notify from "../ModalMessages/ToastNotif";
import Scrollbars from "react-custom-scrollbars-2";
import dayjs from "dayjs";
import AddNewContactForm from "./AddNewContactForm";
import { updateLocalContact } from "../../Services/ContactsService";
import _ from "lodash";

export function getPhoneIconClass(type) {
	if (type === "land") {
		return "icon-phone";
	} else if (type === "mobile") {
		return "icon-phone";
	} else if (type === "satellite") {
		return "icon-satellite";
	}
}

class ContactDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			contact: null,
			showPhoneNumbers: false,
			getCreditModal: false,
			showNoBalance: false,
			getConfirmCreditModal: false,
			showStripe: false,
			codeAlreadyApplied: false,
			amountToCredit: 0,
			totalAmount: 0,
			topUpAmount: 0,
			taxAmount: 0,
			profilePicUrl: null,
		};
	}

	componentDidMount() {
		if (this.props.contact) {
			this.setState({ contact: this.props.contact });
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.currentUserId !== this.props.contact.userId) {
			if (!_.isEqual(this.props.contact, prevState.contact)) {
				this.setState({ contact: this.props.contact });
			} else {
				return false;
			}
		} else {
			return false;
		}
	}

	closeAddNewContact = () => this.setState({ editContact: false });
	addNewContact = (data) => {
		console.log("editing data", data);
		let saveArray = [];

		let saveContactObj = {
			userId: data.userId,
			userName: data.name,
			emailAddresses: {},
			phoneNumbers: {},
		};

		if (!data.name || data.name === "") {
			return;
		}
		if (data.emailType.length > 0) {
			data.emailType.forEach((elem, index) => {
				if (elem.value) {
					if (index === 0) {
						saveContactObj.emailAddresses["home"] = elem.value || "";
					} else {
						saveContactObj.emailAddresses["work"] = elem.value || "";
					}
				}
			});
		}
		if (data.phoneType.length > 0) {
			data.phoneType.forEach((elem) => {
				if (elem.value) {
					if (elem.type === "satellite") {
						saveContactObj.phoneNumbers["satellite"] = elem.value || "";
					} else if (elem.type === "mobile") {
						saveContactObj.phoneNumbers["mobile"] = elem.value || "";
					} else if (elem.type === "land") {
						saveContactObj.phoneNumbers["land"] = elem.value || "";
					}
				}
			});
		}

		saveArray.push(saveContactObj);
		updateLocalContact(saveArray)
			.then(() => {
				saveContactObj["contactType"] = "local";
				saveContactObj["profilePhoto"] = data.profilePhoto;
				this.props.selectedContactAction(saveContactObj);
				this.props.updateSelectedContact(saveContactObj);
				this.closeAddNewContact();
			})
			.catch((error) => {
				console.log("error ", error);
				Notify({
					type: "error",
					message: `Error while updating the contact ${saveContactObj.userName}. Please try again later.`,
				});
			});
	};

	setProfileImg = (contact, userId, allProfileImages) => {
		if (contact.contactType === "local") {
			if (allProfileImages) {
				return allProfileImages[userId + contact.userId];
			}
		} else {
			if (allProfileImages) {
				return allProfileImages[contact.userId];
			}
		}
	};
	render() {
		let {
			startConversation,
			selectedDomain,
			callhistory,
			balance,
			userId,
			allProfileImages,
		} = this.props;

		let { contact } = this.state;

		let phoneNumbers = [];
		if (contact && contact.phoneNumbers) {
			phoneNumbers = Object.keys(contact.phoneNumbers).map((key) => {
				let number = contact.phoneNumbers[key];
				let numberNew = number.replace(/\s/g, "");

				return { key, value: numberNew };
			});
		}

		let imgSrc =
			contact && this.setProfileImg(contact, userId, allProfileImages);
		if (!contact) {
			return null;
		}
		return (
			<div className="text-center px-5 xs-6">
				<div className="d-flex align-items-center justify-content-between px-4">
					<div className="d-flex justify-content-between align-items-center w-100">
						<div className="d-flex align-items-center">
							<div style={{ position: "relative" }}>
								<Avatar
									style={{
										borderRadius: "50%",
										background: "#fff",
									}}
									color="bg-fm-primary"
									name={contact.name || contact.userName}
									size={160}
									height={160}
									imgSrc={imgSrc}
								/>
								{contact.contactType && (
									<a
										style={{
											position: "absolute",
											bottom: "20px",
											right: "0px",
											width: "30px",
											height: "30px",
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
											backgroundColor: "#fff",
											borderRadius: "50%",
										}}
										onClick={() => {
											this.setState({ editContact: true });
										}}
									>
										<i
											className="icon-pencil"
											style={{
												color: "#638dff",
												fontWeight: "bold",
												fontSize: "14px",
												padding: "5px",
												transform: "scaleY(1)",
											}}
										/>
									</a>
								)}
							</div>

							<h5 className="ml-4">{contact.name || contact.userName}</h5>
						</div>
					</div>

					<div className="d-flex justify-content-between">
						{selectedDomain &&
							selectedDomain.viewModes &&
							selectedDomain.viewModes.chat &&
							!contact.type &&
							!contact.contactType && (
								<div className="d-flex flex-column align-items-center mx-1">
									<a
										disabled={
											!contact.showAcceptIgnoreMsg &&
											!contact.waitingForConfirmation
												? ""
												: "disabled"
										}
										onClick={() => startConversation(contact)}
										style={{ color: "#fff" }}
										className="btn btn-open btn-icon-o btn-sm mx-1 btn-rounded mb-2"
									>
										<i className="icon-bubble" />
									</a>
									Chat
								</div>
							)}
					</div>
				</div>
				{!contact.type && !contact.showAcceptIgnoreMsg && (
					<div className="p-4">
						<hr style={{ borderTop: "1px solid #DDDEE3" }} />
						<div>
							{contact.emailAddress && (
								<span>
									<div className="row d-flex align-items-center justify-content-between">
										<div className="col-8 d-flex align-items-center justify-content-between">
											<div style={{ color: "#9B9B9B" }}>
												<i
													className="icon-envelope mr-2"
													style={{ color: "#638DFF" }}
												/>
												Email
											</div>
											<div
												className="text-left ml-4"
												style={{ color: "#666666" }}
											>
												{contact.emailAddress}
											</div>
										</div>
									</div>
									<hr style={{ borderTop: "1px solid #DDDEE3" }} />
								</span>
							)}
							{contact.emailAddresses &&
								Object.keys(contact.emailAddresses).map((elem, index) => {
									return (
										<span key={index}>
											<div className="row d-flex align-items-center justify-content-between">
												<div className="col-8 d-flex align-items-center justify-content-between">
													<div style={{ color: "#9B9B9B" }}>
														<div className="d-flex" style={{ alignItems: "center" }}>
															<i className="icon-envelope mr-2" style={{ color: "#638DFF" }} />
															{`Email ${elem}`}
														</div>
													</div>
													<div
														className="text-left ml-4"
														style={{ color: "#666666" }}
													>
														{contact.emailAddresses[elem]}
													</div>
												</div>
											</div>
											<hr style={{ borderTop: "1px solid #DDDEE3" }} />
										</span>
									);
								})}
							{/* {phoneNumbers &&
								phoneNumbers.map((elem, index) => {
									const phoneIcon =
										elem.key === "satellite"
											? "/img/satellite phone ico@2x.png"
											: "/img/phone icon@2x.png";
									if (elem.key === "land") {
										elem.key = "landline";
									}
									return (
										<span key={index}>
											<div className="row d-flex align-items-center justify-content-between">
												<div className="col-8 d-flex align-items-center justify-content-between">
													<div style={{ color: "#9B9B9B" }}>
														<img
															loading="lazy"
															className="icon-contact-phoneType mr-2"
															style={{
																width: "13px",
																height: "auto",
																color: "#638dff !important",
															}}
															src={phoneIcon}
															alt={elem.key}
														/>
														<i
															className={getPhoneIconClass(elem.key) + " mr-2"}
															style={{ color: "#638DFF" }}
														/>
														<span>
															{`${elem.key
																.charAt(0)
																.toUpperCase()}${elem.key.substr(1)}`}
														</span>
													</div>
													<div
														className="text-left ml-4"
														style={{ color: "#666666" }}
													>
														{elem.value}
													</div>
												</div>
											</div>
											<hr style={{ borderTop: "1px solid #DDDEE3" }} />
										</span>
									);
								})} */}
						</div>
						{this.props.selectedDomain.viewModes.voip &&
							!contact.waitingForConfirmation &&
							!contact.showAcceptIgnoreMsg &&
							!contact.type &&
							!contact.contactType && (
								<span>
									<div className="row d-flex align-items-center justify-content-between">
										<div className="col-8 d-flex align-items-center justify-content-between">
											<div
												style={{
													color: "#9B9B9B",
													textTransform: "capitalize",
												}}
											>
												<img
													loading="lazy"
													src="/img/call-icon-frontm1.png"
													className="mr-2"
													style={{ height: "20px", width: "14px" }}
												/>
												FrontM
											</div>
											<div className="text-left" style={{ color: "#2FC76F" }}>
												*Free
											</div>
										</div>

										<div className="col-4 d-flex align-items-center justify-content-end">
											<CallButton
												balance={balance}
												callType="voip"
												from={this.props.emailAddress}
												to={contact.userId}
												closeCallHistory={() => {
													console.log("close call history");
												}}
												toName={contact.userName}
												className="btn btn-success btn-icon-o btn-sm mx-1 btn-rounded mb-2"
											>
												<i
													className="icon-phone-outgoing"
													style={{ color: "#fff" }}
												/>
											</CallButton>
											<CallButton
												balance={balance}
												callType="voip"
												from={this.props.emailAddress}
												to={contact.userId}
												closeCallHistory={() => {
													console.log("close call history");
												}}
												toName={contact.userName}
												video={true}
												className="btn btn-success btn-icon-o btn-sm mx-1 btn-rounded mb-2"
											>
												<i className="icon-camera" style={{ color: "#fff" }} />
											</CallButton>
										</div>
									</div>
									<hr style={{ borderTop: "1px solid #DDDEE3" }} />
								</span>
							)}
						{this.props?.selectedDomain?.viewModes?.voip &&
							this.props?.selectedDomain?.viewModes?.pstn &&
							phoneNumbers.length >= 1 &&
							phoneNumbers.map((phone, index) => {
								let number;
								if (
									phone.value === "null" ||
									phone.value === "" ||
									phone.value === " " ||
									!phone.value
								) {
									number = "";
									return null;
								} else {
									let indexOfUndefined = phone.value.indexOf("undefined");
									if (indexOfUndefined !== -1) {
										number = phone.value.slice(0, indexOfUndefined);
									} else {
										number = phone.value;
									}
									return (
										<span key={index}>
											<div className="row d-flex align-items-center justify-content-between">
												<div className="col-8 d-flex align-items-center justify-content-between">
													<div
														style={{
															color: "#9B9B9B",
															textTransform: "capitalize",
														}}
													>
														<i
															className={getPhoneIconClass(phone.key) + " mr-2"}
															style={{ color: "#638DFF" }}
														/>
														{phone.key}
													</div>
													<div
														className="text-left"
														style={{ color: "#666666" }}
													>
														{number}
													</div>
												</div>
												<div className="col-4 d-flex align-items-center justify-content-end">
													<CallButton
														balance={balance}
														callType={
															phone.key === "satellite" ? "sat" : "phone"
														}
														from={this.props.emailAddress}
														to={phone.value}
														closeCallHistory={() => {
															console.log("close history");
														}}
														localCall={
															contact.contactType === "local" ? "local" : null
														}
														toUserId={contact.userId}
														toName={contact.userName}
														openGetRecharge={() => this.props.openRecharge()}
														className="btn btn-success btn-icon-o btn-sm mx-1 btn-rounded ml-3"
													>
														<i
															className="icon-phone-outgoing"
															style={{ color: "#fff" }}
														/>
													</CallButton>
												</div>
											</div>
											<hr style={{ borderTop: "1px solid #DDDEE3" }} />
										</span>
									);
								}
							})}
						,
						{!contact.contactType && callhistory && callhistory.length > 0 && (
							<div>
								<CallHistory history={callhistory} />
							</div>
						)}
					</div>
				)}

				{this.state.editContact && (
					<ModalPopup
						onClose={this.closeAddNewContact}
						size="sm"
						title="Edit contact"
					>
						<AddNewContactForm
							cancel={this.closeAddNewContact}
							addNewContact={this.addNewContact}
							contact={contact}
							edit={true}
						/>
					</ModalPopup>
				)}

				{contact.waitingForConfirmation && (
					<div className="p-2 d-inline-flex justify-content-around align-items-center mt-2 ">
						<h4 style={{ marginLeft: "20px", color: "#B9B9B9" }}>
							Waiting for authorization. <br /> Contact’s information is not
							available yet.
						</h4>
					</div>
				)}
				{contact && contact.showAcceptIgnoreMsg && (
					<AcceptIgnoreUser
						showAcceptIgnoreMsg={contact.showAcceptIgnoreMsg}
						contact={contact}
						accept={this.props.accept}
						ignore={this.props.ignore}
					/>
				)}
				{!contact.type && !contact.showAcceptIgnoreMsg && (
					<div className="p-4 d-flex justify-content-center mt-4">
						<a
							className="warning-text"
							onClick={() => this.props.remove(contact)}
						>
							<i className="icon-trash2 warning-text mr-2" />
							Delete contact
						</a>
					</div>
				)}
			</div>
		);
	}
}

const CallHistory = (history) => {
	const { history: callHistory } = history;
	return (
		<div>
			<h5>History</h5>
			<Scrollbars autohide="true" style={{ height: "20vh" }}>
				<div className="d-flex flex flex-column">
					{callHistory.map((call, index) => {
						return (
							<div
								key={index}
								className="d-flex mx-4 my-2 pb-2 align-items-center justify-content-between"
								style={{ borderBottom: "1px solid #00000033" }}
							>
								<div
									className="d-flex align-items-center justify-content-between"
									style={{ width: "100%" }}
								>
									<div className="ml-3 d-flex flex-column">
										<span className="list-content" style={{ color: "#666666" }}>
											<span className="text-capitalize mr-2">
												<img
													loading="lazy"
													src={getIcon(call)}
													width={14}
													alt="Phone icon"
												/>
											</span>
											{dayjs(call.callTimestamp).format("DD MMM hh:mm a")}
											<span style={{ color: "#bababa" }}>
												{" "}
												{call.callType === "PSTN" &&
													call.callDirection === "outgoing"
													? " | +" + call.toNumber
													: ""}
												{call.callCharge > 0 && (
													<span style={{ fontSize: "12px", color: "#4A4A4A" }}>
														{" "}
														| $ {call.callCharge}
													</span>
												)}
												{call.callType !== "PSTN" &&
													call.callDirection !== "outgoing" && (
														<span>
															|{" "}
															<span
																style={{ fontSize: "12px", color: "#2FC76F" }}
															>
																Free
															</span>
														</span>
													)}
											</span>
										</span>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</Scrollbars>
		</div>
	);
};

const getIcon = (call) => {
	if (call.callDirection === "incoming") {
		if (call.duration === 0) {
			return "/img/call-received-red@2x.png";
		}
		return "/img/call-received-green@2x.png";
	}

	if (call.callDirection === "outgoing") {
		if (call.duration === 0) {
			return "/img/call-made-red@2x.png";
		}
		return "/img/call-made-green@2x.png";
	}
};

export default ContactDetails;
