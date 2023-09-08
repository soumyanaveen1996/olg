import React, { Component } from "react";
import FormWithSelect from "./FormWithSelect";

const SliderMessages = (props) => {
	if (props.option.select) {
		return <FormWithSelect {...props} />;
	} else {
		let { messages, sendMessage } = props;
		let buttons = messages.map(function (msg) {
			if (msg.intentId) {
				return (
					<a
						className="btn btn-outline-dark btn-sm mr-1 mb-2 slider-btn"
						onClick={() => {
							sendMessage(msg.title);
						}}
						target="_blank"
					>
						{msg.title}
					</a>
				);
			} else if (msg.fullurl) {
				return (
					<a
						className="btn btn-outline-light btn-sm mr-1 mb-2 slider-btn"
						href={msg.fullurl}
						target="_blank"
					>
						{msg.title}
					</a>
				);
			}
		});
		return <div>{buttons}</div>;
	}
};

export default SliderMessages;
