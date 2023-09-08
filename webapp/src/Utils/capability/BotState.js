import {
	saveDataInLFStorage,
	getDataFromLFStorage,
} from "../../Services/LFStorage";

class BotStateHandler {
	constructor(options) {
		if (!options.key) {
			throw new Error("key option is required");
		}
		this.persist = options.persist || true;
		this.key = options.key;
	}

	get(obj, key) {
		return obj[key];
	}

	set(obj, key, value) {
		obj[key] = value;
		this.persistIfRequired(obj);
	}

	deleteProperty(obj, key) {
		if (key in obj) {
			delete obj[key];
		}
		this.persistIfRequired(obj);
	}

	persistIfRequired(obj) {
		if (this.persist) {
			saveDataInLFStorage("botState_" + this.key, obj);
		}
	}
}

/*
    var a = await BotState.newState({key: 'amal'});
    a.b = 10;
    a.c = 20;
    delete a.b;
*/

export default class BotState {
	static newState = async (options) => {
		try {
			let value = await getDataFromLFStorage.get("botState_" + options.key);
			if (value) {
				return new Proxy(value, new BotStateHandler(options));
			} else {
				return new Proxy({}, new BotStateHandler(options));
			}
		} catch (error) {
			console.error("BotState new state", error);
		}

		// return new Promise((resolve) => {
		// 	getDataFromLFStorage.get("botState_" + options.key).then((value) => {
		// 		if (value) {
		// 			resolve(new Proxy(value, new BotStateHandler(options)));
		// 		} else {
		// 			resolve(new Proxy({}, new BotStateHandler(options)));
		// 		}
		// 	});
		// });
	};
}
