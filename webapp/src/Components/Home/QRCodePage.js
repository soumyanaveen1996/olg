import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import QRCode from "react-qr-code";
import { Grid, Button, TextField, Typography } from "@mui/material";

const QRCodePage = (props) => {
	const signupObj = { ...props };
	const [otpToken, updateOtpToken] = useState("");
	const [qrCodeUrl, updateQRCodeUrl] = useState("");

	const signUpWithOTP = () => {
		console.log("signupObj ==>", signupObj);
	};
	return (
		<div
			className="page-wrapper d-flex flex flex-column container-fluid full-height"
			style={{ padding: "0px" }}
		>
			<div className="greenBackground">
				<div className="container">
					<div className="row align-self-center">
						<div className="col-lg-5 mr-auto ml-auto">
							<div
								className="bg-white rounded shadow-sm overflow-hidden"
								style={{ border: "1px solid rgba(44, 45, 58, 0.14)" }}
							>
								<div className="row no-margin align-items-center">
									<div className="col-lg-12 no-padding  col-md-12">
										<div className="p-4 text-dark text-center d-flex flex-column justify-content-between align-items-center">
											<img
												className="mb-40 mt-40"
												src="./img/security-icon.png"
												alt="security"
											/>
											<h2 className="fs26 font300 lineH-1 mb-0">
												Add extra security with
											</h2>
											<h2
												className="fs26 font300 lineH-1"
												style={{ marginBottom: "25px" }}
											>
												two-factor authentification
											</h2>
											<p className="fs16 font100 lineH-1 mb-30">
												Scan the code and enter the validation number
											</p>
											<Grid item xs={12}>
												<QRCode value={qrCodeUrl} />
											</Grid>
											<input
												id="optNumber"
												placeholder="OTP"
												type="number"
												className="form-control form-control-lg form-input-box mt-30"
												onChange={(e) => updateOtpToken(e.target.value)}
												value={otpToken}
											/>

											<button
												type="button"
												className="btn btn-open btn-lg btn-icon btn-block btn-custom mt-40"
												style={{ marginBottom: "110px" }}
												onClick={signUpWithOTP}
												disabled={false}
											>
												Done
											</button>

											<Link
												// to={{
												// 	pathname: "/login",
												// }}
												className="btn btn-text"
												style={{ textTransform: "none" }}
											>
												<span className="text-primary-active">
													May be later
												</span>
											</Link>
										</div>
									</div>
								</div>
							</div>
							<p className="pt-3 no-margin text-center text-muted">
								&copy; Copyright 2019, FrontM
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default QRCodePage;
