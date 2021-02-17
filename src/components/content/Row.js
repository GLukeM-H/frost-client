import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row } from 'reactstrap';
import EditButton from '../EditButton';
import * as comp from './';

class RowComp extends React.Component {
    
    render() {
        return (
        <Row>
            {this.props.editing && <EditButton compName="Row" parentId={this.props.id} childId={null} />}
            {this.props.children.map(child => React.createElement(comp[child.comp], child.props, child.inner))}                
        </Row>);
    }
}


RowComp.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.array.isRequired,
    parentId: PropTypes.string,
    editing: PropTypes.bool.isRequired
}

const mapStateToProps = (state, ownProps) => ({
    children: state.contentState.contentComp[ownProps.id].childIds.map(id => state.contentState.contentComp[id]),
    parentId: state.contentState.contentComp[ownProps.id].parentId,
    editing: state.contentState.editing
});

export default connect(mapStateToProps, {})(RowComp);
