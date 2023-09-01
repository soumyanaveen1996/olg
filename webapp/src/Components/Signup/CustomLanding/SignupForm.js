import React from "react";

import { validateSignUpForm } from "../../../Utils/Validator";
import SuccessMessage from "../../Common/SuccessMessage";
import ErrorMessage from "../../Common/ErrorMessage";
import {
	STATION_SATCOM_LANDING,
	THURAYA_LANDING,
	VOYAGER_LANDING,
	VIKAND_LANDING,
	INTELL4DESK_LANDING,
	VIKAND_DIRECT_LANDING,
	ONSHIP_LANDING,
	SIGMA_LANDING,
} from "../../../Utils/Constants";
import Config from "../../../Utils/Config";

const R = require("ramda");
export default class SignupForm extends React.Component {
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
			// authCode: this.props.corporateSignup
			//   ? this.props.landingPath === VOYAGER_LANDING
			//     ? "gnsTestBots"
			//     : ""
			//   : "",
			authCode: "",
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

	componentDidMount() {
		if (this.props.corporateSignup) {
			switch (this.props.landingPath) {
				case VOYAGER_LANDING:
					this.setState({
						authCode: R.prop("gnsDomain", Config),
					});
					break;

				case ONSHIP_LANDING:
					this.setState({
						authCode: R.prop("onshipDomain", Config),
					});
					break;
				default:
					this.setState({
						authCode: "",
					});
					break;
			}
		}
	}

	modifyEmail = (e) => {
		this.setState({ email_error: "", email: e.target.value });
	};
	modifyPassword = (e) =>
		this.setState({ password: e.target.value }, () => {
			this.passwordChecking(this.state.password);
		});
	modifyPassword2 = (e) => this.setState({ password2: e.target.value });
	modifyAuthCode = (e) => this.setState({ authCode: e.target.value });
	modifyGivenName = (e) =>
		this.setState({ given_name_error: "", given_name: e.target.value }, () => {
			this.modifyName();
		});

	modifyName = () =>
		this.setState({
			name: this.state.given_name,
		});

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

	isActivationCodeMandatory() {
		if (this.props.landingPath === VOYAGER_LANDING) {
			return true;
		}
		if (this.props.landingPath === STATION_SATCOM_LANDING) {
			return false;
		}
		if (this.props.landingPath === THURAYA_LANDING) {
			return true;
		}
		if (this.props.landingPath === VIKAND_LANDING) {
			return true;
		}
		if (this.props.landingPath === VIKAND_DIRECT_LANDING) {
			return true;
		}
		if (this.props.landingPath === INTELL4DESK_LANDING) {
			return true;
		}
		return false;
	}

	onFormSubmit = (e) => {
		this.setState({ error: null });
		const activationCodeMandatory = this.isActivationCodeMandatory();
		let error = validateSignUpForm(this.state, activationCodeMandatory);
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

	// onChangePassword(text) {
	//   this.setState({ password: text }, () => {
	//     this.passwordChecking(this.state.password);
	//   });
	// }

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
		let authCodeResult = !this.isActivationCodeMandatory()
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

	render() {
		let { given_name, email, password, password2, authCode } = this.state;
		const { landingPath } = this.props;
		return (
			<div className="d-flex flex-column justify-content-center align-items-center">
				<form
					className="form_placeholders"
					role="form"
					onSubmit={(e) => {
						this.onFormSubmit(e);
					}}
					autoComplete="new-password"
					noValidate
				>
					<div className="row">
						<div className="form-group col-lg-12">
							<input
								placeholder="Full Name"
								type="text"
								className="form-control form-content-input textBox-rev text-dark"
								onChange={this.modifyGivenName}
								value={given_name}
								onBlur={this.checkForName}
							/>
							{this.state.given_name_error && (
								<ErrorMessage message={this.state.given_name_error} />
							)}
						</div>
						<div className="form-group col-lg-12">
							<input
								placeholder="Email"
								type="email"
								className="form-control form-content-input textBox-rev text-dark"
								onChange={this.modifyEmail}
								value={email}
								onBlur={this.checkForEmail}
							/>
							{this.state.email_error && (
								<ErrorMessage message={this.state.email_error} />
							)}
						</div>
						<div className="form-group col-lg-6 ">
							<input
								placeholder="Password"
								type="password"
								className="form-control form-content-input textBox-rev text-dark"
								onFocus={() => {
									this.setState({ showToolTip: true });
								}}
								onBlur={() => {
									this.setState({ nowCheckPassword: true });
								}}
								autoComplete="new-password"
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
						<div className="form-group col-lg-6 ">
							<input
								placeholder="Confirm password"
								type="password"
								className="form-control form-content-input textBox-rev text-dark"
								onChange={this.modifyPassword2}
								autoComplete="new-password"
								value={password2}
								onBlur={() => {
									this.setState({
										nowCheckConfirmPassword: true,
										showToolTip: false,
									});
								}}
							/>
							{this.state.password2 &&
								this.state.password2.length > 7 &&
								this.passwordConfirm(this.state.password) && (
									<SuccessMessage message={"  Match!  "} />
								)}

							{this.state.nowCheckConfirmPassword &&
								!this.passwordConfirm(this.state.password) && (
									<ErrorMessage message={"Password is not matching"} />
								)}
						</div>
						{(landingPath === THURAYA_LANDING ||
							landingPath === STATION_SATCOM_LANDING ||
							landingPath === INTELL4DESK_LANDING ||
							landingPath === VIKAND_LANDING ||
							landingPath === SIGMA_LANDING ||
							landingPath === VIKAND_DIRECT_LANDING) && (
								<div className="form-group col-lg-12">
									<input
										placeholder="License Key"
										type="text"
										className="form-control form-content-input textBox-rev text-dark"
										onChange={this.modifyAuthCode}
										value={authCode}
									/>
								</div>
							)}
						<div className="form-group col-lg-12">
							<button
								disabled={!this.checkFieldEmpty()}
								type="submit"
								className={`btn btn-open btn-lg btn-custom mb-10 mt-20 ${landingPath && landingPath.replace("/", "")
									}-btn`}
								style={{ width: "100%" }}
							>
								Create Account
							</button>
						</div>
						{this.state.showToolTip && (
							<div
								style={{
									zIndex: 9999,
									position: "absolute",
									top: "380px",
									right: "95px",
									backgroundColor: "#fff",
									borderRadius: "6px",
									padding: "20px",
									boxShadow: "0 0 6px 0 rgba(42,45,60,0.4)",
								}}
							>
								<p>Password must contain: </p>
								<ul
									style={{
										padding: "4px",
										listStyle: "none",
										margin: 0,
									}}
								>
									{this.state.passwordCriteria.map((elem, index) => {
										return (
											<li key={index} style={{ marginBottom: "5px" }}>
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
				</form>
			</div>
		);
	}
}
