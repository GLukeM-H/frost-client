import React from 'react';
import AppBody from './components/AppBody';
import AppNavBar from './components/AppNavBar';
import ToolsDrawer from './components/ToolsDrawer';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#486d99"
    },
    secondary: {
      main: "#8c4f5a"
    },
    neutral: {
      main: "#e5e5ec",
      light: "#f8f8ff"
    }
  }
});


const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "ghostwhite",
  },
  app: {
    textAlign: "center",
  },
  navbarContainer: {
    position: "fixed",
    width: "100vw",
    zIndex: theme.zIndex.appBar
  },
  drawer: {
    zIndex: theme.zIndex.drawer
  },
  bodyItem: {
    marginTop: theme.mixins.toolbar.minHeight,
    "@media (min-width:0px) and (orientation: landscape)": {
      marginTop: theme.mixins.toolbar["@media (min-width:0px) and (orientation: landscape)"].minHeight
    },
    "@media (min-width:600px)": {
      marginTop: theme.mixins.toolbar["@media (min-width:600px)"].minHeight
    },
    zIndex: 0
  },
  blurred: {
    filter: "blur(10px)",
    height: "70px",
    width: "100%",
    overflow: "hidden",
    position: "fixed"
  }
}));

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Grid container className={classes.app}>
          <Grid item xs={12} className={classes.navbarContainer}>
            <AppNavBar/>
          </Grid>
          <Grid item className={classes.bodyItem} xs={12}>
            <AppBody/>
          </Grid>
          <ToolsDrawer className={classes.drawer} />
        </Grid>
      </div>
    </ThemeProvider>
  );
}


export default App;
