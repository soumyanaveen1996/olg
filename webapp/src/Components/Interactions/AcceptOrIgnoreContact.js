import React, { Component, PureComponent } from "react";
import { connect } from "react-redux";
import {
	clearAcceptIgnoreButtons,
	sendAMessage,
	getTimeLine,
	changeSelectedConversation,
} from "../../State/actions/chats";
import { MessageTypeConstants } from "../../Services/Message";
import {
	fetchContacts,
	clearAcceptIgnoreContact,
	removeContactStatus,
	removeSelectedContact,
} from "../../State/actions/contacts";
import store from "../../State/configureStore";
import { acceptContacts, ignoreContacts } from "../../Services/ContactsService";
import { NotifyClassComp } from "../ModalMessages/ToastNotif";

class AcceptOrIgnoreContact extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}

	// componentDidMount() {
	// 	console.log("ADITYA200 checking this.props didmount", this.props);
	// }

	// componentDidUpdate(prevProps) {
	// 	console.log("ADITYA200 checking prevProps", prevProps);
	// 	console.log("ADITYA200 checking this.props", this.props);
	// }

	accept = () => {
		this.sendActions("AcceptContact", "Accept");
	};

	ignore = () => {
		this.sendActions("IgnoreContact", "Ignore");
	};

	sendActions = (action, title) => {
		let { clearAcceptIgnoreButtons, clearAcceptIgnoreContact, fetchContacts } =
			this.props;

		this.setState({ isDelivered: true });

		let responseChat = {};
		responseChat.message = {
			action,
			title,
			user: this.getDataMessage(),
		};
		responseChat.messageType =
			MessageTypeConstants.MESSAGE_TYPE_BUTTON_RESPONSE;
		let user = responseChat.message.user;
		if (action === "AcceptContact") {
			acceptContacts([user.userId])
				.then(() => {
					setTimeout(() => {
						clearAcceptIgnoreButtons();
						clearAcceptIgnoreContact();
						fetchContacts(
							{
								selectedDomain: this.props.selectedDomain.userDomain,
							},
							true
						);
						this.props.getTimeLine();
					}, 2000);
					NotifyClassComp({
						type: "success",
						message: `Contact ${user.userName} is accepted`,
					});
				})
				.catch(() => {
					NotifyClassComp({
						type: "error",
						message: `Error while accepting the contact ${user.userName}. Please try again later.`,
					});
				});
		} else {
			ignoreContacts([user.userId])
				.then(() => {
					setTimeout(() => {
						fetchContacts(
							{
								selectedDomain: this.props.selectedDomain.userDomain,
							},
							true
						);
						store.dispatch(removeContactStatus(true));
						this.props.removeSelectedContact();
						clearAcceptIgnoreButtons();
						clearAcceptIgnoreContact();
						this.props.changeSelectedConversation(null, false);
						this.props.getTimeLine();
						this.props.history && this.props.history.replace("/app/contacts");
					}, 1000);
					NotifyClassComp({
						type: "success",
						message: `Contact ${user.userName} is ignored`,
					});
				})
				.catch(() => {
					NotifyClassComp({
						type: "error",
						message: `Error while ignoring the contact ${user.userName}. Please try again later.`,
					});
				});
		}
	};

	getDataMessage = () => {
		const chat = this.props.acceptIgnoreContact;
		let message = chat.message;

		if (message) {
			if (Array.isArray(message)) {
				return message[0];
			}
			return message;
		}
	};

	render() {
		const chat = this.props.acceptIgnoreContact;
		// console.log("ADITYA133 checking props", this.props);
		if (!chat || this.state.isDelivered === true) {
			return null;
		}

		return (
			<div
				style={{ backgroundColor: "rgba(255,255,255,0.8)" }}
				className="p-4 text-center"
			>
				<h5>{this.getDataMessage().userName}</h5>
				<div className="text-center">would like to connect with you.</div>
				<div className="text-center">Add user to contacts?</div>
				<div className="d-flex justify-content-center mt-2">
					<a
						style={{ margin: "0 10px", display: "inline-block" }}
						onClick={this.accept}
					>
						<div
							className="media clearfix media-chit"
							style={{ margin: "0px" }}
						>
							<div className="medbody">
								<p
									style={{
										whiteSpace: "nowrap",
									}}
								>
									Accept
								</p>
							</div>
						</div>
					</a>

					<a
						style={{ margin: "0 10px", display: "inline-block" }}
						onClick={this.ignore}
					>
						<div
							className="media clearfix media-chit"
							style={{ margin: "0px" }}
						>
							<div className="medbody">
								<p
									style={{
										whiteSpace: "nowrap",
									}}
								>
									Ignore
								</p>
							</div>
						</div>
					</a>
				</div>
			</div>
		);
	}
}

const mapDataToProps = (state) => {
	return {
		acceptIgnoreContact: state.chats.acceptIgnoreContact,
		selectedDomain: state.selectedDomain,
	};
};

let actions = {
	sendMessage: sendAMessage,
	clearAcceptIgnoreButtons: clearAcceptIgnoreButtons,
	fetchContacts: fetchContacts,
	clearAcceptIgnoreContact: clearAcceptIgnoreContact,
	removeSelectedContact: removeSelectedContact,
	getTimeLine: getTimeLine,
	changeSelectedConversation,
};

export default connect(mapDataToProps, actions)(AcceptOrIgnoreContact);
