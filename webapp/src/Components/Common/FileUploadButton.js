import React from "react";
import { Label } from "reactstrap";
import { connect } from "react-redux";
import { setSelectedFiles } from "../../State/actions/files";
import { styled } from "@mui/material/styles";
import Tooltip from '@mui/material/Tooltip';

const StyledFormGroup = styled("div")(() => ({
	marginBottom: "0px !important",
}));

class FileUploadButton extends React.PureComponent {
	setFiles = (e) => {
		let filesObj = e.target.files;
		if (!filesObj) {
			return;
		}
		let keys = Object.keys(filesObj);
		let files = [];
		keys.forEach((key) => {
			files.push(filesObj[key]);
		});
		this.props.setSelectedFiles(files);
		this.props.onFilesSet();
		// document.getElementById("fileBrowser").value = null;
	};
	render() {
		return (
			<div>
				<StyledFormGroup>
					<Label
						htmlFor="fileBrowser"
						style={{ padding: "0.5rem", cursor: "pointer" }}
					>
						<Tooltip title="File" placement="top">
							<i
								className="far fa-file-alt"
								style={{ color: "#cecfd3", fontSize: 19 }}
							/>
						</Tooltip>
					</Label>
					<input
						type="file"
						id="fileBrowser"
						name="customFile"
						onChange={this.setFiles}
						multiple={true}
						className="displayNone"
					/>
				</StyledFormGroup>
			</div>
		);
	}
}

const actions = {
	setSelectedFiles,
};

export default connect(null, actions)(FileUploadButton);
