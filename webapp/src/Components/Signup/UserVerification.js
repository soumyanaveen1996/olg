import React, { Component } from "react";
import AuthServiceClient from "../../Services/Clients/AuthServiceClient";
import { activateEnterpriseBots } from "../../Services/BotsService";
import { updateLastLoggedInDomain } from "../../Services/UserService";
import { getSignupPath, unsetAuthCode } from "../../Services/StorageService";
import Toast from "../ModalMessages/Toast";
import ResetPasswordHeader from "../ResetPassword/ResetPasswordHeader";
import {
	THURAYA_LANDING,
	THURAYA_RESET_BACKGROUND,
	VOYAGER_LANDING,
	VIKAND_LANDING,
	VIKAND_DIRECT_LANDING,
	INTELL4DESK_LANDING,
	ONSHIP_LANDING,
	VOYAGER_SIGNUP_BACKGROUND,
	HELPER_MESSAGE,
	FRONTM_DOMAIN,
	ACTIVATE_ENTERPRISE_BOTS_ERROR_CODES,
	STATION_SATCOM_LANDING,
	STATION_SATCOM_RESET_BACKGROUND,
	VIKAND_RESET_BACKGROUND,
	INTELL4DESK_RESET_BACKGROUND,
	FRONTM_SIGNUP_BACKGROUND,
	VIKAND_DIRECT_RESET_BACKGROUND,
	ONSHIP_RESET_BACKGROUND,
	ONECARE_LANDING,
	ONECARE_RESET_BACKGROUND,
	SIGMA_LANDING,
	SIGMA_RESET_BACKGROUND,
} from "../../Utils/Constants";
import appType from "../../Utils/ApiConfig";
import history from "../../Services/History";
import { loadAllDomainsListInLFStorage } from "../../Services/LFStorage";

class UserVerification extends Component {
	state = {
		email: "",
		password: "",
		code: "",
		authCode: "",
		reconfirmPassword: false,
		loading: false,
		submitted: false,
		disbaleBtn: true,
	};
	componentDidMount() {
		const { email, password, authCode } = this.props.location.state;
		this.setState({ email, password, authCode });
	}

	toLogged = (message) => {
		unsetAuthCode();
		history.push({
			pathname: "/app/home",
			state: { message: message, routingFrom: "signup" },
		});
	};

	setCode = (e) => {
		e.preventDefault();
		if (e.target.value.length === 6) {
			if (!this.state.password) {
				this.setState({ disbaleBtn: true });
			} else {
				this.setState({ disbaleBtn: false });
			}
		} else {
			this.setState({ disbaleBtn: true });
		}
		this.setState({ code: e.target.value });
	};

	activateEnterpriseBotAndSetLastLoggedInDomain = (authCode) => {
		let message = null;
		return activateEnterpriseBots(authCode).then((activateResponse) => {
			let { content, error, errorMessage } = activateResponse;
			if (error !== 0 || content.length === 0) {
				this.props.isCorporateLicenseValid(false);
				message = errorMessage
					? errorMessage + ". " + HELPER_MESSAGE
					: HELPER_MESSAGE;
				return updateLastLoggedInDomain(FRONTM_DOMAIN).then(() => {
					if (message) {
						throw new Error(message);
					}
				});
			} else {
				const domains = content;
				let corporateDomainList = domains.filter((domain) => {
					return domain.userDomain !== FRONTM_DOMAIN;
				});
				loadAllDomainsListInLFStorage(corporateDomainList);
				let corporateDomain =
					corporateDomainList.length > 0
						? corporateDomainList[0].userDomain
						: "";
				if (corporateDomain.length === 0) {
					message = HELPER_MESSAGE;
					corporateDomain = FRONTM_DOMAIN;
				}
				return updateLastLoggedInDomain(corporateDomain).then(() => {
					if (message) {
						throw new Error(message);
					}
				});
			}
		});
	};

