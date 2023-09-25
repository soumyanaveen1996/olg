import React, { Component } from "react";
import { FRONTM_DOMAIN, HELPER_MESSAGE, ONSHIP_LANDING } from '../../Utils/Constants';
import Config from '../../Utils/Config';
import { activateEnterpriseBots } from '../../Services/BotsService';
import { updateLastLoggedInDomain } from '../../Services/UserService';
import { loadAllDomainsListInLFStorage } from '../../Services/LFStorage';

const R = require("ramda");

class GoogleLoginButton extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	startLogin = () => {
		this.props.clearLoginError();
		window.auth2
			.grantOfflineAccess({
				scope: "profile email",
			})
			.then(this.onSignIn);
	};

	onSignIn = (code) => {
		this.props.doGoogleAuth(code.code, this.props.onLogin);
	};

	render() {
		let landingPath = this.props.landingPath;
		return (
			<div>
				{landingPath === ONSHIP_LANDING ? (
					<a
						onClick={this.startLogin}
						className="d-block rounded si-colored-g-plus mb-2"
					>
						<img
							src="/offlinelms/img/GoogleButtonWideWidth.png"
							alt=""
							className="socialLogin-btn-wide"
							// style={{ width: "250px", height: "40px" }}
						/>
					</a>
				) : (
					<a
						onClick={this.startLogin}
						className="d-block rounded si-colored-g-plus mb-2"
					>
						<img
								src="/offlinelms/img/btn-google@2x.png"
							alt=""
							className="socialLogin-btn"
							// style={{ width: "250px", height: "40px" }}
						/>
					</a>
				)}
			</div>
		);
	}
}

export default GoogleLoginButton;
// w - 255 , h - 33
