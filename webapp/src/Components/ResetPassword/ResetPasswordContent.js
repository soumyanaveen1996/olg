import React from "react";
import clsx from "clsx";
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
	VIKAND_DIRECT_RESET_BACKGROUND,
	ONSHIP_LANDING,
	ONSHIP_RESET_BACKGROUND,
	THURAYA_T2M_LANDING,
	THURAYA_T2M_RESET_BACKGROUND,
	THURAYA_T2M_SIGNUP_LANDING,
	ONECARE_LANDING,
	ONECARE_RESET_BACKGROUND,
	SIGMA_LANDING,
	SIGMA_RESET_BACKGROUND,
} from "../../Utils/Constants";
import Error from "../Common/ErrorMessage";

function ResetPasswordContent(props) {
	const { email, error, handleGoBack, handleSubmit, changeEmail, landingPath } =
		props;

	let contentBackGround = "",
		resetBoxBackground = "",
		textColor = "",
		textBoxBackground = "",
		textBoxTextColor = "",
		backgroundPosition = "bottom";

	switch (landingPath) {
		case VOYAGER_LANDING:
			contentBackGround = VOYAGER_SIGNUP_BACKGROUND;
			resetBoxBackground = "#1F2630";
			textColor = "#fff";
			textBoxTextColor = "#fff";
			textBoxBackground = "#2B313B";
			backgroundPosition = "bottom";
			break;
		case VIKAND_LANDING:
			contentBackGround = VIKAND_RESET_BACKGROUND;
			resetBoxBackground = "rgba(31, 38, 48, 0.7)";
			textColor = "#fff";
			textBoxTextColor = "black";
			textBoxBackground = "#fff";
			backgroundPosition = "bottom";
			break;
		case VIKAND_DIRECT_LANDING:
			contentBackGround = VIKAND_DIRECT_RESET_BACKGROUND;
			resetBoxBackground = "rgba(31, 38, 48, 0.7)";
			textColor = "#fff";
			textBoxTextColor = "black";
			textBoxBackground = "#fff";
			backgroundPosition = "bottom";
			break;
		case INTELL4DESK_LANDING:
			contentBackGround = INTELL4DESK_RESET_BACKGROUND;
			resetBoxBackground = "rgba(31, 38, 48, 0.7)";
			textColor = "#fff";
			textBoxTextColor = "black";
			textBoxBackground = "#fff";
			backgroundPosition = "bottom";
			break;
		case THURAYA_LANDING:
			contentBackGround = THURAYA_RESET_BACKGROUND;
			resetBoxBackground = "rgba(31, 38, 48, 0.7)";
			textColor = "#fff";
			textBoxTextColor = "black";
			textBoxBackground = "#fff";
			backgroundPosition = "bottom";
			break;
		case ONECARE_LANDING:
			contentBackGround = ONECARE_RESET_BACKGROUND;
			resetBoxBackground = "rgba(31, 38, 48, 0.7)";
			textColor = "#fff";
			textBoxTextColor = "black";
			textBoxBackground = "#fff";
			backgroundPosition = "bottom";
			break;
		case STATION_SATCOM_LANDING:
			contentBackGround = STATION_SATCOM_RESET_BACKGROUND;
			resetBoxBackground = "rgba(9,69,116, 0.7)";
			textColor = "#fff";
			textBoxTextColor = "black";
			textBoxBackground = "#fff";
			backgroundPosition = "bottom";
			break;
		case ONSHIP_LANDING:
			contentBackGround = ONSHIP_RESET_BACKGROUND;
			resetBoxBackground = "rgba(9,69,116, 0.7)";
			textColor = "#fff";
			textBoxTextColor = "black";
			textBoxBackground = "#fff";
			break;

		case SIGMA_LANDING:
			contentBackGround = SIGMA_RESET_BACKGROUND;
			resetBoxBackground = "rgba(9,69,116, 0.7)";
			textColor = "#fff";
			textBoxTextColor = "black";
			textBoxBackground = "#fff";
			break;

		case THURAYA_T2M_SIGNUP_LANDING:
		case THURAYA_T2M_LANDING:
			contentBackGround = THURAYA_T2M_RESET_BACKGROUND;
			resetBoxBackground = "rgba(31, 38, 48, 0.7)";
			textColor = "#fff";
			textBoxTextColor = "black";
			textBoxBackground = "#fff";
			backgroundPosition = "bottom";
			break;
		default:
			contentBackGround = FRONTM_SIGNUP_BACKGROUND;
			resetBoxBackground = "#fff";
			textColor = "black";
			textBoxTextColor = "black";
			textBoxBackground = "#fff";
			backgroundPosition = "bottom";
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
				backgroundPosition: backgroundPosition,
				height: "auto",
				width: "100%",
				boxShadow: "2px 2px 10px -4px rgba(74,74,74,1)",
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
										<span className="fs16" style={{ textAlign: "justify" }}>
											Please enter your email address and we will send you
											instructions to reset your password.
										</span>
									</div>

									<div className="p-2">
										<form
											role="form"
											style={{
												display: "flex",
												flexDirection: "column",
												alignItems: "center",
											}}
										>
											<div className="form-group mb-40 text-left">
												<label
													htmlFor="email-reset"
													style={{ color: textColor }}
												>
													Email
												</label>
												<input
													id="email-reset"
													placeholder="email@example.com"
													type="email"
													value={email}
													onChange={changeEmail}
													className="form-control form-control-lg form-input-box-300 textBox-rev"
													style={{
														background: textBoxBackground,
														color: textBoxTextColor,
													}}
												/>
												{error && <Error message={error} />}
											</div>
											<div className="form-group code-form-group mb-20">
												<button
													onClick={handleSubmit}
													className="btn btn-primary btn-block btn-lg btn-icon code-btn"
												>
													Submit
												</button>
											</div>
											<div
												style={{ textAlign: "center", marginBottom: "40px" }}
											>
												{/* <a className="back-to-login">
                              Already have an account? Log in
                            </a> */}
												<button
													onClick={handleGoBack}
													className="btn btn-text"
													style={{
														textTransform: "none",
														background: "none",
														color: "white",
														textDecoration: "underline",
														fontSize: "16px",
														fontWeight: "500",
													}}
												>
													Go back to the log in screen{" "}
													<i className="icon-arrow-right" />
												</button>
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

export default ResetPasswordContent;
