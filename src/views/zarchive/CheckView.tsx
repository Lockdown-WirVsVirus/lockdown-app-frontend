import React, { useEffect } from "react";
import { TicketRequestDto, Address } from "../../gen-backend-api/api";
import TicketFacade from "../../service/TicketFacade";
import { Document, pdfjs, Page } from "react-pdf";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Header from "../../components/Header";
import {
  Card,
  CardContent,
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
  const classes = useStyles();

  useEffect(() => {
    // const payload: TicketPayload = ({
    const payload: any = ({
      arrivalTime: new Date().getTime(),
      finishPosition: {} as Address,
      hashIdentityNumber: "234234234",
      leaveTime: new Date().getTime(),
      reason: "family",
      signature: "wrwerwer",
      startPosition: {} as Address,
      userPin: 1232
    } as unknown) as TicketRequestDto;
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

        <Card className={classes.cards}>
          <CardContent>
            <Document
              file="/pdf/Test1.pdf"
              onSourceSuccess={() => {
                console.log("Source success");
              }}
            >
              <Page pageNumber={1} height={300} width={300} className="PDFPage PDFPageOne" />
            </Document>
          </CardContent>
        </Card>

    </div>
  );
};

export default CheckView;
