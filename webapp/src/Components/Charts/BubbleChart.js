import React from "react";
import {
	VictoryChart,
	VictoryScatter,
	VictoryLabel,
	VictoryAxis,
	VictoryTooltip,
} from "victory";
import withDimensionsAdjuster from "./withDimensionsAdjuster";

class BubbleChart extends React.Component {
	render() {
		let { data, yLabel, xLabel, thumb, chartHeight, chartWidth } = this.props;

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
				<VictoryChart
					// height={height}
					// style={{ parent: { maxWidth: thumb ? "90%" : "100%" } }}
					domainPadding={{ x: [20, 40], y: [0, 20] }}
					standalone={false}
					width={chartWidth}
					height={chartHeight}
				>
					<VictoryAxis
						dependentAxis
						label={yLabel}
						axisLabelComponent={<VictoryLabel lineHeight={2} />}
						standalone={false}
						domain={[0, Math.max(...data.map((d) => d.y))]}
					/>
					<VictoryAxis
						standalone={false}
						label={xLabel}
						domain={[0, Math.max(...data.map((d) => d.x))]}
					/>
					<VictoryScatter
						style={{ data: { fill: "#c43a31" } }}
						bubbleProperty="value"
						maxBubbleSize={25}
						minBubbleSize={5}
						data={data}
						labels={(datum) => datum.value}
						labelComponent={<VictoryTooltip />}
					/>
				</VictoryChart>
			</svg>
		);
	}
}

export default withDimensionsAdjuster(BubbleChart);
