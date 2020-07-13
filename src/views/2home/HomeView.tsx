import React from "react";
import moment from "moment";
import {Link, useHistory} from 'react-router-dom';
import Header from '../../components/Header';
import TicketHelper from '../../service/TicketHelper';
import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from "@material-ui/core/styles";
import {
    Fab,
    Container,
    Card,
    CardContent,
    Tabs, Tab,
    Typography,
    Box, List, ListItem, ListItemText,
    ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails
} from "@material-ui/core";

import TicketPreview from "./components/TicketPreview";
import TicketStorage from "../../service/ticketStorage";

const useStyles = makeStyles(theme => ({
    cardContent: {
        padding: 0,
    },
    noActiveTicket: {
        padding: '12px',
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    expandable: {
        backgroundColor: 'transparent',
    },
    expandableHeading: {},
    list: {
        width: '100%',
    }
}));

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && children}
      </Typography>
    );
}



const TicketDetailsView = () => {
  const classes = useStyles();
  const history = useHistory();

  const goToCreate = () => {
    history.push("privacy")
  }

  const [tabValue, setTabValue] = React.useState(0);

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  const activeTickets = TicketStorage.getActiveTickets();
  const pastTickets = TicketStorage.getTicketsInPast(7);
  const futureTickets = TicketStorage.getTicketsInFuture();

  const renderDateAsSecondary = (date: Date) => {
      return moment(date).format('DD.MM hh:mm')
  }

  return (
    <div>
      <Header title="Tickets" />
        <Container>
            <Card>
                <CardContent className={classes.cardContent}>
                    <Tabs
                        value={tabValue}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        centered
                    >
                        <Tab label="Aktiv" />
                        <Tab label="Zukünftig" />
                    </Tabs>
                    <TabPanel value={tabValue} index={0}>
                        { activeTickets && activeTickets.length > 0 ?
                            activeTickets.map(ticket => <TicketPreview ticket={ticket} />)
                            : <Box className={classes.noActiveTicket} component="div">
                                Kein aktives Ticket vorhanden. Erstelle ein Ticket.
                            </Box>
                        }
                    </TabPanel>
                    <TabPanel value={tabValue} index={1}>
                        { futureTickets && futureTickets.length > 0 ?
                            <TicketPreview ticket={futureTickets[0]} />
                            : <Box className={classes.noActiveTicket} component="div">
                                Kein zukünftiges Ticket vorhanden.
                            </Box>
                        }
                    </TabPanel>
                </CardContent>
            </Card>

            <br/>

            { pastTickets && pastTickets.length > 0  && <div>
                <ExpansionPanel className={classes.expandable}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.expandableHeading}>Abgelaufene Tickets</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <List className={classes.list} aria-label="expired tickets">
                        { pastTickets.map(ticket =>
                            <ListItem alignItems="flex-start" button divider component={Link} to={'/ticket/' + ticket.ticketId}>
                                <ListItemText
                                    primary={TicketHelper.mapReasonToGerman(ticket.reason)}
                                    secondary={renderDateAsSecondary(ticket.validFromDateTime) + ' - ' + renderDateAsSecondary(ticket.validToDateTime)}
                                />
                            </ListItem>
                        )}
                        </List>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div> }

        </Container>

        <Fab color="primary" aria-label="add" size="large" className={classes.fab} onClick={goToCreate}>
            <AddIcon />
        </Fab>
    </div>
  );
};

export default TicketDetailsView;
