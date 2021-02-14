import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { 
    Container, 
    Button 
} from 'reactstrap';

class EmptyBlock extends React.Component {

    render() {
        return (
            <Container className="border rounded" style={{width: "100%", height: "100px", backgroundColor: "ghostwhite"}}>
                <span>~~~~~ Add component here ~~~~~</span>
            </Container>
        )
    }
}


EmptyBlock.propTypes = {
    id: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
    contentState: state.contentState,
    toolsOpen: state.navState.toolsOpen
})

export default connect(mapStateToProps, {})(EmptyBlock);
