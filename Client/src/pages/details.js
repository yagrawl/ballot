import React, { Component } from 'react';
import {isMobile} from "react-device-detect";

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
        votes: [],
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
          votes: data.details
        })
      )
    });
   }

  getVoteTimeline() {
    let elements = this.state.votes.map((vote, index) => (
      <tr>
        <td>{vote.ip_address}</td>
        <td>{vote.timestamp}</td>
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
          </div>
        </div>
      );
    } else {
      return <Loader />
    }
  }
}

export default Details;
