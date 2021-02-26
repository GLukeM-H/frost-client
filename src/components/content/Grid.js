import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import EditButton from '../EditButton';
import * as comp from './';

const useStyles = makeStyles(theme => ({
    default: {
        padding: "10px",
        position: "relative"
    },
    selected: {
        outline: "2px dashed lightblue"
    },
    itemNoChild: {
        width: "25%",
        height: "300px"
    },
    containerNoChild: {
        width: "100%",
        height: "320px"
    }
}))

const GridComp = props => {
    const classes = useStyles();
    const gridRef = React.useRef();
    const isSelected = props.selected == props.id;

    const applyClasses = () => {
        let classNames = classes.default
        if (props.editing) {
            classNames += " "+ (isSelected && classes.selected)
            if (!props.children.length) {
                classNames += " " + (props.isContainer ? classes.containerNoChild : classes.itemNoChild)
            }
        }
        return classNames
    }

    return (
        <Grid
            container={props.isContainer}
            item={!props.isContainer} 
            className={applyClasses()}
            xs={props.xs}
        >
            {props.editing && <EditButton name={props.isContainer ? "Container" : "Item"} parentId={props.id}/>}
            {props.children.map(child => React.createElement(comp[child.comp], child.props, child.inner))}                
        </Grid>
    );

}

GridComp.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.array.isRequired,
    parentId: PropTypes.string,
    editing: PropTypes.bool.isRequired,
    selected: PropTypes.string,
    isContainer: PropTypes.bool.isRequired,
    xs: PropTypes.number
}

const mapStateToProps = (state, ownProps) => ({
    children: state.contentState.contentComp[ownProps.id].childIds.map(id => state.contentState.contentComp[id]),
    parentId: state.contentState.contentComp[ownProps.id].parentId,
    editing: state.contentState.editing,
    selected: state.contentState.selected,
    isContainer: state.contentState.contentComp[ownProps.id].props.isContainer,
    xs: state.contentState.contentComp[ownProps.id].props.xs
})


export default connect(mapStateToProps, {})(GridComp);
