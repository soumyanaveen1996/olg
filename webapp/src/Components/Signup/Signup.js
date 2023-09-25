import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./Signup.css";
import Error from "./../Common/Error";
import { validateSignUpForm } from "../../Utils/Validator";
import { Link } from "react-router-dom";
import SuccessMessage from "../Common/SuccessMessage";
import ErrorMessage from "../Common/ErrorMessage";
import GoogleLoginButton from "../Login/GoogleLoginButton";
import {
	doGoogleAuth,
	clearLoginError,
	removeUserLoginError,
} from "../../State/actions/user";

class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			password2: "",
			given_name: "",
			family_name: "",
			nowCheckConfirmPassword: false,
			nowCheckPassword: false,
			name: "",
			authCode: this.props.corporateSignup ? "gnsTestBots" : "",
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
		};
	}

	modifyEmail = (e) => {
		this.setState({ email_error: "", email: e.target.value });
	};
	modifyPassword = (e) =>
		this.setState({ password: e.target.value }, () => {
			this.passwordChecking(this.state.password);
		});
	modifyPassword2 = (e) => this.setState({ password2: e.target.value });
	// modifyAuthCode = e => this.setState({ authCode: e.target.value });
	modifyGivenName = (e) => {
		let name = e.target.value;
		this.setState({ given_name_error: "", given_name: name }, () => {
			this.modifyName();
		});
	};

	checkForName = () => {
		let name = this.state.given_name;
		if (name.length < 3) {
			this.setState({ given_name_error: "Atleast 3 letters" });
		}
	};
	checkForEmail = () => {
		let emailResult = this.validateEmail(this.state.email);
		if (!emailResult) {
			this.setState({ email_error: "Invalid email" });
		}
	};
	// modifyFamilyName = e =>
	//   this.setState({ family_name: e.target.value }, () => {
	//     this.modifyName();
	//   });
	modifyName = () =>
		this.setState({
			name: this.state.given_name,
		});
	checkPass = () => this.state.password === this.state.password2;

	onFormSubmit = (e) => {
		console.log("info ", this.state);
		this.setState({ error: null });
		let error = validateSignUpForm(this.state, this.props.corporateSignup);
		if (error) {
			this.setState({ error: error });
			return;
		}

		this.props.createUser(this.state);
		e.preventDefault();
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

	passwordChecking = (string) => {
		if (string.length >= 8) {
			const newArr = [...this.state.passwordCriteria];
			newArr[4].isDone = true;
			this.setState({ passwordCriteria: [...newArr] });
		} else {
			const newArr = [...this.state.passwordCriteria];
			this.setState({ eightCharacterCase: false });
			newArr[4].isDone = false;
			this.setState({ passwordCriteria: [...newArr] });
		}
		if (/[a-z]/.test(string)) {
			const passArr = [...this.state.passwordCriteria];
			passArr[1].isDone = true;
			this.setState({ passwordCriteria: [...passArr] });
		} else {
			const passArr = [...this.state.passwordCriteria];
			passArr[1].isDone = false;
			this.setState({ passwordCriteria: [...passArr] });
		}
		if (/[A-Z]/.test(string)) {
			const passArr = [...this.state.passwordCriteria];
			passArr[0].isDone = true;
			this.setState({ passwordCriteria: [...passArr] });
		} else {
			const passArr = [...this.state.passwordCriteria];
			passArr[0].isDone = false;
			this.setState({ passwordCriteria: [...passArr] });
		}
		if (/[0-9]/.test(string)) {
			const passArr = [...this.state.passwordCriteria];
			passArr[3].isDone = true;
			this.setState({ passwordCriteria: [...passArr] });
		} else {
			const passArr = [...this.state.passwordCriteria];
			passArr[3].isDone = false;
			this.setState({ passwordCriteria: [...passArr] });
		}
		if (/[\^$*.[\]{}()?"!'@#%&\\/,><:;|_~`]/.test(string)) {
			const passArr = [...this.state.passwordCriteria];
			passArr[2].isDone = true;
			this.setState({ passwordCriteria: [...passArr] });
		} else {
			const passArr = [...this.state.passwordCriteria];
			passArr[2].isDone = false;
			this.setState({ passwordCriteria: [...passArr] });
		}
	};

	onChangePassword(text) {
		this.setState({ password: text }, () => {
			this.passwordChecking(this.state.password);
		});
	}

	passwordConfirm = () => {
		if (this.state.password !== this.state.password2) {
			return false;
		} else {
			return true;
		}
	};

	validateEmail(email) {
		var re =
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}

	validateAuthCode = () => {
		if (this.state.authCode) {
			return true;
		}
		return false;
	};

	checkFieldEmpty = () => {
		let emailResult = this.validateEmail(this.state.email);
		let passworResult = this.passwordValidation(this.state.password);
		let passwordConfirmResult = this.passwordConfirm();
		let authCodeResult = !this.props.corporateSignup
			? true
			: this.validateAuthCode();
		if (
			this.state.name.length >= 3 &&
			emailResult &&
			passworResult &&
			passwordConfirmResult &&
			authCodeResult
		) {
			return true;
		}
	};

	toggle = () => {
		this.setState({
			authCodeToolTipOpen: !this.state.authCodeToolTipOpen,
		});
	};

	handleErrorMsg = () => {
		console.log("remove error");
		this.props.clearLoginError();
		this.props.removeUserLoginError();
	};

	render() {
		let { given_name, email, password, password2, error } = this.state;

		return (
			<div className="container">
				<div className="row align-self-center">
					<div className="col-lg-5 mr-auto ml-auto">
						<div
							className="bg-white rounded shadow-sm overflow-hidden"
							style={{ border: "1px solid rgba(44, 45, 58, 0.14)" }}
						>
							{this.state.showToolTip && (
								<div
									style={{
										zIndex: 9999,
										position: "absolute",
										top: "310px",
										right: "-170px",
										backgroundColor: "#fff",
										borderRadius: "6px",
										padding: "20px",
										boxShadow: "0 0 6px 0 rgba(42,45,60,0.4)",
									}}
								>
									<p>Password must contain: </p>
									<ul style={{ padding: "5px", listStyle: "none", margin: 0 }}>
										{this.state.passwordCriteria.map((elem, index) => {
											return (
												<li key={index} style={{ marginBottom: "5px" }}>
													{elem.isDone ? (
														<img src="/offlinelms/img/pass-checkbox-checked.png" />
													) : (
															<img src="/offlinelms/img/pass-checkbox-empty.png" />
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
							<div className="row no-margin align-items-center">
								<div className="col-lg-12 no-padding  col-md-12">
									<div className="p-4 text-dark text-center">
										<h2 className="fs-2x font300 lineH-1 mb-0">Welcome! </h2>
										{this.props.corporateSignup ? (
											<h3 className="fs20 font100 lineH-1 mb-0">
												Sign up to Voyager Voice
											</h3>
										) : (
											<h3 className="fs20 font100 lineH-1 mb-0">
												Sign up to FrontM
											</h3>
										)}
									</div>
									<div className="pl-5 pr-5 pt-15 pb-15">
										{error && <Error message={error} />}

										<form role="form" onSubmit={this.onFormSubmit} noValidate>
											<div>
												<div className="form-group">
													<label htmlFor="inputName">Name</label>
													<input
														id="inputName"
														placeholder="Full Name"
														type="text"
														className="form-control form-control-lg form-input-box"
														onChange={this.modifyGivenName}
														value={given_name}
														onBlur={this.checkForName}
													/>
													{this.state.given_name_error && (
														<ErrorMessage
															message={this.state.given_name_error}
														/>
													)}
												</div>
												<div className="form-group">
													<label htmlFor="inputEmail">Email</label>
													<input
														id="inputEmail"
														placeholder="Email"
														type="email"
														className="form-control form-control-lg form-input-box"
														onChange={this.modifyEmail}
														value={email}
														onBlur={this.checkForEmail}
													/>
													{this.state.email_error && (
														<ErrorMessage message={this.state.email_error} />
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
															this.setState({ showToolTip: true });
														}}
														onBlur={() => {
															this.setState({ nowCheckPassword: true });
														}}
														onChange={this.modifyPassword}
														value={password}
													/>
													{this.passwordValidation(this.state.password) && (
														<SuccessMessage message={" Perfect! "} />
													)}

													{this.state.nowCheckPassword &&
														!this.passwordValidation(this.state.password) && (
															<ErrorMessage
																message={"Password credential not fullfilled"}
															/>
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
														onChange={this.modifyPassword2}
														value={password2}
														onBlur={() => {
															// console.log("i m going off");
															this.setState({
																nowCheckConfirmPassword: true,
															});
															this.setState({ showToolTip: false });
														}}
													/>
													{this.state.password2 &&
														this.state.password2.length > 7 &&
														this.passwordConfirm(this.state.password) && (
															<SuccessMessage message={"  Match!  "} />
														)}

													{this.state.nowCheckConfirmPassword &&
														!this.passwordConfirm(this.state.password) && (
															<ErrorMessage
																message={"Password is not matching"}
															/>
														)}
												</div>
												<button
													disabled={!this.checkFieldEmpty()}
													type="submit"
													className="btn btn-open btn-lg btn-icon btn-block btn-custom mb-30 mt-40"
												>
													Sign up
												</button>
												<div style={{ textAlign: "center" }}>
													{/* <a className="back-to-login">
                            Already have an account? Log in
                          </a> */}
													<Link
														to={{
															pathname: "/login",
															state: {
																corporateSignup: !!this.props.corporateSignup,
															},
														}}
														onClick={() => this.handleErrorMsg()}
														className="btn btn-text"
														style={{ textTransform: "none" }}
													>
														<span className="text-primary-active">
															Already have an account? <b>Log in </b>
															<i className="icon-arrow-right" />
														</span>
													</Link>
												</div>
												{this.props.corporateSignup && (
													<div className="d-flex justify-content-around mt-20 mb-20">
														<GoogleLoginButton {...this.props} />
													</div>
												)}
											</div>
										</form>
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
		);
	}
}

const mapStateToProps = {
	doGoogleAuth: doGoogleAuth,
	clearLoginError: clearLoginError,
	removeUserLoginError: removeUserLoginError,
};

Signup.propTypes = {
	createUser: PropTypes.func.isRequired,
};

export default connect(null, mapStateToProps)(Signup);
