import React from "react";
import {
	VictoryPie,
	VictoryLegend,
	VictoryTooltip,
	VictoryTheme,
} from "victory";
import withDimensionsAdjuster from "./withDimensionsAdjuster";

class PieChart extends React.PureComponent {
	render() {
		let { data, width, height, thumb, chartHeight, chartWidth } = this.props;
		if (thumb) {
			chartHeight = 200;
			chartWidth = chartWidth > 800 ? 700 : chartWidth - 100;
		} else {
			chartHeight = chartHeight - 0.15 * window.innerHeight;
		}

		return (
			<svg
				viewBox={"0 0 " + chartWidth + " " + chartHeight}
				preserveAspectRatio="none"
				width="100%"
			>
				<VictoryLegend
					standalone={false}
					colorScale={["tomato", "orange", "gold"]}
					x={150}
					y={40}
					gutter={20}
					title="Legend"
					centerTitle
					orientation="horizontal"
					style={{ border: { stroke: "black" } }}
					data={[{ name: "One" }, { name: "Two" }, { name: "Three" }]}
				/>
				<VictoryPie
					standalone={false}
					colorScale={["tomato", "orange", "gold"]}
					width={width - 100}
					height={height - 100}
					data={data}
					innerRadius={50}
					labels={(d) => d.y}
					padding={{ left: 100, bottom: 20, top: 110 }}
					// style={{ labels: { fontSize: 20, fill: "white" } }}
					labelComponent={
						<VictoryTooltip
							style={{ file: "white" }}
							cornerRadius={0}
							pointerLength={0}
						/>
					}
					theme={VictoryTheme.material}
					style={{
						parent: { maxWidth: thumb ? "90%" : "100%" },
						labels: { fontSize: 20, fill: "white" },
					}}
				/>
			</svg>
		);
	}
}

export default withDimensionsAdjuster(PieChart);