	handleSubmit = async (e) => {
		e.preventDefault();
		this.verifyBtn.setAttribute("disabled", "disabled");
		const { code, email, password, authCode } = this.state;
		let doConfirmSignUpObj = {};
		let typeOfApp = appType;
		// console.log("doConfirmSignUp", code, email, password, typeOfApp);
		if (typeOfApp) {
			doConfirmSignUpObj = {
				email: email,
				password: password,
				confirmCode: code,
				appType: typeOfApp,
			};
		} else {
			doConfirmSignUpObj = {
				email: email,
				password: password,
				confirmCode: code,
			};
		}

		if (password === "") {
			Toast({
				type: "error",
				message: "Please enter the password again.",
				autoClose: 2000,
			});
			return;
		}
		try {
			const { success, message } = await AuthServiceClient.doConfirmSignUp(
				doConfirmSignUpObj
			);
			if (!success) {
				throw new Error(message);
			}

			if (email && password) {
				Toast({
					type: "success",
					message: "Account has been confirmed. Logging you in.",
					autoClose: 2000,
				});
				this.props.doFrontMLogin(email, password, null, (error, data) => {
					if (error) {
						Toast({
							type: "success",
							message:
								"Unable to log you in. Please try again from the login page.",
						});
						authCode
							? this.activateEnterpriseBotAndSetLastLoggedInDomain(
								authCode
							).catch((e) => console.log(e))
							: updateLastLoggedInDomain(FRONTM_DOMAIN);
					} else {
						Toast({
							type: "success",
							message: "Account has been confirmed. Logging you in.",
						});
						let message = null;
						authCode
							? this.activateEnterpriseBotAndSetLastLoggedInDomain(authCode)
								.catch((error) => {
									console.log("error occured :: ", error.message);
									let errMsg = error ? error.message : "";
									if (
										errMsg &&
										ACTIVATE_ENTERPRISE_BOTS_ERROR_CODES.indexOf(errMsg) !==
										-1
									) {
										message = errMsg + ". " + HELPER_MESSAGE;
									} else {
										message = HELPER_MESSAGE;
									}
								})
								.finally(() => {
									this.toLogged(message);
								})
							: updateLastLoggedInDomain(FRONTM_DOMAIN).finally(() => {
								this.toLogged();
							});
					}
				});
			} else {
				Toast({
					type: "success",
					message: "Account has been confirmed. Please login.",
				});
				authCode
					? this.activateEnterpriseBotAndSetLastLoggedInDomain(authCode).catch(
						(e) => console.log(e)
					)
					: updateLastLoggedInDomain(FRONTM_DOMAIN);
			}
		} catch (e) {
			console.log(" e = ", e);
			if (
				e.message === "User cannot be confirmed. Current status is CONFIRMED"
			) {
				authCode
					? this.activateEnterpriseBotAndSetLastLoggedInDomain(authCode).catch(
						(e) => console.log(e)
					)
					: updateLastLoggedInDomain(FRONTM_DOMAIN).catch((e) =>
						console.log(e)
					);
				Toast({
					type: "info",
					message: "Your account is already confirmed. You can directly login.",
				});
			} else {
				Toast({
					type: "error",
					message: e.message,
				});
			}
			this.verifyBtn.removeAttribute("disabled");
		}
	};

	goToResend = () => {
		history.push({
			pathname: "/sendcode",
			state: {
				email: this.state.email,
				authCode: this.state.authCode,
				password: this.state.password,
			},
		});
	};

