import React, { Component } from "react";
import Error from "./../Common/Error";
import { validateSignInForm } from "../../Utils/Validator";
import { Link } from "react-router-dom";
import { getAuthCode, unsetAuthCode } from "../../Services/StorageService";
import { activateEnterpriseBots } from "../../Services/BotsService";
import { updateLastLoggedInDomain } from "../../Services/UserService";

import {
	STATION_SATCOM_LANDING,
	THURAYA_LANDING,
	VIKAND_LANDING,
	VIKAND_DIRECT_LANDING,
	INTELL4DESK_LANDING,
	ONSHIP_LANDING,
	ONECARE_LANDING,
	ONECARE_PROD_URL_NEW,
	ONECARE_STAGE_URL,
	ONECARE_PROD_ANONYMOUS_USER_URL,
	ONECARE_STAGE_ANONYMOUS_USER_URL,
	ONECARE_DEV_ANONYMOUS_USER_URL,
} from "../../Utils/Constants";
import history from "./../../Services/History";
import "./Login.css";
import { loadAllDomainsListInLFStorage } from "../../Services/LFStorage";
import appType from "../../Utils/ApiConfig";
import { CircularProgress } from "@mui/material";
const HELPER_MESSAGE =
	"Please contact FrontM support. You have been logged in to default frontM domain";
