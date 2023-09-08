import React from "react";

export default function withDimensionsAdjuster(WrappedComponent) {
	return class extends React.Component {
		constructor(props) {
			super(props);

			this.state = {
				chartWidth: 0,
				chartHeight: 0,
			};
		}

		componentDidMount() {
			this.setState({
				chartWidth: window.innerWidth,
				chartHeight: window.innerHeight,
			});
			window.addEventListener("resize", this.updateDimensions);
		}

		componentWillUnmount() {
			window.removeEventListener("resize", this.updateDimensions);
		}

		updateDimensions = (event) => {
			this.setState({
				chartWidth: event.target.innerWidth,
				chartHeight: event.target.innerHeight,
			});
		};

		render() {
			let { chartWidth, chartHeight } = this.state;
			return (
				<WrappedComponent
					chartWidth={chartWidth}
					chartHeight={chartHeight}
					{...this.props}
				/>
			);
		}
	};
}
