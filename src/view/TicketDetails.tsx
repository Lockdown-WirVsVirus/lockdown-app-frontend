import React, { useState } from "react";
import SHA256 from "crypto-js/sha256";
import Cookies from "universal-cookie";
import Header from "./Components/Header";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
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

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    textAlign: "left"
  }
}));

const TicketDetailsView = () => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.root}>
        <Header title="Ticket Details" />
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Typography className={classes.paper} variant="h6">
              <b>Hamburg</b>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.paper} variant="h5">
              <b>Lebensmittel</b>
            </Typography>
          </Grid>
        </Grid>
        <CardMedia
          style={{ height: 50, paddingTop: "56.25%" }}
          image="/qr/Chart.png"
          title="Paella dish"
        />

        <Container>
          <Grid container spacing={0}>
            <Grid item xs={6}>
              <Typography className={classes.paper} variant="h6">
                <b>Datum</b>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.paper} variant="h5">
                23.März.2020
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.paper} variant="h6">
                <b>Uhrzeit</b>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.paper} variant="h5">
                14:15-16:00
              </Typography>
            </Grid>
          </Grid>
        </Container>
        <br />

        <Container>
          <Grid container spacing={0}>
            <Grid item xs={6}>
              <Typography className={classes.paper} variant="h5">
                <b>Name</b>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.paper} variant="h6">
                Erika Mustermann
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.paper} variant="h5">
                <b>Ausweis-ID</b>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.paper} variant="h6">
                11111A1111
              </Typography>
            </Grid>
          </Grid>
        </Container>
        <Grid container direction="column" alignItems="center" justify="center">
          <Grid item xs={12}>
            <Button color="primary">
              <u>weitere Details</u>
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default TicketDetailsView;
