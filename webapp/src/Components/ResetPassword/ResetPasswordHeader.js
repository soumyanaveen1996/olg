import React from "react";
import {
	POWERED_BY_LOGO,
	STATION_SATCOM_LANDING,
	STATION_SATCOM_LOGO,
	STATION_SATCOM_LOGO_ALT,
	THURAYA_LANDING,
	THURAYA_LOGO,
	THURAYA_LOGO_ALT,
	VOYAGER_LANDING,
	VIKAND_LANDING,
	VIKAND_DIRECT_LANDING,
	INTELL4DESK_LANDING,
	VOYAGER_LOGO,
	VOYAGER_LOGO_ALT,
	VIKAND_LOGO,
	INTELL4DESK_LOGO,
	VIKAND_LOGO_ALT,
	INTELL4DESK_LOGO_ALT,
	FRONTM_LOGO_ALT,
	FRONTM_LOGO,
	VIKAND_DIRECT_LOGO,
	ONSHIP_LANDING,
	ONSHIP_SIGNUP_LANDING,
	ONSHIP_LOGO,
	ONSHIP_LOGO_ALT,
	THURAYA_T2M_LANDING,
	THURAYA_T2M_SIGNUP_LANDING,
	THURAYA_T2M_LOGO,
	THURAYA_T2M_LOGO_ALT,
	ONECARE_LANDING,
	ONECARE_LOGO,
	ONECARE_LOGO_ALT,
	SIGMA_LANDING,
	SIGMA_LOGO,
	SIGMA_LOGO_ALT,
} from "../../Utils/Constants";

function ResetPasswordHeader(props) {
	const { landingPath } = props;
	let headerBackgroundColor = "#fff",
		logoSrc = "",
		logoAlt = "",
		width = "150px",
		height = "60px";

	switch (landingPath) {
		case VOYAGER_LANDING:
			headerBackgroundColor = "#212529";
			logoSrc = VOYAGER_LOGO;
			logoAlt = VOYAGER_LOGO_ALT;
			height = "100px";
			break;
		case VIKAND_LANDING:
			headerBackgroundColor = "#fff";
			logoSrc = VIKAND_LOGO;
			logoAlt = VIKAND_LOGO_ALT;
			width = "auto";
			height = "100px";
			break;
		case VIKAND_DIRECT_LANDING:
			headerBackgroundColor = "#fff";
			logoSrc = VIKAND_DIRECT_LOGO;
			logoAlt = VIKAND_LOGO_ALT;
			width = "auto";
			height = "100px";
			break;
		case INTELL4DESK_LANDING:
			headerBackgroundColor = "#fff";
			logoSrc = INTELL4DESK_LOGO;
			logoAlt = INTELL4DESK_LOGO_ALT;
			height = "100px";
			break;
		case THURAYA_LANDING:
			headerBackgroundColor = "#fff";
			logoSrc = THURAYA_LOGO;
			logoAlt = THURAYA_LOGO_ALT;
			width = "350px";
			height = "85px";
			break;
		case STATION_SATCOM_LANDING:
			headerBackgroundColor = "#fff";
			logoSrc = STATION_SATCOM_LOGO;
			logoAlt = STATION_SATCOM_LOGO_ALT;
			break;
		case ONECARE_LANDING:
			headerBackgroundColor = "#fff";
			logoSrc = ONECARE_LOGO;
			logoAlt = ONECARE_LOGO_ALT;
			height = "100px";
			break;
		case SIGMA_LANDING:
			headerBackgroundColor = "#fff";
			logoSrc = SIGMA_LOGO;
			logoAlt = SIGMA_LOGO_ALT;
			height = "100px";
			break;
		case ONSHIP_LANDING:
		case ONSHIP_SIGNUP_LANDING:
			headerBackgroundColor = "#fff";
			logoSrc = ONSHIP_LOGO;
			logoAlt = ONSHIP_LOGO_ALT;
			width = "160px";
			height = "110px";
			break;
		case THURAYA_T2M_LANDING:
		case THURAYA_T2M_SIGNUP_LANDING:
			headerBackgroundColor = "#fff";
			logoSrc = THURAYA_T2M_LOGO;
			logoAlt = THURAYA_T2M_LOGO_ALT;
			width = "350px";
			height = "85px";
			break;
		default:
			logoSrc = FRONTM_LOGO;
			logoAlt = FRONTM_LOGO_ALT;
			width = "200px";
			height = "75px";
			break;
	}

	return (
		<div
			className="d-flex justify-content-start"
			style={{
				backgroundColor: headerBackgroundColor,
				width: "100vw",
				height: "100px",
			}}
		>
			<img
				className="p-2"
				src={logoSrc}
				width={width}
				height={height}
				alt={logoAlt}
			/>
		</div>
	);
}

export default ResetPasswordHeader;
