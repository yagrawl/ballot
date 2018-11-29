import React, { Component } from 'react';

import PollWidget from '../containers/pollwidget'

class Embed extends Component {
  constructor(props) {
    super(props);

    this.state = {}

    this.props.embed();
  }

  render() {
    return (<PollWidget
      poll_id={this.props.match.params.poll_id}
      isAuthed={this.props.isAuthed}
      user={this.props.user}
    />)
  }
}

export default Embed;
