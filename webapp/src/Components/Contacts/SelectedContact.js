import React from "react";
import ContactUI from "../Contacts/ContactUI";
import { Input } from "reactstrap";
// import { relative } from "path";

class SelectedContact extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	CcomponentDidMount() {
		let { contact, requestSent, spinner, index } = this.props;
		this.setState({ contact, requestSent, spinner, index });
	}

	renderStatus = () => {
		let { contact, requestSent, spinner, sending, index } = this.props;
		if (!requestSent && !spinner) {
			return (
				<a onClick={() => this.props.sendTheRequest(contact.userId, index)}>
					<span style={{ color: "#638dff", fontSize: "14px" }}>
						Send Request
					</span>
				</a>
			);
		}

		if (spinner && sending) {
			return (
				<img
					loading="lazy"
					width="25px"
					style={{ position: "absolute", right: "30px" }}
					src="/offlinelms/img/tx-loading.gif"
					alt="spinner"
				/>
			);
		}
		if (requestSent && !spinner) {
			return (
				<span style={{ color: "#9B9B9B", fontSize: "14px" }}>Request Sent</span>
			);
		}
	};
	render() {
		let { contact } = this.props;

		return (
			<div
				className="d-flex justify-content-between align-items-center"
				style={{ position: "relative" }}
			>
				<ContactUI
					name={contact.userName}
					userId={contact.userId}
					companyName={contact.userCompanyName}
					city={contact.address && contact.address.city}
					email={contact.emailAddress}
					allProfileImages={this.props.allProfileImages}
				/>
				{this.renderStatus()}
			</div>
		);
	}
}

export default SelectedContact;
