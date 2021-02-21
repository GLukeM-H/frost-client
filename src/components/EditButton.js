import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ROOT_COMP } from '../data/contReducerConstants';
import { contActions, navActions } from '../actions';
import {
    Container, Row, Col,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';

class EditButton extends React.Component {

    handleSelect() {
        this.props.selectedComp(this.props.parentId);
        this.props.setToolsView(this.props.compName);
    }

    handleDelete() {
        this.props.deleteComp(this.props.parentId)
    }

    render() {
        return (
            <Container>
                <UncontrolledDropdown >
                    <DropdownToggle >
                        \
                    </DropdownToggle>
                    <DropdownMenu style={{textAlign: "center"}}>
                        <DropdownItem header style={{borderBottom: "3px solid ghostwhite"}}>{this.props.compName}</DropdownItem>
                        <DropdownItem onClick={() => this.handleSelect()}>edit</DropdownItem>
                        {(this.props.parentId !== ROOT_COMP) && (<DropdownItem onClick={() => this.handleDelete()}>delete</DropdownItem>)}
                    </DropdownMenu>
                </UncontrolledDropdown>
            </Container>
        );
    }
}


EditButton.propTypes = {
    insertPlaceholder: PropTypes.func.isRequired,
    setToolsView: PropTypes.func.isRequired,
    selectedComp: PropTypes.func.isRequired,
    parentId: PropTypes.string.isRequired,
    childId: PropTypes.string,
    compName: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
    contentState: state.contentState,
    toolsOpen: state.navState.toolsOpen
})

export default connect(mapStateToProps, {
    insertPlaceholder: contActions.insertPlaceholder,
    deleteComp: contActions.deleteComp,
    selectedComp: contActions.selectedComp,
    setToolsView: navActions.setToolsView
})(EditButton);
