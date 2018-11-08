import React, { Component } from 'react'
import { Route, Switch, Link } from 'react-router-dom';

import { sendEvent } from './containers/event'
import Login from './components/login'

import Index from './pages/index';
import Create from './pages/create';
import Poll from './pages/poll';
import User from './pages/user';
import Feed from './pages/feed';
import Stats from './pages/stats';
import Demo from './pages/demo';
import NotFound from './pages/notfound';

class Routes extends Component {
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
      }
    };

    this.responseFacebook = this.responseFacebook.bind(this);
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
      console.log('%cRoute Auth:', 'background: #222; color: #bada55');
      console.log('State: ', this.state);
      sendEvent("User Logged In", "/route", this.state.user.id);

      fetch("/api/user/new", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json"}
      })
      .then(response => console.log('New User Added: ', response));
    }
  }

  renderLoginButton() {
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
        return(<Login callback={this.responseFacebook}/>);
    }
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
          <Route path="/create"
                 render={(props) =>
                   <Create {...props} isAuthed={auth.logged_in} user={auth.user} />} />
          <Route path="/poll/:poll_id"
                 render={(props) =>
                   <Poll {...props} isAuthed={auth.logged_in} user={auth.user} />} />
          <Route path="/user/:user_id"
                 render={(props) =>
                   <User {...props} isAuthed={auth.logged_in} user={auth.user} />} />
          <Route path="/feed"
                 render={(props) =>
                   <Feed {...props} isAuthed={auth.logged_in} user={auth.user} />} />
          <Route path="/stats"
                 render={(props) =>
                   <Stats {...props} isAuthed={auth.logged_in} user={auth.user} />} />
          <Route path="/demo"
                 render={(props) =>
                   <Demo {...props} isAuthed={auth.logged_in} user={auth.user} />} />
          <Route path="*"
                 render={(props) =>
                   <NotFound {...props} isAuthed={auth.logged_in} user={auth.user} />} />
        </Switch>
      </div>
    );
  }
}

export default Routes;
