import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
import TextareaAutosize from '@material-ui/core/TextareaAutosize';


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


function PaperView(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const setInner = inner => props.setInner(props.selected, inner);
    const setProps = props => props.setProps(props.selected, props);

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
                <ListItem button onClick={() => setOpen(!open)}>
                    <ListItemText primary="Add Text" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open}>
                    <Paper className={classes.collapse} elevation={0} square>
                        <TextareaAutosize
                            className={classes.textArea}
                            rowsMin={4}
                            placeholder="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae sint quibusdam doloremque quae hic vitae?"
                            value={props.selectedInner}
                            onChange={e => setInner(e.target.value)}
                        />
                    </Paper>
                </Collapse>
            </List>
        </>
    );
}


PaperView.propTypes = {
    setSelected: PropTypes.func.isRequired,
    insertComp: PropTypes.func.isRequired,
    setInner: PropTypes.func.isRequired,
    selected: PropTypes.string.isRequired,
    setProps: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    selected: state.contentState.selected,
    selectedInner: state.contentState.contentComp[state.contentState.selected].inner
})


export default connect(mapStateToProps, {
    insertComp: contActions.insertComp,
    setSelected: contActions.setSelected,
    setInner: contActions.setInner,
    setProps: contActions.setProps
})(PaperView);
