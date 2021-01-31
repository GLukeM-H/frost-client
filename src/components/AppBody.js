import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from '../actions';

class AppBody extends React.Component {
    
    componentDidMount() {
        this.props.getBody();
    }
    
    render() {
        return [this.props.contentTree.contentComp];
    }
}


AppBody.propTypes = {
    getBody: PropTypes.func.isRequired,
    contentTree: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    contentTree: state.contentTree
})

export default connect(mapStateToProps, { getBody: actions.getBody })(AppBody);