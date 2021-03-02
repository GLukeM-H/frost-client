import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { contActions } from '../../actions';
import EditButton from '../EditButton';
import clsx from 'clsx';
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';
import Backdrop from '@material-ui/core/Backdrop';

const useStyles = makeStyles(theme => ({
    default: {
        padding: "10px",
        position: "relative",
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
    selected: {
        zIndex: theme.zIndex.appBar + 2
    },
    typography: {
        overflow: "hidden"
    },
    backdrop: {
        zIndex: theme.zIndex.appBar + 1,
        width: "calc(100% - 300px / 2)"
    }
}))

function PaperComp(props) {
    const classes = useStyles();

    const handleClick = () => {
        props.setSelectedComp('');
    }

    return (
        <>
            <Backdrop open={props.selected === props.id} onClick={handleClick} className={classes.backdrop}/>
            <Paper className={clsx(classes.default, {[classes.selected]: props.editing && (props.selected === props.id)})}>
                {props.editing && <EditButton key={0} name={"Paper"} parentId={props.id}/>}
                <Typography key={1} className={classes.typography} component="p">
                    {props.inner}                
                </Typography>
            </Paper>
        </>
    );

}

PaperComp.propTypes = {
    id: PropTypes.string.isRequired,
    parentId: PropTypes.string,
    editing: PropTypes.bool.isRequired,
    selected: PropTypes.string,
    inner: PropTypes.string,
    setSelectedComp: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => ({
    parentId: state.contentState.contentComp[ownProps.id].parentId,
    editing: state.contentState.editing,
    selected: state.contentState.selected,
    inner: state.contentState.contentComp[ownProps.id].inner,
})


export default connect(mapStateToProps, {setSelectedComp: contActions.selectedComp})(PaperComp);