	passwordValidation = (string) => {
		var counter = 0;
		if (string.length >= 8) {
			if (/[a-z]/.test(string)) {
				counter++;
			}
			if (/[A-Z]/.test(string)) {
				counter++;
			}
			if (/[0-9]/.test(string)) {
				counter++;
			}
			if (/[\^$*.[\]{}()?"!'@#%&\\/,><:;|_~`]/.test(string)) {
				counter++;
			}
		}
		return counter === 4;
	};

	modifyPassword = (e) => {
		let passwordResult;
		if (e.target.value.length === 8) {
			passwordResult = this.passwordValidation(this.state.password);
			if (!passwordResult) {
				this.setState({ disbaleBtn: true });
			} else {
				this.setState({ disbaleBtn: false });
			}
		} else {
			this.setState({ disbaleBtn: true });
		}

		this.setState({ password: e.target.value });
	};

	render() {
		const { code, email, password, disbaleBtn } = this.state;
		// console.log("disable btn ", disbaleBtn);
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

			case SIGMA_LANDING:
				contentBackGround = SIGMA_RESET_BACKGROUND;
				resetBoxBackground = "rgba(9,69,116, 0.7)";
				textColor = "#fff";
				textBoxTextColor = "black";
				textBoxBackground = "#fff";
				break;

			case SIGMA_LANDING:
				contentBackGround = SIGMA_RESET_BACKGROUND;
				resetBoxBackground = "rgba(9,69,116, 0.7)";
				textColor = "#fff";
				textBoxTextColor = "black";
				textBoxBackground = "#fff";
				break;

			default:
				contentBackGround = FRONTM_SIGNUP_BACKGROUND;
				resetBoxBackground = "rgba(9,69,116, 0.7)";
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
													className="fs-2x font300 lineH-1 mb-0 h3-color"
													style={{ color: textColor, marginTop: "100px" }}
												>
													Confirmation code
												</h3>

												<div
													className="p-5 mb-10"
													ref={(el) => {
														if (el) {
															el.style.setProperty(
																"padding",
																"2rem",
																"important"
															);
															el.style.setProperty(
																"padding-bottom",
																"0",
																"important"
															);
														}
													}}
												>
													<span className="fs16" style={{ color: textColor }}>
														A confirmation code, with a 24 hour validity, has
														been sent to
														<br />
														<strong>{email}</strong> <br />
														<br />
														Please enter the code below to complete the
														registration process.
													</span>
												</div>

												<div
													className="p-4"
													ref={(el) => {
														if (el) {
															el.style.setProperty(
																"padding-bottom",
																"4rem",
																"important"
															);
														}
													}}
												>
													<form role="form">
														<div
															className="form-group pt-10 pb-10 d-flex flex-column justify-content-center align-content-center col-lg-5"
															style={{ marginLeft: "30%" }}
														>
															<input
																id="code"
																placeholder="- - - - - -"
																type="number"
																value={code}
																onChange={this.setCode}
																onBlur={() => {
																	if (code.length === 6) {
																		if (!password) {
																			this.setState({ disbaleBtn: true });
																		} else {
																			this.setState({ disbaleBtn: false });
																		}
																	} else {
																		this.setState({ disbaleBtn: true });
																	}
																}}
																className="form-control-lg"
																style={{
																	background: textBoxBackground,
																	color: textBoxTextColor,
																	height: "50px",
																	textAlign: "center",
																}}
															/>
														</div>
														<div className="form-group code-form-group mb-20">
															<button
																onClick={this.handleSubmit}
																className="btn btn-block btn-lg btn-icon code-btn"
																disabled={disbaleBtn}
																ref={(btn) => {
																	this.verifyBtn = btn;
																}}
															>
																Done
															</button>
														</div>
														<div style={{ textAlign: "center" }}>
															<a
																onClick={this.goToResend}
																className="btn btn-text"
																style={{
																	textTransform: "none",
																	color: "white",
																	fontSize: "16px",
																	textDecoration: "underline",
																}}
															>
																Didn't receive the code? Send it again
																<i className="icon-arrow-right" />
															</a>
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
											className="fs-2x font300 lineH-1 mb-0 h3-color"
											style={{ marginTop: "10px" }}
										>
											Verification code
										</h3>

										<div className="p-5 mb-10">
											<span
												className="fs16"
												style={{ color: "rgba(102,102,102,1)" }}
											>
												A verification code, with a 24 hour validity, has been
												sent to <strong>{email}</strong> <br />
												<br />
												Please enter the verification code below to complete the
												registration process.
											</span>
										</div>

										<div className="p-4">
											<form role="form">
												<div className="form-group code-form-group mb-40">
													<input
														id="code"
														placeholder="- - - - - -"
														type="number"
														value={code}
														onChange={this.setCode}
														onBlur={() => {
															if (code.length === 6) {
																if (!password) {
																	this.setState({ disbaleBtn: true });
																} else {
																	this.setState({ disbaleBtn: false });
																}
															} else {
																this.setState({ disbaleBtn: true });
															}
														}}
														className="form-control form-control-lg code-input"
													/>
												</div>
												<div className="form-group code-form-group mb-20">
													<button
														onClick={this.handleSubmit}
														className="btn btn-block btn-lg btn-icon code-btn"
														disabled={disbaleBtn}
														ref={(btn) => {
															this.verifyBtn = btn;
														}}
													>
														Done
													</button>
												</div>
												<div style={{ textAlign: "center" }}>
													<a
														onClick={this.goToResend}
														className="btn btn-text"
														style={{ textTransform: "none" }}
													>
														Review email address and send the verification code
														again
														<i className="icon-arrow-right" />
													</a>
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

export default UserVerification;
