import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { 
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';

class AppTools extends React.Component {
 
    render(){
        return (
            <div>
                <CSSTransition 
                in={this.props.toolsOpen} 
                timeout={500}
                classNames="tools"
                unmountOnExit={true}>        
                    <Navbar className="AppTools rounded" color="light" light>
                        <Container>
                            Word
                        </Container>
                    </Navbar>
                </CSSTransition>
            </div>
        )
    }
}

AppTools.propTypes = {
    toolsOpen: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    toolsOpen: state.navState.toolsOpen
})


export default connect(mapStateToProps, {})(AppTools);
