import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { hideSnackbarV2 } from "../../../Store/Notification/NotificationAction";
import FMSnackbarComponent from "./FMSnackbarComponent";

const FMSnackbar = () => {
	const dispatch = useDispatch();
	const { Snackbar } = useSelector((state) => state.v2);

	const handleCloseSnackbar = () => {
		dispatch(hideSnackbarV2());
	};

	return (
		<FMSnackbarComponent
			handleCloseSnackbar={handleCloseSnackbar}
			{...Snackbar}
		/>
	);
};

export default FMSnackbar;
