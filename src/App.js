import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CryptoJS from 'crypto-js';

class App extends Component {

  state={
    privateKey: "",
    password: ""
  }

  render() {
    const mySecretKey = `${this.state.privateKey}-${this.state.password}`;
    const hashedPassword = btoa(CryptoJS.PBKDF2(mySecretKey, this.state.privateKey).toString());
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Password Generator</h1>
          <div>
            <p>
              <label>
                Private key: <input onChange={(e) => this.setState({ privateKey: e.target.value})}/>
              </label>
            </p>
            <p>
              <label>
                Password: <input onChange={(e) => this.setState({ password: e.target.value})}/>
              </label>
            </p>
            <p>Hashed Password:</p>
            <p>{ hashedPassword }</p>
          </div>

        </header>
      </div>
    );
  }
}

export default App;
