export function getPageName(pathName, isAnonymousUser) {
	if (pathName.includes("/app/chats") || pathName === "/app/") {
		return "Home";
	} else if (pathName === "/app/contacts" && !isAnonymousUser) {
		return "Contacts";
	} else if (pathName === "/app/groups" && !isAnonymousUser) {
		return "Channels";
	} else if (pathName.indexOf("/app/catalog") !== -1 && !isAnonymousUser) {
		return "Chatbots";
	} else if (pathName === "/app/my-profile" && !isAnonymousUser) {
		return "Profile";
	} else if (pathName === "/app/home" && !isAnonymousUser) {
		return "Welcome";
	} else if (pathName === "/app/loft") {
		return "Loft";
	} else {
		return "Error";
	}
}
