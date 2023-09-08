import React, { Component } from "react";
import SliderViewBot from "./SliderViewBot";

class CatalogBotsSliderView extends Component {
	constructor(props) {
		super(props);
		this.state = { activeIndex: 0 };
	}

	// componentDidMount() {
	//   window.document.onkeydown = e => {
	//     e = e || window.event;
	//     switch (e.key) {
	//       case "ArrowLeft":
	//         this.previous();
	//         break;
	//       case "ArrowRight":
	//         this.next();
	//         break;
	//       default:
	//     }
	//   };
	// }

	next = () => {
		const nextIndex =
			this.state.activeIndex === this.props.bots.length - 1
				? 0
				: this.state.activeIndex + 1;
		this.setState({ activeIndex: nextIndex });
	};

	previous = () => {
		const nextIndex =
			this.state.activeIndex === 0
				? this.props.bots.length - 1
				: this.state.activeIndex - 1;
		this.setState({ activeIndex: nextIndex });
	};

	goTo = (nextIndex) => {
		this.setState({ activeIndex: nextIndex });
	};

	render() {
		let { bots, openBot } = this.props;
		let { activeIndex } = this.state;

		if (!bots || bots.length === 0) {
			return (
				<div className="d-flex justify-content-between align-items-center p-2 ">
					<div className="text-center">
						There are no featured applications yet.
					</div>
				</div>
			);
		}

		let bot1 = bots[activeIndex],
			bot2 = null;
		if (activeIndex < bots.length - 1) {
			bot2 = bots[activeIndex + 1];
		}

		return (
			<div className="d-flex justify-content-between align-items-center p-2">
				<a onClick={this.previous}>
					<i
						className="icon-chevron-left"
						style={{ color: "#638DFF", fontWeight: "bold" }}
					/>{" "}
				</a>
				<div className="d-flex justify-content-between">
					<div style={{ width: "50%" }}>
						{bot1 && (
							<SliderViewBot key={bot1.botId} bot={bot1} open={openBot} />
						)}
					</div>
					<div style={{ width: "50%" }}>
						{bot2 && (
							<SliderViewBot
								key={bot2.botId}
								bot={bot2}
								style={{ borderLeft: "1px solid #F4F4F4" }}
								open={openBot}
							/>
						)}
						{!bot2 && <span />}
					</div>
				</div>
				<a onClick={this.next}>
					<i
						className="icon-chevron-right"
						style={{ color: "#638DFF", fontWeight: "bold" }}
					/>{" "}
				</a>
			</div>
		);
	}
}

export default CatalogBotsSliderView;
