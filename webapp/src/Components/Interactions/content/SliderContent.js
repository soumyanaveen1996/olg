import React, { Component } from "react";
import FormWithSelect from "./FormWithSelect";

class SliderContent extends Component {
	render() {
		let { data: messages, sendMessage, options } = this.props;
		if (!messages || messages.length === 0) {
			return null;
		}

		if (options && options.select) {
			return <FormWithSelect {...this.props} />;
		} else {
			let buttons = messages.map(function (msg, index) {
				if (msg.intentId || msg.action) {
					// return (
					//   <a
					//     className="btn btn-outline-primary mr-1 mb-2 slider-btn btn-sm"
					//     onClick={() => {
					//       sendMessage(msg.title);
					//     }}
					//     target="_blank"
					//   >
					//     {msg.title}
					//   </a>
					// );

					return (
						<a
							style={{ margin: "0 10px", display: "inline-block" }}
							onClick={() => {
								sendMessage(msg.title);
							}}
							key={index}
						>
							<div
								className="media clearfix media-chit"
								style={{ margin: "0px" }}
							>
								<div className="medbody">
									<p>{msg.title}</p>
								</div>
							</div>
						</a>
					);
				} else if (msg.url || msg.fullurl) {
					let url = msg.url || msg.fullurl;
					return (
						<div className="list-item align-items-center">
							<a className="list-link" href={url} target="_blank" />
							<div className="list-body">
								<span className="list-title"> {msg.title}</span>
								<span className="list-content">
									<blockquote>{msg.extract}</blockquote>
								</span>
							</div>
						</div>
					);
				} else if (msg.title) {
					return (
						<a
							style={{ margin: "0 10px", display: "inline-block" }}
							onClick={() => {
								sendMessage(msg.title);
							}}
						>
							<div
								className="media clearfix media-chit"
								style={{ margin: "0px" }}
							>
								<div className="medbody">
									<p>{msg.title}</p>
								</div>
							</div>
						</a>
					);
				} else {
					return (
						<a
							style={{ margin: "0 10px", display: "inline-block" }}
							onClick={() => {
								sendMessage(msg);
							}}
						>
							<div
								className="media clearfix media-chit"
								style={{ margin: "0px" }}
							>
								<div className="medbody">
									<p>{msg}</p>
								</div>
							</div>
						</a>
					);
				}
			});

			return (
				<div
					className="p-3"
					style={{
						flex: 1,
						display: "flex",
						overflowX: "auto",
						overflowY: "hidden",
					}}
				>
					<div
						className="d-flex flex-row justify-content-end"
						style={{ padding: "0 45px" }}
					>
						{buttons}
					</div>
				</div>
			);
		}
	}
}

export default SliderContent;
