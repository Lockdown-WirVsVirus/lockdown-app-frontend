import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from 'react-router-dom';
import { AppBar, Drawer, Toolbar, Typography } from "@material-ui/core";
import { IconButton, Button } from "@material-ui/core";
import IdentityProvider from "../service/identityProvider";
import MenuIcon from '@material-ui/icons/Menu';

// Drawer
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    marginLeft: 0,
    // alignItems: "center",
    background: "rgba(0,75,118,1)",
  },
  toolbar: {
    minHeight: "22vh",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  typography: {
    flexGrow: 1,
    "text-align": "center",
    height: "8vh"
  },
  list: {
    width: 250,
  },
}));

interface HeaderProps {
  title?:String;
}


const Header = (props: HeaderProps) => {
  const classes = useStyles();
  const history = useHistory();

  const [drawerState, setDrawerState] = React.useState(false);

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setDrawerState(open);
  };

  const doLogout = () => {
    IdentityProvider.logout();
    history.replace("login");
  }

  const list = (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button>
          <ListItemIcon><AccountBoxIcon /></ListItemIcon>
          <ListItemText primary="Profil" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Sonstiges" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon><MeetingRoomIcon /></ListItemIcon>
          <ListItemText primary="Ausloggen" onClick={doLogout} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          {/* Menu Burger Button if isLoggedIn */}
          { IdentityProvider.isLoggedIn() &&
            <IconButton onClick={toggleDrawer(true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
          }

          <Typography variant="h6" className={classes.typography}>
            {props.title || "Registrierung"}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerState} onClose={toggleDrawer(false)}>
        {list}
      </Drawer>
    </div>
  );
};

export default Header;
