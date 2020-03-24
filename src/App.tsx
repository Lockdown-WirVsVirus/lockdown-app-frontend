import React from "react";
import {Router, Route} from "react-router-dom";
import "./App.css";
import LoginView from "./view/LoginView";
import CheckView from "./view/CheckView";
import DownloadPdfView from "./view/DownloadPdfView";
import ShowLsPdfView from "./view/ShowLsPdfView";
import RenderLsPdfView from "./view/RenderLsPdfView";
import LeaveRequestView from "./view/LeaveRequestView";
import TicketDetailsView from "./view/TicketDetails"
import TicketView from "./view/TicketView";
import HomeView from "./view/HomeView";
import {createBrowserHistory} from 'history';
import moment from "moment";
import "moment/locale/de";

moment.locale("de");

const history = createBrowserHistory()

function App() {
    return (
        <Router history={history}>
            <Route path="/" exact component={LoginView}/>
            <Route path="/login" component={LoginView}/>
            <Route path="/check" component={CheckView}/>
            <Route path="/download" component={DownloadPdfView}/>
            <Route path="/open" component={ShowLsPdfView}/>
            <Route path="/render" component={RenderLsPdfView}/>
            <Route path="/leave" component={LeaveRequestView}/>
            <Route path="/ticket" component={TicketView}/>
            <Route path="/home" component={HomeView}/>
            <Route path="/details" component={TicketDetailsView}/>
        </Router>
    );
}

export default App;
