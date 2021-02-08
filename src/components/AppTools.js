import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { 
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    NavbarText,
    Nav,
    NavItem,
    NavLink,
    Container,
    Row,
    Col
} from 'reactstrap';

class AppTools extends React.Component {
 
    render(){
        return (
            <div>
                <CSSTransition 
                in={this.props.toolsOpen} 
                timeout={200}
                classNames="tools"
                unmountOnExit={true}>        
                    <Navbar className="tools rounded" color="light" light>
                        <Container>
                            <NavbarText className="mb-3 border-bottom">
                                Tools
                            </NavbarText>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink onClick={() => alert('hey')}>
                                        Word
                                    </NavLink>
                                </NavItem>
                            </Nav>
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
