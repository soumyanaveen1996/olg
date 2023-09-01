import React from "react";
import ContactUI from "../Contacts/ContactUI";
import { Input } from "reactstrap";

const SelectableMember = ({
	selected,
	contact,
	toggleMember,
	allProfileImages,
}) => {
	return (
		<div className="d-flex align-items-center">
			<Input
				className="checkbox-member mr-3"
				type="checkbox"
				checked={selected}
				onChange={(e) => {
					toggleMember(contact);
				}}
			/>

			<ContactUI
				allProfileImages={allProfileImages}
				name={contact.userName}
				email={contact.emailAddress}
				userId={contact.userId}
				companyName={contact.userCompanyName}
				city={contact.address?.city}
			/>
		</div>
	);
};

export default SelectableMember;
