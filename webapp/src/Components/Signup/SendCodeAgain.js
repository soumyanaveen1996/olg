import React, { Component } from "react";
import AuthServiceClient from "../../Services/Clients/AuthServiceClient";
import Toast from "../ModalMessages/Toast";
import { getSignupPath } from "../../Services/StorageService";
import {
	STATION_SATCOM_LANDING,
	STATION_SATCOM_RESET_BACKGROUND,
	THURAYA_LANDING,
	ONSHIP_LANDING,
	ONSHIP_RESET_BACKGROUND,
	THURAYA_RESET_BACKGROUND,
	VOYAGER_LANDING,
	VIKAND_LANDING,
	VIKAND_DIRECT_LANDING,
	INTELL4DESK_LANDING,
	VOYAGER_SIGNUP_BACKGROUND,
	VIKAND_RESET_BACKGROUND,
	INTELL4DESK_RESET_BACKGROUND,
	FRONTM_SIGNUP_BACKGROUND,
	VIKAND_DIRECT_RESET_BACKGROUND,
	ONECARE_LANDING,
	ONECARE_RESET_BACKGROUND,
	SIGMA_LANDING,
	SIGMA_RESET_BACKGROUND,
} from "../../Utils/Constants";
import ResetPasswordHeader from "../ResetPassword/ResetPasswordHeader";
import appType from "../../Utils/ApiConfig";
import history from "../../Services/History";

class SendCodeAgain extends Component {
	state = {
		email: "",
		loading: false,
		submitted: false,
		authCode: "",
	};
	componentDidMount() {
		console.debug(this.props.location.state);
		// console.log("we will see the ", this.props);

		const { email, authCode, password } = this.props.location.state;
		this.setState({ email, authCode, password });
	}

	changeEmail = (e) => {
		e.preventDefault();
		this.setState({ email: e.target.value });
	};

	handleSubmit = async (e) => {
		e.preventDefault();

		const { email } = this.state;

		// console.log("email to send", email);

		let typeOfApp = appType;

		let sendCodeAgainObj = {};

		if (typeOfApp) {
			sendCodeAgainObj = {
				email,
				appType: typeOfApp,
			};
		} else {
			sendCodeAgainObj = {
				email,
			};
		}

		AuthServiceClient.sendCodeAgain(sendCodeAgainObj)
			.then((response) => {
				return this.handleSuccess(response);
			})
			.catch((error) => {
				return this.handleError(error);
			})
			.then(() =>
				this.setState({
					submitting: false,
				})
			);
	};

	handleSuccess = (data) => {
		if (data.success) {
			Toast({
				type: "success",
				message:
					"Code sent successfully! Please verify the Code that has been emailed.",
				onClose: () =>
					history.push({
						pathname: "/verify",
						state: {
							email: this.state.email,
							password: this.state.password,
							authCode: this.state.authCode,
						},
					}),
				autoClose: 5000,
			});
		} else {
			Toast({
				type: "error",
				message: data.message,
			});
		}
	};
	handleError = (error) => {
		Toast({
			type: "error",
			message: error.message || "Error occurred while creating user",
		});
	};

