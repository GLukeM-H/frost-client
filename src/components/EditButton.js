import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ROOT_COMP } from '../data/contReducerConstants'
import { contActions } from '../actions'
import { makeStyles } from '@material-ui/core/styles'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit';
import OpenWithIcon from '@material-ui/icons/OpenWith'

const useStyles = makeStyles(theme => ({
    buttonGroup: {
        backgroundColor: theme.palette.neutral.light,
        position: "absolute",
        width: "40px",
        zIndex: 100,
        top: 0,
        right: 0,       
    },
    button: {
        outline: "0px !important",
        color: theme.palette.primary.main
    },
    deleteButton: {
        outline: "0px !important",
        color: theme.palette.secondary.main
    }
}))

const EditButton = props => {
    const classes = useStyles();

    const handleSelect = () => {
        props.setSelectedComp(props.parentId);
    }
    const handleDelete = () => {
        props.deleteComp(props.parentId);
    }

    return (
        <ButtonGroup variant="outlined" orientation="vertical" className={classes.buttonGroup} size="small" color="primary">
            {props.name === 'Container' ? null : <Button className={classes.button} onClick={() => null}><OpenWithIcon /></Button>}
            <Button className={classes.button} onClick={handleSelect}><EditIcon /></Button>
            {props.parentId === ROOT_COMP ? null : <Button className={classes.deleteButton} onClick={handleDelete}><DeleteIcon /></Button>}
        </ButtonGroup>
    )

}

EditButton.propTypes = {
    setSelectedComp: PropTypes.func.isRequired,
    parentId: PropTypes.string.isRequired,
    childId: PropTypes.string,
    name: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
    contentState: state.contentState,
    toolsOpen: state.navState.toolsOpen
})

export default connect(mapStateToProps, {
    deleteComp: contActions.deleteComp,
    setSelectedComp: contActions.selectedComp,
})(EditButton);
