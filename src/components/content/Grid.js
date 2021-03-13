import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import * as Comp from './';
import Abstract from './Abstract';

const useStyles = makeStyles(theme => ({
    default: {
        backgroundColor: "inherit",
        position: "relative",
        display: "inline-flex",
        minHeight: "20px",
        minWidth: "20px"
    },
    selected: {
        outline: "2px dashed lightblue"
    },
}))

const GridComp = props => {
    const classes = useStyles();
    const ref = React.createRef();

    return (
        <Abstract nodeRef={ref} id={props.id}>
            {({editHoverProps, selectedClass, editButton}) => (
                <Grid
                    ref={ref}
                    className={clsx(classes.default, selectedClass, {
                        [classes.selected]: props.editing && (props.selected === props.id),
                        [classes.container]: props.container,
                        [classes.item]: props.item
                    })}
                    {...props.stateProps}
                    {...editHoverProps}
                >
                    {editButton}
                    {props.children.map(([id, compName]) => React.createElement(Comp[compName], {id, key: id}))}                
                </Grid>
            )}
        </Abstract>
    );

}

GridComp.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.array.isRequired,
    parentId: PropTypes.string,
    editing: PropTypes.bool.isRequired,
    selected: PropTypes.string,
    stateProps: PropTypes.object
}

const mapStateToProps = (state, ownProps) => {
    const ownState = state.contentState.contentComp[ownProps.id];    
    return {
        stateProps: ownState.props,
        children: ownState.childIds.map(id => [id, state.contentState.contentComp[id].comp]),
        parentId: ownState.parentId,
        editing: state.contentState.editing,
        selected: state.contentState.selected
    }
}


export default connect(mapStateToProps, {})(GridComp);
