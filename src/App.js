import React from 'react';
import AppBody from './components/AppBody';
import AppNavBar from './components/AppNavBar';
import ToolsDrawer from './components/ToolsDrawer';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "ghostwhite",
  },
  app: {
    textAlign: "center"
  },
  navbarContainer: {
    position: "fixed",
    width: "100vw",
    zIndex: 10
  },
  bodyItem: {
    paddingTop: "100px"
  }
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container className={classes.app}>
        <Grid item xs={12} className={classes.navbarContainer}>
          <AppNavBar/>
        </Grid>
        <Grid item className={classes.bodyItem} xs={12}>    
          <AppBody />
        </Grid>
        <ToolsDrawer />
      </Grid>
    </div>
  );
}


export default App;
