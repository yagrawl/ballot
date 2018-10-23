import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PollWidget from '../components/pollwidget'
import Logo from '../components/logo'

class Poll extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      response: []
    }
  }

  componentDidMount = () => {

    this.getDetails()
      .then(function (res) {
        console.log(res.details);
        this.setState(
          prevState => ({
            ...prevState,
            response: res.details
          })
        )
      })
      .catch(err => console.log(err));

      console.log(this.state);
  }

  getDetails = async () => {
    const response = await fetch('/api/poll/' + this.props.match.params.poll_id);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div>
        <Logo link="./"/>
        <div className="active-area">
          <PollWidget question={this.state.response.question} />
        </div>
      </div>
    );
  }
}

export default Poll;
