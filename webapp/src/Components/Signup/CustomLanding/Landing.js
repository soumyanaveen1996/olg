import React, { Component } from "react";
import LoginContainer from "../../../Containers/LoginContainer";
import CorporateLogo from "./CorporateLogo";
import CorporateCustomSignup from "./CorporateCustomSignup";
import LoginWelcomeText from "./LoginWelcomeText";
import {
	STATION_SATCOM_LANDING,
	STATION_SATCOM_LOGIN_BACKGROUND,
	STATION_SATCOM_SIGNUP_BACKGROUND,
	THURAYA_LANDING,
	THURAYA_LOGIN_BACKGROUND,
	THURAYA_SIGNUP_BACKGROUND,
	VOYAGER_LANDING,
	VIKAND_LANDING,
	VIKAND_DIRECT_LANDING,
	INTELL4DESK_LANDING,
	VOYAGER_LOGIN_BACKGROUND,
	VOYAGER_SIGNUP_BACKGROUND,
	VIKAND_SIGNUP_BACKGROUND,
	INTELL4DESK_SIGNUP_BACKGROUND,
	VIKAND_LOGIN_BACKGROUND,
	INTELL4DESK_LOGIN_BACKGROUND,
	VIKAND_DIRECT_SIGNUP_BACKGROUND,
	ONSHIP_LANDING,
	ONELEARN_LANDING,
	ONSHIP_LOGIN_BACKGROUND,
	ONSHIP_SIGNUP_BACKGROUND,
	THURAYA_T2M_LANDING,
	THURAYA_T2M_SIGNUP_BACKGROUND,
	THURAYA_T2M_LOGIN_BACKGROUND,
	POWERED_BY,
	POWERED_BY_LOGO,
	POWERED_BY_LOGO_T2M,
	POWERED_BY_B_N_W,
	ONECARE_LANDING,
	ONECARE_SIGNUP_BACKGROUND,
	SIGMA_LANDING,
	SIGMA_LOGIN_BACKGROUND,
	SIGMA_SIGNUP_BACKGROUND,
	ONELEARN_BACKGROUND,
} from "../../../Utils/Constants";
import HomeSlidesNavigation from "../../Home/HomeSlidesNavigation";

