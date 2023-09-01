import React, { Component } from "react";
import MapStyles from "./MapStyles";
import PolylineOverlay from "./PolyLineOverlay";
import MapWithMarkers from "./MapWithMarkers";

export default class MapWithRoute extends Component {
	render() {
		let { points } = this.props;

		return (
			<MapWithMarkers
				{...this.props}
				mapStyle={MapStyles.MAP_WITH_MARKERS} //   { ...points[0], color: "teal" }, // points={[
				//   { ...points[points.length - 1], color: "maroon" }
				// ]}
				points={points}
				noMarkers
			>
				<PolylineOverlay
					points={points.map((d) => {
						return [d.longitude, d.latitude];
					})}
				/>
			</MapWithMarkers>
		);
	}
}
