import React from "react";
import { Route, Redirect } from "react-router-dom";
import _ from "lodash";
import { getAuthData } from "../Services/StorageService";
import { logout } from "../State/actions/user";
import { connect } from "react-redux";
import {
	STATION_SATCOM_LANDING,
	THURAYA_LANDING,
	VOYAGER_LANDING,
	VIKAND_LANDING,
	INTELL4DESK_LANDING,
	LANDING_PATH_LIST,
	CUSTOM_LANDING_PATH_LIST,
	VIKAND_DIRECT_LANDING,
	ONECARE_LANDING,
	VIKAND_CONNECT_PROD_URL,
	ONECARE_PROD_URL,
	ONECARE_PROD_URL_NEW,
	VIKAND_HEALTH_PROD_URL,
	THURAYA_T2M_PROD_URL,
	THURAYA_T2M_SIGNUP_LANDING,
	ONSHIP_PROD_URL,
	ONSHIP_SIGNUP_LANDING,
	ONSHIP_LANDING,
	SIGMA_PROD_URL,
	SIGMA_LANDING,
	STATIONSATCOM_PROD_URL,
	VIKAND_PROD_URL,
	ONELEARN_LANDING,
	ONELEARN_LANDING_2,
} from "../Utils/Constants";
import Error404 from "./ErrorPages/Error404";

const NON_PROTECTED_PATH = [
	...LANDING_PATH_LIST,
	"/resetPassword",
	"/sendcode",
	"/resetConfirmPassword",
	"/verify",
];

const getDestinationPath = (props) => {
	if (!props) {
		return "/login";
	}
	if (
		props.path === THURAYA_LANDING ||
		props.path === VOYAGER_LANDING ||
		props.path === VIKAND_LANDING ||
		props.path === VIKAND_DIRECT_LANDING ||
		props.path === INTELL4DESK_LANDING ||
		props.path === STATION_SATCOM_LANDING
	) {
		return props.path;
	}
	return "/login";
};

const getCurrentDomainPaths = (currentHostName, customLandingPathList) => {
	switch (currentHostName) {
		case ONECARE_PROD_URL_NEW:
		case ONECARE_PROD_URL:
		case "stage5.frontm.com":
			return [ONECARE_LANDING];

		case VIKAND_PROD_URL:
		case VIKAND_HEALTH_PROD_URL:
		case VIKAND_CONNECT_PROD_URL:
		case "stage2.frontm.com":
			return [VIKAND_LANDING, VIKAND_DIRECT_LANDING];

		case THURAYA_T2M_PROD_URL:
		case "stage3.frontm.com":
			return [THURAYA_T2M_SIGNUP_LANDING];

		case ONSHIP_PROD_URL:
		case "stage.frontm.com":
			return [ONSHIP_LANDING, ONSHIP_SIGNUP_LANDING];

		case STATIONSATCOM_PROD_URL:
		case "stage6.frontm.com":
			return [STATION_SATCOM_LANDING];

		case SIGMA_PROD_URL:
			return [SIGMA_LANDING];

		default:
			return [ONELEARN_LANDING, ONELEARN_LANDING_2];
	};
};

const getForeignDomainPaths = (currentHostName, customLandingPathList) => {
	let currentDomainPaths = getCurrentDomainPaths(currentHostName, customLandingPathList);

	let foreignDomainPaths = customLandingPathList.filter(path => !currentDomainPaths.includes(path));

	return foreignDomainPaths;
};

const ProtectedRoute = ({ component: Component, ...rest }) => {
	if (isValidURL(rest)) {
		let currentHostName = window.location.hostname;
		const foreignDomainPaths = getForeignDomainPaths(currentHostName, CUSTOM_LANDING_PATH_LIST);

		// Check if current path is a foreign domain path
		if (foreignDomainPaths.includes(rest.path)) {
			return <Error404 />;
		}

		if (NON_PROTECTED_PATH.includes(rest.path)) {
			const authData = getAuthData();
			if (!_.isEmpty(authData)) {
				return <Redirect to="/offlinelms/app/home" />;
			}
		}
		return <Route render={() => <Component {...rest} />} {...rest} />;
	} else {
		const destinationPath = getDestinationPath(rest);
		return <Redirect from={rest.path} to={destinationPath} />;
	}
};

const isValidURL = (props) => {
	const authData = getAuthData();
	let isAnonymousUser = !_.isEmpty(authData) ? authData.isAnonymousUser : false;
	if (!isAnonymousUser) {
		return true;
	}
	props.logout();
	return false;
};

const mapActionToProps = {
	logout,
};
export default connect(null, mapActionToProps)(ProtectedRoute);
