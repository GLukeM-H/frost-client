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

class AppNavBar extends React.Component {
    constructor(props) {
        super(props);
    }

    toggle() {
        this.props.toggleNav();
    }

    openTools() {
        this.props.toggleTools();
    }

    render() {
        return (
            <div>
                <Navbar className="AppNavBar" color="dark" dark expand="sm">
                    <Container fluid>
                        <NavbarBrand href="/">
                            Spades
                        </NavbarBrand>
                        <NavbarToggler onClick={() => this.toggle()} />
                        <NavbarToggler className="d-block d-sm-none" onClick={() => this.openTools()} />
                        <Collapse isOpen={this.props.navIsOpen} navbar>
                            <Nav navbar>
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
    toggleTools: PropTypes.func.isRequired,
    navIsOpen: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    navIsOpen: state.navState.navIsOpen
})


 export default connect(mapStateToProps, {
     toggleNav: navActions.toggleNav,
     toggleTools: navActions.toggleTools 
})(AppNavBar);