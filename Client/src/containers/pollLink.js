import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import ShareButtons from '../components/sharebuttons';
import EmbedCode from '../components/embedcode'

class PollLink extends Component {
  constructor(props) {
    super(props);

    this.state = {
      embed: false
    }

    this.handleEmbed = this.handleEmbed.bind(this);
  }

  handleEmbed(e) {
    this.setState(
      prevState => ({
        ...prevState,
        embed: true
      })
    );
  }

  embedCode() {
    if(this.state.embed === false) {
      return (
        <div className="embed-code-div">
          <center>
            <button class="button-black button-black-transparent" onClick={this.handleEmbed}>{`Embed < >`}</button>
          </center>
        </div>
      );
    } else {
      return (<EmbedCode url={`https://theballot.herokuapp.com/embed/${this.props.pollid}`}/>)
    }
  }

  render() {
    let poll = this.props;
    let url = `https://theballot.app/poll/${poll.pollid}`;
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
        {this.embedCode()}
      </div>
    );
  }
}

export default PollLink;
