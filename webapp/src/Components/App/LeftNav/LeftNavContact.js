import React from "react";
import Avatar from "../../Common/Avatar";
import { useSelector } from "react-redux";

const LeftNavContact = ({
	contact,
	openContact,
	active,
	userId,
	allProfileImages,
	usersMessagesUnread,
	selectedChat,
}) => {
	const { timeLine } = useSelector((state) => state.chats);
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
	return (
		<div className="d-flex flex-row align-items-center justify-content-start">
			{active && (
				<span
					className="combined-shape"
					style={{ display: "block", marginLeft: "-13px" }}
				/>
			)}
			<a
				className="list-item d-flex align-items-center"
				style={Object.assign(
					{ lineHeight: "15px" },
					active ? { opacity: 1 } : {}
				)}
				onClick={() => openContact(contact)}
			>
				<div style={{ marginRight: "10px", }}>
					<Avatar
						style={{

							borderRadius: "50%",
							backgroundColor: "#fff",
						}}
						name={contact.name || contact.userName || ""}
						size={16}
						height={16}
						color="bg-info"
						imgSrc={setProfileImg(contact, userId, allProfileImages)}
					/>
				</div>

				<div
					className="list-title text-white fs12"
					title={contact.type === "Vessels" ? contact.name : contact.userName}
				>
					{contact.type === "Vessels"
						? contact.name
							? contact.name.length > 30
								? contact.name
								: contact.name.substring(0, 30).concat("...")
							: ""
						: contact.userName || ""}
				</div>
			</a>
			<div className="ml-2">
				{contact && contact?.showAcceptIgnoreMsg ? (
					<div className="rounded-circle notify-message d-flex justify-content-center align-items-center font-weight-bold">
						1
					</div>
				) : (
					<>
						{!contact.showAcceptIgnoreMsg &&
							contact.userId !== selectedChat &&
							usersMessagesUnread[contact.userId] > 0 && (
								<div
									key={contact.userId}
									className="rounded-circle notify-message d-flex justify-content-center align-items-center font-weight-bold"
								>
									{usersMessagesUnread[contact.userId]}
								</div>
							)}
					</>
				)}
			</div>
		</div>
	);
};

export default LeftNavContact;
