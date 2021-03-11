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
import { setProps } from '../../actions/contentActions';


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
    const [sizeOpen, setSizeOpen] = React.useState(false);
    const [size, setSize] = React.useState(4);
    const insertComp = (compName, compProps) => props.insertComp(compName, props.selected, null, compProps);
    const setProps = compProps => props.setProps(props.selected, compProps);
    
    React.useEffect(() => {
        if (!(props.stateProps.container || props.hasChildren)) {
            setProps({container: true})
        }
    }, [props.hasChildren])

    const handleSizeChange = (event) => {
      setSize(Number(event.target.value));
    };

    const handleAddItem = () => {
        insertComp('Grid', {item: true, container: true, xs: 4});
    }

    const handleAddComp = (compName, compProps={}) => {
        insertComp(compName, compProps);
        setProps({container: false});
    }
    
    //container item haschildren
    /* add grid item
    change size */

    //container haschildren
    /*add grid item */

    //item haschildren
    /*change size */

    //container item nochildren
    /*add grid item
    change size
    add components */

    //container nochildren
    /*add grid item */

    
    return (
        <>
            <List>
                <ListItem>
                    <Breadcrumbs>
                        {props.breadcrumbs.map(([id, comp]) => (
                            id === props.selected ? (
                                <Typography key={id} color="textPrimary" variant="h6">{comp}</Typography>
                            ) : (
                                <Link
                                    key={id}
                                    className={classes.link}
                                    onClick={() => props.setSelected(id)}
                                >
                                    {comp}
                                </Link>
                            )
                        ))}
                    </Breadcrumbs>
                </ListItem>    
            </List>
            <Divider />
            <List dense>
                {props.stateProps.container &&
                    <>
                        <ListItem key={0} button onClick={handleAddItem}>
                            <ListItemText primary="Add Grid Item" />
                        </ListItem>
                    </>
                }
                {props.stateProps.item &&
                    <>
                        <ListItem button onClick={() => setSizeOpen(prevState => (!prevState))}>
                        <ListItemText primary="Change Size" />
                            {sizeOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={sizeOpen}>
                            <Paper
                                className={clsx(classes.collapse, classes.sizeCollapse)}
                                elevation={0}
                                square
                            >
                                <Slider
                                    value={props.stateProps.xs}
                                    onChange={(e,xs) => setProps({xs})}
                                    defaultValue={4}
                                    step={1}
                                    marks
                                    min={1}
                                    max={12}
                                    valueLabelDisplay="auto"
                                />
                            </Paper>
                        </Collapse>
                    </>
                }
                {props.stateProps.item && !props.hasChildren &&
                    <>
                        <ListItem button onClick={() => handleAddComp('Paper')}>
                            <ListItemText primary="Add Paper" />
                        </ListItem>
                    </>
                }
            </List>
        </>
    );
}


GridView.propTypes = {
    insertComp: PropTypes.func.isRequired,
    setSelected: PropTypes.func.isRequired,
    setInner: PropTypes.func.isRequired,
    setProps: PropTypes.func.isRequired,
    breadcrumbs: PropTypes.array.isRequired,
    stateProps: PropTypes.object.isRequired,
    hasChildren: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    selected: state.contentState.selected,
    stateProps: state.contentState.contentComp[state.contentState.selected].props,
    hasChildren: Boolean(state.contentState.contentComp[state.contentState.selected].childIds.length)
})

export default connect(mapStateToProps, {
    setSelected: contActions.setSelected,
    setProps: contActions.setProps,
    setInner: contActions.setInner,
    insertComp: contActions.insertComp
})(GridView);