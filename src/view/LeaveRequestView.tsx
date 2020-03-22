import React from "react"
import moment from "moment";
import Cookies from 'universal-cookie';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
    FormControl,
    Input,
    InputLabel,
    FormHelperText,
    TextField,
    Button,
    Card,
    CardContent,
    Typography,
} from '@material-ui/core';
// Rich
import Grid from '@material-ui/core/Grid';
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  KeyboardDateTimePicker,
} from '@material-ui/pickers';

import IdentityProvider from "../service/identityProvider";

export interface LeaveRequestViewProperties {

}


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            // marginLeft: theme.spacing(1),
            // marginRight: theme.spacing(1),
            width: 200,
        },
        cards: {
            marginBottom: 22,
        }
    }),
);

const LeaveRequestView = (props: LeaveRequestViewProperties) => {
    const classes = useStyles();

    let firstName = IdentityProvider.getIdentity().firstName;

    // States
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date());
    const [requestStartAddress, setRequestStartAddress] = React.useState<string | null>('');
    const [requestTargetAddress, setRequestTargetAddress] = React.useState<string | null>('');
    const [requestDuration, setRequestDuration] = React.useState<number | null>(2);
    const [requestReason, setRequestReason] = React.useState<string | null>('');

    const handleDateChange = (date: any) => {
        console.log('handleDateChange: date', date)
        setSelectedDate(date.toDate());
    };

    const handleClick = () => {

        let targetDate = null;
        if (selectedDate) {
            const fromHours = selectedDate.getHours();
            const addHours = requestDuration || 2;
            targetDate = new Date(selectedDate.getTime());
            targetDate.setHours(fromHours + addHours);
        }
        console.log('selectedDate', selectedDate);
        console.log('targetDate', targetDate);

        const ticketResponse = {
            "startPosition": requestStartAddress,
            "leaveTime": selectedDate,
            "finishPosition": requestTargetAddress,
            "arrivalTime": targetDate,
            "hashIdentityNumber": IdentityProvider.getIdentity().identificationDocumentId,
            "reason": requestReason,
            "signature": "string",
            "userPin": 0
        }

        console.log('ticketResponse', ticketResponse)
    }

    return (
        <div>
            <div>
                <h3>Hallo {firstName}</h3>
            </div>

            <Card className={classes.cards}>
                <CardContent>
                    <Typography color="textPrimary" gutterBottom>
                        Was möchtest du tun?
                    </Typography>
                    <Typography color="textSecondary">
                        Wähle aus der Liste der erlaubten Aktivitäten aus.
                    </Typography>
                    <FormControl fullWidth={true}>
                        <InputLabel htmlFor="requestReason">Grund</InputLabel>
                        <Input name="requestReason" id="requestReason" onChange={e => setRequestReason(e.target.value)} aria-describedby="requestReasonHelper" />
                        <FormHelperText id="requestReasonHelper">Wähle einen Grund aus.</FormHelperText>
                    </FormControl>
                </CardContent>
            </Card>

            <Card className={classes.cards}>
                <CardContent>
                    <Typography color="textPrimary" gutterBottom>
                        Start- &amp; Ziel-Adresse
                    </Typography>
                    <FormControl fullWidth={true}>
                        <InputLabel htmlFor="requestStartAddress">Start Adresse</InputLabel>
                        <Input name="requestStartAddress" onChange={e => setRequestStartAddress(e.target.value)} aria-describedby="requestStartAddressHelper" />
                        <FormHelperText id="requestStartAddressHelper">Die Anschrift deines Ausgangspunkt.</FormHelperText>
                    </FormControl>
                    <FormControl fullWidth={true}>
                        <InputLabel htmlFor="requestTargetAddress">Ziel Adresse</InputLabel>
                        <Input name="requestTargetAddress" onChange={e => setRequestTargetAddress(e.target.value)} id="requestTargetAddress" aria-describedby="requestTargetAddressHelper" />
                        <FormHelperText id="requestTargetAddressHelper">Die Anschrift deines Ziels.</FormHelperText>
                    </FormControl>
                </CardContent>
            </Card>

            <Card className={classes.cards}>
                <CardContent>
                    <Typography color="textPrimary" gutterBottom>
                        Zeitliche Details
                    </Typography>
                    <MuiPickersUtilsProvider utils={MomentUtils} libInstance={moment} locale="de">
                        <Grid container justify="space-between">
                            {/* <KeyboardDatePicker
                                disableToolbar
                                // variant="inline"
                                // format="MM/dd/yyyy"
                                id="date-picker-inline"
                                label="Datum"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            /> */}

                            <KeyboardDateTimePicker
                                id="time-picker"
                                margin="normal"
                                // format="hh:mm"
                                label="Datum & Uhrzeit"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                            />

                        </Grid>
                    </MuiPickersUtilsProvider>

                    <FormControl fullWidth={true}>
                        <InputLabel htmlFor="requestDuration">Dauer</InputLabel>
                        <Input name="requestDuration" id="requestDuration" onChange={e => setRequestDuration(Number(e.target.value))} aria-describedby="requestDurationHelper" />
                        <FormHelperText id="requestDurationHelper">Wieviele Stunden wirst du bis zur Rückkehr benötigen?</FormHelperText>
                    </FormControl>

                </CardContent>
            </Card>

            {/*
            <h3>Native Date Time Picker</h3>
            <FormControl fullWidth={true}>
                <TextField
                    id="date"
                    label="Birthday"
                    type="date"
                    defaultValue="2017-05-24"
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
            </FormControl>
            <FormControl fullWidth={true}>
                <TextField
                    id="datetime-local"
                    label="Next appointment"
                    type="datetime-local"
                    defaultValue="2017-05-24T10:30"
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
            </FormControl>
            <FormControl fullWidth={true}>
                <TextField
                    id="time"
                    label="Alarm clock"
                    type="time"
                    defaultValue="07:30"
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    inputProps={{
                    step: 300, // 5 min
                    }}
                />
            </FormControl>
            */}

            <FormControl margin="normal" fullWidth={true}>
                <Button variant="contained" onClick={handleClick}>Ticket erstellen</Button>
            </FormControl>
        </div>
    );
};


export default LeaveRequestView