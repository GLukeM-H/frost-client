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
                {(this.props.contentState.contentComp['rootComp'] && this.props.contentState.contentComp['rootComp'].comp) ||
                this.props.contentState.contentComp}
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