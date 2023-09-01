import React from "react";
import PropTypes from "prop-types";

import AcceptIgnoreButtonRenderer from "./AcceptIgnoreButtonRenderer";

class AcceptIgnoreUser extends React.Component {
	render() {
		const user = this.props.contact;
		const view = user.showAcceptIgnoreMsg ? (
			<AcceptIgnoreButtonRenderer
				userName={user.userName}
				userId={user.userId}
				accept={this.props.accept}
				ignore={this.props.ignore}
			/>
		) : null;

		return view;
	}
}

AcceptIgnoreUser.propTypes = {
	contact: PropTypes.object.isRequired,
	showAcceptIgnoreMsg: PropTypes.bool.isRequired,
};

export default AcceptIgnoreUser;
