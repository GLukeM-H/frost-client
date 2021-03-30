import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import { Paper, Typography, Grid, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { authActions } from "../actions";

const useStyles = makeStyles(() => ({
	paper: {
		padding: "2em 1em 2em 1em",
	},
	container: {
		marginTop: "5rem",
	},
}));

function Login(props) {
	const classes = useStyles();
	const [username, setUsername] = React.useState("");
	const [password, setPassword] = React.useState("");

	const handleSubmit = () => {
		props.login(username, password);
	};

	return (
		<Grid container className={classes.container} justify="center">
			<Grid item xs={9} sm={7} md={5} lg={3}>
				<Paper className={classes.paper} elevation={3}>
					<Grid container direction="column" spacing={3} justify="center">
						<Grid item>
							<Typography
								variant="h4"
								color="primary"
								style={{ cursor: "default" }}
							>
								Login
							</Typography>
						</Grid>
						<Grid item>
							<TextField
								variant="outlined"
								label="Username"
								color="primary"
								value={username}
								error={Boolean(props.error)}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</Grid>
						<Grid item>
							<TextField
								variant="outlined"
								label="Password"
								color="primary"
								value={password}
								error={Boolean(props.error)}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</Grid>
						<Grid item>
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
		</Grid>
	);
}

Login.defaultProps = {
	error: null,
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
	error: PropTypes.string,
};

const mapStateToProps = (state) => ({
	error: state.authState.error,
});

export default connect(mapStateToProps, { login: authActions.login })(Login);
