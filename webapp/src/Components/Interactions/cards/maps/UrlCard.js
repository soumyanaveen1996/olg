import React from "react";
import { CardImg, CardBody, CardTitle, CardText } from "reactstrap";
import CardLayout from "./CardLayout";
import { truncateText } from "../Utils";

export default function UrlCard({
	design,
	title,
	description,
	imageUrl,
	seeMoreUrl,
}) {
	if (design === "big") {
		if (title && description) {
			return (
				<CardLayout width="300px" height="175px">
					<CardBody
						style={{ width: "55%" }}
						className="d-flex flex-column justify-content-between"
					>
						<div>
							<div
								style={{
									color: "#638DFF",
									fontWeight: "bold",
									marginBottom: "10px",
								}}
							>
								{truncateText(title, 30)}
								{/*{title.length <= 32 ? title : title.substring(0, 33) + "..."}*/}
							</div>
							<div
								style={{
									// overflow: "hidden",
									// display: "-webkit-box",
									// "-webkit-line-clamp": "3",
									// "-webkit-box-orient": "vertical",
									marginBottom: "10px",
								}}
							>
								{truncateText(description, 48)}
								{/*{description}*/}
							</div>
						</div>
						<a
							className="primary-link d-flex  align-items-center"
							style={{ fontSize: "12px", color: "#638DFF" }}
							onClick={() => {
								window.open(seeMoreUrl, "_blank");
							}}
						>
							See more
						</a>
					</CardBody>
					<div style={{ width: "45%" }}>
						<div
							style={{
								backgroundImage: "url('" + imageUrl + "')",
								backgroundRepeat: "no-repeat",
								backgroundSize: "cover",
								height: "100%",
								width: "100%",
							}}
						/>
					</div>
				</CardLayout>
			);
		} else {
			return (
				<CardLayout width="300px" height="150px">
					<CardBody
						style={{ width: "55%", padding: "0px" }}
						className="d-flex flex-column justify-content-between"
					>
						<CardImg top width="100%" src={imageUrl} alt={title} />

						<div className="p-2">
							<a
								className="primary-link d-flex  align-items-center"
								style={{ fontSize: "12px", color: "#638DFF" }}
								onClick={() => {
									window.open(seeMoreUrl, "_blank");
								}}
							>
								See more
							</a>
						</div>
					</CardBody>
				</CardLayout>
			);
		}
	} else {
		return (
			<CardLayout width="120px" height="120px">
				<CardBody
					style={{ width: "55%" }}
					className="d-flex flex-column justify-content-between"
				>
					{title && (
						<CardTitle style={{ fontSize: "1rem" }}>
							{truncateText(title, 30)}
							{/*{title.length <= 32 ? title : title.substring(0, 33) + "..."}*/}
						</CardTitle>
					)}
					<div
						style={{
							// overflow: "hidden",
							// display: "-webkit-box",
							// "-webkit-line-clamp": "1",
							// "-webkit-box-orient": "vertical",
							marginBottom: "10px",
						}}
					>
						{truncateText(description, 48)}
					</div>
					<div>
						<a
							className="primary-link d-flex align-items-center"
							style={{ fontSize: "12px", color: "#638DFF" }}
							onClick={() => {
								window.open(seeMoreUrl, "_blank");
							}}
						>
							See more
						</a>
					</div>
				</CardBody>
			</CardLayout>
		);
	}
}
