import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import EditButton from '../EditButton';
import * as comp from './';
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
    default: {
        padding: "10px",
        position: "relative",
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText
    },
    selected: {
        outline: "2px dashed lightblue"
    },
}))

function PaperComp(props) {
    const classes = useStyles();
    const isSelected = props.selected === props.id;

    const applyClasses = () => {
        let classNames = classes.default
        if (props.editing) {
            classNames += " " + (isSelected && classes.selected)
        }
        return classNames
    }

    return (
        <Paper
            className={applyClasses()}
        >
            {props.editing && <EditButton name={"Paper"} parentId={props.id}/>}
            {props.inner}                
        </Paper>
    );

}

PaperComp.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.array.isRequired,
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
