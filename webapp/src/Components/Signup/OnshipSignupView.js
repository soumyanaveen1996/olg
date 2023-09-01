import React, { useState } from "react";
import "./OnshipSignup.css";
import Error from "../Common/Error";
import { validateSignUpForm } from "../../Utils/Validator";
import { Link } from "react-router-dom";
import SuccessMessage from "../Common/SuccessMessage";
import ErrorMessage from "../Common/ErrorMessage";
import ResetPasswordHeader from "../ResetPassword/ResetPasswordHeader";
import { styled } from "@mui/material/styles";
import {
	ONSHIP_SIGNUP_BACKGROUND,
	ONSHIP_SUB_HEADER_TEXT,
} from "../../Utils/Constants";
import Config from "../../Utils/Config";
import {
	clearLoginError,
	removeUserLoginError,
} from "../../State/actions/user";
import { connect } from "react-redux";

const R = require("ramda");

const SignUPButton = styled("button")(() => ({
	backgroundColor: "#0095f2 !important",
}));

function OnshipSignupView(props) {
	const [state, setState] = useState({
		email: "",
		password: "",
		password2: "",
		given_name: "",
		family_name: "",
		nowCheckConfirmPassword: false,
		nowCheckPassword: false,
		name: "",
		authCode: props.corporateSignup ? R.prop("onshipDomain", Config) : "",
		showToolTip: false,
		authCodeToolTipOpen: false,
		passwordCriteria: [
			{ text: " One uppercase letter", isDone: false },
			{ text: " One lowercase letter", isDone: false },
			{ text: " One special character", isDone: false },
			{ text: " One number", isDone: false },
			{ text: " 8 characters minimum", isDone: false },
		],
		given_name_error: null,
		email_error: null,
	});

	const modifyEmail = (e) => {
		setState({ ...state, email_error: "", email: e.target.value });
	};
	const modifyPassword = (e) =>
		setState({ ...state, password: e.target.value }, () => {
			passwordChecking(state.password);
		});
	const modifyPassword2 = (e) =>
		setState({ ...state, password2: e.target.value });
	// modifyAuthCode = e => setState({...state, authCode: e.target.value });
	const modifyGivenName = (e) => {
		let name = e.target.value;
		setState({ ...state, given_name_error: "", given_name: name, name });
	};

	const checkForName = () => {
		let name = state.given_name;
		if (name.length < 3) {
			setState({ ...state, given_name_error: "Atleast 3 letters" });
		}
	};
	const checkForEmail = () => {
		let emailResult = validateEmail(state.email);
		if (!emailResult) {
			setState({ ...state, email_error: "Invalid email" });
		}
	};
	const modifyName = () => setState({ ...state, name: state.given_name });
	const checkPass = () => state.password === state.password2;

	const onFormSubmit = (e) => {
		console.log("info ", state);
		setState({ ...state, error: null });
		let error = validateSignUpForm(state, props.corporateSignup);
		if (error) {
			setState({ ...state, error: error });
			return;
		}

		props.createUser(state);
		e.preventDefault();
	};

	const passwordValidation = (string) => {
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

	const passwordChecking = (string) => {
		if (string.length >= 8) {
			const newArr = [...state.passwordCriteria];
			newArr[4].isDone = true;
			setState({ ...state, passwordCriteria: [...newArr] });
		} else {
			const newArr = [...state.passwordCriteria];
			setState({ ...state, eightCharacterCase: false });
			newArr[4].isDone = false;
			setState({ ...state, passwordCriteria: [...newArr] });
		}
		if (/[a-z]/.test(string)) {
			const passArr = [...state.passwordCriteria];
			passArr[1].isDone = true;
			setState({ ...state, passwordCriteria: [...passArr] });
		} else {
			const passArr = [...state.passwordCriteria];
			passArr[1].isDone = false;
			setState({ ...state, passwordCriteria: [...passArr] });
		}
		if (/[A-Z]/.test(string)) {
			const passArr = [...state.passwordCriteria];
			passArr[0].isDone = true;
			setState({ ...state, passwordCriteria: [...passArr] });
		} else {
			const passArr = [...state.passwordCriteria];
			passArr[0].isDone = false;
			setState({ ...state, passwordCriteria: [...passArr] });
		}
		if (/[0-9]/.test(string)) {
			const passArr = [...state.passwordCriteria];
			passArr[3].isDone = true;
			setState({ ...state, passwordCriteria: [...passArr] });
		} else {
			const passArr = [...state.passwordCriteria];
			passArr[3].isDone = false;
			setState({ ...state, passwordCriteria: [...passArr] });
		}
		if (/[\^$*.[\]{}()?"!'@#%&\\/,><:;|_~`]/.test(string)) {
			const passArr = [...state.passwordCriteria];
			passArr[2].isDone = true;
			setState({ ...state, passwordCriteria: [...passArr] });
		} else {
			const passArr = [...state.passwordCriteria];
			passArr[2].isDone = false;
			setState({ ...state, passwordCriteria: [...passArr] });
		}
	};

	const onChangePassword = (text) => {
		setState({ ...state, password: text }, () => {
			passwordChecking(state.password);
		});
	};

	const passwordConfirm = () => {
		if (state.password !== state.password2) {
			return false;
		} else {
			return true;
		}
	};

	const validateEmail = (email) => {
		var re =
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	};

	const validateAuthCode = () => {
		if (state.authCode) {
			return true;
		}
		return false;
	};

	const checkFieldEmpty = () => {
		let emailResult = validateEmail(state.email);
		let passworResult = passwordValidation(state.password);
		let passwordConfirmResult = passwordConfirm();

		let authCodeResult = !props.corporateSignup ? true : validateAuthCode();
		if (
			state.name.length >= 3 &&
			emailResult &&
			passworResult &&
			passwordConfirmResult &&
			authCodeResult
		) {
			return true;
		}
	};

	const toggle = () => {
		setState({
			...state,
			authCodeToolTipOpen: !state.authCodeToolTipOpen,
		});
	};

	const handleErrorMsg = () => {
		console.log("remove error");
		props.clearLoginError();
		props.removeUserLoginError();
	};

	return (
		<div className="container-fluid">
			<ResetPasswordHeader landingPath={props.landingPath} />
			<div
				style={{
					flex: 4,
					background: `url(${ONSHIP_SIGNUP_BACKGROUND})`,
					backgroundSize: "cover",
					height: "90vh",
					width: "100vw",
				}}
				className="row align-items-center"
			>
				<div className="col-12 col-sm-8 offset-sm-2 col-md-8 offset-md-2 col-lg-4 offset-lg-4">
					<div
						className="rounded shadow-sm overflow-hidden"
						style={{ background: "rgba(9,69,116, 0.7)" }}
					>
						<div className="row justify-content-center">
							<div className="col-sm-12">
								<div className="pt-4 pb-4 text-white text-center">
									<h3 className="fs20 font100 lineH-1 mb-0">
										{ONSHIP_SUB_HEADER_TEXT}
									</h3>
								</div>
							</div>

							<div className="col-auto">
								<div className="text-center text-white">
									{state.error && <Error message={state.error} />}
									<form
										role="form"
										onSubmit={onFormSubmit}
										autoComplete="new-password"
										noValidate
									>
										<div>
											<div className="form-group">
												<label htmlFor="inputName">Name</label>
												<input
													id="inputName"
													placeholder="Full Name"
													type="text"
													className="form-control form-control-lg form-input-box"
													onChange={modifyGivenName}
													value={state.given_name}
													onBlur={checkForName}
												/>
												{state.given_name_error && (
													<ErrorMessage message={state.given_name_error} />
												)}
											</div>
											<div className="form-group">
												<label htmlFor="inputEmail">Email</label>
												<input
													id="inputEmail"
													placeholder="Email"
													type="email"
													className="form-control form-control-lg form-input-box"
													onChange={modifyEmail}
													value={state.email}
													onBlur={checkForEmail}
												/>
												{state.email_error && (
													<ErrorMessage message={state.email_error} />
												)}
											</div>
											<div
												className="form-group"
												style={{ position: "relative" }}
											>
												<label htmlFor="inputPassword">Password</label>
												<input
													id="inputPassword"
													placeholder="Password"
													type="password"
													className="form-control form-control-lg form-input-box"
													onFocus={() => {
														// console.log("we clicked on this");
														setState({ ...state, showToolTip: true });
													}}
													onBlur={() => {
														setState({ ...state, nowCheckPassword: true });
													}}
													autoComplete="new-password"
													onChange={modifyPassword}
													value={state.password}
												/>
												{passwordValidation(state.password) && (
													<SuccessMessage message={" Perfect! "} />
												)}

												{state.nowCheckPassword &&
													!passwordValidation(state.password) && (
														<ErrorMessage
															message={"Password credential not fullfilled"}
														/>
													)}
											</div>
											<div className="password-check-box">
												{state.showToolTip &&
													!passwordValidation(state.password) && (
														<div className="text-left password-check">
															<p>Password must contain: </p>
															<ul
																style={{
																	padding: "5px",
																	listStyle: "none",
																	margin: 0,
																}}
															>
																{state.passwordCriteria.map((elem, index) => {
																	return (
																		<li
																			key={index}
																			style={{ marginBottom: "5px" }}
																		>
																			{elem.isDone ? (
																				<img src="/img/pass-checkbox-checked.png" />
																			) : (
																				<img src="/img/pass-checkbox-empty.png" />
																			)}
																			{"\u00A0"}
																			{"\u00A0"}
																			{elem.text}
																		</li>
																	);
																})}
															</ul>
														</div>
													)}
											</div>
											<div className="form-group">
												<label htmlFor="inputConfirmPassword">
													Confirm Password
												</label>
												<input
													id="inputConfirmPassword"
													placeholder="Confirm Password"
													type="password"
													className="form-control form-control-lg form-input-box"
													onChange={modifyPassword2}
													value={state.password2}
													autoComplete="new-password"
													onBlur={() => {
														setState({
															...state,
															nowCheckConfirmPassword: true,
														});
														setState({ ...state, showToolTip: false });
													}}
												/>
												{state.password2 &&
													state.password2.length > 7 &&
													passwordConfirm(state.password) && (
														<SuccessMessage message={"  Match!  "} />
													)}

												{state.nowCheckConfirmPassword &&
													!passwordConfirm(state.password) && (
														<ErrorMessage
															message={"Password is not matching"}
														/>
													)}
											</div>
											<SignUPButton
												disabled={!checkFieldEmpty()}
												type="submit"
												className={`btn btn-open btn-lg btn-icon btn-block btn-custom mb-30 mt-40`}
											>
												Sign up
											</SignUPButton>
											<div className="text-white text-center">
												<Link
													to={{
														pathname: "/onship",
														state: {
															corporateSignup: !!props.corporateSignup,
														},
													}}
													className="btn"
													style={{
														textTransform: "none",
														color: "white",
														textDecoration: "underline",
													}}
													onClick={() => handleErrorMsg()}
												>
													<span>
														Already have an account? <b>Log in </b>
														<i className="icon-arrow-right" />
													</span>
												</Link>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = {
	clearLoginError: clearLoginError,
	removeUserLoginError: removeUserLoginError,
};

export default connect(null, mapStateToProps)(OnshipSignupView);
