import React, { Component } from 'react';

import PollWidget from '../containers/pollwidget'
import Logo from '../components/logo'

class Poll extends Component {
  constructor(props) {
    super(props);
      this.state = {

      }
  }

  render() {

    let poll_id = this.props.match.params.poll_id;

    return (
      <div>
        <Logo link=""/>
        <div className="active-area">
          <div className="poll-widget-poll-cover">
            <PollWidget
              poll_id={poll_id}
              isAuthed={this.props.isAuthed}
              user={this.props.user}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Poll;
