import React, { Component } from "react";
import Button from "./Elements/Button";
import { getCancelButtonName, getFormFieldElement } from "./Utils";

class FormResponseContentView extends Component {
	constructor(props) {
		super(props);
		let propMessage = this.props.chat.message;
		let message = null;
		let fields = [];
		if (propMessage && Array.isArray(propMessage)) {
			message = propMessage[0];
			if (message.fields) {
				fields = message.fields;
			} else {
				fields = propMessage;
			}
		} else {
			fields = propMessage.fields;
		}
		// let fields = message ? message.fields : [];
		this.state = { fields };
	}
	onBlurFormField = () => {};

	renderElement = ({ field, action, index }) => {
		let { chat } = this.props;
		return getFormFieldElement(
			index,
			false,
			chat,
			field,
			action,
			true,
			this.onBlurFormField
		);
	};

	render() {
		let { fields = [] } = this.state;
		let { chat } = this.props;
		let { message, options } = chat;

		let cancelButtonName = getCancelButtonName(message, options);
		// console.log("all the fields map response=======", this.state);
		return (
			<div className="card" style={{ borderRadius: "10px", border: "0px" }}>
				<div className="card-body p-2 d-flex justify-content-center align-items-center flex-column">
					<form style={{ width: "100%" }} className="px-2">
						{fields.map((field, index) => this.renderElement({ field, index }))}
						<div className="d-flex justify-content-center">
							<Button
								text={cancelButtonName}
								className="btn btn-install ml-3"
								action={this.props.cancel}
							/>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default FormResponseContentView;
