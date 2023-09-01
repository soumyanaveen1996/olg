import React from "react";
import LocationMarker from "./Markers/LocationMarker";

function MarkerPin({ color, size, onClick }) {
	return <LocationMarker color={color} size={size} onClick={onClick} />;
}

export default React.memo(MarkerPin);
