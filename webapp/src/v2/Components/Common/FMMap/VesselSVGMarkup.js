import React from "react";

const VesselSVGMarkup = ({
	color,
	iconDirection,
	onClick,
	inSideNav,
	inPopup,
	vesselType,
}) => {
	let style;
	if (iconDirection) {
		style = {
			position: "absolute",
			top: "50%",
			left: "50%",
			transform: "translate(-50%, -50%) rotate(" + iconDirection + "deg)",
			// width: "55%",
			cursor: "pointer",
		};
	} else if (inPopup) {
		style = {};
	} else if (inSideNav) {
		style = {
			position: "absolute",
			top: "12%",
			left: "50%",
			transform: "translate(-50%, -50%) rotate(" + iconDirection + "deg)",
			// width: "55%",
			cursor: "pointer",
		};
	} else {
		style = {
			position: "absolute",
			top: "50%",
			left: "50%",
			transform: "translate(-50%, -50%)",
			// width: "55%",
			cursor: "pointer",
		};
	}
	return (
		<div className="vesselSVGIcon" style={style} onClick={onClick}>
			<svg
				width="37"
				height="26"
				viewBox="0 0 37 30"
				xmlns="http://www.w3.org/2000/svg"
			>
				<title>{vesselType}</title>
				<defs>
					<filter
						id="filter0_di_0_9238"
						x="0.5"
						y="0"
						width="36.4375"
						height="30"
						filterUnits="userSpaceOnUse"
						colorInterpolationFilters="sRGB"
					>
						<feFlood floodOpacity="0" result="BackgroundImageFix" />
						<feColorMatrix
							in="SourceAlpha"
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha"
						/>
						<feOffset dy="2" />
						<feGaussianBlur stdDeviation="5" />
						<feColorMatrix
							type="matrix"
							values="0 0 0 0 0.164706 0 0 0 0 0.176471 0 0 0 0 0.235294 0 0 0 0.6 0"
						/>
						<feBlend
							mode="normal"
							in2="BackgroundImageFix"
							result="effect1_dropShadow_0_9238"
						/>
						<feBlend
							mode="normal"
							in="SourceGraphic"
							in2="effect1_dropShadow_0_9238"
							result="shape"
						/>
						<feColorMatrix
							in="SourceAlpha"
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha"
						/>
						<feOffset dy="2" />
						<feGaussianBlur stdDeviation="1.5" />
						<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
						<feColorMatrix
							type="matrix"
							values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"
						/>
						<feBlend
							mode="normal"
							in2="shape"
							result="effect2_innerShadow_0_9238"
						/>
					</filter>
				</defs>
				<g
					id="End-user"
					stroke="none"
					strokeWidth="1"
					fill={color}
					fillRule="evenodd"
				>
					<g id="vesselicon" filter="">
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M11.5 10C11.5 9.44772 11.9477 9 12.5 9H21.3364C21.5703 9 21.7968 9.08198 21.9765 9.23167L25.5777 12.2317C26.0576 12.6315 26.0576 13.3685 25.5777 13.7683L21.9765 16.7683C21.7968 16.918 21.5703 17 21.3364 17H12.5C11.9477 17 11.5 16.5523 11.5 16V10Z"
							fill="#CCCCCC"
						/>
						<path
							d="M21.3364 8.5H12.5C11.6716 8.5 11 9.17157 11 10V16C11 16.8284 11.6716 17.5 12.5 17.5H21.3364C21.6873 17.5 22.027 17.377 22.2965 17.1525L25.8977 14.1525C26.6176 13.5528 26.6176 12.4472 25.8977 11.8475L22.2965 8.84751C22.027 8.62296 21.6873 8.5 21.3364 8.5Z"
							stroke={inSideNav || inPopup ? color : "#2A2D3C"}
						/>
					</g>
				</g>
			</svg>
		</div>
	);
};
export default VesselSVGMarkup;
