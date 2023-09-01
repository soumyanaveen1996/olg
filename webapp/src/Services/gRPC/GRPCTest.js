import React from "react";
import QueueServiceClient from "../Clients/InteractionService";
import AuthServiceClient from "../Clients/AuthServiceClient";

export default class GRPCTest extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}

	onClickButton = (e) => {
		e.preventDefault();
		QueueServiceClient.setupMessagesReceiver((data) => {
			this.setState({ data });
		});
	};

	doLogin = (e) => {
		e.preventDefault();
		AuthServiceClient.doFrontMLogin();
	};

	render() {
		return (
			<div>
				<button onClick={this.onClickButton}>Click here</button>

				<div className="m-4">
					<button onClick={this.doLogin}>doLogin here</button>
				</div>

				{JSON.stringify(this.state.data)}
			</div>
		);
	}
}
