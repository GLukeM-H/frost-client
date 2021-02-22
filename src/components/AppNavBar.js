import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { navActions, contActions } from '../actions';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { 
    Collapse,
    Navbar, Nav, NavbarToggler, NavbarBrand, NavItem, NavLink,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Container
} from 'reactstrap';

/*~~~~~ Styles ~~~~~*/
const useStyles = makeStyles(theme => ({
    appNav: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      outline: "0px !important"
    },
    title: {
      flexGrow: 1,
      textAlign: "start"
    },
    userMenu: {
        color: "white",
        outline: "0px !important",
        textTransform: "capitalize",
        fontSize: "1rem"
    },
    userPopper: {
        backgroundColor: "ghostwhite"
    }
}));

/*~~~~~ Components ~~~~~*/
const UserMenu = connect(null, {
    toggleEditing: contActions.toggleEditing,
    toggleTools: navActions.toggleTools
})((props) => {
    const style = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    
    const handleToggle = () => {
      setOpen(open => !open);
    };
  
    const handleClose = (event) => {
        if (!(anchorRef.current && anchorRef.current.contains(event.target))) {
            setOpen(false);
        }
    };

    const handleEditing = () => {
        props.toggleTools();
        props.toggleEditing();
        setOpen(false);
    }
  
    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
      if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
      }
      prevOpen.current = open;
    }, [open]);
  
    return (
        <React.Fragment>
            <Button
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                className={style.userMenu}
            >
                <AccountCircleIcon/>
                Luke
            </Button>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} placement="bottom-end" transition disablePortal>
                {({ TransitionProps }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: 'center top' }}
                    >
                        <Paper className={style.userPopper}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id="menu-list-grow">
                                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                                    <MenuItem onClick={handleClose}>My account</MenuItem>
                                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                                    <MenuItem onClick={handleEditing}>Edit Page</MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </React.Fragment>
    );
})

function AppNavBar(props) {
    const style = useStyles();

    const toggleNav = () => {
        props.toggleNav();
    }

    return (
        <div className={style.appNav}>
            <AppBar>
                <Toolbar>
                    <IconButton className={style.menuButton} edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={style.title}>
                        Spades
                    </Typography>
                    <UserMenu />
                </Toolbar>
            </AppBar>
        </div>
    );
}

// class AppNavBar extends React.Component {
//     constructor(props) {
//         super(props);
//         this.style = useStyles();
//     }

//     toggleNav() {
//         this.props.toggleNav();
//     }

//     handleEditing() {
//         this.props.toggleTools();
//         this.props.toggleEditing();
//     }

//     render() {
//         let dropdownInner = [
//             <DropdownToggle key={1} caret>Luke</DropdownToggle>,
//             <DropdownMenu key={2}>
//                 <DropdownItem header>Editing</DropdownItem>
//                 <DropdownItem onClick={() => this.handleEditing()}>Edit Page</DropdownItem>
//             </DropdownMenu>
//         ];
//         return (
//             <React.Fragment className={this.style.appNav}>
//                 <AppBar position='static'>
//                     <Toolbar>
//                         <IconButton className={this.style.menuButton} edge="start" color="inherit" aria-label="menu">
//                             <MenuIcon />
//                         </IconButton>
//                         <Typography variant="h6" className={this.style.title}>
//                             Spades
//                         </Typography>
//                         <Button color="inherit">Luke</Button>
//                     </Toolbar>
//                     {/* <Container fluid>
//                         <NavbarBrand href="/">
//                             Spades
//                         </NavbarBrand>
//                         <NavbarToggler onClick={() => this.toggleNav()} />
//                         <UncontrolledDropdown nav className="d-block d-sm-none">
//                             {dropdownInner}
//                         </UncontrolledDropdown>
//                         <Collapse isOpen={this.props.navIsOpen} navbar>
//                             <Nav navbar>
//                                 <NavItem>
//                                     <NavLink href="/">
//                                         Home
//                                     </NavLink>
//                                 </NavItem>
//                                 <NavItem>
//                                     <NavLink href="/">
//                                         Word
//                                     </NavLink>
//                                 </NavItem>
//                             </Nav>
//                         </Collapse>
//                         <UncontrolledDropdown nav className="d-none d-sm-block">
//                             {dropdownInner}
//                         </UncontrolledDropdown>
//                     </Container> */}
//                 </AppBar>
//             </React.Fragment>
//         );
//     }
// }

// class AppNavBar extends React.Component {

//     toggleNav() {
//         this.props.toggleNav();
//     }

//     handleEditing() {
//         this.props.toggleTools();
//         this.props.toggleEditing();
//     }

//     render() {
//         let dropdownInner = [
//             <DropdownToggle key={1} caret>Luke</DropdownToggle>,
//             <DropdownMenu key={2}>
//                 <DropdownItem header>Editing</DropdownItem>
//                 <DropdownItem onClick={() => this.handleEditing()}>Edit Page</DropdownItem>
//             </DropdownMenu>
//         ];
//         return (
//             <React.Fragment>
//                 <Navbar color="dark" dark expand="sm">
//                     <Container fluid>
//                         <NavbarBrand href="/">
//                             Spades
//                         </NavbarBrand>
//                         <NavbarToggler onClick={() => this.toggleNav()} />
//                         <UncontrolledDropdown nav className="d-block d-sm-none">
//                             {dropdownInner}
//                         </UncontrolledDropdown>
//                         <Collapse isOpen={this.props.navIsOpen} navbar>
//                             <Nav navbar>
//                                 <NavItem>
//                                     <NavLink href="/">
//                                         Home
//                                     </NavLink>
//                                 </NavItem>
//                                 <NavItem>
//                                     <NavLink href="/">
//                                         Word
//                                     </NavLink>
//                                 </NavItem>
//                             </Nav>
//                         </Collapse>
//                         <UncontrolledDropdown nav className="d-none d-sm-block">
//                             {dropdownInner}
//                         </UncontrolledDropdown>
//                     </Container>
//                 </Navbar>
//             </React.Fragment>
//         );
//     }
// }

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