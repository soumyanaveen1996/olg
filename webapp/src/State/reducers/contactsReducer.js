import {
	CONTACTS_RECEIVED,
	NEW_CONTACT_ADDED_STATUS,
	REMOVE_SELECTED_CONTACT,
	REMOVE_CONTACT_STATUS,
	VESSEL_CONTACT_PROFILE_IMG,
	UPDATE_CONTACT_FROM_LOCAL,
	UPDATE_CONTACT_FROM_ACCEPTED,
	UPDATE_IGNORED_CONTACT,
	SYNC_CONTACTS_WITH_CACHE,
} from "../actions/contacts";
import {
	SELECTED_CONTACT,
	CLEAR_SELECTED_CONTACT,
	ADD_NEW_USER_ASSOCIATION,
} from "../actions/contacts";
import {
	NEW_CONTACT_ACCEPT_IGNORE_MESSAGE__RECEIVED,
	CONTACT_ACCEPTED,
	CLEAR_ACCEPT_IGNORE_CONTACT,
} from "../actions/chats";
import { LOGOUT_USER } from "../actions/user";

let initialState = {
	accepted: [],
	ignored: [],
	localContacts: [],
	vessels: [],
	error: null,
	selectedContact: {},
	contactRemovingStatus: false,
	newContactCreatedStatus: false,
	vesselContactsProfileImages: {},
	usersAssociation: {},
};

function contactsReducer(state = initialState, action) {
	switch (action.type) {
		case CONTACTS_RECEIVED:
			let usersAssociation = {};
			action.data.accepted.forEach((contact) => {
				usersAssociation[contact.userId] = contact.userName;
			});
			action.data.ignored.forEach((contact) => {
				usersAssociation[contact.userId] = contact.userName;
			});
			action.data.localContacts.forEach((contact) => {
				usersAssociation[contact.userId] = contact.userName;
			});
			return {
				...state,
				accepted: action.data.accepted,
				ignored: action.data.ignored,
				localContacts: action.data.localContacts,
				vessels: action.data.vessels,
				usersAssociation,
			};
		case ADD_NEW_USER_ASSOCIATION:
			let usersAssociationNew = state.usersAssociation;
			usersAssociationNew[action.data.userId] = action.data.userName;
			return { ...state, usersAssociation: usersAssociationNew };
		case UPDATE_CONTACT_FROM_LOCAL:
			return { ...state, localContacts: action.data };
		case UPDATE_CONTACT_FROM_ACCEPTED:
			return { ...state, accepted: action.data };
		case UPDATE_IGNORED_CONTACT:
			return { ...state, ignored: action.data };

		case VESSEL_CONTACT_PROFILE_IMG:
			return {
				...state,
				vesselContactsProfileImages: action.data.vesselContactsProfileImages,
			};

		case SELECTED_CONTACT:
			return {
				...state,
				selectedContact: { ...action.data },
			};
		case REMOVE_SELECTED_CONTACT:
			return {
				...state,
				selectedContact: { ...initialState.selectedContact },
			};
		case REMOVE_CONTACT_STATUS:
			return {
				...state,
				contactRemovingStatus: action.contactRemovingStatus,
				newContactCreatedStatus: !action.contactRemovingStatus,
			};
		case NEW_CONTACT_ADDED_STATUS:
			return {
				...state,
				newContactCreatedStatus: action.newContactCreatedStatus,
				contactRemovingStatus: !action.newContactCreatedStatus,
			};
		case LOGOUT_USER:
			return { ...initialState };

		case CLEAR_SELECTED_CONTACT:
			return {
				...state,
				selectedContact: { ...initialState.selectedContact },
			};

		case NEW_CONTACT_ACCEPT_IGNORE_MESSAGE__RECEIVED: {
			const message = action.data.message.message;
			const accepted = state.accepted;
			const newContactRequest = { ...message, showAcceptIgnoreMsg: true };
			const acceptedUpdated = [...accepted, newContactRequest];
			return {
				...state,
				accepted: acceptedUpdated,
			};
		}
		case CLEAR_ACCEPT_IGNORE_CONTACT:
			return { ...state, acceptIgnoreContact: null };

		case CONTACT_ACCEPTED: {
			const contactRcvd = action.data.message.message;
			const tempAccepted = [...state.accepted];
			let indexOfAcceptedContact = -1;
			for (let i = 0; i < tempAccepted.length; i++) {
				if (tempAccepted[i].userId === contactRcvd.userId) {
					indexOfAcceptedContact = i;
					break;
				}
			}
			if (indexOfAcceptedContact === -1) {
				return {
					...state,
					accepted: [...state.accepted, contactRcvd],
				};
			} else {
				tempAccepted[indexOfAcceptedContact] = contactRcvd;
				return {
					...state,
					accepted: tempAccepted,
				};
			}
		}
		case SYNC_CONTACTS_WITH_CACHE:
			return {
				...state,
				...action.data,
			};
		default:
			return state;
	}
}

export default contactsReducer;
