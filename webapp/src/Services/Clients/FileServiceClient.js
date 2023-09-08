import FileService from "../gRPC/Generated/FileService";
import { fileToBase64 } from "../FilesService";
import RPC from "./RPC";
const file = FileService.file;

class FileServiceClient {
	static uploadLargeFile(fileInfo) {
		return fileToBase64(fileInfo.file).then((base64Str) => {
			let obj = {
				...fileInfo,
				file: base64Str,
			};
			console.log("uploadLargeFile", obj);
			return RPC.rpcCall(
				"/file.FileService/UploadFile",
				obj,
				file.GetFileUploadResponse,
				(request) => {
					return file.GetFileUploadInput.encode(request).finish();
				},
				file.GetFileUploadResponse.decode
			);
		});
	}
}

export default FileServiceClient;
