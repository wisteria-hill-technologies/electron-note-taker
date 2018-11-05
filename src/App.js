import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state={
    privateKey: ""
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Password Generator</h1>
          <label>
            Private key: <input onChange={(e) => this.setState({ privateKey: e.target.value})}/>
          </label>


        </header>
      </div>
    );
  }
}

export default App;
