import {
	Autocomplete,
	FormControl,
	Select,
	TextField,
	styled,
} from "@mui/material";

export const styles = {
	styleObj1: {
		backgroundColor: "#fff",
		border: "1px solid rgba(152, 176, 200, 0.2)",
		borderRadius: "10px",
		marginBottom: "5px",
		paddingTop: "5px",
		paddingLeft: "10px",
		height: "50px",
	},
	styleObj2: {
		height: "40px",
		width: "110%",
		borderRadius: "20px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		margin: "0 21.4px 0 0",
		padding: "15px 55px 15px 55px",
	},
	selectMenuProps: {
		anchorOrigin: {
			vertical: "bottom",
			horizontal: "center",
		},
		style: {
			maxHeight: 45 * 4.5,
		},
		sx: {
			"&& .Mui-selected": {
				backgroundColor: "#eff4ff",
			},
			"&& .MuiMenuItem-root:hover": {
				backgroundColor: "#eff4ff",
			},
			"&& .MuiMenuItem-root:focus": {
				backgroundColor: "#eff4ff",
			},
		},
	},

	selectMenuPropsMini: {
		anchorOrigin: {
			vertical: "bottom",
			horizontal: "center",
		},
		style: {
			maxHeight: 45 * 4.5,
			width: "300px",
			fontSize: "12px",
		},
		sx: {
			"&& .Mui-selected": {
				backgroundColor: "#eff4ff",
			},
			"&& .MuiMenuItem-root": {
				fontSize: "13px",
			},

			"&& .MuiMenuItem-root:hover": {
				backgroundColor: "#eff4ff",
			},
			"&& .MuiMenuItem-root:focus": {
				backgroundColor: "#eff4ff",
			},
		},
	},
};

// Styled components

export const StyledAutocomplete = styled(Autocomplete)(() => ({
	"& label": {
		fontSize: 14,
		color: "#2c2f44",
		fontFamily: "SF Pro Text Light",
		textTransform: "inherit",
	},
	"& label.MuiInputLabel-shrink": {
		fontSize: "1rem",
		backgroundColor: "white",
	},
	"& label.Mui-focused": {
		color: "#638dff",
	},
	"& .MuiSvgIcon-root": {
		color: "#638dff !important",
	},
	"& .MuiOutlinedInput-root": {
		"& fieldset": {
			borderColor: "#c4d8ff",
		},
		"&:hover fieldset": {
			borderColor: "#92afff",
		},
		"&.Mui-disabled": {
			backgroundColor: "#f4f7fb !important",
			"& fieldset": {
				borderColor: "#c4d8ff",
			},
		},
		"&.Mui-error": {
			"& fieldset": {
				borderColor: "#f2a29d !important",
			},
		},
		"&.Mui-focused fieldset": {
			borderColor: "#638dff",
		},
		"& .MuiOutlinedInput-input.Mui-disabled": {
			color: "#44485a",
			"-webkit-text-fill-color": "#44485a",
		},
		"& .MuiAutocomplete-input": {
			// ...(islabelvisible && {
			minWidth: "65px !important",
			// }),
		},
		fontSize: 14,
		borderRadius: 6,
		fontFamily: "SF Pro Text Regular",
		paddingRight: "9px !important",
		// ...(islabelvisible && {
		width: "100%",
		paddingRight: "9px !important",
		// }),
	},
	// "& fieldset.MuiOutlinedInput-notchedOutline": {
	// 	border: "1px solid #c4d8ff !important",
	// },
}));
export const FormControlSingle = styled(FormControl)(() => ({
	"& label": {
		fontSize: 14,
		color: "#2c2f44",
		fontFamily: "SF Pro Text Light",
		textTransform: "inherit",
	},
	"& label.MuiInputLabel-shrink": {
		fontSize: "1rem",
		backgroundColor: "white",
	},
	"& label.MuiInputLabel-root": {
		marginBottom: "10px",
	},
	"& label.Mui-focused": {
		color: "#638dff",
	},
	"& div": {
		padding: "4px 5px 6px 5px",
		paddingBottom: "4px",
	},
	"& .MuiOutlinedInput-root.Mui-focused fieldset": {
		border: "1px solid #638dff !important",
	},
	"& .MuiSelect-icon": {
		color: "#638dff !important",
		transform: "rotateZ(0deg)",
	},
	"& .MuiOutlinedInput-root": {
		"& .MuiSelect-select": {
			height: "35px",
			display: "flex",
			alignItems: "center",
		},
		"& fieldset.MuiOutlinedInput-notchedOutline": {
			borderColor: "#c4d8ff",
		},
		"&:hover fieldset.MuiOutlinedInput-notchedOutline": {
			borderColor: "#92afff",
		},
		"&.Mui-disabled": {
			backgroundColor: "#f4f7fb !important",
			"& fieldset.MuiOutlinedInput-notchedOutline": {
				borderColor: "#c4d8ff",
			},
		},
		"&.Mui-error": {
			"& fieldset.MuiOutlinedInput-notchedOutline": {
				borderColor: "#f2a29d !important",
			},
		},
		"&.Mui-focused fieldset.MuiOutlinedInput-notchedOutline": {
			borderColor: "#638dff",
		},
		"& .MuiOutlinedInput-input.Mui-disabled": {
			color: "#44485a",
			"-webkit-text-fill-color": "#44485a",
		},
		fontSize: 14,
		borderRadius: 10,
		// fontFamily: "SF Pro Text Regular",
		backgroundColor: "white",
		color: "2c2f44",
	},
}));

export const StyledSelect = styled(Select)(() => ({
	"& .MuiSvgIcon-root": {
		color: "#638dff",
	},
}));

export const StyledTextField = styled(TextField)({
	"& .MuiFormHelperText-root": {
		color: "#e5453b !important",
	},
	"& label": {
		fontSize: 14,
		color: "#2c2f44",
		fontFamily: "SF Pro Text Light",
		textTransform: "inherit",
	},

	"& label.MuiInputLabel-shrink": {
		fontSize: "0.9rem",
	},
	"& label.Mui-focused": {
		color: "#638dff",
	},
	"& .MuiInput-underline:after": {
		borderBottomColor: "green",
	},
	"& .MuiOutlinedInput-root": {
		fontSize: 14,
		borderRadius: 10,
		fontFamily: "SF Pro Text Regular",
		color: "#2c2f44",
		backgroundColor: "white",
		"& fieldset": {
			borderColor: "#c4d8ff",
		},
		"&:hover fieldset": {
			borderColor: "#92afff",
		},
		"&.Mui-disabled": {
			backgroundColor: "#f4f7fb !important",
			"& fieldset": {
				borderColor: "#c4d8ff",
			},
		},
		"&.Mui-error": {
			"& fieldset": {
				borderColor: "#f2a29d !important",
			},
		},
		"&.Mui-focused fieldset": {
			borderColor: "#638dff",
		},
		"& .MuiOutlinedInput-input.Mui-disabled": {
			color: "#44485a",
			"-webkit-text-fill-color": "#44485a",
		},
	},
});

