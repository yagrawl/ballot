import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';

import logo from '../assets/imgs/logo.svg';

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: "",
      logged_in: false
    };

    this.responseFacebook = this.responseFacebook.bind(this);
  }

  responseFacebook = (response) => {
    console.log(response);
  }

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
            <button className="button button-transparent">Create Poll</button>
          </Link>
          <FacebookLogin
            appId="2075066269470448"
            autoLoad={true}
            fields="name,email,picture"
            callback={this.responseFacebook}
            cssClass="button button-transparent"
            icon=""
          />
          <p className="App-content">{this.state.response}</p>
        </header>
      </div>
    );
  }
}

export default Index;
