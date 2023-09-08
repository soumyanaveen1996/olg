import React, { Component } from "react";
import ModalPopup from "../ModalMessages/ModalPopup";

import { addContacts } from "../../Services/ContactsService";
import Notify from "../ModalMessages/ToastNotif";
import AddContactMenu from "./AddContactMenu";

class NewContactButton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			createConv: false,
		};
	}

	showAddContact = () => this.setState({ addContactMenu: true });
	closeAddContact = () => this.setState({ addContactMenu: false });

	// addContacts = users => {
	//   addContacts(users)
	//     .then(response => {
	//       setTimeout(this.props.fetchContacts, 3000);
	//       Notify({ type: "success", message: "Contact has been added" });
	//       this.closeAddContact();
	//     })
	//     .catch(error => {
	//       console.log("error ", error);

	//       Notify({
	//         type: "error",
	//         message: "Error while adding the contacts. Please try again later."
	//       });
	//     });
	// };

	render() {
		return (
			<React.Fragment>
				<a
					style={{
						borderRadius: "2px",
						boxShadow: "none",
						padding: ".5rem 0.7rem",
						color: "#638DFF",
					}}
					onClick={this.showAddContact}
					className="btn btn-default d-inline-flex justify-content-center align-items-center"
				>
					Add new contact{" "}
					<img
						loading="lazy"
						className="dot ml-2"
						src="/img/circled-plus.png"
						alt="Not found"
					/>
				</a>
				{this.state.addContactMenu && (
					<ModalPopup
						onClose={this.closeAddContact}
						size="sm"
						title="Add Contact"
					>
						<AddContactMenu
							{...this.props}
							selectedDomain={this.props.selectedDomain}
							cancel={this.closeAddContact}
							selectedContactAction={this.props.selectedContactAction}
							allProfileImages={this.props.allProfileImages}
							fetchContacts={(data) => {
								this.props.fetchContacts(data, true);
								this.props.newContactAdded(true);
							}}
						/>
					</ModalPopup>
				)}
			</React.Fragment>
		);
	}
}

export default NewContactButton;
