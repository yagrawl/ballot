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
        id: "",
        name: "Log",
        image: avatar,
        email: ""
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

      this.setState(
        prevState => ({
          user: {
            ...prevState.user,
            id: user.id,
            name: user.name,
            image: high_res_picture,
            email: user.email
          }
        })
      );

      fetch("/api/user/log", {
        method: "POST",
        body: JSON.stringify(this.state.user),
        headers: {"Content-Type": "application/json"}
      })
      .then(response => console.log(response))
      .then(response => {
          console.log(response);
        }
      )
      .catch(error => console.error('Error:', error));
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
