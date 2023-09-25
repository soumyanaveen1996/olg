import React from "react";
import { Marker } from "react-map-gl";
import MarkerPin from "./MarkerPin";
import VesselSVGMarkup from "./VesselSVGMarkup";
import VehicleDiamondMarker from "./VehicleDiamondMarker";

const MarkerComponent = (props) => {
	let {
		markerSize = 10,
		latitude,
		longitude,
		onClick,
		markerColor = "cyan",
		iconType,
		iconDirection = 0,
		id,
		inSideNav = false,
		inPopup = false,
		markerData,
		msisdn,
		vesselType,
		forSideNav,
	} = props; //arrow, aircraft, poi, circle,

	let node = null;

	let newIconstyles = {
		position: "absolute",
		top: "-25%",
		left: "-25%",
		// width: "55%",
		cursor: "pointer",
		filter: `opacity(0.5) drop-shadow(0 0 0 ${markerColor})`,
	};

	let forSideNavSuspendedAndDisabled = {
		position: "absolute",
		top: "-75%",
		// left: "-95%",
		// width: "55%",
		cursor: "pointer",
		filter: `opacity(0.5) drop-shadow(0 0 0 ${markerColor})`,
	};

	if (iconType === "aircraft") {
		node = (
			<img
				loading="lazy"
				src={"/offlinelms/img/moving-maps-plane_zero.png"}
				style={
					iconDirection
						? {
								position: "absolute",
								top: "50%",
								left: "50%",
								transform:
									"rotate(" + iconDirection + "deg) translate(-50%, -50%)",
								// width: "55%",
								cursor: "pointer",
						  }
						: {
								position: "absolute",
								top: "50%",
								left: "50%",
								transform: "translate(-50%, -50%)",
								// width: "55%",
								cursor: "pointer",
						  }
				}
				onClick={onClick}
				alt="aircraft"
			/>
		);
	} else if (iconType === "arrow") {
		node = (
			<img
				loading="lazy"
				src={"/offlinelms/img/arrow_image.png"}
				style={
					iconDirection
						? {
								position: "absolute",
								top: "50%",
								left: "50%",
								transform:
									"rotate(" + iconDirection + "deg) translate(-50%, -50%)",
								// width: "55%",
								cursor: "pointer",
						  }
						: {
								position: "absolute",
								top: "50%",
								left: "50%",
								transform: "translate(-50%, -50%)",
								// width: "55%",
								cursor: "pointer",
						  }
				}
				onClick={onClick}
				alt="arrow"
			/>
		);
	} else if (iconType === "vessel") {
		node = (
			<VesselSVGMarkup
				loading="lazy"
				color={markerColor}
				inSideNav={inSideNav}
				inPopup={inPopup}
				iconDirection={iconDirection}
				onClick={onClick}
				vesselType={vesselType}
			/>
		);
	} else if (iconType === "circle") {
		node = (
			<VehicleDiamondMarker
				loading="lazy"
				color={markerColor || "green"}
				inSideNav={inSideNav}
				inPopup={inPopup}
				onClick={onClick}
			/>
		);
	} else if (iconType === "Yacht") {
		node = (
			<img
				loading="lazy"
				src={"/offlinelms/img/yatchRBG.png"}
				style={newIconstyles}
				onClick={onClick}
				alt="yacht"
			/>
		);
	} else if (iconType === "Tender") {
		node = (
			<img
				loading="lazy"
				src={"/offlinelms/img/yatchRBG.png"}
				style={newIconstyles}
				onClick={onClick}
				alt="yacht"
			/>
		);
	} else if (iconType === "Jetski") {
		node = (
			<img
				loading="lazy"
				src={"/offlinelms/img/jetskiRBG.png"}
				style={newIconstyles}
				onClick={onClick}
				alt="yacht"
			/>
		);
	} else if (iconType === "Lifejacket") {
		node = (
			<img
				loading="lazy"
				src={"/offlinelms/img/lifeJacketRBG.png"}
				style={newIconstyles}
				onClick={onClick}
				alt="yacht"
			/>
		);
	} else if (iconType === "vesselSuspended") {
		node = (
			<img
				loading="lazy"
				src={"/offlinelms/img/vesselSuspended.png"}
				style={forSideNav ? forSideNavSuspendedAndDisabled : newIconstyles}
				onClick={onClick}
				alt="yacht"
			/>
		);
	} else if (iconType === "vesselDeleted") {
		node = (
			<img
				loading="lazy"
				src={"/offlinelms/img/vesselDisabled.png"}
				style={forSideNav ? forSideNavSuspendedAndDisabled : newIconstyles}
				onClick={onClick}
				alt="yacht"
			/>
		);
	} else {
		node = (
			<MarkerPin
				loading="lazy"
				color={markerColor}
				size={markerSize}
				onClick={onClick}
			/>
		);
	}
	return (
		<>
			{inSideNav || inPopup ? (
				node
			) : (
				<div id={id} className="Hint-dot-outer">
					<div
						className="outer-first-child"
						style={{ color: markerColor }}
					></div>
					<div className="Hint-dot-inner">
						<div
							className="inner-first-child"
							style={{ color: markerColor }}
						></div>
						{msisdn ? (
							<span className="marker-label-styles">
								{msisdn.length <= 6
									? msisdn
									: msisdn.substring(msisdn.length - 6)}
							</span>
						) : null}
						{node}
					</div>
				</div>
			)}
		</>
	);

	//return <>{node}</>;
};

export default React.memo(MarkerComponent);