const FRONTM_DOMAIN = "frontmai";
const ACTIVATE_ENTERPRISE_BOTS_ERROR_CODES = [
	"Invalid code",
	"Code has been already used by the user",
	"Code could not be applied. The code has expired or the maximum limit has been reached",
];
class FrontMLogin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			error: "",
			showPassword: false,
			showSpinner: false,
		};
	}

	componentDidMount() {
		if (this.props.error) {
			this.setState({ error: this.props.error });
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.error && this.props.error !== prevState.error) {
			this.setState({ error: this.props.error });
		}
	}

	modifyEmail = (e) => {
		e.stopPropagation();
		let emailValue = e.target.value;
		this.setState({ email: emailValue });
	};
	modifyPassword = (e) => {
		e.stopPropagation();
		this.setState({ password: e.target.value });
	};

	handleErrorMsg = () => {
		if (this.state.error) {
			this.props.clearLoginError();
			this.props.removeUserLoginError();
			this.setState({ error: null });
		}
	};

	activateEnterpriseBotAndSetLastLoggedInDomain = (authCode) => {
		let message = null;
		return activateEnterpriseBots(authCode).then((activateResponse) => {
			let { content, error, errorMessage } = activateResponse;
			if (error !== 0 || content.length === 0) {
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
						throw new Error();
					}
				});
			}
		});
	};

	doFrontMLogin = (e) => {
		e.preventDefault();
		this.setState({ showSpinner: true });
		let formData = {
			email: this.state.email,
			password: this.state.password,
		};
		let error = validateSignInForm(formData);
		if (error) {
			this.setState({
				error: error,
				showSpinner: false,
			});
			return;
		} else {
			const { email, password } = this.state;
			let newEmail = email.trim();
			let message = null;
			if (this.state.error) {
				this.setState({
					error: "",
					showSpinner: true,
				});
				this.props.removeUserLoginError();
			}
			console.log(`%c User ${newEmail} is login`, "color: green;");
			this.props.doFrontMLogin(newEmail, password, null, (error) => {
				if (error) {
					this.setState({ showSpinner: false });

					if (error === "Missing required parameter SOFTWARE_TOKEN_MFA_CODE") {
						history.push({
							pathname: "/otp",
							state: {
								newEmail,
								password,
							},
						});
						this.props.hideSpinner();
					} else this.props.onError(error, newEmail, password);
				} else {
					let authCodeObject = getAuthCode();
					let emailFromAuthCode =
						authCodeObject && Object.keys(authCodeObject)[0];
					let authCode = authCodeObject && authCodeObject[emailFromAuthCode];
					if (authCode && emailFromAuthCode === newEmail) {
						this.activateEnterpriseBotAndSetLastLoggedInDomain(authCode)
							.then(() => {
								this.props.onLogin();
							})
							.catch((err) => {
								// this.setState({ showSpinner: false });

								console.error(
									"error on activateEnterpriseBotAndSetLastLoggedInDomain login :: :: :: ::",
									err
								);
								let errMsg = err ? err.message : "";
								if (
									errMsg &&
									ACTIVATE_ENTERPRISE_BOTS_ERROR_CODES.indexOf(errMsg) !== -1
								) {
									message = errMsg + ". " + HELPER_MESSAGE;
								} else {
									message = HELPER_MESSAGE;
								}
								this.setState({ error: message });
							})
							.finally(() => {
								this.props.onLogin(message); //(message);
							});
					} else {
						this.setState({ error: null });
						this.props.onLogin();
					}
				}
			});
		}
	};

	handleAnonymousUser = () => {
		const redirectURL =
			window.location.hostname === ONECARE_PROD_URL_NEW
				? ONECARE_PROD_ANONYMOUS_USER_URL
				: window.location.hostname === ONECARE_STAGE_URL
				? ONECARE_STAGE_ANONYMOUS_USER_URL
				: ONECARE_DEV_ANONYMOUS_USER_URL;
		if (redirectURL) this.props.history.push(redirectURL);
	};

	render() {
		let { email, password, error, showSpinner } = this.state;
		let { landingPath } = this.props;
		let forgotPassText =
			landingPath === ONSHIP_LANDING
				? "Forgot password ?"
				: "Forgot Password ?";
		let marginTopForgotPass = landingPath === ONSHIP_LANDING ? "-1rem" : "0rem";

		let emailPlaceHolder =
			landingPath === ONSHIP_LANDING ? "email@example.com" : "Email";
		if (landingPath == ONECARE_LANDING) {
			emailPlaceHolder = "User name or email";
		}
		let passwordPlaceHolder = landingPath === ONSHIP_LANDING ? "" : "......";

		error =
			error && error == "Network Error"
				? [
						"Server cannot be reached. Please verify access checking ",
						<a href="status" target="_blank">
							this link
						</a>,
				  ]
				: error;

		return (
			<div>
				{error && <Error message={error} />}
				<form role="form" onSubmit={this.doFrontMLogin} noValidate>
					<div className="form-group">
						{(landingPath === THURAYA_LANDING ||
							landingPath === STATION_SATCOM_LANDING ||
							landingPath === VIKAND_LANDING ||
							landingPath === VIKAND_DIRECT_LANDING ||
							landingPath === ONSHIP_LANDING ||
							landingPath === INTELL4DESK_LANDING
						) && (
							<label style={{ color: "#666666", marginBottom: "-0.1rem" }}>
								Email
							</label>
						)}
						<input
							placeholder={emailPlaceHolder}
							type="email"
							className="form-control form-content-input"
							onChange={this.modifyEmail}
							value={email}
							autoComplete="username"
						/>
					</div>

					<div
						className="form-group d-flex flex-column align-items-start"
						style={{ position: "relative" }}
					>
						{(landingPath === THURAYA_LANDING ||
							landingPath === STATION_SATCOM_LANDING ||
							landingPath === VIKAND_LANDING ||
							landingPath === VIKAND_DIRECT_LANDING ||
							landingPath === INTELL4DESK_LANDING ||
							landingPath === ONSHIP_LANDING
						) && (
							<label style={{ color: "#666666", marginBottom: "-0.1rem" }}>
								Password
							</label>
						)}
						<input
							placeholder={passwordPlaceHolder}
							type={this.state.showPassword ? "text" : "password"}
							className="form-control form-content-input"
							style={{ backgroundColor: "#f4f4f4" }}
							onChange={this.modifyPassword}
							autoComplete="current-password"
							value={password}
						/>
						{this.state.showPassword ? (
							<i
								className="fa fa-eye"
								onClick={() =>
									this.setState({ showPassword: !this.state.showPassword })
								}
								style={{
									fontSize: "16px",
									color: "#d5d5d5",
									position: "absolute",
									right: "10px",
									bottom: "10px",
									cursor: "pointer",
								}}
							/>
						) : (
							<i
								className="fa fa-eye-slash"
								onClick={() =>
									this.setState({
										showPassword: !this.state.showPassword,
									})
								}
								style={{
									fontSize: "16px",
									color: "#d5d5d5",
									position: "absolute",
									right: "10px",
									bottom: "10px",
									cursor: "pointer",
								}}
							/>
						)}
						{showSpinner && (
							<div
								style={{
									position: "absolute",
									right: "-30px",
									bottom: "-2px",
								}}
							>
								<CircularProgress
									size="3vh"
									thickness={1.2}
									color="secondary"
								/>
							</div>
						)}
					</div>

					<Link
						to="/resetPassword"
						onClick={() => this.handleErrorMsg()}
						className={`btn btn-text mb-20 ${
							landingPath && landingPath.replace("/", "")
						}-txt`}
						style={{
							marginTop: marginTopForgotPass,
						}}
					>
						{forgotPassText}
					</Link>

					<button
						type="submit"
						className={`btn btn-open btn-block btn-icon ${
							landingPath && landingPath.replace("/", "")
						}-btn`}
					>
						Log in
					</button>
					{landingPath === ONECARE_LANDING && (
						<div className="d-flex justify-content-center mt-20 mb-20">
							<div
								onClick={this.handleAnonymousUser}
								className={`btn btn-text ${
									landingPath && landingPath.replace("/", "")
								}-txt`}
							>
								{"OneCare Registration Form"}
							</div>
						</div>
					)}
				</form>
			</div>
		);
	}
}

export default FrontMLogin;
