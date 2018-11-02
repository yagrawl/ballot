import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { sendEvent } from '../containers/event'
import logo from '../assets/imgs/logo.svg';

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: "",
      logged_in: false
    };

    this.events = {
      event_1_status: false
    }

    this.responseFacebook = this.responseFacebook.bind(this);
  }

  responseFacebook = (response) => {
    console.log(response);
  }

  componentDidMount() {
    this.callApi()
      .then(res => {
        this.setState({ response: res.express });
        sendEvent("Home Page Accessed", "/", this.props.user.id);
      })
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
            <button className="button button-transparent">Create Poll</button>
          </Link>
          <p className="App-content ip-center">{this.state.response}</p>
        </header>
      </div>
    );
  }
}

export default Index;
