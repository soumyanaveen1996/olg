import React, { Component } from "react";
import { connect } from "react-redux";
import Home from "../Components/Home/Home";
import { hydrateUserData } from "../State/actions/user";
import { getFromStorage, putInStorage } from "../Services/StorageService";
import { ONELEARN_LANDING } from "../Utils/Constants";

class HomeContainer extends Component {
	constructor(props) {
		super(props);
		props.history.push(ONELEARN_LANDING);
	}
	acceptCookiePolicy = () => {
		putInStorage("cookiePolicyAccepted", true);
		this.setState({ cookiePolicyAccepted: true });
	};

	render() {
		let cookiePolicyAccepted = getFromStorage("cookiePolicyAccepted");
		return (
			<Home
				{...this.props}
				cookiePolicyAccepted={cookiePolicyAccepted}
				acceptCookiePolicy={this.acceptCookiePolicy}
			/>
		);
	}
}

const mapActionToProps = {
	hydrateUserData: hydrateUserData,
};

const mapDataToProps = (state) => {
	return {
		user: state.user.user,
	};
};

export default connect(mapDataToProps, mapActionToProps)(HomeContainer);
