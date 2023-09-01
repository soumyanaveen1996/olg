var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

const aws = require("aws-sdk");
let lambda = new aws.Lambda();

export function invokeSystemCapabilities(params) {
	return lambda
		.invoke({
			FunctionName: "SystemCapabilities",
			Payload: JSON.stringify(params, null, 0),
		})
		.promise();
}

/**
 * Expected format per contact:
 * {
 *     "emailAddress": "akshay@frontm.com",
 *     "givenName": "Akshay",
 *     "screenName": "akshr",
 *     "surname": "Sharma",
 *     "name": "Akshay Sharma",
 *     "userId": "11A2A680-7E76-4154-A811-2A6BAB2A3BF9",
 * }
 */
export class Contact {
	constructor(user) {
		this.getAddedContacts = () => {
			let params = {
				capability: "GetData",
				collection: "People",
				query: [
					{
						operand: "userId",
						value: this.user.userId,
						operator: "eq",
					},
				],
				fields: "contacts",
				sync: true,
			};

			return invokeSystemCapabilities(params).then(function (data) {
				let parsed = JSON.parse(data.Payload);
				if (parsed) {
					let items = parsed.items;
					if (items && items[0]) {
						return items[0]["contacts"] || [];
					}
				}
				return [];
			});
		};

		this.getContactFieldForUUIDs = (uuidArr, field) => {
			return this.getAddedContacts()
				.then(function (contacts) {
					// Filter for uuidArr
					uuidArr = uuidArr || [];
					let filteredContacts = _lodash2.default.filter(
						contacts,
						(contact) => {
							return uuidArr.indexOf(contact.userId) > -1;
						}
					);
					if (field) {
						return _lodash2.default.map(filteredContacts, field);
					}
					return filteredContacts;
				})
				.catch((err) => {
					throw new Error(err);
				});
		};

		this.addContacts = (contacts) => {
			// if (!Array.isArray(contacts)) {
			//     contacts = [contacts];
			// }
			// console.log('Added Contacts : ', contacts);
			// return this.getAddedContacts()
			//     .then(function (cts) {
			//         cts = cts || [];
			//         const notPresentContacts = _.differenceBy(contacts, cts, (contact) => contact.userId);
			//         const newContacts = cts.concat(notPresentContacts);
			//         return this.saveContacts(newContacts);
			//     })
			//     .then(function (cts) {
			//         return cts;
			//     })
			//     .catch((err) => {
			//         throw new Error(err);
			//     });

			return new Promise((res, rej) => res());
		};

		this.ignoreContact = (contact) => {
			// contact.ignored = true;
			// this.getAddedContacts()
			//     .then(function (contacts) {
			//         contacts = contacts || [];
			//         var contactIndex = _.findIndex(contacts, {userId: contact.userId})
			//         if (contactIndex === -1) {
			//             contacts = contacts.concat(contact);
			//         } else {
			//             contacts[contactIndex].ignored = true;
			//         }
			//         return Contact.saveContacts(contacts);
			//     })
			//     .then(function (cts) {
			//         return cts;
			//     })
			//     .catch((err) => {
			//         throw  new Error(err);
			//     });
			return new Promise((res, rej) => res());
		};

		this.saveContacts = (contacts, ignored) => {
			let document = {};
			if (ignored) {
				document["ignored"] = contacts;
			} else {
				document["contacts"] = contacts;
			}
			let params = {
				capability: "WriteData",
				collection: "People",
				documents: [
					{
						key: { userId: this.user.userId },
						document: document,
					},
				],
				sync: true,
			};
			return invokeSystemCapabilities(params)
				.then((d) => {
					console.log(d);
					return d;
				})
				.catch((e) => {
					console.log(e);
					// return obj
				});
		};

		this.user = user;
	}

	/**
	 * Returns an array of picked field from the contact. If field is empty will return full object
	 */

	// Add one or more

	/**
	 * Adds the ignore flag for the Contact. If no contact with userId present,
	 * it adds a contact with ignore flag true.
	 */
}
