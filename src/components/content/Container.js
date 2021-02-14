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
            <Container>
                {this.props.editing && <EditButton parentId={this.props.id} childId={null}/>}
                {this.props.children}                
            </Container>);
    }
}


ContainerComp.propTypes = {
    id: PropTypes.string.isRequired
}

const mapStateToProps = (state, props) => ({
    children: state.contentState.contentComp[props.id].childIds.map(id => state.contentState.contentComp[id].comp),
    parentId: state.contentState.contentComp[props.id].parentId,
    editing: state.contentState.editing
})


export default connect(mapStateToProps, {})(ContainerComp);
