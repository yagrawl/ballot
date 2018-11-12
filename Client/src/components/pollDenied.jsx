import React from 'react';

import incognito from '../assets/imgs/incognito.png';
import vpn from '../assets/imgs/vpn.png';
import incognitovpn from '../assets/imgs/incognito&vpn.png';

const PollDenied = (props) => {
  if(props.reason === 'IV') {
    return (
      <div className="poll-denied-div">
        <img className="poll-denied-image" src={incognitovpn}></img>
        <p className="poll-denied-detection">Incognito Mode & VPN Detected</p>
        <p className="poll-denied-instruction">Please switch back to normal mode on the browser & turn off VPN to access the poll</p>
      </div>
    );
  }

  if(props.reason === 'V') {
    return (
      <div className="poll-denied-div">
        <img className="poll-denied-image" src={vpn}></img>
        <p className="poll-denied-detection">VPN Detected</p>
        <p className="poll-denied-instruction">Please turn off VPN to access the poll</p>
      </div>
    );
  }

  if(props.reason === 'I') {
    return (
      <div className="poll-denied-div">
        <img className="poll-denied-image" src={incognito}></img>
        <p className="poll-denied-detection">Incognito Mode Detected</p>
        <p className="poll-denied-instruction">Please switch back to normal mode on the browser to access the poll</p>
      </div>
    );
  }

}

export default PollDenied;
