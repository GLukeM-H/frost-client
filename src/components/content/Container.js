import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import EmptyBlock from '../EmptyBlock';
import EditButton from '../EditButton';
// import { createComp } from '../../helpers/createComp';

class ContainerComp extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
    }
    
    render() {
        return (
            <Container style={{height: "50px", backgroundColor: "ghostwhite"}}>
                {this.props.editing && <EditButton compName="Container" parentId={this.props.id} childId={null}/>}
                {this.props.children}                
            </Container>);
    }
}


ContainerComp.propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.object.isRequired,
    parentId: PropTypes.object,
    editing: PropTypes.bool.isRequired
}

const mapStateToProps = (state, ownProps) => ({
    children: state.contentState.contentComp[ownProps.id].childIds.map(id => state.contentState.contentComp[id].comp),
    parentId: state.contentState.contentComp[ownProps.id].parentId,
    editing: state.contentState.editing
})


export default connect(mapStateToProps, {})(ContainerComp);
