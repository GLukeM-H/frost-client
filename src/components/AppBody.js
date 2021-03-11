import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { contActions } from '../actions';
import { ROOT_COMP } from '../constants/contReducerConstants';
// import { DRAWER_WIDTH, DURATION } from '../constants/appBody';
import * as comp from './content';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Transition } from 'react-transition-group';
import Grid from "@material-ui/core/Grid";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
  
const useStyles = makeStyles(theme => {
  const toolbar = theme.mixins.toolbar;
  const drawer = theme.mixins.drawer;
  const smBreakpoint = theme.breakpoints.up('sm');
  const xsBreakpoint = theme.breakpoints.up('xs');
  return { 
    defaultBody: {
      transform: "translateX(0px)",
      transition: `transform ${theme.transitions.duration.standard}ms cubic-bezier(.6,.01,.51,1.01)`,
      paddingTop: "1rem",
      minHeight: `calc(100vh - ${toolbar.minHeight}px)`,
      [`${xsBreakpoint} and (orientation: landscape)`]: {
        minHeight: `calc(
          100vh - ${toolbar[`${xsBreakpoint} and (orientation: landscape)`].minHeight}px
        )`
      },
      [smBreakpoint]: {
        minHeight: `calc(100vh - ${toolbar[smBreakpoint].minHeight}px)`
      },
    },
    enteringBody: {
      [theme.breakpoints.up('xs')]: {
        transform: "translateX(0)"
      },
      [smBreakpoint]: {
        transform: `translateX(calc(${drawer[smBreakpoint].width} / 2))`
      }
    },
    enteredBody: {
      [theme.breakpoints.up('xs')]: {
        transform: "translateX(0)"
      },
      [smBreakpoint]: {
        transform: `translateX(calc(${drawer[smBreakpoint].width} / 2))`
      }
    },
    exitingBody: {
      transform: "translateX(0vw)"
    },
    exitedBody: {
      transfrom: "translateX(0vw)"
    },
    leftItem: {
      flexGrow: 1
    },
    middleItem: {
      outline: "1px dashed black",
      height: "100%"
    },
    rightItem: {
      flexGrow: 1
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: theme.palette.primary.light,
      backgroundColor: 'rgba(0,0,0,0)'
    }
  }
});

function LoadingBackdrop(props) {
  const theme = useTheme();
  const classes = useStyles();

  return (
      <Backdrop
        className={classes.backdrop}
        open={props.loading}
        transitionDuration={{
          enter: theme.transitions.duration.enteringScreen,
          exit: theme.transitions.duration.leavingScreen
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
  );
}

function AppBody(props) {
    const theme = useTheme();
    const classes = useStyles();

    React.useEffect(() => {
        props.getBody();
    }, []);

    return (
      <>
        <Transition in={props.toolsOpen} timeout={theme.transitions.duration.standard}>
          {state => (
            <Grid container className={clsx(classes.defaultBody, classes[`${state}Body`])}>
              <Grid item className={classes.leftItem} md={2} xs={12}>left</Grid>
                <Fade in={!props.loading} timeout={theme.transitions.duration.standard}>
                  <Grid item className={classes.middleItem} md={8} xs={12}>
                      {React.createElement((comp[props.rootComp.comp] || props.rootComp.comp), {id: ROOT_COMP})}
                  </Grid>
                </Fade>
              <Grid item className={classes.rightItem} >right</Grid>
            </Grid>
          )}
        </Transition>
        <LoadingBackdrop loading={props.loading} />
      </>
    );
}


AppBody.propTypes = {
    getBody: PropTypes.func.isRequired,
    rootComp: PropTypes.object.isRequired,
    toolsOpen: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    rootComp: state.contentState.contentComp[ROOT_COMP],
    toolsOpen: state.navState.toolsOpen,
    loading: state.contentState.loading
})

export default connect(mapStateToProps, { getBody: contActions.getBody })(AppBody);