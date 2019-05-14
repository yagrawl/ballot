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
      ips: [],
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

    fetch('/api/user/ip/' + this.props.match.params.user_id)
      .then(response => response.json())
      .then(data => {
        this.setState(
        prevState => ({
          ...prevState,
          ips: data.details
        })
      )
      console.log('%cUser IPs:', 'background: #E06C75; color: white');
      console.log('User Data IPs: ', data.details);
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

  getUserIps() {
    let elements = this.state.ips.map((ip, index) => (
      <tr>
        <td>{ip.ip_address}</td>
        <td>{ip.log_count}</td>
      </tr>
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
            <center><img className="user-profile-image" src={`http://tinygraphs.com/squares/tinygraphs?theme=bythepool&numcolors=4&size=400&fmt=svg`} alt={"profile"}></img></center>
            <p className="user-profile-name">{this.state.response.details.name}</p>
          </div>
          <div className="ipaddress-table">
            <table>
              <tr>
                <th>Logged IP Address(es)</th>
                <th>Count</th>
              </tr>
              {this.getUserIps()}
            </table>
          </div>
          {this.getUserFeed()}
        </div>
      </div>
    );
  }
}

export default User;
