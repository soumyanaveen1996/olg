import React from "react";
import { useSelector, shallowEqual } from "react-redux";

import Dialog from "@mui/material/Dialog";
import FMFilterFormComponent from "./FMFilterFormComponent";

function FMFilterDrawerComponent({ conversation }) {
	const openDrawer = useSelector(
		(state) => state.v2.NonConversationalFilter?.openDrawer,
		shallowEqual
	);

	const jsx = (
		<Dialog
			open={openDrawer || false}
			fullWidth={true}
			maxWidth={"xs"}
			PaperProps={{
				style: { borderRadius: "10px" },
			}}
		>
			<FMFilterFormComponent conversation={conversation} />
		</Dialog>
	);

	return jsx;
}

export default FMFilterDrawerComponent;
