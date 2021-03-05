import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';
import Abstract from './Abstract';

const useStyles = makeStyles(theme => ({
    default: {
        maxWidth: "100%",
        padding: "10px",
        position: "relative",
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        width: "100%"
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

    return (
            <Abstract id={props.id}>
                {({editButton, editHoverProps, selectedClass}) => (
                    <Paper className={clsx(classes.default, selectedClass)} {...editHoverProps}>
                        {editButton}
                        <Typography className={classes.typography} component="p">
                            {props.inner}                
                        </Typography>
                    </Paper>
                )}
            </Abstract>
    );

}

PaperComp.propTypes = {
    id: PropTypes.string.isRequired,
    parentId: PropTypes.string,
    inner: PropTypes.string,
    editable: PropTypes.bool,
}

const mapStateToProps = (state, ownProps) => ({
    parentId: state.contentState.contentComp[ownProps.id].parentId,
    inner: state.contentState.contentComp[ownProps.id].inner,
    editable: state.contentState.contentComp[ownProps.id].editable
})


export default connect(mapStateToProps, {})(PaperComp);
