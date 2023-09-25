import React, { Component } from "react";
import countries from "../../Utils/ListOfCountries";
import _ from "lodash";
import Notify from "../ModalMessages/ToastNotif";
import ErrorMessage from "../Common/ErrorMessage";

class ConfrimCreditModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			errorMessageVAT: null,
			billingAddress: "",
			billingCity: "",
			billingState: "",
			billingZip: "",
			taxAmt: 0,
			topUpAmount: 0,
			totalAmt: 0,
			vatCode: "",
			invalidCode: false,
			selectedCountryCode: "Select Country",
			disableBtn: true,
			euISOCodes: [
				"BE",
				"BG",
				"CZ",
				"DK",
				"DE",
				"EE",
				"IE",
				"GR",
				"ES",
				"FR",
				"HR",
				"IT",
				"CY",
				"LV",
				"LT",
				"LU",
				"HU",
				"MT",
				"NL",
				"AT",
				"PL",
				"PT",
				"RO",
				"SI",
				"SK",
				"FI",
				"SE",
			],
		};
	}

	componentDidMount() {
		this.totalAmt(this.state.taxAmt, Number(this.props.amountToCredit), () => {
			this.checkForEmptyField();
		});
	}
	handleSubmitAmount = () => {
		// console.log(
		//   "form submit",
		//   this.state.totalAmt,
		//   this.state.taxAmt,
		//   this.state.topUpAmount
		// );
		this.props.handleStripe(
			this.state.totalAmt,
			this.state.topUpAmount,
			this.state.taxAmt
		);
	};

	checkVATNumber = (e) => {
		let vatNumber = e.target.value;
		let data = this.validateVatNumber(vatNumber);
		if (vatNumber.length === 0) {
			data = false;
		}
		// console.log("after removing ", data);
		let vatPercentAmt;
		// if (this.state.selectedCountryCode) {
		//   let checkCountryCode = this.state.euISOCodes.includes(
		//     this.state.selectedCountryCode
		//   );
		//   if (vatNumber.length === 0 && checkCountryCode) {
		//     vatPercentAmt = (0.2 * Number(this.props.amountToCredit)).toFixed(2);
		//     this.setState({ taxAmt: vatPercentAmt }, () => {
		//       this.totalAmt(vatPercentAmt, this.props.amountToCredit);
		//     });
		//   }
		//   if (vatNumber.length === 0 && !checkCountryCode) {
		//     vatPercentAmt = 0;
		//     this.setState({ taxAmt: vatPercentAmt }, () => {
		//       this.totalAmt(vatPercentAmt, this.props.amountToCredit);
		//     });
		//   }

		//   if (vatNumber.length === 0 && this.state.selectedCountryCode === "GB") {
		//     vatPercentAmt = (0.2 * Number(this.props.amountToCredit)).toFixed(2);
		//     this.setState({ taxAmt: vatPercentAmt }, () => {
		//       this.totalAmt(vatPercentAmt, this.props.amountToCredit);
		//     });
		//   }
		// }

		if (vatNumber.length > 0 && !data) {
			// Notify({
			//   type: "error",
			//   message: "VAT number is not valid"
			// });
			this.setState({ errorMessageVAT: "VAT number is not valid" });
		}

		if (!data) {
			if (this.state.selectedCountryCode) {
				let checkCountryCode = this.state.euISOCodes.includes(
					this.state.selectedCountryCode
				);
				if (!checkCountryCode) {
					this.setState({ taxAmt: 0 }, () => {
						this.totalAmt(0, this.props.amountToCredit);
					});
				} else {
					vatPercentAmt = (0.2 * Number(this.props.amountToCredit)).toFixed(2);
					this.setState({ taxAmt: vatPercentAmt }, () => {
						this.totalAmt(vatPercentAmt, this.props.amountToCredit);
					});
				}
			}
			if (this.state.selectedCountryCode === "GB") {
				vatPercentAmt = (0.2 * Number(this.props.amountToCredit)).toFixed(2);
				this.setState({ taxAmt: vatPercentAmt }, () => {
					this.totalAmt(vatPercentAmt, this.props.amountToCredit);
				});
			}
		} else {
			if (this.state.selectedCountryCode) {
				let checkCountryCode = this.state.euISOCodes.includes(
					this.state.selectedCountryCode
				);
				vatPercentAmt = 0;
				if (this.state.selectedCountryCode === "GB") {
					vatPercentAmt = (0.2 * Number(this.props.amountToCredit)).toFixed(2);
					this.setState({ taxAmt: vatPercentAmt });
				}

				if (checkCountryCode) {
					// vatPercentAmt = (0.2 * Number(this.props.amountToCredit)).toFixed(2);
					this.setState({ taxAmt: vatPercentAmt }, () => {
						this.totalAmt(vatPercentAmt, this.props.amountToCredit);
					});
				}

				this.setState({ taxAmt: vatPercentAmt }, () => {
					this.totalAmt(vatPercentAmt, this.props.amountToCredit);
				});
			}
		}
		this.setState({ validVat: data }, () => {
			this.checkForEmptyField();
		});
	};

	updateVat = (e) => {
		console.log(e.target.value);
		let checkCountryCode;
		let code = e.target.value;
		this.setState({ vatCode: code });
		let vatPercentAmt = 0;
		if (
			code.length === 0 &&
			(!this.state.selectedCountryCode ||
				this.state.selectedCountryCode === "Select Country")
		) {
			this.setState({ taxAmt: vatPercentAmt });
		}

		if (this.state.selectedCountryCode) {
			checkCountryCode = this.state.euISOCodes.includes(
				this.state.selectedCountryCode
			);
			if (code.length === 0 && !checkCountryCode) {
				vatPercentAmt = 0;
				this.setState({ taxAmt: vatPercentAmt });
			}

			if (code.length === 0 && checkCountryCode) {
				vatPercentAmt = (0.2 * Number(this.props.amountToCredit)).toFixed(2);
				this.setState({ taxAmt: vatPercentAmt });
			}
			if (code.length === 0 && this.state.selectedCountryCode === "GB") {
				vatPercentAmt = (0.2 * Number(this.props.amountToCredit)).toFixed(2);
				this.setState({ taxAmt: vatPercentAmt });
			}

			if (code.length !== 0 && this.state.selectedCountryCode === "GB") {
				vatPercentAmt = (0.2 * Number(this.props.amountToCredit)).toFixed(2);
				this.setState({ taxAmt: vatPercentAmt });
			}
		}
		this.totalAmt(vatPercentAmt, Number(this.props.amountToCredit), () => {
			this.checkForEmptyField();
		});
	};

	validateVatNumber(vatNumber) {
		if (_.isEmpty(vatNumber)) {
			return true;
		}
		if (_.isUndefined(vatNumber)) {
			return false;
		}
		if (vatNumber.length !== 11) {
			return false;
		}
		let vatISO = _.toUpper(vatNumber.substr(0, 2));
		if (this.state.euISOCodes.indexOf(vatISO) === -1) {
			return false;
		}
		let vatDigits = _.toNumber(vatNumber.substr(2));
		return !_.isNaN(vatDigits);
	}

	checkForEmptyField = () => {
		// console.log("all the stata ", this.state);

		if (this.state.vatCode.length > 0) {
			if (!this.state.validVat) {
				this.setState({ disableBtn: true });
			} else {
				this.setState({ disableBtn: false });
			}
		}

		if (
			this.state.billingAddress.length <= 0 ||
			this.state.billingCity.length <= 0 ||
			this.state.billingState.length <= 0 ||
			this.state.billingZip.length <= 0 ||
			this.state.selectedCountryCode.length <= 0 ||
			this.state.selectedCountryCode === "Select Country"
		) {
			this.setState({ disableBtn: true });
		} else {
			this.setState({ disableBtn: false });
		}
	};

	totalAmt = (percentValue, topupAmt) => {
		this.setState({ topUpAmount: topupAmt });
		let ttlAmt = parseFloat(percentValue) + parseFloat(topupAmt);
		// console.log(Number(this.props.amountToCredit), this.state.taxAmt, ttlAmt);

		this.setState({ totalAmt: ttlAmt });
	};

	selectCountry = (e) => {
		// console.log(e.target.value);
		let data;
		if (this.state.vatCode.length > 0) {
			data = this.validateVatNumber(this.state.vatCode);
			if (!data) {
				this.nameInput.focus();
			}
		}

		if (e.target.value === "Select Country") {
			this.setState({ disableBtn: true });
		} else {
			this.setState({ disableBtn: false });
		}

		let vatPercentAmt = 0;
		let checkForEU = this.state.euISOCodes.some((elem) => {
			return elem === e.target.value;
		});

		let checkForUK = false;
		if (e.target.value === "GB") {
			checkForUK = true;
		}

		if (this.state.vatCode && checkForEU) {
			this.setState({ taxAmt: 0 });
		}

		if ((!this.state.vatCode && checkForEU) || checkForUK) {
			vatPercentAmt = (0.2 * Number(this.props.amountToCredit)).toFixed(2);
			this.setState({ taxAmt: vatPercentAmt });
		} else {
			vatPercentAmt = 0;
			this.setState({ taxAmt: vatPercentAmt });
		}

		this.totalAmt(vatPercentAmt, Number(this.props.amountToCredit));
		this.setState({ selectedCountryCode: e.target.value }, () => {
			this.checkForEmptyField();
		});
	};

	render() {
		let { amountToCredit } = this.props;
		// console.log("this props ", this.state);

		return (
			<div className="main-billing-modal-div">
				{/*<a*/}
				{/*  className="close-btn"*/}
				{/*  onClick={() => {*/}
				{/*    this.props.onClose();*/}
				{/*  }}*/}
				{/*>*/}
				{/*  <img src="/offlinelms/img/close-icon.png" alt="close-icon" />*/}
				{/*</a>*/}
				<div className="confirmCredit-header d-flex align-items-center">
					<a
						onClick={() => {
							this.props.onClose(this.props.codeAlreadyApplied);
						}}
					>
						<img
							style={{ width: "16px", height: "15px", marginRight: "10px" }}
							src="/offlinelms/img/header-back-arrow@2x.png"
							alt=""
						/>
					</a>
					<h3 className="header-ttl">Confirm credit</h3>
				</div>

				<div className="d-flex flex-row mt-20">
					<div className="p-2 billing-address">
						<p className="fs14 font600 mb-30">
							Please enter your billing address
						</p>
						<form role="form" className="billing-form">
							<div className="form-group" style={{ width: "380px" }}>
								<label htmlFor="companyName">Company Name</label>
								<input
									id="companyName"
									placeholder=""
									type="text"
									className="form-control form-control-lg form-input-box-380-reverse remove-outline"
								/>
							</div>
							<div className="form-group" style={{ width: "380px" }}>
								<label htmlFor="vatNumber">VAT number (optional)</label>
								<input
									id="vatNumber"
									placeholder=""
									type="text"
									ref={(input) => {
										this.nameInput = input;
									}}
									onBlur={this.checkVATNumber}
									onChange={this.updateVat}
									className="form-control form-control-lg form-input-box-380-reverse remove-outline"
								/>
								{this.state.errorMessageVAT && (
									<ErrorMessage message={this.state.errorMessageVAT} />
								)}
							</div>
							<div className="form-group" style={{ width: "380px" }}>
								<label htmlFor="addressBill">
									Address <span>*</span>
								</label>
								<input
									id="addressBill"
									placeholder=""
									type="text"
									className="form-control form-control-lg form-input-box-380-reverse remove-outline"
									onChange={(e) => {
										if (e.target.value === "") {
											this.setState({ disableBtn: true });
										} else {
											this.setState({ billingAddress: e.target.value }, () => {
												this.checkForEmptyField();
											});
										}
									}}
								/>
							</div>
							<div className="form-group" style={{ width: "380px" }}>
								<label htmlFor="cityBill">
									City <span>*</span>
								</label>
								<input
									id="cityBill"
									placeholder=""
									type="text"
									className="form-control form-control-lg form-input-box-380-reverse remove-outline"
									onChange={(e) => {
										if (e.target.value === "") {
											this.setState({ disableBtn: true });
										} else {
											this.setState({ billingCity: e.target.value }, () => {
												this.checkForEmptyField();
											});
										}
									}}
								/>
							</div>
							<div className="d-flex flex-row">
								<div className="form-group mr-2">
									<label htmlFor="stateBill">
										State <span>*</span>
									</label>
									<input
										id="stateBill"
										placeholder=""
										type="text"
										className="form-control form-control-lg form-input-box-220-reverse remove-outline"
										onChange={(e) => {
											if (e.target.value === "") {
												this.setState({ disableBtn: true });
											} else {
												this.setState({ billingState: e.target.value }, () => {
													this.checkForEmptyField();
												});
											}
										}}
									/>
								</div>
								<div className="form-group">
									<label htmlFor="zipcodeBill">
										Postal code / ZIP <span>*</span>
									</label>
									<input
										id="zipcodeBill"
										placeholder=""
										type="text"
										className="form-control form-control-lg form-input-box-150-reverse remove-outline"
										onChange={(e) => {
											if (e.target.value === "") {
												this.setState({ disableBtn: true });
											} else {
												this.setState({ billingZip: e.target.value }, () => {
													this.checkForEmptyField();
												});
											}
										}}
									/>
								</div>
							</div>
							<div className="form-group">
								<label htmlFor="countryBill">
									Country<span>*</span>
								</label>
								<select
									className="form-control form-input-box-380-reverse"
									id="countryBill"
									onChange={this.selectCountry}
									autoComplete="off"
									style={{ fontSize: "1rem", color: "#666666" }}
								>
									<option>Select Country</option>
									{countries.map((country, index) => {
										return (
											<option key={index} value={country.code}>
												{country.name}
											</option>
										);
									})}
								</select>
							</div>
						</form>
					</div>
					<div className="px-4 py2 purchase-amt">
						<p className="fs14 font600 mb-30">Your purchase</p>
						<div className="d-flex flex-column">
							<div className="my-2 d-flex justify-content-between">
								<span className="fs14">Credit</span>
								<span className="fs14 font600">
									${parseFloat(amountToCredit).toFixed(2)}
								</span>
							</div>
							<div className="my-2 d-flex justify-content-between">
								<span className="fs14">Tax</span>
								<span className="fs14 font600">${this.state.taxAmt}</span>
							</div>
							<div className="my-2 d-flex justify-content-between align-items-center total-bill-div p-1">
								<span className="fs16 font600">Total</span>
								<span className="fs16 font600">
									${parseFloat(this.state.totalAmt).toFixed(2)}
								</span>
							</div>
							<div>
								<span style={{ fontSize: "10px" }}>
									* VAT is charged at UK rates to UK customers, and EU customers
									who are unable to provide a VAT number.
									<br />
									<br />
									Other users will be responsible for paying any applicable
									taxes locally. EU companies should provide a VAT number, and
									will not be charged UK VAT.
								</span>
							</div>
						</div>
					</div>
				</div>
				<div className="form-group code-form-group mt-20 py-2 px-4">
					<button
						onClick={this.handleSubmitAmount}
						className="btn btn-block btn-lg btn-icon confirm-billing-btn"
						disabled={this.state.disableBtn}
						ref={(btn) => {
							this.verifyBtn = btn;
						}}
					>
						Confirm
					</button>
				</div>
			</div>
		);
	}
}

export default ConfrimCreditModal;
