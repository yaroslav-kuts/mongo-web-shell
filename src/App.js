import React, { Component } from 'react';
import AceEditor from 'react-ace';

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";

class App extends Component {
  state = {
    uri: '',
    script: '',
    output: '',
  };

  constructor() {
    super();
    this.handleURIChange = this.handleURIChange.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleURIChange(event) {
    const { value: uri } = event.target;
    this.setState(prev => ({ ...prev, uri }));
  }

  handleEditorChange(script) {
    this.setState(prev => ({ ...prev, script }));
  }

  async handleSubmit(event) {
    event.preventDefault();

    const response = await fetch('/api/v1/execute', {
      method: 'POST',
      body: JSON.stringify({
        uri: this.state.uri,
        script: this.state.script,
      }),
    });
    const data = await response.json();

    this.setState(prev => ({
      ...prev,
      output: JSON.stringify(data),
    }));
  }

  render() {
    return (
      <div className="app" >
        <form onSubmit={this.handleSubmit} >
          <input
            type="text"
            name="uri"
            value={this.state.uri}
            onChange={this.handleURIChange}
          /><br />
          <AceEditor
            mode="javascript"
            theme="monokai"
            name="script"
            value={this.state.script}
            onChange={this.handleEditorChange}
          />
          <button>Execute</button>
        </form>
        <p>{this.state.output}</p>
      </div>
    );
  }
}

export default App;
