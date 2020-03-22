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
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    // format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Date picker inline"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    />
                    <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Date picker dialog"
                    // format="MM/dd/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    />
                    <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    format="hh:mm"
                    label="Time picker"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change time',
                    }}
                    />
                </Grid>
            </MuiPickersUtilsProvider>
            <FormControl fullWidth={true}>
                <Button variant="contained">Ticket erstellen</Button>
            </FormControl>
        </div>
    );
};


export default LeaveRequestView