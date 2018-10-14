import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/imgs/logo.svg';

class Index extends Component {
  state = {
    response: ''
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/ip');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>ballot.</p>
          <Link to={'./create'}>
            <button className="button button-transparent">
              Create Poll
            </button>
          </Link>
          <p className="App-content">{this.state.response}</p>
        </header>
      </div>
    );
  }
}

export default Index;
