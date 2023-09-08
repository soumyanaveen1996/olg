import React from "react";
import "./Contacts.css";
import Avatar from "../Common/Avatar";
import ContactsMenu from "./ContactsMenu";

const Contact = ({
	userId,
	contact,
	thumbnail = null,
	onClick,
	closingModal,
	onLine = false,
	showAdd = false,
	addContact = null,
	highlight,
	allProfileImages,
}) => {
	let imgSrc = setProfileImg(contact, userId, allProfileImages);
	let topElStyle = {};
	if (highlight) {
		topElStyle = {
			backgroundColor: "#F4F4F4",
			borderLeft: "3px solid #638DFF",
		};
	}
	if (onClick) {
		topElStyle.cursor = "pointer";
	}

	return (
		<li
			key={contact.userId}
			className={`list-item Contacts-hover ${onLine ? "position-relative" : ""
				}`}
			style={topElStyle}
			onClick={() => onClick && onClick(imgSrc)}
		>
			<div className="forAwaitingAuthorisation">
				{contact.waitingForConfirmation && <i className="icon-history" />}
			</div>

			<Avatar
				style={{
					borderRadius: "50%",
					background: "#fff",
				}}
				color="bg-fm-primary"
				name={contact.name || contact.userName || ""}
				size={40}
				height={40}
				imgSrc={imgSrc}
			/>
			<div className="list-body" style={{ minWidth: "65px" }}>
				<span className="list-title font600" style={{ color: "#666666" }}>
					{contact.name || contact.userName || ""}
					{contact.type && (
						<span className="list-title font600" style={{ color: "#666666" }}>
							{" "}
							(Vessel)
						</span>
					)}
				</span>

				<span className="list-content" style={{ color: "#666666" }}>
					{contact.emailAddress}
				</span>
			</div>
			{showAdd ? (
				<div data-uuid={contact.userId} className="Contactsx-add">
					<a
						data-uuid={contact.userId}
						className="btn btn-primary btn-sm"
						onClick={addContact}
						href="#"
					>
						Add
					</a>
				</div>
			) : null}
			{contact.waitingForConfirmation && (
				<div className="awaitingContainer">
					<span className="awaitingAuthText">Awaiting for authorization</span>
				</div>
			)}
			{contact.showAcceptIgnoreMsg && (
				<div className="awaitingContainer">
					<span className="awaitingAuthText">Contact Requested</span>
				</div>
			)}
			{/* <ContactsMenu contact={contact} closeTheMainModel={closingModal} /> */}
		</li>
	);
};

const setProfileImg = (contact, userId, allProfileImages) => {
	if (contact.contactType === "local") {
		if (allProfileImages) {
			return allProfileImages[userId + contact.userId];
		}
	} else {
		if (allProfileImages) {
			return allProfileImages[contact.userId];
		}
	}
};

export default Contact;
