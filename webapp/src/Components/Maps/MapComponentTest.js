import React, { Component } from "react";
import MapGL, { Popup } from "react-map-gl";
import Config from "../../Utils/Config";
import "./maps.css";
import WebMercatorViewport from "viewport-mercator-project";
import MapStyles from "./MapStyles";
import PolylineOverlay from "./PolyLineOverlay";
import MarkerComponent from "./MarkerComponent";

export default class MapComponentTest extends Component {
	constructor(props) {
		super(props);

		let {
			width,
			height,
			toFitBounds,
			boundPoints = [],
			latitude,
			longitude,
			zoom,
		} = this.props;

		if (toFitBounds) {
			const viewport = new WebMercatorViewport({
				width,
				height,
			});
			let bounds = boundPoints.map((d) => {
				return [d.longitude, d.latitude];
			});
			const bounded = viewport.fitBounds(bounds, {
				padding: 40,
			});

			latitude = bounded.latitude;
			longitude = bounded.longitude;
			zoom = bounded.zoom;
		}
		this.state = {
			viewport: {
				latitude: latitude,
				longitude: longitude,
				zoom: zoom,
				bearing: 0,
				pitch: 0,
			},
		};
	}

	_onViewportChange = (viewport) => this.setState({ viewport });

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
					key={`marker-popup-${index}`}
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
		const { viewport } = this.state;
		const { thumb, markers, routes } = this.props;

		return (
			<MapGL
				{...viewport}
				width="1000px"
				height={thumb ? 200 : "500px"}
				mapStyle={MapStyles.MAP_WITH_MARKERS}
				onViewportChange={this._onViewportChange}
				mapboxApiAccessToken={Config.mapboxApiAccessToken}
			>
				{markers && markers.map(this._renderMarker)}
				{markers && markers.map(this._renderCallOuts)}
				{routes && <PolylineOverlay points={routes} />}
			</MapGL>
		);
	}
}
