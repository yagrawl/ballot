import React, { Component } from 'react';

import PollWidget from '../containers/pollwidget'
import Logo from '../components/logo'
import PollDenied from '../components/pollDenied'

import { sendEvent } from '../containers/event'

class Search extends Component {
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
      query: '',
      tag: '',
      incognito_detected: false,
      vpn_detected: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleKeypress = this.handleKeypress.bind(this);
  }

  handleChange(e) {
    let value = e.target.value;
    this.setState(
      prevState => ({
        ...prevState,
        query: value
      })
    );
  }

  handleKeypress(event) {
		if (event.key === "Enter") {
      this.setState(
        prevState => ({
          ...prevState,
          response: []
        })
      );

      fetch(`/api/search?find=${this.state.query}`)
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
  }

  checkPollConditions() {
    if(this.state.response.length !== 0) {
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
  }

  render() {
    return (
        <div className="search-header">
          <Logo link="/"/>
          <input
              id="searchbox"
              type="text"
              name="query"
              autoComplete="off"
              onChange={this.handleChange}
              onKeyPress={this.handleKeypress}
              value={this.state.query}
              className={"input-box input-box-search"}
              placeholder={"Search"}
            />

            <div className="active-area">
              {this.checkPollConditions()}
            </div>
        </div>
    );
  }
}

export default Search;
