import React from 'react';

import pollnotfound from '../assets/imgs/pollnotfound.png';

const PollNotFound = (props) => (
  <div className="poll-not-found-div">
    <img className="poll-not-found-image" src={pollnotfound} alt="poll not found image"></img>
    <p className="poll-not-found-text">Poll Not Found</p>
  </div>
);

export default PollNotFound;
