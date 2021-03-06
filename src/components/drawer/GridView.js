import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { contActions } from '../../actions';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import Slider from '@material-ui/core/Slider';
import { setSelected } from '../../actions/contentActions';


const useStyles = makeStyles(theme => ({
    drawer: {
        backgroundColor: "ghostwhite",
        flexShrink: 0,
        paddingRight: "10px",
        paddingLeft: "10px"
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    },
    drawerPaper: {
        backdropFilter: "blur(20px)",
        backgroundColor: "transparent",
        width: "300px"
    },
    collapse: {
        backgroundColor: theme.palette.neutral.main,
        padding: theme.spacing(2)
    },
    textArea: {
        width: "100%"
    },
    sizeCollapse: {
        paddingTop: theme.spacing(3),
        paddingRight: theme.spacing(3),
        paddingLeft: theme.spacing(3)
    },
    link: {
        cursor: "pointer"
    }
}));



function GridView(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [size, setSize] = React.useState(4);
  
    const handleSizeChange = (event) => {
      setSize(Number(event.target.value));
    };

    
    return (
        <>
            <List>
                <ListItem>
                    <Breadcrumbs>
                        {props.breadcrumbs.map(([id, comp], i) => (
                            i + 1 === props.breadcrumbs.length ? (
                                <Typography key={i} color="textPrimary">{comp}</Typography>
                            ) : (
                                <Link key={i} className={classes.link} onClick={() => props.setSelected(id)}>{comp}</Link>
                            )
                        ))}
                    </Breadcrumbs>
                </ListItem>    
            </List>
            <Divider />
            <List dense>
                <ListItem button onClick={() => props.insertComp('Grid', { isContainer: true })}>
                    <ListItemText primary="Add Container" />
                </ListItem>
                <ListItem button onClick={() => props.insertComp('Paper', {})}>
                    <ListItemText primary="Add Paper" />
                </ListItem>
                <ListItem button onClick={() => setOpen(!open)}>
                    <ListItemText primary="Change Size" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open}>
                    <Paper
                        className={clsx(classes.collapse, classes.sizeCollapse)}
                        elevation={0}
                        square
                    >
                        <Slider
                            value={size}
                            onChange={(e,v) => setSize(v)}
                            defaultValue={4}
                            step={1}
                            marks
                            min={1}
                            max={12}
                            valueLabelDisplay="auto"
                        />
                    </Paper>
                </Collapse>
            </List>
        </>
    );
}


GridView.propTypes = {
    insertComp: PropTypes.func.isRequired,
    setSelected: PropTypes.func.isRequired,
    setInner: PropTypes.func.isRequired,
    setProps: PropTypes.func.isRequired,
    breadcrumbs: PropTypes.array.isRequired
}

export default connect(null, {
    setSelected: contActions.setSelected,
    setProps: contActions.setProps,
    setInner: contActions.setInner,
    insertComp: contActions.insertComp
})(GridView);