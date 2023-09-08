import React, { PureComponent } from "react";
import ChatLinkSelfUI from "./ChatLinkSelfUI";
import ChatLinkOthersUI from "./ChatLinkOthersUI";
import { hideModal, showModal } from "../../../State/actions/modal";
import { connect } from "react-redux";
import BarChart from "../../Charts/BarChart";
import LineChart from "../../Charts/LineChart";
import BubbleChart from "../../Charts/BubbleChart";
import StackedBarChart from "../../Charts/StackedBarChart";
import PieChart from "../../Charts/PieChart";

export function getChartComponent(chartType) {
	if (chartType === "bar") {
		return BarChart;
	} else if (chartType === "line") {
		return LineChart;
	} else if (chartType === "bubble") {
		return BubbleChart;
	} else if (chartType === "stack") {
		return StackedBarChart;
	} else if (chartType === "pie") {
		return PieChart;
	}
	return null;
}

class ChatLinkChart extends PureComponent {
	openChart = () => {
		let options = this.props.chat.options;
		this.props.showModal(
			options.title,
			"xlg",
			this.props.hideModal,
			{
				chat: this.props.chat,
			},
			"CHART"
		);
	};

	render() {
		let { chat, conversation, self } = this.props;
		let ChatUI = self ? ChatLinkSelfUI : ChatLinkOthersUI;
		let { options } = chat;

		let ChartComponent = getChartComponent(options.chartType);

		return (
			<ChatUI chat={chat} conversation={conversation}>
				<div
					className="d-flex flex-column"
					style={{
						backgroundColor: "#fff",
						border: "1px solid #edf2f4",
						borderRadius: "10px",
					}}
				>
					<div
						style={{ borderBottom: "1px solid #DEDEDE" }}
						className="d-flex flex-column px-3 py-1"
					>
						<h5 style={{ marginBottom: 0, fontSize: "18px", color: "#666" }}>
							{options.title}
						</h5>
						<div style={{ fontSize: "14px", color: "#666" }}>
							{options.description}
						</div>
					</div>

					<div className="d-flex justify-content-center align-items-center">
						{ChartComponent && (
							<ChartComponent
								data={chat.message}
								xLabel={options.xLabel}
								yLabel={options.yLabel}
								thumb
							/>
						)}
					</div>
					<a
						onClick={this.openChart}
						style={{
							borderBottomRightRadius: "10px",
							borderBottomLeftRadius: "10px",
							borderTop: "1px solid #edf2f4",
						}}
						className="d-flex justify-content-center align-items-center p-2 bg-white primary-link"
					>
						View Chart
					</a>
				</div>
			</ChatUI>
		);
	}
}

let actions = {
	showModal: showModal,
	hideModal: hideModal,
};

export default connect(null, actions)(ChatLinkChart);
