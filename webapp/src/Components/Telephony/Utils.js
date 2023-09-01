import Notify from "../ModalMessages/ToastNotif";
import {
	PhoneNumberUtil,
	PhoneNumberFormat,
	AsYouTypeFormatter,
} from "google-libphonenumber";

const SATELLITE_CODES = [870, 881];
export const TWILIO_AVOIDABLE_ERROR_CODES = [31204, 31205];

export function notifyBalanceError() {
	Notify({
		type: "error",
		message:
			"You don't have sufficient balance to make calls. Please recharge your wallet.",
	});
}
export function notifyInvalidPhone() {
	Notify({
		type: "error",
		message: "Please dial a valid phone number",
	});
}
export function notifyConnectionError(message) {
	// Notify({
	//   type: "error",
	//   message:
	//     "Sorry, could not connect to the call. Please try again later. Please contact us if the problem persists."
	// });
}

export function validatePhoneNumber(phoneNumber) {
	if (!phoneNumber || phoneNumber.length < 5) {
		return false;
	}
	let valid = false;
	try {
		const phoneUtil = PhoneNumberUtil.getInstance();
		valid = phoneUtil.isValidNumber(phoneUtil.parse(phoneNumber));
	} catch (e) {
		valid = false;
	}
	return valid;
}

export function doE164(phone) {
	let formatted = null,
		countryCode = null;
	try {
		const phoneUtil = PhoneNumberUtil.getInstance();
		let parsed = phoneUtil.parse(phone);
		countryCode = parsed.getCountryCode();
		formatted = phoneUtil.format(parsed, PhoneNumberFormat.E164);
	} catch (e) {
		formatted = null;
	}
	if (!formatted) {
		return phone;
	}

	return { formatted, countryCode };
}

export function parsePhoneNumber(fullPhone) {
	if (!fullPhone) {
		return {};
	}
	let countryCode = null,
		phone = null;
	try {
		const phoneUtil = PhoneNumberUtil.getInstance();
		let number = phoneUtil.parse(fullPhone);
		countryCode = number.getCountryCode();
		phone = number.getNationalNumber();
	} catch (e) {
		countryCode = null;
		phone = null;
	}
	if (countryCode) {
		countryCode = "+" + countryCode;
	}
	return { countryCode, phone };
}

export function formatPhoneNumber(countryCode, phone) {
	let formatted = null;
	let fullPhone = countryCode ? countryCode : "";
	fullPhone = phone ? fullPhone + phone : fullPhone;
	try {
		const phoneUtil = PhoneNumberUtil.getInstance();
		formatted = phoneUtil.format(
			phoneUtil.parse(fullPhone),
			PhoneNumberFormat.INTERNATIONAL
		);
	} catch (e) {
		formatted = fullPhone;
	}
	return formatted;
}

export function getAsYouTypeFormatter(code) {
	return new AsYouTypeFormatter(code);
}

export function getFormattedDuration(time) {
	let seconds = parseInt(time, 10);
	seconds = seconds - 0 < 0 ? 0 : seconds - 0;
	let minute = Math.floor(seconds / 60);
	seconds = seconds % 60;
	// hour = Math.floor(minute / 60);
	minute = minute % 60;
	// day = Math.floor(hour / 24);
	// hour = hour % 24;

	minute = minute < 10 ? "0" + minute : minute;
	seconds = seconds < 10 ? "0" + seconds : seconds;
	return minute + ":" + seconds;
}

export function getCallMode(countryCode) {
	if (SATELLITE_CODES.indexOf(countryCode) !== -1) {
		return "sat";
	} else {
		return null;
	}
}

export function findCallerName(contacts, callerId) {
	if (callerId && callerId.startsWith("client:")) {
		callerId = callerId.substr(7);
		for (let i = 0; i < contacts.length; i++) {
			if (contacts[i].userId === callerId) {
				return contacts[i].userName;
			}
		}
	}
	return null;
}
export function findVOIPCallerName(contacts, callerId) {
	if (callerId) {
		for (let i = 0; i < contacts.length; i++) {
			if (contacts[i].userId === callerId) {
				return contacts[i].userName;
			}
		}
	}
	return null;
}
