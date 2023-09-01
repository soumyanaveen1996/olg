import React from "react";
import {
	VictoryChart,
	VictoryAxis,
	VictoryBar,
	VictoryTooltip,
	VictoryLabel,
} from "victory";
import withDimensionsAdjuster from "./withDimensionsAdjuster";

class BarChart extends React.PureComponent {
	render() {
		let { data, xLabel, yLabel, thumb, chartHeight, chartWidth } = this.props;

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
					// width={width}
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
					/>
					<VictoryAxis standalone={false} label={xLabel} />

					<VictoryBar
						alignment="start"
						labelComponent={<VictoryTooltip />}
						style={{ data: { fill: "tomato" } }}
						data={data}
					/>
				</VictoryChart>
			</svg>
		);
	}
}

export default withDimensionsAdjuster(BarChart);
