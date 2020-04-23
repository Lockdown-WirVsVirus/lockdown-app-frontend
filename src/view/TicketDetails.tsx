import React, { useState } from "react";
import Header from "../components/Header";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Card,
  CardContent,
  Typography
} from "@material-ui/core";
import { TicketResponseDto, Address } from '../gen-backend-api/api';
import QRCode from 'qrcode.react';
import moment from "moment";

import IdentityProvider from "../service/identityProvider";
import TicketStorage from "../service/ticketStorage";
import TicketHelper from "../service/TicketHelper";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    textAlign: "left"
  },
  barcode: {
    marginBottom: "1.5em",
  }

}));

const TicketDetailsView = () => {
  const classes = useStyles();

  const ticket = TicketStorage.getInterestingTicket();
  const [ticketPayload, setTicketPayload] = useState<TicketResponseDto>(ticket as TicketResponseDto);

  const renderAddress = (address: Address) => {
    return address && (
      <div>
      {
      address.street || '' + " " + address.houseNumber || '' + ", " +
      address.zipCode || '' + " " + address.city || ''
      }
      </div>
    );
  }

  return (
    <div>
      <Header title="Ticket Details" />
      <Container>
        <Card>
          <CardContent>

            <Grid container spacing={0}>
              <Grid item xs={12}>
                <Typography className={classes.paper} variant="h6">
                  <b>{ ticketPayload?.startAddress?.city }</b>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography className={classes.paper} variant="h5">
                  <b>{ TicketHelper.mapReasonToGerman(ticketPayload?.reason) }</b>
                </Typography>
              </Grid>
            </Grid>

            { ticketPayload?.ticketId &&
              <Grid container direction="column" alignItems="center" justify="center" className={classes.barcode}>
                <Grid item xs={12} >
                    <QRCode value={ticketPayload.ticketId} level="M" />
                </Grid>
              </Grid>
            }

            <Grid container spacing={0}>
              <Grid item xs={6}>
                <Typography className={classes.paper} variant="h6">
                  <b>Datum</b>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography className={classes.paper} variant="h5">
                  { ticketPayload?.validFromDateTime ? moment(ticketPayload.validFromDateTime).format('DD.MM.YYYY') : '' }
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography className={classes.paper} variant="h6">
                  <b>Uhrzeit</b>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography className={classes.paper} variant="h5">
                { ticketPayload?.validFromDateTime && ticketPayload?.validToDateTime ?
                  moment(ticketPayload.validFromDateTime).format('hh:mm') + " - " + moment(ticketPayload.validToDateTime).format('hh:mm') : '' }
                </Typography>
              </Grid>
            </Grid>

            <hr></hr>

            <Grid container spacing={0}>
              <Grid item xs={6}>
                <Typography className={classes.paper} variant="h6">
                  <b>Start Ort</b>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography className={classes.paper} variant="h5">
                  { renderAddress(ticketPayload?.startAddress) }
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography className={classes.paper} variant="h6">
                  <b>Ziel Ort</b>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography className={classes.paper} variant="h5">
                { renderAddress(ticketPayload?.endAddress) }
                </Typography>
              </Grid>
            </Grid>

            <hr></hr>

            <Grid container spacing={0}>
              <Grid item xs={6}>
                <Typography className={classes.paper} variant="h5">
                  <b>Name</b>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography className={classes.paper} variant="h6">

                  { IdentityProvider.getIdentity()?.firstName || 'Erika'} { IdentityProvider.getIdentity()?.lastName || 'Musterfrau'}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography className={classes.paper} variant="h5">
                  <b>Ausweis Nummer</b>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography className={classes.paper} variant="h6">
                  { IdentityProvider.getIdentity()?.identificationDocumentId || '11111A1111'}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default TicketDetailsView;
