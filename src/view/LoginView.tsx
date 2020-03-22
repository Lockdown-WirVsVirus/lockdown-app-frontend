import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SHA256 from "crypto-js/sha256";
import Cookies from 'universal-cookie';

import IdentityProvider from "../service/identityProvider";
import WindowConfig from "../service/WindowConfig";

const salt = "234lsnfd";

interface LoginProps {
}

interface LoginState {
    personalid: string;
    firstName: string;
    lastName: string;
    disable: boolean;
}

export default class LoginView extends React.Component<LoginProps, LoginState> {

    constructor(pros: any) {
        super(pros);
        this.state = {
            personalid: "",
            firstName: "",
            lastName: "",
            disable: false
        };
        this.sendLogin = this.sendLogin.bind(this);
    }

    sendLogin() {
        console.log(SHA256(salt + this.state.personalid).toString());
        const cookies = new Cookies();
        cookies.set('firstname', this.state.firstName);
        cookies.set('lastname', this.state.lastName);
        cookies.set('personalid', this.state.personalid);
        cookies.set('hashPersonalID', SHA256(salt + this.state.personalid).toString());

        IdentityProvider.setIdentity(this.state.firstName, this.state.lastName, this.state.personalid);
    }

    validInput(firstname: String, lastname: String, personalid: String) {
        // let result = !(
        //   firstname.length > 0 &&
        //   lastname.length > 0 &&
        //   personalid.length == 10
        // );
        // this.setState({ disable: result });
    }

    render() {
        return (
            <div className="LoginView">
                <TextField
                    id="filled-basic"
                    label="Vorname"
                    variant="filled"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        this.setState({firstName: e.target.value});
                        this.validInput(
                            e.target.value,
                            this.state.lastName,
                            this.state.personalid
                        );
                    }}
                />
                <br/>
                <TextField
                    id="filled-basic"
                    label="Nachname"
                    variant="filled"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        this.setState({lastName: e.target.value});
                        this.validInput(
                            this.state.firstName,
                            e.target.value,
                            this.state.personalid
                        );
                    }}
                />
                <br/>
                <TextField
                    id="filled-basic"
                    label="Personal-ID"
                    variant="filled"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        this.setState({personalid: e.target.value});
                        this.validInput(
                            this.state.firstName,
                            this.state.lastName,
                            e.target.value
                        );
                    }}
                />
                <br/>
                <Button variant="contained" disabled={this.state.disable} href={"leave"} onClick={this.sendLogin}>
                    Anmelden
                </Button>
            </div>
        );
    }
}
