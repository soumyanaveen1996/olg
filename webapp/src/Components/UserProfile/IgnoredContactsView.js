import React, { useEffect, useState } from "react";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import Avatar from "../Common/Avatar";
import { useDispatch, useSelector } from "react-redux";
import {
	newContactAddedStatus,
	syncContactsWithCache,
} from "../../State/actions/contacts";
import {
	LFStorageKeys,
	getDataFromLFStorage,
	saveDataInLFStorage,
} from "../../Services/LFStorage";
import { addContacts } from "../../Services/ContactsService";
import store from "../../State/configureStore";
import { NotifyClassComp } from "../ModalMessages/ToastNotif";
import { addAppNotification } from "../../State/actions/appNotifications";
import { BANNER_TYPE_INFO } from "../../Utils/Constants";

const IgnoredContactsView = (props) => {
	const [ignoredContacts, setIgnoredContacts] = useState([]);
	const [profileImgs, setProfileImgs] = useState("");
	const allProfileImages = useSelector((state) => state.profileImages);
	const selectedDomain = useSelector((state) => state.selectedDomain);
	const dispatch = useDispatch();

	useEffect(() => {
		let ignoredArr = props.contacts?.ignored;
		if (ignoredArr.length > 0) {
			setIgnoredContacts(ignoredArr);
		} else {
			setIgnoredContacts([]);
		}
	}, [props.contacts?.ignored]);

	useEffect(() => {
		if (allProfileImages) {
			setProfileImgs(profileImgs);
		}
	}, [allProfileImages]);

	const addContactRequest = async (userId, userName) => {
		let contactsList =
			(await getDataFromLFStorage(
				`${LFStorageKeys.CONTACTS}_${selectedDomain.userDomain}`
			)) || [];

		if (contactsList) {
			contactsList.contacts.push({
				userId,
				userName,
				waitingForConfirmation: true,
			});
			contactsList.ignored = contactsList.ignored.filter(
				(ignoredContact) => ignoredContact.userId !== userId
			);
			saveDataInLFStorage(
				`${LFStorageKeys.CONTACTS}_${selectedDomain.userDomain}`,
				contactsList
			);
			dispatch(syncContactsWithCache(contactsList));
		}

		let user = [];
		user.push(userId);

		dispatch(newContactAddedStatus(false));
		addContacts(user, "search")
			.then(() => {
				dispatch(newContactAddedStatus(true));
				dispatch(
					addAppNotification(
						`Contact ${userName} added successfully.`,
						BANNER_TYPE_INFO
					)
				);
			})
			.catch((error) => {
				console.log("error ", error);
				NotifyClassComp({
					type: "error",
					message: "Error while adding the contacts. Please try again later.",
				});
			});
	};

	// ic - shortform for ignored contact
	return (
		<div
			className="Catalog-sidebar d-flex align-items-center sidebar-sm"
			style={Object.assign({}, props.style, {
				overflowY: "auto",
				height: `calc(100vh - 35px )`,
			})}
		>
			<div className="ic-HeadingParent">
				<h1 className="ic-Heading">Ignored Contacts</h1>
			</div>

			{ignoredContacts.length > 0 ? (
				ignoredContacts.map((contact) => {
					let imgSource = "";

					if (
						allProfileImages &&
						contact?.userId &&
						allProfileImages[contact.userId]
					) {
						imgSource = allProfileImages[contact.userId];
					}

					return (
						<div className="ic-Container">
							<div className="ic-Box p-2 py-2 align-items-center">
								<DirectionsBoatIcon fontSize="small" color="secondary" />

								<Avatar
									color="bg-fm"
									imgSrc={imgSource}
									name={contact?.userName}
									size={38}
									height={38}
									style={{
										borderRadius: "50%",
										display: "flex",
										objectFit: "cover",
										marginLeft: "15px",
										backgroundColor: "#3559bd",
									}}
								/>

								<div className="ic-nameAndPositions">
									<h1 className="ic-Name">{contact?.userName}</h1>
									<div className="ic-Positions-Container">
										<h1 className="ic-Domain px-2 ">{contact?.role}</h1>
										<h1 className="ic-Position-Name px-2">{contact?.rank}</h1>
									</div>
								</div>

								<button
									onClick={() =>
										addContactRequest(contact?.userId, contact?.userName)
									}
									className="ic-AddButton py-1 px-2"
								>
									Add Contact
								</button>
							</div>
						</div>
					);
				})
			) : (
				<h5 className="ic-NotFoundHeading">No Ignored Contacts Found !</h5>
			)}
		</div>
	);
};

export default IgnoredContactsView;
