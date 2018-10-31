import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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

  render() {
    let user_id = this.props.match.params.user_id;
    return (
      <div className="user-header">
        <div className="logo-block">
          <Logo link="../"/>
        </div>
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
