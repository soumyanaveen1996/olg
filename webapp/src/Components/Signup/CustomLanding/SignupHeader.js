import React from "react";
import {
	VOYAGER_MAIN_HEADER_TEXT,
	VOYAGER_SUB_HEADER_TEXT,
	THURAYA_MAIN_HEADER_TEXT,
	THURAYA_SUB_HEADER_TEXT,
	THURAYA_T2M_MAIN_HEADER_TEXT,
	THURAYA_T2M_SUB_HEADER_TEXT,
	VOYAGER_LANDING,
	VIKAND_LANDING,
	VIKAND_DIRECT_LANDING,
	INTELL4DESK_LANDING,
	THURAYA_LANDING,
	THURAYA_T2M_LANDING,
	STATION_SATCOM_LANDING,
	STATION_SATCOM_MAIN_HEADER_TEXT,
	STATION_SATCOM_SUB_HEADER_TEXT,
	VIKAND_MAIN_HEADER_TEXT,
	INTELL4DESK_MAIN_HEADER_TEXT,
	VIKAND_SUB_HEADER_TEXT,
	INTELL4DESK_SUB_HEADER_TEXT,
	VIKAND_SIGNUP_SUB_HEADER_TEXT,
	VIKAND_DIRECT_MAIN_HEADER_TEXT,
} from "../../../Utils/Constants";
const SignupHeader = (props) => {
	const { landingPath } = props;
	let headerTextMain = "";
	let headerTextSub = "";

	switch (landingPath) {
		case VOYAGER_LANDING:
			headerTextMain = VOYAGER_MAIN_HEADER_TEXT;
			headerTextSub = VOYAGER_SUB_HEADER_TEXT;
			break;
		case VIKAND_LANDING:
			headerTextMain = VIKAND_MAIN_HEADER_TEXT;
			headerTextSub = VIKAND_SUB_HEADER_TEXT;
			break;
		case VIKAND_DIRECT_LANDING:
			headerTextMain = VIKAND_DIRECT_MAIN_HEADER_TEXT;
			headerTextSub = VIKAND_SUB_HEADER_TEXT;
			break;
		case INTELL4DESK_LANDING:
			headerTextMain = INTELL4DESK_MAIN_HEADER_TEXT;
			headerTextSub = INTELL4DESK_SUB_HEADER_TEXT;
			break;
		case THURAYA_LANDING:
			headerTextMain = THURAYA_MAIN_HEADER_TEXT;
			headerTextSub = THURAYA_SUB_HEADER_TEXT;
			break;
		case THURAYA_T2M_LANDING:
			headerTextMain = THURAYA_T2M_MAIN_HEADER_TEXT;
			headerTextSub = THURAYA_T2M_SUB_HEADER_TEXT;
			break;
		case STATION_SATCOM_LANDING:
			headerTextMain = STATION_SATCOM_MAIN_HEADER_TEXT;
			headerTextSub = STATION_SATCOM_SUB_HEADER_TEXT;
			break;
		default:
			headerTextMain = "";
			headerTextSub = "";
	}

	const headerTextMainFunc = (landingPath) => {
		if (
			landingPath === VIKAND_LANDING ||
			landingPath === VIKAND_DIRECT_LANDING ||
			landingPath === THURAYA_T2M_LANDING
		) {
			return <h3> {headerTextMain}</h3>;
		} else {
			return <h2> {headerTextMain}</h2>;
		}
	};
	const headerTextSubFunc = (landingPath) => {
		if (
			landingPath === VIKAND_LANDING ||
			landingPath === VIKAND_DIRECT_LANDING ||
			landingPath === THURAYA_T2M_LANDING
		) {
			return <h5> {headerTextSub} </h5>;
		} else {
			return <h3> {headerTextSub} </h3>;
		}
	};
	const headerSignupTextSubFunc = (landingPath) => {
		if (landingPath === THURAYA_T2M_LANDING) {
			return null;
		}
		if (
			landingPath === VIKAND_LANDING ||
			landingPath === VIKAND_DIRECT_LANDING
		) {
			return (
				<h3 style={{ marginTop: "30px" }}>{VIKAND_SIGNUP_SUB_HEADER_TEXT}</h3>
			);
		}
	};

	return (
		<div className="signup-box-header text-center">
			{headerTextMainFunc(landingPath)}

			<br />
			{headerTextSubFunc(landingPath)}

			{headerSignupTextSubFunc(landingPath)}
		</div>
	);
};

export default SignupHeader;
