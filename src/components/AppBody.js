import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { contActions } from '../actions';
import { ROOT_COMP } from '../data/contReducerConstants';
import * as comp from './content';
import { makeStyles } from '@material-ui/core/styles';
import { Transition } from 'react-transition-group';
import Grid from "@material-ui/core/Grid";

const duration = 250;
const drawerWidth = 300;

  
const useStyles = makeStyles(theme => ({
  defaultBody: {
    transform: "translateX(0)",
    transition: `transform ${duration}ms ease-in-out`
  },
  enteringBody: {
    transform: `translateX(-${drawerWidth/2}px)`
  },
  enteredBody: {
    transform: `translateX(-${drawerWidth/2}px)`
  },
  exitingBody: {
    transform: "translateX(0vw)"
  },
  exitedBody: {
    transfrom: "translateX(0vw)"
  },
  leftItem: {
    outline: "1px dashed black"
  },
  middleItem: {
    outline: "1px dashed black"
  },
  rightItem: {
    outline: "1px dashed black"
  }
}));

const AppBody = props => {
    const classes = useStyles();

    React.useEffect(() => {
        props.getBody();
    }, []); /* Loops forever without empty props for dependency (only should run once on mount) */

    return (
      <Transition in={props.toolsOpen} timeout={duration}>
        {state => (
          <Grid container className={`${classes.defaultBody} ${classes[`${state}Body`]}`}>
            <Grid item className={classes.leftItem} md={2} xs={12}>left</Grid>
            <Grid item className={classes.middleItem} md={8} xs={12}>
              {React.createElement((comp[props.rootComp] || props.rootComp), props.rootProps, props.rootInner)}
            </Grid>
            <Grid item className={classes.rightItem} md={2} xs={12}>right</Grid>
          </Grid>
        )}
      </Transition>
    );
}


AppBody.propTypes = {
    getBody: PropTypes.func.isRequired,
    rootComp: PropTypes.string.isRequired,
    rootProps: PropTypes.object.isRequired,
    rootInner: PropTypes.string.isRequired,
    toolsOpen: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    rootComp: state.contentState.contentComp[ROOT_COMP].comp,
    rootProps: state.contentState.contentComp[ROOT_COMP].props,
    rootInner: state.contentState.contentComp[ROOT_COMP].inner,
    toolsOpen: state.navState.toolsOpen
})

export default connect(mapStateToProps, { getBody: contActions.getBody })(AppBody);