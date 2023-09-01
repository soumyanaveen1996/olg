import React, { PureComponent } from "react";
import CategoryView from "./CategoryView";

const CatalogCategoriesView = (props) => {
	const { categories } = props;
	if (!categories) {
		return null;
	}
	let keys = Object.keys(categories);

	return (
		<div className="container-fluid">
			<div className="row">
				{keys.map((category, index) => (
					<div key={index} className="d-flex flex-column mb-3">
						<CategoryView category={category} bots={categories[category]} />
					</div>
				))}
			</div>
		</div>
	);
};

export default CatalogCategoriesView;
