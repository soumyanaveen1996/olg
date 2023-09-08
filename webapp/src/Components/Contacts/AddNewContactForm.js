import React, { Component } from "react";
import Error from "../Common/Error";
import Avatar from "../Common/Avatar";
import { Label } from "reactstrap";
import {
	getProfilePhoto,
	uploadProfilePhoto,
} from "../../Services/FilesService";
import { createUUID } from "../../Utils/Helpers";
import store from "../../State/configureStore";
import _ from "lodash";
class AddNewContactForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			errorMsg: null,
			name: null,
			phoneType: [
				{
					type: "satellite",
					inputPlaceholderCode: "54",
					inputPlaceholderNumber: "118930475",
					placeholder: "Satellite",
					countryCode: "",
					value: "",
				},
			],
			phoneNumberTypeArr: [
				{
					type: "satellite",
					placeholder: "Satellite",
					nputPlaceholderCode: "54",
					inputPlaceholderNumber: "118930475",
					countryCode: "",
					value: "",
				},
				{
					type: "mobile",
					placeholder: "Mobile",
					nputPlaceholderCode: "54",
					inputPlaceholderNumber: "118930475",
					countryCode: "",
					value: "",
				},
				{
					type: "land",
					placeholder: "Landline",
					nputPlaceholderCode: "54",
					inputPlaceholderNumber: "118930475",
					countryCode: "",
					value: "",
				},
			],
			emailType: [
				{
					type: "home",
					placeholder: "Email home",
					value: "",
				},
			],
		};
	}
	componentDidMount() {
		if (this.props.contact) {
			let contactData = { ...this.props.contact };
			let email = [];
			let phone = [];
			let userId = contactData.userId;
			if (contactData.emailAddresses) {
				Object.keys(contactData.emailAddresses).forEach((key) => {
					let emailObj = {};
					emailObj.type = key;
					if (key === "home") {
						emailObj.placeholder = "Email home";
					} else {
						emailObj.placeholder = "Email work";
					}
					emailObj.value = contactData.emailAddresses[key];
					email.push(emailObj);
				});
			} else {
				email = [
					{
						type: "home",
						placeholder: "Email home",
						value: "",
					},
				];
			}

			if (contactData.phoneNumbers) {
				Object.keys(contactData.phoneNumbers).forEach((key) => {
					let phoneObj = {};
					let number = contactData.phoneNumbers[key].split(" ");

					phoneObj.type = key;
					if (number.length > 0) {
						// phoneObj.countryCode = number[0];
						// phoneObj.value = number[1] === "undefined" ? "" : number[1];
						phoneObj.value = number[0] === "undefined" ? "" : number[0];
						if (
							number[1] === "null" ||
							number[1] === null ||
							number[1] === "" ||
							number[1] === "undefined"
						) {
							phoneObj.value = "";
						}
					}
					if (key === "satellite") {
						phoneObj.placeholder = "Satellite";
						phone.splice(0, 0, phoneObj);
					} else if (key === "mobile") {
						phoneObj.placeholder = "Mobile";
						phone.splice(1, 0, phoneObj);
					} else {
						phoneObj.placeholder = "Landline";
						phone.splice(2, 0, phoneObj);
					}
					// console.log("phoneObj ==== ", phoneObj);
				});
			}
			// console.log("contactData", contactData.phoneNumbers);

			if (!userId) {
				userId = createUUID();
			}
			this.setState({
				name: contactData.userName,
				emailType: email,
				phoneType: phone,
				userId: userId,
				profilePhoto: contactData.profilePhoto,
				originalProfilePhoto: contactData.profilePhoto,
			});
		} else {
			this.setState({
				userId: createUUID(),
			});
		}
	}

	changeName = (e) => {
		e.preventDefault();
		// console.log(e.target.value);
		this.setState({ name: e.target.value, errorMsg: null });
	};

	addPhone = () => {
		let getPhoneNumberTypeArr = _.cloneDeep(this.state.phoneNumberTypeArr);
		let getArray = _.cloneDeep(this.state.phoneType);
		let numObj;
		let getNumber = [];
		for (let i = 0; i < getPhoneNumberTypeArr.length; i++) {
			if (
				getArray.findIndex(
					(elem) => elem.type === getPhoneNumberTypeArr[i].type
				) === -1
			) {
				numObj = getPhoneNumberTypeArr[i];
				getNumber.push(numObj);
				break;
			}
		}

		// let newObj;

		// if (getArray.length === 0) {
		//   newObj = {
		//     type: "satellite",
		//     inputPlaceholderCode: "54",
		//     inputPlaceholderNumber: "118930475",
		//     placeholder: "Satellite",
		//     countryCode: "",
		//     value: "",
		//   };
		// }
		// if (getArray.length === 1) {
		//   newObj = {
		//     type: "mobile",
		//     inputPlaceholderCode: "54",
		//     inputPlaceholderNumber: "118930475",
		//     countryCode: "",
		//     placeholder: "Mobile",
		//     value: "",
		//   };
		// }
		// if (getArray.length === 2) {
		//   newObj = {
		//     type: "land",
		//     inputPlaceholderCode: "54",
		//     inputPlaceholderNumber: "118930475",
		//     countryCode: "",
		//     placeholder: "Landline",
		//     value: "",
		//   };
		// }

		if (getArray.length >= 3) {
			return;
		}

		getArray.push(numObj);

		this.setState({ phoneType: [...getArray] });
	};
	addEmail = () => {
		let getArray = [...this.state.emailType];
		let newObj;

		if (getArray.length === 0) {
			newObj = {
				type: "home",
				placeholder: "Email home",
				value: "",
			};
		}
		if (getArray.length === 1 && getArray[0].type === "home") {
			newObj = {
				type: "work",
				placeholder: "Email work",
				value: "",
			};
		}

		if (getArray.length === 1 && getArray[0].type === "work") {
			newObj = {
				type: "home",
				placeholder: "Email home  ",
				value: "",
			};
		}
		if (getArray.length >= 2) {
			return;
		}

		getArray.push(newObj);

		this.setState({ emailType: [...getArray] });
	};

	changeNumber(index, e) {
		let getArray = [...this.state.phoneType];
		const re = /^[+0-9\b]+$/;

		let phoneNumber = e.target.value;
		if (e.target.value === "" || re.test(phoneNumber)) {
			getArray[index].value = phoneNumber;
			this.setState({ phoneType: [...getArray] });
		} else {
			e.preventDefault();
		}
	}
	changeNumberCode(index, e) {
		let getArray = [...this.state.phoneType];
		const re = /^\+[0-9\b]*$/;
		if (
			!this.state.phoneType[index].countryCode ||
			(this.state.phoneType[index].countryCode &&
				this.state.phoneType[index].countryCode.length === 0)
		) {
			e.target.value = "+" + e.target.value;
		}
		if (
			e.target.value === "" ||
			(re.test(e.target.value) && e.target.value !== "+0")
		) {
			getArray[index].countryCode = e.target.value;
			this.setState({ phoneType: [...getArray] });
		} else {
			e.preventDefault();
		}
	}
	//
	// countryCodeValidation(index) {
	//   const re = /^\+[0-9]{4}$/;
	//   let getArray = [...this.state.phoneType];
	//   let countryCode = getArray[index].countryCode;
	//   console.log("Manish [countryCodeValidation] re.test(countryCode) = ", re.test(countryCode))
	//   if (countryCode === "+" || countryCode === "" || !re.test(countryCode)) {
	//     return false;
	//   }
	//   return true;
	// }
	changeEmail(index, e) {
		let getArray = [...this.state.emailType];
		getArray[index].value = e.target.value;

		this.setState({ emailType: [...getArray] });
	}

	removePhone(index) {
		let getArray = [...this.state.phoneType];
		getArray.splice(index, 1);

		// console.log(index, getArray);

		this.setState({ phoneType: [...getArray] });
	}
	removeEmail(index) {
		let getArray = [...this.state.emailType];
		getArray.splice(index, 1);

		// console.log(index, getArray);

		this.setState({ emailType: [...getArray] });
	}

	submit = () => {
		let currState = { ...this.state };
		delete currState.uploading;
		currState.phoneType.forEach((elem) => {
			let firstChar = elem.value.charAt(0);
			if (firstChar !== "+" && elem.value.length) {
				elem.value = "+" + elem.value;
			}
		});

		console.log("data to save ", currState);

		if (!this.state.name) {
			this.setState({ errorMsg: "Name field is required." });
			return;
		}
		// console.log("saving localcontact ", currState);
		if (this.props.edit) {
			currState.userId = this.props.contact.userId;
		}
		this.props.addNewContact(currState);
	};

	loadProfilePic = () => {
		let loggedInUser = store.getState().user.user.userId;
		getProfilePhoto(loggedInUser + this.state.userId + "_75x75.png")
			.then((file) => {
				this.setState({ profilePhoto: file });
			})
			.catch((err) => {
				console.error("error in add new contact form image load", err);
			});
	};

	uploadPhoto = (e) => {
		let filesObj = e.target.files;
		if (!filesObj) {
			return;
		}
		let loggedInUser = store.getState().user.user.userId;
		this.setState({ uploading: true });
		uploadProfilePhoto(loggedInUser + this.state.userId + ".png", filesObj[0])
			.then((response) => {
				this.setState({ uploading: false });
				this.loadProfilePic();
			})
			.catch((error) => {
				this.setState({ uploading: false });
			});
	};

	render() {
		let { name, uploading, percentCompleted, profilePhoto } = this.state;
		let avatarStyle = profilePhoto
			? {
					borderRadius: "50%",
					background: "#fff",
					objectFit: "contain",
			  }
			: {
					borderRadius: "50%",
					width: "120px !important",
					height: "120px !important",
					padding: "30%",
					background: "#f4f4f4",
			  };
		profilePhoto = profilePhoto || "/img/avatar-icon-placeholder.png";
		return (
			<React.Fragment>
				{this.state.errorMsg && this.state.errorMsg.length > 0 && (
					<div className="d-flex flex-column p-2">
						<Error message={this.state.errorMsg} />
					</div>
				)}
				<div className="p-2">
					<div className="d-flex justify-content-center align-items-center">
						<div className="d-flex justify-content-center align-items-center">
							{!this.props.edit ? (
								<Avatar
									style={avatarStyle}
									color="bg-fm-primary"
									name={name}
									size={120}
									imgSrc={profilePhoto}
								/>
							) : (
								<Avatar
									style={avatarStyle}
									color="bg-fm-primary"
									name={name}
									size={120}
									height={
										profilePhoto === "/img/avatar-icon-placeholder.png"
											? "auto"
											: 120
									}
									imgSrc={profilePhoto}
								/>
							)}
							<a
								className="primary-link my-2 d-flex justify-content-center align-items-center mr-2"
								onClick={() => {}}
								style={{
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
						</div>
						<div>
							<label htmlFor="contact-name">Name</label>
							<input
								id="contact-name"
								type="text"
								onChange={this.changeName}
								value={name || ""}
								className="form-control form-control-lg form-input-box-300 contact-form-text"
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
					<div className="p-2 mb-10">
						{this.state.phoneType.map((elem, index) => {
							return (
								<div className="phone-container" key={index}>
									<hr className="hr-mb-0 hr-mt-0" />
									<div className="d-flex phone-section">
										<div className="d-flex w-35 h-100 align-items-center">
											{elem.type === "mobile" && (
												<img
													loading="lazy"
													className="icon-contact-phoneType mr-2"
													src="/img/phone icon@2x.png"
													alt="mobile"
												/>
											)}
											{elem.type === "land" && (
												<img
													loading="lazy"
													className="icon-contact-phoneType mr-2"
													src="/img/phone icon@2x.png"
													alt="landline"
												/>
											)}
											{elem.type === "satellite" && (
												<img
													loading="lazy"
													className="icon-contact-phoneType mr-2"
													style={{ width: "14px", height: "auto" }}
													src="/img/satellite phone ico@2x.png"
													alt="satellite"
												/>
											)}
											<span>{elem.placeholder}</span>
										</div>
										<div className="vertical-divider" />
										<div className="w-65 d-flex align-items-center">
											{/* <input
                        value={elem.countryCode || ""}
                        placeholder={elem.inputPlaceholderCode || "54"}
                        className="form-control form-control-lg w-28 h-100 no-border-input contact-form-text "
                        onChange={this.changeNumberCode.bind(this, index)}
                        type="text"
                        // autoFocus
                        maxLength={5}
                        // onFocus={() => {
                        //   // console.log("we clicked on this");
                        //   this.setState({ nowCheckCountryCode: false });
                        // }}
                        // onBlur={() => {
                        //   this.setState({ nowCheckCountryCode: true });
                        // }}
                      /> */}

											{/*{this.state.nowCheckCountryCode &&*/}
											{/*  !this.countryCodeValidation(index) && (*/}
											{/*    <span style={{ color: "red", fontSize: "10px" }}>*/}
											{/*      * Invalid*/}
											{/*    </span>*/}
											{/*  )}*/}
											<div
												style={{
													height: "26px",
													width: "1px",
													borderRight: "1px solid #DDDEE3",
												}}
											/>
											<input
												value={elem.value || ""}
												placeholder={
													elem.inputPlaceholderNumber || "+54118930475"
												}
												className="form-control form-control-lg w-70 h-100 no-border-input contact-form-text"
												onChange={this.changeNumber.bind(this, index)}
												type="text"
												maxLength={16}
												
											/>
										</div>
									</div>
									{index !== 0 && (
										<a
											className="close-btn-contact"
											onClick={this.removePhone.bind(this, index)}
										>
											<img
												loading="lazy"
												style={{ width: "10px", height: "10px" }}
												src="/img/search-clear-icon@2x.png"
												alt=""
											/>
										</a>
									)}
								</div>
							);
						})}
						<div>
							<hr className="hr-mb-0 hr-mt-0" />
							{this.state.phoneType.length < 3 && (
								<div className="p-2">
									<a
										style={{ color: "rgb(0, 189, 242)", fontSize: "14px" }}
										onClick={this.addPhone}
									>
										{" "}
										<img
											loading="lazy"
											className="mr-1"
											style={{ width: "10px", height: "10px" }}
											src="/img/plus-icon.png"
											alt=""
										/>{" "}
										Add phone
									</a>
								</div>
							)}
						</div>
					</div>

					<div className="p-2">
						{this.state.emailType.map((elem, index) => {
							return (
								<div className="phone-container" key={index}>
									<hr className="hr-mb-0 hr-mt-0" />
									<div className="d-flex phone-section">
										<div className="d-flex w-35 h-100 align-items-center">
											<img
												loading="lazy"
												className="icon-contact-emailType mr-2"
												src="/img/email-icon@2x.png"
												alt=""
											/>
											<span>{elem.placeholder}</span>
										</div>
										<div className="vertical-divider" />
										<div className="w-65">
											<input
												className="form-control-lg w-100 h-100 no-border-input contact-form-text-email"
												onChange={this.changeEmail.bind(this, index)}
												value={elem.value || ""}
												type="email"
											/>
										</div>
									</div>
									{index !== 0 && (
										<a
											className="close-btn-contact"
											onClick={this.removeEmail.bind(this, index)}
										>
											<img
												loading="lazy"
												style={{ width: "10px", height: "10px" }}
												src="/img/search-clear-icon@2x.png"
												alt=""
											/>
										</a>
									)}
								</div>
							);
						})}
						<div>
							<hr className="hr-mb-0 hr-mt-0" />
							{this.state.emailType.length < 2 && (
								<div className="p-2">
									<a
										style={{ color: "rgb(0, 189, 242)", fontSize: "14px" }}
										onClick={this.addEmail}
									>
										{" "}
										<img
											loading="lazy"
											className="mr-1"
											style={{ width: "10px", height: "10px" }}
											src="/img/plus-icon.png"
											alt=""
										/>{" "}
										Add email
									</a>
								</div>
							)}
						</div>
					</div>
					<div className="d-flex justify-content-center">
						<a
							className="btn btn-sm btn-install-contact mr-2"
							onClick={this.props.cancel}
						>
							Cancel
						</a>
						{this.props.edit ? (
							<button
								onClick={this.submit}
								className="btn btn-sm btn-open-contact"
							>
								Update
							</button>
						) : (
							<button
								onClick={this.submit}
								className="btn btn-sm btn-open-contact"
							>
								Done
							</button>
						)}
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default AddNewContactForm;
