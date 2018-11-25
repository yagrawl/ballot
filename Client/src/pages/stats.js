import React, { Component } from 'react';
import {ResponsiveContainer,
        BarChart,
        Bar,
        XAxis,
        Tooltip,
        RadialBarChart,
        RadialBar,
        AreaChart, Area,
        PieChart, Pie } from 'recharts';

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
        ip_locations: [],
        browsers: [],
        os: [],
        routes: [],
        feed_privacy: [],
        analytics_privacy: [],
        options: [],
        expiration_time: [],
        returning_users: [],
        polls_time: [],
        events_time: []
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
            <Logo link="/"/>
          </div>
          <div className="stats-active-area">
            <p className="stats-label">Main Counts</p>
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
          <div className="stats-active-area">
            <p className="stats-label">Device Data</p>
            <div className="stats-2-graph-box">
              <ResponsiveContainer width="90%" height={250}>
                <BarChart data={this.state.response.browsers}>
                  <XAxis dataKey="browser" />
                  <Tooltip />
                  <Bar dataKey="browser_count" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
              <p className="stats-sublabel">Browsers</p>
            </div>
            <div className="stats-2-graph-box-end">
              <ResponsiveContainer width="90%" height={250}>
                <BarChart data={this.state.response.os}>
                  <XAxis dataKey="os" />
                  <Tooltip />
                  <Bar dataKey="os_count" fill="#3D5467" />
                </BarChart>
              </ResponsiveContainer>
              <p className="stats-sublabel">Operating Systems</p>
            </div>
          </div>
          <div className="stats-active-area">
            <p className="stats-label">Endpoint Data</p>
            <div className="stats-full-graph-box">
              <ResponsiveContainer width="90%" height={250}>
                <BarChart data={this.state.response.routes}>
                  <XAxis dataKey="event_route" />
                  <Tooltip />
                  <Bar dataKey="route_count" fill="#3D5467" />
                </BarChart>
              </ResponsiveContainer>
              <p className="stats-sublabel">Routes</p>
            </div>
          </div>
          <div className="stats-active-area">
            <p className="stats-label">Poll Attributes Data</p>
            <div className="stats-3-graph-box">
              <ResponsiveContainer width="90%" height={250}>
                <PieChart>
                  <Pie dataKey="feed_privacy_count"
                       isAnimationActive={true}
                       data={this.state.response.feed_privacy}
                       cx="50%" cy="50%"
                       nameKey="feed_privacy"
                       innerRadius="50%"
                       outerRadius="100%" />
                  <Tooltip/>
                </PieChart>
              </ResponsiveContainer>
              <p className="stats-sublabel">Feed Privacy</p>
            </div>
            <div className="stats-3-graph-box stats-3-graph-box-end">
              <ResponsiveContainer width="90%" height={250}>
                <BarChart data={this.state.response.options}>
                  <XAxis dataKey="option_no">
                  </XAxis>
                  <Tooltip />
                  <Bar dataKey="poll_count" fill="#5158BB" />
                </BarChart>
              </ResponsiveContainer>
              <p className="stats-sublabel">Number of Options</p>
            </div>
            <div className="stats-3-graph-box-end">
              <ResponsiveContainer width="90%" height={250}>
                <PieChart>
                  <Pie dataKey="analytics_privacy_count"
                       isAnimationActive={true}
                       data={this.state.response.analytics_privacy}
                       cx="50%" cy="50%"
                       nameKey="analytics_privacy"
                       innerRadius="50%"
                       outerRadius="100%"/>
                  <Tooltip/>
                </PieChart>
              </ResponsiveContainer>
              <p className="stats-sublabel">Analytics Privacy</p>
            </div>
          </div>
          <div className="stats-active-area">
            <p className="stats-label">Poll Data</p>
            <div className="stats-2-graph-box">
              <ResponsiveContainer width="90%" height={250}>
                <BarChart data={this.state.response.expiration_time}>
                  <XAxis dataKey="duration" />
                  <Tooltip />
                  <Bar dataKey="count" fill="#F2CD5D" />
                </BarChart>
              </ResponsiveContainer>
              <p className="stats-sublabel">Expiration Time</p>
            </div>
            <div className="stats-2-graph-box-end">
              <ResponsiveContainer width="90%" height={250}>
                <RadialBarChart innerRadius="20%" outerRadius="90%" data={this.state.response.returning_users} startAngle={360} endAngle={0}>
                  <RadialBar minAngle={15} label={{ fill: '#666', position: 'insideStart' }} background clockWise={true} dataKey='count' />
                  <Tooltip label="name"/>
                </RadialBarChart>
              </ResponsiveContainer>
              <p className="stats-sublabel">Returning Users</p>
            </div>
          </div>
          <div className="stats-active-area">
            <p className="stats-label">Timeline Data</p>
            <div className="stats-full-graph-box">
              <ResponsiveContainer width="90%" height={250}>
                <AreaChart data={this.state.response.polls_time}>
                  <XAxis dataKey="day" />
                  <Tooltip />
                  <Area type='monotone' dataKey='poll_count' stroke='#8884d8' fill='#8884d8' />
                </AreaChart>
              </ResponsiveContainer>
              <p className="stats-sublabel">Polls v/s Day</p>
            </div>
            <div className="stats-full-graph-box">
              <ResponsiveContainer width="90%" height={250}>
                <AreaChart data={this.state.response.events_time}>
                  <XAxis dataKey="day" />
                  <Tooltip />
                  <Area type='monotone' dataKey='event_count' stroke='#82ca9d' fill='#82ca9d' />
                </AreaChart>
              </ResponsiveContainer>
              <p className="stats-sublabel">Events v/s Day</p>
            </div>
          </div>
            <p className="stats-label location-label">Location Data</p>
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
