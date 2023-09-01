import React from "react";
import { VIKAND_DIRECT_LANDING } from "../../Utils/Constants";
import CorporateLogo from "../Signup/CustomLanding/CorporateLogo";
import HomeLogo from "./HomeLogo";
import HomeSlidesNavigation from "./HomeSlidesNavigation";

const HomeSlideLeft = (props) => {
	let {
		title,
		description,
		rightOnly,
		leftOnly,
		previous,
		next,
		activeIndex,
		goTo,
	} = props;

	const logoRender = () => {
		const landingPath = window.location.pathname;
		switch (landingPath) {
			case VIKAND_DIRECT_LANDING:
				return (
					<>
						<CorporateLogo landingPath={landingPath} />
					</>
				);
			default:
				return <HomeLogo />;
		}
	};

	return (
		<div style={{ flex: 2 }} className="d-flex flex-column align-items-center">
			{logoRender()}

			<div
				className="d-flex justify-content-center align-items-center flex-column mx-4 p-4"
				style={{ flex: 4 }}
			>
				<div
					className="text-center"
					style={{ color: "#4A4A4A", fontSize: "30px" }}
				>
					{title}
				</div>
				<p
					className="text-center p-4"
					style={{ color: "#666666", fontSize: "16px" }}
				>
					{description}
				</p>
			</div>

			<HomeSlidesNavigation
				rightOnly={rightOnly}
				leftOnly={leftOnly}
				previous={previous}
				next={next}
				activeIndex={activeIndex}
				goTo={goTo}
			/>
		</div>
	);
};

export default HomeSlideLeft;
