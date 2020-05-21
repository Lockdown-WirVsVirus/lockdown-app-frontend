import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Box,
    Table, TableBody, TableCell, TableContainer, TableRow
} from "@material-ui/core";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { TicketResponseDto } from '../../../gen-backend-api/api';
import moment from "moment";
import TicketHelper from "../../../service/TicketHelper";

const useStyles = makeStyles(theme => ({
  root: {
      "border-top": "1px solid #ccc",
    //   "border-bottom": "1px solid #ccc",
  },
  table: {

  },
  labelCol: {
      "max-width": "3em",
      "border-bottom": "0",
      padding: "6px",
  },
  valueCol: {
      "border-bottom": "0",
      padding: "6px",
  },
  actionCol: {
    "max-width": "6px",
    "border-bottom": "0",
    padding: "6px",
  }
}));

interface TicketPreviewProps {
    ticket: TicketResponseDto;
}

function TicketPreview(props: TicketPreviewProps) {
    const { ticket } = props;

    const classes = useStyles();

    return (
        <Box className={classes.root} component="div">
            <TableContainer className={classes.table}>
                <Table aria-label="active tickets" size="small" >
                    <TableBody>
                        <TableRow>
                            <TableCell className={classes.labelCol} scope="row">Ticket Nummer</TableCell>
                            <TableCell className={classes.valueCol}>{ticket.ticketId.substring(ticket.ticketId.length-16)}</TableCell>
                            {/* <TableCell className={classes.valueCol} rowSpan={2}>stop</TableCell> */}
                            <TableCell className={classes.actionCol} rowSpan={4}>
                                <ArrowForwardIosIcon/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classes.labelCol} scope="row">Begründung</TableCell>
                            <TableCell className={classes.valueCol}>{TicketHelper.mapReasonToGerman(ticket.reason)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classes.labelCol} scope="row">Gültig von</TableCell>
                            <TableCell className={classes.valueCol}>{moment(ticket.validFromDateTime).format('DD.MM.YYYY - HH:mm')}</TableCell>
                            {/* <TableCell className={classes.valueCol} rowSpan={2}>more</TableCell> */}
                        </TableRow>
                        <TableRow>
                            <TableCell className={classes.labelCol} scope="row">Gültig bis</TableCell>
                            <TableCell className={classes.valueCol}>{moment(ticket.validToDateTime).format('DD.MM.YYYY - HH:mm')}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default TicketPreview;
