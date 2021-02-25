import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row } from 'reactstrap';
import EditButton from '../EditButton';
import * as comp from './';
import { contActions } from '../../actions';

class RowComp extends React.Component {

    style() {
        var style={padding: "10px", margin: "0"};
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
                outline: "2px dashed lightblue"
            }
        }

        return style;
    }

    componentDidMount() {
        if (!this.props.children.length) {
            this.props.insertComp('Col', this.props.id, null);
        }
    }

    
    render() {
        return (
            <Row style={this.style()}>
                {this.props.editing && <EditButton compName="Row" parentId={this.props.id} childId={null} />}
                {this.props.children.map(child => React.createElement(comp[child.comp], child.props, child.inner))}                
            </Row>);
    }
}


RowComp.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.array.isRequired,
    parentId: PropTypes.string,
    editing: PropTypes.bool.isRequired,
    selected: PropTypes.string,
    insertComp: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => ({
    children: state.contentState.contentComp[ownProps.id].childIds.map(id => state.contentState.contentComp[id]),
    parentId: state.contentState.contentComp[ownProps.id].parentId,
    editing: state.contentState.editing,
    selected: state.contentState.selected
});

export default connect(mapStateToProps, { insertComp: contActions.insertComp })(RowComp);
