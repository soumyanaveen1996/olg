import React from "react";
import PropTypes from "prop-types";

const AcceptIgnoreButtonRenderer = (props) => {
	return (
		<div className="p-2">
			<div
				className="text-center"
				style={{
					backgroundColor: "#fff",
					borderRadius: "6px",
					padding: "20px",
				}}
			>
				<div className="text-center">
					<b>{props.userName}</b> would like to connect with you.
				</div>
				<div className="text-center">Add user to contacts?</div>
				<div className="d-flex justify-content-center mt-3">
					<button
						className="btn btn-open btn-sm btn-icon btn-block"
						style={{
							margin: "0 10px",
							display: "inline-block",
							color: "#fff",
							maxWidth: "300px",
						}}
						onClick={() => props.accept(props.userId)}
					>
						Accept
					</button>

					<button
						className="btn btn-sm btn-icon btn-block"
						style={{
							margin: "0 10px",
							display: "inline-block",
							color: "#638DFF",
							border: "1px solid #638DFF",
							borderRadius: "6px",
							maxWidth: "300px",
						}}
						onClick={() => props.ignore(props.userId)}
					>
						Ignore
					</button>
				</div>
			</div>
		</div>
	);
};

AcceptIgnoreButtonRenderer.propTypes = {
	ignore: PropTypes.func.isRequired,
	accept: PropTypes.func.isRequired,
	userName: PropTypes.string.isRequired,
	userId: PropTypes.string.isRequired,
};

export default AcceptIgnoreButtonRenderer;
