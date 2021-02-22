import React from 'react';
import AppBody from './components/AppBody';
import AppNavBar from './components/AppNavBar';
import AppTools from './components/AppTools';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const useStyles = makeStyles(theme => ({
  app: {
    textAlign: "center",
    backgroundColor: "ghostwhite",
    height: "100vh"
  },
  navbarContainer: {
    position: "fixed",
    width: "100vw",
  },
  bodyContainer: {
    paddingTop: "100px"
  }
}));

function App() {
  const style = useStyles();

  return (
    <Grid container className={style.app}>
      <Grid item xs={12} className={style.navbarContainer}>
        <AppNavBar/>
      </Grid>
      <AppTools />
      <Grid item className={style.bodyContainer} xs={12}>
        <Grid container>
            <Grid item md={2} xs={12}>
            </Grid>
            <Grid item md={8}>
              <AppBody />
            </Grid>
            <Grid item md={2} xs={12}>
            </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}


export default App;
