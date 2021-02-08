import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'reactstrap';

class RowComp extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
    }
    
    render() {
        return (<Row>Here's a row I guess! Wow!</Row>);
    }
}


RowComp.propTypes = {
    id: PropTypes.string.isRequired,
}

export default RowComp;