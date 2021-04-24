import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Box, Grid, makeStyles } from "@material-ui/core";
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
	gridLeft: {
		backgroundImage:
			"radial-gradient(white, transparent, transparent, transparent)",
	},
	enterTypography: {},
}));

const Landing = (props) => {
	const classes = useStyles();

	React.useEffect(() => {
		const loggedIn =
			props.token &&
			// true if token is not expired
			JSON.parse(atob(props.token.split(".")[1])).exp * 1000 >= Date.now();

		if (loggedIn) {
			props.history.push("/visage");
		}
	}, [props.token]);

	return (
		<Grid className={classes.container} container justify="flex-end">
			<Grid item container xs={12} alignContent="center" justify="center">
				<Grid item container xs={10} sm={7} md={5} lg={4} xl={3}>
					<LoginPaper />
				</Grid>
			</Grid>
			<Box className={classes.background} />
		</Grid>
	);
};

Landing.defaultProps = {
	token: null,
};

Landing.propTypes = {
	token: PropTypes.string,
	history: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
	token: state.authState.token,
});

export default connect(mapStateToProps)(withRouter(Landing));
