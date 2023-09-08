import React, { Component } from "react";
import { MessageTypeConstants } from "../../../Services/Message";
import LinkToPopUp from "../../ModalMessages/LinkToPopUp";

class FormWithSelect extends Component {
	state = { selected: [] };

	componentDidMount() {}

	handleInputChange = (event) => {
		let { value } = event.target;
		value = parseInt(value);
		let multiSelect = this.props.option.multiSelect;
		let selected = this.state.selected;
		if (multiSelect) {
			if (selected.indexOf(value) === -1) {
				selected.push(value);
			} else {
				selected.splice(selected.indexOf(value), 1);
			}
		} else {
			if (selected[0] === value) {
				selected.splice(0, 1);
			} else {
				selected[0] = value;
			}
		}
		this.setState({ selected });
	};
	submitForm = (e) => {
		e.preventDefault();
		let { data, sendMessage } = this.props;
		let selected = this.state.selected;

		let messages = selected.map((index) => data[index]);
		messages.completed = true;
		messages.messageId = this.props.messageId;

		sendMessage(messages, MessageTypeConstants.MESSAGE_TYPE_SLIDER_RESPONSE);
	};

	render() {
		const { data } = this.props;
		console.log(data);
		return (
			<div className="p-3 mt-3 rounded">
				<form onSubmit={this.submitForm}>
					<div className="p-3 border1 mb-30 rounded">
						{data.map((message, index) => (
							<div className="form-group row">
								<div className="col-sm-12 d-flex justify-content-between">
									<div>
										<label className="custom-checkbox">
											<input
												type="checkbox"
												value={index}
												checked={this.state.selected.indexOf(index) !== -1}
												onChange={this.handleInputChange}
											/>
											<span>{message.title}</span>
											<span>&nbsp;|&nbsp;</span>
										</label>
									</div>
									{message.data.contact_info &&
										message.data.contact_info.length > 0 && (
											<div>
												<LinkToPopUp
													classes="btn-link pull-right"
													modalSize="modal-sm"
													modalProps={{
														componentId: "SELECTABLE_FORM_DATA_VIEW",
														componentProps: {
															contactInfo: message.data.contact_info,
														},
													}}
												>
													View more details
												</LinkToPopUp>
											</div>
										)}
								</div>
							</div>
						))}
						<div className="form-group row">
							<div className="col-sm-12 text-right">
								<button type="submit" className="btn btn-primary">
									Done
								</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

export default FormWithSelect;
