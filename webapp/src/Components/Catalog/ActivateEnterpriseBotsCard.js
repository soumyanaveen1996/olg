import React, { Component } from "react";
import LinkToPopUp from "../ModalMessages/LinkToPopUp";

class ActivateEnterpriseBotsCard extends Component {
	refreshCompanies = () => {
		this.props.refresh();
	};
	render() {
		let { body } = this.props;
		let imgNode = (
			<div
				style={{
					backgroundColor: "#bbb",
					borderRadius: 60,
					width: 80,
					height: 80,
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<span
					style={{
						color: "#333333",
						fontSize: 50,
						fontWeight: "normal",
					}}
				>
					+
				</span>
			</div>
		);

		let cardNode = (
			<div className="card h-100 text-center">
				<div className="d-flex p-2 justify-content-center align-items-center">
					{imgNode}
				</div>
				<div className="card-body">
					<h6 className="card-title">{body}</h6>
				</div>
			</div>
		);

		return (
			<LinkToPopUp
				modalProps={{
					title: "Activate Enterprise Bots",
					componentId: "ACTIVATE_ENTERPRISE_BOTS",
					componentProps: { onSubmit: this.refreshCompanies },
				}}
			>
				{cardNode}
			</LinkToPopUp>
		);
	}
}

export default ActivateEnterpriseBotsCard;
