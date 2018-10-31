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
    console.log(user_id);
    
    return (
      <div>
        <Logo link=""/>
        <div className="active-area">
          <p>User</p>
        </div>
      </div>
    );
  }
}

export default Poll;
