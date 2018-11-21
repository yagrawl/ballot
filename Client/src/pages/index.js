import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { sendEvent } from '../containers/event'
import logo from '../assets/imgs/logo.svg';

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: "",
      logged_in: false,
      user: {
        id: "Unknown",
        name: "Ballot User",
        profile_picture: "https://i.imgur.com/fMVORsK.png",
        email: "theballot@gmail.com"
      },
    };

    this.events = {
      event_1_status: false
    }

    this.responseFacebook = this.responseFacebook.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
   if(nextProps.user.id !== prevState.user.id) {
     console.log('Sent Event');
     sendEvent("Home Page Accessed Logged In", "/index", nextProps.user.id);
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

  responseFacebook = (response) => {
    console.log(response);
  }

  componentDidMount() {
    this.callApi()
      .then(res => {
        this.setState({ response: res.express });
        sendEvent("Home Page Accessed", "/index", this.props.user.id);
      })
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/ip');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>ballot.</p>
          <Link to={'./create'}>
            <button className="button button-transparent">Create Poll</button>
          </Link>
          <div className="index-links">
            <a href="/feed"><span className="index-link">Feed</span></a>
            <span className="index-link">&nbsp;&nbsp;&sdot;&nbsp;&nbsp;</span>
            <a href="/stats"><span className="index-link">Platform Stats</span></a>
            <span className="index-link">&nbsp;&nbsp;&sdot;&nbsp;&nbsp;</span>
            <a href="/search"><span className="index-link">Search</span></a>
          </div>
          <p className="App-content ip-center">{this.state.response}</p>
        </header>
      </div>
    );
  }
}

export default Index;
