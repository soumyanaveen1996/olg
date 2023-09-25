import React from "react";
import HomeSlideRight from "./HomeSlideRight";
import HomeSlideLeft from "./HomeSlideLeft";
import { VIKAND_DIRECT_LANDING } from "../../Utils/Constants";

const HomeSlide2 = (props) => {
	if (props.corporateScreen) {
		switch (window.location.pathname) {
			case VIKAND_DIRECT_LANDING:
				return (
					<React.Fragment>
						<HomeSlideLeft
							title="Welfare"
							description="Gain access to a full suite of medical services, including but not limited to, crew checkups and mental health support and counseling."
							previous={props.previous}
							next={props.next}
							activeIndex={props.activeIndex}
							goTo={props.goTo}
						/>

						<HomeSlideRight
							imgKey="vikandSlider2"
							image={"/offlinelms/img/vikandDirect2.png"}
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
					title="Internet Voice Calls"
					description="Call Satellite and landline numbers anywhere the world, and save on costs. Calling satellite numbers has never been this easy and cheap."
					previous={props.previous}
					next={props.next}
					activeIndex={props.activeIndex}
					goTo={props.goTo}
				/>
				<HomeSlideRight
					imgKey="slider2"
					image="/offlinelms/img/internet-voice-calls.svg"
				/>
			</React.Fragment>
		);
};

export default HomeSlide2;
