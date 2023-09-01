import React from "react";

const VehicleDiamondMarker = ({
	color,
	iconDirection,
	onClick,
	inSideNav,
	inPopup,
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
		style = {
			position: "relative",
			bottom: "7px",
		};
	} else if (inSideNav) {
		style = {
			position: "absolute",
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
		<div className="VehicleDiamondMarker" style={style} onClick={onClick}>
			<svg
				width="46"
				height="46"
				viewBox="0 0 46 46"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g filter="url(#filter0_d)">
					<rect
						x="23"
						y="11"
						width="14.1421"
						height="14.1421"
						rx="3"
						transform="rotate(45 23 11)"
						fill="#2A2D3C"
					/>
					<rect
						x="23"
						y="10.2618"
						width="15.1861"
						height="15.1861"
						rx="3.52198"
						transform="rotate(45 23 10.2618)"
						stroke="#2A2D3C"
						strokeWidth="1.04396"
					/>
				</g>
				<g filter="url(#filter1_i)">
					<rect
						x="23"
						y="11"
						width="14.1421"
						height="14.1421"
						rx="3"
						transform="rotate(45 23 11)"
						fill={color}
					/>
				</g>
				<rect
					x="23"
					y="10.2618"
					width="15.1861"
					height="15.1861"
					rx="3.52198"
					transform="rotate(45 23 10.2618)"
					stroke="#2A2D3C"
					strokeWidth="1.04396"
				/>
				<defs>
					<filter
						id="filter0_d"
						x="0.523438"
						y="0.523682"
						width="44.9531"
						height="44.9526"
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
						<feGaussianBlur stdDeviation="5.5" />
						<feComposite in2="hardAlpha" operator="out" />
						<feColorMatrix
							type="matrix"
							values="0 0 0 0 0.164706 0 0 0 0 0.176471 0 0 0 0 0.235294 0 0 0 0.6 0"
						/>
						<feBlend
							mode="normal"
							in2="BackgroundImageFix"
							result="effect1_dropShadow"
						/>
						<feBlend
							mode="normal"
							in="SourceGraphic"
							in2="effect1_dropShadow"
							result="shape"
						/>
					</filter>
					<filter
						id="filter1_i"
						x="11.5234"
						y="9.52368"
						width="22.9531"
						height="24.9526"
						filterUnits="userSpaceOnUse"
						colorInterpolationFilters="sRGB"
					>
						<feFlood floodOpacity="0" result="BackgroundImageFix" />
						<feBlend
							mode="normal"
							in="SourceGraphic"
							in2="BackgroundImageFix"
							result="shape"
						/>
						<feColorMatrix
							in="SourceAlpha"
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha"
						/>
						<feMorphology
							radius="1.04396"
							operator="erode"
							in="SourceAlpha"
							result="effect1_innerShadow"
						/>
						<feOffset dy="2" />
						<feGaussianBlur stdDeviation="1.5" />
						<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
						<feColorMatrix
							type="matrix"
							values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.9 0"
						/>
						<feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
					</filter>
				</defs>
			</svg>
		</div>
	);
};
export default VehicleDiamondMarker;
