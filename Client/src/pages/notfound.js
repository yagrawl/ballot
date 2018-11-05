import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { sendEvent } from '../containers/event'

import notFoundArt from '../assets/imgs/notfound.png';

class NotFound extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        id: "Unknown",
        name: "Ballot User",
        profile_picture: "https://i.imgur.com/fMVORsK.png",
        email: "theballot@gmail.com"
      },
      stats_loaded: false
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
   if(nextProps.user.id !== prevState.user.id) {
     console.log('Sent Event');
     sendEvent("Not Found Accessed", "/notfound", nextProps.user.id);
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

  render() {
    return (
      <div className="App">
        <header className="not-found-header">
          <img src={notFoundArt} className="not-found-image" alt="not found graphic"/>
          <p>404 : NOT FOUND</p>
          <Link to={'./'}>
            <button className="button button-transparent">
              Go Back Home
            </button>
          </Link>
        </header>
      </div>
    );
  }
}

export default NotFound;
