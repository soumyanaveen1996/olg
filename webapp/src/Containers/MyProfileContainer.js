import React, { Component } from "react";
import { connect } from "react-redux";
import MyProfileView from "../Components/UserProfile/MyProfileView";
import {
	updateUserProfile,
	sendMsgForBanner,
	setCallQuality,
	updateSoftwareMfaStatus,
	updateSoftwareMfaEnabled,
} from "../State/actions/user";

class MyProfileContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		window.document.title = "My Profile";
	}

	render() {
		const { isOnline } = this.props;
		if (isOnline) {
			return (
				<MyProfileView
					{...this.props}
					sendMsgForBanner={this.props.sendMsgForBanner}
				/>
			);
		} else {
			return (
				<div
					style={{
						background: "url('/offlinelms/img/welcomescreen-background.png')",
						backgroundSize: "cover",
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
						height: "100%",
						width: "100%",
					}}
				>
					<div
						style={{
							position: "absolute",
							top: "40%",
							left: "50%",
							textAlign: "center",
						}}
					>
						<img src="/offlinelms/img/sad-cloud.png" height="65" />
						<p className="font-weight-bold mt-3 mb-0">
							Profile is not available offline.
						</p>
						<p> Please connect and try again.</p>
					</div>
				</div>
			);
		}
	}
}

const mapActionToProps = {
	updateUserProfile: updateUserProfile,
	sendMsgForBanner,
	setCallQuality,
	updateSoftwareMfaStatus,
	updateSoftwareMfaEnabled,
};

const mapDataToProps = (state) => {
	let user = state.user;
	let low_bw_calls = user.user.lowBandwidthCalls;
	let profileImage = user.profileImage || null;
	let contacts = state.contacts;

	return {
		user: user.user,
		isOnline: user.isOnline,
		profileImage,
		low_bw_calls,
		loginState: user.loginState,
		selectedDomain: state.selectedDomain,
		softwareMfaStatus: state.user.softwareMfaStatus,
		contacts,
	};
};

export default connect(mapDataToProps, mapActionToProps)(MyProfileContainer);
