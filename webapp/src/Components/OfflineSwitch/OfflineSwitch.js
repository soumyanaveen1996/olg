import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserOnlineStatus } from "../../State/actions/user";
import {
	setUserOnline,
	setUserManualOnline,
	isUserManualOnline,
} from "../../Services/StorageService";

const getOnLineStatus = () =>
	typeof navigator !== "undefined" && typeof navigator.onLine === "boolean"
		? navigator.onLine
		: true;

const OfflineSwitch = () => {
	const dispatch = useDispatch();
	const isUserOnline = useSelector((state) => state.user.isOnline);
	const [status, setStatus] = React.useState(getOnLineStatus());

	const handleChange = (event) => {
		setUserManualOnline(event.target.checked);
		setUserOnline(event.target.checked);
		dispatch(setUserOnlineStatus(event.target.checked));
	};

	useEffect(() => {
		// setTimeout(() => axios
		// 	.get(`https://cataas.com/c`)
		// 	.then((res) => {
		// 	})
		// 	.catch((err) => {
		//    setStatus(false);
		// 	}), 1000);
		if (isUserManualOnline()) {
			dispatch(setUserOnlineStatus(status));
		} else if (isUserManualOnline() && !isUserOnline) {
			dispatch(setUserOnlineStatus(false));
		}
	}, [navigator.onLine, status]);

	const setOnline = () => setStatus(true);
	const setOffline = () => setStatus(false);

	useEffect(() => {
		window.addEventListener("online", setOnline);
		window.addEventListener("offline", setOffline);

		return () => {
			window.removeEventListener("online", setOnline);
			window.removeEventListener("offline", setOffline);
		};
	}, []);

	return (
		// <FormGroup row className="d-flex align-items-center">
		// 	<FormControlLabel
		// 		className="m-0 mr-4"
		// 		classes={classes}
		// 		control={
		// 			<Switch
		// 				classes={classes}
		// 				checked={isUserOnline}
		// 				onChange={handleChange}
		// 				color="primary"
		// 				size="small"
		// 				disabled={!navigator.onLine}
		// 			/>
		// 		}
		// 		label={isUserOnline ? "Online" : "Offline"}
		// 	/>
		// </FormGroup>
		<></>
	);
};

export default OfflineSwitch;
