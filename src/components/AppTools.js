import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { navActions, contActions } from '../actions';
import { AppToolsData } from '../data/AppToolsData';
import { CSSTransition } from 'react-transition-group';
import { 
    Collapse,
    Navbar, NavbarText, Nav, NavItem, NavLink,
    Container, Row, Col,
    Button
} from 'reactstrap';

class AppTools extends React.Component {
 
    handleClose() {
        this.props.toggleTools();
        this.props.toggleEditing();
    }
    
    handleAddComp(compName) {
        this.props.addComp(compName);
    }
    
    render(){
        return (
            <div>
                <CSSTransition 
                in={this.props.toolsOpen} 
                timeout={200}
                classNames="tools"
                unmountOnExit={true}>        
                    <Navbar className="tools rounded" color="light" light>
                        <Container className="pr-0 pl-0">
                            <Button
                                close 
                                className="position-absolute"
                                style={{alignSelf: "end"}}
                                onClick={() => this.handleClose()} />
                            <NavbarText className="mb-3 border-bottom">
                                Components
                            </NavbarText>
                            <Nav navbar>
                                {AppToolsData.map(item => (
                                    <NavItem>
                                        <NavLink onClick={() => this.handleAddComp(item.compName)}>
                                            {item.text}
                                        </NavLink>
                                    </NavItem>
                                ))}
                            </Nav>
                        </Container>
                    </Navbar>
                </CSSTransition>
            </div>
        )
    }
}

AppTools.propTypes = {
    toolsOpen: PropTypes.bool.isRequired,
    toggleTools: PropTypes.func.isRequired,
    toggleEditing: PropTypes.func.isRequired,
    addComp: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    toolsOpen: state.navState.toolsOpen
})


export default connect(mapStateToProps, {
    toggleTools: navActions.toggleTools,
    toggleEditing: contActions.toggleEditing,
    addComp: contActions.addComp
})(AppTools);
