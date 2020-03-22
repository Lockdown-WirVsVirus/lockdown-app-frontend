import React, { useEffect } from "react";
import Cookies from "universal-cookie";
import { TicketPayload, Address } from "../gen-backend-api/api";
import TicketFacade from "../service/TicketFacade";
import axios from "axios";
import { Document, pdfjs, Page } from "react-pdf";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Header from "./Components/Header";
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
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

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

export interface CheckViewProperties {}

const CheckView = (props: CheckViewProperties) => {
  const cookies = new Cookies();
  const classes = useStyles();

  useEffect(() => {
    const payload: TicketPayload = ({
      arrivalTime: new Date().getTime(),
      finishPosition: {} as Address,
      hashIdentityNumber: "234234234",
      leaveTime: new Date().getTime(),
      reason: "family",
      signature: "wrwerwer",
      startPosition: {} as Address,
      userPin: 1232
    } as unknown) as TicketPayload;
    TicketFacade.createTicket(payload)
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  return (
    <div>
      <Header title="Ticket-View" />
      <Container>
        <Card className={classes.cards}>
          <CardContent>
            <Document
              file="/pdf/Test1.pdf"
              onSourceSuccess={() => {
                console.log("Source success");
              }}
            >
              <Page pageNumber={1} height={100} className="PDFPage PDFPageOne" />
            </Document>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default CheckView;
