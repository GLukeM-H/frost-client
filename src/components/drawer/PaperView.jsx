import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import clsx from "clsx";
import {
	List,
	ListItem,
	ListItemText,
	Breadcrumbs,
	Link,
	Typography,
	Divider,
	Paper,
	Collapse,
	TextField,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { contActions } from "../../actions";
import useStyles from "./styles";

function PaperView(props) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const setInner = (inner) => props.setInner(props.selected, inner);
	// const setProps = (stateProps) => props.setProps(props.selected, stateProps);

	return (
		<>
			<List>
				<ListItem>
					<Breadcrumbs>
						{props.breadcrumbs.map(([id, comp]) =>
							id === props.selected ? (
								<Typography
									key={id}
									className={classes.breadcrumbTypography}
									color="textPrimary"
									variant="h6"
								>
									{comp}
								</Typography>
							) : (
								<Link
									key={id}
									className={classes.breadcrumbLink}
									onClick={() => props.setSelected(id)}
								>
									{comp}
								</Link>
							)
						)}
					</Breadcrumbs>
				</ListItem>
			</List>
			<Divider />
			<List dense>
				<ListItem button onClick={() => setOpen((prevState) => !prevState)}>
					<ListItemText primary="Add Text" />
					{open ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={open}>
					<Paper className={classes.collapse} elevation={0} square>
						<TextField
							className={classes.textArea}
							multiline
							placeholder="Add text here."
							value={props.selectedInner}
							onChange={(e) => setInner(e.target.value)}
						/>
					</Paper>
				</Collapse>
			</List>
		</>
	);
}

PaperView.propTypes = {
	setSelected: PropTypes.func.isRequired,
	setInner: PropTypes.func.isRequired,
	selected: PropTypes.string.isRequired,
	// setProps: PropTypes.func.isRequired,
	breadcrumbs: PropTypes.array.isRequired,
	selectedInner: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
	selected: state.contentState.selected,
	selectedInner:
		state.contentState.contentComp[state.contentState.selected].inner,
});

export default connect(mapStateToProps, {
	setSelected: contActions.setSelected,
	setInner: contActions.setInner,
	// setProps: contActions.setProps,
})(PaperView);
