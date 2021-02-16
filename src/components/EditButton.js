import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { contActions } from '../actions';
import { Button, Container, Row, Col } from 'reactstrap';

class EditButton extends React.Component {

    handleClick() {
        this.props.insertPlaceholder(this.props.parentId, this.props.childId);
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        {this.props.compName}
                    </Col>
                    <Col>
                        <Button onClick={() => this.handleClick()}>
                            +
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}


EditButton.propTypes = {
    insertPlaceholder: PropTypes.func.isRequired,
    parentId: PropTypes.string.isRequired,
    childId: PropTypes.string,
    compName: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
    contentState: state.contentState,
    toolsOpen: state.navState.toolsOpen
})

export default connect(mapStateToProps, { insertPlaceholder: contActions.insertPlaceholder })(EditButton);
