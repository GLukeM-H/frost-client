import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import clsx from "clsx";
import {
	FormControl,
	InputLabel,
	Select,
	Slider,
	TextField,
	Checkbox,
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
import { useTheme } from "@material-ui/core/styles";
import useStyles from "./styles";
import { contActions } from "../../actions";

// ~~~~~~~~~~ Height Options ~~~~~~~~~~
const HeightOptions = connect((state) => {
	const compProps =
		state.contentState.contentComp[state.contentState.selected].props;
	return {
		minHeight: compProps.style?.minHeight || "auto",
	};
})((props) => {
	const classes = useStyles();
	const [heightDefaults, setHeightDefaults] = React.useState({
		auto: "",
		px: "100",
		rem: "6",
		"%": "100",
	});
	const [open, setOpen] = React.useState(false);
	const unit = props.minHeight.match(/\D+/g)[0];
	const value = props.minHeight.match(/\d+/g)?.[0];

	const handleValueChange = (v) => {
		const boundsCondition =
			v >= 0 && (unit === "px" || unit === "rem" || (unit === "%" && v <= 100));

		if (boundsCondition) {
			setHeightDefaults((prevHeights) => ({
				...prevHeights,
				[unit]: v.toString(),
			}));
			props.setMinHeight(v.toString() + unit);
		}
	};
	const handleUnitChange = (u) => {
		props.setMinHeight(heightDefaults[u] + u);
	};

	return [
		<ListItem
			key="toggle-collapse"
			button
			onClick={() => setOpen((prevState) => !prevState)}
		>
			<ListItemText primary="Height" />
			{open ? <ExpandLess /> : <ExpandMore />}
		</ListItem>,
		<Collapse key="collapse" in={open}>
			<Paper className={classes.collapsePaper} elevation={0} square>
				<Grid container justify="space-around">
					<Grid item xs={5}>
						<FormControl className={classes.formControl}>
							<TextField
								label="Minimum"
								type="number"
								value={value || ""}
								min={0}
								InputLabelProps={{
									shrink: Boolean(value),
								}}
								disabled={unit === "auto"}
								onChange={(e) => handleValueChange(e.target.value)}
							/>
						</FormControl>
					</Grid>
					<Grid item xs={5}>
						<FormControl className={classes.formControl}>
							<InputLabel id="unit-input-label">Units</InputLabel>
							<Select
								labelId="unit-input-label"
								type="string"
								value={unit}
								onChange={(e) => handleUnitChange(e.target.value)}
							>
								<MenuItem value="px">px</MenuItem>
								<MenuItem value="rem">rem</MenuItem>
								<MenuItem value="%">%</MenuItem>
								<MenuItem value="auto">auto</MenuItem>
							</Select>
						</FormControl>
					</Grid>
				</Grid>
			</Paper>
		</Collapse>,
	];
});

HeightOptions.propTypes = {
	height: PropTypes.string,
	setMinHeight: PropTypes.func.isRequired,
};

// ~~~~~~~~~~ Width Options ~~~~~~~~~~
const WidthOptions = connect((state) => {
	const compProps =
		state.contentState.contentComp[state.contentState.selected].props;
	return {
		xs: compProps.xs || false,
		sm: compProps.sm || false,
		md: compProps.md || false,
		lg: compProps.lg || false,
		xl: compProps.xl || false,
		item: compProps.item || false,
	};
})((props) => {
	const { breakpoints } = useTheme();
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	let viewWidth = "xs";
	breakpoints.keys.forEach((key) => {
		if (window.matchMedia(breakpoints.up(key).match(/\(.*/g)[0]).matches) {
			viewWidth = key;
		}
	});

	return (
		<>
			{props.item && (
				<>
					<ListItem button onClick={() => setOpen((prevState) => !prevState)}>
						<ListItemText primary="Width" />
						{open ? <ExpandLess /> : <ExpandMore />}
					</ListItem>
					<Collapse in={open}>
						<Paper
							className={clsx(classes.collapse, classes.sizeCollapse)}
							elevation={0}
							square
						>
							{breakpoints.keys.map((key) => (
								<div key={key}>
									<Grid container justify="center" alignItems="center">
										<Grid item>
											<Checkbox
												color="primary"
												checked={Boolean(props[key])}
												onChange={(e) =>
													props.setProps({ [key]: e.target.checked && 12 })
												}
											/>
										</Grid>
										<Grid item>
											<Typography variant="subtitle2">
												{key.toUpperCase()} Breakpoint{" "}
												<Typography component="span" variant="caption">
													{viewWidth === key && "(current view width)"}
												</Typography>
											</Typography>
										</Grid>
									</Grid>
									<Slider
										value={props[key] || 0}
										onChange={(e, value) => props.setProps({ [key]: value })}
										defaultValue={4}
										step={1}
										marks
										min={1}
										max={12}
										valueLabelDisplay="auto"
										disabled={!props[key]}
									/>
									{key === "xl" || (
										<Divider
											style={{ marginBottom: "1rem", marginTop: "0.5rem" }}
										/>
									)}
								</div>
							))}
						</Paper>
					</Collapse>
				</>
			)}
		</>
	);
});

WidthOptions.propTypes = {
	xs: PropTypes.number,
	sm: PropTypes.number,
	md: PropTypes.number,
	lg: PropTypes.number,
	xl: PropTypes.number,
	item: PropTypes.bool,
	setProps: PropTypes.func.isRequired,
};

// ~~~~~~~~~~ Align and Justify ~~~~~~~~~~

const AlignAndJustify = connect((state) => {
	const compProps =
		state.contentState.contentComp[state.contentState.selected].props;
	return {
		justify: compProps.justify,
		alignContent: compProps.alignContent,
		alignItems: compProps.alignItems,
		container: compProps.container,
	};
})((props) => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	return (
		<>
			{props.container && (
				<>
					<ListItem
						key="toggle-collapse"
						button
						onClick={() => setOpen((prevState) => !prevState)}
					>
						<ListItemText primary="Align and Justify" />
						{open ? <ExpandLess /> : <ExpandMore />}
					</ListItem>
					<Collapse in={open}>
						<ListItem>
							<FormControl className={classes.formControl}>
								<InputLabel id="align-items-input-label">
									Align Items
								</InputLabel>
								<Select
									labelId="align-items-input-label"
									value={props.alignItems || ""}
									onChange={(e) =>
										props.setProps({ alignItems: e.target.value })
									}
								>
									<MenuItem value="stretch">Stretch</MenuItem>
									<MenuItem value="flex-start">Start</MenuItem>
									<MenuItem value="flex-end">End</MenuItem>
									<MenuItem value="center">Center</MenuItem>
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
									value={props.alignContent || ""}
									onChange={(e) =>
										props.setProps({ alignContent: e.target.value })
									}
								>
									<MenuItem value="stretch">Stretch</MenuItem>
									<MenuItem value="flex-start">Start</MenuItem>
									<MenuItem value="flex-end">End</MenuItem>
									<MenuItem value="center">Center</MenuItem>
									<MenuItem value="space-between">Space Between</MenuItem>
									<MenuItem value="space-around">Space Around</MenuItem>
								</Select>
							</FormControl>
						</ListItem>
						<ListItem>
							<FormControl className={classes.formControl}>
								<InputLabel id="justify-input-label">Justify</InputLabel>
								<Select
									labelId="justify-input-label"
									value={props.justify || ""}
									onChange={(e) => props.setProps({ justify: e.target.value })}
								>
									<MenuItem value="flex-start">Start</MenuItem>
									<MenuItem value="flex-end">End</MenuItem>
									<MenuItem value="center">Center</MenuItem>
									<MenuItem value="space-between">Space Between</MenuItem>
									<MenuItem value="space-around">Space Around</MenuItem>
									<MenuItem value="space-evenly">Space Evenly</MenuItem>
								</Select>
							</FormControl>
						</ListItem>
					</Collapse>
				</>
			)}
		</>
	);
});

// ~~~~~~~~~~ Tools View ~~~~~~~~~~
function GridView(props) {
	const classes = useStyles();
	// const [sizeOpen, setSizeOpen] = React.useState(false);
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
		insertComp("Grid", {
			item: true,
			container: true,
			xs: 12,
			style: { minHeight: "6rem" },
		});
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
				<HeightOptions
					setMinHeight={(h) =>
						setProps({ style: { ...props.stateProps.style, minHeight: h } })
					}
				/>
				<WidthOptions setProps={setProps} />
				<AlignAndJustify setProps={setProps} />
				{props.stateProps.container && (
					<>
						<ListItem button onClick={handleAddItem}>
							<ListItemText primary="Add Grid Item" />
						</ListItem>
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
