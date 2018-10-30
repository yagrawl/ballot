import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PollWidget from '../containers/pollwidget'
import Logo from '../components/logo'

class Index extends Component {
  state = {
    response: ''
  };

  render() {
    return (
      <div className="feed-header">
        <Logo link=""/>
        <div className="active-area">
          {/* <PollWidget
            poll_id={poll_id}
          /> */}
        </div>
      </div>
    );
  }
}

export default Index;
