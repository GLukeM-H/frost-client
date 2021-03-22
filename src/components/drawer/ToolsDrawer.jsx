import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
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
import { Scrollbars } from "react-custom-scrollbars";
import { navActions, contActions } from "../../actions";
import useStyles from "./styles";
import GridView from "./GridView";
import PaperView from "./PaperView";

function ComponentView() {
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
			classes={{ paper: classes.mainPaper }}
			anchor={mdBreakpoint ? "left" : "bottom"}
			open={props.toolsOpen}
			variant="persistent"
		>
			<Box
				className={clsx({
					[classes.headerButtonLeft]: mdBreakpoint,
					[classes.downButton]: !mdBreakpoint,
				})}
			>
				<IconButton onClick={handleClose}>
					{mdBreakpoint ? <ChevronLeftIcon /> : <KeyboardArrowDownIcon />}
				</IconButton>
			</Box>
			<Divider />
			<Scrollbars hideTracksWhenNotNeeded autoHide>
				{view}
			</Scrollbars>
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
