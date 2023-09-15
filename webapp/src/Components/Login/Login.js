import React, { Component } from "react";
import { Link } from "react-router-dom";
import GoogleLoginButton from "./GoogleLoginButton";
import FrontMLogin from "./FrontMLogin";

import {
	ONSHIP_TITLE,
	FRONTM_TITLE,
	ONSHIP_LANDING,
	THURAYA_T2M_LANDING,
	THURAYA_LANDING,
	THURAYA_TITLE,
	VIKAND_LANDING,
	VIKAND_DIRECT_LANDING,
	VIKAND_TITLE,
	THURAYA_T2M_TITLE,
	STATION_SATCOM_LANDING,
	ONECARE_LANDING,
	ONECARE_TITLE,
	STATION_SATCOM_TITLE,
	SIGMA_LANDING,
	SIGMA_TITLE,
	ONELEARN_LANDING,
} from "../../Utils/Constants";
import history from "../../Services/History";
import OneLearnLogin from "./OneLearnLogin";

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			corporateSignup: false,
			signUpPath: "/signup",
			showSignUpLink: [ONSHIP_LANDING, THURAYA_T2M_LANDING],
		};
	}

	componentDidMount() {
		let state = this.props && this.props.location && this.props.location.state;
		if (state && state.corporateSignup) {
			this.setState({ corporateSignup: true });
		} else {
			this.setState({ corporateSignup: false });
		}
		switch (this.props.landingPath) {
			case ONSHIP_LANDING:
				window.document.title = ONSHIP_TITLE;
				break;
			case THURAYA_T2M_LANDING:
				window.document.title = THURAYA_T2M_TITLE;
				break;
			case THURAYA_LANDING:
				window.document.title = THURAYA_TITLE;
				break;
			case VIKAND_LANDING:
				window.document.title = VIKAND_TITLE;
				break;
			case VIKAND_DIRECT_LANDING:
				window.document.title = VIKAND_TITLE;
				break;
			case ONECARE_LANDING:
				window.document.title = ONECARE_TITLE;
				break;
			case STATION_SATCOM_LANDING:
				window.document.title = STATION_SATCOM_TITLE;
				break;
			case SIGMA_LANDING:
				window.document.title = SIGMA_TITLE;
				break;
			default:
				window.document.title = FRONTM_TITLE;
				break;
		}
		state && delete state.corporateSignup;
		state && history.replace({ state: { ...state } });
		if (this.state.showSignUpLink.includes(this.props.landingPath)) {
			this.setState({
				signUpPath: this.props.landingPath + "/signup",
			});
		}
	}

	showSocialLogin = () => {
		let orLogInText =
			this.props.landingPath === "/onship" ? "Or" : "Or log in with";
		if (
			this.props.landingPath === "/vikand" ||
			this.props.landingPath === "/vikandconnect" ||
			this.props.landingPath === "/sattrackland" ||
			this.props.landingPath === "/thuraya" ||
			this.props.landingPath === STATION_SATCOM_LANDING ||
			this.props.landingPath === ONECARE_LANDING ||
			this.props.landingPath === ONELEARN_LANDING ||
			this.props.landingPath === SIGMA_LANDING
		) {
			return null;
		} else
			return (
				<div>
					<div
						className="text-center sep-white mb-2"
						style={{ marginTop: "-1.2rem" }}
					>
						<span style={{ color: "inherit" }}>{orLogInText}</span>
					</div>
					<div className="d-flex justify-content-around">
						<GoogleLoginButton {...this.props} />
					</div>
				</div>
			);
	};

	render() {
		// console.log("login for vikand ", this.props);

		return (
			<div
				className="d-flex flex-column"
				style={{
					width:
						(this.props.landingPath === "/vikand" ||
							this.props.landingPath === "/vikandconnect" ||
							this.props.landingPath === "/intelli4desks" ||
							this.props.landingPath === "/sigma" ||
							this.props.landingPath === "/onecare") &&
						"300px",
				}}
			>
				<div>
					<div className="px-4 py-2">
						{this.props.landingPath === ONELEARN_LANDING
							? (<OneLearnLogin {...this.props} />)
							: (<FrontMLogin {...this.props} />)
						}
					</div>
					<div
						className={`p-4 flex`}
					>
						{this.showSocialLogin()}
						{(!this.props.corporateSignup ||
							this.state.showSignUpLink.includes(this.props.landingPath)) && (
							<div className="text-center mt-4 pt-4">
								<Link
									to={{
										pathname: this.state.signUpPath,
										state: "flush",
									}}
									className={`btn btn-install ${
										this.props.landingPath &&
										this.props.landingPath.replace("/", "")
									}-link`}
									style={{ textTransform: "none" }}
								>
									You don’t have an account? Sign up{" "}
									<i className="icon-arrow-right" />
								</Link>
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default Login;
