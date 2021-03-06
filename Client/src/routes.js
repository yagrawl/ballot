import React, { Component } from 'react'
import { Route, Switch, Link } from 'react-router-dom';

import { sendEvent } from './containers/event'
import Login from './components/login'

import Index from './pages/index';
import Auth from './pages/auth'
import Create from './pages/create';
import Poll from './pages/poll';
import Details from './pages/details';
import Embed from './pages/embed';
import User from './pages/user';
import Feed from './pages/feed';
import Stats from './pages/stats';
import Search from './pages/search';
import NotFound from './pages/notfound';

class Routes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: "",
      logged_in: true,
      user: {
        id: "Unknown",
        name: "Ballot User",
        profile_picture: "http://tinygraphs.com/squares/tinygraphs?theme=bythepool&numcolors=4&size=220&fmt=svg",
        email: "theballot@gmail.com"
      },
      embed: false
    };

    this.responseFacebook = this.responseFacebook.bind(this);
    this.setEmbedTrue = this.setEmbedTrue.bind(this);
  }

  responseFacebook = (response) => {
    let user = response;

    if(user.hasOwnProperty('id')) {
      this.setState(
        prevState => ({
          ...prevState,
          logged_in: true
        })
      );

      this.setState(
        prevState => ({
          user: {
            ...prevState.user,
            id: user.id,
            name: user.name,
            profile_picture: `https://graph.facebook.com/v3.2/${user.id}/picture?height=400&width=400`,
            email: user.email
          }
        })
      );

      let data = this.state.user
      console.log('%cRoute Auth:', 'background: #AC4143; color: #F4BF75');
      console.log('User Auth Details: ', this.state);
      sendEvent("User Logged In", "/route", this.state.user.id);

      fetch("/api/user/new", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json"}
      })
      .then(response => {
        console.log('%cNew User Added:', 'background: #F4BF75; color: #21252B');
        console.log('New User: ', response);
      });

      fetch("/api/user/ip/new", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json"}
      })
      .then(response => {
        console.log('%cNew User IP Added:', 'background: #F4BF75; color: #21252B');
        console.log('New User IP: ', response);
      });
    }
  }

  renderLoginButton() {
    if(this.state.embed === false) {
      if(this.state.logged_in) {
          return (
            <div className="login-button-position">
              <Link to={`../user/${this.state.user.id}`}>
                <img className="avatar-top" src={this.state.user.profile_picture} alt={"profile"}></img>
              </Link>
            </div>
          )
      }
      else {
          return(<Login />);
      }
    }
  }

  setEmbedTrue() {
    this.setState(
      prevState => ({
        ...prevState,
        embed: true
      })
    );
  }

  render() {
    let auth = this.state;
    return (
      <div>
        <div className="login-button-up">
          {this.renderLoginButton()}
        </div>
        <Switch>
          <Route exact path="/"
                 render={(props) =>
                   <Index {...props} isAuthed={auth.logged_in} user={auth.user} />} />
         <Route path="/auth"
                render={(props) =>
                  <Auth {...props} isAuthed={auth.logged_in} user={auth.user} />} embed={this.setEmbedTrue}/>} />
          <Route path="/create"
                 render={(props) =>
                   <Create {...props} isAuthed={true} user={auth.user} />} />
          <Route path="/poll/:poll_id"
                 render={(props) =>
                   <Poll {...props} isAuthed={auth.logged_in} user={auth.user} />} />
          <Route path="/polldetails/:poll_id"
                 render={(props) =>
                   <Details {...props} isAuthed={auth.logged_in} user={auth.user} />} />
          <Route path="/embed/:poll_id"
                 render={(props) =>
                   <Embed {...props} isAuthed={auth.logged_in} user={auth.user} embed={this.setEmbedTrue}/>} />
          <Route path="/user/:user_id"
                 render={(props) =>
                   <User {...props} isAuthed={auth.logged_in} user={auth.user} />} />
          <Route path="/feed"
                 render={(props) =>
                   <Feed {...props} isAuthed={auth.logged_in} user={auth.user} />} />
          <Route path="/stats"
                 render={(props) =>
                   <Stats {...props} isAuthed={auth.logged_in} user={auth.user} />} />
          <Route path="/search"
                render={(props) =>
                  <Search {...props} isAuthed={auth.logged_in} user={auth.user} />} />
          <Route path="*"
                 render={(props) =>
                   <NotFound {...props} isAuthed={auth.logged_in} user={auth.user} />} />
        </Switch>
      </div>
    );
  }
}

export default Routes;
