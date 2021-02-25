import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import EditButton from '../EditButton';
import * as comp from './';

const useStyles = makeStyles(theme => ({
    default: {
        padding: "10px"
    },
    selected: {
        outline: "2px dashed lightblue"
    }
}))

const GridComp = props => {
    const classes = useStyles();
    const isSelected = props.selected == props.id;

    return (
        <Grid
            container={props.isContainer}
            item={!props.isContainer} 
            className={`${classes.default} ${isSelected ? classes.selected : ""}`}
        >
            {props.editing && <EditButton name={props.isContainer ? "Container" : "Item"} parentId={props.id} childId={null}/>}
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
    isContainer: PropTypes.bool.isRequired
}

const mapStateToProps = (state, ownProps) => ({
    children: state.contentState.contentComp[ownProps.id].childIds.map(id => state.contentState.contentComp[id]),
    parentId: state.contentState.contentComp[ownProps.id].parentId,
    editing: state.contentState.editing,
    selected: state.contentState.selected,
    isContainer: state.contentState.contentComp[ownProps.id].props.isContainer
})


export default connect(mapStateToProps, {})(GridComp);
