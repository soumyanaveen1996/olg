import React, { Component } from "react";
import Avatar from "../Common/Avatar";
import ContactPhoneNumbersMenu from "./ContactPhoneNumbersMenu";

class ContactForCall extends Component {
	state = { dropdownOpen: false };

	toggleMenu = () => {
		this.setState({ dropdownOpen: !this.state.dropdownOpen });
	};

	render() {
		let { contact } = this.props;
		return (
			<div>
				<div className="d-flex px-3 py-2  align-items-center justify-content-between">
					<div className="d-flex align-items-center">
						<Avatar
							style={{ borderRadius: "50%" }}
							color="bg-fm-primary"
							name={contact.name ? contact.name : contact.userName}
							size={40}
							height={40}
						/>
						<div className="ml-3 d-flex flex-column">
							<span
								className="list-title"
								style={{ color: "#666666", fontWeight: "bold" }}
							>
								{contact.name ? contact.name : contact.userName}
								{contact.type && (
									<span
										className="list-title"
										style={{ color: "#666666", fontWeight: "bold" }}
									>
										{" "}
										(Vessel)
									</span>
								)}
							</span>
							<span className="list-content" style={{ color: "#666666" }}>
								{contact.emailAddress}
							</span>
						</div>
					</div>

					<a onClick={this.toggleMenu}>
						<i
							className={
								this.state.dropdownOpen
									? "icon-chevron-up"
									: "icon-chevron-down"
							}
							style={{
								color: "#666666",
								fontWeight: "bold",
								fontSize: "10px",
								float: "right",
								padding: "5px",
								transform: "scaleY(1)",
								pointer: "cursor",
							}}
						/>
					</a>
				</div>
				{this.state.dropdownOpen && !contact.waitingForConfirmation && (
					<div className="px-4 py-2">
						<ContactPhoneNumbersMenu contact={contact} />
					</div>
				)}
			</div>
		);
	}
}

export default ContactForCall;
