import React, { Component } from "react";
import CreateConversationContainer from "../../Containers/CreateConversationContainer";
import ModalPopup from "../ModalMessages/ModalPopup";

class NewChatButton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			createConv: false,
		};
	}

	showCreateConversation = () => this.setState({ createConv: true });
	closeCreateConversation = () => this.setState({ createConv: false });

	render() {
		return (
			<div>
				<a
					style={{
						borderRadius: "2px",
						boxShadow: "none",
						padding: ".5rem 0.3rem",
						color: "#638DFF",
					}}
					onClick={this.showCreateConversation}
					className="btn btn-default d-inline-flex justify-content-center align-items-center"
				>
					{/*New Conversation{" "}*/}
					<span className="dot ml-2 d-flex align-items-center justify-content-center">
						<i
							className="icon-bubble"
							style={{
								fontWeight: "bold",
								color: "#fff",
								fontSize: "12px",
							}}
						/>
					</span>
					{/*<img className="dot ml-2" src="/img/circled-plus.png" />*/}
				</a>

				{this.state.createConv && (
					<ModalPopup
						onClose={this.closeCreateConversation}
						size="sm"
						title="New Conversation"
					>
						<CreateConversationContainer
							onComplete={this.closeCreateConversation}
						/>
					</ModalPopup>
				)}
			</div>
		);
	}
}

export default NewChatButton;
