import React, { useState } from "react"
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

import Alert from '@material-ui/lab/Alert';

import Grid from '@material-ui/core/Grid';
import MomentUtils from '@date-io/moment';
import {KeyboardDatePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';

import Header from "../../components/Header";
import IdentityProvider from "../../service/identityProvider";
import MenuItem from "@material-ui/core/MenuItem";
import { TicketRequestDto } from '../../gen-backend-api/api';
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";
import TicketFacade from "../../service/TicketFacade";
import {useHistory} from 'react-router-dom';
import TicketStorage from "../../service/ticketStorage";
export interface LeaveRequestViewProperties {

}

export interface ErrorResponseDto {
    statusCode: number;
    message: string;
}

type AddressProps = 'street' | 'houseNumber' | 'zipCode' | 'city';

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
        startAddress: {  },
        endAddress: {  },
        // validFromDateTime: new Date(),
        // validToDateTime: moment(new Date().getTime()).add(4, 'hours').toDate(),
        // reason: 'sports'
    } as T);

    const [errorResponse, setErrorResponse] = useState<string>();

    const [dateTimes, setDateTimes] = useState({
        validFromDate: moment(),
        validToDate: moment(),
        // begin next full hour
        validFromTime: moment().add(1, "hour").minutes(0),
        // ends next full hour + 2 hours
        validToTime: moment().add(3, "hour").minutes(0),
    });

    // form submit, send request to api
    const handleClick = async () => {

        // passport from identity provider
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

        try {
            const response = await TicketFacade.createTicket(ticketPayload)
            console.log('ticket response success', response);

            const ticketResponseDto = response.data;
            // save created ticket to LS
            TicketStorage.addTicket(ticketResponseDto);
            // go to details to show it
            history.push('/ticket/' + ticketResponseDto.ticketId);

        } catch (error) {
            // this is the main part. Use the response property from the error object
            console.log('ticket response error status=' + error.response.status, error.response);

            const errorResponse: ErrorResponseDto = error.response.data as ErrorResponseDto;
            switch (errorResponse.statusCode) {
                case 400: {
                    setErrorResponse("Ungültige Eingaben. Bitte die Formularfelder überprüfen.");
                    break;
                }
                case 409: {
                    setErrorResponse("Im gewählten Zeitraum existiert bereits ein Ticket für die Person.");
                    break;
                }
                default: {
                    setErrorResponse("Vorgang konnte nicht verarbeitet werden. Formularfelder überprüfen oder später erneut probieren.");
                    break;
                }
            }
        }

    }

    const onReasonChange = ({target}: React.ChangeEvent<{ value: unknown }>): void => {
        setTicketPayload({...ticketPayload, reason: target.value} as T);
    }

    const onEmployerCodeChange = ({target}: React.ChangeEvent<{ value: unknown }>): void => {
        setTicketPayload({...ticketPayload, employerCode: target.value} as T);
    }

    const onAddressChange = (which: "startAddress" | "endAddress", propertyName: AddressProps) => ({target}: React.ChangeEvent<HTMLInputElement>): void => {
        const address = ticketPayload[which];
        address[propertyName] = target.value;
        setTicketPayload({...ticketPayload, [which]: address} as T)
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
                                <FormHelperText id="requestStartAddressHelper">
                                    Bescheinigung-Code des Arbeitgebers.
                                </FormHelperText>
                            </FormControl>
                        </div>
                        }
                    </CardContent>
                </Card>

                <Card className={classes.cards}>
                    <CardContent>
                        <Typography color="textPrimary" gutterBottom>
                            Start-Adresse
                        </Typography>

                        <Grid container justify="space-between">
                            <FormControl component={Grid} item xs={12} sm={5}>
                                <InputLabel htmlFor="requestStartAddressStreet">Straße</InputLabel>
                                <Input id="startAddressStreet" name="requestStartAddressStreet" onChange={onAddressChange('startAddress', 'street')} value={ticketPayload?.startAddress?.street}
                                    aria-describedby="requestStartAddressStreetHelper"/>
                                <FormHelperText>z.B. Marienplatz</FormHelperText>
                            </FormControl>
                            <FormControl component={Grid} item xs={12} sm={5}>
                                <InputLabel htmlFor="requestStartAddressHouseNum">Hausnummer</InputLabel>
                                <Input id="startAddressHouseNum" name="requestStartAddressHouseNum" onChange={onAddressChange('startAddress', 'houseNumber')} value={ticketPayload?.startAddress?.houseNumber}
                                    aria-describedby="requestStartAddressHouseNumHelper"/>
                                    <FormHelperText>z.B. 21a</FormHelperText>
                            </FormControl>
                            <FormControl component={Grid} item xs={12} sm={5}>
                                <InputLabel htmlFor="requestStartAddressZipCode">Postleitzahl</InputLabel>
                                <Input id="startAddressZipCode" name="requestStartAddressZipCode" onChange={onAddressChange('startAddress', 'zipCode')} value={ticketPayload?.startAddress?.zipCode}
                                    aria-describedby="requestStartAddressZipCodeHelper"/>
                                <FormHelperText>z.B. 70180</FormHelperText>
                            </FormControl>
                            <FormControl component={Grid} item xs={12} sm={5}>
                                <InputLabel htmlFor="requestStartAddressCity">Stadt</InputLabel>
                                <Input id="startAddressCity" name="requestStartAddressCity" onChange={onAddressChange('startAddress', 'city')} value={ticketPayload?.startAddress?.city}
                                    aria-describedby="requestStartAddressCityHelper"/>
                                    <FormHelperText>z.B. Stuttgart</FormHelperText>
                            </FormControl>
                        </Grid>
                    </CardContent>
                </Card>

                <Card className={classes.cards}>
                    <CardContent>
                        <Typography color="textPrimary" gutterBottom>
                            Ziel-Adresse
                        </Typography>

                        <Grid container justify="space-between">
                            <FormControl component={Grid} item xs={12} sm={5}>
                                <InputLabel htmlFor="requestEndAddressStreet">Straße</InputLabel>
                                <Input id="endAddressStreet" name="requestEndAddressStreet" onChange={onAddressChange('endAddress', 'street')} value={ticketPayload?.endAddress?.street}
                                    aria-describedby="requestEndAddressStreetHelper"/>
                                <FormHelperText>z.B. Königstraße</FormHelperText>
                            </FormControl>
                            <FormControl component={Grid} item xs={12} sm={5}>
                                <InputLabel htmlFor="requestEndAddressHouseNum">Hausnummer</InputLabel>
                                <Input id="endAddressHouseNum" name="requestEndAddressHouseNum" onChange={onAddressChange('endAddress', 'houseNumber')} value={ticketPayload?.endAddress?.houseNumber}
                                    aria-describedby="requestEndAddressHouseNumHelper"/>
                                    <FormHelperText>z.B. 21a</FormHelperText>
                            </FormControl>
                            <FormControl component={Grid} item xs={12} sm={5}>
                                <InputLabel htmlFor="requestEndAddressZipCode">Postleitzahl</InputLabel>
                                <Input id="endAddressZipCode" name="requestEndAddressZipCode" onChange={onAddressChange('endAddress', 'zipCode')} value={ticketPayload?.endAddress?.zipCode}
                                    aria-describedby="requestEndAddressZipCodeHelper"/>
                                <FormHelperText>z.B. 70180</FormHelperText>
                            </FormControl>
                            <FormControl component={Grid} item xs={12} sm={5}>
                                <InputLabel htmlFor="requestEndAddressCity">Stadt</InputLabel>
                                <Input id="endAddressCity" name="requestEndAddressCity" onChange={onAddressChange('endAddress', 'city')} value={ticketPayload?.endAddress?.city}
                                    aria-describedby="requestEndAddressCityHelper"/>
                                    <FormHelperText>z.B. Stuttgart</FormHelperText>
                            </FormControl>
                        </Grid>
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

            {errorResponse != null && <Alert variant="outlined" severity="error">
                {errorResponse}
            </Alert>}

            <FormControl margin="normal" fullWidth={true}>
                <Button variant="contained" onClick={handleClick}>Ticket erstellen</Button>
            </FormControl>
        </Container>
        </div>
    );
};


export default LeaveRequestView