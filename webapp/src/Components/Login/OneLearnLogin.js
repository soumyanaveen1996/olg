import React, { Component, useEffect, useState } from "react";
import Error from "../Common/Error";
import { validateSignInForm } from "../../Utils/Validator";
import { Link } from "react-router-dom";
import { getAuthCode, unsetAuthCode } from "../../Services/StorageService";
import { activateEnterpriseBots } from "../../Services/BotsService";
import { updateLastLoggedInDomain } from "../../Services/UserService";

import history from "../../Services/History";
import "./Login.css";
import { div, Button, CircularProgress, Box } from "@mui/material";
import { user } from "../../Services/gRPC/Generated/UserService";
import moment from "moment";
import Config from "../../Utils/Config";
import { toast } from "react-toastify";
import { registerOneLearnUser } from "../../Services/OneLearnServices";
const HELPER_MESSAGE =
	"Please contact FrontM support. You have been logged in to default frontM domain";
const FRONTM_DOMAIN = "frontmai";
const ACTIVATE_ENTERPRISE_BOTS_ERROR_CODES = [
	"Invalid code",
	"Code has been already used by the user",
	"Code could not be applied. The code has expired or the maximum limit has been reached",
];

const OneLearnLogin = () => {
	const [form, setForm] = useState({});
	const styleObj = {
		password: {
			fontSize: "16px",
			color: "#d5d5d5",
			position: "absolute",
			right: "10px",
			bottom: "10px",
			cursor: "pointer",
		}
	}

	useEffect(() => {
		setForm({ page: "LOGIN" })
	}, [])

	const handleFormChange = (e, type) => {
		console.log("eve", e.target.value)
		setForm((prev) => ({
			...prev,
			[type]: e.target.value
		}))
	}

	// const registerOneLearnUser = (payload) => {
	// 	let baseURL = Config.edgeURL;
	// 	const url = `http://localhost:4001/register`;
	// 	fetch(url, {
	// 		method: "POST",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify(payload),
	// 	})
	// 		.then(function (response) {
	// 			return response.json();
	// 		})
	// 		.catch((error) => {
	// 			toast("error")(error.data.message)
	// 			console.error("error occured in api", error.data)
	// 		})
	// }


	const handleFormSubmit = async (e) => {
		console.log("FormData", form)
		let { userId, pin, dateOfBirth } = form
		let data = {
			userId, dateOfBirth: moment(dateOfBirth).unix(),
			pin
		}
		let res = await registerOneLearnUser(data)
		console.log("Res", res)
	}

	return <Box className={"align-items-center d-flex flex-column"}>
		{/* LOGIN FORM */}
		<h1>{form?.page === "LOGIN" && "Login"}</h1>
		{form?.page === "LOGIN" && (<form role="form" noValidate>
			{/* UserId */}
			<div className="form-group align-items-center d-flex flex-column">
				<label style={{ color: "#666666", marginBottom: "-0.1rem" }}>
					User ID
				</label>
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
				<label style={{ color: "#666666", marginBottom: "-0.1rem" }}>
					PIN
				</label>

				<input
					placeholder={"PIN"}
					type={form?.showPassword ? "text" : "password"}
					className="form-control form-content-input"
					style={{ backgroundColor: "#f4f4f4" }}
					onChange={(e) => handleFormChange(e, "pin")}
					autoComplete="current-password"
					value={form?.password}
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

			<Box className={"mt-20 mb-30 justify-content-center d-flex"}>
				Forgot pin, &nbsp;<span style={{ color: "blue", cursor: "pointer" }} onClick={() => setForm({ page: "FORGOT_PIN" })}> click here</span>
			</Box>

			<Button onClick={() => handleFormSubmit()} className={`btn btn-open btn-block btn-icon onship-btn`} >
				Log in
			</Button>

			<Box className={"mt-20 mb-30 d-flex align-items-center justify-content-between"}>
				New User?
				<span className={"ml-10"}>
					<Button onClick={() => setForm({ page: "CREATE_PIN" })} className={`btn btn-open btn-block btn-icon oneLearn-btn`} >
						Create PIN
					</Button>
				</span>
			</Box>
		</form>)}


		{["FORGOT_PIN", "CREATE_PIN"].includes(form?.page) && (
			<>
				<h1>{form?.page === "FORGOT_PIN" ? "Forgot Pin" : "Create Pin"}</h1>
				<form role="form" onSubmit={() => { }} noValidate>
					{/* UserId */}
					<div className="form-group align-items-center d-flex flex-column">
						<label style={{ color: "#666666", marginBottom: "-0.1rem" }}>
							User ID
						</label>
						<input
							placeholder={"User ID"}
							type="text"
							className="form-control form-content-input"
							onChange={(e) => handleFormChange(e, "userId")}
							value={form?.userId}
							autoComplete="username"
						/>
					</div>
					{/* DOB */}
					<div
						className="form-group align-items-center d-flex flex-column"
						style={{ position: "relative" }}
					>
						<label style={{ color: "#666666", marginBottom: "-0.1rem" }}>
							DOB
						</label>

						<input
							placeholder={"Date of Birth"}
							type={"date"}
							className="form-control form-content-input"
							style={{ backgroundColor: "#f4f4f4" }}
							onChange={(e) => handleFormChange(e, "dateOfBirth")}
							value={form?.dateOfBirth || moment().format("YYYY-MM-DD")}
						/>
					</div>

					<Button onClick={() => handleFormSubmit()} className={`mt-30 btn btn-open btn-block btn-icon onship-btn`} >
						Create pin
					</Button>

					<Box className={"mt-20 mb-30 justify-content-center d-flex"}>
						Go back,&nbsp; <span style={{ color: "blue", cursor: "pointer" }} onClick={() => setForm({ page: "LOGIN" })}> click here</span>
					</Box>
				</form>
			</>
		)}
	</Box>
}

export default OneLearnLogin;
