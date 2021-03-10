import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { contActions } from '../../actions';
import { ROOT_COMP } from '../../constants/contReducerConstants';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import {SwitchTransition} from 'react-transition-group';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Grow from '@material-ui/core/Grow';
import Box from '@material-ui/core/Box';
import Backdrop from '@material-ui/core/Backdrop';
import Popper from '@material-ui/core/Popper';

const useStyles = makeStyles(theme => ({
    root: {
        position: "relative",
    },
    popper: {
        width: 0
    },
    button: {
        border: `1px solid ${theme.palette.primary.light}`,
        backgroundColor: theme.palette.neutral.light,
        width: "3rem"
    },
    edit: {
        color: theme.palette.primary.main,
    },
    delete: {
        color: theme.palette.secondary.main,
    },
    none: {
        display: "none"
    },
    buttonBox: {
        transform: "translateX(-3rem)"
    },
    grow: {
        transformOrigin: "100%, 0"
    },
    selected: {
        zIndex: theme.zIndex.appBar
    },
    backdrop: {
        zIndex: theme.zIndex.appBar - 1,
        width: "calc(100% - 300px / 2)"
    }
}))

const EditButton = connect((state, ownProps) => {
    let enableHover = Boolean(
            (ownProps.selected ||
                !(state.contentState.selected ||
                    state.contentState.hoverDisabled[ownProps.id]))
    )
    return {
        k: ownProps.editVisible && enableHover ? (ownProps.selected ? 2 : 1) : 0
    }
},
{
    deleteComp: contActions.deleteComp,
    deleteChildren: contActions.deleteChildren
}
)(props => {
    const theme = useTheme();
    const classes = useStyles();
    const icons = [null, <EditIcon />, <DeleteIcon />]
    const buttonTimeout = theme.transitions.duration.short;

    const handleSelect = () => {
        props.setSelected(props.id);
    }

    const handleDelete = () => {
        if (props.id === ROOT_COMP) {
            props.deleteChildren(props.id);
        } else {
            props.enableParent(props.id);
            props.deleteComp(props.id);
        }
    }

    return (
        <Box className={classes.buttonBox} {...props.editHoverProps}>
            <SwitchTransition>
                <Grow
                    key={props.k}
                    style={{ transformOrigin: 'top right' }}
                    timeout={props.k && buttonTimeout}
                    unmountOnExit
                >
                    <Button
                        variant="contained"
                        size="small"
                        className={clsx(
                            {
                                [classes.none]: props.k === 0,
                                [classes.button]: props.k > 0,
                                [classes.edit]: props.k === 1,
                                [classes.delete]: props.k === 2,
                                
                            }
                        )}                                        
                        onClick={props.k === 2 ? handleDelete : handleSelect}
                    >
                        {icons[props.k]}
                    </Button>
                </Grow>
            </SwitchTransition>
        </Box>
    )
})


function Abstract(props) {
    const classes = useStyles();
    const [editVisible, setEditVisible] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    
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

    return (
        <>
            <Popper
                open={props.editing}
                className={classes.popper}
                anchorEl={anchorEl}
                placement="right-start"
            >
                <EditButton
                    id={props.id}
                    editVisible={editVisible}
                    setSelected={props.setSelected}
                    enableParent={props.enableParent}
                    selected={props.selected}
                    editHoverProps={editHoverProps}
                />
            </Popper>                    
            <Backdrop open={props.selected} onClick={() => props.setSelected('')} className={classes.backdrop} {...editHoverProps}/>
            {props.children({
                editHoverProps,
                selectedClass: clsx({[classes.selected]: props.selected})
            })}
        </>
    )

}


Abstract.propTypes = {
    id: PropTypes.string.isRequired,
    nodeRef: PropTypes.object,
    selected: PropTypes.bool.isRequired,
    editing: PropTypes.bool.isRequired,
    setSelected: PropTypes.func.isRequired,
    disableParent: PropTypes.func.isRequired,
    enableParent: PropTypes.func.isRequired,
    deleteComp: PropTypes.func.isRequired,
    deleteChildren: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
    editing: state.contentState.editing,
    selected: state.contentState.selected === ownProps.id,
})

export default connect(mapStateToProps, {
    setSelected: contActions.setSelected,
    disableParent: contActions.disableParent,
    enableParent: contActions.enableParent,
    deleteComp: contActions.deleteComp,
    deleteChildren: contActions.deleteChildren,
})(Abstract);

