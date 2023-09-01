import React, { Component } from "react";
import MapView from "../../Common/MapView";

let PolylineIcons = [
	{
		icon: { path: "M 0,-1 0,1", strokeOpacity: 1, scale: 4 },
		offset: "0",
		repeat: "20px",
	},
	{
		icon: { path: "m0,0 l-1,3 m1,-3 l1,3", strokeOpacity: 1, scale: 4 },
		offset: "100%",
	},
];

let PolylineOptions = {
	strokeOpacity: 0,
	strokeColor: "#fa3d3d",
	icons: PolylineIcons,
};

class MapContent extends React.Component {
	render() {
		let { region, markers, polygons, polylines, circles } = this.props.data;
		if (!region) {
			return null;
		}
		let updPolyLines = [];
		if (
			polylines &&
			polylines.length > 0 &&
			polylines[0] &&
			polylines[0].coordinates
		) {
			polylines = polylines[0].coordinates;

			markers = [
				{
					coordinate: {
						latitude: polylines[0].latitude,
						longitude: polylines[0].longitude,
					},
				},
			];
			for (let i = 1; i < polylines.length; i++) {
				updPolyLines.push({
					path: [
						{ lat: polylines[i - 1].latitude, lng: polylines[i - 1].longitude },
						{ lat: polylines[i].latitude, lng: polylines[i].longitude },
					],
					options: PolylineOptions,
				});
				markers.push({
					coordinate: {
						latitude: polylines[i].latitude,
						longitude: polylines[i].longitude,
					},
				});
			}
		}

		let latitude = region.latitude;
		if (!latitude) {
			latitude = polylines[polylines.length / 2].latitude;
		}
		let longitude = region.longitude;
		if (!longitude) {
			longitude = polylines[polylines.length / 2].longitude;
		}

		return (
			<MapView
				lat={latitude}
				lng={longitude}
				markers={markers}
				polygons={polygons}
				polylines={updPolyLines}
				circles={circles}
				thumbnail={this.props.thumbnail}
				active={this.props.active}
			/>
		);
	}
}

export default MapContent;
