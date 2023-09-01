import React, { useEffect, useState } from "react";
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
	ONSHIP_SIGNUP_LANDING,
	ONSHIP_LANDING,
} from "../../Utils/Constants";
import Landing from "./CustomLanding/Landing";
import appType from "../../Utils/ApiConfig";
import CookiePolicy from "../App/CookiePolicy";
import history from "../../Services/History";
import { useLocation } from "react-router-dom";
import Config from "../../Utils/Config";
import { loadAllDomainsListInLFStorage } from "../../Services/LFStorage";
const R = require("ramda");

function OnShipSignInView(props) {
	const location = useLocation();
	const [state, setState] = useState({
		submitting: false,
		email: "",
		password: "",
		corporateSignup: false,
		landingPath: location.pathname,
	});
	const [cookiePolicyAccepted, setCookiePolicyAccepted] = useState(
		getFromStorage("cookiePolicyAccepted")
	);

	useEffect(() => {
		if (
			location.pathname !== FRONTM_LANDING &&
			location.pathname !== state.landingPath
		) {
			if (location.pathname === ONSHIP_SIGNUP_LANDING) {
				setSignupPath(ONSHIP_LANDING);
			} else {
				setSignupPath(location.pathname);
			}
			setState({
				...state,
				corporateSignup: true,
				landingPath: location.pathname,
			});
		}
	}, [location.pathname]);

	const activateEnterpriseBotAndSetLastLoggedInDomain = (authCode) => {
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

	const onLoginSuccess = (message) => {
		let query = null;
		if (location && location.search) {
			query = location.search;
		}

		if (query) {
			let path = query.substring(10, query.length);
			history.push(path);
		} else {
			if (state.corporateSignup) {
				activateEnterpriseBotAndSetLastLoggedInDomain(
					R.prop("onshipDomain", Config)
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

	const createUser = (formData) => {
		const { email, password, name, authCode } = formData;
		setState({
			...state,
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
				handleSuccess(response);
			})
			.then(() =>
				setState({
					...state,
					submitting: false,
				})
			)
			.catch((error) => handleError(error));
	};

	const handleSuccess = (data) => {
		if (data.success) {
			let authCode = state.authCode;
			authCode && storeAuthCode(authCode, state.email);
			Toast({
				type: "success",
				message:
					"User created successfully! Please verify using the Code that has been emailed.",
				onClose: () =>
					history.push({
						pathname: "/verify",
						state: {
							email: state.email,
							password: state.password,
							authCode: state.authCode,
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

	const handleError = (error) => {
		Toast({
			type: "error",
			message: error.message || "Error occurred while creating user",
		});
	};

	const acceptCookiePolicy = () => {
		putInStorage("cookiePolicyAccepted", true);
		setCookiePolicyAccepted(true);
	};

	const { landingPath } = state;

	return (
		<div
			className="page-wrapper d-flex flex flex-column container-fluid full-height"
			id="page-wrapper"
			style={{ padding: "0px" }}
		>
			<Landing
				{...props}
				onLogin={onLoginSuccess}
				createUser={createUser}
				corporateSignup={false}
				landingPath={landingPath}
			/>
			{!cookiePolicyAccepted && (
				<div
					style={{
						position: "fixed",
						bottom: 0,
						width: "100%",
					}}
				>
					<CookiePolicy acceptCookiePolicy={acceptCookiePolicy} />
				</div>
			)}
		</div>
	);
}

export default OnShipSignInView;
