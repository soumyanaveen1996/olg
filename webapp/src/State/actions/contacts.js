import UserServiceClient from "./../../Services/Clients/UserServiceClient";
import { getProfilePhoto } from "../../Services/FilesService";
import { parseMessages, clearAcceptIgnoreButtons } from "../actions/chats";
import _ from "lodash";
import { updateProfileImage } from "./updateProfileImage";
import { CLEAR_ACCEPT_IGNORE_CONTACT } from "./chats";
import {
	getDataFromLFStorage,
	LFStorageKeys,
	saveDataInLFStorage,
} from "../../Services/LFStorage";
import store from "../configureStore";
export const CONTACTS_RECEIVED = "CONTACTS_RECEIVED";
export const SELECTED_CONTACT = "SELECTED_CONTACT";
export const REMOVE_SELECTED_CONTACT = "REMOVE_SELECTED_CONTACT";
export const NEW_CONTACT_ADDED_STATUS = "NEW_CONTACT_ADDED_STATUS";
export const REMOVE_CONTACT_STATUS = "REMOVE_CONTACT_STATUS";
export const VESSEL_CONTACT_PROFILE_IMG = "VESSEL_CONTACT_PROFILE_IMG";
export const UPDATE_CONTACT_FROM_LOCAL = "UPDATE_CONTACT_FROM_LOCAL";
export const UPDATE_CONTACT_FROM_ACCEPTED = "UPDATE_CONTACT_FROM_ACCEPTED";
export const UPDATE_IGNORED_CONTACT = "UPDATE_IGNORED_CONTACT";
// JUST clearing the selected contact not deleting for FC-647 purpose
export const CLEAR_SELECTED_CONTACT = "CLEAR_SELECTED_CONTACT";
export const ADD_NEW_USER_ASSOCIATION = "ADD_NEW_USER_ASSOCIATION";
export const SYNC_CONTACTS_WITH_CACHE = "SYNC_CONTACTS_WITH_CACHE";

export const fetchContacts =
	(data, forceFetchContact = false) =>
	async (dispatch, getState) => {
		try {
			let contactsList =
				(await getDataFromLFStorage(
					`${LFStorageKeys.CONTACTS}_${data.selectedDomain}`
				)) || [];
			if (_.isEmpty(contactsList) || forceFetchContact) {
				try {
					contactsList = await UserServiceClient.getContacts(data);
				} catch (error) {
					console.error("ERROR in fetching Contacts", error);
				}
				saveDataInLFStorage(
					`${LFStorageKeys.CONTACTS}_${data.selectedDomain}`,
					contactsList
				);
			}
			let { contacts: accepted, ignored, localContacts, sites } = contactsList;
			let vessels = [];
			if (sites && typeof sites === "string") {
				vessels = [...JSON.parse(sites)];
			} else {
				vessels = [...sites];
			}
			localContacts.forEach((elem) => {
				elem["contactType"] = "local";
			});

			dispatch({
				type: CONTACTS_RECEIVED,
				data: {
					accepted,
					ignored,
					localContacts,
					vessels,
				},
			});

			const loggedInUserId = getState().user.user.userId;

			let vesselContactsProfileImages = {};
			//getting local contacts images
			let vesselImg = new Promise((resolve) => {
				vessels.forEach((element) => {
					Promise.all([getProfilePhoto(element.userId + "_75x75.png")])
						.then((profileElem) => {
							vesselContactsProfileImages[element.userId] = profileElem[0];
							return vesselContactsProfileImages;
						})
						.then((arrImg) => {
							resolve(arrImg);
						});
				});
			});

			accepted.forEach(async (elem) => {
				try {
					let img = await getProfilePhoto(elem.userId + "_75x75.png");
					let fetchAll = getState().profileImages;
					let imgObj = {};
					if (Object.keys(fetchAll).length === 0) {
						imgObj[elem.userId] = img;
					} else {
						if (!imgObj[elem.userId]) {
							imgObj[elem.userId] = img;
						}
					}
					dispatch(updateProfileImage(imgObj));
				} catch (err) {
					console.error("error in loading accepted contact images", err);
				}
			});

			ignored.forEach(async (elem) => {
				try {
					let img = await getProfilePhoto(elem.userId + "_75x75.png");
					let fetchAll = getState().profileImages;
					let imgObj = {};
					if (Object.keys(fetchAll).length === 0) {
						imgObj[elem.userId] = img;
					} else {
						if (!imgObj[elem.userId]) {
							imgObj[elem.userId] = img;
						}
					}
					dispatch(updateProfileImage(imgObj));
				} catch (err) {
					console.error("error in loading accepted contact images", err);
				}
			});

			localContacts.forEach(async (elem) => {
				try {
					let img = await getProfilePhoto(
						loggedInUserId + elem.userId + "_75x75.png"
					);
					let fetchAll = getState().profileImages;
					let imgObj = {};
					if (Object.keys(fetchAll).length === 0) {
						imgObj[loggedInUserId + elem.userId] = img;
					} else {
						if (!imgObj[loggedInUserId + elem.userId]) {
							imgObj[loggedInUserId + elem.userId] = img;
						}
					}
					dispatch(updateProfileImage(imgObj));
				} catch (err) {
					console.error("error in loading local contact images", err);
				}
			});

			vesselImg
				.then((data) =>
					dispatch({
						type: VESSEL_CONTACT_PROFILE_IMG,
						data: {
							vesselContactsProfileImages: data,
						},
					})
				)
				.catch((err) => {
					console.error("Error in fetching vessel contact profile images", err);
				});
		} catch (error) {
			console.error("ERROR in fetching Contacts", error);
		}
	};

