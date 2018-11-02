import React, { Component } from 'react';

import PollWidget from '../containers/pollwidget'
import Logo from '../components/logo'

class Feed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: []
    }
  }

  componentDidMount() {
    fetch('/api/feed')
      .then(response => response.json())
      .then(data => this.setState(
        prevState => ({
          ...prevState,
          response: data.details
        })
      ));
  }

  getFeed() {
    let elements = this.state.response.map((poll, index) => (
      <div className="poll-widget-feed-cover">
        <PollWidget
          poll_id={poll.poll_id}
        />
      </div>
    ));
    return elements;
  }

  render() {
    console.log('Feed: ', this.state);
    return (
      <div className="feed-header">
        <Logo link=""/>
        <div className="active-area">
          {this.getFeed()}
        </div>
      </div>
    );
  }
}

export default Feed;
