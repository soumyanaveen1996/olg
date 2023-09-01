import React from "react";
import BarChart from "./BarChart";
import StackedBarChart from "./StackedBarChart";
import PieChart from "./PieChart";
import LineChart from "./LineChart";
import BubbleChart from "./BubbleChart";

export default class ChartTest extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div>
				<div
					className="d-flex align-items-center justify-content-center"
					style={{ margin: "50px" }}
				>
					<BarChart
						data={[
							{ x: "Name 1", y: 2, label: 2 },
							{ x: "Name 2", y: 3, label: 3 },
							{ x: "Name 3", y: 5, label: 5 },
							{ x: "Name 4", y: 4, label: 4 },
						]}
						height={400}
						width={400}
						xLabel="Name"
						yLabel="Value"
					/>

					<StackedBarChart
						data={[
							[
								{ x: "a", y: 1 },
								{ x: "b", y: 2 },
								{ x: "c", y: 3 },
								{ x: "d", y: 2 },
								{ x: "e", y: 1 },
							],
							[
								{ x: "a", y: 2 },
								{ x: "b", y: 3 },
								{ x: "c", y: 4 },
								{ x: "d", y: 5 },
								{ x: "e", y: 5 },
							],
							[
								{ x: "a", y: 1 },
								{ x: "b", y: 2 },
								{ x: "c", y: 3 },
								{ x: "d", y: 4 },
								{ x: "e", y: 4 },
							],
						]}
						height={400}
						width={400}
						xLabel="Name"
						yLabel="Value"
						colors={["black", "blue", "tomato"]}
					/>

					<PieChart
						data={[
							{ x: 1, y: 120 },
							{ x: 2, y: 150 },
							{ x: 3, y: 75 },
						]}
						height={500}
						width={500}
					/>
				</div>
				<div
					className="d-flex align-items-center justify-content-center"
					style={{ margin: "50px" }}
				>
					<LineChart
						data={[
							{ x: "Student 1", y: 100 },
							{ x: "Student 2", y: 52 },
							{ x: "Student 3", y: 91 },
							{ x: "Student 4", y: 74 },
							{ x: "Student 5", y: 13 },
							{ x: "Student 6", y: 65 },
						]}
						xLabel="Students"
						yLabel="Marks"
					/>
					<BubbleChart
						data={[
							{ x: 1, y: 2, value: 3 },
							{ x: 2, y: 3, value: 40 },
							{ x: 3, y: 5, value: 25 },
							{ x: 4, y: 4, value: 10 },
							{ x: 5, y: 7, value: 45 },
						]}
						xLabel="Students"
						yLabel="Marks"
					/>
				</div>
			</div>
		);
	}
}
