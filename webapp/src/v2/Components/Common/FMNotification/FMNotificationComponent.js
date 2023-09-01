import React, { useState, useEffect } from "react";
import {
	Dialog,
	Button,
	DialogActions,
	DialogContent,
	DialogContentText,
} from "@mui/material";
import ErrorIcon from "@mui/icons-material/ErrorOutline";
import InfoIcon from "@mui/icons-material/Info";
import _ from "lodash";
import parse from "html-react-parser";
import { styled } from "@mui/material/styles";

import { MessageTypeConstants } from "../../../../Services/Message";

const InfoIconBlock = styled(InfoIcon)(({ theme }) => ({
	verticalAlign: "top",
	marginRight: 10,
	color: theme.palette.info.main,
}));

const ErrorIconBlock = styled(ErrorIcon)(({ theme }) => ({
	verticalAlign: "top",
	marginRight: 10,
	color: theme.palette.error.main,
}));

const DialogActionStyle = styled(DialogActions)(({ theme }) => ({
	padding: "20px 24px",
}));

const MainButton = styled(Button)(() => ({
	border: "none",
	padding: "7px 45px",
	borderRadius: 20,
	textTransform: "inherit",
	"&:hover": {
		border: "none",
	},
}));

const CancelButton = styled(MainButton)(() => ({
	backgroundColor: "#e0e8ff",
	color: "#638dff",
	border: "none",
	fontFamily: "SF Pro Text Bold",
	fontSize: 14,
	boxShadow: "none",
	"&:hover": {
		backgroundColor: "#eef2ff",
	},
	"&:focus": {
		boxShadow: "0 0 6px 0 rgba(99, 141, 255, 0.6)",
		backgroundColor: "#eef2ff",
	},
	"&:disabled": {
		backgroundColor: "#e8ecf8",
		color: "#aeb8d6",
		border: "none",
	},
}));

const ConfirmButton = styled(MainButton)(() => ({
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

const FMNotificationComponent = ({
	message,
	messageType,
	handleClose,
	handleAction,
}) => {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (!_.isEmpty(message)) {
			setOpen(true);
		} else {
			setOpen(false);
		}
	}, [message]);

	const handleDialogClose = () => {
		setOpen(false);
		handleClose();
	};

	return (
		<Dialog
			open={open}
			onClose={handleDialogClose}
			disableEscapeKeyDown
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					{messageType ===
						MessageTypeConstants.MESSAGE_TYPE_STD_NOTIFICATION && (
						<InfoIconBlock />
					)}
					{messageType ===
						MessageTypeConstants.MESSAGE_TYPE_CRITICAL_NOTIFICATION && (
						<ErrorIconBlock />
					)}
					{(messageType ===
						MessageTypeConstants.MESSAGE_TYPE_STD_NOTIFICATION ||
						messageType ===
							MessageTypeConstants.MESSAGE_TYPE_CRITICAL_NOTIFICATION) &&
						parse(message)}
					{messageType ===
						MessageTypeConstants.MESSAGE_TYPE_AUTHORIZATION_REQUEST &&
						parse(message?.message)}
				</DialogContentText>
			</DialogContent>
			<DialogActionStyle>
				{messageType ===
				MessageTypeConstants.MESSAGE_TYPE_AUTHORIZATION_REQUEST ? (
					<>
						<CancelButton
							onClick={() => {
								setOpen(false);
								handleAction("cancel");
							}}
							color="primary"
							variant="outlined"
						>
							{message?.cancel}
						</CancelButton>
						<ConfirmButton
							onClick={() => {
								setOpen(false);
								handleAction("confirm");
							}}
							color="primary"
							variant="outlined"
							autoFocus
						>
							{message?.confirm}
						</ConfirmButton>
					</>
				) : (
					<ConfirmButton
						onClick={handleDialogClose}
						variant="outlined"
						color="primary"
					>
						Ok
					</ConfirmButton>
				)}
			</DialogActionStyle>
		</Dialog>
	);
};

export default FMNotificationComponent;
