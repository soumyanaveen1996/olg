import React from "react";
import HomeLogo from "./HomeLogo";
import LoginContainer from "../../Containers/LoginContainer";
import HomeSlidesNavigation from "./HomeSlidesNavigation";
import {
	ACTIVATE_ENTERPRISE_BOTS_ERROR_CODES,
	FRONTM_DOMAIN,
	HELPER_MESSAGE,
	VIKAND_DIRECT_LANDING,
	VOYAGER_VOICE_AUTH_CODE,
} from "../../Utils/Constants";
import Landing from "../Signup/CustomLanding/Landing";
import AuthServiceClient from "../../Services/Clients/AuthServiceClient";
import Toast from "../ModalMessages/Toast";
import {
	setSignupPath,
	storeAuthCode,
	unsetAuthCode,
} from "../../Services/StorageService";
import appType from "../../Utils/ApiConfig";
import history from "../../Services/History";
import { activateEnterpriseBots } from "../../Services/BotsService";
import { updateLastLoggedInDomain } from "../../Services/UserService";
import HomeSlideRight from "./HomeSlideRight";
import { loadAllDomainsListInLFStorage } from "../../Services/LFStorage";

class HomeSlide5 extends React.Component {
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
				console.log("corporateSignup ", this.state.corporateSignup);

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
						if (location && location.pathname) {
							setSignupPath(location.pathname);
						}
						unsetAuthCode();
						history.push({
							pathname: "/app/home",
							state: { routingFrom: "signup" },
						});
					});
			}
		}
	};

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

				return updateLastLoggedInDomain(corporateDomain).then(() => {
					if (message) {
						throw new Error(message);
					}
				});
			}
		});
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

	render() {
		let landingComponent = null;

		switch (window.location.pathname) {
			case VIKAND_DIRECT_LANDING:
				landingComponent = (
					<>
						<Landing
							{...this.props}
							createUser={this.createUser}
							corporateSignup={this.props.corporateScreen}
							landingPath={window.location.pathname}
							fromCarousel={true}
						/>
					</>
				);
				break;

			default:
				landingComponent = (
					<div style={{ flex: 2 }} className="d-flex flex-column">
						<HomeLogo />
						<div
							className="d-flex justify-content-center align-items-center flex-column mx-4 p-4"
							style={{ flex: 4 }}
						>
							<div
								className="text-center"
								style={{ color: "#4A4A4A", fontSize: "20px" }}
							>
								Welcome!
							</div>
							<p
								className="text-center"
								style={{ color: "#666666", fontSize: "16px" }}
							>
								Login to FrontM
							</p>
							<LoginContainer {...this.props} />
						</div>
						{!this.props.noNavigation && (
							<HomeSlidesNavigation
								previous={this.props.previous}
								next={this.props.next}
								activeIndex={this.props.activeIndex}
								goTo={this.props.goTo}
								loginPage
							/>
						)}
					</div>
				);
				break;
		}

		return (
			<React.Fragment>
				{landingComponent}

				{!this.props.corporateScreen && (
					<HomeSlideRight
						imgKey="slider5"
						image={"/img/onboarding-illus-5@2x.png"}
					/>
				)}
			</React.Fragment>
		);
	}
}

export default HomeSlide5;
