import React from "react";
import {Router, Route} from "react-router-dom";
import "./App.css";
import LoginView from "./views/1login/LoginView";
import CheckView from "./views/zarchive/CheckView";
import DownloadPdfView from "./views/zarchive/DownloadPdfView";
import ShowLsPdfView from "./views/zarchive/ShowLsPdfView";
import RenderLsPdfView from "./views/zarchive/RenderLsPdfView";
import LeaveRequestView from "./views/3createform/LeaveRequestView";
import TicketDetailsView from "./views/4ticket/TicketDetails"
import HomeView from "./views/2home/HomeView";
import {createBrowserHistory} from 'history';
import moment from "moment";
import "moment/locale/de";
import IdentityProvider from "./service/identityProvider";

moment.locale("de");

const history = createBrowserHistory()

function App() {
    console.log('user is logged in => ', IdentityProvider.isLoggedIn());
    return (
        <Router history={history}>
            <Route path="/" exact component={IdentityProvider.isLoggedIn() ? HomeView : LoginView}/>
            <Route path="/login" component={LoginView}/>
            <Route path="/home" component={HomeView}/>
            <Route path="/create" component={LeaveRequestView}/>
            <Route path="/ticket/:id" component={TicketDetailsView}/>

            {/* Debug / Develop Routes */}
            <Route path="/check" component={CheckView}/>
            <Route path="/download" component={DownloadPdfView}/>
            <Route path="/open" component={ShowLsPdfView}/>
            <Route path="/render" component={RenderLsPdfView}/>
            <Route path="/leave" component={LeaveRequestView}/>

        </Router>
    );
}

export default App;
