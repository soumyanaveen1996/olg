import React, { Component } from "react";
import PropTypes from "prop-types";
import { Scrollbars } from "react-custom-scrollbars-2";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import CatalogCategoriesContainer from "../../Containers/CatalogCategoriesContainer";
import FeaturedCatalogContainer from "../../Containers/FeaturedCatalogContainer";
import CatalogProvidersContainer from "../../Containers/CatalogProvidersContainer";
import SearchResultsView from "./SearchResultsView";
import { changeSelectedConversation } from "../../State/actions/chats";
import { connect } from "react-redux";

const isFeatured = (match, location) => {
	return (
		location.pathname === "/app/catalog" ||
		location.pathname === "/app/catalog/featured"
	);
};
const isCompany = (match, location) => {
	return (
		location.pathname === "/app/catalog/companies" ||
		location.pathname.indexOf("/app/catalog/company/") !== -1
	);
};

const isCategory = (match, location) => {
	return (
		location.pathname === "/app/catalog/categories" ||
		location.pathname.indexOf("/app/catalog/categories/") !== -1
	);
};

class CatalogMain extends Component {
	componentDidMount() {
		console.log("Loaded Catalog");
		this.props.unselectConversation();
	}

	render() {
		let { searchResults, searchKey, user } = this.props;

		if (user.isOnline) {
			return (
				<div className="Catalog-chatarea catalog-left">
					<div className="sidebar-body flex d-flex" id="app-body">
						{searchKey && (
							<SearchResultsView bots={searchResults} searchKey={searchKey} />
						)}

						{!searchKey && (
							<div className="d-flex flex flex-column">
								<div
									className="align-items-center"
									style={{ height: "50px", backgroundColor: "#00A7D6" }}
								>
									<div
										className="Catalog-tabs d-flex justify-content-around align-items-center"
										style={{
											height: "100%",
											padding: "0 50px",
										}}
									>
										<NavLink
											className="catalog-link"
											to="/app/catalog/featured"
											activeClassName="active"
											isActive={isFeatured}
										>
											<div className="d-flex flex-column align-items-center">
												<div>Featured</div>
												<div
													className="oval"
													style={{
														marginTop: "33px",
														position: "absolute",
													}}
												/>
											</div>
										</NavLink>

										<NavLink
											className="catalog-link"
											to="/app/catalog/categories"
											activeClassName="active"
											isActive={isCategory}
										>
											<div className="d-flex flex-column align-items-center">
												<div>Categories</div>
												<div
													className="oval"
													style={{
														marginTop: "33px",
														position: "absolute",
													}}
												/>
											</div>
										</NavLink>

										<NavLink
											className="catalog-link"
											to="/app/catalog/companies"
											activeClassName="active"
											isActive={isCompany}
										>
											<div className="d-flex flex-column align-items-center">
												<div>Providers</div>
												<div
													className="oval"
													style={{
														marginTop: "33px",
														position: "absolute",
													}}
												/>
											</div>
										</NavLink>
									</div>
								</div>
								<Scrollbars
									autohide="true"
									style={{
										height: "calc(100vh - 60px - 60px)",
										borderRight: "1px solid #e2e2e2",
									}}
								>
									<div className="flex ">
										<div className="p-3 mt-auto">
											<Switch>
												<Redirect
													exact
													from="/app/catalog"
													to="/app/catalog/featured"
												/>
												<Route
													path="/app/catalog/featured"
													render={() => (
														<FeaturedCatalogContainer {...this.props} />
													)}
												/>
												<Route
													exact
													path="/app/catalog/categories"
													render={() => (
														<CatalogCategoriesContainer {...this.props} />
													)}
												/>

												<Route
													path="/app/catalog/categories/:id"
													render={({ match }) => (
														<CatalogCategoriesContainer
															{...this.props}
															category={match.params.id}
														/>
													)}
												/>

												<Route
													path="/app/catalog/companies"
													render={() => (
														<CatalogProvidersContainer {...this.props} />
													)}
												/>

												<Route
													path="/app/catalog/company/:id"
													render={({ match }) => {
														return (
															<CatalogProvidersContainer
																{...this.props}
																provider={match.params.id}
															/>
														);
													}}
												/>
												<Route
													path="/app/catalog/updates"
													render={() => <div>Updates</div>}
												/>
											</Switch>
										</div>
									</div>
								</Scrollbars>
							</div>
						)}
					</div>
				</div>
			);
		} else {
			return (
				<div
					className="Catalog-chatarea catalog-left"
					style={{
						background: "url('/offlinelms/img/welcomescreen-background.png')",
						backgroundSize: "cover",
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
					}}
				>
					<div
						style={{
							position: "absolute",
							top: "35%",
							left: "40%",
							textAlign: "center",
						}}
					>
						<img src="/offlinelms/img/sad-cloud.png" height="65" />
						<p className="font-weight-bold mt-3 mb-0">
							Apps are not available offline.
						</p>
						<p> Please connect and try again.</p>
					</div>
				</div>
			);
		}
	}
}

CatalogMain.propTypes = {
	userStore: PropTypes.object,
	history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	user: state.user,
});

const mapDispatchToProps = (dispatch) => {
	return {
		unselectConversation: () =>
			dispatch(changeSelectedConversation(null, false)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CatalogMain);
