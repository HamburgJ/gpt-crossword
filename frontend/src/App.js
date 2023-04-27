import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [getMessage, setGetMessage] = useState({})

  useEffect(()=>{
    fetch('http://localhost:5000/api').then(response => {
      console.log("SUCCESS", response)
      setGetMessage(response)
    }).catch(error => {
      console.log(error)
    })

  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>React + Flask Tutorial</p>
        <div>{getMessage.status === 200 ? 
          <h3>{getMessage.status}</h3>
          :
          <h3>LOADING</h3>}</div>
      </header>
    </div>
  );
}

export default App;