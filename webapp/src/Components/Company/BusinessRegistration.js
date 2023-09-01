import React, { Component } from "react";
import Error from "./../Common/Error";

class BusinessRegistration extends Component {
	state = {
		domains: [],
	};

	submitForm = (e) => {
		e.preventDefault();
		this.props.submit(this.state);
	};

	updateCode = (e) =>
		this.setState({ companyId: e.target.value.toUpperCase().trim() });

	updateName = (e) => this.setState({ companyName: e.target.value });

	updateDescription = (e) =>
		this.setState({ companyDescription: e.target.value });

	updateAddress = (e) => this.setState({ companyAddress: e.target.value });

	updateCountry = (e) => this.setState({ companyCountry: e.target.value });

	onRegisterCompany = (e) => {};

	render() {
		let {
			companyId,
			companyName,
			companyDescription,
			companyAddress,
			companyCountry,
		} = this.state;

		let error = this.props.error;
		return (
			<div className="flex d-flex flex-column">
				<span className="d-flex justify-content-center m-3 align-items-center title">
					Business Registration
				</span>

				{error && (
					<div className="row">
						<div className="col-md-6 offset-md-3 mt-4">
							<Error message={error} />
						</div>
					</div>
				)}

				<div className="row">
					<div className="col-md-6 offset-md-3 p-3 border1 mb-30 rounded">
						<form onSubmit={this.submitForm}>
							<div className="form-group row">
								<label
									htmlFor="companycode"
									className="col-sm-4 col-form-label"
								>
									Business Code
								</label>
								<div className="col-sm-8">
									<input
										type="text"
										className="form-control"
										id="companycode"
										placeholder="Code"
										onChange={this.updateCode}
										value={companyId}
									/>
								</div>
							</div>
							<div className="form-group row">
								<label
									htmlFor="companyname"
									className="col-sm-4 col-form-label"
								>
									Business Name
								</label>
								<div className="col-sm-8">
									<input
										type="text"
										className="form-control"
										id="companyname"
										placeholder="Company Name"
										onChange={this.updateName}
										value={companyName}
									/>
								</div>
							</div>
							<div className="form-group row">
								<label
									htmlFor="description"
									className="col-sm-4 col-form-label"
								>
									Description
								</label>
								<div className="col-sm-8">
									<input
										type="text"
										className="form-control"
										id="description"
										placeholder="Company Description"
										onChange={this.updateDescription}
										value={companyDescription}
									/>
								</div>
							</div>
							<div className="form-group row">
								<label htmlFor="address" className="col-sm-4 col-form-label">
									Address
								</label>
								<div className="col-sm-8">
									<textarea
										id="address"
										rows="2"
										cols="50"
										onChange={this.updateAddress}
										value={companyAddress}
									/>
								</div>
							</div>
							<div className="form-group row">
								<label htmlFor="country" className="col-sm-4 col-form-label">
									Country
								</label>
								<div className="col-sm-8">
									<input
										type="text"
										className="form-control"
										id="country"
										placeholder="Country"
										onChange={this.updateCountry}
										value={companyCountry}
									/>
								</div>
							</div>
							<div className="form-group row">
								<div className="col-sm-12 text-right">
									<button type="submit" className="btn btn-primary pull-right">
										Submit
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default BusinessRegistration;
