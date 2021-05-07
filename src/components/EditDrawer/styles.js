import { makeStyles } from "@material-ui/core/styles";
import { red, blue } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
	drawer: {
		flexShrink: 0,
		paddingRight: "10px",
		paddingLeft: "10px",
	},
	headerButtonLeft: {
		display: "flex",
		alignItems: "center",
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: "flex-end",
	},
	downButton: {
		backgroundColor: "ghostwhite",
		border: "1px solid lightgrey",
		position: "absolute",
		top: 0,
		left: "50%",
		transform: "translate(-50%, -50%)",
		borderRadius: "50%",
		zIndex: 1,
	},
	mainPaper: {
		...theme.mixins.navBackground,
		...theme.mixins.drawer,
		overflowY: "visible",
	},
	drawerPaper: {
		backdropFilter: "blur(20px)",
		backgroundColor: "transparent",
		width: "300px",
	},
	collapse: {
		backgroundColor: theme.palette.translucent.focus,
		padding: theme.spacing(2),
	},
	collapsePaper: {
		backgroundColor: theme.palette.translucent.focus,
		padding: theme.spacing(2),
	},
	textArea: {
		maxWidth: "100%",
	},
	sizeCollapse: {
		paddingTop: theme.spacing(3),
		paddingRight: theme.spacing(3),
		paddingLeft: theme.spacing(3),
	},
	breadcrumbLink: {
		cursor: "pointer",
	},
	breadcrumbTypography: {
		cursor: "default",
	},
	formControl: {
		margin: theme.spacing(1),
		width: "100%",
	},
	save: {
		color: red[900],
	},
	saved: {
		color: blue[900],
	},
}));

export default useStyles;
