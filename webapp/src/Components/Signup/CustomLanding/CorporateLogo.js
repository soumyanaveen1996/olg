import React from "react";
import {
	VOYAGER_LANDING,
	VIKAND_LANDING,
	VIKAND_DIRECT_LANDING,
	INTELL4DESK_LANDING,
	THURAYA_LANDING,
	VIKAND_LOGO,
	INTELL4DESK_LOGO,
	VIKAND_LOGO_ALT,
	INTELL4DESK_LOGO_ALT,
	VOYAGER_LOGO,
	VOYAGER_LOGO_ALT,
	THURAYA_LOGO,
	THURAYA_LOGO_ALT,
	STATION_SATCOM_LANDING,
	STATION_SATCOM_LOGO,
	STATION_SATCOM_LOGO_ALT,
	ONECARE_LOGO,
	ONECARE_LOGO_ALT,
	POWERED_BY,
	POWERED_BY_LOGO,
	THURAYA_ICON,
	VIKAND_DIRECT_LOGO,
	THURAYA_URL,
	ONSHIP_LANDING,
	ONSHIP_LOGO,
	ONSHIP_LOGO_ALT,
	THURAYA_T2M_LANDING,
	THURAYA_T2M_LOGO,
	THURAYA_T2M_ICON,
	THURAYA_T2M_LOGO_ALT,
	THURAYA_T2M_URL,
	ONECARE_LANDING,
	SIGMA_LANDING,
	SIGMA_LOGO,
	SIGMA_LOGO_ALT,
	ONELEARN_LANDING,
	ONELEARN_LOGO,
	ONELEARN_LOGO_ALT,
} from "../../../Utils/Constants";
function CorporateLogo(props) {
	const { landingPath } = props;
	let src = "",
		url = "",
		srcIcon = "",
		alt = "",
		width = 200,
		height = "auto",
		poweredBy = null;
	switch (landingPath) {
		case VOYAGER_LANDING:
			src = VOYAGER_LOGO;
			alt = VOYAGER_LOGO_ALT;
			width = 400;
			break;
		case VIKAND_LANDING:
			src = VIKAND_LOGO;
			alt = VIKAND_LOGO_ALT;
			break;
		case VIKAND_DIRECT_LANDING:
			src = VIKAND_DIRECT_LOGO;
			alt = VIKAND_LOGO_ALT;
			break;
		case INTELL4DESK_LANDING:
			src = INTELL4DESK_LOGO;
			alt = INTELL4DESK_LOGO_ALT;
			poweredBy = POWERED_BY;
			break;
		case THURAYA_LANDING:
			src = THURAYA_LOGO;
			url = THURAYA_URL;
			srcIcon = THURAYA_ICON;
			alt = THURAYA_LOGO_ALT;
			width = 400;
			//poweredBy = POWERED_BY;
			break;
		case STATION_SATCOM_LANDING:
			src = STATION_SATCOM_LOGO;
			alt = STATION_SATCOM_LOGO_ALT;
			break;
		case ONECARE_LANDING:
			src = ONECARE_LOGO;
			alt = ONECARE_LOGO_ALT;
			break;
		case ONELEARN_LANDING:
			src = ONELEARN_LOGO;
			alt = ONELEARN_LOGO_ALT;
			break;
		case SIGMA_LANDING:
			src = SIGMA_LOGO;
			alt = SIGMA_LOGO_ALT;
			break;
		case ONSHIP_LANDING:
			src = ONSHIP_LOGO;
			alt = ONSHIP_LOGO_ALT;
			width = "180px";
			height = "auto";
			break;
		case THURAYA_T2M_LANDING:
			src = THURAYA_T2M_LOGO;
			alt = THURAYA_T2M_LOGO_ALT;
			url = THURAYA_T2M_URL;
			srcIcon = THURAYA_T2M_ICON;
			width = 400;
			height = "auto";
			break;
	}

	return (
		<div
			className="d-flex justify-content-center p-2 align-items-center"
			style={{ flex: 0.5 }}
		>
			<span className="logo-text d-flex align-items-center flex-column">
				{/* {landingPath === THURAYA_LANDING ? (
					<div
						className="d-flex flex-row justify-content-center align-items-center"
						style={{ cursor: "pointer" }}
						onClick={() => window.open(url, "_blank")}
					>
						<img className="pt-2 pl-2" src={srcIcon} width="100px" alt={alt} />
						<img
							className="pt-2 "
							src={src}
							width={width}
							height="70px"
							alt={alt}
						/>
					</div>
				) : (
					<img
						className="pt-2 pl-2"
						src={src}
						width={width}
						height={height}
						alt={alt}
					/>
				)} */}
				<img
					className="pt-4 pl-2"
					src={src}
					width={width}
					height={height}
					alt={alt}
				/>
				{poweredBy && (
					<a
						href="https://frontm.com/"
						className="d-flex justify-content-center p-2 align-items-center"
					>
						<span style={{ fontSize: "18px", fontWeight: "600" }}>
							{poweredBy}
						</span>{" "}
						<img src={POWERED_BY_LOGO} alt="frontm-logo" width="100px" />
					</a>
				)}
			</span>
		</div>
	);
}

export default CorporateLogo;
