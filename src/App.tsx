import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import "./App.css";
import LoginView from "./view/LoginView";
import CheckView from "./view/CheckView";
import DownloadPdfView from "./view/DownloadPdfView";
import ShowLsPdfView from "./view/ShowLsPdfView";
import RenderLsPdfView from "./view/RenderLsPdfView";
import LeaveRequestView from "./view/LeaveRequestView";
import TicketDetailsView from "./view/TicketDetails"

import moment from "moment";
import "moment/locale/de";

moment.locale("de");

function App() {
  return (
      <Router>
        <Route path="/" exact component={LoginView} />
        <Route path="/login" component={LoginView} />
        <Route path="/check" component={CheckView} />
        <Route path="/download" component={DownloadPdfView} />
        <Route path="/open" component={ShowLsPdfView} />
        <Route path="/render" component={RenderLsPdfView} />
        <Route path="/leave" component={LeaveRequestView} />
        <Route path="/details" component={TicketDetailsView} />
      </Router>
  );
}

export default App;
