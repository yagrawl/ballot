import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/imgs/logo.png';
import Inputbox from '../components/inputbox';

class Create extends Component {
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
      <div>
        <Link to={'./'}>
          <div className="setup-navbar">
            <img src={logo} className="logo-image" alt="logo" />
          </div>
        </Link>
        <header className="create-header">
          <div className="active-area">
            <p className="page-title">Create Poll</p>
            <Inputbox label={'Question'}/>
          </div>
        </header>
      </div>
    );
  }
}

export default Create;
