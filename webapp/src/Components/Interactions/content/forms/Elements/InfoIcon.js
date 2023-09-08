import React from "react";
import { Tooltip } from "reactstrap";

export default class InfoIcon extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			tooltipOpen: false,
		};
	}

	toggle = () => {
		this.setState({
			tooltipOpen: !this.state.tooltipOpen,
		});
	};

	render() {
		let { info, id } = this.props;

		if (!info) {
			return null;
		}

		return (
			<React.Fragment>
				<span
					id={id}
					style={{
						height: "15px",
						width: "15px",
						border: "1px solid #638DFF",
						backgroundColor: "#FFFFFF",
						borderRadius: "50%",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						color: "#638DFF",
						cursor: "pointer",
						fontSize: "10px",
					}}
				>
					i
				</span>

				<Tooltip
					placement="bottom"
					isOpen={this.state.tooltipOpen}
					target={id}
					toggle={this.toggle}
				>
					{info}
				</Tooltip>
			</React.Fragment>
		);
	}
}
