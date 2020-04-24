import React, {useState} from "react";
import Cookies from 'universal-cookie';

import Header from "../../components/Header";
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

import {TicketResponseDto, Address} from "../../gen-backend-api/api";

export interface TicketViewProperties {

}

export interface ITicketStore {
    ticket: TicketResponseDto;
    pdfUri: string;
    dataUri: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        cards: {
            marginBottom: 22,
        },
        iframe: {
            "min-height": "500px",
            width: "100%"
        }
    })
);

const getTicketFromLocalStorage = () => {
    const itemString = window.localStorage.getItem('ticket');
    if (itemString) {
        const item = JSON.parse(itemString);
        return item.pdfUri;
    } else {
        return "/pdf/Test1.pdf";
    }
}

const TicketView = (props: TicketViewProperties) => {
    const classes = useStyles();
    const [pdfUri, setPdfUri] = useState<string>(
        getTicketFromLocalStorage()
    );

    return (
        <div>
            <Header title="Ticket"></Header>
            <Container>
                <Card className={classes.cards}>
                    <CardContent>
                        <iframe className={classes.iframe} src={pdfUri}></iframe>
                    </CardContent>
                </Card>
            </Container>
        </div>
    );
};


export default TicketView