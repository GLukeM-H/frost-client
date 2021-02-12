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
                {this.props.contentState.newComp && this.props.contentState.contentComp[this.props.contentState.newComp]}
                {this.props.contentState.contentComp.root && this.props.contentState.contentComp.root.comp}
            </div>
        );
    }
}


AppBody.propTypes = {
    getBody: PropTypes.func.isRequired,
    contentState: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    contentState: state.contentState
})

export default connect(mapStateToProps, { getBody: contActions.getBody })(AppBody);