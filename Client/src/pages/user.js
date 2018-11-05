import React, { Component } from 'react';

import PollWidget from '../containers/pollwidget'
import Logo from '../components/logo'

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: {
        details: {
          name: "",
          profile_picture: ""
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
      console.log('%cUser:', 'background: #E06C75; color: white');
      console.log('User Data: ', data.details);
    });
  }

  getUserFeed() {
    let elements = this.state.response.polls.map((poll, index) => (
      <div className="poll-widget-feed-cover">
        <PollWidget
          poll_id={poll.poll_id}
          isAuthed={this.props.isAuthed}
          user={this.props.user}
        />
      </div>
    ));
    return elements;
  }

  render() {
    return (
      <div className="user-header">
        <div className="logo-block">
          <Logo link="../"/>
        </div>
        <div className="cut-top"></div>
        <div className="active-area">
          <div className="user-details">
            <center><img className="user-profile-image" src={`https://graph.facebook.com/v3.2/${this.props.match.params.user_id}/picture?height=400&width=400`}></img></center>
            <p className="user-profile-name">{this.state.response.details.name}</p>
          </div>
          {this.getUserFeed()}
        </div>
      </div>
    );
  }
}

export default User;
