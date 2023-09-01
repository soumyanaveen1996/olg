import React, { Component } from "react";
import Signup from "./Signup";
import AuthServiceClient from "../../Services/Clients/AuthServiceClient";
import {
	setSignupPath,
	storeAuthCode,
	unsetAuthCode,
	getFromStorage,
	putInStorage,
} from "../../Services/StorageService";
import Toast from "../ModalMessages/Toast";
import { activateEnterpriseBots } from "../../Services/BotsService";
import { updateLastLoggedInDomain } from "../../Services/UserService";
import {
	FRONTM_LANDING,
	FRONTM_DOMAIN,
	HELPER_MESSAGE,
	ACTIVATE_ENTERPRISE_BOTS_ERROR_CODES,
	VOYAGER_VOICE_AUTH_CODE,
	ONSHIP_SIGNUP_LANDING,
	ONSHIP_LANDING,
	THURAYA_T2M_SIGNUP_LANDING,
	THURAYA_T2M_LANDING,
} from "../../Utils/Constants";
import Landing from "./CustomLanding/Landing";
import appType from "../../Utils/ApiConfig";
import CookiePolicy from "../App/CookiePolicy";
import history from "../../Services/History";
import OnshipSignupView from "./OnshipSignupView";
import SattracklandSignupView from "./SattracklandSignupView";
import { loadAllDomainsListInLFStorage } from "../../Services/LFStorage";

class SignupView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			submitting: false,
			email: "",
			password: "",
			corporateSignup: false,
			landingPath: null,
		};
	}

	componentDidMount() {
		const pathName = this.props.location.pathname;
		if (pathName !== FRONTM_LANDING) {
			if (pathName === ONSHIP_SIGNUP_LANDING) {
				setSignupPath(ONSHIP_LANDING);
			} else {
				setSignupPath(pathName);
			}
			this.setState({
				corporateSignup: true,
				landingPath: pathName,
			});
		}
	}

	componentDidUpdate() {
		const pathName = this.props.location.pathname;
		if (pathName !== FRONTM_LANDING && pathName !== this.state.landingPath) {
			if (pathName === ONSHIP_SIGNUP_LANDING) {
				setSignupPath(ONSHIP_LANDING);
			} else {
				setSignupPath(pathName);
			}
			this.setState({
				corporateSignup: true,
				landingPath: pathName,
			});
		}
	}

	activateEnterpriseBotAndSetLastLoggedInDomain = (authCode) => {
		let message = null;
		return activateEnterpriseBots(authCode).then((activateResponse) => {
			// console.log("activateEnterprise ", activateResponse);

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

				// console.log("domains ======== ", corporateDomain, corporateDomainList);

				return updateLastLoggedInDomain(corporateDomain).then(() => {
					if (message) {
						throw new Error(message);
					}
				});
			}
		});
	};

	onLoginSuccess = (message) => {
		let { location } = this.props;
		let query = null;
		if (location && location.search) {
			query = location.search;
		}

		if (query) {
			let path = query.substring(10, query.length);
			history.push(path);
		} else {
			if (this.state.corporateSignup) {
				// console.log("corporateSignup ", this.state.corporateSignup);

				this.activateEnterpriseBotAndSetLastLoggedInDomain(
					VOYAGER_VOICE_AUTH_CODE
				)
					.catch((error) => {
						console.log("error occured :: ", error.message);
						let errMsg = error ? error.message : "";
						if (
							errMsg &&
							ACTIVATE_ENTERPRISE_BOTS_ERROR_CODES.indexOf(errMsg) !== -1
						) {
							message = errMsg + ". " + HELPER_MESSAGE;
						} else {
							message = HELPER_MESSAGE;
						}
					})
					.finally(() => {
						console.log("move to bot page");

						unsetAuthCode();
						history.push({
							pathname: "/app/home",
							state: { routingFrom: "signup" },
						});
					});
			}
		}
	};

	createUser = (formData) => {
		const { email, password, name, authCode } = formData;
		this.setState({
			submitting: true,
			email,
			password,
			authCode,
		});
		let typeOfApp = appType;

		let signupObj = {};

		if (typeOfApp) {
			signupObj = {
				email,
				password,
				userName: `${name}`,
				appType: typeOfApp,
			};
		} else {
			signupObj = {
				email,
				password,
				userName: `${name}`,
			};
		}

		AuthServiceClient.doSignUp(signupObj)
			.then((response) => {
				console.log("Manish signupResponse :: ", response);
				this.handleSuccess(response);
			})
			.then(() =>
				this.setState({
					submitting: false,
				})
			)
			.catch((error) => this.handleError(error));
	};

	handleSuccess = (data) => {
		if (data.success) {
			let authCode = this.state.authCode;
			authCode && storeAuthCode(authCode, this.state.email);
			Toast({
				type: "success",
				message:
					"User created successfully! Please verify using the Code that has been emailed.",
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

	acceptCookiePolicy = () => {
		putInStorage("cookiePolicyAccepted", true);
		this.setState({ cookiePolicyAccepted: true });
	};

	render() {
		const { landingPath, corporateSignup } = this.state;
		let landingComponent = null;
		let cookiePolicyAccepted = getFromStorage("cookiePolicyAccepted");

		if (corporateSignup) {
			if (landingPath === ONSHIP_SIGNUP_LANDING) {
				landingComponent = (
					<OnshipSignupView
						{...this.props}
						createUser={this.createUser}
						corporateSignup={this.state.corporateSignup}
						landingPath={landingPath}
					/>
				);
			} else if (landingPath === THURAYA_T2M_SIGNUP_LANDING) {
				landingComponent = (
					<SattracklandSignupView
						{...this.props}
						createUser={this.createUser}
						corporateSignup={this.state.corporateSignup}
						landingPath={landingPath}
					/>
				);
			} else {
				landingComponent = (
					<Landing
						{...this.props}
						onLogin={this.onLoginSuccess}
						createUser={this.createUser}
						corporateSignup={this.state.corporateSignup}
						landingPath={landingPath}
					/>
				);
			}
		} else {
			landingComponent = (
				<div className="greenBackground">
					<Signup
						{...this.props}
						onLogin={this.onLoginSuccess}
						createUser={this.createUser}
						corporateSignup={this.state.corporateSignup}
					/>
				</div>
			);
		}

		return (
			<div
				className="page-wrapper d-flex flex flex-column container-fluid full-height"
				id="page-wrapper"
				style={{ padding: "0px" }}
			>
				{landingComponent}
				{!cookiePolicyAccepted && (
					<div
						style={{
							position: "fixed",
							bottom: 0,
							width: "100%",
						}}
					>
						<CookiePolicy acceptCookiePolicy={this.acceptCookiePolicy} />
					</div>
				)}
			</div>
		);
	}
}

export default SignupView;
