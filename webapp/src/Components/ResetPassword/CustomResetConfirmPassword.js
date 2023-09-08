import React from "react";
import {
	FRONTM_SIGNUP_BACKGROUND,
	STATION_SATCOM_LANDING,
	STATION_SATCOM_RESET_BACKGROUND,
	THURAYA_LANDING,
	THURAYA_RESET_BACKGROUND,
	VOYAGER_LANDING,
	VIKAND_LANDING,
	VIKAND_DIRECT_LANDING,
	INTELL4DESK_LANDING,
	VOYAGER_SIGNUP_BACKGROUND,
	VIKAND_RESET_BACKGROUND,
	INTELL4DESK_RESET_BACKGROUND,
	ONSHIP_LANDING,
	VIKAND_DIRECT_RESET_BACKGROUND,
	ONSHIP_RESET_BACKGROUND,
	ONECARE_LANDING,
	ONECARE_RESET_BACKGROUND,
	SIGMA_LANDING,
	SIGMA_RESET_BACKGROUND,
} from "../../Utils/Constants";
import Error from "../Common/ErrorMessage";
import { Link } from "react-router-dom";

function CustomResetConfirmPassword(props) {
	const {
		email,
		error,
		code,
		password,
		onFormSubmit,
		setCode,
		modifyPassword,
		landingPath,
	} = props;
	let contentBackGround = "",
		resetBoxBackground = "",
		textColor = "",
		textBoxBackground = "",
		textBoxTextColor = "";

	let passwordHeading =
		landingPath == ONECARE_LANDING ? "New Password" : "Password";

	switch (landingPath) {
		case VOYAGER_LANDING:
			contentBackGround = VOYAGER_SIGNUP_BACKGROUND;
			resetBoxBackground = "#1F2630";
			textColor = "#fff";
			textBoxTextColor = "#fff";
			textBoxBackground = "#2B313B";
			break;
		case VIKAND_LANDING:
			contentBackGround = VIKAND_RESET_BACKGROUND;
			resetBoxBackground = "rgba(31, 38, 48, 0.7)";
			textColor = "#fff";
			textBoxTextColor = "black";
			textBoxBackground = "#fff";
			break;
		case VIKAND_DIRECT_LANDING:
			contentBackGround = VIKAND_DIRECT_RESET_BACKGROUND;
			resetBoxBackground = "rgba(31, 38, 48, 0.7)";
			textColor = "#fff";
			textBoxTextColor = "black";
			textBoxBackground = "#fff";
			break;
		case INTELL4DESK_LANDING:
			contentBackGround = INTELL4DESK_RESET_BACKGROUND;
			resetBoxBackground = "rgba(31, 38, 48, 0.7)";
			textColor = "#fff";
			textBoxTextColor = "black";
			textBoxBackground = "#fff";
			break;
		case THURAYA_LANDING:
			contentBackGround = THURAYA_RESET_BACKGROUND;
			resetBoxBackground = "rgba(31, 38, 48, 0.7)";
			textColor = "#fff";
			textBoxTextColor = "black";
			textBoxBackground = "#fff";
			break;
		case ONECARE_LANDING:
			contentBackGround = ONECARE_RESET_BACKGROUND;
			resetBoxBackground = "rgba(31, 38, 48, 0.7)";
			textColor = "#fff";
			textBoxTextColor = "black";
			textBoxBackground = "#fff";
			break;
		case SIGMA_LANDING:
			contentBackGround = SIGMA_RESET_BACKGROUND;
			resetBoxBackground = "rgba(31, 38, 48, 0.7)";
			textColor = "#fff";
			textBoxTextColor = "black";
			textBoxBackground = "#fff";
			break;
		case STATION_SATCOM_LANDING:
			contentBackGround = STATION_SATCOM_RESET_BACKGROUND;
			resetBoxBackground = "rgba(9,69,116, 0.7)";
			textColor = "#fff";
			textBoxTextColor = "black";
			textBoxBackground = "#fff";
			break;
		case ONSHIP_LANDING:
			contentBackGround = ONSHIP_RESET_BACKGROUND;
			resetBoxBackground = "rgba(9,69,116, 0.7)";
			textColor = "#fff";
			textBoxTextColor = "black";
			textBoxBackground = "#fff";
			break;

		default:
			contentBackGround = FRONTM_SIGNUP_BACKGROUND;
			resetBoxBackground = "#fff";
			textColor = "black";
			textBoxTextColor = "black";
			textBoxBackground = "#fff";
			break;
	}

	return (
		<div
			className="page-wrapper d-flex flex align-items-center"
			id="page-wrapper"
			style={{
				flex: 4,
				background: `url(${contentBackGround})`,
				backgroundSize: "cover",
				height: "100%",
				width: "100vw",
			}}
		>
			<div className="container">
				<div className="row align-self-center">
					<div className="col-lg-4 mr-auto ml-auto">
						<div
							className="rounded shadow-sm overflow-hidden"
							style={{ background: resetBoxBackground }}
						>
							<div className="row no-margin align-items-center">
								<div className="col-lg-12 no-padding text-center col-md-12">
									<h3
										className="pt-50 fs-2x font300 lineH-1 mb-0 h3-color"
										style={{ color: textColor }}
									>
										Reset your password
									</h3>

									<div className="p-5 mb-10" style={{ color: textColor }}>
										<div className="fs16 text-center">
											A verification code, with a 24 hour validity, has been
											sent to
										</div>
										<div className="font-weight-bold text-center">{email}</div>
									</div>

									<div className="p-2">
										<form
											role="form"
											onSubmit={onFormSubmit}
											autoComplete="off"
										>
											<div
												className="form-group pt-10 pb-10 d-flex flex-column justify-content-center align-content-center col-lg-5"
												style={{ marginLeft: "30%" }}
											>
												<input
													id="code"
													placeholder="- - - - - -"
													type="number"
													value={code}
													onChange={setCode}
													autoComplete="false"
													className="form-control-lg"
													style={{
														background: textBoxBackground,
														color: textBoxTextColor,
														height: "50px",
														textAlign: "center",
													}}
												/>
												{error && error === "Code is required" && (
													<Error message={error} />
												)}
											</div>
											<div className="form-group pl-3 pr-5 mb-40 text-left">
												<label
													htmlFor="inputPassword"
													style={{ color: textColor }}
												>
													{passwordHeading}
												</label>
												<input
													id="inputPassword"
													placeholder="Password"
													type="password"
													autoComplete="false"
													value={password}
													onChange={modifyPassword}
													className="form-control form-control-lg form-input-box-300 textBox-rev"
													style={{
														background: textBoxBackground,
														color: textBoxTextColor,
													}}
												/>
												{error && error === "Password field is required" && (
													<Error message={error} />
												)}
											</div>
											<div className="form-group code-form-group mb-20">
												<button
													type="submit"
													className="btn btn-primary btn-block btn-lg btn-icon code-btn"
												>
													Done
												</button>
											</div>
											<div style={{ textAlign: "center" }}>
												<Link
													to="/resetPassword"
													className="btn btn-text"
													style={{ textTransform: "none" }}
												>
													Review email address and send the code again
												</Link>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CustomResetConfirmPassword;
