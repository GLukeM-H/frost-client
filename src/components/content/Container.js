import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import EmptyBlock from '../EmptyBlock';
import { createComp } from '../../helpers/createComp';

class ContainerComp extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
    }
    
    render() {
        return (
            <Container>
                {this.props.editing && <EmptyBlock />}
                {this.props.inner.map(childState => createComp[childState.type](childState.id))}
            </Container>);
    }
}


ContainerComp.propTypes = {
    id: PropTypes.string.isRequired,
}

const mapStateToProps = (state, props) => ({
    inner: state.contentState.contentComp[props.id].inner.map(id => state.contentState.contentComp[id]),
    editing: state.contentState.editing
})


export default connect(mapStateToProps, {})(ContainerComp);
