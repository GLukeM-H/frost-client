import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { contActions } from '../actions';
import { ROOT_COMP } from '../data/contReducerConstants';
import * as comp from './content';

class AppBody extends React.Component {
    
    componentDidMount() {
        this.props.getBody();
    }
    
    render() {
        return (
            <div>
                {React.createElement((comp[this.props.rootComp] || this.props.rootComp), this.props.rootProps, this.props.rootInner)}
            </div>
        );
    }
}


AppBody.propTypes = {
    getBody: PropTypes.func.isRequired,
    rootComp: PropTypes.string.isRequired,
    rootProps: PropTypes.object.isRequired,
    rootInner: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
    rootComp: state.contentState.contentComp[ROOT_COMP].comp,
    rootProps: state.contentState.contentComp[ROOT_COMP].props,
    rootInner: state.contentState.contentComp[ROOT_COMP].inner
})

export default connect(mapStateToProps, { getBody: contActions.getBody })(AppBody);