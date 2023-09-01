import React, { Component } from "react";
import { connect } from "react-redux";
import { showModal } from "./../../State/actions/modal";

class LinkToPopUp extends Component {
	showModal = () => {
		const { dispatch } = this.props;
		dispatch(
			showModal(
				this.props.modalType,
				this.props.modalProps,
				this.props.modalSize,
				this.props.modalTitle
			)
		);
	};

	render() {
		let className = this.props.className || "btn-link";
		return (
			<a
				onClick={this.showModal}
				className={className}
				style={this.props.style}
				disabled={this.props.disable}
			>
				{this.props.children}
			</a>
		);
	}
}

export default connect()(LinkToPopUp);
