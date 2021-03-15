import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
	default: {
		position: "relative",
	},
	selected: {
		outline: "2px dashed lightblue",
	},
	expand: {
		transform: "rotate(0deg)",
		marginLeft: "auto",
		transition: theme.transitions.create("transform", {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: "rotate(180deg)",
	},
}));

function CardComp(props) {
	const classes = useStyles();
	const isSelected = props.selected === props.id;

	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => setExpanded((prevState) => !prevState);

	return (
		<Card
			className={clsx(classes.default, {
				[classes.selected]: props.editing && isSelected,
			})}
		>
			<CardHeader title={props.title} subheader={props.subheader} />
			<CardContent>
				<Typography variant="body2" color="textSecondary" component="p">
					{props.summary}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<IconButton
					className={clsx(classes.expand, {
						[classes.expandOpen]: expanded,
					})}
					onClick={handleExpandClick}
					aria-expanded={expanded}
					aria-label="show more"
				>
					<ExpandMoreIcon />
				</IconButton>
			</CardActions>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>{props.content}</CardContent>
			</Collapse>
		</Card>
	);
}

CardComp.defaultProps = {
	summary: "",
	content: "",
	title: "",
	subheader: "",
};

CardComp.propTypes = {
	id: PropTypes.string.isRequired,
	// parentId: PropTypes.string,
	editing: PropTypes.bool.isRequired,
	selected: PropTypes.string.isRequired,
	summary: PropTypes.string,
	content: PropTypes.string,
	title: PropTypes.string,
	subheader: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => ({
	parentId: state.contentState.contentComp[ownProps.id].parentId,
	editing: state.contentState.editing,
	selected: state.contentState.selected,
	summary: state.contentState.contentComp[ownProps.id].props.summary,
	content: state.contentState.contentComp[ownProps.id].props.content,
	title: state.contentState.contentComp[ownProps.id].props.title,
	subheader: state.contentState.contentComp[ownProps.id].props.subheader,
});

export default connect(mapStateToProps, {})(CardComp);
