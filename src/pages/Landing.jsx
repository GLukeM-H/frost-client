import { Box, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { LoginPaper } from "../components/Login";

const useStyles = makeStyles(() => ({
	container: {
		height: "100vh",
		overflow: "hidden",
	},
	background: {
		position: "absolute",
		zIndex: -1,
		height: "100%",
		width: "100%",
		backgroundImage:
			"radial-gradient(transparent, transparent, black), url(https://source.unsplash.com/random/1500x800)",
		backgroundSize: "cover",
		backgroundColor: "ghostwhite",
		filter: "hue-rotate(180deg)",
	},
	gridRight: {
		backgroundColor: "transparent",
	},
}));

const Landing = () => {
	const classes = useStyles();

	return (
		<Grid className={classes.container} container justify="flex-end">
			<Grid
				className={classes.gridRight}
				item
				container
				xs={12}
				md={5}
				alignContent="center"
				justify="center"
			>
				<Grid item container xs={11} sm={9} md={11} lg={9}>
					<LoginPaper />
				</Grid>
			</Grid>
			<Box className={classes.background} />
		</Grid>
	);
};

export default Landing;
