import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { contActions } from '../../actions'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {SwitchTransition} from 'react-transition-group';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Grow from '@material-ui/core/Grow';
import Slide from '@material-ui/core/Slide';
import Box from '@material-ui/core/Box';
import Backdrop from '@material-ui/core/Backdrop';
import Popper from '@material-ui/core/Popper';

const useStyles = makeStyles(theme => ({
    root: {
        position: "relative",
    },
    button: {
        border: `1px solid ${theme.palette.primary.light}`,
        backgroundColor: theme.palette.neutral.light,
        transform: "translateY(100%)"
    },
    edit: {
        color: theme.palette.primary.main
    },
    delete: {
        color: theme.palette.secondary.main
    },
    buttonBox: {
        transform: "translateX(-100%)"
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
    const [anchorEl, setAnchorEl] = React.useState(null);
    const buttonTimeout = 250;
    React.useEffect(() => {
        setAnchorEl(props.nodeRef.current);
    }, [])

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

    const handleSelect = () => {
        props.setSelected(props.id);
    }

    const handleDelete = () => {
        props.enableParent(props.id);
        props.deleteComp(props.id);
    }

        

    return (
        <>
            <Popper
                open={editVisible && !props.hoverDisabled}
                anchorEl={anchorEl}
                placement="right-start"
                transition
                {...editHoverProps}>
                {({ TransitionProps }) => (
                    <Box className={classes.buttonBox}>
                        <Grow 
                            {...TransitionProps}
                            timeout={buttonTimeout}
                            unmountOnExit
                        >
                            <SwitchTransition>
                                <Grow
                                    key={props.selected}
                                    in={editVisible && !props.hoverDisabled}
                                    style={{transformOrigin: "100% 0"}}
                                    timeout={buttonTimeout}
                                >
                                    <Button
                                        variant="contained"
                                        size="small"
                                        className={clsx(
                                            classes.button,
                                            {
                                                [classes.delete]: props.selected,
                                                [classes.edit]: !props.selected
                                            }
                                        )}
                                        onClick={props.selected ? handleDelete : handleSelect}
                                    >
                                        {props.selected ? <DeleteIcon /> : <EditIcon />}
                                    </Button>
                                </Grow>
                            </SwitchTransition>
                        </Grow>
                    </Box>
                )}
            </Popper>                    
            <Backdrop open={props.selected} onClick={() => props.setSelected('')} className={classes.backdrop}/>
                {props.children({
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
            (state.contentState.selected ||
                state.contentState.hoverDisabled[ownProps.id]))
    )
})

export default connect(mapStateToProps, {
    setSelected: contActions.setSelected,
    disableParent: contActions.disableParent,
    enableParent: contActions.enableParent,
    deleteComp: contActions.deleteComp,
    setInner: contActions.setInner
})(Abstract);

