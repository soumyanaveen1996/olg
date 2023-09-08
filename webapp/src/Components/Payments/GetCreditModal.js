import React, { Component } from "react";
import { Tooltip } from "reactstrap";
import ModalPopup from "../ModalMessages/ModalPopup";
import { activateEnterpriseBots } from "../../Services/BotsService";
import { FRONTM_DOMAIN } from "../../Utils/Constants";
import { loadAllDomainsListInLFStorage } from "../../Services/LFStorage";

const errorBannerStyle = {
	width: "100%",
	height: "20px",
	backgroundColor: "rgba(213, 145, 142,0.4)",
	borderBottom: "1px solid rgb(213, 145, 142)",
	transition: "all .5s ease-in-out",
	position: "absolute",
	top: 0,
	left: 0,
	padding: "0 35px",
};
const successBannerStyle = {
	width: "100%",
	height: "20px",
	backgroundColor: "rgba(47, 199, 111,0.4)",
	borderBottom: "1px solid rgb(47, 199, 111)",
	transition: "all .5s ease-in-out",
	position: "absolute",
	top: 0,
	left: 0,
	padding: "0 35px",
};
class GetCreditModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedAmount: 0,
			success: null,
			error: null,
			showBanner: false,
			promoCode: "",
			disabledPromoCode: false,
			disabledApplyBtn: true,
			codeAlreadyApplied: false,
			amount: [
				{ amountValue: 10, currency: "$", classSelected: "" },
				{ amountValue: 50, currency: "$", classSelected: "" },
				{ amountValue: 100, currency: "$", classSelected: "" },
			],
		};
	}

	async componentDidMount() {
		this.setState({ tooltipOpenInfo: false });
	}

	selectAmount(amount, index) {
		let amountArray = [...this.state.amount];
		amountArray.forEach((elem, idx) => {
			if (index === idx) {
				amountArray[index].classSelected = "selected-amount";
			} else {
				amountArray[idx].classSelected = "";
			}
		});

		this.setState({
			selectedAmount: amount.amountValue,
			amount: [...amountArray],
		});
	}

	handleSubmitAmount = () => {
		console.log("submit ", this.state.selectedAmount);
		this.setState({
			success: null,
			error: null,
			showBanner: false,
		});
		this.props.addCredit(
			this.state.selectedAmount,
			this.state.codeAlreadyApplied
		);
	};

	modifyAmount = (e) => {
		let val = parseFloat(e.target.value);
		let regCheck = /^[0-9]{0,5}(\.[0-9]{0,2})?$/;

		if (val.length && !regCheck.test(val)) {
			return;
		} else {
			let amountArray = [...this.state.amount];
			amountArray.forEach((elem) => {
				elem.classSelected = "";
			});
			if (!isNaN(val) && val !== 0) {
				this.setState({
					selectedAmount: e.target.value,
					amount: [...amountArray],
				});
			}
			if (e.target.value === "") {
				this.setState({
					selectedAmount: 0,
					amount: [...amountArray],
				});
			}
		}
	};

	changePromoCode = (e) => {
		if (e.target.value.length > 2) {
			this.setState({ disabledApplyBtn: false });
		} else {
			this.setState({ disabledApplyBtn: true });
		}
		this.setState({
			promoCode: e.target.value,
			success: null,
			error: null,
			showBanner: false,
		});
	};

	applyPromoCode = (e) => {
		let code = this.state.promoCode;
		let userId = this.props.user.userId;

		console.log("this props", this.props.user);

		activateEnterpriseBots(code)
			.then((response) => {
				// console.log("get the reposne =============", response);
				this.setState({ showBanner: true });
				if (response.content && response.content[0] == null) {
					this.setState({ error: "Incorrect code. Try again", success: null });
				} else {
					const domains = response.content;
					let corporateDomainList = domains.filter((domain) => {
						return domain.userDomain !== FRONTM_DOMAIN;
					});
					loadAllDomainsListInLFStorage(corporateDomainList);
					// console.log("sc=uccess");
					this.setState({
						success: "Partner code applied successfully",
						disabledPromoCode: true,
						disabledApplyBtn: true,
						error: null,
						codeAlreadyApplied: true,
					});
				}
				this.props.hideSpinner();
			})
			.catch((error) => {
				this.setState({ showBanner: true });

				console.log(error.message);
				if (error.message) {
					this.setState({ error: error.message, success: null });
				} else {
					this.setState({
						error: "Sorry something went wrong. Please contact to our support",
						success: null,
					});
				}
				this.props.hideSpinner();
			});
		e.preventDefault();
	};

	toggleTooltipInfo = () => {
		this.setState({
			tooltipOpenInfo: !this.state.tooltipOpenInfo,
		});
	};

	render() {
		let { amount } = this.state;
		console.log("State", this.state);
		return (
			<div>
				<div className="credit-header">
					{this.state.showBanner && (
						<div
							style={!this.state.error ? successBannerStyle : errorBannerStyle}
						>
							<span>
								{!this.state.error ? this.state.success : this.state.error}
							</span>
						</div>
					)}
					<div className="d-flex flex-column py-2 px-4">
						<p className="f14 font-weight-bold">Top-up</p>
						<div className="d-flex justify-content-around mb-30">
							{amount.map((data, index) => {
								return (
									<div
										key={index}
										className={
											"d-flex justify-content-center align-items-center amount-circle " +
											data.classSelected
										}
										onClick={this.selectAmount.bind(this, data, index)}
									>
										<div
											className="d-flex justify-content-center align-items-center"
											style={{ width: "40px", height: "40px" }}
										>
											<span className="fs14 mr-1">{data.currency}</span>
											<span className="fs26 font500">{data.amountValue}</span>
										</div>
									</div>
								);
							})}
						</div>
					</div>
					<div className="d-flex flex-row align-items-center py-2 px-4 mt-10 mb-10">
						<span className="f14 font-weight-bold mr-3">Other amount</span>
						<div className="d-flex flex-column justify-content-between">
							<div className="d-flex align-items-center">
								<span className="mr-3" style={{ fontSize: "14px" }}>
									$
								</span>
								<input
									id="inputOtherAmount"
									placeholder="0.00"
									type="number"
									value={
										this.state.selectedAmount === 0
											? ""
											: this.state.selectedAmount
									}
									className="form-control form-control-lg form-input-box-150"
									onChange={this.modifyAmount}
								/>
							</div>
						</div>
					</div>

					<div className="partition-hr" />

					{!this.props.codeAlreadyApplied && (
						<div className="d-flex flex-row align-items-center py-2 px-4 mt-10">
							<span className="f14 font-weight-bold">Partner code</span>
							<div className="d-flex align-items-center px-3 mt-1 mb-10">
								<span className="mr-2">
									<img
										id="promoInfo"
										style={{ width: "18px", cursor: "pointer" }}
										src="/img/infoIcon.png"
										alt="info"
									/>
								</span>
								<Tooltip
									placement="bottom-end"
									isOpen={this.state.tooltipOpenInfo}
									delay={{ show: 0, hide: 0 }}
									target="promoInfo"
									toggle={this.toggleTooltipInfo}
								>
									Enter your partner code here. If you added the code already
									you don't need to enter it again
								</Tooltip>
								<input
									id="inputPromoCode"
									placeholder="Enter code here"
									type="text"
									disabled={this.state.disabledPromoCode ? "disabled" : ""}
									className="form-control form-control-lg form-input-box-150 mr-2"
									onChange={this.changePromoCode}
								/>

								<button
									className="btn btn-block btn-lg btn-icon"
									style={
										this.state.disabledApplyBtn
											? {
													width: "75px",
													borderRadius: "10px",
													backgroundColor: "#fff",
													border: "1px solid rgba(0, 189, 242, 1)",
													color: "rgba(0, 189, 242, 1)",
											  }
											: {
													width: "75px",
													borderRadius: "10px",
													backgroundColor: "rgba(0, 189, 242, 1)",
													color: "#fff",
											  }
									}
									disabled={this.state.disabledApplyBtn}
									onClick={this.applyPromoCode}
								>
									Apply
								</button>
							</div>
						</div>
					)}
					<div className="form-group code-form-group mb-0 py-2 px-4">
						<button
							onClick={this.handleSubmitAmount}
							className="btn btn-block btn-lg btn-icon code-btn-100-per"
							disabled={
								this.state.selectedAmount === 0 ||
								this.state.selectedAmount === "0" ||
								this.state.selectedAmount === ""
									? true
									: false
							}
							ref={(btn) => {
								this.verifyBtn = btn;
							}}
						>
							Continue to payment details
						</button>
					</div>
					<span style={{ fontSize: "10px", padding: "0 0 0 30px" }}>
						Note that payments are in US Dollars
					</span>
				</div>
			</div>
		);
	}
}

export default GetCreditModal;
