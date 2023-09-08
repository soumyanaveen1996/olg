import React, { useState } from "react";

const AirplaneLoader = () => {
	return (
		<div className="loader-container">
			<div className="loader" id="pre-loader">
				<img
					src={require("../../styles/images/demo-thumbs/airplane_preloader.svg")}
					className="airplane"
				/>
			</div>
		</div>
	);
};

export default AirplaneLoader;
