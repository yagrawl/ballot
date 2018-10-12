import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Poll extends Component {
  render() {
    return (
      <Link to={`/poll/${this.props.id}`}>
        <h2>Poll</h2>
      </Link>
    );
  }
}

export default Poll;