export const selectedContactAction = (data) => (dispatch) => {
	dispatch({
		type: SELECTED_CONTACT,
		data,
	});
};

function searchAndDeleteContact(contactArray, userId) {
	let findIndex = contactArray.findIndex((elem) => elem.userId === userId);
	if (findIndex !== -1) {
		contactArray.splice(findIndex, 1);
	}
	return contactArray;
}

function searchAndChangeContact(contactArray, contactDetails) {
	let findIndex = contactArray.findIndex(
		(elem) => elem.userId === contactDetails.userId
	);
	if (findIndex !== -1) {
		contactDetails["contactType"] = "local";
		contactArray[findIndex] = contactDetails;
	}
	return contactArray;
}

const updateCachedContacts = async (contactDetails) => {
	let selectedDomain = store.getState().selectedDomain.userDomain;
	let contactsList =
		(await getDataFromLFStorage(
			`${LFStorageKeys.CONTACTS}_${selectedDomain}`
		)) || [];

	if (contactsList) {
		if (contactDetails.isLocalContact) {
			contactsList.localContacts = contactsList.localContacts.map((contact) =>
				contact.userId === contactDetails.userId ? contactDetails : contact
			);
		} else if (contactsList.contacts) {
			contactsList.contacts = contactsList.contacts.map((contact) =>
				contact.userId === contactDetails.userId ? contactDetails : contact
			);
		}
		saveDataInLFStorage(
			`${LFStorageKeys.CONTACTS}_${selectedDomain}`,
			contactsList
		);
	}
};

function addInContactList(contactArray, contactDetails) {
	updateCachedContacts(contactDetails);
	let findIndex = contactArray.findIndex(
		(elem) => elem.userId === contactDetails.userId
	);

	let newContactArr = _.cloneDeep(contactArray);

	if (contactDetails.isLocalContact) {
		contactDetails["contactType"] = "local";
	}
	if (findIndex === -1) {
		newContactArr.push(contactDetails);
	} else {
		newContactArr[findIndex] = contactDetails;
	}
	return newContactArr;
}

export function updateContactList(rawMessage) {
	return async (dispatch, getState) => {
		let localContacts = getState().contacts.localContacts;
		let acceptedContacts = getState().contacts.accepted;
		let ignoredContacts = getState().contacts.ignored;
		let vesselContacts = getState().contacts.vessels;
		let parsed_message = parseMessages(rawMessage);
		let contact = parsed_message[0].message;
		let contactDetails = { ...contact };

		switch (rawMessage.contentType) {
			case 10002:
				deleteContactList(
					contactDetails,
					localContacts,
					acceptedContacts,
					vesselContacts,
					dispatch
				);
				break;
			case 10001:
			case 1001:
				addToContactList(
					contactDetails,
					localContacts,
					acceptedContacts,
					vesselContacts,
					dispatch,
					getState
				);
				break;
			case 10003:
				ignoreContactList(
					contactDetails,
					acceptedContacts,
					ignoredContacts,
					dispatch
				);
				break;
			case 10004:
				updateContactLocal(contactDetails, localContacts, dispatch, getState);
				break;
			case 10005:
				updateContactProfileImage(
					contactDetails,
					acceptedContacts,
					dispatch,
					getState
				);
				break;
			default:
				break;
		}
	};
}

async function updateContactProfileImage(
	contactDetails,
	acceptedContacts,
	dispatch,
	getState
) {
	let img = await getProfilePhoto(contactDetails.updatedUserId + "_75x75.png");
	let fetchAll = getState().profileImages || {};
	fetchAll[contactDetails.updatedUserId] = img;
	dispatch(updateProfileImage(fetchAll));
}

