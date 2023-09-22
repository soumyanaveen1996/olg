import React, { Component, useEffect, useState } from "react";
import Error from "../Common/Error";
import { validateSignInForm } from "../../Utils/Validator";
import { Link } from "react-router-dom";
import { getAuthCode, storeAuthData, unsetAuthCode } from "../../Services/StorageService";
import { activateEnterpriseBots } from "../../Services/BotsService";
import { updateLastLoggedInDomain } from "../../Services/UserService";

import history from "../../Services/History";
import "./Login.css";
import { div, Button, CircularProgress, Box } from "@mui/material";
import { user } from "../../Services/gRPC/Generated/UserService";
import moment from "moment";
import Config from "../../Utils/Config";
import { toast } from "react-toastify";
import { forgotPin, login, register, verifyUser } from "../../Services/OneLearnServices";
import { ArrowBack } from "@mui/icons-material";
import { ONECARE_MAIN_HEADER_TEXT_COLOR, ONECARE_SUB_HEADER_TEXT_COLOR, POWERED_BY_LOGO_T2M } from "../../Utils/Constants";
const HELPER_MESSAGE =
	"Please contact FrontM support. You have been logged in to default frontM domain";
const FRONTM_DOMAIN = "frontmai";
const ACTIVATE_ENTERPRISE_BOTS_ERROR_CODES = [
	"Invalid code",
	"Code has been already used by the user",
	"Code could not be applied. The code has expired or the maximum limit has been reached",
];

