import React from "react";
import { COLOR_TYPE_OFFLINE } from "../../Utils/Constants";

const OfflineBanner = ({ BannerStyle }) => {
	return (
		<div
			style={Object.assign(
				{ backgroundColor: COLOR_TYPE_OFFLINE, color: "#696969" },
				BannerStyle.BannerBackgroundStyle
			)}
		>
			<span style={{ padding: "0 10px" }}>
				You are offline. Some functionalities are not available.
			</span>
		</div>
	);
};

export default OfflineBanner;
