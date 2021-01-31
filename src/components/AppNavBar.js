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
    Container
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
                    <Container>
                        <NavbarBrand href="/">
                            Spades
                        </NavbarBrand>
                        <NavbarToggler onClick={() => this.toggle()} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink href="https://google.com">
                                        Google
                                    </NavLink>
                                </NavItem>
                                <AppTools />
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        );
     }
 }

 export default AppNavBar;