import React, { Component } from 'react'
import 'react-quill/dist/quill.snow.css'
import ReactQuill, { Quill } from 'react-quill'
import './editor.css';

import BlotFormatter from 'quill-blot-formatter'

var Font = Quill.import('formats/font');
// We do not add Sans Serif since it is the default
Font.whitelist = ['Montserrat', 'inconsolata', 'roboto', 'mirza', 'sofia']

Quill.register(Font, true)
Quill.register('modules/blotFormatter', BlotFormatter)

export default class Editor extends Component {

  modules = {
    blotFormatter: {
      align: {
        attribute: 'data-align',
        aligner: {
          applyStyle: true
        }
      }
    },
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],       // toggled buttons
      ['blockquote', 'code-block'],                    // blocks
      [{ 'header': 1 }, { 'header': 2 }],              // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],    // lists
      [{ 'script': 'sub'}, { 'script': 'super' }],     // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],         // outdent/indent
      [{ 'direction': 'rtl' }],                        // text direction
      [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],       // header dropdown
      [{ 'color': ['white', 'red', 'green', 'yellow','blue', '#3293ca', '#575452'] },
       { 'background': ['white', 'red', 'green', 'yellow','blue', '#3293ca','#575452'] }], // dropdown with defaults
      [{ 'font': ['Montserrat', 'inconsolata', 'roboto', 'mirza', 'sofia'] }],                                // font family
      [{ 'align': [] }],                               // text align
      ['image', 'video', 'link'],
      ['clean'],                                       // remove formatting
    ],
  }

  formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'background',
    'list', 'bullet', 'indent', 'align',
    'size', 'color', 'font',
    'link', 'image', 'video', 'width', 'height'
  ]

  render() {
    return (
      <div className={this.props.className}>
        { this.props.readOnly ?
          <div className={ this.props.value ? "ql-editor border p-2" : "p-0" } dangerouslySetInnerHTML={{__html: this.props.value }}/>
          :
          <ReactQuill
            modules={this.modules}
            formats={this.formats}
            placeHolder={"Add anything here..."}
            theme="snow"
            value={this.props.value}
            onChange={this.props.handleTextChange}
          />
        }
      </div>
    );
  }
}



