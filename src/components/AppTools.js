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
    Breadcrumb, BreadcrumbItem, NavbarBrand
} from 'reactstrap';

class AppTools extends React.Component {

    view = {
        Components: [(
            <NavItem key={1}>
                <Button color="primary" onClick={() => this.handleClick('Container')}>
                    + Add Container
                </Button>
            </NavItem>),
            <NavItem key={2}>
                <NavbarText>adds a container to the dom</NavbarText>
            </NavItem>
        ],
        Container: [(
            <NavItem key={1}>
                <Button color="primary" onClick={() => this.handleClick('Row')}>
                    + Add Row
                </Button>
            </NavItem>
        )],
        Row: [(
            <NavItem key={1}>
                <Button color="primary" onClick={() => this.handleClick('Col')}>
                    + Add Column
                </Button>
            </NavItem>
        )],
        Col: [(
            <NavItem key={1}>
                <Button color="primary" onClick={() => this.handleClick('Container')}>
                    + Add Container
                </Button>
            </NavItem>
        )]
    }
 
    handleClose() {
        this.props.toggleTools();
        this.props.toggleEditing();
    }
    
    handleClick(compName) {
        this.props.insertComp(compName, this.props.selected);
    }
    
    render(){
        return (
            <div>
                <CSSTransition 
                    in={this.props.toolsOpen} 
                    timeout={200}
                    classNames="tools"
                    unmountOnExit={true}
                >        
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
                                {this.view[this.props.toolsView]}
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
    toolsView: PropTypes.string.isRequired,
    toggleTools: PropTypes.func.isRequired,
    toggleEditing: PropTypes.func.isRequired,
    insertComp: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    toolsOpen: state.navState.toolsOpen,
    toolsView: state.navState.toolsView,
    selected: state.contentState.selected
})


export default connect(mapStateToProps, {
    toggleTools: navActions.toggleTools,
    toggleEditing: contActions.toggleEditing,
    insertComp: contActions.insertComp,
})(AppTools);
