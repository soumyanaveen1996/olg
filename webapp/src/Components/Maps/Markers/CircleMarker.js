import React, { PureComponent } from "react";

export default class CircleMarker extends PureComponent {
	render() {
		let { size, color } = this.props;

		return <div className="start-marker" />;
	}
}
