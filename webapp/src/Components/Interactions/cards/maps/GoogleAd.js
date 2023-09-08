import React from "react";
import { CardBody, CardTitle, CardText, CardImg } from "reactstrap";
import CardLayout from "./CardLayout";

export default class GoogleAd extends React.Component {
	// This code is ran when the component mounts
	componentDidMount() {
		(window.adsbygoogle = window.adsbygoogle || []).push({});
	}

	// an outer div for styling purposes
	// changed class to ClassName
	// changed style from string to an object

	render() {
		return <AdsDefault {...this.props} />;
	}
}

const AdsMobile = () => (
	<div className="ads-container">
		<ins
			className="adsbygoogle ads-airindia"
			data-ad-client="ca-pub-3515675200375089"
			// data-full-width-responsive="true"
			style={{ display: "inline-block" }}
		/>
	</div>
);

const AdsDefault = (props) => {
	const { design } = props;
	if (design === "big") {
		return (
			<CardLayout
				width="100%"
				height="100%"
				style={{ minWidth: "300px", minHeight: "250px" }}
			>
				<CardBody
					style={{ width: "55%", padding: "1rem" }}
					className="d-flex flex-column justify-content-between"
				>
					<ins
						className="adsbygoogle google-ad"
						data-ad-client="ca-pub-3515675200375089"
						data-ad-slot="1354797124"
						style={{ display: "inline-block" }}
					/>
					{/*<ins*/}
					{/*  class="adsbygoogle"*/}
					{/*  style={{ display: "block"}}*/}
					{/*  data-ad-client="ca-pub-3515675200375089"*/}
					{/*  data-ad-slot="3542799547"*/}
					{/*  data-ad-format="auto"*/}
					{/*  data-full-width-responsive="true"*/}
					{/*/>*/}
				</CardBody>
			</CardLayout>
		);
	} else {
		return (
			<CardLayout
				width="100%"
				height="100%"
				style={{ minWidth: "250px", height: "150px" }}
			>
				<CardBody
					style={{ width: "55%", padding: "1rem" }}
					className="d-flex flex-column justify-content-between"
				>
					<ins
						className="adsbygoogle google-ad"
						data-ad-client="ca-pub-3515675200375089"
						data-ad-slot="1354797124"
						style={{ display: "inline-block" }}
					/>
					{/*<ins*/}
					{/*  class="adsbygoogle"*/}
					{/*  style={{ display: "block"}}*/}
					{/*  data-ad-client="ca-pub-3515675200375089"*/}
					{/*  data-ad-slot="3542799547"*/}
					{/*  data-ad-format="auto"*/}
					{/*  data-full-width-responsive="true"*/}
					{/*/>*/}
				</CardBody>
			</CardLayout>
		);
	}
};
