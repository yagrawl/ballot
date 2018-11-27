import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import ShareButtons from '../components/sharebuttons'

class PollLink extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    let poll = this.props;
    let url = `https://theballot.herokuapp.com/poll/${poll.pollid}`;
    let title = `Vote on this poll!`;

    console.log('%cPoll Link:', 'background: #98C379; color: #1B1D23');
    console.log('Link Details: ', this.props);

    return (
      <div>
        <p className="input-label">Your poll is live at</p>
        <div className="poll-link-div">
          <Link className="a" to={`poll/${poll.pollid}`}>
              <span className="poll-link-link">{url}</span>
          </Link>
        </div>
        <ShareButtons url={url} title={title}/>
      </div>
    );
  }
}

export default PollLink;
