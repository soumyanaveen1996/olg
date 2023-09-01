import React from "react";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import CallButton from "../Telephony/CallButton";
import { createConversation } from "../../State/actions/chats";
import { connect } from "react-redux";
import history from "./../../Services/History";

class ContactMoreMenu extends React.PureComponent {
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

	editContact = () => {
		// console.log("edit contact");
		this.setState({
			dropdownOpen: !this.state.dropdownOpen,
		});
		this.props.openEditScreen();
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

				<DropdownMenu className="conversation-dd-menu-contact">
					<div className="d-flex">
						<a
							style={{
								width: "100%",
								padding: "10px",
							}}
							onClick={this.editContact}
						>
							<i
								className="fa fa-edit"
								style={{
									color: "#666666",
									fontWeight: "bold",
									fontSize: "14px",
									padding: "5px",
									transform: "scaleY(1)",
								}}
							/>
							<span style={{ fontSize: "14px" }}>Edit</span>
						</a>
					</div>
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

export default connect(mapDataToProps, mapActionToProps)(ContactMoreMenu);
