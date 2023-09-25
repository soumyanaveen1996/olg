import React from "react";
import { Marker } from "react-map-gl";
import MarkerPin from "./MarkerPin";

const MarkerComponent = (props) => {
	let {
		markerSize = 5,
		latitude,
		longitude,
		onClick,
		markerColor,
		iconType,
		iconDirection,
		markerData,
	} = props; //arrow, aircraft, poi, circle,

	let node = null;

	// if (iconDirection) {
	//   iconDirection -= 90;
	// }

	let offset = null;

	if (iconType === "aircraft") {
		node = (
			<img
				loading="lazy"
				src={"/offlinelms/img/moving-maps-plane_zero.png"}
				style={
					iconDirection
						? {
								transform: "rotate(" + iconDirection + "deg)",
								width: "55%",
								cursor: "pointer",
						  }
						: { width: "55%" }
				}
				onClick={onClick}
				alt="aircraft"
			/>
		);
		offset = { left: -29.1, top: -19.1 };
	} else if (iconType === "arrow") {
		node = (
			<img
				loading="lazy"
				src={"/offlinelms/img/arrow_image.png"}
				style={
					iconDirection
						? {
								transform: "rotate(" + iconDirection + "deg)",
								width: "55%",
								cursor: "pointer",
						  }
						: { width: "55%", cursor: "pointer" }
				}
				onClick={onClick}
				alt="arrow"
			/>
		);
		offset = { left: -27, top: -27 };
	} else if (iconType === "circle") {
		node = (
			<img
				loading="lazy"
				src={"/offlinelms/img/arrow_image.png"}
				style={
					iconDirection
						? {
								transform: "rotate(" + iconDirection + "deg)",
								width: "55%",
								cursor: "pointer",
						  }
						: { width: "55%", cursor: "pointer" }
				}
				onClick={onClick}
				alt="arrow"
			/>
		);
		offset = { left: -27, top: -27 };
	} else {
		node = (
			<MarkerPin color={markerColor} size={markerSize} onClick={onClick} />
		);
	}

	return (
		<Marker
			anchor="bottom"
			longitude={longitude}
			latitude={latitude}
			offsetLeft={offset ? offset.left : 0}
			offsetTop={offset ? offset.top : 0}
		>
			{node}
		</Marker>
	);
};

export default MarkerComponent;
