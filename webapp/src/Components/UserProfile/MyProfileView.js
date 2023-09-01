import React, { Component } from "react";
import { BANNER_TYPE_ERROR, BANNER_TYPE_INFO } from "../../Utils/Constants";
import { addAppNotification } from "../../State/actions/appNotifications";
import Toast from "../ModalMessages/Toast";

import "../Catalog/Catalog.css";
import MySettings from "./MySettings";
import ProfileDetailsView from "./ProfileDetailsView";
import UserServiceClient from "../../Services/Clients/UserServiceClient";
// import Notify from "../ModalMessages/ToastNotif";
import AuthServiceClient from "../../Services/Clients/AuthServiceClient";
import store from "../../State/configureStore";
import { unsavedForm } from "../../State/actions/user";
import appType from "../../Utils/ApiConfig";
import _ from "lodash";
import Config from "../../Utils/Config";
import IgnoredContactsView from "./IgnoredContactsView";
const R = require("ramda");

class MyProfileView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchable: true,
			visible: false,
			backgroundUrl: null,
			profileScreenType: "profileDetailsView",
		};
	}

	componentDidMount() {
		let { selectedDomain } = this.props;

		let selectedDomainObj = _.cloneDeep(selectedDomain);
		let bgUrl = selectedDomainObj?.backgroundUrl
			? R.prop("contentURL", Config) + selectedDomainObj.backgroundUrl
			: "/img/welcomescreen-background.png";

		this.setState({
			backgroundUrl: bgUrl,
			searchable: this.props.user.searchable,
			visible: this.props.user.visible,
		});
	}

	componentDidUpdate(prevProps) {
		if (
			this.props.selectedDomain &&
			!_.isEqual(this.props.selectedDomain, prevProps.selectedDomain)
		) {
			let { selectedDomain } = this.props;
			let selectedDomainObj = _.cloneDeep(selectedDomain);
			let bgUrl = selectedDomainObj?.backgroundUrl
				? R.prop("contentURL", Config) + selectedDomainObj.backgroundUrl
				: "/img/welcomescreen-background.png";
			this.setState({
				backgroundUrl: bgUrl,
			});
		}
	}
	setbackGroundUrl = () => {
		if (this.state.backgroundUrl) {
			if (this.state.backgroundUrl === "white") {
				return "#ffffff";
			} else return `url(${this.state.backgroundUrl}) no-repeat center`;
		} else {
			return 'url("/img/welcomescreen-background.png") no-repeat center';
		}
	};
	onChangeSettings = (name, value) => {
		this.setState({ [name]: value });
	};

	saveProfile = (data) => {
		this.setState({ visible: data?.visible, searchable: data?.searchable });
		// data = Object.assign({}, data, this.state);

		console.log("saving profile ", data);
		UserServiceClient.updateUserProfile(data).then(() => {
			this.props.updateUserProfile(data);
			store.dispatch(unsavedForm(false));
			Toast({ type: "success", message: "Profile has been updated" });
			this.props.history.push("/app/home");
			// dispatch the action from here to show notification

			store.dispatch(
				addAppNotification("Profile has been updated", BANNER_TYPE_INFO)
			);
		});
	};

	toggleCPDialog = () => {
		this.setState({ showCPDialog: !this.state.showCPDialog });
	};

	profileScreenSetter = (type) => {
		this.setState({ profileScreenType: type });
	};

	changePassword = (currentPassword, newPassword) => {
		let typeOfApp = appType;
		let changePasswordObj = {};
		if (typeOfApp) {
			changePasswordObj = {
				oldPassword: currentPassword,
				newPassword: newPassword,
				appType: typeOfApp,
			};
		} else {
			changePasswordObj = {
				oldPassword: currentPassword,
				newPassword: newPassword,
			};
		}

		return AuthServiceClient.changePassword(changePasswordObj)
			.then((response) => {
				if (response.success) {
					Toast({ type: "success", message: "Password has been changed" });
					// dispatch the action from here to show notification
					store.dispatch(
						addAppNotification("Password has been changed", BANNER_TYPE_INFO)
					);
					this.setState({ showCPDialog: false });
				} else {
					if (
						response &&
						response.message === "Incorrect username or password."
					) {
						throw new Error("Current password is incorrect.");
					} else {
						throw new Error(
							response.message || "Change password failed. Please try again."
						);
					}
				}
			})
			.catch((error) => {
				console.log("error on change passowrd");
				if (error && error.message === "Incorrect username or password.") {
					throw new Error("Current password is incorrect.");
				} else {
					throw new Error(
						error.message || "Change password failed. Please try again."
					);
				}
			});
	};

	render() {
		const drawerWidth = 240;
		return (
			<div
				className="Contact-contentarea"
				style={{
					// background: "url('/img/welcomescreen-background.png')",
					backgroundSize: "cover",
					backgroundPosition: "center	",
					backgroundRepeat: "no-repeat",
					backgroundColor: "#f6f8fc",
				}}
			>
				<MySettings
					{...this.props}
					showCPDialog={this.state.showCPDialog}
					toggleCPDialog={this.toggleCPDialog}
					style={{ flex: 1.2 }}
					user={this.props.user}
					onChangeSettings={this.onChangeSettings}
					changePassword={this.changePassword}
					profileScreenSetter={this.profileScreenSetter}
					profileScreenType={this.state.profileScreenType}
				/>
				{this.state.profileScreenType === "profileDetailsView" ? (
					<ProfileDetailsView
						{...this.props}
						style={{ flex: 3 }}
						showCPDialog={this.state.showCPDialog}
						user={this.props.user}
						toggleCPDialog={this.toggleCPDialog}
						save={this.saveProfile}
						onChangeSettings={this.onChangeSettings}
						sendMsgForBanner={this.props.sendMsgForBanner}
					/>
				) : (
					<IgnoredContactsView {...this.props} style={{ flex: 3 }} />
				)}
			</div>
		);
	}
}

export default MyProfileView;
