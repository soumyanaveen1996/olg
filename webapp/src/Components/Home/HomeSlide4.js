import React from "react";
import HomeSlideRight from "./HomeSlideRight";
import HomeSlideLeft from "./HomeSlideLeft";

const HomeSlide4 = (props) => {
	return (
		<React.Fragment>
			<HomeSlideLeft
				title="Remote Enterprise Operations"
				description="Manage your remote and on-field process automation. Detect anomalies. Obtain powerful insights. Stay connected wherever your teams are."
				previous={props.previous}
				next={props.next}
				activeIndex={props.activeIndex}
				goTo={props.goTo}
			/>
			<HomeSlideRight imgKey="slider4" image="/offlinelms/img/onboarding-illus-4@2x.png" />
		</React.Fragment>
	);
};

export default HomeSlide4;
