import React from 'react';
import AppTools from './AppTools';
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
         this.setState({
             isOpen: !this.state.isOpen
         });
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
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="mr-auto" navbar>
                                <NavItem>
                                    <NavLink href="https://google.com">
                                        Google
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/">
                                        <AppTools />
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

 export default AppNavBar;