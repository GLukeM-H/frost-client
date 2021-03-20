import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import {
	FormControl,
	InputLabel,
	Select,
	Slider,
	TextField,
	List,
	ListItem,
	ListItemText,
	MenuItem,
	Breadcrumbs,
	Link,
	Typography,
	Divider,
	Paper,
	Collapse,
	Grid,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { contActions } from "../../actions";

const useStyles = makeStyles((theme) => ({
	collapse: {
		backgroundColor: theme.palette.translucent.focus,
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
	link: {
		cursor: "pointer",
	},
	formControl: {
		margin: theme.spacing(1),
		width: "100%",
	},
}));

// function parseHeight(str) {
// 	return str.match(/\d+|\D+/g);
// }
/* eslint-disable react/prop-types */
function HeightOptions(props) {
	const classes = useStyles();
	const [units, setUnits] = React.useState(props.height?.match(/\D+/g)[0]);
	const [minValue, setMinValue] = React.useState(0);

	switch (units) {
		case "auto":
			break;
		default:
			break;
	}

	return (
		<ListItem>
			<Grid container justify="space-around">
				<Grid item xs={5}>
					<FormControl className={classes.formControl}>
						<TextField
							label="Value"
							type="number"
							minValue={0}
							InputLabelProps={{
								shrink: true,
							}}
							disabled={units === "auto"}
						/>
					</FormControl>
				</Grid>
				<Grid item xs={5}>
					<FormControl className={classes.formControl}>
						<InputLabel id="unit-input-label">Units</InputLabel>
						<Select
							labelId="unit-input-label"
							value={units}
							onChange={(e) => setUnits(e.target.value)}
						>
							<MenuItem value="px">px</MenuItem>
							<MenuItem value="rem">rem</MenuItem>
							<MenuItem value="%">%</MenuItem>
							<MenuItem value="auto">auto</MenuItem>
						</Select>
					</FormControl>
				</Grid>
			</Grid>
		</ListItem>
	);
}

function GridView(props) {
	const classes = useStyles();
	const [sizeOpen, setSizeOpen] = React.useState(false);
	const insertComp = (compName, compProps) => {
		props.insertComp(compName, props.selected, null, compProps);
	};
	const setProps = (compProps) => {
		props.setProps(props.selected, compProps);
	};

	React.useEffect(() => {
		if (!(props.stateProps.container || props.hasChildren)) {
			setProps({ container: true });
		}
	}, [props.hasChildren]);

	const handleAddItem = () => {
		insertComp("Grid", { item: true, container: true, xs: 12 });
	};

	const handleAddComp = (compName, compProps = {}) => {
		insertComp(compName, compProps);
		setProps({ container: false });
	};

	// container item hasChildren
	/* add grid item
    change size */

	// container hasChildren
	/* add grid item */

	// item hasChildren
	/* change size */

	// container item noChildren
	/* add grid item
    change size
    add components */

	// container noChildren
	/* add grid item */

	return (
		<>
			<List>
				<ListItem>
					<Breadcrumbs>
						{props.breadcrumbs.map(([id, comp]) =>
							id === props.selected ? (
								<Typography key={id} color="textPrimary" variant="h6">
									{comp}
								</Typography>
							) : (
								<Link
									key={id}
									className={classes.link}
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
				<HeightOptions height={props.stateProps.style?.height} />
				{props.stateProps.container && (
					<>
						<ListItem button onClick={handleAddItem}>
							<ListItemText primary="Add Grid Item" />
						</ListItem>
						<ListItem>
							<FormControl className={classes.formControl}>
								<InputLabel id="align-items-input-label">
									Align Items
								</InputLabel>
								<Select
									labelId="align-items-input-label"
									value={props.stateProps.alignItems}
									onChange={(e) => setProps({ alignItems: e.target.value })}
								>
									<MenuItem value="stretch">Stretch</MenuItem>
									<MenuItem value="center">Center</MenuItem>
									<MenuItem value="flex-start">Start</MenuItem>
									<MenuItem value="flex-end">End</MenuItem>
									<MenuItem value="baseline">Baseline</MenuItem>
								</Select>
							</FormControl>
						</ListItem>
						<ListItem>
							<FormControl className={classes.formControl}>
								<InputLabel id="align-content-input-label">
									Align Content
								</InputLabel>
								<Select
									labelId="align-content-input-label"
									value={props.stateProps.alignContent}
									onChange={(e) => setProps({ alignContent: e.target.value })}
								>
									<MenuItem value="stretch">Stretch</MenuItem>
									<MenuItem value="center">Center</MenuItem>
									<MenuItem value="flex-start">Start</MenuItem>
									<MenuItem value="flex-end">End</MenuItem>
									<MenuItem value="space-between">Space Between</MenuItem>
									<MenuItem value="space-around">Space Around</MenuItem>
								</Select>
							</FormControl>
						</ListItem>
					</>
				)}
				{props.stateProps.item && (
					<>
						<ListItem
							button
							onClick={() => setSizeOpen((prevState) => !prevState)}
						>
							<ListItemText primary="Change Size" />
							{sizeOpen ? <ExpandLess /> : <ExpandMore />}
						</ListItem>
						<Collapse in={sizeOpen}>
							<Paper
								className={clsx(classes.collapse, classes.sizeCollapse)}
								elevation={0}
								square
							>
								<Slider
									value={props.stateProps.xs}
									onChange={(e, xs) => setProps({ xs })}
									defaultValue={4}
									step={1}
									marks
									min={1}
									max={12}
									valueLabelDisplay="auto"
								/>
							</Paper>
						</Collapse>
					</>
				)}
				{props.stateProps.item && !props.hasChildren && (
					<>
						<ListItem button onClick={() => handleAddComp("Paper")}>
							<ListItemText primary="Add Paper" />
						</ListItem>
					</>
				)}
			</List>
		</>
	);
}

GridView.propTypes = {
	insertComp: PropTypes.func.isRequired,
	setSelected: PropTypes.func.isRequired,
	setProps: PropTypes.func.isRequired,
	breadcrumbs: PropTypes.array.isRequired,
	stateProps: PropTypes.object.isRequired,
	hasChildren: PropTypes.bool.isRequired,
	selected: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
	selected: state.contentState.selected,
	stateProps: state.contentState.contentComp[state.contentState.selected].props,
	hasChildren: Boolean(
		state.contentState.contentComp[state.contentState.selected].childIds.length
	),
});

export default connect(mapStateToProps, {
	setSelected: contActions.setSelected,
	setProps: contActions.setProps,
	insertComp: contActions.insertComp,
})(GridView);
