import React form 'react';
import { connect } from 'react-redux';
import { textContent } from '../actions';

class TextBlock extends React.Component {
    render() {
        return (<p>{this.props.text}</p>)
    }
}

const mapStateToProps = state => ({
    text: state.text
})

export default connect(mapStateToProps)(TextBlock);

