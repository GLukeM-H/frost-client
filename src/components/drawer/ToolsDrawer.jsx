import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import PublishIcon from "@material-ui/icons/Publish";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Paper from "@material-ui/core/Paper";
import Collapse from "@material-ui/core/Collapse";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Slider from "@material-ui/core/Slider";
import { navActions, contActions } from "../../actions";
import GridView from "./GridView";
import PaperView from "./PaperView";

const useStyles = makeStyles((theme) => ({
	drawer: {
		flexShrink: 0,
		paddingRight: "10px",
		paddingLeft: "10px",
	},
	drawerHeader: {
		display: "flex",
		alignItems: "center",
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: "flex-end",
	},
	drawerPaper: {
		...theme.mixins.navBackground,
		...theme.mixins.drawer,
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
	const classes = useStyles();

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
			anchor="left"
			open={props.toolsOpen}
			variant="persistent"
		>
			<div className={classes.drawerHeader}>
				<IconButton onClick={handleClose}>
					<ChevronLeftIcon />
				</IconButton>
			</div>
			<Divider />
			{view}
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
