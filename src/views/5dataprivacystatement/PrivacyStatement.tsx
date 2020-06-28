import React from "react";
import Header from "../../components/Header";
import { useHistory } from "react-router-dom";

import {
  Button,
  Container,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";

const PrivacyStatementView = () => {
  const history = useHistory();

  const goCreateTicket = () => {
    history.push("/create");
  };
  return (
    <div>
      <Container>
        <Header title="Datenschutzhinweis"></Header>
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              <b>SafeTicket</b> speichert keine persönlichen Daten auf einen
              externen Server.
            </Typography>
            <Typography variant="body2" component="p">
              <p>
                Die persönlichen Angaben bleiben auf dem Gerät und sind somit
                sicher vor Hackern und Datenleaks. Zur Authentifizierung Ihres
                angelegten Ticktes wird die Personalnummer versendet. Diese wird
                allerdings durch ein mordernes Verfahren, ein sogennanter Hash,
                verschlüsselt, wodurch niemand diese Personalnummer nicht
                rückverfolgen können. Somit sind ihre Daten sicher.
              </p>
            </Typography>
            <Typography variant="body2" component="p">
              <p>
                {" "}
                Die verschlüsselte Personalnummer wird auch nicht den Behörden
                oder sonstigen dritten weitergeleitet.
              </p>
            </Typography>

            <Button variant="contained" onClick={goCreateTicket}>
              {" "}
              Zur Ticketerstellung{" "}
            </Button>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default PrivacyStatementView;
