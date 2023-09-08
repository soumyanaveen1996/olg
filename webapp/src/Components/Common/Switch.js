import React, { Component } from "react";

class Switch extends Component {
	constructor(props) {
		super(props);
		this.state = {
			checked: this.props.defaultChecked || this.props.checked,
			selected: [],
		};
	}

	onChange = (event) => {
		const target = event.target;
		this.setState({
			checked: target.checked,
		});

		if (this.props.onChange) {
			this.props.onChange(target.checked);
		}
	};

	componentDidUpdate(prevProps) {
		if (this.props.checked !== prevProps.checked) {
			this.setState({
				checked: this.props.checked,
			});
		}
	}

	render() {
		const {
			className,
			disabled,
			color,
			name,
			label,
			size,
			required,
			type = "checkbox",
			value,
			dataOn,
			dataOff,
			...attributes
		} = this.props;

		delete attributes.checked;
		delete attributes.defaultChecked;
		delete attributes.onChange;

		let classes = `switch switch-sm switch-pill  form-check-label switch-${color}`;
		if (className) {
			classes += " " + className;
		}

		const inputClasses = "switch-input form-check-input";

		const sliderClasses = "switch-slider";

		return (
			<label className={classes}>
				<input
					type={type}
					className={inputClasses}
					onChange={this.onChange}
					checked={this.state.checked}
					name={name}
					required={required}
					disabled={disabled}
					value={value}
					{...attributes}
				/>
				<span
					className={sliderClasses}
					data-checked={dataOn}
					data-unchecked={dataOff}
				/>
			</label>
		);
	}
}

export default Switch;
