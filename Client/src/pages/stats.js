import React, { Component } from 'react';

import Logo from '../components/logo'

import { sendEvent } from '../containers/event'

class Stats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: {
        event_count: 0,
        poll_count: 0,
        ip_count: 0,
        vote_count: 0
      }
    }
  }

  componentDidMount() {
    fetch('/api/stats')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState(
          prevState => ({
            ...prevState,
            response: data.result
          })
        );
        console.log('%cStats: ', 'background: #769564; color: white');
        console.log('Stats State: ', this.state);
      });
  }

  render() {
    return (
      <div className="stats-header">
        <Logo link=""/>
        <div className="stats-active-area">
          <p className="user-profile-name">Stats</p>
          <div className="stats-count-box">
            <div className="stats-count">
              <p className="stats-count-count">{this.state.response.vote_count}</p>
              <p className="stats-count-label">Votes</p>
            </div>
            <div className="stats-count">
              <p className="stats-count-count">{this.state.response.poll_count}</p>
              <p className="stats-count-label">Polls</p>
            </div>
            <div className="stats-count">
              <p className="stats-count-count">{this.state.response.event_count}</p>
              <p className="stats-count-label">Events</p>
            </div>
            <div className="stats-count">
              <p className="stats-count-count">{this.state.response.ip_count}</p>
              <p className="stats-count-label">IPs</p>
            </div>
          </div>
          {/* {this.getFeed()} */}
        </div>
      </div>
    );
  }
}

export default Stats;
