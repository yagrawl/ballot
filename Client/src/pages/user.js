import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PollWidget from '../containers/pollwidget'
import Logo from '../components/logo'

class User extends Component {
  constructor(props) {
    super(props);

  }

  render() {

    let user_id = this.props.match.params.user_id;

    return (
      <div>
        <Logo link=""/>
        <div className="active-area">
          
        </div>
      </div>
    );
  }
}

export default User;
