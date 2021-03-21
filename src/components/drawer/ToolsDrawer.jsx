import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import {
	Drawer,
	List,
	ListItem,
	ListItemText,
	IconButton,
	Breadcrumbs,
	Typography,
	Divider,
	Button,
	Box,
	useMediaQuery,
	useTheme,
} from "@material-ui/core";
import {
	ChevronLeft as ChevronLeftIcon,
	KeyboardArrowDown as KeyboardArrowDownIcon,
	Publish as PublishIcon,
} from "@material-ui/icons";
import { navActions, contActions } from "../../actions";
import GridView from "./GridView";
import PaperView from "./PaperView";

const useStyles = makeStyles((theme) => ({
	drawer: {
		flexShrink: 0,
		paddingRight: "10px",
		paddingLeft: "10px",
	},
	leftButton: {
		display: "flex",
		alignItems: "center",
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: "flex-end",
	},
	downButton: {
		backgroundColor: theme.palette.neutral.main,
		position: "absolute",
		top: 0,
		left: "50%",
		transform: "translate(-50%, -50%)",
		borderRadius: "50%",
		zIndex: 1,
	},
	drawerPaper: {
		...theme.mixins.navBackground,
		...theme.mixins.drawer,
		overflowY: "visible",
	},
	mainBox: {
		/* eslint-disable no-useless-computed-key */
		// ["& ::-webkit-scrollbar-track"]: {
		// 	backgroundColor: "black",
		// },
		[theme.breakpoints.up("xs")]: {
			overflowY: "scroll",
		},
		[theme.breakpoints.up("md")]: {
			overflowY: "auto",
		},
		height: "100%",
	},
	collapse: {
		backgroundColor: theme.palette.neutral.main,
		padding: theme.spacing(2),
	},
	textArea: {
		width: "100%",
	},
	sizeCollapse: {
		paddingTop: theme.spacing(3),
		paddingRight: theme.spacing(3),
		paddingLeft: theme.spacing(3),
	},
}));

function ComponentView(props) {
	return (
		<>
			<List>
				<ListItem>
					<Breadcrumbs aria-label="breadcrumb">
						<Typography color="textPrimary" variant="h6">
							Component
						</Typography>
					</Breadcrumbs>
				</ListItem>
			</List>
			<Divider />
			<List dense>
				<ListItem button>
					<ListItemText primary="Highlight Containers" />
				</ListItem>
				<ListItem button>
					<ListItemText primary="Highlight Items" />
				</ListItem>
				<ListItem button>
					<ListItemText primary="Start from scratch" />
				</ListItem>
			</List>
		</>
	);
}

function ToolsDrawer(props) {
	const theme = useTheme();
	const classes = useStyles();
	const mdBreakpoint = useMediaQuery(theme.breakpoints.up("md"));

	const handleView = (view) => {
		props.setToolsView(view);
		props.setSelected("");
	};

	const handleClose = () => {
		props.toggleTools();
		props.toggleEditing();
	};

	const handleInsert = (compName, compProps) => {
		props.insertComp(compName, props.selected, null, compProps);
	};

	const handleSave = () => {
		props.saveBody(props.contentComp, props.visageId);
	};

	let view;
	if (props.selected) {
		let id = props.selected;
		const breadcrumbs = [];
		while (id) {
			breadcrumbs.unshift([id, props.contentComp[id].comp]);
			id = props.contentComp[id].parentId;
		}

		switch (props.contentComp[props.selected].comp) {
			case "Grid":
				view = <GridView breadcrumbs={breadcrumbs} />;
				break;
			case "Paper":
				view = <PaperView breadcrumbs={breadcrumbs} />;
				break;
			default:
				view = (
					<ComponentView handleView={handleView} insertComp={handleInsert} />
				);
		}
	} else {
		switch (props.toolsView) {
			default:
				view = (
					<ComponentView handleView={handleView} insertComp={handleInsert} />
				);
		}
	}

	return (
		<Drawer
			className={classes.drawer}
			classes={{ paper: classes.drawerPaper }}
			anchor={mdBreakpoint ? "left" : "bottom"}
			open={props.toolsOpen}
			variant="persistent"
		>
			<div
				className={clsx({
					[classes.leftButton]: mdBreakpoint,
					[classes.downButton]: !mdBreakpoint,
				})}
			>
				<IconButton onClick={handleClose}>
					{mdBreakpoint ? <ChevronLeftIcon /> : <KeyboardArrowDownIcon />}
				</IconButton>
			</div>
			<Box className={classes.mainBox}>
				<Divider />
				{view}
			</Box>
			<Divider style={{ marginTop: "auto" }} />
			<Button
				onClick={handleSave}
				color={props.savedChanges ? "primary" : "secondary"}
				size="large"
			>
				{props.savedChanges ? (
					"Saved"
				) : (
					<>
						<PublishIcon />
						&ensp;Save
					</>
				)}
			</Button>
		</Drawer>
	);
}

ToolsDrawer.propTypes = {
	toolsOpen: PropTypes.bool.isRequired,
	toolsView: PropTypes.string.isRequired,
	toggleTools: PropTypes.func.isRequired,
	setToolsView: PropTypes.func.isRequired,
	toggleEditing: PropTypes.func.isRequired,
	insertComp: PropTypes.func.isRequired,
	saveBody: PropTypes.func.isRequired,
	savedChanges: PropTypes.bool.isRequired,
	contentComp: PropTypes.object.isRequired,
	visageId: PropTypes.string.isRequired,
	setSelected: PropTypes.func.isRequired,
	selected: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
	toolsOpen: state.navState.toolsOpen,
	toolsView: state.navState.toolsView,
	selected: state.contentState.selected,
	savedChanges: state.contentState.savedChanges,
	contentComp: state.contentState.contentComp,
	visageId: state.contentState.visageId,
});

export default connect(mapStateToProps, {
	toggleTools: navActions.toggleTools,
	setToolsView: navActions.setToolsView,
	toggleEditing: contActions.toggleEditing,
	insertComp: contActions.insertComp,
	saveBody: contActions.saveBody,
	setSelected: contActions.setSelected,
})(ToolsDrawer);
