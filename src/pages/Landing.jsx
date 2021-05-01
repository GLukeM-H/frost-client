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
	Paper,
	Box,
} from "@material-ui/core";
import { LoginPaper } from "../components/Login";

const IMG_DIMENSIONS = [window.innerWidth, window.innerHeight]
	.map((n) => Math.floor(n / 100) * 100)
	.join("x");

const useStyles = makeStyles((theme) => ({
	container: {
		minHeight: "100vh",
	},
	backgroundImg: {
		position: "fixed",
		width: "100%",
		height: "100%",
		top: 0,
		left: 0,
		filter: "brightness(50%)",
		zIndex: -1,
	},
	gridLeft: {
		height: "100vh",
		[theme.breakpoints.down("sm")]: {
			marginTop: "2em",
			height: "auto",
		},
	},
	paperLeft: {
		backgroundColor: "transparent",
		backdropFilter: "hue-rotate(180deg) blur(20px)",
		color: "ghostwhite",
		height: "100%",
		width: "100%",
	},
	paperGrid: {
		height: "100%",
	},
	loginContainer: {
		width: "30rem",
		padding: "1.5em",
	},
	link: {
		color: "inherit",
		textDecoration: "none",
		"&:hover": {
			textDecoration: "underline",
		},
	},
	typography: {
		margin: "2em",
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
			<Grid className={classes.gridLeft} item xs={12} md={5}>
				<Paper className={classes.paperLeft} square elevation={10}>
					<Grid
						className={classes.paperGrid}
						container
						alignContent="center"
						justify="center"
					>
						<Grid className={classes.typography} item>
							<Typography variant="h2">
								Go to{" "}
								<Link to="/visage" className={classes.link}>
									<b>SPADES</b>
								</Link>
							</Typography>
							<Typography variant="subtitle1">
								&nbsp;Or if you&apos;re interested, view the source on{" "}
								<ExtLink
									href="https://github.com/glukem-h/frost-client"
									target="_blank"
									rel="noopener"
									style={{ color: "inherit" }}
								>
									<b>Github</b>
								</ExtLink>
							</Typography>
						</Grid>
					</Grid>
				</Paper>
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
			<Box
				className={classes.backgroundImg}
				style={{ backgroundColor: "black" }}
			/>
			<Fade in={imgLoaded}>
				<img
					src={`https://source.unsplash.com/random/${IMG_DIMENSIONS}`}
					className={classes.backgroundImg}
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
