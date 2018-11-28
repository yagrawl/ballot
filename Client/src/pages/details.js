import React, { Component } from 'react';
import {isMobile} from "react-device-detect";

import PollWidget from '../containers/pollwidget'
import Logo from '../components/logo'
import PollDenied from '../components/pollDenied'
import Loader from '../components/loader'

class Details extends Component {
  constructor(props) {
    super(props);
      this.state = {
        has_loaded: true
      }
  }

  checkPollConditions() {
    let poll_id = this.props.match.params.poll_id;
    return <p>{poll_id}</p>
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

export default Details;
