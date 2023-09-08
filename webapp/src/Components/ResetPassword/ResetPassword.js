import React, { Component } from "react";
import AuthServiceClient from "../../Services/Clients/AuthServiceClient";
import { validateResetPasswordEmailForm } from "../../Utils/Validator";
import Toast from "../ModalMessages/Toast";
import ResetPasswordHeader from "./ResetPasswordHeader";
import ResetPasswordContent from "./ResetPasswordContent";
import { getSignupPath, setSignupPath } from "../../Services/StorageService";
import appType from "../../Utils/ApiConfig";
import history from "../../Services/History";

class ResetPassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			error: "",
			loading: false,
			submitted: false,
		};
	}

	componentDidMount() {
		if (this.props.computedMatch.params.domainName) {
			setSignupPath("/" + this.props.computedMatch.params.domainName);
		}
	}

	changeEmail = (e) => {
		e.preventDefault();
		this.setState({ email: e.target.value });
	};
	handleSubmit = async (e) => {
		e.preventDefault();

		let error = validateResetPasswordEmailForm(this.state);
		if (error) {
			this.setState({ error: error });
			return;
		} else {
			this.setState({ error: "" });
		}
		console.log("lets see the email", this.state.email);

		let { email } = this.state;

		let typeOfApp = appType;

		let resetPasswordObj = {};

		if (typeOfApp) {
			resetPasswordObj = {
				email,
				appType: typeOfApp,
			};
		} else {
			resetPasswordObj = {
				email,
			};
		}

		AuthServiceClient.resetPassword(resetPasswordObj)
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

		// history.push({
		//   pathname: "/resetConfirmPassword",
		//   state: {
		//     email: this.state.email
		//   }
		// });
	};

	handleSuccess = (data) => {
		if (data.success) {
			Toast({
				type: "success",
				message:
					"Code sent successfully! Please verify the Code that has been emailed.",
				onClose: () =>
					history.push({
						pathname: "/resetConfirmPassword",
						state: {
							email: this.state.email,
						},
					}),
				autoClose: 5000,
			});
		} else {
			if (data.errorCode === "UserNotFoundException") {
				Toast({
					type: "error",
					message: "User Not Found",
				});
			} else {
				Toast({
					type: "error",
					message: data.message,
				});
			}
		}
	};
	handleError = (error) => {
		Toast({
			type: "error",
			message: error.message || "Error occurred while creating user",
		});
	};
	handleGoBack = (e) => {
		e.preventDefault();
		const newPathName = getSignupPath();
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
	};
	render() {
		const { email, error } = this.state;
		let newPathName = getSignupPath();
		if (newPathName && newPathName.length > 0) {
			return (
				<div className="d-flex flex-column">
					<ResetPasswordHeader landingPath={newPathName} />
					<ResetPasswordContent
						handleGoBack={this.handleGoBack}
						handleSubmit={this.handleSubmit}
						email={email}
						error={error}
						changeEmail={this.changeEmail}
						landingPath={newPathName}
					/>
				</div>
			);
		} else {
			return (
				<ResetPasswordContent
					handleGoBack={this.handleGoBack}
					handleSubmit={this.handleSubmit}
					email={email}
					error={error}
					changeEmail={this.changeEmail}
				/>
			);
		}
	}
}

export default ResetPassword;
