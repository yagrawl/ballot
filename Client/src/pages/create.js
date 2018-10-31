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
        id: "Unknown",
        name: "name",
        image: 'img',
        email: "email"
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

      let high_res_picture = user.picture.data.url
      .replace("height=50&width=50", "height=720&width=720")
      .replace("ext=1543540898&hash=AeRg3ohyaTi8GCHA", "ext=1543541429&hash=AeRWTsm5CHqZ1BRG");

      console.log(high_res_picture);

      this.setState(
        prevState => ({
          user: {
            ...prevState.user,
            id: user.id,
            name: user.name,
            image: user.picture.data.url,
            email: user.email
          }
        })
      );

      let data = this.state.user

      fetch("/api/user/new", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json"}
      })
      .then(response => console.log(response));
    }
  }

  renderLoginButton() {
    if(this.state.logged_in) {
        return (
          <div className="login-button-position">
            <Link to={`user/${this.state.user.id}`}>
              <img className="avatar-top" src={this.state.user.image}></img>
            </Link>
          </div>
        )
    }
    else {
        return(<Login callback={this.responseFacebook}/>);
    }
  }

  checkLogin() {
    if(!this.state.logged_in) {
        return (<CreateForm creator={this.state.user.id} profile={this.state.user.image}/>)
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
