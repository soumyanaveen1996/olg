import React from "react";
import { CardBody } from "reactstrap";
import CardLayout from "./CardLayout";
// const banner = `<div>
// <img alt="image is" src=
//   style='object-fit: cover;
//           display: block;
//           height: 100%;
//           width: 100%;'/>
// </div>`;
export default class HTMLCard extends React.Component {
	createMarkup = (banner) => {
		return { __html: banner };
	};
	render() {
		let { design, cardHTML } = this.props;

		if (design === "big") {
			return (
				<CardLayout
					width="300px"
					height="250px"
					style={{ minWidth: "300px", height: "250px" }}
				>
					<CardBody
						style={{ width: "55%", padding: "1rem" }}
						className="d-flex flex-column justify-content-between"
					>
						<div dangerouslySetInnerHTML={this.createMarkup(cardHTML)} />
					</CardBody>
				</CardLayout>
			);
		} else {
			return (
				<CardLayout
					width="100%"
					style={{ minWidth: "250px", minHeight: "150px" }}
				>
					<CardBody
						style={{ width: "55%", padding: "1rem" }}
						className="d-flex flex-column justify-content-between"
					>
						<div dangerouslySetInnerHTML={this.createMarkup(cardHTML)} />
					</CardBody>
				</CardLayout>
			);
		}
	}
}
