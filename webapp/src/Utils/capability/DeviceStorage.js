import {
	saveDataInLFStorage,
	getDataFromLFStorage,
	removeDataFromLFStorage,
} from "../../Services/LFStorage";
/**
 * Note: We could have as well used https://github.com/jasonmerino/react-native-simple-store but since we want to
 * have our Promises exposed we are building this ourselves for now.
 */
export class DeviceStorage {
	constructor() {
		/**
		 * Save a key value pair
		 * @param  {String} key The key
		 * @param  {Any} obj The value to save
		 * @return {Promise}
		 */
		this.save = (key, obj) =>
			new Promise((resolve) => {
				saveDataInLFStorage(key, obj);
				return resolve(obj);
			});

		/**
		 * Updates the value in the store for a given key in DeviceStorage
		 * @param  {String} key The key
		 * @param  {Value} value The value to update with
		 * @return {Promise}
		 */
		this.update = (key, value) =>
			new Promise((resolve, reject) => {
				return DeviceStorage.save(key, value)
					.then(function (obj) {
						resolve(obj);
					})
					.catch(function (err) {
						reject(err);
					});
			});

		/**
		 * Get a one or more value for a key
		 * @param {String|Array} key A key or array of keys
		 * @return {Promise}
		 */
		this.get = async (key) => {
			try {
				let value = await getDataFromLFStorage(key);

				if (value) {
					return value;
				}
			} catch (error) {
				console.error("error in getting device storage data", error);
			}
		};

		/**
		 * Removes the value and key
		 * @param  {String} key The key
		 * @return {Promise}
		 */
		this.delete = (key) =>
			new Promise((resolve) => {
				removeDataFromLFStorage(key);
				return resolve();
			});

		/**
		 * Get an array of values associated with key
		 * @param {String} key A key
		 * @return {Promise}
		 */
		this.getArrayValues = (key) =>
			new Promise((resolve, reject) => {
				// return resolve(ArrayStorageDAO.selectArrayValues(key));
			});

		/**
		 * Push a value onto an array stored in DeviceStorage by key
		 * @param {String} key They key
		 * @param {String} val only supports string val
		 * @return {Promise}
		 */
		this.saveArrayValue = (key, val) =>
			new Promise((resolve, reject) => {
				// return resolve(ArrayStorageDAO.insertArrayValues(key, [val]));
			});

		/**
		 * Push a value onto an array stored in DeviceStorage by key. Will be stored as [{key: key, value: value}..]
		 * @param {String} key They key
		 * @param {String} values only supports array of string val
		 * @return {Promise}
		 */
		this.saveArrayValues = (key, values) =>
			new Promise((resolve, reject) => {
				// if (Array.isArray(values)) {
				// 	return resolve(ArrayStorageDAO.insertArrayValues(key, values));
				// } else {
				// 	return resolve(DeviceStorage.saveArrayValue(key, values));
				// }
			});

		/**
		 * Removes the first element from the array value based on the key. If no key/array exists - returns null.
		 * @param {String} key They key
		 * @param {String} val val to remove
		 * @return {Promise} resolving to the popped first element
		 */
		this.removeArrayValue = (key, val) =>
			new Promise((resolve, reject) => {
				// return resolve(ArrayStorageDAO.deleteArrayValues(key, val));
			});

		/**
		 * Removes all array elements
		 * @param {String} key They key
		 * @return {Promise} resolving to the popped first element
		 */
		this.removeAllArrayValues = (key) =>
			new Promise((resolve, reject) => {
				// return resolve(ArrayStorageDAO.deleteArrayValues(key));
			});
	}
}
