import React from "react";
import CatalogBotsContainer from "../../Containers/CatalogBotsContainer";

export default function render({ bots, searchKey }) {
	if (!bots) {
		return null;
	}
	return (
		<div className="container-fluid d-flex flex-column p-1">
			{bots.length === 0 ? (
				<div className="d-flex row justify-content-center align-items-center">
					<h4>
						No apps found for search criteria <strong>"{searchKey}"</strong>
					</h4>
				</div>
			) : (
				<div className="container-fluid">
					<h5 className="mt-4 mb-3 px-3">
						{bots.length} apps found for search criteria &nbsp;
						<strong>"{searchKey}"</strong>
					</h5>
					<div
						className="d-flex conatiner py-1 px-3"
						style={{
							maxHeight: "calc(100vh - 170px)",
							overflowY: "auto",
						}}
					>
						<CatalogBotsContainer bots={bots} />
					</div>
				</div>
			)}
		</div>
	);
}
