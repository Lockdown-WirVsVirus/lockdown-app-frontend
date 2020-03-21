import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SHA256 from "crypto-js/sha256";

const salt = "234lsnfd";

export default class LoginView extends React.Component {
  private personalid: String = "";
  private firstName: String = "";
  private lastName: String = "";

  constructor(pros: any) {
    super(pros);
    this.sendLogin = this.sendLogin.bind(this);
  }

  sendLogin() {
    if (this.personalid.length === 10) {
      console.log(SHA256(salt + this.personalid).toString());
    }
  }

  render() {
    return (
      <div>
        <TextField id="filled-basic" label="Vorname" variant="filled"   onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            this.firstName = e.target.value;
          }}/>
        <br />
        <TextField id="filled-basic" label="Nachname" variant="filled"  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            this.lastName = e.target.value;
          }} />
        <br />
        <TextField
          id="filled-basic"
          label="Personal-ID"
          variant="filled"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            this.personalid = e.target.value;
          }}
        />
        <br />
        <Button variant="contained" onClick={this.sendLogin}>
          Anmelden
        </Button>
      </div>
    );
  }
}
