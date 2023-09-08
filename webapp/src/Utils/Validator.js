import { getSignupPath } from "../Services/StorageService";
const emailRegex =
	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const pwdRegex =
	/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{6,}$/;
export function validateSignInForm(data) {
	if (!data.email || !data.password) {
		return "Email and Password are required.";
	}

	// if (!emailRegex.test(data.email)) {
	//   return "Valid Email is required.";
	// }
}

export function validateResetPasswordEmailForm(data) {
	if (!data.email) {
		return "Email is required.";
	}

	if (!emailRegex.test(data.email)) {
		return "Valid Email is required.";
	}
}
export function validatConfirmPasswordResetForm(data) {
	let code = data.code,
		password = data.password,
		password2 = data.password2;
	if (!code) {
		return "Code is required";
	}

	if (!password) {
		return "Password field is required";
	}
	let signupPath = getSignupPath();
	if (!signupPath) {
		if (!password2) {
			return "Confirm password field is required";
		}

		if (password !== password2) {
			return "Confirm password should be the same";
		}
	}
}

export function validateSignUpForm(data, activationCodeMandatory) {
	let email = data.email,
		password = data.password,
		password2 = data.password2,
		givenName = data.given_name,
		authCode = !activationCodeMandatory
			? true
			: data.authCode && data.authCode.length > 0
			? true
			: false;
	// familyName = data.family_name;

	if (!email || !password || !password2 || !givenName || !authCode) {
		return "All fields are required.";
	}

	// if (!emailRegex.test(data.email)) {
	//   return "Valid Email is required.";
	// }

	if (!pwdRegex.test(password)) {
		return (
			"Password must be of 6 characters minimum. " +
			"It should be alphanumeric having at least one upper case, one lower case, a number and a special character."
		);
	}

	if (password !== password2) {
		return "Password and confirm password should be the same.";
	}
}

export function validateNewChannelForm(data, ele) {
	if (ele && ele.find((a) => a.channelName == data.channelName) != null) {
		return "Group Name already exist.";
	}
	if (!data.channelName || !data.description) {
		return "Group Name and Description are required.";
	} else if (!(data.members && data.members.length)) {
		return "Min 2 participants are required.";
	}
}
