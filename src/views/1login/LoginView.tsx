import React, {useState} from "react";
import {useHistory} from 'react-router-dom';
import Header from "../../components/Header";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {
    Container,
    FormControl,
    Input,
    InputLabel,
    Button,
    Card,
    CardContent,
    Typography
} from "@material-ui/core";

import IdentityProvider from "../../service/identityProvider";
import {UserIdentity} from "../../model/UserIdentity";

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

    const history = useHistory();

    const [loginState, setLoginState] = useState<UserIdentity>({} as UserIdentity);

    const sendLogin = () => {
        IdentityProvider.setIdentity(loginState.firstname, loginState.lastname, loginState.personalId);
        history.push('home');
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
                            <Input name="registReason" id="registReason" onChange={onChange('lastname')}
                                   aria-describedby="registReasonHelper"/></FormControl>
                        <FormControl fullWidth={true}>
                            <InputLabel htmlFor="registReason">Personal-ID</InputLabel>
                            <Input name="registReason" id="registReason" onChange={onChange('personalId')}
                                   aria-describedby="registReasonHelper"/>
                        </FormControl>
                        <FormControl margin="normal" fullWidth={true}>
                            <Button variant="contained" onClick={sendLogin}>Anmelden</Button>
                        </FormControl>
                    </CardContent>
                </Card>
            </Container>
        </div>
    );
};

export default LoginView;
