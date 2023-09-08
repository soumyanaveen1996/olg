import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import Contact from "./Contact";
import "./Contacts.css";

const AddContacts = ({
	search,
	onSearch,
	searchContacts,
	contacts,
	addContact,
}) => {
	return (
		<div className="Contacts-searcharea">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					searchContacts();
				}}
			>
				<input
					id="search"
					placeholder="Search..."
					type="text"
					className="form-control form-control-lg"
					onChange={onSearch}
					value={search}
				/>
			</form>
			<div className="navbar bg-white align-items-center b-b">
				<div className="nav mr-auto">
					<div className="nav-item align-items-center d-inline-flex py-2 mr-3">
						<span className="title font400 d-block">Results</span>
					</div>
				</div>
			</div>
			<Scrollbars autohide style={{ height: "300px" }}>
				<div className="flex">
					<div className="pt-2">
						{contacts && contacts.length > 0 && (
							<ul className="app-item-list list">
								{contacts.map((contact) => (
									<Contact
										key={contact.userId}
										contact={contact}
										showAdd={true}
										addContact={addContact}
									/>
								))}
							</ul>
						)}

						{(!contacts || contacts.length === 0) && (
							<div className="text-center mt-4">
								No Contacts found for the given search criteria.
							</div>
						)}
					</div>
				</div>
			</Scrollbars>
		</div>
	);
};

export default AddContacts;
