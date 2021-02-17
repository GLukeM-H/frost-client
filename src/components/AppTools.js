import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { navActions, contActions } from '../actions';
import { AppToolsData } from '../data/AppToolsData';
import { CSSTransition } from 'react-transition-group';
import { 
    Collapse,
    Navbar, Nav, NavItem, NavLink, NavbarText,
    Container, Row, Col,
    Button,
    Breadcrumb, BreadcrumbItem
} from 'reactstrap';

class AppTools extends React.Component {
 
    handleClose() {
        this.props.toggleTools();
        this.props.toggleEditing();
    }
    
    handleClick({ onClick, input }) {
        switch (onClick) {
            case 'replacePlaceholder':
                this.props.replacePlaceholder(input, this.props.placeholderId);
                break;
            default:
                console.log(`No case for ${onClick}`);
        }
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
                            <Breadcrumb>
                                <BreadcrumbItem active>
                                    Components
                                </BreadcrumbItem>
                            </Breadcrumb>
                            <Nav navbar>
                                {AppToolsData['Container'].map((item, index) => (
                                    <NavItem key={index}>
                                        <NavLink onClick={() => this.handleClick(item)}>
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
    placeholderId: PropTypes.string,
    toggleTools: PropTypes.func.isRequired,
    toggleEditing: PropTypes.func.isRequired,
    replacePlaceholder: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    toolsOpen: state.navState.toolsOpen,
    placeholderId: state.contentState.placeholderId
})


export default connect(mapStateToProps, {
    toggleTools: navActions.toggleTools,
    toggleEditing: contActions.toggleEditing,
    replacePlaceholder: contActions.replacePlaceholder,
})(AppTools);
