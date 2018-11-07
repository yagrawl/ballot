import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons';

import Logo from '../components/logo'
import Loader from '../components/loader'

import { sendEvent } from '../containers/event'
import Maps from '../containers/map'

class Stats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: {
        event_count: 0,
        poll_count: 0,
        ip_count: 0,
        vote_count: 0,
        ip_locations: []
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
        <div className="stats">
          <div className="stats-header">
            <Logo link=""/>
          </div>
          <div className="stats-active-area">
            <div className="stats-count-box">
              <p className="stats-count-count">{this.state.response.vote_count}</p>
              <p className="stats-count-label">Votes</p>
            </div>
            <div className="stats-count-box stats-count-box-top-last">
              <p className="stats-count-count">{this.state.response.poll_count}</p>
              <p className="stats-count-label">Polls</p>
            </div>
            <div className="stats-count-box-clear"></div>
            <div className="stats-count-box">
              <p className="stats-count-count">{this.state.response.event_count}</p>
              <p className="stats-count-label">Events</p>
            </div>
            <div className="stats-count-box stats-count-box-last">
              <p className="stats-count-count">{this.state.response.ip_count}</p>
              <p className="stats-count-label">IPs</p>
            </div>
            <div className="stats-count-box-clear-end"></div>
          </div>
            <Maps locations={this.state.response.ip_locations}/>
        </div>
      );
    }
    else {
      return <Loader />
    }
  }
}

export default Stats;
