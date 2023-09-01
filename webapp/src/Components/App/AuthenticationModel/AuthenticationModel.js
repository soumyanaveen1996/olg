import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Button, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import ModalPopup from "../../ModalMessages/ModalPopup";
import AuthServiceClient from "../../../Services/Clients/AuthServiceClient";
import appType from "./../../../Utils/ApiConfig";
import { updateMFAStatus } from "./../../../State/actions/catalogue";
import history from "../../../Services/History";
import {
	getAuthData,
	getDomainSelcted,
	storeAuthData,
} from "./../../../Services/StorageService";
import {
	updateQrCodeUri,
	updateSoftwareMfaStatus,
	updateSoftwareMfaEnabled,
} from "../../../State/actions/user";

const GridMainContainer = styled(Grid)(({ theme }) => ({
	flexGrow: 1,
	textAlign: "center",
	padding: theme.spacing(3),
	justifyContent: "center",
	flexDirection: "column",
}));

const Subtitle = styled(Typography)(() => ({
	fontWeight: 600,
}));

const ButtonGrid = styled("div")(() => ({
	display: "flex",
	justifyContent: "space-evenly",
}));

const GoogleBtn = styled(Button)(() => ({
	textTransform: "inherit",
	backgroundColor: "#dd4b39",
	color: "white",
	"&:hover": { backgroundColor: "#fff", color: "#dd4b39" },
}));

const AuthBtn = styled(Button)(() => ({
	width: "210px",
}));

