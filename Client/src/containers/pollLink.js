import React, {Component} from 'react';

class PollLink extends Component {
  constructor(props) {
    super(props);

    this.poll_id = props.pollid;
  }

  render() {
    return (
      <div>
        <p className="input-label">Access your poll at {this.poll_id}</p>
      </div>
    );
  }
}

export default PollLink;
