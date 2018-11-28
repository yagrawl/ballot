import React, { Component } from 'react';
import {isMobile} from "react-device-detect";
import {ResponsiveContainer,
        Tooltip,
        RadialBarChart,
        RadialBar,
        AreaChart, Area,
        XAxis,
        RadarChart, Radar, PolarAngleAxis,
        PolarGrid,
        PieChart, Pie } from 'recharts';

import PollWidget from '../containers/pollwidget'
import Logo from '../components/logo'
import PollDenied from '../components/pollDenied'
import Loader from '../components/loader'
import PollAnalytics from '../containers/pollanalytics';

class Details extends Component {
  constructor(props) {
    super(props);
      this.state = {
        id: this.props.match.params.poll_id,
        vote_data: [],
        vote_timeline: [],
        has_loaded: true
      }
  }

  componentDidMount() {
    fetch('/api/details/' + this.state.id)
      .then(response => response.json())
      .then(data => {
        this.setState(
        prevState => ({
          ...prevState,
          vote_data: data.details.main_data,
          vote_timeline: data.details.timeline
        })
      )
    });
   }

  getVoteTimeline() {
    let elements = this.state.vote_data.map((vote, index) => (
      <tr>
        <td>{vote.ip_address}</td>
        <td>{vote.time}</td>
        <td>{vote.selection}</td>
      </tr>
    ));
    return elements;
  }

  render() {
    if(this.state.has_loaded) {
      return (
        <div>
          <Logo link="/"/>
          <div className="active-area">
            <div className="ipaddress-table">
              <table>
                <tr>
                  <th>Logged IP Address</th>
                  <th>Timestamp</th>
                  <th>Selection</th>
                </tr>
                {this.getVoteTimeline()}
              </table>
            </div>
            <div className="stats-full-graph-box">
              <ResponsiveContainer width="90%" height={250}>
                <AreaChart data={this.state.vote_timeline}>
                  <XAxis dataKey="time" />
                  <Tooltip />
                  <Area type='monotone' dataKey='vote_count' stroke='#82ca9d' fill='#82ca9d' />
                </AreaChart>
              </ResponsiveContainer>
              <p className="stats-sublabel">Vote v/s Day</p>
            </div>
          </div>
        </div>
      );
    } else {
      return <Loader />
    }
  }
}

export default Details;
