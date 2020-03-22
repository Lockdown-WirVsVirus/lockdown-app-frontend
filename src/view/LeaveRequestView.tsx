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
    Button
} from '@material-ui/core';
// Rich
import Grid from '@material-ui/core/Grid';
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
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
    }),
);

const LeaveRequestView = (props: LeaveRequestViewProperties) => {

    const firstName = IdentityProvider.getIdentity().firstName;

    const [selectedDate, setSelectedDate] = React.useState<Date | null>(
        new Date(),
    );

    const handleDateChange = (date: any) => {
        console.log('handleDateChange: date', date)
        setSelectedDate(date);
    };

    const classes = useStyles();
    return (
        <div>
            <div>
                <h3>Hallo {firstName}</h3>
            </div>
            <FormControl fullWidth={true}>
                <InputLabel htmlFor="requestStartAddress">Start Adresse</InputLabel>
                <Input id="requestStartAddress" aria-describedby="requestStartAddressHelper" />
                <FormHelperText id="requestStartAddressHelper">Die Anschrift deines Ausgangspunkt.</FormHelperText>
            </FormControl>
            <FormControl fullWidth={true}>
                <InputLabel htmlFor="requestTargetAddress">Ziel Adresse</InputLabel>
                <Input id="requestTargetAddress" aria-describedby="requestTargetAddressHelper" />
                <FormHelperText id="requestTargetAddressHelper">Die Anschrift deines Ziels.</FormHelperText>
            </FormControl>
            <FormControl fullWidth={true}>
                <InputLabel htmlFor="requestReason">Grund</InputLabel>
                <Input id="requestReason" aria-describedby="requestReasonHelper" />
                <FormHelperText id="requestReasonHelper">Wähle einen Grund aus.</FormHelperText>
            </FormControl>
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
            <h3>Rich UI Date Time Picker</h3>
            <MuiPickersUtilsProvider utils={MomentUtils} libInstance={moment} locale="de">
                <Grid container justify="space-between">
                    <KeyboardDatePicker
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
                    />

                    <KeyboardTimePicker
                        id="time-picker"
                        format="hh:mm"
                        label="Uhrzeit"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change time',
                        }}
                    />
                </Grid>
            </MuiPickersUtilsProvider>
            <FormControl margin="normal" fullWidth={true}>
                <Button variant="contained">Ticket erstellen</Button>
            </FormControl>
        </div>
    );
};


export default LeaveRequestView