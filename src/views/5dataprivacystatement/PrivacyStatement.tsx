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
              Ihre Daten bleiben sicher bei Ihnen
            </Typography>
            <Typography variant="body2" component="p">
              <p>
                Ihre persönlichen Daten bleiben auf Ihrem Endgerät. Zwar wird
                Ihre Personalnummer zur Authentifizierung Ihres angelegten
                Tickets an einen externen Server versendet, allerdings wird
                diese vorher durch ein modernes Verfahren, einen sogenannten
                Hash, verschlüsselt. Eine Rückverfolgung Ihrer Personalnummer
                auf dem Server ist nicht möglich. Ihre Daten sind vor
                Hackern und Datenleaks sicher.
              </p>
            </Typography>
            <Typography variant="body2" component="p">
              <p>
                {" "}
                Ihre verschlüsselte Personalnummer wird auch nicht an Behörden
                oder einen sonstigen Dritten weitergeleitet
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
