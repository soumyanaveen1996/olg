// this.setState({ dialledDigits: this.state.dialledDigits + char });
// TwilioVoice.sendDigits(char);

import React, { PureComponent } from "react";

class NumberPad extends PureComponent {
	renderNumber = (num) => {
		return (
			<div
				key={num + Math.floor((Math.random() * 100) + 1)}
				style={{ color: this.props.color }}
				className="dig number-dig"
				onClick={() => {
					this.props.onClick(num);
				}}
			>
				{num}
			</div>
		);
	};

	render() {
		let { onClick } = this.props;

		let nodes = [];
		for (let i = 1; i <= 9; i++) {
			nodes.push(this.renderNumber(i));
		}

		return (
			<div className="dial-pad">
				<div className="digits">
					{nodes}
					<div
						className="dig number-dig astrisk"
						style={{ color: this.props.color }}
						onClick={() => {
							onClick("*");
						}}
					>
						*
					</div>
					<div
						className="dig number-dig pound"
						style={{ color: this.props.color }}
						onClick={() => {
							onClick(0);
						}}
					>
						0
					</div>
					<div
						className="dig number-dig pound"
						style={{ color: this.props.color }}
						onClick={() => {
							onClick("#");
						}}
					>
						#
					</div>
				</div>
			</div>
		);
	}
}

export default NumberPad;
