import React, { Component } from "react";
import { MessageTypeConstants } from "../../../Services/Message";

class FormWithSelectDataView extends Component {
	render() {
		const { contactInfo } = this.props;
		return (
			<div className="rounded">
				<div className="d-flex justify-content-between px-5">
					<div>
						{contactInfo.map((c) => {
							return (
								<div className="mt-2" style={{ fontWeight: "bold" }}>
									{c.key}
								</div>
							);
						})}
					</div>
					<div>
						{contactInfo.map((c) => {
							return <div className="mt-2">{c.value}</div>;
						})}
					</div>
				</div>
			</div>
		);
	}
}

export default FormWithSelectDataView;
