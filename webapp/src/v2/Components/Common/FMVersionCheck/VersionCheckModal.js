import React, { useState } from "react";
import { FRONTM_VERSION_CHECK_LOGO } from "../../../../Utils/Constants";
import "./versionCheck.css";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const ButtonStyles = styled(Button)(({ theme }) => ({
	textTransform: "none",
	margin: theme.spacing(2),
	marginLeft: "40%",
	marginRight: "40%",
	border: "none",
	padding: "7px 45px",
	borderRadius: 20,
	backgroundColor: "#638dff",
	color: "#FFFFFF",
	fontFamily: "SF Pro Text Bold",
	fontSize: 14,
	boxShadow: "none",
	"&:hover": {
		backgroundColor: "#4c71d6",
	},
	"&:focus": {
		boxShadow: "0 0 6px 0 #638dff !important",
	},
	"&:disabled": {
		backgroundColor: "#aeb8d6",
		color: "#e8ecf8",
	},
}));

const VersionCheckModal = () => {
	const frontMLogoForVersionCheck = FRONTM_VERSION_CHECK_LOGO;
	return (
		<div className="versionCheck_overall">
			<img src={frontMLogoForVersionCheck} className="versionCheck_logo" />
			<h1 className="versionCheck_mainHeading">FrontM has been updated</h1>
			<h2 className="versionCheck_subHeading">
				Please refresh to load the new version
			</h2>
			<ButtonStyles variant="contained">{"Refresh"}</ButtonStyles>
		</div>
	);
};

export default VersionCheckModal;
