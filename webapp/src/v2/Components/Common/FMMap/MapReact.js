import * as React from "react";
import { createRoot } from 'react-dom/client';
import { useState, useCallback } from "react";
import MapGL, { Marker, NavigationControl } from "react-map-gl";

import ControlPanel from "./control-panel";
import LocationMarker from "./Markers/LocationMarker";
import MarkerComponent from "./MarkerComponent";

const TOKEN =
	"pk.eyJ1IjoiZ2FjaWx1IiwiYSI6ImNqcHh0azRhdTFjbXQzeW8wcW5vdXhlMzkifQ.qPfpVkrWbk-GSBY3uc6z3A"; // Set your mapbox token here

const navStyle = {
	position: "absolute",
	top: 0,
	left: 0,
	padding: "10px",
};

function MapReact(props) {
	const [viewport, setViewport] = useState({
		latitude: 40,
		longitude: -100,
		zoom: 3.5,
		bearing: 0,
		pitch: 0,
	});
	const [marker, setMarker] = useState({
		latitude: 40,
		longitude: -100,
	});
	const [events, logEvents] = useState({});

	const onMarkerDragStart = useCallback((event) => {
		logEvents((_events) => ({ ..._events, onDragStart: event.lngLat }));
	}, []);

	const onMarkerDrag = useCallback((event) => {
		logEvents((_events) => ({ ..._events, onDrag: event.lngLat }));
	}, []);

	const onMarkerDragEnd = useCallback((event) => {
		logEvents((_events) => ({ ..._events, onDragEnd: event.lngLat }));
		setMarker({
			longitude: event.lngLat[0],
			latitude: event.lngLat[1],
		});
	}, []);

	return (
		<>
			<MapGL
				{...viewport}
				width="100%"
				height="100vh"
				mapStyle="mapbox://styles/mapbox/dark-v9"
				onViewportChange={setViewport}
				mapboxApiAccessToken={TOKEN}
			>
				<Marker
					longitude={marker.longitude}
					latitude={marker.latitude}
					offsetTop={-20}
					offsetLeft={-10}
					draggable
					onDragStart={onMarkerDragStart}
					onDrag={onMarkerDrag}
					onDragEnd={onMarkerDragEnd}
				>
					<LocationMarker size={20} />
				</Marker>

				<div className="nav" style={navStyle}>
					<NavigationControl />
				</div>
			</MapGL>
			<ControlPanel events={events} />
		</>
	);
}
document.body.style.margin = 0;
const root = createRoot(document.body.appendChild(document.createElement("div")));
root.render(
	<MapReact />
);

export default MapReact;
