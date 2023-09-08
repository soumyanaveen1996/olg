import GenericAjax from "./GenericAjax";
import Config from "../Utils/Config";
const { filesAPI } = Config;

export function getFileUrl(folderName, fileName) {
	return `${filesAPI}/file/${folderName}/${fileName}`;
}

export function getNewFileUsingUrl() {
	let url = getFileUrl("itLjqsXxmg-7fd092d7be30", "3N5o6UK63dhqJB7vKUHNxL.png");

	return GenericAjax.get(url, null, true, true).then(function (res) {
		return URL.createObjectURL(res);
	});
}
