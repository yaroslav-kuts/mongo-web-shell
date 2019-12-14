import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    uri: '',
    script: '',
    output: 'test',
  };

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();

    const response = await fetch('/api/v1/execute', { method: 'POST' });
    const data = await response.json();

    this.setState(prev => ({
      ...prev,
      output: JSON.stringify(data),
    }));
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} >
          <input type="text" name="uri" value={this.state.uri} />
          <br />
          <textarea name="script" value={this.state.script} />
          <br />
          <button>Execute</button>
        </form>
        <p>{this.state.output}</p>
      </div>
    );
  }
}

export default App;
