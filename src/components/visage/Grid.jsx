import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
// eslint-disable-next-line
import * as Comp from ".";
import Abstract from "./Abstract";

const useStyles = makeStyles(() => ({
	default: {
		backgroundColor: "inherit",
		position: "relative",
		display: "inline-flex",
		minHeight: "2rem",
		minWidth: "3rem",
	},
	editing: {
		outline: `1px solid lightblue`,
		borderRadius: "5px",
	},
}));

const GridComp = (props) => {
	const classes = useStyles();
	return (
		<Abstract id={props.id}>
			{({ editHoverProps, selectedClass, editButton }) => (
				<Grid
					className={clsx(classes.default, selectedClass, {
						[classes.editing]: props.editing,
						[classes.container]: props.stateProps.container,
						[classes.item]: props.stateProps.item,
					})}
					{...props.stateProps}
					{...editHoverProps}
				>
					{editButton}
					{props.children.map(([id, compName]) =>
						React.createElement(Comp[compName], { id, key: id })
					)}
				</Grid>
			)}
		</Abstract>
	);
};

GridComp.defaultProps = {
	parentId: null,
};

GridComp.propTypes = {
	id: PropTypes.string.isRequired,
	children: PropTypes.array.isRequired,
	parentId: PropTypes.string,
	editing: PropTypes.bool.isRequired,
	stateProps: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
	const ownState = state.contentState.contentComp[ownProps.id];
	return {
		stateProps: ownState.props,
		children: ownState.childIds.map((id) => [
			id,
			state.contentState.contentComp[id].comp,
		]),
		parentId: ownState.parentId,
		editing: state.contentState.editing,
	};
};

export default connect(mapStateToProps, {})(GridComp);
