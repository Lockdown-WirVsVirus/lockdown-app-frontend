import React, {useState} from "react";
import Cookies from 'universal-cookie';

import Header from "../components/Header";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {
    Container,
    FormControl,
    Input,
    InputLabel,
    FormHelperText,
    TextField,
    Button,
    Card,
    CardContent,
    Typography
} from "@material-ui/core";

import {ITicketStore} from './TicketView';

export interface TicketViewProperties {

}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {

            "background-color": "#F9F9F9",
        },
        headline: {
            "text-align": 'center',
            color: 'white',
            "margin-bottom": '40px',
        },
        homeContainer: {
            top: '0px',
            "padding-left": 0,
            "padding-right": 0,
        },
        homeContainer2: {
            top: '0px',
            "min-height": "300px",
        },
        time: {
            "font-weight": "bold",
        },
        reason: {
            "font-weight": "bold",
        },
        homeHeader: {
            background: "rgba(0,75,118,1)",
        },
        noTickets: {
            "min-width": '300px',
            "text-align": "center",
            "margin": 'auto',
            height: "200px",
            color: "white"
        },
        ticketCard: {
            "min-width": '300px',
            "margin": 'auto'
        },
        ticketCardContent: {
            "text-align": "center",
        },
        newsCard: {
            "min-width": '300px',
            "margin": 'auto'
        },
        newsCardContent: {
            "text-align": "center",
        }
    })
);

const getTicketFromLocalStorage = (): ITicketStore | null => {
    const itemString = window.localStorage.getItem('ticket');
    if (itemString) {
        const item = JSON.parse(itemString);
        return item as ITicketStore;
    } else {
        return null;
    }
}

const HomeView = (props: TicketViewProperties) => {
    const classes = useStyles();

    const [ticket, setTicket] = useState<ITicketStore | null>(
        getTicketFromLocalStorage()
    );

    let ticketCard;
    if (ticket) {
        // TODO: echte Werte aus dem gespeicherten Ticket
        // TODO: get Hours from Date Objekt.
        ticketCard = <Card className={classes.ticketCard}>
                        <CardContent className={classes.ticketCardContent}>
                            <Typography color="textSecondary" gutterBottom>
                                Aktuelles Ticket
                            </Typography>
                            <br/>
                            <br/>
                            <Typography className={classes.time} color="textPrimary" gutterBottom>
                                { ticket.ticket.validFromDateTime.getHours().toString() || '14'}
                                { ticket.ticket.validToDateTime.getHours().toString() || '16 Uhr'}
                            </Typography>
                            <br/>
                            <Typography className={classes.reason} color="textPrimary" gutterBottom>
                                { ticket.ticket.reason || 'Arztbesuch'}
                            </Typography>
                            <br/>
                            <Button href="/ticket">Öffnen</Button>
                        </CardContent>
                    </Card>
    } else {
        ticketCard = <div className={classes.noTickets}>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        Aktuell keine Passierscheine vorhanden
                     </div>
    }

    return (
        <div className={classes.root}>
            <Container className={classes.homeContainer}>
                <Card>
                    <CardContent className={classes.homeHeader}>
                        <Typography className={classes.headline} color="textPrimary" gutterBottom>
                            Safe<b>Ticket</b>
                        </Typography>
                        {ticketCard}
                    </CardContent>
                </Card>
            </Container>
            <Container className={classes.homeContainer2}>
                <br/>
                <br/>
                <br/>
                <Button variant="outlined" fullWidth={true} color="primary" href="/leave">Neuen Passierschein</Button>

                <br/>
                <br/>
                <br/>

                <Typography color="textPrimary" gutterBottom>
                    <h3>Neuigkeiten für deine Region</h3>
                </Typography>
                <br/>
                <Card className={classes.newsCard}>
                    <CardContent className={classes.newsCardContent}>
                        <Typography color="textSecondary" gutterBottom>
                            22.03.2020
                        </Typography>
                        <br/>
                        <Typography className={classes.reason} color="textPrimary" gutterBottom>
                            Keine Neuigkeiten
                        </Typography>
                    </CardContent>
                </Card>
            </Container>
        </div>
    );
};


export default HomeView