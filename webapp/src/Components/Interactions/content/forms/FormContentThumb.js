import React, { PureComponent } from "react";
import { connect } from "react-redux";
import FormContentTitle from "./FormContentTitle";
import { getFormDescription, isFormCompleted } from "./Utils";
import {
	sendAMessage,
	setFormInPopup,
	setFormInWindow,
} from "../../../../State/actions/chats";
import { getStoredForm } from "../../../../Services/StorageService";

class FormContentThumb extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
		this.formContentView = React.createRef();
	}

	componentDidMount() {
		// console.log("show new form did mount", this.props);
		setTimeout(() => {
			let getOpenForm = getStoredForm();
			if (
				getOpenForm &&
				this.props.chat.messageId &&
				getOpenForm[this.props.chat.messageId] &&
				getOpenForm[this.props.chat.messageId].options.formId ===
				this.props.chat.options.formId
			) {
				this.openForm();
			}
		}, 400);
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		let getOpenForm = getStoredForm();
		if (
			getOpenForm &&
			this.props.chat.messageId &&
			getOpenForm[this.props.chat.messageId] &&
			getOpenForm[this.props.chat.messageId].options.formId ===
			this.props.chat.options.formId
		) {
			this.openForm();
		}
	}

	openForm = () => {
		const { chat } = this.props;

		if (this.props.background && this.props.background.type === 240) {
			this.props.setFormInWindow(chat);
		} else {
			this.props.setFormInPopup(chat);
		}
	};

	getIcon = (chat) => {
		let { options } = chat;
		let inProgress = options && options.stage === "OPENED";
		let completed = isFormCompleted(chat);

		if (inProgress) {
			return (
				<i
					className="icon-star-half"
					style={{ color: "#F2BF00", fontWeight: "bold" }}
				/>
			);
		} else {
			if (completed) {
				return (
					<i
						className="icon-check"
						style={{
							color: "#2FC76F",
							fontWeight: "bold",
							fontSize: "10px",
						}}
					/>
				);
			} else {
				return (
					<i
						className="icon-arrow-right"
						style={{ color: "#638DFF", fontWeight: "bold" }}
					/>
				);
			}
		}
	};

	render() {
		const { chat } = this.props;
		// console.log("chats of the form ", this.props);

		let { message, options, messageType } = chat;
		let description = getFormDescription(message, options);

		let completed = isFormCompleted(chat);

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

					{this.getIcon(chat)}
				</div>

				<hr style={{ margin: "0 auto", width: "90%" }} />
				<div
					className="card-body p-3 d-flex flex-column"
					style={{ paddingTop: "0.5rem !important" }}
				>
					{description && (
						<small className="text-muted mb-2 text-center">{description}</small>
					)}

					{!completed && (
						<a className="btn btn-sm btn-open" onClick={this.openForm}>
							Continue
						</a>
					)}

					{completed && (
						<a className="btn btn-sm btn-install" onClick={this.openForm}>
							See Form
						</a>
					)}
				</div>
			</div>
		);
	}
}

let actions = {
	sendMessage: sendAMessage,
	setFormInPopup: setFormInPopup,
	setFormInWindow: setFormInWindow,
};

export default connect(null, actions)(FormContentThumb);
