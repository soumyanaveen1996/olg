import React, { useState } from "react";
import CatalogBotsContainer from "../../../Containers/CatalogBotsContainer";
import Config from "../../../Utils/Config";
import { spaceToUnderscore } from "../../../Utils/Helpers";
import Avatar from "../../Common/Avatar";
import ModalPopup from "../../ModalMessages/ModalPopup";
import ActivateEnterpriseBots from "../ActivateEnterpriseBots";
const R = require("ramda");

const ProviderAllBotsView = (props) => {
	const [newProvider, setNewProvider] = useState(false);

	const { bots, provider } = props;

	const showNewProvideDialog = () => {
		setNewProvider(true);
	};

	const hideNewProvideDialog = () => {
		setNewProvider(false);
	};

	let providerLogo = `${R.prop("contentURL", Config)}${spaceToUnderscore(
		R.toLower(provider)
	)}.png`;

	return (
		<div className="container-fluid">
			<div className="d-flex justify-content-center my-2 pb-3">
				<a className="btn btn-sm btn-open" onClick={showNewProvideDialog}>
					<i className="icon-plus" /> Sign up to a new Provider
				</a>
			</div>
			<div className="row">
				<div className="d-flex flex-column">
					<div className="d-flex justify-content-center align-items-center mb-4">
						<Avatar imgSrc={providerLogo} size={40} height={40} />
						<h3
							className="title mb-0 order-0 ml-3"
							style={{
								color: "#4A4A4A",
								fontWeight: 600,
							}}
						>
							{provider}
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
			{newProvider && (
				<ModalPopup onClose={hideNewProvideDialog} size="sm" noHeader>
					<div className="p-2">
						<h5> Sign up to a new Provider</h5>
						<ActivateEnterpriseBots
							isLicenseValid={true}
							userId={props.userId}
							getAllDomains={props.getAllDomains}
							onFormSubmit={() => {
								props.refreshCompanies();
								props.fetchBotSubscriptions({ ...selectedDomain });
								hideNewProvideDialog();
							}}
							cancel={hideNewProvideDialog}
							history={props.history}
						/>
					</div>
				</ModalPopup>
			)}
		</div>
	);
};

export default ProviderAllBotsView;
