import React, { PureComponent } from "react";
import CallButton from "../Telephony/CallButton";

class ContactPhoneNumbersMenu extends PureComponent {
	render() {
		let { contact, popOver } = this.props;

		console.log("see the contact ", this.props);

		let phoneNumbers = [];
		if (contact.phoneNumbers) {
			phoneNumbers = Object.keys(contact.phoneNumbers).map((key) => {
				return { key, value: contact.phoneNumbers[key] };
			});
		}

		return (
			<div>
				{!popOver && (
					<hr
						style={{
							borderTop: "1px solid #DDDEE3",
							marginTop: "0rem",
							marginBottom: "0.5rem",
						}}
					/>
				)}
				{!contact.contactType && !contact.type && (
					<div>
						<div className="d-flex align-items-center justify-content-between">
							<div
								style={{
									color: "#9B9B9B",
									textTransform: "capitalize",
									fontSize: "0.85rem",
								}}
							>
								FrontM
							</div>
							<div
								className="text-left"
								style={{ color: "#2FC76F", fontSize: "0.85rem" }}
							>
								*Free
							</div>

							<CallButton
								callType="voip"
								from={this.props.emailAddress}
								to={contact.userId}
								toName={contact.userName}
								closeCallHistory={() => {
									console.log("close call history");
								}}
								className="btn btn-success btn-icon-o btn-sm mx-1 btn-rounded d-flex justify-content-center align-items-center"
								style={{ height: "20px", width: "20px" }}
							>
								<i
									className="icon-phone-outgoing"
									style={{ color: "#fff", fontSize: "12px" }}
								/>
							</CallButton>
						</div>
						<hr
							style={{
								borderTop: "1px solid #DDDEE3",
								marginTop: "0.5rem",
								marginBottom: "0.5rem",
							}}
						/>
					</div>
				)}

				{phoneNumbers.length >= 1 &&
					phoneNumbers.map((phone, index) => {
						return (
							<div key={index}>
								<div className="d-flex align-items-center justify-content-between">
									<div
										style={{
											color: "#9B9B9B",
											textTransform: "capitalize",
											fontSize: "0.85rem",
										}}
									>
										{phone.key}
									</div>
									<div
										className="text-left"
										style={{ color: "#666666", fontSize: "0.85rem" }}
									>
										{phone.value}
									</div>

									<CallButton
										callType={phone.key === "satellite" ? "sat" : "phone"}
										from={this.props.emailAddress}
										to={phone.value}
										toUserId={contact.userId}
										localCall="local"
										className="btn btn-success btn-icon-o btn-sm mx-1 btn-rounded d-flex justify-content-center align-items-center"
										style={{ height: "20px", width: "20px" }}
									>
										<i
											className="icon-phone-outgoing"
											style={{ color: "#fff", fontSize: "12px" }}
										/>
									</CallButton>
								</div>
								<hr
									style={{
										borderTop: "1px solid #DDDEE3",
										marginTop: "0.5rem",
										marginBottom: "0.5rem",
									}}
								/>
							</div>
						);
					})}
			</div>
		);
	}
}

export default ContactPhoneNumbersMenu;
