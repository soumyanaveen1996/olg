import React from "react";
import {
	TimelineSurveyButton,
	TimelineSurveyContainer,
	TimelineSurveyHeading,
	TimelineSurveyTitle,
} from "./styles";

const TypeSurvey = ({ item, startSurvey }) => {
	return (
		<TimelineSurveyContainer>
			<TimelineSurveyHeading>SURVEY</TimelineSurveyHeading>
			<TimelineSurveyTitle>{item?.survey?.surveyTitle}</TimelineSurveyTitle>
			{item?.survey?.surveyStatus !== "done" ? (
				<TimelineSurveyButton
					onClick={() => startSurvey(item?.survey?.surveyId)}
				>
					Start Now
				</TimelineSurveyButton>
			) : (
				<TimelineSurveyButton
					onClick={() => startSurvey(item?.survey?.surveyId)}
				>
					Review Response
				</TimelineSurveyButton>
			)}
		</TimelineSurveyContainer>
	);
};

export default TypeSurvey;
