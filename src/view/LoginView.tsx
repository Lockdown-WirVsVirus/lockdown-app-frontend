import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SHA256 from "crypto-js/sha256";
import Cookies from 'universal-cookie';

import IdentityProvider from "../service/identityProvider";
import {UserIdentity} from "../model/UserIdentity";

const salt = "234lsnfd";

interface LoginProps {
}

interface LoginState {
    personalid: string;
    firstName: string;
    lastName: string;
    disable: boolean;
}

const LoginView = (isLoggedIn: boolean) => {
    const [loginState, setLoginState] = useState<UserIdentity>({} as UserIdentity);

    const sendLogin = () => {
        console.log(SHA256(salt + loginState.personalId).toString());
        const cookies = new Cookies();
        cookies.set('firstname', loginState.firstname);
        cookies.set('lastname', loginState.lastname);
        cookies.set('personalid', loginState.personalId);
        cookies.set('hashPersonalID', SHA256(salt + loginState.personalId).toString());

        IdentityProvider.setIdentity(loginState.firstname, loginState.lastname, loginState.personalId);
    }


    const onChange = (fieldName: string) => ({target}: React.ChangeEvent<HTMLInputElement>) => {
        const newState: UserIdentity = {...loginState, [fieldName]: target.value} as UserIdentity;
        setLoginState(newState);
        validInput(
            target.value,
            loginState.lastname,
            loginState.personalId);
    }

    const validInput = (firstname: String, lastname: String, personalid: String) => {

    }

    return (
        <div className="LoginView">
            <TextField
                id="filled-basic"
                label="Vorname"
                variant="filled"
                onChange={onChange('firstname')}
            />
            <br/>
            <TextField
                id="filled-basic"
                label="Nachname"
                variant="filled"
                onChange={onChange('lastname')}
            />
            <br/>
            <TextField
                id="filled-basic"
                label="Personal-ID"
                variant="filled"
                onChange={onChange('personalId')}
            />
            <br/>
            <Button variant="contained" disabled={loginState.disable} href={"leave"} onClick={sendLogin}>
                Anmelden
            </Button>
        </div>
    );
}

export default LoginView;
