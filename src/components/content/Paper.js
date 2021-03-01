import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import EditButton from '../EditButton';
import clsx from 'clsx';
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    default: {
        padding: "10px",
        position: "relative",
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
    selected: {
        outline: "2px dashed lightblue"
    },
    typography: {
        overflow: "hidden"
    }
}))

function PaperComp(props) {
    const classes = useStyles();

    return (
        <Paper
            className={clsx(classes.default, {[classes.selected]: props.editing && (props.selected === props.id)})}
        >
            {props.editing && <EditButton name={"Paper"} parentId={props.id}/>}
            <Typography className={classes.typography} component="p">
                {props.inner}                
            </Typography>
        </Paper>
    );

}

PaperComp.propTypes = {
    id: PropTypes.string.isRequired,
    parentId: PropTypes.string,
    editing: PropTypes.bool.isRequired,
    selected: PropTypes.string,
    inner: PropTypes.string
}

const mapStateToProps = (state, ownProps) => ({
    parentId: state.contentState.contentComp[ownProps.id].parentId,
    editing: state.contentState.editing,
    selected: state.contentState.selected,
    inner: state.contentState.contentComp[ownProps.id].inner,
})


export default connect(mapStateToProps, {})(PaperComp);
