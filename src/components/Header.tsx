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
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

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

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const doLogout = () => {
    IdentityProvider.logout();
    history.replace("login");
  }

  const list = (anchor: Anchor) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <IconButton onClick={toggleDrawer('left', true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.typography}>
              {props.title || "Registrierung"}
            </Typography>
            <Button onClick={doLogout} color="inherit">Logout</Button>
          </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={state['left']} onClose={toggleDrawer('left', false)}>
        {list("left")}
      </Drawer>
    </div>
  );
};

export default Header;
