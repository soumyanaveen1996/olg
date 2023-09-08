import React from "react";
import { getChartComponent } from "./ChatLinkChart";

export default ({ chat }) => {
	let options = chat.options;
	let ChartComponent = getChartComponent(options.chartType);
	if (!ChartComponent) {
		return null;
	}

	return (
		<div className="d-flex justify-content-center align-items-center">
			<ChartComponent
				data={chat.message}
				xLabel={options.xLabel}
				yLabel={options.yLabel}
			/>
		</div>
	);
};
