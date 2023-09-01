import React, { useEffect } from "react";
import CatalogSide from "./CatalogSide";
import CatalogMain from "./CatalogMain";
import "./Catalog.css";
import { useDispatch } from "react-redux";
import { fetchBotsForInstalledTab } from "../../State/actions/user";

const CatalogView = (props) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchBotsForInstalledTab());
	}, []);

	return (
		<div
			className="Catalog-contentarea"
			style={{
				background: "url('/img/welcomescreen-background.png')",
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
			}}
		>
			<CatalogMain {...props} />
			<CatalogSide {...props} />
		</div>
	);
};

export default CatalogView;
