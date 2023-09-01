import React from "react";
import { CardBody, CardTitle, CardText } from "reactstrap";
import CardLayout from "./CardLayout";
import { hideModal, showModal } from "../../../../State/actions/modal";
import { connect } from "react-redux";
import { truncateText } from "../Utils";

class DataCard extends React.PureComponent {
	openData = () => {
		let { data, title } = this.props;

		this.props.showModal(
			title,
			"sm",
			this.props.hideModal,
			{
				data,
			},
			"MAP_CARD_DATA_VIEW"
		);
	};

	render() {
		let { design, title, description } = this.props;
		if (design === "big") {
			return (
				<CardLayout width="300px" height="150px">
					<CardBody
						style={{ width: "55%" }}
						className="d-flex flex-column justify-content-between"
					>
						<div>
							{title && <CardTitle>{truncateText(title, 30)}</CardTitle>}
							<CardText>{truncateText(description, 64)}</CardText>
						</div>
						<a
							className="primary-link d-flex  align-items-center"
							style={{ fontSize: "12px", color: "#638DFF" }}
							onClick={this.openData}
						>
							More info
						</a>
					</CardBody>
				</CardLayout>
			);
		} else {
			return (
				<CardLayout width="120px" height="145px">
					<CardBody
						style={{ width: "55%" }}
						className="d-flex flex-column justify-content-between"
					>
						{title && (
							<CardTitle style={{ fontSize: "1rem" }}>
								{truncateText(title, 30)}
							</CardTitle>
						)}
						<CardText>{truncateText(description, 64)}</CardText>
						<a
							className="primary-link d-flex  align-items-center"
							style={{ fontSize: "12px", color: "#638DFF" }}
							onClick={this.openData}
						>
							More info
						</a>
					</CardBody>
				</CardLayout>
			);
		}
	}
}

let actions = {
	showModal: showModal,
	hideModal: hideModal,
};

export default connect(null, actions)(DataCard);
