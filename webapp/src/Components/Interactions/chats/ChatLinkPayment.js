import React, { PureComponent } from "react";
import ChatLinkSelfUI from "./ChatLinkSelfUI";
import ChatLinkOthersUI from "./ChatLinkOthersUI";
import { hideModal, showModal } from "../../../State/actions/modal";
import { connect } from "react-redux";
import { getStoredForm } from "../../../Services/StorageService";

class ChatLinkPayment extends PureComponent {
	componentDidMount() {
		// console.log("show new form did mount", this.props);
		setTimeout(() => {
			let getOpenForm = getStoredForm();
			if (getOpenForm) {
				this.openForm();
			}
		}, 400);
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		console.log("will recive props ", nextProps);

		let getOpenForm = getStoredForm();
		if (getOpenForm) {
			this.openForm();
		}
	}

	openForm = () => {
		let options = this.props.chat.options;
		console.log("chat ui for payment ", options);

		this.props.showModal(
			"Pay " +
				options.currency.toUpperCase() +
				options.amount +
				" for " +
				options.description,
			"sm",
			this.props.hideModal,
			{
				chat: this.props.chat,
			},
			"START_PAYMENT"
		);
	};

	render() {
		let { chat, conversation, self } = this.props;
		let ChatUI = self ? ChatLinkSelfUI : ChatLinkOthersUI;
		let { options } = chat;
		return (
			<ChatUI chat={chat} conversation={conversation}>
				<div
					style={{
						boxSizing: "border-box",
						width: "260px",
						border: "0.2px solid rgba(91,91,91,0.2)",
						borderRadius: "10px",
						backgroundColor: "#FFF",
						boxShadow: "0 0 4px 0 rgba(0,0,0,0.08)",
						margin: "7px 0",
					}}
				>
					<div className="card" style={{ borderRadius: "10px", border: "0px" }}>
						<div
							className="card-header p-3 justify-content-between"
							style={{ borderBottom: "0px", marginBottom: 0 }}
						>
							<div>
								<span className="d-block title">{options.description}</span>
							</div>
						</div>

						<hr style={{ margin: "0 auto", width: "90%" }} />
						<div
							className="card-body p-3 d-flex flex-column"
							style={{ paddingTop: "0.5rem !important" }}
						>
							<a className="btn btn-sm btn-open" onClick={this.openForm}>
								Make Payment
							</a>
						</div>
					</div>
				</div>
			</ChatUI>
		);
	}
}

let actions = {
	showModal: showModal,
	hideModal: hideModal,
};

export default connect(null, actions)(ChatLinkPayment);
