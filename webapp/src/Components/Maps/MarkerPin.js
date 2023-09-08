import React, { PureComponent } from "react";
import LocationMarker from "./Markers/LocationMarker";

export default class MarkerPin extends PureComponent {
	render() {
		const { color, size, onClick } = this.props;

		// return (
		//   <div className="station"><span>{"name"}</span></div>
		// )

		return <LocationMarker color={color} size={size} onClick={onClick} />;
	}
}
