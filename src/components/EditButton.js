import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ROOT_COMP } from '../data/contReducerConstants';
import { contActions, navActions } from '../actions';
import { Button, Container, Row, Col } from 'reactstrap';

class EditButton extends React.Component {

    handleInsert() {
        this.props.insertPlaceholder(this.props.parentId, this.props.childId);
        this.props.setToolsView(this.props.compName);
    }

    handleDelete() {
        this.props.deleteComp(this.props.parentId)
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        {this.props.compName}
                    </Col>
                    <Col>
                        <Button onClick={() => this.handleInsert()}>
                            +
                        </Button>
                    </Col>
                    {this.props.parentId !== ROOT_COMP && (
                    <Col>
                        <Button onClick={() => this.handleDelete()}>
                            x
                        </Button>
                    </Col>)}
                </Row>
            </Container>
        );
    }
}


EditButton.propTypes = {
    insertPlaceholder: PropTypes.func.isRequired,
    setToolsView: PropTypes.func.isRequired,
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
    setToolsView: navActions.setToolsView
})(EditButton);
