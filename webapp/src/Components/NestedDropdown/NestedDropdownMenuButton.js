import React, { Component } from "react";
import { connect } from "react-redux";
import NestedDropdown from "./NestedDropdown";
import { sendAMessage } from "../../State/actions/chats";
import { MessageTypeConstants } from "../../Services/Message";

class NestedDropdownMenuButton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mainMenuToggle: false,
		};
	}

	componentDidMount() {
		let This = this; // this is not accessable in eventlisterner
		window.addEventListener("click", function (e) {
			if (
				!document
					?.getElementsByClassName("nestedDropDown")[0]
					?.contains(e.target) &&
				This.state.mainMenuToggle
			) {
				This.closeMenu();
			}
		});
	}

	openMenu = () => {
		this.setState({ mainMenuToggle: !this.state.mainMenuToggle });
	};

	closeMenu = () => {
		this.setState({ mainMenuToggle: false });
	};

	sendMenuMessage = (e, menuItem, controlOptions) => {
		e.preventDefault();

		let responseChat = {};
		responseChat.messageType = MessageTypeConstants.MESSAGE_TYPE_MENU_RESPONSE;
		responseChat.message = {
			controlId: controlOptions.controlId,
			selectedEntry: menuItem.id,
		};
		// console.log("menu message ", responseChat);
		this.props.sendAMessage(responseChat, true);
		this.closeMenu();
	};

	render() {
		// console.log("menu message ", this.props.menuMessage);

		return (
			<div className="nestedDropDown">
				{!this.state.mainMenuToggle ? (
					<div className="menu-circle-bg" onClick={this.openMenu}>
						<img src="/img/map-menu-icon@2x.png" alt="menu-bg" />
					</div>
				) : (
					<div className="menu-circle-bg-open" onClick={this.openMenu}>
						<img src="/img/map-menu-close-icon@2x.png" alt="menu-close-bg" />
					</div>
				)}

				{this.state.mainMenuToggle && (
					<NestedDropdown
						depthLevel={0}
						controlOptions={this.props.menuMessage.options}
						config={this.props.menuMessage.menuEntries}
						sendMenuMessage={this.sendMenuMessage}
					/>
				)}
			</div>
		);
	}
}

const mapActionsToProps = {
	sendAMessage: sendAMessage,
};

export default connect(null, mapActionsToProps)(NestedDropdownMenuButton);
