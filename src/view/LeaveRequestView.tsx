import React, {useReducer} from "react"
import moment from "moment";
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {
    Button,
    Card,
    CardContent,
    Container,
    FormControl,
    FormHelperText,
    Input,
    InputLabel,
    Select,
    Typography,
} from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import MomentUtils from '@date-io/moment';
import {DateTimePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';
import Header from "./Components/Header";
import MenuItem from "@material-ui/core/MenuItem";
import {TicketPayload} from '../gen-backend-api/api';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SnoozeIcon from "@material-ui/icons/Snooze";
import AlarmIcon from "@material-ui/icons/AddAlarm";
import TicketFacade from "../service/TicketFacade";
import TicketHelper from "../service/TicketHelper";
import {useHistory} from 'react-router-dom';
import {TicketCreateActionType, TicketCreateReducer, TicketCreationActionBuilder} from "../reducer/TicketCreateReducer";

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

const LeaveRequestView = <T extends TicketPayload>(props: LeaveRequestViewProperties) => {
    const classes = useStyles();
    const history = useHistory();

    const [{payload: ticketPayload}, dispatch] = useReducer(TicketCreateReducer, {
        isFormReady: false,
        payload: TicketHelper.emptyTicketPayload()
    });


    const handleClick = async () => {
        const response = await TicketFacade.createTicket(ticketPayload);
        console.log('sending to backend => ', response);
        if (response.status === 200 || response.status === 201) {
            history.push('details');
        } else {
            // TODO: show error TOAST
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
                            <Select id="requestReason" value={ticketPayload?.reason}
                                    onChange={(e) => dispatch(TicketCreationActionBuilder.changeReason(String(e.target.value)))}>
                                <MenuItem value={'work'}>Arbeiten</MenuItem>
                                <MenuItem value={'food'}>Einkaufen</MenuItem>
                                <MenuItem value={'health'}>Arzt</MenuItem>
                                <MenuItem value={'help'}>Hilfeleistung für Mitbürger</MenuItem>
                                <MenuItem value={'recreation'}>Spazieren</MenuItem>
                                <MenuItem value={'recreation'}>Joggen</MenuItem>
                            </Select>
                            <FormHelperText id="requestReasonHelper">Wähle einen Grund aus.</FormHelperText>
                        </FormControl>
                        {isWorkTicket() &&
                        <div>
                          <FormControl fullWidth={true}>
                            <InputLabel htmlFor="requestStartAddress">Arbeitgeber-Bescheinigung-Code</InputLabel>
                            <Input name="requestStartAddress"
                                   onChange={(e) => dispatch(TicketCreationActionBuilder.changeEmployerCode(String(e.target.value)))}
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
                            <Input name="requestStartAddress"
                                   onChange={(e) => dispatch(TicketCreationActionBuilder.changePosition(TicketCreateActionType.CHANGE_START_POSITION, String(e.target.value)))}
                                   aria-describedby="requestStartAddressHelper"/>
                            <FormHelperText id="requestStartAddressHelper">Die Anschrift deines
                                Ausgangspunkt.</FormHelperText>
                        </FormControl>
                        <FormControl fullWidth={true}>
                            <InputLabel htmlFor="requestTargetAddress">Ziel Adresse</InputLabel>
                            <Input name="requestTargetAddress"
                                   onChange={(e) => dispatch(TicketCreationActionBuilder.changePosition(TicketCreateActionType.CHANGE_FINISH_POSITION, String(e.target.value)))}
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
                                    value={ticketPayload?.leaveTime}
                                    onChange={(e) => dispatch(TicketCreationActionBuilder.changeTime(e))}
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
                                   onChange={(e) => dispatch(TicketCreationActionBuilder.changeDuration(Number(e.target.value)))}
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