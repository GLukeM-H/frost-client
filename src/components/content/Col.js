import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'reactstrap';

class ColComp extends React.Component {
    
    render() {
        return (<Col>Here's a column I guess! Wow!</Col>);
    }
}


ColComp.propTypes = {
    id: PropTypes.string.isRequired,
}

export default ColComp;