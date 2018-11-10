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
    readOnly: true,
    value: "",
    selectedFile: null
  }

  saveFile =() => {
    if(this.state.selectedFile) {
      fs.writeFile(this.state.selectedFile, this.state.value, (err) => {
        if(err) {
          console.log('error occured when creating the file.');
          return;
        }
        alert('File successfully saved.');
      });
    } else {
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
  }

  openFile = () => {
    dialog.showOpenDialog((fileNames) => {
      console.log('showOpenDialog fileNames >>> ', fileNames);
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
          readOnly: true,
          selectedFile: fileNames[0],
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

  closeFile = () => {
    this.setState({
      selectedFile: null,
      value: "",
      readOnly: true,
    })
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
        {
          this.state.value &&
          <button onClick={this.toggleReadOnly}>{ this.state.readOnly ? 'Edit' : 'ReadOnly' }</button>
        }
        {
          !this.state.readOnly &&
          <button onClick={this.saveFile}>{this.state.selectedFile ? "Save" : "Save As" }</button>
        }
        {
          !this.state.readOnly &&
          <button onClick={this.closeFile}>Close file</button>
        }
        {
          this.state.selectedFile && this.state.readOnly &&
          <button onClick={this.closeFile}>Close file</button>
        }
        {
          this.state.readOnly && !this.state.selectedFile &&
          <button onClick={this.toggleReadOnly}>New</button>
        }
        <button onClick={this.openFile}>Open {this.state.selectedFile ? "another file" : "a file" }</button>
      </div>
    );
  }
}

export default App;
