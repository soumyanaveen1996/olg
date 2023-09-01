import React, { Component } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import Config from "../../Utils/Config";

class MapView extends Component {
	state = {
		viewport: {
			width: 900,
			height: 600,
			latitude: 37.7577,
			longitude: -122.4376,
			zoom: 8,
		},
	};

	render() {
		return (
			<ReactMapGL
				mapboxApiAccessToken={Config.mapboxApiAccessToken}
				{...this.state.viewport}
				onViewportChange={(viewport) => this.setState({ viewport })}
			>
				<Marker
					latitude={37.78}
					longitude={-122.41}
					offsetLeft={-20}
					offsetTop={-10}
				>
					<div>You are here</div>
				</Marker>
			</ReactMapGL>
		);
	}
}

export default MapView;
