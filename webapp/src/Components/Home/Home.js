import React, { Component } from "react";
import HomeCarousel from "./HomeCarousel";
import { getAuthData } from "../../Services/StorageService";
import CookiePolicy from "../App/CookiePolicy";
import {
	ONSHIP_PROD_URL,
	ONSHIP_LANDING,
	VIKAND_PROD_URL,
	VIKAND_HEALTH_PROD_URL,
	THURAYA_T2M_LANDING,
	THURAYA_T2M_PROD_URL,
	VIKAND_DIRECT_LANDING,
	STATION_SATCOM_LANDING,
	STATIONSATCOM_PROD_URL,
	ONECARE_PROD_URL,
	ONECARE_LANDING,
	SIGMA_LANDING,
	SIGMA_PROD_URL,
	ONECARE_PROD_URL_NEW,
	VIKAND_CONNECT_PROD_URL,
} from "../../Utils/Constants";

class Home extends Component {
	componentDidMount() {
		let { hydrateUserData, user } = this.props;
		if (!user) {
			let storedUser = getAuthData();
			if (storedUser) {
				hydrateUserData(storedUser);
				this.props.history.push("/app/home");
			}
			if (
				[
					VIKAND_PROD_URL,
					VIKAND_HEALTH_PROD_URL,
					VIKAND_CONNECT_PROD_URL,
					"stage2.frontm.com",
				].includes(window.location.hostname) &&
				window.location.pathname !== VIKAND_DIRECT_LANDING
			) {
				window.location.href = `${window.location.origin}${VIKAND_DIRECT_LANDING}`;
			} else if (
				[THURAYA_T2M_PROD_URL, "stage3.frontm.com"].includes(
					window.location.hostname
				)
			) {
				window.location.href = `${window.location.origin}${THURAYA_T2M_LANDING}`;
			} else if ([ONSHIP_PROD_URL].includes(window.location.hostname)) {
				window.location.href = `${window.location.origin}${ONSHIP_LANDING}`;
			} else if (
				["stage6.frontm.com", STATIONSATCOM_PROD_URL].includes(
					window.location.hostname
				)
			) {
				window.location.href = `${window.location.origin}${STATION_SATCOM_LANDING}`;
			} else if ([SIGMA_PROD_URL].includes(window.location.hostname)) {
				window.location.href = `${window.location.origin}${SIGMA_LANDING}`;
			} else if (
				["stage5.frontm.com", ONECARE_PROD_URL, ONECARE_PROD_URL_NEW].includes(
					window.location.hostname
				)
			) {
				window.location.href = `${window.location.origin}${ONECARE_LANDING}`;
			}
		} else {
			if (
				[
					VIKAND_PROD_URL,
					VIKAND_CONNECT_PROD_URL,
					VIKAND_HEALTH_PROD_URL,
					"stage2.frontm.com",
				].includes(window.location.hostname) &&
				window.location.pathname !== VIKAND_DIRECT_LANDING
			) {
				window.location.href = `${window.location.origin}${VIKAND_DIRECT_LANDING}`;
			} else if (
				[THURAYA_T2M_PROD_URL, "stage3.frontm.com"].includes(
					window.location.hostname
				)
			) {
				window.location.href = `${window.location.origin}${THURAYA_T2M_LANDING}`;
			} else if ([ONSHIP_PROD_URL].includes(window.location.hostname)) {
				window.location.href = `${window.location.origin}${ONSHIP_LANDING}`;
			} else if ([SIGMA_PROD_URL].includes(window.location.hostname)) {
				window.location.href = `${window.location.origin}${SIGMA_LANDING}`;
			} else if (
				["stage6.frontm.com", STATIONSATCOM_PROD_URL].includes(
					window.location.hostname
				)
			) {
				window.location.href = `${window.location.origin}${STATION_SATCOM_LANDING}`;
			} else if (
				[ONECARE_PROD_URL, ONECARE_PROD_URL_NEW].includes(
					window.location.hostname
				)
			) {
				window.location.href = `${window.location.origin}${ONECARE_LANDING}`;
			}
		}
	}
	render() {
		return (
			<React.Fragment>
				<HomeCarousel history={this.props.history} />
				{!this.props.cookiePolicyAccepted && (
					<div
						style={{
							position: "fixed",
							bottom: 0,
							width: "100%",
						}}
					>
						<CookiePolicy acceptCookiePolicy={this.props.acceptCookiePolicy} />
					</div>
				)}
			</React.Fragment>
		);
	}
}

export default Home;
