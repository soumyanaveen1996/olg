import React from "react";
import Contact from "./Contact";
import "./Contacts.css";

const Contacts = ({
	userId,
	showMenu = false,
	toggleMenu,
	onContactClicked,
	contacts = [],
	selectedId,
	allProfileImages,
	forCall,
}) => {
	return (
		<div className="flex">
			{contacts.length > 0 ? (
				<ul className="app-item-list list">
					{contacts
						.sort((a, b) => {
							let fa = a.userName.toLowerCase(),
								fb = b.userName.toLowerCase();

							if (fa < fb) {
								return -1;
							}
							if (fa > fb) {
								return 1;
							}
							return 0;
						})
						.map((contact, index) => (
							<Contact
								key={index}
								userId={userId}
								allProfileImages={allProfileImages}
								contact={contact}
								onClick={(imgSrc) => {
									// console.log("=======", imgSrc);
									onContactClicked(contact, imgSrc);
									// e.preventDefault();
								}}
								highlight={selectedId && contact.userId === selectedId}
								forCall={forCall}
							/>
						))}
				</ul>
			) : (
				<div className="px-2 py-4 text-center" style={{ color: "#4a4a4a" }}>
					No matching search results.
				</div>
			)}
		</div>
	);
};

export default Contacts;
