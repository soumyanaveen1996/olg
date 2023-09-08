import React, { PureComponent } from "react";
import ChatLinkSelfUI from "./ChatLinkSelfUI";
import ChatLinkOthersUI from "./ChatLinkOthersUI";
import { hideModal, showModal } from "../../../State/actions/modal";
import { connect } from "react-redux";
import ChatOthersUI from "./ChatOthersUI";
import { setFormInWindow } from "../../../State/actions/chats";
import { getStoredForm } from "../../../Services/StorageService";

class ChatMessageTable extends PureComponent {
	constructor(props) {
		super(props);
		this.state = { more: false };
	}

	componentDidMount() {
		// console.log("show new form did mount", this.props);
		setTimeout(() => {
			let getOpenForm = getStoredForm();
			const { chat } = this.props;
			if (
				getOpenForm &&
				this.props.chat.messageId &&
				getOpenForm[this.props.chat.messageId] &&
				getOpenForm[this.props.chat.messageId].options.tableId ===
					this.props.chat.options.tableId &&
				this.props.background &&
				this.props.background.type === 240
			) {
				this.props.setFormInWindow(chat);
			}
		}, 400);
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		let getOpenForm = getStoredForm();
		const { chat } = this.props;
		if (
			getOpenForm &&
			this.props.chat.messageId &&
			getOpenForm[this.props.chat.messageId] &&
			getOpenForm[this.props.chat.messageId].options.tableId ===
				this.props.chat.options.tableId &&
			this.props.background &&
			this.props.background.type === 240
		) {
			this.props.setFormInWindow(chat);
		}
	}

	toggleMore = () => {
		if (this.props.background && this.props.background.type === 240) {
			const { chat } = this.props;
			this.props.setFormInWindow(chat);
		} else {
			this.setState({ more: !this.state.more });
		}
	};

	openTableRow = (row) => {
		let keys = Object.keys(row);
		this.props.showModal(
			row[keys[0]],
			"sm",
			this.props.hideModal,
			{
				data: row,
			},
			"TABLE_MESSAGE_ROW"
		);
	};

	renderShow = () => {
		let { chat, background } = this.props;
		let { more } = this.state;
		let rows = chat.message || [];
		if (rows.length > 5) {
			return (
				<a
					onClick={this.toggleMore}
					style={{
						borderBottomRightRadius: "10px",
						borderBottomLeftRadius: "10px",
						borderTop: "1px solid #DEDEDE",
					}}
					className="d-flex justify-content-center align-items-center p-2 bg-white primary-link"
				>
					{more ? "See less" : "See more"}
				</a>
			);
		} else {
			if (background && background.type === 240) {
				return (
					<a
						onClick={this.toggleMore}
						style={{
							borderBottomRightRadius: "10px",
							borderBottomLeftRadius: "10px",
							borderTop: "1px solid #DEDEDE",
						}}
						className="d-flex justify-content-center align-items-center p-2 bg-white primary-link"
					>
						{more ? "See less" : "See more"}
					</a>
				);
			}
		}
	};

	render() {
		// console.log("chsat message table ", this.props);

		let { chat, conversation, self } = this.props;
		let { more } = this.state;
		let ChatUI = self ? ChatLinkSelfUI : ChatLinkOthersUI;

		let rows = chat.message || [];
		if (rows.length === 0) {
			return (
				<ChatOthersUI chat={chat} conversation={conversation}>
					No data available
				</ChatOthersUI>
			);
		}

		let options = chat.options;
		let columnNames =
			options.columnNames && Array.isArray(options.columnNames)
				? options.columnNames
				: Object.keys(rows[0]);

		let count = more ? 20 : 5;

		return (
			<ChatUI chat={chat} conversation={conversation}>
				<div
					className="d-flex flex-column"
					style={{
						overflowX: "auto",
						maxWidth: "85%",
						borderRadius: "10px",
						backgroundColor: "#FFF",
						boxShadow: "0 0 4px 0 rgba(0,0,0,0.08)",
					}}
				>
					<div
						style={{ borderBottom: "1px solid #DEDEDE" }}
						className="d-flex flex-column p-2"
					>
						<h5 style={{ marginBottom: 0, fontSize: "18px", color: "#666" }}>
							{options.title}
						</h5>
						<div style={{ fontSize: "14px", color: "#666" }}>
							{options.description}
						</div>
					</div>
					<table className="table" style={{ overflowX: "auto" }}>
						<tbody>
							<tr
								style={{
									backgroundColor: "#F4F4F4",
									height: "36px",
								}}
							>
								{columnNames.map((h, inx) => (
									<td
										key={inx}
										style={{
											fontSize: "12px",
											color: "#9B9B9B",
											padding: "0.5rem 1rem",
											borderTop: "0px",
											textTransform: "capitalize",
											borderBottom: "1px solid #DEDEDE",
										}}
									>
										{h}
									</td>
								))}
							</tr>
							{rows.slice(0, count).map((row, inx) => (
								<tr key={inx}>
									{columnNames.map((column, index) => {
										if (index === 0) {
											return (
												<td key={index} style={{ padding: "0.5rem 1rem" }}>
													<a
														className="primar`y-link"
														onClick={() => this.openTableRow(row)}
													>
														{row[column] ? row[column].toString() : ""}
													</a>
												</td>
											);
										}
										return (
											<td key={index} style={{ padding: "0.5rem 1rem" }}>
												{row[column] ? row[column].toString() : ""}
											</td>
										);
									})}
								</tr>
							))}
						</tbody>
					</table>

					{this.renderShow()}
				</div>
			</ChatUI>
		);
	}
}

let actions = {
	showModal: showModal,
	hideModal: hideModal,
	setFormInWindow: setFormInWindow,
};

export default connect(null, actions)(ChatMessageTable);
