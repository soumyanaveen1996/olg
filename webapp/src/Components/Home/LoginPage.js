import React, { PureComponent } from "react";
import HomeSlide5 from "./HomeSlide5";
import { getFromStorage, putInStorage } from "../../Services/StorageService";
import CookiePolicy from "../App/CookiePolicy";
class LoginPage extends PureComponent {
	acceptCookiePolicy = () => {
		putInStorage("cookiePolicyAccepted", true);
		this.setState({ cookiePolicyAccepted: true });
	};

	render() {
		let cookiePolicyAccepted = getFromStorage("cookiePolicyAccepted");

		return (
			<div
				className="d-flex flex"
				style={{ backgroundColor: "#fff", height: "100%" }}
			>
				<HomeSlide5 {...this.props} noNavigation />
				{!cookiePolicyAccepted && (
					<div
						style={{
							position: "fixed",
							bottom: 0,
							width: "100%",
						}}
					>
						<CookiePolicy acceptCookiePolicy={this.acceptCookiePolicy} />
					</div>
				)}
			</div>
		);
	}
}

export default LoginPage;