const AuthenticationModel = (props) => {
	let { number = "*******XXX", loginState, mfaBotId, userEmail } = props;

	const platform = "web";
	const dispatch = useDispatch();
	const softwareMfaStatus = useSelector(
		(state) => state.user.softwareMfaStatus
	);
	const bot = useSelector(
		(state) => state.chats.selectedConversation?.bot || null
	);

	const [progressStatus, setprogressStatus] = useState(null);
	const [qrCodeUrl, updateQRCodeUrlState] = useState(null);
	const [password, updatePassword] = useState("");
	const [otpToken, updateOtpToken] = useState("");
	const [errorMsg, updateErrorMsg] = useState(null);

	useEffect(() => {
		if (loginState === "google") {
			setprogressStatus("socialLogin");
		}
	}, [loginState]);
	useEffect(() => {
		setprogressStatus(softwareMfaStatus);
	}, [softwareMfaStatus]);

	useEffect(() => {
		updatePassword("");
		updateOtpToken("");
	}, [errorMsg]);

	const closeModal = () => {
		updateErrorMsg(null);
		dispatch(updateMFAStatus(null));
		dispatch(updateSoftwareMfaStatus(null));
		props.closeAuthModal();
	};

	const submitPassword = () => {
		let data;

		switch (softwareMfaStatus) {
			case "initiate":
				data = {
					appType: appType || "frontm",
					password: password,
				};
				AuthServiceClient.initiateSoftwareMfa(data).then((data) => {
					if (data.success && data.qrCodeUri) {
						dispatch(updateSoftwareMfaStatus("validateNumber"));
						dispatch(updateQrCodeUri(data.qrCodeUri));
						updateQRCodeUrlState(data.qrCodeUri);
						updateErrorMsg(null);
					} else {
						updateErrorMsg(data.errorMessage || "Invalid password");
					}
				});
				break;
			case "validateNumber":
				data = {
					appType: appType || "frontm",
					password: password,
					otpToken: otpToken,
				};

				AuthServiceClient.activeSoftwareMfa(data).then((data) => {
					if (data.success) {
						let userDetails = getAuthData();
						userDetails.user.softwareMfaEnabled = true;
						storeAuthData(userDetails);
						dispatch(updateSoftwareMfaEnabled(true));
						updateErrorMsg(null);
						dispatch(updateMFAStatus(null));
						props.closeAuthModal();
					} else {
						updateErrorMsg(data.errorMessage || "Invalid OTP");
					}
				});

				break;
			case "idle":
				dispatch(updateSoftwareMfaStatus("idleValidateNumber"));
				break;
			case "deactivate":
				dispatch(updateSoftwareMfaStatus("deactivateMfa"));
				break;
			default:
				data = {
					email: userEmail,
					botId: mfaBotId,
					loginProvider: loginState,
					password: password,
					platform: platform,
					appType: appType,
				};
				AuthServiceClient.resetUserActivity(data)
					.then((res) => {
						console.log("lets see the response", res);
					})
					.catch((err) => {
						console.log("error ==> ", err);
					});
		}
	};

	const submitAuthPassword = () => {
		const dataObj = {
			appType: appType || "frontm",
			loginProvider: "frontm",
			password: password,
			otpToken: otpToken,
			platform: "web",
		};

		if (softwareMfaStatus === "idleValidateNumber") {
			dataObj["botId"] = mfaBotId || null;

			AuthServiceClient.resetUserActivity(dataObj)
				.then((data) => {
					if (data.success) {
						dispatch(updateMFAStatus(null));
						dispatch(updateSoftwareMfaStatus(null));
						updateErrorMsg(null);
						history.push("/app/chats");
					} else {
						updateErrorMsg(data.errorMessage || data.message);
						setTimeout(() => {
							history.push("/app/home");
							dispatch(updateMFAStatus(null));
							if (data.errorCode === "CodeMismatchException") {
								dispatch(updateSoftwareMfaStatus("idleValidateNumber"));
							}
							if (data.errorCode === "NotAuthorizedException") {
								dispatch(updateSoftwareMfaStatus("idle"));
							} else {
								dispatch(updateSoftwareMfaStatus("idle"));
							}
							updateErrorMsg(null);
						}, 1000);
					}
				})
				.catch((err) => {
					console.error("error on something", err);
				});
		} else if (softwareMfaStatus === "deactivateMfa") {
			const dataObj = {
				appType: appType || "frontm",
				password: password,
				otpToken: otpToken,
				botId: mfaBotId,
			};
			AuthServiceClient.deactivateSoftwareMfa(dataObj).then((data) => {
				if (data.success) {
					console.info("deactivated successfully");
					let userDetails = getAuthData();
					userDetails.user.softwareMfaEnabled = false;
					storeAuthData(userDetails);
					dispatch(updateMFAStatus(null));
					dispatch(updateSoftwareMfaStatus(null));
					updateErrorMsg(null);
				} else {
					if (data.errorCode === "CodeMismatchException") {
						dispatch(updateSoftwareMfaStatus("deactivateMfa"));
					}
					if (data.errorCode === "NotAuthorizedException") {
						dispatch(updateSoftwareMfaStatus("deactivate"));
					} else {
						dispatch(updateSoftwareMfaStatus("deactivate"));
					}
					updateErrorMsg(
						data.errorMessage ||
							data.message ||
							"Incorrect username or password."
					);
				}
			});
		} else
			AuthServiceClient.activeSoftwareMfa(dataObj).then((data) => {
				if (data.success) {
					console.info("account activated");
					updateErrorMsg(null);
				} else {
					if (data.errorCode === "CodeMismatchException") {
						dispatch(updateSoftwareMfaStatus("idleValidateNumber"));
					}
					if (data.errorCode === "NotAuthorizedException") {
						dispatch(updateSoftwareMfaStatus("idle"));
					} else {
						dispatch(updateSoftwareMfaStatus("idle"));
					}
					updateErrorMsg(data.errorMessage || data.message);
				}
			});
	};

	const submitQRCode = () => {
		updateQRCodeUrlState(null);
	};

	const statusComponent = (currentStatus) => {
		switch (currentStatus) {
			case "socialLogin":
				return (
					<ButtonGrid>
						<GoogleBtn sm={6} variant="contained" size="small">
							Sign in with Google
						</GoogleBtn>
					</ButtonGrid>
				);

			case "validateNumber":
			case "idleValidateNumber":
				return (
					<TextField
						id="auth-validateNumber"
						label="Validate OTP"
						value={otpToken}
						variant="outlined"
						size="small"
						onChange={(e) => updateOtpToken(e.target.value)}
					/>
				);

			case "deactivateMfa":
			default:
				return (
					<div
						style={{
							width: "210px",
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
						}}
					>
						<TextField
							id="auth-password"
							label="Password"
							variant="outlined"
							size="small"
							type="password"
							aautocomplete="new-password"
							value={password}
							onChange={(e) => updatePassword(e.target.value)}
						/>
					</div>
				);
		}
	};

	const authBodyText = (number) => {
		if (softwareMfaStatus === "validateNumber") {
			if (number) {
				return (
					<Typography variant="body2" gutterBottom>
						A validation has been sent to: {number}
					</Typography>
				);
			} else {
				return (
					<Typography variant="body2" gutterBottom>
						A validation has been sent your authentication app
					</Typography>
				);
			}
		} else {
			return (
				<Typography variant="body2" gutterBottom>
					Please confirm your {getDomainSelcted()?.name || "FrontM"} password
				</Typography>
			);
		}
	};

	return (
		<>
			<ModalPopup
				onClose={closeModal}
				size="sm"
				noHeader
				className="dialler-modal"
				keyboard={false}
				backdrop="static"
				noBorder="no-border"
			>
				{softwareMfaStatus === "validateNumber" && qrCodeUrl ? (
					<>
						<GridMainContainer container spacing={3}>
							<Grid item xs={12}>
								<img src="./img/security-icon.png" alt="security" />
							</Grid>
							<Grid item xs={12}>
								<Subtitle variant="subtitle1" gutterBottom>
									Add extra security with two-factor authentication
								</Subtitle>
							</Grid>
							<Grid item xs={12}>
								<QRCode value={qrCodeUrl} />
							</Grid>
							<Grid item xs={12}>
								<Subtitle variant="subtitle1" gutterBottom>
									Scan the above QR code in your authenticator app
								</Subtitle>
								<AuthBtn
									variant="contained"
									color="primary"
									size="small"
									onClick={submitQRCode}
								>
									Continue
								</AuthBtn>
							</Grid>
						</GridMainContainer>
					</>
				) : (
					<GridMainContainer container spacing={3}>
						<Grid item xs={12}>
							<img src="./img/security-icon.png" alt="security" />
						</Grid>
						<Grid item xs={12}>
							<Subtitle variant="subtitle1" gutterBottom>
								Authenticate your account to access
							</Subtitle>
							<>{authBodyText(number)}</>
						</Grid>
						<Grid
							item
							xs={12}
							style={{ display: "flex", justifyContent: "center" }}
						>
							{statusComponent(progressStatus)}
						</Grid>
						<Grid
							item
							xs={12}
							style={{ display: "flex", justifyContent: "center" }}
						>
							{errorMsg ? (
								<>
									<div className="alert-danger-custom-msg" role="alert">
										<span style={{ display: "inlineBlock", fontSize: "12px" }}>
											{errorMsg}
										</span>
									</div>
								</>
							) : null}
						</Grid>
						<Grid item xs={12}>
							{(softwareMfaStatus === "qrCodeUri" ||
								softwareMfaStatus === "idleValidateNumber" ||
								softwareMfaStatus === "deactivateMfa") && (
								<AuthBtn
									variant="contained"
									color="primary"
									size="small"
									onClick={submitAuthPassword}
								>
									Done
								</AuthBtn>
							)}
							{(softwareMfaStatus === "initiate" ||
								softwareMfaStatus === "validateNumber" ||
								softwareMfaStatus === "idle" ||
								softwareMfaStatus === "deactivate") && (
								<AuthBtn
									variant="contained"
									color="primary"
									size="small"
									onClick={submitPassword}
								>
									Continue
								</AuthBtn>
							)}
						</Grid>
					</GridMainContainer>
				)}
			</ModalPopup>
		</>
	);
};

export default AuthenticationModel;
