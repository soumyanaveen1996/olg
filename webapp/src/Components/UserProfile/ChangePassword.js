import React, { Component } from "react";
import SuccessMessage from "../Common/SuccessMessage";
import Error from "../Common/Error";
import appType from "../../Utils/ApiConfig";
import { clearLFStorage } from "../../Services/LFStorage";
import { getAuthData } from "../../Services/StorageService";

class ChangePassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPassword: "",
			password: "",
			password2: "",
			error: null,
			showToolTip: false,
			passwordCriteria: [
				{ text: " One uppercase letter", isDone: false },
				{ text: " One lowercase letter", isDone: false },
				{ text: " One special character", isDone: false },
				{ text: " One number", isDone: false },
				{ text: " 8 characters minimum", isDone: false },
			],
		};
	}

	LogoutAndReset = () => {
		clearLFStorage();
		var pathName = localStorage.getItem("pathName");
		localStorage.clear();
		localStorage.setItem("pathName", pathName);
		this.clearListCookies();
		this.props.logout();
	};

	clearListCookies = () => {
		var cookies = document.cookie.split(";");
		for (var i = 0; i < cookies.length; i++) {
			var spcook = cookies[i].split("=");
			deleteCookie(spcook[0]);
		}
		function deleteCookie(cookiename) {
			var d = new Date();
			d.setDate(d.getDate() - 1);
			var expires = ";expires=" + d;
			var name = cookiename;
			//alert(name);
			var value = "";
			document.cookie = name + "=" + value + expires + "; path=/acc/html";
		}
	};

	modifyCurrentPassword = (e) => {
		this.setState({
			currentPassword: e.target.value,
			error: null,
		});
	};

	modifyPassword = (e) => {
		this.setState({ password: e.target.value }, () => {
			this.passwordChecking(this.state.password);
		});
		if (e.target.value === this.state.currentPassword) {
			this.setState({
				error: "New password can not be same as current password.",
			});
		} else {
			this.setState({ error: null });
		}
	};

	modifyPassword2 = (e) => this.setState({ password2: e.target.value });

	onFormSubmit = (e) => {
		e.preventDefault();
		this.setState({ error: null });
		let { currentPassword, password } = this.state;
		this.props
			.changePassword(currentPassword, password)
			.then((response) => {
				this.setState({ currentPassword: "", password: "", password2: "" });
				setTimeout(() => this.LogoutAndReset(), 1000);
			})
			.catch((error) => {
				this.setState({ error: error.message });
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
		return this.state.password === this.state.password2;
	};

	disableChangePasswordButton = () => {
		let passwordResult = this.passwordValidation(this.state.password);
		let passwordConfirmResult = this.passwordConfirm();

		if (this.state.error === null && passwordResult && passwordConfirmResult) {
			return true;
		}
	};

	render() {
		let { currentPassword, password, password2, error, showToolTip } =
			this.state;

		return (
			<div className="container ">
				<div className="row align-self-center justify-content-center">
					<div className="col-lg-12">
						<div className="row no-margin align-items-center">
							<div className="col-lg-12 no-padding col-md-12">
								{error && <Error message={error} />}
								<form onSubmit={this.onFormSubmit} noValidate>
									<div>
										<div style={{ position: "relative" }}>
											<div className="form-group">
												<label htmlFor="inputEmail">Current Password</label>
												<input
													id="inputCP"
													placeholder="Current Password"
													type="password"
													className="form-control form-control-lg form-input-box"
													onChange={this.modifyCurrentPassword}
													value={currentPassword}
												/>
											</div>
										</div>
										<div
											style={{
												position: "relative",
											}}
										>
											<div
												className="form-group"
												style={{ position: "relative" }}
											>
												<label htmlFor="inputPassword">New Password</label>
												<input
													id="inputPassword"
													placeholder="Password"
													type="password"
													className="form-control form-control-lg form-input-box"
													onFocus={() => {
														this.setState({
															showToolTip: true,
														});
													}}
													onChange={this.modifyPassword}
													value={password}
												/>
												{this.passwordValidation(this.state.password) && (
													<SuccessMessage message={" Perfect! "} />
												)}
											</div>
											{showToolTip && (
												<div
													style={{
														zIndex: 9999,
														position: "absolute",
														top: "30px",
														right: "-170px",
														backgroundColor: "#fff",
														borderRadius: "6px",
														padding: "20px",
														boxShadow: "0 0 6px 0 rgba(42,45,60,0.4)",
													}}
												>
													<p>Password must contain: </p>
													<ul
														style={{
															padding: "5px",
															listStyle: "none",
															margin: 0,
														}}
													>
														{this.state.passwordCriteria.map((elem, index) => {
															return (
																<li key={index} style={{ marginBottom: "5px" }}>
																	{elem.isDone ? (
																		<img
																			src="/offlinelms/img/pass-checkbox-checked.png"
																			alt="pass-checkbox-checked.png"
																		/>
																	) : (
																		<img
																				src="/offlinelms/img/pass-checkbox-empty.png"
																			alt="pass-checkbox-empty.png"
																		/>
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
												Re-enter New Password
											</label>
											<input
												id="inputConfirmPassword"
												placeholder="Confirm Password"
												type="password"
												className="form-control form-control-lg form-input-box"
												onChange={this.modifyPassword2}
												value={password2}
												onBlur={() => {
													this.setState({ showToolTip: false });
												}}
											/>
											{this.state.password2 &&
												this.state.password2.length > 7 &&
												this.passwordConfirm(this.state.password) && (
													<SuccessMessage message={"  Match!  "} />
												)}
										</div>

										<button
											disabled={!this.disableChangePasswordButton()}
											type="submit"
											className="btn btn-open btn-lg btn-icon btn-block btn-custom mb-30 mt-40"
										>
											Submit
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ChangePassword;
