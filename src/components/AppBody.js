import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { contActions } from '../actions';

class AppBody extends React.Component {
    
    componentDidMount() {
        this.props.getBody();
    }
    
    render() {
        return (
            <div>
                {[this.props.contentTree.contentComp]}
            </div>
        );
    }
}


AppBody.propTypes = {
    getBody: PropTypes.func.isRequired,
    contentTree: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    contentTree: state.contentTree
})

export default connect(mapStateToProps, { getBody: contActions.getBody })(AppBody);