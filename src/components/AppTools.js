import React from 'react';
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
                <Navbar className="AppTools rounded shadow" color="light" light>
                    <Container>
                        Word
                    </Container>
                </Navbar>
            </div>
        )
    }
}

export default AppTools;