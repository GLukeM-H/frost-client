import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EditButton from '../EditButton';
import { Col } from 'reactstrap';
import * as comp from './';

class ColComp extends React.Component {

    style() {
        var style={};
        if (this.props.editing){
            style = {
                ...style,
                border: "4px dashed ghostwhite",
                borderRadius: "15px"
            }
        }
        if (this.props.selected == this.props.id) {
            style = {
                ...style,
                border: "4px dashed lightblue"
            }
        }

        return style;
    }
    
    render() {
        return (
            <Col style={this.style()}>
                {this.props.editing && <EditButton compName="Col" parentId={this.props.id} childId={null} />}
                {this.props.children.map(child => React.createElement(comp[child.comp], child.props, child.inner))}                
            </Col>
        );
    }
}


ColComp.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.array.isRequired,
    parentId: PropTypes.string,
    editing: PropTypes.bool.isRequired,
    selected: PropTypes.string
}

const mapStateToProps = (state, ownProps) => ({
    children: state.contentState.contentComp[ownProps.id].childIds.map(id => state.contentState.contentComp[id]),
    parentId: state.contentState.contentComp[ownProps.id].parentId,
    editing: state.contentState.editing,
    selected: state.contentState.selected
});

export default connect(mapStateToProps, {})(ColComp);
