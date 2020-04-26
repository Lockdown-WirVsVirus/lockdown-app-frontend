import React, {useEffect, useState} from "react"
import moment from "moment";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
    Button,
    Card,
    CardContent,
    Container,
    FormControl,
    FormHelperText,
    Input,
    InputLabel,
    TextField,
    Select,
    Typography,
} from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import MomentUtils from '@date-io/moment';
import {KeyboardDatePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';

import Header from "../../components/Header";
import IdentityProvider from "../../service/identityProvider";
import MenuItem from "@material-ui/core/MenuItem";
import { TicketRequestDto } from '../../gen-backend-api/api';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SnoozeIcon from "@material-ui/icons/Snooze";
import AlarmIcon from "@material-ui/icons/AddAlarm";
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";
import TicketFacade from "../../service/TicketFacade";
import {useHistory} from 'react-router-dom';
import TicketStorage from "../../service/ticketStorage";
export interface LeaveRequestViewProperties {

}


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            width: 200,
        },
        cards: {
            marginBottom: 22,
        },
        timepicker: {
            marginLeft: theme.spacing(2),
        },
        durationInput: {
            marginLeft: theme.spacing(2),
        }
    }),
);

const LeaveRequestView = <T extends TicketRequestDto>(props: LeaveRequestViewProperties) => {
    const classes = useStyles();
    const history = useHistory();

    const [ticketPayload, setTicketPayload] = useState<T>({
        // startAddress: { street: "bla" },
        // endAddress: { street: "blub" },
        // validFromDateTime: new Date(),
        // validToDateTime: moment(new Date().getTime()).add(4, 'hours').toDate(),
        // reason: 'sports'
    } as T);

    const [dateTimes, setDateTimes] = useState({
        validFromDate: moment(),
        validToDate: moment(),
        // begin next full hour
        validFromTime: moment().add(1, "hour").minutes(0),
        // ends next full hour + 2 hours
        validToTime: moment().add(3, "hour").minutes(0),
    });

    useEffect(() => {
        setTicketPayload({...ticketPayload, validFromDateTime: new Date().getTime()} as T);
    }, [])

    const handleClick = async () => {

        ticketPayload.passportId = IdentityProvider.getIdentity().identificationDocumentId

        // create new date object from moment
        // and set time in them
        const from = moment(dateTimes.validFromDate);
        from.hours(dateTimes.validFromTime.hours());
        from.minutes(dateTimes.validFromTime.minutes());
        from.seconds(0);
        const to = moment(dateTimes.validToDate);
        to.hours(dateTimes.validToTime.hours());
        to.minutes(dateTimes.validToTime.minutes());
        to.seconds(0);

        ticketPayload.validFromDateTime = from.toDate();
        ticketPayload.validToDateTime = to.toDate();

        console.log('create ticket request attempt', ticketPayload);

        const response = await TicketFacade.createTicket(ticketPayload);
        console.log('ticket response',response);

        if (response.status === 200 || response.status === 201) {
            // save created ticket to LS
            TicketStorage.addTicket(response.data);
            // go to details to show it
            history.push('details');
        } else {
            // TODO: show error TOAST
        }

    }

    const onReasonChange = ({target}: React.ChangeEvent<{ value: unknown }>): void => {
        setTicketPayload({...ticketPayload, reason: target.value} as T);
    }

    const onEmployerCodeChange = ({target}: React.ChangeEvent<{ value: unknown }>): void => {
        setTicketPayload({...ticketPayload, employerCode: target.value} as T);
    }

    const onAddressChange = (propertyName: string) => ({target}: React.ChangeEvent<HTMLInputElement>): void => {
        setTicketPayload({...ticketPayload, [propertyName]: {street: target.value}} as T)
    }

    const onDateChange = (what: "start" | "end") =>
        (date: MaterialUiPickersDate): void => {
            if (!date) {
                return;
            }

            if (what === "start") {
                setDateTimes({ ...dateTimes, validFromDate: moment(date.toDate()) });
            }
            if (what === "end") {
                setDateTimes({ ...dateTimes, validToDate: moment(date.toDate()) });
            }
        }

    const onTimeChange = (what: "start" | "end") =>
        ({target}: React.ChangeEvent<HTMLInputElement>): void => {
            const value = target.value;
            if (!value) {
                return;
            }

            if (what === "start") {
                setDateTimes({ ...dateTimes, validFromTime: moment(value, "HH:mm") });
            }
            if (what === "end") {
                setDateTimes({ ...dateTimes, validToTime: moment(value, "HH:mm") });
            }
        }

    const isWorkTicket = (): boolean | undefined => {
        return ticketPayload?.reason === 'work';
    }

    return (
        <div>
            <Header title="Neuer Passierschein"></Header>
            <Container>
                <Card className={classes.cards}>
                    <CardContent>
                        <Typography color="textPrimary" gutterBottom>
                            Was möchtest du tun?
                        </Typography>
                        <Typography color="textSecondary">
                            Wähle aus der Liste der erlaubten Aktivitäten aus.
                        </Typography>
                        <FormControl fullWidth={true}>
                            <InputLabel htmlFor='requestReason'>Grund</InputLabel>
                            <Select id="requestReason" value={ticketPayload?.reason} onChange={onReasonChange}>
                                {/* TODO: implement work code stuff. In backend too */}
                                {/* <MenuItem value={'work'}>Arbeiten</MenuItem> */}
                                <MenuItem value={'food'}>Lebensmittel Einkauf</MenuItem>
                                <MenuItem value={'health'}>Arzt</MenuItem>
                                <MenuItem value={'help'}>Hilfeleistung für Mitbürger</MenuItem>
                                <MenuItem value={'recreation'}>Spazieren</MenuItem>
                                <MenuItem value={'jogging'}>Joggen</MenuItem>
                            </Select>
                            <FormHelperText id="requestReasonHelper">Wähle einen Grund aus.</FormHelperText>
                        </FormControl>
                        {isWorkTicket() &&
                        <div>
                            <FormControl fullWidth={true}>
                                <InputLabel htmlFor="requestStartAddress">Arbeitgeber-Bescheinigung-Code</InputLabel>
                                <Input name="requestStartAddress" onChange={onEmployerCodeChange}
                                       aria-describedby="requestStartAddressHelper"/>
                                <FormHelperText id="requestStartAddressHelper">Bescheinigung-Code des
                                    Arbeitgebers.</FormHelperText>
                            </FormControl>
                        </div>
                        }
                    </CardContent>
                </Card>

                <Card className={classes.cards}>
                    <CardContent>
                        <Typography color="textPrimary" gutterBottom>
                            Start- &amp; Ziel-Adresse
                        </Typography>
                        <FormControl fullWidth={true}>
                            <InputLabel htmlFor="requestStartAddress">Start Adresse</InputLabel>
                            <Input name="requestStartAddress" onChange={onAddressChange('startAddress')} value={ticketPayload?.startAddress?.street}
                                   aria-describedby="requestStartAddressHelper"/>
                            <FormHelperText id="requestStartAddressHelper">Die Anschrift deines
                                Ausgangspunkt.</FormHelperText>
                        </FormControl>
                        <FormControl fullWidth={true}>
                            <InputLabel htmlFor="requestTargetAddress">Ziel Adresse</InputLabel>
                            <Input name="requestTargetAddress" onChange={onAddressChange('endAddress')}
                                   id="requestTargetAddress" aria-describedby="requestTargetAddressHelper"/>
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
                            <Grid container>
                                <KeyboardDatePicker
                                    disableToolbar
                                    autoOk
                                    disablePast
                                    format="DD.MM.YYYY"
                                    id="ticket-request-start-date-picker"
                                    label="Beginn Datum "
                                    value={dateTimes.validFromDate.toDate()}
                                    KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                    }}
                                    onChange={onDateChange('start')}
                                />
                                <TextField
                                    id="ticket-request-start-time-input"
                                    label="Uhrzeit"
                                    type="time"
                                    defaultValue={dateTimes.validFromTime.format("HH:mm")}
                                    className={classes.timepicker}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300, // 5 min
                                    }}
                                    onChange={onTimeChange('start')}
                                />
                            </Grid>

                            <Grid container>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    autoOk
                                    disablePast
                                    format="DD.MM.YYYY"
                                    id="ticket-request-end-date-picker"
                                    label="Ende Datum "
                                    value={dateTimes.validToDate.toDate()}
                                    KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                    }}
                                    onChange={onDateChange('end')}
                                />
                                <TextField
                                    id="ticket-request-end-time-input"
                                    label="Uhrzeit"
                                    type="time"
                                    defaultValue={dateTimes.validToTime.format("HH:mm")}
                                    className={classes.timepicker}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300, // 5 min
                                    }}
                                    onChange={onTimeChange('end')}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>

                    </CardContent>
                </Card>

            <FormControl margin="normal" fullWidth={true}>
                <Button variant="contained" onClick={handleClick}>Ticket erstellen</Button>
            </FormControl>
        </Container>
        </div>
    );
};


export default LeaveRequestView