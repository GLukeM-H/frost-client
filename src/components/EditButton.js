import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { contActions } from '../actions';
import { Button } from 'reactstrap';

class EditButton extends React.Component {

    handleClick() {
        this.props.insertComp(this.props.parentId, this.props.childId, 'EmptyBlock');
    }

    render() {
        return (
            <Button onClick={() => this.handleClick()}>
                +
            </Button>
        );
    }
}


EditButton.propTypes = {
    insertComp: PropTypes.func.isRequired,
    parentId: PropTypes.string.isRequired,
    childId: PropTypes.string
}

const mapStateToProps = (state) => ({
    contentState: state.contentState,
    toolsOpen: state.navState.toolsOpen
})

export default connect(mapStateToProps, { insertComp: contActions.insertComp })(EditButton);
