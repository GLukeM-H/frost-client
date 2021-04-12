import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
	Modal,
	Paper,
	Typography,
	Grid,
	TextField,
	Button,
	Link,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { authActions, contActions } from "../actions";

const useStyles = makeStyles(() => ({
	paper: {
		width: "100%",
		padding: "2em 1em 2em 1em",
	},
	container: {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
	},
	item: {
		textAlign: "center",
	},
	link: {
		cursor: "pointer",
	},
}));

function Login(props) {
	const classes = useStyles();
	const [username, setUsername] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [checkPassword, setCheckPassword] = React.useState("");
	const [passwordError, setPasswordError] = React.useState(false);
	const [registering, setRegistering] = React.useState(false);

	const handleSubmit = () => {
		if (registering) {
			if (checkPassword === password) {
				props.register(username, password);
			} else {
				setPasswordError(true);
			}
		} else {
			props.login(username, password);
		}
	};

	return (
		<Modal
			open={props.displayLogin}
			onClose={() => props.setDisplayLogin(false)}
		>
			<Grid
				container
				item
				xs={9}
				sm={7}
				md={5}
				lg={3}
				className={classes.container}
				justify="center"
			>
				<Paper className={classes.paper} elevation={3}>
					<Grid container direction="column" spacing={3} justify="center">
						<Grid item className={classes.item}>
							{registering ? (
								<>
									<Typography
										variant="h4"
										color="primary"
										style={{ cursor: "default" }}
									>
										Register
									</Typography>
									<Typography>
										<Link
											className={classes.link}
											onClick={() => setRegistering(false)}
										>
											Have an account? Login here.
										</Link>
									</Typography>
								</>
							) : (
								<>
									<Typography
										variant="h4"
										color="primary"
										style={{ cursor: "default" }}
									>
										Login
									</Typography>
									<Typography>
										<Link
											className={classes.link}
											onClick={() => setRegistering(true)}
										>
											No account? Register here.
										</Link>
									</Typography>
								</>
							)}
						</Grid>
						<Grid item className={classes.item}>
							<TextField
								variant="outlined"
								label="Username"
								color="primary"
								value={username}
								error={Boolean(props.error)}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</Grid>
						<Grid item className={classes.item}>
							<TextField
								variant="outlined"
								label="Password"
								color="primary"
								type="password"
								value={password}
								error={passwordError}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</Grid>
						{registering && (
							<Grid item className={classes.item}>
								<TextField
									variant="outlined"
									label="Confirm Password"
									color="primary"
									type="password"
									value={checkPassword}
									error={passwordError}
									onChange={(e) => setCheckPassword(e.target.value)}
								/>
							</Grid>
						)}
						<Grid item className={classes.item}>
							<Button
								color="primary"
								variant="contained"
								onClick={handleSubmit}
							>
								Submit
							</Button>
						</Grid>
					</Grid>
				</Paper>
			</Grid>
		</Modal>
	);
}

Login.defaultProps = {
	error: null,
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	setDisplayLogin: PropTypes.func.isRequired,
	displayLogin: PropTypes.bool.isRequired,
	error: PropTypes.string,
};

const mapStateToProps = (state) => ({
	displayLogin: state.contentState.displayLogin,
	error: state.authState.error,
});

export default connect(mapStateToProps, {
	login: authActions.login,
	register: authActions.register,
	setDisplayLogin: contActions.setDisplayLogin,
})(Login);
