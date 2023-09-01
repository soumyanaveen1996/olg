import React, { Component } from "react";
import { VictoryChart, VictoryLine, VictoryAxis } from "victory";
import _ from "lodash";

const dayjs = require("dayjs");

export const chartStyles = {
	axis: {
		axis: {
			stroke: "rgba(0, 122, 255, 0.5)",
			strokeWidth: 2,
		},
		axisLabel: {
			fill: "rgb(30,172,192)",
			stroke: "none",
			fontSize: 15,
		},
		tickLabels: {
			fill: "rgb(30,172,192)",
			stroke: "none",
			fontSize: 10,
		},
	},
	line: {
		data: {
			stroke: "rgb(0, 122, 255)",
			strokeWidth: 2,
		},
	},
};

export default class ChartContent extends Component {
	getXDomain() {
		const snrData = this.props.data.data;
		const minVal = _.minBy(snrData, (d) => d.Timestamp);
		const maxVal = _.maxBy(snrData, (d) => d.Timestamp);
		return [minVal.Timestamp, maxVal.Timestamp];
	}

	getTickValues() {
		const snrData = this.props.data.data;
		const minVal = _.minBy(snrData, (d) => d.Timestamp);
		const maxVal = _.maxBy(snrData, (d) => d.Timestamp);
		const midVal = Math.floor((minVal.Timestamp + maxVal.Timestamp) / 2);
		return [minVal.Timestamp, midVal, maxVal.Timestamp];
	}

	render() {
		let { data } = this.props.data;

		return (
			<div>
				<span className="title font400 d-block text-center mt-2">
					Signal to Noise ratio
				</span>
				<VictoryChart>
					<VictoryAxis
						style={chartStyles.axis}
						dependentAxis
						domain={[0, 2]}
						standalone={false}
					/>
					<VictoryAxis
						style={chartStyles.axis}
						scale="time"
						domain={[0, 2]}
						standalone={false}
						domain={this.getXDomain()}
						tickValues={this.getTickValues()}
						label="Time"
						tickFormat={(x) => dayjs(x).format("H:mm:ss")}
					/>
					<VictoryLine
						style={chartStyles.line}
						data={data}
						x="Timestamp"
						y="SNR"
					/>
				</VictoryChart>
			</div>
		);
	}
}
