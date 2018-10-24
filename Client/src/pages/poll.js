import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PollWidget from '../containers/pollwidget'
import Logo from '../components/logo'

class Poll extends Component {
  constructor(props) {
    super(props);

  }

  render() {

    let poll_id = this.props.match.params.poll_id;

    return (
      <div>
        <Logo link=""/>
        <div className="active-area">
          <PollWidget
            poll_id={poll_id}
          />
        </div>
      </div>
    );
  }
}

export default Poll;
