import React from 'react';

const PollDenied = (props) => {
  if(props.reason === 'IV') {
    return (
      <div className="">
        <p className="">Incognito Mode + VPN</p>
      </div>
    );
  }

  if(props.reason === 'V') {
    return (
      <div className="">
        <p className="">VPN</p>
      </div>
    );
  }

  if(props.reason === 'I') {
    return (
      <div className="">
        <p className="">Incognito Mode</p>
      </div>
    );
  }

}

export default PollDenied;
