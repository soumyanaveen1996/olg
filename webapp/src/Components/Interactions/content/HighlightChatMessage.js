import React, { PureComponent } from "react";

class HighlightChatMessage extends PureComponent {
	constructor(props) {
		super(props);
		this.chatMessage = React.createRef();
		if (this.props.highlight) {
			this.state = { style: { backgroundColor: "#fffab1", padding: "10px" } };
		} else {
			this.state = {};
		}
	}

	componentDidMount() {
		if (this.props.highlight) {
			this.props.setHighlightedElementScrollHeight(
				this.chatMessage.current.getBoundingClientRect().top
			);
			setTimeout(this.removeHighlight, 5000);
		}
	}

	removeHighlight = () => {
		this.setState({
			style: { ...this.state.style, backgroundColor: "#f7f5dc" },
		});

		setTimeout(() => {
			this.setState({ style: null });
		}, 1000);
	};

	render() {
		let { highlight } = this.props;

		if (highlight) {
			return (
				<div style={this.state.style} ref={this.chatMessage}>
					{this.props.children}
				</div>
			);
		}

		return this.props.children;
	}
}

export default HighlightChatMessage;
