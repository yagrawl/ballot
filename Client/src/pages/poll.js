import React, { Component } from 'react';
import {isMobile} from "react-device-detect";

import PollWidget from '../containers/pollwidget'
import Logo from '../components/logo'
import PollDenied from '../components/pollDenied'
import Loader from '../components/loader'

class Poll extends Component {
  constructor(props) {
    super(props);
      this.state = {
        incognito_detected: false,
        vpn_detected: false,
        has_loaded: false
      }
  }

  componentDidMount() {
    let fs = window.RequestFileSystem || window.webkitRequestFileSystem;

      if (fs) {
        fs(window.TEMPORARY, 100, (fs) => {
          this.setState(
            prevState => ({
              ...prevState,
              incognito_detected: false
            })
          );
        }, (err) => {
          this.setState(
            prevState => ({
              ...prevState,
              incognito_detected: true
            })
          );
        });
      }


    fetch('/ip/check_vpn')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState(
          prevState => ({
            ...prevState,
            vpn_detected: data.is_vpn,
            has_loaded: true
          })
        );
      });
  }

  checkPollConditions() {
    if(this.state.incognito_detected && this.state.vpn_detected) {
      return <PollDenied reason={"IV"} />
    } else if(this.state.incognito_detected && !(this.state.vpn_detected)) {
      return <PollDenied reason={"I"} />
    } else if(!(this.state.incognito_detected) && this.state.vpn_detected) {
      return <PollDenied reason={"V"} />
    } else {
      let poll_id = this.props.match.params.poll_id;
      return (
              <div className="poll-widget-poll-cover">
                <PollWidget
                  poll_id={poll_id}
                  isAuthed={this.props.isAuthed}
                  user={this.props.user}
                />
            </div>
          );
    }
  }

  render() {
    if(this.state.has_loaded) {
      return (
        <div>
          <Logo link="/"/>
          <div className="active-area">
            {this.checkPollConditions()}
          </div>
        </div>
      );
    } else {
      return <Loader />
    }
  }
}

export default Poll;
