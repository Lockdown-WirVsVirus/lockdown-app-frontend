import React from "react";
import {useHistory} from 'react-router-dom';
import Header from "../../components/Header";
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from "@material-ui/core/styles";
import {
    Fab,
    Container,
    Card,
    CardContent,
    Tabs, Tab,
    Typography,
    Box,
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
    history.push("create")
  }

  const [tabValue, setTabValue] = React.useState(0);

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  const activeTickets = TicketStorage.getActiveTickets();
  const pastTickets = TicketStorage.getTicketsInPast(7);

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
                        <Tab label="Abgelaufen" />
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
                        { pastTickets && pastTickets.length > 0 ?
                            pastTickets.map(ticket => <TicketPreview ticket={ticket} />)
                            : <Box className={classes.noActiveTicket} component="div">
                                Keine abgelaufenen Ticket vorhanden.
                            </Box>
                        }
                    </TabPanel>
                </CardContent>
            </Card>

            <br/>

        </Container>

        <Fab color="primary" aria-label="add" size="large" className={classes.fab} onClick={goToCreate}>
            <AddIcon />
        </Fab>
    </div>
  );
};

export default TicketDetailsView;
