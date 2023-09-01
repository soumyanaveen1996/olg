import React, { PureComponent } from "react";
import { getFormTitle } from "./Utils";

class FormContentTitle extends PureComponent {
	render() {
		const { data, type, options } = this.props;
		return (
			<div>
				<span className="d-block title">{getFormTitle(data, options)}</span>
			</div>
		);
	}
}

export default FormContentTitle;
