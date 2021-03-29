import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Paper, Typography, Grid, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { contActions } from "../actions";

const useStyles = makeStyles((theme) => ({
	paper: {
		padding: "2em 1em 2em 1em",
	},
	container: {
		marginTop: "5rem",
	},
}));

function Login() {
	const classes = useStyles();
	const [username, setUsername] = React.useState("");
	const [password, setPassword] = React.useState("");

	const handleSubmit = () => {
		const query = `
            mutation login($username: String!, $password: String!){
                login(username: $username, password: $password) {
                    token,
                    error
                }
            }
        `;
		axios
			.post("/graphql", { query, variables: { username, password } })
			.then((res) => {
				// error check
				// Load visage
				console.log(res.data.data.login);
			});
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
								onChange={(e) => setUsername(e.target.value)}
							/>
						</Grid>
						<Grid item>
							<TextField
								variant="outlined"
								label="Password"
								color="primary"
								value={password}
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

export default Login;
