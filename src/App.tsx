import React from 'react';
import Jentelman from './Jentelman.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={Jentelman} className="App-logo" alt="logo" />
        <p>
        <p>Lockdown App! 🎸 </p>
        </p>
        <p>Automated Deployment Pipeline 🚀 <br/>
           This from develop branch 👨🏼‍💻
        </p>
      </header>
    </div>
  );
}

export default App;
