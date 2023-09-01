import React, { Component } from "react";

class AdsTest extends Component {
	componentDidMount() {
		(window.adsbygoogle = window.adsbygoogle || []).push({});
	}

	render() {
		return (
			<div
				style={{
					marginTop: 15,
					marginBottom: 20,
					border: "solid",
					height: "100%",
				}}
			>
				<p>Ads container --- TEST</p>
				<ins
					className="adsbygoogle"
					style={{ display: "block" }}
					data-ad-client="ca-pub-3515675200375089"
					data-ad-slot="7806394673"
					data-adtest="on"
					data-ad-format="auto"
				/>
			</div>
		);
	}
}

export default AdsTest;
