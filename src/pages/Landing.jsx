import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import {
	Fade,
	Grid,
	makeStyles,
	Typography,
	Link as ExtLink,
} from "@material-ui/core";
import { LoginPaper } from "../components/Login";

const IMG_DIMENSIONS = [window.innerWidth, window.innerHeight]
	.map((n) => Math.floor(n / 100) * 100)
	.join("x");

const useStyles = makeStyles((theme) => ({
	container: {
		height: "100vh",
	},
	// backgroundFilter: {
	// 	position: "absolute",
	// 	zIndex: -1,
	// 	overflow: "hidden",
	// 	height: "100%",
	// 	width: "100%",
	// 	backgroundImage: `radial-gradient(top right, transparent, transparent, transparent, black)`,
	// },
	backgroundImg: {
		position: "fixed",
		filter: "brightness(50%) hue-rotate(180deg)",
		zIndex: -1,
		// backgroundSize: "cover",
	},
	gridLeft: {
		height: "100%",
		backgroundColor: theme.palette.primary.main,
		padding: "2em",
		[theme.breakpoints.down("sm")]: {
			marginTop: "3em",
			height: "auto",
		},
	},
	loginContainer: {
		width: "25rem",
		padding: "1.5em",
	},
	link: {
		color: "inherit",
		textDecoration: "none",
		// eslint-disable-next-line
		["&:hover"]: {
			textDecoration: "underline",
		},
	},
	typography: {
		padding: "2em 0",
	},
}));

const Landing = (props) => {
	const classes = useStyles();
	const [imgLoaded, setImgLoaded] = React.useState(false);

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
		<Grid
			className={classes.container}
			container
			justify="flex-end"
			alignItems="center"
			alignContent="center"
		>
			<Grid
				className={classes.gridLeft}
				item
				container
				xs={12}
				md={5}
				alignContent="center"
				justify="center"
			>
				<Grid item>
					<Typography variant="h2" color="textPrimary">
						Go to{" "}
						<Link to="/visage" className={classes.link}>
							<b>SPADES</b>
						</Link>
					</Typography>
					<Typography className={classes.typography} variant="subtitle1">
						Or if you&apos;re interested, view the source on{" "}
						<ExtLink
							href="https://github.com/glukem-h/frost-client"
							target="_blank"
							rel="noopener"
							color="textPrimary"
						>
							<b>Github</b>
						</ExtLink>
					</Typography>
				</Grid>
			</Grid>
			<Grid
				item
				container
				xs={12}
				md={7}
				alignContent="center"
				justify="center"
			>
				<Grid item container className={classes.loginContainer}>
					<LoginPaper />
				</Grid>
			</Grid>
			<Fade in={imgLoaded}>
				<img
					src={`https://source.unsplash.com/random/${IMG_DIMENSIONS}`}
					className={classes.backgroundImg}
					width="100%"
					height="100%"
					alt=""
					onLoad={() => setImgLoaded(true)}
				/>
			</Fade>
		</Grid>
	);
};

Landing.defaultProps = {
	token: null,
};

Landing.propTypes = {
	token: PropTypes.string,
	history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	token: state.authState.token,
});

export default connect(mapStateToProps)(withRouter(Landing));
