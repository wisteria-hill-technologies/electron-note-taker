import React, { Component } from 'react';
import WebFont from 'webfontloader';
import './App.css';
import Editor from './quill-editor/editor';
const fs = window.require('fs');
const electron = window.require("electron");
const { dialog } = electron.remote;

const fontsList = ['Open Sans','Latin', 'Maven Pro', 'Raleway', 'Montserrat','Roboto','Sofia'];

WebFont.load({
  google: {
    families: fontsList
  }
});

class App extends Component {

  state={
    readOnly: false,
    value: ""
  }

  showSaveDialog =() => {
    dialog.showSaveDialog((filename) => {
      if(filename === undefined) {
        console.log("Cancelled");
        return;
      }
      fs.writeFile(filename, this.state.value, (err) => {
        if(err) {
          console.log('error occured when creating the file.');
          return;
        }
        alert('File successfully created.');
      });
    });
  }

  showOpenDialog = () => {
    dialog.showOpenDialog((fileNames) => {
      if(fileNames === undefined) {
        console.log('No files were selected');
        return;
      }
      fs.readFile(fileNames[0], 'utf-8', (err, data) => {
        if (err) {
          console.log('Cannot read file ', err);
          return;
        }
        console.log('the content of the file is : ', data);
        this.setState({
          value: data
        });
        return;
      });
    });
  }

  handleTextChange = (value) => {
    console.log(value);
    this.setState({ value });
  }

  toggleReadOnly = () => {
    this.setState({
      readOnly: !this.state.readOnly
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Note Taker</h1>
        <Editor
          className="ql-editor"
          value={this.state.value}
          handleTextChange={this.handleTextChange}
          readOnly={this.state.readOnly}
        />
        <button onClick={this.toggleReadOnly}>{ this.state.readOnly ? 'Edit' : 'ReadOnly' }</button>
        <button onClick={this.showSaveDialog}>Save your note to a file</button>
        <button onClick={this.showOpenDialog}>Open a file</button>
      </div>
    );
  }
}

export default App;
