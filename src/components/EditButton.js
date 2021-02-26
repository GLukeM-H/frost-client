import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ROOT_COMP } from '../data/contReducerConstants'
import { contActions, navActions } from '../actions'
import { makeStyles } from '@material-ui/core/styles'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import OpenWithIcon from '@material-ui/icons/OpenWith'
import {
    Container, Row, Col,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';
import Delete from '@material-ui/icons/Delete'

const useStyles = makeStyles(theme => ({
    buttonGroup: {
        backgroundColor: theme.palette.secondary.white,
        position: "absolute",
        width: "40px",
        right: -40,
        top: 0,
        zIndex: 100
    },
    button: {
        outline: "0px !important",
        color: theme.palette.secondary.main
    }
}))

const EditButton = props => {
    const classes = useStyles()

    const handleSelect = () => {
        props.selectedComp(props.parentId)
        props.setToolsView(props.name)
    }
    const handleDelete = () => {
        props.deleteComp(props.parentId)
    }

    return (
        <ButtonGroup variant="outlined" orientation="vertical" className={classes.buttonGroup} size="small" color="primary">
            {props.name === 'Container' || <Button className={classes.button} onClick={() => null}><OpenWithIcon /></Button>}
            <Button className={classes.button} onClick={handleSelect}><MoreVertIcon /></Button>
            {props.parentId === ROOT_COMP || <Button className={classes.button} onClick={handleDelete}><DeleteIcon /></Button>}
        </ButtonGroup>
    )

}

// class EditButton extends React.Component {

//     handleSelect() {
//         this.props.selectedComp(this.props.parentId);
//         this.props.setToolsView(this.props.name);
//     }

//     handleDelete() {
//         this.props.deleteComp(this.props.parentId)
//     }

//     render() {
//         return (
//             <Container>
//                 <UncontrolledDropdown >
//                     <DropdownToggle >
//                         \
//                     </DropdownToggle>
//                     <DropdownMenu style={{textAlign: "center"}}>
//                         <DropdownItem header style={{borderBottom: "3px solid ghostwhite"}}>{this.props.name}</DropdownItem>
//                         <DropdownItem onClick={() => this.handleSelect()}>edit</DropdownItem>
//                         {(this.props.parentId !== ROOT_COMP) && (<DropdownItem onClick={() => this.handleDelete()}>delete</DropdownItem>)}
//                     </DropdownMenu>
//                 </UncontrolledDropdown>
//             </Container>
//         );
//     }
// }


EditButton.propTypes = {
    setToolsView: PropTypes.func.isRequired,
    selectedComp: PropTypes.func.isRequired,
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
    selectedComp: contActions.selectedComp,
    setToolsView: navActions.setToolsView
})(EditButton);
