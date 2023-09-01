import React, { PureComponent } from "react";
import { SVGOverlay } from "react-map-gl";
import { point } from "@turf/helpers";
import greatCircle from "@turf/great-circle";

export default class CircleRoute extends PureComponent {
	redraw = ({ project }) => {
		let { route, routeWidth } = this.props;
		let { start, end, color } = route;
		let startPt = point([start.longitude, start.latitude]);
		let endPt = point([end.longitude, end.latitude]);
		// let startPt = point([55.3634841, 25.2531793]);
		// let endPt = point([153.1206233, -27.3942263]);
		// let startPt = point([-122, 48]);
		// let endPt = point([-77, 39]);

		let circle = greatCircle(startPt, endPt);
		let points = circle.geometry.coordinates;
		let str = "";
		try {
			points.forEach((point) => {
				const pixel = project([point[0], point[1]]);
				str = str + " " + pixel[0] + "," + pixel[1];
			});
		} catch (e) {
			return null;
		}

		return (
			<svg>
				<defs>
					<marker
						id="arrow"
						viewBox="0 0 10 10"
						refX="5"
						refY="5"
						markerWidth="6"
						markerHeight="6"
						orient="auto-start-reverse"
					>
						<path
							d="M 0 0 L 10 5 L 0 10 z"
							stroke={"#00A7D6"}
							style={{ fill: "#00A7D6" }}
						/>
					</marker>

					<marker
						id="black-dot"
						viewBox="0 0 12 12"
						refX="6"
						refY="6"
						markerWidth="6"
						markerHeight="6"
					>
						<circle
							cx="6"
							cy="6"
							r="3"
							fill="#4A4A4A"
							stroke="#4A4A4A"
							strokeWidth={2}
						/>
					</marker>
				</defs>

				<polyline
					points={str}
					fill="none"
					// stroke="#00A7D6"
					stroke={color ? `#${color}` : "#00A7D6"}
					// markerStart="url(#black-dot)"
					// markerEnd="url(#arrow)"
					strokeWidth={routeWidth}
				/>
			</svg>
		);
	};

	render() {
		return <SVGOverlay redraw={this.redraw} />;
	}
}
