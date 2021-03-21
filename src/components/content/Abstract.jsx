import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import { SwitchTransition } from "react-transition-group";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Grow from "@material-ui/core/Grow";
import Box from "@material-ui/core/Box";
import Backdrop from "@material-ui/core/Backdrop";
import { contActions } from "../../actions";

const useStyles = makeStyles((theme) => ({
	root: {
		position: "relative",
	},
	buttonBox: {
		position: "absolute",
		top: 0,
		right: 0,
		zIndex: theme.zIndex.appBar + 1,
	},
	button: {
		border: `1px solid ${theme.palette.primary.light}`,
		backgroundColor: theme.palette.neutral.light,
		width: "3rem",
		height: "2rem",
	},
	edit: {
		color: theme.palette.primary.main,
	},
	delete: {
		color: theme.palette.secondary.main,
	},
	none: {
		display: "none",
	},
	grow: {
		transformOrigin: "100%, 0",
	},
	selected: {
		zIndex: theme.zIndex.appBar,
	},
	backdrop: {
		zIndex: theme.zIndex.appBar - 1,
		[theme.breakpoints.up("xs")]: {
			marginLeft: "0",
		},
		[theme.breakpoints.up("md")]: {
			marginLeft: `${theme.mixins.drawer[theme.breakpoints.up("md")].width}`,
		},
	},
	backdropDrawerLeft: {},
}));

const EditButton = connect(
	(state, ownProps) => {
		const enableHover = Boolean(
			ownProps.selected ||
				!(
					state.contentState.selected ||
					state.contentState.hoverDisabled[ownProps.id]
				)
		);

		return {
			isRootComp: state.contentState.visageId === ownProps.id,
			k: ownProps.editVisible && enableHover ? (ownProps.selected ? 2 : 1) : 0,
		};
	},
	{
		deleteComp: contActions.deleteComp,
		deleteChildren: contActions.deleteChildren,
	}
)((props) => {
	const theme = useTheme();
	const classes = useStyles();
	const icons = [null, <EditIcon />, <DeleteIcon />];
	const buttonTimeout = theme.transitions.duration.short;

	const handleSelect = () => {
		props.setSelected(props.id);
	};

	const handleDelete = () => {
		if (props.isRootComp) {
			props.deleteChildren(props.id);
		} else {
			props.enableParent(props.id);
			props.deleteComp(props.id);
		}
	};

	return (
		<Box className={classes.buttonBox}>
			<SwitchTransition>
				<Grow
					key={props.k}
					style={{ transformOrigin: "top right" }}
					timeout={props.k && buttonTimeout}
					unmountOnExit
				>
					<Button
						variant="contained"
						size="small"
						className={clsx({
							[classes.none]: props.k === 0,
							[classes.button]: props.k > 0,
							[classes.edit]: props.k === 1,
							[classes.delete]: props.k === 2,
						})}
						onClick={props.k === 2 ? handleDelete : handleSelect}
					>
						{icons[props.k]}
					</Button>
				</Grow>
			</SwitchTransition>
		</Box>
	);
});

function Abstract(props) {
	const classes = useStyles();
	const [editVisible, setEditVisible] = React.useState(false);

	const editHoverProps = props.editing
		? {
				onMouseEnter() {
					setEditVisible(true);
					props.disableParent(props.id);
				},
				onMouseLeave() {
					setEditVisible(false);
					props.enableParent(props.id);
				},
		  }
		: {};

	return (
		<>
			<Backdrop
				open={props.selected}
				onClick={() => props.setSelected("")}
				className={clsx(classes.backdrop, {
					[classes.backdropDrawerLeft]: props.toolsOpen,
				})}
				{...editHoverProps}
			/>
			{props.children({
				editHoverProps,
				selectedClass: clsx({ [classes.selected]: props.selected }),
				editButton: props.editing && (
					<EditButton
						id={props.id}
						editVisible={editVisible}
						setSelected={props.setSelected}
						enableParent={props.enableParent}
						selected={props.selected}
						editHoverProps={editHoverProps}
					/>
				),
			})}
		</>
	);
}

Abstract.propTypes = {
	id: PropTypes.string.isRequired,
	selected: PropTypes.bool.isRequired,
	editing: PropTypes.bool.isRequired,
	setSelected: PropTypes.func.isRequired,
	disableParent: PropTypes.func.isRequired,
	enableParent: PropTypes.func.isRequired,
	deleteComp: PropTypes.func.isRequired,
	deleteChildren: PropTypes.func.isRequired,
	toolsOpen: PropTypes.bool.isRequired,
	children: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
	editing: state.contentState.editing,
	selected: state.contentState.selected === ownProps.id,
	toolsOpen: state.navState.toolsOpen,
});

export default connect(mapStateToProps, {
	setSelected: contActions.setSelected,
	disableParent: contActions.disableParent,
	enableParent: contActions.enableParent,
	deleteComp: contActions.deleteComp,
	deleteChildren: contActions.deleteChildren,
})(Abstract);
