import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    marginLeft: 0,
    alignItems: "center",
    background: "#0778A5"
  },
  toolbar: {
    minHeight: `15vh`,
  },
  typography: {
    align: "center"
  }
}));

interface HeaderProps {
}


const Header = (props: HeaderProps) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.typography}>
            Registrierung
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
