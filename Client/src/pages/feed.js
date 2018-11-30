import React, { Component } from 'react';
import {isMobile} from "react-device-detect";

import PollWidget from '../containers/pollwidget'
import Logo from '../components/logo'
import PollDenied from '../components/pollDenied'
import UiError from '../components/uierror'

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
      vpn_detected: false,
      tag: 'Select a Tag',
      tags: ['Food', 'Movie', 'Music', 'Technology', 'Travel', 'Misc'],
      query: '',
      uierror: false
    }

    this.handleTag = this.handleTag.bind(this);
  }

  componentDidCatch(error, info) {
    this.setState({ uierror: true });
  }

  handleTag(event) {
    let event_tag = event.target.value;
    this.setState(
      prevState => ({
        ...prevState,
        tag: event_tag,
        response: []
      })
    );

    fetch(`/api/search/tag?tag=${event_tag}`)
      .then(response => response.json())
      .then(data => {
        this.setState(
          prevState => ({
            ...prevState,
            response: data.details
          })
        );
      });
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
  }

  drawTagButtons() {
    let elements = this.state.tags.map((tag, index) => (
      <button className="tag-button" onClick={this.handleTag} value={tag}>{tag}</button>
    ));

    return elements;
  }

  checkUiErrors() {
    if(!this.state.uierror) {
      return(
        <div>
          <div className="tag-selection">
            {this.drawTagButtons()}
          </div>
          <div className="active-area">
            {this.checkPollConditions()}
          </div>
        </div>
      )
    } else {
      return (<UiError theme={"dark"}/>);
    }
  }

  render() {
    return (
      <div className="feed-header">
        <Logo link="/"/>
        {this.checkUiErrors()}
      </div>
    );
  }
}

export default Feed;
