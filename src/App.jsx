import React from "react";
import Grid from "@material-ui/core/Grid";
import {
	makeStyles,
	createMuiTheme,
	ThemeProvider,
} from "@material-ui/core/styles";
import AppBody from "./components/AppBody";
import AppNavBar from "./components/AppNavBar";
import ToolsDrawer from "./components/drawer";
// import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

const userTheme = createMuiTheme({
	palette: {
		primary: {
			main: "#486d99",
			translucent: "rgba(72,109,153,0.7)",
		},
		secondary: {
			main: "#8c4f5a",
		},
		neutral: {
			main: "#e5e5ec",
			light: "#f8f8ff",
			translucent: "rgba(229,229,236,0.7)",
			translucentLight: "rgba(248,248,255,0.7)",
		},
	},
	mixins: {
		drawer: {
			// ["@media (min-width:0px)"] : {
			width: "100vw",
			// },
			/* eslint-disable no-useless-computed-key */
			["@media (min-width:600px)"]: {
				width: "20rem",
			},
		},
		navBackground: {
			...(CSS.supports("backdrop-filter", "blur(20px)")
				? {
						backdropFilter: "blur(20px)",
						backgroundColor: "rgba(248,248,255,0.7)",
				  }
				: {
						backgroundColor: "ghostwhite",
				  }),
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

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: "ghostwhite",
	},
	app: {
		textAlign: "center",
		position: "relative",
	},
	navbarContainer: {
		position: "fixed",
		width: "100vw",
		zIndex: theme.zIndex.appBar,
		...theme.mixins.navBackground,
	},
	drawer: {
		zIndex: theme.zIndex.drawer,
		...theme.mixins.navBackground,
	},
	bodyItem: {
		zIndex: 0,
		marginTop: theme.mixins.toolbar.minHeight,
		[`${theme.breakpoints.up("xs")} and (orientation: landscape)`]: {
			marginTop:
				theme.mixins.toolbar[
					`${theme.breakpoints.up("xs")} and (orientation: landscape)`
				].minHeight,
		},
		[theme.breakpoints.up("sm")]: {
			marginTop: theme.mixins.toolbar[theme.breakpoints.up("sm")].minHeight,
		},
	},
	blurred: {
		filter: "blur(10px)",
		height: "70px",
		width: "100%",
		overflow: "hidden",
		position: "fixed",
	},
}));

function App() {
	const classes = useStyles();

	return (
		<ThemeProvider theme={userTheme}>
			<div className={classes.root}>
				<Grid container className={classes.app}>
					<Grid item xs={12} className={classes.navbarContainer}>
						<AppNavBar />
					</Grid>
					<Grid item className={classes.bodyItem} xs={12}>
						<AppBody />
					</Grid>
					<ToolsDrawer className={classes.drawer} />
				</Grid>
			</div>
		</ThemeProvider>
	);
}

export default App;
