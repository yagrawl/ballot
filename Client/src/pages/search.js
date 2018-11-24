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
      tag: 'Select a Tag',
      searched: false,
      incognito_detected: false,
      vpn_detected: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleKeypress = this.handleKeypress.bind(this);
    this.tagChange = this.tagChange.bind(this);
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

  tagChange(e) {
    this.setState(
      prevState => ({
        ...prevState,
        tag: e.currentTarget.value,
        response: []
      })
    );

    fetch(`/api/search?find=${this.state.query}&tag=${e.currentTarget.value}`)
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

  handleKeypress(event) {
		if (event.key === "Enter") {
      this.setState(
        prevState => ({
          ...prevState,
          searched: true,
          response: []
        })
      );

      fetch(`/api/search?find=${this.state.query}&tag=${this.state.tag}`)
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
    } else if(this.state.searched && this.state.response.length === 0) {
      return <center><p className="poll-denied-detection">No Results</p></center>
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

            <div className="tag-selection">
              <div className="radio-pad">
                <label>
                  <input type="radio" value="Food" checked={this.state.tag === "Food"}
                   onChange={this.tagChange} className="radio-hide"/> Food
                </label>
              </div>

              <div className="radio-pad">
                <label>
                  <input type="radio" value="Movie" checked={this.state.tag === "Movie"}
                   onChange={this.tagChange} className="radio-hide"/> Movie
                </label>
              </div>

              <div className="radio-pad">
                <label>
                  <input type="radio" value="Music" checked={this.state.tag === "Music"}
                   onChange={this.tagChange} className="radio-hide"/> Music
                </label>
              </div>

              <div className="radio-pad">
                <label>
                  <input type="radio" value="Technology" checked={this.state.tag === "Technology"}
                   onChange={this.tagChange} className="radio-hide"/> Technology
                </label>
              </div>

              <div className="radio-pad">
                <label>
                  <input type="radio" value="Travel" checked={this.state.tag === "Travel"}
                   onChange={this.tagChange} className="radio-hide"/> Travel
                </label>
              </div>

              <div className="radio-pad">
                <label>
                  <input type="radio" value="Misc" checked={this.state.tag === "Misc"}
                   onChange={this.tagChange} className="radio-hide"/> Misc
                </label>
              </div>

              <p className="poll-denied-detection">{this.state.tag}</p>
            </div>

            <div className="active-area">
              {this.checkPollConditions()}
            </div>
        </div>
    );
  }
}

export default Search;
