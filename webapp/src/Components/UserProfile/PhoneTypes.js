import React, { PureComponent } from "react";

class PhoneTypes extends PureComponent {
	render() {
		let { phoneKey, optionValue } = this.props;
		return (
			<select
				style={{
					border: 0,
					background: "#f4f4f4",
					color: "#a5a5a5",
					outline: 0,
				}}
				value={phoneKey}
				onChange={(e) => this.props.changePhoneKey(e.target.value)}
			>
				{optionValue.map((elem, index) => {
					return (
						<option value={elem}>
							{elem === "mobile" && <span>Mobile</span>}
							{elem === "land" && <span>Land Line</span>}
							{elem === "satellite" && <span>Satellite</span>}
						</option>
					);
				})}

				{/* <option value="mobile">Mobile</option>
        <option value="land">Land Line</option>
        <option value="satellite">Satellite</option> */}
			</select>
		);
	}
}

export default PhoneTypes;
