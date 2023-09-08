import React, { Component } from "react";
import { Popup } from "react-map-gl";
import MapStyles from "./MapStyles";
import MapComponent from "./MapComponent";
import MarkerComponent from "./MarkerComponent";
import WebMercatorViewport from "viewport-mercator-project";

export default class MapWithMarkers extends Component {
	constructor(props) {
		super(props);
		let points = this.props.points || [];
		if (points.length !== 0) {
			if (points.length > 1) {
				const viewport = new WebMercatorViewport({
					width: this.props.width,
					height: this.props.height,
				});
				let bounds = this.props.points.map((d) => {
					return [d.longitude, d.latitude];
				});
				console.log("bounds: ", bounds);
				const { longitude, latitude, zoom } = viewport.fitBounds(bounds, {
					padding: 40,
				});
				this.state = { longitude, latitude, zoom };
			} else {
				this.state = {
					longitude: points[0].longitude,
					latitude: points[0].latitude,
					zoom: 9,
				};
			}
		}
	}

	_renderMarker = (mark, index) => {
		return (
			<MarkerComponent
				key={`marker-${index}`}
				longitude={mark.longitude}
				latitude={mark.latitude}
				onClick={() => {}}
				markerSize={this.props.markerSize}
				markerColor={mark.color || this.props.markerColor}
			/>
		);
	};

	_renderCallOuts = (mark, index) => {
		if (mark.callOut) {
			return (
				<Popup
					tipSize={5}
					anchor="top"
					longitude={mark.longitude}
					latitude={mark.latitude}
					closeButton={false}
				>
					{mark.callOut.text}
				</Popup>
			);
		} else {
			return null;
		}
	};

	render() {
		let { points, noMarkers, thumb } = this.props;

		return (
			<MapComponent
				{...this.props}
				{...this.state}
				width="100%"
				height={thumb ? 200 : "100%"}
				mapStyle={MapStyles.MAP_WITH_MARKERS}
			>
				{!noMarkers && points.map(this._renderMarker)}
				{points.map(this._renderCallOuts)}
				{this.props.children}
			</MapComponent>
		);
	}
}
