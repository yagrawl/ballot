import React from 'react';

import errorImgLight from '../assets/imgs/errorlight.png';

const UiError = (props) => {
    return (
      <div className="poll-denied-div">
        <img className="poll-denied-image" src={errorImgLight} alt="Error Art"></img>
        <p className="poll-denied-detection">Oops. Something went wrong.</p>
        <p className="poll-denied-instruction">Please go back <a href="/">home</a>. We are working on it.</p>
      </div>
    );
}

export default UiError;
