import { syncContactsWithCache } from "../State/actions/contacts";
import store from "../State/configureStore";
import ContactsServiceClient from "./Clients/ContactsServiceClient";
import {
	getDataFromLFStorage,
	LFStorageKeys,
	saveDataInLFStorage,
} from "./LFStorage";

export function search(searchKey, selectedDomain) {
	return ContactsServiceClient.search({
		queryString: searchKey,
		selectedDomain: selectedDomain,
	}).then((data) => {
		const { content: contacts } = data;
		return contacts || [];
	});
}

export function addContacts(data, type) {
	if (type === "search") {
		return ContactsServiceClient.add(
			{
				userIds: data,
			},
			true
		).then((data) => {
			const { error } = data;
			if (error && error !== 0) {
				throw new Error();
			}
		});
	}

	if (type === "form") {
		return ContactsServiceClient.add({
			localContacts: data,
		}).then((data) => {
			const { error } = data;
			if (error && error !== 0) {
				throw new Error();
			}
		});
	}
}

export function updateLocalContact(data) {
	return ContactsServiceClient.update({
		localContacts: data,
	}).then((data) => {
		const { error } = data;
		if (error && error !== 0) {
			throw new Error();
		}
	});
}

export function inviteByEmail(emails, selectedDomain) {
	return ContactsServiceClient.invite({
		emailIds: emails,
		selectedDomain: selectedDomain,
	}).then((data) => {
		const { error } = data;
		if (error && error !== 0) {
			throw new Error();
		}
	});
}

export function removeContacts(users, type) {
	if (type === "local") {
		return ContactsServiceClient.remove({ localContacts: [users] }).then(
			async (data) => {
				try {
					const { error } = data;
					if (error && error !== 0) {
						throw new Error();
					}
					let selectedDomain = store.getState().selectedDomain.userDomain;
					let contactsList =
						(await getDataFromLFStorage(
							`${LFStorageKeys.CONTACTS}_${selectedDomain}`
						)) || [];

					if (contactsList) {
						contactsList.localContacts = contactsList.localContacts.filter(
							(contact) => users.userId !== contact.userId
						);
						saveDataInLFStorage(
							`${LFStorageKeys.CONTACTS}_${selectedDomain}`,
							contactsList
						);
						store.dispatch(syncContactsWithCache(contactsList));
					}
				} catch (error) {
					throw new Error();
				}
			}
		);
	}
	return ContactsServiceClient.remove({ userIds: users }).then(async (data) => {
		const { error } = data;
		if (error && error !== 0) {
			throw new Error();
		}
		let selectedDomain = store.getState().selectedDomain.userDomain;
		let contactsList =
			(await getDataFromLFStorage(
				`${LFStorageKeys.CONTACTS}_${selectedDomain}`
			)) || [];

		if (contactsList) {
			contactsList.contacts = contactsList.contacts.filter(
				(contact) => !users.includes(contact.userId)
			);
			saveDataInLFStorage(
				`${LFStorageKeys.CONTACTS}_${selectedDomain}`,
				contactsList
			);
			store.dispatch(syncContactsWithCache(contactsList));
		}
	});
}

export function acceptContacts(users) {
	return ContactsServiceClient.accept({ userIds: users }).then((data) => {
		const { error } = data;
		if (error && error !== 0) {
			throw new Error();
		}
	});
}

export function ignoreContacts(users) {
	return ContactsServiceClient.ignore({ userIds: users }).then((data) => {
		const { error } = data;
		if (error && error !== 0) {
			throw new Error();
		}
	});
}
