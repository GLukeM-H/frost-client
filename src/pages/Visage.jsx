import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AppBody from "../components/AppBody";
import AppNavbar from "../components/AppNavbar";
import EditDrawer from "../components/EditDrawer";

const useStyles = makeStyles((theme) => {
	const xsBreakpoint = theme.breakpoints.up("xs");
	const smBreakpoint = theme.breakpoints.up("sm");
	return {
		app: {
			textAlign: "center",
			position: "relative",
			backgroundColor: theme.palette.secondary.main,
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
			[`${xsBreakpoint} and (orientation: landscape)`]: {
				marginTop:
					theme.mixins.toolbar[`${xsBreakpoint} and (orientation: landscape)`]
						.minHeight,
			},
			[smBreakpoint]: {
				marginTop: theme.mixins.toolbar[smBreakpoint].minHeight,
			},
		},
	};
});

const Visage = () => {
	const classes = useStyles();
	return (
		<Grid container className={classes.app}>
			<Grid item xs={12} className={classes.navbarContainer}>
				<AppNavbar />
			</Grid>
			<Grid item className={classes.bodyItem} xs={12}>
				<AppBody />
			</Grid>
			<EditDrawer className={classes.drawer} />
		</Grid>
	);
};

export default Visage;
