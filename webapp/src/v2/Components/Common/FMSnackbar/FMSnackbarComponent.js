import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const FMSnackbarComponent = ({ severity, message, handleCloseSnackbar }) => {
	if (message && message.length !== 0) {
		return (
			<Snackbar
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				open={true}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
			>
				<Alert onClose={handleCloseSnackbar} severity={severity}>
					{message}
				</Alert>
			</Snackbar>
		);
	}
	return null;
};

export default FMSnackbarComponent;
