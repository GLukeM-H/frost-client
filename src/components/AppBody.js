import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { contActions } from '../actions';
import { ROOT_COMP } from '../data/contReducerConstants';
import * as comp from './content';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";

const transitions = {
    entering: {
      transform: "translateX(0vw)"
    },
    entered: {
      transform: "translateX(-15vw)"
    },
    exiting: {
      transform: "translateX(-15vw)"
    },
    exited: {
      transfrom: "translateX(0vw)"
    }
 }
  
const useStyles = makeStyles(theme => ({
    bodyContainer: {
        gridTemplateColumns: "2fr 2fr 2fr",
        transform: "translateX(0vw)"
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
    }, []);

    return (
        <Grid container className={classes.bodyContainer}>
            <Grid item className={classes.leftItem} md={2} xs={12}>left</Grid>
            <Grid item className={classes.middleItem} md={8} xs={12}>
                    {React.createElement((comp[props.rootComp] || props.rootComp), props.rootProps, props.rootInner)}
            </Grid>
            <Grid item className={classes.rightItem} md={2} xs={12}></Grid>
        </Grid>
    );
}

// class AppBody extends React.Component {
    
//     componentDidMount() {
//         this.props.getBody();
//     }
    
//     render() {
//         return (
//             <Grid container className={classes.bodyContainer}>
//                 <Grid item className={classes.leftItem} md={2} xs={12}></Grid>
//                 <Grid item className={classes.middleItem} md={8}>
//                     <div>
//                         {React.createElement((comp[this.props.rootComp] || this.props.rootComp), this.props.rootProps, this.props.rootInner)}
//                     </div>
//                 </Grid>
//                 <Grid item className={classes.rightItem} md={2} xs={12}></Grid>
//             </Grid>
//         );
//     }
// }


AppBody.propTypes = {
    getBody: PropTypes.func.isRequired,
    rootComp: PropTypes.string.isRequired,
    rootProps: PropTypes.object.isRequired,
    rootInner: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
    rootComp: state.contentState.contentComp[ROOT_COMP].comp,
    rootProps: state.contentState.contentComp[ROOT_COMP].props,
    rootInner: state.contentState.contentComp[ROOT_COMP].inner
})

export default connect(mapStateToProps, { getBody: contActions.getBody })(AppBody);