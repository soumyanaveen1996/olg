import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import SurveyProgress from "./SurveyProgress";
import { sendAMessage } from "../../../State/actions/chats";
import { useDispatch, useSelector } from "react-redux";
import {
	MainBox,
	IntroductionText,
	SurveyNameBox,
	ProgressTitle,
	PrimaryButton,
	SecondaryButton,
	ButtonsBox,
	SurveyTitle,
} from "./styles";
import TextInput from "../Common/FMForm/FormTypes/TextInput/TextInput";
import CheckboxInput from "../Common/FMForm/FormTypes/CheckboxInput/CheckboxInput";
import RadioInput from "../Common/FMForm/FormTypes/RadioInput/RadioInput";
import { RENDER_MESSAGE_TYPE_TIMELINE } from "../../Containers/NonConversational/Store/types";

const MainSurvey = ({
	message,
	options,
	messageId,
	conversation,
	handleCloseApp,
	conversationId,
}) => {
	const dispatch = useDispatch();
	const [isChange, setIsChange] = useState(false);
	const [isValue, setIsValue] = useState(null);
	const { title, introductionText, numberOfQuestion, closeTitle, closeText } =
		options;
	const { questionIndex, questionData } = message;

	useEffect(() => {
		if (isChange) setIsChange(!isChange);
	}, [isChange]);

	const isEnded =
		typeof message === "object"
			? Object.keys(message).length === 0
			: message.length === 0;
	const isStarted =
		Boolean(questionIndex >= 0) && Object.keys(message).length > 0;

	const tempPercentage = isStarted
		? (questionIndex * 100) / numberOfQuestion
		: !isEnded
		? 0
		: 100;
	const percentage = tempPercentage % 1 > 0 ? parseFloat(tempPercentage).toFixed(2) : tempPercentage;
	const quesTitle = questionData?.fields?.find(
		(i) => i.id === "system_answerTitle"
	)?.value;
	const quesDesc = questionData?.fields?.find(
		(i) => i.id === "system_answerDescription"
	)?.value;
	const quesField = [
		questionData?.fields?.find((i) => i.id === "system_answer"),
	];
	const currentQuestionIndex = questionIndex;

	useEffect(() => {
		if (quesField[0]?.value) setIsValue(quesField[0]?.value);
	}, []);

	const onNext = () => {
		const payload = {
			messageType: "surveyResponse",
			message: {
				action: "nextQuestion",
				currentQuestionIndex: currentQuestionIndex,
				currentQuestionAnswer: {
					fields: questionData?.fields,
				},
				tabId: options?.tabId,
				surveyId: options?.surveyId,
				controlId: options?.controlId,
				status: options?.status,
			},
			messageId: messageId,
		};
		dispatch(sendAMessage(payload, true));
	};

	const onPrevious = () => {
		const payload = {
			messageType: "surveyResponse",
			message: {
				action: "previousQuestion",
				currentQuestionIndex: currentQuestionIndex,
				currentQuestionAnswer: {
					fields: questionData?.fields,
				},
				tabId: options?.tabId,
				surveyId: options?.surveyId,
				controlId: options?.controlId,
				status: options?.status,
			},
			messageId: messageId,
		};
		dispatch(sendAMessage(payload, true));
	};

	const onSurveyStart = () => {
		const payload = {
			messageType: "surveyResponse",
			message: {
				action: "start",
				tabId: options?.tabId,
				surveyId: options?.surveyId,
				controlId: options?.controlId,
				status: options?.status,
			},
			messageId: messageId,
		};
		dispatch(sendAMessage(payload, true));
	};

	const onSurveyEnd = () => {
		const payload = {
			messageType: "surveyResponse",
			message: {
				action: "end",
				tabId: options?.tabId,
				surveyId: options?.surveyId,
				controlId: options?.controlId,
				status: options?.status,
			},
			messageId: messageId,
		};
		dispatch(sendAMessage(payload, true));
		handleTimelineData();
		handleCloseApp();
	};

	const NonConversationalData = useSelector(
		(state) => state.v2.NonConversational[conversationId]
	);

	const handleTimelineData = () => {
		if (
			NonConversationalData &&
			!_.isEmpty(NonConversationalData) &&
			!_.isEmpty(NonConversationalData.components)
		) {
			NonConversationalData.components.forEach((item, i) => {
				if (
					item?.options?.tabId &&
					options?.parentControlId &&
					item?.options?.tabId === options?.parentControlId
				) {
					const test = [];
					const message = NonConversationalData.components[i];
					message?.message.rows.forEach((item, i) => {
						if (item?.survey?.surveyId === options?.surveyId) {
							test[i] = {
								...item,
								survey: {
									...item?.survey,
									surveyStatus: "done",
								},
							};
						} else {
							test[i] = item;
						}
					});
					NonConversationalData.components[i] = {
						...message,
						message: {
							...message?.message,
							rows: test,
						},
					};
				}
			});
			dispatch({
				type: RENDER_MESSAGE_TYPE_TIMELINE,
				data: {
					[conversationId]: NonConversationalData,
				},
			});
		}
	};

	const handleChange = (e) => {
		let selected;
		questionData?.fields.forEach((el) => {
			if (el.id === e.target.name) {
				el.value = e.target.value;
				selected = e.target.value;
			}
		});
		setIsValue(selected);
	};

	const handleChangeRadio = (e) => {
		let selected;
		questionData?.fields.forEach((el) => {
			if (el.id === e.target.name) {
				el.value = e.target.value;
				selected = e.target.value;
			}
		});
		setIsValue(e.target.value);
		setIsChange(true);
	};

	const handleChangeCheck = (e) => {
		let selected = [];
		const maxSelection = quesField[0].maxSelectionOptions;
		quesField.forEach((el) => {
			if (el.id === e.target.id) {
				if (!el.value || (typeof el.value === "string" && !el.value.trim())) {
					el.value = [];
					selected = [];
					el.info = "";
				}
				if (el.value.includes(e.target.name)) {
					el.value = el.value.filter((item) => item !== e.target.name);
					selected = el.value.filter((item) => item !== e.target.name);
					el.info = "";
				} else if (!maxSelection || maxSelection > el.value.length) {
					el.value.push(e.target.name);
					selected.push(e.target.name);
					el.info = "";
				} else {
					el.info = `You can select upto ${maxSelection} values`;
					selected = [...isValue];
				}
			}
		});
		setIsValue(selected);
	};

	const renderFields = (field) => {
		let component = null;
		if (!field.hidden) {
			switch (field.type) {
				case "text_field":
				case "text_area":
					component = (
						<>
							<TextInput
								{...field}
								mandatory={true}
								readOnly={field?.readOnly ? true : field.readOnly}
								handleChange={handleChange}
								onBlurField={handleChange}
							/>
						</>
					);
					break;
				case "checkbox":
					component = (
						<>
							<CheckboxInput
								mandatory={true}
								{...field}
								readOnly={options?.readOnly ? true : field.readOnly}
								handleChangeCheck={handleChangeCheck}
							/>
						</>
					);
					break;
				case "radiobutton":
					component = (
						<>
							<RadioInput
								mandatory={true}
								{...field}
								value={field.value}
								readOnly={options?.readOnly ? true : field.readOnly}
								handleChange={handleChangeRadio}
								onBlurField={handleChangeRadio}
							/>
						</>
					);
					break;
				default:
					component = null;
			}
		}
		return component;
	};

	const isDisabled =
		isValue === null ||
		isValue === "" ||
		(Array.isArray(isValue) && isValue.length === 0) ||
		(Array.isArray(isValue) && isValue.length === 1 && isValue[0] === "");

	return (
		<Container sx={{ mt: 3 }}>
			<SurveyNameBox>
				<ProgressTitle>Progress {percentage}%</ProgressTitle>
			</SurveyNameBox>
			<SurveyProgress percentage={percentage} />
			{!isStarted ? (
				isEnded ? (
					<MainBox>
						<SurveyTitle>{closeTitle}</SurveyTitle>
						<IntroductionText>{closeText}</IntroductionText>
					</MainBox>
				) : (
					<MainBox>
						<SurveyTitle>{title}</SurveyTitle>
						<IntroductionText>{introductionText}</IntroductionText>
					</MainBox>
				)
			) : (
				<MainBox>
					<SurveyTitle>{quesTitle}</SurveyTitle>
						<IntroductionText sx={{ whiteSpace: "pre-line" }}>{quesDesc}</IntroductionText>
					{renderFields(quesField[0])}
				</MainBox>
			)}
			<ButtonsBox>
				{isStarted && !isEnded && questionIndex !== 0 && (
					<SecondaryButton onClick={onPrevious}>Previous</SecondaryButton>
				)}
				{isStarted ? (
					<PrimaryButton disabled={isDisabled} onClick={onNext}>
						Next
					</PrimaryButton>
				) : isEnded ? (
						<PrimaryButton onClick={onSurveyEnd}>Submit</PrimaryButton>
				) : (
					<PrimaryButton onClick={onSurveyStart}>Start</PrimaryButton>
				)}
			</ButtonsBox>
		</Container>
	);
};

export default MainSurvey;
