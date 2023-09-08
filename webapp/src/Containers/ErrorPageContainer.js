import React from "react";
import { connect } from "react-redux";
import Error404 from "../Components/ErrorPages/Error404";
import SessionExpiredModal from "../Components/ErrorPages/SessionExpiredModal";
import { logout } from "../State/actions/user";
class ErrorPageContainer extends React.Component {
	render() {
		if (this.props.show404Error) return <Error404 />
		if (this.props.sessionExpired) return <SessionExpiredModal {...this.props} />
		return null;
	}
}

const mapActionsToProps = {
	logout,
};

const mapDataToProps = (state) => {
	return {
		show404Error: state.user && state.user.show404Error,
		sessionExpired: state.user?.sessionExpired,
	};
};
export default connect(mapDataToProps, mapActionsToProps)(ErrorPageContainer);
