import React, { useRef } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Header from "../../components/Header";
import {
  Card,
  CardContent,
} from "@material-ui/core";
import { usePdf } from '@mikecousins/react-pdf';

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

  const canvasRef = useRef(null);

  const { pdfDocument } = usePdf({
    file: '/pdf/Test1.pdf',
    canvasRef,
  });

  return (
    <div>
      <Header title="Ticket-View" />

        <Card className={classes.cards}>
          <CardContent>

          {!pdfDocument && <span>Loading...</span>}
          <canvas ref={canvasRef} />
          </CardContent>
        </Card>

    </div>
  );
};

export default CheckView;