async function updateProfileImages(contactDetails, getState, dispatch) {
	let getAllProfileImages = _.cloneDeep(getState().profileImages);
	const loggedInUserId = getState().user.user.userId;
	let imgObj = {};
	if (contactDetails.isLocalContact) {
		if (getAllProfileImages) {
			let img = await getProfilePhoto(
				loggedInUserId + contactDetails.userId + "_75x75.png"
			);
			imgObj[loggedInUserId + contactDetails.userId] = img;
		}
	} else {
		if (getAllProfileImages) {
			let img = await getProfilePhoto(contactDetails.userId + "_75x75.png");
			imgObj[contactDetails.userId] = img;
		}
	}
	dispatch(updateProfileImage(imgObj));
}

function addToContactList(
	contactDetails,
	localContacts,
	acceptedContacts,
	vesselContacts,
	dispatch,
	getState
) {
	let newContactArr;
	if (contactDetails.isLocalContact) {
		newContactArr = addInContactList(localContacts, contactDetails);
		dispatch({
			type: UPDATE_CONTACT_FROM_LOCAL,
			data: [...newContactArr],
		});
	} else {
		newContactArr = addInContactList(acceptedContacts, contactDetails);
		dispatch(selectedContactAction(contactDetails));
		dispatch({
			type: UPDATE_CONTACT_FROM_ACCEPTED,
			data: [...newContactArr],
		});
	}
	updateProfileImages(contactDetails, getState, dispatch);
}

function ignoreContactList(
	contactDetails,
	acceptedContacts,
	ignoredContacts,
	dispatch
) {
	let removeListInAccepted = [];
	let newContactArr = [];
	removeListInAccepted = searchAndDeleteContact(
		acceptedContacts,
		contactDetails.userId
	);
	newContactArr = addInContactList(ignoredContacts, contactDetails);
	dispatch(removeSelectedContact());
	dispatch(clearAcceptIgnoreButtons());
	dispatch(clearAcceptIgnoreContact());
	dispatch({
		type: UPDATE_CONTACT_FROM_ACCEPTED,
		data: [...removeListInAccepted],
	});
	dispatch({
		type: UPDATE_IGNORED_CONTACT,
		data: [...newContactArr],
	});
}

function deleteContactList(
	contactDetails,
	localContacts,
	acceptedContacts,
	vesselContacts,
	dispatch
) {
	let newContactArr = [];
	if (contactDetails.isLocalContact) {
		newContactArr = searchAndDeleteContact(
			localContacts,
			contactDetails.userId
		);
		dispatch({
			type: UPDATE_CONTACT_FROM_LOCAL,
			data: [...newContactArr],
		});
	} else {
		newContactArr = searchAndDeleteContact(
			acceptedContacts,
			contactDetails.userId
		);

		dispatch({
			type: UPDATE_CONTACT_FROM_ACCEPTED,
			data: [...newContactArr],
		});
	}
}

function updateContactLocal(contactDetails, localContacts, dispatch, getState) {
	let newContactArr = [];
	if (contactDetails.isLocalContact) {
		newContactArr = searchAndChangeContact(localContacts, contactDetails);
		dispatch({
			type: UPDATE_CONTACT_FROM_LOCAL,
			data: [...newContactArr],
		});
	}

	updateProfileImages(contactDetails, getState, dispatch);
}

export function removeSelectedContact() {
	return (dispatch) => {
		dispatch({
			type: REMOVE_SELECTED_CONTACT,
		});
	};
}

export function removeContactStatus(contactRemovingStatus) {
	return (dispatch) => {
		dispatch({
			type: REMOVE_CONTACT_STATUS,
			contactRemovingStatus: contactRemovingStatus,
		});
	};
}

export function newContactAddedStatus(newContactCreatedStatus) {
	return (dispatch) => {
		dispatch({
			type: NEW_CONTACT_ADDED_STATUS,
			newContactCreatedStatus: newContactCreatedStatus,
		});
	};
}

export function clearContactSelection() {
	return {
		type: CLEAR_SELECTED_CONTACT,
	};
}

export function clearAcceptIgnoreContact() {
	return { type: CLEAR_ACCEPT_IGNORE_CONTACT };
}

export const syncContactsWithCache = (data) => (dispatch) => {
	dispatch({
		type: SYNC_CONTACTS_WITH_CACHE,
		data: {
			accepted: data.contacts || [],
			ignored: data.ignored || [],
			localContacts: data.localContacts || [],
			vessels: data.vessels || [],
		},
	});
};
