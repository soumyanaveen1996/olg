import React, { Component } from "react";
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
	InfoWindow,
	Polygon,
	Polyline,
	Circle,
} from "react-google-maps";
import Config from "./../../Utils/Config";

function renderMarkers(markers = [], polyline) {
	return markers.map((m, index) => {
		let props = {
			title: m.title,
			position: { lat: m.coordinate.latitude, lng: m.coordinate.longitude },
		};
		if (polyline && index === 0) {
			props.icon = { path: window.google.maps.SymbolPath.CIRCLE, scale: 10 };
		}
		return (
			<Marker {...props}>
				{m.callOut && m.callOut.text && (
					<InfoWindow>
						<div>{m.callOut.text}</div>
					</InfoWindow>
				)}
			</Marker>
		);
	});
}

function renderPolygons(polygons = []) {
	return polygons.map((polygon, index) => {
		return <Polygon {...polygon} key={"polygon" + index} />;
	});
}

function renderPolylines(polylines = []) {
	return polylines.map((polyline, index) => {
		return <Polyline {...polyline} key={"polyline" + index} />;
	});
}

function renderCircles(circles = []) {
	return circles.map((circle, index) => {
		return <Circle {...circle} key={"circle" + index} />;
	});
}

const MyMapComponent = withScriptjs(
	withGoogleMap((props) => {
		let { lat, lng, markers, polygons, polylines, circles } = props;
		return (
			<GoogleMap
				defaultZoom={8}
				defaultCenter={{ lat: lat, lng: lng }}
				ref={props.onMapMounted}
			>
				{renderMarkers(markers, polylines && polylines.length > 0)}
				{renderPolygons(polygons)}
				{renderPolylines(polylines)}
				{renderCircles(circles)}
			</GoogleMap>
		);
	})
);

class MapView extends Component {
	constructor(props) {
		super(props);
	}

	// componentDidUpdate() {
	//   this.setBounds(this.props);
	// }

	setBounds = (props, map) => {
		if (!map || !props.markers || props.markers.length <= 1) {
			return;
		}
		const bounds = new window.google.maps.LatLngBounds();
		this.props.markers.map((marker, i) => {
			bounds.extend(
				new window.google.maps.LatLng(
					marker.coordinate.latitude,
					marker.coordinate.longitude
				)
			);
		});
		map.fitBounds(bounds);
	};

	render() {
		let { thumbnail, active } = this.props;
		let height = thumbnail ? "200px" : "100%";
		let opacity = 1;
		if (thumbnail && !active) {
			opacity = 0.5;
		}

		return (
			<MyMapComponent
				{...this.props}
				googleMapURL={
					"https://maps.googleapis.com/maps/api/js?key=" +
					Config.gmapsApiKey +
					"&v=3.exp&libraries=geometry,drawing,places"
				}
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={
					<div
						style={{
							height: height,
							width: "100%",
							opacity: opacity,
						}}
					/>
				}
				mapElement={
					<div
						style={{
							height: `100%`,
							borderTopRightRadius: thumbnail ? "10px" : "0",
							borderTopLeftRadius: thumbnail ? "10px" : "0",
						}}
					/>
				}
				onMapMounted={(map) => {
					this.setBounds(this.props, map);
				}}
			/>
		);
	}
}

export default MapView;
