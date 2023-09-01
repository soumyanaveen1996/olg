import React from "react";
import ContactDetails from "./ContactDetails";

const ContactDetailsView = (props) => {
	let {
		contact,
		startConversation,
		selectedDomain,
		callhistory,
		allProfileImages,
		balance,
		openRecharge,
	} = props;

	contact = props.selectedContactStore;

	if (!contact || Object.keys(contact).length === 0) {
		return (
			<div
				className="Catalog-sidebar sidebar-sm d-flex align-items-center justify-content-center"
				id="sidebar-collapse"
				style={Object.assign(props.style, {
					backgroundColor: "#F4F4F4",
				})}
			>
				<div className="p-4">
					<p className="fs-1x ">
						Please select a contact to view it's details.
					</p>
				</div>
			</div>
		);
	}
	let currentUserId = props.user.user.userId;
	return (
		<div
			className="Catalog-sidebar sidebar-sm"
			id="sidebar-collapse"
			style={Object.assign(props.style, { backgroundColor: "#F4F4F4" })}
		>
			<div className="px-5 py-4">
				<div
					className="px-5"
					style={{
						height: "90vh",
						overflow: "scroll",
					}}
				>
					<ContactDetails
						user={props.user}
						balance={balance}
						contact={contact}
						currentUserId={currentUserId}
						callhistory={callhistory}
						selectedDomain={selectedDomain}
						startConversation={startConversation}
						remove={props.remove}
						userId={props.userId}
						allProfileImages={allProfileImages}
						emailAddress={props.emailAddress}
						accept={props.accept}
						ignore={props.ignore}
						sendMsgForBanner={props.sendMsgForBanner}
						openRecharge={openRecharge}
						fetchContacts={(data) => {
							props.fetchContacts(data);
						}}
						selectedContactAction={props.selectedContactAction}
						updateSelectedContact={props.updateContactSelected}
					/>
				</div>
			</div>
		</div>
	);
};

export default ContactDetailsView;
