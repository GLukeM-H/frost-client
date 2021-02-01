import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { navActions } from '../actions';
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
import navStyle from '../styles/Nav.module.css';

class AppNavBar extends React.Component {
    constructor(props) {
        super(props);
    }

    toggle() {
        this.props.toggleNav();
    }

    openTools() {
        alert("this should open the tools!");
    }

    render() {
        return (
            <div>
                <Navbar color="dark" dark expand="sm" className={navStyle.AppNavBar}>
                    <Container fluid>
                        <NavbarBrand href="/">
                            Spades
                        </NavbarBrand>
                        <NavbarToggler onClick={() => this.toggle()} />
                        <NavbarToggler className="d-block d-sm-none" onClick={() => this.openTools()} />
                        <Collapse isOpen={this.props.navIsOpen} navbar>
                            <Nav className="mr-auto" navbar>
                                <NavItem>
                                    <NavLink href="/">
                                        Home
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/">
                                        Word
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                        <NavbarToggler className="d-none d-sm-block" onClick={() => this.openTools()} />
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


 export default connect(mapStateToProps, { toggleNav: navActions.toggleNav })(AppNavBar);