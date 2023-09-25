import React, { Component } from "react";
import dayjs from "dayjs";
import {
	hydrateUserData,
	doAnonymousAuth,
	refreshAnonymousUserSession,
} from "../../State/actions/user";
import { connect } from "react-redux";
import {
	getAuthData,
	getLinkData,
	removeAuthData,
	removeLinkData,
	removeSelectedConversation,
	storeLinkData,
} from "../../Services/StorageService";
import { populateLinkData } from "../../State/actions/chats";
import Toast from "../ModalMessages/Toast";
import _ from "lodash";
const TWO_WEEK = 60 * 60 * 24 * 14;
const ONE_HOUR = 60 * 60;
class LinkableMessage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
		};
	}
	componentDidMount() {
		let { location } = this.props;
		let path = location.pathname;
		// Logged In user flow and url contains either b or c
		if (path && (path.indexOf("/b/") !== -1 || path.indexOf("/c/") !== -1)) {
			this.loggedInUserFlow();
		} else {
			// Anonymous user flow . url doesn't contain either b or c
			console.log("anonymousUserFlow");
			this.anonymousUserFlow();
		}
	}

	loggedInUserFlow = () => {
		if (this.props.user && !this.props.user.isAnonymousUser) {
			this.processLoggedInUserLink();
			return;
		}

		let storedUser = getAuthData();
		if (storedUser && !storedUser.isAnonymousUser) {
			hydrateUserData(storedUser);
			this.processLoggedInUserLink();
		} else if (storedUser && storedUser.isAnonymousUser) {
			Toast({
				type: "error",
				message: "Access denied to URL",
				autoClose: 4000,
			});
			this.setState({ isLoading: false })
			return;
		} else {
			this.props.history.push(
				"/login?redirect=" + this.props.location.pathname
			);
			this.setState({ isLoading: false })
		}
	};

	anonymousUserFlow = () => {
		let { match } = this.props;
		let params = match.params;
		this.processAnonymousUserCreation(params.type, params.botId);
	};

	processAnonymousUserCreation = (type, botId) => {
		removeAuthData();
		removeSelectedConversation();
		removeLinkData();
		this.props.doAnonymousAuth(type, botId, (error, data) => {
			if (!error) {
				this.processAnonymousUserLink();
			} else {
				console.log("ERROR doAnonymousAuth callback ");
			}
		});
	};

	processLoggedInUserLink = () => {
		let { populateLinkData, location, match, history } = this.props;
		let path = location.pathname;
		let params = match.params;
		if (path && path.indexOf("/s/") !== -1) {
			populateLinkData(params.type, params.botId, params.message, "send");
		} else if (path && path.indexOf("/r/") !== -1) {
			populateLinkData(params.type, params.botId, params.message, "read");
		} else {
			populateLinkData(params.type, params.botId);
		}
		history.push("/app/chats");
		this.setState({ isLoading: false })
	};

	processAnonymousUserLink = () => {
		let { populateLinkData, match, history, location } = this.props;
		let params = match.params;
		let paramArguments;

		storeLinkData({ type: params.type, botId: params.botId });
		populateLinkData(params.type, params.botId);

		if (location.search) {
			let queryString = location.search.slice(1).split("&");
			let result = {};
			queryString.forEach((pair) => {
				pair = pair.split("=");
				result[pair[0]] = decodeURIComponent(pair[1] || "");
			});
			paramArguments = JSON.parse(JSON.stringify(result));

			// sendMessageByUrlParam()
		}
		history.push({
			pathname: "/app/chats",
			state: {
				paramArgs: paramArguments,
			},
		});
		this.setState({ isLoading: false })
	};

	hasLinkChanged = (storedLinkData) => {
		if (_.isEmpty(storedLinkData)) {
			return false;
		}
		let { match } = this.props;
		let params = match.params;
		if (_.isEmpty(params)) {
			return false;
		}
		let { type, botId } = storedLinkData;
		if (type !== params.type || botId !== params.botId) {
			return true;
		}
		return false;
	};
	render() {
		if (this.state.isLoading) {
			return <img style={{ position: "fixed", left: "45%", top: "45%", width: "5%" }} src="/offlinelms/img/loft-loading.gif" alt="Loading..." />;
		}
		return null;
	}
}

const mapActionsToProps = {
	hydrateUserData: hydrateUserData,
	populateLinkData: populateLinkData,
	doAnonymousAuth: doAnonymousAuth,
	refreshAnonymousUserSession: refreshAnonymousUserSession,
};

const mapDataToProps = (state) => {
	return {
		user: (state.user && state.user.user) || null,
	};
};
export default connect(mapDataToProps, mapActionsToProps)(LinkableMessage);
