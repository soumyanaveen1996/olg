import React, { Component } from "react";
import Error from "./../Common/ErrorMessage";
import { validatConfirmPasswordResetForm } from "../../Utils/Validator";
import { Link } from "react-router-dom";
import AuthServiceClient from "../../Services/Clients/AuthServiceClient";
import Toast from "../ModalMessages/Toast";
import { getSignupPath } from "../../Services/StorageService";
import CustomResetConfirmPassword from "./CustomResetConfirmPassword";
import ResetPasswordHeader from "./ResetPasswordHeader";
import appType from "../../Utils/ApiConfig";
import history from "../../Services/History";

class ResetConfirmPassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			code: "",
			password: "",
			password2: "",
			error: "",
			email: "",
		};
	}

	componentDidMount() {
		const { email } = this.props.location.state;

		// console.log("lets see the email ", email);

		this.setState({ email });
	}

	setCode = (e) => {
		e.preventDefault();
		this.setState({ code: e.target.value });
	};
	modifyPassword = (e) => this.setState({ password: e.target.value });
	modifyPassword2 = (e) => this.setState({ password2: e.target.value });

	checkPass = () => this.state.password === this.state.password2;

	onFormSubmit = (e) => {
		e.preventDefault();

		// console.log("info ", this.state);
		this.setState({ error: null });
		let error = validatConfirmPasswordResetForm(this.state);

		if (error) {
			this.setState({ error: error });
			return;
		}
		console.log("see all state", this.state);

		let { email, code, password } = this.state;

		let typeOfApp = appType;
		let confirmPasswordResetObj = {};
		if (typeOfApp) {
			confirmPasswordResetObj = {
				email: email,
				verificationCode: code,
				newPassword: password,
				appType: typeOfApp,
			};
		} else {
			confirmPasswordResetObj = {
				email: email,
				verificationCode: code,
				newPassword: password,
			};
		}

		AuthServiceClient.confirmPasswordReset(confirmPasswordResetObj)
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
		const newPathName = getSignupPath();
		if (data.success) {
			Toast({
				type: "success",
				message: "Password changed successfully! Please login again.",
				onClose: () => {
					if (newPathName && newPathName.length > 0) {
						history.push({
							pathname: newPathName,
							state: {
								email: this.state.email,
							},
						});
					} else {
						history.push({
							pathname: "/login",
							state: {
								email: this.state.email,
							},
						});
					}
				},
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
		let { error, email, code, password } = this.state;
		let newPathName = getSignupPath();
		if (newPathName && newPathName.length > 0) {
			return (
				<div className="d-flex flex-column">
					<ResetPasswordHeader landingPath={newPathName} />
					<CustomResetConfirmPassword
						email={email}
						error={error}
						code={code}
						password={password}
						onFormSubmit={this.onFormSubmit}
						setCode={this.setCode}
						modifyPassword={this.modifyPassword}
						landingPath={newPathName}
					/>
				</div>
			);
		} else {
			return (
				<div
					className="page-wrapper d-flex flex fullscreen align-items-center greenBackground"
					id="page-wrapper"
				>
					<div className="container">
						<div className="row align-self-center">
							<div className="col-lg-5 mr-auto ml-auto">
								<div
									className="bg-white rounded shadow-sm overflow-hidden"
									style={{ border: "1px solid rgba(44, 45, 58, 0.14)" }}
								>
									<div className="row no-margin align-items-center">
										<div className="col-lg-12 no-padding  col-md-12">
											<div className="p-5 text-dark text-center">
												<h3 className="fs-2x font300 lineH-1 mb-0 h3-color">
													Reset your password
												</h3>
											</div>
											<div className="pl-5 pr-5 pt-15 pb-15">
												<form onSubmit={this.onFormSubmit} autoComplete="off">
													<div>
														<div className="form-group">
															<label htmlFor="code">Verification Code</label>
															<input
																id="code"
																placeholder="- - - - - -"
																type="number"
																style={{ textAlign: "center" }}
																onChange={this.setCode}
																autoComplete="false"
																className="form-control form-control-lg form-input-box"
															/>
															{error && error === "Code is required" && (
																<Error message={error} />
															)}
														</div>

														<div className="form-group">
															<label htmlFor="inputPassword">Password</label>
															<input
																id="inputPassword"
																placeholder="Password"
																type="password"
																autoComplete="false"
																className="form-control form-control-lg form-input-box"
																onChange={this.modifyPassword}
															/>
															{error &&
																error === "Password field is required" && (
																	<Error message={error} />
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
																autoComplete="false"
																className="form-control form-control-lg form-input-box"
																onChange={this.modifyPassword2}
															/>
															{error &&
																error ===
																	"Confirm password should be the same" && (
																	<Error message={error} />
																)}
															{error &&
																error ===
																	"Confirm password field is required" && (
																	<Error message={error} />
																)}
														</div>

														<button
															type="submit"
															className="btn btn-open btn-lg btn-icon btn-block btn-custom mb-30 mt-50"
														>
															Reset password
														</button>

														<div style={{ textAlign: "center" }}>
															<Link
																to="/resetPassword"
																className="btn btn-text"
																style={{ textTransform: "none" }}
															>
																Review email address and send the verification
																code again
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
				</div>
			);
		}
	}
}

export default ResetConfirmPassword;
