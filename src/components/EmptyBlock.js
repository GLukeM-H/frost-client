import React from 'react';
import { connect } from 'react-redux';
import { contActions } from '../actions';
import { 
    Container, 
    Button 
} from 'reactstrap';

class EmptyBlock extends React.Component {

    handleClick() {
        this.props.addComp('Row');
    }

    render() {
        return (
            <Container>
                <Button onClick={() => this.handleClick()}>
                    +
                </Button>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    contentState: state.contentState
})

export default connect(mapStateToProps, { addComp: contActions.addComp })(EmptyBlock);
