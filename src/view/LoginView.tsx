import React from "react";
import SHA256 from "crypto-js/sha256";
import Cookies from "universal-cookie";
import Header from "./Components/Header";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
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
  const [lastname, setLastname] = React.useState<String | null>("");
  const [firstname, setFirstname] = React.useState<String | null>("");
  const [personal, setPersonal] = React.useState<String | null>("");

  const sendLogin= () =>{
    console.log(SHA256(salt + personal).toString());
    const cookies = new Cookies();
    cookies.set('firstname', firstname);
    cookies.set('lastname', lastname);
    cookies.set('personalid', personal);
    cookies.set('hashPersonalID', SHA256(salt + personal).toString());
  }

  const classes = useStyles();
  return (
    <div>
      <Header></Header>
      <Container>
        <Card className={classes.cards}>
          <CardContent>
            <Typography color="textPrimary" gutterBottom>
              Was möchtest du tun?
            </Typography>
            <Typography color="textSecondary">
              Geben Sie ihre Daten für die Registierung ein.
            </Typography>
            <FormControl fullWidth={true}><InputLabel htmlFor="registReason">Vorname</InputLabel>
            <Input name="registReason" id="registReason" onChange={e => setFirstname(e.target.value)} aria-describedby="registReasonHelper" />

              </FormControl>
              <FormControl fullWidth={true}>
              <InputLabel htmlFor="registReason">Nachname</InputLabel>
              <Input name="registReason" id="registReason" onChange={e => setLastname(e.target.value)} aria-describedby="registReasonHelper" /></FormControl>
              <FormControl fullWidth={true}>
              <InputLabel htmlFor="registReason">Personal-ID</InputLabel>
              <Input name="registReason" id="registReason" onChange={e => setPersonal(e.target.value)} aria-describedby="registReasonHelper" />
            </FormControl>
            <FormControl margin="normal" fullWidth={true}>
                    <Button variant="contained" href={"\check"} onClick={sendLogin}>Anmelden</Button>
                </FormControl>
          </CardContent>
        </Card>
      <Container>
    </div>
  );
};

export default LoginView;
