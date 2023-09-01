import React, { useEffect, useRef } from "react";
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";
const MongoDBChart = ({ chartId, baseUri, token }) => {
	const chartRef = useRef();
	useEffect(() => {
		async function renderChart() {
			const sdk = new ChartsEmbedSDK({
				baseUrl: baseUri, // e.g. 'https://charts.mongodb.com/charts-project_id-embedsdk'
				chartId: chartId,
				getUserToken: () => {
					return token;
				},
			});
			const chart = sdk.createChart({
				chartId: chartId,
				height: "500px",
			});
			await chart.render(chartRef.current);
		}
		renderChart();
	}, [chartId, baseUri]);
	return <div ref={chartRef} />;
};
export default MongoDBChart;