const Landing = (props) => {
	const { landingPath } = props;
	let signupBackground = "",
		loginBackground = "",
		poweredBy = null,
		bgPosition = "",
		poweredByTop = null,
		marginTopCustom = 0,
		noImage = false;

	switch (landingPath) {
		case VOYAGER_LANDING:
			signupBackground = VOYAGER_SIGNUP_BACKGROUND;
			loginBackground = VOYAGER_LOGIN_BACKGROUND;
			break;
		case VIKAND_LANDING:
			signupBackground = VIKAND_SIGNUP_BACKGROUND;
			loginBackground = VIKAND_LOGIN_BACKGROUND;
			bgPosition = "bottom";
			break;
		case VIKAND_DIRECT_LANDING:
			signupBackground = VIKAND_DIRECT_SIGNUP_BACKGROUND;
			loginBackground = VIKAND_LOGIN_BACKGROUND;
			bgPosition = "center";
			break;
		case INTELL4DESK_LANDING:
			signupBackground = INTELL4DESK_SIGNUP_BACKGROUND;
			loginBackground = INTELL4DESK_LOGIN_BACKGROUND;
			bgPosition = "bottom";
			break;
		case THURAYA_LANDING:
			signupBackground = THURAYA_SIGNUP_BACKGROUND;
			loginBackground = THURAYA_LOGIN_BACKGROUND;
			poweredBy = POWERED_BY;
			bgPosition = "center";
			break;
		case STATION_SATCOM_LANDING:
			signupBackground = STATION_SATCOM_SIGNUP_BACKGROUND;
			loginBackground = STATION_SATCOM_LOGIN_BACKGROUND;
			poweredBy = POWERED_BY;

			break;
		case ONECARE_LANDING:
			signupBackground = ONECARE_SIGNUP_BACKGROUND;
			loginBackground = ONECARE_SIGNUP_BACKGROUND;
			poweredByTop = POWERED_BY;
			marginTopCustom = "-20px";
			break;
		case ONSHIP_LANDING:
			signupBackground = ONSHIP_SIGNUP_BACKGROUND;
			loginBackground = ONSHIP_LOGIN_BACKGROUND;
			bgPosition = "center";
			poweredBy = POWERED_BY;
			break;
		case ONELEARN_LANDING:
			signupBackground = ONELEARN_BACKGROUND;
			loginBackground = ONELEARN_BACKGROUND;
			bgPosition = "top";
			poweredBy = POWERED_BY;
			break;
		case SIGMA_LANDING:
			signupBackground = SIGMA_SIGNUP_BACKGROUND;
			loginBackground = SIGMA_LOGIN_BACKGROUND;
			bgPosition = "center";
			poweredBy = POWERED_BY;
			break;
		case THURAYA_T2M_LANDING:
			signupBackground = THURAYA_T2M_SIGNUP_BACKGROUND;
			loginBackground = THURAYA_T2M_LOGIN_BACKGROUND;
			poweredBy = POWERED_BY;
			bgPosition = "center";
			break;
	}
	const noSignUp = [
		ONSHIP_LANDING,
		ONELEARN_LANDING,
		THURAYA_T2M_LANDING,
		STATION_SATCOM_LANDING,
		ONECARE_LANDING,
		SIGMA_LANDING,
		VIKAND_DIRECT_LANDING,
	];
	return (
		<div
			className="d-flex flex overflow-hidden"
			style={{
				backgroundColor: loginBackground,
				height: "100%",
			}}
		>
			<div style={{ flex: 2 }} className="d-flex flex-column">
				<CorporateLogo landingPath={landingPath} />
				<div
					className="d-flex align-items-center flex-column mx-4 p-4"
					style={{ flex: 4 }}
				>
					{poweredByTop && (
						<a
							href="https://frontm.com/"
							className="d-flex justify-content-center p-2 align-items-center"
							style={{ marginTop: marginTopCustom }}
						>
							{/* <span style={{ fontSize: "18px", fontWeight: "600" }}>
								{poweredBy}
							</span>{" "} */}
							<img src={POWERED_BY_LOGO_T2M} alt="frontm-logo" width="220px" />
						</a>
					)}
					<LoginWelcomeText landingPath={landingPath} />
					<LoginContainer {...props} />
					{/* {props.fromCarousel && (
						<HomeSlidesNavigation
							previous={props.previous}
							next={props.next}
							activeIndex={props.activeIndex}
							goTo={props.goTo}
							loginPage
						/>
					)} */}

					{poweredBy && (
						<a
							href="https://frontm.com/"
							className="d-flex justify-content-center p-2 align-items-center"
							style={{ position: "absolute", bottom: "10px" }}
						>
							{/* <span style={{ fontSize: "18px", fontWeight: "600" }}>
								{poweredBy}
							</span>{" "} */}
							<img
								src={
									landingPath === ONSHIP_LANDING
										? POWERED_BY_B_N_W
										: POWERED_BY_LOGO_T2M
								}
								alt="frontm-logo"
								width={landingPath === ONSHIP_LANDING ? "150px" : " 220px"}
							/>
						</a>
					)}
				</div>
			</div>
			{!noImage && (
				<div
					style={{
						flex: 4,
						backgroundImage: `url(${signupBackground})`,
						backgroundColor: "#444444",
						height: "100%",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						backgroundPosition: bgPosition,
						boxShadow: "2px 2px 10px -4px rgba(74,74,74,1)",
						backgroundRepeat: "no-repeat",
						backgroundSize: "cover",
					}}
				>
					{!noSignUp.includes(landingPath) && (
						<CorporateCustomSignup {...props} />
					)}
				</div>
			)}
		</div>
	);
};

export default Landing;
