import React, { Component } from "react";
import ReactImageFallback from "react-image-fallback";
import "./Common.css";
import ActivateEnterpriseBotsCard from "../Catalog/ActivateEnterpriseBotsCard";

const Cards = ({
	id = "",
	image,
	description = "",
	body,
	onCardClick = null,
	isBot = false,
	onSubscribe,
	startConversation,
	subscribed = false,
	refresh,
}) => {
	// console.log("cards i m looking for ", body, image, description);

	if (body === "Activate Enterprise Bots") {
		return <ActivateEnterpriseBotsCard body={body} refresh={refresh} />;
	}

	const botDesc = (() => {
		if (description !== "") {
			return <p className="card-text">{description}</p>;
		} else {
			return null;
		}
	})();

	const subscribeButton = (() => {
		if (subscribed) {
			return (
				<a
					data-botid={id}
					className="btn btn-info m-3"
					onClick={startConversation}
				>
					Open
				</a>
			);
		} else {
			return (
				<a
					data-botid={id}
					href="javascript:void(0)"
					className="btn btn-primary m-3"
					onClick={onSubscribe}
				>
					Subscribe
				</a>
			);
		}
	})();
	let imageNode = React.createRef();
	let cardNode = (
		<div data-uuid={id} className="card h-100 text-center">
			<div className="d-flex p-2 justify-content-center align-items-center">
				<ReactImageFallback
					ref={imageNode}
					className="card-img-top Cards-img"
					src={image}
					fallbackImage="http://placehold.it/200x200"
					alt="NO LOGO FOUND"
					style={{ boxShadow: "none" }}
				/>
			</div>
			{body && (
				<div className="card-body">
					<h6 className="card-title">{body}</h6>
					{botDesc}
				</div>
			)}
			{isBot ? subscribeButton : null}
		</div>
	);

	if (onCardClick) {
		return (
			<a
				onClick={(e) => {
					e.preventDefault();
					onCardClick(body);
				}}
			>
				{cardNode}
			</a>
		);
	}

	return cardNode;
};

export default Cards;
