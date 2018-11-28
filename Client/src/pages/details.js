import React, { Component } from 'react';
import {isMobile} from "react-device-detect";
import {ResponsiveContainer,
        Tooltip,
        AreaChart, Area,
        XAxis} from 'recharts';

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
        poll_data: [{
          question: '',
          options: {},
          creator_id: '',
          feed_privacy: '',
          analytics_privacy: '',
          creation_time: '',
          expiration_time: ''
        }],
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
          poll_data: data.details.poll_data,
          vote_data: data.details.main_data,
          vote_timeline: data.details.timeline
        })
      )
      console.log(this.state);
    });
   }

  getVoteTimeline() {
    let elements = this.state.vote_data.map((vote, index) => (
      <tr>
        <td>{vote.ip_address}</td>
        <td>{vote.time}</td>
        <td>{this.state.poll_data[0].options[vote.selection]}</td>
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
            <p className="poll-question-p">{this.state.poll_data[0].question}</p>
            <center>
              <PollAnalytics
              poll_id={this.state.id}
              question={this.state.poll_data[0].question}
              options={[this.state.poll_data[0].option_1,
                        this.state.poll_data[0].option_2,
                        this.state.poll_data[0].option_3,
                        this.state.poll_data[0].option_4 ]}
              />
            </center>
            <div className="poll-analytics-timeline-seperator"></div>
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
