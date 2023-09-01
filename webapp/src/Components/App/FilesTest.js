import React from "react";
import { getNewFileUsingUrl } from "../../Services/NewFilesService";

export default class FilesTest extends React.PureComponent {
	render() {
		return (
			<div style={{ margin: "auto" }}>
				<a onClick={getNewFileUsingUrl}>Download file</a>
			</div>
		);
	}
}
