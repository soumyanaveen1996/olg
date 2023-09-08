import React from "react";
import CatalogBotsContainer from "../../../Containers/CatalogBotsContainer";
import { Link } from "react-router-dom";

const CategoryView = (props) => {
	let { category, bots } = props;
	let noOfBots = bots.length;
	let botsToShow = bots.slice(0, 2);
	if (noOfBots === 0) {
		return null;
	}
	return (
		<div className="card" style={{ borderRadius: "10px" }}>
			<div className="card-header">
				<h3
					className="title mb-0 flex mr-auto order-0"
					style={{
						color: "#4A4A4A",
						fontWeight: 600,
					}}
				>
					{category}
				</h3>
			</div>

			<div className="card-body" style={{ padding: "0rem" }}>
				<CatalogBotsContainer
					bots={botsToShow}
					botHolderStyle={{
						marginBottom: "10px",
						width: "100%",
						borderBottom: "1px solid #edf2f4",
						padding: "0rem 0.5rem",
					}}
				/>
				{noOfBots > 2 && (
					<div className="d-flex justify-content-around align-items-start">
						<Link
							style={{
								paddingTop: "0px",
								paddingBottom: "10px",
								color: "#638DFF",
							}}
							to={`/app/catalog/categories/${category}`}
						>
							Explore all
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default CategoryView;
