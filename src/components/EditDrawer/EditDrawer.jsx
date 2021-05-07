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
	Collapse,
	TextField,
	Paper,
	Button,
	Box,
	useMediaQuery,
	useTheme,
} from "@material-ui/core";
import {
	ChevronLeft as ChevronLeftIcon,
	KeyboardArrowDown as KeyboardArrowDownIcon,
	Publish as PublishIcon,
	ExpandLess,
	ExpandMore,
} from "@material-ui/icons";
import { Scrollbars } from "react-custom-scrollbars";
import { navActions, contActions } from "../../actions";
import useStyles from "./styles";
import GridOptions from "./GridOptions";
import PaperOptions from "./PaperOptions";

const ComponentView = connect(
	(state) => ({
		visageName: state.contentState.visageName,
	}),
	{
		setVisageName: contActions.setVisageName,
	}
)((props) => {
	const classes = useStyles();
	const [visageNameOpen, setVisageNameOpen] = React.useState(false);

	return (
		<>
			<List>
				<ListItem>
					<Breadcrumbs aria-label="breadcrumb">
						<Typography color="textPrimary" variant="h6">
							{props.visageName}
						</Typography>
					</Breadcrumbs>
				</ListItem>
			</List>
			<Divider />
			<List dense>
				<ListItem
					button
					onClick={() => setVisageNameOpen((prevState) => !prevState)}
				>
					<ListItemText primary="Change Visage Name" />
					{visageNameOpen ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={visageNameOpen}>
					<Paper className={classes.collapse} elevation={0} square>
						<TextField
							className={classes.textArea}
							value={props.visageName}
							onChange={(e) => props.setVisageName(e.target.value)}
						/>
					</Paper>
				</Collapse>
			</List>
		</>
	);
});

ComponentView.propTypes = {
	visageName: PropTypes.string.isRequired,
};

function EditDrawer(props) {
	const theme = useTheme();
	const classes = useStyles();
	const mdBreakpoint = useMediaQuery(theme.breakpoints.up("md"));

	const handleClose = () => {
		props.toggleTools();
		props.toggleEditing();
	};

	const handleSave = () => {
		props.saveBody();
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
				view = <GridOptions breadcrumbs={breadcrumbs} />;
				break;
			case "Paper":
				view = <PaperOptions breadcrumbs={breadcrumbs} />;
				break;
			default:
				view = <ComponentView visageName={props.visageName} />;
		}
	} else {
		switch (props.toolsView) {
			default:
				view = <ComponentView visageName={props.visageName} />;
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
				className={clsx({
					[classes.save]: !props.savedChanges,
					[classes.saved]: props.savedChanges,
				})}
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

EditDrawer.propTypes = {
	toolsOpen: PropTypes.bool.isRequired,
	toolsView: PropTypes.string.isRequired,
	toggleTools: PropTypes.func.isRequired,
	toggleEditing: PropTypes.func.isRequired,
	saveBody: PropTypes.func.isRequired,
	savedChanges: PropTypes.bool.isRequired,
	contentComp: PropTypes.object.isRequired,
	visageName: PropTypes.string.isRequired,
	selected: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
	toolsOpen: state.navState.toolsOpen,
	toolsView: state.navState.toolsView,
	selected: state.contentState.selected,
	savedChanges: state.contentState.savedChanges,
	contentComp: state.contentState.contentComp,
	visageName: state.contentState.visageName,
});

export default connect(mapStateToProps, {
	toggleTools: navActions.toggleTools,
	setToolsView: navActions.setToolsView,
	toggleEditing: contActions.toggleEditing,
	insertComp: contActions.insertComp,
	saveBody: contActions.saveBody,
	setSelected: contActions.setSelected,
})(EditDrawer);
