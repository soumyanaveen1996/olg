import React, { Component } from "react";
import UserVerification from "./UserVerification";
import {
	doFrontMLogin,
	isCorporateLicenseValid,
} from "../../State/actions/user";
import { connect } from "react-redux";

class UserVerificationView extends Component {
	render() {
		return <UserVerification {...this.props} />;
	}
}

const mapActionToProps = {
	doFrontMLogin: doFrontMLogin,
	isCorporateLicenseValid: isCorporateLicenseValid,
};

export default connect(null, mapActionToProps)(UserVerificationView);
