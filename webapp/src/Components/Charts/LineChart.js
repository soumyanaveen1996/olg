import React from "react";
import { VictoryChart, VictoryAxis, VictoryLine, VictoryLabel } from "victory";
import withDimensionsAdjuster from "./withDimensionsAdjuster";

class LineChart extends React.Component {
	render() {
		let { data, yLabel, xLabel, thumb, chartWidth, chartHeight } = this.props;
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
					domainPadding={{ x: [20, 40], y: [0, 20] }}
					standalone={false}
					width={chartWidth}
					height={chartHeight}
					// height={height}
					// style={{ parent: { maxWidth: thumb ? "90%" : "100%" } }}
				>
					<VictoryAxis
						dependentAxis
						label={yLabel}
						axisLabelComponent={<VictoryLabel lineHeight={2} />}
						standalone={false}
						domain={[0, Math.max(...data.map((d) => d.y))]}
					/>
					<VictoryAxis standalone={false} label={xLabel} />
					<VictoryLine
						interpolation={"linear"}
						data={data}
						style={{ data: { stroke: "#c43a31" } }}
						labels={(datum) => datum.y}
						labelComponent={<VictoryLabel renderInPortal dy={-20} />}
					/>
				</VictoryChart>
			</svg>
		);
	}
}

export default withDimensionsAdjuster(LineChart);
