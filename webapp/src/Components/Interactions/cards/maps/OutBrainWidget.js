import React from "react";
import { CardBody, CardTitle, CardText, CardImg } from "reactstrap";
import { OutbrainWidget } from "react-outbrain-widget";
import CardLayout from "./CardLayout";
export default class OutbrainWidgetCard extends React.Component {
	// This code is ran when the component mounts
	componentDidMount() {
		// (window.adsbygoogle = window.adsbygoogle || []).push({});
	}
	// an outer div for styling purposes
	// changed class to ClassName
	// changed style from string to an object
	createMarkup = (banner) => {
		return { __html: banner };
	};
	render() {
		return <OutBrainFull {...this.props} />;
	}
}

const OutBrainMobile = () => (
	<div className="outbrain-ads-container-mobile d-flex align-items-center justify-content-center">
		<div className="card-body">
			<OutbrainWidget
				dataSrc="http://airindia.frontm.com/"
				dataWidgetId="MB_1"
				className="OUTBRAIN"
			/>
		</div>
	</div>
);

const OutBrainFull = (props) => {
	const { design } = props;
	if (design === "big") {
		return (
			<CardLayout
				width="100%"
				style={{ minWidth: "300px", minHeight: "250px" }}
			>
				<CardBody
					style={{ width: "55%", padding: "1rem" }}
					className="d-flex flex-column justify-content-between"
				>
					<OutbrainWidget
						dataSrc="http://airindia.frontm.com/"
						dataWidgetId="GS_9"
						className="OUTBRAIN"
					/>
				</CardBody>
			</CardLayout>
		);
	} else {
		return (
			<CardLayout width="100%" style={{ minWidth: "250px", height: "150px" }}>
				<CardBody
					style={{ width: "55%", padding: "1rem" }}
					className="d-flex flex-column justify-content-between"
				>
					<OutbrainWidget
						dataSrc="http://airindia.frontm.com/"
						dataWidgetId="GS_9"
						className="OUTBRAIN"
					/>
				</CardBody>
			</CardLayout>
		);
	}
};
