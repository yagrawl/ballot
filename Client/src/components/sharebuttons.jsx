import React from 'react';
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

const ShareButtons = (props) => (
  <div className="buttons-list">
    <div className="button-share">
      <FacebookShareButton
        url={props.url}
        quote={props.title}
        className="button-share-pointer">
        <FacebookIcon
          size={32}
          round />
      </FacebookShareButton>
    </div>
    <div className="button-share">
      <TwitterShareButton
        url={props.url}
        title={props.title}
        className="button-share-pointer">
        <TwitterIcon
          size={32}
          round />
      </TwitterShareButton>
    </div>
    <div className="button-share">
      <LinkedinShareButton
        url={props.url}
        title={props.title}
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
        url={props.url}
        title={props.title}
        separator=":: "
        className="button-share-pointer">
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
    </div>
    <div className="button-share">
      <RedditShareButton
        url={props.url}
        title={props.title}
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
        url={props.url}
        subject={props.title}
        body={`Please vote on this poll : ${props.url}`}
        className="button-share-pointer">
        <EmailIcon
          size={32}
          round />
      </EmailShareButton>
    </div>
  </div>
);

export default ShareButtons;
