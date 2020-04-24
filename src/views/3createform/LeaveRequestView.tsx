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
import {DateTimePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';

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

    useEffect(() => {
        setTicketPayload({...ticketPayload, validFromDateTime: new Date().getTime()} as T);
    }, [])

    const handleClick = async () => {

        ticketPayload.passportId = IdentityProvider.getIdentity().identificationDocumentId

        const response = await TicketFacade.createTicket(ticketPayload);
        console.log('sending to backend => ',response);

        if (response.status === 200 || response.status === 201) {
            // FIXME: currently clear before
            TicketStorage.clearTickets();

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

    const onDateChange = (date: MaterialUiPickersDate): void => {
        if (!date) {
            return;
        }
        setTicketPayload({...ticketPayload, validFromDateTime: date.toDate()} as T);
    }

    const onDurationChange = ({target}: React.ChangeEvent<HTMLInputElement>): void => {
        if (!ticketPayload?.validFromDateTime) {
            return;
        }
        const validToDateTime = moment(ticketPayload.validFromDateTime.getTime()).add(target.value, 'hours');
        setTicketPayload({...ticketPayload, validToDateTime: validToDateTime.toDate()})
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
                                <MenuItem value={'work'}>Arbeiten</MenuItem>
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
                            <Grid container justify="space-between">

                                <DateTimePicker
                                    autoOk
                                    disablePast
                                    hideTabs
                                    ampm={false}
                                    value={ticketPayload?.validFromDateTime}
                                    onChange={onDateChange}
                                    allowKeyboardControl={false}
                                    helperText="Hardcoded helper text"
                                    leftArrowIcon={<AlarmIcon/>}
                                    leftArrowButtonProps={{"aria-label": "Prev month"}}
                                    rightArrowButtonProps={{"aria-label": "Next month"}}
                                    rightArrowIcon={<SnoozeIcon/>}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton>
                                                    <AlarmIcon/>
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                            </Grid>
                        </MuiPickersUtilsProvider>

                        <FormControl fullWidth={true}>
                            <InputLabel htmlFor="requestDuration">Dauer</InputLabel>
                            <Input name="requestDuration" id="requestDuration"
                                   onChange={onDurationChange}
                                   aria-describedby="requestDurationHelper"/>
                            <FormHelperText id="requestDurationHelper">Wieviele Stunden wirst du bis zur Rückkehr
                                benötigen?</FormHelperText>
                        </FormControl>

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