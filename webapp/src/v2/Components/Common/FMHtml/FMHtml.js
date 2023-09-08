import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import FMHtmlComponent from "./FMHtmlComponent";
import GenericAjax from "../../../../Services/GenericAjax";
import Config from "../../../../Utils/Config";
import { removeNonConversationalMessages } from "../../../Containers/NonConversational/Store/NonConversationalAction";
import { showSnackbarV2 } from "../../../Store/Notification/NotificationAction";

const R = require("ramda");

const FMHtml = ({ conversation, message, options }) => {
	const { userDomain } = useSelector((state) => state.selectedDomain);
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		if (options?.url && !options?.embedded) {
			window.open(options.url, "_blank");
		} else if (options?.signed_url) {
			GenericAjax.downloadSignedUrlFile(
				`${R.prop("filesAPI", Config)}/downloadwithsignedurl/${userDomain}/${
					options.signed_url
				}`
			)
				.then((res) => {
					if (res?.signedUrl) {
						GenericAjax.downloadFile(res.signedUrl)
							.then((blob) => {
								var url = window.URL.createObjectURL(blob);
								var a = document.createElement("a");
								a.href = url;
								a.download = options.signed_url;
								document.body.appendChild(a);
								a.click();
								a.remove();
							})
							.catch((error) => {
								console.error("ERROR in geting file from signed url", error);
								dispatch(showSnackbarV2("error", "Failed to download file"));
							});
					}
				})
				.catch((error) => {
					console.error("ERROR in genrate Signed Url", error);
					dispatch(showSnackbarV2("error", "Failed to generate signed url"));
				});
		}
		if (!options?.content && !options?.image && !options?.embedded) {
			dispatch(
				removeNonConversationalMessages(conversation, { options }, history)
			);
		}
	}, []);

	const removeMessage = () => {
		dispatch(
			removeNonConversationalMessages(conversation, { options }, history)
		);
	};

	const handleError = (error) => {
		dispatch(showSnackbarV2("error", `Failed to generate PDF: ${error}`));
	};

	// Testing new PDF lib in dev2

	return (
		<FMHtmlComponent
			message={message}
			options={options}
			removeMessage={removeMessage}
			handleError={handleError}
		/>
	);
};

export default FMHtml;
