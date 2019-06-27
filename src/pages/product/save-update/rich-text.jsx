import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
export default class RichText extends Component {
  state = {
    editor: EditorState.createEmpty(),
  }

  onEditorStateChange: Function = (editor) => {
    this.setState({
      editor,
    });
  };
  render() {
    const { editor } = this.state;
    return (
      <div>
        <Editor
          editorState={editor}
          wrapperClassName="demo-wrapper"
          editorClassName="editor"
          onEditorStateChange={this.onEditorStateChange}
        />
        {/*<textarea*/}
        {/*  disabled*/}
        {/*  value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}*/}
        {/*/>*/}
      </div>
    );
  }
}