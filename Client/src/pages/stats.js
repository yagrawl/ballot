import React, { Component } from 'react';

import Logo from '../components/logo'
import Loader from '../components/loader'

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
      },
      user: {
        id: "Unknown",
        name: "Ballot User",
        profile_picture: "https://i.imgur.com/fMVORsK.png",
        email: "theballot@gmail.com"
      },
      stats_loaded: false
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
            response: data.result,
            stats_loaded: true
          })
        );
        console.log('%cStats: ', 'background: #769564; color: white');
        console.log('Stats State: ', this.state);
      });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
   if(nextProps.user.id !== prevState.user.id) {
     console.log('Sent Event');
     sendEvent("Stats Accessed", "/stats", nextProps.user.id);
     return { UserUpdate: nextProps.user};
   }
    else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.user !== this.props.user){
      this.setState(
        prevState => ({
          ...prevState,
          user: this.props.user
        })
      );
    }
  }

  render() {
    if(this.state.stats_loaded) {
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
          </div>
        </div>
      );
    }
    else {
      return <Loader />
    }
  }
}

export default Stats;
