import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppTools from './AppTools';
import { navActions } from '../actions';
import { 
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    Row,
    Col
 } from 'reactstrap';


 class AppNavBar extends React.Component {
     constructor(props) {
         super(props);

         this.state = {
             isOpen: false
         }

     }

     toggle() {
         this.props.toggleNav();
     }

     render() {
        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container fluid>
                        <NavbarBrand href="/">
                            Spades
                        </NavbarBrand>
                        <NavbarToggler onClick={() => this.toggle()} />
                        <NavbarToggler className="d-block d-sm-none" onClick={() => alert("clicked")} />
                        <Collapse isOpen={this.props.navIsOpen} navbar>
                            <Nav className="mr-auto" navbar>
                                <NavItem>
                                    <NavLink href="https://google.com">
                                        Google
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/">
                                        Word
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                        <NavbarToggler className="d-none d-sm-block" onClick={() => alert("clicked")} />
                    </Container>
                </Navbar>
            </div>
        );
     }
 }

AppNavBar.propTypes = {
    toggleNav: PropTypes.func.isRequired,
    navIsOpen: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    navIsOpen: state.navState.navIsOpen
})


 export default connect(mapStateToProps, { toggleNav: navActions.togglenav })(AppNavBar);