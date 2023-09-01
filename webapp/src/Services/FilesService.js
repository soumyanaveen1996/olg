import Config from "../Utils/Config";
import { createUUID } from "../Utils/Helpers";
import GenericAjax from "./GenericAjax";
import Ajax from "./Ajax";

const { filesAPI, baseURL } = Config;

export function isFileFromS3(fileName) {
	return (
		fileName &&
		(fileName.startsWith("http://") || fileName.startsWith("https://"))
	);
}

export function fileToBase64(file) {
	return new Promise((resolve) => {
		let reader = new FileReader();
		reader.onload = function (event) {
			let str = event.target.result;
			let index = str.indexOf(",");
			str = str.substring(index + 1);
			resolve(str);
		};
		reader.readAsDataURL(file);
	});
}

export function uploadProfilePhoto(userId, file, onUploadProgress) {
	return uploadFile("profile-pics", userId, file, onUploadProgress);
}

export function uploadFile(folder, fileName, file, onUploadProgress) {
	// console.log("data on upload ", folder, fileName, file);
	return fileToBase64(file).then((base64Str) => {
		return GenericAjax.uploadFile(
			`${filesAPI}/uploadfilebase64/${folder}/${fileName}`,
			base64Str,
			file.type,
			onUploadProgress
		);
	});

	// return Ajax.upload("/v2/uploadfile", folder, fileName, file, onUploadProgress)
	//   .then(function(res) {
	//     console.log(res);
	//   })
	//   .catch(function(error) {
	//     console.log(error);
	//   });
}

export function uploadImageFile(
	startingPath,
	channelId,
	fileName,
	file,
	onUploadProgress
) {
	return fileToBase64(file).then((base64Str) => {
		return GenericAjax.uploadFile(
			`${filesAPI}/${startingPath}/${channelId}/${fileName}`,
			base64Str,
			file.type,
			onUploadProgress
		);
	});
}

export function getFileName() {
	return createUUID();
}

export function getFileUrl(folderName, fileName = null) {
	if (fileName) {
		if (isFileFromS3(fileName)) {
			return fileName;
		}
		return `${filesAPI}/file/${folderName}/${fileName}`;
	} else {
		return `${filesAPI}/file/${folderName}`;
	}
}

export function getFileUsingUrl(url) {
	if (url.startsWith(filesAPI)) {
		return GenericAjax.downloadFile(url, null, true, true).then(function (res) {
			return URL.createObjectURL(res);
		});
	} else {
		return Ajax.fetchFileFromS3(url);
	}
}

export function getProfilePhoto(fileName) {
	return getFileUsingUrl(getFileUrl("profile-pics", fileName));
}

export function getFormPhoto(convId, fileName) {
	return getFileUsingUrl(getFileUrl(convId, fileName));
}
