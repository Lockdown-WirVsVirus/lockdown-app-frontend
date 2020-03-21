import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SHA256 from "crypto-js/sha256";

const salt = "234lsnfd";

export default class LoginView extends React.Component {
  private personalid: String = "";

  constructor(pros: any) {
    super(pros);
    this.sendLogin = this.sendLogin.bind(this);
  }

  sendLogin() {
    if (this.personalid.length === 10) {
      console.log(SHA256(salt + this.personalid).toString());
    }
  }

  onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.personalid = e.target.value;
  };

  render() {
    return (
      <div>
        <TextField
          id="filled-basic"
          label="Personal-ID"
          variant="filled"
          onChange={this.onInputChange}
        /> <br/>
        <TextField
          id="filled-basic"
          label="Vorname"
          variant="filled"
          onChange={this.onInputChange}
        /><br/>
         <TextField
          id="filled-basic"
          label="Vorname"
          variant="filled"
          onChange={this.onInputChange}
        /><br/>
        <Button variant="contained" onClick={this.sendLogin}>
          Anmelden
        </Button>
      </div>
    );
  }
}
