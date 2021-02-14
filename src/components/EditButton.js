import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { contActions } from '../actions';
import { Button } from 'reactstrap';

class EditButton extends React.Component {

    handleClick() {
        this.props.insertAfter({ parentId: this.props.parentId, childId: this.props.childId });
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
    toolsOpen: PropTypes.bool.isRequired,
    parentId: PropTypes.string.isRequired,
    childId: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
    contentState: state.contentState,
    toolsOpen: state.navState.toolsOpen
})

export default connect(mapStateToProps, { insertAfter: contActions.insertAfter })(EditButton);
