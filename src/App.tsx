import React from 'react';
import Jentelman from './Jentelman.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={Jentelman} className="App-logo" alt="logo" />
        <p>
        <p>Lockdown App! <span aria-label="guitar" role="img">🎸</span> </p>
        </p>
        <p>Automated Deployment Pipeline <span aria-label="rocket" role="img">🚀</span> <br/>
           This from develop branch <span aria-label="developer" role="img">👨🏼‍💻</span>
        </p>
      </header>
    </div>
  );
}

export default App;
