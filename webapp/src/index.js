import React from "react";
import { createRoot } from "react-dom/client";
import Main from "./Components/Main/Main";
import register from "./registerServiceWorker";
import {
	createTheme,
	ThemeProvider,
	StyledEngineProvider,
} from "@mui/material/styles";
import "./styles/css/style.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const theme = createTheme({
	palette: {
		primary: {
			main: "#00a7d6",
			contrastText: "#FFFFFF",
		},
		secondary: {
			main: "#638dff",
			contrastText: "#FFFFFF",
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				contained: {
					backgroundColor: "#00a7d6",
					color: "#FFFFFF",
				},
			},
		},
	},
});
const root = createRoot(document.getElementById("root"));

console.info(`%c User Agent: ${navigator.userAgent}`, "color: grey;");
root.render(
	<StyledEngineProvider injectFirst>
		<ThemeProvider theme={theme}>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<Main />
			</LocalizationProvider>
		</ThemeProvider>
	</StyledEngineProvider>
);
register();
