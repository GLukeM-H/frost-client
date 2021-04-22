import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import "./App.css";
import Landing from "./pages/Landing";
import Visage from "./pages/Visage";

const userTheme = createMuiTheme({
	palette: {
		primary: {
			main: "#486d99",
			translucent: {
				main: "rgba(72,109,153,0.2)",
				dark: "rgba(72,109,153,0.5)",
				light: "rgba(72,109,153,0.075)",
			},
		},
		secondary: {
			main: "#8c4f5a",
		},
		neutral: {
			main: "#e5e5ec",
			light: "#f8f8ff",
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
					backgroundColor: "rgba(248,248,255,0.7)",
			  }
			: {
					backgroundColor: "ghostwhite",
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
