import React, { Component } from 'react';

import Logo from '../components/logo'

import { sendEvent } from '../containers/event'

class Stats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: []
    }
  }

  componentDidMount() {
    // fetch('/api/feed')
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data);
    //     this.setState(
    //       prevState => ({
    //         ...prevState,
    //         response: data.details
    //       })
    //     );
    //     console.log('%cFeed: ', 'background: #769564; color: white');
    //     console.log('Feed State: ', this.props)
    //   });
  }

  render() {
    console.log('Feed: ', this.state);
    return (
      <div className="feed-header">
        <Logo link=""/>
        <div className="active-area">
          <p className="user-profile-name">Stats</p>
          {/* {this.getFeed()} */}
        </div>
      </div>
    );
  }
}

export default Stats;
