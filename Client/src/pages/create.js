import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../components/logo'
import Login from '../components/login'
import CreateForm from '../containers/CreateForm';

import avatar from '../assets/imgs/default_avatar.png';

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: "",
      logged_in: false,
      user: {
        name: "Log",
        image: avatar
      }
    };

    this.responseFacebook = this.responseFacebook.bind(this);
  }

  responseFacebook = (response) => {
    console.log('user data: ', response);
    let user = response;

    if(user.hasOwnProperty('id')) {
      this.setState(
        prevState => ({
          ...prevState,
          logged_in: true
        })
      );

      this.setState(
        prevState => ({
          user: {
            ...prevState.user,
            name: user.name,
          }
        })
      );
    }
  }

  renderLoginButton() {
    if(!this.state.logged_in) {
        return (
          <div className="login-button-position">
            <img className="avatar-top" src={this.state.user.image}></img>
            <p className="input-label user-name">{this.state.user.name}</p>
          </div>
        )
    } else {
        return(<Login callback={this.responseFacebook}/>);
    }
  }

  checkLogin() {
    if(this.state.logged_in) {
        return (<CreateForm />)
    } else {
        return(<p className="error-log-in">Please log in to create a poll</p>);
    }
  }

  render() {
    return (
      <div>
        <Logo link="./"/>
        {this.renderLoginButton()}
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
