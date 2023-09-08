import React, { Component } from "react";
import Login from "./Login";
import {
	getAuthCode,
	unsetAuthCode,
	setSignupPath,
} from "../../Services/StorageService";
import history from "../../Services/History";

class LoginView extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	onLoginSuccess = (message) => {
		let { location } = window;
		let query = null;
		if (location && location.search) {
			query = location.search;
		}

		if (location && location.pathname) {
			setSignupPath(location.pathname);
		} else {
			setSignupPath("/login");
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

		localStorage.setItem("fMMapBanner", 1);
	};

	onLoginError = (error, email = null, password = null) => {
		if (error.includes("confirmed")) {
			let authCodeObject = getAuthCode();
			let emailFromAuthCode = authCodeObject && Object.keys(authCodeObject)[0];
			let authCode = authCodeObject && authCodeObject[emailFromAuthCode];
			return history.push({
				pathname: "/verify",
				state: {
					email,
					password,
					authCode: authCode,
				},
			});
		}
	};

	render() {
		return (
			<Login
				{...this.props}
				onLogin={this.onLoginSuccess}
				onError={this.onLoginError}
			/>
		);
	}
}

export default LoginView;
