import React from "react";
import CatalogBotsContainer from "../../../Containers/CatalogBotsContainer";

const CategoryAllBotsView = (props) => {
	const { bots, category } = props;

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="d-flex flex-column">
					<div className="d-flex justify-content-center align-items-center mb-4">
						<h3
							className="title mb-0 order-0 ml-3"
							style={{
								color: "#4A4A4A",
								fontWeight: 600,
							}}
						>
							{category}
						</h3>
					</div>

					<div>
						<CatalogBotsContainer
							bots={bots}
							botHolderStyle={{
								marginBottom: "10px",
								borderRadius: "10px",
								boxShadow: "rgba(0, 0, 0, 0.2) 0px 0px 6px ",
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CategoryAllBotsView;
