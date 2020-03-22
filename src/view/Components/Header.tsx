import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
const drawerWidth = 0;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    marginLeft: 0,
    alignItems: "center",
    background: "rgba(0,75,118,1)",
    // background: "linear-gradient(180deg, rgba(0,75,118,1) 50%, rgba(90,173,221,1) 100%);"
  },
  toolbar: {
    minHeight: `15vh`,
  },
  typography: {
    align: "center"
  }
}));

interface HeaderProps {}

interface HeaderState {}

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
