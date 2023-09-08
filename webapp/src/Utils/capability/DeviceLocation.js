export class LocationError extends Error {
	constructor(code, message) {
		super(message);
		this.code = code;
		this.message = message;
	}

	get code() {
		return this.code;
	}

	get message() {
		return this.message;
	}
}

export const LocationErrorCodes = {
	0: "Error in getting location",
	1: "User rejected location permissions",
	2: "GPS is turned off",
};

export class DeviceLocation {}

DeviceLocation.getDeviceLocation = () =>
	new Promise((resolve, reject) => {
		resolve();
	});
