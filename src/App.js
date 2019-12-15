import React, { Component } from 'react';

class App extends Component {
  state = {
    uri: '',
    script: '',
    output: '',
  };

  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState(prev => ({
      ...prev,
      [name]: value,
    }));
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
          <input type="text" name="uri" value={this.state.uri} onChange={this.handleChange} />
          <br />
          <textarea name="script" value={this.state.script} onChange={this.handleChange} />
          <br />
          <button>Execute</button>
        </form>
        <p>{this.state.output}</p>
      </div>
    );
  }
}

export default App;
