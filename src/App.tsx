import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import LoginView from "./view/LoginView";
import CheckView from "./view/CheckView";
import DownloadPdfView from "./view/DownloadPdfView";
import ShowLsPdfView from "./view/ShowLsPdfView";


function App() {
    return (
        <Router>
            <Route path="/" exact component={LoginView}/>
            <Route path="/login" component={LoginView}/>
            <Route path="/check" component={CheckView}/>
            <Route path="/download" component={DownloadPdfView}/>
            <Route path="/open" component={ShowLsPdfView}/>
        </Router>
    );
}

export default App;
