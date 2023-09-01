import React from "react";
import countryCodes from "./CountryList";

class CountrySelector extends React.PureComponent {
	onChangeCountry = (e) => {
		let index = e.target.value;
		this.props.onChange(countryCodes[index]);
	};

	render() {
		let { selectedCountry, style } = this.props;

		return (
			<select
				style={style}
				className="country-selector"
				onChange={this.onChangeCountry}
			>
				<option
					value={null}
					style={{ backgroundColor: "#F0F2F4", color: "black", padding: "2px" }}
				>
					{" "}
					Select Country
				</option>
				{countryCodes.map((country, index) => (
					<option
						style={{
							backgroundColor: "#F0F2F4",
							color: "black",
							padding: "2px",
						}}
						key={index}
						value={index}
						selected={
							selectedCountry &&
							selectedCountry.dial_code === country.dial_code &&
							selectedCountry.code === country.code
						}
					>
						{country.name}
					</option>
				))}
			</select>
		);
	}
}

export default CountrySelector;
