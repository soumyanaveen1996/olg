import React from "react";
import { VIKAND_DIRECT_LANDING } from "../../Utils/Constants";
import HomeSlideLeft from "./HomeSlideLeft";
import HomeSlideRight from "./HomeSlideRight";

const HomeSlide3 = (props) => {
	if (props.corporateScreen) {
		switch (window.location.pathname) {
			case VIKAND_DIRECT_LANDING:
				return (
					<React.Fragment>
						<HomeSlideLeft
							title="Medical Service"
							description="Experience secure and uninterrupted communication with our team of certified medical professionals onshore to help provide you with the information you need to uphold health and wellness onboard."
							previous={props.previous}
							next={props.next}
							activeIndex={props.activeIndex}
							goTo={props.goTo}
						/>

						<HomeSlideRight
							imgKey="vikandSlider3"
							image={"/img/vikandDirect3.png"}
						/>
					</React.Fragment>
				);

			default:
				return null;
		}
	} else
		return (
			<React.Fragment>
				<HomeSlideLeft
					title="AI Applications"
					description="Artificial Intelligence applications to help with tracking, monitoring and operational assistance. Make your tasks easy and keep on top of them."
					previous={props.previous}
					next={props.next}
					activeIndex={props.activeIndex}
					goTo={props.goTo}
				/>
				<HomeSlideRight imgKey="slider3" image="/img/ai-applications.png" />
			</React.Fragment>
		);
};

export default HomeSlide3;
