import React, { Component } from 'react';

import PollWidget from '../containers/pollwidget'
import Logo from '../components/logo'
import PollDenied from '../components/pollDenied'

import { sendEvent } from '../containers/event'

class Feed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: [],
      user: {
        id: "Unknown",
        name: "Ballot User",
        profile_picture: "https://i.imgur.com/fMVORsK.png",
        email: "theballot@gmail.com"
      },
      incognito_detected: false,
      vpn_detected: false
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
   if(nextProps.user.id !== prevState.user.id) {
     console.log('Sent Event');
     sendEvent("Feed Accessed Logged In", "/feed", nextProps.user.id);
     return { UserUpdate: nextProps.user};
   }
    else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.user !== this.props.user){
      this.setState(
        prevState => ({
          ...prevState,
          user: this.props.user
        })
      );
    }
  }

  componentDidMount() {
    let fs = window.RequestFileSystem || window.webkitRequestFileSystem;
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

    fetch('/ip/check_vpn')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState(
          prevState => ({
            ...prevState,
            vpn_detected: data.is_vpn
          })
        );
      });

    fetch('/api/feed')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState(
          prevState => ({
            ...prevState,
            response: data.details
          })
        );
        console.log('%cFeed: ', 'background: #769564; color: white');
        console.log('Feed State: ', this.props)
        sendEvent("Feed Accessed Logged In", "/feed", this.props.user.id);
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
      return this.getFeed();
    }
  }

  getFeed() {
    let elements = this.state.response.map((poll, index) => (
      <div className="poll-widget-feed-cover">
        <PollWidget
          poll_id={poll.poll_id}
          isAuthed={this.props.isAuthed}
          user={this.props.user}
        />
      </div>
    ));
    return elements;
  }

  render() {
    console.log('Feed: ', this.state);
    return (
      <div className="feed-header">
        <Logo link="/"/>
        <div className="active-area">
          {this.checkPollConditions()}
        </div>
      </div>
    );
  }
}

export default Feed;
