import React from "react";
import { useDispatch } from "react-redux";
import { setUserOnlineStatus } from "../../State/actions/user";
import { COLOR_TYPE_OFFLINE } from "../../Utils/Constants";
import { getDomainSelcted } from "../../Services/StorageService";
const SlowNetworkBanner = ({ BannerStyle, closeSlowInternetBanner }) => {
	const dispatch = useDispatch();
	const userCurrentDomain = getDomainSelcted();

	const handleChange = (event) => {
		dispatch(setUserOnlineStatus(event.target.checked));
		closeSlowInternetBanner();
	};

	let isThurayaDomain = false;
	if (
		userCurrentDomain?.name === "Thuraya Test" ||
		userCurrentDomain?.name === "T2M" ||
		userCurrentDomain?.name === "T2M Test" ||
		userCurrentDomain?.name === "THURAYA" ||
		userCurrentDomain?.name === "THURAYA TRACKER"
	) {
		isThurayaDomain = true;
	}

	return (
		<div
			style={Object.assign(
				{ backgroundColor: COLOR_TYPE_OFFLINE, color: "#696969" },
				BannerStyle.BannerBackgroundStyle
			)}
		>
			{!isThurayaDomain ? (
				<span style={{ padding: "0 10px" }}>
					You are working on a slow connection, would you like to set yourself
					offline?{" "}
					<u onClick={handleChange} style={{ cursor: "pointer" }}>
						Set Offline
					</u>
				</span>
			) : (
				<span style={{ padding: "0 10px" }}>
					You are working on a slow connection.
				</span>
			)}
		</div>
	);
};

export default SlowNetworkBanner;
