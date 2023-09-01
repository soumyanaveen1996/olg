import React, { Component } from "react";
import { connect } from "react-redux";
import {
	doFrontMLogin,
	doGoogleAuth,
	clearLoginError,
	removeUserLoginError,
} from "./../State/actions/user";
import LoginView from "../Components/Login/LoginView";
import { hideSpinner } from "../State/actions/spinner";

// class LoginContainer extends Component {
//   render() {
//     return <LoginView {...this.props} />;
//   }
// }

const LoginContainer = (props) => {
	return <LoginView {...props} />;
};

const mapActionToProps = {
	doFrontMLogin: doFrontMLogin,
	doGoogleAuth: doGoogleAuth,
	clearLoginError: clearLoginError,
	removeUserLoginError: removeUserLoginError,
	hideSpinner: hideSpinner,
};

const mapDataToProps = (state) => {
	return {
		user: state.user.user,
		auth: state.user.auth,
		error: state.user.error,
	};
};
export default connect(mapDataToProps, mapActionToProps)(LoginContainer);
