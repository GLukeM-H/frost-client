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
import { authActions, contActions, errActions } from "../../actions";

const useStyles = makeStyles((theme) => ({
	paper: {
		width: "100%",
		padding: "2em 1em 2em 1em",
		color: "ghostwhite",
		// ...theme.mixins.navBackground,
		backgroundColor: "transparent",
		border: "1px solid ghostwhite",
		transition: `transform ${theme.transitions.duration.short}ms ease-out`,
		"& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
			borderColor: "ghostwhite",
		},
		"& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
			borderWidth: "2px",
		},
		"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
			borderColor: "ghostwhite",
		},
		"& .MuiOutlinedInput-input": {
			color: "ghostwhite",
		},
		"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
			color: "ghostwhite",
		},
		"& .MuiInputLabel-outlined": {
			color: "ghostwhite",
		},
		"& .MuiInputLabel-outlined.Mui-focused": {
			color: "ghostwhite",
		},
	},
	submit: {
		borderColor: "ghostwhite",
		"& .MuiButton-label": {
			color: "ghostwhite",
		},
		"&:hover": {
			outline: "1px solid ghostwhite",
		},
		"&:hover .MuiButton-label": {
			color: "ghostwhite",
		},
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
		color: "ghostwhite",
		cursor: "pointer",
		"&:hover": {
			color: "white",
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
				<Paper className={classes.paper} elevation={0}>
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
								value={username}
								error={props.loginError}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</Grid>
						<Grid item className={classes.item}>
							<TextField
								variant="outlined"
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
									label="Confirm Password"
									type="password"
									value={checkPassword}
									error={passwordError}
									onChange={(e) => setCheckPassword(e.target.value)}
								/>
							</Grid>
						)}
						<Grid item className={classes.item}>
							<Button
								className={classes.submit}
								variant="outlined"
								onClick={handleSubmit}
							>
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
	<Modal
		open={props.displayLogin}
		style={{ backdropFilter: "blur(20px)" }}
		onClose={() => props.setDisplayLogin(false)}
	>
		{Login()}
	</Modal>
));
