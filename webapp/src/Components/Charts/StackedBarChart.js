import React from "react";
import {
	VictoryChart,
	VictoryAxis,
	VictoryBar,
	VictoryStack,
	VictoryTooltip,
	VictoryLabel,
} from "victory";
import withDimensionsAdjuster from "./withDimensionsAdjuster";

class StackedBarChart extends React.PureComponent {
	transformData = (dataset) => {
		const totals = dataset[0].map((data, i) => {
			return dataset.reduce((memo, curr) => {
				return memo + curr[i].y;
			}, 0);
		});
		return dataset.map((data) => {
			return data.map((datum, i) => {
				return { x: datum.x, y: (datum.y / totals[i]) * 100 };
			});
		});
	};

	render() {
		let {
			data,
			height,
			xLabel,
			yLabel,
			colors,
			thumb,
			chartHeight,
			chartWidth,
		} = this.props;
		if (thumb) {
			chartHeight = 200;
			chartWidth = chartWidth > 800 ? 700 : chartWidth - 100;
		} else {
			chartHeight = chartHeight - 0.15 * window.innerHeight;
		}

		const dataset = this.transformData(data);
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
					<VictoryStack colorScale={colors}>
						{dataset.map((data, i) => {
							return (
								<VictoryBar
									data={data}
									key={i}
									labels={"data set " + (i + 1)}
									labelComponent={<VictoryTooltip />}
								/>
							);
						})}
					</VictoryStack>
					<VictoryAxis
						dependentAxis
						tickFormat={(tick) => `${tick}%`}
						label={yLabel}
						axisLabelComponent={<VictoryLabel lineHeight={3} />}
					/>
					<VictoryAxis tickFormat={["a", "b", "c", "d", "e"]} label={xLabel} />
				</VictoryChart>
			</svg>
		);
	}
}

export default withDimensionsAdjuster(StackedBarChart);
