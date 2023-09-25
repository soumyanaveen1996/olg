import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { doFrontMLogin } from "../../State/actions/user";
import { getAuthCode } from "../../Services/StorageService";
import { setSignupPath, unsetAuthCode } from "./../../Services/StorageService";
import history from "./../../Services/History";
import ActivateEnterpriseBotsCard from "./../Catalog/ActivateEnterpriseBotsCard";
import { updateLastLoggedInDomain } from "./../../Services/UserService";
import { loadAllDomainsListInLFStorage } from "../../Services/LFStorage";

const OtpPage = (props) => {
	const HELPER_MESSAGE =
		"Please contact FrontM support. You have been logged in to default frontM domain";
	const FRONTM_DOMAIN = "frontmai";
	const ACTIVATE_ENTERPRISE_BOTS_ERROR_CODES = [
		"Invalid code",
		"Code has been already used by the user",
		"Code could not be applied. The code has expired or the maximum limit has been reached",
	];
	const dispatch = useDispatch();
	const [error, updateError] = useState("");
	const [otpToken, updateOtpToken] = useState("");
	const [dataMissing, updateDataMissing] = useState(
		!props.location.state.newEmail && !props.location.state.password
	);
	const email = props.location.state.newEmail || "";
	const password = props.location.state.password || "";

	useEffect(() => {
		if (!props.location.state.newEmail || !props.location.state.password) {
			updateDataMissing(true);
		}
	}, [props.location.state.newEmail, props.location.state.password]);

	const onLoginSuccess = (message) => {
		let { location } = window;
		let query = null;
		if (location && location.search) {
			query = location.search;
		}

		if (location && location.pathname && location.pathname !== "/otp") {
			setSignupPath(location.pathname);
		}

		if (query) {
			let path = query.substring(10, query.length);
			history.push(path);
		} else {
			unsetAuthCode();

			history.push({
				pathname: "/app/home",
				state: { message: message, routingFrom: "login" },
			});
		}
	};

	const activateEnterpriseBotAndSetLastLoggedInDomain = (authCode) => {
		let message = null;
		return ActivateEnterpriseBotsCard(authCode).then((activateResponse) => {
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

	const submitWithOtp = () => {
		let message = null;
		const otpLoginObj = {
			email,
			password,
			otpToken,
		};

		dispatch(
			doFrontMLogin(email, password, otpToken, (error) => {
				if (error) {
					console.log("error on otp => login =>", error);
					updateError(error);
				} else {
					let authCodeObject = getAuthCode();
					let emailFromAuthCode =
						authCodeObject && Object.keys(authCodeObject)[0];
					let authCode = authCodeObject && authCodeObject[emailFromAuthCode];

					if (authCode && emailFromAuthCode === email) {
						activateEnterpriseBotAndSetLastLoggedInDomain(authCode)
							.then(() => {
								onLoginSuccess();
							})
							.catch((err) => {
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
								updateError(message);
							})
							.finally(() => {
								onLoginSuccess(message);
							});
					} else {
						updateError(null);
						onLoginSuccess();
					}
				}
			})
		);
	};

	return (
		<div
			className="page-wrapper d-flex flex flex-column container-fluid full-height"
			style={{ padding: "0px" }}
		>
			<div className="greenBackground">
				<div className="container">
					<div className="row align-self-center">
						<div className="col-lg-5 mr-auto ml-auto">
							<div
								className="bg-white rounded shadow-sm overflow-hidden"
								style={{ border: "1px solid rgba(44, 45, 58, 0.14)" }}
							>
								<div className="row no-margin align-items-center">
									<div className="col-lg-12 no-padding  col-md-12">
										<div className="p-4 text-dark text-center d-flex flex-column justify-content-between align-items-center">
											<img
												className="mb-40 mt-40"
												src="./offlinelms/img/security-icon.png"
												alt="security"
											/>
											<h2 className="fs26 font100 lineH-1 mb-0">
												Add extra security with
											</h2>
											<h2
												className="fs26 font100 lineH-1"
												style={{ marginBottom: "110px" }}
											>
												two-factor authentification
											</h2>
											<p className="fs14 font100 lineH-1 mb-10">
												Enter the validation number
											</p>
											<input
												id="optNumber"
												placeholder="OTP"
												type="number"
												className="form-control form-control-lg form-input-box mb-20"
												onChange={(e) => updateOtpToken(e.target.value)}
												value={otpToken}
											/>
											{error ? (
												<>
													<div className="alert-danger-custom-msg" role="alert">
														<span
															style={{
																display: "inlineBlock",
																fontSize: "12px",
															}}
														>
															{error}
														</span>
													</div>
												</>
											) : null}

											<button
												type="button"
												className="btn btn-open btn-lg btn-icon btn-block btn-custom mt-40"
												style={{ marginBottom: "110px" }}
												onClick={submitWithOtp}
												disabled={dataMissing}
											>
												Done
											</button>

											{dataMissing && (
												<Link
													to={{
														pathname: "/login",
													}}
													className="btn btn-text"
													style={{ textTransform: "none" }}
												>
													<span className="text-primary-active">
														You need to login again <b>Log in </b>
														<i className="icon-arrow-right" />
													</span>
												</Link>
											)}
										</div>
									</div>
								</div>
							</div>
							<p className="pt-3 no-margin text-center text-muted">
								&copy; Copyright 2019, FrontM
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OtpPage;
