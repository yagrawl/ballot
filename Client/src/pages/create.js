import React, { Component } from 'react';

import Logo from '../components/logo'
import CreateForm from '../containers/CreateForm';

import { sendEvent } from '../containers/event'

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: "",
    };

    sendEvent("Create Accessed", "/create", this.props.user.id);
  }

  checkLogin() {
    console.log('%cCreate Auth:', 'background: #222; color: #bada55');
    console.log('IsAuth?: ', this.props.isAuthed);
    console.log('User: ', this.props.user);
    if(this.props.isAuthed) {
        return (<CreateForm creator={this.props.user.id} profile={this.props.user.profile_picture}/>)
    } else {
        return(<p className="error-log-in">Please log in to create a poll</p>);
    }
  }

  render() {
    return (
      <div>
        <div className="logo-block">
          <Logo link="./"/>
        </div>
        <div className="cut-top"></div>
        <header className="create-header">
          <div className="active-area">
            <p className="page-title">Create Poll</p>
            {this.checkLogin()}
          </div>
        </header>
      </div>
    );
  }
}

export default Create;
