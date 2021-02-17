import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { navActions, contActions } from '../actions';
import { 
    Collapse,
    Navbar, Nav, NavbarToggler, NavbarBrand, NavItem, NavLink,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Container
} from 'reactstrap';

class AppNavBar extends React.Component {

    toggleNav() {
        this.props.toggleNav();
    }

    handleEditing() {
        this.props.toggleTools();
        this.props.toggleEditing();
    }

    render() {
        let dropdownInner = [
            <DropdownToggle key={1}>:)</DropdownToggle>,
            <DropdownMenu key={2}>
                <DropdownItem header>Hi, Luke</DropdownItem>
                <DropdownItem onClick={() => this.handleEditing()}>Edit Page</DropdownItem>
            </DropdownMenu>
        ];
        return (
            <div>
                <Navbar color="dark" dark expand="sm">
                    <Container fluid>
                        <NavbarBrand href="/">
                            Spades
                        </NavbarBrand>
                        <NavbarToggler onClick={() => this.toggleNav()} />
                        <UncontrolledDropdown nav className="d-block d-sm-none">
                            {dropdownInner}
                        </UncontrolledDropdown>
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
                        <UncontrolledDropdown nav className="d-none d-sm-block">
                            {dropdownInner}
                        </UncontrolledDropdown>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

AppNavBar.propTypes = {
    toggleNav: PropTypes.func.isRequired,
    toggleTools: PropTypes.func.isRequired,
    toggleEditing: PropTypes.func.isRequired,
    navIsOpen: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    navIsOpen: state.navState.navIsOpen
})


 export default connect(mapStateToProps, {
     toggleNav: navActions.toggleNav,
     toggleTools: navActions.toggleTools,
     toggleEditing: contActions.toggleEditing
})(AppNavBar);