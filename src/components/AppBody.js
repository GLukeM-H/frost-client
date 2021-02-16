import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { contActions } from '../actions';
import { ROOT_COMP } from '../data/contReducerConstants';

class AppBody extends React.Component {
    
    componentDidMount() {
        this.props.getBody();
    }
    
    render() {
        return (
            <div>
                {this.props.rootComponent}
            </div>
        );
    }
}


AppBody.propTypes = {
    getBody: PropTypes.func.isRequired,
    rootComponent: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    rootComponent: state.contentState.contentComp[ROOT_COMP].comp
})

export default connect(mapStateToProps, { getBody: contActions.getBody })(AppBody);