import React from "react";
import HomeSlideRight from "./HomeSlideRight";
import HomeSlideLeft from "./HomeSlideLeft";
import { VIKAND_DIRECT_LANDING, VIKAND_TITLE } from "../../Utils/Constants";

const HomeSlide1 = (props) => {
	if (props.corporateScreen) {
		switch (window.location.pathname) {
			case VIKAND_DIRECT_LANDING:
				window.document.title = VIKAND_TITLE;
				return (
					<React.Fragment>
						<HomeSlideLeft
							title="Communication"
							description="Welcome to VIKAND Connect! The first app of its kind to offer captains a secure and uninterrupted line of communication to medical professionals onshore while at sea."
							rightOnly
							previous={props.previous}
							next={props.next}
							activeIndex={props.activeIndex}
							goTo={props.goTo}
						/>

						<HomeSlideRight
							imgKey="vikandSlider1"
							image={"/offlinelms/img/vikandDirect1.png"}
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
					title="Intelligent Collaboration"
					description="Easily connect with your people at sea, mid-air or other remote locations. Chat. Call. and Collaborate with Instant Messaging and AI applications."
					rightOnly
					previous={props.previous}
					next={props.next}
					activeIndex={props.activeIndex}
					goTo={props.goTo}
				/>

				<HomeSlideRight
					imgKey="slider1"
					image={"/offlinelms/img/onboarding-illus-1@3x.png"}
				/>
			</React.Fragment>
		);
};

export default HomeSlide1;
