import React from "react";

const CookiePolicy = (props) => {
	return (
		<div style={{ height: "90px", width: "100%", backgroundColor: "#2A2D3C" }}>
			<div className="p-4 d-flex justify-content-center align-items-center">
				<div>
					<div style={{ color: "#fff" }}>
						This website uses cookies in order to offer you the most relevant
						information.
						<br />
						Please accept cookies for optimal performance or{" "}
						<a
							className="btn-link"
							href="https://www.frontm.com/privacy-policy"
							target="_blank"
							style={{ color: "#638DFF" }}
							rel="noopener noreferrer"
						>
							click here to learn more.
						</a>
					</div>
				</div>
				<div className="ml-4">
					<a className="btn btn-open" onClick={props.acceptCookiePolicy}>
						Accept
					</a>
				</div>
			</div>
		</div>
	);
};

export default CookiePolicy;
