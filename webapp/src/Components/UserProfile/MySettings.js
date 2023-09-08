import React, { Component } from "react";
import Switch from "../Common/Switch";
import Avatar from "../Common/Avatar";
import _ from "lodash";
import ModalPopup from "../ModalMessages/ModalPopup";
import ChangePassword from "./ChangePassword";
import AuthServiceClient from "./../../Services/Clients/AuthServiceClient";
import appType from "./../../Utils/ApiConfig";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link, NavLink, Route } from "react-router-dom";
import { setUserProfileImage } from "../../State/actions/user";
import AddIgnoredContacts from "./IgnoredContactsView";

class MySettings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mfaData: {
				appType: appType,
				password: "",
			},
		};
	}

	showChangePassword = () => {
		this.props.toggleCPDialog();
		this.setState({ cpDialog: true });
	};

	hideChangePassword = () => {
		this.props.toggleCPDialog();
		this.setState({ cpDialog: false });
	};

	render() {
		let chat;
		let { softwareMfaEnabled, softwareMfaStatus } = this.props.user;
		let { selectedDomain } = this.props;
		if (selectedDomain && !_.isEmpty(selectedDomain)) {
			let { viewModes } = selectedDomain;
			chat = viewModes.chat;
		}
		return (
			<div
				className="Catalog-sidebar sidebar-sm"
				id="sidebar-collapse"
				style={Object.assign(
					{ ...this.props.style },
					{ backgroundColor: "#fff" }
				)}
			>
				<div
					className="p-4"
					style={{
						display: "flex",
						height: "70px",
						backgroundColor: `${this.props.profileScreenType === "profileDetailsView"
							? "#f6f8fc"
							: "#fff"
							}`,
						marginBottom: "10px",
						paddingBottom: "10px",
						justifyContent: "space-between",
					}}
				>
					<Avatar
						color="bg-fm"
						imgSrc={this.props.profileImage}
						name={this.props.user.userName}
						size={32}
						height={32}
						style={{
							borderRadius: "50%",
							background: "#fff",
							// height: 160,
							// width: 160,
							display: "flex",
							backgroundColor: "#e5743b",
							textAlign: "center",
							justifyContent: "center",
							objectFit: "cover",
							marginBottom: "10px",
						}}
					/>

					<ArrowForwardIosIcon
						onClick={() => this.props.profileScreenSetter("profileDetailsView")}
						className="ArrowIcon"
					/>

					<div>
						{this.props.loginState && this.props.loginState === "frontm" && (
							<hr style={{ borderTop: "1px solid #DDDEE3" }} />
						)}
					</div>

					<div>
						<h4
							style={{
								marginLeft: "10px",
								fontSize: "18px",
								height: "20px",
								letterSpacing: "-0.46px",
								left: "50px",
								position: "absolute",
							}}
						>
							{this.props.user.userName}
						</h4>

						<span
							style={{
								display: "flex",
								fontSize: "12px",
								position: "absolute",
								marginTop: "20px",
								left: "18px",
								marginLeft: "43px",
								color: "#8D918D",
								height: "14px",
								fontSize: "10px",
								paddingTop: "5px",
							}}
							className="inputPlaceholderValue"
						>
							My Profile
						</span>
					</div>
				</div>

				{chat && (
					<>
						{/* Disabled as per request - CORE-2253 */}
						{/* <div className="px-4 py-2 d-flex justify-content-between">
							<div>Low Data Usage for Calls</div>
							<Switch
								variant={"pill"}
								color={"primary"}
								checked={this.props.low_bw_calls}
								onChange={() => {
									this.props.setCallQuality({
										low_bw_calls: !this.props.low_bw_calls,
									});

									this.props.onChangeSettings(
										"lowBandwidthCalls",
										!this.props.low_bw_calls
									);
								}}
							/>
						</div>

						<div>
							<hr style={{ borderTop: "1px solid #DDDEE3" }} />
						</div> */}
						<div className="d-flex justify-content-between align-items-center">
							<div className="my-2 mx-4">Two-factor authentication</div>

							<Switch
								className="mx-3 mt-2"
								variant={"pill"}
								color={"primary"}
								checked={softwareMfaEnabled}
								onChange={() => {
									if (!softwareMfaEnabled) {
										this.props.updateSoftwareMfaEnabled(true);
										this.props.updateSoftwareMfaStatus("initiate");
									} else {
										console.log("deactivate");
										this.props.updateSoftwareMfaEnabled(false);
										this.props.updateSoftwareMfaStatus("deactivateMfa");
									}
								}}
							/>
						</div>
					</>
				)}

				<div>
					{this.props.loginState && this.props.loginState === "frontm" && (
						<hr
							style={{ borderTop: "1px solid #DDDEE3", marginBottom: "0px" }}
						/>
					)}
				</div>

				{/* add ignored contacts screen opener*/}
				<div
					style={{
						backgroundColor: `${this.props.profileScreenType !== "profileDetailsView"
							? "#f6f8fc"
							: "#fff"
							}`,
					}}
					className="d-flex py-2 justify-content-between align-items-center"
				>
					<div className="my-2 mx-4">Ignored Contacts</div>

					<ArrowForwardIosIcon
						onClick={() => this.props.profileScreenSetter("ignoreContactsView")}
						className="ArrowIcon"
					/>
				</div>

				<div>
					{this.props.loginState && this.props.loginState === "frontm" && (
						<hr style={{ borderTop: "1px solid #DDDEE3", marginTop: "0px" }} />
					)}
				</div>

				{this.props.loginState && this.props.loginState === "frontm" && (
					<div className="px-4 py-2 d-flex justify-content-between">
						<a className="primary-link" onClick={this.showChangePassword}>
							Change Password
						</a>
					</div>
				)}

				{this.state.cpDialog && this.props.showCPDialog && (
					<ModalPopup
						onClose={this.hideChangePassword}
						size="sm"
						title="Change Password"
					>
						<div className="p-2">
							<ChangePassword
								changePassword={this.props.changePassword}
								logout={this.props.logout}
							/>
						</div>
					</ModalPopup>
				)}
			</div>
		);
	}
}

export default MySettings;
