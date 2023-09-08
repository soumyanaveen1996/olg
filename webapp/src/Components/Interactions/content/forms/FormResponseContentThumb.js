import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { hideModal, showModal } from "../../../../State/actions/modal";
import FormContentTitle from "./FormContentTitle";
import { getFormDescription, getFormTitle } from "./Utils";

class FormResponseContentThumb extends PureComponent {
	openForm = () => {
		this.props.showModal(
			getFormTitle(this.props.chat.message, this.props.chat.options),
			"sm",
			this.props.hideModal,
			{
				chat: this.props.chat,
			},
			"OPEN_FORM_RESPONSE_CONTENT"
		);
	};

	render() {
		const { chat } = this.props;
		let { message, options, messageType } = chat;

		let description = getFormDescription(message, options);

		return (
			<div className="card" style={{ borderRadius: "10px", border: "0px" }}>
				<div
					className="card-header p-3 justify-content-between"
					style={{ borderBottom: "0px", marginBottom: 0 }}
				>
					<FormContentTitle
						data={message}
						type={messageType}
						options={options}
					/>

					<span
						className="d-flex justify-content-center align-items-center"
						style={{
							height: "20px",
							width: "20px",
							backgroundColor: "#F4F4F4",
							borderRadius: "50%",
						}}
					>
						<i
							className="icon-check"
							style={{
								color: "#2FC76F",
								fontWeight: "bold",
								fontSize: "10px",
							}}
						/>
					</span>
				</div>

				<hr style={{ margin: "0 auto", width: "90%" }} />
				<div
					className="card-body p-3 d-flex flex-column"
					style={{ paddingTop: "0.5rem !important" }}
				>
					{description && (
						<small className="text-muted mb-2 text-center">{description}</small>
					)}

					<a className="btn btn-sm btn-install" onClick={this.openForm}>
						See Form
					</a>
				</div>
			</div>
		);
	}
}

let actions = {
	showModal: showModal,
	hideModal: hideModal,
};

export default connect(null, actions)(FormResponseContentThumb);
