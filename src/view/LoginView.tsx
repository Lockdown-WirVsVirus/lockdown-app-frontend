import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SHA256 from "crypto-js/sha256";

const salt = "234lsnfd";

interface LoginProps {}

interface LoginState {
  personalid: String;
  firstName: String;
  lastName: String;
}

export default class LoginView extends React.Component<LoginProps, LoginState> {
  constructor(pros: any) {
    super(pros);
    this.state = { personalid: "", firstName: "", lastName: "" };
    this.sendLogin = this.sendLogin.bind(this);
  }

  sendLogin() {
    console.log("test");
    if (this.state.personalid.length === 10) {
      console.log(SHA256(salt + this.state.personalid).toString());
    }
  }

  render() {
    return (
      <div>
        <TextField
          id="filled-basic"
          label="Vorname"
          variant="filled"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            this.setState({ firstName: e.target.value });
          }}
        />
        <br />
        <TextField
          id="filled-basic"
          label="Nachname"
          variant="filled"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            this.setState({ lastName: e.target.value });
          }}
        />
        <br />
        <TextField
          id="filled-basic"
          label="Personal-ID"
          variant="filled"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            this.setState({ personalid: e.target.value });
          }}
        />
        <br />
        <Button
          disabled={this.state.personalid.length < 10}
          onClick={this.sendLogin}
        >
          Anmelden
        </Button>
      </div>
    );
  }
}
