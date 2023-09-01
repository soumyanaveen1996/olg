import React, { PureComponent } from "react";
import CatalogCategoriesView from "../Components/Catalog/Categories/CatalogCategoriesView";
import CategoryAllBotsView from "../Components/Catalog/Categories/CategoryAllBotsView";

class CatalogCategoriesContainer extends PureComponent {
	componentDidMount() {
		this.props.fetchCategories();
	}

	render() {
		const { categories, category } = this.props;
		if (category) {
			return (
				<CategoryAllBotsView
					category={category}
					bots={categories ? categories[category] : []}
				/>
			);
		} else {
			return <CatalogCategoriesView categories={categories} />;
		}
	}
}

export default CatalogCategoriesContainer;
