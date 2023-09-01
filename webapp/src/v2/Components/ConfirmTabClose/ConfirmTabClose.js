import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";

import { styled } from "@mui/material/styles";

const ButtonPrimeBtn = styled(Button)(({ theme }) => ({
	color: "#f50057",
	backgroundColor: "#f8bbd0",
}));

const ButtonSecondBtn = styled(Button)(({ theme }) => ({
	color: "#00a7d6",
	backgroundColor: "#bbdefb",
}));

const StyledAlert = styled(Alert)(() => ({
	"& .MuiAlert-icon": {
		display: "flex",
		alignItems: "center",
	}
}));

const ConfirmTabClose = ({
	confirmTabCloseModal = null,
	setConfirmTabCloseModal,
	handleCloseApp,
}) => {
	return (
		<Dialog
			open={confirmTabCloseModal === null ? false : true}
			disableEscapeKeyDown
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">
				Discard changes and close {confirmTabCloseModal?.options?.title}
			</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					<StyledAlert severity="warning">
						You have unsaved changes that will be lost if you close this tab. Are you sure you want to proceed?
					</StyledAlert>
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<ButtonSecondBtn onClick={() => setConfirmTabCloseModal(null)}>
					No, keep editing
				</ButtonSecondBtn>
				<ButtonPrimeBtn
					onClick={() => handleCloseApp(confirmTabCloseModal)}
					autoFocus
				>
					Yes, discard changes
				</ButtonPrimeBtn>
			</DialogActions>
		</Dialog>
	);
};

export default ConfirmTabClose;
