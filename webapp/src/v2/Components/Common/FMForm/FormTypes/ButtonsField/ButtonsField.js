import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const ButtonContainer = styled(Button)(() => ({
	cursor: "pointer",
	padding: "7px 45px",
	borderRadius: 20,
	backgroundColor: "#638dff",
	color: "#FFFFFF",
	fontFamily: "SF Pro Text Bold",
	fontSize: 14,
	boxShadow: "none",
	"&:hover": {
		backgroundColor: "#4c71d6",
	},
	"&:focus": {
		boxShadow: "0 0 6px 0 #638dff !important",
	},
	"&:disabled": {
		backgroundColor: "#aeb8d6",
		color: "#e8ecf8",
	},
}));

const ButtonsField = (props) => {
	const {
		id,
		readOnly,
		handleClick,
		options,
		isSections,
		activeIconUrl,
		inactiveIconUrl,
	} = props;

	return (
		<>
			{activeIconUrl && inactiveIconUrl ? (
				<a onClick={(e) => handleClick(e, "button", id)}>
					<img
						src={readOnly ? inactiveIconUrl : activeIconUrl}
						alt=""
						height="40px"
					/>
				</a>
			) : (
				options?.map((option) => (
					<ButtonContainer
						key={id}
						id={id}
						variant="contained"
						color="primary"
						disabled={readOnly}
						onClick={(e) => handleClick(e, "button", id, option.label)}
						style={{
							float: isSections && "right",
							marginLeft: isSections && "10px",
						}}
					>
						{option.label}
					</ButtonContainer>
				))
			)}
		</>
	);
};

export default ButtonsField;
