import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { sendEvent } from '../containers/event'
import logo from '../assets/imgs/logo.svg';
import TextBox from '../components/textbox';

class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        id: "",
        name: "",
        profile_picture: "https://i.imgur.com/fMVORsK.png",
        email: "theballot@gmail.com",
      },
      stats_loaded: false
    }

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleIdChange = this.handleIdChange.bind(this);
  }

  handleLogin = (e) => {
    e.preventDefault()

    console.log(this.state.user);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
   if(nextProps.user.id !== prevState.user.id) {
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

  handleNameChange = (e) => {
    let value = e.target.value;
    this.setState(
      prevState => ({
        ...prevState,
        name: value
      })
    );
  }

  handleIdChange = (e) => {
    let value = e.target.value;
    this.setState(
      prevState => ({
        ...prevState,
        id: value
      })
    );
  }

  render() {
    return (
      <div className="App">
        <header className="Auth-header">
          <form>
            <TextBox
              className={"input-box input-box-option"}
              name={"name"}
              value={this.state.name}
              handleChange={this.handleNameChange}
              type={"text"}
              placeholder={"Enter username"}
            />

            <TextBox
              className={"input-box input-box-option"}
              name={"password"}
              value={this.state.id}
              handleChange={this.handleIdChange}
              type={"password"}
              placeholder={"Enter password"}
            />

            <button className="button-black button-black-transparent"
              onClick={this.handleLogin} >Login</button>
          </form>
        </header>
      </div>
    );
  }
}

export default Auth;
