import React, { Component } from "react";
import ErrorMessage from "../Common/ErrorMessage";

class EmailInvitation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			showEmailError: false,
			loadPage: true,
		};
	}

	changeEmail = (e) => {
		this.setState({ email: e.target.value });
	};
	sendInvite = () => {
		let emails = [];
		let check = this.checkEmail(this.state.email);
		this.setState({ showEmailError: false });
		if (!check) {
			this.setState({ showEmailError: true });
		} else {
			emails.push(this.state.email);
			this.props.inviteMembers(emails);
		}
	};

	checkEmail = (str) => {
		var re =
			/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!re.test(str)) {
			return false;
		}

		return true;
	};

	render() {
		return (
			<React.Fragment>
				<div className="p-2">
					<div className="d-flex flex-column align-items-center p-4 emailInvite-div">
						<input
							id="email-invite"
							placeholder="email@example.com"
							type="email"
							onChange={this.changeEmail}
							className="form-control form-control-lg form-input-box-300 mb-4"
						/>
						{this.state.showEmailError && (
							<div className="err-msg-email">
								<ErrorMessage message={"Please enter a valid email address"} />
							</div>
						)}
						<a
							onClick={this.sendInvite}
							style={{ width: "300px", height: "30px" }}
							className="btn btn-sm btn-open"
							disabled={this.state.email.length <= 0}
						>
							Send invite
						</a>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default EmailInvitation;
