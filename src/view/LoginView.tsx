import React, {useState} from "react";
import SHA256 from "crypto-js/sha256";
import Cookies from "universal-cookie";
import Header from "./Components/Header";
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

import IdentityProvider from "../service/identityProvider";
import {UserIdentity} from "../model/UserIdentity";

const salt = "234lsnfd";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: "flex",
            flexWrap: "wrap"
        },
        textField: {
            width: 200
        },
        cards: {
            marginBottom: 22
        }
    })
);

const LoginView = () => {

    const [loginState, setLoginState] = useState<UserIdentity>({} as UserIdentity);

    const sendLogin = () => {
        const hashed = SHA256(salt + loginState.personalId).toString();
        const cookies = new Cookies();
        cookies.set('firstname', loginState.firstname);
        cookies.set('lastname', loginState.lastname);
        cookies.set('personalid', loginState.personalId);
        cookies.set('hashPersonalID', loginState.idHash);
        IdentityProvider.setIdentity(loginState.firstname, loginState.lastname, loginState.personalId, loginState.idHash);
    }

    const onChange = (fieldName: string) => ({target}: React.ChangeEvent<HTMLInputElement>) => {
        const newState: UserIdentity = {...loginState, [fieldName]: target.value} as UserIdentity;
        setLoginState(newState);
    }

    const classes = useStyles();
    return (
        <div>
            <Header title="Anmeldung"></Header>
            <Container>
                <Card className={classes.cards}>
                    <CardContent>
                        <Typography color="textPrimary" gutterBottom>
                            Über Dich
                        </Typography>
                        <Typography color="textSecondary">
                            Da Passierscheine immer personenbezogen sind, benötigen wir ein paar Daten über dich.
                        </Typography>
                        <FormControl fullWidth={true}><InputLabel htmlFor="registReason">Vorname</InputLabel>
                            <Input name="registReason" id="registReason" onChange={onChange('firstname')}
                                   aria-describedby="registReasonHelper"/>

                        </FormControl>
                        <FormControl fullWidth={true}>
                            <InputLabel htmlFor="registReason">Nachname</InputLabel>
                            <Input name="registReason" id="registReason" onChange={onChange('lastName')}
                                   aria-describedby="registReasonHelper"/></FormControl>
                        <FormControl fullWidth={true}>
                            <InputLabel htmlFor="registReason">Personal-ID</InputLabel>
                            <Input name="registReason" id="registReason" onChange={onChange('personalId')}
                                   aria-describedby="registReasonHelper"/>
                        </FormControl>
                        <FormControl margin="normal" fullWidth={true}>
                            <Button variant="contained" href={"\leave"} onClick={sendLogin}>Anmelden</Button>
                        </FormControl>
                    </CardContent>
                </Card>
            </Container>
        </div>
    );
};

export default LoginView;
