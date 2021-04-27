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
		minHeight: "100vh",
	},
	backgroundImg: {
		position: "fixed",
		top: 0,
		left: 0,
		filter: "brightness(50%) hue-rotate(180deg)",
		zIndex: -1,
	},
	gridLeft: {
		height: "100vh",
		backgroundColor: theme.palette.neutral.main,
		padding: "2em",
		[theme.breakpoints.down("sm")]: {
			marginTop: "2em",
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
		"&:hover": {
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
					<Typography variant="h2" color="primary">
						Go to{" "}
						<Link to="/visage" className={classes.link}>
							<b>SPADES</b>
						</Link>
					</Typography>
					<Typography
						className={classes.typography}
						variant="subtitle1"
						color="primary"
					>
						Or if you&apos;re interested, view the source on{" "}
						<ExtLink
							href="https://github.com/glukem-h/frost-client"
							target="_blank"
							rel="noopener"
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
