const { getSignupPath } = require("../Services/StorageService");
let landingPath = window.location.pathname;

if (landingPath === "/verify" || landingPath.includes("/app")) {
	if (getSignupPath()) {
		landingPath = getSignupPath();
	}
}

let appType = null;

const apiChangeArray = [
	{
		path: "/vikand",
		appType: "vikand",
	},
	{
		path: "/vikandconnect",
		appType: "vikand",
	},
	{
		path: "/onship",
		appType: "onship",
	},
	{
		path: "/onecare",
		appType: "onecare",
	},
	{
		path: "/stationsatcom",
		appType: "stsatcom",
	},
	{
		path: "/sigma",
		appType: "sigma",
	},
	{
		path: "/",
		appType: null,
	},
];

let getIndex = null;

if (landingPath) {
	getIndex = apiChangeArray.findIndex((elem) => elem.path === landingPath);
}

if (getIndex !== null && getIndex !== -1) {
	appType = apiChangeArray[getIndex].appType;
}

if (
	window.location.origin === "https://onship.app" ||
	window.location.pathname.includes("onship")
) {
	appType = "onship";
}
//Reminder: DNS will change
if (
	window.location.origin === "https://vikand.frontm.com" ||
	window.location.pathname.includes("vikand")
) {
	appType = "vikand";
}

if (
	window.location.origin === "https://onecare.frontm.com" ||
	window.location.origin === "https://onecaresolutions.app" ||
	window.location.pathname.includes("onecare")
) {
	appType = "onecare";
}

if (
	window.location.origin === "https://stage.frontm.com" ||
	window.location.pathname.includes("stage")
) {
	appType = "onship";
}

if (
	window.location.origin === "https://ssvideokonnect.com" ||
	window.location.pathname.includes("ssvideokonnect")
) {
	appType = "stsatcom";
}

export default appType;
