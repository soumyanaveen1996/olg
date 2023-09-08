import React, { PureComponent } from "react";
import { CanvasOverlay, SVGOverlay } from "react-map-gl";
export default class PolylineOverlay extends PureComponent {
	_redraw({ width, height, ctx, isDragging, project, unproject }) {
		const {
			points,
			color = "#d6233c",
			lineWidth = 2,
			renderWhileDragging = true,
		} = this.props;
		ctx.clearRect(0, 0, width, height);
		ctx.globalCompositeOperation = "lighter";

		if ((renderWhileDragging || !isDragging) && points) {
			ctx.lineWidth = lineWidth;
			ctx.strokeStyle = color;
			ctx.beginPath();
			ctx.setLineDash([2, 4]);
			points.forEach((point) => {
				const pixel = project([point[0], point[1]]);
				ctx.lineTo(pixel[0], pixel[1]);
			});
			ctx.stroke();
		}
	}

	redraw = ({ project }) => {
		let { points, color, polyWidth } = this.props;

		let checkHash = new RegExp("^#");
		if (checkHash.test(color)) {
			color = color.substring(1);
		}
		let str = "";
		points.forEach((point) => {
			const pixel = project([point[0], point[1]]);
			str = str + " " + pixel[0] + "," + pixel[1];
		});

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
						id="dot"
						viewBox="0 0 10 10"
						refX="5"
						refY="5"
						markerWidth="5"
						markerHeight="5"
					>
						<circle cx="5" cy="5" r="5" fill="red" />
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
					// markerMid={points.length > 2 ? "url(#dot)" : "none"}
					// markerEnd="url(#arrow)"
					strokeWidth={polyWidth}
					// strokeDasharray="3"
				/>
			</svg>
		);
	};

	render() {
		return <SVGOverlay redraw={this.redraw} />;
		// return <CanvasOverlay redraw={this._redraw.bind(this)} />;
	}
}
