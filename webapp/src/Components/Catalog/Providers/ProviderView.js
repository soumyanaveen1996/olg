import React from "react";
import { Link } from "react-router-dom";
import CatalogBotsContainer from "../../../Containers/CatalogBotsContainer";
import Config from "../../../Utils/Config";
import { spaceToUnderscore } from "../../../Utils/Helpers";
import Avatar from "../../Common/Avatar";
const R = require("ramda");

const ProviderView = (props) => {
	let { provider, bots = [] } = props;

	let providerLogo = `${R.prop("contentURL", Config)}${spaceToUnderscore(
		R.toLower(provider)
	)}.png`;

	let noOfBots = bots.length;
	let botsToShow = bots.slice(0, 2);

	return (
		<div className="card" style={{ borderRadius: "10px" }}>
			<div className="card-header" style={{ padding: "0px" }}>
				<div
					style={{
						padding: "10px",
						borderRight: "1px solid #edf2f4",
					}}
				>
					<Avatar imgSrc={providerLogo} size={40} height={40} />
				</div>
				<h3
					className="title mb-0 flex mr-auto order-0 ml-3"
					style={{
						color: "#4A4A4A",
						fontWeight: 600,
					}}
				>
					{provider}
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
							to={`/app/catalog/company/${provider}`}
						>
							Explore all
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default ProviderView;
