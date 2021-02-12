import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { contActions } from '../actions';
import { 
    Container, 
    Button 
} from 'reactstrap';

class EmptyBlock extends React.Component {

    handleClick() {
        this.props.insertAfter('root');
    }

    render() {
        return (
            <Container className="border rounded" style={{width: "100%", height: "100px", backgroundColor: "ghostwhite"}}>
                <Button onClick={() => this.handleClick()}>
                    +
                </Button>
            </Container>
        )
    }
}


EmptyBlock.propTypes = {
    toolsOpen: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    contentState: state.contentState,
    toolsOpen: state.navState.toolsOpen
})

export default connect(mapStateToProps, { insertAfter: contActions.insertAfter })(EmptyBlock);
