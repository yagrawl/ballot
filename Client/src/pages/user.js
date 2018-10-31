import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Login from '../components/login'
import PollWidget from '../containers/pollwidget'
import Logo from '../components/logo'

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: {
        details: {
          name: "",
        },
        polls: []
      },
      current_user: {
        id: "Unknown",
        name: "name",
        image: 'img',
        email: "email"
      },
      logged_in: false,
    }
  }

  componentDidMount() {
    fetch('/api/user/' + this.props.match.params.user_id)
      .then(response => response.json())
      .then(data => {
        this.setState(
        prevState => ({
          ...prevState,
          response: data.details
        })
      )
      console.log(this.state);
    });
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

  getUserFeed() {
    let elements = this.state.response.polls.map((poll, index) => (
      <div className="poll-widget-feed-cover">
        <PollWidget
          poll_id={poll.poll_id}
        />
      </div>
    ));
    return elements;
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

  render() {
    let user_id = this.props.match.params.user_id;
    return (
      <div className="user-header">
        <div className="logo-block">
          <Logo link="./"/>
        </div>
        {this.renderLoginButton()}
        <div className="cut-top"></div>
        <div className="active-area">
          <div className="user-details">
            <p className="user-profile-name">{this.state.response.details.name}</p>
          </div>
          {this.getUserFeed()}
        </div>
      </div>
    );
  }
}

export default User;
