import React, { Component } from 'react'
import { Route, Switch, Link } from 'react-router-dom';

import Login from './components/login'

import Index from './pages/index';
import Create from './pages/create';
import Poll from './pages/poll';
import User from './pages/user';
import Feed from './pages/feed';
import List from './pages/list'
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
        name: "name",
        image: 'img',
        email: "email"
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
            image: user.picture.data.url,
            email: user.email
          }
        })
      );

      let data = this.state.user
      console.log('%cRoute Auth:', 'background: #222; color: #bada55');
      console.log('state: ', this.state);

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
            <Link to={`user/${this.state.user.id}`}>
              <img className="avatar-top" src={this.state.user.image} alt={"profile"}></img>
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
    console.log('%cRoute Auth (render):', 'background: #222; color: #bada55');
    console.log('Auth: ', auth)
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
          <Route path="/list"
                 render={(props) =>
                   <List {...props} isAuthed={auth.logged_in} user={auth.user} />} />
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
