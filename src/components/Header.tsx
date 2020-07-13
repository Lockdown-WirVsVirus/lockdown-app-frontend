import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from 'react-router-dom';
import { AppBar, Drawer, Toolbar, Typography, Button } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import IdentityProvider from "../service/identityProvider";
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';

// Drawer
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import TicketStorage from "../service/ticketStorage";

// Dialog
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

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
  dialog: {},
  closeButton: {}
}));

interface HeaderProps {
  title?:String;
}


const Header = (props: HeaderProps) => {
  const classes = useStyles();
  const history = useHistory();

  const [drawerState, setDrawerState] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }

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

  const goTo = (where: string) =>
    (event: React.MouseEvent) => {
      history.push(where);
    }

  /**
   * Logout with clean Local Storage
   * deletes identity, tickets from local storage
   */
  const doLogout = () => {
    IdentityProvider.logout();
    TicketStorage.clearTickets();
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
        <ListItem button onClick={goTo('home')}>
          <ListItemIcon><AccountBoxIcon /></ListItemIcon>
          <ListItemText primary="Übersicht" />
        </ListItem>
        <ListItem button onClick={goTo('create')}>
          <ListItemIcon><AddIcon /></ListItemIcon>
          <ListItemText primary="Neues Ticket" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon><MeetingRoomIcon /></ListItemIcon>
          <ListItemText primary="Ausloggen" onClick={handleOpen} />
        </ListItem>
      </List>
    </div>
  );

  const LogoutDialog = () => {
    return <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <MuiDialogTitle disableTypography className={classes.dialog}>
          <Typography variant="h6">Ausloggen?</Typography>
        </MuiDialogTitle>
        <MuiDialogContent dividers>
          <Typography gutterBottom>
            Durch das Ausloggen werden alle auf das Gerät heruntergeladenen Tickets gelöscht.
            Aber keine Sorge, die Tickets können jederzeit durch einen Login mit dem selben Ausweisdokument erneut heruntergeladen werden.
          </Typography>
        </MuiDialogContent>
        <MuiDialogActions>
          <Button autoFocus onClick={handleClose}>
            Abbrechen
          </Button>
          <Button autoFocus onClick={doLogout} color="primary">
            Ausloggen
          </Button>
        </MuiDialogActions>
      </Dialog>
  }

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

      <LogoutDialog />
    </div>
  );
};

export default Header;
