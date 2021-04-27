import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import "./App.css";
import Landing from "./pages/Landing";
import Visage from "./pages/Visage";
import {
	DARK,
	DARK_TRANSLUCENT,
	BLUE,
	BLUE_TRANSLUCENT,
	FOCUS,
	HOVER,
	LIGHT,
	LIGHT_TRANSLUCENT,
} from "./constants/colors";

const colorTheme = "light";

let primary;
let secondary;
let primaryTranslucent;
let secondaryTranslucent;
let neutral;
let neutralTranslucent;
switch (colorTheme) {
	case "blue":
		primary = LIGHT;
		primaryTranslucent = LIGHT_TRANSLUCENT;
		secondary = BLUE;
		secondaryTranslucent = BLUE_TRANSLUCENT;
		neutral = "rgb(0,0,0)";
		neutralTranslucent = "rgb(0,0,0,0.7)";
		break;
	case "dark":
		primary = BLUE;
		primaryTranslucent = BLUE_TRANSLUCENT;
		secondary = DARK;
		secondaryTranslucent = DARK_TRANSLUCENT;
		neutral = "rgb(255,255,255)";
		neutralTranslucent = "rgb(255,255,255,0.7)";
		break;
	case "light":
	default:
		primary = BLUE;
		primaryTranslucent = BLUE_TRANSLUCENT;
		secondary = LIGHT;
		secondaryTranslucent = LIGHT_TRANSLUCENT;
		neutral = "rgb(0,0,0)";
		neutralTranslucent = "rgb(0,0,0,0.7)";
}

const userTheme = createMuiTheme({
	palette: {
		primary: {
			main: primary,
			translucent: {
				main: primaryTranslucent,
				// dark: "rgba(72,109,153,0.5)",
				// light: "rgba(72,109,153,0.075)",
			},
		},
		secondary: {
			main: secondary,
			translucent: {
				main: secondaryTranslucent,
			},
		},
		neutral: {
			main: neutral,
			translucent: {
				main: neutralTranslucent,
			},
		},
		hover: {
			main: HOVER,
		},
		focus: {
			main: FOCUS,
		},
		translucent: {
			main: "rgba(0,0,0,0.2)",
			hover: "rgba(0,0,0,0.04)",
			focus: "rgba(0,0,0,0.08)",
		},
	},
	mixins: {
		drawer: {
			"@media (min-width:0px)": {
				height: "40vh",
				width: "100vw",
			},
			"@media (min-width:960px)": {
				width: "20rem",
				height: "100vh",
			},
		},
		navBackground: CSS.supports("backdrop-filter", "blur(20px)")
			? {
					backdropFilter: "blur(20px)",
					backgroundColor: secondaryTranslucent,
			  }
			: {
					backgroundColor: secondary,
			  },
	},
	overrides: {
		MuiButton: {
			root: {
				minWidth: "2rem",
			},
		},
	},
});

function App() {
	return (
		<ThemeProvider theme={userTheme}>
			<BrowserRouter>
				<Route path="/visage" exact component={Visage} />
				<Route path="/" exact component={Landing} />
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
