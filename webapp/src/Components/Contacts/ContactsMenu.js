import React from "react";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import CallButton from "../Telephony/CallButton";
import { createConversation } from "../../State/actions/chats";
import { connect } from "react-redux";
import history from "./../../Services/History";

class ContactsMenu extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			dropdownOpen: false,
		};
	}

	toggle = (e) => {
		e.preventDefault();
		e.stopPropagation();
		this.setState({
			dropdownOpen: !this.state.dropdownOpen,
		});
	};

	startConversation = () => {
		const { createConversation, contact, userId } = this.props;
		createConversation(contact, userId);
		history.push("/app/chats");
		this.setState({
			dropdownOpen: !this.state.dropdownOpen,
		});

		this.props.closeTheMainModel();
	};

	render() {
		let { contact } = this.props;
		// console.log("all contacts data ", this.props);

		if (!contact) {
			return null;
		}

		return (
			<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
				<DropdownToggle
					tag="span"
					onClick={this.toggle}
					data-toggle="dropdown"
					aria-expanded={this.state.dropdownOpen}
				>
					<i
						className="fa fa-ellipsis-v ml-4"
						style={{
							color: "#666666",
							fontWeight: "bold",
							fontSize: "14px",
							float: "right",
							padding: "5px",
							transform: "scaleY(1)",
							pointer: "cursor",
						}}
					/>
				</DropdownToggle>

				<DropdownMenu className="conversation-dd-menu">
					{contact && !contact.type && !contact.contactType && (
						<div className="d-flex m-2 mb-3">
							<a
								onClick={this.startConversation}
								className="btn btn-open btn-icon-o btn-sm mr-2 btn-rounded d-flex justify-content-center align-items-center"
								style={{ height: "10px", width: "10px", color: "#fff" }}
							>
								<i className="icon-bubble" style={{ fontSize: "10px" }} />
							</a>
							<span style={{ fontSize: "14px" }}>Chat</span>
						</div>
					)}

					{!contact.waitingForConfirmation && (
						<div className="d-flex m-2  mb-3">
							<CallButton
								callType="voip"
								from={this.props.emailAddress}
								to={contact.userId}
								toName={contact.userName}
								closeCallHistory={() => {
									console.log("close call history");
								}}
								className="btn btn-success btn-icon-o btn-sm mr-2 btn-rounded d-flex justify-content-center align-items-center"
								style={{ height: "10px", width: "10px" }}
							>
								<i
									className="icon-phone-outgoing"
									style={{ color: "#fff", fontSize: "10px" }}
								/>{" "}
							</CallButton>
							<span style={{ fontSize: "14px" }}>Call</span>
						</div>
					)}
				</DropdownMenu>
			</Dropdown>
		);
	}
}

const mapActionToProps = {
	createConversation: createConversation,
};

const mapDataToProps = (state, props) => {
	return {
		userId: state.user.user.userId,
		emailAddress: state.user.user.emailAddress,
	};
};

export default connect(mapDataToProps, mapActionToProps)(ContactsMenu);