const OneLearnLogin = (props) => {
	const [form, setForm] = useState({});
	const styleObj = {
		password: {
			fontSize: "16px",
			color: "#d5d5d5",
			position: "absolute",
			right: "10px",
			bottom: "10px",
			cursor: "pointer",
		},
		mainHeader: { color: ONECARE_MAIN_HEADER_TEXT_COLOR, fontSize: "2rem" },
		subHeader: { color: ONECARE_SUB_HEADER_TEXT_COLOR, fontSize: "1.3rem", fontWeight: "normal", }
	}

	const initialize = () => {
		setForm({ page: "LOGIN", dateOfBirth: moment().format("YYYY-MM-DD") })
	}

	useEffect(() => {
		initialize()
	}, [])

	useEffect(() => {
		setForm((prev) => ({
			...prev,
			loginError: false,
			pinError: false,
			createError: false
		}))
	}, [form?.page])

	const handleFormChange = (e, type) => {
		// console.log("eve", e.target.value)
		setForm((prev) => ({
			...prev,
			[type]: e.target.value,
			loginError: false,
			pinError: false,
			createError: false
		}))
	}



	const handleFormSubmit = async (e) => {
		// console.log("FormData", form)
		let { userId, pin, page, confirmPin } = form
		let data = {
			userId,
			pin: page !== "LOGIN" ? confirmPin : pin
		}
		if (page === "LOGIN" && (!pin || !userId)) {
			return setForm((prev) => ({ ...prev, loginError: true, errorMessage: "Please use your ID (e.g Seafarer ID) and PIN to log in" }))
		}

		try {
			let res = await login(data);
			if (res) {
				if (res.error) return setForm((prev) => ({ ...prev, loginError: true, errorMessage: res.error }))
				// console.log("res", res)
				storeAuthData(res.user);
				window.location.href = "/app/home";

			}

		} catch (error) {
			console.log("Error occured during " + page, error);
			toast["error"](error?.message);
		}
	}

	const handleNewPinLogin = async () => {
		let { newPin, confirmPin, action, userId, dateOfBirth } = form
		if (newPin !== confirmPin) {
			return setForm((prev) => ({ ...prev, pinError: true, errorMessage: "Pin doesn't match" }))
		}
		if (newPin?.length < 4) {
			return setForm((prev) => ({ ...prev, pinError: true, errorMessage: "Length of PIN must be atleast 4" }))
		}

		try {
			let res;
			if (action === "CREATE_PIN") {
				res = await register({ userId, dateOfBirth, pin: confirmPin });
			} else {
				res = await forgotPin({ userId, dateOfBirth, pin: confirmPin });
			}

			if (res?.success) {
				// Login the user here
				handleFormSubmit()
			}
			if (res?.error) {
				return setForm((prev) => ({ ...prev, pinError: true, errorMessage: res.error }))
			}


		} catch (error) {
			console.log("Error occured during " + action, error);
			toast["error"](error?.message);
		}
	}

	const handleCreatePin = async () => {
		// console.log("form", form)
		let { userId, dateOfBirth } = form;
		if (!userId || !dateOfBirth) {
			return setForm((prev) => ({ ...prev, createError: true, errorMessage: "Please use your ID (e.g Seafarer ID) and Date of Birth to set-up the PIN-code." }));
		}

		let result = await verifyUser({ userId, dateOfBirth });
		if (result?.success) {
			setForm((prev) => ({ ...prev, page: "CONFIRM_PIN" }))
		} else {
			return setForm((prev) => ({ ...prev, createError: true, errorMessage: result.error }))
		}

	}

	const getPageHeader = () => {
		let headerText = "Login";
		let mainHeader = "Welcome!";
		switch (form?.page) {
			case "LOGIN":
				mainHeader = "Welcome!"
				headerText = "Log in to OneLearn Solutions";
				break;
			case "FORGOT_PIN":
				mainHeader = "Reset your PIN"
				headerText = " Please enter your User ID and Date of birth";
				break;
			case "CREATE_PIN":
				mainHeader = "Create your PIN"
				headerText = " Please enter your User ID and Date of birth";
				break;
			case "CONFIRM_PIN":
				mainHeader = "Create PIN"
				headerText = "Please enter a 4 digit PIN";
				break;
			default:
				break;
		}
		return (<>
			<div className="text-center" style={styleObj.mainHeader} >
				{mainHeader}
			</div>
			<p className="text-center mb-30" style={styleObj.subHeader}>
				{headerText}
			</p>
		</>)
	}

	return <Box className={"align-items-center d-flex flex-column"}>
		{/* LOGIN FORM */}
		{getPageHeader()}
		{form?.loginError && <Error message={form.errorMessage} />}
		{form?.page === "LOGIN" && (<form role="form" style={{ width: "250px" }} >
			{/* UserId */}
			<div className="form-group align-items-center d-flex flex-column">
				{/* <label className="font500 my-2" style={{ color: "#666666", marginBottom: "-0.1rem" }}>
					User ID
				</label> */}
				<input
					placeholder={"User ID"}
					type="text"
					className="form-control form-content-input"
					onChange={(e) => handleFormChange(e, "userId")}
					value={form?.userId}
					autoComplete="username"
				/>
			</div>
			{/* PIN */}
			<div
				className="form-group align-items-center d-flex flex-column"
				style={{ position: "relative" }}
			>
				{/* <label className="font500 my-2" style={{ color: "#666666", marginBottom: "-0.1rem" }}>
					PIN
				</label> */}

				<input
					placeholder={"PIN"}
					type={form?.showPassword ? "text" : "password"}
					className="form-control form-content-input"
					onChange={(e) => handleFormChange(e, "pin")}
					autoComplete="current-password"
					value={form?.password}
					error="true"
				/>
				<i className={"fa fa-eye" + (!form?.showPassword ? "-slash" : "")}
					onClick={() => { setForm((prev) => ({ ...prev, showPassword: !prev.showPassword })) }}
					style={styleObj.password}
				/>

				{form?.showSpinner && (
					<div
						style={{
							position: "absolute",
							right: "-30px",
							bottom: "-2px",
						}}
					>
						<CircularProgress
							size="3vh"
							thickness={1.2}
							color="secondary"
						/>
					</div>
				)}
			</div>

			<Box className={"mt-40 mb-30 justify-content-center d-flex font500"}>
				Forgot pin, &nbsp;<span className="" style={{ color: "blue", cursor: "pointer" }} onClick={() => setForm((prev) => ({ ...prev, page: "FORGOT_PIN", action: "FORGOT_PIN" }))}>
					click here
				</span>
			</Box>
			<Box className={"justify-content-center d-flex mb-30"}>
				<Button style={{}} onClick={() => handleFormSubmit()} className={`btn btn-open btn-icon onship-btn`} >
					Log in
				</Button>
			</Box>


			<Box className={"mt-20 mb-30 d-flex align-items-center justify-content-center font500 flex-column"}>
				<Box className={"mb-10"}>New User?</Box>
				<Button onClick={() => setForm((prev) => ({ ...prev, page: "CREATE_PIN", action: "CREATE_PIN" }))} className={`ml-2 btn btn-open btn-icon oneLearn-btn`} >
					Create PIN
				</Button>
			</Box>
		</form>)}


		{["FORGOT_PIN", "CREATE_PIN"].includes(form?.page) && (
			<>
				{/* <p className="text-center" style={styleObj.header}>{form?.page === "FORGOT_PIN" ? "Forgot Pin" : "Create Pin"}</p> */}
				{/* <p className="text-center" style={styleObj.header} > {form?.page === "FORGOT_PIN" ? "Forgot Pin" : "Create Pin"} </p> */}
				{/* {getPoweredBy()} */}
				{form?.createError && <Error message={form.errorMessage} />}
				<form role="form" style={{ width: "250px" }} onSubmit={() => { }} >
					{/* UserId */}
					<div className="form-group align-items-center d-flex flex-column">
						{/* <label className="font500 my-2" style={{ color: "#666666", marginBottom: "-0.1rem" }}>
							User ID
						</label> */}
						<input
							placeholder={"User ID"}
							type="text"
							className="form-control form-content-input"
							onChange={(e) => handleFormChange(e, "userId")}
							value={form?.userId}
							autoComplete="username"
						/>
					</div>
					{/* Date of Birth */}
					<div
						className="form-group align-items-center d-flex flex-column"
						style={{ position: "relative" }}
					>
						{/* <label className="font500 my-2" style={{ color: "#666666", marginBottom: "-0.1rem" }}>
							Date of Birth
						</label> */}

						<input
							placeholder={"Date of Birth"}
							type={"date"}
							className="form-control form-content-input"
							style={{ backgroundColor: "#f4f4f4" }}
							onChange={(e) => handleFormChange(e, "dateOfBirth")}
							value={form?.dateOfBirth || moment().format("YYYY-MM-DD")}
						/>
					</div>
					<Box className={"justify-content-center d-flex"}>
						<Button onClick={() => handleCreatePin()} className={`mt-30 btn btn-open btn-icon onship-btn`} >
							Create pin
						</Button>
					</Box>


					<Box className={"mt-20 mb-30 justify-content-center d-flex"}>
						<ArrowBack size={"large"} style={{ cursor: "pointer" }} onClick={() => initialize()} />
					</Box>
				</form>
			</>
		)}

		{["CONFIRM_PIN"].includes(form?.page) && (
			<>
				{/* <p className="text-center" style={styleObj.header}>{"Create new pin"}</p> */}
				{/* {getPoweredBy()} */}
				{form?.pinError && <Error message={form.errorMessage} />}
				<form role="form" style={{ width: "250px" }} onSubmit={() => { }} >
					{/* New Pin */}
					<div className="form-group align-items-center d-flex flex-column" style={{ position: "relative" }}>
						{/* <label className="font500 my-2" style={{ color: "#666666", marginBottom: "-0.1rem" }}>
							New Pin
						</label> */}
						<input
							placeholder={"New PIN"}
							type={!form?.newPassword ? "text" : "password"}
							className="form-control form-content-input"
							onChange={(e) => handleFormChange(e, "newPin")}
							value={form?.newPin}
						/>
						<i className={"fa fa-eye" + (form?.newPassword ? "-slash" : "")}
							onClick={() => { setForm((prev) => ({ ...prev, newPassword: !prev.newPassword })) }}
							style={styleObj.password}
						/>
					</div>
					{/* New Pin */}
					<div className="form-group align-items-center d-flex flex-column" style={{ position: "relative" }}>
						{/* <label className="font500 my-2" style={{ color: "#666666", marginBottom: "-0.1rem" }}>
							Confirm Pin
						</label> */}
						<input
							placeholder={"Confirm PIN"}
							type={form?.confirmPassword ? "text" : "password"}
							className="form-control form-content-input"
							onChange={(e) => handleFormChange(e, "confirmPin")}
							value={form?.confirmPin}
						/>
						<i className={"fa fa-eye" + (!form?.confirmPassword ? "-slash" : "")}
							onClick={() => { setForm((prev) => ({ ...prev, confirmPassword: !prev.confirmPassword })) }}
							style={styleObj.password}
						/>
					</div>

					<Box className={"mt-40 mb-15 justify-content-center d-flex font500"}>Login with your new pin</Box>
					<Box className={"justify-content-center d-flex mb-20"}>
						<Button onClick={() => handleNewPinLogin()} className={` btn btn-open btn-icon onship-btn`} >
							Login
						</Button>
					</Box>

					<Box className={"mt-0 mb-30 justify-content-center d-flex"}>
						<ArrowBack size={"large"} style={{ cursor: "pointer" }} onClick={() => setForm((prev) => ({ ...prev, page: prev.action }))} />
					</Box>
				</form>
			</>
		)}


	</Box>
}

export default OneLearnLogin;
