import React from "react";
import Contacts from "./Contacts";
import Scrollbars from "react-custom-scrollbars-2";
import { useSelector } from "react-redux";

const ContactsList = (props) => {
	let {
		userId,
		contacts,
		fetchContacts,
		selectedId,
		showMenu,
		toggleMenu,
		selectContact,
		searchText,
		allProfileImages,
	} = props;
	const notification = useSelector((state) => state.appNotification);

	let grouped = null,
		keys = [];
	if (!searchText) {
		grouped = {};
		contacts.forEach((contact) => {
			let first;
			if (contact.userId === userId) {
				return false;
			}

			if (!contact.type) {
				first =
					(contact.userName && contact.userName.charAt(0).toUpperCase()) || "";
			} else {
				first = (contact.name && contact.name.charAt(0).toUpperCase()) || "";
			}
			if (grouped[first]) {
				grouped[first].push(contact);
			} else {
				grouped[first] = [contact];
			}
		});
		if (grouped) {
			keys = Object.keys(grouped).sort();
		}

		// console.log("all contacts ", contacts);
	}

	return (
		<Scrollbars
			autohide="true"
			style={{
				height:
					props.height ||
					`calc(100vh  ${notification.show ? "- 200px" : "- 150px"} )`,
			}}
		>
			{!grouped && (
				<div className="d-flex flex ">
					<Contacts
						showMenu={showMenu}
						toggleMenu={toggleMenu}
						onContactClicked={selectContact}
						contacts={contacts}
						userId={userId}
						allProfileImages={allProfileImages}
						fetchContacts={fetchContacts}
						selectedId={selectedId}
						forCall={props.forCall}
					/>
				</div>
			)}

			{grouped && (
				<div className="d-flex flex flex-column">
					{keys.map((key) => {
						return (
							<div key={key}>
								<div
									className="d-block pl-3 pb-1 title"
									style={{
										fontSize: "16px",
										color: "#4A4A4A",
										borderBottom: "1px solid #e8e9ee",
									}}
								>
									{key}
								</div>
								<div>
									<Contacts
										showMenu={showMenu}
										toggleMenu={toggleMenu}
										onContactClicked={selectContact}
										contacts={grouped[key]}
										userId={userId}
										allProfileImages={allProfileImages}
										fetchContacts={fetchContacts}
										selectedId={selectedId}
										forCall={props.forCall}
									/>
								</div>
							</div>
						);
					})}
				</div>
			)}
		</Scrollbars>
	);
};

export default ContactsList;
