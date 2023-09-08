import React from "react";
import UrlCard from "./UrlCard";
import ActionCard from "./ActionCard";
import DataCard from "./DataCard";

export default class CardsTest extends React.Component {
	render() {
		return (
			<div
				style={{
					backgroundColor: "rgb(229, 241, 253)",
					width: "100%",
					height: "100%",
				}}
			>
				<div
					className="d-flex align-items-center justify-content-around"
					style={{ margin: "20px" }}
				>
					<div>
						url card small
						<UrlCard
							design="small"
							title={"Test Card"}
							description={
								"description description in the world of description hell world how are you?"
							}
							imageUrl="https://dev.frontm.ai/card-image-scene.png"
							seeMoreUrl="https://dev.frontm.ai"
						/>
					</div>

					<div>
						url card with title and description
						<UrlCard
							design="big"
							title={"Test Card"}
							description={
								"description description in the world of description hell world how are you?"
							}
							imageUrl="https://dev.frontm.ai/card-image-scene.png"
							seeMoreUrl="https://dev.frontm.ai"
						/>
					</div>
					<div>
						url card without title and description
						<UrlCard
							design="big"
							imageUrl="https://dev.frontm.ai/card-image-scene.png"
							seeMoreUrl="https://dev.frontm.ai"
						/>
					</div>
				</div>

				<div
					className="d-flex align-items-center justify-content-around mt-4"
					style={{ margin: "20px" }}
				>
					<div>
						action card small
						<ActionCard design={"small"} title={"test"} />
					</div>

					<div>
						action card big
						<ActionCard
							design={"big"}
							title={"test"}
							description={
								"description description in the world of description hell world how are you?"
							}
							imageUrl={"https://dev.frontm.ai/card-image-scene.png"}
						/>
					</div>
				</div>

				<div
					className="d-flex align-items-center justify-content-around"
					style={{ margin: "20px" }}
				>
					<div>
						data card small
						<DataCard
							design="small"
							title={"Test Card"}
							description={"description"}
							seeMoreUrl="https://dev.frontm.ai"
						/>
					</div>

					<div>
						data card big
						<DataCard
							design="big"
							title={"Test Card"}
							description={"description"}
							seeMoreUrl="https://dev.frontm.ai"
						/>
					</div>
				</div>
			</div>
		);
	}
}
