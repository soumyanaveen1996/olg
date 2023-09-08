import React, { Component } from "react";
import UserInfo from "./UserInfo";
import StickeyHeader from "../../StickeyHeader/stickeyHeader";
import OfflineSwitch from "../../OfflineSwitch/OfflineSwitch";

class ErrorHeader extends Component {
	render() {
		let { userName, logout, notification, isAnonymousUser } = this.props;
		const comp = !isAnonymousUser ? (
			<React.Fragment>
				<div
					className={
						"d-flex align-items-center justify-content-between bg-white"
					}
					style={{ height: "100%", flex: 1.5 }}
				>
					<div>
						<h5 style={{ padding: "0.5rem", marginBottom: "0px" }} />
					</div>
				</div>
				<div
					className={"d-flex align-items-center justify-content-end"}
					style={{
						backgroundColor: "#ffffff",
						height: "100%",
						flex: 2.5,
						marginRight: "22px",
					}}
				>
					<StickeyHeader openRecharge={this.props.openRecharge} />
				</div>
				<OfflineSwitch />
				<div
					className={"d-flex align-items-center justify-content-end"}
					style={{ backgroundColor: "#ffffff", height: "100%" }}
				>
					<div>
						<UserInfo
							userId={this.props.user.userId}
							userName={userName}
							logout={logout}
							notification={notification}
						/>
					</div>
				</div>
			</React.Fragment>
		) : null;
		return comp;
	}
}

export default ErrorHeader;