	validateEmail = (email) => {
		var re =
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	};
	render() {
		const { email } = this.state;
		let newPathName = getSignupPath();
		let contentBackGround = "",
			resetBoxBackground = "",
			textColor = "",
			textBoxBackground = "",
			textBoxTextColor = "";

		switch (newPathName) {
			case VOYAGER_LANDING:
				contentBackGround = VOYAGER_SIGNUP_BACKGROUND;
				resetBoxBackground = "#1F2630";
				textColor = "#fff";
				textBoxTextColor = "#fff";
				textBoxBackground = "#2B313B";
				break;
			case VIKAND_LANDING:
				contentBackGround = VIKAND_RESET_BACKGROUND;
				resetBoxBackground = "rgba(31, 38, 48, 0.7)";
				textColor = "#fff";
				textBoxTextColor = "black";
				textBoxBackground = "#fff";
				break;
			case VIKAND_DIRECT_LANDING:
				contentBackGround = VIKAND_DIRECT_RESET_BACKGROUND;
				resetBoxBackground = "rgba(31, 38, 48, 0.7)";
				textColor = "#fff";
				textBoxTextColor = "black";
				textBoxBackground = "#fff";
				break;
			case INTELL4DESK_LANDING:
				contentBackGround = INTELL4DESK_RESET_BACKGROUND;
				resetBoxBackground = "rgba(31, 38, 48, 0.7)";
				textColor = "#fff";
				textBoxTextColor = "black";
				textBoxBackground = "#fff";
				break;
			case THURAYA_LANDING:
				contentBackGround = THURAYA_RESET_BACKGROUND;
				resetBoxBackground = "rgba(31, 38, 48, 0.7)";
				textColor = "#fff";
				textBoxTextColor = "black";
				textBoxBackground = "#fff";
				break;
			case ONECARE_LANDING:
				contentBackGround = ONECARE_RESET_BACKGROUND;
				resetBoxBackground = "rgba(31, 38, 48, 0.7)";
				textColor = "#fff";
				textBoxTextColor = "black";
				textBoxBackground = "#fff";
				break;
			case SIGMA_LANDING:
				contentBackGround = SIGMA_RESET_BACKGROUND;
				resetBoxBackground = "rgba(31, 38, 48, 0.7)";
				textColor = "#fff";
				textBoxTextColor = "black";
				textBoxBackground = "#fff";
				break;
			case STATION_SATCOM_LANDING:
				contentBackGround = STATION_SATCOM_RESET_BACKGROUND;
				resetBoxBackground = "rgba(9,69,116, 0.7)";
				textColor = "#fff";
				textBoxTextColor = "black";
				textBoxBackground = "#fff";
				break;
			case ONSHIP_LANDING:
				contentBackGround = ONSHIP_RESET_BACKGROUND;
				resetBoxBackground = "rgba(9,69,116, 0.7)";
				textColor = "#fff";
				textBoxTextColor = "black";
				textBoxBackground = "#fff";
				break;

			default:
				contentBackGround = FRONTM_SIGNUP_BACKGROUND;
				resetBoxBackground = "rgba(31, 38, 48, 0.7)";
				textColor = "#fff";
				textBoxTextColor = "black";
				textBoxBackground = "#fff";
				break;
		}

		if (newPathName && newPathName.length > 0) {
			return (
				<div className="d-flex flex-column">
					<ResetPasswordHeader landingPath={newPathName} />
					<div
						className="d-flex flex align-items-center"
						id="page-wrapper"
						style={{
							flex: 4,
							background: `url(${contentBackGround})`,
							backgroundSize: "cover",
							height: "100%",
							width: "100vw",
						}}
					>
						<div className="container">
							<div className="row align-self-center">
								<div className="col-lg-5 mr-auto ml-auto">
									<div
										className="rounded shadow-sm overflow-hidden"
										style={{ background: resetBoxBackground }}
									>
										<div className="row no-margin align-items-center">
											<div className="col-lg-12 no-padding text-center col-md-12">
												<h3
													className="fs-2x font300 lineH-1 mt-60 mb-10 h3-color"
													style={{ color: textColor, marginTop: "10px" }}
												>
													Verification code
												</h3>

												<div className="p-5 mb-10">
													<span className="fs16" style={{ color: textColor }}>
														Please confirm your email address
													</span>
												</div>

												<div className="p-4">
													<form role="form">
														<div className="form-group code-form-group mb-40">
															<input
																id="email-resend"
																placeholder="john@frontm.com"
																type="email"
																value={email}
																onChange={this.changeEmail}
																className="form-control form-control-lg form-input-box-300"
																style={{
																	background: textBoxBackground,
																	color: textBoxTextColor,
																}}
															/>
														</div>
														<div className="form-group code-form-group mb-20">
															<button
																onClick={this.handleSubmit}
																className="btn btn-block btn-lg btn-icon code-btn"
																disabled={!this.validateEmail(email)}
																ref={(btn) => {
																	this.verifyBtn = btn;
																}}
															>
																Send code again
															</button>
														</div>
													</form>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		}
		return (
			<div
				className="page-wrapper d-flex flex fullscreen align-items-center greenBackground"
				id="page-wrapper"
			>
				<div className="container">
					<div className="row align-self-center">
						<div className="col-lg-5 mr-auto ml-auto">
							<div className="bg-white rounded shadow-sm overflow-hidden">
								<div className="row no-margin align-items-center">
									<div className="col-lg-12 no-padding text-center col-md-12">
										<h3
											className="fs-2x font300 lineH-1 mt-60 mb-10 h3-color"
											style={{ marginTop: "10px" }}
										>
											Verification code
										</h3>

										<div className="p-5 mb-10">
											<span
												className="fs16"
												style={{ color: "rgba(102,102,102,1)" }}
											>
												Please confirm your email address
											</span>
										</div>

										<div className="p-4">
											<form role="form">
												<div className="form-group code-form-group mb-40">
													<input
														id="email-resend"
														placeholder="test@test.com"
														type="email"
														value={email}
														onChange={this.changeEmail}
														className="form-control form-control-lg form-input-box-300"
													/>
												</div>
												<div className="form-group code-form-group mb-20">
													<button
														onClick={this.handleSubmit}
														className="btn btn-block btn-lg btn-icon code-btn"
														disabled={!this.validateEmail(email)}
														ref={(btn) => {
															this.verifyBtn = btn;
														}}
													>
														Send code again
													</button>
												</div>
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default SendCodeAgain;
