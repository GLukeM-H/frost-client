import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { contActions } from '../../actions'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import Fade from '@material-ui/core/Fade';
import Box from '@material-ui/core/Box';
import Backdrop from '@material-ui/core/Backdrop';

const useStyles = makeStyles(theme => ({
    root: {
        position: "relative",
    },
    button: {
        border: `1px solid ${theme.palette.primary.light}`,
        backgroundColor: theme.palette.neutral.light,
        color: theme.palette.primary.main,
        "& :hover": {
            backgroundColor: theme.palette.neutral.dark
        }
    },
    buttonBox: {
        position: "absolute",
        zIndex: theme.zIndex.appBar + 1,
        top: 0,
        right: 0,
        "& :hover": {
            color: theme.palette.neutral.light
        }
    },
    selected: {
        position: "relative",
        zIndex: theme.zIndex.appBar
    },
    backdrop: {
        zIndex: theme.zIndex.appBar - 1,
        width: "calc(100% - 300px / 2)"
    }
}))

function Abstract(props) {
    const classes = useStyles();
    const [editVisible, setEditVisible] = React.useState(false);

    const editHoverProps = props.editing ? {
        onMouseEnter: () => {
            setEditVisible(true);
            props.disableParent(props.id);
        },
        onMouseLeave: () => {
            setEditVisible(false);
            props.enableParent(props.id);
        }
    } : {};

    const editButton = (              
        <Fade in={editVisible && !props.hoverDisabled} timeout={300} unmountOnExit>
            <Box className={classes.buttonBox}>
                <Button
                    variant="contained"
                    size="small"
                    className={classes.button}
                    onClick={() => props.setSelected(props.id)}
                >
                    <EditIcon />
                </Button>
            </Box>
        </Fade>
    );
    

    return (
        <>
            <Backdrop open={props.selected} onClick={() => props.setSelected('')} className={classes.backdrop}/>
            {props.children({
                editButton,
                editHoverProps,
                selectedClass: clsx({[classes.selected]: props.editing && props.selected})
            })}
        </>
    )

}


Abstract.propTypes = {
    id: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    editing: PropTypes.bool.isRequired,
    setSelected: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => ({
    editing: state.contentState.editing,
    selected: state.contentState.selected === ownProps.id,
    hoverDisabled: Boolean(
        !state.contentState.editing ||
        (state.contentState.selected !== ownProps.id &&
        (state.contentState.selected || state.contentState.hoverDisabled[ownProps.id]))
    )
})

export default connect(mapStateToProps, {
    setSelected: contActions.setSelected,
    disableParent: contActions.disableParent,
    enableParent: contActions.enableParent
})(Abstract);

