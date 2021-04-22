/* eslint-disable no-useless-computed-key */
import React from "react";
import { connect } from "react-redux";
import {
	Modal,
	Paper,
	Typography,
	Grid,
	TextField,
	Button,
	Link,
	useTheme,
	Fade,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { SwitchTransition } from "react-transition-group";
import { authActions, contActions, errActions } from "../actions";

const useStyles = makeStyles((theme) => ({
	paper: {
		width: "100%",
		padding: "2em 1em 2em 1em",
		backgroundColor: theme.palette.translucent.main,
		backdropFilter: "blur(20px)",
		color: theme.palette.primary.dark,
		...theme.mixins.navBackground,
		transition: `transform ${theme.transitions.duration.short}ms ease-out`,
	},
	enteringPaper: {
		transform: "rotate3d(1,2,0,90deg)",
	},
	exitingPaper: {
		transform: "rotate3d(1,2,0,-90deg)",
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
	input: {
		color: theme.palette.neutral.main,
	},
	link: {
		cursor: "pointer",
		["&:hover"]: {
			opacity: "0.8",
		},
	},
}));

export const LoginPaper = connect(
	(state) => ({
		loginError: Boolean(state.errorState.login),
	}),
	{
		login: authActions.login,
		register: authActions.register,
		setLoginErr: errActions.setLoginErr,
	}
)((props) => {
	const classes = useStyles();
	const theme = useTheme();
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

	const handleSwitchRegister = () => {
		setRegistering(true);
		props.setLoginErr(null);
	};

	const handleSwitchLogin = () => {
		setRegistering(false);
		props.setLoginErr(null);
	};

	return (
		<SwitchTransition>
			<Fade
				key={registering}
				direction="right"
				timeout={theme.transitions.duration.shorter}
			>
				<Paper className={classes.paper} elevation={4}>
					<Grid container direction="column" spacing={3} justify="center">
						<Grid item className={classes.item}>
							{registering ? (
								<>
									<Typography variant="h4" style={{ cursor: "default" }}>
										Register
									</Typography>
									<Typography>
										<Link className={classes.link} onClick={handleSwitchLogin}>
											Have an account? Login here.
										</Link>
									</Typography>
								</>
							) : (
								<>
									<Typography variant="h4" style={{ cursor: "default" }}>
										Login
									</Typography>
									<Typography>
										<Link
											className={classes.link}
											onClick={handleSwitchRegister}
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
								error={props.loginError}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</Grid>
						<Grid item className={classes.item}>
							<TextField
								variant="outlined"
								color="primary"
								label="Password"
								type="password"
								value={password}
								error={props.loginError}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</Grid>
						{registering && (
							<Grid item className={classes.item}>
								<TextField
									variant="outlined"
									color="primary"
									label="Confirm Password"
									type="password"
									value={checkPassword}
									error={passwordError}
									onChange={(e) => setCheckPassword(e.target.value)}
								/>
							</Grid>
						)}
						<Grid item className={classes.item}>
							<Button color="primary" variant="outlined" onClick={handleSubmit}>
								Submit
							</Button>
						</Grid>
					</Grid>
				</Paper>
			</Fade>
		</SwitchTransition>
	);
});

export const Login = () => {
	const classes = useStyles();
	return (
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
			<LoginPaper />
		</Grid>
	);
};

export const ModalLogin = connect(
	(state) => ({
		displayLogin: state.contentState.displayLogin,
	}),
	{ setDisplayLogin: contActions.setDisplayLogin }
)((props) => (
	<Modal open={props.displayLogin} onClose={() => props.setDisplayLogin(false)}>
		<Login />
	</Modal>
));
