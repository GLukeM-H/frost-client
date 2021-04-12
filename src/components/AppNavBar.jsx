import React from "react";
import { connect } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
	AppBar,
	Toolbar,
	Button,
	IconButton,
	MenuList,
	MenuItem,
	Typography,
	Grow,
	Paper,
	Popper,
	ClickAwayListener,
	Divider,
} from "@material-ui/core";
import {
	AccountCircle as AccountCircleIcon,
	Menu as MenuIcon,
} from "@material-ui/icons";
import { navActions, contActions, authActions } from "../actions";

/* ~~~~~ Styles ~~~~~ */
const useStyles = makeStyles((theme) => {
	const { palette } = theme;

	return {
		appNav: {
			flexGrow: 1,
			color: palette.primary.dark,
			...theme.mixins.navBackground,
		},
		menuButton: {
			marginRight: theme.spacing(2),
			outline: "0px !important",
		},
		title: {
			flexGrow: 1,
			textAlign: "start",
		},
		userMenu: {
			color: palette.primary.dark,
			outline: "0px !important",
			textTransform: "capitalize",
			fontSize: "1rem",
		},
		userPopper: {
			backgroundColor: palette.neutral.light,
		},
	};
});

/* ~~~~~ Components ~~~~~ */
const UserMenu = connect(
	(state) => ({
		editing: state.contentState.editing,
		username: state.authState.username,
		loggedIn: Boolean(state.authState.token),
	}),
	{
		toggleEditing: contActions.toggleEditing,
		setEditing: contActions.setEditing,
		toggleTools: navActions.toggleTools,
		setTools: navActions.setTools,
		setDisplayLogin: contActions.setDisplayLogin,
		logout: authActions.logout,
	}
)((props) => {
	const theme = useTheme();
	const style = useStyles();
	const [open, setOpen] = React.useState(false);
	const [editVisible, setEditVisible] = React.useState(false);
	const anchorRef = React.useRef(null);

	React.useEffect(() => {
		if (props.editing) {
			setTimeout(
				() => setEditVisible(true),
				theme.transitions.duration.shortest
			);
		} else {
			setTimeout(
				() => setEditVisible(false),
				theme.transitions.duration.shortest
			);
		}
	}, [props.editing]);

	const handleToggle = () => {
		setOpen((prevState) => !prevState);
	};

	const handleClose = (event) => {
		if (!(anchorRef.current && anchorRef.current.contains(event.target))) {
			setOpen(false);
		}
	};

	const handleEditing = () => {
		props.toggleTools();
		props.toggleEditing();
		setOpen(false);
	};

	const handleLogout = () => {
		setOpen(false);
		props.setEditing(false);
		props.setTools(false);
		props.logout();
	};

	const handleLogin = () => {
		setOpen(false);
		props.setDisplayLogin(true);
	};

	// return focus to the button when we transitioned from !open -> open
	const prevOpen = React.useRef(open);
	React.useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current.focus();
		}
		prevOpen.current = open;
	}, [open]);

	return (
		<>
			{props.editing && <Typography component="i">Editing</Typography>}
			<Button
				ref={anchorRef}
				aria-controls={open ? "menu-list-grow" : undefined}
				aria-haspopup="true"
				onClick={handleToggle}
				className={style.userMenu}
			>
				<AccountCircleIcon />
				{props.username}
			</Button>
			<Popper
				open={open}
				anchorEl={anchorRef.current}
				role={undefined}
				placement="bottom-end"
				transition
				disablePortal
			>
				{({ TransitionProps }) => (
					<Grow {...TransitionProps} style={{ transformOrigin: "center top" }}>
						<Paper className={style.userPopper}>
							<ClickAwayListener onClickAway={handleClose}>
								<MenuList autoFocusItem={open} id="menu-list-grow">
									{editVisible ? (
										<MenuItem onClick={handleEditing}>Done Editing</MenuItem>
									) : (
										<MenuItem onClick={handleEditing}>Edit Visage</MenuItem>
									)}
									<Divider />
									{props.loggedIn ? (
										<MenuItem onClick={handleLogout}>
											<Typography color="textSecondary">Logout</Typography>
										</MenuItem>
									) : (
										<MenuItem onClick={handleLogin}>
											<Typography color="textSecondary">Login</Typography>
										</MenuItem>
									)}
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
		</>
	);
});

function AppNavBar() {
	const classes = useStyles();

	return (
		<div className={classes.appNav}>
			<AppBar position="static" color="transparent">
				<Toolbar>
					<IconButton
						className={classes.menuButton}
						edge="start"
						color="inherit"
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h5" className={classes.title}>
						Spades
					</Typography>
					<UserMenu />
				</Toolbar>
			</AppBar>
		</div>
	);
}

export default AppNavBar;
