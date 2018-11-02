import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import {
  FacebookShareButton,
  FacebookIcon,

  LinkedinShareButton,
  LinkedinIcon,

  TwitterShareButton,
  TwitterIcon,

  WhatsappShareButton,
  WhatsappIcon,

  RedditShareButton,
  RedditIcon,

  EmailShareButton,
  EmailIcon,
} from 'react-share';

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
    console.log(this.props);

    return (
      <div>
        <p className="input-label">Your poll is live at</p>
        <div className="poll-link-div">
          <Link className="a" to={`poll/${poll.pollid}`}>
              <span className="poll-link-link">{url}</span>
          </Link>
        </div>
          <div className="buttons-list">
            <div className="button-share">
              <FacebookShareButton
                url={url}
                quote={title}
                className="button-share-pointer">
                <FacebookIcon
                  size={32}
                  round />
              </FacebookShareButton>
            </div>
            <div className="button-share">
              <TwitterShareButton
                url={url}
                title={title}
                className="button-share-pointer">
                <TwitterIcon
                  size={32}
                  round />
              </TwitterShareButton>
            </div>
            <div className="button-share">
              <LinkedinShareButton
                url={url}
                title={title}
                windowWidth={750}
                windowHeight={600}
                className="button-share-pointer">
                <LinkedinIcon
                  size={32}
                  round />
              </LinkedinShareButton>
            </div>
            <div className="button-share">
              <WhatsappShareButton
                url={url}
                title={title}
                separator=":: "
                className="button-share-pointer">
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
            </div>
            <div className="button-share">
              <RedditShareButton
                url={url}
                title={title}
                windowWidth={660}
                windowHeight={460}
                className="button-share-pointer">
                <RedditIcon
                  size={32}
                  round />
              </RedditShareButton>
            </div>
            <div className="button-share">
              <EmailShareButton
                url={url}
                subject={title}
                body={`Please vote on this poll : ${url}`}
                className="button-share-pointer">
                <EmailIcon
                  size={32}
                  round />
              </EmailShareButton>
            </div>
        </div>
      </div>
    );
  }
}

export default PollLink;
